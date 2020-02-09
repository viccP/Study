/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.cashshop.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Equip;
import client.inventory.IItem;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import constants.GameConstants;
import handling.MaplePacket;
import java.util.List;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.MTSCart;
import server.MTSStorage;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.packet.MTSCSPacket;

public class MTSOperation {
    /*
     * Enabled aggressive block sorting
     */
    public static void MTSOperation(SeekableLittleEndianAccessor slea, MapleClient c) {
        MTSCart cart = MTSStorage.getInstance().getCart(c.getPlayer().getId());
        if (slea.available() <= 0L) {
            MTSOperation.doMTSPackets(cart, c);
            return;
        }
        byte op = slea.readByte();
        if (op == 1) {
            Equip eq;
            byte invType = slea.readByte();
            if (invType != 1 && invType != 2) {
                c.getSession().write((Object)MTSCSPacket.getMTSFailSell());
                MTSOperation.doMTSPackets(cart, c);
                return;
            }
            int itemid = slea.readInt();
            if (slea.readByte() != 0) {
                c.getSession().write((Object)MTSCSPacket.getMTSFailSell());
                MTSOperation.doMTSPackets(cart, c);
                return;
            }
            slea.skip(8);
            short stars = 1;
            short quantity = 1;
            byte slot = 0;
            if (invType == 1) {
                slea.skip(32);
            } else {
                stars = slea.readShort();
            }
            slea.readMapleAsciiString();
            if (invType == 1) {
                slea.skip(32);
            } else {
                slea.readShort();
                if (GameConstants.isThrowingStar(itemid) || GameConstants.isBullet(itemid)) {
                    slea.skip(8);
                }
                slot = (byte)slea.readInt();
                if (GameConstants.isThrowingStar(itemid) || GameConstants.isBullet(itemid)) {
                    quantity = stars;
                    slea.skip(4);
                } else {
                    quantity = (short)slea.readInt();
                }
            }
            int price = slea.readInt();
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            MapleInventoryType type = GameConstants.getInventoryType(itemid);
            IItem item = c.getPlayer().getInventory(type).getItem(slot).copy();
            if (ii.isCash(itemid) || quantity <= 0 || item == null || item.getQuantity() <= 0 || item.getItemId() != itemid || item.getUniqueId() > 0 || item.getQuantity() < quantity || price < 110 || c.getPlayer().getMeso() < 5000 || cart.getNotYetSold().size() >= 10 || ii.isDropRestricted(itemid) || ii.isAccountShared(itemid) || item.getExpiration() > -1L || item.getFlag() > 0) {
                c.getSession().write((Object)MTSCSPacket.getMTSFailSell());
                MTSOperation.doMTSPackets(cart, c);
                return;
            }
            if (type == MapleInventoryType.EQUIP && ((eq = (Equip)item).getState() > 0 || eq.getEnhance() > 0 || eq.getDurability() > -1)) {
                c.getSession().write((Object)MTSCSPacket.getMTSFailSell());
                MTSOperation.doMTSPackets(cart, c);
                return;
            }
            if (quantity >= 50 && GameConstants.isUpgradeScroll(item.getItemId())) {
                c.setMonitored(true);
            }
            long expiration = System.currentTimeMillis() + 604800000L;
            item.setQuantity(quantity);
            MTSStorage.getInstance().addToBuyNow(cart, item, price, c.getPlayer().getId(), c.getPlayer().getName(), expiration);
            MapleInventoryManipulator.removeFromSlot(c, type, slot, quantity, false);
            c.getPlayer().gainMeso(-5000, false);
            c.getSession().write((Object)MTSCSPacket.getMTSConfirmSell());
        } else if (op == 4) {
            cart.changeInfo(slea.readInt(), slea.readInt(), slea.readInt());
        } else if (op == 7) {
            if (MTSStorage.getInstance().removeFromBuyNow(slea.readInt(), c.getPlayer().getId(), true)) {
                c.getSession().write((Object)MTSCSPacket.getMTSConfirmCancel());
                MTSOperation.sendMTSPackets(cart, c, true);
                return;
            }
            c.getSession().write((Object)MTSCSPacket.getMTSFailCancel());
        } else if (op == 8) {
            int id = Integer.MAX_VALUE - slea.readInt();
            if (id >= cart.getInventory().size()) {
                c.getPlayer().dropMessage(1, "Please try it again later.");
                MTSOperation.sendMTSPackets(cart, c, true);
                return;
            }
            IItem item = cart.getInventory().get(id);
            if (item != null && item.getQuantity() > 0 && MapleInventoryManipulator.checkSpace(c, item.getItemId(), item.getQuantity(), item.getOwner())) {
                IItem item_ = item.copy();
                short pos = MapleInventoryManipulator.addbyItem(c, item_, true);
                if (pos >= 0) {
                    if (item_.getPet() != null) {
                        item_.getPet().setInventoryPosition(pos);
                        c.getPlayer().addPet(item_.getPet());
                    }
                    cart.removeFromInventory(item);
                    c.getSession().write((Object)MTSCSPacket.getMTSConfirmTransfer(item_.getQuantity(), pos));
                    MTSOperation.sendMTSPackets(cart, c, true);
                    return;
                }
                c.getSession().write((Object)MTSCSPacket.getMTSFailBuy());
            } else {
                c.getSession().write((Object)MTSCSPacket.getMTSFailBuy());
            }
        } else if (op == 9) {
            int id = slea.readInt();
            if (MTSStorage.getInstance().checkCart(id, c.getPlayer().getId()) && cart.addToCart(id)) {
                c.getSession().write((Object)MTSCSPacket.addToCartMessage(false, false));
            } else {
                c.getSession().write((Object)MTSCSPacket.addToCartMessage(true, false));
            }
        } else if (op == 10) {
            int id = slea.readInt();
            if (cart.getCart().contains(id)) {
                cart.removeFromCart(id);
                c.getSession().write((Object)MTSCSPacket.addToCartMessage(false, true));
            } else {
                c.getSession().write((Object)MTSCSPacket.addToCartMessage(true, true));
            }
        } else if (op == 16 || op == 17) {
            MTSStorage.MTSItemInfo mts = MTSStorage.getInstance().getSingleItem(slea.readInt());
            if (mts != null && mts.getCharacterId() != c.getPlayer().getId()) {
                if (c.getPlayer().getCSPoints(1) > mts.getRealPrice()) {
                    if (MTSStorage.getInstance().removeFromBuyNow(mts.getId(), c.getPlayer().getId(), false)) {
                        c.getPlayer().modifyCSPoints(1, -mts.getRealPrice(), false);
                        MTSStorage.getInstance().getCart(mts.getCharacterId()).increaseOwedNX(mts.getPrice());
                        c.getSession().write((Object)MTSCSPacket.getMTSConfirmBuy());
                        MTSOperation.sendMTSPackets(cart, c, true);
                        return;
                    }
                    c.getSession().write((Object)MTSCSPacket.getMTSFailBuy());
                } else {
                    c.getSession().write((Object)MTSCSPacket.getMTSFailBuy());
                }
            } else {
                c.getSession().write((Object)MTSCSPacket.getMTSFailBuy());
            }
        } else if (c.getPlayer().isAdmin()) {
            // empty if block
        }
        MTSOperation.doMTSPackets(cart, c);
    }

    public static void MTSUpdate(MTSCart cart, MapleClient c) {
        c.getPlayer().modifyCSPoints(1, MTSStorage.getInstance().getCart(c.getPlayer().getId()).getSetOwedNX(), false);
        c.getSession().write((Object)MTSCSPacket.getMTSWantedListingOver(0, 0));
        MTSOperation.doMTSPackets(cart, c);
    }

    private static void doMTSPackets(MTSCart cart, MapleClient c) {
        MTSOperation.sendMTSPackets(cart, c, false);
    }

    private static void sendMTSPackets(MTSCart cart, MapleClient c, boolean changed) {
        c.getSession().write((Object)MTSStorage.getInstance().getCurrentMTS(cart));
        c.getSession().write((Object)MTSStorage.getInstance().getCurrentNotYetSold(cart));
        c.getSession().write((Object)MTSStorage.getInstance().getCurrentTransfer(cart, changed));
        c.getSession().write((Object)MTSCSPacket.showMTSCash(c.getPlayer()));
        c.getSession().write((Object)MTSCSPacket.enableCSUse());
        MTSStorage.getInstance().checkExpirations();
    }
}

