/*
 * Decompiled with CFR 0.148.
 */
package server.life;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import client.inventory.MapleInventoryType;
import constants.GameConstants;
import database.DatabaseConnection;

public class MapleMonsterInformationProvider {
    private static final MapleMonsterInformationProvider instance = new MapleMonsterInformationProvider();
    private final Map<Integer, List<MonsterDropEntry>> drops = new HashMap<Integer, List<MonsterDropEntry>>();
    private final List<MonsterGlobalDropEntry> globaldrops = new ArrayList<MonsterGlobalDropEntry>();

    protected MapleMonsterInformationProvider() {
        this.retrieveGlobal();
    }

    public static final MapleMonsterInformationProvider getInstance() {
        return instance;
    }

    public final List<MonsterGlobalDropEntry> getGlobalDrop() {
        return this.globaldrops;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    private final void retrieveGlobal() {
        PreparedStatement ps = null;
        ResultSet rs = null;
        Connection con = DatabaseConnection.getConnection();
        try {
            ps = con.prepareStatement("SELECT * FROM drop_data_global WHERE chance > 0");
            rs = ps.executeQuery();
            while (rs.next()) {
                this.globaldrops.add(new MonsterGlobalDropEntry(rs.getInt("itemid"), rs.getInt("chance"), rs.getInt("continent"), rs.getByte("dropType"), rs.getInt("minimum_quantity"), rs.getInt("maximum_quantity"), rs.getShort("questid")));
            }
            rs.close();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("Error retrieving drop" + e);
        }
        finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
        		if(con!=null) con.close();
            }
            catch (SQLException ignore) {}
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final List<MonsterDropEntry> retrieveDrop(int monsterId) {
        if (this.drops.containsKey(monsterId)) {
            return this.drops.get(monsterId);
        }
        LinkedList<MonsterDropEntry> ret = new LinkedList<MonsterDropEntry>();
        PreparedStatement ps = null;
        ResultSet rs = null;
        Connection con = DatabaseConnection.getConnection();
        try {
            ps = con.prepareStatement("SELECT * FROM drop_data WHERE dropperid = ?");
            ps.setInt(1, monsterId);
            rs = ps.executeQuery();
            while (rs.next()) {
                int itemid = rs.getInt("itemid");
                int chance = rs.getInt("chance");
                if (GameConstants.getInventoryType(itemid) == MapleInventoryType.EQUIP) {
                    chance /= 4;
                }
                ret.add(new MonsterDropEntry(itemid, chance, rs.getInt("minimum_quantity"), rs.getInt("maximum_quantity"), rs.getShort("questid")));
            }
        }
        catch (SQLException e) {
            LinkedList<MonsterDropEntry> chance = ret;
            return chance;
        }
        finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
        		if(con!=null) con.close();
            }
            catch (SQLException ignore) {
                return ret;
            }
        }
        this.drops.put(monsterId, ret);
        return ret;
    }

    public final void clearDrops() {
        this.drops.clear();
        this.globaldrops.clear();
        this.retrieveGlobal();
    }
}

