/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IdleStatus
 *  org.apache.mina.common.IoHandlerAdapter
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling;

import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.mina.common.IdleStatus;
import org.apache.mina.common.IoHandlerAdapter;
import org.apache.mina.common.IoSession;

import client.MapleClient;
import handling.cashshop.CashShopServer;
import handling.cashshop.handler.CashShopOperation;
import handling.cashshop.handler.MTSOperation;
import handling.channel.ChannelServer;
import handling.channel.handler.AllianceHandler;
import handling.channel.handler.BBSHandler;
import handling.channel.handler.BeanGame;
import handling.channel.handler.BuddyListHandler;
import handling.channel.handler.ChatHandler;
import handling.channel.handler.DueyHandler;
import handling.channel.handler.FamilyHandler;
import handling.channel.handler.GuildHandler;
import handling.channel.handler.HiredMerchantHandler;
import handling.channel.handler.InterServerHandler;
import handling.channel.handler.InventoryHandler;
import handling.channel.handler.ItemMakerHandler;
import handling.channel.handler.MobHandler;
import handling.channel.handler.MonsterCarnivalHandler;
import handling.channel.handler.NPCHandler;
import handling.channel.handler.PartyHandler;
import handling.channel.handler.PetHandler;
import handling.channel.handler.PlayerHandler;
import handling.channel.handler.PlayerInteractionHandler;
import handling.channel.handler.PlayersHandler;
import handling.channel.handler.StatsHandling;
import handling.channel.handler.SummonHandler;
import handling.channel.handler.UserInterfaceHandler;
import handling.login.LoginServer;
import handling.login.handler.CharLoginHandler;
import handling.login.handler.PacketErrorHandler;
import handling.mina.MaplePacketDecoder;
import server.MTSStorage;
import server.Randomizer;
import server.ServerProperties;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.MapleAESOFB;
import tools.Pair;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.GenericSeekableLittleEndianAccessor;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.packet.LoginPacket;

public class MapleServerHandler
extends IoHandlerAdapter {
    public static final boolean Log_Packets = true;
    private int channel = -1;
    private final boolean cs;
    private final List<String> BlockedIP = new ArrayList<String>();
    private final Map<String, Pair<Long, Byte>> tracker = new ConcurrentHashMap<String, Pair<Long, Byte>>();
    private static final boolean debugMode = Boolean.parseBoolean(ServerProperties.getProperty("KinMS.Debug", "false"));
    private static final EnumSet<RecvPacketOpcode> blocked = EnumSet.noneOf(RecvPacketOpcode.class);

    public MapleServerHandler(int channel, boolean cs) {
        this.channel = channel;
        this.cs = cs;
    }

    public void messageSent(IoSession session, Object message) throws Exception {
        Runnable r = ((MaplePacket)message).getOnSend();
        if (r != null) {
            r.run();
        }
        super.messageSent(session, message);
    }

    public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
    }

    public void sessionOpened(IoSession session) throws Exception {
        byte count;
        String address = session.getRemoteAddress().toString().split(":")[0];
        if (this.BlockedIP.contains(address)) {
            session.close();
            return;
        }
        Pair<Long, Byte> track = this.tracker.get(address);
        if (track == null) {
            count = 1;
        } else {
            count = (Byte)track.right;
            long difference = System.currentTimeMillis() - (Long)track.left;
            if (difference < 2000L) {
                count = (byte)(count + 1);
            } else if (difference > 20000L) {
                count = 1;
            }
            if (count >= 10) {
                this.BlockedIP.add(address);
                this.tracker.remove(address);
                session.close();
                return;
            }
        }
        this.tracker.put(address, new Pair<Long, Byte>(System.currentTimeMillis(), count));
        String IP = address.substring(address.indexOf(47) + 1, address.length());
        if (this.channel > -1) {
            if (ChannelServer.getInstance(this.channel).isShutdown()) {
                session.close();
                return;
            }
            if (!LoginServer.containsIPAuth(IP)) {
                // empty if block
            }
        } else if (this.cs) {
            if (CashShopServer.isShutdown()) {
                session.close();
                return;
            }
        } else if (LoginServer.isShutdown()) {
            session.close();
            return;
        }
        LoginServer.removeIPAuth(IP);
        byte[] serverRecv = new byte[]{70, 114, 122, (byte)Randomizer.nextInt(255)};
        byte[] serverSend = new byte[]{82, 48, 120, (byte)Randomizer.nextInt(255)};
        byte[] ivRecv = serverRecv;
        byte[] ivSend = serverSend;
        MapleClient client = new MapleClient(new MapleAESOFB(ivSend, (short) -80), new MapleAESOFB(ivRecv, (short) 79), session);
        client.setChannel(this.channel);
        MaplePacketDecoder.DecoderState decoderState = new MaplePacketDecoder.DecoderState();
        session.setAttribute(MaplePacketDecoder.DECODER_STATE_KEY, (Object)decoderState);
        session.write((Object)LoginPacket.getHello((short)79, ivSend, ivRecv));
        session.setAttribute("CLIENT", (Object)client);
        session.setIdleTime(IdleStatus.READER_IDLE, 60);
        session.setIdleTime(IdleStatus.WRITER_IDLE, 60);
        StringBuilder sb = new StringBuilder();
        if (this.channel > -1) {
            sb.append("[\u9891\u9053\u670d\u52a1\u5668] \u9891\u9053 ").append(this.channel).append(" : ");
        } else if (this.cs) {
            sb.append("[\u5546\u57ce\u670d\u52a1\u5668]");
        } else {
            sb.append("[\u767b\u5f55\u670d\u52a1\u5668]");
        }
        sb.append("IoSession opened ").append(address);
        System.out.println(sb.toString());
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public void sessionClosed(IoSession session) throws Exception {
        MapleClient client = (MapleClient)session.getAttribute("CLIENT");
        if (client != null) {
            try {
                client.disconnect(true, this.cs);
            }
            finally {
                session.close();
                session.removeAttribute("CLIENT");
            }
        }
        super.sessionClosed(session);
    }

    public void messageReceived(IoSession session, Object message) {
        try {
            GenericSeekableLittleEndianAccessor slea = new GenericSeekableLittleEndianAccessor(new ByteArrayByteStream((byte[])message));
            if (slea.available() < 2L) {
                return;
            }
            short header_num = slea.readShort();
            for (RecvPacketOpcode recv : RecvPacketOpcode.values()) {
                MapleClient c;
                if (recv.getValue() != header_num) continue;
                if (debugMode) {
                    StringBuilder sb = new StringBuilder("Received data \u5df2\u8655\u7406 :" + String.valueOf(recv) + "\n");
                    sb.append(HexTool.toString((byte[])message)).append("\n").append(HexTool.toStringFromAscii((byte[])message));
                    System.out.println(sb.toString());
                }
                if (!(c = (MapleClient)session.getAttribute("CLIENT")).isReceiving()) {
                    return;
                }
                if (recv.NeedsChecking() && !c.isLoggedIn()) {
                    return;
                }
                if (c.getPlayer() != null && c.isMonitored() && !blocked.contains(recv)) {
                    try (FileWriter fw = new FileWriter(new File("Logs/MonitorLogs/" + c.getPlayer().getName() + "_log.txt"), true);){
                        fw.write(String.valueOf(recv) + " (" + Integer.toHexString(header_num) + ") Handled: \r\n" + ((Object)slea).toString() + "\r\n");
                        fw.flush();
                    }
                }
                MapleServerHandler.handlePacket(recv, slea, c, this.cs);
                return;
            }
            if (debugMode) {
                StringBuilder sb = new StringBuilder("Received data \u672a\u8655\u7406 : ");
                sb.append(HexTool.toString((byte[])message)).append("\n").append(HexTool.toStringFromAscii((byte[])message));
                System.out.println(sb.toString());
            }
        }
        catch (Exception e) {
            FileoutputUtil.outputFileError("Logs/Log_Packet_Except.rtf", e);
        }
    }

    public void sessionIdle(IoSession session, IdleStatus status) throws Exception {
        MapleClient client = (MapleClient)session.getAttribute("CLIENT");
        if (client != null) {
            client.sendPing();
        }
        super.sessionIdle(session, status);
    }

    public static void handlePacket(RecvPacketOpcode header, SeekableLittleEndianAccessor slea, MapleClient c, boolean cs) throws Exception {
        switch (header) {
            case PONG: {
                c.pongReceived();
                break;
            }
            case STRANGE_DATA: {
                break;
            }
            case EFFECT_ON_OFF: 
            case NEW_SX: {
                break;
            }
            case HELLO_LOGIN: {
                CharLoginHandler.Welcome(c);
                break;
            }
            case HELLO_CHANNEL: {
                CharLoginHandler.Welcome(c);
                break;
            }
            case PACKET_ERROR: {
                PacketErrorHandler.handlePacket(slea, c);
                break;
            }
            case LOGIN_PASSWORD: {
                CharLoginHandler.login(slea, c);
                break;
            }
            case SERVERLIST_REQUEST: {
                CharLoginHandler.ServerListRequest(c);
                break;
            }
            case LICENSE_REQUEST: {
                CharLoginHandler.ServerListRequest(c);
                break;
            }
            case CHARLIST_REQUEST: {
                CharLoginHandler.CharlistRequest(slea, c);
                break;
            }
            case SERVERSTATUS_REQUEST: {
                CharLoginHandler.ServerStatusRequest(c);
                break;
            }
            case CHECK_CHAR_NAME: {
                CharLoginHandler.CheckCharName(slea.readMapleAsciiString(), c);
                break;
            }
            case CREATE_CHAR: {
                CharLoginHandler.CreateChar(slea, c);
                break;
            }
            case DELETE_CHAR: {
                CharLoginHandler.DeleteChar(slea, c);
                break;
            }
            case CHAR_SELECT: {
                CharLoginHandler.Character_WithoutSecondPassword(slea, c);
                break;
            }
            case AUTH_SECOND_PASSWORD: {
                CharLoginHandler.Character_WithSecondPassword(slea, c);
                break;
            }
            case SET_GENDER: {
                CharLoginHandler.SetGenderRequest(slea, c);
                break;
            }
            case RSA_KEY: {
                c.getSession().write((Object)LoginPacket.StrangeDATA());
                break;
            }
            case CHANGE_CHANNEL: {
                InterServerHandler.ChangeChannel(slea, c, c.getPlayer());
                break;
            }
            case PLAYER_LOGGEDIN: {
                int playerid = slea.readInt();
                if (cs) {
                    CashShopOperation.EnterCS(playerid, c);
                    break;
                }
                InterServerHandler.Loggedin(playerid, c);
                break;
            }
            case ENTER_CASH_SHOP: {
                slea.readInt();
                InterServerHandler.EnterCS(c, c.getPlayer(), false);
                break;
            }
            case ENTER_MTS: {
                InterServerHandler.EnterMTS(c, c.getPlayer(), true);
                break;
            }
            case PLAYER_UPDATE: {
                PlayerHandler.UpdateHandler(slea, c, c.getPlayer());
                break;
            }
            case MOVE_PLAYER: {
                PlayerHandler.MovePlayer(slea, c, c.getPlayer());
                break;
            }
            case CHAR_INFO_REQUEST: {
                c.getPlayer().updateTick(slea.readInt());
                PlayerHandler.CharInfoRequest(slea.readInt(), c, c.getPlayer());
                break;
            }
            case CLOSE_RANGE_ATTACK: {
                PlayerHandler.closeRangeAttack(slea, c, c.getPlayer(), false);
                break;
            }
            case RANGED_ATTACK: {
                PlayerHandler.rangedAttack(slea, c, c.getPlayer());
                break;
            }
            case MAGIC_ATTACK: {
                PlayerHandler.MagicDamage(slea, c, c.getPlayer());
                break;
            }
            case SPECIAL_MOVE: {
                PlayerHandler.SpecialMove(slea, c, c.getPlayer());
                break;
            }
            case PASSIVE_ENERGY: {
                PlayerHandler.closeRangeAttack(slea, c, c.getPlayer(), true);
                break;
            }
            case FACE_EXPRESSION: {
                PlayerHandler.ChangeEmotion(slea.readInt(), c.getPlayer());
                break;
            }
            case TAKE_DAMAGE: {
                PlayerHandler.TakeDamage(slea, c, c.getPlayer());
                break;
            }
            case HEAL_OVER_TIME: {
                PlayerHandler.Heal(slea, c.getPlayer());
                break;
            }
            case CANCEL_BUFF: {
                PlayerHandler.CancelBuffHandler(slea.readInt(), c.getPlayer());
                break;
            }
            case CANCEL_ITEM_EFFECT: {
                PlayerHandler.CancelItemEffect(slea.readInt(), c.getPlayer());
                break;
            }
            case USE_CHAIR: {
                PlayerHandler.UseChair(slea.readInt(), c, c.getPlayer());
                break;
            }
            case CANCEL_CHAIR: {
                PlayerHandler.CancelChair(slea.readShort(), c, c.getPlayer());
                break;
            }
            case USE_ITEMEFFECT: 
            case WHEEL_OF_FORTUNE: {
                PlayerHandler.UseItemEffect(slea.readInt(), c, c.getPlayer());
                break;
            }
            case SKILL_EFFECT: {
                PlayerHandler.SkillEffect(slea, c.getPlayer());
                break;
            }
            case MESO_DROP: {
                c.getPlayer().updateTick(slea.readInt());
                PlayerHandler.DropMeso(slea.readInt(), c.getPlayer());
                break;
            }
            case MONSTER_BOOK_COVER: {
                PlayerHandler.ChangeMonsterBookCover(slea.readInt(), c, c.getPlayer());
                break;
            }
            case CHANGE_KEYMAP: {
                PlayerHandler.ChangeKeymap(slea, c.getPlayer());
                break;
            }
            case CHANGE_MAP: {
                if (cs) {
                    CashShopOperation.LeaveCS(slea, c, c.getPlayer());
                    break;
                }
                PlayerHandler.ChangeMap(slea, c, c.getPlayer());
                break;
            }
            case CHANGE_MAP_SPECIAL: {
                slea.skip(1);
                PlayerHandler.ChangeMapSpecial(slea, slea.readMapleAsciiString(), c, c.getPlayer());
                break;
            }
            case USE_INNER_PORTAL: {
                slea.skip(1);
                PlayerHandler.InnerPortal(slea, c, c.getPlayer());
                break;
            }
            case TROCK_ADD_MAP: {
                PlayerHandler.TrockAddMap(slea, c, c.getPlayer());
                break;
            }
            case ARAN_COMBO: {
                PlayerHandler.AranCombo(c, c.getPlayer());
                break;
            }
            case SKILL_MACRO: {
                PlayerHandler.ChangeSkillMacro(slea, c.getPlayer());
                break;
            }
            case GIVE_FAME: {
                PlayersHandler.GiveFame(slea, c, c.getPlayer());
                break;
            }
            case TRANSFORM_PLAYER: {
                PlayersHandler.TransformPlayer(slea, c, c.getPlayer());
                break;
            }
            case NOTE_ACTION: {
                PlayersHandler.Note(slea, c.getPlayer());
                break;
            }
            case USE_DOOR: {
                PlayersHandler.UseDoor(slea, c.getPlayer());
                break;
            }
            case DAMAGE_REACTOR: {
                PlayersHandler.HitReactor(slea, c);
                break;
            }
            case TOUCH_REACTOR: {
                PlayersHandler.TouchReactor(slea, c);
                break;
            }
            case CLOSE_CHALKBOARD: {
                c.getPlayer().setChalkboard(null);
                break;
            }
            case ITEM_MAKER: {
                ItemMakerHandler.ItemMaker(slea, c);
                break;
            }
            case ITEM_SORT: {
                InventoryHandler.ItemSort(slea, c);
                break;
            }
            case ITEM_GATHER: {
                InventoryHandler.ItemGather(slea, c);
                break;
            }
            case ITEM_MOVE: {
                InventoryHandler.ItemMove(slea, c);
                break;
            }
            case ITEM_PICKUP: {
                InventoryHandler.Pickup_Player(slea, c, c.getPlayer());
                break;
            }
            case USE_CASH_ITEM: {
                InventoryHandler.UseCashItem(slea, c);
                break;
            }
            case quest_KJ: {
                InventoryHandler.QuestKJ(slea, c, c.getPlayer());
                break;
            }
            case USE_ITEM: {
                InventoryHandler.UseItem(slea, c, c.getPlayer());
                break;
            }
            case USE_MAGNIFY_GLASS: {
                InventoryHandler.UseMagnify(slea, c);
                break;
            }
            case USE_SCRIPTED_NPC_ITEM: {
                InventoryHandler.UseScriptedNPCItem(slea, c, c.getPlayer());
                break;
            }
            case USE_RETURN_SCROLL: {
                InventoryHandler.UseReturnScroll(slea, c, c.getPlayer());
                break;
            }
            case USE_UPGRADE_SCROLL: {
                c.getPlayer().updateTick(slea.readInt());
                InventoryHandler.UseUpgradeScroll((byte)slea.readShort(), (byte)slea.readShort(), (byte)slea.readShort(), c, c.getPlayer());
                break;
            }
            case USE_POTENTIAL_SCROLL: {
                c.getPlayer().updateTick(slea.readInt());
                InventoryHandler.UseUpgradeScroll((byte)slea.readShort(), (byte)slea.readShort(), (byte)0, c, c.getPlayer());
                break;
            }
            case USE_EQUIP_SCROLL: {
                c.getPlayer().updateTick(slea.readInt());
                InventoryHandler.UseUpgradeScroll((byte)slea.readShort(), (byte)slea.readShort(), (byte)0, c, c.getPlayer());
                break;
            }
            case USE_SUMMON_BAG: {
                InventoryHandler.UseSummonBag(slea, c, c.getPlayer());
                break;
            }
            case USE_TREASUER_CHEST: {
                InventoryHandler.UseTreasureChest(slea, c, c.getPlayer());
                break;
            }
            case USE_SKILL_BOOK: {
                InventoryHandler.UseSkillBook(slea, c, c.getPlayer());
                break;
            }
            case USE_CATCH_ITEM: {
                InventoryHandler.UseCatchItem(slea, c, c.getPlayer());
                break;
            }
            case USE_MOUNT_FOOD: {
                InventoryHandler.UseMountFood(slea, c, c.getPlayer());
                break;
            }
            case REWARD_ITEM: {
                InventoryHandler.UseRewardItem((byte)slea.readShort(), slea.readInt(), c, c.getPlayer());
                break;
            }
            case HYPNOTIZE_DMG: {
                MobHandler.HypnotizeDmg(slea, c.getPlayer());
                break;
            }
            case MOB_NODE: {
                MobHandler.MobNode(slea, c.getPlayer());
                break;
            }
            case DISPLAY_NODE: {
                MobHandler.DisplayNode(slea, c.getPlayer());
                break;
            }
            case MOVE_LIFE: {
                MobHandler.MoveMonster(slea, c, c.getPlayer());
                break;
            }
            case AUTO_AGGRO: {
                MobHandler.AutoAggro(slea.readInt(), c.getPlayer());
                break;
            }
            case FRIENDLY_DAMAGE: {
                MobHandler.FriendlyDamage(slea, c.getPlayer());
                break;
            }
            case MONSTER_BOMB: {
                MobHandler.MonsterBomb(slea.readInt(), c.getPlayer());
                break;
            }
            case NPC_SHOP: {
                NPCHandler.NPCShop(slea, c, c.getPlayer());
                break;
            }
            case NPC_TALK: {
                NPCHandler.NPCTalk(slea, c, c.getPlayer());
                break;
            }
            case NPC_TALK_MORE: {
                NPCHandler.NPCMoreTalk(slea, c);
                break;
            }
            case NPC_ACTION: {
                NPCHandler.NPCAnimation(slea, c);
                break;
            }
            case QUEST_ACTION: {
                NPCHandler.QuestAction(slea, c, c.getPlayer());
                break;
            }
            case STORAGE: {
                NPCHandler.Storage(slea, c, c.getPlayer());
                break;
            }
            case GENERAL_CHAT: {
                ChatHandler.GeneralChat(slea.readMapleAsciiString(), slea.readByte(), c, c.getPlayer());
                break;
            }
            case PARTYCHAT: {
                ChatHandler.Others(slea, c, c.getPlayer());
                break;
            }
            case WHISPER: {
                ChatHandler.Whisper_Find(slea, c);
                break;
            }
            case MESSENGER: {
                ChatHandler.Messenger(slea, c);
                break;
            }
            case AUTO_ASSIGN_AP: {
                StatsHandling.AutoAssignAP(slea, c, c.getPlayer());
                break;
            }
            case DISTRIBUTE_AP: {
                StatsHandling.DistributeAP(slea, c, c.getPlayer());
                break;
            }
            case DISTRIBUTE_SP: {
                c.getPlayer().updateTick(slea.readInt());
                StatsHandling.DistributeSP(slea.readInt(), c, c.getPlayer());
                break;
            }
            case PLAYER_INTERACTION: {
                PlayerInteractionHandler.PlayerInteraction(slea, c, c.getPlayer());
                break;
            }
            case GUILD_OPERATION: {
                GuildHandler.Guild(slea, c);
                break;
            }
            case UPDATE_CHAR_INFO: {
                PlayersHandler.UpdateCharInfo(slea, c, c.getPlayer());
                break;
            }
            case DENY_GUILD_REQUEST: {
                slea.skip(1);
                GuildHandler.DenyGuildRequest(slea.readMapleAsciiString(), c);
                break;
            }
            case ALLIANCE_OPERATION: {
                AllianceHandler.HandleAlliance(slea, c, false);
                break;
            }
            case DENY_ALLIANCE_REQUEST: {
                AllianceHandler.HandleAlliance(slea, c, true);
                break;
            }
            case BBS_OPERATION: {
                BBSHandler.BBSOperatopn(slea, c);
                break;
            }
            case PARTY_OPERATION: {
                PartyHandler.PartyOperatopn(slea, c);
                break;
            }
            case DENY_PARTY_REQUEST: {
                PartyHandler.DenyPartyRequest(slea, c);
                break;
            }
            case BUDDYLIST_MODIFY: {
                BuddyListHandler.BuddyOperation(slea, c);
                break;
            }
            case CYGNUS_SUMMON: {
                UserInterfaceHandler.CygnusSummon_NPCRequest(c);
                break;
            }
            case SHIP_OBJECT: {
                UserInterfaceHandler.ShipObjectRequest(slea.readInt(), c);
                break;
            }
            case BUY_CS_ITEM: {
                CashShopOperation.BuyCashItem(slea, c, c.getPlayer());
                break;
            }
            case TOUCHING_CS: {
                CashShopOperation.TouchingCashShop(c);
                break;
            }
            case COUPON_CODE: {
                FileoutputUtil.log("Logs/Log_Packet_Except.rtf", "Coupon : \n" + slea.toString(true));
                System.out.println(slea.toString());
                slea.skip(2);
                CashShopOperation.CouponCode(slea.readMapleAsciiString(), c);
                break;
            }
            case CS_UPDATE: {
                CashShopOperation.CSUpdate(c);
                break;
            }
            case TOUCHING_MTS: {
                MTSOperation.MTSUpdate(MTSStorage.getInstance().getCart(c.getPlayer().getId()), c);
                break;
            }
            case MTS_TAB: {
                MTSOperation.MTSOperation(slea, c);
                break;
            }
            case DAMAGE_SUMMON: {
                slea.skip(4);
                SummonHandler.DamageSummon(slea, c.getPlayer());
                break;
            }
            case MOVE_SUMMON: {
                SummonHandler.MoveSummon(slea, c.getPlayer());
                break;
            }
            case SUMMON_ATTACK: {
                SummonHandler.SummonAttack(slea, c, c.getPlayer());
                break;
            }
            case MOVE_DRAGON: {
                SummonHandler.MoveDragon(slea, c.getPlayer());
                break;
            }
            case SPAWN_PET: {
                PetHandler.SpawnPet(slea, c, c.getPlayer());
                break;
            }
            case MOVE_PET: {
                PetHandler.MovePet(slea, c.getPlayer());
                break;
            }
            case PET_CHAT: {
                if (slea.available() < 12L) break;
                PetHandler.PetChat((int)slea.readLong(), slea.readShort(), slea.readMapleAsciiString(), c.getPlayer());
                break;
            }
            case PET_COMMAND: {
                PetHandler.PetCommand(slea, c, c.getPlayer());
                break;
            }
            case PET_FOOD: {
                PetHandler.PetFood(slea, c, c.getPlayer());
                break;
            }
            case PET_LOOT: {
                InventoryHandler.Pickup_Pet(slea, c, c.getPlayer());
                break;
            }
            case PET_AUTO_POT: {
                PetHandler.Pet_AutoPotion(slea, c, c.getPlayer());
                break;
            }
            case MONSTER_CARNIVAL: {
                MonsterCarnivalHandler.MonsterCarnival(slea, c);
                break;
            }
            case DUEY_ACTION: {
                DueyHandler.DueyOperation(slea, c);
                break;
            }
            case USE_HIRED_MERCHANT: {
                HiredMerchantHandler.UseHiredMerchant(slea, c);
                break;
            }
            case MERCH_ITEM_STORE: {
                HiredMerchantHandler.MerchantItemStore(slea, c);
                break;
            }
            case CANCEL_DEBUFF: {
                break;
            }
            case LEFT_KNOCK_BACK: {
                PlayerHandler.leftKnockBack(slea, c);
                break;
            }
            case SNOWBALL: {
                PlayerHandler.snowBall(slea, c);
                break;
            }
            case ChatRoom_SYSTEM: {
                PlayersHandler.ChatRoomHandler(slea, c);
                break;
            }
            case COCONUT: {
                PlayersHandler.hitCoconut(slea, c);
                break;
            }
            case REPAIR: {
                NPCHandler.repair(slea, c);
                break;
            }
            case REPAIR_ALL: {
                NPCHandler.repairAll(c);
                break;
            }
            case GAME_POLL: {
                UserInterfaceHandler.InGame_Poll(slea, c);
                break;
            }
            case OWL: {
                InventoryHandler.Owl(slea, c);
                break;
            }
            case OWL_WARP: {
                InventoryHandler.OwlWarp(slea, c);
                break;
            }
            case USE_OWL_MINERVA: {
                InventoryHandler.OwlMinerva(slea, c);
                break;
            }
            case RPS_GAME: {
                NPCHandler.RPSGame(slea, c);
                break;
            }
            case UPDATE_QUEST: {
                NPCHandler.UpdateQuest(slea, c);
                break;
            }
            case USE_ITEM_QUEST: {
                NPCHandler.UseItemQuest(slea, c);
                break;
            }
            case FOLLOW_REQUEST: {
                PlayersHandler.FollowRequest(slea, c);
                break;
            }
            case FOLLOW_REPLY: {
                PlayersHandler.FollowReply(slea, c);
                break;
            }
            case RING_ACTION: {
                PlayersHandler.RingAction(slea, c);
                break;
            }
            case REQUEST_FAMILY: {
                FamilyHandler.RequestFamily(slea, c);
                break;
            }
            case OPEN_FAMILY: {
                FamilyHandler.OpenFamily(slea, c);
                break;
            }
            case FAMILY_OPERATION: {
                FamilyHandler.FamilyOperation(slea, c);
                break;
            }
            case DELETE_JUNIOR: {
                FamilyHandler.DeleteJunior(slea, c);
                break;
            }
            case DELETE_SENIOR: {
                FamilyHandler.DeleteSenior(slea, c);
                break;
            }
            case USE_FAMILY: {
                FamilyHandler.UseFamily(slea, c);
                break;
            }
            case FAMILY_PRECEPT: {
                FamilyHandler.FamilyPrecept(slea, c);
                break;
            }
            case FAMILY_SUMMON: {
                FamilyHandler.FamilySummon(slea, c);
                break;
            }
            case ACCEPT_FAMILY: {
                FamilyHandler.AcceptFamily(slea, c);
                break;
            }
            case BEANS_GAME1: {
                BeanGame.BeanGame1(slea, c);
                break;
            }
            case BEANS_GAME2: {
                BeanGame.BeanGame2(slea, c);
                break;
            }
            case ITEM_SUNZI: {
                InventoryHandler.SunziBF(slea, c);
                break;
            }
            case ITEM_BAOWU: {
                InventoryHandler.HeiLong_BaoWuHe(slea, c);
                break;
            }
		default:
			break;
        }
    }

}

