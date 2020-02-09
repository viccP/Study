/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import server.movement.LifeMovementFragment;

public interface LifeMovement
extends LifeMovementFragment {
    @Override
    public Point getPosition();

    public int getNewstate();

    public int getDuration();

    public int getType();
}

