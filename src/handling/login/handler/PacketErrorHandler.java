/*
 * Decompiled with CFR 0.148.
 */
package handling.login.handler;

import client.MapleCharacter;
import client.MapleClient;
import handling.SendPacketOpcode;
import tools.FileoutputUtil;
import tools.StringUtil;
import tools.data.input.SeekableLittleEndianAccessor;

public class PacketErrorHandler {
    public static void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (slea.available() >= 6L) {
            slea.skip(6);
            short badPacketSize = slea.readShort();
            slea.skip(4);
            short pHeader = slea.readShort();
            String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
            pHeaderStr = StringUtil.getLeftPaddedStr(pHeaderStr, '0', 4);
            String op = PacketErrorHandler.lookupRecv(pHeader);
            String from = "";
            if (c.getPlayer() != null) {
                from = "\r\n\u65f6\u95f4\uff1a" + FileoutputUtil.CurrentReadable_Time() + "  \u89d2\u8272: " + c.getPlayer().getName() + "  \u7b49\u7ea7(" + c.getPlayer().getLevel() + ") \u804c\u4e1a: " + c.getPlayer().getJob() + " \r\n";
            }
            String Recv = "\u5c01\u5305\u51fa\u9519: \r\n" + op + " [" + pHeaderStr + "] (" + (badPacketSize - 6) + ")" + "\r\n" + slea.toString(true);
            FileoutputUtil.packetLog("log\\\u5c01\u5305\u51fa\u9519.log", from + Recv);
        }
    }

    private static String lookupRecv(int val) {
        for (SendPacketOpcode op : SendPacketOpcode.values()) {
            if (op.getValue() != val) continue;
            return op.name();
        }
        return "UNKNOWN";
    }
}

