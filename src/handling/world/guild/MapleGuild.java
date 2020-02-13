/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.world.guild;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import client.MapleCharacter;
import client.MapleCharacterUtil;
import client.MapleClient;
import database.DatabaseConnection;
import handling.MaplePacket;
import handling.world.World;
import tools.MaplePacketCreator;
import tools.StringUtil;
import tools.data.output.MaplePacketLittleEndianWriter;
import tools.packet.UIPacket;

public class MapleGuild
implements Serializable {
    public static final long serialVersionUID = 6322150443228168192L;
    private final List<MapleGuildCharacter> members = new CopyOnWriteArrayList<MapleGuildCharacter>();
    private final String[] rankTitles = new String[5];
    private String name;
    private String notice;
    private int id;
    private int gp;
    private int logo;
    private int logoColor;
    private int leader;
    private int capacity;
    private int logoBG;
    private int logoBGColor;
    private int signature;
    private boolean bDirty = true;
    private boolean proper = true;
    private int allianceid = 0;
    private int invitedid = 0;
    private final Map<Integer, MapleBBSThread> bbs = new HashMap<Integer, MapleBBSThread>();
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private final Lock rL = this.lock.readLock();
    private final Lock wL = this.lock.writeLock();
    private boolean init = false;

    public MapleGuild(int guildid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM guilds WHERE guildid = ?");
            ps.setInt(1, guildid);
            ResultSet rs = ps.executeQuery();
            if (!rs.first()) {
                rs.close();
                ps.close();
                this.id = -1;
                return;
            }
            this.id = guildid;
            this.name = rs.getString("name");
            this.gp = rs.getInt("GP");
            this.logo = rs.getInt("logo");
            this.logoColor = rs.getInt("logoColor");
            this.logoBG = rs.getInt("logoBG");
            this.logoBGColor = rs.getInt("logoBGColor");
            this.capacity = rs.getInt("capacity");
            this.rankTitles[0] = rs.getString("rank1title");
            this.rankTitles[1] = rs.getString("rank2title");
            this.rankTitles[2] = rs.getString("rank3title");
            this.rankTitles[3] = rs.getString("rank4title");
            this.rankTitles[4] = rs.getString("rank5title");
            this.leader = rs.getInt("leader");
            this.notice = rs.getString("notice");
            this.signature = rs.getInt("signature");
            this.allianceid = rs.getInt("alliance");
            rs.close();
            ps.close();
            ps = con.prepareStatement("SELECT id, name, level, job, guildrank, alliancerank FROM characters WHERE guildid = ? ORDER BY guildrank ASC, name ASC");
            ps.setInt(1, guildid);
            rs = ps.executeQuery();
            if (!rs.first()) {
                System.err.println("No members in guild " + this.id + ".  Impossible... guild is disbanding");
                rs.close();
                ps.close();
                this.writeToDB(true);
                this.proper = false;
                return;
            }
            boolean leaderCheck = false;
            do {
                if (rs.getInt("id") == this.leader) {
                    leaderCheck = true;
                }
                this.members.add(new MapleGuildCharacter(rs.getInt("id"), rs.getShort("level"), rs.getString("name"), (byte) -1, rs.getInt("job"), rs.getByte("guildrank"), guildid, rs.getByte("alliancerank"), false));
            } while (rs.next());
            rs.close();
            ps.close();
            if (!leaderCheck) {
                System.err.println("Leader " + this.leader + " isn't in guild " + this.id + ".  Impossible... guild is disbanding.");
                this.writeToDB(true);
                this.proper = false;
                return;
            }
            ps = con.prepareStatement("SELECT * FROM bbs_threads WHERE guildid = ? ORDER BY localthreadid DESC");
            ps.setInt(1, guildid);
            rs = ps.executeQuery();
            while (rs.next()) {
                MapleBBSThread thread = new MapleBBSThread(rs.getInt("localthreadid"), rs.getString("name"), rs.getString("startpost"), rs.getLong("timestamp"), guildid, rs.getInt("postercid"), rs.getInt("icon"));
                PreparedStatement pse = con.prepareStatement("SELECT * FROM bbs_replies WHERE threadid = ?");
                pse.setInt(1, rs.getInt("threadid"));
                ResultSet rse = pse.executeQuery();
                while (rse.next()) {
                    thread.replies.put(thread.replies.size(), new MapleBBSThread.MapleBBSReply(thread.replies.size(), rse.getInt("postercid"), rse.getString("content"), rse.getLong("timestamp")));
                }
                rse.close();
                pse.close();
                this.bbs.put(rs.getInt("localthreadid"), thread);
            }
            rs.close();
            ps.close();
        }
        catch (SQLException se) {
            System.err.println("unable to read guild information from sql");
            se.printStackTrace();
        }
    }

    public boolean isProper() {
        return this.proper;
    }

    public static final Collection<MapleGuild> loadAll() {
        ArrayList<MapleGuild> ret = new ArrayList<MapleGuild>();
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT guildid FROM guilds");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                MapleGuild g = new MapleGuild(rs.getInt("guildid"));
                if (g.getId() <= 0) continue;
                ret.add(g);
            }
            rs.close();
            ps.close();
        }
        catch (SQLException se) {
            System.err.println("unable to read guild information from sql");
            se.printStackTrace();
        }
        return ret;
    }

    public final void writeToDB(boolean bDisband) {
        try {
            Connection con = DatabaseConnection.getConnection();
            if (!bDisband) {
                StringBuilder buf = new StringBuilder("UPDATE guilds SET GP = ?, logo = ?, logoColor = ?, logoBG = ?, logoBGColor = ?, ");
                for (int i = 1; i < 6; ++i) {
                    buf.append("rank" + i + "title = ?, ");
                }
                buf.append("capacity = ?, notice = ?, alliance = ? WHERE guildid = ?");
                PreparedStatement ps = con.prepareStatement(buf.toString());
                ps.setInt(1, this.gp);
                ps.setInt(2, this.logo);
                ps.setInt(3, this.logoColor);
                ps.setInt(4, this.logoBG);
                ps.setInt(5, this.logoBGColor);
                ps.setString(6, this.rankTitles[0]);
                ps.setString(7, this.rankTitles[1]);
                ps.setString(8, this.rankTitles[2]);
                ps.setString(9, this.rankTitles[3]);
                ps.setString(10, this.rankTitles[4]);
                ps.setInt(11, this.capacity);
                ps.setString(12, this.notice);
                ps.setInt(13, this.allianceid);
                ps.setInt(14, this.id);
                ps.execute();
                ps.close();
                ps = con.prepareStatement("DELETE FROM bbs_threads WHERE guildid = ?");
                ps.setInt(1, this.id);
                ps.execute();
                ps.close();
                ps = con.prepareStatement("DELETE FROM bbs_replies WHERE guildid = ?");
                ps.setInt(1, this.id);
                ps.execute();
                ps.close();
                ps = con.prepareStatement("INSERT INTO bbs_threads(`postercid`, `name`, `timestamp`, `icon`, `startpost`, `guildid`, `localthreadid`) VALUES(?, ?, ?, ?, ?, ?, ?)", 1);
                ps.setInt(6, this.id);
                for (MapleBBSThread bb : this.bbs.values()) {
                    ps.setInt(1, bb.ownerID);
                    ps.setString(2, bb.name);
                    ps.setLong(3, bb.timestamp);
                    ps.setInt(4, bb.icon);
                    ps.setString(5, bb.text);
                    ps.setInt(7, bb.localthreadID);
                    ps.executeUpdate();
                    ResultSet rs = ps.getGeneratedKeys();
                    if (!rs.next()) {
                        rs.close();
                        continue;
                    }
                    PreparedStatement pse = con.prepareStatement("INSERT INTO bbs_replies (`threadid`, `postercid`, `timestamp`, `content`, `guildid`) VALUES (?, ?, ?, ?, ?)");
                    pse.setInt(5, this.id);
                    for (MapleBBSThread.MapleBBSReply r : bb.replies.values()) {
                        pse.setInt(1, rs.getInt(1));
                        pse.setInt(2, r.ownerID);
                        pse.setLong(3, r.timestamp);
                        pse.setString(4, r.content);
                        pse.execute();
                    }
                    pse.close();
                    rs.close();
                }
                ps.close();
            } else {
                MapleGuildAlliance alliance;
                PreparedStatement ps = con.prepareStatement("UPDATE characters SET guildid = 0, guildrank = 5, alliancerank = 5 WHERE guildid = ?");
                ps.setInt(1, this.id);
                ps.execute();
                ps.close();
                ps = con.prepareStatement("DELETE FROM bbs_threads WHERE guildid = ?");
                ps.setInt(1, this.id);
                ps.execute();
                ps.close();
                ps = con.prepareStatement("DELETE FROM bbs_replies WHERE guildid = ?");
                ps.setInt(1, this.id);
                ps.execute();
                ps.close();
                ps = con.prepareStatement("DELETE FROM guilds WHERE guildid = ?");
                ps.setInt(1, this.id);
                ps.execute();
                ps.close();
                if (this.allianceid > 0 && (alliance = World.Alliance.getAlliance(this.allianceid)) != null) {
                    alliance.removeGuild(this.id, false);
                }
                this.broadcast(MaplePacketCreator.guildDisband(this.id));
            }
        }
        catch (SQLException se) {
            System.err.println("Error saving guild to SQL");
            se.printStackTrace();
        }
    }

    public final int getId() {
        return this.id;
    }

    public final int getLeaderId() {
        return this.leader;
    }

    public final MapleCharacter getLeader(MapleClient c) {
        return c.getChannelServer().getPlayerStorage().getCharacterById(this.leader);
    }

    public final int getGP() {
        return this.gp;
    }

    public final int getLogo() {
        return this.logo;
    }

    public final void setLogo(int l) {
        this.logo = l;
    }

    public final int getLogoColor() {
        return this.logoColor;
    }

    public final void setLogoColor(int c) {
        this.logoColor = c;
    }

    public final int getLogoBG() {
        return this.logoBG;
    }

    public final void setLogoBG(int bg) {
        this.logoBG = bg;
    }

    public final int getLogoBGColor() {
        return this.logoBGColor;
    }

    public final void setLogoBGColor(int c) {
        this.logoBGColor = c;
    }

    public final String getNotice() {
        if (this.notice == null) {
            return "";
        }
        return this.notice;
    }

    public final String getName() {
        return this.name;
    }

    public final void setName(String name) {
        this.name = name;
    }

    public final int getCapacity() {
        return this.capacity;
    }

    public final int getSignature() {
        return this.signature;
    }

    public final void broadcast(MaplePacket packet) {
        this.broadcast(packet, -1, BCOp.NONE);
    }

    public final void broadcast(MaplePacket packet, int exception) {
        this.broadcast(packet, exception, BCOp.NONE);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void broadcast(MaplePacket packet, int exceptionId, BCOp bcop) {
        this.wL.lock();
        try {
            this.buildNotifications();
        }
        finally {
            this.wL.unlock();
        }
        this.rL.lock();
        try {
            for (MapleGuildCharacter mgc : this.members) {
                if (bcop == BCOp.DISBAND) {
                    if (mgc.isOnline()) {
                        World.Guild.setGuildAndRank(mgc.getId(), 0, 5, 5);
                        continue;
                    }
                    MapleGuild.setOfflineGuildStatus(0, (byte)5, (byte)5, mgc.getId());
                    continue;
                }
                if (!mgc.isOnline() || mgc.getId() == exceptionId) continue;
                if (bcop == BCOp.EMBELMCHANGE) {
                    World.Guild.changeEmblem(this.id, mgc.getId(), new MapleGuildSummary(this));
                    continue;
                }
                World.Broadcast.sendGuildPacket(mgc.getId(), packet, exceptionId, this.id);
            }
        }
        finally {
            this.rL.unlock();
        }
    }

    private final void buildNotifications() {
        if (!this.bDirty) {
            return;
        }
        LinkedList<Integer> mem = new LinkedList<Integer>();
        for (MapleGuildCharacter mgc : this.members) {
            if (!mgc.isOnline()) continue;
            if (mem.contains(mgc.getId()) || mgc.getGuildId() != this.id) {
                this.members.remove(mgc);
                continue;
            }
            mem.add(mgc.getId());
        }
        this.bDirty = false;
    }

    public final void setOnline(int cid, boolean online2, int channel) {
        boolean bBroadcast = true;
        for (MapleGuildCharacter mgc : this.members) {
            if (mgc.getGuildId() != this.id || mgc.getId() != cid) continue;
            if (mgc.isOnline() == online2) {
                bBroadcast = false;
            }
            mgc.setOnline(online2);
            mgc.setChannel((byte)channel);
            break;
        }
        if (bBroadcast) {
            this.broadcast(MaplePacketCreator.guildMemberOnline(this.id, cid, online2), cid);
            if (this.allianceid > 0) {
                World.Alliance.sendGuild(MaplePacketCreator.allianceMemberOnline(this.allianceid, this.id, cid, online2), this.id, this.allianceid);
            }
        }
        this.bDirty = true;
        this.init = true;
    }

    public final void guildChat(String name, int cid, String msg) {
        this.broadcast(MaplePacketCreator.multiChat(name, msg, 2), cid);
    }

    public final void allianceChat(String name, int cid, String msg) {
        this.broadcast(MaplePacketCreator.multiChat(name, msg, 3), cid);
    }

    public final String getRankTitle(int rank) {
        return this.rankTitles[rank - 1];
    }

    public int getAllianceId() {
        return this.allianceid;
    }

    public int getInvitedId() {
        return this.invitedid;
    }

    public void setInvitedId(int iid) {
        this.invitedid = iid;
    }

    public void setAllianceId(int a) {
        this.allianceid = a;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE guilds SET alliance = ? WHERE guildid = ?");
            ps.setInt(1, a);
            ps.setInt(2, this.id);
            ps.execute();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("Saving allianceid ERROR" + e);
        }
    }

    public static final int createGuild(int leaderId, String name) {
        if (name.length() > 12) {
            return 0;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT guildid FROM guilds WHERE name = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            if (rs.first()) {
                rs.close();
                ps.close();
                return 0;
            }
            ps.close();
            rs.close();
            ps = con.prepareStatement("INSERT INTO guilds (`leader`, `name`, `signature`, `alliance`) VALUES (?, ?, ?, 0)", 1);
            ps.setInt(1, leaderId);
            ps.setString(2, name);
            ps.setInt(3, (int)(System.currentTimeMillis() / 1000L));
            ps.execute();
            rs = ps.getGeneratedKeys();
            int ret = 0;
            if (rs.next()) {
                ret = rs.getInt(1);
            }
            rs.close();
            ps.close();
            return ret;
        }
        catch (SQLException se) {
            System.err.println("SQL THROW");
            se.printStackTrace();
            return 0;
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final int addGuildMember(MapleGuildCharacter mgc) {
        this.wL.lock();
        try {
            if (this.members.size() >= this.capacity) {
                int n = 0;
                return n;
            }
            for (int i = this.members.size() - 1; i >= 0; --i) {
                if (this.members.get(i).getGuildRank() >= 5 && this.members.get(i).getName().compareTo(mgc.getName()) >= 0) continue;
                this.members.add(i + 1, mgc);
                this.bDirty = true;
                break;
            }
        }
        finally {
            this.wL.unlock();
        }
        this.gainGP(50);
        this.broadcast(MaplePacketCreator.newGuildMember(mgc));
        if (this.allianceid > 0) {
            World.Alliance.sendGuild(this.allianceid);
        }
        return 1;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void leaveGuild(MapleGuildCharacter mgc) {
        this.broadcast(MaplePacketCreator.memberLeft(mgc, false));
        this.gainGP(-50);
        this.wL.lock();
        try {
            this.bDirty = true;
            this.members.remove(mgc);
            if (mgc.isOnline()) {
                World.Guild.setGuildAndRank(mgc.getId(), 0, 5, 5);
            } else {
                MapleGuild.setOfflineGuildStatus(0, (byte)5, (byte)5, mgc.getId());
            }
            if (this.allianceid > 0) {
                World.Alliance.sendGuild(this.allianceid);
            }
        }
        finally {
            this.wL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void expelMember(MapleGuildCharacter initiator, String name, int cid) {
        this.wL.lock();
        try {
            for (MapleGuildCharacter mgc : this.members) {
                if (mgc.getId() != cid || initiator.getGuildRank() >= mgc.getGuildRank()) continue;
                this.broadcast(MaplePacketCreator.memberLeft(mgc, true));
                this.bDirty = true;
                this.gainGP(-50);
                if (this.allianceid > 0) {
                    World.Alliance.sendGuild(this.allianceid);
                }
                if (mgc.isOnline()) {
                    World.Guild.setGuildAndRank(cid, 0, 5, 5);
                } else {
                    MapleCharacterUtil.sendNote(mgc.getName(), initiator.getName(), "You have been expelled from the guild.", 0);
                    MapleGuild.setOfflineGuildStatus(0, (byte)5, (byte)5, cid);
                }
                this.members.remove(mgc);
                break;
            }
        }
        finally {
            this.wL.unlock();
        }
    }

    public final void changeARank() {
        this.changeARank(false);
    }

    public final void changeARank(boolean leader) {
        for (MapleGuildCharacter mgc : this.members) {
            if (this.leader == mgc.getId()) {
                this.changeARank(mgc.getId(), leader ? 1 : 2);
                continue;
            }
            this.changeARank(mgc.getId(), 3);
        }
    }

    public final void changeARank(int newRank) {
        for (MapleGuildCharacter mgc : this.members) {
            this.changeARank(mgc.getId(), newRank);
        }
    }

    public final void changeARank(int cid, int newRank) {
        if (this.allianceid <= 0) {
            return;
        }
        for (MapleGuildCharacter mgc : this.members) {
            if (cid != mgc.getId()) continue;
            if (mgc.isOnline()) {
                World.Guild.setGuildAndRank(cid, this.id, mgc.getGuildRank(), newRank);
            } else {
                MapleGuild.setOfflineGuildStatus((short)this.id, mgc.getGuildRank(), (byte)newRank, cid);
            }
            mgc.setAllianceRank((byte)newRank);
            World.Alliance.sendGuild(this.allianceid);
            return;
        }
        System.err.println("INFO: unable to find the correct id for changeRank({" + cid + "}, {" + newRank + "})");
    }

    public final void changeRank(int cid, int newRank) {
        for (MapleGuildCharacter mgc : this.members) {
            if (cid != mgc.getId()) continue;
            if (mgc.isOnline()) {
                World.Guild.setGuildAndRank(cid, this.id, newRank, mgc.getAllianceRank());
            } else {
                MapleGuild.setOfflineGuildStatus((short)this.id, (byte)newRank, mgc.getAllianceRank(), cid);
            }
            mgc.setGuildRank((byte)newRank);
            this.broadcast(MaplePacketCreator.changeRank(mgc));
            return;
        }
        System.err.println("INFO: unable to find the correct id for changeRank({" + cid + "}, {" + newRank + "})");
    }

    public final void setGuildNotice(String notice) {
        this.notice = notice;
        this.broadcast(MaplePacketCreator.guildNotice(this.id, notice));
    }

    public final void memberLevelJobUpdate(MapleGuildCharacter mgc) {
        for (MapleGuildCharacter member : this.members) {
            if (member.getId() != mgc.getId()) continue;
            int old_level = member.getLevel();
            int old_job = member.getJobId();
            member.setJobId(mgc.getJobId());
            member.setLevel((short)mgc.getLevel());
            if (mgc.getLevel() > old_level) {
                this.gainGP((mgc.getLevel() - old_level) * mgc.getLevel() / 10, false);
            }
            if (old_level != mgc.getLevel()) {
                // empty if block
            }
            if (old_job != mgc.getJobId()) {
                // empty if block
            }
            this.broadcast(MaplePacketCreator.guildMemberLevelJobUpdate(mgc));
            if (this.allianceid <= 0) break;
            World.Alliance.sendGuild(MaplePacketCreator.updateAlliance(mgc, this.allianceid), this.id, this.allianceid);
            break;
        }
    }

    public final void changeRankTitle(String[] ranks) {
        for (int i = 0; i < 5; ++i) {
            this.rankTitles[i] = ranks[i];
        }
        this.broadcast(MaplePacketCreator.rankTitleChange(this.id, ranks));
    }

    public final void disbandGuild() {
        this.writeToDB(true);
        this.broadcast(null, -1, BCOp.DISBAND);
    }

    public static void displayGuildRanks(MapleClient c, int npcid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT `name`, `GP`, `logoBG`, `logoBGColor`, `logo`, `logoColor` FROM guilds ORDER BY `GP` DESC LIMIT 50");
            ResultSet rs = ps.executeQuery();
            c.getSession().write((Object)MaplePacketCreator.showGuildRanks(npcid, rs));
            ps.close();
            rs.close();
        }
        catch (SQLException e) {
            // empty catch block
        }
    }

    public static void meso(MapleClient c, int npcid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT `name`,`meso`,`vip`, `level`FROM characters ORDER BY `meso` DESC LIMIT 100");
            ResultSet rs = ps.executeQuery();
            c.getSession().write((Object)MaplePacketCreator.showMesoRanks(npcid, rs));
            ps.close();
            rs.close();
        }
        catch (SQLException e) {
            // empty catch block
        }
    }

    public static void displayLevelRanks(MapleClient c, int npcid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT `name`, `vip`, `level`, `meso` FROM characters ORDER BY `level` DESC LIMIT 100");
            ResultSet rs = ps.executeQuery();
            c.getSession().write((Object)MaplePacketCreator.showLevelRanks(npcid, rs));
            ps.close();
            rs.close();
        }
        catch (SQLException e) {
            // empty catch block
        }
    }

    public static void displayRenwu2Ranks(MapleClient c, int npcid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT `name`,  `renwu2`, `vip`, `level`, `meso` FROM characters ORDER BY `renwu2` DESC LIMIT 100");
            ResultSet rs = ps.executeQuery();
            c.getSession().write((Object)MaplePacketCreator.showRenwu2Ranks(npcid, rs));
            ps.close();
            rs.close();
        }
        catch (SQLException e) {
            // empty catch block
        }
    }

    public static void \u4eba\u6c14\u6392\u884c(MapleClient c, int npcid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT `name`, `fame`, `level`, `meso` FROM characters ORDER BY `fame` DESC LIMIT 100");
            ResultSet rs = ps.executeQuery();
            c.getSession().write((Object)MaplePacketCreator.showRQRanks(npcid, rs));
            ps.close();
            rs.close();
        }
        catch (SQLException e) {
            // empty catch block
        }
    }

    public final void setGuildEmblem(short bg, byte bgcolor, short logo, byte logocolor) {
        this.logoBG = bg;
        this.logoBGColor = bgcolor;
        this.logo = logo;
        this.logoColor = logocolor;
        this.broadcast(null, -1, BCOp.EMBELMCHANGE);
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE guilds SET logo = ?, logoColor = ?, logoBG = ?, logoBGColor = ? WHERE guildid = ?");
            ps.setInt(1, logo);
            ps.setInt(2, this.logoColor);
            ps.setInt(3, this.logoBG);
            ps.setInt(4, this.logoBGColor);
            ps.setInt(5, this.id);
            ps.execute();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("Saving guild logo / BG colo ERROR");
            e.printStackTrace();
        }
    }

    public final MapleGuildCharacter getMGC(int cid) {
        for (MapleGuildCharacter mgc : this.members) {
            if (mgc.getId() != cid) continue;
            return mgc;
        }
        return null;
    }

    public final boolean increaseCapacity() {
        if (this.capacity >= 100 || this.capacity + 5 > 100) {
            return false;
        }
        this.capacity += 5;
        this.broadcast(MaplePacketCreator.guildCapacityChange(this.id, this.capacity));
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE guilds SET capacity = ? WHERE guildid = ?");
            ps.setInt(1, this.capacity);
            ps.setInt(2, this.id);
            ps.execute();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("Saving guild capacity ERROR");
            e.printStackTrace();
        }
        return true;
    }

    public final void gainGP(int amount) {
        this.gainGP(amount, true);
    }

    public final void gainGP(int amount, boolean broadcast) {
        if (amount == 0) {
            return;
        }
        if (amount + this.gp < 0) {
            amount = -this.gp;
        }
        this.gp += amount;
        this.broadcast(MaplePacketCreator.updateGP(this.id, this.gp));
        if (broadcast) {
            this.broadcast(UIPacket.getGPMsg(amount));
        }
    }

    public final void addMemberData(MaplePacketLittleEndianWriter mplew) {
        mplew.write(this.members.size());
        for (MapleGuildCharacter mgc : this.members) {
            mplew.writeInt(mgc.getId());
        }
        for (MapleGuildCharacter mgc : this.members) {
            mplew.writeAsciiString(StringUtil.getRightPaddedStr(mgc.getName(), '\000', 13));
            mplew.writeInt(mgc.getJobId());
            mplew.writeInt(mgc.getLevel());
            mplew.writeInt(mgc.getGuildRank());
            mplew.writeInt(mgc.isOnline() ? 1 : 0);
            mplew.writeInt(this.signature);
            mplew.writeInt(mgc.getAllianceRank());
        }
    }

    public static final MapleGuildResponse sendInvite(MapleClient c, String targetName) {
        MapleCharacter mc = c.getChannelServer().getPlayerStorage().getCharacterByName(targetName);
        if (mc == null) {
            return MapleGuildResponse.NOT_IN_CHANNEL;
        }
        if (mc.getGuildId() > 0) {
            return MapleGuildResponse.ALREADY_IN_GUILD;
        }
        mc.getClient().getSession().write((Object)MaplePacketCreator.guildInvite(c.getPlayer().getGuildId(), c.getPlayer().getName(), c.getPlayer().getLevel(), c.getPlayer().getJob()));
        return null;
    }

    public Collection<MapleGuildCharacter> getMembers() {
        return Collections.unmodifiableCollection(this.members);
    }

    public final boolean isInit() {
        return this.init;
    }

    public final List<MapleBBSThread> getBBS() {
        ArrayList<MapleBBSThread> ret = new ArrayList<MapleBBSThread>(this.bbs.values());
        Collections.sort(ret, new MapleBBSThread.ThreadComparator());
        return ret;
    }

    public final int addBBSThread(String title, String text, int icon, boolean bNotice, int posterID) {
        int add = this.bbs.get(0) == null ? 1 : 0;
        int ret = bNotice ? 0 : Math.max(1, this.bbs.size() + add);
        this.bbs.put(ret, new MapleBBSThread(ret, title, text, System.currentTimeMillis(), this.id, posterID, icon));
        return ret;
    }

    public final void editBBSThread(int localthreadid, String title, String text, int icon, int posterID, int guildRank) {
        MapleBBSThread thread = this.bbs.get(localthreadid);
        if (thread != null && (thread.ownerID == posterID || guildRank <= 2)) {
            this.bbs.put(localthreadid, new MapleBBSThread(localthreadid, title, text, System.currentTimeMillis(), this.id, thread.ownerID, icon));
        }
    }

    public final void deleteBBSThread(int localthreadid, int posterID, int guildRank) {
        MapleBBSThread thread = this.bbs.get(localthreadid);
        if (thread != null && (thread.ownerID == posterID || guildRank <= 2)) {
            this.bbs.remove(localthreadid);
        }
    }

    public final void addBBSReply(int localthreadid, String text, int posterID) {
        MapleBBSThread thread = this.bbs.get(localthreadid);
        if (thread != null) {
            thread.replies.put(thread.replies.size(), new MapleBBSThread.MapleBBSReply(thread.replies.size(), posterID, text, System.currentTimeMillis()));
        }
    }

    public final void deleteBBSReply(int localthreadid, int replyid, int posterID, int guildRank) {
        MapleBBSThread.MapleBBSReply reply;
        MapleBBSThread thread = this.bbs.get(localthreadid);
        if (thread != null && (reply = thread.replies.get(replyid)) != null && (reply.ownerID == posterID || guildRank <= 2)) {
            thread.replies.remove(replyid);
        }
    }

    public static void setOfflineGuildStatus(int guildid, byte guildrank, byte alliancerank, int cid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET guildid = ?, guildrank = ?, alliancerank = ? WHERE id = ?");
            ps.setInt(1, guildid);
            ps.setInt(2, guildrank);
            ps.setInt(3, alliancerank);
            ps.setInt(4, cid);
            ps.execute();
            ps.close();
        }
        catch (SQLException se) {
            System.out.println("SQLException: " + se.getLocalizedMessage());
            se.printStackTrace();
        }
    }

    public int getPrefix(MapleCharacter chr) {
        return chr.getPrefix();
    }

    private static enum BCOp {
        NONE,
        DISBAND,
        EMBELMCHANGE;

    }

}

