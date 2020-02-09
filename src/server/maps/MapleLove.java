/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package server.maps;

import client.MapleCharacter;
import client.MapleClient;
import handling.MaplePacket;
import java.awt.Point;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.maps.AbstractMapleMapObject;
import server.maps.MapleMapObjectType;
import tools.MaplePacketCreator;

public class MapleLove
extends AbstractMapleMapObject {
    private Point pos;
    private MapleCharacter owner;
    private String text;
    private int ft;
    private int itemid;

    public MapleLove(MapleCharacter owner, Point pos, int ft, String text, int itemid) {
        this.owner = owner;
        this.pos = pos;
        this.text = text;
        this.ft = ft;
        this.itemid = itemid;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.LOVE;
    }

    @Override
    public Point getPosition() {
        return this.pos.getLocation();
    }

    public MapleCharacter getOwner() {
        return this.owner;
    }

    @Override
    public void setPosition(Point position) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write((Object)this.makeDestroyData());
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.getSession().write((Object)this.makeSpawnData());
    }

    public MaplePacket makeSpawnData() {
        return MaplePacketCreator.spawnLove(this.getObjectId(), this.itemid, this.owner.getName(), this.text, this.pos, this.ft);
    }

    public MaplePacket makeDestroyData() {
        return MaplePacketCreator.removeLove(this.getObjectId());
    }
}

