/*
 * Decompiled with CFR 0.148.
 */
package tools.packet;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.IItem;
import constants.ServerConstants;
import handling.MaplePacket;
import handling.SendPacketOpcode;
import java.awt.Point;
import java.io.PrintStream;
import java.util.List;
import server.MerchItemPackage;
import server.shops.AbstractPlayerStore;
import server.shops.HiredMerchant;
import server.shops.IMaplePlayerShop;
import server.shops.MapleMiniGame;
import server.shops.MaplePlayerShop;
import server.shops.MaplePlayerShopItem;
import tools.Pair;
import tools.data.output.MaplePacketLittleEndianWriter;
import tools.packet.PacketHelper;

public class PlayerShopPacket {
    public static final MaplePacket addCharBox(MapleCharacter c, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("addCharBox--------------------");
        }
        mplew.writeShort(SendPacketOpcode.UPDATE_CHAR_BOX.getValue());
        mplew.writeInt(c.getId());
        PacketHelper.addAnnounceBox(mplew, c);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("addCharBox-55\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket removeCharBox(MapleCharacter c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("removeCharBox--------------------");
        }
        mplew.writeShort(SendPacketOpcode.UPDATE_CHAR_BOX.getValue());
        mplew.writeInt(c.getId());
        mplew.write(0);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("removeCharBox-72\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket sendTitleBox() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("sendTitleBox--------------------");
        }
        mplew.writeShort(SendPacketOpcode.SEND_TITLE_BOX.getValue());
        mplew.write(7);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("sendTitleBox-88\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket sendPlayerShopBox(MapleCharacter c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("sendPlayerShopBox--------------------");
        }
        mplew.writeShort(SendPacketOpcode.UPDATE_CHAR_BOX.getValue());
        mplew.writeInt(c.getId());
        PacketHelper.addAnnounceBox(mplew, c);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("sendPlayerShopBox-105\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket getHiredMerch(MapleCharacter chr, HiredMerchant merch, boolean firstTime) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getHiredMerch--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(5);
        mplew.write(5);
        mplew.write(4);
        mplew.writeShort(merch.getVisitorSlot(chr));
        mplew.writeInt(merch.getItemId());
        mplew.writeMapleAsciiString("\u96c7\u4f63\u5546\u4eba");
        for (Pair<Byte, MapleCharacter> storechr : merch.getVisitors()) {
            mplew.write((Byte)storechr.left);
            PacketHelper.addCharLook(mplew, (MapleCharacter)storechr.right, false);
            mplew.writeMapleAsciiString(((MapleCharacter)storechr.right).getName());
        }
        mplew.write(-1);
        mplew.writeShort(0);
        mplew.writeMapleAsciiString(merch.getOwnerName());
        if (merch.isOwner(chr)) {
            mplew.writeInt(merch.getTimeLeft());
            mplew.write(firstTime ? 1 : 0);
            mplew.write(merch.getBoughtItems().size());
            for (AbstractPlayerStore.BoughtItem SoldItem : merch.getBoughtItems()) {
                mplew.writeInt(SoldItem.id);
                mplew.writeShort(SoldItem.quantity);
                mplew.writeInt(SoldItem.totalPrice);
                mplew.writeMapleAsciiString(SoldItem.buyer);
            }
            mplew.writeInt(merch.getMeso());
        }
        mplew.writeMapleAsciiString(merch.getDescription());
        mplew.write(10);
        mplew.writeInt(merch.getMeso());
        mplew.write(merch.getItems().size());
        for (MaplePlayerShopItem item : merch.getItems()) {
            mplew.writeShort(item.bundles);
            mplew.writeShort(item.item.getQuantity());
            mplew.writeInt(item.price);
            PacketHelper.addItemInfo(mplew, item.item, true, true);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getHiredMerch-159\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket getPlayerStore(MapleCharacter chr, boolean firstTime) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getPlayerStore--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        IMaplePlayerShop ips = chr.getPlayerShop();
        switch (ips.getShopType()) {
            case 2: {
                mplew.write(5);
                mplew.write(4);
                mplew.write(4);
                break;
            }
            case 3: {
                mplew.write(5);
                mplew.write(2);
                mplew.write(2);
                break;
            }
            case 4: {
                mplew.write(5);
                mplew.write(1);
                mplew.write(2);
            }
        }
        mplew.writeShort(ips.getVisitorSlot(chr));
        PacketHelper.addCharLook(mplew, ((MaplePlayerShop)ips).getMCOwner(), false);
        mplew.writeMapleAsciiString(ips.getOwnerName());
        for (Pair<Byte, MapleCharacter> storechr : ips.getVisitors()) {
            mplew.write((Byte)storechr.left);
            PacketHelper.addCharLook(mplew, (MapleCharacter)storechr.right, false);
            mplew.writeMapleAsciiString(((MapleCharacter)storechr.right).getName());
        }
        mplew.write(255);
        mplew.writeMapleAsciiString(ips.getDescription());
        mplew.write(10);
        mplew.write(ips.getItems().size());
        for (MaplePlayerShopItem item : ips.getItems()) {
            mplew.writeShort(item.bundles);
            mplew.writeShort(item.item.getQuantity());
            mplew.writeInt(item.price);
            PacketHelper.addItemInfo(mplew, item.item, true, true);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getPlayerStore-213\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket shopChat(String message, int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("shopChat--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(6);
        mplew.write(8);
        mplew.write(slot);
        mplew.writeMapleAsciiString(message);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("shopChat-232\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket shopErrorMessage(int error, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("shopErrorMessage--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(10);
        mplew.write(type);
        mplew.write(error);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("shopErrorMessage-250\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket spawnHiredMerchant(HiredMerchant hm) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("spawnHiredMerchant--------------------");
        }
        mplew.writeShort(SendPacketOpcode.SPAWN_HIRED_MERCHANT.getValue());
        mplew.writeInt(hm.getOwnerId());
        mplew.writeInt(hm.getItemId());
        mplew.writePos(hm.getPosition());
        mplew.writeShort(0);
        mplew.writeMapleAsciiString(hm.getOwnerName());
        PacketHelper.addInteraction(mplew, hm);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("spawnHiredMerchant-271\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket destroyHiredMerchant(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("destroyHiredMerchant--------------------");
        }
        mplew.writeShort(SendPacketOpcode.DESTROY_HIRED_MERCHANT.getValue());
        mplew.writeInt(id);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("destroyHiredMerchant-287\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket shopItemUpdate(IMaplePlayerShop shop) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("shopItemUpdate--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(23);
        if (shop.getShopType() == 1) {
            mplew.writeInt(0);
        }
        mplew.write(shop.getItems().size());
        for (MaplePlayerShopItem item : shop.getItems()) {
            mplew.writeShort(item.bundles);
            mplew.writeShort(item.item.getQuantity());
            mplew.writeInt(item.price);
            PacketHelper.addItemInfo(mplew, item.item, true, true);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("shopItemUpdate-313\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket shopVisitorAdd(MapleCharacter chr, int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("shopVisitorAdd--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(4);
        mplew.write(slot);
        PacketHelper.addCharLook(mplew, chr, false);
        mplew.writeMapleAsciiString(chr.getName());
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("shopVisitorAdd-333\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket shopVisitorLeave(byte slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("shopVisitorLeave--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(10);
        if (slot > 0) {
            mplew.write(slot);
            mplew.write(slot);
            mplew.write(slot);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("shopVisitorLeave-353\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket Merchant_Buy_Error(byte message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("Merchant_Buy_Error--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(23);
        mplew.write(message);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("Merchant_Buy_Error-371\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket updateHiredMerchant(HiredMerchant shop) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("updateHiredMerchant--------------------");
        }
        mplew.writeShort(SendPacketOpcode.UPDATE_HIRED_MERCHANT.getValue());
        mplew.writeInt(shop.getOwnerId());
        PacketHelper.addInteraction(mplew, shop);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("updateHiredMerchant-388\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket merchItem_Message(byte op) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("merchItem_Message--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MERCH_ITEM_MSG.getValue());
        mplew.write(op);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("merchItem_Message-404\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket merchItemStore(byte op) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("merchItemStore--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MERCH_ITEM_STORE.getValue());
        mplew.write(op);
        switch (op) {
            case 36: {
                mplew.writeZeroBytes(8);
                break;
            }
            default: {
                mplew.write(0);
            }
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("merchItemStore-430\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket merchItemStore_ItemData(MerchItemPackage pack) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("merchItemStore_ItemData--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MERCH_ITEM_STORE.getValue());
        mplew.write(35);
        mplew.writeInt(9030000);
        mplew.writeInt(32272);
        mplew.writeZeroBytes(5);
        mplew.writeInt(pack.getMesos());
        mplew.write(0);
        mplew.write(pack.getItems().size());
        for (IItem item : pack.getItems()) {
            PacketHelper.addItemInfo(mplew, item, true, true);
        }
        mplew.writeZeroBytes(3);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("merchItemStore_ItemData-457\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGame(MapleClient c, MapleMiniGame minigame) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGame--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(5);
        mplew.write(minigame.getGameType());
        mplew.write(minigame.getMaxSize());
        mplew.writeShort(minigame.getVisitorSlot(c.getPlayer()));
        PacketHelper.addCharLook(mplew, minigame.getMCOwner(), false);
        mplew.writeMapleAsciiString(minigame.getOwnerName());
        for (Pair<Byte, MapleCharacter> visitorz : minigame.getVisitors()) {
            mplew.write(visitorz.getLeft());
            PacketHelper.addCharLook(mplew, visitorz.getRight(), false);
            mplew.writeMapleAsciiString(visitorz.getRight().getName());
        }
        mplew.write(-1);
        mplew.write(0);
        PlayerShopPacket.addGameInfo(mplew, minigame.getMCOwner(), minigame);
        for (Pair<Byte, MapleCharacter> visitorz : minigame.getVisitors()) {
            mplew.write(visitorz.getLeft());
            PlayerShopPacket.addGameInfo(mplew, visitorz.getRight(), minigame);
        }
        mplew.write(-1);
        mplew.writeMapleAsciiString(minigame.getDescription());
        mplew.writeShort(minigame.getPieceType());
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGame-493\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameReady(boolean ready) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameReady--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(ready ? 57 : 58);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameReady-507\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameExitAfter(boolean ready) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameExitAfter--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(ready ? 55 : 56);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameExitAfter-521\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameStart(int loser) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameStart--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(60);
        mplew.write(loser == 1 ? 0 : 1);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameStart-536\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameSkip(int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameSkip--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(62);
        mplew.write(slot);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameSkip-552\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameSkip1(int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameSkip1--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(62);
        mplew.write(slot == 1 ? 0 : 1);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameSkip1-568\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameRequestTie() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameRequestTie--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(48);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameRequestTie-582\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameRequestREDO() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameRequestREDO--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(53);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameRequestREDO-596\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameDenyTie() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameDenyTie--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(49);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameDenyTie-610\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameDenyREDO() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameDenyREDO--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(48);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameDenyREDO-624\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameFull() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameFull--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.writeShort(5);
        mplew.write(2);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameFull-639\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameMoveOmok(int move1, int move2, int move3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameMoveOmok--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(63);
        mplew.writeInt(move1);
        mplew.writeInt(move2);
        mplew.write(move3);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameMoveOmok-656\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameNewVisitor(MapleCharacter c, int slot, MapleMiniGame game) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameNewVisitor--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(4);
        mplew.write(slot);
        PacketHelper.addCharLook(mplew, c, false);
        mplew.writeMapleAsciiString(c.getName());
        PlayerShopPacket.addGameInfo(mplew, c, game);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameNewVisitor-675\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static void addGameInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, MapleMiniGame game) {
        mplew.writeInt(game.getGameType());
        mplew.writeInt(game.getWins(chr));
        mplew.writeInt(game.getTies(chr));
        mplew.writeInt(game.getLosses(chr));
        mplew.writeInt(game.getScore(chr));
    }

    public static MaplePacket getMiniGameClose(byte number) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameClose--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(10);
        mplew.write(1);
        mplew.write(number);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameClose-700\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMatchCardStart(MapleMiniGame game, int loser) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMatchCardStart--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(60);
        mplew.write(loser == 1 ? 0 : 1);
        int times = game.getPieceType() == 1 ? 20 : (game.getPieceType() == 2 ? 30 : 12);
        mplew.write(times);
        for (int i = 1; i <= times; ++i) {
            mplew.writeInt(game.getCardId(i));
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMatchCardStart-720\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMatchCardSelect(int turn, int slot, int firstslot, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMatchCardSelect--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(67);
        mplew.write(turn);
        mplew.write(slot);
        if (turn == 0) {
            mplew.write(firstslot);
            mplew.write(type);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMatchCardSelect-740\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket getMiniGameResult(MapleMiniGame game, int type, int x) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getMiniGameResult--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(61);
        mplew.write(type);
        game.setPoints(x, type);
        if (type != 0) {
            game.setPoints(x == 1 ? 0 : 1, type == 2 ? 0 : 1);
        }
        if (type != 1) {
            if (type == 0) {
                mplew.write(x == 1 ? 0 : 1);
            } else {
                mplew.write(x);
            }
        }
        PlayerShopPacket.addGameInfo(mplew, game.getMCOwner(), game);
        for (Pair<Byte, MapleCharacter> visitorz : game.getVisitors()) {
            PlayerShopPacket.addGameInfo(mplew, (MapleCharacter)visitorz.right, game);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("getMiniGameResult-771\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket MerchantVisitorView(List<String> visitor) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("MerchantVisitorView--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(44);
        mplew.writeShort(visitor.size());
        for (String visit : visitor) {
            mplew.writeMapleAsciiString(visit);
            mplew.writeInt(1);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("MerchantVisitorView-791\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket MerchantBlackListView(List<String> blackList) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("MerchantBlackListView--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(45);
        mplew.writeShort(blackList.size());
        for (int i = 0; i < blackList.size(); ++i) {
            if (blackList.get(i) == null) continue;
            mplew.writeMapleAsciiString(blackList.get(i));
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("MerchantBlackListView-812\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket sendHiredMerchantMessage(byte type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("sendHiredMerchantMessage--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MERCH_ITEM_MSG.getValue());
        mplew.write(type);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("sendHiredMerchantMessage-833\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static final MaplePacket shopMessage(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("shopMessage--------------------");
        }
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(type);
        mplew.write(0);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("shopMessage-850\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }
}

