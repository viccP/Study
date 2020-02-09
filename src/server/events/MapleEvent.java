/*
 * Decompiled with CFR 0.148.
 */
package server.events;

import client.MapleCharacter;
import client.MapleClient;
import handling.MaplePacket;
import handling.channel.ChannelServer;
import handling.world.World;
import java.util.concurrent.ScheduledFuture;
import server.MapleInventoryManipulator;
import server.MaplePortal;
import server.RandomRewards;
import server.Timer;
import server.events.MapleEventType;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.SavedLocationType;
import tools.MaplePacketCreator;

public abstract class MapleEvent {
    protected int[] mapid;
    protected int channel;
    private boolean isRunning = false;

    public MapleEvent(int channel, int[] mapid) {
        this.channel = channel;
        this.mapid = mapid;
    }

    public boolean isRunning() {
        return this.isIsRunning();
    }

    public MapleMap getMap(int i) {
        return this.getChannelServer().getMapFactory().getMap(this.mapid[i]);
    }

    public ChannelServer getChannelServer() {
        return ChannelServer.getInstance(this.channel);
    }

    public void broadcast(MaplePacket packet) {
        for (int i = 0; i < this.mapid.length; ++i) {
            this.getMap(i).broadcastMessage(packet);
        }
    }

    public void givePrize(MapleCharacter chr) {
        int reward = RandomRewards.getInstance().getEventReward();
        if (reward == 0) {
            chr.gainMeso(10000, true, false, false);
            chr.dropMessage(5, "\u4f60\u83b7\u5f97 10000 \u5192\u9669\u5e01");
        } else if (reward == 1) {
            chr.gainMeso(10000, true, false, false);
            chr.dropMessage(5, "\u4f60\u83b7\u5f97 10000 \u5192\u9669\u5e01");
        } else if (reward == 2) {
            chr.modifyCSPoints(1, 200, false);
            chr.dropMessage(5, "\u4f60\u83b7\u5f97 200 \u62b5\u7528");
        } else if (reward == 3) {
            chr.addFame(2);
            chr.dropMessage(5, "\u4f60\u83b7\u5f97 2 \u4eba\u6c14");
        }
        if (MapleInventoryManipulator.checkSpace(chr.getClient(), 4032226, 1, "")) {
            MapleInventoryManipulator.addById(chr.getClient(), 4032226, (short)1, (byte)0);
            chr.dropMessage(5, "\u4f60\u83b7\u5f97\u5956\u52b1\uff01");
        } else {
            chr.gainMeso(100000, true, false, false);
            chr.dropMessage(5, "\u7531\u4e8e\u4f60\u80cc\u5305\u6ee1\u4e86\u3002\u6240\u4ee5\u53ea\u80fd\u7ed9\u4e88\u4f60\u5192\u9669\u5e01\uff01");
        }
    }

    public void finished(MapleCharacter chr) {
    }

    public void onMapLoad(MapleCharacter chr) {
    }

    public void startEvent() {
    }

    public void warpBack(MapleCharacter chr) {
        int map = chr.getSavedLocation(SavedLocationType.EVENT);
        if (map <= -1) {
            map = 104000000;
        }
        MapleMap mapp = chr.getClient().getChannelServer().getMapFactory().getMap(map);
        chr.changeMap(mapp, mapp.getPortal(0));
    }

    public void reset() {
        this.setIsRunning(true);
    }

    public void unreset() {
        this.setIsRunning(false);
    }

    public static final void setEvent(ChannelServer cserv, boolean auto) {
        if (auto) {
            block0: for (MapleEventType t : MapleEventType.values()) {
                final MapleEvent e = cserv.getEvent(t);
                if (!e.isIsRunning()) continue;
                for (int i : e.mapid) {
                    if (cserv.getEvent() != i) continue;
                    e.broadcast(MaplePacketCreator.serverNotice(0, "\u8ddd\u96e2\u6d3b\u52d5\u958b\u59cb\u53ea\u5269\u4e00\u5206\u9418!"));
                    e.broadcast(MaplePacketCreator.getClock(60));
                    Timer.EventTimer.getInstance().schedule(new Runnable(){

                        @Override
                        public void run() {
                            e.startEvent();
                        }
                    }, 60000L);
                    continue block0;
                }
            }
        }
        cserv.setEvent(-1);
    }

    public static final void mapLoad(MapleCharacter chr, int channel) {
        if (chr == null) {
            return;
        }
        for (MapleEventType t : MapleEventType.values()) {
            try {
                MapleEvent e = ChannelServer.getInstance(channel).getEvent(t);
                if (!e.isIsRunning()) continue;
                if (chr.getMapId() == 109050000) {
                    e.finished(chr);
                }
                for (int i : e.mapid) {
                    if (chr.getMapId() != i) continue;
                    e.onMapLoad(chr);
                }
            }
            catch (Exception e) {
                // empty catch block
            }
        }
    }

    public static final void onStartEvent(MapleCharacter chr) {
        for (MapleEventType t : MapleEventType.values()) {
            MapleEvent e = chr.getClient().getChannelServer().getEvent(t);
            if (!e.isIsRunning()) continue;
            for (int i : e.mapid) {
                if (chr.getMapId() != i) continue;
                e.startEvent();
                chr.dropMessage(5, String.valueOf((Object)t) + " \u6d3b\u52d5\u958b\u59cb");
            }
        }
    }

    public static final String scheduleEvent(MapleEventType event, ChannelServer cserv) {
        if (cserv.getEvent() != -1 || cserv.getEvent(event) == null) {
            return "\u8a72\u6d3b\u52d5\u5df2\u7d93\u88ab\u7981\u6b62\u5b89\u6392\u4e86.";
        }
        for (int i : cserv.getEvent((MapleEventType)event).mapid) {
            if (cserv.getMapFactory().getMap(i).getCharactersSize() <= 0) continue;
            return "\u8a72\u6d3b\u52d5\u5df2\u7d93\u5728\u57f7\u884c\u4e2d.";
        }
        cserv.setEvent(cserv.getEvent((MapleEventType)event).mapid[0]);
        cserv.getEvent(event).reset();
        World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, "\u6d3b\u52a8 " + String.valueOf((Object)event) + " \u5373\u5c06\u5728\u9891\u9053 " + cserv.getChannel() + " \u4e3e\u884c , \u8981\u53c2\u52a0\u7684\u73a9\u5bb6\u8bf7\u5230\u9891\u9053 " + cserv.getChannel() + ".3\u5206\u949f\u5185\u70b9\u51fb\u62cd\u5356-\u57ce\u9547\u6d3b\u52a8\u4f20\u9001-\u7cfb\u7edf\u6d3b\u52a8\u4f20\u9001\u8fdb\u5165\uff01").getBytes());
        World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, "\u6d3b\u52a8 " + String.valueOf((Object)event) + " \u5373\u5c06\u5728\u9891\u9053 " + cserv.getChannel() + " \u4e3e\u884c , \u8981\u53c2\u52a0\u7684\u73a9\u5bb6\u8bf7\u5230\u9891\u9053 " + cserv.getChannel() + ".3\u5206\u949f\u5185\u70b9\u51fb\u62cd\u5356-\u57ce\u9547\u6d3b\u52a8\u4f20\u9001-\u7cfb\u7edf\u6d3b\u52a8\u4f20\u9001\u8fdb\u5165\uff01").getBytes());
        World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, "\u6d3b\u52a8 " + String.valueOf((Object)event) + " \u5373\u5c06\u5728\u9891\u9053 " + cserv.getChannel() + " \u4e3e\u884c , \u8981\u53c2\u52a0\u7684\u73a9\u5bb6\u8bf7\u5230\u9891\u9053 " + cserv.getChannel() + ".3\u5206\u949f\u5185\u70b9\u51fb\u62cd\u5356-\u57ce\u9547\u6d3b\u52a8\u4f20\u9001-\u7cfb\u7edf\u6d3b\u52a8\u4f20\u9001\u8fdb\u5165\uff01").getBytes());
        return "";
    }

    public boolean isIsRunning() {
        return this.isRunning;
    }

    public void setIsRunning(boolean isRunning) {
        this.isRunning = isRunning;
    }

}

