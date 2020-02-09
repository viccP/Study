/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.log4j.Logger
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package server.shops;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.IItem;
import client.inventory.ItemFlag;
import constants.GameConstants;
import handling.MaplePacket;
import handling.channel.ChannelServer;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import org.apache.log4j.Logger;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.Timer;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.shops.AbstractPlayerStore;
import server.shops.IMaplePlayerShop;
import server.shops.MaplePlayerShopItem;
import tools.MaplePacketCreator;
import tools.packet.PlayerShopPacket;

public class HiredMerchant
extends AbstractPlayerStore {
    public ScheduledFuture<?> schedule;
    private List<String> blacklist;
    private int storeid;
    private long start = System.currentTimeMillis();
    private static final Logger log = Logger.getLogger(HiredMerchant.class);

    public HiredMerchant(MapleCharacter owner, int itemId, String desc) {
        super(owner, itemId, desc, "", 3);
        this.blacklist = new LinkedList<String>();
        this.schedule = Timer.EtcTimer.getInstance().schedule(new Runnable(){

            @Override
            public void run() {
                if (HiredMerchant.this.getMCOwner() != null && HiredMerchant.this.getMCOwner().getPlayerShop() == HiredMerchant.this) {
                    HiredMerchant.this.getMCOwner().setPlayerShop(null);
                }
                HiredMerchant.this.removeAllVisitors(-1, -1);
                HiredMerchant.this.closeShop(true, true);
            }
        }, 86400000L);
    }

    @Override
    public byte getShopType() {
        return 1;
    }

    public final void setStoreid(int storeid) {
        this.storeid = storeid;
    }

    public List<MaplePlayerShopItem> searchItem(int itemSearch) {
        LinkedList<MaplePlayerShopItem> itemz = new LinkedList<MaplePlayerShopItem>();
        for (MaplePlayerShopItem item : this.items) {
            if (item.item.getItemId() != itemSearch || item.bundles <= 0) continue;
            itemz.add(item);
        }
        return itemz;
    }

    @Override
    public void buy(MapleClient c, int item, short quantity) {
        MaplePlayerShopItem pItem = (MaplePlayerShopItem)this.items.get(item);
        IItem shopItem = pItem.item;
        IItem newItem = shopItem.copy();
        short perbundle = newItem.getQuantity();
        int theQuantity = pItem.price * quantity;
        newItem.setQuantity((short)(quantity * perbundle));
        byte flag = newItem.getFlag();
        if (ItemFlag.KARMA_EQ.check(flag)) {
            newItem.setFlag((byte)(flag - ItemFlag.KARMA_EQ.getValue()));
        } else if (ItemFlag.KARMA_USE.check(flag)) {
            newItem.setFlag((byte)(flag - ItemFlag.KARMA_USE.getValue()));
        }
        if (MapleInventoryManipulator.checkSpace(c, newItem.getItemId(), newItem.getQuantity(), newItem.getOwner())) {
            int gainmeso = this.getMeso() + theQuantity - GameConstants.EntrustedStoreTax(theQuantity);
            if (gainmeso > 0) {
                this.setMeso(gainmeso);
                MaplePlayerShopItem tmp167_165 = pItem;
                tmp167_165.bundles = (short)(tmp167_165.bundles - quantity);
                MapleInventoryManipulator.addFromDrop(c, newItem, false);
                this.bought.add(new AbstractPlayerStore.BoughtItem(newItem.getItemId(), quantity, theQuantity, c.getPlayer().getName()));
                c.getPlayer().gainMeso(-theQuantity, false);
                this.saveItems();
                MapleCharacter chr = this.getMCOwnerWorld();
                String itemText = MapleItemInformationProvider.getInstance().getName(newItem.getItemId()) + " (" + perbundle + ") x " + quantity + " \u5df2\u7ecf\u88ab\u5356\u51fa\u3002 \u5269\u4f59\u6570\u91cf: " + pItem.bundles + " \u8d2d\u4e70\u8005: " + c.getPlayer().getName();
                if (chr != null) {
                    chr.dropMessage(-5, "\u60a8\u96c7\u4f63\u5546\u5e97\u91cc\u9762\u7684\u9053\u5177: " + itemText);
                }
                log.info((Object)("[\u96c7\u4f63] " + (chr != null ? chr.getName() : this.getOwnerName()) + " \u96c7\u4f63\u5546\u5e97\u5356\u51fa: " + newItem.getItemId() + " - " + itemText + " \u4ef7\u683c: " + theQuantity));
            } else {
                c.getPlayer().dropMessage(1, "\u91d1\u5e01\u4e0d\u8db3.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            }
        } else {
            c.getPlayer().dropMessage(1, "\u80cc\u5305\u5df2\u6ee1\r\n\u8bf7\u75591\u683c\u4ee5\u4e0a\u4f4d\u7f6e\r\n\u5728\u8fdb\u884c\u8d2d\u4e70\u7269\u54c1\r\n\u9632\u6b62\u975e\u6cd5\u590d\u5236");
            c.getSession().write((Object)MaplePacketCreator.enableActions());
        }
    }

    @Override
    public void closeShop(boolean saveItems, boolean remove) {
        if (this.schedule != null) {
            this.schedule.cancel(false);
        }
        if (saveItems) {
            this.saveItems();
            this.items.clear();
        }
        if (remove) {
            ChannelServer.getInstance(this.channel).removeMerchant(this);
            this.getMap().broadcastMessage(PlayerShopPacket.destroyHiredMerchant(this.getOwnerId()));
        }
        this.getMap().removeMapObject(this);
        this.schedule = null;
    }

    public int getTimeLeft() {
        return (int)((System.currentTimeMillis() - this.start) / 1000L);
    }

    public final int getStoreId() {
        return this.storeid;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.HIRED_MERCHANT;
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        if (this.isAvailable()) {
            client.getSession().write((Object)PlayerShopPacket.destroyHiredMerchant(this.getOwnerId()));
        }
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        if (this.isAvailable()) {
            client.getSession().write((Object)PlayerShopPacket.spawnHiredMerchant(this));
        }
    }

    public final boolean isInBlackList(String bl) {
        return this.blacklist.contains(bl);
    }

    public final void addBlackList(String bl) {
        this.blacklist.add(bl);
    }

    public final void removeBlackList(String bl) {
        this.blacklist.remove(bl);
    }

    public final void sendBlackList(MapleClient c) {
        c.getSession().write((Object)PlayerShopPacket.MerchantBlackListView(this.blacklist));
    }

    public final void sendVisitor(MapleClient c) {
        c.getSession().write((Object)PlayerShopPacket.MerchantVisitorView(this.visitors));
    }

}

