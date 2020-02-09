/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package server.maps;

import client.MapleClient;
import handling.MaplePacket;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import tools.MaplePacketCreator;
import tools.packet.MTSCSPacket;

public class MapleMapEffect {
    private String msg = "";
    private int itemId = 0;
    private boolean active = true;
    private boolean jukebox = false;

    public MapleMapEffect(String msg, int itemId) {
        this.msg = msg;
        this.itemId = itemId;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setJukebox(boolean actie) {
        this.jukebox = actie;
    }

    public boolean isJukebox() {
        return this.jukebox;
    }

    public MaplePacket makeDestroyData() {
        return this.jukebox ? MTSCSPacket.playCashSong(0, "") : MaplePacketCreator.removeMapEffect();
    }

    public MaplePacket makeStartData() {
        return this.jukebox ? MTSCSPacket.playCashSong(this.itemId, this.msg) : MaplePacketCreator.startMapEffect(this.msg, this.itemId, this.active);
    }

    public void sendStartData(MapleClient c) {
        c.getSession().write((Object)this.makeStartData());
    }
}

