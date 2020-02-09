/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.ByteBuffer
 *  org.apache.mina.common.ByteBufferAllocator
 *  org.apache.mina.common.DefaultIoFilterChainBuilder
 *  org.apache.mina.common.IoAcceptor
 *  org.apache.mina.common.IoFilter
 *  org.apache.mina.common.IoHandler
 *  org.apache.mina.common.IoServiceConfig
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.SimpleByteBufferAllocator
 *  org.apache.mina.common.WriteFuture
 *  org.apache.mina.filter.codec.ProtocolCodecFactory
 *  org.apache.mina.filter.codec.ProtocolCodecFilter
 *  org.apache.mina.transport.socket.nio.SocketAcceptor
 *  org.apache.mina.transport.socket.nio.SocketAcceptorConfig
 *  org.apache.mina.transport.socket.nio.SocketSessionConfig
 */
package handling.channel;

import client.MapleCharacter;
import client.MapleClient;
import database.DatabaseConnection;
import handling.ByteArrayMaplePacket;
import handling.MaplePacket;
import handling.MapleServerHandler;
import handling.channel.PlayerStorage;
import handling.login.LoginServer;
import handling.mina.MapleCodecFactory;
import handling.world.CheaterData;
import java.io.IOException;
import java.io.PrintStream;
import java.io.Serializable;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.ByteBufferAllocator;
import org.apache.mina.common.DefaultIoFilterChainBuilder;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.IoFilter;
import org.apache.mina.common.IoHandler;
import org.apache.mina.common.IoServiceConfig;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.common.WriteFuture;
import org.apache.mina.filter.codec.ProtocolCodecFactory;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;
import org.apache.mina.transport.socket.nio.SocketSessionConfig;
import scripting.EventScriptManager;
import server.MapleSquad;
import server.ServerProperties;
import server.events.MapleCoconut;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.events.MapleFitness;
import server.events.MapleOla;
import server.events.MapleOxQuiz;
import server.events.MapleSnowball;
import server.life.PlayerNPC;
import server.maps.FakeCharacter;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.MapleMapObject;
import server.shops.HiredMerchant;
import server.shops.HiredMerchantSave;
import server.shops.IMaplePlayerShop;
import server.shops.MaplePlayerShopItem;
import tools.CollectionUtil;
import tools.ConcurrentEnumMap;
import tools.MaplePacketCreator;
import tools.packet.UIPacket;

public class ChannelServer
implements Serializable {
    public static long serverStartTime;
    private static final long serialVersionUID = 1L;
    private int expRate;
    private int mesoRate;
    private int dropRate;
    private int cashRate;
    private int doubleExp = 0;
    private int doubleMeso = 1;
    private int doubleDrop = 1;
    private int zidongExp = 1;
    private int zidongDrop = 1;
    private short port = (short)7574;
    private static final short DEFAULT_PORT = 7574;
    private final int channel;
    private int running_MerchantID = 0;
    private int flags = 0;
    private String serverMessage;
    private String key;
    private String ip;
    private String serverName;
    private boolean shutdown = false;
    private boolean finishedShutdown = false;
    private boolean MegaphoneMuteState = false;
    private boolean adminOnly = false;
    private PlayerStorage players;
    private MapleServerHandler serverHandler;
    private IoAcceptor acceptor;
    private final MapleMapFactory mapFactory;
    private EventScriptManager eventSM;
    private static final Map<Integer, ChannelServer> instances;
    private final Map<MapleSquad.MapleSquadType, MapleSquad> mapleSquads = new ConcurrentEnumMap<MapleSquad.MapleSquadType, MapleSquad>(MapleSquad.MapleSquadType.class);
    private final Map<Integer, HiredMerchant> merchants = new HashMap<Integer, HiredMerchant>();
    private final Map<Integer, PlayerNPC> playerNPCs = new HashMap<Integer, PlayerNPC>();
    private final ReentrantReadWriteLock merchLock = new ReentrantReadWriteLock();
    private final ReentrantReadWriteLock squadLock = new ReentrantReadWriteLock();
    private int eventmap = -1;
    private final Map<MapleEventType, MapleEvent> events = new EnumMap<MapleEventType, MapleEvent>(MapleEventType.class);
    private final boolean debugMode = false;
    private int instanceId = 0;
    private int statLimit;
    private Collection<FakeCharacter> clones = new LinkedList<FakeCharacter>();

    private ChannelServer(int channel) {
        this.channel = channel;
        this.mapFactory = new MapleMapFactory(channel);
    }

    public static Set<Integer> getAllInstance() {
        return new HashSet<Integer>(instances.keySet());
    }

    public final void loadEvents() {
        if (!this.events.isEmpty()) {
            return;
        }
        this.events.put(MapleEventType.CokePlay, new MapleCoconut(this.channel, MapleEventType.CokePlay.mapids));
        this.events.put(MapleEventType.Coconut, new MapleCoconut(this.channel, MapleEventType.Coconut.mapids));
        this.events.put(MapleEventType.Fitness, new MapleFitness(this.channel, MapleEventType.Fitness.mapids));
        this.events.put(MapleEventType.OlaOla, new MapleOla(this.channel, MapleEventType.OlaOla.mapids));
        this.events.put(MapleEventType.OxQuiz, new MapleOxQuiz(this.channel, MapleEventType.OxQuiz.mapids));
        this.events.put(MapleEventType.Snowball, new MapleSnowball(this.channel, MapleEventType.Snowball.mapids));
    }

    public final void run_startup_configurations() {
        this.setChannel(this.channel);
        try {
            this.expRate = Integer.parseInt(ServerProperties.getProperty("KinMS.Exp"));
            this.mesoRate = Integer.parseInt(ServerProperties.getProperty("KinMS.Meso"));
            this.dropRate = Integer.parseInt(ServerProperties.getProperty("KinMS.Drop"));
            this.cashRate = Integer.parseInt(ServerProperties.getProperty("KinMS.Cash"));
            this.serverMessage = ServerProperties.getProperty("KinMS.ServerMessage");
            this.statLimit = Integer.parseInt(ServerProperties.getProperty("KinMS.statLimit", "999"));
            this.serverName = ServerProperties.getProperty("KinMS.ServerName");
            this.flags = Integer.parseInt(ServerProperties.getProperty("KinMS.WFlags", "0"));
            this.adminOnly = Boolean.parseBoolean(ServerProperties.getProperty("KinMS.Admin", "false"));
            this.eventSM = new EventScriptManager(this, ServerProperties.getProperty("KinMS.Events").split(","));
            this.port = Short.parseShort(ServerProperties.getProperty("KinMS.Port" + this.channel, String.valueOf(7574 + this.channel)));
        }
        catch (NumberFormatException e) {
            throw new RuntimeException(e);
        }
        this.ip = "144.0.3.89:" + this.port;
        ByteBuffer.setUseDirectBuffers((boolean)false);
        ByteBuffer.setAllocator((ByteBufferAllocator)new SimpleByteBufferAllocator());
        this.acceptor = new SocketAcceptor();
        SocketAcceptorConfig acceptor_config = new SocketAcceptorConfig();
        acceptor_config.getSessionConfig().setTcpNoDelay(true);
        acceptor_config.setDisconnectOnUnbind(true);
        acceptor_config.getFilterChain().addLast("codec", (IoFilter)new ProtocolCodecFilter((ProtocolCodecFactory)new MapleCodecFactory()));
        this.players = new PlayerStorage(this.channel);
        this.loadEvents();
        try {
            this.serverHandler = new MapleServerHandler(this.channel, false);
            this.acceptor.bind((SocketAddress)new InetSocketAddress(this.port), (IoHandler)this.serverHandler, (IoServiceConfig)acceptor_config);
            System.out.println("\u9891\u9053 " + this.channel + ": \u542f\u52a8\u7aef\u53e3 " + this.port + ": \u670d\u52a1\u5668IP " + this.ip + "");
            this.eventSM.init();
        }
        catch (IOException e) {
            System.out.println("Binding to port " + this.port + " failed (ch: " + this.getChannel() + ")" + e);
        }
    }

    public final void shutdown(Object threadToNotify) {
        if (this.finishedShutdown) {
            return;
        }
        this.broadcastPacket(MaplePacketCreator.serverNotice(0, "\u9019\u500b\u983b\u9053\u6b63\u5728\u95dc\u9589\u4e2d."));
        this.shutdown = true;
        System.out.println("Channel " + this.channel + ", Saving hired merchants...");
        this.closeAllMerchants();
        System.out.println("Channel " + this.channel + ", Saving characters...");
        this.getPlayerStorage().disconnectAll();
        System.out.println("Channel " + this.channel + ", Unbinding...");
        this.acceptor.unbindAll();
        this.acceptor = null;
        instances.remove(this.channel);
        LoginServer.removeChannel(this.channel);
        this.setFinishShutdown();
    }

    public final void unbind() {
        this.acceptor.unbindAll();
    }

    public final boolean hasFinishedShutdown() {
        return this.finishedShutdown;
    }

    public final MapleMapFactory getMapFactory() {
        return this.mapFactory;
    }

    public static final ChannelServer newInstance(int channel) {
        return new ChannelServer(channel);
    }

    public static final ChannelServer getInstance(int channel) {
        return instances.get(channel);
    }

    public final void addPlayer(MapleCharacter chr) {
        this.getPlayerStorage().registerPlayer(chr);
        chr.getClient().getSession().write((Object)MaplePacketCreator.serverMessage(this.serverMessage));
    }

    public final PlayerStorage getPlayerStorage() {
        if (this.players == null) {
            this.players = new PlayerStorage(this.channel);
        }
        return this.players;
    }

    public final void removePlayer(MapleCharacter chr) {
        this.getPlayerStorage().deregisterPlayer(chr);
    }

    public final void removePlayer(int idz, String namez) {
        this.getPlayerStorage().deregisterPlayer(idz, namez);
    }

    public final String getServerMessage() {
        return this.serverMessage;
    }

    public final void setServerMessage(String newMessage) {
        this.serverMessage = newMessage;
        this.broadcastPacket(MaplePacketCreator.serverMessage(this.serverMessage));
    }

    public final void broadcastPacket(MaplePacket data) {
        this.getPlayerStorage().broadcastPacket(data);
    }

    public final void broadcastSmegaPacket(MaplePacket data) {
        this.getPlayerStorage().broadcastSmegaPacket(data);
    }

    public final void broadcastGMPacket(MaplePacket data) {
        this.getPlayerStorage().broadcastGMPacket(data);
    }

    public final int getExpRate() {
        return this.expRate + this.doubleExp * this.zidongExp;
    }

    public final void setExpRate(int expRate) {
        this.expRate = expRate;
    }

    public final int getCashRate() {
        return this.cashRate;
    }

    public final void setCashRate(int cashRate) {
        this.cashRate = cashRate;
    }

    public final int getChannel() {
        return this.channel;
    }

    public final void setChannel(int channel) {
        instances.put(channel, this);
        LoginServer.addChannel(channel);
    }

    public static final Collection<ChannelServer> getAllInstances() {
        return Collections.unmodifiableCollection(instances.values());
    }

    public final String getIP() {
        return this.ip;
    }

    public String getIPA() {
        return this.ip;
    }

    public final boolean isShutdown() {
        return this.shutdown;
    }

    public final int getLoadedMaps() {
        return this.mapFactory.getLoadedMaps();
    }

    public final EventScriptManager getEventSM() {
        return this.eventSM;
    }

    public final void reloadEvents() {
        this.eventSM.cancel();
        this.eventSM = new EventScriptManager(this, ServerProperties.getProperty("KinMS.Events").split(","));
        this.eventSM.init();
    }

    public final int getMesoRate() {
        return this.mesoRate * this.doubleMeso;
    }

    public final void setMesoRate(int mesoRate) {
        this.mesoRate = mesoRate;
    }

    public final int getDropRate() {
        return this.dropRate * this.doubleDrop * this.zidongDrop;
    }

    public final void setDropRate(int dropRate) {
        this.dropRate = dropRate;
    }

    public int getDoubleExp() {
        if (this.doubleExp < 0 || this.doubleExp > 2) {
            return 0;
        }
        return this.doubleExp;
    }

    public void setDoubleExp(int doubleExp) {
        this.doubleExp = doubleExp < 0 || doubleExp > 2 ? 0 : doubleExp;
    }

    public int getZiDongExp() {
        if (this.zidongExp < 0 || this.zidongExp > 2) {
            return 0;
        }
        return this.zidongExp;
    }

    public void setZiDongExp(int zidongExp) {
        this.zidongExp = zidongExp < 0 || zidongExp > 2 ? 0 : zidongExp;
    }

    public int getDoubleMeso() {
        if (this.doubleMeso < 0 || this.doubleMeso > 2) {
            return 1;
        }
        return this.doubleMeso;
    }

    public void setDoubleMeso(int doubleMeso) {
        this.doubleMeso = doubleMeso < 0 || doubleMeso > 2 ? 1 : doubleMeso;
    }

    public int getDoubleDrop() {
        if (this.doubleDrop < 0 || this.doubleDrop > 2) {
            return 1;
        }
        return this.doubleDrop;
    }

    public void setDoubleDrop(int doubleDrop) {
        this.doubleDrop = doubleDrop < 0 || doubleDrop > 2 ? 1 : doubleDrop;
    }

    public int getZiDongDrop() {
        if (this.zidongDrop < 0 || this.zidongDrop > 2) {
            return 1;
        }
        return this.zidongDrop;
    }

    public void setZiDongDrop(int zidongDrop) {
        this.zidongDrop = zidongDrop < 0 || zidongDrop > 2 ? 1 : zidongDrop;
    }

    public int getStatLimit() {
        return this.statLimit;
    }

    public void setStatLimit(int limit) {
        this.statLimit = limit;
    }

    public static void startChannel_Main() {
        serverStartTime = System.currentTimeMillis();
        int ch = Integer.parseInt(ServerProperties.getProperty("KinMS.Count", "0"));
        if (ch > 10) {
            ch = 10;
        }
        for (int i = 0; i < ch; ++i) {
            ChannelServer.newInstance(i + 1).run_startup_configurations();
        }
    }

    public static final void startChannel(int channel) {
        serverStartTime = System.currentTimeMillis();
        for (int i = 0; i < Integer.parseInt(ServerProperties.getProperty("KinMS.Count", "0")); ++i) {
            if (channel != i + 1) continue;
            ChannelServer.newInstance(i + 1).run_startup_configurations();
            break;
        }
    }

    public Map<MapleSquad.MapleSquadType, MapleSquad> getAllSquads() {
        return Collections.unmodifiableMap(this.mapleSquads);
    }

    public final MapleSquad getMapleSquad(String type) {
        return this.getMapleSquad(MapleSquad.MapleSquadType.valueOf(type.toLowerCase()));
    }

    public final MapleSquad getMapleSquad(MapleSquad.MapleSquadType type) {
        return this.mapleSquads.get((Object)type);
    }

    public final boolean addMapleSquad(MapleSquad squad, String type) {
        MapleSquad.MapleSquadType types = MapleSquad.MapleSquadType.valueOf(type.toLowerCase());
        if (types != null && !this.mapleSquads.containsKey((Object)types)) {
            this.mapleSquads.put(types, squad);
            squad.scheduleRemoval();
            return true;
        }
        return false;
    }

    public boolean removeMapleSquad(MapleSquad squad, MapleSquad.MapleSquadType type) {
        if (type != null && this.mapleSquads.containsKey((Object)type) && this.mapleSquads.get((Object)type) == squad) {
            this.mapleSquads.remove((Object)type);
            return true;
        }
        return false;
    }

    public final boolean removeMapleSquad(MapleSquad.MapleSquadType types) {
        if (types != null && this.mapleSquads.containsKey((Object)types)) {
            this.mapleSquads.remove((Object)types);
            return true;
        }
        return false;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public int closeAllMerchant() {
        int ret = 0;
        this.merchLock.writeLock().lock();
        try {
            Iterator<HiredMerchant> merchants_ = this.merchants.values().iterator();
            while (merchants_.hasNext()) {
                HiredMerchant hm = (HiredMerchant)((Map.Entry)((Object)merchants_.next())).getValue();
                HiredMerchantSave.QueueShopForSave(hm);
                hm.getMap().removeMapObject(hm);
                merchants_.remove();
                ++ret;
            }
        }
        finally {
            this.merchLock.writeLock().unlock();
        }
        for (int i = 910000001; i <= 910000022; ++i) {
            for (MapleMapObject mmo : this.mapFactory.getMap(i).getAllHiredMerchantsThreadsafe()) {
                HiredMerchantSave.QueueShopForSave((HiredMerchant)mmo);
                ++ret;
            }
        }
        return ret;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public void closeAllMerchants() {
        int ret = 0;
        long Start2 = System.currentTimeMillis();
        this.merchLock.writeLock().lock();
        try {
            Iterator<Map.Entry<Integer, HiredMerchant>> hmit = this.merchants.entrySet().iterator();
            while (hmit.hasNext()) {
                hmit.next().getValue().closeShop(true, false);
                hmit.remove();
                ++ret;
            }
        }
        catch (Exception e) {
            System.out.println("\u5173\u95ed\u96c7\u4f63\u5546\u5e97\u51fa\u73b0\u9519\u8bef..." + e);
        }
        finally {
            this.merchLock.writeLock().unlock();
        }
        System.out.println("\u9891\u9053 " + this.channel + " \u5171\u4fdd\u5b58\u96c7\u4f63\u5546\u5e97: " + ret + " | \u8017\u65f6: " + (System.currentTimeMillis() - Start2) + " \u6beb\u79d2.");
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public void closeAllMerchantsc() {
        this.merchLock.writeLock().lock();
        try {
            Iterator<HiredMerchant> merchants_ = this.merchants.values().iterator();
            while (merchants_.hasNext()) {
                merchants_.next().closeShop(true, true);
                merchants_.remove();
            }
        }
        catch (Exception e) {
            System.out.println("\u5173\u95ed\u96c7\u4f63\u5546\u5e97\u51fa\u73b0\u9519\u8bef..." + e);
        }
        finally {
            this.merchLock.writeLock().unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final int addMerchant(HiredMerchant hMerchant) {
        this.merchLock.writeLock().lock();
        int runningmer = 0;
        try {
            runningmer = this.running_MerchantID;
            this.merchants.put(this.running_MerchantID, hMerchant);
            ++this.running_MerchantID;
        }
        finally {
            this.merchLock.writeLock().unlock();
        }
        return runningmer;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void removeMerchant(HiredMerchant hMerchant) {
        this.merchLock.writeLock().lock();
        try {
            this.merchants.remove(hMerchant.getStoreId());
        }
        finally {
            this.merchLock.writeLock().unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final boolean containsMerchant(int accid) {
        boolean contains = false;
        this.merchLock.readLock().lock();
        try {
            Iterator<HiredMerchant> itr = this.merchants.values().iterator();
            while (itr.hasNext()) {
                if (((IMaplePlayerShop)itr.next()).getOwnerAccId() != accid) continue;
                contains = true;
                break;
            }
        }
        finally {
            this.merchLock.readLock().unlock();
        }
        return contains;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final List<HiredMerchant> searchMerchant(int itemSearch) {
        LinkedList<HiredMerchant> list = new LinkedList<HiredMerchant>();
        this.merchLock.readLock().lock();
        try {
            for (HiredMerchant hm : this.merchants.values()) {
                if (hm.searchItem(itemSearch).size() <= 0) continue;
                list.add(hm);
            }
        }
        finally {
            this.merchLock.readLock().unlock();
        }
        return list;
    }

    public final void toggleMegaphoneMuteState() {
        this.MegaphoneMuteState = !this.MegaphoneMuteState;
    }

    public final boolean getMegaphoneMuteState() {
        return this.MegaphoneMuteState;
    }

    public int getEvent() {
        return this.eventmap;
    }

    public final void setEvent(int ze) {
        this.eventmap = ze;
    }

    public MapleEvent getEvent(MapleEventType t) {
        return this.events.get((Object)t);
    }

    public final Collection<PlayerNPC> getAllPlayerNPC() {
        return this.playerNPCs.values();
    }

    public final PlayerNPC getPlayerNPC(int id) {
        return this.playerNPCs.get(id);
    }

    public final void addPlayerNPC(PlayerNPC npc) {
        if (this.playerNPCs.containsKey(npc.getId())) {
            this.removePlayerNPC(npc);
        }
        this.playerNPCs.put(npc.getId(), npc);
        this.getMapFactory().getMap(npc.getMapId()).addMapObject(npc);
    }

    public final void removePlayerNPC(PlayerNPC npc) {
        if (this.playerNPCs.containsKey(npc.getId())) {
            this.playerNPCs.remove(npc.getId());
            this.getMapFactory().getMap(npc.getMapId()).removeMapObject(npc);
        }
    }

    public final String getServerName() {
        return this.serverName;
    }

    public final void setServerName(String sn) {
        this.serverName = sn;
    }

    public final int getPort() {
        return this.port;
    }

    public static final Set<Integer> getChannelServer() {
        return new HashSet<Integer>(instances.keySet());
    }

    public final void setShutdown() {
        this.shutdown = true;
        System.out.println("Channel " + this.channel + " has set to shutdown.");
    }

    public final void setFinishShutdown() {
        this.finishedShutdown = true;
        System.out.println("\u9891\u9053 " + this.channel + " \u5df2\u5173\u95ed\u5b8c\u6210.");
    }

    public final boolean isAdminOnly() {
        return this.adminOnly;
    }

    public static final int getChannelCount() {
        return instances.size();
    }

    public final MapleServerHandler getServerHandler() {
        return this.serverHandler;
    }

    public final int getTempFlag() {
        return this.flags;
    }

    public static Map<Integer, Integer> getChannelLoad() {
        HashMap<Integer, Integer> ret = new HashMap<Integer, Integer>();
        for (ChannelServer cs : instances.values()) {
            ret.put(cs.getChannel(), cs.getConnectedClients());
        }
        return ret;
    }

    public int getConnectedClients() {
        return this.getPlayerStorage().getConnectedClients();
    }

    public List<CheaterData> getCheaters() {
        List<CheaterData> cheaters = this.getPlayerStorage().getCheaters();
        Collections.sort(cheaters);
        return CollectionUtil.copyFirst(cheaters, 20);
    }

    public void broadcastMessage(byte[] message) {
        this.broadcastPacket(new ByteArrayMaplePacket(message));
    }

    public void broadcastMessage(MaplePacket message) {
        this.broadcastPacket(message);
    }

    public void broadcastSmega(byte[] message) {
        this.broadcastSmegaPacket(new ByteArrayMaplePacket(message));
    }

    public void broadcastGMMessage(byte[] message) {
        this.broadcastGMPacket(new ByteArrayMaplePacket(message));
    }

    public void saveAll() {
        int ppl = 0;
        for (MapleCharacter chr : this.players.getAllCharacters()) {
            if (chr == null) continue;
            ++ppl;
            chr.saveToDB(false, false);
        }
        System.out.println("[\u81ea\u52a8\u5b58\u6863] \u5df2\u7ecf\u5c06\u9891\u9053 " + this.channel + " \u7684 " + ppl + " \u4e2a\u73a9\u5bb6\u4fdd\u5b58\u5230\u6570\u636e\u4e2d.");
    }

    public void AutoNx(int dy) {
        this.mapFactory.getMap(100000000).AutoNx(dy);
    }

    public void AutoBoss(int channel, int map, int Hour, int time, int moid, int x, int y, int hp) {
        this.mapFactory.getMap(map).spawnMonsterOnGroundBelow(moid, x, y, hp, channel, map, time, Hour);
    }

    public void AutoTime(int dy) {
        for (ChannelServer chan : ChannelServer.getAllInstances()) {
            for (MapleCharacter chr : chan.getPlayerStorage().getAllCharacters()) {
                if (chr == null) continue;
                chr.gainGamePoints(1);
                if (chr.getGamePoints() >= 5) continue;
                chr.resetGamePointsPD();
            }
        }
    }

    public int getInstanceId() {
        return this.instanceId;
    }

    public void addInstanceId() {
        ++this.instanceId;
    }

    public void shutdown() {
        if (this.finishedShutdown) {
            return;
        }
        this.broadcastPacket(MaplePacketCreator.serverNotice(0, "\u6e38\u620f\u5373\u5c06\u5173\u95ed\u7ef4\u62a4..."));
        this.shutdown = true;
        System.out.println("\u9891\u9053 " + this.channel + " \u6b63\u5728\u6e05\u7406\u6d3b\u52a8\u811a\u672c...");
        this.eventSM.cancel();
        System.out.println("\u9891\u9053 " + this.channel + " \u6b63\u5728\u4fdd\u5b58\u6240\u6709\u89d2\u8272\u6570\u636e...");
        this.getPlayerStorage().disconnectAll();
        System.out.println("\u9891\u9053 " + this.channel + " \u89e3\u9664\u7ed1\u5b9a\u7aef\u53e3...");
        this.acceptor.unbindAll();
        this.acceptor = null;
        instances.remove(this.channel);
        this.setFinishShutdown();
    }

    public void addClone(FakeCharacter fc) {
        this.clones.add(fc);
    }

    public void removeClone(FakeCharacter fc) {
        this.clones.remove(fc);
    }

    public Collection<FakeCharacter> getAllClones() {
        return Collections.unmodifiableCollection(this.clones);
    }

    public void Startqmdb() throws InterruptedException {
        Calendar cc = Calendar.getInstance();
        int hour = cc.get(11);
        int minute = cc.get(12);
        int second = cc.get(13);
        int number = cc.get(7);
        if (number == 6 && hour == 20) {
            try {
                this.qqq();
            }
            catch (SQLException ex) {
                System.out.println("\u5f00\u542f\u5168\u6c11\u593a\u5b9d\u9519\u8bef\u3002\u8bf7\u68c0\u67e5" + ex);
            }
        }
    }

    private void qqq() throws SQLException, InterruptedException {
        for (int ii = 0; ii <= 20; ++ii) {
            Thread.sleep(700L);
            int \u603b\u6570 = this.\u83b7\u53d6\u5168\u6c11\u593a\u5b9d\u603b\u6570();
            double a = Math.random() * (double)\u603b\u6570 + 1.0;
            int A = new Double(a).intValue();
            Iterator<ChannelServer> i$ = ChannelServer.getAllInstances().iterator();
            if (!i$.hasNext()) continue;
            ChannelServer cserv1 = i$.next();
            for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                mch.getClient().getSession().write((Object)MaplePacketCreator.sendHint("#b===========\u5168\u6c11\u5192\u9669\u5c9b==========#k\r\n==============================#r\r\n#b========\u5168\u6c11\u593a\u5b9d\u6d3b\u52a8\u5f00\u59cb=======#k\r\n==============================#r\r\n#b===========\u968f\u673a\u62bd\u53d6\u4e2d==========#k\r\n\u25c6\u6b63\u5728\u968f\u673a\u62bd\u9009\u4e2d\u5956\u7684\u5e78\u8fd0\u73a9\u5bb6\u25c6\r\n#b===========\u5e78\u8fd0\u73a9\u5bb6===========#r\r\n" + mch.\u5168\u6c11\u593a\u5b9d2(A), 200, 200));
                if (ii != 20) continue;
                mch.getClient().getSession().write((Object)MaplePacketCreator.sendHint("#e#r\u2605\u2605\u2605\u2605\u2605\u5168\u6c11\u593a\u5b9d\u2605\u2605\u2605\u2605\u2605\r\n\u4e2d\u5956\u73a9\u5bb6\uff1a" + mch.\u5168\u6c11\u593a\u5b9d2(A), 200, 200));
                mch.startMapEffect("\u2605\u606d\u559c\u73a9\u5bb6:" + mch.\u5168\u6c11\u593a\u5b9d2(A) + " \u8d62\u5f97\u4e86 [\u5168\u6c11\u593a\u5b9d] !!\u2605", 5120025);
                mch.getMap().broadcastMessage(MaplePacketCreator.yellowChat("[\u5168\u6c11\u593a\u5b9d\u6d3b\u52a8]\u606d\u559c\u73a9\u5bb6" + mch.\u5168\u6c11\u593a\u5b9d2(A) + "\u6210\u4e3a\u4e86\u672c\u671f\u593a\u5b9d\u7684\u5e78\u8fd0\u73a9\u5bb6!!!"));
                mch.getClient().getSession().write((Object)UIPacket.getTopMsg("[\u5168\u6c11\u593a\u5b9d\u6d3b\u52a8]\u606d\u559c\u73a9\u5bb6" + mch.\u5168\u6c11\u593a\u5b9d2(A) + "\u6210\u4e3a\u4e86\u672c\u671f\u593a\u5b9d\u7684\u5e78\u8fd0\u73a9\u5bb6!!!"));
                mch.\u73a9\u5bb6\u83b7\u5f97\u7269\u54c1(mch.\u5168\u6c11\u593a\u5b9d3(A), mch.\u5168\u6c11\u593a\u5b9d2(A));
                mch.getClient().getSession().write((Object)MaplePacketCreator.enableActions());
            }
        }
    }

    public int \u83b7\u53d6\u5168\u6c11\u593a\u5b9d\u603b\u6570() throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        String sql = "SELECT count(*) from qmdbplayer";
        PreparedStatement ps = con.prepareStatement(sql);
        ResultSet rs = ps.executeQuery();
        int count = -1;
        if (rs.next()) {
            count = rs.getInt(1);
        }
        rs.close();
        ps.close();
        return count;
    }

    static {
        instances = new HashMap<Integer, ChannelServer>();
    }
}

