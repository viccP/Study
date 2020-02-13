/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.cashshop.handler;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import client.MapleCharacter;
import client.MapleCharacterUtil;
import client.MapleClient;
import client.inventory.IItem;
import client.inventory.ItemFlag;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryIdentifier;
import client.inventory.MapleInventoryType;
import client.inventory.MapleRing;
import constants.GameConstants;
import constants.OtherSettings;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.CharacterTransfer;
import handling.world.World;
import server.CashItemFactory;
import server.CashItemInfo;
import server.CashShop;
import server.MTSStorage;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.packet.MTSCSPacket;

public class CashShopOperation {
    public static void LeaveCS(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        CashShopServer.getPlayerStorageMTS().deregisterPlayer(chr);
        CashShopServer.getPlayerStorage().deregisterPlayer(chr);
        String ip = c.getSessionIPAddress();
        LoginServer.putLoginAuth(chr.getId(), ip.substring(ip.indexOf(47) + 1, ip.length()), c.getTempIP(), c.getChannel());
        c.updateLoginState(1, ip);
        try {
            chr.saveToDB(false, true);
            c.setReceiving(false);
            World.ChannelChange_Data(new CharacterTransfer(chr), chr.getId(), c.getChannel());
            c.getSession().write(MaplePacketCreator.getChannelChange(ChannelServer.getInstance(c.getChannel()).getPort()));
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void EnterCS(int playerid, MapleClient c) {
        CharacterTransfer transfer = CashShopServer.getPlayerStorage().getPendingCharacter(playerid);
        boolean mts = false;
        if (transfer == null) {
            transfer = CashShopServer.getPlayerStorageMTS().getPendingCharacter(playerid);
            mts = true;
            if (transfer == null) {
                c.getSession().close();
                return;
            }
        }
        MapleCharacter chr = MapleCharacter.ReconstructChr(transfer, c, false);
        c.setPlayer(chr);
        c.setAccID(chr.getAccountID());
        if (!c.CheckIPAddress()) {
            c.getSession().close();
            return;
        }
        byte state = c.getLoginState();
        boolean allowLogin = false;
        if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL) {
            if (!World.isCharacterListConnected(c.loadCharacterNames(c.getWorld()))) {
                allowLogin = true;
            }
        }
        if (!allowLogin) {
            c.setPlayer(null);
            c.getSession().close();
            return;
        }
        c.updateLoginState(MapleClient.LOGIN_LOGGEDIN, c.getSessionIPAddress());
        if (mts) {
            CashShopServer.getPlayerStorageMTS().registerPlayer(chr);
            c.getSession().write((Object)MTSCSPacket.startMTS(chr, c));
            MTSOperation.MTSUpdate(MTSStorage.getInstance().getCart(c.getPlayer().getId()), c);
        } else {
            CashShopServer.getPlayerStorage().registerPlayer(chr);
            c.getSession().write(MTSCSPacket.warpCS(c));
            CashShopOperation.CSUpdate(c);
        }
    }

    public static void CSUpdate(MapleClient c) {
        c.getSession().write((Object)MTSCSPacket.sendWishList(c.getPlayer(), false));
        c.getSession().write((Object)MTSCSPacket.showNXMapleTokens(c.getPlayer()));
        c.getSession().write((Object)MTSCSPacket.getCSInventory(c));
        c.getSession().write((Object)MTSCSPacket.getCSGifts(c));
    }

    public static void TouchingCashShop(MapleClient c) {
        c.getSession().write((Object)MTSCSPacket.showNXMapleTokens(c.getPlayer()));
    }

    public static void CouponCode(String code, MapleClient c) {
        boolean validcode = false;
        int type = -1;
        int item = -1;
        try {
            validcode = MapleCharacterUtil.getNXCodeValid(code.toUpperCase(), validcode);
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        if (validcode) {
            try {
                type = MapleCharacterUtil.getNXCodeType(code);
                item = MapleCharacterUtil.getNXCodeItem(code);
            }
            catch (SQLException e) {
                e.printStackTrace();
            }
            if (type != 5) {
                try {
                    MapleCharacterUtil.setNXCodeUsed(c.getPlayer().getName(), code);
                }
                catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            HashMap<Integer, IItem> itemz = new HashMap<Integer, IItem>();
            int maplePoints = 0;
            int mesos = 0;
            switch (type) {
                case 0: 
                case 1: 
                case 2: {
                    c.getPlayer().modifyCSPoints(type + 1, item, false);
                    maplePoints = item;
                    if (type == 0) {
                        c.getPlayer().dropMessage(1, "点劵CODE领取成功\r\n成功领取：" + item + "点劵！");
                        break;
                    }
                    c.getPlayer().dropMessage(1, "抵用券CODE领取成功\r\n成功领取：" + item + "抵用券！");
                    break;
                }
                case 3: {
                    break;
                }
                case 4: {
                    CashItemInfo itez = CashItemFactory.getInstance().getItem(item);
                    MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                    if (itez == null) {
                        c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
                        CashShopOperation.doCSPackets(c);
                        return;
                    }
                    byte slot = MapleInventoryManipulator.addId(c, itez.getId(), (short)1, "", (byte)0);
                    if (slot <= -1) {
                        c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
                        CashShopOperation.doCSPackets(c);
                        return;
                    }
                    itemz.put(item, c.getPlayer().getInventory(GameConstants.getInventoryType(item)).getItem(slot));
                    String mz = ii.getName(item);
                    c.getPlayer().dropMessage(1, "CODE领取成功\r\n成功领取：" + mz);
                    break;
                }
                case 5: {
                    c.getPlayer().modifyCSPoints(1, item, false);
                    maplePoints = item;
                    c.getPlayer().dropMessage(1, "点劵CODE领取成功\r\n成功领取：" + item + "点劵！");
                    break;
                }
                case 6: {
                    c.getPlayer().gainMeso(item, false);
                    c.getPlayer().dropMessage(1, "金币CODE领取成功\r\n成功领取：" + item + "金币！");
                    mesos = item;
                }
            }
            c.getSession().write((Object)MTSCSPacket.showCouponRedeemedItem(itemz, mesos, maplePoints, c));
        } else {
            c.getSession().write((Object)MTSCSPacket.sendCSFail(validcode ? 165 : 167));
        }
        CashShopOperation.doCSPackets(c);
    }

    public static final void BuyCashItem(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        OtherSettings item_id = new OtherSettings();
        String[] itembp_id = item_id.getItempb_id();
        String[] itemjy_id = item_id.getItemjy_id();
        byte action = slea.readByte();
        if (action == 3) {
            int useNX = slea.readByte() + 1;
            int snCS = slea.readInt();
            CashItemInfo item = CashItemFactory.getInstance().getItem(snCS);
            if (item == null) {
                chr.dropMessage(1, "该物品暂未开放！");
                CashShopOperation.doCSPackets(c);
                return;
            }
            for (int i = 0; i < itembp_id.length; ++i) {
                if (item.getId() != Integer.parseInt(itembp_id[i])) continue;
                c.getPlayer().dropMessage(1, "这个物品是禁止购买的.");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (item.getPrice() < 100) {
                c.getPlayer().dropMessage(1, "价格低于100点卷的物品是禁止购买的.");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (item != null && chr.getCSPoints(useNX) >= item.getPrice()) {
                chr.modifyCSPoints(useNX, -item.getPrice(), false);
                IItem itemz = chr.getCashInventory().toItem(item);
                if (itemz != null && itemz.getUniqueId() > 0 && itemz.getItemId() == item.getId() && itemz.getQuantity() == item.getCount()) {
                    if (useNX == 1) {
                        byte flag = itemz.getFlag();
                        boolean 交易 = true;
                        for (int i = 0; i < itemjy_id.length; ++i) {
                            if (itemz.getItemId() != Integer.parseInt(itemjy_id[i])) continue;
                            交易 = false;
                        }
                        if (交易) {
                            flag = itemz.getType() == MapleInventoryType.EQUIP.getType() ? (byte)(flag | ItemFlag.KARMA_EQ.getValue()) : (byte)(flag | ItemFlag.KARMA_USE.getValue());
                            itemz.setFlag(flag);
                        }
                    }
                    chr.getCashInventory().addToInventory(itemz);
                    c.getSession().write((Object)MTSCSPacket.showBoughtCSItem(itemz, item.getSN(), c.getAccID()));
                } else {
                    c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
                }
            } else {
                c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
            }
            c.getSession().write((Object)MTSCSPacket.showNXMapleTokens(c.getPlayer()));
            c.getSession().write((Object)MaplePacketCreator.enableActions());
        } else if (action == 4 || action == 32) {
            int snCS = slea.readInt();
            int type = slea.readByte() + 1;
            String recipient = slea.readMapleAsciiString();
            String message = slea.readMapleAsciiString();
            CashItemInfo item = CashItemFactory.getInstance().getItem(snCS);
            IItem itemz = chr.getCashInventory().toItem(item);
            if (item.getPrice() < 100) {
                c.getPlayer().dropMessage(1, "价格低于100点卷的物品是禁止购买的.");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (itemz != null && itemz.getUniqueId() > 0 && itemz.getItemId() == item.getId() && itemz.getQuantity() == item.getCount()) {
                if (item == null || c.getPlayer().getCSPoints(type) < item.getPrice() || message.length() > 73 || message.length() < 1) {
                    c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
                    CashShopOperation.doCSPackets(c);
                    return;
                }
                Pair<Integer, Pair<Integer, Integer>> info = MapleCharacterUtil.getInfoByName(recipient, c.getPlayer().getWorld());
                if (info == null || info.getLeft() <= 0 || info.getLeft().intValue() == c.getPlayer().getId() || info.getRight().getLeft().intValue() == c.getAccID()) {
                    c.getSession().write((Object)MTSCSPacket.sendCSFail(162));
                    CashShopOperation.doCSPackets(c);
                    return;
                }
                if (!item.genderEquals(info.getRight().getRight())) {
                    c.getSession().write((Object)MTSCSPacket.sendCSFail(163));
                    CashShopOperation.doCSPackets(c);
                    return;
                }
                c.getPlayer().getCashInventory().gift(info.getLeft(), c.getPlayer().getName(), message, item.getSN(), MapleInventoryIdentifier.getInstance());
                c.getPlayer().modifyCSPoints(type, -item.getPrice(), false);
                c.getSession().write((Object)MTSCSPacket.sendGift(item.getId(), item.getCount(), recipient));
            } else {
                c.getPlayer().dropMessage(1, "这个物品是禁止购买的.");
                CashShopOperation.doCSPackets(c);
            }
        } else if (action == 5) {
            chr.clearWishlist();
            if (slea.available() < 40L) {
                c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
                CashShopOperation.doCSPackets(c);
                return;
            }
            int[] wishlist = new int[10];
            for (int i = 0; i < 10; ++i) {
                wishlist[i] = slea.readInt();
            }
            chr.setWishlist(wishlist);
            c.getSession().write((Object)MTSCSPacket.sendWishList(chr, true));
        } else if (action == 6) {
            boolean coupon;
            int useNX = slea.readByte() + 1;
            coupon = slea.readByte() > 0;
            if (coupon) {
                MapleInventoryType type = CashShopOperation.getInventoryType(slea.readInt());
                if (chr.getCSPoints(useNX) >= 4800 && chr.getInventory(type).getSlotLimit() < 89) {
                    chr.modifyCSPoints(useNX, -4800, false);
                    chr.getInventory(type).addSlot((byte)8);
                    chr.dropMessage(1, "背包已增加到 " + chr.getInventory(type).getSlotLimit());
                } else {
                    c.getSession().write((Object)MTSCSPacket.sendCSFail(164));
                }
            } else {
                MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
                if (chr.getCSPoints(useNX) >= 600 && chr.getInventory(type).getSlotLimit() < 93) {
                    chr.modifyCSPoints(useNX, -600, false);
                    chr.getInventory(type).addSlot((byte)4);
                    chr.dropMessage(1, "背包已增加到 " + chr.getInventory(type).getSlotLimit());
                } else {
                    c.getSession().write((Object)MTSCSPacket.sendCSFail(164));
                }
            }
        } else if (action == 7) {
            if (chr.getCSPoints(1) >= 600 && chr.getStorage().getSlots() < 45) {
                chr.modifyCSPoints(1, -600, false);
                chr.getStorage().increaseSlots((byte)4);
                chr.getStorage().saveToDB();
                c.getSession().write((Object)MTSCSPacket.increasedStorageSlots(chr.getStorage().getSlots()));
            } else {
                c.getSession().write((Object)MTSCSPacket.sendCSFail(164));
            }
        } else if (action == 8) {
            int useNX = slea.readByte() + 1;
            CashItemInfo item = CashItemFactory.getInstance().getItem(slea.readInt());
            int slots = c.getCharacterSlots();
            if (slots > 15) {
                chr.dropMessage(1, "角色列表已满无法增加！");
            }
            if (item == null || c.getPlayer().getCSPoints(useNX) < item.getPrice() || slots > 15) {
                c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
                CashShopOperation.doCSPackets(c);
                return;
            }
            c.getPlayer().modifyCSPoints(useNX, -item.getPrice(), false);
            if (c.gainCharacterSlot()) {
                c.getSession().write((Object)MTSCSPacket.increasedStorageSlots(slots + 1));
                chr.dropMessage(1, "角色列表已增加到：" + c.getCharacterSlots() + "个");
            } else {
                c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
            }
        } else if (action == 13) {
            int uniqueid = slea.readInt();
            slea.readInt();
            slea.readByte();
            byte type = slea.readByte();
            slea.readByte();
            IItem item = c.getPlayer().getCashInventory().findByCashId(uniqueid);
            if (item != null && item.getQuantity() > 0 && MapleInventoryManipulator.checkSpace(c, item.getItemId(), item.getQuantity(), item.getOwner())) {
                IItem item_ = item.copy();
                byte slot = (byte)MapleInventoryManipulator.addbyItem(c, item_, true);
                if (slot >= 0) {
                    if (item_.getPet() != null) {
                        item_.getPet().setInventoryPosition(type);
                        c.getPlayer().addPet(item_.getPet());
                    }
                    c.getPlayer().getCashInventory().removeFromInventory(item);
                    c.getSession().write((Object)MTSCSPacket.confirmFromCSInventory(item_, type));
                } else {
                    c.getSession().write((Object)MaplePacketCreator.serverNotice(1, "您的包裹已满."));
                }
            } else {
                c.getSession().write((Object)MaplePacketCreator.serverNotice(1, "放入背包错误A."));
            }
        } else if (action == 14) {
            CashShop cs = chr.getCashInventory();
            int cashId = (int)slea.readLong();
            byte type = slea.readByte();
            MapleInventory mi = chr.getInventory(MapleInventoryType.getByType(type));
            IItem item1 = mi.findByUniqueId(cashId);
            if (item1 == null) {
                c.getSession().write((Object)MTSCSPacket.showNXMapleTokens(chr));
                return;
            }
            if (cs.getItemsSize() < 100) {
                int sn = CashItemFactory.getInstance().getItemSN(item1.getItemId());
                cs.addToInventory(item1);
                mi.removeSlot(item1.getPosition());
                c.getSession().write((Object)MTSCSPacket.confirmToCSInventory(item1, c.getAccID(), sn));
            } else {
                chr.dropMessage(1, "移动失败。");
            }
        } else if (action == 36 || action == 29) {
            CashItemInfo item = CashItemFactory.getInstance().getItem(slea.readInt());
            String partnerName = slea.readMapleAsciiString();
            String msg = slea.readMapleAsciiString();
            for (int i = 0; i < itembp_id.length; ++i) {
                if (item.getId() != Integer.parseInt(itembp_id[i])) continue;
                c.getPlayer().dropMessage(1, "这个物品是禁止购买的.");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (item == null || !GameConstants.isEffectRing(item.getId()) || c.getPlayer().getCSPoints(1) < item.getPrice() || msg.length() > 73 || msg.length() < 1) {
                chr.dropMessage(1, "购买戒指错误：\r\n你没有足够的点卷或者该物品不存在。。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (!item.genderEquals(c.getPlayer().getGender())) {
                chr.dropMessage(1, "购买戒指错误：B\r\n请联系GM！。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (c.getPlayer().getCashInventory().getItemsSize() >= 100) {
                chr.dropMessage(1, "购买戒指错误：C\r\n请联系GM！。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            Pair<Integer, Pair<Integer, Integer>> info = MapleCharacterUtil.getInfoByName(partnerName, c.getPlayer().getWorld());
            if (info == null || info.getLeft() <= 0 || info.getLeft().intValue() == c.getPlayer().getId()) {
                chr.dropMessage(1, "购买戒指错误：D\r\n请联系GM！。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (info.getRight().getLeft().intValue() == c.getAccID()) {
                chr.dropMessage(1, "购买戒指错误：E\r\n请联系GM！。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (info.getRight().getRight().intValue() == c.getPlayer().getGender() && action == 29) {
                chr.dropMessage(1, "购买戒指错误：F\r\n请联系GM！。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            int err = MapleRing.createRing(item.getId(), c.getPlayer(), partnerName, msg, info.getLeft(), item.getSN());
            if (err != 1) {
                chr.dropMessage(1, "购买戒指错误：G\r\n请联系GM！。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            c.getPlayer().modifyCSPoints(1, -item.getPrice(), false);
        } else if (action == 31) {
            int type = slea.readByte() + 1;
            int snID = slea.readInt();
            CashItemInfo item = CashItemFactory.getInstance().getItem(snID);
            for (int i = 0; i < itembp_id.length; ++i) {
                if (snID != Integer.parseInt(itembp_id[i])) continue;
                c.getPlayer().dropMessage(1, "这个物品是禁止购买的.");
                CashShopOperation.doCSPackets(c);
                return;
            }
            List<CashItemInfo> ccc = null;
            if (item != null) {
                ccc = CashItemFactory.getInstance().getPackageItems(item.getId());
            }
            if (item == null || ccc == null || c.getPlayer().getCSPoints(type) < item.getPrice()) {
                chr.dropMessage(1, "购买礼包错误：\r\n你没有足够的点卷或者该物品不存在。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (!item.genderEquals(c.getPlayer().getGender())) {
                chr.dropMessage(1, "购买礼包错误：B\r\n请联系GM！。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (c.getPlayer().getCashInventory().getItemsSize() >= 100 - ccc.size()) {
                chr.dropMessage(1, "购买礼包错误：C\r\n请联系GM！。");
                CashShopOperation.doCSPackets(c);
                return;
            }
            HashMap<Integer, IItem> ccz = new HashMap<Integer, IItem>();
            for (CashItemInfo i : ccc) {
                IItem itemz = c.getPlayer().getCashInventory().toItem(i);
                if (itemz == null || itemz.getUniqueId() <= 0 || itemz.getItemId() != i.getId()) continue;
                ccz.put(i.getSN(), itemz);
                c.getPlayer().getCashInventory().addToInventory(itemz);
            }
            chr.modifyCSPoints(type, -item.getPrice(), false);
            c.getSession().write((Object)MTSCSPacket.showBoughtCSPackage(ccz, c.getAccID(), item.getSN()));
            c.getSession().write((Object)MTSCSPacket.getCSInventory(c));
            c.getSession().write((Object)MTSCSPacket.getCSGifts(c));
        } else if (action == 42) {
            int snCS = slea.readInt();
            if (snCS == 50200031 && c.getPlayer().getCSPoints(1) >= 500) {
                c.getPlayer().modifyCSPoints(1, -500);
                c.getPlayer().modifyCSPoints(2, 500);
                c.getSession().write((Object)MaplePacketCreator.serverNotice(1, "兑换500抵用卷成功"));
            } else if (snCS == 50200032 && c.getPlayer().getCSPoints(1) >= 1000) {
                c.getPlayer().modifyCSPoints(1, -1000);
                c.getPlayer().modifyCSPoints(2, 1000);
                c.getSession().write((Object)MaplePacketCreator.serverNotice(1, "兑换抵1000用卷成功"));
            } else if (snCS == 50200033 && c.getPlayer().getCSPoints(1) >= 5000) {
                c.getPlayer().modifyCSPoints(1, -5000);
                c.getPlayer().modifyCSPoints(2, 5000);
                c.getSession().write((Object)MaplePacketCreator.serverNotice(1, "兑换5000抵用卷成功"));
            } else {
                c.getSession().write((Object)MaplePacketCreator.serverNotice(1, "没有找到这个道具的信息！\r\n或者你点卷不足无法兑换！"));
            }
            c.getSession().write((Object)MTSCSPacket.enableCSorMTS());
            c.getSession().write((Object)MTSCSPacket.showNXMapleTokens(c.getPlayer()));
            c.getSession().write((Object)MaplePacketCreator.enableActions());
        } else if (action == 33) {
            boolean 关闭 = true;
            if (关闭) {
                chr.dropMessage(1, "暂不支持。");
                c.getPlayer().saveToDB(true, true);
                c.getSession().write((Object)MTSCSPacket.showNXMapleTokens(c.getPlayer()));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            CashItemInfo item = CashItemFactory.getInstance().getItem(slea.readInt());
            if (item == null || !MapleItemInformationProvider.getInstance().isQuestItem(item.getId())) {
                c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (c.getPlayer().getMeso() < item.getPrice()) {
                c.getSession().write((Object)MTSCSPacket.sendCSFail(184));
                CashShopOperation.doCSPackets(c);
                return;
            }
            if (c.getPlayer().getInventory(GameConstants.getInventoryType(item.getId())).getNextFreeSlot() < 0) {
                c.getSession().write((Object)MTSCSPacket.sendCSFail(177));
                CashShopOperation.doCSPackets(c);
                return;
            }
            for (int iz : GameConstants.cashBlock) {
                if (item.getId() != iz) continue;
                c.getPlayer().dropMessage(1, GameConstants.getCashBlockedMsg(item.getId()));
                CashShopOperation.doCSPackets(c);
                return;
            }
            byte pos = MapleInventoryManipulator.addId(c, item.getId(), (short)item.getCount(), null, (byte)0);
            if (pos < 0) {
                c.getSession().write((Object)MTSCSPacket.sendCSFail(177));
                CashShopOperation.doCSPackets(c);
                return;
            }
            chr.gainMeso(-item.getPrice(), false);
            c.getSession().write((Object)MTSCSPacket.showBoughtCSQuestItem(item.getPrice(), (short)item.getCount(), pos, item.getId()));
        } else {
            c.getSession().write((Object)MTSCSPacket.sendCSFail(0));
        }
        CashShopOperation.doCSPackets(c);
    }

    private static final MapleInventoryType getInventoryType(int id) {
        switch (id) {
            case 50200075: {
                return MapleInventoryType.EQUIP;
            }
            case 50200074: {
                return MapleInventoryType.USE;
            }
            case 50200073: {
                return MapleInventoryType.ETC;
            }
        }
        return MapleInventoryType.UNDEFINED;
    }

    private static final void doCSPackets(MapleClient c) {
        c.getSession().write((Object)MTSCSPacket.sendWishList(c.getPlayer(), false));
        c.getSession().write((Object)MTSCSPacket.showNXMapleTokens(c.getPlayer()));
        c.getSession().write((Object)MTSCSPacket.getCSInventory(c));
        c.getSession().write((Object)MTSCSPacket.getCSGifts(c));
        c.getSession().write((Object)MTSCSPacket.enableCSUse());
        c.getPlayer().getCashInventory().checkExpire(c);
    }
}