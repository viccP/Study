/*
 * Decompiled with CFR 0.148.
 */
package handling.channel;

import database.DatabaseConnection;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

public class MapleGuildRanking {
    private static MapleGuildRanking instance = new MapleGuildRanking();
    private List<GuildRankingInfo> ranks = new LinkedList<GuildRankingInfo>();

    public static MapleGuildRanking getInstance() {
        return instance;
    }

    public List<GuildRankingInfo> getRank() {
        if (this.ranks.isEmpty()) {
            this.reload();
        }
        return this.ranks;
    }

    private void reload() {
        this.ranks.clear();
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM guilds ORDER BY `GP` DESC LIMIT 50");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                GuildRankingInfo rank = new GuildRankingInfo(rs.getString("name"), rs.getInt("GP"), rs.getInt("logo"), rs.getInt("logoColor"), rs.getInt("logoBG"), rs.getInt("logoBGColor"));
                this.ranks.add(rank);
            }
            ps.close();
            rs.close();
        }
        catch (SQLException e) {
            System.err.println("Error handling guildRanking");
            e.printStackTrace();
        }finally {
			try {
				if(con!=null) con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
    }

    public static class GuildRankingInfo {
        private String name;
        private int gp;
        private int logo;
        private int logocolor;
        private int logobg;
        private int logobgcolor;

        public GuildRankingInfo(String name, int gp, int logo, int logocolor, int logobg, int logobgcolor) {
            this.name = name;
            this.gp = gp;
            this.logo = logo;
            this.logocolor = logocolor;
            this.logobg = logobg;
            this.logobgcolor = logobgcolor;
        }

        public String getName() {
            return this.name;
        }

        public int getGP() {
            return this.gp;
        }

        public int getLogo() {
            return this.logo;
        }

        public int getLogoColor() {
            return this.logocolor;
        }

        public int getLogoBg() {
            return this.logobg;
        }

        public int getLogoBgColor() {
            return this.logobgcolor;
        }
    }

}

