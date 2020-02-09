/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import server.movement.LifeMovement;

public abstract class AbstractLifeMovement
implements LifeMovement {
    private Point position;
    private int duration;
    private int newstate;
    private int type;

    public AbstractLifeMovement(int type, Point position, int duration, int newstate) {
        this.type = type;
        this.position = position;
        this.duration = duration;
        this.newstate = newstate;
    }

    @Override
    public int getType() {
        return this.type;
    }

    @Override
    public int getDuration() {
        return this.duration;
    }

    @Override
    public int getNewstate() {
        return this.newstate;
    }

    @Override
    public Point getPosition() {
        return this.position;
    }
}

