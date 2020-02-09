/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package scripting;

import client.ISkill;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleQuestStatus;
import client.PlayerStats;
import client.SkillFactory;
import client.inventory.Equip;
import client.inventory.IItem;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryIdentifier;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import constants.GameConstants;
import handling.MaplePacket;
import handling.channel.ChannelServer;
import handling.channel.PlayerStorage;
import handling.world.MapleParty;
import handling.world.MaplePartyCharacter;
import handling.world.World;
import handling.world.guild.MapleGuild;
import java.awt.Point;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import scripting.EventInstanceManager;
import scripting.EventManager;
import scripting.EventScriptManager;
import scripting.NPCScriptManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MaplePortal;
import server.MapleStatEffect;
import server.Randomizer;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.Event_DojoAgent;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.MapleMapObject;
import server.maps.MapleReactor;
import server.maps.SavedLocationType;
import server.quest.MapleQuest;
import server.shops.IMaplePlayerShop;
import tools.MaplePacketCreator;
import tools.packet.PetPacket;
import tools.packet.UIPacket;

public abstract class AbstractPlayerInteraction {
    private MapleClient c;

    public AbstractPlayerInteraction(MapleClient c) {
        this.c = c;
    }

    public final MapleClient getClient() {
        return this.c;
    }

    public final MapleClient getC() {
        return this.c;
    }

    public MapleCharacter getChar() {
        this.c.getPlayer().getInventory(MapleInventoryType.USE).listById(1).iterator();
        return this.c.getPlayer();
    }

    public final ChannelServer getChannelServer() {
        return this.c.getChannelServer();
    }

    public final MapleCharacter getPlayer() {
        return this.c.getPlayer();
    }

    public final EventManager getEventManager(String event) {
        return this.c.getChannelServer().getEventSM().getEventManager(event);
    }

    public final EventInstanceManager getEventInstance() {
        return this.c.getPlayer().getEventInstance();
    }

    public final void warp(int map) {
        MapleMap mapz = this.getWarpMap(map);
        try {
            this.c.getPlayer().changeMap(mapz, mapz.getPortal(Randomizer.nextInt(mapz.getPortals().size())));
        }
        catch (Exception e) {
            this.c.getPlayer().changeMap(mapz, mapz.getPortal(0));
        }
    }

    public final void warpPlayer(int map, int map2) {
        if (this.c.getPlayer().getMapId() == map) {
            MapleMap mapz = this.getWarpMap(map2);
            try {
                this.c.getPlayer().changeMap(mapz, mapz.getPortal(Randomizer.nextInt(mapz.getPortals().size())));
            }
            catch (Exception e) {
                this.c.getPlayer().changeMap(mapz, mapz.getPortal(0));
            }
        } else {
            this.c.getPlayer().dropMessage(5, "NPC\u4f20\u9001\u5730\u56fe\u51fd\u6570\u4e0d\u5339\u914d\uff01");
        }
    }

    public final void warp_Instanced(int map) {
        MapleMap mapz = this.getMap_Instanced(map);
        try {
            this.c.getPlayer().changeMap(mapz, mapz.getPortal(Randomizer.nextInt(mapz.getPortals().size())));
        }
        catch (Exception e) {
            this.c.getPlayer().changeMap(mapz, mapz.getPortal(0));
        }
    }

    public final void warp(int map, int portal) {
        MapleMap mapz = this.getWarpMap(map);
        if (portal != 0 && map == this.c.getPlayer().getMapId()) {
            Point portalPos = new Point(this.c.getPlayer().getMap().getPortal(portal).getPosition());
            this.c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
        } else {
            this.c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
        }
    }

    public final void warpS(int map, int portal) {
        MapleMap mapz = this.getWarpMap(map);
        this.c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
    }

    public final void warp(int map, String portal) {
        MapleMap mapz = this.getWarpMap(map);
        if (map == 109060000 || map == 109060002 || map == 109060004) {
            portal = mapz.getSnowballPortal();
        }
        if (map == this.c.getPlayer().getMapId()) {
            Point portalPos = new Point(this.c.getPlayer().getMap().getPortal(portal).getPosition());
            this.c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
        } else {
            this.c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
        }
    }

    public final void warpS(int map, String portal) {
        MapleMap mapz = this.getWarpMap(map);
        if (map == 109060000 || map == 109060002 || map == 109060004) {
            portal = mapz.getSnowballPortal();
        }
        this.c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
    }

    public final void warpMap(int mapid, int portal) {
        MapleMap map = this.getMap(mapid);
        for (MapleCharacter chr : this.c.getPlayer().getMap().getCharactersThreadsafe()) {
            chr.changeMap(map, map.getPortal(portal));
        }
    }

    public final void playPortalSE() {
        this.c.getSession().write((Object)MaplePacketCreator.showOwnBuffEffect(0, 7));
    }

    private final MapleMap getWarpMap(int map) {
        return ChannelServer.getInstance(this.c.getChannel()).getMapFactory().getMap(map);
    }

    public final MapleMap getMap() {
        return this.c.getPlayer().getMap();
    }

    public final MapleMap getMap(int map) {
        return this.getWarpMap(map);
    }

    public final MapleMap getMap_Instanced(int map) {
        return this.c.getPlayer().getEventInstance() == null ? this.getMap(map) : this.c.getPlayer().getEventInstance().getMapInstance(map);
    }

    public final void spawnMap(int MapID, int MapID2) {
        for (ChannelServer chan : ChannelServer.getAllInstances()) {
            for (MapleCharacter chr : chan.getPlayerStorage().getAllCharacters()) {
                if (chr == null || this.getC().getChannel() != chr.getClient().getChannel() || chr.getMapId() != MapID) continue;
                this.warp(MapID2);
            }
        }
    }

    public final void spawnMap(int MapID) {
        for (ChannelServer chan : ChannelServer.getAllInstances()) {
            for (MapleCharacter chr : chan.getPlayerStorage().getAllCharacters()) {
                if (chr == null || this.getC().getChannel() != chr.getClient().getChannel() || chr.getMapId() != this.getMapId()) continue;
                this.warp(MapID);
            }
        }
    }

    public void spawnMonster(int id, int qty) {
        this.spawnMob(id, qty, new Point(this.c.getPlayer().getPosition()));
    }

    public final void spawnMobOnMap(int id, int qty, int x, int y, int map) {
        for (int i = 0; i < qty; ++i) {
            this.getMap(map).spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(id), new Point(x, y));
        }
    }

    public final void spawnMobOnMap(int id, int qty, int x, int y, int map, int hp) {
        for (int i = 0; i < qty; ++i) {
            this.getMap(map).spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(id), new Point(x, y), hp);
        }
    }

    public final void spawnMob(int id, int qty, int x, int y) {
        this.spawnMob(id, qty, new Point(x, y));
    }

    public final void spawnMob(int id, int x, int y) {
        this.spawnMob(id, 1, new Point(x, y));
    }

    public final void spawnMob(int id, int qty, Point pos) {
        for (int i = 0; i < qty; ++i) {
            this.c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(id), pos);
        }
    }

    public final void killMob(int ids) {
        this.c.getPlayer().getMap().killMonster(ids);
    }

    public final void killAllMob() {
        this.c.getPlayer().getMap().killAllMonsters(true);
    }

    public final void addHP(int delta) {
        this.c.getPlayer().addHP(delta);
    }

    public final void setPlayerStat(String type, int x) {
        if (type.equals("LVL")) {
            this.c.getPlayer().setLevel((short)x);
        } else if (type.equals("STR")) {
            this.c.getPlayer().getStat().setStr((short)x);
        } else if (type.equals("DEX")) {
            this.c.getPlayer().getStat().setDex((short)x);
        } else if (type.equals("INT")) {
            this.c.getPlayer().getStat().setInt((short)x);
        } else if (type.equals("LUK")) {
            this.c.getPlayer().getStat().setLuk((short)x);
        } else if (type.equals("HP")) {
            this.c.getPlayer().getStat().setHp(x);
        } else if (type.equals("MP")) {
            this.c.getPlayer().getStat().setMp(x);
        } else if (type.equals("MAXHP")) {
            this.c.getPlayer().getStat().setMaxHp((short)x);
        } else if (type.equals("MAXMP")) {
            this.c.getPlayer().getStat().setMaxMp((short)x);
        } else if (type.equals("RAP")) {
            this.c.getPlayer().setRemainingAp((short)x);
        } else if (type.equals("RSP")) {
            this.c.getPlayer().setRemainingSp((short)x);
        } else if (type.equals("GID")) {
            this.c.getPlayer().setGuildId(x);
        } else if (type.equals("GRANK")) {
            this.c.getPlayer().setGuildRank((byte)x);
        } else if (type.equals("ARANK")) {
            this.c.getPlayer().setAllianceRank((byte)x);
        } else if (type.equals("GENDER")) {
            this.c.getPlayer().setGender((byte)x);
        } else if (type.equals("FACE")) {
            this.c.getPlayer().setFace(x);
        } else if (type.equals("HAIR")) {
            this.c.getPlayer().setHair(x);
        }
    }

    public final int getPlayerStat(String type) {
        if (type.equals("LVL")) {
            return this.c.getPlayer().getLevel();
        }
        if (type.equals("STR")) {
            return this.c.getPlayer().getStat().getStr();
        }
        if (type.equals("DEX")) {
            return this.c.getPlayer().getStat().getDex();
        }
        if (type.equals("INT")) {
            return this.c.getPlayer().getStat().getInt();
        }
        if (type.equals("LUK")) {
            return this.c.getPlayer().getStat().getLuk();
        }
        if (type.equals("HP")) {
            return this.c.getPlayer().getStat().getHp();
        }
        if (type.equals("MP")) {
            return this.c.getPlayer().getStat().getMp();
        }
        if (type.equals("MAXHP")) {
            return this.c.getPlayer().getStat().getMaxHp();
        }
        if (type.equals("MAXMP")) {
            return this.c.getPlayer().getStat().getMaxMp();
        }
        if (type.equals("RAP")) {
            return this.c.getPlayer().getRemainingAp();
        }
        if (type.equals("RSP")) {
            return this.c.getPlayer().getRemainingSp();
        }
        if (type.equals("GID")) {
            return this.c.getPlayer().getGuildId();
        }
        if (type.equals("GRANK")) {
            return this.c.getPlayer().getGuildRank();
        }
        if (type.equals("ARANK")) {
            return this.c.getPlayer().getAllianceRank();
        }
        if (type.equals("GM")) {
            return this.c.getPlayer().isGM() ? 1 : 0;
        }
        if (type.equals("ADMIN")) {
            return this.c.getPlayer().isAdmin() ? 1 : 0;
        }
        if (type.equals("GENDER")) {
            return this.c.getPlayer().getGender();
        }
        if (type.equals("FACE")) {
            return this.c.getPlayer().getFace();
        }
        if (type.equals("HAIR")) {
            return this.c.getPlayer().getHair();
        }
        return -1;
    }

    public final String getName() {
        return this.c.getPlayer().getName();
    }

    public final boolean haveItem(int itemid) {
        return this.haveItem(itemid, 1);
    }

    public final boolean haveItem(int itemid, int quantity) {
        return this.haveItem(itemid, quantity, false, true);
    }

    public final boolean haveItem(int itemid, int quantity, boolean checkEquipped, boolean greaterOrEquals) {
        return this.c.getPlayer().haveItem(itemid, quantity, checkEquipped, greaterOrEquals);
    }

    public final boolean canHold() {
        for (int i = 1; i <= 5; ++i) {
            if (this.c.getPlayer().getInventory(MapleInventoryType.getByType((byte)i)).getNextFreeSlot() > -1) continue;
            return false;
        }
        return true;
    }

    public final boolean canHold(int itemid) {
        return this.c.getPlayer().getInventory(GameConstants.getInventoryType(itemid)).getNextFreeSlot() > -1;
    }

    public final boolean canHold(int itemid, int quantity) {
        return MapleInventoryManipulator.checkSpace(this.c, itemid, quantity, "");
    }

    public final MapleQuestStatus getQuestRecord(int id) {
        return this.c.getPlayer().getQuestNAdd(MapleQuest.getInstance(id));
    }

    public final byte getQuestStatus(int id) {
        return this.c.getPlayer().getQuestStatus(id);
    }

    public void completeQuest(int id) {
        this.c.getPlayer().setQuestAdd(id);
    }

    public final boolean isQuestActive(int id) {
        return this.getQuestStatus(id) == 1;
    }

    public final boolean isQuestFinished(int id) {
        return this.getQuestStatus(id) == 2;
    }

    public final void showQuestMsg(String msg) {
        this.c.getSession().write((Object)MaplePacketCreator.showQuestMsg(msg));
    }

    public final void forceStartQuest(int id, String data) {
        MapleQuest.getInstance(id).forceStart(this.c.getPlayer(), 0, data);
    }

    public final void forceStartQuest(int id, int data, boolean filler) {
        MapleQuest.getInstance(id).forceStart(this.c.getPlayer(), 0, filler ? String.valueOf(data) : null);
    }

    public void clearAranPolearm() {
        this.c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).removeItem((short)-11);
    }

    public void forceStartQuest(int id) {
        MapleQuest.getInstance(id).forceStart(this.c.getPlayer(), 0, null);
    }

    public void forceCompleteQuest(int id) {
        MapleQuest.getInstance(id).forceComplete(this.getPlayer(), 0);
    }

    public void spawnNpc(int npcId) {
        this.c.getPlayer().getMap().spawnNpc(npcId, this.c.getPlayer().getPosition());
    }

    public final void spawnNpc(int npcId, int x, int y) {
        this.c.getPlayer().getMap().spawnNpc(npcId, new Point(x, y));
    }

    public final void spawnNpc(int npcId, Point pos) {
        this.c.getPlayer().getMap().spawnNpc(npcId, pos);
    }

    public final void removeNpc(int mapid, int npcId) {
        this.c.getChannelServer().getMapFactory().getMap(mapid).removeNpc(npcId);
    }

    public final void forceStartReactor(int mapid, int id) {
        MapleMap map = this.c.getChannelServer().getMapFactory().getMap(mapid);
        for (MapleMapObject remo : map.getAllReactorsThreadsafe()) {
            MapleReactor react = (MapleReactor)remo;
            if (react.getReactorId() != id) continue;
            react.forceStartReactor(this.c);
            break;
        }
    }

    public final void destroyReactor(int mapid, int id) {
        MapleMap map = this.c.getChannelServer().getMapFactory().getMap(mapid);
        for (MapleMapObject remo : map.getAllReactorsThreadsafe()) {
            MapleReactor react = (MapleReactor)remo;
            if (react.getReactorId() != id) continue;
            react.hitReactor(this.c);
            break;
        }
    }

    public final void hitReactor(int mapid, int id) {
        MapleMap map = this.c.getChannelServer().getMapFactory().getMap(mapid);
        for (MapleMapObject remo : map.getAllReactorsThreadsafe()) {
            MapleReactor react = (MapleReactor)remo;
            if (react.getReactorId() != id) continue;
            react.hitReactor(this.c);
            break;
        }
    }

    public final int getJob() {
        return this.c.getPlayer().getJob();
    }

    public final int getNX(int \u7c7b\u578b) {
        return this.c.getPlayer().getCSPoints(\u7c7b\u578b);
    }

    public final void gainNX(int amount) {
        this.c.getPlayer().modifyCSPoints(1, amount, true);
    }

    public final void gainItemPeriod(int id, short quantity, int period) {
        this.gainItem(id, quantity, false, period, -1, "", (byte)0);
    }

    public final void gainItemPeriod(int id, short quantity, long period, String owner) {
        this.gainItem(id, quantity, false, period, -1, owner, (byte)0);
    }

    public final void gainItem(int id, short quantity) {
        this.gainItem(id, quantity, false, 0L, -1, "", (byte)0);
    }

    public final void gainItem(int id, short quantity, long period, byte Flag) {
        this.gainItem(id, quantity, false, period, -1, "", Flag);
    }

    public final void gainItem(int id, short quantity, boolean randomStats) {
        this.gainItem(id, quantity, randomStats, 0L, -1, "", (byte)0);
    }

    public final void gainItem(int id, short quantity, boolean randomStats, int slots) {
        this.gainItem(id, quantity, randomStats, 0L, slots, "", (byte)0);
    }

    public final void gainItem(int id, short quantity, long period) {
        this.gainItem(id, quantity, false, period, -1, "", (byte)0);
    }

    public final void gainItem(int id, short quantity, boolean randomStats, long period, int slots) {
        this.gainItem(id, quantity, randomStats, period, slots, "", (byte)0);
    }

    public final void gainItem(int id, short quantity, boolean randomStats, long period, int slots, String owner, byte Flag) {
        this.gainItem(id, quantity, randomStats, period, slots, owner, this.c, Flag);
    }

    public final void gainItem(int id, short quantity, boolean randomStats, long period, int slots, String owner, MapleClient cg, byte Flag) {
        if (quantity >= 0) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            MapleInventoryType type = GameConstants.getInventoryType(id);
            if (!MapleInventoryManipulator.checkSpace(cg, id, quantity, "")) {
                return;
            }
            if (type.equals((Object)MapleInventoryType.EQUIP) && !GameConstants.isThrowingStar(id) && !GameConstants.isBullet(id)) {
                Equip item = (Equip)(randomStats ? ii.randomizeStats((Equip)ii.getEquipById(id)) : ii.getEquipById(id));
                if (period > 0L) {
                    item.setExpiration(System.currentTimeMillis() + period * 60L * 60L * 1000L);
                }
                if (slots > 0) {
                    item.setUpgradeSlots((byte)(item.getUpgradeSlots() + slots));
                }
                if (owner != null) {
                    item.setOwner(owner);
                }
                String name = ii.getName(id);
                if (id / 10000 == 114 && name != null && name.length() > 0) {
                    String msg = "\u4f60\u5df2\u83b7\u5f97\u79f0\u53f7 <" + name + ">";
                    cg.getPlayer().dropMessage(5, msg);
                    cg.getPlayer().dropMessage(5, msg);
                }
                MapleInventoryManipulator.addbyItem(cg, item.copy());
            } else {
                MapleInventoryManipulator.addById(cg, id, quantity, owner == null ? "" : owner, null, period, Flag);
            }
        } else {
            MapleInventoryManipulator.removeById(cg, GameConstants.getInventoryType(id), id, -quantity, true, false);
        }
        cg.getSession().write((Object)MaplePacketCreator.getShowItemGain(id, quantity, true));
    }

    public final void gainItem(int id, int str, int dex, int luk, int Int, int hp, int mp, int watk, int matk, int wdef, int mdef, int hb, int mz, int ty, int yd, int time) {
        this.gainItemS(id, str, dex, luk, Int, hp, mp, watk, matk, wdef, mdef, hb, mz, ty, yd, this.c, time);
    }

    public final void gainItem(int id, int str, int dex, int luk, int Int, int hp, int mp, int watk, int matk, int wdef, int mdef, int hb, int mz, int ty, int yd) {
        this.gainItemS(id, str, dex, luk, Int, hp, mp, watk, matk, wdef, mdef, hb, mz, ty, yd, this.c, 0);
    }

    public final void gainItemS(int id, int str, int dex, int luk, int Int, int hp, int mp, int watk, int matk, int wdef, int mdef, int hb, int mz, int ty, int yd, MapleClient cg, int time) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventoryType type = GameConstants.getInventoryType(id);
        if (!MapleInventoryManipulator.checkSpace(cg, id, 1, "")) {
            return;
        }
        if (type.equals((Object)MapleInventoryType.EQUIP) && !GameConstants.isThrowingStar(id) && !GameConstants.isBullet(id)) {
            Equip item = (Equip)ii.getEquipById(id);
            String name = ii.getName(id);
            if (id / 10000 == 114 && name != null && name.length() > 0) {
                String msg = "\u4f60\u5df2\u83b7\u5f97\u79f0\u53f7 <" + name + ">";
                cg.getPlayer().dropMessage(5, msg);
                cg.getPlayer().dropMessage(5, msg);
            }
            if (time > 0) {
                item.setExpiration(System.currentTimeMillis() + (long)(time * 60 * 60 * 1000));
            }
            if (str > 0) {
                item.setStr((short)str);
            }
            if (dex > 0) {
                item.setDex((short)dex);
            }
            if (luk > 0) {
                item.setLuk((short)luk);
            }
            if (Int > 0) {
                item.setInt((short)Int);
            }
            if (hp > 0) {
                item.setHp((short)hp);
            }
            if (mp > 0) {
                item.setMp((short)mp);
            }
            if (watk > 0) {
                item.setWatk((short)watk);
            }
            if (matk > 0) {
                item.setMatk((short)matk);
            }
            if (wdef > 0) {
                item.setWdef((short)wdef);
            }
            if (mdef > 0) {
                item.setMdef((short)mdef);
            }
            if (hb > 0) {
                item.setAvoid((short)hb);
            }
            if (mz > 0) {
                item.setAcc((short)mz);
            }
            if (ty > 0) {
                item.setJump((short)ty);
            }
            if (yd > 0) {
                item.setSpeed((short)yd);
            }
            MapleInventoryManipulator.addbyItem(cg, item.copy());
        } else {
            MapleInventoryManipulator.addById(cg, id, (short)1, "", (byte)0);
        }
        cg.getSession().write((Object)MaplePacketCreator.getShowItemGain(id, (short)1, true));
    }

    public final void changeMusic(String songName) {
        this.getPlayer().getMap().broadcastMessage(MaplePacketCreator.musicChange(songName));
    }

    public final void cs(String songName) {
        this.getPlayer().getMap().broadcastMessage(MaplePacketCreator.showEffect(songName));
    }

    public final void worldMessage(int type, String message) {
        World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(type, message).getBytes());
    }

    public void givePartyExp_PQ(int maxLevel, double mod) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            int amount = (int)Math.round((double)GameConstants.getExpNeededForLevel(this.getPlayer().getLevel() > maxLevel ? maxLevel + this.getPlayer().getLevel() / 10 : this.getPlayer().getLevel()) / ((double)Math.min(this.getPlayer().getLevel(), maxLevel) / 10.0) / mod);
            this.gainExp(amount);
            return;
        }
        int cMap = this.getPlayer().getMapId();
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar == null || curChar.getMapId() != cMap && curChar.getEventInstance() != this.getPlayer().getEventInstance()) continue;
            int amount = (int)Math.round((double)GameConstants.getExpNeededForLevel(curChar.getLevel() > maxLevel ? maxLevel + curChar.getLevel() / 10 : curChar.getLevel()) / ((double)Math.min(curChar.getLevel(), maxLevel) / 10.0) / mod);
            curChar.gainExp(amount, true, true, true);
        }
    }

    public final void playerMessage(String message) {
        this.playerMessage(5, message);
    }

    public final void mapMessage(String message) {
        this.mapMessage(5, message);
    }

    public final void guildMessage(String message) {
        this.guildMessage(5, message);
    }

    public final void playerMessage(int type, String message) {
        this.c.getSession().write((Object)MaplePacketCreator.serverNotice(type, message));
    }

    public final void mapMessage(int type, String message) {
        this.c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(type, message));
    }

    public final void guildMessage(int type, String message) {
        if (this.getPlayer().getGuildId() > 0) {
            World.Guild.guildPacket(this.getPlayer().getGuildId(), MaplePacketCreator.serverNotice(type, message));
        }
    }

    public final MapleGuild getGuild() {
        return this.getGuild(this.getPlayer().getGuildId());
    }

    public final MapleGuild getGuild(int guildid) {
        return World.Guild.getGuild(guildid);
    }

    public final MapleParty getParty() {
        return this.c.getPlayer().getParty();
    }

    public final int getCurrentPartyId(int mapid) {
        return this.getMap(mapid).getCurrentPartyId();
    }

    public void czdt(int MapID) {
        MapleCharacter player = this.c.getPlayer();
        int mapid = MapID;
        MapleMap map = player.getMap();
        if (player.getClient().getChannelServer().getMapFactory().destroyMap(mapid)) {
            MapleMap newMap = player.getClient().getChannelServer().getMapFactory().getMap(mapid);
            MaplePortal newPor = newMap.getPortal(0);
            LinkedHashSet<MapleCharacter> mcs = new LinkedHashSet<MapleCharacter>(map.getCharacters());
            for (MapleCharacter m : mcs) {
                int x = 0;
                if (x >= 5) continue;
            }
        }
    }

    public final boolean isLeader() {
        if (this.getParty() == null) {
            return false;
        }
        return this.getParty().getLeader().getId() == this.c.getPlayer().getId();
    }

    public final boolean isParty() {
        return this.getParty() != null;
    }

    public final boolean isAllPartyMembersAllowedJob(int job) {
        if (this.c.getPlayer().getParty() == null) {
            return false;
        }
        for (MaplePartyCharacter mem : this.c.getPlayer().getParty().getMembers()) {
            if (mem.getJobId() / 100 == job) continue;
            return false;
        }
        return true;
    }

    public final boolean allMembersHere() {
        if (this.c.getPlayer().getParty() == null) {
            return false;
        }
        for (MaplePartyCharacter mem : this.c.getPlayer().getParty().getMembers()) {
            MapleCharacter chr = this.c.getPlayer().getMap().getCharacterById(mem.getId());
            if (chr != null) continue;
            return false;
        }
        return true;
    }

    public final void warpPartyItem(int item) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.removeAll(item);
            return;
        }
        int cMap = this.getPlayer().getMapId();
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar == null || curChar.getMapId() != cMap && curChar.getEventInstance() != this.getPlayer().getEventInstance()) continue;
            this.removeAll(item);
        }
    }

    public final void warpParty(int mapId) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.warp(mapId, 0);
            return;
        }
        MapleMap target = this.getMap(mapId);
        int cMap = this.getPlayer().getMapId();
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar == null || curChar.getMapId() != cMap && curChar.getEventInstance() != this.getPlayer().getEventInstance()) continue;
            curChar.changeMap(target, target.getPortal(0));
        }
    }

    public final void warpParty(int mapId, int portal) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            if (portal < 0) {
                this.warp(mapId);
            } else {
                this.warp(mapId, portal);
            }
            return;
        }
        boolean rand = portal < 0;
        MapleMap target = this.getMap(mapId);
        int cMap = this.getPlayer().getMapId();
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar == null || curChar.getMapId() != cMap && curChar.getEventInstance() != this.getPlayer().getEventInstance()) continue;
            if (rand) {
                try {
                    curChar.changeMap(target, target.getPortal(Randomizer.nextInt(target.getPortals().size())));
                }
                catch (Exception e) {
                    curChar.changeMap(target, target.getPortal(0));
                }
                continue;
            }
            curChar.changeMap(target, target.getPortal(portal));
        }
    }

    public final void warpParty_Instanced(int mapId) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.warp_Instanced(mapId);
            return;
        }
        MapleMap target = this.getMap_Instanced(mapId);
        int cMap = this.getPlayer().getMapId();
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar == null || curChar.getMapId() != cMap && curChar.getEventInstance() != this.getPlayer().getEventInstance()) continue;
            curChar.changeMap(target, target.getPortal(0));
        }
    }

    public void gainDY(int gain) {
        this.c.getPlayer().modifyCSPoints(2, gain, true);
    }

    public void gainMeso(int gain) {
        this.c.getPlayer().gainMeso(gain, true, false, true);
    }

    public void gainExp(int gain) {
        this.c.getPlayer().gainExp(gain, true, true, true);
    }

    public void gainExpR(int gain) {
        this.c.getPlayer().gainExp(gain * this.c.getChannelServer().getExpRate(), true, true, true);
    }

    public final void givePartyItems(int id, short quantity, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            if (quantity >= 0) {
                MapleInventoryManipulator.addById(chr.getClient(), id, quantity, (byte)0);
            } else {
                MapleInventoryManipulator.removeById(chr.getClient(), GameConstants.getInventoryType(id), id, -quantity, true, false);
            }
            chr.getClient().getSession().write((Object)MaplePacketCreator.getShowItemGain(id, quantity, true));
        }
    }

    public final void givePartyItems(int id, short quantity) {
        this.givePartyItems(id, quantity, false);
    }

    public final void givePartyItems(int id, short quantity, boolean removeAll) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.gainItem(id, (short)(removeAll ? -this.getPlayer().itemQuantity(id) : quantity));
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null) continue;
            this.gainItem(id, (short)(removeAll ? -curChar.itemQuantity(id) : quantity), false, 0L, 0, "", curChar.getClient(), (byte)0);
        }
    }

    public final void givePartyExp(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.gainExp(amount, true, true, true);
        }
    }

    public final void givePartyExp(int amount) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.gainExp(amount);
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null) continue;
            curChar.gainExp(amount, true, true, true);
        }
    }

    public final void givePartyFb(int amount) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            if (this.getPlayer().getmrfbrws() > this.getFBRW()) {
                this.gainFBRW(amount);
            }
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null || curChar.getmrfbrws() <= curChar.getFBRW()) continue;
            curChar.gainFBRW(amount);
        }
    }

    public final void givePartyFba(int amount) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            if (this.getPlayer().getmrfbrwas() > this.getFBRWA()) {
                this.gainFBRWA(amount);
            }
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null || curChar.getmrfbrwas() <= curChar.getFBRWA()) continue;
            curChar.gainFBRWA(amount);
        }
    }

    public final void givePartyNX(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.modifyCSPoints(1, amount, true);
        }
    }

    public final void givePartyDY(int amount) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.gainDY(amount);
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null) continue;
            curChar.modifyCSPoints(2, amount, true);
        }
    }

    public final void givePartyMeso(int amount) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.gainMeso(amount);
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null) continue;
            curChar.gainMeso(amount, true);
        }
    }

    public final void givePartyNX(int amount) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.gainNX(amount);
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null) continue;
            curChar.modifyCSPoints(1, amount, true);
        }
    }

    public final void endPartyQuest(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.endPartyQuest(amount);
        }
    }

    public final void endPartyQuest(int amount) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.getPlayer().endPartyQuest(amount);
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null) continue;
            curChar.endPartyQuest(amount);
        }
    }

    public final void removeFromParty(int id, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            int possesed = chr.getInventory(GameConstants.getInventoryType(id)).countById(id);
            if (possesed <= 0) continue;
            MapleInventoryManipulator.removeById(this.c, GameConstants.getInventoryType(id), id, possesed, true, false);
            chr.getClient().getSession().write((Object)MaplePacketCreator.getShowItemGain(id, (short)(-possesed), true));
        }
    }

    public final void removeFromParty(int id) {
        this.givePartyItems(id, (short)0, true);
    }

    public final void useSkill(int skill, int level) {
        if (level <= 0) {
            return;
        }
        SkillFactory.getSkill(skill).getEffect(level).applyTo(this.c.getPlayer());
    }

    public final void useItem(int id) {
        MapleItemInformationProvider.getInstance().getItemEffect(id).applyTo(this.c.getPlayer());
        this.c.getSession().write((Object)UIPacket.getStatusMsg(id));
    }

    public final void cancelItem(int id) {
        this.c.getPlayer().cancelEffect(MapleItemInformationProvider.getInstance().getItemEffect(id), false, -1L);
    }

    public final int getMorphState() {
        return this.c.getPlayer().getMorphState();
    }

    public final void removeAll(int id) {
        this.c.getPlayer().removeAll(id);
    }

    public final void gainCloseness(int closeness, int index) {
        MaplePet pet = this.getPlayer().getPet(index);
        if (pet != null) {
            pet.setCloseness(pet.getCloseness() + closeness);
            this.getClient().getSession().write((Object)PetPacket.updatePet(pet, this.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte)pet.getInventoryPosition()), true));
        }
    }

    public final void gainClosenessAll(int closeness) {
        for (MaplePet pet : this.getPlayer().getPets()) {
            if (pet == null) continue;
            pet.setCloseness(pet.getCloseness() + closeness);
            this.getClient().getSession().write((Object)PetPacket.updatePet(pet, this.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte)pet.getInventoryPosition()), true));
        }
    }

    public final void resetMap(int mapid) {
        this.getMap(mapid).resetFully();
    }

    public final void resetMapS() {
        MapleCharacter player = this.c.getPlayer();
        int mapid = player.getMapId();
        MapleMap map = player.getMap();
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
    }

    public final void openNpc(int id) {
        NPCScriptManager.getInstance().start(this.getClient(), id);
    }

    public void openNpc(int id, int wh) {
        NPCScriptManager.getInstance().dispose(this.c);
        NPCScriptManager.getInstance().start(this.getClient(), id, wh);
    }

    public void serverNotice(String Text2) {
        this.getClient().getChannelServer().broadcastPacket(MaplePacketCreator.serverNotice(6, Text2));
    }

    public final void openNpc(MapleClient cg, int id) {
        NPCScriptManager.getInstance().start(cg, id);
    }

    public final int getMapId() {
        return this.c.getPlayer().getMap().getId();
    }

    public final boolean haveMonster(int mobid) {
        for (MapleMapObject obj : this.c.getPlayer().getMap().getAllMonstersThreadsafe()) {
            MapleMonster mob2 = (MapleMonster)obj;
            if (mob2.getId() != mobid) continue;
            return true;
        }
        return false;
    }

    public final int getChannelNumber() {
        return this.c.getChannel();
    }

    public final int getMonsterCount(int mapid) {
        return this.c.getChannelServer().getMapFactory().getMap(mapid).getNumMonsters();
    }

    public final void teachSkill(int id, byte level, byte masterlevel) {
        this.getPlayer().changeSkillLevel(SkillFactory.getSkill(id), level, masterlevel);
    }

    public final void teachSkill(int id, byte level) {
        ISkill skil = SkillFactory.getSkill(id);
        if (this.getPlayer().getSkillLevel(skil) > level) {
            level = this.getPlayer().getSkillLevel(skil);
        }
        this.getPlayer().changeSkillLevel(skil, level, skil.getMaxLevel());
    }

    public final int getPlayerCount(int mapid) {
        return this.c.getChannelServer().getMapFactory().getMap(mapid).getCharactersSize();
    }

    public final void dojo_getUp() {
        this.c.getSession().write((Object)MaplePacketCreator.updateInfoQuest(1207, "pt=1;min=4;belt=1;tuto=1"));
        this.c.getSession().write((Object)MaplePacketCreator.dojoWarpUp());
    }

    public final boolean dojoAgent_NextMap(boolean dojo, boolean fromresting) {
        if (dojo) {
            return Event_DojoAgent.warpNextMap(this.c.getPlayer(), fromresting);
        }
        return Event_DojoAgent.warpNextMap_Agent(this.c.getPlayer(), fromresting);
    }

    public final int dojo_getPts() {
        return this.c.getPlayer().getDojo();
    }

    public final byte getShopType() {
        return this.c.getPlayer().getPlayerShop().getShopType();
    }

    public final MapleEvent getEvent(String loc) {
        return this.c.getChannelServer().getEvent(MapleEventType.valueOf(loc));
    }

    public final int getSavedLocation(String loc) {
        Integer ret = this.c.getPlayer().getSavedLocation(SavedLocationType.fromString(loc));
        if (ret == null || ret == -1) {
            return 100000000;
        }
        return ret;
    }

    public final void saveLocation(String loc) {
        this.c.getPlayer().saveLocation(SavedLocationType.fromString(loc));
    }

    public final void saveReturnLocation(String loc) {
        this.c.getPlayer().saveLocation(SavedLocationType.fromString(loc), this.c.getPlayer().getMap().getReturnMap().getId());
    }

    public final void clearSavedLocation(String loc) {
        this.c.getPlayer().clearSavedLocation(SavedLocationType.fromString(loc));
    }

    public final void summonMsg(String msg) {
        if (!this.c.getPlayer().hasSummon()) {
            this.playerSummonHint(true);
        }
        this.c.getSession().write((Object)UIPacket.summonMessage(msg));
    }

    public final void summonMsg(int type) {
        if (!this.c.getPlayer().hasSummon()) {
            this.playerSummonHint(true);
        }
        this.c.getSession().write((Object)UIPacket.summonMessage(type));
    }

    public final void HSText(String msg) {
        this.c.getSession().write((Object)MaplePacketCreator.HSText(msg));
    }

    public final void showInstruction(String msg, int width, int height) {
        this.c.getSession().write((Object)MaplePacketCreator.sendHint(msg, width, height));
    }

    public final void playerSummonHint(boolean summon) {
        this.c.getPlayer().setHasSummon(summon);
        this.c.getSession().write((Object)UIPacket.summonHelper(summon));
    }

    public final String getInfoQuest(int id) {
        return this.c.getPlayer().getInfoQuest(id);
    }

    public final void updateInfoQuest(int id, String data) {
        this.c.getPlayer().updateInfoQuest(id, data);
    }

    public final boolean getEvanIntroState(String data) {
        return this.getInfoQuest(22013).equals(data);
    }

    public final void updateEvanIntroState(String data) {
        this.updateInfoQuest(22013, data);
    }

    public final void Aran_Start() {
        this.c.getSession().write((Object)UIPacket.Aran_Start());
    }

    public final void evanTutorial(String data, int v1) {
        this.c.getSession().write((Object)MaplePacketCreator.getEvanTutorial(data));
    }

    public final void AranTutInstructionalBubble(String data) {
        this.c.getSession().write((Object)UIPacket.AranTutInstructionalBalloon(data));
    }

    public final void ShowWZEffect(String data) {
        this.c.getSession().write((Object)UIPacket.AranTutInstructionalBalloon(data));
    }

    public final void showWZEffect(String data) {
        this.c.getSession().write((Object)UIPacket.AranTutInstructionalBalloon(data));
    }

    public final void showWZEffect(String data, int info) {
        this.c.getSession().write((Object)UIPacket.ShowWZEffect(data, info));
    }

    public final void EarnTitleMsg(String data) {
        this.c.getSession().write((Object)UIPacket.EarnTitleMsg(data));
    }

    public final void MovieClipIntroUI(boolean enabled) {
        this.c.getSession().write((Object)UIPacket.IntroDisableUI(enabled));
        this.c.getSession().write((Object)UIPacket.IntroLock(enabled));
    }

    public MapleInventoryType getInvType(int i) {
        return MapleInventoryType.getByType((byte)i);
    }

    public String getItemName(int id) {
        return MapleItemInformationProvider.getInstance().getName(id);
    }

    public void gainPet(int id, String name, int level, int closeness, int fullness, long period) {
        if (id > 5001000 || id < 5000000) {
            id = 5000000;
        }
        if (level > 30) {
            level = 30;
        }
        if (closeness > 30000) {
            closeness = 30000;
        }
        if (fullness > 100) {
            fullness = 100;
        }
        try {
            MapleInventoryManipulator.addById(this.c, id, (short)1, "", MaplePet.createPet(id, name, level, closeness, fullness, MapleInventoryIdentifier.getInstance(), id == 5000054 ? 1 : 0), period, (byte)0);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
        }
    }

    public void removeSlot(int invType, byte slot, short quantity) {
        MapleInventoryManipulator.removeFromSlot(this.c, this.getInvType(invType), slot, quantity, true);
    }

    public void addFromDrop(MapleClient c, IItem item) {
        MapleInventoryManipulator.addFromDrop(c, item, true);
    }

    public void gainGP(int gp) {
        if (this.getPlayer().getGuildId() <= 0) {
            return;
        }
        World.Guild.gainGP(this.getPlayer().getGuildId(), gp);
    }

    public int getGP() {
        if (this.getPlayer().getGuildId() <= 0) {
            return 0;
        }
        return World.Guild.getGP(this.getPlayer().getGuildId());
    }

    public void showMapEffect(String path) {
        this.getClient().getSession().write((Object)UIPacket.MapEff(path));
    }

    public int itemQuantity(int itemid) {
        return this.getPlayer().itemQuantity(itemid);
    }

    public EventInstanceManager getDisconnected(String event) {
        EventManager em = this.getEventManager(event);
        if (em == null) {
            return null;
        }
        for (EventInstanceManager eim : em.getInstances()) {
            if (!eim.isDisconnected(this.c.getPlayer()) || eim.getPlayerCount() <= 0) continue;
            return eim;
        }
        return null;
    }

    public EventInstanceManager getDisconnecteda(String event, int map) {
        EventManager em = this.getEventManager(event);
        if (em == null) {
            return null;
        }
        for (EventInstanceManager eim : em.getInstances()) {
            if (!eim.isDisconnected(this.c.getPlayer()) || eim.getPlayerCount() <= 0 || this.getPlayerCount(105100300) > 0) continue;
            return eim;
        }
        return null;
    }

    public boolean isAllReactorState(int reactorId, int state) {
        boolean ret = false;
        for (MapleReactor r : this.getMap().getAllReactorsThreadsafe()) {
            if (r.getReactorId() != reactorId) continue;
            ret = r.getState() == state;
        }
        return ret;
    }

    public long getCurrentTime() {
        return System.currentTimeMillis();
    }

    public void spawnMonster(int id) {
        this.spawnMonster(id, 1, new Point(this.getPlayer().getPosition()));
    }

    public void spawnMonster(int id, int x, int y) {
        this.spawnMonster(id, 1, new Point(x, y));
    }

    public void spawnMonster(int id, int qty, int x, int y) {
        this.spawnMonster(id, qty, new Point(x, y));
    }

    public void spawnMonster(int id, int qty, Point pos) {
        for (int i = 0; i < qty; ++i) {
            this.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(id), pos);
        }
    }

    public void sendNPCText(String text, int npc) {
        this.getMap().broadcastMessage(MaplePacketCreator.getNPCTalk(npc, (byte)0, text, "00 00", (byte)0));
    }

    public boolean getTempFlag(int flag) {
        return (this.c.getChannelServer().getTempFlag() & flag) == flag;
    }

    public int getGamePoints() {
        return this.c.getPlayer().getGamePoints();
    }

    public void gainGamePoints(int amount) {
        this.c.getPlayer().gainGamePoints(amount);
    }

    public void resetGamePoints() {
        this.c.getPlayer().resetGamePoints();
    }

    public int getGamePointsPD() {
        return this.c.getPlayer().getGamePointsPD();
    }

    public void gainGamePointsPD(int amount) {
        this.c.getPlayer().gainGamePointsPD(amount);
    }

    public void resetGamePointsPD() {
        this.c.getPlayer().resetGamePointsPD();
    }

    public int getPS() {
        return this.c.getPlayer().getGamePointsPS();
    }

    public void gainPS(int amount) {
        this.c.getPlayer().gainGamePointsPS(amount);
    }

    public void resetPS() {
        this.c.getPlayer().resetGamePointsPS();
    }

    public boolean beibao(int A) {
        if (this.c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNextFreeSlot() > -1 && A == 1) {
            return true;
        }
        if (this.c.getPlayer().getInventory(MapleInventoryType.USE).getNextFreeSlot() > -1 && A == 2) {
            return true;
        }
        if (this.c.getPlayer().getInventory(MapleInventoryType.SETUP).getNextFreeSlot() > -1 && A == 3) {
            return true;
        }
        if (this.c.getPlayer().getInventory(MapleInventoryType.ETC).getNextFreeSlot() > -1 && A == 4) {
            return true;
        }
        return this.c.getPlayer().getInventory(MapleInventoryType.CASH).getNextFreeSlot() > -1 && A == 5;
    }

    public boolean beibao(int A, int kw) {
        if (this.c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNextFreeSlot() > kw && A == 1) {
            return true;
        }
        if (this.c.getPlayer().getInventory(MapleInventoryType.USE).getNextFreeSlot() > kw && A == 2) {
            return true;
        }
        if (this.c.getPlayer().getInventory(MapleInventoryType.SETUP).getNextFreeSlot() > kw && A == 3) {
            return true;
        }
        if (this.c.getPlayer().getInventory(MapleInventoryType.ETC).getNextFreeSlot() > kw && A == 4) {
            return true;
        }
        return this.c.getPlayer().getInventory(MapleInventoryType.CASH).getNextFreeSlot() > kw && A == 5;
    }

    public final void givePartybossbog(int bossid) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.getPlayer().setbosslog(bossid);
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null) continue;
            curChar.setbosslog(bossid);
        }
    }

    public int getFishingJF() {
        return this.c.getPlayer().getFishingJF(1);
    }

    public void gainFishingJF(int amount) {
        this.c.getPlayer().gainFishingJF(amount);
    }

    public void addFishingJF(int amount) {
        this.c.getPlayer().addFishingJF(amount);
    }

    public void openWeb(String web) {
        this.c.getSession().write((Object)MaplePacketCreator.openWeb(web));
    }

    public int getskillzq() {
        return this.c.getPlayer().getskillzq();
    }

    public void setskillzq(int amount) {
        this.c.getPlayer().setskillzq(amount);
    }

    public int getscjs() {
        return this.c.getPlayer().getskillzq();
    }

    public int getSJRW() {
        return this.c.getPlayer().getSJRW();
    }

    public void gainSJRW(int amount) {
        this.c.getPlayer().gainSJRW(amount);
    }

    public void resetSJRW() {
        this.c.getPlayer().resetSJRW();
    }

    public int getFBRW() {
        return this.c.getPlayer().getFBRW();
    }

    public void gainFBRW(int amount) {
        this.c.getPlayer().gainFBRW(amount);
    }

    public void resetFBRW() {
        this.c.getPlayer().resetFBRW();
    }

    public int getFBRWA() {
        return this.c.getPlayer().getFBRWA();
    }

    public void gainFBRWA(int amount) {
        this.c.getPlayer().gainFBRWA(amount);
    }

    public void resetFBRWA() {
        this.c.getPlayer().resetFBRWA();
    }

    public int getSGRW() {
        return this.c.getPlayer().getSGRW();
    }

    public void gainSGRW(int amount) {
        this.c.getPlayer().gainSGRW(amount);
    }

    public void resetSGRW() {
        this.c.getPlayer().resetSGRW();
    }

    public int getSGRWA() {
        return this.c.getPlayer().getSGRWA();
    }

    public void gainSGRWA(int amount) {
        this.c.getPlayer().gainSGRWA(amount);
    }

    public void resetSGRWA() {
        this.c.getPlayer().resetSGRWA();
    }

    public int getSBOSSRW() {
        return this.c.getPlayer().getSBOSSRW();
    }

    public void gainSBOSSRW(int amount) {
        this.c.getPlayer().gainSBOSSRW(amount);
    }

    public void resetSBOSSRW() {
        this.c.getPlayer().resetSBOSSRW();
    }

    public int getSBOSSRWA() {
        return this.c.getPlayer().getSBOSSRWA();
    }

    public void gainSBOSSRWA(int amount) {
        this.c.getPlayer().gainSBOSSRWA(amount);
    }

    public void resetSBOSSRWA() {
        this.c.getPlayer().resetSBOSSRWA();
    }

    public int getlb() {
        return this.c.getPlayer().getlb();
    }

    public void gainlb(int amount) {
        this.c.getPlayer().gainlb(amount);
    }

    public void resetlb() {
        this.c.getPlayer().resetlb();
    }

    public int getvip() {
        return this.c.getPlayer().getvip();
    }

    public void gainvip(int amount) {
        this.c.getPlayer().gainvip(amount);
    }

    public void setvip(int s) {
        this.c.getPlayer().setvip(s);
    }
}

