/*
 * Decompiled with CFR 0.148.
 */
package tools.packet;

import constants.ServerConstants;
import handling.MaplePacket;
import handling.SendPacketOpcode;
import java.io.PrintStream;
import tools.data.output.MaplePacketLittleEndianWriter;

public class MonsterBookPacket {
    public static MaplePacket addCard(boolean full, int cardid, int level) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.\u8c03\u8bd5\u8f93\u51fa\u5c01\u5305) {
            System.out.println("addCard--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MONSTERBOOK_ADD.getValue());
        if (!full) {
            mplew.write(1);
            mplew.writeInt(cardid);
            mplew.writeInt(level);
        } else {
            mplew.write(0);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("addCard-48\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket showGainCard(int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.\u8c03\u8bd5\u8f93\u51fa\u5c01\u5305) {
            System.out.println("showGainCard--------------------");
        }
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(0);
        mplew.write(2);
        mplew.writeInt(itemid);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("showGainCard-66\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket showForeginCardEffect(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.\u8c03\u8bd5\u8f93\u51fa\u5c01\u5305) {
            System.out.println("showForeginCardEffect--------------------");
        }
        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(id);
        mplew.write(13);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("showForeginCardEffect-83\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket changeCover(int cardid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.\u8c03\u8bd5\u8f93\u51fa\u5c01\u5305) {
            System.out.println("changeCover--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MONSTERBOOK_CHANGE_COVER.getValue());
        mplew.writeInt(cardid);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("changeCover-99\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }
}

