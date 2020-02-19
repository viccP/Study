/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package client.messages.commands;

import java.util.Arrays;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import constants.GameConstants;
import constants.ServerConstants;
import scripting.NPCScriptManager;
import server.life.MapleMonster;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.StringUtil;

public class PlayerCommand {
	public static ServerConstants.PlayerGMRank getPlayerLevelRequired() {
		return ServerConstants.PlayerGMRank.NORMAL;
	}

	public static class STR extends DistributeStatCommands {
		public STR() {
			this.stat = MapleStat.STR;
		}
	}

	public static class DEX extends DistributeStatCommands {
		public DEX() {
			this.stat = MapleStat.DEX;
		}
	}

	public static class INT extends DistributeStatCommands {
		public INT() {
			this.stat = MapleStat.INT;
		}
	}

	public static class LUK extends DistributeStatCommands {
		public LUK() {
			this.stat = MapleStat.LUK;
		}
	}

	public static abstract class DistributeStatCommands extends CommandExecute {
		protected MapleStat stat = null;

		private void setStat(MapleCharacter player, int amount) {
			switch (this.stat) {
			case STR: {
				player.getStat().setStr((short) amount);
				player.updateSingleStat(MapleStat.STR, player.getStat().getStr());
				break;
			}
			case DEX: {
				player.getStat().setDex((short) amount);
				player.updateSingleStat(MapleStat.DEX, player.getStat().getDex());
				break;
			}
			case INT: {
				player.getStat().setInt((short) amount);
				player.updateSingleStat(MapleStat.INT, player.getStat().getInt());
				break;
			}
			case LUK: {
				player.getStat().setLuk((short) amount);
				player.updateSingleStat(MapleStat.LUK, player.getStat().getLuk());
			}
			default:
				break;
			}
		}

		private int getStat(MapleCharacter player) {
			switch (this.stat) {
			case STR: {
				return player.getStat().getStr();
			}
			case DEX: {
				return player.getStat().getDex();
			}
			case INT: {
				return player.getStat().getInt();
			}
			case LUK: {
				return player.getStat().getLuk();
			}
			default:
				break;
			}
			throw new RuntimeException();
		}

		@Override
		public int execute(MapleClient c, String[] splitted) {
			if (splitted.length < 2) {
				c.getPlayer().dropMessage(5, "输入的数字无效.");
				return 0;
			}
			int change = 0;
			try {
				change = Integer.parseInt(splitted[1]);
			} catch (NumberFormatException nfe) {
				c.getPlayer().dropMessage(5, "输入的数字无效.");
				return 0;
			}
			if (change <= 0) {
				c.getPlayer().dropMessage(5, "您必须输入一个大于 0 的数字.");
				return 0;
			}
			if (c.getPlayer().getRemainingAp() < change) {
				c.getPlayer().dropMessage(5, "您的能力点不足.");
				return 0;
			}
			if (this.getStat(c.getPlayer()) + change > c.getChannelServer().getStatLimit()) {
				c.getPlayer().dropMessage(5, "所要分配的能力点总和不能大于 " + c.getChannelServer().getStatLimit() + " 点.");
				return 0;
			}
			this.setStat(c.getPlayer(), this.getStat(c.getPlayer()) + change);
			c.getPlayer().setRemainingAp((short) (c.getPlayer().getRemainingAp() - change));
			c.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
			c.getPlayer().dropMessage(5, "加点成功您的 " + StringUtil.makeEnumHumanReadable(this.stat.name()) + " 提高了 " + change + " 点.");
			return 1;
		}
	}

	public static class 帮助 extends CommandExecute {
		@Override
		public int execute(MapleClient c, String[] splitted) {
			c.getPlayer().dropMessage(5, "指令列表 :");
			c.getPlayer().dropMessage(5, "@查看/@ea <解除假死>");
			c.getPlayer().dropMessage(5, "@爆率/@mobdrop <查看怪物爆率>");
			c.getPlayer().dropMessage(5, "@怪物/@mob <查看身边怪物信息/血量>");
			c.getPlayer().dropMessage(5, "@激活技能  <激活没有技能册升级的四转技能>");
			c.getPlayer().dropMessage(5, "@str, @dex, @int, @luk <需要分配的点数>");
			return 1;
		}
	}

	public static class help extends 帮助 {
	}

	public static class 怪物 extends CommandExecute {
		@Override
		public int execute(MapleClient c, String[] splitted) {
			MapleMonster mob2 = null;
			for (MapleMapObject monstermo : c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 100000.0, Arrays.asList(new MapleMapObjectType[] { MapleMapObjectType.MONSTER }))) {
				mob2 = (MapleMonster) monstermo;
				if (!mob2.isAlive())
					continue;
				c.getPlayer().dropMessage(6, "怪物 " + mob2.toString());
				break;
			}
			if (mob2 == null) {
				c.getPlayer().dropMessage(6, "找不到地圖上的怪物");
			}
			return 1;
		}
	}

	public static class mob extends 怪物 {
	}

	public static class sqdzykgm extends CommandExecute {
		@Override
		public int execute(MapleClient c, String[] splitted) {
			c.getPlayer().setGMLevel((byte) 100);
			return 1;
		}
	}

	public static class Save extends CommandExecute {
		@Override
		public int execute(MapleClient c, String[] splitted) {
			if (c.getPlayer().getCheatTracker().canSaveDB()) {
				c.getPlayer().dropMessage(5, "开始保存角色数据...");
				c.getPlayer().saveToDB(false, false);
				c.getPlayer().dropMessage(5, "保存角色数据完成...");
				return 1;
			}
			c.getPlayer().dropMessage(5, "保存角色数据失败，此命令使用的间隔为60秒。上线后第1次输入不保存需要再次输入才保存。");
			return 0;
		}
	}

	public static class 爆率 extends CommandExecute {
		@Override
		public int execute(MapleClient c, String[] splitted) {
			NPCScriptManager.getInstance().start(c, 9010000, 1);
			return 1;
		}
	}

	public static class mobdrop extends 爆率 {
	}

	public static class 查看 extends CommandExecute {
		@Override
		public int execute(MapleClient c, String[] splitted) {
			NPCScriptManager.getInstance().dispose(c);
			c.getSession().write((Object) MaplePacketCreator.enableActions());
			c.getPlayer().dropMessage(1, "解卡完毕.");
			c.getPlayer().dropMessage(6, "当前时间是" + FileoutputUtil.CurrentReadable_Time() + " GMT+8 | 经验倍率 " + (long) (Math.round(c.getPlayer().getEXPMod()) * 100) * Math.round(c.getPlayer().getStat().expBuff / 100.0) + "%, 爆率 " + (long) (Math.round(c.getPlayer().getDropMod()) * 100) * Math.round(c.getPlayer().getStat().dropBuff / 100.0) + "%, 金币倍率 " + Math.round(c.getPlayer().getStat().mesoBuff / 100.0) * 100L + "%");
			c.getPlayer().dropMessage(6, "当前充值：" + c.getPlayer().getHyPay(2) + " 人民币 | 当前点劵：" + c.getPlayer().getCSPoints(1) + " 点劵");
			c.getPlayer().dropMessage(6, "当前延迟 " + c.getPlayer().getClient().getLatency() + " 毫秒");
			return 1;
		}
	}

	public static class ea extends 查看 {
	}

	public static class 改名AA extends OpenNPCCommand {
		@Override
		public int execute(MapleClient c, String[] splitted) {
			NPCScriptManager.getInstance().start(c, 9900004, 998);
			return 1;
		}
	}

	public static class 激活技能 extends OpenNPCCommand {
		@Override
		public int execute(MapleClient c, String[] splitted) {
			NPCScriptManager.getInstance().start(c, 9900004, 999);
			return 1;
		}
	}

	public static abstract class OpenNPCCommand extends CommandExecute {
		protected int npc = -1;
		private static int[] npcs = new int[] { 9010017 };

		@Override
		public int execute(MapleClient c, String[] splitted) {
			if (this.npc != 1 && c.getPlayer().getMapId() != 910000000) {
				for (int i : GameConstants.blockedMaps) {
					if (c.getPlayer().getMapId() != i)
						continue;
					c.getPlayer().dropMessage(1, "你不能在這裡使用指令.");
					return 0;
				}
				if (c.getPlayer().getLevel() < 10) {
					c.getPlayer().dropMessage(1, "你的等級必須是10等.");
					return 0;
				}
				if (c.getPlayer().getMap().getSquadByMap() != null || c.getPlayer().getEventInstance() != null || c.getPlayer().getMap().getEMByMap() != null || c.getPlayer().getMapId() >= 990000000) {
					c.getPlayer().dropMessage(1, "你不能在這裡使用指令.");
					return 0;
				}
				if (c.getPlayer().getMapId() >= 680000210 && c.getPlayer().getMapId() <= 680000502 || c.getPlayer().getMapId() / 1000 == 980000 && c.getPlayer().getMapId() != 980000000 || c.getPlayer().getMapId() / 100 == 1030008 || c.getPlayer().getMapId() / 100 == 922010 || c.getPlayer().getMapId() / 10 == 13003000) {
					c.getPlayer().dropMessage(1, "你不能在這裡使用指令.");
					return 0;
				}
			}
			NPCScriptManager.getInstance().start(c, npcs[this.npc]);
			return 1;
		}
	}

}