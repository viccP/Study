/*
 * Decompiled with CFR 0.148.
 */
package tools.data.output;

import java.io.ByteArrayOutputStream;

import handling.ByteArrayMaplePacket;
import handling.MaplePacket;
import tools.HexTool;

public class MaplePacketLittleEndianWriter
extends GenericLittleEndianWriter {
    private final ByteArrayOutputStream baos;

    public MaplePacketLittleEndianWriter() {
        this(32);
    }

    public MaplePacketLittleEndianWriter(int size) {
        this.baos = new ByteArrayOutputStream(size);
        this.setByteOutputStream(new BAOSByteOutputStream(this.baos));
    }

    public final MaplePacket getPacket() {
        return new ByteArrayMaplePacket(this.baos.toByteArray());
    }

    public final String toString() {
        return HexTool.toString(this.baos.toByteArray());
    }
}

