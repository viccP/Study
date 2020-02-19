/*
 * Decompiled with CFR 0.148.
 */
package server;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import database.DatabaseConnection;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.CashItemInfo.CashModInfo;

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
        List<Integer> itemids = new ArrayList<>();
        for (MapleData field : this.data.getData("Commodity.img").getChildren()) {
            int SN = MapleDataTool.getIntConvert("SN", field, 0);
            int itemId = MapleDataTool.getIntConvert("ItemId", field, 0);
            int count=MapleDataTool.getIntConvert("Count", field, 1);
            int price=MapleDataTool.getIntConvert("Price", field, 0);
            int expire=MapleDataTool.getIntConvert("Period", field, 0);
            int gender=MapleDataTool.getIntConvert("Gender", field, 2);
            boolean sale=MapleDataTool.getIntConvert("OnSale", field, 0) > 0;
            CashItemInfo stats = new CashItemInfo(itemId, count, price, SN, expire,gender ,sale );
            if (SN > 0) {
                this.itemStats.put(SN, stats);
                this.idLookup.put(itemId, SN);
            }
            if (itemId <= 0) continue;
            itemids.add(itemId);
        }
        
        for(Integer itemid:itemids) {
        	 this.getPackageItems(itemid);
        }
        //设置全部ModInfo
        setModCashInfoAll(this.itemStats.keySet());
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
            Connection con = DatabaseConnection.getConnection();
            try {
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
            }finally {
    			try {
    				if(con!=null) con.close();
    			} catch (SQLException e) {
    				e.printStackTrace();
    			}
    		}
        }
        return ret;
    }
    
    /**
     * 设置全部的商品信息
     * @param set
     */
    public final void setModCashInfoAll(Set<Integer> set) {
    	Connection con = DatabaseConnection.getConnection();
    	try {
            for(Integer sn:set) {
            	PreparedStatement ps = con.prepareStatement("SELECT * FROM cashshop_modified_items WHERE serial = ?");
                ps.setInt(1, sn);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    CashModInfo ret = new CashItemInfo.CashModInfo(sn, rs.getInt("discount_price"), rs.getInt("mark"), rs.getInt("showup") > 0, rs.getInt("itemid"), rs.getInt("priority"), rs.getInt("package") > 0, rs.getInt("period"), rs.getInt("gender"), rs.getInt("count"), rs.getInt("meso"), rs.getInt("unk_1"), rs.getInt("unk_2"), rs.getInt("unk_3"), rs.getInt("extra_flags"));
                    this.itemMods.put(sn, ret);
                    CashItemInfo stats = this.itemStats.get(sn);
                    if (ret != null && ret.showUp) {
                        ret.toCItem(stats);
                    }
                }
                rs.close();
                ps.close();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }finally {
			try {
				if(con!=null) con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
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

