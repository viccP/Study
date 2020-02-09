/*
 * Decompiled with CFR 0.148.
 */
package tools.packet;

import client.MapleCharacter;
import constants.ServerConstants;
import handling.MaplePacket;
import handling.SendPacketOpcode;
import java.io.PrintStream;
import server.MapleCarnivalParty;
import tools.data.output.MaplePacketLittleEndianWriter;

public class MonsterCarnivalPacket {
    public static MaplePacket startMonsterCarnival(MapleCharacter chr, int enemyavailable, int enemytotal) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.\u8c03\u8bd5\u8f93\u51fa\u5c01\u5305) {
            System.out.println("startMonsterCarnival--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_START.getValue());
        MapleCarnivalParty friendly = chr.getCarnivalParty();
        mplew.write(friendly.getTeam());
        mplew.writeShort(chr.getAvailableCP());
        mplew.writeShort(chr.getTotalCP());
        mplew.writeShort(friendly.getAvailableCP());
        mplew.writeShort(friendly.getTotalCP());
        mplew.writeShort(enemyavailable);
        mplew.writeShort(enemytotal);
        mplew.writeLong(0L);
        mplew.writeShort(0);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("startMonsterCarnival-52\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket playerDiedMessage(String name, int lostCP, int team) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.\u8c03\u8bd5\u8f93\u51fa\u5c01\u5305) {
            System.out.println("playerDiedMessage--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_DIED.getValue());
        mplew.write(team);
        mplew.write(lostCP);
        mplew.writeMapleAsciiString(name);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("playerDiedMessage-70\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket CPUpdate(boolean party, int curCP, int totalCP, int team) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.\u8c03\u8bd5\u8f93\u51fa\u5c01\u5305) {
            System.out.println("CPUpdate--------------------");
        }
        if (!party) {
            mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_OBTAINED_CP.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_PARTY_CP.getValue());
            mplew.write(team);
        }
        mplew.writeShort(curCP);
        mplew.writeShort(totalCP);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("CPUpdate-91\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket playerSummoned(String name, int tab, int number) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.\u8c03\u8bd5\u8f93\u51fa\u5c01\u5305) {
            System.out.println("playerSummoned--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_SUMMON.getValue());
        mplew.write(tab);
        mplew.write(number);
        mplew.writeMapleAsciiString(name);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("playerSummoned-109\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket playerSummoned1(String name, int tab, int number) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.\u8c03\u8bd5\u8f93\u51fa\u5c01\u5305) {
            System.out.println("playerSummoned--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_SUMMON1.getValue());
        mplew.write(tab);
        mplew.writeShort(number);
        mplew.writeMapleAsciiString(name);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("playerSummoned-127\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }
}

