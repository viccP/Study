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
import java.awt.Point;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.maps.AbstractAnimatedMapleMapObject;
import server.maps.MapleMapObjectType;
import tools.MaplePacketCreator;

public class MapleDragon
extends AbstractAnimatedMapleMapObject {
    private int owner;
    private int jobid;

    public MapleDragon(MapleCharacter owner) {
        this.owner = owner.getId();
        this.jobid = owner.getJob();
        if (this.jobid < 2200 || this.jobid > 2218) {
            throw new RuntimeException("Trying to create a dragon for a non-Evan");
        }
        this.setPosition(owner.getPosition());
        this.setStance(4);
    }

    @Override
    public void sendSpawnData(MapleClient client) {
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write((Object)MaplePacketCreator.removeDragon(this.owner));
    }

    public int getOwner() {
        return this.owner;
    }

    public int getJobId() {
        return this.jobid;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.SUMMON;
    }
}

