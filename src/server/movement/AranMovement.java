/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import server.movement.AbstractLifeMovement;
import tools.data.output.LittleEndianWriter;

public class AranMovement
extends AbstractLifeMovement {
    public AranMovement(int type, Point position, int duration, int newstate) {
        super(type, position, duration, newstate);
    }

    @Override
    public void serialize(LittleEndianWriter lew) {
        lew.write(this.getType());
        lew.write(this.getNewstate());
        lew.writeShort(this.getDuration());
    }
}

