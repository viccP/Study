/*
 * Decompiled with CFR 0.148.
 */
package tools.data.output;

import java.io.ByteArrayOutputStream;
import tools.data.output.ByteOutputStream;

public class BAOSByteOutputStream
implements ByteOutputStream {
    private ByteArrayOutputStream baos;

    public BAOSByteOutputStream(ByteArrayOutputStream baos) {
        this.baos = baos;
    }

    @Override
    public void writeByte(byte b) {
        this.baos.write(b);
    }
}

