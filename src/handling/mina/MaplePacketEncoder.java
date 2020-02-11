/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.ByteBuffer
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.filter.codec.ProtocolEncoder
 *  org.apache.mina.filter.codec.ProtocolEncoderOutput
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 */
package handling.mina;

import client.MapleClient;
import constants.ServerConstants;
import handling.MaplePacket;
import handling.SendPacketOpcode;
import java.io.PrintStream;
import java.util.concurrent.locks.Lock;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.ProtocolEncoder;
import org.apache.mina.filter.codec.ProtocolEncoderOutput;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.MapleAESOFB;
import tools.MapleCustomEncryption;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.ByteInputStream;
import tools.data.input.GenericLittleEndianAccessor;

public class MaplePacketEncoder
implements ProtocolEncoder {
    private static Logger log = LoggerFactory.getLogger(MaplePacketEncoder.class);

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public void encode(IoSession session, Object message, ProtocolEncoderOutput out) throws Exception {
        MapleClient client = (MapleClient)session.getAttribute("CLIENT");
        if (client != null) {
            MapleAESOFB send_crypto = client.getSendCrypto();
            byte[] inputInitialPacket = ((MaplePacket)message).getBytes();
            if (ServerConstants.\u5c01\u5305\u663e\u793a) {
                int packetLen = inputInitialPacket.length;
                int pHeader = this.readFirstShort(inputInitialPacket);
                String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
                String op = this.lookupRecv(pHeader);
                String Recv = "\u670d\u52a1\u7aef\u53d1\u9001 " + op + " [" + pHeaderStr + "] (" + packetLen + ")\r\n";
                if (packetLen <= 50000) {
                    String RecvTo = Recv + HexTool.toString(inputInitialPacket) + "\r\n" + HexTool.toStringFromAscii(inputInitialPacket);
                    FileoutputUtil.packetLog("log\\\u670d\u52a1\u7aef\u5c01\u5305.log", RecvTo);
                    System.out.println(RecvTo);
                } else {
                    log.info(HexTool.toString(new byte[]{inputInitialPacket[0], inputInitialPacket[1]}) + " ...");
                }
            }
            byte[] unencrypted = new byte[inputInitialPacket.length];
            System.arraycopy(inputInitialPacket, 0, unencrypted, 0, inputInitialPacket.length);
            byte[] ret = new byte[unencrypted.length + 4];
            Lock mutex = client.getLock();
            mutex.lock();
            try {
                byte[] header = send_crypto.getPacketHeader(unencrypted.length);
                MapleCustomEncryption.encryptData(unencrypted);
                send_crypto.crypt(unencrypted);
                System.arraycopy(header, 0, ret, 0, 4);
            }
            finally {
                mutex.unlock();
            }
            System.arraycopy(unencrypted, 0, ret, 4, unencrypted.length);
            out.write(ByteBuffer.wrap((byte[])ret));
        } else {
            out.write(ByteBuffer.wrap((byte[])((MaplePacket)message).getBytes()));
        }
    }

    public void dispose(IoSession session) throws Exception {
    }

    private String lookupRecv(int val) {
        for (SendPacketOpcode op : SendPacketOpcode.values()) {
            if (op.getValue() != val) continue;
            return op.name();
        }
        return "UNKNOWN";
    }

    private int readFirstShort(byte[] arr) {
        return new GenericLittleEndianAccessor(new ByteArrayByteStream(arr)).readShort();
    }
}
