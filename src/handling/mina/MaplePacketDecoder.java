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

import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.CumulativeProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolDecoderOutput;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import client.MapleClient;
import constants.ServerConstants;
import handling.RecvPacketOpcode;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.MapleAESOFB;
import tools.MapleCustomEncryption;
import tools.data.input.ByteArrayByteStream;
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
                    String note = "时间：" + FileoutputUtil.CurrentReadable_Time() + " " + "|| 玩家名字：" + client.getPlayer().getName() + "" + "|| 玩家地图：" + client.getPlayer().getMapId() + "\r\n";
                    FileoutputUtil.packetLog("logs\\客户端包掉线.log", note);
                    return false;
                }
                decoderState.packetlength = MapleAESOFB.getPacketLength(packetHeader);
            } else if (in.remaining() < 4 && decoderState.packetlength == -1) {
                log.trace("解码…没有足够的数据/就是所谓的包不完整");
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
            if (ServerConstants.PACKET_DEBUG) {
                int packetLen = decryptedPacket.length;
                int pHeader = this.readFirstShort(decryptedPacket);
                String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
                String op = this.lookupSend(pHeader);
                String Send = "客户端发送 " + op + " [" + pHeaderStr + "] (" + packetLen + ")\r\n";
                if (packetLen <= 3000) {
                    String SendTo = Send + HexTool.toString(decryptedPacket) + "\r\n" + HexTool.toStringFromAscii(decryptedPacket);
                    FileoutputUtil.packetLog("log\\客户端封包.log", SendTo);
                    String SendTos = "\r\n时间：" + FileoutputUtil.CurrentReadable_Time() + "  ";
                    if (op.equals("UNKNOWN")) {
                        FileoutputUtil.packetLog("log\\未知客服端封包.log", SendTos + SendTo);
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