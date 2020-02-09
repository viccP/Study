/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package server;

import java.lang.ref.WeakReference;
import java.util.LinkedList;
import java.util.List;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.IItem;
import client.inventory.ItemFlag;
import client.inventory.MapleInventoryType;
import constants.GameConstants;
import tools.MaplePacketCreator;
import tools.packet.PlayerShopPacket;

public class MapleTrade {
    private MapleTrade partner = null;
    private final List<IItem> items = new LinkedList<IItem>();
    private List<IItem> exchangeItems;
    private int meso = 0;
    private int exchangeMeso = 0;
    private boolean locked = false;
    private final WeakReference<MapleCharacter> chr;
    private final byte tradingslot;

    public MapleTrade(byte tradingslot, MapleCharacter chr) {
        this.tradingslot = tradingslot;
        this.chr = new WeakReference<MapleCharacter>(chr);
    }

    public final void CompleteTrade() {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (this.exchangeItems != null) {
            for (IItem item : this.exchangeItems) {
                byte flag = item.getFlag();
                if (ItemFlag.KARMA_EQ.check(flag)) {
                    item.setFlag((byte)(flag - ItemFlag.KARMA_EQ.getValue()));
                } else if (ItemFlag.KARMA_USE.check(flag)) {
                    item.setFlag((byte)(flag - ItemFlag.KARMA_USE.getValue()));
                }
                MapleInventoryManipulator.addFromDrop(((MapleCharacter)this.chr.get()).getClient(), item, false);
            }
            this.exchangeItems.clear();
        }
        if (this.exchangeMeso > 0) {
            ((MapleCharacter)this.chr.get()).gainMeso(this.exchangeMeso - GameConstants.getTaxAmount(this.exchangeMeso), false, true, false);
        }
        this.exchangeMeso = 0;
        ((MapleCharacter)this.chr.get()).getClient().getSession().write((Object)MaplePacketCreator.TradeMessage(this.tradingslot, (byte)8));
    }

    public final void cancel(MapleClient c) {
        this.cancel(c, 0);
    }

    public final void cancel(MapleClient c, int unsuccessful) {
        if (this.items != null) {
            for (IItem item : this.items) {
                MapleInventoryManipulator.addFromDrop(c, item, false);
            }
            this.items.clear();
        }
        if (this.meso > 0) {
            c.getPlayer().gainMeso(this.meso, false, true, false);
        }
        this.meso = 0;
        c.getSession().write((Object)MaplePacketCreator.getTradeCancel(this.tradingslot, unsuccessful));
    }

    public final boolean isLocked() {
        return this.locked;
    }

    public final void setMeso(int meso) {
        if (this.locked || this.partner == null || meso <= 0 || this.meso + meso <= 0) {
            return;
        }
        if (((MapleCharacter)this.chr.get()).getMeso() >= meso) {
            ((MapleCharacter)this.chr.get()).gainMeso(-meso, false, true, false);
            this.meso += meso;
            ((MapleCharacter)this.chr.get()).getClient().getSession().write((Object)MaplePacketCreator.getTradeMesoSet((byte)0, this.meso));
            if (this.partner != null) {
                this.partner.getChr().getClient().getSession().write((Object)MaplePacketCreator.getTradeMesoSet((byte)1, this.meso));
            }
        }
    }

    public final void addItem(IItem item) {
        if (this.locked || this.partner == null) {
            return;
        }
        this.items.add(item);
        ((MapleCharacter)this.chr.get()).getClient().getSession().write((Object)MaplePacketCreator.getTradeItemAdd((byte)0, item));
        if (this.partner != null) {
            this.partner.getChr().getClient().getSession().write((Object)MaplePacketCreator.getTradeItemAdd((byte)1, item));
        }
    }

    public final void chat(String message) {
        ((MapleCharacter)this.chr.get()).dropMessage(-2, ((MapleCharacter)this.chr.get()).getName() + " : " + message);
        if (this.partner != null) {
            this.partner.getChr().getClient().getSession().write((Object)PlayerShopPacket.shopChat(((MapleCharacter)this.chr.get()).getName() + " : " + message, 1));
        }
    }

    public final MapleTrade getPartner() {
        return this.partner;
    }

    public final void setPartner(MapleTrade partner) {
        if (this.locked) {
            return;
        }
        this.partner = partner;
    }

    public final MapleCharacter getChr() {
        return (MapleCharacter)this.chr.get();
    }

    public final int getNextTargetSlot() {
        if (this.items.size() >= 9) {
            return -1;
        }
        int ret = 1;
        for (IItem item : this.items) {
            if (item.getPosition() != ret) continue;
            ++ret;
        }
        return ret;
    }

    public final boolean setItems(MapleClient c, IItem item, byte targetSlot, int quantity) {
        int target = this.getNextTargetSlot();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (target == -1 || GameConstants.isPet(item.getItemId()) || this.isLocked() || GameConstants.getInventoryType(item.getItemId()) == MapleInventoryType.CASH && quantity != 1 || GameConstants.getInventoryType(item.getItemId()) == MapleInventoryType.EQUIP && quantity != 1) {
            return false;
        }
        byte flag = item.getFlag();
        if (ItemFlag.UNTRADEABLE.check(flag) || ItemFlag.LOCK.check(flag)) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return false;
        }
        if ((ii.isDropRestricted(item.getItemId()) || ii.isAccountShared(item.getItemId())) && !ItemFlag.KARMA_EQ.check(flag) && !ItemFlag.KARMA_USE.check(flag)) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return false;
        }
        IItem tradeItem = item.copy();
        if (GameConstants.isThrowingStar(item.getItemId()) || GameConstants.isBullet(item.getItemId())) {
            tradeItem.setQuantity(item.getQuantity());
            MapleInventoryManipulator.removeFromSlot(c, GameConstants.getInventoryType(item.getItemId()), item.getPosition(), item.getQuantity(), true);
        } else {
            tradeItem.setQuantity((short)quantity);
            MapleInventoryManipulator.removeFromSlot(c, GameConstants.getInventoryType(item.getItemId()), item.getPosition(), (short)quantity, true);
        }
        if (targetSlot < 0) {
            targetSlot = (byte)target;
        } else {
            for (IItem itemz : this.items) {
                if (itemz.getPosition() != targetSlot) continue;
                targetSlot = (byte)target;
                break;
            }
        }
        tradeItem.setPosition(targetSlot);
        this.addItem(tradeItem);
        return true;
    }

    private final int check() {
        if (((MapleCharacter)this.chr.get()).getMeso() + this.exchangeMeso < 0) {
            return 1;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        short eq = 0;
        short use = 0;
        short setup = 0;
        short etc = 0;
        short cash = 0;
        for (IItem item : this.exchangeItems) {
            switch (GameConstants.getInventoryType(item.getItemId())) {
                case EQUIP: {
                    eq = (byte)(eq + 1);
                    break;
                }
                case USE: {
                    use = (byte)(use + 1);
                    break;
                }
                case SETUP: {
                    setup = (byte)(setup + 1);
                    break;
                }
                case ETC: {
                    etc = (byte)(etc + 1);
                    break;
                }
                case CASH: {
                    cash = (byte)(cash + 1);
                }
            }
            if (!ii.isPickupRestricted(item.getItemId()) || ((MapleCharacter)this.chr.get()).getInventory(GameConstants.getInventoryType(item.getItemId())).findById(item.getItemId()) == null) continue;
            return 2;
        }
        if (((MapleCharacter)this.chr.get()).getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() < eq || ((MapleCharacter)this.chr.get()).getInventory(MapleInventoryType.USE).getNumFreeSlot() < use || ((MapleCharacter)this.chr.get()).getInventory(MapleInventoryType.SETUP).getNumFreeSlot() < setup || ((MapleCharacter)this.chr.get()).getInventory(MapleInventoryType.ETC).getNumFreeSlot() < etc || ((MapleCharacter)this.chr.get()).getInventory(MapleInventoryType.CASH).getNumFreeSlot() < cash) {
            return 1;
        }
        return 0;
    }

    public static final void completeTrade(MapleCharacter c) {
        MapleTrade local = c.getTrade();
        MapleTrade partner = local.getPartner();
        if (partner == null || local.locked) {
            return;
        }
        local.locked = true;
        partner.getChr().getClient().getSession().write((Object)MaplePacketCreator.getTradeConfirmation());
        partner.exchangeItems = local.items;
        partner.exchangeMeso = local.meso;
        if (partner.isLocked()) {
            int lz = local.check();
            int lz2 = partner.check();
            if (lz == 0 && lz2 == 0) {
                local.CompleteTrade();
                partner.CompleteTrade();
            } else {
                partner.cancel(partner.getChr().getClient(), lz == 0 ? lz2 : lz);
                local.cancel(c.getClient(), lz == 0 ? lz2 : lz);
            }
            partner.getChr().setTrade(null);
            c.setTrade(null);
        }
    }

    public static final void cancelTrade(MapleTrade Localtrade, MapleClient c) {
        Localtrade.cancel(c);
        MapleTrade partner = Localtrade.getPartner();
        if (partner != null) {
            partner.cancel(partner.getChr().getClient());
            partner.getChr().setTrade(null);
        }
        if (Localtrade.chr.get() != null) {
            ((MapleCharacter)Localtrade.chr.get()).setTrade(null);
        }
    }

    public static final void startTrade(MapleCharacter c) {
        if (c.getTrade() == null) {
            c.setTrade(new MapleTrade((byte) 0, c));
            c.getClient().getSession().write((Object)MaplePacketCreator.getTradeStart(c.getClient(), c.getTrade(), (byte)0, false));
        } else {
            c.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(5, "\u4e0d\u80fd\u540c\u65f6\u505a\u591a\u4ef6\u4e8b\u60c5\u3002"));
        }
    }

    public static final void start\u73b0\u91d1\u4ea4\u6613(MapleCharacter c) {
        if (c.getTrade() == null) {
            c.setTrade(new MapleTrade((byte) 0, c));
            c.getClient().getSession().write((Object)MaplePacketCreator.getTradeStart(c.getClient(), c.getTrade(), (byte)0, true));
        } else {
            c.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(5, "\u4e0d\u80fd\u540c\u65f6\u505a\u591a\u4ef6\u4e8b\u60c5\u3002"));
        }
    }

    public static final void inviteTrade(MapleCharacter c1, MapleCharacter c2) {
        if (c1 == null || c1.getTrade() == null) {
            return;
        }
        if (c2 != null && c2.getTrade() == null) {
            c2.setTrade(new MapleTrade((byte) 1, c2));
            c2.getTrade().setPartner(c1.getTrade());
            c1.getTrade().setPartner(c2.getTrade());
            c2.getClient().getSession().write((Object)MaplePacketCreator.getTradeInvite(c1, false));
        } else {
            c1.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(5, "\u5bf9\u65b9\u6b63\u5728\u548c\u5176\u4ed6\u73a9\u5bb6\u8fdb\u884c\u4ea4\u6613\u4e2d\u3002"));
            MapleTrade.cancelTrade(c1.getTrade(), c1.getClient());
        }
    }

    public static final void invite\u73b0\u91d1\u4ea4\u6613(MapleCharacter c1, MapleCharacter c2) {
        if (c1 == null || c1.getTrade() == null) {
            return;
        }
        if (c2 != null && c2.getTrade() == null) {
            c2.setTrade(new MapleTrade((byte) 1, c2));
            c2.getTrade().setPartner(c1.getTrade());
            c1.getTrade().setPartner(c2.getTrade());
            c2.getClient().getSession().write((Object)MaplePacketCreator.getTradeInvite(c1, true));
        } else {
            c1.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(5, "\u5bf9\u65b9\u6b63\u5728\u548c\u5176\u4ed6\u73a9\u5bb6\u8fdb\u884c\u4ea4\u6613\u4e2d\u3002"));
            MapleTrade.cancelTrade(c1.getTrade(), c1.getClient());
        }
    }

    public static final void visit\u73b0\u91d1\u4ea4\u6613(MapleCharacter c1, MapleCharacter c2) {
        if (c1.getTrade() != null && c1.getTrade().getPartner() == c2.getTrade() && c2.getTrade() != null && c2.getTrade().getPartner() == c1.getTrade()) {
            c2.getClient().getSession().write((Object)MaplePacketCreator.getTradePartnerAdd(c1));
            c1.getClient().getSession().write((Object)MaplePacketCreator.getTradeStart(c1.getClient(), c1.getTrade(), (byte)1, true));
        } else {
            c1.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(5, "\u5bf9\u65b9\u5df2\u7ecf\u53d6\u6d88\u4e86\u4ea4\u6613\u3002"));
        }
    }

    public static final void visitTrade(MapleCharacter c1, MapleCharacter c2) {
        if (c1.getTrade() != null && c1.getTrade().getPartner() == c2.getTrade() && c2.getTrade() != null && c2.getTrade().getPartner() == c1.getTrade()) {
            c2.getClient().getSession().write((Object)MaplePacketCreator.getTradePartnerAdd(c1));
            c1.getClient().getSession().write((Object)MaplePacketCreator.getTradeStart(c1.getClient(), c1.getTrade(), (byte)1, false));
        } else {
            c1.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(5, "\u5bf9\u65b9\u5df2\u7ecf\u53d6\u6d88\u4e86\u4ea4\u6613\u3002"));
        }
    }

    public static final void declineTrade(MapleCharacter c) {
        MapleTrade trade = c.getTrade();
        if (trade != null) {
            if (trade.getPartner() != null) {
                MapleCharacter other = trade.getPartner().getChr();
                other.getTrade().cancel(other.getClient());
                other.setTrade(null);
                other.dropMessage(5, c.getName() + " \u62d2\u7edd\u4e86\u4f60\u7684\u4ea4\u6613\u9080\u8bf7\u3002");
            }
            trade.cancel(c.getClient());
            c.setTrade(null);
        }
    }

}

