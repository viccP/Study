/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import server.movement.AbstractLifeMovement;
import tools.data.output.LittleEndianWriter;

public class JumpDownMovement
extends AbstractLifeMovement {
    private Point pixelsPerSecond;
    private Point offset;
    private int unk;
    private int fh;

    public JumpDownMovement(int type, Point position, int duration, int newstate) {
        super(type, position, duration, newstate);
    }

    public Point getPixelsPerSecond() {
        return this.pixelsPerSecond;
    }

    public void setPixelsPerSecond(Point wobble) {
        this.pixelsPerSecond = wobble;
    }

    public Point getOffset() {
        return this.offset;
    }

    public void setOffset(Point wobble) {
        this.offset = wobble;
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
        lew.writePos(this.pixelsPerSecond);
        lew.writeShort(this.unk);
        lew.writeShort(this.fh);
        lew.write(this.getNewstate());
        lew.writeShort(this.getDuration());
    }
}

