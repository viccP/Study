/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import client.PlayerStats;
import client.anticheat.CheatTracker;
import client.anticheat.CheatingOffense;
import client.inventory.IItem;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import constants.GameConstants;
import handling.MaplePacket;
import handling.channel.ChannelServer;
import handling.channel.PlayerStorage;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.geom.Point2D;
import java.io.PrintStream;
import java.util.List;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import scripting.NPCScriptManager;
import scripting.ReactorScriptManager;
import server.CashShop;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.events.MapleCoconut;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.maps.MapleDoor;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleReactor;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.SeekableLittleEndianAccessor;

public class PlayersHandler {
    public static void Note(SeekableLittleEndianAccessor slea, MapleCharacter chr) {
        byte type = slea.readByte();
        switch (type) {
            case 0: {
                String name = slea.readMapleAsciiString();
                String msg = slea.readMapleAsciiString();
                boolean fame = slea.readByte() > 0;
                slea.readInt();
                IItem itemz = chr.getCashInventory().findByCashId((int)slea.readLong());
                if (itemz == null || !itemz.getGiftFrom().equalsIgnoreCase(name) || !chr.getCashInventory().canSendNote(itemz.getUniqueId())) {
                    return;
                }
                try {
                    chr.sendNote(name, msg, fame ? 1 : 0);
                    chr.getCashInventory().sendedNote(itemz.getUniqueId());
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            }
            case 1: {
                int num = slea.readByte();
                slea.readByte();
                byte \u4eba\u6c142 = slea.readByte();
                for (int i = 0; i < num; ++i) {
                    int id = slea.readInt();
                    chr.deleteNote(id, \u4eba\u6c142 > 0 ? \u4eba\u6c142 : (byte)0);
                }
                break;
            }
            default: {
                System.out.println("Unhandled note action, " + type + "");
            }
        }
    }

    public static void GiveFame(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int who = slea.readInt();
        byte mode = slea.readByte();
        int famechange = mode == 0 ? -1 : 1;
        MapleCharacter target = (MapleCharacter)chr.getMap().getMapObject(who, MapleMapObjectType.PLAYER);
        if (target == chr) {
            chr.getCheatTracker().registerOffense(CheatingOffense.FAMING_SELF);
            return;
        }
        if (chr.getLevel() < 15) {
            chr.getCheatTracker().registerOffense(CheatingOffense.FAMING_UNDER_15);
            return;
        }
        switch (chr.canGiveFame(target)) {
            case OK: {
                if (Math.abs(target.getFame() + famechange) <= 30000) {
                    target.addFame(famechange);
                    target.updateSingleStat(MapleStat.FAME, target.getFame());
                }
                if (!chr.isGM()) {
                    chr.hasGivenFame(target);
                }
                c.getSession().write((Object)MaplePacketCreator.giveFameResponse(mode, target.getName(), target.getFame()));
                target.getClient().getSession().write((Object)MaplePacketCreator.receiveFame(mode, chr.getName()));
                break;
            }
            case NOT_TODAY: {
                c.getSession().write((Object)MaplePacketCreator.giveFameErrorResponse(3));
                break;
            }
            case NOT_THIS_MONTH: {
                c.getSession().write((Object)MaplePacketCreator.giveFameErrorResponse(4));
            }
        }
    }

    public static void ChatRoomHandler(SeekableLittleEndianAccessor slea, MapleClient c) {
        NPCScriptManager.getInstance().dispose(c);
        c.getSession().write((Object)MaplePacketCreator.enableActions());
        c.getPlayer().dropMessage(1, "\u89e3\u5361\u5b8c\u6bd5.");
        c.getPlayer().dropMessage(6, "\u5f53\u524d\u65f6\u95f4\u662f" + FileoutputUtil.CurrentReadable_Time() + " GMT+8 | \u7ecf\u9a8c\u500d\u7387 " + (long)(Math.round(c.getPlayer().getEXPMod()) * 100) * Math.round(c.getPlayer().getStat().expBuff / 100.0) + "%, \u7206\u7387 " + (long)(Math.round(c.getPlayer().getDropMod()) * 100) * Math.round(c.getPlayer().getStat().dropBuff / 100.0) + "%, \u91d1\u5e01\u500d\u7387 " + Math.round(c.getPlayer().getStat().mesoBuff / 100.0) * 100L + "%");
        c.getPlayer().dropMessage(6, "\u5f53\u524d\u5145\u503c\uff1a" + c.getPlayer().getHyPay(2) + " \u4eba\u6c11\u5e01 | \u5f53\u524d\u70b9\u52b5\uff1a" + c.getPlayer().getCSPoints(1) + " \u70b9\u52b5");
        c.getPlayer().dropMessage(6, "\u5f53\u524d\u5ef6\u8fdf " + c.getPlayer().getClient().getLatency() + " \u6beb\u79d2");
    }

    public static void UseDoor(SeekableLittleEndianAccessor slea, MapleCharacter chr) {
        int oid = slea.readInt();
        boolean mode = slea.readByte() == 0;
        for (MapleMapObject obj : chr.getMap().getAllDoorsThreadsafe()) {
            MapleDoor door = (MapleDoor)obj;
            if (door.getOwnerId() != oid) continue;
            door.warp(chr, mode);
            break;
        }
    }

    public static void TransformPlayer(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        chr.updateTick(slea.readInt());
        byte slot = (byte)slea.readShort();
        int itemId = slea.readInt();
        String target = slea.readMapleAsciiString().toLowerCase();
        IItem toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        switch (itemId) {
            case 2212000: {
                for (MapleCharacter search_chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                    if (!search_chr.getName().toLowerCase().equals(target)) continue;
                    MapleItemInformationProvider.getInstance().getItemEffect(2210023).applyTo(search_chr);
                    search_chr.dropMessage(6, chr.getName() + " has played a prank on you!");
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short)1, false);
                }
                break;
            }
        }
    }

    public static void HitReactor(SeekableLittleEndianAccessor slea, MapleClient c) {
        int oid = slea.readInt();
        int charPos = slea.readInt();
        short stance = slea.readShort();
        MapleReactor reactor = c.getPlayer().getMap().getReactorByOid(oid);
        if (reactor == null || !reactor.isAlive()) {
            return;
        }
        reactor.hitReactor(charPos, stance, c);
    }

    public static void TouchReactor(SeekableLittleEndianAccessor slea, MapleClient c) {
        int oid = slea.readInt();
        boolean touched = slea.readByte() > 0;
        MapleReactor reactor = c.getPlayer().getMap().getReactorByOid(oid);
        if (!touched || reactor == null || !reactor.isAlive() || reactor.getReactorId() < 6109013 || reactor.getReactorId() > 6109027 || reactor.getTouch() == 0) {
            return;
        }
        if (c.getPlayer().isAdmin()) {
            c.getPlayer().dropMessage(5, "\u53cd\u5e94\u5806\u4fe1\u606f - oid: " + oid + " Touch: " + reactor.getTouch() + " isTimerActive: " + reactor.isTimerActive() + " ReactorType: " + reactor.getReactorType());
        }
        if (reactor.getTouch() == 2) {
            ReactorScriptManager.getInstance().act(c, reactor);
        } else if (reactor.getTouch() == 1 && !reactor.isTimerActive()) {
            if (reactor.getReactorType() == 100) {
                int itemid = GameConstants.getCustomReactItem(reactor.getReactorId(), reactor.getReactItem().getLeft());
                if (c.getPlayer().haveItem(itemid, reactor.getReactItem().getRight())) {
                    if (reactor.getArea().contains(c.getPlayer().getTruePosition())) {
                        MapleInventoryManipulator.removeById(c, GameConstants.getInventoryType(itemid), itemid, reactor.getReactItem().getRight(), true, false);
                        reactor.hitReactor(c);
                    } else {
                        c.getPlayer().dropMessage(5, "\u8ddd\u79bb\u592a\u8fdc\u3002\u8bf7\u9760\u8fd1\u540e\u91cd\u65b0\u5c1d\u8bd5\u3002");
                    }
                } else {
                    c.getPlayer().dropMessage(5, "You don't have the item required.");
                }
            } else {
                reactor.hitReactor(c);
            }
        }
    }

    public static void hitCoconut(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCoconut.MapleCoconuts nut;
        short id = slea.readShort();
        String co = "\u519c\u592b\u7684\u4e50\u8da3";
        MapleCoconut map = (MapleCoconut)c.getChannelServer().getEvent(MapleEventType.Coconut);
        if (map == null || !map.isRunning()) {
            map = (MapleCoconut)c.getChannelServer().getEvent(MapleEventType.CokePlay);
            co = "\u53ef\u4e50\u718a";
            if (map == null || !map.isRunning()) {
                return;
            }
        }
        if ((nut = map.getCoconut(id)) == null || !nut.isHittable()) {
            return;
        }
        if (System.currentTimeMillis() < nut.getHitTime()) {
            return;
        }
        if (nut.getHits() > 2 && Math.random() < 0.4 && !nut.isStopped()) {
            nut.setHittable(false);
            if (Math.random() < 0.01 && map.getStopped() > 0) {
                nut.setStopped(true);
                map.stopCoconut();
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.hitCoconut(false, id, 1));
                return;
            }
            nut.resetHits();
            if (Math.random() < 0.05 && map.getBombings() > 0) {
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.hitCoconut(false, id, 2));
                map.bombCoconut();
            } else if (map.getFalling() > 0) {
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.hitCoconut(false, id, 3));
                map.fallCoconut();
                if (c.getPlayer().getTeam() == 0) {
                    map.addMapleScore();
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(5, c.getPlayer().getName() + " of Team Maple knocks down a " + co + "."));
                } else {
                    map.addStoryScore();
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(5, c.getPlayer().getName() + " of Team Story knocks down a " + co + "."));
                }
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.coconutScore(map.getCoconutScore()));
            }
        } else {
            nut.hit();
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.hitCoconut(false, id, 1));
        }
    }

    public static void FollowRequest(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter tt = c.getPlayer().getMap().getCharacterById(slea.readInt());
        if (slea.readByte() > 0) {
            tt = c.getPlayer().getMap().getCharacterById(c.getPlayer().getFollowId());
            if (tt != null && tt.getFollowId() == c.getPlayer().getId()) {
                tt.setFollowOn(true);
                c.getPlayer().setFollowOn(true);
            } else {
                c.getPlayer().checkFollow();
            }
            return;
        }
        if (slea.readByte() > 0) {
            tt = c.getPlayer().getMap().getCharacterById(c.getPlayer().getFollowId());
            if (tt != null && tt.getFollowId() == c.getPlayer().getId() && c.getPlayer().isFollowOn()) {
                c.getPlayer().checkFollow();
            }
            return;
        }
        if (tt != null && tt.getPosition().distanceSq(c.getPlayer().getPosition()) < 10000.0 && tt.getFollowId() == 0 && c.getPlayer().getFollowId() == 0 && tt.getId() != c.getPlayer().getId()) {
            tt.setFollowId(c.getPlayer().getId());
            tt.setFollowOn(false);
            tt.setFollowInitiator(false);
            c.getPlayer().setFollowOn(false);
            c.getPlayer().setFollowInitiator(false);
        } else {
            c.getSession().write((Object)MaplePacketCreator.serverNotice(1, "You are too far away."));
        }
    }

    public static void FollowReply(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().getFollowId() > 0 && c.getPlayer().getFollowId() == slea.readInt()) {
            MapleCharacter tt = c.getPlayer().getMap().getCharacterById(c.getPlayer().getFollowId());
            if (tt != null && tt.getPosition().distanceSq(c.getPlayer().getPosition()) < 10000.0 && tt.getFollowId() == 0 && tt.getId() != c.getPlayer().getId()) {
                boolean accepted;
                boolean bl = accepted = slea.readByte() > 0;
                if (accepted) {
                    tt.setFollowId(c.getPlayer().getId());
                    tt.setFollowOn(true);
                    tt.setFollowInitiator(true);
                    c.getPlayer().setFollowOn(true);
                    c.getPlayer().setFollowInitiator(false);
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.followEffect(tt.getId(), c.getPlayer().getId(), null));
                } else {
                    c.getPlayer().setFollowId(0);
                    tt.setFollowId(0);
                }
            } else {
                if (tt != null) {
                    tt.setFollowId(0);
                    c.getPlayer().setFollowId(0);
                }
                c.getSession().write((Object)MaplePacketCreator.serverNotice(1, "You are too far away."));
            }
        } else {
            c.getPlayer().setFollowId(0);
        }
    }

    public static void RingAction(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte mode = slea.readByte();
        if (mode == 0) {
            String name = slea.readMapleAsciiString();
            int itemid = slea.readInt();
            int newItemId = 1112300 + (itemid - 2240004);
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(name);
            int errcode = 0;
            if (c.getPlayer().getMarriageId() > 0) {
                errcode = 23;
            } else if (chr == null) {
                errcode = 18;
            } else if (chr.getMapId() != c.getPlayer().getMapId()) {
                errcode = 19;
            } else if (!c.getPlayer().haveItem(itemid, 1) || itemid < 2240004 || itemid > 2240015) {
                errcode = 13;
            } else if (chr.getMarriageId() > 0 || chr.getMarriageItemId() > 0) {
                errcode = 24;
            } else if (!MapleInventoryManipulator.checkSpace(c, newItemId, 1, "")) {
                errcode = 20;
            } else if (!MapleInventoryManipulator.checkSpace(chr.getClient(), newItemId, 1, "")) {
                errcode = 21;
            }
            if (errcode > 0) {
                c.getSession().write((Object)MaplePacketCreator.sendEngagement((byte)errcode, 0, null, null));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            c.getPlayer().setMarriageItemId(itemid);
            chr.getClient().getSession().write((Object)MaplePacketCreator.sendEngagementRequest(c.getPlayer().getName(), c.getPlayer().getId()));
        } else if (mode == 1) {
            c.getPlayer().setMarriageItemId(0);
        } else if (mode == 2) {
            boolean accepted = slea.readByte() > 0;
            String name = slea.readMapleAsciiString();
            int id = slea.readInt();
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(name);
            if (c.getPlayer().getMarriageId() > 0 || chr == null || chr.getId() != id || chr.getMarriageItemId() <= 0 || !chr.haveItem(chr.getMarriageItemId(), 1) || chr.getMarriageId() > 0) {
                c.getSession().write((Object)MaplePacketCreator.sendEngagement((byte)29, 0, null, null));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            if (accepted) {
                int newItemId = 1112300 + (chr.getMarriageItemId() - 2240004);
                if (!MapleInventoryManipulator.checkSpace(c, newItemId, 1, "") || !MapleInventoryManipulator.checkSpace(chr.getClient(), newItemId, 1, "")) {
                    c.getSession().write((Object)MaplePacketCreator.sendEngagement((byte)21, 0, null, null));
                    c.getSession().write((Object)MaplePacketCreator.enableActions());
                    return;
                }
                MapleInventoryManipulator.addById(c, newItemId, (short)1, (byte)0);
                MapleInventoryManipulator.removeById(chr.getClient(), MapleInventoryType.USE, chr.getMarriageItemId(), 1, false, false);
                MapleInventoryManipulator.addById(chr.getClient(), newItemId, (short)1, (byte)0);
                chr.getClient().getSession().write((Object)MaplePacketCreator.sendEngagement((byte)16, newItemId, chr, c.getPlayer()));
                chr.setMarriageId(c.getPlayer().getId());
                c.getPlayer().setMarriageId(chr.getId());
            } else {
                chr.getClient().getSession().write((Object)MaplePacketCreator.sendEngagement((byte)30, 0, null, null));
            }
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            chr.setMarriageItemId(0);
        } else if (mode == 3) {
            int itemId = slea.readInt();
            MapleInventoryType type = GameConstants.getInventoryType(itemId);
            IItem item = c.getPlayer().getInventory(type).findById(itemId);
            if (item != null && type == MapleInventoryType.ETC && itemId / 10000 == 421) {
                MapleInventoryManipulator.drop(c, type, item.getPosition(), item.getQuantity());
            }
        }
    }

    public static void UpdateCharInfo(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        byte type = slea.readByte();
        if (type == 0) {
            String charmessage = slea.readMapleAsciiString();
            c.getPlayer().setcharmessage(charmessage);
        } else if (type == 1) {
            byte expression = slea.readByte();
            c.getPlayer().setexpression(expression);
        } else if (type == 2) {
            byte blood = slea.readByte();
            byte month = slea.readByte();
            byte day = slea.readByte();
            byte constellation = slea.readByte();
            c.getPlayer().setblood(blood);
            c.getPlayer().setmonth(month);
            c.getPlayer().setday(day);
            c.getPlayer().setconstellation(constellation);
        }
    }

}

