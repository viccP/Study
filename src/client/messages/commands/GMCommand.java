/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  com.mysql.jdbc.Connection
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package client.messages.commands;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

import com.mysql.jdbc.Connection;

import client.ISkill;
import client.MapleCharacter;
import client.MapleCharacterUtil;
import client.MapleClient;
import client.MapleStat;
import client.SkillFactory;
import client.inventory.Equip;
import client.inventory.IItem;
import client.inventory.ItemFlag;
import client.inventory.MapleInventoryIdentifier;
import client.inventory.MapleInventoryType;
import client.inventory.MapleRing;
import client.messages.CommandProcessorUtil;
import constants.GameConstants;
import constants.ServerConstants;
import database.DatabaseConnection;
import handling.RecvPacketOpcode;
import handling.SendPacketOpcode;
import handling.channel.ChannelServer;
import handling.world.CheaterData;
import handling.world.World;
import scripting.EventManager;
import scripting.PortalScriptManager;
import scripting.ReactorScriptManager;
import server.CashItemFactory;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MaplePortal;
import server.MapleShopFactory;
import server.ServerProperties;
import server.ShutdownServer;
import server.Timer;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleMonsterInformationProvider;
import server.life.MapleNPC;
import server.life.OverrideMonsterStats;
import server.maps.FakeCharacter;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.quest.MapleQuest;
import tools.ArrayMap;
import tools.HexTool;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.StringUtil;
import tools.data.output.MaplePacketLittleEndianWriter;

public class GMCommand {
    public static ServerConstants.PlayerGMRank getPlayerLevelRequired() {
        return ServerConstants.PlayerGMRank.GM;
    }

    public static class ClearInv
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            ArrayMap<Pair<Short, Short>, MapleInventoryType> eqs = new ArrayMap<Pair<Short, Short>, MapleInventoryType>();
            if (splitted[1].equals("\u5168\u90e8")) {
                for (MapleInventoryType type : MapleInventoryType.values()) {
                    for (IItem item : c.getPlayer().getInventory(type)) {
                        eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), type);
                    }
                }
            } else if (splitted[1].equals("\u5df2\u88dd\u5099\u9053\u5177")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.EQUIPPED)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.EQUIPPED);
                }
            } else if (splitted[1].equals("\u6b66\u5668")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.EQUIP)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.EQUIP);
                }
            } else if (splitted[1].equals("\u6d88\u8017")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.USE)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.USE);
                }
            } else if (splitted[1].equals("\u88dd\u98fe")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.SETUP)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.SETUP);
                }
            } else if (splitted[1].equals("\u5176\u4ed6")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.ETC)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.ETC);
                }
            } else if (splitted[1].equals("\u7279\u6b8a")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.CASH)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.CASH);
                }
            } else {
                c.getPlayer().dropMessage(6, "[\u5168\u90e8/\u5df2\u88dd\u5099\u9053\u5177/\u6b66\u5668/\u6d88\u8017/\u88dd\u98fe/\u5176\u4ed6/\u7279\u6b8a]");
            }
            for (Map.Entry eq : eqs.entrySet()) {
                MapleInventoryManipulator.removeFromSlot(c, (MapleInventoryType)((Object)eq.getValue()), (Short)((Pair)eq.getKey()).left, (Short)((Pair)eq.getKey()).right, false, false);
            }
            return 1;
        }
    }

    public static class \u6c38\u4e45NPC
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 1) {
                c.getPlayer().dropMessage(6, "!pnpc [npcid]");
                return 0;
            }
            int npcId = Integer.parseInt(splitted[1]);
            MapleNPC npc = MapleLifeFactory.getNPC(npcId);
            if (npc != null && !npc.getName().equals("MISSINGNO")) {
                int xpos = c.getPlayer().getPosition().x;
                int ypos = c.getPlayer().getPosition().y;
                int fh = c.getPlayer().getMap().getFootholds().findBelow(c.getPlayer().getPosition()).getId();
                npc.setPosition(c.getPlayer().getPosition());
                npc.setCy(ypos);
                npc.setRx0(xpos);
                npc.setRx1(xpos);
                npc.setFh(fh);
                npc.setCustom(true);
                try {
                    Connection con = (Connection)DatabaseConnection.getConnection();
                    try (PreparedStatement ps = con.prepareStatement("INSERT INTO spawns (idd, f, hide, fh, cy, rx0, rx1, type, x, y, mid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");){
                        ps.setInt(1, npcId);
                        ps.setInt(2, 0);
                        ps.setInt(3, 0);
                        ps.setInt(4, fh);
                        ps.setInt(5, ypos);
                        ps.setInt(6, xpos);
                        ps.setInt(7, xpos);
                        ps.setString(8, "n");
                        ps.setInt(9, xpos);
                        ps.setInt(10, ypos);
                        ps.setInt(11, c.getPlayer().getMapId());
                        ps.executeUpdate();
                    }
                }
                catch (SQLException e) {
                    c.getPlayer().dropMessage(6, "Failed to save NPC to the database");
                }
            } else {
                c.getPlayer().dropMessage(6, "You have entered an invalid Npc-Id");
                return 0;
            }
            c.getPlayer().getMap().addMapObject(npc);
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.spawnNPC(npc, true));
            c.getPlayer().dropMessage(6, "Please do not reload this map or else the NPC will disappear till the next restart.");
            return 1;
        }
    }

    public static class \u4e34\u65f6NPC
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            int npcId = Integer.parseInt(splitted[1]);
            MapleNPC npc = MapleLifeFactory.getNPC(npcId);
            if (npc == null || npc.getName().equals("MISSINGNO")) {
                c.getPlayer().dropMessage(6, "You have entered an invalid NPC ID");
                return 0;
            }
            npc.setPosition(c.getPlayer().getPosition());
            npc.setCy(c.getPlayer().getPosition().y);
            npc.setRx0(c.getPlayer().getPosition().x + 50);
            npc.setRx1(c.getPlayer().getPosition().x - 50);
            npc.setFh(c.getPlayer().getMap().getFootholds().findBelow(c.getPlayer().getPosition()).getId());
            npc.setCustom(true);
            c.getPlayer().getMap().addMapObject(npc);
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.spawnNPC(npc, true));
            return 1;
        }
    }

    public static class \u516c\u544a
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            String note = splitted[1];
            int item = Integer.parseInt(splitted[2]);
            for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                    if (item > 0) {
                        mch.startMapEffect(note, item);
                    }
                    mch.dropMessage(note);
                    mch.dropMessage(-1, note);
                }
            }
            return 1;
        }
    }

    public static class \u5f00\u542f\u6d3b\u52a8\u526f\u672c
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "\u7528\u6cd5: !\u5f00\u542f\u6d3b\u52a8\u526f\u672c <\u526f\u672c\u9891\u9053> <\u7c7b\u578b1-6>");
                return 0;
            }
            int channel = Integer.parseInt(splitted[1]);
            int lx = Integer.parseInt(splitted[2]);
            EventManager em = c.getChannelServer().getEventSM().getEventManager("AutomatedEvent");
            if (em != null) {
                em.scheduleRandomEventInChannel(c.getPlayer(), channel, lx);
            }
            return 1;
        }
    }

    public static class \u5305
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            int packetheader = Integer.parseInt(splitted[1]);
            String packet_in = splitted[2];
            if (splitted.length > 2) {
                packet_in = StringUtil.joinStringFrom(splitted, 2);
            }
            mplew.writeShort(packetheader);
            mplew.write(HexTool.getByteArrayFromHexString(packet_in));
            c.getSession().write((Object)mplew.getPacket());
            c.getPlayer().dropMessage(packetheader + "\u5df2\u4f20\u9001\u5c01\u5305[" + mplew.getPacket().getBytes().length + "] : " + mplew.toString());
            return 1;
        }
    }

    public static class \u5305\u5934
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            int packetheader = Integer.parseInt(splitted[1]);
            String packet_in = " 00 00 00 00 00 00 00 00 00 ";
            if (splitted.length > 2) {
                packet_in = StringUtil.joinStringFrom(splitted, 2);
            }
            mplew.writeShort(packetheader);
            mplew.write(HexTool.getByteArrayFromHexString(packet_in));
            mplew.writeZeroBytes(20);
            c.getSession().write((Object)mplew.getPacket());
            c.getPlayer().dropMessage(packetheader + "\u5df2\u4f20\u9001\u5c01\u5305[" + mplew.getPacket().getBytes().length + "] : " + mplew.toString());
            return 1;
        }
    }

    public static class \u91cd\u8f7d\u8dd1\u5546
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().resetGamePointsPS();
            return 1;
        }
    }

    public static class DisposeClones
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(6, c.getPlayer().getCloneSize() + " clones disposed.");
            c.getPlayer().disposeClones();
            return 1;
        }
    }

    public static class CloneMe
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().cloneLook();
            return 1;
        }
    }

    public static class Marry
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(6, "\u6307\u4ee4\u898f\u5247 <name> <itemid>");
                return 0;
            }
            int itemId = Integer.parseInt(splitted[2]);
            if (!GameConstants.isEffectRing(itemId)) {
                c.getPlayer().dropMessage(6, "\u932f\u8aa4\u7684\u7269\u54c1ID.");
            } else {
                MapleCharacter fff = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
                if (fff == null) {
                    c.getPlayer().dropMessage(6, "\u73a9\u5bb6\u5fc5\u9808\u4e0a\u7dda");
                } else {
                    int[] ringID = new int[]{MapleInventoryIdentifier.getInstance(), MapleInventoryIdentifier.getInstance()};
                    try {
                        MapleCharacter[] chrz = new MapleCharacter[]{fff, c.getPlayer()};
                        for (int i = 0; i < chrz.length; ++i) {
                            Equip eq = (Equip)MapleItemInformationProvider.getInstance().getEquipById(itemId);
                            if (eq == null) {
                                c.getPlayer().dropMessage(6, "\u932f\u8aa4\u7684\u7269\u54c1ID.");
                                return 0;
                            }
                            eq.setUniqueId(ringID[i]);
                            MapleInventoryManipulator.addbyItem(chrz[i].getClient(), eq.copy());
                            chrz[i].dropMessage(6, "\u6210\u529f\u8207  " + chrz[i == 0 ? 1 : 0].getName() + " \u7d50\u5a5a");
                        }
                        MapleRing.addToDB(itemId, c.getPlayer(), fff.getName(), fff.getId(), ringID);
                    }
                    catch (SQLException e) {
                        e.printStackTrace();
                    }
                }
            }
            return 1;
        }
    }

    public static class ItemCheck
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3 || splitted[1] == null || splitted[1].equals("") || splitted[2] == null || splitted[2].equals("")) {
                c.getPlayer().dropMessage(6, "!itemcheck <playername> <itemid>");
                return 0;
            }
            int item = Integer.parseInt(splitted[2]);
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            int itemamount = chr.getItemQuantity(item, true);
            if (itemamount > 0) {
                c.getPlayer().dropMessage(6, chr.getName() + " has " + itemamount + " (" + item + ").");
            } else {
                c.getPlayer().dropMessage(6, chr.getName() + " doesn't have (" + item + ")");
            }
            return 1;
        }
    }

    public static class \u65f6\u95f4\u8c03\u8bd5
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            int year = Calendar.getInstance().get(1);
            int month = Calendar.getInstance().get(2) + 1;
            int date = Calendar.getInstance().get(5);
            int hour = Calendar.getInstance().get(11);
            int minute = Calendar.getInstance().get(12);
            int second = Calendar.getInstance().get(13);
            c.getPlayer().dropMessage(6, year + ":\u5e74 " + month + ":\u6708 " + date + ":\u65e5 " + hour + ":\u5c0f\u65f6 " + minute + ":\u5206\u949f " + second + ":\u6beb\u79d2");
            System.out.println(year + ":\u5e74 " + month + ":\u6708 " + date + ":\u65e5 " + hour + ":\u5c0f\u65f6 " + minute + ":\u5206\u949f " + second + ":\u6beb\u79d2");
            return 1;
        }
    }

    public static class \u514b\u9686\u6d4b\u8bd5
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "\u6700\u597d\u522b\u4e71\u641e\uff01.");
                return 0;
            }
            int \u7c7b\u578b = Integer.parseInt(splitted[1]);
            if (c.getPlayer().getFakeChars().size() > 1) {
                c.getPlayer().dropMessage("\u5143\u795e\u6570\u91cf\u6700\u5927\u4e3a1\u4e2a.");
            } else {
                for (int i = 0; i < 1 && i + c.getPlayer().getFakeChars().size() < 1; ++i) {
                    FakeCharacter fc = new FakeCharacter(c.getPlayer(), c.getPlayer().getId() + c.getPlayer().getFakeChars().size() + 1 + i, \u7c7b\u578b);
                    new FakeCharacter(c.getPlayer(), c.getPlayer().getId(), \u7c7b\u578b);
                    c.getPlayer().getFakeChars().add(fc);
                    c.getChannelServer().addClone(fc);
                }
                c.getPlayer().dropMessage("\u4f60\u7684\u5143\u795e\u6570\u91cf " + c.getPlayer().getFakeChars().size() + "\u4e2a\u5206\u8eab.");
            }
            return 1;
        }
    }

    public static class \u5220\u9664\u514b\u9686
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            for (FakeCharacter fc : c.getPlayer().getFakeChars()) {
                if (fc.getFakeChar().getMap() != c.getPlayer().getMap()) continue;
                c.getChannelServer().getAllClones().remove(fc);
                c.getPlayer().getMap().removePlayer(fc.getFakeChar());
            }
            c.getPlayer().getFakeChars().clear();
            c.getPlayer().dropMessage("\u4f60\u5df2\u7ecf\u5220\u9664\u4e86\u9b54\u5ba0.");
            return 1;
        }
    }

    public static class \u5c01\u5305\u8c03\u8bd5
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.StartWindow();
            return 1;
        }
    }

    public static class GetSkill
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            ISkill skill = SkillFactory.getSkill(Integer.parseInt(splitted[1]));
            byte level = (byte)CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            byte masterlevel = (byte)CommandProcessorUtil.getOptionalIntArg(splitted, 3, 1);
            if (level > skill.getMaxLevel()) {
                level = skill.getMaxLevel();
            }
            if (masterlevel > skill.getMaxLevel()) {
                masterlevel = skill.getMaxLevel();
            }
            c.getPlayer().changeSkillLevel(skill, level, masterlevel);
            return 1;
        }
    }

    public static class Shutdown
    extends CommandExecute {
        protected static Thread t = null;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().dropMessage(6, "\u6e38\u620f\u5373\u5c06\u5173\u95ed...");
            if (t == null || !t.isAlive()) {
                t = new Thread(ShutdownServer.getInstance());
                ShutdownServer.getInstance().shutdown();
                t.start();
            } else {
                c.getPlayer().dropMessage(6, "\u5df2\u7ecf\u4f7f\u7528\u8fc7\u4e00\u6b21\u8fd9\u4e2a\u547d\u4ee4\uff0c\u6682\u65f6\u65e0\u6cd5\u4f7f\u7528.");
            }
            return 1;
        }
    }

    public static class ShutdownTime
    extends Shutdown {
        private static ScheduledFuture<?> ts = null;
        private int minutesLeft = 0;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            this.minutesLeft = Integer.parseInt(splitted[1]);
            c.getPlayer().dropMessage(6, "\u6e38\u620f\u5c06\u5728 " + this.minutesLeft + " \u5206\u949f\u4e4b\u540e\u5173\u95ed...");
            if (!(ts != null || t != null && t.isAlive())) {
                t = new Thread(ShutdownServer.getInstance());
                ts = Timer.EventTimer.getInstance().register(new Runnable(){

                    @Override
                    public void run() {
                        if (ShutdownTime.this.minutesLeft == 0) {
                            ShutdownServer.getInstance().shutdown();
                            Shutdown.t.start();
                            ts.cancel(false);
                            return;
                        }
                        World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, " \u6e38\u620f\u5c06\u4e8e " + ShutdownTime.this.minutesLeft + " \u5206\u949f\u4e4b\u540e\u5173\u95ed\u7ef4\u62a4.\u8bf7\u73a9\u5bb6\u5b89\u5168\u4e0b\u7ebf."));
                        ShutdownTime.this.minutesLeft--;
                    }
                }, 60000L);
            } else {
                c.getPlayer().dropMessage(6, "\u5df2\u7ecf\u4f7f\u7528\u8fc7\u4e00\u6b21\u8fd9\u4e2a\u547d\u4ee4\uff0c\u6682\u65f6\u65e0\u6cd5\u4f7f\u7528.");
            }
            return 1;
        }

    }

    public static class \u91cd\u542f\u670d\u52a1\u7aef
    extends ShutdownTime {
    }

    public static class \u91cd\u8f7d\u7206\u7387
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleMonsterInformationProvider.getInstance().clearDrops();
            ReactorScriptManager.getInstance().clearDrops();
            c.getPlayer().dropMessage(5, "\u91cd\u65b0\u52a0\u8f7d\u7206\u7387\u5b8c\u6210.");
            return 1;
        }
    }

    public static class \u91cd\u8f7d\u4f20\u9001
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            PortalScriptManager.getInstance().clearScripts();
            c.getPlayer().dropMessage(5, "\u91cd\u65b0\u52a0\u8f7d\u4f20\u9001\u70b9\u811a\u672c\u5b8c\u6210.");
            return 1;
        }
    }

    public static class \u91cd\u8f7d\u5546\u5e97
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleShopFactory.getInstance().clear();
            c.getPlayer().dropMessage(5, "\u91cd\u65b0\u52a0\u8f7d\u5546\u5e97\u8d29\u5356\u9053\u5177\u5b8c\u6210.");
            return 1;
        }
    }

    public static class \u91cd\u8f7d\u526f\u672c
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            for (ChannelServer instance : ChannelServer.getAllInstances()) {
                instance.reloadEvents();
            }
            c.getPlayer().dropMessage(5, "\u91cd\u65b0\u52a0\u8f7d\u6d3b\u52a8\u811a\u672c\u5b8c\u6210.");
            return 1;
        }
    }

    public static class \u91cd\u8f7d\u5305\u5934
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            SendPacketOpcode.reloadValues();
            RecvPacketOpcode.reloadValues();
            c.getPlayer().dropMessage(5, "\u91cd\u65b0\u83b7\u53d6\u5305\u5934\u5b8c\u6210.");
            return 1;
        }
    }

    public static class \u91cd\u8f7d\u5546\u57ce
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            CashItemFactory.getInstance().clearCashShop();
            c.getPlayer().dropMessage(5, "\u91cd\u65b0\u52a0\u8f7d\u5546\u57ce\u5b8c\u6210.");
            return 1;
        }
    }

    public static class \u91cd\u8f7d\u4efb\u52a1
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleQuest.clearQuests();
            c.getPlayer().dropMessage(5, "\u91cd\u65b0\u52a0\u8f7d\u4efb\u52a1\u811a\u672c\u5b8c\u6210.");
            return 1;
        }
    }

    public static class \u5237\u70b9\u5377
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "\u8bf7\u8f93\u5165\u6570\u91cf.");
                return 0;
            }
            c.getPlayer().modifyCSPoints(1, Integer.parseInt(splitted[1]), true);
            return 1;
        }
    }

    public static class \u5237\u62b5\u7528\u5377
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "\u8bf7\u8f93\u5165\u6570\u91cf.");
                return 0;
            }
            c.getPlayer().modifyCSPoints(2, Integer.parseInt(splitted[1]), true);
            return 1;
        }
    }

    public static class CnGM
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            World.Broadcast.broadcastGMMessage(MaplePacketCreator.serverNotice(5, "<GM\u804a\u5929\u8996\u7a97>\u983b\u9053" + c.getPlayer().getClient().getChannel() + " [" + c.getPlayer().getName() + "] : " + StringUtil.joinStringFrom(splitted, 1)).getBytes());
            return 1;
        }
    }

    public static class Warpid
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterById(Integer.parseInt(splitted[1]));
            if (victim != null) {
                if (splitted.length == 2) {
                    c.getPlayer().changeMap(victim.getMap(), victim.getMap().findClosestSpawnpoint(victim.getPosition()));
                } else {
                    MapleMap target = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(Integer.parseInt(splitted[2]));
                    victim.changeMap(target, target.getPortal(0));
                }
            } else {
                try {
                    victim = c.getPlayer();
                    int ch = World.Find.findChannel(Integer.parseInt(splitted[1]));
                    if (ch < 0) {
                        MapleMap target = c.getChannelServer().getMapFactory().getMap(Integer.parseInt(splitted[1]));
                        c.getPlayer().changeMap(target, target.getPortal(0));
                    } else {
                        victim = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterByName(splitted[1]);
                        c.getPlayer().dropMessage(6, "Cross changing channel. Please wait.");
                        if (victim.getMapId() != c.getPlayer().getMapId()) {
                            MapleMap mapp = c.getChannelServer().getMapFactory().getMap(victim.getMapId());
                            c.getPlayer().changeMap(mapp, mapp.getPortal(0));
                        }
                        c.getPlayer().changeChannel(ch);
                    }
                }
                catch (Exception e) {
                    c.getPlayer().dropMessage(6, "Something went wrong " + e.getMessage());
                    return 0;
                }
            }
            return 1;
        }
    }

    public static class Warp
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim != null) {
                if (splitted.length == 2) {
                    c.getPlayer().changeMap(victim.getMap(), victim.getMap().findClosestSpawnpoint(victim.getPosition()));
                } else {
                    MapleMap target = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(Integer.parseInt(splitted[2]));
                    victim.changeMap(target, target.getPortal(0));
                }
            } else {
                try {
                    victim = c.getPlayer();
                    int ch = World.Find.findChannel(splitted[1]);
                    if (ch < 0) {
                        MapleMap target = c.getChannelServer().getMapFactory().getMap(Integer.parseInt(splitted[1]));
                        c.getPlayer().changeMap(target, target.getPortal(0));
                    } else {
                        victim = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterByName(splitted[1]);
                        c.getPlayer().dropMessage(6, "Cross changing channel. Please wait.");
                        if (victim.getMapId() != c.getPlayer().getMapId()) {
                            MapleMap mapp = c.getChannelServer().getMapFactory().getMap(victim.getMapId());
                            c.getPlayer().changeMap(mapp, mapp.getPortal(0));
                        }
                        c.getPlayer().changeChannel(ch);
                    }
                }
                catch (Exception e) {
                    c.getPlayer().dropMessage(6, "Something went wrong " + e.getMessage());
                    return 0;
                }
            }
            return 1;
        }
    }

    public static class onlines
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int p = 0;
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                    if (chr == null || c.getPlayer().getGMLevel() < chr.getGMLevel()) continue;
                    StringBuilder ret = new StringBuilder();
                    ret.append(" \u9891\u9053: ");
                    ret.append(chr.getClient().getChannel());
                    ret.append(" \u89d2\u8272\u540d\u5b57 ");
                    ret.append(StringUtil.getRightPaddedStr(chr.getName(), ' ', 13));
                    ret.append(" ID: ");
                    ret.append(chr.getId());
                    ret.append(" \u7b49\u7ea7: ");
                    ret.append(StringUtil.getRightPaddedStr(String.valueOf(chr.getLevel()), ' ', 3));
                    ret.append(" \u804c\u4e1a: ");
                    ret.append(chr.getJob());
                    if (chr.getMap() != null) {
                        ret.append(" \u5730\u56fe: ");
                        ret.append(chr.getMapId() + " - " + chr.getMap().getMapName().toString());
                        c.getPlayer().dropMessage(6, ret.toString());
                    }
                    ++p;
                }
            }
            c.getPlayer().dropMessage(6, "\u5f53\u524d\u670d\u52a1\u5668\u603b\u4eba\u6570: " + p);
            c.getPlayer().dropMessage(6, "-------------------------------------------------------------------------------------");
            return 1;
        }
    }

    public static class \u603b\u5728\u7ebf\u4eba\u6570
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            Map<Integer, Integer> connected = World.getConnected();
            StringBuilder conStr = new StringBuilder("\u8fde\u63a5\u6570\u91cf: ");
            boolean first = true;
            for (int i : connected.keySet()) {
                if (!first) {
                    conStr.append(", ");
                } else {
                    first = false;
                }
                if (i == 0) {
                    conStr.append("\u603b\u8ba1: ");
                    conStr.append(connected.get(i));
                    continue;
                }
                conStr.append("\u9891\u9053 ");
                conStr.append(i);
                conStr.append(": ");
                conStr.append(connected.get(i));
            }
            c.getPlayer().dropMessage(conStr.toString());
            return 1;
        }
    }

    public static class Spawn
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleMonster onemob;
            int mid = Integer.parseInt(splitted[1]);
            int num = Math.min(CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1), 500);
            Long hp = CommandProcessorUtil.getNamedLongArg(splitted, 1, "hp");
            Integer exp = CommandProcessorUtil.getNamedIntArg(splitted, 1, "exp");
            Double php = CommandProcessorUtil.getNamedDoubleArg(splitted, 1, "php");
            Double pexp = CommandProcessorUtil.getNamedDoubleArg(splitted, 1, "pexp");
            try {
                onemob = MapleLifeFactory.getMonster(mid);
            }
            catch (RuntimeException e) {
                c.getPlayer().dropMessage(5, "\u9519\u8bef: " + e.getMessage());
                return 0;
            }
            if (onemob == null) {
                c.getPlayer().dropMessage(5, "\u8f93\u5165\u7684\u602a\u7269\u4e0d\u5b58\u5728.");
                return 0;
            }
            long newhp = 0L;
            int newexp = 0;
            newhp = hp != null ? hp : (php != null ? (long)((double)onemob.getMobMaxHp() * (php / 100.0)) : onemob.getMobMaxHp());
            newexp = exp != null ? exp : (pexp != null ? (int)((double)onemob.getMobExp() * (pexp / 100.0)) : onemob.getMobExp());
            if (newhp < 1L) {
                newhp = 1L;
            }
            OverrideMonsterStats overrideStats = new OverrideMonsterStats(newhp, onemob.getMobMaxMp(), newexp, false);
            for (int i = 0; i < num; ++i) {
                MapleMonster mob2 = MapleLifeFactory.getMonster(mid);
                mob2.setHp(newhp);
                mob2.setOverrideStats(overrideStats);
                c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob2, c.getPlayer().getPosition());
            }
            return 1;
        }
    }

    public static class online1
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().dropMessage(6, "\u4e0a\u7ebf\u7684\u89d2\u8272 \u9891\u9053-" + c.getChannel() + ":");
            c.getPlayer().dropMessage(6, c.getChannelServer().getPlayerStorage().getOnlinePlayers(true));
            return 1;
        }
    }

    public static class spy
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "\u4f7f\u7528\u898f\u5247: !spy <\u73a9\u5bb6\u540d\u5b57>");
            } else {
                MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
                if (victim.getGMLevel() > 3) {
                    c.getPlayer().dropMessage(5, "\u4f60\u4e0d\u80fd\u67e5\u770b\u6bd4\u4f60\u9ad8\u6b0a\u9650\u7684\u4eba!");
                    return 0;
                }
                if (victim != null) {
                    c.getPlayer().dropMessage(5, "\u6b64\u73a9\u5bb6\u72c0\u614b:");
                    c.getPlayer().dropMessage(5, "\u7b49\u7d1a: " + victim.getLevel() + "\u804c\u4e1a: " + victim.getJob() + "\u4eba\u6c14: " + victim.getFame());
                    c.getPlayer().dropMessage(5, "\u5730\u5716: " + victim.getMapId() + " - " + victim.getMap().getMapName().toString());
                    c.getPlayer().dropMessage(5, "\u529b\u91cf: " + victim.getStat().getStr() + "  ||  \u654f\u6377: " + victim.getStat().getDex() + "  ||  \u667a\u529b: " + victim.getStat().getInt() + "  ||  \u8fd0\u6c14: " + victim.getStat().getLuk());
                    c.getPlayer().dropMessage(5, "\u62e5\u6709 " + victim.getMeso() + " \u5192\u9669\u5e01.");
                } else {
                    c.getPlayer().dropMessage(5, "\u627e\u4e0d\u5230\u6b64\u73a9\u5bb6.");
                }
            }
            return 1;
        }
    }

    public static class Level
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().setLevel(Short.parseShort(splitted[1]));
            c.getPlayer().levelUp();
            if (c.getPlayer().getExp() < 0) {
                c.getPlayer().gainExp(-c.getPlayer().getExp(), false, false, true);
            }
            return 1;
        }
    }

    public static class Drop
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int itemId = Integer.parseInt(splitted[1]);
            short quantity = (short)CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            if (!c.getPlayer().isAdmin()) {
                for (int i : GameConstants.itemBlock) {
                    if (itemId != i) continue;
                    c.getPlayer().dropMessage(5, "Sorry but this item is blocked for your GM level.");
                    return 0;
                }
                return 0;
            }
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (GameConstants.isPet(itemId)) {
                c.getPlayer().dropMessage(5, "Please purchase a pet from the cash shop instead.");
            } else if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " \u70ba\u7121\u6548\u7684\u7269\u54c1");
            } else {
                client.inventory.Item item;
                int flag = 0;
                flag = (byte)(flag | ItemFlag.LOCK.getValue());
                if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    item = ii.randomizeStats((Equip)ii.getEquipById(itemId));
                } else {
                    item = new client.inventory.Item(itemId, (short)0, quantity, (byte)0);
                    if (GameConstants.getInventoryType(itemId) != MapleInventoryType.USE) {
                        // empty if block
                    }
                }
                if (item.getType() != MapleInventoryType.USE.getType()) {
                    // empty if block
                }
                item.setGMLog(c.getPlayer().getName());
                c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), item, c.getPlayer().getPosition(), true, true);
            }
            return 1;
        }
    }

    public static class Item
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int itemId = Integer.parseInt(splitted[1]);
            short quantity = (short)CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            if (!c.getPlayer().isAdmin()) {
                for (int i : GameConstants.itemBlock) {
                    if (itemId != i) continue;
                    c.getPlayer().dropMessage(5, "Sorry but this item is blocked for your GM level.");
                    return 0;
                }
                return 0;
            }
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (GameConstants.isPet(itemId)) {
                c.getPlayer().dropMessage(5, "Please purchase a pet from the cash shop instead.");
            } else if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " \u70ba\u7121\u6548\u7684\u7269\u54c1");
            } else {
                client.inventory.Item item;
                int flag = 0;
                flag = (byte)(flag | ItemFlag.LOCK.getValue());
                if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    item = ii.randomizeStats((Equip)ii.getEquipById(itemId));
                } else {
                    item = new client.inventory.Item(itemId, (short)0, quantity, (byte)0);
                    if (GameConstants.getInventoryType(itemId) != MapleInventoryType.USE) {
                        // empty if block
                    }
                }
                if (item.getType() != MapleInventoryType.USE.getType()) {
                    // empty if block
                }
                item.setGMLog(c.getPlayer().getName());
                MapleInventoryManipulator.addbyItem(c, item);
            }
            return 1;
        }
    }

    public static class GainMeso
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().gainMeso(Integer.MAX_VALUE - c.getPlayer().getMeso(), true);
            return 1;
        }
    }

    public static class Job
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().changeJob(Integer.parseInt(splitted[1]));
            return 1;
        }
    }

    public static class \u6ee1\u6280\u80fd
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().maxAllSkills();
            return 1;
        }
    }

    public static class \u91cd\u7f6e\u602a\u7269
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().getMap().killAllMonsters(false);
            return 1;
        }
    }

    public static class \u96c7\u4f63\u5b58\u6863
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int p = 0;
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                try {
                    Thread.sleep(2000L);
                }
                catch (InterruptedException ex) {
                    System.out.println("\u7ebf\u7a0b\u9501\u5f00\u542f\u5931\u8d25\uff1a" + ex);
                }
                cserv.closeAllMerchants();
                ++p;
            }
            c.getPlayer().dropMessage(5, "[\u4fdd\u5b58\u96c7\u4f63\u5546\u4eba\u7cfb\u7edf] \u96c7\u4f63\u5546\u4eba\u4fdd\u5b58" + p + "\u4e2a\u9891\u9053\u6210\u529f\u3002");
            return 1;
        }
    }

    public static class \u5168\u90e8\u5b58\u6863
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int p = 0;
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                    chr.saveToDB(true, true);
                    ++p;
                }
            }
            c.getPlayer().dropMessage(5, "[\u5168\u90e8\u5b58\u6863] \u4fdd\u5b58" + p + "\u4e2a\u73a9\u5bb6\u6210\u529f\u3002");
            return 1;
        }
    }

    public static class \u8c01\u5728\u8fd9\u4e2a\u5730\u56fe
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            StringBuilder builder = new StringBuilder("\u5f53\u524d\u5730\u56fe\u73a9\u5bb6: ").append(c.getPlayer().getMap().getCharactersThreadsafe().size()).append(" \u4eba. ");
            for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                if (builder.length() > 150) {
                    builder.setLength(builder.length() - 2);
                    c.getPlayer().dropMessage(6, builder.toString());
                    builder = new StringBuilder();
                }
                builder.append(MapleCharacterUtil.makeMapleReadable(chr.getName()));
                builder.append(", ");
            }
            builder.setLength(builder.length() - 2);
            c.getPlayer().dropMessage(6, builder.toString());
            return 1;
        }
    }

    public static class \u627e\u73a9\u5bb6\u4f4d\u7f6e
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim == null) {
                c.getPlayer().dropMessage(5, "\u6ca1\u6709\u627e\u5230 " + splitted[1] + " \u73a9\u5bb6.");
                return 0;
            }
            victim.getMap().broadcastMessage(MaplePacketCreator.getChatText(victim.getId(), StringUtil.joinStringFrom(splitted, 2), victim.isGM(), 0));
            return 1;
        }
    }

    public static class \u68c0\u6d4b\u4f5c\u5f0a
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            List<CheaterData> cheaters = World.getCheaters();
            for (int x = cheaters.size() - 1; x >= 0; --x) {
                CheaterData cheater = cheaters.get(x);
                c.getPlayer().dropMessage(6, cheater.getInfo());
            }
            return 1;
        }
    }

    public static class \u68c0\u67e5\u73a9\u5bb6\u7269\u54c1\u4fe1\u606f
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 3 || splitted[1] == null || splitted[1].equals("") || splitted[2] == null || splitted[2].equals("")) {
                c.getPlayer().dropMessage(6, "\u7528\u6cd5: !\u68c0\u67e5\u73a9\u5bb6\u7269\u54c1\u4fe1\u606f <\u73a9\u5bb6\u540d\u5b57> <\u9053\u5177ID>");
                return 0;
            }
            int item = Integer.parseInt(splitted[2]);
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            int itemamount = chr.getItemQuantity(item, true);
            if (itemamount > 0) {
                c.getPlayer().dropMessage(6, chr.getName() + " \u62e5\u6709 " + itemamount + " (" + item + ").");
            } else {
                c.getPlayer().dropMessage(6, chr.getName() + " \u6ca1\u6709ID\u4e3a (" + item + ") \u7684\u9053\u5177.");
            }
            return 1;
        }
    }

    public static class \u5237\u65b0\u5730\u56fe
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleMap map;
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            boolean custMap = splitted.length >= 2;
            MapleCharacter player = c.getPlayer();
            int mapid = custMap ? Integer.parseInt(splitted[1]) : player.getMapId();
            MapleMap mapleMap = map = custMap ? player.getClient().getChannelServer().getMapFactory().getMap(mapid) : player.getMap();
            if (player.getClient().getChannelServer().getMapFactory().destroyMap(mapid)) {
                MapleMap newMap = player.getClient().getChannelServer().getMapFactory().getMap(mapid);
                MaplePortal newPor = newMap.getPortal(0);
                LinkedHashSet<MapleCharacter> mcs = new LinkedHashSet<MapleCharacter>(map.getCharacters());
                block2: for (MapleCharacter m : mcs) {
                    for (int x = 0; x < 5; ++x) {
                        try {
                            m.changeMap(newMap, newPor);
                            continue block2;
                        }
                        catch (Throwable t) {
                            continue;
                        }
                    }
                }
            }
            return 0;
        }
    }

    public static class \u62c9\u6240\u6709\u73a9\u5bb6
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            ChannelServer cserv = c.getChannelServer();
            for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                if (mch.getMapId() == c.getPlayer().getMapId()) continue;
                mch.changeMap(c.getPlayer().getMap(), c.getPlayer().getPosition());
            }
            return 0;
        }
    }

    public static class \u62c9\u73a9\u5bb6id
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            ChannelServer cserv = c.getChannelServer();
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterById(Integer.parseInt(splitted[1]));
            victim.changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().findClosestSpawnpoint(c.getPlayer().getPosition()));
            return 0;
        }
    }

    public static class \u62c9\u73a9\u5bb6
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            ChannelServer cserv = c.getChannelServer();
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            victim.changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().findClosestSpawnpoint(c.getPlayer().getPosition()));
            return 0;
        }
    }

    public static class \u89e3\u9664\u9690\u8eab
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().dispelSkill(9001004);
            return 0;
        }
    }

    public static class \u9690\u8eab\u6a21\u5f0f
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            SkillFactory.getSkill(9001004).getEffect(1).applyTo(c.getPlayer());
            c.getPlayer().dropMessage(6, "\u9690\u8eab\u6a21\u5f0f\u5df2\u5f00\u542f.");
            return 0;
        }
    }

    public static class \u5728\u7ebf
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().dropMessage(6, "\u9891\u9053\u5728\u7ebf " + c.getChannel() + ":");
            c.getPlayer().dropMessage(6, c.getChannelServer().getPlayerStorage().getOnlinePlayers(true));
            return 1;
        }
    }

    public static class \u9891\u9053\u5728\u7ebf
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().dropMessage(6, "\u9891\u9053\u5728\u7ebf: " + Integer.parseInt(splitted[1]) + ":");
            c.getPlayer().dropMessage(6, ChannelServer.getInstance(Integer.parseInt(splitted[1])).getPlayerStorage().getOnlinePlayers(true));
            return 1;
        }
    }

    public static class \u65ad\u5f00\u73a9\u5bb6\u8fde\u63a5
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[splitted.length - 1]);
            if (victim != null && c.getPlayer().getGMLevel() >= victim.getGMLevel()) {
                victim.getClient().getSession().close();
                victim.getClient().disconnect(true, false);
                c.getPlayer().dropMessage(6, "\u5df2\u7ecf\u6210\u529f\u65ad\u5f00 " + victim.getName() + " \u7684\u8fde\u63a5.");
                return 1;
            }
            c.getPlayer().dropMessage(6, "\u4f7f\u7528\u7684\u5bf9\u8c61\u4e0d\u5b58\u5728\u6216\u8005\u89d2\u8272\u540d\u5b57\u9519\u8bef\u6216\u8005\u5bf9\u653e\u7684GM\u6743\u9650\u6bd4\u4f60\u9ad8.");
            return 0;
        }
    }

    public static class \u6740\u6b7b\u73a9\u5bb6
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleCharacter player = c.getPlayer();
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "\u7528\u6cd5: !\u6740\u6b7b\u73a9\u5bb6 <list player names>");
                return 0;
            }
            MapleCharacter victim = null;
            for (int i = 1; i < splitted.length; ++i) {
                try {
                    victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[i]);
                }
                catch (Exception e) {
                    c.getPlayer().dropMessage(6, "\u6ca1\u6709\u627e\u5230\u540d\u5b57\u4e3a: " + splitted[i] + " \u7684\u73a9\u5bb6.");
                }
                if (!player.allowedToTarget(victim) || player.getGMLevel() < victim.getGMLevel()) continue;
                victim.getStat().setHp(0);
                victim.getStat().setMp(0);
                victim.updateSingleStat(MapleStat.HP, 0);
                victim.updateSingleStat(MapleStat.MP, 0);
            }
            return 1;
        }
    }

    public static class WarpMap
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            try {
                MapleMap target = c.getChannelServer().getMapFactory().getMap(Integer.parseInt(splitted[1]));
                if (target == null) {
                    c.getPlayer().dropMessage(6, "\u8f93\u5165\u7684\u5730\u56fe\u4e0d\u5b58\u5728.");
                    return 0;
                }
                MapleMap from = c.getPlayer().getMap();
                for (MapleCharacter chr : from.getCharactersThreadsafe()) {
                    chr.changeMap(target, target.getPortal(0));
                }
            }
            catch (Exception e) {
                c.getPlayer().dropMessage(5, "\u9519\u8bef: " + e.getMessage());
                return 0;
            }
            return 1;
        }
    }

    public static class KillAll
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleMap map = c.getPlayer().getMap();
            double range = Double.POSITIVE_INFINITY;
            if (splitted.length > 1) {
                int irange = Integer.parseInt(splitted[1]);
                if (splitted.length <= 2) {
                    range = irange * irange;
                } else {
                    map = c.getChannelServer().getMapFactory().getMap(Integer.parseInt(splitted[2]));
                }
            }
            if (map == null) {
                c.getPlayer().dropMessage(6, "\u8f93\u5165\u7684\u5730\u56fe\u4e0d\u5b58\u5728.");
                return 0;
            }
            for (MapleMapObject monstermo : map.getMapObjectsInRange(c.getPlayer().getPosition(), range, Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.MONSTER}))) {
                MapleMonster mob2 = (MapleMonster)monstermo;
                if (mob2.getStats().isBoss() && !c.getPlayer().isGM()) continue;
                map.killMonster(mob2, c.getPlayer(), false, false, (byte)1);
            }
            return 1;
        }
    }

    public static class \u67e5\u770b\u5f53\u524d\u5730\u56fe\u4fe1\u606f
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            c.getPlayer().dropMessage(6, "\u5f53\u524d\u5730\u56fe\u4fe1\u606f: ID " + c.getPlayer().getMapId() + " \u540d\u5b57 " + c.getPlayer().getMap().getMapName() + " \u5f53\u524d\u5750\u6807: X " + c.getPlayer().getPosition().x + " Y " + c.getPlayer().getPosition().y);
            return 1;
        }
    }

    public static class \u4eba\u6c14
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            MapleCharacter player = c.getPlayer();
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "\u7528\u6cd5: !\u4eba\u6c14 <\u73a9\u5bb6\u540d\u5b57> <\u8981\u52a0\u4eba\u6c14\u7684\u6570\u91cf>");
                return 0;
            }
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            int fame = 0;
            try {
                fame = Integer.parseInt(splitted[2]);
            }
            catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "\u8f93\u5165\u7684\u6570\u5b57\u65e0\u6548...");
                return 0;
            }
            if (victim != null && player.allowedToTarget(victim)) {
                victim.addFame(fame);
                victim.updateSingleStat(MapleStat.FAME, victim.getFame());
            }
            return 1;
        }
    }

    public static class \u5220\u9664\u9053\u5177
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(6, "\u9700\u8981\u8f93\u5165 <\u89d2\u8272\u540d\u5b57> <\u9053\u5177ID>");
                return 0;
            }
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (chr == null) {
                c.getPlayer().dropMessage(6, "\u8f93\u5165\u7684\u89d2\u8272\u4e0d\u5b58\u5728\u6216\u8005\u89d2\u8272\u4e0d\u5728\u7ebf\u6216\u8005\u4e0d\u5728\u8fd9\u4e2a\u9891\u9053.");
                return 0;
            }
            chr.removeAll(Integer.parseInt(splitted[2]), false, false);
            c.getPlayer().dropMessage(6, "\u5df2\u7ecf\u6210\u529f\u7684\u5c06ID\u4e3a: " + splitted[2] + " \u7684\u6240\u6709\u9053\u5177\u4ece\u89d2\u8272: " + splitted[1] + " \u7684\u80cc\u5305\u4e2d\u5220\u9664.");
            return 1;
        }
    }

    public static class DC
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter victim;
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int level = 0;
            if (splitted[1].charAt(0) == '-') {
                level = StringUtil.countCharacters(splitted[1], 'f');
                victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[2]);
            } else {
                victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            }
            if (level < 2 && victim != null) {
                victim.getClient().getSession().close();
                if (level >= 1) {
                    victim.getClient().disconnect(true, false);
                }
                return 1;
            }
            c.getPlayer().dropMessage(6, "Please use dc -f instead, or the victim does not exist.");
            return 0;
        }
    }

    public static class DCAll
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int range = -1;
            if (splitted[1].equals("m")) {
                range = 0;
            } else if (splitted[1].equals("c")) {
                range = 1;
            } else if (splitted[1].equals("w")) {
                range = 2;
            }
            if (range == -1) {
                range = 1;
            }
            if (range == 0) {
                c.getPlayer().getMap().disconnectAll();
                c.getPlayer().dropMessage(5, "\u5df2\u6210\u529f\u65ad\u5f00\u5f53\u524d\u5730\u56fe\u6240\u6709\u73a9\u5bb6\u7684\u8fde\u63a5.");
            } else if (range == 1) {
                c.getChannelServer().getPlayerStorage().disconnectAll(true);
                c.getPlayer().dropMessage(5, "\u5df2\u6210\u529f\u65ad\u5f00\u5f53\u524d\u9891\u9053\u6240\u6709\u73a9\u5bb6\u7684\u8fde\u63a5.");
            } else if (range == 2) {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.getPlayerStorage().disconnectAll(true);
                }
                c.getPlayer().dropMessage(5, "\u5df2\u6210\u529f\u65ad\u5f00\u5f53\u524d\u6e38\u620f\u6240\u6709\u73a9\u5bb6\u7684\u8fde\u63a5.");
            }
            return 1;
        }
    }

    public static class \u7ed9\u73a9\u5bb6\u7269\u54c1
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(6, "\u7528\u6cd5: !\u7ed9\u73a9\u5bb6\u7269\u54c1 [\u89d2\u8272\u540d\u5b57][\u7269\u54c1ID] [\u6570\u91cf]");
                return 0;
            }
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            String name = splitted[1];
            int item = Integer.parseInt(splitted[2]);
            int quantity = Integer.parseInt(splitted[3]);
            String mz = ii.getName(item);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    if (!mch.getName().equals(name)) continue;
                    MapleInventoryManipulator.addById(mch.getClient(), item, (short)quantity, (byte)0);
                    c.getPlayer().dropMessage(6, "\u7ed9\u4e88\u6210\u529f\uff01");
                }
            }
            return 1;
        }
    }

    public static class \u7ed9\u5f53\u524d\u5730\u56fe\u7269\u54c1
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "\u7528\u6cd5: !\u7ed9\u5f53\u524d\u5730\u56fe\u7269\u54c1 [\u7269\u54c1ID] [\u6570\u91cf]");
                return 0;
            }
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            int item = Integer.parseInt(splitted[1]);
            int quantity = Integer.parseInt(splitted[2]);
            String mz = ii.getName(item);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                    MapleInventoryManipulator.addById(mch.getClient(), item, (short)quantity, (byte)0);
                }
            }
            for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                    if (quantity <= 1) {
                        if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                        mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e\u3010" + mz + "\u3011\u7269\u54c1\u7ed9\u5f53\u524d\u5730\u56fe\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120000);
                        continue;
                    }
                    if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                    mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e\u3010" + mz + "\u3011\u7269\u54c1\u3010" + quantity + "\u3011\u4e2a\u7ed9\u5f53\u524d\u5730\u56fe\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120000);
                }
            }
            return 1;
        }
    }

    public static class \u7ed9\u5f53\u524d\u5730\u56fe\u5192\u9669\u5e01
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int quantity = Integer.parseInt(splitted[1]);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                    mch.gainMeso(quantity, true);
                }
            }
            for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                    if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                    mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e" + quantity + "\u5192\u9669\u5e01\u7ed9\u5f53\u524d\u5730\u56fe\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121020);
                }
            }
            return 1;
        }
    }

    public static class \u7ed9\u5f53\u524d\u5730\u56fe\u7ecf\u9a8c
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int quantity = Integer.parseInt(splitted[1]);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                    mch.gainExp(quantity, true, false, true);
                }
            }
            for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                    if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                    mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e" + quantity + "\u7ecf\u9a8c\u7ed9\u5f53\u524d\u5730\u56fe\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121020);
                }
            }
            return 1;
        }
    }

    public static class \u7ed9\u5f53\u524d\u5730\u56fe\u70b9\u5377
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "\u7528\u6cd5: !\u7ed9\u5f53\u524d\u5730\u56fe\u70b9\u5377 [\u70b9\u5377\u7c7b\u578b1\uff1a\u70b9\u5377 - 2\uff1a\u62b5\u7528] [\u70b9\u5377\u6570\u91cf]");
                return 0;
            }
            int type = Integer.parseInt(splitted[1]);
            int quantity = Integer.parseInt(splitted[2]);
            if (type <= 0 || type > 2) {
                type = 2;
            }
            if (quantity > 9000) {
                quantity = 9000;
            }
            int ret = 0;
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                    mch.modifyCSPoints(type, quantity, false);
                    mch.dropMessage(-11, "[\u7cfb\u7edf\u63d0\u793a] \u606d\u559c\u60a8\u83b7\u5f97\u7ba1\u7406\u5458\u8d60\u9001\u7ed9\u60a8\u7684" + (type == 1 ? "\u70b9\u5238 " : " \u62b5\u7528\u5238 ") + quantity + " \u70b9.");
                    ++ret;
                }
            }
            if (type == 1) {
                for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                        if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                        mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e" + quantity + "\u70b9\u5377\u7ed9\u5f53\u524d\u5730\u56fe\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120004);
                    }
                }
            } else if (type == 2) {
                for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                        if (c.getPlayer().getMapId() != mch.getMapId()) continue;
                        mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e" + quantity + "\u62b5\u7528\u5377\u7ed9\u5f53\u524d\u5730\u56fe\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120004);
                    }
                }
            }
            c.getPlayer().dropMessage(6, "\u547d\u4ee4\u4f7f\u7528\u6210\u529f\uff0c\u5f53\u524d\u5171\u6709: " + ret + " \u4e2a\u73a9\u5bb6\u83b7\u5f97: " + quantity + " \u70b9\u7684" + (type == 1 ? "\u70b9\u5238 " : " \u62b5\u7528\u5238 ") + " \u603b\u8ba1: " + ret * quantity);
            return 1;
        }
    }

    public static class \u7ed9\u6240\u6709\u4eba\u7269\u54c1
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "\u7528\u6cd5: !\u7ed9\u6240\u6709\u4eba\u7269\u54c1 [\u7269\u54c1ID] [\u6570\u91cf]");
                return 0;
            }
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            int item = Integer.parseInt(splitted[1]);
            int quantity = Integer.parseInt(splitted[2]);
            String mz = ii.getName(item);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    MapleInventoryManipulator.addById(mch.getClient(), item, (short)quantity, (byte)0);
                }
            }
            for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                    if (quantity <= 1) {
                        mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e\u3010" + mz + "\u3011\u7269\u54c1\u7ed9\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120000);
                        continue;
                    }
                    mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e\u3010" + mz + "\u3011\u7269\u54c1\u3010" + quantity + "\u3011\u4e2a\u7ed9\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120000);
                }
            }
            return 1;
        }
    }

    public static class \u7ed9\u6240\u6709\u4eba\u5192\u9669\u5e01
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int quantity = Integer.parseInt(splitted[1]);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    mch.gainMeso(quantity, true);
                }
            }
            for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                    mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e" + quantity + "\u5192\u9669\u5e01\u7ed9\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121020);
                }
            }
            return 1;
        }
    }

    public static class \u7ed9\u6240\u6709\u4eba\u7ecf\u9a8c
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            int quantity = Integer.parseInt(splitted[1]);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    mch.gainExp(quantity, true, false, true);
                }
            }
            for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                    mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e" + quantity + "\u7ecf\u9a8c\u7ed9\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121020);
                }
            }
            return 1;
        }
    }

    public static class \u7ed9\u6240\u6709\u4eba\u70b9\u5377
    extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "\u7528\u6cd5: !\u7ed9\u6240\u6709\u4eba\u70b9\u5377 [\u70b9\u5377\u7c7b\u578b1\uff1a\u70b9\u5377 - 2\uff1a\u62b5\u7528] [\u70b9\u5377\u6570\u91cf]");
                return 0;
            }
            int type = Integer.parseInt(splitted[1]);
            int quantity = Integer.parseInt(splitted[2]);
            if (type <= 0 || type > 2) {
                type = 2;
            }
            if (quantity > 9000) {
                quantity = 9000;
            }
            int ret = 0;
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    mch.modifyCSPoints(type, quantity, false);
                    mch.dropMessage(-11, "[\u7cfb\u7edf\u63d0\u793a] \u606d\u559c\u60a8\u83b7\u5f97\u7ba1\u7406\u5458\u8d60\u9001\u7ed9\u60a8\u7684" + (type == 1 ? "\u70b9\u5238 " : " \u62b5\u7528\u5238 ") + quantity + " \u70b9.");
                    ++ret;
                }
            }
            if (type == 1) {
                for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                        mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e" + quantity + "\u70b9\u5377\u7ed9\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120004);
                    }
                }
            } else if (type == 2) {
                for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                        mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u53d1\u653e" + quantity + "\u62b5\u7528\u5377\u7ed9\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120004);
                    }
                }
            }
            c.getPlayer().dropMessage(6, "\u547d\u4ee4\u4f7f\u7528\u6210\u529f\uff0c\u5f53\u524d\u5171\u6709: " + ret + " \u4e2a\u73a9\u5bb6\u83b7\u5f97: " + quantity + " \u70b9\u7684" + (type == 1 ? "\u70b9\u5238 " : " \u62b5\u7528\u5238 ") + " \u603b\u8ba1: " + ret * quantity);
            return 1;
        }
    }

    public static class \u53cc\u500d\u91d1\u5e01
    extends CommandExecute {
        private int change = 0;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            this.change = Integer.parseInt(splitted[1]);
            if (this.change == 1 || this.change == 2) {
                c.getPlayer().dropMessage(5, "\u4ee5\u524d - \u7ecf\u9a8c: " + c.getChannelServer().getExpRate() + " \u91d1\u5e01: " + c.getChannelServer().getMesoRate() + " \u7206\u7387: " + c.getChannelServer().getDropRate());
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setDoubleMeso(this.change);
                }
                c.getPlayer().dropMessage(5, "\u73b0\u5728 - \u7ecf\u9a8c: " + c.getChannelServer().getExpRate() + " \u91d1\u5e01: " + c.getChannelServer().getMesoRate() + " \u7206\u7387: " + c.getChannelServer().getDropRate());
                if (this.change == 1) {
                    for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                        for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                            mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u5173\u95ed\u3010\u53cc\u500d\u5192\u9669\u5e01\u3011\u6d3b\u52a8\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121020);
                        }
                    }
                } else if (this.change == 2) {
                    for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                        for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                            mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u5f00\u542f\u3010\u53cc\u500d\u5192\u9669\u5e01\u3011\u6d3b\u52a8\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121020);
                        }
                    }
                }
                return 1;
            }
            c.getPlayer().dropMessage(5, "\u8f93\u5165\u7684\u6570\u5b57\u65e0\u6548\uff0c1\u4e3a\u5173\u95ed\u6d3b\u52a8\u7ecf\u9a8c\uff0c2\u4e3a\u5f00\u542f\u6d3b\u52a8\u7ecf\u9a8c\u3002\u5f53\u524d\u8f93\u5165\u4e3a: " + this.change);
            return 0;
        }
    }

    public static class \u53cc\u500d\u7206\u7387
    extends CommandExecute {
        private int change = 0;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            this.change = Integer.parseInt(splitted[1]);
            if (this.change == 1 || this.change == 2) {
                c.getPlayer().dropMessage(5, "\u4ee5\u524d - \u7ecf\u9a8c: " + c.getChannelServer().getExpRate() + " \u91d1\u5e01: " + c.getChannelServer().getMesoRate() + " \u7206\u7387: " + c.getChannelServer().getDropRate());
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setDoubleDrop(this.change);
                }
                c.getPlayer().dropMessage(5, "\u73b0\u5728 - \u7ecf\u9a8c: " + c.getChannelServer().getExpRate() + " \u91d1\u5e01: " + c.getChannelServer().getMesoRate() + " \u7206\u7387: " + c.getChannelServer().getDropRate());
                if (this.change == 1) {
                    for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                        for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                            mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u5173\u95ed\u3010\u53cc\u500d\u7206\u7387\u3011\u6d3b\u52a8\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121009);
                        }
                    }
                } else if (this.change == 2) {
                    for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                        for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                            mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u5f00\u542f\u3010\u53cc\u500d\u7206\u7387\u3011\u6d3b\u52a8\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121009);
                        }
                    }
                }
                return 1;
            }
            c.getPlayer().dropMessage(5, "\u8f93\u5165\u7684\u6570\u5b57\u65e0\u6548\uff0c1\u4e3a\u5173\u95ed\u6d3b\u52a8\u7ecf\u9a8c\uff0c2\u4e3a\u5f00\u542f\u6d3b\u52a8\u7ecf\u9a8c\u3002\u5f53\u524d\u8f93\u5165\u4e3a: " + this.change);
            return 0;
        }
    }

    public static class \u53cc\u500d\u7ecf\u9a8ctime
    extends CommandExecute {
        private int time = 0;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            this.time = Integer.parseInt(splitted[1]);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                cserv.setDoubleExp(1);
                for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                    if (chr == null) continue;
                    chr.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u5f00\u542f\u3010\u53cc\u500d\u7ecf\u9a8c\u3011\u6d3b\u52a8\uff01", 5120000);
                }
            }
            Timer.WorldTimer.getInstance().register(new Runnable(){

                @Override
                public void run() {
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        cserv.setDoubleExp(0);
                        for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                            if (chr == null) continue;
                            chr.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u5173\u95ed\u3010\u53cc\u500d\u7ecf\u9a8c\u3011\u6d3b\u52a8\uff01\u671f\u5f85\u4e0b\u6b21\u6d3b\u52a8\uff01", 5120000);
                        }
                    }
                }
            }, 60000 * this.time);
            return 0;
        }

    }

    public static class \u53cc\u500d\u7ecf\u9a8c
    extends CommandExecute {
        private int change = 0;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            this.change = Integer.parseInt(splitted[1]);
            if (this.change == 0 || this.change == 1) {
                c.getPlayer().dropMessage(5, "\u4ee5\u524d - \u7ecf\u9a8c: " + c.getChannelServer().getExpRate() + " \u91d1\u5e01: " + c.getChannelServer().getMesoRate() + " \u7206\u7387: " + c.getChannelServer().getDropRate());
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setDoubleExp(this.change);
                }
                c.getPlayer().dropMessage(5, "\u73b0\u5728 - \u7ecf\u9a8c: " + c.getChannelServer().getExpRate() + " \u91d1\u5e01: " + c.getChannelServer().getMesoRate() + " \u7206\u7387: " + c.getChannelServer().getDropRate());
                if (this.change == 0) {
                    for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                        for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                            mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u5173\u95ed\u3010\u53cc\u500d\u7ecf\u9a8c\u3011\u6d3b\u52a8\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120000);
                        }
                    }
                } else if (this.change == 1) {
                    for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                        for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                            mch.startMapEffect(ServerProperties.getProperty("KinMS.CommandMessage") + "\u7ba1\u7406\u5458\u5f00\u542f\u3010\u53cc\u500d\u7ecf\u9a8c\u3011\u6d3b\u52a8\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5120000);
                        }
                    }
                }
                return 1;
            }
            c.getPlayer().dropMessage(5, "\u8f93\u5165\u7684\u6570\u5b57\u65e0\u6548\uff0c0\u4e3a\u5173\u95ed\u6d3b\u52a8\u7ecf\u9a8c\uff0c1\u4e3a\u5f00\u542f\u6d3b\u52a8\u7ecf\u9a8c\u3002\u5f53\u524d\u8f93\u5165\u4e3a: " + this.change);
            return 0;
        }
    }

    public static class UnBan
    extends CommandExecute {
        protected boolean hellban = false;

        private String getCommand() {
            return "UnBan";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "[Syntax] !" + this.getCommand() + " <\u539f\u56e0>");
                return 0;
            }
            byte ret = this.hellban ? MapleClient.unHellban(splitted[1]) : MapleClient.unban(splitted[1]);
            if (ret == -2) {
                c.getPlayer().dropMessage(6, "[" + this.getCommand() + "] SQL error.");
                return 0;
            }
            if (ret == -1) {
                c.getPlayer().dropMessage(6, "[" + this.getCommand() + "] The character does not exist.");
                return 0;
            }
            c.getPlayer().dropMessage(6, "[" + this.getCommand() + "] Successfully unbanned!");
            byte ret_ = MapleClient.unbanIPMacs(splitted[1]);
            if (ret_ == -2) {
                c.getPlayer().dropMessage(6, "[UnbanIP] SQL error.");
            } else if (ret_ == -1) {
                c.getPlayer().dropMessage(6, "[UnbanIP] The character does not exist.");
            } else if (ret_ == 0) {
                c.getPlayer().dropMessage(6, "[UnbanIP] No IP or Mac with that character exists!");
            } else if (ret_ == 1) {
                c.getPlayer().dropMessage(6, "[UnbanIP] IP/Mac -- one of them was found and unbanned.");
            } else if (ret_ == 2) {
                c.getPlayer().dropMessage(6, "[UnbanIP] Both IP and Macs were unbanned.");
            }
            return ret_ > 0 ? 1 : 0;
        }
    }

    public static class Ban
    extends CommandExecute {
        protected boolean hellban = false;

        private String getCommand() {
            return "Ban";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (!c.getPlayer().isAdmin()) {
                return 0;
            }
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(5, "[Syntax] !" + this.getCommand() + " <\u73a9\u5bb6> <\u539f\u56e0>");
                return 0;
            }
            StringBuilder sb = new StringBuilder(c.getPlayer().getName());
            sb.append(" banned ").append(splitted[1]).append(": ").append(StringUtil.joinStringFrom(splitted, 2));
            MapleCharacter target = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (target != null) {
                if (c.getPlayer().getGMLevel() > target.getGMLevel() || c.getPlayer().isAdmin()) {
                    sb.append(" (IP: ").append(target.getClient().getSessionIPAddress()).append(")");
                    if (target.ban(sb.toString(), c.getPlayer().isAdmin(), false, this.hellban)) {
                        c.getPlayer().dropMessage(6, "[" + this.getCommand() + "] \u6210\u529f\u5c01\u9396 " + splitted[1] + ".");
                        return 1;
                    }
                    c.getPlayer().dropMessage(6, "[" + this.getCommand() + "] \u5c01\u9396\u5931\u6557.");
                    return 0;
                }
                c.getPlayer().dropMessage(6, "[" + this.getCommand() + "] May not ban GMs...");
                return 1;
            }
            if (MapleCharacter.ban(splitted[1], sb.toString(), false, c.getPlayer().isAdmin() ? 250 : c.getPlayer().getGMLevel(), splitted[0].equals("!hellban"))) {
                c.getPlayer().dropMessage(6, "[" + this.getCommand() + "] \u6210\u529f\u96e2\u7dda\u5c01\u9396 " + splitted[1] + ".");
                return 1;
            }
            c.getPlayer().dropMessage(6, "[" + this.getCommand() + "] \u5c01\u9396\u5931\u6557 " + splitted[1]);
            return 0;
        }
    }

}

