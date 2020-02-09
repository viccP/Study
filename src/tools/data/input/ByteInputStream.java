/*
 * Decompiled with CFR 0.148.
 */
package tools.data.input;

public interface ByteInputStream {
    public int readByte();

    public long getBytesRead();

    public long available();

    public String toString(boolean var1);
}

