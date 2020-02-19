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

import java.io.IOException;
import java.io.Serializable;
import java.net.InetSocketAddress;
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
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;

import client.MapleCharacter;
import handling.ByteArrayMaplePacket;
import handling.MaplePacket;
import handling.MapleServerHandler;
import handling.login.LoginServer;
import handling.mina.MapleCodecFactory;
import handling.world.CheaterData;
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
import server.maps.MapleMapFactory;
import server.maps.MapleMapObject;
import server.shops.HiredMerchant;
import server.shops.HiredMerchantSave;
import server.shops.IMaplePlayerShop;
import tools.CollectionUtil;
import tools.ConcurrentEnumMap;
import tools.MaplePacketCreator;

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
    private final int channel;
    private int running_MerchantID = 0;
    private int flags = 0;
    private String serverMessage;
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
    private int eventmap = -1;
    private final Map<MapleEventType, MapleEvent> events = new EnumMap<MapleEventType, MapleEvent>(MapleEventType.class);
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
        ByteBuffer.setUseDirectBuffers(false);
        ByteBuffer.setAllocator(new SimpleByteBufferAllocator());
        this.acceptor = new SocketAcceptor();
        SocketAcceptorConfig acceptor_config = new SocketAcceptorConfig();
        acceptor_config.getSessionConfig().setTcpNoDelay(true);
        acceptor_config.setDisconnectOnUnbind(true);
        acceptor_config.getFilterChain().addLast("codec",new ProtocolCodecFilter(new MapleCodecFactory()));
        this.players = new PlayerStorage(this.channel);
        this.loadEvents();
        try {
            this.serverHandler = new MapleServerHandler(this.channel, false);
            this.acceptor.bind(new InetSocketAddress(this.port), this.serverHandler,acceptor_config);
            System.out.println("频道 " + this.channel + ": 启动端口 " + this.port);
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
        this.broadcastPacket(MaplePacketCreator.serverNotice(0, "這個頻道正在關閉中."));
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
                HiredMerchant hm = merchants_.next();
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
            System.out.println("关闭雇佣商店出现错误..." + e);
        }
        finally {
            this.merchLock.writeLock().unlock();
        }
        System.out.println("频道 " + this.channel + " 共保存雇佣商店: " + ret + " | 耗时: " + (System.currentTimeMillis() - Start2) + " 毫秒.");
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
            System.out.println("关闭雇佣商店出现错误..." + e);
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
        System.out.println("频道 " + this.channel + " 已关闭完成.");
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
        System.out.println("[自动存档] 已经将频道 " + this.channel + " 的 " + ppl + " 个玩家保存到数据中.");
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
        this.broadcastPacket(MaplePacketCreator.serverNotice(0, "游戏即将关闭维护..."));
        this.shutdown = true;
        System.out.println("频道 " + this.channel + " 正在清理活动脚本...");
        this.eventSM.cancel();
        System.out.println("频道 " + this.channel + " 正在保存所有角色数据...");
        this.getPlayerStorage().disconnectAll();
        System.out.println("频道 " + this.channel + " 解除绑定端口...");
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

    static {
        instances = new HashMap<Integer, ChannelServer>();
    }
}