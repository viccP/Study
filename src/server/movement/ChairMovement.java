/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import server.movement.AbstractLifeMovement;
import tools.data.output.LittleEndianWriter;

public class ChairMovement
extends AbstractLifeMovement {
    private int unk;

    public ChairMovement(int type, Point position, int duration, int newstate) {
        super(type, position, duration, newstate);
    }

    public int getUnk() {
        return this.unk;
    }

    public void setUnk(int unk) {
        this.unk = unk;
    }

    @Override
    public void serialize(LittleEndianWriter lew) {
        lew.write(this.getType());
        lew.writeShort(this.getPosition().x);
        lew.writeShort(this.getPosition().y);
        lew.writeShort(this.unk);
        lew.write(this.getNewstate());
        lew.writeShort(this.getDuration());
    }
}

