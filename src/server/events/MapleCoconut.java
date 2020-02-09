/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package server.events;

import client.MapleCharacter;
import client.MapleClient;
import handling.MaplePacket;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.Timer;
import server.events.MapleEvent;
import server.maps.MapleMap;
import tools.MaplePacketCreator;

public class MapleCoconut
extends MapleEvent {
    private List<MapleCoconuts> coconuts = new LinkedList<MapleCoconuts>();
    private int[] coconutscore = new int[2];
    private int countBombing = 0;
    private int countFalling = 0;
    private int countStopped = 0;

    public MapleCoconut(int channel, int[] mapid) {
        super(channel, mapid);
    }

    @Override
    public void reset() {
        super.reset();
        this.resetCoconutScore();
    }

    @Override
    public void unreset() {
        super.unreset();
        this.resetCoconutScore();
        this.setHittable(false);
    }

    @Override
    public void onMapLoad(MapleCharacter chr) {
        chr.getClient().getSession().write((Object)MaplePacketCreator.coconutScore(this.getCoconutScore()));
    }

    public MapleCoconuts getCoconut(int id) {
        return this.coconuts.get(id);
    }

    public List<MapleCoconuts> getAllCoconuts() {
        return this.coconuts;
    }

    public void setHittable(boolean hittable) {
        for (MapleCoconuts nut : this.coconuts) {
            nut.setHittable(hittable);
        }
    }

    public int getBombings() {
        return this.countBombing;
    }

    public void bombCoconut() {
        --this.countBombing;
    }

    public int getFalling() {
        return this.countFalling;
    }

    public void fallCoconut() {
        --this.countFalling;
    }

    public int getStopped() {
        return this.countStopped;
    }

    public void stopCoconut() {
        --this.countStopped;
    }

    public int[] getCoconutScore() {
        return this.coconutscore;
    }

    public int getMapleScore() {
        return this.coconutscore[0];
    }

    public int getStoryScore() {
        return this.coconutscore[1];
    }

    public void addMapleScore() {
        this.coconutscore[0] = this.coconutscore[0] + 1;
    }

    public void addStoryScore() {
        this.coconutscore[1] = this.coconutscore[1] + 1;
    }

    public void resetCoconutScore() {
        this.coconutscore[0] = 0;
        this.coconutscore[1] = 0;
        this.countBombing = 80;
        this.countFalling = 1001;
        this.countStopped = 20;
        this.coconuts.clear();
        for (int i = 0; i < 506; ++i) {
            this.coconuts.add(new MapleCoconuts());
        }
    }

    @Override
    public void startEvent() {
        this.reset();
        this.setHittable(true);
        this.getMap(0).broadcastMessage(MaplePacketCreator.serverNotice(5, "\u6d3b\u52d5\u958b\u59cb!!"));
        this.getMap(0).broadcastMessage(MaplePacketCreator.hitCoconut(true, 0, 0));
        this.getMap(0).broadcastMessage(MaplePacketCreator.getClock(360));
        Timer.EventTimer.getInstance().schedule(new Runnable(){

            @Override
            public void run() {
                if (MapleCoconut.this.getMapleScore() == MapleCoconut.this.getStoryScore()) {
                    MapleCoconut.this.bonusTime();
                } else if (MapleCoconut.this.getMapleScore() > MapleCoconut.this.getStoryScore()) {
                    for (MapleCharacter chr : MapleCoconut.this.getMap(0).getCharactersThreadsafe()) {
                        if (chr.getCoconutTeam() == 0) {
                            chr.getClient().getSession().write((Object)MaplePacketCreator.showEffect("event/coconut/victory"));
                            chr.getClient().getSession().write((Object)MaplePacketCreator.playSound("Coconut/Victory"));
                            continue;
                        }
                        chr.getClient().getSession().write((Object)MaplePacketCreator.showEffect("event/coconut/lose"));
                        chr.getClient().getSession().write((Object)MaplePacketCreator.playSound("Coconut/Failed"));
                    }
                    MapleCoconut.this.warpOut();
                } else {
                    for (MapleCharacter chr : MapleCoconut.this.getMap(0).getCharactersThreadsafe()) {
                        if (chr.getCoconutTeam() == 1) {
                            chr.getClient().getSession().write((Object)MaplePacketCreator.showEffect("event/coconut/victory"));
                            chr.getClient().getSession().write((Object)MaplePacketCreator.playSound("Coconut/Victory"));
                            continue;
                        }
                        chr.getClient().getSession().write((Object)MaplePacketCreator.showEffect("event/coconut/lose"));
                        chr.getClient().getSession().write((Object)MaplePacketCreator.playSound("Coconut/Failed"));
                    }
                    MapleCoconut.this.warpOut();
                }
            }
        }, 360000L);
    }

    public void bonusTime() {
        this.getMap(0).broadcastMessage(MaplePacketCreator.getClock(120));
        Timer.EventTimer.getInstance().schedule(new Runnable(){

            @Override
            public void run() {
                if (MapleCoconut.this.getMapleScore() == MapleCoconut.this.getStoryScore()) {
                    for (MapleCharacter chr : MapleCoconut.this.getMap(0).getCharactersThreadsafe()) {
                        chr.getClient().getSession().write((Object)MaplePacketCreator.showEffect("event/coconut/lose"));
                        chr.getClient().getSession().write((Object)MaplePacketCreator.playSound("Coconut/Failed"));
                    }
                    MapleCoconut.this.warpOut();
                } else if (MapleCoconut.this.getMapleScore() > MapleCoconut.this.getStoryScore()) {
                    for (MapleCharacter chr : MapleCoconut.this.getMap(0).getCharactersThreadsafe()) {
                        if (chr.getCoconutTeam() == 0) {
                            chr.getClient().getSession().write((Object)MaplePacketCreator.showEffect("event/coconut/victory"));
                            chr.getClient().getSession().write((Object)MaplePacketCreator.playSound("Coconut/Victory"));
                            continue;
                        }
                        chr.getClient().getSession().write((Object)MaplePacketCreator.showEffect("event/coconut/lose"));
                        chr.getClient().getSession().write((Object)MaplePacketCreator.playSound("Coconut/Failed"));
                    }
                    MapleCoconut.this.warpOut();
                } else {
                    for (MapleCharacter chr : MapleCoconut.this.getMap(0).getCharactersThreadsafe()) {
                        if (chr.getCoconutTeam() == 1) {
                            chr.getClient().getSession().write((Object)MaplePacketCreator.showEffect("event/coconut/victory"));
                            chr.getClient().getSession().write((Object)MaplePacketCreator.playSound("Coconut/Victory"));
                            continue;
                        }
                        chr.getClient().getSession().write((Object)MaplePacketCreator.showEffect("event/coconut/lose"));
                        chr.getClient().getSession().write((Object)MaplePacketCreator.playSound("Coconut/Failed"));
                    }
                    MapleCoconut.this.warpOut();
                }
            }
        }, 120000L);
    }

    public void warpOut() {
        this.setHittable(false);
        Timer.EventTimer.getInstance().schedule(new Runnable(){

            @Override
            public void run() {
                for (MapleCharacter chr : MapleCoconut.this.getMap(0).getCharactersThreadsafe()) {
                    if (MapleCoconut.this.getMapleScore() > MapleCoconut.this.getStoryScore() && chr.getCoconutTeam() == 0 || MapleCoconut.this.getStoryScore() > MapleCoconut.this.getMapleScore() && chr.getCoconutTeam() == 1) {
                        MapleCoconut.this.givePrize(chr);
                    }
                    MapleCoconut.this.warpBack(chr);
                }
                MapleCoconut.this.unreset();
            }
        }, 12000L);
    }

    public static class MapleCoconuts {
        private int hits = 0;
        private boolean hittable = false;
        private boolean stopped = false;
        private long hittime = System.currentTimeMillis();

        public void hit() {
            this.hittime = System.currentTimeMillis() + 1000L;
            ++this.hits;
        }

        public int getHits() {
            return this.hits;
        }

        public void resetHits() {
            this.hits = 0;
        }

        public boolean isHittable() {
            return this.hittable;
        }

        public void setHittable(boolean hittable) {
            this.hittable = hittable;
        }

        public boolean isStopped() {
            return this.stopped;
        }

        public void setStopped(boolean stopped) {
            this.stopped = stopped;
        }

        public long getHitTime() {
            return this.hittime;
        }
    }

}

