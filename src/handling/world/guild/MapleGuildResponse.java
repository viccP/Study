/*
 * Decompiled with CFR 0.148.
 */
package handling.world.guild;

import handling.MaplePacket;
import tools.MaplePacketCreator;

public enum MapleGuildResponse {
    NOT_IN_CHANNEL(42),
    ALREADY_IN_GUILD(40),
    NOT_IN_GUILD(45);

    private int value;

    private MapleGuildResponse(int val) {
        this.value = val;
    }

    public int getValue() {
        return this.value;
    }

    public MaplePacket getPacket() {
        return MaplePacketCreator.genericGuildMessage((byte)this.value);
    }
}

