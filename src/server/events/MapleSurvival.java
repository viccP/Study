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
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.MaplePortal;
import server.Timer;
import server.events.MapleEvent;
import server.maps.MapleMap;
import tools.MaplePacketCreator;

public class MapleSurvival
extends MapleEvent {
    protected long time = 360000L;
    protected long timeStarted = 0L;
    protected ScheduledFuture<?> olaSchedule;

    public MapleSurvival(int channel, int[] mapid) {
        super(channel, mapid);
    }

    @Override
    public void finished(MapleCharacter chr) {
        this.givePrize(chr);
    }

    @Override
    public void onMapLoad(MapleCharacter chr) {
        super.onMapLoad(chr);
        if (this.isTimerStarted()) {
            chr.getClient().getSession().write((Object)MaplePacketCreator.getClock((int)(this.getTimeLeft() / 1000L)));
        }
    }

    @Override
    public void startEvent() {
        this.unreset();
        super.reset();
        this.broadcast(MaplePacketCreator.getClock((int)(this.time / 1000L)));
        this.timeStarted = System.currentTimeMillis();
        this.olaSchedule = Timer.EventTimer.getInstance().schedule(new Runnable(){

            @Override
            public void run() {
                for (int i = 0; i < MapleSurvival.this.mapid.length; ++i) {
                    for (MapleCharacter chr : MapleSurvival.this.getMap(i).getCharactersThreadsafe()) {
                        MapleSurvival.this.warpBack(chr);
                    }
                    MapleSurvival.this.unreset();
                }
            }
        }, this.time);
        this.broadcast(MaplePacketCreator.serverNotice(0, "The portal has now opened. Press the up arrow key at the portal to enter."));
        this.broadcast(MaplePacketCreator.serverNotice(0, "Fall down once, and never get back up again! Get to the top without falling down!"));
    }

    public boolean isTimerStarted() {
        return this.timeStarted > 0L;
    }

    public long getTime() {
        return this.time;
    }

    public void resetSchedule() {
        this.timeStarted = 0L;
        if (this.olaSchedule != null) {
            this.olaSchedule.cancel(false);
        }
        this.olaSchedule = null;
    }

    @Override
    public void reset() {
        super.reset();
        this.resetSchedule();
        this.getMap(0).getPortal("join00").setPortalState(false);
    }

    @Override
    public void unreset() {
        super.unreset();
        this.resetSchedule();
        this.getMap(0).getPortal("join00").setPortalState(true);
    }

    public long getTimeLeft() {
        return this.time - (System.currentTimeMillis() - this.timeStarted);
    }

}

