/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.ByteBuffer
 */
package tools.data.output;

import org.apache.mina.common.ByteBuffer;
import tools.data.output.ByteOutputStream;

public class ByteBufferOutputstream
implements ByteOutputStream {
    private ByteBuffer bb;

    public ByteBufferOutputstream(ByteBuffer bb) {
        this.bb = bb;
    }

    @Override
    public void writeByte(byte b) {
        this.bb.put(b);
    }
}

