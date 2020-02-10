/*
 * Decompiled with CFR 0.148.
 */
package server;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

import client.MapleCharacter;
import client.MapleClient;
import handling.channel.ChannelServer;
import handling.world.World;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.Pair;

public class MapleSquad {
    private WeakReference<MapleCharacter> leader;
    private final String leaderName;
    private final String toSay;
    private final Map<String, String> members = new LinkedHashMap<String, String>();
    private final Map<String, String> bannedMembers = new LinkedHashMap<String, String>();
    private final int ch;
    private final long startTime;
    private final int expiration;
    private final int beginMapId;
    private final MapleSquadType type;
    private byte status = 0;
    private ScheduledFuture<?> removal;
    private MapleClient c;

    public MapleSquad(int ch, String type, MapleCharacter leader, int expiration, String toSay) {
        this.leader = new WeakReference<MapleCharacter>(leader);
        this.members.put(leader.getName(), MapleCarnivalChallenge.getJobBasicNameById(leader.getJob()));
        this.leaderName = leader.getName();
        this.ch = ch;
        this.toSay = toSay;
        this.type = MapleSquadType.valueOf(type.toLowerCase());
        this.status = 1;
        this.beginMapId = leader.getMapId();
        leader.getMap().setSquad(this.type);
        if (this.type.queue.get(ch) == null) {
            this.type.queue.put(ch, new ArrayList());
            this.type.queuedPlayers.put(ch, new ArrayList());
        }
        this.startTime = System.currentTimeMillis();
        this.expiration = expiration;
    }

    public void copy() {
        while (this.type.queue.get(this.ch).size() > 0 && ChannelServer.getInstance(this.ch).getMapleSquad(this.type) == null) {
            int index = 0;
            long lowest = 0L;
            for (int i = 0; i < this.type.queue.get(this.ch).size(); ++i) {
                if (lowest != 0L && (Long)this.type.queue.get((Object)Integer.valueOf((int)this.ch)).get((int)i).right >= lowest) continue;
                index = i;
                lowest = (Long)this.type.queue.get((Object)Integer.valueOf((int)this.ch)).get((int)i).right;
            }
            String nextPlayerId = (String)this.type.queue.get((Object)Integer.valueOf((int)this.ch)).remove((int)index).left;
            int theirCh = World.Find.findChannel(nextPlayerId);
            if (theirCh > 0) {
                MapleCharacter lead = ChannelServer.getInstance(theirCh).getPlayerStorage().getCharacterByName(nextPlayerId);
                if (lead != null && lead.getMapId() == this.beginMapId && lead.getClient().getChannel() == this.ch) {
                    MapleSquad squad = new MapleSquad(this.ch, this.type.name(), lead, this.expiration, this.toSay);
                    if (ChannelServer.getInstance(this.ch).addMapleSquad(squad, this.type.name())) {
                        this.getBeginMap().broadcastMessage(MaplePacketCreator.getClock(this.expiration / 1000));
                        this.getBeginMap().broadcastMessage(MaplePacketCreator.serverNotice(6, nextPlayerId + this.toSay));
                        this.type.queuedPlayers.get(this.ch).add(new Pair<String, String>(nextPlayerId, "Success"));
                        break;
                    }
                    squad.clear();
                    this.type.queuedPlayers.get(this.ch).add(new Pair<String, String>(nextPlayerId, "Skipped"));
                    break;
                }
                if (lead != null) {
                    lead.dropMessage(6, "Your squad has been skipped due to you not being in the right channel and map.");
                }
                this.getBeginMap().broadcastMessage(MaplePacketCreator.serverNotice(6, nextPlayerId + "'s squad has been skipped due to the player not being in the right channel and map."));
                this.type.queuedPlayers.get(this.ch).add(new Pair<String, String>(nextPlayerId, "Not in map"));
                continue;
            }
            this.getBeginMap().broadcastMessage(MaplePacketCreator.serverNotice(6, nextPlayerId + "'s squad has been skipped due to the player not being online."));
            this.type.queuedPlayers.get(this.ch).add(new Pair<String, String>(nextPlayerId, "Not online"));
        }
    }

    public MapleMap getBeginMap() {
        return ChannelServer.getInstance(this.ch).getMapFactory().getMap(this.beginMapId);
    }

    public void clear() {
        if (this.removal != null) {
            this.removal.cancel(false);
            this.removal = null;
        }
        this.members.clear();
        this.bannedMembers.clear();
        this.leader = null;
        ChannelServer.getInstance(this.ch).removeMapleSquad(this.type);
        this.status = 0;
    }

    public MapleCharacter getChar(String name) {
        return ChannelServer.getInstance(this.ch).getPlayerStorage().getCharacterByName(name);
    }

    public long getTimeLeft() {
        return (long)this.expiration - (System.currentTimeMillis() - this.startTime);
    }

    public void scheduleRemoval() {
        this.removal = Timer.EtcTimer.getInstance().schedule(new Runnable(){

            @Override
            public void run() {
                if (MapleSquad.this.status != 0 && MapleSquad.this.leader != null && (MapleSquad.this.getLeader() == null || MapleSquad.this.status == 1)) {
                    MapleSquad.this.clear();
                    MapleSquad.this.copy();
                }
            }
        }, this.expiration);
    }

    public String getLeaderName() {
        return this.leaderName;
    }

    public List<Pair<String, Long>> getAllNextPlayer() {
        return this.type.queue.get(this.ch);
    }

    public String getNextPlayer() {
        StringBuilder sb = new StringBuilder("\n排隊成員 : ");
        sb.append("#b").append(this.type.queue.get(this.ch).size()).append(" #k ").append("與遠征隊名單 : \n\r ");
        int i = 0;
        for (Pair<String, Long> chr : this.type.queue.get(this.ch)) {
            sb.append(++i).append(" : ").append((String)chr.left);
            sb.append(" \n\r ");
        }
        sb.append("你是否想要 #e當下一個#n 在遠征隊排隊中　或者 #e移除#n 在遠征隊? 如果你想的話...");
        return sb.toString();
    }

    public void setNextPlayer(String i) {
        Pair<String, Long> toRemove = null;
        for (Pair<String, Long> s : this.type.queue.get(this.ch)) {
            if (!((String)s.left).equals(i)) continue;
            toRemove = s;
            break;
        }
        if (toRemove != null) {
            this.type.queue.get(this.ch).remove(toRemove);
            return;
        }
        for (ArrayList<Pair<String, Long>> v : this.type.queue.values()) {
            for (Pair s : v) {
                if (!((String)s.left).equals(i)) continue;
                return;
            }
        }
        this.type.queue.get(this.ch).add(new Pair<String, Long>(i, System.currentTimeMillis()));
    }

    public MapleCharacter getLeader() {
        if (this.leader == null || this.leader.get() == null) {
            if (this.members.size() > 0 && this.getChar(this.leaderName) != null) {
                this.leader = new WeakReference<MapleCharacter>(this.getChar(this.leaderName));
            } else {
                if (this.status != 0) {
                    this.clear();
                }
                return null;
            }
        }
        return (MapleCharacter)this.leader.get();
    }

    public boolean containsMember(MapleCharacter member) {
        for (String mmbr : this.members.keySet()) {
            if (!mmbr.equalsIgnoreCase(member.getName())) continue;
            return true;
        }
        return false;
    }

    public List<String> getMembers() {
        return new LinkedList<String>(this.members.keySet());
    }

    public List<String> getBannedMembers() {
        return new LinkedList<String>(this.bannedMembers.keySet());
    }

    public int getSquadSize() {
        return this.members.size();
    }

    public boolean isBanned(MapleCharacter member) {
        return this.bannedMembers.containsKey(member.getName());
    }

    public int addMember(MapleCharacter member, boolean join) {
        if (this.getLeader() == null) {
            return -1;
        }
        String job = MapleCarnivalChallenge.getJobBasicNameById(member.getJob());
        if (join) {
            if (!this.containsMember(member) && !this.getAllNextPlayer().contains(member.getName())) {
                if (this.members.size() <= 30) {
                    this.members.put(member.getName(), job);
                    this.getLeader().dropMessage(6, member.getName() + " (" + job + ") 加入了遠征隊!");
                    return 1;
                }
                return 2;
            }
            return -1;
        }
        if (this.containsMember(member)) {
            this.members.remove(member.getName());
            this.getLeader().dropMessage(6, member.getName() + " (" + job + ") 離開了遠征隊.");
            return 1;
        }
        return -1;
    }

    public void acceptMember(int pos) {
        if (pos < 0 || pos >= this.bannedMembers.size()) {
            return;
        }
        List<String> membersAsList = this.getBannedMembers();
        String toadd = membersAsList.get(pos);
        if (toadd != null && this.getChar(toadd) != null) {
            this.members.put(toadd, this.bannedMembers.get(toadd));
            this.bannedMembers.remove(toadd);
            this.getChar(toadd).dropMessage(5, this.getLeaderName() + " 允許你重新回來遠征隊");
        }
    }

    public void reAddMember(MapleCharacter chr) {
        this.removeMember(chr);
        this.members.put(chr.getName(), MapleCarnivalChallenge.getJobBasicNameById(chr.getJob()));
    }

    public void removeMember(MapleCharacter chr) {
        if (this.members.containsKey(chr.getName())) {
            this.members.remove(chr.getName());
        }
    }

    public void removeMember(String chr) {
        if (this.members.containsKey(chr)) {
            this.members.remove(chr);
        }
    }

    public void banMember(int pos) {
        if (pos <= 0 || pos >= this.members.size()) {
            return;
        }
        List<String> membersAsList = this.getMembers();
        String toban = membersAsList.get(pos);
        if (toban != null && this.getChar(toban) != null) {
            this.bannedMembers.put(toban, this.members.get(toban));
            this.members.remove(toban);
            this.getChar(toban).dropMessage(5, this.getLeaderName() + " 從遠征隊中刪除您.");
        }
    }

    public void setStatus(byte status) {
        this.status = status;
        if (status == 2 && this.removal != null) {
            this.removal.cancel(false);
            this.removal = null;
        }
    }

    public int getStatus() {
        return this.status;
    }

    public int getBannedMemberSize() {
        return this.bannedMembers.size();
    }

    public String getSquadMemberString(byte type) {
        switch (type) {
            case 0: {
                StringBuilder sb = new StringBuilder("遠征隊名單 : ");
                sb.append("#b").append(this.members.size()).append(" #k ").append("與成員名單 : \n\r ");
                int i = 0;
                for (Map.Entry<String, String> chr : this.members.entrySet()) {
                    sb.append(++i).append(" : ").append(chr.getKey()).append(" (").append(chr.getValue()).append(") ");
                    if (i == 1) {
                        sb.append("(遠征隊領袖)");
                    }
                    sb.append(" \n\r ");
                }
                while (i < 30) {
                    sb.append(++i).append(" : ").append(" \n\r ");
                }
                return sb.toString();
            }
            case 1: {
                StringBuilder sb = new StringBuilder("遠征隊名單 : ");
                sb.append("#b").append(this.members.size()).append(" #n ").append("與成員名單 : \n\r ");
                int i = 0;
                int selection = 0;
                for (Map.Entry<String, String> chr : this.members.entrySet()) {
                    sb.append("#b#L").append(selection).append("#");
                    ++selection;
                    sb.append(++i).append(" : ").append(chr.getKey()).append(" (").append(chr.getValue()).append(") ");
                    if (i == 1) {
                        sb.append("(遠征隊領袖)");
                    }
                    sb.append("#l").append(" \n\r ");
                }
                while (i < 30) {
                    sb.append(++i).append(" : ").append(" \n\r ");
                }
                return sb.toString();
            }
            case 2: {
                StringBuilder sb = new StringBuilder("遠征隊名單 : ");
                sb.append("#b").append(this.members.size()).append(" #n ").append("與成員名單 : \n\r ");
                int i = 0;
                int selection = 0;
                for (Map.Entry<String, String> chr : this.bannedMembers.entrySet()) {
                    sb.append("#b#L").append(selection).append("#");
                    ++selection;
                    sb.append(++i).append(" : ").append(chr.getKey()).append(" (").append(chr.getValue()).append(") ");
                    sb.append("#l").append(" \n\r ");
                }
                while (i < 30) {
                    sb.append(++i).append(" : ").append(" \n\r ");
                }
                return sb.toString();
            }
            case 3: {
                StringBuilder sb = new StringBuilder("職業 : ");
                Map<String, Integer> jobs = this.getJobs();
                for (Map.Entry<String, Integer> chr : jobs.entrySet()) {
                    sb.append("\r\n").append(chr.getKey()).append(" : ").append(chr.getValue());
                }
                return sb.toString();
            }
        }
        return null;
    }

    public final MapleSquadType getType() {
        return this.type;
    }

    public final Map<String, Integer> getJobs() {
        LinkedHashMap<String, Integer> jobs = new LinkedHashMap<String, Integer>();
        for (Map.Entry<String, String> chr : this.members.entrySet()) {
            if (jobs.containsKey(chr.getValue())) {
                jobs.put(chr.getValue(), (Integer)jobs.get(chr.getValue()) + 1);
                continue;
            }
            jobs.put(chr.getValue(), 1);
        }
        return jobs;
    }

    public static enum MapleSquadType {
        bossbalrog(2),
        zak(2),
        chaoszak(3),
        horntail(2),
        chaosht(3),
        pinkbean(3),
        nmm_squad(2),
        vergamot(2),
        dunas(2),
        nibergen_squad(2),
        dunas2(2),
        core_blaze(2),
        aufheben(2),
        cwkpq(10),
        tokyo_2095(2),
        vonleon(3),
        scartar(2),
        ARIANT1(3),
        ARIANT2(4),
        ARIANT3(5),
        cygnus(3);

        public int i;
        public HashMap<Integer, ArrayList<Pair<String, String>>> queuedPlayers = new HashMap();
        public HashMap<Integer, ArrayList<Pair<String, Long>>> queue = new HashMap();

        private MapleSquadType(int i) {
            this.i = i;
        }
    }

}