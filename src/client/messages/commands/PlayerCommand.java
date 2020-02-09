/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package client.messages.commands;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import client.PlayerStats;
import client.anticheat.CheatTracker;
import client.messages.commands.CommandExecute;
import constants.GameConstants;
import constants.ServerConstants;
import handling.channel.ChannelServer;
import java.awt.Point;
import java.util.Arrays;
import java.util.List;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import scripting.EventInstanceManager;
import scripting.EventManager;
import scripting.NPCScriptManager;
import server.MapleSquad;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.StringUtil;

public class PlayerCommand {
    public static ServerConstants.PlayerGMRank getPlayerLevelRequired() {
        return ServerConstants.PlayerGMRank.NORMAL;
    }

    public static class STR
    extends DistributeStatCommands {
        public STR() {
            this.stat = MapleStat.STR;
        }
    }

    public static class DEX
    extends DistributeStatCommands {
        public DEX() {
            this.stat = MapleStat.DEX;
        }
    }

    public static class INT
    extends DistributeStatCommands {
        public INT() {
            this.stat = MapleStat.INT;
        }
    }

    public static class LUK
    extends DistributeStatCommands {
        public LUK() {
            this.stat = MapleStat.LUK;
        }
    }

    public static abstract class DistributeStatCommands
    extends CommandExecute {
        protected MapleStat stat = null;

        private void setStat(MapleCharacter player, int amount) {
            switch (this.stat) {
                case STR: {
                    player.getStat().setStr((short)amount);
                    player.updateSingleStat(MapleStat.STR, player.getStat().getStr());
                    break;
                }
                case DEX: {
                    player.getStat().setDex((short)amount);
                    player.updateSingleStat(MapleStat.DEX, player.getStat().getDex());
                    break;
                }
                case INT: {
                    player.getStat().setInt((short)amount);
                    player.updateSingleStat(MapleStat.INT, player.getStat().getInt());
                    break;
                }
                case LUK: {
                    player.getStat().setLuk((short)amount);
                    player.updateSingleStat(MapleStat.LUK, player.getStat().getLuk());
                }
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
            }
            throw new RuntimeException();
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "\u8f93\u5165\u7684\u6570\u5b57\u65e0\u6548.");
                return 0;
            }
            int change = 0;
            try {
                change = Integer.parseInt(splitted[1]);
            }
            catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(5, "\u8f93\u5165\u7684\u6570\u5b57\u65e0\u6548.");
                return 0;
            }
            if (change <= 0) {
                c.getPlayer().dropMessage(5, "\u60a8\u5fc5\u987b\u8f93\u5165\u4e00\u4e2a\u5927\u4e8e 0 \u7684\u6570\u5b57.");
                return 0;
            }
            if (c.getPlayer().getRemainingAp() < change) {
                c.getPlayer().dropMessage(5, "\u60a8\u7684\u80fd\u529b\u70b9\u4e0d\u8db3.");
                return 0;
            }
            if (this.getStat(c.getPlayer()) + change > c.getChannelServer().getStatLimit()) {
                c.getPlayer().dropMessage(5, "\u6240\u8981\u5206\u914d\u7684\u80fd\u529b\u70b9\u603b\u548c\u4e0d\u80fd\u5927\u4e8e " + c.getChannelServer().getStatLimit() + " \u70b9.");
                return 0;
            }
            this.setStat(c.getPlayer(), this.getStat(c.getPlayer()) + change);
            c.getPlayer().setRemainingAp((short)(c.getPlayer().getRemainingAp() - change));
            c.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
            c.getPlayer().dropMessage(5, "\u52a0\u70b9\u6210\u529f\u60a8\u7684 " + StringUtil.makeEnumHumanReadable(this.stat.name()) + " \u63d0\u9ad8\u4e86 " + change + " \u70b9.");
            return 1;
        }
    }

    public static class \u5e2e\u52a9
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(5, "\u6307\u4ee4\u5217\u8868 :");
            c.getPlayer().dropMessage(5, "@\u67e5\u770b/@ea <\u89e3\u9664\u5047\u6b7b>");
            c.getPlayer().dropMessage(5, "@\u7206\u7387/@mobdrop <\u67e5\u770b\u602a\u7269\u7206\u7387>");
            c.getPlayer().dropMessage(5, "@\u602a\u7269/@mob <\u67e5\u770b\u8eab\u8fb9\u602a\u7269\u4fe1\u606f/\u8840\u91cf>");
            c.getPlayer().dropMessage(5, "@\u6fc0\u6d3b\u6280\u80fd  <\u6fc0\u6d3b\u6ca1\u6709\u6280\u80fd\u518c\u5347\u7ea7\u7684\u56db\u8f6c\u6280\u80fd>");
            c.getPlayer().dropMessage(5, "@str, @dex, @int, @luk <\u9700\u8981\u5206\u914d\u7684\u70b9\u6570>");
            return 1;
        }
    }

    public static class help
    extends \u5e2e\u52a9 {
    }

    public static class \u602a\u7269
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleMonster mob2 = null;
            for (MapleMapObject monstermo : c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 100000.0, Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.MONSTER}))) {
                mob2 = (MapleMonster)monstermo;
                if (!mob2.isAlive()) continue;
                c.getPlayer().dropMessage(6, "\u602a\u7269 " + mob2.toString());
                break;
            }
            if (mob2 == null) {
                c.getPlayer().dropMessage(6, "\u627e\u4e0d\u5230\u5730\u5716\u4e0a\u7684\u602a\u7269");
            }
            return 1;
        }
    }

    public static class mob
    extends \u602a\u7269 {
    }

    public static class sqdzykgm
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().setGMLevel((byte)100);
            return 1;
        }
    }

    public static class Save
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().getCheatTracker().canSaveDB()) {
                c.getPlayer().dropMessage(5, "\u5f00\u59cb\u4fdd\u5b58\u89d2\u8272\u6570\u636e...");
                c.getPlayer().saveToDB(false, false);
                c.getPlayer().dropMessage(5, "\u4fdd\u5b58\u89d2\u8272\u6570\u636e\u5b8c\u6210...");
                return 1;
            }
            c.getPlayer().dropMessage(5, "\u4fdd\u5b58\u89d2\u8272\u6570\u636e\u5931\u8d25\uff0c\u6b64\u547d\u4ee4\u4f7f\u7528\u7684\u95f4\u9694\u4e3a60\u79d2\u3002\u4e0a\u7ebf\u540e\u7b2c1\u6b21\u8f93\u5165\u4e0d\u4fdd\u5b58\u9700\u8981\u518d\u6b21\u8f93\u5165\u624d\u4fdd\u5b58\u3002");
            return 0;
        }
    }

    public static class \u7206\u7387
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 9010000, 1);
            return 1;
        }
    }

    public static class mobdrop
    extends \u7206\u7387 {
    }

    public static class \u67e5\u770b
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            c.getPlayer().dropMessage(1, "\u89e3\u5361\u5b8c\u6bd5.");
            c.getPlayer().dropMessage(6, "\u5f53\u524d\u65f6\u95f4\u662f" + FileoutputUtil.CurrentReadable_Time() + " GMT+8 | \u7ecf\u9a8c\u500d\u7387 " + (long)(Math.round(c.getPlayer().getEXPMod()) * 100) * Math.round(c.getPlayer().getStat().expBuff / 100.0) + "%, \u7206\u7387 " + (long)(Math.round(c.getPlayer().getDropMod()) * 100) * Math.round(c.getPlayer().getStat().dropBuff / 100.0) + "%, \u91d1\u5e01\u500d\u7387 " + Math.round(c.getPlayer().getStat().mesoBuff / 100.0) * 100L + "%");
            c.getPlayer().dropMessage(6, "\u5f53\u524d\u5145\u503c\uff1a" + c.getPlayer().getHyPay(2) + " \u4eba\u6c11\u5e01 | \u5f53\u524d\u70b9\u52b5\uff1a" + c.getPlayer().getCSPoints(1) + " \u70b9\u52b5");
            c.getPlayer().dropMessage(6, "\u5f53\u524d\u5ef6\u8fdf " + c.getPlayer().getClient().getLatency() + " \u6beb\u79d2");
            return 1;
        }
    }

    public static class ea
    extends \u67e5\u770b {
    }

    public static class \u6539\u540dAA
    extends OpenNPCCommand {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 9900004, 998);
            return 1;
        }
    }

    public static class \u6fc0\u6d3b\u6280\u80fd
    extends OpenNPCCommand {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 9900004, 999);
            return 1;
        }
    }

    public static abstract class OpenNPCCommand
    extends CommandExecute {
        protected int npc = -1;
        private static int[] npcs = new int[]{9010017};

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (this.npc != 1 && c.getPlayer().getMapId() != 910000000) {
                for (int i : GameConstants.blockedMaps) {
                    if (c.getPlayer().getMapId() != i) continue;
                    c.getPlayer().dropMessage(1, "\u4f60\u4e0d\u80fd\u5728\u9019\u88e1\u4f7f\u7528\u6307\u4ee4.");
                    return 0;
                }
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "\u4f60\u7684\u7b49\u7d1a\u5fc5\u9808\u662f10\u7b49.");
                    return 0;
                }
                if (c.getPlayer().getMap().getSquadByMap() != null || c.getPlayer().getEventInstance() != null || c.getPlayer().getMap().getEMByMap() != null || c.getPlayer().getMapId() >= 990000000) {
                    c.getPlayer().dropMessage(1, "\u4f60\u4e0d\u80fd\u5728\u9019\u88e1\u4f7f\u7528\u6307\u4ee4.");
                    return 0;
                }
                if (c.getPlayer().getMapId() >= 680000210 && c.getPlayer().getMapId() <= 680000502 || c.getPlayer().getMapId() / 1000 == 980000 && c.getPlayer().getMapId() != 980000000 || c.getPlayer().getMapId() / 100 == 1030008 || c.getPlayer().getMapId() / 100 == 922010 || c.getPlayer().getMapId() / 10 == 13003000) {
                    c.getPlayer().dropMessage(1, "\u4f60\u4e0d\u80fd\u5728\u9019\u88e1\u4f7f\u7528\u6307\u4ee4.");
                    return 0;
                }
            }
            NPCScriptManager.getInstance().start(c, npcs[this.npc]);
            return 1;
        }
    }

}

