/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.channel.handler;

import java.util.List;

import client.BuddylistEntry;
import client.CharacterNameAndId;
import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleQuestStatus;
import client.SkillFactory;
import handling.MaplePacket;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.world.CharacterIdChannelPair;
import handling.world.CharacterTransfer;
import handling.world.MapleMessenger;
import handling.world.MapleMessengerCharacter;
import handling.world.MaplePartyCharacter;
import handling.world.PartyOperation;
import handling.world.PlayerBuffStorage;
import handling.world.World;
import handling.world.guild.MapleGuild;
import scripting.NPCScriptManager;
import server.maps.FieldLimitType;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.packet.FamilyPacket;

public class InterServerHandler {
    public static final void EnterCS(MapleClient c, MapleCharacter chr, boolean mts) {
        if (c.getPlayer().getBuffedValue(MapleBuffStat.SUMMON) != null) {
            c.getPlayer().cancelEffectFromBuffStat(MapleBuffStat.SUMMON);
        }
        ChannelServer ch = ChannelServer.getInstance(c.getChannel());
        chr.changeRemoval();
        if (chr.getMessenger() != null) {
            MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(chr);
            World.Messenger.leaveMessenger(chr.getMessenger().getId(), messengerplayer);
        }
        PlayerBuffStorage.addBuffsToStorage(chr.getId(), chr.getAllBuffs());
        PlayerBuffStorage.addCooldownsToStorage(chr.getId(), chr.getCooldowns());
        PlayerBuffStorage.addDiseaseToStorage(chr.getId(), chr.getAllDiseases());
        World.ChannelChange_Data(new CharacterTransfer(chr), chr.getId(), mts ? -20 : -10);
        ch.removePlayer(chr);
        c.updateLoginState(MapleClient.CHANGE_CHANNEL, c.getSessionIPAddress());
        c.getSession().write(MaplePacketCreator.getChannelChange(CashShopServer.getPort()));
        chr.saveToDB(false, false);
        chr.getMap().removePlayer(chr);
        c.setPlayer(null);
        c.setReceiving(false);
    }

    public static final void EnterMTS(MapleClient c, MapleCharacter chr, boolean mts) {
    	if (c.getPlayer().getTrade() != null) {
            c.getPlayer().dropMessage(1, "交易中无法进行其他操作！");
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        if (!chr.isGM() || chr.isGM()) {
            NPCScriptManager.getInstance().start(c, 9900004);
            c.getSession().write((Object)MaplePacketCreator.enableActions());
        } else {
            ChannelServer ch = ChannelServer.getInstance(c.getChannel());
            chr.changeRemoval();
            if (chr.getMessenger() != null) {
                MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(chr);
                World.Messenger.leaveMessenger(chr.getMessenger().getId(), messengerplayer);
            }
            PlayerBuffStorage.addBuffsToStorage(chr.getId(), chr.getAllBuffs());
            PlayerBuffStorage.addCooldownsToStorage(chr.getId(), chr.getCooldowns());
            PlayerBuffStorage.addDiseaseToStorage(chr.getId(), chr.getAllDiseases());
            World.ChannelChange_Data(new CharacterTransfer(chr), chr.getId(), mts ? -20 : -10);
            ch.removePlayer(chr);
            c.updateLoginState(6, c.getSessionIPAddress());
            c.getSession().write(MaplePacketCreator.getChannelChange(CashShopServer.getPort()));
            chr.saveToDB(false, false);
            chr.getMap().removePlayer(chr);
            c.setPlayer(null);
            c.setReceiving(false);
        }
    }

    public static final void Loggedin(int playerid, MapleClient c) {
        ChannelServer channelServer = c.getChannelServer();
        CharacterTransfer transfer = channelServer.getPlayerStorage().getPendingCharacter(playerid);
        MapleCharacter player = transfer == null ? MapleCharacter.loadCharFromDB(playerid, c, true) : MapleCharacter.ReconstructChr(transfer, c, true);
        c.setPlayer(player);
        c.setAccID(player.getAccountID());
        if (!c.CheckIPAddress()) {
            // empty if block
        }
        byte state = c.getLoginState();
        boolean allowLogin = false;
        if (!(state != 1 && state != 6 || World.isCharacterListConnected(c.loadCharacterNames(c.getWorld())))) {
            allowLogin = true;
        }
        if (!allowLogin) {
            c.setPlayer(null);
            c.getSession().close();
            return;
        }
        c.updateLoginState(2, c.getSessionIPAddress());
        channelServer.addPlayer(player);
        c.getSession().write((Object)MaplePacketCreator.getCharInfo(player));
        if (player.isGM()) {
            SkillFactory.getSkill(9001004).getEffect(1).applyTo(player);
        }
        c.getSession().write((Object)MaplePacketCreator.temporaryStats_Reset());
        player.getMap().addPlayer(player);
        try {
            player.silentGiveBuffs(PlayerBuffStorage.getBuffsFromStorage(player.getId()));
            player.giveCoolDowns(PlayerBuffStorage.getCooldownsFromStorage(player.getId()));
            player.giveSilentDebuff(PlayerBuffStorage.getDiseaseFromStorage(player.getId()));
            int[] buddyIds = player.getBuddylist().getBuddyIds();
            World.Buddy.loggedOn(player.getName(), player.getId(), c.getChannel(), buddyIds, player.getGMLevel(), player.isHidden());
            if (player.getParty() != null) {
                World.Party.updateParty(player.getParty().getId(), PartyOperation.LOG_ONOFF, new MaplePartyCharacter(player));
            }
            CharacterIdChannelPair[] onlineBuddies=World.Find.multiBuddyFind(player.getId(), buddyIds);
            for (CharacterIdChannelPair onlineBuddy : onlineBuddies) {
                BuddylistEntry ble = player.getBuddylist().get(onlineBuddy.getCharacterId());
                ble.setChannel(onlineBuddy.getChannel());
                player.getBuddylist().put(ble);
            }
            c.getSession().write(MaplePacketCreator.updateBuddylist(player.getBuddylist().getBuddies()));
            MapleMessenger messenger = player.getMessenger();
            if (messenger != null) {
                World.Messenger.silentJoinMessenger(messenger.getId(), new MapleMessengerCharacter(c.getPlayer()));
                World.Messenger.updateMessenger(messenger.getId(), c.getPlayer().getName(), c.getChannel());
            }
            if (player.getGuildId() > 0) {
                World.Guild.setGuildMemberOnline(player.getMGC(), true, c.getChannel());
                c.getSession().write((Object)MaplePacketCreator.showGuildInfo(player));
                MapleGuild gs = World.Guild.getGuild(player.getGuildId());
                if (gs != null) {
                    List<MaplePacket> packetList = World.Alliance.getAllianceInfo(gs.getAllianceId(), true);
                    if (packetList != null) {
                        for (MaplePacket pack : packetList) {
                            if (pack == null) continue;
                            c.getSession().write((Object)pack);
                        }
                    }
                } else {
                    player.setGuildId(0);
                    player.setGuildRank((byte)5);
                    player.setAllianceRank((byte)5);
                    player.saveGuildStatus();
                }
            }
            if (player.getFamilyId() > 0) {
                World.Family.setFamilyMemberOnline(player.getMFC(), true, c.getChannel());
            }
            c.getSession().write((Object)FamilyPacket.getFamilyData());
            c.getSession().write((Object)FamilyPacket.getFamilyInfo(player));
        }
        catch (Exception e) {
            FileoutputUtil.outputFileError("Logs/Log_Login_Error.rtf", e);
        }
        player.sendMacros();
        player.showNote();
        player.updatePartyMemberHP();
        player.startFairySchedule(false);
        player.baseSkills();
        c.getSession().write((Object)MaplePacketCreator.getKeymap(player.getKeyLayout()));
        for (MapleQuestStatus status : player.getStartedQuests()) {
            if (!status.hasMobKills()) continue;
            c.getSession().write((Object)MaplePacketCreator.updateQuestMobKills(status));
        }
        CharacterNameAndId pendingBuddyRequest = player.getBuddylist().pollPendingRequest();
        if (pendingBuddyRequest != null) {
            player.getBuddylist().put(new BuddylistEntry(pendingBuddyRequest.getName(), pendingBuddyRequest.getId(), "ETC", -1, false, pendingBuddyRequest.getLevel(), pendingBuddyRequest.getJob()));
            c.getSession().write((Object)MaplePacketCreator.requestBuddylistAdd(pendingBuddyRequest.getId(), pendingBuddyRequest.getName(), pendingBuddyRequest.getLevel(), pendingBuddyRequest.getJob()));
        }
        player.expirationTask();
        if (player.getJob() == 132) {
            player.checkBerserk();
        }
        if (player.getMapId() >= 910000020) {
            player.dropMessage(5, "6");
        }
        player.spawnClones();
        player.getHyPay(1);
        player.getFishingJF(1);
        c.getSession().write((Object)MaplePacketCreator.showCharCash(c.getPlayer()));
        c.getSession().write((Object)MaplePacketCreator.weirdStatUpdate());
    }

    public static final void ChangeChannel(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (c.getPlayer().getTrade() != null || !chr.isAlive() || chr.getEventInstance() != null || chr.getMap() == null || FieldLimitType.ChannelSwitch.check(chr.getMap().getFieldLimit())) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        chr.changeChannel(slea.readByte() + 1);
    }
}

