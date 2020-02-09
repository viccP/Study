/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoSession
 */
package server;

import java.io.IOException;
import java.net.ServerSocket;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.LinkedHashSet;
import java.util.Map;

import client.MapleCharacter;
import client.SkillFactory;
import database.DatabaseConnection;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.channel.MapleGuildRanking;
import handling.login.LoginInformationProvider;
import handling.login.LoginServer;
import handling.world.World;
import handling.world.family.MapleFamilyBuff;
import server.events.MapleOxQuizFactory;
import server.life.MapleLifeFactory;
import server.maps.MapleMap;
import server.quest.MapleQuest;
import tools.FileoutputUtil;
import tools.StringUtil;

public class Start {
    public static final Start instance = new Start();
    private static int maxUsers = 0;
    private static ServerSocket srvSocket = null;
    private static ServerSocket srvSocketa = null;
    private static int srvPort = 6350;
    private static int srvPorta = 6351;

    public static void main(String[] args) {
       try {
		instance.startServer();
	} catch (InterruptedException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
    }

    public void startServer() throws InterruptedException {
        if (Boolean.parseBoolean(ServerProperties.getProperty("KinMS.Admin"))) {
            System.out.println("[!!! Admin Only Mode Active !!!]");
        }
        if (Boolean.parseBoolean(ServerProperties.getProperty("KinMS.AutoRegister"))) {
            System.out.println("\u52a0\u8f7d \u81ea\u52a8\u6ce8\u518c\u5b8c\u6210 :::");
        }
        try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET loggedin = 0");){
            ps.executeUpdate();
        }
        catch (SQLException ex) {
            throw new RuntimeException("[EXCEPTION] Please check if the SQL server is active.");
        }
        World.init();
        Timer.WorldTimer.getInstance().start();
        Timer.EtcTimer.getInstance().start();
        Timer.MapTimer.getInstance().start();
        Timer.MobTimer.getInstance().start();
        Timer.CloneTimer.getInstance().start();
        Timer.EventTimer.getInstance().start();
        Timer.BuffTimer.getInstance().start();
        LoginInformationProvider.getInstance();
        MapleQuest.initQuests();
        MapleLifeFactory.loadQuestCounts();
        MapleItemInformationProvider.getInstance().load();
        RandomRewards.getInstance();
        SkillFactory.getSkill(99999999);
        MapleOxQuizFactory.getInstance().initialize();
        MapleCarnivalFactory.getInstance();
        MapleGuildRanking.getInstance().getRank();
        MapleFamilyBuff.getBuffEntry();
        RankingWorker.getInstance().run();
        CashItemFactory.getInstance().initialize();
        LoginServer.run_startup_configurations();
        ChannelServer.startChannel_Main();
        CashShopServer.run_startup_configurations();
        Timer.CheatTimer.getInstance().register(AutobanManager.getInstance(), 60000L);
        Start.\u56de\u6536\u5185\u5b58(360);
        Start.\u5728\u7ebf\u65f6\u95f4(1);
        if (Boolean.parseBoolean(ServerProperties.getProperty("KinMS.RandDrop"))) {
            ChannelServer.getInstance(1).getMapFactory().getMap(910000000).spawnRandDrop();
        }
        Runtime.getRuntime().addShutdownHook(new Thread(new Shutdown()));
        try {
            SpeedRunner.getInstance().loadSpeedRuns();
        }
        catch (SQLException e) {
            System.out.println("SpeedRunner\u9519\u8bef:" + e);
        }
        World.registerRespawn();
        LoginServer.setOn();
        System.out.println("\r\n\u7ecf\u9a8c\u500d\u7387:" + Integer.parseInt(ServerProperties.getProperty("KinMS.Exp")) + "  \u7269\u54c1\u500d\u7387\uff1a" + Integer.parseInt(ServerProperties.getProperty("KinMS.Drop")) + "  \u91d1\u5e01\u500d\u7387" + Integer.parseInt(ServerProperties.getProperty("KinMS.Meso")));
        System.out.println("\r\n\u52a0\u8f7d\u5b8c\u6210!\u5f00\u7aef\u6210\u529f! :::");
    }

    public static void \u81ea\u52a8\u5b58\u6863(int time) {
        Timer.WorldTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                int ppl = 0;
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                        if (chr == null) continue;
                        ++ppl;
                        chr.saveToDB(false, true);
                    }
                }
            }
        }, 60000 * time);
    }

    public static void \u5f00\u542f\u53cc\u500d(int time) {
        Timer.WorldTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                int year = Calendar.getInstance().get(1);
                int month = Calendar.getInstance().get(2) + 1;
                int date = Calendar.getInstance().get(5);
                int hour = Calendar.getInstance().get(11);
                int minute = Calendar.getInstance().get(12);
                int second = Calendar.getInstance().get(13);
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    if (Integer.parseInt(ServerProperties.getProperty("KinMS.\u5f00\u542f\u53cc\u500d\u65f6\u95f4")) == hour && minute <= 1 && Integer.parseInt(ServerProperties.getProperty("KinMS.\u5f00\u542f\u53cc\u500d\u65f6\u95f4")) != 0) {
                        cserv.setDoubleExp(1);
                        continue;
                    }
                    if (Integer.parseInt(ServerProperties.getProperty("KinMS.\u5173\u95ed\u53cc\u500d\u65f6\u95f4")) != hour || minute > 1 || Integer.parseInt(ServerProperties.getProperty("KinMS.\u5173\u95ed\u53cc\u500d\u65f6\u95f4")) == 0) continue;
                    cserv.setDoubleExp(0);
                }
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                        if (chr == null) continue;
                        if (cserv.getDoubleExp() == 1 && Integer.parseInt(ServerProperties.getProperty("KinMS.\u5f00\u542f\u53cc\u500d\u65f6\u95f4")) == hour && minute <= 1 && Integer.parseInt(ServerProperties.getProperty("KinMS.\u5f00\u542f\u53cc\u500d\u65f6\u95f4")) != 0) {
                            chr.startMapEffect("\u7cfb\u7edf\u81ea\u52a8\u5f00\u542f\u3010\u53cc\u500d\u7ecf\u9a8c\u3011\u6d3b\u52a8\uff01", 5120000);
                            continue;
                        }
                        if (Integer.parseInt(ServerProperties.getProperty("KinMS.\u5173\u95ed\u53cc\u500d\u65f6\u95f4")) != hour || minute > 1 || Integer.parseInt(ServerProperties.getProperty("KinMS.\u5173\u95ed\u53cc\u500d\u65f6\u95f4")) == 0) continue;
                        chr.startMapEffect("\u7cfb\u7edf\u81ea\u52a8\u5173\u95ed\u3010\u53cc\u500d\u7ecf\u9a8c\u3011\u6d3b\u52a8\uff01\u671f\u5f85\u4e0b\u6b21\u6d3b\u52a8\uff01", 5120000);
                    }
                }
            }
        }, 60000 * time);
    }

    public static void \u5237\u65b0\u5730\u56fe(int time) {
        Timer.WorldTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                        for (int i = 0; i < 6; ++i) {
                            int mapidA = 100000000 + (i + 1000000 - 2000000);
                            MapleCharacter player = chr;
                            if (i == 6) {
                                mapidA = 910000000;
                            }
                            int mapid = mapidA;
                            MapleMap map = player.getClient().getChannelServer().getMapFactory().getMap(mapid);
                            if (!player.getClient().getChannelServer().getMapFactory().destroyMap(mapid)) continue;
                            MapleMap newMap = player.getClient().getChannelServer().getMapFactory().getMap(mapid);
                            MaplePortal newPor = newMap.getPortal(0);
                            LinkedHashSet<MapleCharacter> mcs = new LinkedHashSet<MapleCharacter>(map.getCharacters());
                            block5: for (MapleCharacter m : mcs) {
                                for (int x = 0; x < 5; ++x) {
                                    try {
                                        m.changeMap(newMap, newPor);
                                        continue block5;
                                    }
                                    catch (Throwable t) {
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, 60000 * time);
    }

    public static void \u9632\u4e07\u80fd(int time) {
        Timer.WorldTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                        if (chr.getClient().getfwn() > 0 || chr == null) continue;
                        chr.getClient().getSession().close();
                    }
                }
            }
        }, 60000 * time);
    }

    public static void \u5728\u7ebf\u7edf\u8ba1(int time) {
        System.out.println("\u670d\u52a1\u7aef\u542f\u7528\u5728\u7ebf\u7edf\u8ba1." + time + "\u5206\u949f\u7edf\u8ba1\u4e00\u6b21\u5728\u7ebf\u7684\u4eba\u6570\u4fe1\u606f.");
        Timer.WorldTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                Map<Integer, Integer> connected = World.getConnected();
                StringBuilder conStr = new StringBuilder(FileoutputUtil.CurrentReadable_Time() + " \u5728\u7ebf\u4eba\u6570: ");
                for (int i : connected.keySet()) {
                    if (i != 0) continue;
                    int users = connected.get(i);
                    conStr.append(StringUtil.getRightPaddedStr(String.valueOf(users), ' ', 3));
                    if (users > maxUsers) {
                        maxUsers = users;
                    }
                    conStr.append(" \u6700\u9ad8\u5728\u7ebf: ");
                    conStr.append(maxUsers);
                    break;
                }
                System.out.println(conStr.toString());
                if (maxUsers > 0) {
                    FileoutputUtil.log("\u5728\u7ebf\u7edf\u8ba1.txt", conStr.toString() + "\r\n");
                }
            }
        }, 60000 * time);
    }

    public static void \u5728\u7ebf\u65f6\u95f4(int time) {
        Timer.WorldTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                try {
                    for (ChannelServer chan : ChannelServer.getAllInstances()) {
                        for (MapleCharacter chr : chan.getPlayerStorage().getAllCharacters()) {
                            if (chr == null) continue;
                            chr.gainGamePoints(1);
                            if (chr.getGamePoints() >= 5) continue;
                            chr.resetFBRW();
                            chr.resetFBRWA();
                            chr.resetSBOSSRW();
                            chr.resetSBOSSRWA();
                            chr.resetSGRW();
                            chr.resetSGRWA();
                            chr.resetSJRW();
                            chr.resetlb();
                            chr.setmrsjrw(0);
                            chr.setmrfbrw(0);
                            chr.setmrsgrw(0);
                            chr.setmrsbossrw(0);
                            chr.setmrfbrwa(0);
                            chr.setmrsgrwa(0);
                            chr.setmrsbossrwa(0);
                            chr.setmrfbrwas(0);
                            chr.setmrsgrwas(0);
                            chr.setmrsbossrwas(0);
                            chr.setmrfbrws(0);
                            chr.setmrsgrws(0);
                            chr.setmrsbossrws(0);
                            chr.resetGamePointsPS();
                            chr.resetGamePointsPD();
                        }
                    }
                }
                catch (Exception e) {
                    // empty catch block
                }
            }
        }, 60000 * time);
    }

    protected static void checkSingleInstance() {
        try {
            srvSocket = new ServerSocket(srvPort);
        }
        catch (IOException ex) {
            if (ex.getMessage().indexOf("Address already in use: JVM_Bind") >= 0) {
                System.out.println("\u5728\u4e00\u53f0\u4e3b\u673a\u4e0a\u540c\u65f6\u53ea\u80fd\u542f\u52a8\u4e00\u4e2a\u8fdb\u7a0b(Only one instance allowed)\u3002");
            }
            System.exit(0);
        }
    }

    public static void \u56de\u6536\u5185\u5b58(int time) {
        Timer.WorldTimer.getInstance().register(new Runnable(){

            @Override
            public void run() {
                System.gc();
            }
        }, 60000 * time);
    }

    public static class Shutdown
    implements Runnable {
        @Override
        public void run() {
            new Thread(ShutdownServer.getInstance()).start();
        }
    }

}

