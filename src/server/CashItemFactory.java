/*
 * Decompiled with CFR 0.148.
 */
package server;

import database.DatabaseConnection;
import java.io.File;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.CashItemInfo;

public class CashItemFactory {
    private static final CashItemFactory instance = new CashItemFactory();
    private static final int[] bestItems = new int[]{50100010, 50100010, 50100010, 50100010, 50100010};
    private boolean initialized = false;
    private final Map<Integer, CashItemInfo> itemStats = new HashMap<Integer, CashItemInfo>();
    private final Map<Integer, List<CashItemInfo>> itemPackage = new HashMap<Integer, List<CashItemInfo>>();
    private final Map<Integer, CashItemInfo.CashModInfo> itemMods = new HashMap<Integer, CashItemInfo.CashModInfo>();
    private final MapleDataProvider data = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/Etc.wz"));
    private final MapleDataProvider itemStringInfo = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/String.wz"));
    private Map<Integer, Integer> idLookup = new HashMap<Integer, Integer>();

    public static final CashItemFactory getInstance() {
        return instance;
    }

    protected CashItemFactory() {
    }

    public void initialize() {
        System.out.println("Loading CashItemFactory :::");
        ArrayList<Integer> itemids = new ArrayList<Integer>();
        for (MapleData field : this.data.getData("Commodity.img").getChildren()) {
            int SN = MapleDataTool.getIntConvert("SN", field, 0);
            int itemId = MapleDataTool.getIntConvert("ItemId", field, 0);
            CashItemInfo stats = new CashItemInfo(itemId, MapleDataTool.getIntConvert("Count", field, 1), MapleDataTool.getIntConvert("Price", field, 0), SN, MapleDataTool.getIntConvert("Period", field, 0), MapleDataTool.getIntConvert("Gender", field, 2), MapleDataTool.getIntConvert("OnSale", field, 0) > 0);
            if (SN > 0) {
                this.itemStats.put(SN, stats);
                this.idLookup.put(itemId, SN);
            }
            if (itemId <= 0) continue;
            itemids.add(itemId);
        }
        Iterator<Integer> i$ = itemids.iterator();
        while (i$.hasNext()) {
            int i = (Integer)((Object)i$.next());
            this.getPackageItems(i);
        }
        i$ = this.itemStats.keySet().iterator();
        while (i$.hasNext()) {
            int i = (Integer)i$.next();
            this.getModInfo(i);
            this.getItem(i);
        }
        this.initialized = true;
    }

    public final CashItemInfo getItem(int sn) {
        CashItemInfo stats = this.itemStats.get(sn);
        CashItemInfo.CashModInfo z = this.getModInfo(sn);
        if (z != null && z.showUp) {
            return z.toCItem(stats);
        }
        if (stats == null || !stats.onSale()) {
            return null;
        }
        return stats;
    }

    public final List<CashItemInfo> getPackageItems(int itemId) {
        if (this.itemPackage.get(itemId) != null) {
            return this.itemPackage.get(itemId);
        }
        ArrayList<CashItemInfo> packageItems = new ArrayList<CashItemInfo>();
        MapleData b = this.data.getData("CashPackage.img");
        if (b == null || b.getChildByPath(itemId + "/SN") == null) {
            return null;
        }
        for (MapleData d : b.getChildByPath(itemId + "/SN").getChildren()) {
            packageItems.add(this.itemStats.get(MapleDataTool.getIntConvert(d)));
        }
        this.itemPackage.put(itemId, packageItems);
        return packageItems;
    }

    public final CashItemInfo.CashModInfo getModInfo(int sn) {
        CashItemInfo.CashModInfo ret = this.itemMods.get(sn);
        if (ret == null) {
            if (this.initialized) {
                return null;
            }
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM cashshop_modified_items WHERE serial = ?");
                ps.setInt(1, sn);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    ret = new CashItemInfo.CashModInfo(sn, rs.getInt("discount_price"), rs.getInt("mark"), rs.getInt("showup") > 0, rs.getInt("itemid"), rs.getInt("priority"), rs.getInt("package") > 0, rs.getInt("period"), rs.getInt("gender"), rs.getInt("count"), rs.getInt("meso"), rs.getInt("unk_1"), rs.getInt("unk_2"), rs.getInt("unk_3"), rs.getInt("extra_flags"));
                    this.itemMods.put(sn, ret);
                }
                rs.close();
                ps.close();
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        return ret;
    }

    public final int getItemSN(int itemid) {
        for (Map.Entry<Integer, CashItemInfo> ci : this.itemStats.entrySet()) {
            if (ci.getValue().getId() != itemid) continue;
            return ci.getValue().getSN();
        }
        return 0;
    }

    public final Collection<CashItemInfo.CashModInfo> getAllModInfo() {
        if (!this.initialized) {
            this.initialize();
        }
        return this.itemMods.values();
    }

    public final int[] getBestItems() {
        return bestItems;
    }

    public int getSnFromId(int itemId) {
        return this.idLookup.get(itemId);
    }

    public final void clearCashShop() {
        this.itemStats.clear();
        this.itemPackage.clear();
        this.itemMods.clear();
        this.idLookup.clear();
        this.initialized = false;
        this.initialize();
    }
}

