/*
 * Decompiled with CFR 0.148.
 */
package client;

import database.DatabaseConnection;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import tools.Pair;
import tools.data.output.MaplePacketLittleEndianWriter;

public class MapleKeyLayout
implements Serializable {
    private static final long serialVersionUID = 9179541993413738569L;
    private boolean changed = false;
    private Map<Integer, Pair<Byte, Integer>> keymap;

    public MapleKeyLayout() {
        this.keymap = new HashMap<Integer, Pair<Byte, Integer>>();
    }

    public MapleKeyLayout(Map<Integer, Pair<Byte, Integer>> keys) {
        this.keymap = keys;
    }

    public final Map<Integer, Pair<Byte, Integer>> Layout() {
        this.changed = true;
        return this.keymap;
    }

    public void unchanged() {
        this.changed = false;
    }

    public final void writeData(MaplePacketLittleEndianWriter mplew) {
        mplew.write(this.keymap.isEmpty() ? 1 : 0);
        if (this.keymap.isEmpty()) {
            return;
        }
        for (int x = 0; x < 90; ++x) {
            Pair<Byte, Integer> binding = this.keymap.get(x);
            if (binding != null) {
                mplew.write(binding.getLeft());
                mplew.writeInt(binding.getRight());
                continue;
            }
            mplew.write(0);
            mplew.writeInt(0);
        }
    }

    public final void saveKeys(int charid) throws SQLException {
        if (!this.changed) {
            return;
        }
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("DELETE FROM keymap WHERE characterid = ?");
        ps.setInt(1, charid);
        ps.execute();
        ps.close();
        if (this.keymap.isEmpty()) {
            return;
        }
        boolean first = true;
        StringBuilder query = new StringBuilder();
        for (Map.Entry<Integer, Pair<Byte, Integer>> keybinding : this.keymap.entrySet()) {
            if (first) {
                first = false;
                query.append("INSERT INTO keymap VALUES (");
            } else {
                query.append(",(");
            }
            query.append("DEFAULT,");
            query.append(charid).append(",");
            query.append(keybinding.getKey()).append(",");
            query.append(keybinding.getValue().getLeft().byteValue()).append(",");
            query.append(keybinding.getValue().getRight()).append(")");
        }
        ps = con.prepareStatement(query.toString());
        ps.execute();
        ps.close();
    }
}

