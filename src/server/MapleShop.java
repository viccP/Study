/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package server;

import client.ISkill;
import client.MapleCharacter;
import client.MapleClient;
import client.SkillFactory;
import client.inventory.IItem;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryIdentifier;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import constants.GameConstants;
import database.DatabaseConnection;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.AutobanManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleShopItem;
import tools.MaplePacketCreator;

public class MapleShop {
    private static final Set<Integer> rechargeableItems = new LinkedHashSet<Integer>();
    private int id;
    private int npcId;
    private List<MapleShopItem> items;

    private MapleShop(int id, int npcId) {
        this.id = id;
        this.npcId = npcId;
        this.items = new LinkedList<MapleShopItem>();
    }

    public void addItem(MapleShopItem item) {
        this.items.add(item);
    }

    public void sendShop(MapleClient c) {
        c.getPlayer().setShop(this);
        c.getSession().write((Object)MaplePacketCreator.getNPCShop(c, this.getNpcId(), this.items));
    }

    public void buy(MapleClient c, int itemId, short quantity) {
        if (quantity <= 0) {
            AutobanManager.getInstance().addPoints(c, 1000, 0L, "\u8d2d\u4e70\u9053\u5177\u6570\u91cf " + quantity + " \u9053\u5177: " + itemId);
            return;
        }
        if (c.getPlayer().getMapId() != 809030000 && this.getId() == 9100109) {
            c.getPlayer().dropMessage(5, "\u65e0\u6cd5\u6b63\u5e38\u64cd\u4f5cA\uff01" + c.getPlayer().getMapId() + "/" + this.getId());
        } else if (c.getPlayer().getMapId() == 809030000 && this.getId() == 9100109) {
            MapleShopItem item = this.findById(itemId);
            if (item != null && item.getPrice() > 0) {
                int price;
                int n = price = GameConstants.isRechargable(itemId) ? item.getPrice() : item.getPrice() * quantity;
                if (price >= 0 && c.getPlayer().getddj() >= price) {
                    if (MapleInventoryManipulator.checkSpace(c, itemId, quantity, "")) {
                        c.getPlayer().gainddj(-price);
                        if (GameConstants.isPet(itemId)) {
                            MapleInventoryManipulator.addById(c, itemId, quantity, "", MaplePet.createPet(itemId, MapleInventoryIdentifier.getInstance()), -1L, (byte)0);
                        } else {
                            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                            if (GameConstants.isRechargable(itemId)) {
                                quantity = ii.getSlotMax(c, item.getItemId());
                            }
                            MapleInventoryManipulator.addById(c, itemId, quantity, (byte)0);
                        }
                        c.getPlayer().dropMessage(1, "\u8d2d\u4e70\u6210\u529f.\r\n\u6d88\u8d39\uff1a" + price + "\u8c46\u8c46\u4e2d\u5956\u6b21\u6570\uff01\r\n\u5269\u4f59\uff1a" + c.getPlayer().getddj() + "\u8c46\u8c46\u4e2d\u5956\u6b21\u6570\uff01");
                    } else {
                        c.getPlayer().dropMessage(1, "\u8bf7\u7559\u51fa\u8db3\u591f\u7684\u80cc\u5305\u7a7a\u95f4\uff01");
                    }
                    c.getSession().write((Object)MaplePacketCreator.confirmShopTransaction((byte)0));
                } else {
                    c.getPlayer().dropMessage(1, "\u4f60\u7684\u8c46\u8c46\u673a\u4e2d\u5956\u6b21\u6570\u4e0d\u8db3!\r\n\u8bf7\u7ee7\u7eed\u6253\u8c46\u8c46\u4e2d\u5956!\r\n\u4e2d\u5956\u6b21\u6570\u591f\u4e86\u4ee5\u540e\u624d\u80fd\r\n\u5f53\u524d\u8c46\u8c46\u4e2d\u5956\u6b21\u6570\uff1a" + c.getPlayer().getddj());
                }
            }
        } else if (c.getPlayer().getMapId() != 809030000 && this.getId() == 9120104) {
            c.getPlayer().dropMessage(5, "\u65e0\u6cd5\u6b63\u5e38\u64cd\u4f5cA\uff01" + c.getPlayer().getMapId() + "/" + this.getId());
        } else if (c.getPlayer().getMapId() == 809030000 && this.getId() == 9120104) {
            MapleShopItem item = this.findById(itemId);
            if (item != null && item.getPrice() > 0) {
                int price;
                int n = price = GameConstants.isRechargable(itemId) ? item.getPrice() : item.getPrice() * quantity;
                if (price >= 0 && c.getPlayer().getBeans() >= price) {
                    if (MapleInventoryManipulator.checkSpace(c, itemId, quantity, "")) {
                        c.getPlayer().gainBeans(-price);
                        if (GameConstants.isPet(itemId)) {
                            MapleInventoryManipulator.addById(c, itemId, quantity, "", MaplePet.createPet(itemId, MapleInventoryIdentifier.getInstance()), -1L, (byte)0);
                        } else {
                            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                            if (GameConstants.isRechargable(itemId)) {
                                quantity = ii.getSlotMax(c, item.getItemId());
                            }
                            MapleInventoryManipulator.addById(c, itemId, quantity, (byte)0);
                        }
                        c.getPlayer().dropMessage(1, "\u8d2d\u4e70\u6210\u529f.\r\n\u6d88\u8d39\uff1a" + price + "\u8c46\u8c46\uff01\r\n\u5269\u4f59\uff1a" + c.getPlayer().getBeans() + "\u8c46\u8c46\uff01");
                    } else {
                        c.getPlayer().dropMessage(1, "\u8bf7\u7559\u51fa\u8db3\u591f\u7684\u80cc\u5305\u7a7a\u95f4\uff01");
                    }
                    c.getSession().write((Object)MaplePacketCreator.confirmShopTransaction((byte)0));
                } else {
                    c.getPlayer().dropMessage(1, "\u4f60\u7684\u8c46\u8c46\u6570\u91cf\u4e0d\u8db3!\r\n\u8bf7\u53bb\u5546\u57ce\u8d2d\u4e70!");
                }
            }
        } else {
            MapleShopItem item = this.findById(itemId);
            if (item != null && item.getPrice() > 0) {
                int price;
                int n = price = GameConstants.isRechargable(itemId) ? item.getPrice() : item.getPrice() * quantity;
                if (price >= 0 && c.getPlayer().getMeso() >= price) {
                    if (MapleInventoryManipulator.checkSpace(c, itemId, quantity, "")) {
                        c.getPlayer().gainMeso(-price, false);
                        if (GameConstants.isPet(itemId)) {
                            MapleInventoryManipulator.addById(c, itemId, quantity, "", MaplePet.createPet(itemId, MapleInventoryIdentifier.getInstance()), -1L, (byte)0);
                        } else {
                            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                            if (GameConstants.isRechargable(itemId)) {
                                quantity = ii.getSlotMax(c, item.getItemId());
                            }
                            MapleInventoryManipulator.addById(c, itemId, quantity, (byte)0);
                        }
                    } else {
                        c.getPlayer().dropMessage(1, "Your Inventory is full");
                    }
                    c.getSession().write((Object)MaplePacketCreator.confirmShopTransaction((byte)0));
                }
            }
        }
    }

    public void sell(MapleClient c, MapleInventoryType type, byte slot, short quantity) {
        MapleItemInformationProvider ii;
        IItem item;
        if (quantity == 65535 || quantity == 0) {
            quantity = 1;
        }
        if ((item = c.getPlayer().getInventory(type).getItem(slot)) == null) {
            return;
        }
        if (GameConstants.isThrowingStar(item.getItemId()) || GameConstants.isBullet(item.getItemId())) {
            quantity = item.getQuantity();
        }
        if (quantity < 0) {
            AutobanManager.getInstance().addPoints(c, 1000, 0L, "Selling " + quantity + " " + item.getItemId() + " (" + type.name() + "/" + slot + ")");
            return;
        }
        short iQuant = item.getQuantity();
        if (iQuant == 65535) {
            iQuant = 1;
        }
        if ((ii = MapleItemInformationProvider.getInstance()).cantSell(item.getItemId())) {
            return;
        }
        if (quantity <= iQuant && iQuant > 0) {
            MapleInventoryManipulator.removeFromSlot(c, type, slot, quantity, false);
            double price = GameConstants.isThrowingStar(item.getItemId()) || GameConstants.isBullet(item.getItemId()) ? (double)ii.getWholePrice(item.getItemId()) / (double)ii.getSlotMax(c, item.getItemId()) : ii.getPrice(item.getItemId());
            int recvMesos = (int)Math.max(Math.ceil(price * (double)quantity), 0.0);
            if (price != -1.0 && recvMesos > 0) {
                c.getPlayer().gainMeso(recvMesos, false);
            }
            c.getSession().write((Object)MaplePacketCreator.confirmShopTransaction((byte)8));
        }
    }

    public void recharge(MapleClient c, byte slot) {
        IItem item = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (item == null || !GameConstants.isThrowingStar(item.getItemId()) && !GameConstants.isBullet(item.getItemId())) {
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        short slotMax = ii.getSlotMax(c, item.getItemId());
        int skill = GameConstants.getMasterySkill(c.getPlayer().getJob());
        if (skill != 0) {
            slotMax = (short)(slotMax + c.getPlayer().getSkillLevel(SkillFactory.getSkill(skill)) * 10);
        }
        if (item.getQuantity() < slotMax) {
            int price = (int)Math.round(ii.getPrice(item.getItemId()) * (double)(slotMax - item.getQuantity()));
            if (c.getPlayer().getMeso() >= price) {
                item.setQuantity(slotMax);
                c.getSession().write((Object)MaplePacketCreator.updateInventorySlot(MapleInventoryType.USE, (Item)item, false));
                c.getPlayer().gainMeso(-price, false, true, false);
                c.getSession().write((Object)MaplePacketCreator.confirmShopTransaction((byte)8));
            }
        }
    }

    protected MapleShopItem findById(int itemId) {
        for (MapleShopItem item : this.items) {
            if (item.getItemId() != itemId) continue;
            return item;
        }
        return null;
    }

    public static MapleShop createFromDB(int id, boolean isShopId) {
        MapleShop ret = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(isShopId ? "SELECT * FROM shops WHERE shopid = ?" : "SELECT * FROM shops WHERE npcid = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return null;
            }
            int shopId = rs.getInt("shopid");
            ret = new MapleShop(shopId, rs.getInt("npcid"));
            rs.close();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM shopitems WHERE shopid = ? ORDER BY position ASC");
            ps.setInt(1, shopId);
            rs = ps.executeQuery();
            ArrayList<Integer> recharges = new ArrayList<Integer>(rechargeableItems);
            while (rs.next()) {
                if (GameConstants.isThrowingStar(rs.getInt("itemid")) || GameConstants.isBullet(rs.getInt("itemid"))) {
                    MapleShopItem starItem = new MapleShopItem((short) 1, rs.getInt("itemid"), rs.getInt("price"));
                    ret.addItem(starItem);
                    if (!rechargeableItems.contains(starItem.getItemId())) continue;
                    recharges.remove((Object)starItem.getItemId());
                    continue;
                }
                ret.addItem(new MapleShopItem((short) 1000, rs.getInt("itemid"), rs.getInt("price")));
            }
            for (Integer recharge : recharges) {
                ret.addItem(new MapleShopItem((short) 1000, recharge, 0));
            }
            rs.close();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("Could not load shop" + e);
        }
        return ret;
    }

    public int getNpcId() {
        return this.npcId;
    }

    public int getId() {
        return this.id;
    }

    static {
        rechargeableItems.add(2070000);
        rechargeableItems.add(2070001);
        rechargeableItems.add(2070002);
        rechargeableItems.add(2070003);
        rechargeableItems.add(2070004);
        rechargeableItems.add(2070005);
        rechargeableItems.add(2070006);
        rechargeableItems.add(2070007);
        rechargeableItems.add(2070008);
        rechargeableItems.add(2070009);
        rechargeableItems.add(2070010);
        rechargeableItems.add(2070011);
        rechargeableItems.add(2070012);
        rechargeableItems.add(2070013);
        rechargeableItems.add(2070015);
        rechargeableItems.add(2070016);
        rechargeableItems.add(2070019);
        rechargeableItems.add(2070020);
        rechargeableItems.add(2070021);
        rechargeableItems.add(2070023);
        rechargeableItems.add(2070024);
        rechargeableItems.add(2070025);
        rechargeableItems.add(2070026);
        rechargeableItems.add(2330000);
        rechargeableItems.add(2330001);
        rechargeableItems.add(2330002);
        rechargeableItems.add(2330003);
        rechargeableItems.add(2330004);
        rechargeableItems.add(2330005);
        rechargeableItems.add(2330006);
        rechargeableItems.add(2331000);
        rechargeableItems.add(2332000);
    }
}

