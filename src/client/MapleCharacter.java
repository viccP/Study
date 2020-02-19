/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package client;

import java.awt.Point;
import java.io.File;
import java.io.Serializable;
import java.lang.ref.WeakReference;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Deque;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.apache.mina.common.IoSession;

import client.anticheat.CheatTracker;
import client.inventory.Equip;
import client.inventory.IItem;
import client.inventory.Item;
import client.inventory.ItemFlag;
import client.inventory.ItemLoader;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryIdentifier;
import client.inventory.MapleInventoryType;
import client.inventory.MapleMount;
import client.inventory.MaplePet;
import client.inventory.MapleRing;
import constants.GameConstants;
import constants.ServerConstants;
import database.DatabaseConnection;
import database.DatabaseException;
import handling.MaplePacket;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.CharacterTransfer;
import handling.world.MapleMessenger;
import handling.world.MapleMessengerCharacter;
import handling.world.MapleParty;
import handling.world.MaplePartyCharacter;
import handling.world.PartyOperation;
import handling.world.PlayerBuffStorage;
import handling.world.PlayerBuffValueHolder;
import handling.world.World;
import handling.world.family.MapleFamily;
import handling.world.family.MapleFamilyBuff;
import handling.world.family.MapleFamilyCharacter;
import handling.world.guild.MapleGuild;
import handling.world.guild.MapleGuildCharacter;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import scripting.EventInstanceManager;
import scripting.NPCScriptManager;
import server.CashShop;
import server.MapleCarnivalChallenge;
import server.MapleCarnivalParty;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MaplePortal;
import server.MapleShop;
import server.MapleStatEffect;
import server.MapleStorage;
import server.MapleTrade;
import server.RandomRewards;
import server.Randomizer;
import server.ServerProperties;
import server.Timer;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.life.PlayerNPC;
import server.maps.AbstractAnimatedMapleMapObject;
import server.maps.Event_PyramidSubway;
import server.maps.FakeCharacter;
import server.maps.FieldLimitType;
import server.maps.MapleDoor;
import server.maps.MapleDragon;
import server.maps.MapleFoothold;
import server.maps.MapleMap;
import server.maps.MapleMapEffect;
import server.maps.MapleMapFactory;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleSummon;
import server.maps.SavedLocationType;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import server.shops.IMaplePlayerShop;
import tools.ConcurrentEnumMap;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.MockIOSession;
import tools.Pair;
import tools.data.output.MaplePacketLittleEndianWriter;
import tools.packet.MTSCSPacket;
import tools.packet.MobPacket;
import tools.packet.MonsterCarnivalPacket;
import tools.packet.PetPacket;
import tools.packet.PlayerShopPacket;
import tools.packet.UIPacket;

public class MapleCharacter
extends AbstractAnimatedMapleMapObject
implements Serializable {
    private static final long serialVersionUID = 845748950829L;
    private String name;
    private String chalktext;
    private String BlessOfFairy_Origin;
    private String charmessage;
    private long lastCombo;
    private long lastfametime;
    private long keydown_skill;
    private byte dojoRecord;
    private byte gmLevel;
    private byte gender;
    private byte initialSpawnPoint;
    private byte skinColor;
    private byte guildrank = (byte)5;
    private byte allianceRank = (byte)5;
    private byte world;
    private byte fairyExp = (byte)30;
    private byte numClones;
    private byte subcategory;
    private short level;
    private short mulung_energy;
    private short combo;
    private short availableCP;
    private short totalCP;
    private short fame;
    private short hpApUsed;
    private short job;
    private short remainingAp;
    private int accountid;
    private int id;
    private int meso;
    private int exp;
    private int hair;
    private int face;
    private int mapid;
    private int bookCover;
    private int dojo;
    private int guildid = 0;
    private int fallcounter = 0;
    private int maplepoints;
    private int acash;
    private int chair;
    private int itemEffect;
    private int points;
    private int vpoints;
    private int rank = 1;
    private int rankMove = 0;
    private int jobRank = 1;
    private int jobRankMove = 0;
    private int marriageId;
    private int marriageItemId = 0;
    private int currentrep;
    private int totalrep;
    private int linkMid = 0;
    private int coconutteam = 0;
    private int followid = 0;
    private int battleshipHP = 0;
    private int expression;
    private int constellation;
    private int blood;
    private int month;
    private int day;
    private int beans;
    private int beansNum;
    private int beansRange;
    private int prefix;
    private int skillzq = 0;
    private int bosslog = 0;
    private int grname = 0;
    private int jzname = 0;
    private int mrsjrw = 0;
    private int mrsgrw = 0;
    private int mrsbossrw = 0;
    private int mrfbrw = 0;
    private int hythd = 0;
    private int mrsgrwa = 0;
    private int mrsbossrwa = 0;
    private int mrfbrwa = 0;
    private int mrsgrws = 0;
    private int mrsbossrws = 0;
    private int mrfbrws = 0;
    private int mrsgrwas = 0;
    private int mrsbossrwas = 0;
    private int mrfbrwas = 0;
    private int ddj = 0;
    private int vip = 0;
    private boolean canSetBeansNum;
    private Point old = new Point(0, 0);
    private boolean smega;
    private boolean hidden;
    private boolean hasSummon = false;
    private int[] wishlist;
    private int[] rocks;
    private int[] regrocks;
    private int[] remainingSp = new int[10];
    private int[] savedLocations = new int[18];
    private transient AtomicInteger inst;
    private transient List<LifeMovementFragment> lastres;
    private List<Integer> lastmonthfameids;
    private List<MapleDoor> doors;
    private List<MaplePet> pets;
    private transient WeakReference<MapleCharacter>[] clones;
    private transient Set<MapleMonster> controlled;
    private transient Set<MapleMapObject> visibleMapObjects;
    private transient ReentrantReadWriteLock visibleMapObjectsLock;
    private final Map<MapleQuest, MapleQuestStatus> quests;
    private Map<Integer, String> questinfo;
    private final Map<ISkill, SkillEntry> skills = new LinkedHashMap<ISkill, SkillEntry>();
    private final transient Map<MapleBuffStat, MapleBuffStatValueHolder> effects = new ConcurrentEnumMap<MapleBuffStat, MapleBuffStatValueHolder>(MapleBuffStat.class);
    private transient Map<Integer, MapleSummon> summons;
    private final transient Map<Integer, MapleCoolDownValueHolder> coolDowns = new LinkedHashMap<Integer, MapleCoolDownValueHolder>();
    private final transient Map<MapleDisease, MapleDiseaseValueHolder> diseases = new ConcurrentEnumMap<MapleDisease, MapleDiseaseValueHolder>(MapleDisease.class);
    private CashShop cs;
    private transient Deque<MapleCarnivalChallenge> pendingCarnivalRequests;
    private transient MapleCarnivalParty carnivalParty;
    private BuddyList buddylist;
    private MonsterBook monsterbook;
    private transient CheatTracker anticheat;
    private MapleClient client;
    private PlayerStats stats;
    private transient PlayerRandomStream CRand;
    private transient MapleMap map;
    private transient MapleShop shop;
    private transient MapleDragon dragon;
    private transient RockPaperScissors rps;
    private MapleStorage storage;
    private transient MapleTrade trade;
    private MapleMount mount;
    private List<Integer> finishedAchievements = new ArrayList<Integer>();
    private MapleMessenger messenger;
    private byte[] petStore;
    private transient IMaplePlayerShop playerShop;
    private MapleParty party;
    private boolean invincible = false;
    private boolean canTalk = true;
    private boolean clone = false;
    private boolean followinitiator = false;
    private boolean followon = false;
    private MapleGuildCharacter mgc;
    private MapleFamilyCharacter mfc;
    private transient EventInstanceManager eventInstance;
    private MapleInventory[] inventory;
    private SkillMacro[] skillMacros = new SkillMacro[5];
    private MapleKeyLayout keylayout;
    private transient ScheduledFuture<?> beholderHealingSchedule;
    private transient ScheduledFuture<?> beholderBuffSchedule;
    private transient ScheduledFuture<?> BerserkSchedule;
    private transient ScheduledFuture<?> dragonBloodSchedule;
    private transient ScheduledFuture<?> fairySchedule;
    private transient ScheduledFuture<?> mapTimeLimitTask;
    private transient ScheduledFuture<?> fishing;
    private long nextConsume = 0L;
    private long pqStartTime = 0L;
    private transient Event_PyramidSubway pyramidSubway = null;
    private transient List<Integer> pendingExpiration = null;
    private transient List<Integer> pendingSkills = null;
    private transient Map<Integer, Integer> movedMobs = new HashMap<Integer, Integer>();
    private String teleportname = "";
    private int APQScore;
    private long lasttime = 0L;
    private long currenttime = 0L;
    private long deadtime = 1000L;
    private long nengl = 0L;
    private long nengls = 0L;
    private boolean isfake = false;
    private List<FakeCharacter> fakes = new ArrayList<FakeCharacter>();

    public MapleCharacter(boolean ChannelServer2) {
        int i;
        this.setStance(0);
        this.setPosition(new Point(0, 0));
        this.inventory = new MapleInventory[MapleInventoryType.values().length];
        for (MapleInventoryType type : MapleInventoryType.values()) {
            this.inventory[type.ordinal()] = new MapleInventory(type, (byte) 100);
        }
        this.quests = new LinkedHashMap<MapleQuest, MapleQuestStatus>();
        this.stats = new PlayerStats(this);
        for (i = 0; i < this.remainingSp.length; ++i) {
            this.remainingSp[i] = 0;
        }
        if (ChannelServer2) {
            this.lastCombo = 0L;
            this.mulung_energy = 0;
            this.combo = 0;
            this.keydown_skill = 0L;
            this.smega = true;
            this.petStore = new byte[3];
            for (i = 0; i < this.petStore.length; ++i) {
                this.petStore[i] = -1;
            }
            this.wishlist = new int[10];
            this.rocks = new int[10];
            this.regrocks = new int[5];
            this.clones = new WeakReference[25];
            for (i = 0; i < this.clones.length; ++i) {
                this.clones[i] = new WeakReference<MapleCharacter>(null);
            }
            this.inst = new AtomicInteger();
            this.inst.set(0);
            this.keylayout = new MapleKeyLayout();
            this.doors = new ArrayList<MapleDoor>();
            this.controlled = new LinkedHashSet<MapleMonster>();
            this.summons = new LinkedHashMap<Integer, MapleSummon>();
            this.visibleMapObjects = new LinkedHashSet<MapleMapObject>();
            this.visibleMapObjectsLock = new ReentrantReadWriteLock();
            this.pendingCarnivalRequests = new LinkedList<MapleCarnivalChallenge>();
            this.savedLocations = new int[SavedLocationType.values().length];
            for (i = 0; i < SavedLocationType.values().length; ++i) {
                this.savedLocations[i] = -1;
            }
            this.questinfo = new LinkedHashMap<Integer, String>();
            this.anticheat = new CheatTracker(this);
            this.pets = new ArrayList<MaplePet>();
        }
    }

    public static MapleCharacter getDefault(MapleClient client, int type) {
        MapleCharacter ret = new MapleCharacter(false);
        ret.client = client;
        ret.map = null;
        ret.exp = 0;
        ret.gmLevel = 0;
        ret.job = (short)(type == 1 ? 0 : (type == 0 ? 1000 : (type == 3 ? 2001 : (type == 4 ? 3000 : 2000))));
        ret.beans = 0;
        ret.meso = 0;
        ret.level = 1;
        ret.remainingAp = 0;
        ret.fame = 0;
        ret.accountid = client.getAccID();
        ret.buddylist = new BuddyList((byte) 20);
        ret.stats.str = (short)12;
        ret.stats.dex = (short)5;
        ret.stats.int_ = (short)4;
        ret.stats.luk = (short)4;
        ret.stats.maxhp = (short)50;
        ret.stats.hp = (short)50;
        ret.stats.maxmp = (short)50;
        ret.stats.mp = (short)50;
        ret.prefix = 0;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, ret.accountid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret.client.setAccountName(rs.getString("name"));
                ret.acash = rs.getInt("ACash");
                ret.maplepoints = rs.getInt("mPoints");
                ret.points = rs.getInt("points");
                ret.vpoints = rs.getInt("vpoints");
            }
            rs.close();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("Error getting character default" + e);
        }
        return ret;
    }

    public static final MapleCharacter ReconstructChr(CharacterTransfer ct, MapleClient client, boolean isChannel) {
        MapleParty party;
        MapleCharacter ret = new MapleCharacter(true);
        ret.client = client;
        if (!isChannel) {
            ret.client.setChannel(ct.channel);
        }
        ret.id = ct.characterid;
        ret.name = ct.name;
        ret.level = ct.level;
        ret.fame = ct.fame;
        ret.CRand = new PlayerRandomStream();
        ret.stats.str = ct.str;
        ret.stats.dex = ct.dex;
        ret.stats.int_ = ct.int_;
        ret.stats.luk = ct.luk;
        ret.stats.maxhp = ct.maxhp;
        ret.stats.maxmp = ct.maxmp;
        ret.stats.hp = ct.hp;
        ret.stats.mp = ct.mp;
        ret.chalktext = ct.chalkboard;
        ret.exp = ct.exp;
        ret.hpApUsed = ct.hpApUsed;
        ret.remainingSp = ct.remainingSp;
        ret.remainingAp = ct.remainingAp;
        ret.beans = ct.beans;
        ret.meso = ct.meso;
        ret.gmLevel = ct.gmLevel;
        ret.skinColor = ct.skinColor;
        ret.gender = ct.gender;
        ret.job = ct.job;
        ret.hair = ct.hair;
        ret.face = ct.face;
        ret.accountid = ct.accountid;
        ret.mapid = ct.mapid;
        ret.initialSpawnPoint = ct.initialSpawnPoint;
        ret.world = ct.world;
        ret.bookCover = ct.mBookCover;
        ret.dojo = ct.dojo;
        ret.dojoRecord = ct.dojoRecord;
        ret.guildid = ct.guildid;
        ret.guildrank = ct.guildrank;
        ret.allianceRank = ct.alliancerank;
        ret.points = ct.points;
        ret.vpoints = ct.vpoints;
        ret.fairyExp = ct.fairyExp;
        ret.marriageId = ct.marriageId;
        ret.currentrep = ct.currentrep;
        ret.totalrep = ct.totalrep;
        ret.charmessage = ct.charmessage;
        ret.expression = ct.expression;
        ret.constellation = ct.constellation;
        ret.skillzq = ct.skillzq;
        ret.bosslog = ct.bosslog;
        ret.grname = ct.grname;
        ret.jzname = ct.jzname;
        ret.mrfbrw = ct.mrfbrw;
        ret.mrsbossrw = ct.mrsbossrw;
        ret.mrsgrw = ct.mrsgrw;
        ret.mrfbrwa = ct.mrfbrwa;
        ret.mrsbossrwa = ct.mrsbossrwa;
        ret.mrsgrwa = ct.mrsgrwa;
        ret.mrfbrws = ct.mrfbrws;
        ret.mrsbossrws = ct.mrsbossrws;
        ret.mrsgrws = ct.mrsgrws;
        ret.mrfbrwas = ct.mrfbrwas;
        ret.mrsbossrwas = ct.mrsbossrwas;
        ret.mrsgrwas = ct.mrsgrwas;
        ret.mrsjrw = ct.mrsjrw;
        ret.hythd = ct.hythd;
        ret.ddj = ct.ddj;
        ret.vip = ct.vip;
        ret.blood = ct.blood;
        ret.month = ct.month;
        ret.day = ct.day;
        ret.makeMFC(ct.familyid, ct.seniorid, ct.junior1, ct.junior2);
        if (ret.guildid > 0) {
            ret.mgc = new MapleGuildCharacter(ret);
        }
        ret.buddylist = new BuddyList(ct.buddysize);
        ret.subcategory = ct.subcategory;
        ret.prefix = ct.prefix;
        if (isChannel) {
            MapleMapFactory mapFactory = ChannelServer.getInstance(client.getChannel()).getMapFactory();
            ret.map = mapFactory.getMap(ret.mapid);
            if (ret.map == null) {
                ret.map = mapFactory.getMap(100000000);
            } else if (ret.map.getForcedReturnId() != 999999999) {
                ret.map = ret.map.getForcedReturnMap();
            }
            MaplePortal portal = ret.map.getPortal(ret.initialSpawnPoint);
            if (portal == null) {
                portal = ret.map.getPortal(0);
                ret.initialSpawnPoint = 0;
            }
            ret.setPosition(portal.getPosition());
            int messengerid = ct.messengerid;
            if (messengerid > 0) {
                ret.messenger = World.Messenger.getMessenger(messengerid);
            }
        } else {
            ret.messenger = null;
        }
        int partyid = ct.partyid;
        if (partyid >= 0 && (party = World.Party.getParty(partyid)) != null && party.getMemberById(ret.id) != null) {
            ret.party = party;
        }
        for (Map.Entry<Integer, Object> qs : ct.Quest.entrySet()) {
            MapleQuest quest = MapleQuest.getInstance(qs.getKey());
            MapleQuestStatus queststatus_from = (MapleQuestStatus)qs.getValue();
            MapleQuestStatus queststatus = new MapleQuestStatus(quest, queststatus_from.getStatus());
            queststatus.setForfeited(queststatus_from.getForfeited());
            queststatus.setCustomData(queststatus_from.getCustomData());
            queststatus.setCompletionTime(queststatus_from.getCompletionTime());
            if (queststatus_from.getMobKills() != null) {
                for (Map.Entry<Integer, Integer> mobkills : queststatus_from.getMobKills().entrySet()) {
                    queststatus.setMobKills(mobkills.getKey(), mobkills.getValue());
                }
            }
            ret.quests.put(quest, queststatus);
        }
        for (Entry<Integer, SkillEntry> qs : ct.Skills.entrySet()) {
            ret.skills.put(SkillFactory.getSkill(qs.getKey()), (SkillEntry)qs.getValue());
        }
        for (Integer zz : ct.finishedAchievements) {
            ret.finishedAchievements.add(zz);
        }
        ret.monsterbook = new MonsterBook(ct.mbook);
        ret.inventory = (MapleInventory[])ct.inventorys;
        ret.BlessOfFairy_Origin = ct.BlessOfFairy;
        ret.skillMacros = (SkillMacro[])ct.skillmacro;
        ret.petStore = ct.petStore;
        ret.keylayout = new MapleKeyLayout(ct.keymap);
        ret.questinfo = ct.InfoQuest;
        ret.savedLocations = ct.savedlocation;
        ret.wishlist = ct.wishlist;
        ret.rocks = ct.rocks;
        ret.regrocks = ct.regrocks;
        ret.buddylist.loadFromTransfer(ct.buddies);
        ret.keydown_skill = 0L;
        ret.lastfametime = ct.lastfametime;
        ret.lastmonthfameids = ct.famedcharacters;
        ret.storage = (MapleStorage)ct.storage;
        ret.cs = (CashShop)ct.cs;
        client.setAccountName(ct.accountname);
        ret.acash = ct.ACash;
        ret.maplepoints = ct.MaplePoints;
        ret.numClones = ct.clonez;
        ret.mount = new MapleMount(ret, ct.mount_itemid, GameConstants.isKOC(ret.job) ? 10001004 : (GameConstants.isAran(ret.job) ? 20001004 : (GameConstants.isEvan(ret.job) ? 20011004 : 1004)), ct.mount_Fatigue, ct.mount_level, ct.mount_exp);
        ret.stats.recalcLocalStats(true);
        return ret;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static MapleCharacter loadCharFromDB(int charid, MapleClient client, boolean channelserver) {
        MapleCharacter ret = new MapleCharacter(channelserver);
        ret.client = client;
        ret.id = charid;
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        PreparedStatement pse = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            if (!rs.next()) {
                throw new RuntimeException("Loading the Char Failed (char not found)");
            }
            ret.name = rs.getString("name");
            ret.level = rs.getShort("level");
            ret.fame = rs.getShort("fame");
            ret.stats.str = rs.getShort("str");
            ret.stats.dex = rs.getShort("dex");
            ret.stats.int_ = rs.getShort("int");
            ret.stats.luk = rs.getShort("luk");
            ret.stats.maxhp = rs.getShort("maxhp");
            ret.stats.maxmp = rs.getShort("maxmp");
            ret.stats.hp = rs.getShort("hp");
            ret.stats.mp = rs.getShort("mp");
            ret.exp = rs.getInt("exp");
            ret.hpApUsed = rs.getShort("hpApUsed");
            String[] sp = rs.getString("sp").split(",");
            for (int i = 0; i < ret.remainingSp.length; ++i) {
                ret.remainingSp[i] = Integer.parseInt(sp[i]);
            }
            ret.remainingAp = rs.getShort("ap");
            ret.beans = rs.getInt("beans");
            ret.meso = rs.getInt("meso");
            ret.gmLevel = rs.getByte("gm");
            ret.skinColor = rs.getByte("skincolor");
            ret.gender = rs.getByte("gender");
            ret.job = rs.getShort("job");
            ret.hair = rs.getInt("hair");
            ret.face = rs.getInt("face");
            ret.accountid = rs.getInt("accountid");
            ret.mapid = rs.getInt("map");
            ret.initialSpawnPoint = rs.getByte("spawnpoint");
            ret.world = rs.getByte("world");
            ret.guildid = rs.getInt("guildid");
            ret.guildrank = rs.getByte("guildrank");
            ret.allianceRank = rs.getByte("allianceRank");
            ret.currentrep = rs.getInt("currentrep");
            ret.totalrep = rs.getInt("totalrep");
            ret.makeMFC(rs.getInt("familyid"), rs.getInt("seniorid"), rs.getInt("junior1"), rs.getInt("junior2"));
            if (ret.guildid > 0) {
                ret.mgc = new MapleGuildCharacter(ret);
            }
            ret.buddylist = new BuddyList(rs.getByte("buddyCapacity"));
            ret.subcategory = rs.getByte("subcategory");
            ret.mount = new MapleMount(ret, 0, ret.job > 1000 && ret.job < 2000 ? 10001004 : (ret.job >= 2000 ? (ret.job == 2001 || ret.job >= 2200 && ret.job <= 2218 ? 20011004 : (ret.job >= 3000 ? 30001004 : 20001004)) : 1004),(byte) 0,(byte) 1, 0);
            ret.rank = rs.getInt("rank");
            ret.rankMove = rs.getInt("rankMove");
            ret.jobRank = rs.getInt("jobRank");
            ret.jobRankMove = rs.getInt("jobRankMove");
            ret.marriageId = rs.getInt("marriageId");
            ret.charmessage = rs.getString("charmessage");
            ret.expression = rs.getInt("expression");
            ret.constellation = rs.getInt("constellation");
            ret.skillzq = rs.getInt("skillzq");
            ret.bosslog = rs.getInt("bosslog");
            ret.grname = rs.getInt("grname");
            ret.jzname = rs.getInt("jzname");
            ret.mrfbrw = rs.getInt("mrfbrw");
            ret.mrsbossrw = rs.getInt("mrsbossrw");
            ret.mrsgrw = rs.getInt("mrsgrw");
            ret.mrfbrws = rs.getInt("mrfbrws");
            ret.mrsbossrws = rs.getInt("mrsbossrws");
            ret.mrsgrws = rs.getInt("mrsgrws");
            ret.mrsjrw = rs.getInt("mrsjrw");
            ret.hythd = rs.getInt("hythd");
            ret.mrfbrwa = rs.getInt("mrfbrwa");
            ret.mrsbossrwa = rs.getInt("mrsbossrwa");
            ret.mrsgrwa = rs.getInt("mrsgrwa");
            ret.mrfbrwas = rs.getInt("mrfbrwas");
            ret.mrsbossrwas = rs.getInt("mrsbossrwas");
            ret.mrsgrwas = rs.getInt("mrsgrwas");
            ret.blood = rs.getInt("blood");
            ret.ddj = rs.getInt("ddj");
            ret.vip = rs.getInt("vip");
            ret.month = rs.getInt("month");
            ret.day = rs.getInt("day");
            ret.prefix = rs.getInt("prefix");
            if (channelserver) {
                MapleParty party;
                MaplePortal portal;
                MapleMapFactory mapFactory = ChannelServer.getInstance(client.getChannel()).getMapFactory();
                ret.map = mapFactory.getMap(ret.mapid);
                if (ret.map == null) {
                    ret.map = mapFactory.getMap(100000000);
                }
                if ((portal = ret.map.getPortal(ret.initialSpawnPoint)) == null) {
                    portal = ret.map.getPortal(0);
                    ret.initialSpawnPoint = 0;
                }
                ret.setPosition(portal.getPosition());
                int partyid = rs.getInt("party");
                if (partyid >= 0 && (party = World.Party.getParty(partyid)) != null && party.getMemberById(ret.id) != null) {
                    ret.party = party;
                }
                ret.bookCover = rs.getInt("monsterbookcover");
                ret.dojo = rs.getInt("dojo_pts");
                ret.dojoRecord = rs.getByte("dojoRecord");
                String[] pets = rs.getString("pets").split(",");
                for (int i = 0; i < ret.petStore.length; ++i) {
                    ret.petStore[i] = Byte.parseByte(pets[i]);
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT * FROM achievements WHERE accountid = ?");
                ps.setInt(1, ret.accountid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.finishedAchievements.add(rs.getInt("achievementid"));
                }
            }
            rs.close();
            ps.close();
            boolean compensate_previousEvans = false;
            ps = con.prepareStatement("SELECT * FROM queststatus WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            pse = con.prepareStatement("SELECT * FROM queststatusmobs WHERE queststatusid = ?");
            while (rs.next()) {
                int id = rs.getInt("quest");
                if (id == 170000) {
                    compensate_previousEvans = true;
                }
                MapleQuest q = MapleQuest.getInstance(id);
                MapleQuestStatus status = new MapleQuestStatus(q, rs.getByte("status"));
                long cTime = rs.getLong("time");
                if (cTime > -1L) {
                    status.setCompletionTime(cTime * 1000L);
                }
                status.setForfeited(rs.getInt("forfeited"));
                status.setCustomData(rs.getString("customData"));
                ret.quests.put(q, status);
                pse.setInt(1, rs.getInt("queststatusid"));
                ResultSet rsMobs = pse.executeQuery();
                while (rsMobs.next()) {
                    status.setMobKills(rsMobs.getInt("mob"), rsMobs.getInt("count"));
                }
                rsMobs.close();
            }
            rs.close();
            ps.close();
            pse.close();
            if (channelserver) {
                ret.CRand = new PlayerRandomStream();
                ret.monsterbook = MonsterBook.loadCards(charid);
                ps = con.prepareStatement("SELECT * FROM inventoryslot where characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                if (!rs.next()) {
                    rs.close();
                    ps.close();
                    throw new RuntimeException("No Inventory slot column found in SQL. [inventoryslot]*********************");
                }
                ret.getInventory(MapleInventoryType.EQUIP).setSlotLimit(rs.getByte("equip"));
                ret.getInventory(MapleInventoryType.USE).setSlotLimit(rs.getByte("use"));
                ret.getInventory(MapleInventoryType.SETUP).setSlotLimit(rs.getByte("setup"));
                ret.getInventory(MapleInventoryType.ETC).setSlotLimit(rs.getByte("etc"));
                ret.getInventory(MapleInventoryType.CASH).setSlotLimit(rs.getByte("cash"));
                ps.close();
                rs.close();
                for (Pair<IItem, MapleInventoryType> mit : ItemLoader.INVENTORY.loadItems(false, charid).values()) {
                    ret.getInventory(mit.getRight()).addFromDB(mit.getLeft());
                    if (mit.getLeft().getPet() == null) continue;
                    ret.pets.add(mit.getLeft().getPet());
                }
                ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
                ps.setInt(1, ret.accountid);
                rs = ps.executeQuery();
                if (rs.next()) {
                    ret.getClient().setAccountName(rs.getString("name"));
                    ret.acash = rs.getInt("ACash");
                    ret.maplepoints = rs.getInt("mPoints");
                    ret.points = rs.getInt("points");
                    ret.vpoints = rs.getInt("vpoints");
                    if (rs.getTimestamp("lastlogon") != null) {
                        Calendar cal = Calendar.getInstance();
                        cal.setTimeInMillis(rs.getTimestamp("lastlogon").getTime());
                    }
                    rs.close();
                    ps.close();
                    ps = con.prepareStatement("UPDATE accounts SET lastlogon = CURRENT_TIMESTAMP() WHERE id = ?");
                    ps.setInt(1, ret.accountid);
                    ps.executeUpdate();
                } else {
                    rs.close();
                }
                ps.close();
                ps = con.prepareStatement("SELECT * FROM questinfo WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.questinfo.put(rs.getInt("quest"), rs.getString("customData"));
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT skillid, skilllevel, masterlevel, expiration FROM skills WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ISkill skil = SkillFactory.getSkill(rs.getInt("skillid"));
                    if (skil != null && GameConstants.isApplicableSkill(rs.getInt("skillid"))) {
                        ret.skills.put(skil, new SkillEntry(rs.getByte("skilllevel"), rs.getByte("masterlevel"), rs.getLong("expiration")));
                        continue;
                    }
                    if (skil != null) continue;
                    int n = GameConstants.getSkillBookForSkill(rs.getInt("skillid"));
                    ret.remainingSp[n] = ret.remainingSp[n] + rs.getByte("skilllevel");
                }
                rs.close();
                ps.close();
                ret.expirationTask(false);
                ps = con.prepareStatement("SELECT * FROM characters WHERE accountid = ? ORDER BY level DESC");
                ps.setInt(1, ret.accountid);
                rs = ps.executeQuery();
                int maxlevel_ = 0;
                while (rs.next()) {
                    if (rs.getInt("id") != charid) {
                        int maxlevel = rs.getShort("level") / 10;
                        if (maxlevel > 20) {
                            maxlevel = 20;
                        }
                        if (maxlevel <= maxlevel_) continue;
                        maxlevel_ = maxlevel;
                        ret.BlessOfFairy_Origin = rs.getString("name");
                        continue;
                    }
                    if (charid >= 17000 || compensate_previousEvans || ret.job < 2200 || ret.job > 2218) continue;
                    int i = 0;
                    while (i <= GameConstants.getSkillBook(ret.job)) {
                        int n = i++;
                        ret.remainingSp[n] = ret.remainingSp[n] + 2;
                    }
                    ret.setQuestAdd(MapleQuest.getInstance(170000), (byte)0, null);
                }
                ret.skills.put(SkillFactory.getSkill(GameConstants.getBOF_ForJob(ret.job)), new SkillEntry((byte)maxlevel_, (byte) 0, -1L));
                ps.close();
                rs.close();
                ps = con.prepareStatement("SELECT * FROM skillmacros WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    int position = rs.getInt("position");
                    ret.skillMacros[position] = new SkillMacro(rs.getInt("skill1"), rs.getInt("skill2"), rs.getInt("skill3"), rs.getString("name"), rs.getInt("shout"), position);
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT `key`,`type`,`action` FROM keymap WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                Map<Integer, Pair<Byte, Integer>> keyb = ret.keylayout.Layout();
                while (rs.next()) {
                    keyb.put(rs.getInt("key"), new Pair<Byte, Integer>(rs.getByte("type"), rs.getInt("action")));
                }
                rs.close();
                ps.close();
                ret.keylayout.unchanged();
                ps = con.prepareStatement("SELECT `locationtype`,`map` FROM savedlocations WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.savedLocations[rs.getInt((String)"locationtype")] = rs.getInt("map");
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT `characterid_to`,`when` FROM famelog WHERE characterid = ? AND DATEDIFF(NOW(),`when`) < 30");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                ret.lastfametime = 0L;
                ret.lastmonthfameids = new ArrayList<Integer>(31);
                while (rs.next()) {
                    ret.lastfametime = Math.max(ret.lastfametime, rs.getTimestamp("when").getTime());
                    ret.lastmonthfameids.add(rs.getInt("characterid_to"));
                }
                rs.close();
                ps.close();
                ret.buddylist.loadFromDb(charid);
                ret.storage = MapleStorage.loadStorage(ret.accountid);
                ret.cs = new CashShop(ret.accountid, charid, ret.getJob());
                ps = con.prepareStatement("SELECT sn FROM wishlist WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                int i = 0;
                while (rs.next()) {
                    ret.wishlist[i] = rs.getInt("sn");
                    ++i;
                }
                while (i < 10) {
                    ret.wishlist[i] = 0;
                    ++i;
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT mapid FROM trocklocations WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                int r = 0;
                while (rs.next()) {
                    ret.rocks[r] = rs.getInt("mapid");
                    ++r;
                }
                while (r < 10) {
                    ret.rocks[r] = 999999999;
                    ++r;
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT mapid FROM regrocklocations WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                r = 0;
                while (rs.next()) {
                    ret.regrocks[r] = rs.getInt("mapid");
                    ++r;
                }
                while (r < 5) {
                    ret.regrocks[r] = 999999999;
                    ++r;
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT * FROM mountdata WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                if (!rs.next()) {
                    throw new RuntimeException("No mount data found on SQL column");
                }
                IItem mount = ret.getInventory(MapleInventoryType.EQUIPPED).getItem((short)-18);
                ret.mount = new MapleMount(ret, mount != null ? mount.getItemId() : 0, ret.job > 1000 && ret.job < 2000 ? 10001004 : (ret.job >= 2000 ? (ret.job == 2001 || ret.job >= 2200 ? 20011004 : (ret.job >= 3000 ? 30001004 : 20001004)) : 1004), rs.getByte("Fatigue"), rs.getByte("Level"), rs.getInt("Exp"));
                ps.close();
                rs.close();
                ret.stats.recalcLocalStats(true);
            } else {
                for (Pair<IItem, MapleInventoryType> mit : ItemLoader.INVENTORY.loadItems(true, charid).values()) {
                    ret.getInventory(mit.getRight()).addFromDB(mit.getLeft());
                }
            }
        }
        catch (SQLException ess) {
            ess.printStackTrace();
            System.out.println("加载角色数据信息出错...");
            FileoutputUtil.outputFileError("log\\Packet_Except.log", ess);
        }
        finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            }
            catch (SQLException ignore) {}
        }
        return ret;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static void saveNewCharToDB(MapleCharacter chr, int type, boolean db) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        PreparedStatement pse = null;
        ResultSet rs = null;
        try {
            con.setTransactionIsolation(1);
            con.setAutoCommit(false);
            ps = con.prepareStatement("INSERT INTO characters (level, fame, str, dex, luk, `int`, exp, hp, mp, maxhp, maxmp, sp, ap, gm, skincolor, gender, job, hair, face, map, meso, hpApUsed, spawnpoint, party, buddyCapacity, monsterbookcover, dojo_pts, dojoRecord, pets, subcategory, marriageId, currentrep, totalrep, prefix, accountid, name, world) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 1);
            ps.setInt(1, 1);
            ps.setShort(2, (short)0);
            PlayerStats stat = chr.stats;
            ps.setShort(3, stat.getStr());
            ps.setShort(4, stat.getDex());
            ps.setShort(5, stat.getInt());
            ps.setShort(6, stat.getLuk());
            ps.setInt(7, 0);
            ps.setShort(8, stat.getHp());
            ps.setShort(9, stat.getMp());
            ps.setShort(10, stat.getMaxHp());
            ps.setShort(11, stat.getMaxMp());
            ps.setString(12, "0,0,0,0,0,0,0,0,0,0");
            ps.setShort(13, (short)0);
            ps.setByte(14, (byte)0);
            ps.setByte(15, chr.skinColor);
            ps.setByte(16, chr.gender);
            ps.setShort(17, chr.job);
            ps.setInt(18, chr.hair);
            ps.setInt(19, chr.face);
            ps.setInt(20, type == 1 ? 10000 : (type == 0 ? 130030000 : (type == 2 ? 140000000 : 910000000)));
            ps.setInt(21, chr.meso);
            ps.setShort(22, (short)0);
            ps.setByte(23, (byte)0);
            ps.setInt(24, -1);
            ps.setByte(25, chr.buddylist.getCapacity());
            ps.setInt(26, 0);
            ps.setInt(27, 0);
            ps.setInt(28, 0);
            ps.setString(29, "-1,-1,-1");
            ps.setInt(30, 0);
            ps.setInt(31, 0);
            ps.setInt(32, 0);
            ps.setInt(33, 0);
            ps.setInt(34, chr.prefix);
            ps.setInt(35, chr.getAccountID());
            ps.setString(36, chr.name);
            ps.setByte(37, chr.world);
            ps.executeUpdate();
            rs = ps.getGeneratedKeys();
            if (!rs.next()) {
                throw new DatabaseException("Inserting char failed.");
            }
            chr.id = rs.getInt(1);
            ps.close();
            rs.close();
            ps = con.prepareStatement("INSERT INTO queststatus (`queststatusid`, `characterid`, `quest`, `status`, `time`, `forfeited`, `customData`) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)", 1);
            pse = con.prepareStatement("INSERT INTO queststatusmobs VALUES (DEFAULT, ?, ?, ?)");
            ps.setInt(1, chr.id);
            for (MapleQuestStatus q : chr.quests.values()) {
                ps.setInt(2, q.getQuest().getId());
                ps.setInt(3, q.getStatus());
                ps.setInt(4, (int)(q.getCompletionTime() / 1000L));
                ps.setInt(5, q.getForfeited());
                ps.setString(6, q.getCustomData());
                ps.executeUpdate();
                rs = ps.getGeneratedKeys();
                rs.next();
                if (q.hasMobKills()) {
                    for (int mob2 : q.getMobKills().keySet()) {
                        pse.setInt(1, rs.getInt(1));
                        pse.setInt(2, mob2);
                        pse.setInt(3, q.getMobKills(mob2));
                        pse.executeUpdate();
                    }
                }
                rs.close();
            }
            ps.close();
            pse.close();
            ps = con.prepareStatement("INSERT INTO inventoryslot (characterid, `equip`, `use`, `setup`, `etc`, `cash`) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            ps.setByte(2, (byte)32);
            ps.setByte(3, (byte)32);
            ps.setByte(4, (byte)32);
            ps.setByte(5, (byte)32);
            ps.setByte(6, (byte)60);
            ps.execute();
            ps.close();
            ps = con.prepareStatement("INSERT INTO mountdata (characterid, `Level`, `Exp`, `Fatigue`) VALUES (?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            ps.setByte(2, (byte)1);
            ps.setInt(3, 0);
            ps.setByte(4, (byte)0);
            ps.execute();
            ps.close();
            ArrayList<Pair<IItem, MapleInventoryType>> listing = new ArrayList<Pair<IItem, MapleInventoryType>>();
            for (MapleInventory iv : chr.inventory) {
                for (IItem item : iv.list()) {
                    listing.add(new Pair<IItem, MapleInventoryType>(item, iv.getType()));
                }
            }
            ItemLoader.INVENTORY.saveItems(listing, con, chr.id);
            int[] array1 = new int[]{2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 23, 25, 26, 27, 29, 31, 34, 35, 37, 38, 40, 41, 43, 44, 45, 46, 48, 50, 56, 57, 59, 60, 61, 62, 63, 64, 65};
            int[] array2 = new int[]{4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6};
            int[] array3 = new int[]{10, 12, 13, 18, 24, 21, 8, 5, 0, 4, 1, 19, 14, 15, 52, 2, 17, 11, 3, 20, 16, 23, 9, 50, 51, 6, 22, 7, 53, 54, 100, 101, 102, 103, 104, 105, 106};
            ps = con.prepareStatement("INSERT INTO keymap (characterid, `key`, `type`, `action`) VALUES (?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            for (int i = 0; i < array1.length; ++i) {
                ps.setInt(2, array1[i]);
                ps.setInt(3, array2[i]);
                ps.setInt(4, array3[i]);
                ps.execute();
            }
            ps.close();
            con.commit();
        }
        catch (Exception e) {
            e.printStackTrace();
            FileoutputUtil.outputFileError("log\\Packet_Except.log", e);
            System.err.println("[charsave] Error saving character data");
            try {
                con.rollback();
            }
            catch (SQLException ex) {
                e.printStackTrace();
                FileoutputUtil.outputFileError("log\\Packet_Except.log", ex);
                System.err.println("[charsave] Error Rolling Back");
            }
        }
        finally {
            try {
                if (pse != null) {
                    pse.close();
                }
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
                con.setAutoCommit(true);
                con.setTransactionIsolation(4);
            }
            catch (SQLException e) {
                e.printStackTrace();
                FileoutputUtil.outputFileError("log\\Packet_Except.log", e);
                System.err.println("[charsave] Error going back to autocommit mode");
            }
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public void saveToDB(boolean dc, boolean fromcs) {
        if (this.isClone()) {
            return;
        }
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        PreparedStatement pse = null;
        ResultSet rs = null;
        try {
            int i;
            con.setTransactionIsolation(1);
            con.setAutoCommit(false);
            ps = con.prepareStatement("UPDATE characters SET level = ?, fame = ?, str = ?, dex = ?, luk = ?, `int` = ?, exp = ?, hp = ?, mp = ?, maxhp = ?, maxmp = ?, sp = ?, ap = ?, gm = ?, skincolor = ?, gender = ?, job = ?, hair = ?, face = ?, map = ?, meso = ?, hpApUsed = ?, spawnpoint = ?, party = ?, buddyCapacity = ?, monsterbookcover = ?, dojo_pts = ?, dojoRecord = ?, pets = ?, subcategory = ?, marriageId = ?, currentrep = ?, totalrep = ?, charmessage = ?, expression = ?, constellation = ?, blood = ?, month = ?, day = ?, beans = ?, prefix = ?, skillzq = ?, bosslog = ?, grname = ?, jzname = ?, mrfbrw = ?, mrsjrw = ?, mrsgrw = ?, mrsbossrw = ?, hythd = ?, mrsgrwa = ?, mrfbrwa = ?, mrsbossrwa = ?, mrsgrws = ?,  mrsbossrws = ?, mrfbrws = ?, mrsgrwas = ?,  mrsbossrwas = ?, mrfbrwas = ?, ddj = ?, vip = ?, name = ? WHERE id = ?", 1);
            ps.setInt(1, this.level);
            ps.setShort(2, this.fame);
            ps.setShort(3, this.stats.getStr());
            ps.setShort(4, this.stats.getDex());
            ps.setShort(5, this.stats.getLuk());
            ps.setShort(6, this.stats.getInt());
            ps.setInt(7, this.exp);
            ps.setShort(8, this.stats.getHp() < 1 ? (short)50 : this.stats.getHp());
            ps.setShort(9, this.stats.getMp());
            ps.setShort(10, this.stats.getMaxHp());
            ps.setShort(11, this.stats.getMaxMp());
            StringBuilder sps = new StringBuilder();
            for (int i2 = 0; i2 < this.remainingSp.length; ++i2) {
                sps.append(this.remainingSp[i2]);
                sps.append(",");
            }
            String sp = sps.toString();
            ps.setString(12, sp.substring(0, sp.length() - 1));
            ps.setShort(13, this.remainingAp);
            ps.setByte(14, this.gmLevel);
            ps.setByte(15, this.skinColor);
            ps.setByte(16, this.gender);
            ps.setShort(17, this.job);
            ps.setInt(18, this.hair);
            ps.setInt(19, this.face);
            if (!fromcs && this.map != null) {
                if (this.map.getForcedReturnId() != 999999999) {
                    ps.setInt(20, this.map.getForcedReturnId());
                } else {
                    ps.setInt(20, this.stats.getHp() < 1 ? this.map.getReturnMapId() : this.map.getId());
                }
            } else {
                ps.setInt(20, this.mapid);
            }
            ps.setInt(21, this.meso);
            ps.setShort(22, this.hpApUsed);
            if (this.map == null) {
                ps.setByte(23, (byte)0);
            } else {
                MaplePortal closest = this.map.findClosestSpawnpoint(this.getPosition());
                ps.setByte(23, (byte)(closest != null ? closest.getId() : 0));
            }
            ps.setInt(24, this.party != null ? this.party.getId() : -1);
            ps.setShort(25, this.buddylist.getCapacity());
            ps.setInt(26, this.bookCover);
            ps.setInt(27, this.dojo);
            ps.setInt(28, this.dojoRecord);
            StringBuilder petz = new StringBuilder();
            int petLength = 0;
            for (MaplePet pet : this.pets) {
                pet.saveToDb();
                if (!pet.getSummoned()) continue;
                petz.append(pet.getInventoryPosition());
                petz.append(",");
                ++petLength;
            }
            while (petLength < 3) {
                petz.append("-1,");
                ++petLength;
            }
            String petstring = petz.toString();
            ps.setString(29, petstring.substring(0, petstring.length() - 1));
            ps.setByte(30, this.subcategory);
            ps.setInt(31, this.marriageId);
            ps.setInt(32, this.currentrep);
            ps.setInt(33, this.totalrep);
            ps.setString(34, this.charmessage);
            ps.setInt(35, this.expression);
            ps.setInt(36, this.constellation);
            ps.setInt(37, this.blood);
            ps.setInt(38, this.month);
            ps.setInt(39, this.day);
            ps.setInt(40, this.beans);
            ps.setInt(41, this.prefix);
            ps.setInt(42, this.skillzq);
            ps.setInt(43, this.bosslog);
            ps.setInt(44, this.grname);
            ps.setInt(45, this.jzname);
            ps.setInt(46, this.mrfbrw);
            ps.setInt(47, this.mrsjrw);
            ps.setInt(48, this.mrsgrw);
            ps.setInt(49, this.mrsbossrw);
            ps.setInt(50, this.hythd);
            ps.setInt(51, this.mrsgrwa);
            ps.setInt(52, this.mrfbrwa);
            ps.setInt(53, this.mrsbossrwa);
            ps.setInt(54, this.mrsgrws);
            ps.setInt(55, this.mrsbossrws);
            ps.setInt(56, this.mrfbrws);
            ps.setInt(57, this.mrsgrwas);
            ps.setInt(58, this.mrsbossrwas);
            ps.setInt(59, this.mrfbrwas);
            ps.setInt(60, this.ddj);
            ps.setInt(61, this.vip);
            ps.setString(62, this.name);
            ps.setInt(63, this.id);
            if (ps.executeUpdate() < 1) {
                ps.close();
                throw new DatabaseException("Character not in database (" + this.id + ")");
            }
            ps.close();
            this.deleteWhereCharacterId(con, "DELETE FROM skillmacros WHERE characterid = ?");
            for (int i3 = 0; i3 < 5; ++i3) {
                SkillMacro macro = this.skillMacros[i3];
                if (macro == null) continue;
                ps = con.prepareStatement("INSERT INTO skillmacros (characterid, skill1, skill2, skill3, name, shout, position) VALUES (?, ?, ?, ?, ?, ?, ?)");
                ps.setInt(1, this.id);
                ps.setInt(2, macro.getSkill1());
                ps.setInt(3, macro.getSkill2());
                ps.setInt(4, macro.getSkill3());
                ps.setString(5, macro.getName());
                ps.setInt(6, macro.getShout());
                ps.setInt(7, i3);
                ps.execute();
                ps.close();
            }
            this.deleteWhereCharacterId(con, "DELETE FROM inventoryslot WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO inventoryslot (characterid, `equip`, `use`, `setup`, `etc`, `cash`) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, this.id);
            ps.setByte(2, this.getInventory(MapleInventoryType.EQUIP).getSlotLimit());
            ps.setByte(3, this.getInventory(MapleInventoryType.USE).getSlotLimit());
            ps.setByte(4, this.getInventory(MapleInventoryType.SETUP).getSlotLimit());
            ps.setByte(5, this.getInventory(MapleInventoryType.ETC).getSlotLimit());
            ps.setByte(6, this.getInventory(MapleInventoryType.CASH).getSlotLimit());
            ps.execute();
            ps.close();
            this.saveInventory(con);
            this.deleteWhereCharacterId(con, "DELETE FROM questinfo WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO questinfo (`characterid`, `quest`, `customData`) VALUES (?, ?, ?)");
            ps.setInt(1, this.id);
            for (Map.Entry<Integer, String> q : this.questinfo.entrySet()) {
                ps.setInt(2, q.getKey());
                ps.setString(3, q.getValue());
                ps.execute();
            }
            ps.close();
            this.deleteWhereCharacterId(con, "DELETE FROM queststatus WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO queststatus (`queststatusid`, `characterid`, `quest`, `status`, `time`, `forfeited`, `customData`) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)", 1);
            pse = con.prepareStatement("INSERT INTO queststatusmobs VALUES (DEFAULT, ?, ?, ?)");
            ps.setInt(1, this.id);
            for (MapleQuestStatus q : this.quests.values()) {
                ps.setInt(2, q.getQuest().getId());
                ps.setInt(3, q.getStatus());
                ps.setInt(4, (int)(q.getCompletionTime() / 1000L));
                ps.setInt(5, q.getForfeited());
                ps.setString(6, q.getCustomData());
                ps.executeUpdate();
                rs = ps.getGeneratedKeys();
                rs.next();
                if (q.hasMobKills()) {
                    for (int mob2 : q.getMobKills().keySet()) {
                        pse.setInt(1, rs.getInt(1));
                        pse.setInt(2, mob2);
                        pse.setInt(3, q.getMobKills(mob2));
                        pse.executeUpdate();
                    }
                }
                rs.close();
            }
            ps.close();
            pse.close();
            this.deleteWhereCharacterId(con, "DELETE FROM skills WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO skills (characterid, skillid, skilllevel, masterlevel, expiration) VALUES (?, ?, ?, ?, ?)");
            ps.setInt(1, this.id);
            for (Map.Entry<ISkill, SkillEntry> skill : this.skills.entrySet()) {
                if (!GameConstants.isApplicableSkill(skill.getKey().getId())) continue;
                ps.setInt(2, skill.getKey().getId());
                ps.setByte(3, skill.getValue().skillevel);
                ps.setByte(4, skill.getValue().masterlevel);
                ps.setLong(5, skill.getValue().expiration);
                ps.execute();
            }
            ps.close();
            List<MapleCoolDownValueHolder> cd = this.getCooldowns();
            if (dc && cd.size() > 0) {
                ps = con.prepareStatement("INSERT INTO skills_cooldowns (charid, SkillID, StartTime, length) VALUES (?, ?, ?, ?)");
                ps.setInt(1, this.getId());
                for (MapleCoolDownValueHolder cooling : cd) {
                    ps.setInt(2, cooling.skillId);
                    ps.setLong(3, cooling.startTime);
                    ps.setLong(4, cooling.length);
                    ps.execute();
                }
                ps.close();
            }
            this.deleteWhereCharacterId(con, "DELETE FROM savedlocations WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO savedlocations (characterid, `locationtype`, `map`) VALUES (?, ?, ?)");
            ps.setInt(1, this.id);
            for (SavedLocationType savedLocationType : SavedLocationType.values()) {
                if (this.savedLocations[savedLocationType.getValue()] == -1) continue;
                ps.setInt(2, savedLocationType.getValue());
                ps.setInt(3, this.savedLocations[savedLocationType.getValue()]);
                ps.execute();
            }
            ps.close();
            ps = con.prepareStatement("DELETE FROM achievements WHERE accountid = ?");
            ps.setInt(1, this.accountid);
            ps.executeUpdate();
            ps.close();
            ps = con.prepareStatement("INSERT INTO achievements(charid, achievementid, accountid) VALUES(?, ?, ?)");
            for (Integer achid : this.finishedAchievements) {
                ps.setInt(1, this.id);
                ps.setInt(2, achid);
                ps.setInt(3, this.accountid);
                ps.executeUpdate();
            }
            ps.close();
            this.deleteWhereCharacterId(con, "DELETE FROM buddies WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO buddies (characterid, `buddyid`, `pending`,`groupname`) VALUES (?, ?, ?,?)");
            ps.setInt(1, this.id);
            for (BuddylistEntry entry : this.buddylist.getBuddies()) {
                ps.setInt(2, entry.getCharacterId());
                ps.setInt(3, entry.isVisible() ? 0 : 1);
                ps.setString(4, entry.getGroup());
                ps.execute();
            }
            ps.close();
            ps = con.prepareStatement("UPDATE accounts SET `ACash` = ?, `mPoints` = ?, `points` = ?, `vpoints` = ? WHERE id = ?");
            ps.setInt(1, this.acash);
            ps.setInt(2, this.maplepoints);
            ps.setInt(3, this.points);
            ps.setInt(4, this.vpoints);
            ps.setInt(5, this.client.getAccID());
            ps.execute();
            ps.close();
            if (this.storage != null) {
                this.storage.saveToDB();
            }
            if (this.cs != null) {
                this.cs.save();
            }
            PlayerNPC.updateByCharId(this);
            this.keylayout.saveKeys(con,this.id);
            this.mount.saveMount(this.id);
            this.monsterbook.saveCards(this.id);
            this.deleteWhereCharacterId(con, "DELETE FROM wishlist WHERE characterid = ?");
            for (i = 0; i < this.getWishlistSize(); ++i) {
                ps = con.prepareStatement("INSERT INTO wishlist(characterid, sn) VALUES(?, ?) ");
                ps.setInt(1, this.getId());
                ps.setInt(2, this.wishlist[i]);
                ps.execute();
                ps.close();
            }
            this.deleteWhereCharacterId(con, "DELETE FROM trocklocations WHERE characterid = ?");
            for (i = 0; i < this.rocks.length; ++i) {
                if (this.rocks[i] == 999999999) continue;
                ps = con.prepareStatement("INSERT INTO trocklocations(characterid, mapid) VALUES(?, ?) ");
                ps.setInt(1, this.getId());
                ps.setInt(2, this.rocks[i]);
                ps.execute();
                ps.close();
            }
            this.deleteWhereCharacterId(con, "DELETE FROM regrocklocations WHERE characterid = ?");
            for (i = 0; i < this.regrocks.length; ++i) {
                if (this.regrocks[i] == 999999999) continue;
                ps = con.prepareStatement("INSERT INTO regrocklocations(characterid, mapid) VALUES(?, ?) ");
                ps.setInt(1, this.getId());
                ps.setInt(2, this.regrocks[i]);
                ps.execute();
                ps.close();
            }
            con.commit();
        }
        catch (Exception e) {
            e.printStackTrace();
            FileoutputUtil.outputFileError("log\\Packet_Except.log", e);
            System.err.println(MapleClient.getLogMessage(this, "[charsave] Error saving character data") + e);
            try {
                con.rollback();
            }
            catch (SQLException ex) {
                FileoutputUtil.outputFileError("log\\Packet_Except.log", ex);
                System.err.println(MapleClient.getLogMessage(this, "[charsave] Error Rolling Back") + e);
            }
        }
        finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (pse != null) {
                    pse.close();
                }
                if (rs != null) {
                    rs.close();
                }
                con.setAutoCommit(true);
                con.setTransactionIsolation(4);
            }
            catch (SQLException e) {
                FileoutputUtil.outputFileError("log\\Packet_Except.log", e);
                System.err.println(MapleClient.getLogMessage(this, "[charsave] Error going back to autocommit mode") + e);
            }
        }
    }

    private void deleteWhereCharacterId(Connection con, String sql) throws SQLException {
        MapleCharacter.deleteWhereCharacterId(con, sql, this.id);
    }

    public static void deleteWhereCharacterId(Connection con, String sql, int id) throws SQLException {
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, id);
        ps.executeUpdate();
        ps.close();
    }

    public void saveInventory(Connection con) throws SQLException {
        ArrayList<Pair<IItem, MapleInventoryType>> listing = new ArrayList<Pair<IItem, MapleInventoryType>>();
        for (MapleInventory iv : this.inventory) {
            for (IItem item : iv.list()) {
                listing.add(new Pair<IItem, MapleInventoryType>(item, iv.getType()));
            }
        }
        if (con != null) {
            ItemLoader.INVENTORY.saveItems(listing, con, this.id);
        } else {
            ItemLoader.INVENTORY.saveItems(listing, this.id);
        }
    }

    public final PlayerStats getStat() {
        return this.stats;
    }

    public final PlayerRandomStream CRand() {
        return this.CRand;
    }

    public final void QuestInfoPacket(MaplePacketLittleEndianWriter mplew) {
        mplew.writeShort(this.questinfo.size());
        for (Map.Entry<Integer, String> q : this.questinfo.entrySet()) {
            mplew.writeShort(q.getKey());
            mplew.writeMapleAsciiString(q.getValue() == null ? "" : q.getValue());
        }
    }

    public final void updateInfoQuest(int questid, String data) {
        this.questinfo.put(questid, data);
        this.client.getSession().write((Object)MaplePacketCreator.updateInfoQuest(questid, data));
    }

    public final String getInfoQuest(int questid) {
        if (this.questinfo.containsKey(questid)) {
            return this.questinfo.get(questid);
        }
        return "";
    }

    public final int getNumQuest() {
        int i = 0;
        for (MapleQuestStatus q : this.quests.values()) {
            if (q.getStatus() != 2 || q.isCustom()) continue;
            ++i;
        }
        return i;
    }

    public final byte getQuestStatus(int quest) {
        return this.getQuest(MapleQuest.getInstance(quest)).getStatus();
    }

    public final MapleQuestStatus getQuest(MapleQuest quest) {
        if (!this.quests.containsKey(quest)) {
            return new MapleQuestStatus(quest, (byte) 0);
        }
        return this.quests.get(quest);
    }

    public void setQuestAdd(int quest) {
        this.setQuestAddZ(MapleQuest.getInstance(quest), (byte)2, null);
    }

    public final void setQuestAddZ(MapleQuest quest, byte status, String customData) {
        MapleQuestStatus stat = new MapleQuestStatus(quest, status);
        stat.setCustomData(customData);
        this.quests.put(quest, stat);
    }

    public final void setQuestAdd(MapleQuest quest, byte status, String customData) {
        if (!this.quests.containsKey(quest)) {
            MapleQuestStatus stat = new MapleQuestStatus(quest, status);
            stat.setCustomData(customData);
            this.quests.put(quest, stat);
        }
    }

    public final MapleQuestStatus getQuestNAdd(MapleQuest quest) {
        if (!this.quests.containsKey(quest)) {
            MapleQuestStatus status = new MapleQuestStatus(quest, (byte) 0);
            this.quests.put(quest, status);
            return status;
        }
        return this.quests.get(quest);
    }

    public MapleQuestStatus getQuestRemove(MapleQuest quest) {
        return this.quests.remove(quest);
    }

    public final MapleQuestStatus getQuestNoAdd(MapleQuest quest) {
        return this.quests.get(quest);
    }

    public final void updateQuest(MapleQuestStatus quest) {
        this.updateQuest(quest, false);
    }

    public final void updateQuest(MapleQuestStatus quest, boolean update) {
        this.quests.put(quest.getQuest(), quest);
        if (!quest.isCustom()) {
            this.client.getSession().write((Object)MaplePacketCreator.updateQuest(quest));
            if (quest.getStatus() == 1 && !update) {
                this.client.getSession().write((Object)MaplePacketCreator.updateQuestInfo(this, quest.getQuest().getId(), quest.getNpc(), (byte)8));
            }
        }
    }

    public final Map<Integer, String> getInfoQuest_Map() {
        return this.questinfo;
    }

    public final Map<MapleQuest, MapleQuestStatus> getQuest_Map() {
        return this.quests;
    }

    public boolean isActiveBuffedValue(int skillid) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (!mbsvh.effect.isSkill() || mbsvh.effect.getSourceId() != skillid) continue;
            return true;
        }
        return false;
    }

    public Integer getBuffedValue(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = this.effects.get(effect);
        return mbsvh == null ? null : Integer.valueOf(mbsvh.value);
    }

    public final Integer getBuffedSkill_X(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = this.effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        return mbsvh.effect.getX();
    }

    public final Integer getBuffedSkill_Y(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = this.effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        return mbsvh.effect.getY();
    }

    public boolean isBuffFrom(MapleBuffStat stat, ISkill skill) {
        MapleBuffStatValueHolder mbsvh = this.effects.get(stat);
        if (mbsvh == null) {
            return false;
        }
        return mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() == skill.getId();
    }

    public int getBuffSource(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = this.effects.get(stat);
        return mbsvh == null ? -1 : mbsvh.effect.getSourceId();
    }

    public int getItemQuantity(int itemid, boolean checkEquipped) {
        int possesed = this.inventory[GameConstants.getInventoryType(itemid).ordinal()].countById(itemid);
        if (checkEquipped) {
            possesed += this.inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }
        return possesed;
    }

    public void setBuffedValue(MapleBuffStat effect, int value) {
        MapleBuffStatValueHolder mbsvh = this.effects.get(effect);
        if (mbsvh == null) {
            return;
        }
        mbsvh.value = value;
    }

    public Long getBuffedStarttime(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = this.effects.get(effect);
        return mbsvh == null ? null : Long.valueOf(mbsvh.startTime);
    }

    public MapleStatEffect getStatForBuff(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = this.effects.get(effect);
        return mbsvh == null ? null : mbsvh.effect;
    }

    private void prepareDragonBlood(final MapleStatEffect bloodEffect) {
        if (this.dragonBloodSchedule != null) {
            this.dragonBloodSchedule.cancel(false);
        }
        this.dragonBloodSchedule = Timer.BuffTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                if (MapleCharacter.this.stats.getHp() - bloodEffect.getX() > 1) {
                    MapleCharacter.this.cancelBuffStats(MapleBuffStat.DRAGONBLOOD);
                } else {
                    MapleCharacter.this.addHP(-bloodEffect.getX());
                    MapleCharacter.this.client.getSession().write((Object)MaplePacketCreator.showOwnBuffEffect(bloodEffect.getSourceId(), 5));
                    MapleCharacter.this.map.broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBuffeffect(MapleCharacter.this.getId(), bloodEffect.getSourceId(), 5), false);
                }
            }
        }, 4000L, 4000L);
    }

    public void startMapTimeLimitTask(int time, final MapleMap to) {
        this.client.getSession().write((Object)MaplePacketCreator.getClock(time));
        this.mapTimeLimitTask = Timer.MapTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                MapleCharacter.this.changeMap(to, to.getPortal(0));
            }
        }, time *= 1000, time);
    }

    public void startFishingTask(boolean VIP) {
        int time = GameConstants.getFishingTime(VIP, this.isGM());
        this.cancelFishingTask();
        this.fishing = Timer.EtcTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                boolean expMulti = MapleCharacter.this.haveItem(2300001, 1, false, true);
                if (!expMulti && !MapleCharacter.this.haveItem(2300000, 1, false, true)) {
                    MapleCharacter.this.cancelFishingTask();
                    return;
                }
                MapleInventoryManipulator.removeById(MapleCharacter.this.client, MapleInventoryType.USE, expMulti ? 2300001 : 2300000, 1, false, false);
                int randval = RandomRewards.getInstance().getFishingReward();
                switch (randval) {
                    case 0: {
                        int money = Randomizer.rand(expMulti ? 15 : 10, expMulti ? 7500 : 5000);
                        MapleCharacter.this.gainMeso(money, true);
                        MapleCharacter.this.client.getSession().write((Object)UIPacket.fishingUpdate((byte)1, money));
                        break;
                    }
                    case 1: {
                        int experi = Randomizer.nextInt(Math.abs(GameConstants.getExpNeededForLevel(MapleCharacter.this.level) / 1000) + 1);
                        if (experi < 1) {
                            experi = 1;
                        }
                        MapleCharacter.this.gainExp(expMulti ? experi * 3 / 2 : experi, true, false, true);
                        MapleCharacter.this.client.getSession().write((Object)UIPacket.fishingUpdate((byte)2, experi));
                        break;
                    }
                    default: {
                        if (Randomizer.nextInt(100) > 95) {
                            MapleInventoryManipulator.addById(MapleCharacter.this.client, 4001200, (short)1, (byte)0);
                            MapleCharacter.this.client.getSession().write((Object)UIPacket.fishingUpdate((byte)0, randval));
                            break;
                        }
                        MapleInventoryManipulator.addById(MapleCharacter.this.client, randval, (short)1, (byte)0);
                        MapleCharacter.this.client.getSession().write((Object)UIPacket.fishingUpdate((byte)0, randval));
                    }
                }
                MapleCharacter.this.map.broadcastMessage(UIPacket.fishingCaught(MapleCharacter.this.id));
            }
        }, time, time);
    }

    public void cancelMapTimeLimitTask() {
        if (this.mapTimeLimitTask != null) {
            this.mapTimeLimitTask.cancel(false);
        }
    }

    public void cancelFishingTask() {
        if (this.fishing != null) {
            this.fishing.cancel(false);
        }
    }

    public void registerEffect(MapleStatEffect effect, long starttime, ScheduledFuture<?> schedule) {
        this.registerEffect(effect, starttime, schedule, effect.getStatups());
    }

    public void registerEffect(MapleStatEffect effect, long starttime, ScheduledFuture<?> schedule, List<Pair<MapleBuffStat, Integer>> statups) {
        int cloneSize;
        if (effect.isHide()) {
            this.hidden = true;
            this.map.broadcastMessage(this, MaplePacketCreator.removePlayerFromMap(this.getId(), this), false);
        } else if (effect.isDragonBlood()) {
            this.prepareDragonBlood(effect);
        } else if (effect.isBerserk()) {
            this.checkBerserk();
        } else if (effect.isMonsterRiding_()) {
            this.getMount().startSchedule();
        } else if (effect.isBeholder()) {
            this.prepareBeholderEffect();
        }
        int clonez = 0;
        for (Pair<MapleBuffStat, Integer> statup : statups) {
            if (statup.getLeft() == MapleBuffStat.ILLUSION) {
                clonez = statup.getRight();
            }
            int value = statup.getRight();
            if (statup.getLeft() == MapleBuffStat.MONSTER_RIDING && effect.getSourceId() == 5221006 && this.battleshipHP <= 0) {
                this.battleshipHP = value;
            }
            this.effects.put(statup.getLeft(), new MapleBuffStatValueHolder(effect, starttime, schedule, value));
        }
        if (clonez > 0 && clonez > (cloneSize = Math.max(this.getNumClones(), this.getCloneSize()))) {
            for (int i = 0; i < clonez - cloneSize; ++i) {
                this.cloneLook();
            }
        }
        this.stats.recalcLocalStats();
    }

    public List<MapleBuffStat> getBuffStats(MapleStatEffect effect, long startTime) {
        ArrayList<MapleBuffStat> bstats = new ArrayList<MapleBuffStat>();
        Map<MapleBuffStat, MapleBuffStatValueHolder> allBuffs = new EnumMap<MapleBuffStat, MapleBuffStatValueHolder>(this.effects);
        for (Map.Entry<MapleBuffStat, MapleBuffStatValueHolder> stateffect : allBuffs.entrySet()) {
            MapleBuffStatValueHolder mbsvh = stateffect.getValue();
            if (!mbsvh.effect.sameSource(effect) || startTime != -1L && startTime != mbsvh.startTime) continue;
            bstats.add((MapleBuffStat)stateffect.getKey());
        }
        return bstats;
    }

    private boolean deregisterBuffStats(List<MapleBuffStat> stats) {
        boolean clonez = false;
        ArrayList<MapleBuffStatValueHolder> effectsToCancel = new ArrayList<MapleBuffStatValueHolder>(stats.size());
        for (MapleBuffStat stat : stats) {
            MapleBuffStatValueHolder mbsvh = this.effects.remove(stat);
            if (mbsvh == null) continue;
            boolean addMbsvh = true;
            for (MapleBuffStatValueHolder contained : effectsToCancel) {
                if (mbsvh.startTime != contained.startTime || contained.effect != mbsvh.effect) continue;
                addMbsvh = false;
            }
            if (addMbsvh) {
                effectsToCancel.add(mbsvh);
            }
            if (stat == MapleBuffStat.SUMMON || stat == MapleBuffStat.PUPPET || stat == MapleBuffStat.REAPER) {
                int summonId = mbsvh.effect.getSourceId();
                MapleSummon summon = this.summons.get(summonId);
                if (summon == null) continue;
                this.map.broadcastMessage(MaplePacketCreator.removeSummon(summon, true));
                this.map.removeMapObject(summon);
                this.removeVisibleMapObject(summon);
                this.summons.remove(summonId);
                if (summon.getSkill() != 1321007) continue;
                if (this.beholderHealingSchedule != null) {
                    this.beholderHealingSchedule.cancel(false);
                    this.beholderHealingSchedule = null;
                }
                if (this.beholderBuffSchedule == null) continue;
                this.beholderBuffSchedule.cancel(false);
                this.beholderBuffSchedule = null;
                continue;
            }
            if (stat == MapleBuffStat.DRAGONBLOOD) {
                if (this.dragonBloodSchedule == null) continue;
                this.dragonBloodSchedule.cancel(false);
                this.dragonBloodSchedule = null;
                continue;
            }
            if (stat != MapleBuffStat.ILLUSION) continue;
            this.disposeClones();
            clonez = true;
        }
        for (MapleBuffStatValueHolder cancelEffectCancelTasks : effectsToCancel) {
            if (this.getBuffStats(cancelEffectCancelTasks.effect, cancelEffectCancelTasks.startTime).size() != 0 || cancelEffectCancelTasks.schedule == null) continue;
            cancelEffectCancelTasks.schedule.cancel(false);
        }
        return clonez;
    }

    public void cancelEffect(MapleStatEffect effect, boolean overwrite, long startTime) {
        this.cancelEffect(effect, overwrite, startTime, effect.getStatups());
    }

    public void cancelEffect(MapleStatEffect effect, boolean overwrite, long startTime, List<Pair<MapleBuffStat, Integer>> statups) {
        List<MapleBuffStat> buffstats;
        if (!overwrite) {
            buffstats = this.getBuffStats(effect, startTime);
        } else {
            buffstats = new ArrayList<MapleBuffStat>(statups.size());
            for (Pair<MapleBuffStat, Integer> statup : statups) {
                buffstats.add(statup.getLeft());
            }
        }
        if (buffstats.size() <= 0) {
            return;
        }
        boolean clonez = this.deregisterBuffStats(buffstats);
        if (effect.isMagicDoor()) {
            if (!this.getDoors().isEmpty()) {
                MapleDoor door = this.getDoors().iterator().next();
                for (MapleCharacter chr : door.getTarget().getCharacters()) {
                    door.sendDestroyData(chr.client);
                }
                for (MapleCharacter chr : door.getTown().getCharacters()) {
                    door.sendDestroyData(chr.client);
                }
                for (MapleDoor destroyDoor : this.getDoors()) {
                    door.getTarget().removeMapObject(destroyDoor);
                    door.getTown().removeMapObject(destroyDoor);
                }
                this.removeDoor();
                this.silentPartyUpdate();
            }
        } else if (effect.isMonsterRiding_()) {
            this.getMount().cancelSchedule();
        } else if (effect.isMonsterRiding()) {
            this.cancelEffectFromBuffStat(MapleBuffStat.MECH_CHANGE);
        } else if (effect.isMonsterS()) {
            this.getMount().cancelSchedule();
        } else if (effect.isAranCombo()) {
            this.combo = 0;
        }
        if (!overwrite) {
            if (effect.isMonsterS()) {
                this.cancelPlayerBuffs(buffstats, effect);
            } else {
                this.cancelPlayerBuffs(buffstats);
            }
            if (effect.isHide() && this.client.getChannelServer().getPlayerStorage().getCharacterById(this.getId()) != null) {
                this.hidden = false;
                this.map.broadcastMessage(this, MaplePacketCreator.spawnPlayerMapobject(this), false);
                for (MaplePet pet : this.pets) {
                    if (!pet.getSummoned()) continue;
                    this.map.broadcastMessage(this, PetPacket.showPet(this, pet, false, false), false);
                }
                for (WeakReference<MapleCharacter> chr : this.clones) {
                    if (chr.get() == null) continue;
                    this.map.broadcastMessage((MapleCharacter)chr.get(), MaplePacketCreator.spawnPlayerMapobject((MapleCharacter)chr.get()), false);
                }
            }
        }
        if (!clonez) {
            for (WeakReference<MapleCharacter> chr : this.clones) {
                if (chr.get() == null) continue;
                ((MapleCharacter)chr.get()).cancelEffect(effect, overwrite, startTime);
            }
        }
    }

    public void cancelBuffStats(MapleBuffStat ... stat) {
        List<MapleBuffStat> buffStatList = Arrays.asList(stat);
        this.deregisterBuffStats(buffStatList);
        this.cancelPlayerBuffs(buffStatList);
    }

    public void cancelEffectFromBuffStat(MapleBuffStat stat) {
        if (this.effects.get(stat) != null) {
            this.cancelEffect(this.effects.get((Object)stat).effect, false, -1L);
        }
    }

    private void cancelPlayerBuffs(List<MapleBuffStat> buffstats) {
        boolean write;
        write = this.client.getChannelServer().getPlayerStorage().getCharacterById(this.getId()) != null;
        if (buffstats.contains(MapleBuffStat.HOMING_BEACON)) {
            if (write) {
                this.client.getSession().write((Object)MaplePacketCreator.cancelHoming());
            }
        } else if (buffstats.contains(MapleBuffStat.MONSTER_RIDING)) {
            this.client.getSession().write((Object)MaplePacketCreator.cancelBuffMONSTER(buffstats));
            this.map.broadcastMessage(this, MaplePacketCreator.cancelForeignBuffMONSTER(this.getId(), buffstats), false);
        } else {
            this.client.getSession().write((Object)MaplePacketCreator.cancelBuff(buffstats));
            this.map.broadcastMessage(this, MaplePacketCreator.cancelForeignBuff(this.getId(), buffstats), false);
        }
    }

    private void cancelPlayerBuffs(List<MapleBuffStat> buffstats, MapleStatEffect effect) {
        if (effect.isMonsterS()) {
            this.client.getSession().write((Object)MaplePacketCreator.cancelBuffMONSTERS(buffstats));
            this.map.broadcastMessage(this, MaplePacketCreator.cancelForeignBuffMONSTERS(this.getId(), buffstats), false);
        }
    }

    public void dispel() {
        if (!this.isHidden()) {
            LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(this.effects.values());
            for (MapleBuffStatValueHolder mbsvh : allBuffs) {
                if (!mbsvh.effect.isSkill() || mbsvh.schedule == null || mbsvh.effect.isMorph()) continue;
                this.cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    public void dispelSkill(int skillid) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (skillid == 0) {
                if (!mbsvh.effect.isSkill() || mbsvh.effect.getSourceId() != 4331003 && mbsvh.effect.getSourceId() != 4331002 && mbsvh.effect.getSourceId() != 4341002 && mbsvh.effect.getSourceId() != 22131001 && mbsvh.effect.getSourceId() != 1321007 && mbsvh.effect.getSourceId() != 2121005 && mbsvh.effect.getSourceId() != 2221005 && mbsvh.effect.getSourceId() != 2311006 && mbsvh.effect.getSourceId() != 2321003 && mbsvh.effect.getSourceId() != 3111002 && mbsvh.effect.getSourceId() != 3111005 && mbsvh.effect.getSourceId() != 3211002 && mbsvh.effect.getSourceId() != 3211005 && mbsvh.effect.getSourceId() != 4111002) continue;
                this.cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                break;
            }
            if (!mbsvh.effect.isSkill() || mbsvh.effect.getSourceId() != skillid) continue;
            this.cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            break;
        }
    }

    public void dispelBuff(int skillid) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.getSourceId() != skillid) continue;
            this.cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            break;
        }
    }

    public void cancelAllBuffs_() {
        this.effects.clear();
    }

    public void cancelAllBuffs() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            this.cancelEffect(mbsvh.effect, false, mbsvh.startTime);
        }
    }

    public void cancelMorphs() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            switch (mbsvh.effect.getSourceId()) {
                case 5111005: 
                case 5121003: 
                case 13111005: 
                case 15111002: {
                    return;
                }
            }
            if (!mbsvh.effect.isMorph()) continue;
            this.cancelEffect(mbsvh.effect, false, mbsvh.startTime);
        }
    }

    public int getMorphState() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (!mbsvh.effect.isMorph()) continue;
            return mbsvh.effect.getSourceId();
        }
        return -1;
    }

    public void silentGiveBuffs(List<PlayerBuffValueHolder> buffs) {
        if (buffs == null) {
            return;
        }
        for (PlayerBuffValueHolder mbsvh : buffs) {
            mbsvh.effect.silentApplyBuff(this, mbsvh.startTime);
        }
    }

    public List<PlayerBuffValueHolder> getAllBuffs() {
        ArrayList<PlayerBuffValueHolder> ret = new ArrayList<PlayerBuffValueHolder>();
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            ret.add(new PlayerBuffValueHolder(mbsvh.startTime, mbsvh.effect));
        }
        return ret;
    }

    public void cancelMagicDoor() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (!mbsvh.effect.isMagicDoor()) continue;
            this.cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            break;
        }
    }

    public int getSkillLevel(int skillid) {
        return this.getSkillLevel(SkillFactory.getSkill(skillid));
    }

    public final void handleEnergyCharge1(int skillid, int targets) {
        ISkill echskill = SkillFactory.getSkill(skillid);
        byte skilllevel = this.getSkillLevel(echskill);
        if (skilllevel > 0) {
            MapleStatEffect echeff = echskill.getEffect(skilllevel);
            System.out.println("获取技能等级：" + skilllevel);
            if (targets > 0) {
                if (this.getBuffedValue(MapleBuffStat.ENERGY_CHARGE) == null) {
                    echeff.applyEnergyBuff(this, true);
                } else {
                    Integer energyLevel = this.getBuffedValue(MapleBuffStat.ENERGY_CHARGE);
                    System.out.println("获取能量等级：" + energyLevel);
                    if (energyLevel > 10000) {
                        energyLevel = 10000;
                    }
                    if (energyLevel <= 10000) {
                        energyLevel = energyLevel + echeff.getX() * targets;
                        System.out.println("获取能等级：" + energyLevel);
                        this.client.getSession().write((Object)MaplePacketCreator.showOwnBuffEffect(skillid, 2));
                        this.map.broadcastMessage(this, MaplePacketCreator.showBuffeffect(this.id, skillid, 2), false);
                        if (energyLevel > 10000) {
                            energyLevel = 10000;
                        }
                        System.out.println("获取能量E：" + energyLevel);
                        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.ENERGY_CHARGE, energyLevel));
                        this.client.getSession().write((Object)MaplePacketCreator.能量条(stat, energyLevel / 10000));
                        if (energyLevel == 10000) {
                            this.client.getSession().write((Object)MaplePacketCreator.givePirateBuff(energyLevel, 50, stat));
                            this.client.getSession().write((Object)MaplePacketCreator.giveEnergyChargeTest(energyLevel, echeff.getDuration() / 10000));
                        }
                        this.setBuffedValue(MapleBuffStat.ENERGY_CHARGE, energyLevel);
                        Timer.WorldTimer.getInstance().register(new Runnable(){

                            @Override
                            public void run() {
                                Integer energyLevel = MapleCharacter.this.getBuffedValue(MapleBuffStat.ENERGY_CHARGE);
                                try {
                                    energyLevel = energyLevel - 100;
                                    if (energyLevel <= 0) {
                                        energyLevel = 0;
                                        MapleCharacter.this.setBuffedValue(MapleBuffStat.ENERGY_CHARGE, energyLevel);
                                    }
                                    List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.ENERGY_CHARGE, energyLevel));
                                    MapleCharacter.this.client.getSession().write((Object)MaplePacketCreator.能量条(stat, energyLevel / 10000));
                                    MapleCharacter.this.setBuffedValue(MapleBuffStat.ENERGY_CHARGE, energyLevel);
                                }
                                catch (Exception e) {
                                    // empty catch block
                                }
                            }
                        }, 600000L);
                    }
                }
            }
        }
    }

    public final void handleEnergyCharge(int skillid, int targets) {
        ISkill echskill = SkillFactory.getSkill(skillid);
        byte skilllevel = this.getSkillLevel(echskill);
        if (skilllevel > 0) {
            MapleStatEffect echeff = echskill.getEffect(skilllevel);
            if (targets > 0) {
                if (this.nengl <= 10L) {
                    ++this.nengl;
                } else if (this.getBuffedValue(MapleBuffStat.ENERGY_CHARGE) == null) {
                    echeff.applyEnergyBuff(this, true);
                } else {
                    Integer energyLevel = this.getBuffedValue(MapleBuffStat.ENERGY_CHARGE);
                    if (energyLevel <= 15000 && this.nengls <= 20L) {
                        energyLevel = energyLevel + echeff.getX() * targets;
                        this.client.getSession().write((Object)MaplePacketCreator.showOwnBuffEffect(skillid, 2));
                        this.map.broadcastMessage(this, MaplePacketCreator.showBuffeffect(this.id, skillid, 2), false);
                        energyLevel = 15000;
                        if (this.nengls <= 20L) {
                            ++this.nengls;
                        }
                        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.ENERGY_CHARGE, energyLevel));
                        this.client.getSession().write((Object)MaplePacketCreator.能量条(stat, energyLevel / 1000));
                        this.setBuffedValue(MapleBuffStat.ENERGY_CHARGE, energyLevel);
                    } else if (this.nengls > 20L) {
                        this.nengls = 0L;
                        this.nengl = 0L;
                        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.ENERGY_CHARGE, 0));
                        this.client.getSession().write((Object)MaplePacketCreator.能量条(stat, 0));
                        this.setBuffedValue(MapleBuffStat.ENERGY_CHARGE, 0);
                    }
                }
            }
        }
    }

    public final void handleBattleshipHP(int damage) {
        if (this.isActiveBuffedValue(5221006)) {
            this.battleshipHP -= damage;
            if (this.battleshipHP <= 0) {
                this.battleshipHP = 0;
                MapleStatEffect effect = this.getStatForBuff(MapleBuffStat.MONSTER_RIDING);
                this.client.getSession().write((Object)MaplePacketCreator.skillCooldown(5221006, effect.getCooldown()));
                this.addCooldown(5221006, System.currentTimeMillis(), effect.getCooldown() * 1000);
                this.dispelSkill(5221006);
            }
        }
    }

    public final void handleOrbgain() {
        ISkill combo;
        ISkill advcombo;
        int orbcount = this.getBuffedValue(MapleBuffStat.COMBO);
        switch (this.getJob()) {
            case 1110: 
            case 1111: 
            case 1112: {
                combo = SkillFactory.getSkill(11111001);
                advcombo = SkillFactory.getSkill(11110005);
                break;
            }
            default: {
                combo = SkillFactory.getSkill(1111002);
                advcombo = SkillFactory.getSkill(1120003);
            }
        }
        MapleStatEffect ceffect = null;
        byte advComboSkillLevel = this.getSkillLevel(advcombo);
        if (advComboSkillLevel > 0) {
            ceffect = advcombo.getEffect(advComboSkillLevel);
        } else if (this.getSkillLevel(combo) > 0) {
            ceffect = combo.getEffect(this.getSkillLevel(combo));
        } else {
            return;
        }
        if (orbcount < ceffect.getX() + 1) {
            int neworbcount = orbcount + 1;
            if (advComboSkillLevel > 0 && ceffect.makeChanceResult() && neworbcount < ceffect.getX() + 1) {
                ++neworbcount;
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.COMBO, neworbcount));
            this.setBuffedValue(MapleBuffStat.COMBO, neworbcount);
            int duration = ceffect.getDuration();
            this.client.getSession().write((Object)MaplePacketCreator.giveBuff(combo.getId(), duration += (int)(this.getBuffedStarttime(MapleBuffStat.COMBO) - System.currentTimeMillis()), stat, ceffect));
            this.map.broadcastMessage(this, MaplePacketCreator.giveForeignBuff(this, this.getId(), stat, ceffect), false);
        }
    }

    public void handleOrbconsume() {
        ISkill combo;
        switch (this.getJob()) {
            case 1110: 
            case 1111: {
                combo = SkillFactory.getSkill(11111001);
                break;
            }
            default: {
                combo = SkillFactory.getSkill(1111002);
            }
        }
        if (this.getSkillLevel(combo) <= 0) {
            return;
        }
        MapleStatEffect ceffect = this.getStatForBuff(MapleBuffStat.COMBO);
        if (ceffect == null) {
            return;
        }
        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.COMBO, 1));
        this.setBuffedValue(MapleBuffStat.COMBO, 1);
        int duration = ceffect.getDuration();
        this.client.getSession().write((Object)MaplePacketCreator.giveBuff(combo.getId(), duration += (int)(this.getBuffedStarttime(MapleBuffStat.COMBO) - System.currentTimeMillis()), stat, ceffect));
        this.map.broadcastMessage(this, MaplePacketCreator.giveForeignBuff(this, this.getId(), stat, ceffect), false);
    }

    public void silentEnforceMaxHpMp() {
        this.stats.setMp(this.stats.getMp());
        this.stats.setHp(this.stats.getHp(), true);
    }

    public void enforceMaxHpMp() {
        ArrayList<Pair<MapleStat, Integer>> statups = new ArrayList<Pair<MapleStat, Integer>>(2);
        if (this.stats.getMp() > this.stats.getCurrentMaxMp()) {
            this.stats.setMp(this.stats.getMp());
            statups.add(new Pair<MapleStat, Integer>(MapleStat.MP, Integer.valueOf(this.stats.getMp())));
        }
        if (this.stats.getHp() > this.stats.getCurrentMaxHp()) {
            this.stats.setHp(this.stats.getHp());
            statups.add(new Pair<MapleStat, Integer>(MapleStat.HP, Integer.valueOf(this.stats.getHp())));
        }
        if (statups.size() > 0) {
            this.client.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statups, this.getJob()));
        }
    }

    public MapleMap getMap() {
        return this.map;
    }

    public MonsterBook getMonsterBook() {
        return this.monsterbook;
    }

    public void setMap(MapleMap newmap) {
        this.map = newmap;
    }

    public void setMap(int PmapId) {
        this.mapid = PmapId;
    }

    public int getMapId() {
        if (this.map != null) {
            return this.map.getId();
        }
        return this.mapid;
    }

    public byte getInitialSpawnpoint() {
        return this.initialSpawnPoint;
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public final String getBlessOfFairyOrigin() {
        return this.BlessOfFairy_Origin;
    }

    public final short getLevel() {
        return this.level;
    }

    public final short getFame() {
        return this.fame;
    }

    public final int getDojo() {
        return this.dojo;
    }

    public final int getDojoRecord() {
        return this.dojoRecord;
    }

    public final int getFallCounter() {
        return this.fallcounter;
    }

    public final MapleClient getClient() {
        return this.client;
    }

    public final void setClient(MapleClient client) {
        this.client = client;
    }

    public int getExp() {
        return this.exp;
    }

    public short getRemainingAp() {
        return this.remainingAp;
    }

    public int getRemainingSp() {
        return this.remainingSp[GameConstants.getSkillBook(this.job)];
    }

    public int getRemainingSp(int skillbook) {
        return this.remainingSp[skillbook];
    }

    public int[] getRemainingSps() {
        return this.remainingSp;
    }

    public int getRemainingSpSize() {
        int ret = 0;
        for (int i = 0; i < this.remainingSp.length; ++i) {
            if (this.remainingSp[i] <= 0) continue;
            ++ret;
        }
        return ret;
    }

    public short getHpApUsed() {
        return this.hpApUsed;
    }

    public boolean isHidden() {
        return this.hidden;
    }

    public void setHpApUsed(short hpApUsed) {
        this.hpApUsed = hpApUsed;
    }

    public byte getSkinColor() {
        return this.skinColor;
    }

    public void setSkinColor(byte skinColor) {
        this.skinColor = skinColor;
    }

    public short getJob() {
        return this.job;
    }

    public byte getGender() {
        return this.gender;
    }

    public int getHair() {
        return this.hair;
    }

    public int getFace() {
        return this.face;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public void setHair(int hair) {
        this.hair = hair;
    }

    public void setFace(int face) {
        this.face = face;
    }

    public void setFame(short fame) {
        this.fame = fame;
    }

    public void setDojo(int dojo) {
        this.dojo = dojo;
    }

    public void setDojoRecord(boolean reset) {
        if (reset) {
            this.dojo = 0;
            this.dojoRecord = 0;
        } else {
            this.dojoRecord = (byte)(this.dojoRecord + 1);
        }
    }

    public void setFallCounter(int fallcounter) {
        this.fallcounter = fallcounter;
    }

    public Point getOldPosition() {
        return this.old;
    }

    public void setOldPosition(Point x) {
        this.old = x;
    }

    public void setRemainingAp(short remainingAp) {
        this.remainingAp = remainingAp;
    }

    public void setRemainingSp(int remainingSp) {
        this.remainingSp[GameConstants.getSkillBook((int)this.job)] = remainingSp;
    }

    public void setRemainingSp(int remainingSp, int skillbook) {
        this.remainingSp[skillbook] = remainingSp;
    }

    public void setGender(byte gender) {
        this.gender = gender;
    }

    public void setInvincible(boolean invinc) {
        this.invincible = invinc;
    }

    public boolean isInvincible() {
        return this.invincible;
    }

    public CheatTracker getCheatTracker() {
        return this.anticheat;
    }

    public BuddyList getBuddylist() {
        return this.buddylist;
    }

    public void addFame(int famechange) {
        this.fame = (short)(this.fame + famechange);
    }

    public void changeMapBanish(int mapid, String portal, String msg) {
        this.dropMessage(5, msg);
        MapleMap map = this.client.getChannelServer().getMapFactory().getMap(mapid);
        this.changeMap(map, map.getPortal(portal));
    }

    public void changeMap(MapleMap to, Point pos) {
        this.changeMapInternal(to, pos, MaplePacketCreator.getWarpToMap(to, 128, this), null);
    }

    public void changeMap(MapleMap to, MaplePortal pto) {
        this.changeMapInternal(to, pto.getPosition(), MaplePacketCreator.getWarpToMap(to, pto.getId(), this), null);
    }

    public void changeMapPortal(MapleMap to, MaplePortal pto) {
        this.changeMapInternal(to, pto.getPosition(), MaplePacketCreator.getWarpToMap(to, pto.getId(), this), pto);
    }

    private void changeMapInternal(MapleMap to, Point pos, MaplePacket warpPacket, MaplePortal pto) {
        boolean pyramid;
        if (to == null) {
            return;
        }
        int nowmapid = this.map.getId();
        if (this.eventInstance != null) {
            this.eventInstance.changedMap(this, to.getId());
        }
        pyramid = this.pyramidSubway != null;
        if (this.map.getId() == nowmapid) {
            this.client.getSession().write(warpPacket);
            this.map.removePlayer(this);
            if (!this.isClone() && this.client.getChannelServer().getPlayerStorage().getCharacterById(this.getId()) != null) {
                this.map = to;
                this.setPosition(pos);
                to.addPlayer(this);
                this.stats.relocHeal();
            }
        }
        if (this.party != null) {
            this.silentPartyUpdate();
            this.getClient().getSession().write((Object)MaplePacketCreator.updateParty(this.getClient().getChannel(), this.party, PartyOperation.SILENT_UPDATE, null));
            this.updatePartyMemberHP();
        }
        if (pyramid && this.pyramidSubway != null) {
            this.pyramidSubway.onChangeMap(this, to.getId());
        }
        if (this.hasFakeChar()) {
            for (FakeCharacter ch : this.getFakeChars()) {
                if (!ch.follow()) continue;
                ch.getFakeChar().getMap().removePlayer(ch.getFakeChar());
            }
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public void leaveMap() {
        this.visibleMapObjectsLock.writeLock().lock();
        try {
            this.visibleMapObjects.clear();
        }
        finally {
            this.visibleMapObjectsLock.writeLock().unlock();
        }
        if (this.chair != 0) {
            this.cancelFishingTask();
            this.chair = 0;
        }
        this.cancelMapTimeLimitTask();
    }

    public void changeJob(int newJob) {
        try {
            boolean isEv = GameConstants.isEvan(this.job) || GameConstants.isResist(this.job);
            this.job = (short)newJob;
            if (newJob != 0 && newJob != 1000 && newJob != 2000 && newJob != 2001 && newJob != 3000) {
                if (isEv) {
                    int n = GameConstants.getSkillBook(newJob);
                    this.remainingSp[n] = this.remainingSp[n] + 5;
                    this.client.getSession().write((Object)UIPacket.getSPMsg((byte)5, (short)newJob));
                } else {
                    int n = GameConstants.getSkillBook(newJob);
                    this.remainingSp[n] = this.remainingSp[n] + 1;
                    if (newJob % 10 >= 2) {
                        int n2 = GameConstants.getSkillBook(newJob);
                        this.remainingSp[n2] = this.remainingSp[n2] + 2;
                    }
                }
            }
            if (newJob > 0 && !this.isGM()) {
                this.resetStatsByJob(true);
                if (!GameConstants.isEvan(newJob)) {
                    if (this.getLevel() > (newJob == 200 ? (short)8 : 10) && newJob % 100 == 0 && newJob % 1000 / 100 > 0) {
                        int n = GameConstants.getSkillBook(newJob);
                        this.remainingSp[n] = this.remainingSp[n] + 3 * (this.getLevel() - (newJob == 200 ? 8 : 10));
                    }
                } else if (newJob == 2200) {
                    MapleQuest.getInstance(22100).forceStart(this, 0, null);
                    MapleQuest.getInstance(22100).forceComplete(this, 0);
                    this.expandInventory((byte)1, 4);
                    this.expandInventory((byte)2, 4);
                    this.expandInventory((byte)3, 4);
                    this.expandInventory((byte)4, 4);
                    this.client.getSession().write((Object)MaplePacketCreator.getEvanTutorial("UI/tutorial/evan/14/0"));
                    this.dropMessage(5, "The baby Dragon hatched and appears to have something to tell you. Click the baby Dragon to start a conversation.");
                }
            }
            this.client.getSession().write((Object)MaplePacketCreator.updateSp(this, false, isEv));
            this.updateSingleStat(MapleStat.JOB, newJob);
            int maxhp = this.stats.getMaxHp();
            int maxmp = this.stats.getMaxMp();
            switch (this.job) {
                case 100: 
                case 1100: 
                case 2100: 
                case 3200: {
                    maxhp += Randomizer.rand(200, 250);
                    break;
                }
                case 200: 
                case 2200: 
                case 2210: {
                    maxmp += Randomizer.rand(100, 150);
                    break;
                }
                case 300: 
                case 400: 
                case 500: 
                case 3300: 
                case 3500: {
                    maxhp += Randomizer.rand(100, 150);
                    maxmp += Randomizer.rand(25, 50);
                    break;
                }
                case 110: {
                    maxhp += Randomizer.rand(300, 350);
                    break;
                }
                case 120: 
                case 130: 
                case 510: 
                case 512: 
                case 1110: 
                case 2110: 
                case 3210: {
                    maxhp += Randomizer.rand(300, 350);
                    break;
                }
                case 210: 
                case 220: 
                case 230: {
                    maxmp += Randomizer.rand(400, 450);
                    break;
                }
                case 310: 
                case 312: 
                case 320: 
                case 322: 
                case 410: 
                case 412: 
                case 420: 
                case 422: 
                case 430: 
                case 520: 
                case 522: 
                case 1310: 
                case 1410: 
                case 3310: 
                case 3510: {
                    maxhp += Randomizer.rand(300, 350);
                    maxhp += Randomizer.rand(150, 200);
                    break;
                }
                case 800: 
                case 900: {
                    maxhp += 30000;
                    maxhp += 30000;
                }
            }
            if (maxhp >= 30000) {
                maxhp = 30000;
            }
            if (maxmp >= 30000) {
                maxmp = 30000;
            }
            this.stats.setMaxHp((short)maxhp);
            this.stats.setMaxMp((short)maxmp);
            this.stats.setHp((short)maxhp);
            this.stats.setMp((short)maxmp);
            ArrayList<Pair<MapleStat, Integer>> statup = new ArrayList<Pair<MapleStat, Integer>>(4);
            statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, maxhp));
            statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, maxmp));
            statup.add(new Pair<MapleStat, Integer>(MapleStat.HP, maxhp));
            statup.add(new Pair<MapleStat, Integer>(MapleStat.MP, maxmp));
            this.stats.recalcLocalStats();
            this.client.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statup, this.getJob()));
            this.map.broadcastMessage(this, MaplePacketCreator.showForeignEffect(this.getId(), 8), false);
            this.silentPartyUpdate();
            this.guildUpdate();
            this.familyUpdate();
            if (this.dragon != null) {
                this.map.broadcastMessage(MaplePacketCreator.removeDragon(this.id));
                this.map.removeMapObject(this.dragon);
                this.dragon = null;
            }
            this.baseSkills();
            if (newJob >= 2200 && newJob <= 2218) {
                if (this.getBuffedValue(MapleBuffStat.MONSTER_RIDING) != null) {
                    this.cancelBuffStats(MapleBuffStat.MONSTER_RIDING);
                }
                this.makeDragon();
                this.map.spawnDragon(this.dragon);
                this.map.updateMapObjectVisibility(this, this.dragon);
            }
        }
        catch (Exception e) {
            FileoutputUtil.outputFileError("Logs/Log_Script_Except.rtf", e);
        }
    }

    public void baseSkills() {
        List<Integer> skills;
        if (GameConstants.getJobNumber(this.job) >= 3 && (skills = SkillFactory.getSkillsByJob(this.job)) != null) {
            for (int i : skills) {
                ISkill skil = SkillFactory.getSkill(i);
                if (skil == null || skil.isInvisible() || !skil.isFourthJob() || this.getSkillLevel(skil) > 0 || this.getMasterLevel(skil) > 0 || skil.getMasterLevel() <= 0) continue;
                this.changeSkillLevel(skil, (byte)0, (byte)skil.getMasterLevel());
            }
        }
    }

    public void makeDragon() {
        this.dragon = new MapleDragon(this);
    }

    public MapleDragon getDragon() {
        return this.dragon;
    }

    public void gainAp(short ap) {
        this.remainingAp = (short)(this.remainingAp + ap);
        this.updateSingleStat(MapleStat.AVAILABLEAP, this.remainingAp);
    }

    public void gainSP(int sp) {
        int n = GameConstants.getSkillBook(this.job);
        this.remainingSp[n] = this.remainingSp[n] + sp;
        this.client.getSession().write((Object)MaplePacketCreator.updateSp(this, false));
        this.client.getSession().write((Object)UIPacket.getSPMsg((byte)sp, this.job));
    }

    public void gainSP(int sp, int skillbook) {
        int n = skillbook;
        this.remainingSp[n] = this.remainingSp[n] + sp;
        this.client.getSession().write((Object)MaplePacketCreator.updateSp(this, false));
        this.client.getSession().write((Object)UIPacket.getSPMsg((byte)sp, this.job));
    }

    public void resetSP(int sp) {
        for (int i = 0; i < this.remainingSp.length; ++i) {
            this.remainingSp[i] = sp;
        }
        this.updateSingleStat(MapleStat.AVAILABLESP, this.getRemainingSp());
    }

    public void resetAPSP() {
        for (int i = 0; i < this.remainingSp.length; ++i) {
            this.remainingSp[i] = 0;
        }
        this.client.getSession().write((Object)MaplePacketCreator.updateSp(this, false));
        this.gainAp((short) -this.remainingAp);
    }

    public int getAllSkillLevels() {
        int rett = 0;
        for (Map.Entry<ISkill, SkillEntry> ret : this.skills.entrySet()) {
            if (((Skill)ret.getKey()).isBeginnerSkill() || ret.getValue().skillevel <= 0) continue;
            rett += ret.getValue().skillevel;
        }
        return rett;
    }

    public void changeSkillLevel(ISkill skill, byte newLevel, byte newMasterlevel) {
        if (skill == null) {
            return;
        }
        this.changeSkillLevel(skill, newLevel, newMasterlevel, skill.isTimeLimited() ? System.currentTimeMillis() + 2592000000L : -1L);
    }

    /*
     * Enabled force condition propagation
     * Lifted jumps to return sites
     */
    public void changeSkillLevel(ISkill skill, byte newLevel, byte newMasterlevel, long expiration) {
        if (skill == null || !GameConstants.isApplicableSkill(skill.getId()) && !GameConstants.isApplicableSkill_(skill.getId())) {
            return;
        }
        this.client.getSession().write((Object)MaplePacketCreator.updateSkill(skill.getId(), newLevel, newMasterlevel, expiration));
        if (newLevel == 0 && newMasterlevel == 0) {
            if (!this.skills.containsKey(skill)) return;
            this.skills.remove(skill);
        } else {
            this.skills.put(skill, new SkillEntry(newLevel, newMasterlevel, expiration));
        }
        if (GameConstants.isRecoveryIncSkill(skill.getId())) {
            this.stats.relocHeal();
            return;
        } else {
            if (!GameConstants.isElementAmp_Skill(skill.getId())) return;
            this.stats.recalcLocalStats();
        }
    }

    /*
     * Enabled force condition propagation
     * Lifted jumps to return sites
     */
    public void changeSkillLevel_Skip(ISkill skill, byte newLevel, byte newMasterlevel) {
        if (skill == null) {
            return;
        }
        this.client.getSession().write((Object)MaplePacketCreator.updateSkill(skill.getId(), newLevel, newMasterlevel, -1L));
        if (newLevel == 0 && newMasterlevel == 0) {
            if (!this.skills.containsKey(skill)) return;
            this.skills.remove(skill);
            return;
        } else {
            this.skills.put(skill, new SkillEntry(newLevel, newMasterlevel, -1L));
        }
    }

    public void playerDead() {
        int i;
        MapleStatEffect statss = this.getStatForBuff(MapleBuffStat.SOUL_STONE);
        if (statss != null) {
            this.dropMessage(5, "You have been revived by Soul Stone.");
            this.getStat().setHp(this.getStat().getMaxHp() / 100 * statss.getX());
            this.setStance(0);
            this.changeMap(this.getMap(), this.getMap().getPortal(0));
            return;
        }
        if (this.getEventInstance() != null) {
            this.getEventInstance().playerKilled(this);
        }
        this.dispelSkill(0);
        this.cancelEffectFromBuffStat(MapleBuffStat.MORPH);
        this.cancelEffectFromBuffStat(MapleBuffStat.MONSTER_RIDING);
        this.cancelEffectFromBuffStat(MapleBuffStat.SUMMON);
        this.cancelEffectFromBuffStat(MapleBuffStat.REAPER);
        this.cancelEffectFromBuffStat(MapleBuffStat.PUPPET);
        this.checkFollow();
        int[] charmID = new int[]{5130000, 5130002, 5131000, 4031283, 4140903};
        int possesed = 0;
        for (i = 0; i < charmID.length; ++i) {
            int quantity = this.getItemQuantity(charmID[i], false);
            if (possesed != 0 || quantity <= 0) continue;
            possesed = quantity;
            break;
        }
        if (possesed > 0) {
            this.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(5, "因使用了 [护身符] 死亡后您的经验不会减少！剩余 (" + --possesed + " 个)"));
            MapleInventoryManipulator.removeById(this.getClient(), MapleItemInformationProvider.getInstance().getInventoryType(charmID[i]), charmID[i], 1, true, false);
        } else if (this.job != 0 && this.job != 1000 && this.job != 2000 && this.job != 2001 && this.job != 3000) {
            int charms = this.getItemQuantity(5130000, false);
            if (charms > 0) {
                MapleInventoryManipulator.removeById(this.client, MapleInventoryType.CASH, 5130000, 1, true, false);
                if (--charms > 255) {
                    charms = 255;
                }
                this.client.getSession().write((Object)MTSCSPacket.useCharm((byte)charms, (byte)0));
            } else {
                float diepercentage = 0.0f;
                int expforlevel = GameConstants.getExpNeededForLevel(this.level);
                if (this.map.isTown() || FieldLimitType.RegularExpLoss.check(this.map.getFieldLimit())) {
                    diepercentage = 0.01f;
                } else {
                    float v8 = 0.0f;
                    v8 = this.job / 100 == 3 ? 0.08f : 0.2f;
                    diepercentage = (float)((double)(v8 / (float)this.stats.getLuk()) + 0.05);
                }
                int v10 = (int)((long)this.exp - (long)((double)expforlevel * (double)diepercentage));
                if (v10 < 0) {
                    v10 = 0;
                }
                this.exp = v10;
            }
        }
        this.updateSingleStat(MapleStat.EXP, this.exp);
        if (!this.stats.checkEquipDurabilitys(this, -100)) {
            this.dropMessage(5, "An item has run out of durability but has no inventory room to go to.");
        }
        if (this.pyramidSubway != null) {
            this.stats.setHp(50);
            this.pyramidSubway.fail(this);
        }
    }

    public void updatePartyMemberHP() {
        if (this.party != null) {
            int channel = this.client.getChannel();
            for (MaplePartyCharacter partychar : this.party.getMembers()) {
                MapleCharacter other;
                if (partychar.getMapid() != this.getMapId() || partychar.getChannel() != channel || (other = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(partychar.getName())) == null) continue;
                other.getClient().getSession().write((Object)MaplePacketCreator.updatePartyMemberHP(this.getId(), this.stats.getHp(), this.stats.getCurrentMaxHp()));
            }
        }
    }

    public void receivePartyMemberHP() {
        if (this.party == null) {
            return;
        }
        int channel = this.client.getChannel();
        for (MaplePartyCharacter partychar : this.party.getMembers()) {
            MapleCharacter other;
            if (partychar.getMapid() != this.getMapId() || partychar.getChannel() != channel || (other = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(partychar.getName())) == null) continue;
            this.client.getSession().write((Object)MaplePacketCreator.updatePartyMemberHP(other.getId(), other.getStat().getHp(), other.getStat().getCurrentMaxHp()));
        }
    }

    public void healHP(int delta) {
        this.addHP(delta);
    }

    public void healMP(int delta) {
        this.addMP(delta);
    }

    public void addHP(int delta) {
        if (this.stats.setHp(this.stats.getHp() + delta)) {
            this.updateSingleStat(MapleStat.HP, this.stats.getHp());
        }
    }

    public void addMP(int delta) {
        if (this.stats.setMp(this.stats.getMp() + delta)) {
            this.updateSingleStat(MapleStat.MP, this.stats.getMp());
        }
    }

    public void addMPHP(int hpDiff, int mpDiff) {
        ArrayList<Pair<MapleStat, Integer>> statups = new ArrayList<Pair<MapleStat, Integer>>();
        if (this.stats.setHp(this.stats.getHp() + hpDiff)) {
            statups.add(new Pair<MapleStat, Integer>(MapleStat.HP, Integer.valueOf(this.stats.getHp())));
        }
        if (this.stats.setMp(this.stats.getMp() + mpDiff)) {
            statups.add(new Pair<MapleStat, Integer>(MapleStat.MP, Integer.valueOf(this.stats.getMp())));
        }
        if (statups.size() > 0) {
            this.client.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statups, this.getJob()));
        }
    }

    public void updateSingleStat(MapleStat stat, int newval) {
        this.updateSingleStat(stat, newval, false);
    }

    public void updateSingleStat(MapleStat stat, int newval, boolean itemReaction) {
        Pair<MapleStat, Integer> statpair = new Pair<MapleStat, Integer>(stat, newval);
        this.client.getSession().write((Object)MaplePacketCreator.updatePlayerStats(Collections.singletonList(statpair), itemReaction, this.getJob()));
    }

    public void gainExp(int total, boolean show, boolean inChat, boolean white) {
        try {
            int prevexp = this.getExp();
            int needed = GameConstants.getExpNeededForLevel(this.level);
            if (this.level >= Integer.parseInt(ServerProperties.getProperty("KinMS.MLevel")) || GameConstants.isKOC(this.job) && this.level >= Integer.parseInt(ServerProperties.getProperty("KinMS.QLevel"))) {
                if (this.exp + total > needed) {
                    this.setExp(needed);
                } else {
                    this.exp += total;
                }
            } else {
                boolean leveled = false;
                if (this.exp + total >= needed) {
                    this.exp += total;
                    this.levelUp();
                    leveled = true;
                    needed = GameConstants.getExpNeededForLevel(this.level);
                    if (this.exp > needed) {
                        this.setExp(needed);
                    }
                } else {
                    this.exp += total;
                }
                if (total > 0) {
                    this.familyRep(prevexp, needed, leveled);
                }
            }
            if (total != 0) {
                if (this.exp < 0) {
                    if (total > 0) {
                        this.setExp(needed);
                    } else if (total < 0) {
                        this.setExp(0);
                    }
                }
                if (show) {
                    this.client.getSession().write((Object)MaplePacketCreator.GainEXP_Others(total, inChat, white));
                }
                this.updateSingleStat(MapleStat.EXP, this.getExp());
            }
        }
        catch (Exception e) {
            FileoutputUtil.outputFileError("Logs/Log_Script_Except.rtf", e);
        }
    }

    public void familyRep(int prevexp, int needed, boolean leveled) {
        if (this.mfc != null) {
            int sensen;
            int onepercent = needed / 100;
            int percentrep = prevexp / onepercent + this.getExp() / onepercent;
            if (leveled) {
                percentrep = 100 - percentrep + this.level / 2;
            }
            if (percentrep > 0 && (sensen = World.Family.setRep(this.mfc.getFamilyId(), this.mfc.getSeniorId(), percentrep, this.level)) > 0) {
                World.Family.setRep(this.mfc.getFamilyId(), sensen, percentrep / 2, this.level);
            }
        }
    }

    public void gainExpMonster(int gain, boolean show, boolean white, byte pty, int Class_Bonus_EXP, int Equipment_Bonus_EXP, int Premium_Bonus_EXP) {
        int 结婚经验 = gain * this.getvip() / 10;
        if (结婚经验 <= 0 && this.getvip() >= 1) {
            结婚经验 = 1;
        } else if (this.getvip() == 0) {
            结婚经验 = 0;
        }
        int total = gain + Class_Bonus_EXP + Equipment_Bonus_EXP + Premium_Bonus_EXP + 结婚经验;
        int partyinc = 0;
        int prevexp = gain;
        int zdjy = 0;
        if (this.getParty() != null) {
            zdjy = this.getParty().getMembers().size();
        }
        if (zdjy > 1) {
            // empty if block
        }
        if (pty > 1) {
            partyinc = (int)((float)((double)gain / 20.0) * (float)(pty + 1));
            total += partyinc;
        }
        if (gain > 0 && total < gain) {
            total = Integer.MAX_VALUE;
        }
        int needed = GameConstants.getExpNeededForLevel(this.level);
        if (this.level >= Integer.parseInt(ServerProperties.getProperty("KinMS.MLevel")) || GameConstants.isKOC(this.job) && this.level >= Integer.parseInt(ServerProperties.getProperty("KinMS.QLevel"))) {
            if (this.exp + total > needed) {
                this.setExp(needed);
            } else {
                this.exp += total;
            }
        } else {
            boolean leveled = false;
            if (this.exp + total >= needed) {
                this.exp += total;
                this.levelUp();
                leveled = true;
                needed = GameConstants.getExpNeededForLevel(this.level);
                if (this.exp > needed) {
                    this.setExp(needed);
                }
            } else {
                this.exp += total;
            }
            if (total > 0) {
                this.familyRep(prevexp, needed, leveled);
            }
        }
        if (gain != 0) {
            if (this.exp < 0) {
                if (gain > 0) {
                    this.setExp(GameConstants.getExpNeededForLevel(this.level));
                } else if (gain < 0) {
                    this.setExp(0);
                }
            }
            this.updateSingleStat(MapleStat.EXP, this.getExp());
            if (show) {
                this.client.getSession().write((Object)MaplePacketCreator.GainEXP_Monster(gain, white, partyinc, Class_Bonus_EXP, Equipment_Bonus_EXP, Premium_Bonus_EXP, 结婚经验));
            }
        }
    }

    public void forceReAddItem_NoUpdate(IItem item, MapleInventoryType type) {
        this.getInventory(type).removeSlot(item.getPosition());
        this.getInventory(type).addFromDB(item);
    }

    public void forceReAddItem(IItem item, MapleInventoryType type) {
        this.forceReAddItem_NoUpdate(item, type);
        if (type != MapleInventoryType.UNDEFINED) {
            this.client.getSession().write((Object)MaplePacketCreator.updateSpecialItemUse(item, type == MapleInventoryType.EQUIPPED ? (byte)1 : type.getType()));
        }
    }

    public void forceReAddItem_Flag(IItem item, MapleInventoryType type) {
        this.forceReAddItem_NoUpdate(item, type);
        if (type != MapleInventoryType.UNDEFINED) {
            this.client.getSession().write((Object)MaplePacketCreator.updateSpecialItemUse_(item, type == MapleInventoryType.EQUIPPED ? (byte)1 : type.getType()));
        }
    }

    public void silentPartyUpdate() {
        if (this.party != null) {
            World.Party.updateParty(this.party.getId(), PartyOperation.SILENT_UPDATE, new MaplePartyCharacter(this));
        }
    }

    public boolean isGM() {
        return this.gmLevel > 0;
    }

    public boolean isAdmin() {
        return this.gmLevel >= 2;
    }

    public int getGMLevel() {
        return this.gmLevel;
    }

    public void setGMLevel(byte g) {
        this.gmLevel = g;
    }

    public boolean isPlayer() {
        return this.gmLevel == 0;
    }

    public boolean hasGmLevel(int level) {
        return this.gmLevel >= level;
    }

    public final MapleInventory getInventory(MapleInventoryType type) {
        return this.inventory[type.ordinal()];
    }

    public final MapleInventory[] getInventorys() {
        return this.inventory;
    }

    public final void expirationTask() {
        this.expirationTask(true);
    }

    public final void expirationTask(boolean pending) {
        if (pending) {
            if (this.pendingExpiration != null) {
                for (Integer z : this.pendingExpiration) {
                    this.client.getSession().write((Object)MTSCSPacket.itemExpired(z));
                }
            }
            this.pendingExpiration = null;
            if (this.pendingSkills != null) {
                for (Integer z : this.pendingSkills) {
                    this.client.getSession().write((Object)MaplePacketCreator.updateSkill(z, 0, 0, -1L));
                    this.client.getSession().write((Object)MaplePacketCreator.serverNotice(5, "[" + SkillFactory.getSkillName(z) + "] skill has expired and will not be available for use."));
                }
            }
            this.pendingSkills = null;
            return;
        }
        ArrayList<Integer> ret = new ArrayList<Integer>();
        long currenttime = System.currentTimeMillis();
        ArrayList<Pair<MapleInventoryType, IItem>> toberemove = new ArrayList<Pair<MapleInventoryType, IItem>>();
        ArrayList<IItem> tobeunlock = new ArrayList<IItem>();
        for (MapleInventoryType inv : MapleInventoryType.values()) {
            for (IItem item : this.getInventory(inv)) {
                long expiration = item.getExpiration();
                if (expiration != -1L && !GameConstants.isPet(item.getItemId()) && currenttime > expiration) {
                    if (ItemFlag.LOCK.check(item.getFlag())) {
                        tobeunlock.add(item);
                        continue;
                    }
                    if (currenttime <= expiration) continue;
                    toberemove.add(new Pair<MapleInventoryType, IItem>(inv, item));
                    continue;
                }
                if (item.getItemId() != 5000054 || item.getPet() == null || item.getPet().getSecondsLeft() > 0) continue;
                toberemove.add(new Pair<MapleInventoryType, IItem>(inv, item));
            }
        }
        for (Pair<MapleInventoryType,IItem> itemz : toberemove) {
            IItem item = itemz.getRight();
            ret.add(item.getItemId());
            this.getInventory(itemz.getLeft()).removeItem(item.getPosition(), item.getQuantity(), false);
        }
        for (IItem itemz : tobeunlock) {
            itemz.setExpiration(-1L);
            itemz.setFlag((byte)(itemz.getFlag() - ItemFlag.LOCK.getValue()));
        }
        this.pendingExpiration = ret;
        ArrayList<Integer> skilz = new ArrayList<Integer>();
        ArrayList<ISkill> toberem = new ArrayList<ISkill>();
        for (Map.Entry<ISkill, SkillEntry> skil : this.skills.entrySet()) {
            if (skil.getValue().expiration == -1L || currenttime <= skil.getValue().expiration) continue;
            toberem.add(skil.getKey());
        }
        for (ISkill skil : toberem) {
            skilz.add(skil.getId());
            this.skills.remove(skil);
        }
        this.pendingSkills = skilz;
    }

    public MapleShop getShop() {
        return this.shop;
    }

    public void setShop(MapleShop shop) {
        this.shop = shop;
    }

    public int getMeso() {
        return this.meso;
    }

    public final int[] getSavedLocations() {
        return this.savedLocations;
    }

    public int getSavedLocation(SavedLocationType type) {
        return this.savedLocations[type.getValue()];
    }

    public void saveLocation(SavedLocationType type) {
        this.savedLocations[type.getValue()] = this.getMapId();
    }

    public void saveLocation(SavedLocationType type, int mapz) {
        this.savedLocations[type.getValue()] = mapz;
    }

    public void clearSavedLocation(SavedLocationType type) {
        this.savedLocations[type.getValue()] = -1;
    }

    public int getDY() {
        return this.maplepoints;
    }

    public void setDY(int set) {
        this.maplepoints = set;
    }

    public void gainDY(int gain) {
        this.maplepoints += gain;
    }

    public void gainMeso(int gain, boolean show) {
        this.gainMeso(gain, show, false, false);
    }

    public void gainMeso(int gain, boolean show, boolean enableActions) {
        this.gainMeso(gain, show, enableActions, false);
    }

    public void gainMeso(int gain, boolean show, boolean enableActions, boolean inChat) {
        if (this.meso + gain < 0) {
            this.client.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        this.meso += gain;
        this.updateSingleStat(MapleStat.MESO, this.meso, enableActions);
        if (show) {
            this.client.getSession().write((Object)MaplePacketCreator.showMesoGain(gain, inChat));
        }
    }

    public void controlMonster(MapleMonster monster, boolean aggro) {
        if (this.clone) {
            return;
        }
        monster.setController(this);
        this.controlled.add(monster);
        this.client.getSession().write((Object)MobPacket.controlMonster(monster, false, aggro));
    }

    public void stopControllingMonster(MapleMonster monster) {
        if (this.clone) {
            return;
        }
        if (monster != null && this.controlled.contains(monster)) {
            this.controlled.remove(monster);
        }
    }

    public void checkMonsterAggro(MapleMonster monster) {
        if (this.clone || monster == null) {
            return;
        }
        if (monster.getController() == this) {
            monster.setControllerHasAggro(true);
        } else {
            monster.switchController(this, true);
        }
    }

    public Set<MapleMonster> getControlled() {
        return this.controlled;
    }

    public int getControlledSize() {
        return this.controlled.size();
    }

    public int getAccountID() {
        return this.accountid;
    }

    public void mobKilled(int id, int skillID) {
        for (MapleQuestStatus q : this.quests.values()) {
            if (q.getStatus() != 1 || !q.hasMobKills() || !q.mobKilled(id, skillID)) continue;
            this.client.getSession().write((Object)MaplePacketCreator.updateQuestMobKills(q));
            if (!q.getQuest().canComplete(this, null)) continue;
            this.client.getSession().write((Object)MaplePacketCreator.getShowQuestCompletion(q.getQuest().getId()));
        }
    }

    public final List<MapleQuestStatus> getStartedQuests() {
        LinkedList<MapleQuestStatus> ret = new LinkedList<MapleQuestStatus>();
        for (MapleQuestStatus q : this.quests.values()) {
            if (q.getStatus() != 1 || q.isCustom()) continue;
            ret.add(q);
        }
        return ret;
    }

    public final List<MapleQuestStatus> getCompletedQuests() {
        LinkedList<MapleQuestStatus> ret = new LinkedList<MapleQuestStatus>();
        for (MapleQuestStatus q : this.quests.values()) {
            if (q.getStatus() != 2 || q.isCustom()) continue;
            ret.add(q);
        }
        return ret;
    }

    public Map<ISkill, SkillEntry> getSkills() {
        return Collections.unmodifiableMap(this.skills);
    }

    public byte getSkillLevel(ISkill skill) {
        SkillEntry ret = this.skills.get(skill);
        if (ret == null || ret.skillevel <= 0) {
            return 0;
        }
        return (byte)Math.min(skill.getMaxLevel(), ret.skillevel + (skill.isBeginnerSkill() ? 0 : this.stats.incAllskill));
    }

    public byte getMasterLevel(int skill) {
        return this.getMasterLevel(SkillFactory.getSkill(skill));
    }

    public byte getMasterLevel(ISkill skill) {
        SkillEntry ret = this.skills.get(skill);
        if (ret == null) {
            return 0;
        }
        return ret.masterlevel;
    }

    public void levelUp() {
        ISkill improvingMaxMP;
        ISkill improvingMaxHP;
        byte slevel;
        this.remainingAp = GameConstants.isKOC(this.job) ? (this.level <= 70 ? (short)(this.remainingAp + 6) : (short)(this.remainingAp + 5)) : (short)(this.remainingAp + 5);
        int maxhp = this.stats.getMaxHp();
        int maxmp = this.stats.getMaxMp();
        if (this.job == 0 || this.job == 1000 || this.job == 2000 || this.job == 2001 || this.job == 3000) {
            maxhp += Randomizer.rand(12, 16);
            maxmp += Randomizer.rand(10, 12);
        } else if (this.job >= 100 && this.job <= 132) {
            improvingMaxHP = SkillFactory.getSkill(1000001);
            slevel = this.getSkillLevel(improvingMaxHP);
            if (slevel > 0) {
                maxhp += improvingMaxHP.getEffect(slevel).getX();
            }
            maxhp += Randomizer.rand(24, 28);
            maxmp += Randomizer.rand(4, 6);
        } else if (this.job >= 200 && this.job <= 232) {
            improvingMaxMP = SkillFactory.getSkill(2000001);
            slevel = this.getSkillLevel(improvingMaxMP);
            if (slevel > 0) {
                maxmp += improvingMaxMP.getEffect(slevel).getX() * 2;
            }
            maxhp += Randomizer.rand(10, 14);
            maxmp += Randomizer.rand(22, 24);
        } else if (this.job >= 3200 && this.job <= 3212) {
            maxhp += Randomizer.rand(20, 24);
            maxmp += Randomizer.rand(42, 44);
        } else if (this.job >= 300 && this.job <= 322 || this.job >= 400 && this.job <= 434 || this.job >= 1300 && this.job <= 1311 || this.job >= 1400 && this.job <= 1411 || this.job >= 3300 && this.job <= 3312) {
            maxhp += Randomizer.rand(20, 24);
            maxmp += Randomizer.rand(14, 16);
        } else if (this.job >= 500 && this.job <= 522 || this.job >= 3500 && this.job <= 3512) {
            improvingMaxHP = SkillFactory.getSkill(5100000);
            slevel = this.getSkillLevel(improvingMaxHP);
            if (slevel > 0) {
                maxhp += improvingMaxHP.getEffect(slevel).getX();
            }
            maxhp += Randomizer.rand(22, 26);
            maxmp += Randomizer.rand(18, 22);
        } else if (this.job >= 1100 && this.job <= 1111) {
            improvingMaxHP = SkillFactory.getSkill(11000000);
            slevel = this.getSkillLevel(improvingMaxHP);
            if (slevel > 0) {
                maxhp += improvingMaxHP.getEffect(slevel).getX();
            }
            maxhp += Randomizer.rand(24, 28);
            maxmp += Randomizer.rand(4, 6);
        } else if (this.job >= 1200 && this.job <= 1211) {
            improvingMaxMP = SkillFactory.getSkill(12000000);
            slevel = this.getSkillLevel(improvingMaxMP);
            if (slevel > 0) {
                maxmp += improvingMaxMP.getEffect(slevel).getX() * 2;
            }
            maxhp += Randomizer.rand(10, 14);
            maxmp += Randomizer.rand(22, 24);
        } else if (this.job >= 1500 && this.job <= 1512) {
            improvingMaxHP = SkillFactory.getSkill(15100000);
            slevel = this.getSkillLevel(improvingMaxHP);
            if (slevel > 0) {
                maxhp += improvingMaxHP.getEffect(slevel).getX();
            }
            maxhp += Randomizer.rand(22, 26);
            maxmp += Randomizer.rand(18, 22);
        } else if (this.job >= 2100 && this.job <= 2112) {
            maxhp += Randomizer.rand(50, 52);
            maxmp += Randomizer.rand(4, 6);
        } else if (this.job >= 2200 && this.job <= 2218) {
            maxhp += Randomizer.rand(12, 16);
            maxmp += Randomizer.rand(50, 52);
        } else {
            maxhp += Randomizer.rand(50, 100);
            maxmp += Randomizer.rand(50, 100);
        }
        maxmp += this.stats.getTotalInt() / 10;
        this.exp -= GameConstants.getExpNeededForLevel(this.level);
        this.level = (short)(this.level + 1);
        short level = this.getLevel();
        if (level == 200 && !this.isGM()) {
            StringBuilder sb = new StringBuilder("[恭喜] ");
            IItem medal = this.getInventory(MapleInventoryType.EQUIPPED).getItem((short)-21);
            if (medal != null) {
                sb.append("<");
                sb.append(MapleItemInformationProvider.getInstance().getName(medal.getItemId()));
                sb.append("> ");
            }
            sb.append(this.getName());
            sb.append(" 達到了 200 等 是我們的英雄!");
            World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(6, sb.toString()).getBytes());
        }
        maxhp = Math.min(30000, maxhp);
        maxmp = Math.min(30000, maxmp);
        ArrayList<Pair<MapleStat, Integer>> statup = new ArrayList<Pair<MapleStat, Integer>>(8);
        statup.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLEAP, Integer.valueOf(this.remainingAp)));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, maxhp));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, maxmp));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.HP, maxhp));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MP, maxmp));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.EXP, this.exp));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.LEVEL, Integer.valueOf(level)));
        if (this.isGM() || this.job != 0 && this.job != 1000 && this.job != 2000 && this.job != 2001 && this.job != 3000) {
            int n = GameConstants.getSkillBook(this.job);
            this.remainingSp[n] = this.remainingSp[n] + 3;
            this.client.getSession().write((Object)MaplePacketCreator.updateSp(this, false));
        } else if (level <= 10) {
            this.stats.setStr((short)(this.stats.getStr() + this.remainingAp));
            this.remainingAp = 0;
            statup.add(new Pair<MapleStat, Integer>(MapleStat.STR, Integer.valueOf(this.stats.getStr())));
        }
        statup.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLEAP, Integer.valueOf(this.remainingAp)));
        this.stats.setMaxHp((short)maxhp);
        this.stats.setMaxMp((short)maxmp);
        this.stats.setHp((short)maxhp);
        this.stats.setMp((short)maxmp);
        this.client.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statup, this.getJob()));
        this.map.broadcastMessage(this, MaplePacketCreator.showForeignEffect(this.getId(), 0), false);
        this.stats.recalcLocalStats();
        this.silentPartyUpdate();
        this.guildUpdate();
        this.familyUpdate();
        if (GameConstants.isAran(this.job)) {
            switch (level) {
                case 30: {
                    this.client.getSession().write((Object)MaplePacketCreator.startMapEffect("You have reached level 30! To job advance, go back to Lirin of Rien.", 5120000, true));
                    break;
                }
                case 70: {
                    this.client.getSession().write((Object)MaplePacketCreator.startMapEffect("You have reached level 70! To job advance, talk to your job instructor in El Nath.", 5120000, true));
                    break;
                }
                case 120: {
                    this.client.getSession().write((Object)MaplePacketCreator.startMapEffect("You have reached level 120! To job advance, talk to your job instructor in Leafre.", 5120000, true));
                }
            }
        }
        if (GameConstants.isKOC(this.job) && level == 70) {
            this.client.getSession().write((Object)MaplePacketCreator.startMapEffect("You have reached level 70! To job advance, talk to your job instructor in Erev.", 5120000, true));
        }
    }

    public void changeKeybinding(int key, byte type, int action) {
        if (type != 0) {
            this.keylayout.Layout().put(key, new Pair<Byte, Integer>(type, action));
        } else {
            this.keylayout.Layout().remove(key);
        }
    }

    public void sendMacros() {
        for (int i = 0; i < 5; ++i) {
            if (this.skillMacros[i] == null) continue;
            this.client.getSession().write((Object)MaplePacketCreator.getMacros(this.skillMacros));
            break;
        }
    }

    public void updateMacros(int position, SkillMacro updateMacro) {
        this.skillMacros[position] = updateMacro;
    }

    public final SkillMacro[] getMacros() {
        return this.skillMacros;
    }

    public void tempban(String reason, Calendar duration, int greason, boolean IPMac) {
        if (IPMac) {
            this.client.banMacs();
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
            ps.setString(1, this.client.getSession().getRemoteAddress().toString().split(":")[0]);
            ps.execute();
            ps.close();
            this.client.getSession().close();
            ps = con.prepareStatement("UPDATE accounts SET tempban = ?, banreason = ?, greason = ? WHERE id = ?");
            Timestamp TS = new Timestamp(duration.getTimeInMillis());
            ps.setTimestamp(1, TS);
            ps.setString(2, reason);
            ps.setInt(3, greason);
            ps.setInt(4, this.accountid);
            ps.execute();
            ps.close();
        }
        catch (SQLException ex) {
            System.err.println("Error while tempbanning" + ex);
        }
    }

    public final boolean ban(String reason, boolean IPMac, boolean autoban, boolean hellban) {
        if (this.lastmonthfameids == null) {
            throw new RuntimeException("Trying to ban a non-loaded character (testhack)");
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET banned = ?, banreason = ? WHERE id = ?");
            ps.setInt(1, autoban ? 2 : 1);
            ps.setString(2, reason);
            ps.setInt(3, this.accountid);
            ps.execute();
            ps.close();
            if (IPMac) {
                this.client.banMacs();
                ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                ps.setString(1, this.client.getSessionIPAddress());
                ps.execute();
                ps.close();
                if (hellban) {
                    PreparedStatement psa = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
                    psa.setInt(1, this.accountid);
                    ResultSet rsa = psa.executeQuery();
                    if (rsa.next()) {
                        PreparedStatement pss = con.prepareStatement("UPDATE accounts SET banned = ?, banreason = ? WHERE email = ? OR SessionIP = ?");
                        pss.setInt(1, autoban ? 2 : 1);
                        pss.setString(2, reason);
                        pss.setString(3, rsa.getString("email"));
                        pss.setString(4, this.client.getSessionIPAddress());
                        pss.execute();
                        pss.close();
                    }
                    rsa.close();
                    psa.close();
                }
            }
        }
        catch (SQLException ex) {
            System.err.println("Error while banning" + ex);
            return false;
        }
        this.client.getSession().close();
        return true;
    }

    public static boolean ban(String id, String reason, boolean accountId, int gmlevel, boolean hellban) {
        try {
            Connection con = DatabaseConnection.getConnection();
            if (id.matches("/[0-9]{1,3}\\..*")) {
                PreparedStatement ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                ps.setString(1, id);
                ps.execute();
                ps.close();
                return true;
            }
            PreparedStatement ps = accountId ? con.prepareStatement("SELECT id FROM accounts WHERE name = ?") : con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            boolean ret = false;
            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int z = rs.getInt(1);
                PreparedStatement psb = con.prepareStatement("UPDATE accounts SET banned = 1, banreason = ? WHERE id = ? AND gm < ?");
                psb.setString(1, reason);
                psb.setInt(2, z);
                psb.setInt(3, gmlevel);
                psb.execute();
                psb.close();
                if (gmlevel > 100) {
                    PreparedStatement psa = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
                    psa.setInt(1, z);
                    ResultSet rsa = psa.executeQuery();
                    if (rsa.next()) {
                        String[] macData;
                        String sessionIP = rsa.getString("sessionIP");
                        if (sessionIP != null && sessionIP.matches("/[0-9]{1,3}\\..*")) {
                            PreparedStatement psz = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                            psz.setString(1, sessionIP);
                            psz.execute();
                            psz.close();
                        }
                        if (rsa.getString("macs") != null && (macData = rsa.getString("macs").split(", ")).length > 0) {
                            MapleClient.banMacs(macData);
                        }
                        if (hellban) {
                            PreparedStatement pss = con.prepareStatement("UPDATE accounts SET banned = 1, banreason = ? WHERE email = ?" + (sessionIP == null ? "" : " OR SessionIP = ?"));
                            pss.setString(1, reason);
                            pss.setString(2, rsa.getString("email"));
                            if (sessionIP != null) {
                                pss.setString(3, sessionIP);
                            }
                            pss.execute();
                            pss.close();
                        }
                    }
                    rsa.close();
                    psa.close();
                }
                ret = true;
            }
            rs.close();
            ps.close();
            return ret;
        }
        catch (SQLException ex) {
            System.err.println("Error while banning" + ex);
            return false;
        }
    }

    @Override
    public int getObjectId() {
        return this.getId();
    }

    @Override
    public void setObjectId(int id) {
        throw new UnsupportedOperationException();
    }

    public MapleStorage getStorage() {
        return this.storage;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public void addVisibleMapObject(MapleMapObject mo) {
        if (this.clone) {
            return;
        }
        this.visibleMapObjectsLock.writeLock().lock();
        try {
            this.visibleMapObjects.add(mo);
        }
        finally {
            this.visibleMapObjectsLock.writeLock().unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public void removeVisibleMapObject(MapleMapObject mo) {
        if (this.clone) {
            return;
        }
        this.visibleMapObjectsLock.writeLock().lock();
        try {
            this.visibleMapObjects.remove(mo);
        }
        finally {
            this.visibleMapObjectsLock.writeLock().unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public boolean isMapObjectVisible(MapleMapObject mo) {
        this.visibleMapObjectsLock.readLock().lock();
        try {
            boolean bl = !this.clone && this.visibleMapObjects.contains(mo);
            return bl;
        }
        finally {
            this.visibleMapObjectsLock.readLock().unlock();
        }
    }

    public Collection<MapleMapObject> getAndWriteLockVisibleMapObjects() {
        this.visibleMapObjectsLock.writeLock().lock();
        return this.visibleMapObjects;
    }

    public void unlockWriteVisibleMapObjects() {
        this.visibleMapObjectsLock.writeLock().unlock();
    }

    public boolean isAlive() {
        return this.stats.getHp() > 0;
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write((Object)MaplePacketCreator.removePlayerFromMap(this.getObjectId(), this));
        for (WeakReference<MapleCharacter> chr : this.clones) {
            if (chr.get() == null) continue;
            ((MapleCharacter)chr.get()).sendDestroyData(client);
        }
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        if (client.getPlayer().allowedToTarget(this)) {
            client.getSession().write((Object)MaplePacketCreator.spawnPlayerMapobject(this));
            for (MaplePet pet : this.pets) {
                if (!pet.getSummoned()) continue;
                client.getSession().write((Object)PetPacket.showPet(this, pet, false, false));
            }
            for (WeakReference<MapleCharacter> chr : this.clones) {
                if (chr.get() == null) continue;
                ((MapleCharacter)chr.get()).sendSpawnData(client);
            }
            if (this.summons != null) {
                for (MapleSummon summon : this.summons.values()) {
                    client.getSession().write((Object)MaplePacketCreator.spawnSummon(summon, false));
                }
            }
            if (this.followid > 0) {
                // empty if block
            }
        }
    }

    public final void equipChanged() {
        this.map.broadcastMessage(this, MaplePacketCreator.updateCharLook(this), false);
        this.stats.recalcLocalStats();
        if (this.getMessenger() != null) {
            World.Messenger.updateMessenger(this.getMessenger().getId(), this.getName(), this.client.getChannel());
        }
    }

    public final MaplePet getPet(int index) {
        int count = 0;
        for (MaplePet pet : this.pets) {
            if (!pet.getSummoned()) continue;
            if (count == index) {
                return pet;
            }
            count = (byte)(count + 1);
        }
        return null;
    }

    public void removePetCS(MaplePet pet) {
        this.pets.remove(pet);
    }

    public void addPet(MaplePet pet) {
        if (this.pets.contains(pet)) {
            this.pets.remove(pet);
        }
        this.pets.add(pet);
    }

    public void removePet(MaplePet pet, boolean shiftLeft) {
        pet.setSummoned(0);
    }

    public final byte getPetIndex(MaplePet petz) {
        byte count = 0;
        for (MaplePet pet : this.pets) {
            if (!pet.getSummoned()) continue;
            if (pet == petz) {
                return count;
            }
            count = (byte)(count + 1);
        }
        return -1;
    }

    public final byte getPetIndex(int petId) {
        byte count = 0;
        for (MaplePet pet : this.pets) {
            if (!pet.getSummoned()) continue;
            if (pet.getUniqueId() == petId) {
                return count;
            }
            count = (byte)(count + 1);
        }
        return -1;
    }

    public final byte getPetById(int petId) {
        byte count = 0;
        for (MaplePet pet : this.pets) {
            if (!pet.getSummoned()) continue;
            if (pet.getPetItemId() == petId) {
                return count;
            }
            count = (byte)(count + 1);
        }
        return -1;
    }

    public final List<MaplePet> getPets() {
        return this.pets;
    }

    public int getNoPets() {
        return this.pets.size();
    }

    public final void unequipAllPets() {
        for (MaplePet pet : this.pets) {
            if (pet == null) continue;
            this.unequipPet(pet, true, false);
        }
    }

    public void unequipPet(MaplePet pet, boolean shiftLeft, boolean hunger) {
        if (pet.getSummoned()) {
            pet.saveToDb();
            this.client.getSession().write((Object)PetPacket.updatePet(pet, this.getInventory(MapleInventoryType.CASH).getItem(pet.getInventoryPosition()), false));
            if (this.map != null) {
                this.map.broadcastMessage(this, PetPacket.showPet(this, pet, true, hunger), true);
            }
            this.removePet(pet, shiftLeft);
            this.client.getSession().write((Object)PetPacket.petStatUpdate(this));
            this.client.getSession().write((Object)MaplePacketCreator.enableActions());
        }
    }

    public final long getLastFameTime() {
        return this.lastfametime;
    }

    public final List<Integer> getFamedCharacters() {
        return this.lastmonthfameids;
    }

    public FameStatus canGiveFame(MapleCharacter from) {
        if (this.lastfametime >= System.currentTimeMillis() - 86400000L) {
            return FameStatus.NOT_TODAY;
        }
        if (from == null || this.lastmonthfameids == null || this.lastmonthfameids.contains(from.getId())) {
            return FameStatus.NOT_THIS_MONTH;
        }
        return FameStatus.OK;
    }

    public void hasGivenFame(MapleCharacter to) {
        this.lastfametime = System.currentTimeMillis();
        this.lastmonthfameids.add(to.getId());
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("INSERT INTO famelog (characterid, characterid_to) VALUES (?, ?)");
            ps.setInt(1, this.getId());
            ps.setInt(2, to.getId());
            ps.execute();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("ERROR writing famelog for char " + this.getName() + " to " + to.getName() + e);
        }
    }

    public final MapleKeyLayout getKeyLayout() {
        return this.keylayout;
    }

    public MapleParty getParty() {
        return this.party;
    }

    public int getPartyId() {
        return this.party != null ? this.party.getId() : -1;
    }

    public byte getWorld() {
        return this.world;
    }

    public void setWorld(byte world) {
        this.world = world;
    }

    public void setParty(MapleParty party) {
        this.party = party;
    }

    public MapleTrade getTrade() {
        return this.trade;
    }

    public void setTrade(MapleTrade trade) {
        this.trade = trade;
    }

    public EventInstanceManager getEventInstance() {
        return this.eventInstance;
    }

    public void setEventInstance(EventInstanceManager eventInstance) {
        this.eventInstance = eventInstance;
    }

    public void addDoor(MapleDoor door) {
        this.doors.add(door);
    }

    public void clearDoors() {
        this.doors.clear();
    }

    public List<MapleDoor> getDoors() {
        return new ArrayList<MapleDoor>(this.doors);
    }

    public void setSmega() {
        if (this.smega) {
            this.smega = false;
            this.dropMessage(5, "You have set megaphone to disabled mode");
        } else {
            this.smega = true;
            this.dropMessage(5, "You have set megaphone to enabled mode");
        }
    }

    public boolean getSmega() {
        return this.smega;
    }

    public Map<Integer, MapleSummon> getSummons() {
        return this.summons;
    }

    public int getChair() {
        return this.chair;
    }

    public int getItemEffect() {
        return this.itemEffect;
    }

    public void setChair(int chair) {
        this.chair = chair;
        this.stats.relocHeal();
    }

    public void setItemEffect(int itemEffect) {
        this.itemEffect = itemEffect;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.PLAYER;
    }

    public int getFamilyId() {
        if (this.mfc == null) {
            return 0;
        }
        return this.mfc.getFamilyId();
    }

    public int getSeniorId() {
        if (this.mfc == null) {
            return 0;
        }
        return this.mfc.getSeniorId();
    }

    public int getJunior1() {
        if (this.mfc == null) {
            return 0;
        }
        return this.mfc.getJunior1();
    }

    public int getJunior2() {
        if (this.mfc == null) {
            return 0;
        }
        return this.mfc.getJunior2();
    }

    public int getCurrentRep() {
        return this.currentrep;
    }

    public int getTotalRep() {
        return this.totalrep;
    }

    public void setCurrentRep(int _rank) {
        this.currentrep = _rank;
        if (this.mfc != null) {
            this.mfc.setCurrentRep(_rank);
        }
    }

    public void setTotalRep(int _rank) {
        this.totalrep = _rank;
        if (this.mfc != null) {
            this.mfc.setTotalRep(_rank);
        }
    }

    public int getGuildId() {
        return this.guildid;
    }

    public byte getGuildRank() {
        return this.guildrank;
    }

    public void setGuildId(int _id) {
        this.guildid = _id;
        if (this.guildid > 0) {
            if (this.mgc == null) {
                this.mgc = new MapleGuildCharacter(this);
            } else {
                this.mgc.setGuildId(this.guildid);
            }
        } else {
            this.mgc = null;
        }
    }

    public void setGuildRank(byte _rank) {
        this.guildrank = _rank;
        if (this.mgc != null) {
            this.mgc.setGuildRank(_rank);
        }
    }

    public MapleGuildCharacter getMGC() {
        return this.mgc;
    }

    public void setAllianceRank(byte rank) {
        this.allianceRank = rank;
        if (this.mgc != null) {
            this.mgc.setAllianceRank(rank);
        }
    }

    public byte getAllianceRank() {
        return this.allianceRank;
    }

    public MapleGuild getGuild() {
        if (this.getGuildId() <= 0) {
            return null;
        }
        return World.Guild.getGuild(this.getGuildId());
    }

    public void guildUpdate() {
        if (this.guildid <= 0) {
            return;
        }
        this.mgc.setLevel(this.level);
        this.mgc.setJobId(this.job);
        World.Guild.memberLevelJobUpdate(this.mgc);
    }

    public void saveGuildStatus() {
        MapleGuild.setOfflineGuildStatus(this.guildid, this.guildrank, this.allianceRank, this.id);
    }

    public void familyUpdate() {
        if (this.mfc == null) {
            return;
        }
        World.Family.memberFamilyUpdate(this.mfc, this);
    }

    public void saveFamilyStatus() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET familyid = ?, seniorid = ?, junior1 = ?, junior2 = ? WHERE id = ?");
            if (this.mfc == null) {
                ps.setInt(1, 0);
                ps.setInt(2, 0);
                ps.setInt(3, 0);
                ps.setInt(4, 0);
            } else {
                ps.setInt(1, this.mfc.getFamilyId());
                ps.setInt(2, this.mfc.getSeniorId());
                ps.setInt(3, this.mfc.getJunior1());
                ps.setInt(4, this.mfc.getJunior2());
            }
            ps.setInt(5, this.id);
            ps.execute();
            ps.close();
        }
        catch (SQLException se) {
            System.out.println("SQLException: " + se.getLocalizedMessage());
            se.printStackTrace();
        }
    }

    public void modifyCSPoints(int type, int quantity) {
        this.modifyCSPoints(type, quantity, false);
    }

    public void dropMessage(String message) {
        this.dropMessage(6, message);
    }

    public void modifyCSPoints(int type, int quantity, boolean show) {
        switch (type) {
            case 1: {
                if (this.acash + quantity < 0) {
                    if (show) {
                        this.dropMessage(5, "You have gained the max cash. No cash will be awarded.");
                    }
                    return;
                }
                this.acash += quantity;
                break;
            }
            case 2: {
                if (this.maplepoints + quantity < 0) {
                    if (show) {
                        this.dropMessage(5, "You have gained the max maple points. No cash will be awarded.");
                    }
                    return;
                }
                this.maplepoints += quantity;
                break;
            }
        }
        if (show && quantity != 0) {
            this.dropMessage(5, "You have " + (quantity > 0 ? "gained " : "lost ") + quantity + (type == 1 ? " cash." : " maple points."));
        }
    }

    public int getCSPoints(int type) {
        switch (type) {
            case 1: {
                return this.acash;
            }
            case 2: {
                return this.maplepoints;
            }
        }
        return 0;
    }

    public final boolean hasEquipped(int itemid) {
        return this.inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid) >= 1;
    }

    public final boolean haveItem(int itemid, int quantity, boolean checkEquipped, boolean greaterOrEquals) {
        MapleInventoryType type = GameConstants.getInventoryType(itemid);
        int possesed = this.inventory[type.ordinal()].countById(itemid);
        if (checkEquipped && type == MapleInventoryType.EQUIP) {
            possesed += this.inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }
        if (greaterOrEquals) {
            return possesed >= quantity;
        }
        return possesed == quantity;
    }

    public final boolean haveItem(int itemid, int quantity) {
        return this.haveItem(itemid, quantity, true, true);
    }

    public final boolean haveItem(int itemid) {
        return this.haveItem(itemid, 1, true, true);
    }

    public void maxAllSkills() {
        MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wz") + "/" + "String.wz"));
        MapleData skilldData = dataProvider.getData("Skill.img");
        for (MapleData skill_ : skilldData.getChildren()) {
            Skill skill = (Skill)SkillFactory.getSkill1(Integer.parseInt(skill_.getName()));
            if (this.level < 0) continue;
            this.changeSkillLevel(skill, skill.getMaxLevel(), skill.getMaxLevel());
        }
    }

    public void setAPQScore(int score) {
        this.APQScore = score;
    }

    public int getAPQScore() {
        return this.APQScore;
    }

    public long getLasttime() {
        return this.lasttime;
    }

    public void setLasttime(long lasttime) {
        this.lasttime = lasttime;
    }

    public long getCurrenttime() {
        return this.currenttime;
    }

    public void setCurrenttime(long currenttime) {
        this.currenttime = currenttime;
    }

    public byte getBuddyCapacity() {
        return this.buddylist.getCapacity();
    }

    public void setBuddyCapacity(byte capacity) {
        this.buddylist.setCapacity(capacity);
        this.client.getSession().write((Object)MaplePacketCreator.updateBuddyCapacity(capacity));
    }

    public MapleMessenger getMessenger() {
        return this.messenger;
    }

    public void setMessenger(MapleMessenger messenger) {
        this.messenger = messenger;
    }

    public void addCooldown(int skillId, long startTime, long length) {
        this.coolDowns.put(skillId, new MapleCoolDownValueHolder(skillId, startTime, length));
    }

    public void removeCooldown(int skillId) {
        if (this.coolDowns.containsKey(skillId)) {
            this.coolDowns.remove(skillId);
        }
    }

    public boolean skillisCooling(int skillId) {
        return this.coolDowns.containsKey(skillId);
    }

    public void giveCoolDowns(int skillid, long starttime, long length) {
        this.addCooldown(skillid, starttime, length);
    }

    public void giveCoolDowns(List<MapleCoolDownValueHolder> cooldowns) {
        if (cooldowns != null) {
            for (MapleCoolDownValueHolder cooldown : cooldowns) {
                this.coolDowns.put(cooldown.skillId, cooldown);
            }
        } else {
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT SkillID,StartTime,length FROM skills_cooldowns WHERE charid = ?");
                ps.setInt(1, this.getId());
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    if (rs.getLong("length") + rs.getLong("StartTime") - System.currentTimeMillis() <= 0L) continue;
                    this.giveCoolDowns(rs.getInt("SkillID"), rs.getLong("StartTime"), rs.getLong("length"));
                }
                ps.close();
                rs.close();
                this.deleteWhereCharacterId(con, "DELETE FROM skills_cooldowns WHERE charid = ?");
            }
            catch (SQLException e) {
                System.err.println("Error while retriving cooldown from SQL storage");
            }
        }
    }

    public List<MapleCoolDownValueHolder> getCooldowns() {
        return new ArrayList<MapleCoolDownValueHolder>(this.coolDowns.values());
    }

    public final List<MapleDiseaseValueHolder> getAllDiseases() {
        return new ArrayList<MapleDiseaseValueHolder>(this.diseases.values());
    }

    public final boolean hasDisease(MapleDisease dis) {
        return this.diseases.keySet().contains(dis);
    }

    public void giveDebuff(MapleDisease disease, MobSkill skill) {
        this.giveDebuff(disease, skill.getX(), skill.getDuration(), skill.getSkillId(), skill.getSkillLevel());
    }

    public void giveDebuff(MapleDisease disease, int x, long duration, int skillid, int level) {
        List<Pair<MapleDisease, Integer>> debuff = Collections.singletonList(new Pair<MapleDisease, Integer>(disease, x));
        if (!this.hasDisease(disease) && this.diseases.size() < 2) {
            if (disease != MapleDisease.SEDUCE && disease != MapleDisease.STUN && this.isActiveBuffedValue(2321005)) {
                return;
            }
            this.diseases.put(disease, new MapleDiseaseValueHolder(disease, System.currentTimeMillis(), duration));
            this.client.getSession().write((Object)MaplePacketCreator.giveDebuff(debuff, skillid, level, (int)duration));
            this.map.broadcastMessage(this, MaplePacketCreator.giveForeignDebuff(this.id, debuff, skillid, level), false);
        }
    }

    public final void giveSilentDebuff(List<MapleDiseaseValueHolder> ld) {
        if (ld != null) {
            for (MapleDiseaseValueHolder disease : ld) {
                this.diseases.put(disease.disease, disease);
            }
        }
    }

    public void dispelDebuff(MapleDisease debuff) {
        if (this.hasDisease(debuff)) {
            long mask = debuff.getValue();
            boolean first = debuff.isFirst();
            this.client.getSession().write((Object)MaplePacketCreator.cancelDebuff(mask, first));
            this.map.broadcastMessage(this, MaplePacketCreator.cancelForeignDebuff(this.id, mask, first), false);
            this.diseases.remove(debuff);
        }
    }

    public void dispelDebuffs() {
        this.dispelDebuff(MapleDisease.CURSE);
        this.dispelDebuff(MapleDisease.DARKNESS);
        this.dispelDebuff(MapleDisease.POISON);
        this.dispelDebuff(MapleDisease.SEAL);
        this.dispelDebuff(MapleDisease.WEAKEN);
    }

    public void cancelAllDebuffs() {
        this.diseases.clear();
    }

    public void setLevel(short level) {
        this.level = (short)(level - 1);
    }

    public void sendNote(String to, String msg) {
        this.sendNote(to, msg, 0);
    }

    public void sendNote(String to, String msg, int fame) {
        MapleCharacterUtil.sendNote(to, this.getName(), msg, fame);
    }

    public void showNote() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM notes WHERE `to`=?", 1005, 1008);
            ps.setString(1, this.getName());
            ResultSet rs = ps.executeQuery();
            rs.last();
            int count = rs.getRow();
            rs.first();
            this.client.getSession().write((Object)MTSCSPacket.showNotes(rs, count));
            rs.close();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("Unable to show note" + e);
        }
    }

    public void deleteNote(int id, int fame) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT gift FROM notes WHERE `id`=?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next() && rs.getInt("gift") == fame && fame > 0) {
                this.addFame(fame);
                this.updateSingleStat(MapleStat.FAME, this.getFame());
                this.client.getSession().write((Object)MaplePacketCreator.getShowFameGain(fame));
            }
            rs.close();
            ps.close();
            ps = con.prepareStatement("DELETE FROM notes WHERE `id`=?");
            ps.setInt(1, id);
            ps.execute();
            ps.close();
        }
        catch (SQLException e) {
            System.err.println("Unable to delete note" + e);
        }
    }

    public void mulung_EnergyModify(boolean inc) {
        this.mulung_energy = inc ? (this.mulung_energy + 100 > 10000 ? (short)10000 : (short)(this.mulung_energy + 100)) : (short)0;
        this.client.getSession().write((Object)MaplePacketCreator.MulungEnergy(this.mulung_energy));
    }

    public void writeMulungEnergy() {
        this.client.getSession().write((Object)MaplePacketCreator.MulungEnergy(this.mulung_energy));
    }

    public void writeEnergy(String type, String inc) {
        this.client.getSession().write((Object)MaplePacketCreator.sendPyramidEnergy(type, inc));
    }

    public void writeStatus(String type, String inc) {
        this.client.getSession().write((Object)MaplePacketCreator.sendGhostStatus(type, inc));
    }

    public void writePoint(String type, String inc) {
        this.client.getSession().write((Object)MaplePacketCreator.sendGhostPoint(type, inc));
    }

    public final short getCombo() {
        return this.combo;
    }

    public void setCombo(short combo) {
        this.combo = combo;
    }

    public final long getLastCombo() {
        return this.lastCombo;
    }

    public void setLastCombo(long combo) {
        this.lastCombo = combo;
    }

    public final long getKeyDownSkill_Time() {
        return this.keydown_skill;
    }

    public void setKeyDownSkill_Time(long keydown_skill) {
        this.keydown_skill = keydown_skill;
    }

    public void checkBerserk() {
        byte skilllevel;
        ISkill BerserkX;
        if (this.BerserkSchedule != null) {
            this.BerserkSchedule.cancel(false);
            this.BerserkSchedule = null;
        }
        if ((skilllevel = this.getSkillLevel(BerserkX = SkillFactory.getSkill(1320006))) >= 1) {
            MapleStatEffect ampStat = BerserkX.getEffect(skilllevel);
            this.stats.Berserk = this.stats.getHp() * 100 / this.stats.getMaxHp() <= ampStat.getX();
            this.client.getSession().write((Object)MaplePacketCreator.showOwnBuffEffect(1320006, 1, (byte)(this.stats.Berserk ? 1 : 0)));
            this.map.broadcastMessage(this, MaplePacketCreator.showBuffeffect(this.getId(), 1320006, 1, (byte)(this.stats.Berserk ? 1 : 0)), false);
            this.BerserkSchedule = Timer.BuffTimer.getInstance().schedule(new Runnable(){

                @Override
                public void run() {
                    MapleCharacter.this.checkBerserk();
                }
            }, 10000L);
        }
    }

    private void prepareBeholderEffect() {
        ISkill bBuff;
        byte bBuffLvl;
        if (this.beholderHealingSchedule != null) {
            this.beholderHealingSchedule.cancel(false);
        }
        if (this.beholderBuffSchedule != null) {
            this.beholderBuffSchedule.cancel(false);
        }
        ISkill bHealing = SkillFactory.getSkill(1320008);
        byte bHealingLvl = this.getSkillLevel(bHealing);
        final byte berserkLvl = this.getSkillLevel(SkillFactory.getSkill(1320006));
        if (bHealingLvl > 0) {
            final MapleStatEffect healEffect = bHealing.getEffect(bHealingLvl);
            int healInterval = healEffect.getX() * 1000;
            this.beholderHealingSchedule = Timer.BuffTimer.getInstance().register(new Runnable(){

                @Override
                public void run() {
                    int remhppercentage = (int)Math.ceil((double)MapleCharacter.this.getStat().getHp() * 100.0 / (double)MapleCharacter.this.getStat().getMaxHp());
                    if (berserkLvl == 0 || remhppercentage >= berserkLvl + 10) {
                        MapleCharacter.this.addHP(healEffect.getHp());
                    }
                    MapleCharacter.this.client.getSession().write((Object)MaplePacketCreator.showOwnBuffEffect(1321007, 2));
                    MapleCharacter.this.map.broadcastMessage(MaplePacketCreator.summonSkill(MapleCharacter.this.getId(), 1321007, 5));
                    MapleCharacter.this.map.broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBuffeffect(MapleCharacter.this.getId(), 1321007, 2), false);
                }
            }, healInterval, healInterval);
        }
        if ((bBuffLvl = this.getSkillLevel(bBuff = SkillFactory.getSkill(1320009))) > 0) {
            final MapleStatEffect buffEffect = bBuff.getEffect(bBuffLvl);
            int buffInterval = buffEffect.getX() * 1000;
            this.beholderBuffSchedule = Timer.BuffTimer.getInstance().register(new Runnable(){

                @Override
                public void run() {
                    buffEffect.applyTo(MapleCharacter.this);
                    MapleCharacter.this.client.getSession().write((Object)MaplePacketCreator.showOwnBuffEffect(1321007, 2));
                    MapleCharacter.this.map.broadcastMessage(MaplePacketCreator.summonSkill(MapleCharacter.this.getId(), 1321007, Randomizer.nextInt(3) + 6));
                    MapleCharacter.this.map.broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBuffeffect(MapleCharacter.this.getId(), 1321007, 2), false);
                }
            }, buffInterval, buffInterval);
        }
    }

    public void setChalkboard(String text) {
        this.chalktext = text;
        this.map.broadcastMessage(MTSCSPacket.useChalkboard(this.getId(), text));
    }

    public String getChalkboard() {
        return this.chalktext;
    }

    public MapleMount getMount() {
        return this.mount;
    }

    public int[] getWishlist() {
        return this.wishlist;
    }

    public void clearWishlist() {
        for (int i = 0; i < 10; ++i) {
            this.wishlist[i] = 0;
        }
    }

    public int getWishlistSize() {
        int ret = 0;
        for (int i = 0; i < 10; ++i) {
            if (this.wishlist[i] <= 0 || i >= 10) continue;
            ++ret;
        }
        return ret;
    }

    public void setWishlist(int[] wl) {
        this.wishlist = wl;
    }

    public int[] getRocks() {
        return this.rocks;
    }

    public int getRockSize() {
        int ret = 0;
        for (int i = 0; i < 10; ++i) {
            if (this.rocks[i] == 999999999) continue;
            ++ret;
        }
        return ret;
    }

    public void deleteFromRocks(int map) {
        for (int i = 0; i < 10; ++i) {
            if (this.rocks[i] != map) continue;
            this.rocks[i] = 999999999;
            break;
        }
    }

    public void addRockMap() {
        if (this.getRockSize() >= 10) {
            return;
        }
        this.rocks[this.getRockSize()] = this.getMapId();
    }

    public boolean isRockMap(int id) {
        for (int i = 0; i < 10; ++i) {
            if (this.rocks[i] != id) continue;
            return true;
        }
        return false;
    }

    public int[] getRegRocks() {
        return this.regrocks;
    }

    public int getRegRockSize() {
        int ret = 0;
        for (int i = 0; i < 5; ++i) {
            if (this.regrocks[i] == 999999999) continue;
            ++ret;
        }
        return ret;
    }

    public void deleteFromRegRocks(int map) {
        for (int i = 0; i < 5; ++i) {
            if (this.regrocks[i] != map) continue;
            this.regrocks[i] = 999999999;
            break;
        }
    }

    public void addRegRockMap() {
        if (this.getRegRockSize() >= 5) {
            return;
        }
        this.regrocks[this.getRegRockSize()] = this.getMapId();
    }

    public boolean isRegRockMap(int id) {
        for (int i = 0; i < 5; ++i) {
            if (this.regrocks[i] != id) continue;
            return true;
        }
        return false;
    }

    public List<LifeMovementFragment> getLastRes() {
        return this.lastres;
    }

    public void setLastRes(List<LifeMovementFragment> lastres) {
        this.lastres = lastres;
    }

    public void setMonsterBookCover(int bookCover) {
        this.bookCover = bookCover;
    }

    public int getMonsterBookCover() {
        return this.bookCover;
    }

    public int getBossLog(String bossid) {
        Connection con1 = DatabaseConnection.getConnection();
        try {
            int ret_count = 0;
            PreparedStatement ps = con1.prepareStatement("select count(*) from bosslog where characterid = ? and bossid = ? and lastattempt >= subtime(current_timestamp, '1 0:0:0.0')");
            ps.setInt(1, this.id);
            ps.setString(2, bossid);
            try (ResultSet rs = ps.executeQuery();){
                ret_count = rs.next() ? rs.getInt(1) : -1;
            }
            ps.close();
            return ret_count;
        }
        catch (SQLException Ex) {
            return -1;
        }
    }

    public void setBossLog(String bossid) {
        Connection con1 = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con1.prepareStatement("insert into bosslog (characterid, bossid) values (?,?)");
            ps.setInt(1, this.id);
            ps.setString(2, bossid);
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            // empty catch block
        }
    }

    public void dropMessage(int type, String message) {
        if (type == -1) {
            this.client.getSession().write((Object)UIPacket.getTopMsg(message));
        } else if (type == -2) {
            this.client.getSession().write((Object)PlayerShopPacket.shopChat(message, 0));
        } else {
            this.client.getSession().write((Object)MaplePacketCreator.serverNotice(type, message));
        }
    }

    public IMaplePlayerShop getPlayerShop() {
        return this.playerShop;
    }

    public void setPlayerShop(IMaplePlayerShop playerShop) {
        this.playerShop = playerShop;
    }

    public int getConversation() {
        return this.inst.get();
    }

    public void setConversation(int inst) {
        this.inst.set(inst);
    }

    public MapleCarnivalParty getCarnivalParty() {
        return this.carnivalParty;
    }

    public void setCarnivalParty(MapleCarnivalParty party) {
        this.carnivalParty = party;
    }

    public void addCP(int ammount) {
        this.totalCP = (short)(this.totalCP + ammount);
        this.availableCP = (short)(this.availableCP + ammount);
    }

    public void useCP(int ammount) {
        this.availableCP = (short)(this.availableCP - ammount);
    }

    public int getAvailableCP() {
        return this.availableCP;
    }

    public int getTotalCP() {
        return this.totalCP;
    }

    public void resetCP() {
        this.totalCP = 0;
        this.availableCP = 0;
    }

    public void addCarnivalRequest(MapleCarnivalChallenge request) {
        this.pendingCarnivalRequests.add(request);
    }

    public final MapleCarnivalChallenge getNextCarnivalRequest() {
        return this.pendingCarnivalRequests.pollLast();
    }

    public void clearCarnivalRequests() {
        this.pendingCarnivalRequests = new LinkedList<MapleCarnivalChallenge>();
    }

    public void startMonsterCarnival(int enemyavailable, int enemytotal) {
        this.client.getSession().write((Object)MonsterCarnivalPacket.startMonsterCarnival(this, enemyavailable, enemytotal));
    }

    public void CPUpdate(boolean party, int available, int total, int team) {
        this.client.getSession().write((Object)MonsterCarnivalPacket.CPUpdate(party, available, total, team));
    }

    public void playerDiedCPQ(String name, int lostCP, int team) {
        this.client.getSession().write((Object)MonsterCarnivalPacket.playerDiedMessage(name, lostCP, team));
    }

    public boolean getCanTalk() {
        return this.canTalk;
    }

    public void canTalk(boolean talk) {
        this.canTalk = talk;
    }

    public int getHp() {
        return this.stats.hp;
    }

    public void setHp(int hp) {
        this.stats.setHp(hp);
    }

    public int getMp() {
        return this.stats.mp;
    }

    public void setMp(int mp) {
        this.stats.setMp(mp);
    }

    public int getStr() {
        return this.stats.str;
    }

    public int getDex() {
        return this.stats.dex;
    }

    public int getLuk() {
        return this.stats.luk;
    }

    public int getInt() {
        return this.stats.int_;
    }

    public int getEXPMod() {
        return this.stats.expMod;
    }

    public int getDropMod() {
        return this.stats.dropMod;
    }

    public int getCashMod() {
        return this.stats.cashMod;
    }

    public void setPoints(int p) {
        this.points = p;
    }

    public int getPoints() {
        return this.points;
    }

    public void setVPoints(int p) {
        this.vpoints = p;
    }

    public int getVPoints() {
        return this.vpoints;
    }

    public CashShop getCashInventory() {
        return this.cs;
    }

    public void removeAll(int id) {
        this.removeAll(id, true, false);
    }

    public void removeAll(int id, boolean show, boolean checkEquipped) {
        MapleInventoryType type = GameConstants.getInventoryType(id);
        int possessed = this.getInventory(type).countById(id);
        if (possessed > 0) {
            MapleInventoryManipulator.removeById(this.getClient(), type, id, possessed, true, false);
            if (show) {
                this.getClient().getSession().write((Object)MaplePacketCreator.getShowItemGain(id, (short)(-possessed), true));
            }
        }
        if (checkEquipped && type == MapleInventoryType.EQUIP && (possessed = this.getInventory(type = MapleInventoryType.EQUIPPED).countById(id)) > 0) {
            MapleInventoryManipulator.removeById(this.getClient(), type, id, possessed, true, false);
            if (show) {
                this.getClient().getSession().write((Object)MaplePacketCreator.getShowItemGain(id, (short)(-possessed), true));
            }
            this.equipChanged();
        }
    }

    public Pair<List<MapleRing>, List<MapleRing>> getRings(boolean equip) {
        MapleRing ring;
        MapleInventory iv = this.getInventory(MapleInventoryType.EQUIPPED);
        Collection<IItem> equippedC = iv.list();
        ArrayList<Item> equipped = new ArrayList<Item>(equippedC.size());
        for (IItem item : equippedC) {
            equipped.add((Item)item);
        }
        Collections.sort(equipped);
        ArrayList<MapleRing> crings = new ArrayList<MapleRing>();
        for (Item item : equipped) {
            if (item.getRing() == null) continue;
            ring = item.getRing();
            ring.setEquipped(true);
            if (!GameConstants.isCrushRing(item.getItemId())) continue;
            if (equip) {
                if (!GameConstants.isCrushRing(item.getItemId())) continue;
                crings.add(ring);
                continue;
            }
            if (crings.size() != 0 || !GameConstants.isCrushRing(item.getItemId())) continue;
            crings.add(ring);
        }
        if (equip) {
            iv = this.getInventory(MapleInventoryType.EQUIP);
            for (IItem item : iv.list()) {
                if (item.getRing() == null || !GameConstants.isCrushRing(item.getItemId())) continue;
                ring = item.getRing();
                ring.setEquipped(false);
                if (!GameConstants.isCrushRing(item.getItemId())) continue;
                crings.add(ring);
            }
        }
        Collections.sort(crings, new MapleRing.RingComparator());
        return new Pair<List<MapleRing>, List<MapleRing>>(crings, crings);
    }

    public Pair<List<MapleRing>, List<MapleRing>> getRingsz(boolean equip) {
        MapleRing ring;
        MapleInventory iv = this.getInventory(MapleInventoryType.EQUIPPED);
        Collection<IItem> equippedC = iv.list();
        ArrayList<Item> equipped = new ArrayList<Item>(equippedC.size());
        for (IItem item : equippedC) {
            equipped.add((Item)item);
        }
        Collections.sort(equipped);
        ArrayList<MapleRing> frings = new ArrayList<MapleRing>();
        for (Item item : equipped) {
            if (item.getRing() == null) continue;
            ring = item.getRing();
            ring.setEquipped(true);
            if (!GameConstants.isFriendshipRing(item.getItemId())) continue;
            if (equip) {
                if (!GameConstants.isFriendshipRing(item.getItemId())) continue;
                frings.add(ring);
                continue;
            }
            if (frings.size() != 0 || !GameConstants.isFriendshipRing(item.getItemId())) continue;
            frings.add(ring);
        }
        if (equip) {
            iv = this.getInventory(MapleInventoryType.EQUIP);
            for (IItem item : iv.list()) {
                if (item.getRing() == null || !GameConstants.isCrushRing(item.getItemId())) continue;
                ring = item.getRing();
                ring.setEquipped(false);
                if (!GameConstants.isFriendshipRing(item.getItemId())) continue;
                frings.add(ring);
            }
        }
        Collections.sort(frings, new MapleRing.RingComparator());
        return new Pair<List<MapleRing>, List<MapleRing>>(frings, frings);
    }

    public int getFH() {
        MapleFoothold fh = this.getMap().getFootholds().findBelow(this.getPosition());
        if (fh != null) {
            return fh.getId();
        }
        return 0;
    }

    public void startFairySchedule(boolean exp) {
        this.startFairySchedule(exp, false);
    }

    public void startFairySchedule(boolean exp, boolean equipped) {
        this.cancelFairySchedule(exp);
        if (this.fairyExp < 30 && this.stats.equippedFairy) {
            if (equipped) {
                this.dropMessage(5, "The Fairy Pendant's experience points will increase to " + this.fairyExp + "% after one hour.");
            }
            this.fairySchedule = Timer.EtcTimer.getInstance().schedule(new Runnable(){

                @Override
                public void run() {
                    if (fairyExp < 30 && stats.equippedFairy) {
                        fairyExp = 30;
                        dropMessage(5, "The Fairy Pendant's EXP was boosted to " + fairyExp + "%.");
                        startFairySchedule(false, true);
                    } else {
                        cancelFairySchedule(!stats.equippedFairy);
                    }
                }
            }, 3600000L);
        } else {
            this.cancelFairySchedule(!this.stats.equippedFairy);
        }
    }

    public void cancelFairySchedule(boolean exp) {
        if (this.fairySchedule != null) {
            this.fairySchedule.cancel(false);
            this.fairySchedule = null;
        }
        if (exp) {
            this.fairyExp = (byte)30;
        }
    }

    public byte getFairyExp() {
        return this.fairyExp;
    }

    public int getCoconutTeam() {
        return this.coconutteam;
    }

    public void setCoconutTeam(int team) {
        this.coconutteam = team;
    }

    public void spawnPet(byte slot) {
        this.spawnPet(slot, false, true);
    }

    public void spawnPet(byte slot, boolean lead) {
        this.spawnPet(slot, lead, true);
    }

    public void spawnPet(byte slot, boolean lead, boolean broadcast) {
        IItem item = this.getInventory(MapleInventoryType.CASH).getItem(slot);
        if (item == null || item.getItemId() > 5001000 || item.getItemId() < 5000000) {
            return;
        }
        switch (item.getItemId()) {
            case 5000028: 
            case 5000047: {
                MaplePet pet = MaplePet.createPet(item.getItemId() + 1, MapleInventoryIdentifier.getInstance());
                if (pet == null) break;
                MapleInventoryManipulator.addById(this.client, item.getItemId() + 1, (short)1, item.getOwner(), pet, 45L, (byte)0);
                MapleInventoryManipulator.removeFromSlot(this.client, MapleInventoryType.CASH, slot, (short)1, false);
                break;
            }
            default: {
                MaplePet pet = item.getPet();
                if (pet == null || item.getItemId() == 5000054 && pet.getSecondsLeft() <= 0 || item.getExpiration() != -1L && item.getExpiration() <= System.currentTimeMillis()) break;
                if (pet.getSummoned()) {
                    this.unequipPet(pet, true, false);
                    break;
                }
                int leadid = 8;
                if (GameConstants.isKOC(this.getJob())) {
                    leadid = 10000018;
                } else if (GameConstants.isAran(this.getJob())) {
                    leadid = 20000024;
                } else if (GameConstants.isEvan(this.getJob())) {
                    leadid = 20010024;
                } else if (GameConstants.isResist(this.getJob())) {
                    leadid = 30000024;
                }
                if (this.getSkillLevel(SkillFactory.getSkill(leadid)) == 0 && this.getPet(0) != null) {
                    this.unequipPet(this.getPet(0), false, false);
                } else if (!lead || this.getSkillLevel(SkillFactory.getSkill(leadid)) > 0) {
                    // empty if block
                }
                Point pos = this.getPosition();
                pet.setPos(pos);
                try {
                    pet.setFh(this.getMap().getFootholds().findBelow(pos).getId());
                }
                catch (NullPointerException e) {
                    pet.setFh(0);
                }
                pet.setStance(0);
                pet.setSummoned(slot);
                this.addPet(pet);
                if (!broadcast) break;
                this.getMap().broadcastMessage(this, PetPacket.showPet(this, pet, false, false), true);
                this.client.getSession().write((Object)PetPacket.updatePet(pet, this.getInventory(MapleInventoryType.CASH).getItem(pet.getInventoryPosition()), true));
                this.client.getSession().write((Object)PetPacket.petStatUpdate(this));
                break;
            }
        }
        this.client.getSession().write((Object)PetPacket.emptyStatUpdate());
    }

    public void addMoveMob(int mobid) {
        if (this.movedMobs.containsKey(mobid)) {
            this.movedMobs.put(mobid, this.movedMobs.get(mobid) + 1);
            if (this.movedMobs.get(mobid) > 30) {
                for (MapleCharacter chr : this.getMap().getCharactersThreadsafe()) {
                    if (!chr.getMoveMobs().containsKey(mobid)) continue;
                    chr.getClient().getSession().write((Object)MobPacket.killMonster(mobid, 1));
                    chr.getMoveMobs().remove(mobid);
                }
            }
        } else {
            this.movedMobs.put(mobid, 1);
        }
    }

    public Map<Integer, Integer> getMoveMobs() {
        return this.movedMobs;
    }

    public int getLinkMid() {
        return this.linkMid;
    }

    public void setLinkMid(int lm) {
        this.linkMid = lm;
    }

    public boolean isClone() {
        if (this.clone) {
            this.clone = false;
        }
        return this.clone;
    }

    public void setClone(boolean c) {
        this.clone = c;
    }

    public WeakReference<MapleCharacter>[] getClones() {
        return this.clones;
    }

    public MapleCharacter cloneLooks() {
        MapleClient cs = new MapleClient(null, null, (IoSession)new MockIOSession());
        int minus = this.getId() + Randomizer.nextInt(this.getId());
        MapleCharacter ret = new MapleCharacter(true);
        ret.id = minus;
        ret.client = cs;
        ret.exp = 0;
        ret.meso = 0;
        ret.beans = this.beans;
        ret.blood = this.blood;
        ret.month = this.month;
        ret.day = this.day;
        ret.charmessage = this.charmessage;
        ret.expression = this.expression;
        ret.constellation = this.constellation;
        ret.skillzq = this.skillzq;
        ret.bosslog = this.bosslog;
        ret.grname = this.grname;
        ret.jzname = this.jzname;
        ret.mrfbrw = this.mrfbrw;
        ret.mrsjrw = this.mrsjrw;
        ret.mrsgrw = this.mrsgrw;
        ret.mrsbossrw = this.mrsbossrw;
        ret.mrfbrwa = this.mrfbrwa;
        ret.mrsgrwa = this.mrsgrwa;
        ret.mrsbossrwa = this.mrsbossrwa;
        ret.mrfbrws = this.mrfbrws;
        ret.mrsgrws = this.mrsgrws;
        ret.mrsbossrws = this.mrsbossrws;
        ret.mrfbrwas = this.mrfbrwas;
        ret.mrsgrwas = this.mrsgrwas;
        ret.mrsbossrwas = this.mrsbossrwas;
        ret.hythd = this.hythd;
        ret.ddj = this.ddj;
        ret.vip = this.vip;
        ret.remainingAp = 0;
        ret.fame = 0;
        ret.accountid = this.client.getAccID();
        ret.name = this.name;
        ret.level = this.level;
        ret.fame = this.fame;
        ret.job = this.job;
        ret.hair = this.hair;
        ret.face = this.face;
        ret.skinColor = this.skinColor;
        ret.bookCover = this.bookCover;
        ret.monsterbook = this.monsterbook;
        ret.mount = this.mount;
        ret.CRand = new PlayerRandomStream();
        ret.gmLevel = this.gmLevel;
        ret.gender = this.gender;
        ret.mapid = this.map.getId();
        ret.map = this.map;
        ret.setStance(this.getStance());
        ret.chair = this.chair;
        ret.itemEffect = this.itemEffect;
        ret.guildid = this.guildid;
        ret.currentrep = this.currentrep;
        ret.totalrep = this.totalrep;
        ret.stats = this.stats;
        ret.effects.putAll(this.effects);
        if (ret.effects.get(MapleBuffStat.ILLUSION) != null) {
            ret.effects.remove(MapleBuffStat.ILLUSION);
        }
        if (ret.effects.get(MapleBuffStat.SUMMON) != null) {
            ret.effects.remove(MapleBuffStat.SUMMON);
        }
        if (ret.effects.get(MapleBuffStat.REAPER) != null) {
            ret.effects.remove(MapleBuffStat.REAPER);
        }
        if (ret.effects.get(MapleBuffStat.PUPPET) != null) {
            ret.effects.remove(MapleBuffStat.PUPPET);
        }
        ret.guildrank = this.guildrank;
        ret.allianceRank = this.allianceRank;
        ret.hidden = this.hidden;
        ret.setPosition(new Point(this.getPosition()));
        for (IItem equip : this.getInventory(MapleInventoryType.EQUIPPED)) {
            ret.getInventory(MapleInventoryType.EQUIPPED).addFromDB(equip);
        }
        ret.skillMacros = this.skillMacros;
        ret.keylayout = this.keylayout;
        ret.questinfo = this.questinfo;
        ret.savedLocations = this.savedLocations;
        ret.wishlist = this.wishlist;
        ret.rocks = this.rocks;
        ret.regrocks = this.regrocks;
        ret.buddylist = this.buddylist;
        ret.keydown_skill = 0L;
        ret.lastmonthfameids = this.lastmonthfameids;
        ret.lastfametime = this.lastfametime;
        ret.storage = this.storage;
        ret.cs = this.cs;
        ret.client.setAccountName(this.client.getAccountName());
        ret.acash = this.acash;
        ret.maplepoints = this.maplepoints;
        ret.clone = true;
        ret.client.setChannel(this.client.getChannel());
        System.out.println("cloneLooks输出：" + this.client.getChannel());
        while (this.map.getCharacterById(ret.id) != null || this.client.getChannelServer().getPlayerStorage().getCharacterById(ret.id) != null) {
            ++ret.id;
        }
        ret.client.setPlayer(ret);
        return ret;
    }

    public final void cloneLook() {
        if (this.clone) {
            return;
        }
        for (int i = 0; i < this.clones.length; ++i) {
            if (this.clones[i].get() != null) continue;
            MapleCharacter newp = this.cloneLooks();
            this.map.addPlayer(newp);
            this.map.broadcastMessage(MaplePacketCreator.updateCharLook(newp));
            this.map.movePlayer(newp, this.getPosition());
            this.clones[i] = new WeakReference<MapleCharacter>(newp);
            return;
        }
    }

    public final void disposeClones() {
        this.numClones = 0;
        for (int i = 0; i < this.clones.length; ++i) {
            if (this.clones[i].get() == null) continue;
            this.map.removePlayer((MapleCharacter)this.clones[i].get());
            ((MapleCharacter)this.clones[i].get()).getClient().disconnect(false, false);
            this.clones[i] = new WeakReference<MapleCharacter>(null);
            this.numClones = (byte)(this.numClones + 1);
        }
    }

    public final int getCloneSize() {
        int z = 0;
        for (int i = 0; i < this.clones.length; ++i) {
            if (this.clones[i].get() == null) continue;
            ++z;
        }
        return z;
    }

    public void spawnClones() {
        if (this.numClones == 0 && this.stats.hasClone) {
            this.cloneLook();
        }
        for (int i = 0; i < this.numClones; ++i) {
            this.cloneLook();
        }
        this.numClones = 0;
    }

    public byte getNumClones() {
        return this.numClones;
    }

    public void setDragon(MapleDragon d) {
        this.dragon = d;
    }

    public final void spawnSavedPets() {
        for (int i = 0; i < this.petStore.length; ++i) {
            if (this.petStore[i] <= -1) continue;
            this.spawnPet(this.petStore[i], false, false);
        }
        this.client.getSession().write((Object)PetPacket.petStatUpdate(this));
        this.petStore = new byte[]{-1, -1, -1};
    }

    public final byte[] getPetStores() {
        return this.petStore;
    }

    public void resetStats(int str, int dex, int int_, int luk) {
        ArrayList<Pair<MapleStat, Integer>> stat = new ArrayList<Pair<MapleStat, Integer>>(2);
        int total = this.stats.getStr() + this.stats.getDex() + this.stats.getLuk() + this.stats.getInt() + this.getRemainingAp();
        total -= str;
        this.stats.setStr((short)str);
        total -= dex;
        this.stats.setDex((short)dex);
        total -= int_;
        this.stats.setInt((short)int_);
        this.stats.setLuk((short)luk);
        this.setRemainingAp((short)(total -= luk));
        stat.add(new Pair<MapleStat, Integer>(MapleStat.STR, str));
        stat.add(new Pair<MapleStat, Integer>(MapleStat.DEX, dex));
        stat.add(new Pair<MapleStat, Integer>(MapleStat.INT, int_));
        stat.add(new Pair<MapleStat, Integer>(MapleStat.LUK, luk));
        stat.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLEAP, total));
        this.client.getSession().write((Object)MaplePacketCreator.updatePlayerStats(stat, false, this.getJob()));
    }

    public Event_PyramidSubway getPyramidSubway() {
        return this.pyramidSubway;
    }

    public void setPyramidSubway(Event_PyramidSubway ps) {
        this.pyramidSubway = ps;
    }

    public byte getSubcategory() {
        if (this.job >= 430 && this.job <= 434) {
            return 1;
        }
        return this.subcategory;
    }

    public int itemQuantity(int itemid) {
        return this.getInventory(GameConstants.getInventoryType(itemid)).countById(itemid);
    }

    public void setRPS(RockPaperScissors rps) {
        this.rps = rps;
    }

    public RockPaperScissors getRPS() {
        return this.rps;
    }

    public long getNextConsume() {
        return this.nextConsume;
    }

    public void setNextConsume(long nc) {
        this.nextConsume = nc;
    }

    public int getRank() {
        return this.rank;
    }

    public int getRankMove() {
        return this.rankMove;
    }

    public int getJobRank() {
        return this.jobRank;
    }

    public int getJobRankMove() {
        return this.jobRankMove;
    }

    public void changeChannel(int channel) {
        ChannelServer toch = ChannelServer.getInstance(channel);
        if (channel == this.client.getChannel() || toch == null || toch.isShutdown()) {
            return;
        }
        this.changeRemoval();
        ChannelServer ch = ChannelServer.getInstance(this.client.getChannel());
        if (this.getMessenger() != null) {
            World.Messenger.silentLeaveMessenger(this.getMessenger().getId(), new MapleMessengerCharacter(this));
        }
        PlayerBuffStorage.addBuffsToStorage(this.getId(), this.getAllBuffs());
        PlayerBuffStorage.addCooldownsToStorage(this.getId(), this.getCooldowns());
        PlayerBuffStorage.addDiseaseToStorage(this.getId(), this.getAllDiseases());
        World.ChannelChange_Data(new CharacterTransfer(this), this.getId(), channel);
        ch.removePlayer(this);
        this.client.updateLoginState(6, this.client.getSessionIPAddress());
        String s = this.client.getSessionIPAddress();
        LoginServer.addIPAuth(s.substring(s.indexOf(47) + 1, s.length()));
        this.client.getSession().write(MaplePacketCreator.getChannelChange(toch.getPort()));
        this.saveToDB(false, false);
        this.getMap().removePlayer(this);
        this.client.setPlayer(null);
        this.client.setReceiving(false);
    }

    public void expandInventory(byte type, int amount) {
        MapleInventory inv = this.getInventory(MapleInventoryType.getByType(type));
        inv.addSlot((byte)amount);
    }

    public boolean allowedToTarget(MapleCharacter other) {
        return other != null && (!other.isHidden() || this.getGMLevel() >= other.getGMLevel());
    }

    public int getFollowId() {
        return this.followid;
    }

    public void setFollowId(int fi) {
        this.followid = fi;
        if (fi == 0) {
            this.followinitiator = false;
            this.followon = false;
        }
    }

    public void setFollowInitiator(boolean fi) {
        this.followinitiator = fi;
    }

    public void setFollowOn(boolean fi) {
        this.followon = fi;
    }

    public boolean isFollowOn() {
        return this.followon;
    }

    public boolean isFollowInitiator() {
        return this.followinitiator;
    }

    public void checkFollow() {
        if (this.followon) {
            MapleCharacter tt = this.map.getCharacterById(this.followid);
            if (tt != null) {
                tt.setFollowId(0);
            }
            this.setFollowId(0);
        }
    }

    public int getMarriageId() {
        return this.marriageId;
    }

    public void setMarriageId(int mi) {
        this.marriageId = mi;
    }

    public int getMarriageItemId() {
        return this.marriageItemId;
    }

    public void setMarriageItemId(int mi) {
        this.marriageItemId = mi;
    }

    public boolean isStaff() {
        return this.gmLevel > ServerConstants.PlayerGMRank.NORMAL.getLevel();
    }

    public boolean startPartyQuest(int questid) {
        boolean ret = false;
        if (!this.quests.containsKey(MapleQuest.getInstance(questid)) || !this.questinfo.containsKey(questid)) {
            MapleQuestStatus status = this.getQuestNAdd(MapleQuest.getInstance(questid));
            status.setStatus((byte)1);
            this.updateQuest(status);
            switch (questid) {
                case 1300: 
                case 1301: 
                case 1302: {
                    this.updateInfoQuest(questid, "min=0;sec=0;date=0000-00-00;have=0;rank=F;try=0;cmp=0;CR=0;VR=0;gvup=0;vic=0;lose=0;draw=0");
                    break;
                }
                case 1204: {
                    this.updateInfoQuest(questid, "min=0;sec=0;date=0000-00-00;have0=0;have1=0;have2=0;have3=0;rank=F;try=0;cmp=0;CR=0;VR=0");
                    break;
                }
                case 1206: {
                    this.updateInfoQuest(questid, "min=0;sec=0;date=0000-00-00;have0=0;have1=0;rank=F;try=0;cmp=0;CR=0;VR=0");
                    break;
                }
                default: {
                    this.updateInfoQuest(questid, "min=0;sec=0;date=0000-00-00;have=0;rank=F;try=0;cmp=0;CR=0;VR=0");
                }
            }
            ret = true;
        }
        return ret;
    }

    public String getOneInfo(int questid, String key) {
        if (!this.questinfo.containsKey(questid) || key == null) {
            return null;
        }
        for (String x : this.questinfo.get(questid).split(";")) {
            String[] split2 = x.split("=");
            if (split2.length != 2 || !split2[0].equals(key)) continue;
            return split2[1];
        }
        return null;
    }

    public void updateOneInfo(int questid, String key, String value) {
        if (!this.questinfo.containsKey(questid) || key == null || value == null) {
            return;
        }
        String[] split = this.questinfo.get(questid).split(";");
        boolean changed = false;
        StringBuilder newQuest = new StringBuilder();
        for (String x : split) {
            String[] split2 = x.split("=");
            if (split2.length != 2) continue;
            if (split2[0].equals(key)) {
                newQuest.append(key).append("=").append(value);
            } else {
                newQuest.append(x);
            }
            newQuest.append(";");
            changed = true;
        }
        this.updateInfoQuest(questid, changed ? newQuest.toString().substring(0, newQuest.toString().length() - 1) : newQuest.toString());
    }

    public void recalcPartyQuestRank(int questid) {
        if (!this.startPartyQuest(questid)) {
            String oldRank = this.getOneInfo(questid, "rank");
            if (oldRank == null || oldRank.equals("S")) {
                return;
            }
            this.questinfo.get(questid).split(";");
            String newRank = null;
            if (oldRank.equals("A")) {
                newRank = "S";
            } else if (oldRank.equals("B")) {
                newRank = "A";
            } else if (oldRank.equals("C")) {
                newRank = "B";
            } else if (oldRank.equals("D")) {
                newRank = "C";
            } else if (oldRank.equals("F")) {
                newRank = "D";
            } else {
                return;
            }
            List<Pair<String, Pair<String, Integer>>> questInfo = MapleQuest.getInstance(questid).getInfoByRank(newRank);
            for (Pair<String, Pair<String, Integer>> q : questInfo) {
                boolean found = false;
                String val = this.getOneInfo(questid,q.right.left);
                if (val == null) {
                    return;
                }
                int vall = 0;
                try {
                    vall = Integer.parseInt(val);
                }
                catch (NumberFormatException e) {
                    return;
                }
                if (((String)q.left).equals("less")) {
                    found = vall < q.right.right;
                } else if (q.left.equals("more")) {
                    found = vall >q.right.right;
                } else if (((String)q.left).equals("equal")) {
                    found = vall == q.right.right;
                }
                if (found) continue;
                return;
            }
            this.updateOneInfo(questid, "rank", newRank);
        }
    }

    public void tryPartyQuest(int questid) {
        try {
            this.startPartyQuest(questid);
            this.pqStartTime = System.currentTimeMillis();
            this.updateOneInfo(questid, "try", String.valueOf(Integer.parseInt(this.getOneInfo(questid, "try")) + 1));
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("tryPartyQuest error");
        }
    }

    public void endPartyQuest(int questid) {
        try {
            this.startPartyQuest(questid);
            if (this.pqStartTime > 0L) {
                long changeTime = System.currentTimeMillis() - this.pqStartTime;
                int mins = (int)(changeTime / 1000L / 60L);
                int secs = (int)(changeTime / 1000L % 60L);
                int mins2 = Integer.parseInt(this.getOneInfo(questid, "min"));
                Integer.parseInt(this.getOneInfo(questid, "sec"));
                if (mins2 <= 0 || mins < mins2) {
                    this.updateOneInfo(questid, "min", String.valueOf(mins));
                    this.updateOneInfo(questid, "sec", String.valueOf(secs));
                    this.updateOneInfo(questid, "date", FileoutputUtil.CurrentReadable_Date());
                }
                int newCmp = Integer.parseInt(this.getOneInfo(questid, "cmp")) + 1;
                this.updateOneInfo(questid, "cmp", String.valueOf(newCmp));
                this.updateOneInfo(questid, "CR", String.valueOf((int)Math.ceil((double)newCmp * 100.0 / (double)Integer.parseInt(this.getOneInfo(questid, "try")))));
                this.recalcPartyQuestRank(questid);
                this.pqStartTime = 0L;
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("endPartyQuest error");
        }
    }

    public void havePartyQuest(int itemId) {
        int questid = 0;
        int index = -1;
        switch (itemId) {
            case 1002798: {
                questid = 1200;
                break;
            }
            case 1072369: {
                questid = 1201;
                break;
            }
            case 1022073: {
                questid = 1202;
                break;
            }
            case 1082232: {
                questid = 1203;
                break;
            }
            case 1002571: 
            case 1002572: 
            case 1002573: 
            case 1002574: {
                questid = 1204;
                index = itemId - 1002571;
                break;
            }
            case 1122010: {
                questid = 1205;
                break;
            }
            case 1032060: 
            case 1032061: {
                questid = 1206;
                index = itemId - 1032060;
                break;
            }
            case 3010018: {
                questid = 1300;
                break;
            }
            case 1122007: {
                questid = 1301;
                break;
            }
            case 1122058: {
                questid = 1302;
                break;
            }
            default: {
                return;
            }
        }
        this.startPartyQuest(questid);
        this.updateOneInfo(questid, "have" + (index == -1 ? "" : Integer.valueOf(index)), "1");
    }

    public void resetStatsByJob(boolean beginnerJob) {
        int baseJob;
        baseJob = beginnerJob ? this.job % 1000 : this.job % 1000 / 100 * 100;
        if (baseJob == 100) {
            this.resetStats(25, 4, 4, 4);
        } else if (baseJob == 200) {
            this.resetStats(4, 4, 20, 4);
        } else if (baseJob == 300 || baseJob == 400) {
            this.resetStats(4, 25, 4, 4);
        } else if (baseJob == 500) {
            this.resetStats(4, 20, 4, 4);
        }
    }

    public boolean hasSummon() {
        return this.hasSummon;
    }

    public void setHasSummon(boolean summ) {
        this.hasSummon = summ;
    }

    public void removeDoor() {
        MapleDoor door = this.getDoors().iterator().next();
        for (MapleCharacter chr : door.getTarget().getCharactersThreadsafe()) {
            door.sendDestroyData(chr.getClient());
        }
        for (MapleCharacter chr : door.getTown().getCharactersThreadsafe()) {
            door.sendDestroyData(chr.getClient());
        }
        for (MapleDoor destroyDoor : this.getDoors()) {
            door.getTarget().removeMapObject(destroyDoor);
            door.getTown().removeMapObject(destroyDoor);
        }
        this.clearDoors();
    }

    public void changeRemoval() {
        this.changeRemoval(false);
    }

    public void changeRemoval(boolean dc) {
        if (this.getTrade() != null) {
            MapleTrade.cancelTrade(this.getTrade(), this.client);
        }
        if (this.getCheatTracker() != null) {
            this.getCheatTracker().dispose();
        }
        if (!dc) {
            this.cancelEffectFromBuffStat(MapleBuffStat.MONSTER_RIDING);
            this.cancelEffectFromBuffStat(MapleBuffStat.SUMMON);
            this.cancelEffectFromBuffStat(MapleBuffStat.REAPER);
            this.cancelEffectFromBuffStat(MapleBuffStat.PUPPET);
        }
        if (this.getPyramidSubway() != null) {
            this.getPyramidSubway().dispose(this);
        }
        if (this.playerShop != null && !dc) {
            this.playerShop.removeVisitor(this);
            if (this.playerShop.isOwner(this)) {
                this.playerShop.setOpen(true);
            }
        }
        if (!this.getDoors().isEmpty()) {
            this.removeDoor();
        }
        this.disposeClones();
        NPCScriptManager.getInstance().dispose(this.client);
    }

    public void updateTick(int newTick) {
        this.anticheat.updateTick(newTick);
    }

    public boolean canUseFamilyBuff(MapleFamilyBuff.MapleFamilyBuffEntry buff) {
        MapleQuestStatus stat = this.getQuestNAdd(MapleQuest.getInstance(buff.questID));
        if (stat.getCustomData() == null) {
            stat.setCustomData("0");
        }
        return Long.parseLong(stat.getCustomData()) + 86400000L < System.currentTimeMillis();
    }

    public void useFamilyBuff(MapleFamilyBuff.MapleFamilyBuffEntry buff) {
        MapleQuestStatus stat = this.getQuestNAdd(MapleQuest.getInstance(buff.questID));
        stat.setCustomData(String.valueOf(System.currentTimeMillis()));
    }

    public List<Pair<Integer, Integer>> usedBuffs() {
        ArrayList<Pair<Integer, Integer>> used = new ArrayList<Pair<Integer, Integer>>();
        for (MapleFamilyBuff.MapleFamilyBuffEntry buff : MapleFamilyBuff.getBuffEntry()) {
            if (this.canUseFamilyBuff(buff)) continue;
            used.add(new Pair<Integer, Integer>(buff.index, buff.count));
        }
        return used;
    }

    public String getTeleportName() {
        return this.teleportname;
    }

    public void setTeleportName(String tname) {
        this.teleportname = tname;
    }

    public int getNoJuniors() {
        if (this.mfc == null) {
            return 0;
        }
        return this.mfc.getNoJuniors();
    }

    public MapleFamilyCharacter getMFC() {
        return this.mfc;
    }

    public void makeMFC(int familyid, int seniorid, int junior1, int junior2) {
        if (familyid > 0) {
            MapleFamily f = World.Family.getFamily(familyid);
            if (f == null) {
                this.mfc = null;
            } else {
                this.mfc = f.getMFC(this.id);
                if (this.mfc == null) {
                    this.mfc = f.addFamilyMemberInfo(this, seniorid, junior1, junior2);
                }
                if (this.mfc.getSeniorId() != seniorid) {
                    this.mfc.setSeniorId(seniorid);
                }
                if (this.mfc.getJunior1() != junior1) {
                    this.mfc.setJunior1(junior1);
                }
                if (this.mfc.getJunior2() != junior2) {
                    this.mfc.setJunior2(junior2);
                }
            }
        } else {
            this.mfc = null;
        }
    }

    public void setFamily(int newf, int news, int newj1, int newj2) {
        if (this.mfc == null || newf != this.mfc.getFamilyId() || news != this.mfc.getSeniorId() || newj1 != this.mfc.getJunior1() || newj2 != this.mfc.getJunior2()) {
            this.makeMFC(newf, news, newj1, newj2);
        }
    }

    public int maxBattleshipHP(int skillid) {
        return this.getSkillLevel(skillid) * 5000 + (this.getLevel() - 120) * 3000;
    }

    public int currentBattleshipHP() {
        return this.battleshipHP;
    }

    public void sendEnglishQuiz(String msg) {
        this.client.getSession().write((Object)MaplePacketCreator.englishQuizMsg(msg));
    }

    public void fakeRelog() {
        this.client.getSession().write((Object)MaplePacketCreator.getCharInfo(this));
        MapleMap mapp = this.getMap();
        mapp.removePlayer(this);
        mapp.addPlayer(this);
    }

    public String getcharmessage() {
        return this.charmessage;
    }

    public void setcharmessage(String s) {
        this.charmessage = s;
    }

    public int getexpression() {
        return this.expression;
    }

    public void setexpression(int s) {
        this.expression = s;
    }

    public int getconstellation() {
        return this.constellation;
    }

    public void setconstellation(int s) {
        this.constellation = s;
    }

    public int getskillzq() {
        return this.skillzq;
    }

    public void setskillzq(int s) {
        this.skillzq = s;
    }

    public int getbosslog() {
        return this.bosslog;
    }

    public void setbosslog(int s) {
        this.bosslog = s;
    }

    public int getgrname() {
        return this.grname;
    }

    public void setgrname(int s) {
        this.grname = s;
    }

    public int getjzname() {
        return this.jzname;
    }

    public void setjzname(int s) {
        this.jzname = s;
    }

    public int getblood() {
        return this.blood;
    }

    public void setblood(int s) {
        this.blood = s;
    }

    public int getmonth() {
        return this.month;
    }

    public void setmonth(int s) {
        this.month = s;
    }

    public int getday() {
        return this.day;
    }

    public void setday(int s) {
        this.day = s;
    }

    public int getTeam() {
        return this.coconutteam;
    }

    public int getBeans() {
        return this.beans;
    }

    public void gainBeans(int s) {
        this.beans += s;
    }

    public void setBeans(int s) {
        this.beans = s;
    }

    public int getBeansNum() {
        return this.beansNum;
    }

    public void setBeansNum(int beansNum) {
        this.beansNum = beansNum;
    }

    public int getBeansRange() {
        return this.beansRange;
    }

    public void setBeansRange(int beansRange) {
        this.beansRange = beansRange;
    }

    public boolean isCanSetBeansNum() {
        return this.canSetBeansNum;
    }

    public void setCanSetBeansNum(boolean canSetBeansNum) {
        this.canSetBeansNum = canSetBeansNum;
    }

    public boolean haveGM() {
        return this.gmLevel >= 2 && this.gmLevel <= 3;
    }

    public void setprefix(int prefix) {
        this.prefix = prefix;
    }

    public int getPrefix() {
        return this.prefix;
    }

    public void startMapEffect(String msg, int itemId) {
        this.startMapEffect(msg, itemId, 30000);
    }

    public void startMapEffect1(String msg, int itemId) {
        this.startMapEffect(msg, itemId, 20000);
    }

    public void startMapEffect(String msg, int itemId, int duration) {
        final MapleMapEffect mapEffect = new MapleMapEffect(msg, itemId);
        this.getClient().getSession().write((Object)mapEffect.makeStartData());
        Timer.BuffTimer.getInstance().schedule(new Runnable(){

            @Override
            public void run() {
                MapleCharacter.this.getClient().getSession().write((Object)mapEffect.makeDestroyData());
            }
        }, duration);
    }

    public int getFishingJF(int type) {
        int jf = 0;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("select * from fishingjf where accname = ?");
            ps.setString(1, this.getClient().getAccountName());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                jf = type == 1 ? rs.getInt("fishing") : (type == 2 ? rs.getInt("XX") : (type == 3 ? rs.getInt("XXX") : 0));
            } else {
                PreparedStatement psu = con.prepareStatement("insert into fishingjf (accname, fishing, XX, XXX) VALUES (?, ?, ?, ?)");
                psu.setString(1, this.getClient().getAccountName());
                psu.setInt(2, 0);
                psu.setInt(3, 0);
                psu.setInt(4, 0);
                psu.executeUpdate();
                psu.close();
            }
            ps.close();
            rs.close();
        }
        catch (SQLException ex) {
            System.err.println("获取钓鱼积分信息发生错误: " + ex);
        }
        return jf;
    }

    public int gainFishingJF(int hypay) {
        int jf = this.getFishingJF(1);
        int XX = this.getFishingJF(2);
        int XXX = this.getFishingJF(3);
        if (hypay <= 0) {
            return 0;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE fishingjf SET fishing = ? ,XX = ? ,XXX = ? where accname = ?");
            ps.setInt(1, hypay + jf);
            ps.setInt(2, XX);
            ps.setInt(3, XXX);
            ps.setString(4, this.getClient().getAccountName());
            ps.executeUpdate();
            ps.close();
            return 1;
        }
        catch (SQLException ex) {
            System.err.println("加减钓鱼积分信息发生错误: " + ex);
            return 0;
        }
    }

    public int addFishingJF(int hypay) {
        int jf = this.getFishingJF(1);
        int XX = this.getFishingJF(2);
        int XXX = this.getFishingJF(3);
        if (hypay > jf) {
            return -1;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE fishingjf SET fishing = ? ,XX = ? ,XXX = ? where accname = ?");
            ps.setInt(1, jf - hypay);
            ps.setInt(2, XX);
            ps.setInt(3, XXX);
            ps.setString(4, this.getClient().getAccountName());
            ps.executeUpdate();
            ps.close();
            return 1;
        }
        catch (SQLException ex) {
            System.err.println("加减钓鱼积分信息发生错误: " + ex);
            return -1;
        }
    }

    public int getHyPay(int type) {
        int pay = 0;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("select * from hypay where accname = ?");
            ps.setString(1, this.getClient().getAccountName());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                pay = type == 1 ? rs.getInt("pay") : (type == 2 ? rs.getInt("payUsed") : (type == 3 ? rs.getInt("pay") + rs.getInt("payUsed") : (type == 4 ? rs.getInt("payReward") : 0)));
            } else {
                PreparedStatement psu = con.prepareStatement("insert into hypay (accname, pay, payUsed, payReward) VALUES (?, ?, ?, ?)");
                psu.setString(1, this.getClient().getAccountName());
                psu.setInt(2, 0);
                psu.setInt(3, 0);
                psu.setInt(4, 0);
                psu.executeUpdate();
                psu.close();
            }
            ps.close();
            rs.close();
        }
        catch (SQLException ex) {
            System.err.println("获取充值信息发生错误: " + ex);
        }
        return pay;
    }

    public int gainHyPay(int hypay) {
        int pay = this.getHyPay(1);
        int payUsed = this.getHyPay(2);
        int payReward = this.getHyPay(4);
        if (hypay <= 0) {
            return 0;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE hypay SET pay = ? ,payUsed = ? ,payReward = ? where accname = ?");
            ps.setInt(1, pay + hypay);
            ps.setInt(2, payUsed);
            ps.setInt(3, payReward);
            ps.setString(4, this.getClient().getAccountName());
            ps.executeUpdate();
            ps.close();
            return 1;
        }
        catch (SQLException ex) {
            System.err.println("加减充值信息发生错误: " + ex);
            return 0;
        }
    }

    public int addHyPay(int hypay) {
        int pay = this.getHyPay(1);
        int payUsed = this.getHyPay(2);
        int payReward = this.getHyPay(4);
        if (hypay > pay) {
            return -1;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE hypay SET pay = ? ,payUsed = ? ,payReward = ? where accname = ?");
            ps.setInt(1, pay - hypay);
            ps.setInt(2, payUsed + hypay);
            ps.setInt(3, payReward + hypay);
            ps.setString(4, this.getClient().getAccountName());
            ps.executeUpdate();
            ps.close();
            return 1;
        }
        catch (SQLException ex) {
            System.err.println("加减充值信息发生错误: " + ex);
            return -1;
        }
    }

    public int delPayReward(int pay) {
        int payReward = this.getHyPay(4);
        if (pay <= 0) {
            return -1;
        }
        if (pay > payReward) {
            return -1;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE hypay SET payReward = ? where accname = ?");
            ps.setInt(1, payReward - pay);
            ps.setString(2, this.getClient().getAccountName());
            ps.executeUpdate();
            ps.close();
            return 1;
        }
        catch (SQLException ex) {
            System.err.println("加减消费奖励信息发生错误: " + ex);
            return -1;
        }
    }

    public int getGamePoints() {
        try {
            int gamePoints = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                gamePoints = rs.getInt("gamePoints");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    gamePoints = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET gamePoints = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, gamePoints) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return gamePoints;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public int getGamePointsPD() {
        try {
            int gamePointsPD = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                gamePointsPD = rs.getInt("gamePointspd");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    gamePointsPD = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET gamePointspd = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, gamePointspd) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return gamePointsPD;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainGamePoints(int amount) {
        int gamePoints = this.getGamePoints() + amount;
        this.updateGamePoints(gamePoints);
    }

    public void gainGamePointsPD(int amount) {
        int gamePointsPD = this.getGamePointsPD() + amount;
        this.updateGamePointsPD(gamePointsPD);
    }

    public void resetGamePointsPD() {
        this.updateGamePointsPD(0);
    }

    public void updateGamePointsPD(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET gamePointspd = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public void resetGamePoints() {
        this.updateGamePoints(0);
    }

    public void updateGamePoints(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET gamePoints = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getGamePointsRQ() {
        try {
            int gamePointsRQ = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                gamePointsRQ = rs.getInt("gamePointsrq");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    gamePointsRQ = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET gamePointsrq = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, gamePointsrq) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return gamePointsRQ;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainGamePointsRQ(int amount) {
        int gamePointsRQ = this.getGamePointsRQ() + amount;
        this.updateGamePointsRQ(gamePointsRQ);
    }

    public void resetGamePointsRQ() {
        this.updateGamePointsRQ(0);
    }

    public void updateGamePointsRQ(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET gamePointsrq = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getGamePointsPS() {
        try {
            int gamePointsRQ = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                gamePointsRQ = rs.getInt("gamePointsps");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    gamePointsRQ = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET gamePointsps = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, gamePointsps) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return gamePointsRQ;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainGamePointsPS(int amount) {
        int gamePointsPS = this.getGamePointsPS() + amount;
        this.updateGamePointsPS(gamePointsPS);
    }

    public void resetGamePointsPS() {
        this.updateGamePointsPS(0);
    }

    public void updateGamePointsPS(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET gamePointsps = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public long getDeadtime() {
        return this.deadtime;
    }

    public void setDeadtime(long deadtime) {
        this.deadtime = deadtime;
    }

    public void increaseEquipExp(int mobexp) {
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        for (IItem item : this.getInventory(MapleInventoryType.EQUIPPED).list()) {
            Equip nEquip = (Equip)item;
            String itemName = mii.getName(nEquip.getItemId());
            if (itemName == null || (!itemName.contains("重生") || nEquip.getEquipLevel() >= 4) && (!itemName.contains("永恒") || nEquip.getEquipLevel() >= 6)) continue;
            nEquip.gainItemExp(this.client, mobexp, itemName.contains("永恒"));
        }
    }

    public void petName(String name) {
        MaplePet pet = this.getPet(0);
        if (pet == null) {
            this.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(1, "请召唤一只宠物出来！"));
            this.getClient().getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        pet.setName(name);
        this.getClient().getSession().write((Object)PetPacket.updatePet(pet, this.getInventory(MapleInventoryType.CASH).getItem(pet.getInventoryPosition()), true));
        this.getClient().getSession().write((Object)MaplePacketCreator.enableActions());
        this.getClient().getPlayer().getMap().broadcastMessage(this.getClient().getPlayer(), MTSCSPacket.changePetName(this.getClient().getPlayer(), name, 1), true);
    }

    public void setFake() {
        this.isfake = true;
    }

    public boolean isFake() {
        return this.isfake;
    }

    public void setName(String name, boolean changeName) {
        if (!changeName) {
            this.name = name;
        } else {
            Connection con = DatabaseConnection.getConnection();
            try {
                con.setTransactionIsolation(1);
                con.setAutoCommit(false);
                PreparedStatement sn = con.prepareStatement("UPDATE characters SET name = ? WHERE id = ?");
                sn.setString(1, name);
                sn.setInt(2, this.id);
                sn.execute();
                con.commit();
                sn.close();
                this.name = name;
            }
            catch (SQLException se) {
                System.err.println("SQL error: " + se.getLocalizedMessage() + "-----错误输出：" + se);
            }
        }
    }

    public void setID(int id) {
        this.id = id;
    }

    public boolean hasFakeChar() {
        return this.fakes.size() > 0;
    }

    public List<FakeCharacter> getFakeChars() {
        return this.fakes;
    }

    public void setJob(short job) {
        this.job = job;
    }

    public int getSJRW() {
        try {
            int sjrw = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                sjrw = rs.getInt("sjrw");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    sjrw = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET sjrw = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, sjrw) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return sjrw;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainSJRW(int amount) {
        int sjrw = this.getSJRW() + amount;
        this.updateSJRW(sjrw);
    }

    public void resetSJRW() {
        this.updateSJRW(0);
    }

    public void updateSJRW(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET sjrw = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getFBRW() {
        try {
            int fbrw = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                fbrw = rs.getInt("fbrw");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    fbrw = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET fbrw = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, fbrw) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return fbrw;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainFBRW(int amount) {
        int fbrw = this.getFBRW() + amount;
        this.updateFBRW(fbrw);
    }

    public void resetFBRW() {
        this.updateFBRW(0);
    }

    public void updateFBRW(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET fbrw = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getFBRWA() {
        try {
            int fbrwa = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                fbrwa = rs.getInt("fbrwa");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    fbrwa = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET fbrwa = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, fbrwa) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return fbrwa;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainFBRWA(int amount) {
        int fbrw = this.getFBRWA() + amount;
        this.updateFBRWA(fbrw);
    }

    public void resetFBRWA() {
        this.updateFBRWA(0);
    }

    public void updateFBRWA(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET fbrwa = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getSGRW() {
        try {
            int sgrw = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                sgrw = rs.getInt("sgrw");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    sgrw = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET sgrw = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, sgrw) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return sgrw;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainSGRW(int amount) {
        int sgrw = this.getSGRW() + amount;
        this.updateSGRW(sgrw);
    }

    public void resetSGRW() {
        this.updateSGRW(0);
    }

    public void updateSGRW(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET sgrw = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getSGRWA() {
        try {
            int sgrwa = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                sgrwa = rs.getInt("sgrwa");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    sgrwa = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET sgrwa = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, sgrwa) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return sgrwa;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainSGRWA(int amount) {
        int sgrw = this.getSGRWA() + amount;
        this.updateSGRWA(sgrw);
    }

    public void resetSGRWA() {
        this.updateSGRWA(0);
    }

    public void updateSGRWA(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET sgrwa = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getSBOSSRW() {
        try {
            int sbossrw = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                sbossrw = rs.getInt("sbossrw");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    sbossrw = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET sbossrw = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, sbossrw) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return sbossrw;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainSBOSSRW(int amount) {
        int sbossrw = this.getSBOSSRW() + amount;
        this.updateSBOSSRW(sbossrw);
    }

    public void resetSBOSSRW() {
        this.updateSBOSSRW(0);
    }

    public void updateSBOSSRW(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET sbossrw = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getSBOSSRWA() {
        try {
            int sbossrwa = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                sbossrwa = rs.getInt("sbossrwa");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    sbossrwa = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET sbossrwa = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, sbossrwa) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return sbossrwa;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainSBOSSRWA(int amount) {
        int sbossrw = this.getSBOSSRWA() + amount;
        this.updateSBOSSRWA(sbossrw);
    }

    public void resetSBOSSRWA() {
        this.updateSBOSSRWA(0);
    }

    public void updateSBOSSRWA(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET sbossrwa = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getlb() {
        try {
            int lb = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, this.getClient().getAccID());
            ps.setInt(2, this.getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                lb = rs.getInt("lb");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(5) + 1 <= Calendar.getInstance().get(5) || sqlcal.get(2) + 1 <= Calendar.getInstance().get(2) || sqlcal.get(1) + 1 <= Calendar.getInstance().get(1)) {
                    lb = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET lb = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, this.getClient().getAccID());
                    psu.setInt(2, this.getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, lb) VALUES (?, ?, ?)");
                psu.setInt(1, this.getClient().getAccID());
                psu.setInt(2, this.getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return lb;
        }
        catch (SQLException Ex) {
            System.err.println("获取角色帐号的在线时间点出现错误 - 数据库查询失败" + Ex);
            return -1;
        }
    }

    public void gainlb(int amount) {
        int lb = this.getlb() + amount;
        this.updatelb(lb);
    }

    public void resetlb() {
        this.updatelb(0);
    }

    public void updatelb(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET lb = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
            ps.setInt(1, amount);
            ps.setInt(2, this.getClient().getAccID());
            ps.setInt(3, this.getWorld());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException Ex) {
            System.err.println("更新角色帐号的在线时间出现错误 - 数据库更新失败." + Ex);
        }
    }

    public int getmrsgrw() {
        return this.mrsgrw;
    }

    public void setmrsgrw(int s) {
        this.mrsgrw = s;
    }

    public int getmrsgrwa() {
        return this.mrsgrwa;
    }

    public void setmrsgrwa(int s) {
        this.mrsgrwa = s;
    }

    public int getmrsgrwas() {
        return this.mrsgrwas;
    }

    public void setmrsgrwas(int s) {
        this.mrsgrwas = s;
    }

    public int getmrsgrws() {
        return this.mrsgrws;
    }

    public void setmrsgrws(int s) {
        this.mrsgrws = s;
    }

    public int gethythd() {
        return this.hythd;
    }

    public void sethythd(int s) {
        this.hythd = s;
    }

    public int getmrsjrw() {
        return this.mrsjrw;
    }

    public void setmrsjrw(int s) {
        this.mrsjrw = s;
    }

    public int getmrfbrw() {
        return this.mrfbrw;
    }

    public void setmrfbrw(int s) {
        this.mrfbrw = s;
    }

    public int getmrsbossrw() {
        return this.mrsbossrw;
    }

    public void setmrsbossrw(int s) {
        this.mrsbossrw = s;
    }

    public int getmrfbrws() {
        return this.mrfbrws;
    }

    public void setmrfbrws(int s) {
        this.mrfbrws = s;
    }

    public int getmrsbossrws() {
        return this.mrsbossrws;
    }

    public void setmrsbossrws(int s) {
        this.mrsbossrws = s;
    }

    public int getmrfbrwa() {
        return this.mrfbrwa;
    }

    public void setmrfbrwa(int s) {
        this.mrfbrwa = s;
    }

    public int getmrsbossrwa() {
        return this.mrsbossrwa;
    }

    public void setmrsbossrwa(int s) {
        this.mrsbossrwa = s;
    }

    public int getmrfbrwas() {
        return this.mrfbrwas;
    }

    public void setmrfbrwas(int s) {
        this.mrfbrwas = s;
    }

    public int getvip() {
        return this.vip;
    }

    public void setvip(int s) {
        this.vip = s;
    }

    public void gainvip(int s) {
        this.vip += s;
    }

    public int getddj() {
        return this.ddj;
    }

    public void setddj(int s) {
        this.ddj = s;
    }

    public void gainddj(int s) {
        this.ddj += s;
    }

    public int getmrsbossrwas() {
        return this.mrsbossrwas;
    }

    public void setmrsbossrwas(int s) {
        this.mrsbossrwas = s;
    }


    public static enum FameStatus {
        OK,
        NOT_TODAY,
        NOT_THIS_MONTH;

    }

}