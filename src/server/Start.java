package server;

import java.sql.PreparedStatement;
import java.sql.SQLException;

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
import server.quest.MapleQuest;

/**
 * 启动类
 * 
 * @author viness
 *
 */
public class Start {
	public static final Start instance = new Start();

	public static void main(String[] args) {
		try {
			instance.startServer();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 启动服务器
	 * 
	 * @throws InterruptedException
	 */
	public void startServer() throws InterruptedException {
		if (Boolean.parseBoolean(ServerProperties.getProperty("KinMS.Admin"))) {
			System.out.println("[!!! Admin Only Mode Active !!!]");
		}
		if (Boolean.parseBoolean(ServerProperties.getProperty("KinMS.AutoRegister"))) {
			System.out.println("加载 自动注册完成 :::");
		}
		try {
			PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET loggedin = 0");
			ps.executeUpdate();
		} catch (SQLException ex) {
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
		Start.autoGc(360);
		Start.onlineTime(1);
		if (Boolean.parseBoolean(ServerProperties.getProperty("KinMS.RandDrop"))) {
			ChannelServer.getInstance(1).getMapFactory().getMap(910000000).spawnRandDrop();
		}
		Runtime.getRuntime().addShutdownHook(new Thread(new Shutdown()));
		try {
			SpeedRunner.getInstance().loadSpeedRuns();
		} catch (SQLException e) {
			System.out.println("SpeedRunner错误:" + e);
		}
		World.registerRespawn();
		LoginServer.setOn();
		System.out.println("\r\n经验倍率:" + Integer.parseInt(ServerProperties.getProperty("KinMS.Exp")) + "  物品倍率：" + Integer.parseInt(ServerProperties.getProperty("KinMS.Drop")) + "  金币倍率" + Integer.parseInt(ServerProperties.getProperty("KinMS.Meso")));
		System.out.println("\r\n加载完成!开端成功! :::");
	}

	public static void onlineTime(int time) {
		Timer.WorldTimer.getInstance().register(new Runnable() {

			@Override
			public void run() {
				try {
					for (ChannelServer chan : ChannelServer.getAllInstances()) {
						for (MapleCharacter chr : chan.getPlayerStorage().getAllCharacters()) {
							if (chr == null)
								continue;
							chr.gainGamePoints(1);
							if (chr.getGamePoints() >= 5)
								continue;
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
				} catch (Exception e) {
					// empty catch block
				}
			}
		}, 60000 * time);
	}

	public static void autoGc(int time) {
		Timer.WorldTimer.getInstance().register(new Runnable() {

			@Override
			public void run() {
				System.gc();
			}
		}, 60000 * time);
	}

	public static class Shutdown implements Runnable {
		@Override
		public void run() {
			new Thread(ShutdownServer.getInstance()).start();
		}
	}

}