/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import server.movement.AbstractLifeMovement;
import tools.data.output.LittleEndianWriter;

public class RelativeLifeMovement
extends AbstractLifeMovement {
    public RelativeLifeMovement(int type, Point position, int duration, int newstate) {
        super(type, position, duration, newstate);
    }

    @Override
    public void serialize(LittleEndianWriter lew) {
        lew.write(this.getType());
        lew.writeShort(this.getPosition().x);
        lew.writeShort(this.getPosition().y);
        lew.write(this.getNewstate());
        lew.writeShort(this.getDuration());
    }
}

