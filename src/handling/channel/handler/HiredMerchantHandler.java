/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.IItem;
import client.inventory.ItemLoader;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import constants.GameConstants;
import database.DatabaseConnection;
import handling.world.World;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.apache.mina.common.CloseFuture;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.MapleInventoryManipulator;
import server.MerchItemPackage;
import server.maps.MapleMap;
import tools.Pair;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.packet.PlayerShopPacket;

public class HiredMerchantHandler {
    public static final void UseHiredMerchant(SeekableLittleEndianAccessor slea, MapleClient c) {
        int year = Calendar.getInstance().get(1);
        int month = Calendar.getInstance().get(2);
        int date = Calendar.getInstance().get(5);
        int hour = Calendar.getInstance().get(11);
        int minute = Calendar.getInstance().get(12);
        int second = Calendar.getInstance().get(13);
        if (c.getPlayer().getMap().allowPersonalShop()) {
            byte state = HiredMerchantHandler.checkExistance(c.getPlayer().getAccountID(), c.getPlayer().getId());
            switch (state) {
                case 1: {
                    c.getPlayer().dropMessage(1, "\u8bf7\u5148\u53bb\u627e\u5f17\u5170\u5fb7\u91cc\u9886\u53d6\u4f60\u4e4b\u524d\u6446\u644a\u7684\u4e1c\u897f");
                    break;
                }
                case 0: {
                    boolean merch = World.hasMerchant(c.getPlayer().getAccountID());
                    if (!merch) {
                        c.getSession().write((Object)PlayerShopPacket.sendTitleBox());
                        break;
                    }
                    c.getPlayer().dropMessage(1, "\u8bf7\u6362\u4e2a\u5730\u65b9\u5f00\u6216\u8005\u662f\u4f60\u5df2\u7ecf\u6709\u5f00\u5e97\u4e86");
                    break;
                }
                default: {
                    c.getPlayer().dropMessage(1, "An unknown error occured.");
                    break;
                }
            }
        } else {
            c.getSession().close();
        }
    }

    private static final byte checkExistance(int accid, int charid) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * from hiredmerch where accountid = ? OR characterid = ?");
            ps.setInt(1, accid);
            ps.setInt(2, charid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ps.close();
                rs.close();
                return 1;
            }
            rs.close();
            ps.close();
            return 0;
        }
        catch (SQLException se) {
            return -1;
        }
    }

    public static void MerchantItemStore(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer() == null) {
            return;
        }
        byte operation = slea.readByte();
        switch (operation) {
            case 20: {
                slea.readMapleAsciiString();
                int conv = c.getPlayer().getConversation();
                boolean merch = World.hasMerchant(c.getPlayer().getAccountID());
                if (merch) {
                    c.getPlayer().dropMessage(1, "\u8bf7\u5173\u95ed\u5546\u5e97\u540e\u518d\u8bd5\u4e00\u6b21.");
                    c.getPlayer().setConversation(0);
                    break;
                }
                if (conv != 3) break;
                MerchItemPackage pack = HiredMerchantHandler.loadItemFrom_Database(c.getPlayer().getId(), c.getPlayer().getAccountID());
                if (pack == null) {
                    c.getPlayer().dropMessage(1, "\u4f60\u6ca1\u6709\u7269\u54c1\u53ef\u4ee5\u9886\u53d6!");
                    c.getPlayer().setConversation(0);
                    break;
                }
                if (pack.getItems().size() <= 0) {
                    if (!HiredMerchantHandler.check(c.getPlayer(), pack)) {
                        c.getSession().write((Object)PlayerShopPacket.merchItem_Message((byte)33));
                        return;
                    }
                    if (HiredMerchantHandler.deletePackage(c.getPlayer().getId(), c.getPlayer().getAccountID(), pack.getPackageid())) {
                        c.getPlayer().gainMeso(pack.getMesos(), false);
                        c.getSession().write((Object)PlayerShopPacket.merchItem_Message((byte)29));
                        break;
                    }
                    c.getPlayer().dropMessage(1, "\u53d1\u751f\u672a\u77e5\u9519\u8bef\u3002");
                    break;
                }
                c.getSession().write((Object)PlayerShopPacket.merchItemStore_ItemData(pack));
                break;
            }
            case 25: {
                if (c.getPlayer().getConversation() != 3) {
                    return;
                }
                c.getSession().write((Object)PlayerShopPacket.merchItemStore((byte)36));
                break;
            }
            case 26: {
                if (c.getPlayer().getConversation() != 3) {
                    return;
                }
                MerchItemPackage pack = HiredMerchantHandler.loadItemFrom_Database(c.getPlayer().getId(), c.getPlayer().getAccountID());
                if (pack == null) {
                    c.getPlayer().dropMessage(1, "\u53d1\u751f\u672a\u77e5\u9519\u8bef\u3002\r\n\u4f60\u6ca1\u6709\u7269\u54c1\u53ef\u4ee5\u9886\u53d6\uff01");
                    return;
                }
                if (!HiredMerchantHandler.check(c.getPlayer(), pack)) {
                    c.getSession().write((Object)PlayerShopPacket.merchItem_Message((byte)33));
                    return;
                }
                if (HiredMerchantHandler.deletePackage(c.getPlayer().getId(), c.getPlayer().getAccountID(), pack.getPackageid())) {
                    c.getPlayer().gainMeso(pack.getMesos(), false);
                    for (IItem item : pack.getItems()) {
                        MapleInventoryManipulator.addFromDrop(c, item, false);
                    }
                    c.getSession().write((Object)PlayerShopPacket.merchItem_Message((byte)29));
                    break;
                }
                c.getPlayer().dropMessage(1, "An unknown error occured.");
                break;
            }
            case 27: {
                c.getPlayer().setConversation(0);
            }
        }
    }

    private static void getShopItem(MapleClient c) {
        if (c.getPlayer().getConversation() != 3) {
            return;
        }
        MerchItemPackage pack = HiredMerchantHandler.loadItemFrom_Database(c.getPlayer().getId(), c.getPlayer().getAccountID());
        if (pack == null) {
            c.getPlayer().dropMessage(1, "\u53d1\u751f\u672a\u77e5\u9519\u8bef\u3002");
            return;
        }
        if (!HiredMerchantHandler.check(c.getPlayer(), pack)) {
            c.getPlayer().dropMessage(1, "\u4f60\u80cc\u5305\u683c\u5b50\u4e0d\u591f\u3002");
            return;
        }
        if (HiredMerchantHandler.deletePackage(c.getPlayer().getId(), c.getPlayer().getAccountID(), pack.getPackageid())) {
            c.getPlayer().gainMeso(pack.getMesos(), false);
            for (IItem item : pack.getItems()) {
                MapleInventoryManipulator.addFromDrop(c, item, false);
            }
            c.getPlayer().dropMessage(5, "\u9886\u53d6\u6210\u529f\u3002");
        } else {
            c.getPlayer().dropMessage(1, "\u53d1\u751f\u672a\u77e5\u9519\u8bef\u3002");
        }
    }

    private static final boolean check(MapleCharacter chr, MerchItemPackage pack) {
        if (chr.getMeso() + pack.getMesos() < 0) {
            return false;
        }
        short eq = 0;
        short use = 0;
        short setup = 0;
        short etc = 0;
        short cash = 0;
        for (IItem item : pack.getItems()) {
            MapleInventoryType invtype = GameConstants.getInventoryType(item.getItemId());
            if (invtype == MapleInventoryType.EQUIP) {
                eq = (byte)(eq + 1);
                continue;
            }
            if (invtype == MapleInventoryType.USE) {
                use = (byte)(use + 1);
                continue;
            }
            if (invtype == MapleInventoryType.SETUP) {
                setup = (byte)(setup + 1);
                continue;
            }
            if (invtype == MapleInventoryType.ETC) {
                etc = (byte)(etc + 1);
                continue;
            }
            if (invtype != MapleInventoryType.CASH) continue;
            cash = (byte)(cash + 1);
        }
        return chr.getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() > eq && chr.getInventory(MapleInventoryType.USE).getNumFreeSlot() > use && chr.getInventory(MapleInventoryType.SETUP).getNumFreeSlot() > setup && chr.getInventory(MapleInventoryType.ETC).getNumFreeSlot() > etc && chr.getInventory(MapleInventoryType.CASH).getNumFreeSlot() > cash;
    }

    private static final boolean deletePackage(int charid, int accid, int packageid) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("DELETE from hiredmerch where characterid = ? OR accountid = ? OR packageid = ?");
            ps.setInt(1, charid);
            ps.setInt(2, accid);
            ps.setInt(3, packageid);
            ps.execute();
            ps.close();
            ItemLoader.HIRED_MERCHANT.saveItems(null, packageid, accid, charid);
            return true;
        }
        catch (SQLException e) {
            return false;
        }
    }

    private static final MerchItemPackage loadItemFrom_Database(int charid, int accountid) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * from hiredmerch where characterid = ? OR accountid = ?");
            ps.setInt(1, charid);
            ps.setInt(2, accountid);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                ps.close();
                rs.close();
                return null;
            }
            int packageid = rs.getInt("PackageId");
            MerchItemPackage pack = new MerchItemPackage();
            pack.setPackageid(packageid);
            pack.setMesos(rs.getInt("Mesos"));
            pack.setSentTime(rs.getLong("time"));
            ps.close();
            rs.close();
            Map<Integer, Pair<IItem, MapleInventoryType>> items = ItemLoader.HIRED_MERCHANT.loadItems(false, packageid, accountid, charid);
            if (items != null) {
                ArrayList<IItem> iters = new ArrayList<IItem>();
                for (Pair<IItem, MapleInventoryType> z : items.values()) {
                    iters.add((IItem)z.left);
                }
                pack.setItems(iters);
            }
            return pack;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}

