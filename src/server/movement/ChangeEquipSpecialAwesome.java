/*
 * Decompiled with CFR 0.148.
 */
package server.movement;

import java.awt.Point;
import server.movement.LifeMovementFragment;
import tools.data.output.LittleEndianWriter;

public class ChangeEquipSpecialAwesome
implements LifeMovementFragment {
    private int type;
    private int wui;

    public ChangeEquipSpecialAwesome(int type, int wui) {
        this.type = type;
        this.wui = wui;
    }

    @Override
    public void serialize(LittleEndianWriter lew) {
        lew.write(this.type);
        lew.write(this.wui);
    }

    @Override
    public Point getPosition() {
        return new Point(0, 0);
    }
}

