/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import server.movement.AbstractLifeMovement;
import tools.data.output.LittleEndianWriter;

public class BounceMovement
extends AbstractLifeMovement {
    private int unk;
    private int fh;

    public BounceMovement(int type, Point position, int duration, int newstate) {
        super(type, position, duration, newstate);
    }

    public int getUnk() {
        return this.unk;
    }

    public void setUnk(int unk) {
        this.unk = unk;
    }

    public int getFH() {
        return this.fh;
    }

    public void setFH(int fh) {
        this.fh = fh;
    }

    @Override
    public void serialize(LittleEndianWriter lew) {
        lew.write(this.getType());
        lew.writePos(this.getPosition());
        lew.writeShort(this.getUnk());
        lew.writeShort(this.getFH());
        lew.write(this.getNewstate());
        lew.writeShort(this.getDuration());
    }
}

