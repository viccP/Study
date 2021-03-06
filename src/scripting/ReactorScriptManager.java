/*
 * Decompiled with CFR 0.148.
 */
package scripting;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.script.Invocable;
import javax.script.ScriptEngine;

import client.MapleClient;
import database.DatabaseConnection;
import server.maps.MapleReactor;
import server.maps.ReactorDropEntry;
import tools.FileoutputUtil;

public class ReactorScriptManager
extends AbstractScriptManager {
    private static final ReactorScriptManager instance = new ReactorScriptManager();
    private final Map<Integer, List<ReactorDropEntry>> drops = new HashMap<Integer, List<ReactorDropEntry>>();

    public static final ReactorScriptManager getInstance() {
        return instance;
    }

    public final void act(MapleClient c, MapleReactor reactor) {
        try {
            Invocable iv;
            if (c.getPlayer().isGM()) {
                c.getPlayer().dropMessage("[系统提示]您已经建立与reactor:" + reactor.getReactorId() + "的对话。");
            }
            if ((iv = this.getInvocable("reactor/" + reactor.getReactorId() + ".js", c)) == null) {
                return;
            }
            ScriptEngine scriptengine = (ScriptEngine)((Object)iv);
            ReactorActionManager rm = new ReactorActionManager(c, reactor);
            scriptengine.put("rm", rm);
            iv.invokeFunction("act", new Object[0]);
        }
        catch (Exception e) {
            System.err.println("Error executing reactor script. ReactorID: " + reactor.getReactorId() + ", ReactorName: " + reactor.getName() + ":" + e);
            FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Error executing reactor script. ReactorID: " + reactor.getReactorId() + ", ReactorName: " + reactor.getName() + ":" + e);
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final List<ReactorDropEntry> getDrops(int rid) {
        List<ReactorDropEntry> ret = this.drops.get(rid);
        if (ret != null) {
            return ret;
        }
        ret = new LinkedList<ReactorDropEntry>();
        PreparedStatement ps = null;
        ResultSet rs = null;
        Connection con = DatabaseConnection.getConnection();
        try {
            ps = con.prepareStatement("SELECT * FROM reactordrops WHERE reactorid = ?");
            ps.setInt(1, rid);
            rs = ps.executeQuery();
            while (rs.next()) {
                ret.add(new ReactorDropEntry(rs.getInt("itemid"), rs.getInt("chance"), rs.getInt("questid")));
            }
            rs.close();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("Could not retrieve drops for reactor " + rid + e);
            List<ReactorDropEntry> list = ret;
            return list;
        }
        finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
                
                if(con!=null) con.close();
            }
            catch (SQLException ignore) {
                return ret;
            }
        }
        this.drops.put(rid, ret);
        return ret;
    }

    public final void clearDrops() {
        this.drops.clear();
    }
}