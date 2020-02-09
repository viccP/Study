/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.ByteBuffer
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.filter.codec.CumulativeProtocolDecoder
 *  org.apache.mina.filter.codec.ProtocolDecoderOutput
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 */
package handling.mina;

import client.MapleCharacter;
import client.MapleClient;
import constants.ServerConstants;
import handling.RecvPacketOpcode;
import java.io.PrintStream;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.CloseFuture;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.CumulativeProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolDecoderOutput;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.MapleAESOFB;
import tools.MapleCustomEncryption;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.ByteInputStream;
import tools.data.input.GenericLittleEndianAccessor;

public class MaplePacketDecoder
extends CumulativeProtocolDecoder {
    public static final String DECODER_STATE_KEY = MaplePacketDecoder.class.getName() + ".STATE";
    private static Logger log = LoggerFactory.getLogger(MaplePacketDecoder.class);

    protected boolean doDecode(IoSession session, ByteBuffer in, ProtocolDecoderOutput out) throws Exception {
        DecoderState decoderState = (DecoderState)session.getAttribute(DECODER_STATE_KEY);
        if (decoderState == null) {
            decoderState = new DecoderState();
            session.setAttribute(DECODER_STATE_KEY, (Object)decoderState);
        }
        MapleClient client = (MapleClient)session.getAttribute("CLIENT");
        if (decoderState.packetlength == -1) {
            if (in.remaining() >= 4) {
                int packetHeader = in.getInt();
                if (!client.getReceiveCrypto().checkPacket(packetHeader)) {
                    session.close();
                    String note = "\u65f6\u95f4\uff1a" + FileoutputUtil.CurrentReadable_Time() + " " + "|| \u73a9\u5bb6\u540d\u5b57\uff1a" + client.getPlayer().getName() + "" + "|| \u73a9\u5bb6\u5730\u56fe\uff1a" + client.getPlayer().getMapId() + "\r\n";
                    FileoutputUtil.packetLog("logs\\\u5ba2\u6237\u7aef\u5305\u6389\u7ebf.log", note);
                    return false;
                }
                decoderState.packetlength = MapleAESOFB.getPacketLength(packetHeader);
            } else if (in.remaining() < 4 && decoderState.packetlength == -1) {
                log.trace("\u89e3\u7801\u2026\u6ca1\u6709\u8db3\u591f\u7684\u6570\u636e/\u5c31\u662f\u6240\u8c13\u7684\u5305\u4e0d\u5b8c\u6574");
                return false;
            }
        }
        if (in.remaining() >= decoderState.packetlength) {
            byte[] decryptedPacket = new byte[decoderState.packetlength];
            in.get(decryptedPacket, 0, decoderState.packetlength);
            decoderState.packetlength = -1;
            client.getReceiveCrypto().crypt(decryptedPacket);
            MapleCustomEncryption.decryptData(decryptedPacket);
            out.write((Object)decryptedPacket);
            if (ServerConstants.\u5c01\u5305\u663e\u793a) {
                int packetLen = decryptedPacket.length;
                int pHeader = this.readFirstShort(decryptedPacket);
                String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
                String op = this.lookupSend(pHeader);
                String Send = "\u5ba2\u6237\u7aef\u53d1\u9001 " + op + " [" + pHeaderStr + "] (" + packetLen + ")\r\n";
                if (packetLen <= 3000) {
                    String SendTo = Send + HexTool.toString(decryptedPacket) + "\r\n" + HexTool.toStringFromAscii(decryptedPacket);
                    FileoutputUtil.packetLog("log\\\u5ba2\u6237\u7aef\u5c01\u5305.log", SendTo);
                    System.out.println(SendTo);
                    String SendTos = "\r\n\u65f6\u95f4\uff1a" + FileoutputUtil.CurrentReadable_Time() + "  ";
                    if (op.equals("UNKNOWN")) {
                        FileoutputUtil.packetLog("log\\\u672a\u77e5\u5ba2\u670d\u7aef\u5c01\u5305.log", SendTos + SendTo);
                    }
                } else {
                    log.info(HexTool.toString(new byte[]{decryptedPacket[0], decryptedPacket[1]}) + "...");
                }
            }
            return true;
        }
        return false;
    }

    private String lookupSend(int val) {
        for (RecvPacketOpcode op : RecvPacketOpcode.values()) {
            if (op.getValue() != val) continue;
            return op.name();
        }
        return "UNKNOWN";
    }

    private int readFirstShort(byte[] arr) {
        return new GenericLittleEndianAccessor(new ByteArrayByteStream(arr)).readShort();
    }

    public static class DecoderState {
        public int packetlength = -1;
    }

}

