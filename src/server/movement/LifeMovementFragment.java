/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import tools.data.output.LittleEndianWriter;

public interface LifeMovementFragment {
    public void serialize(LittleEndianWriter var1);

    public Point getPosition();
}

