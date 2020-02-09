/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import server.movement.AbsoluteLifeMovement;
import tools.data.output.LittleEndianWriter;

public class TeleportMovement
extends AbsoluteLifeMovement {
    public TeleportMovement(int type, Point position, int newstate) {
        super(type, position, 0, newstate);
    }

    @Override
    public void serialize(LittleEndianWriter lew) {
        lew.write(this.getType());
        lew.writeShort(this.getPosition().x);
        lew.writeShort(this.getPosition().y);
        lew.writeShort(this.getPixelsPerSecond().x);
        lew.writeShort(this.getPixelsPerSecond().y);
        lew.write(this.getNewstate());
    }
}

