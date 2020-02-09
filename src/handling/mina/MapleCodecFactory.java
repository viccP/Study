/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.filter.codec.ProtocolCodecFactory
 *  org.apache.mina.filter.codec.ProtocolDecoder
 *  org.apache.mina.filter.codec.ProtocolEncoder
 */
package handling.mina;

import handling.mina.MaplePacketDecoder;
import handling.mina.MaplePacketEncoder;
import org.apache.mina.filter.codec.ProtocolCodecFactory;
import org.apache.mina.filter.codec.ProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolEncoder;

public class MapleCodecFactory
implements ProtocolCodecFactory {
    private final ProtocolEncoder encoder = new MaplePacketEncoder();
    private final ProtocolDecoder decoder = new MaplePacketDecoder();

    public ProtocolEncoder getEncoder() throws Exception {
        return this.encoder;
    }

    public ProtocolDecoder getDecoder() throws Exception {
        return this.decoder;
    }
}

