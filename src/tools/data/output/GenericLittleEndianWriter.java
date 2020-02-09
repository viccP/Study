/*
 * Decompiled with CFR 0.148.
 */
package tools.data.output;

import java.awt.Point;
import java.nio.charset.Charset;
import tools.data.output.ByteOutputStream;
import tools.data.output.LittleEndianWriter;

public class GenericLittleEndianWriter
implements LittleEndianWriter {
    private static Charset ASCII = Charset.forName("GBK");
    private ByteOutputStream bos;

    protected GenericLittleEndianWriter() {
    }

    protected void setByteOutputStream(ByteOutputStream bos) {
        this.bos = bos;
    }

    public GenericLittleEndianWriter(ByteOutputStream bos) {
        this.bos = bos;
    }

    @Override
    public void writeZeroBytes(int i) {
        for (int x = 0; x < i; ++x) {
            this.bos.writeByte((byte)0);
        }
    }

    @Override
    public void write(byte[] b) {
        for (int x = 0; x < b.length; ++x) {
            this.bos.writeByte(b[x]);
        }
    }

    @Override
    public void write(byte b) {
        this.bos.writeByte(b);
    }

    @Override
    public void write(int b) {
        this.bos.writeByte((byte)b);
    }

    @Override
    public void writeShort(short i) {
        this.bos.writeByte((byte)(i & 0xFF));
        this.bos.writeByte((byte)(i >>> 8 & 0xFF));
    }

    @Override
    public void writeShort(int i) {
        this.bos.writeByte((byte)(i & 0xFF));
        this.bos.writeByte((byte)(i >>> 8 & 0xFF));
    }

    @Override
    public void writeInt(int i) {
        this.bos.writeByte((byte)(i & 0xFF));
        this.bos.writeByte((byte)(i >>> 8 & 0xFF));
        this.bos.writeByte((byte)(i >>> 16 & 0xFF));
        this.bos.writeByte((byte)(i >>> 24 & 0xFF));
    }

    @Override
    public void writeAsciiString(String s) {
        this.write(s.getBytes(ASCII));
    }

    @Override
    public void writeAsciiString(String s, int max) {
        if (s.getBytes(ASCII).length > max) {
            s = s.substring(0, max);
        }
        this.write(s.getBytes(ASCII));
        for (int i = s.getBytes(ASCII).length; i < max; ++i) {
            this.write(0);
        }
    }

    @Override
    public void writeMapleAsciiString(String s) {
        this.writeShort((short)s.getBytes(ASCII).length);
        this.writeAsciiString(s);
    }

    @Override
    public void writePos(Point s) {
        this.writeShort(s.x);
        this.writeShort(s.y);
    }

    @Override
    public void writeLong(long l) {
        this.bos.writeByte((byte)(l & 0xFFL));
        this.bos.writeByte((byte)(l >>> 8 & 0xFFL));
        this.bos.writeByte((byte)(l >>> 16 & 0xFFL));
        this.bos.writeByte((byte)(l >>> 24 & 0xFFL));
        this.bos.writeByte((byte)(l >>> 32 & 0xFFL));
        this.bos.writeByte((byte)(l >>> 40 & 0xFFL));
        this.bos.writeByte((byte)(l >>> 48 & 0xFFL));
        this.bos.writeByte((byte)(l >>> 56 & 0xFFL));
    }
}

