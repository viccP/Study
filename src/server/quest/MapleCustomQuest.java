/*
 * Decompiled with CFR 0.148.
 */
package server.quest;

import database.DatabaseConnection;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.PrintStream;
import java.io.Serializable;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import provider.MapleData;
import server.quest.MapleCustomQuestData;
import server.quest.MapleQuest;
import server.quest.MapleQuestAction;
import server.quest.MapleQuestActionType;
import server.quest.MapleQuestRequirement;
import server.quest.MapleQuestRequirementType;

public class MapleCustomQuest
extends MapleQuest
implements Serializable {
    private static final long serialVersionUID = 9179541993413738569L;

    public MapleCustomQuest(int id) {
        super(id);
        Connection con = DatabaseConnection.getConnection();
        try {
            MapleCustomQuestData data;
            PreparedStatement ps = con.prepareStatement("SELECT * FROM questrequirements WHERE questid = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Blob blob = rs.getBlob("data");
                ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(blob.getBytes(1L, (int)blob.length())));
                data = (MapleCustomQuestData)ois.readObject();
                MapleQuestRequirement req = new MapleQuestRequirement(this, MapleQuestRequirementType.getByWZName(data.getName()), data);
                byte status = rs.getByte("status");
                if (status == 0) {
                    this.startReqs.add(req);
                    continue;
                }
                if (status != 1) continue;
                this.completeReqs.add(req);
            }
            rs.close();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM questactions WHERE questid = ?");
            ps.setInt(1, id);
            rs = ps.executeQuery();
            while (rs.next()) {
                Blob blob = rs.getBlob("data");
                ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(blob.getBytes(1L, (int)blob.length())));
                data = (MapleCustomQuestData)ois.readObject();
                MapleQuestAction act = new MapleQuestAction(MapleQuestActionType.getByWZName(data.getName()), data, this);
                byte status = rs.getByte("status");
                if (status == 0) {
                    this.startActs.add(act);
                    continue;
                }
                if (status != 1) continue;
                this.completeActs.add(act);
            }
            rs.close();
            ps.close();
        }
        catch (Exception ex) {
            ex.printStackTrace();
            System.err.println("Error loading custom quest from SQL." + ex);
        }
        finally {
			try {
				if(con!=null) con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
    }
}

