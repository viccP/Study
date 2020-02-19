/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package scripting;

import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.script.Invocable;

import client.ISkill;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleQuestStatus;
import client.MapleStat;
import client.SkillEntry;
import client.SkillFactory;
import client.inventory.Equip;
import client.inventory.IItem;
import client.inventory.ItemFlag;
import client.inventory.ItemLoader;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import constants.GameConstants;
import database.DatabaseConnection;
import handling.channel.ChannelServer;
import handling.channel.MapleGuildRanking;
import handling.world.MapleParty;
import handling.world.MaplePartyCharacter;
import handling.world.World;
import handling.world.guild.MapleGuild;
import server.MapleCarnivalChallenge;
import server.MapleCarnivalParty;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleShopFactory;
import server.MapleSquad;
import server.MapleStatEffect;
import server.MerchItemPackage;
import server.Randomizer;
import server.SpeedRunner;
import server.StructPotentialItem;
import server.Timer;
import server.life.MapleMonster;
import server.life.MapleMonsterInformationProvider;
import server.life.MonsterDropEntry;
import server.life.MonsterGlobalDropEntry;
import server.maps.AramiaFireWorks;
import server.maps.Event_DojoAgent;
import server.maps.Event_PyramidSubway;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.SpeedRunType;
import server.quest.MapleQuest;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.StringUtil;
import tools.packet.PlayerShopPacket;

public class NPCConversationManager
extends AbstractPlayerInteraction {
    private MapleClient c;
    private int npc;
    private int questid;
    private String getText;
    private byte type;
    private byte lastMsg = (byte)-1;
    public boolean pendingDisposal = false;
    private Invocable iv;
    private int wh = 0;
    public int hyt = 0;
    public int dxs = 0;

    public NPCConversationManager(MapleClient c, int npc, int questid, byte type, Invocable iv, int wh) {
        super(c);
        this.c = c;
        this.npc = npc;
        this.questid = questid;
        this.type = type;
        this.iv = iv;
        this.wh = wh;
    }

    public int getwh() {
        return this.wh;
    }

    public Invocable getIv() {
        return this.iv;
    }

    public String serverName() {
        return this.c.getChannelServer().getServerName();
    }

    public int getNpc() {
        return this.npc;
    }

    public int getQuest() {
        return this.questid;
    }

    public byte getType() {
        return this.type;
    }

    public void safeDispose() {
        this.pendingDisposal = true;
    }

    public void dispose() {
        NPCScriptManager.getInstance().dispose(this.c);
    }

    public void askMapSelection(String sel) {
        if (this.lastMsg > -1) {
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getMapSelection(this.npc, sel));
        this.lastMsg = (byte)13;
    }

    public void sendNext(String text) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimple(text);
            return;
        }
        this.c.getSession().write(MaplePacketCreator.getNPCTalk(this.npc, (byte)0, text, "00 01", (byte)0));
        this.lastMsg = 0;
    }

    public void sendNextS(String text, byte type) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimpleS(text, type);
            return;
        }
        this.c.getSession().write(MaplePacketCreator.getNPCTalk(this.npc, (byte)0, text, "00 01", type));
        this.lastMsg = 0;
    }

    public void sendPrev(String text) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimple(text);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)0, text, "01 00", (byte)0));
        this.lastMsg = 0;
    }

    public void sendPrevS(String text, byte type) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimpleS(text, type);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)0, text, "01 00", type));
        this.lastMsg = 0;
    }

    public void sendNextPrev(String text) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimple(text);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)0, text, "01 01", (byte)0));
        this.lastMsg = 0;
    }

    public void PlayerToNpc(String text) {
        this.sendNextPrevS(text, (byte)3);
    }

    public void sendNextPrevS(String text) {
        this.sendNextPrevS(text, (byte)3);
    }

    public void sendNextPrevS(String text, byte type) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimpleS(text, type);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)0, text, "01 01", type));
        this.lastMsg = 0;
    }

    public void sendOk(String text) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimple(text);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)0, text, "00 00", (byte)0));
        this.lastMsg = 0;
    }

    public void sendOkS(String text, byte type) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimpleS(text, type);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)0, text, "00 00", type));
        this.lastMsg = 0;
    }

    public void sendYesNo(String text) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimple(text);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)1, text, "", (byte)0));
        this.lastMsg = 1;
    }

    public void sendYesNoS(String text, byte type) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimpleS(text, type);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)1, text, "", type));
        this.lastMsg = 1;
    }

    public void sendAcceptDecline(String text) {
        this.askAcceptDecline(text);
    }

    public void sendAcceptDeclineNoESC(String text) {
        this.askAcceptDeclineNoESC(text);
    }

    public void askAcceptDecline(String text) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimple(text);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)11, text, "", (byte)0));
        this.lastMsg = (byte)11;
    }

    public void askAcceptDeclineNoESC(String text) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimple(text);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalk(this.npc, (byte)12, text, "", (byte)0));
        this.lastMsg = (byte)12;
    }

    public void askAvatar(String text, int card, int ... args) {
        if (this.lastMsg > -1) {
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalkStyle(this.npc, text, card, args));
        this.lastMsg = (byte)7;
    }

    public void sendSimple(String text) {
        if (this.lastMsg > -1) {
            return;
        }
        if (!text.contains("#L")) {
            this.sendNext(text);
            return;
        }
        this.c.getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte)4, text, "", (byte)0));
        this.lastMsg = 4;
    }

    public void sendSimpleS(String text, byte type) {
        if (this.lastMsg > -1) {
            return;
        }
        if (!text.contains("#L")) {
            this.sendNextS(text, type);
            return;
        }
        this.c.getSession().write(MaplePacketCreator.getNPCTalk(this.npc, (byte)4, text, "", type));
        this.lastMsg = 4;
    }

    public void sendStyle(String text, int caid, int[] styles) {
        if (this.lastMsg > -1) {
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalkStyle(this.npc, text, caid, styles));
        this.lastMsg = (byte)7;
    }

    public void sendGetNumber(String text, int def, int min, int max) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.contains("#L")) {
            this.sendSimple(text);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalkNum(this.npc, text, def, min, max));
        this.lastMsg = (byte)3;
    }

    public IItem lockitem(int slot, boolean lock) {
        byte set = 0;
        byte eqslot = (byte)slot;
        Equip nEquip = (Equip)this.c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(eqslot);
        if (nEquip != null) {
            if (lock) {
                set = 1;
                this.c.getPlayer().dropMessage("[\u7cfb\u7edf\u4fe1\u606f] \u7269\u54c1\u4f4d\u7f6e " + slot + " \u9501\u5b9a\u6210\u529f");
            } else {
                this.c.getPlayer().dropMessage("[\u7cfb\u7edf\u4fe1\u606f] \u7269\u54c1\u4f4d\u7f6e " + slot + " \u89e3\u9664\u9501\u5b9a\u6210\u529f");
            }
            nEquip.setFlag(set);
            this.c.getSession().write((Object)MaplePacketCreator.getCharInfo(this.c.getPlayer()));
            this.getMap().removePlayer(this.c.getPlayer());
            this.getMap().addPlayer(this.c.getPlayer());
        } else {
            this.c.getPlayer().dropMessage("[\u7cfb\u7edf\u4fe1\u606f] \u7269\u54c1\u4f4d\u7f6e " + slot + " \u88c5\u5907\u4e3a\u7a7a.");
        }
        return nEquip;
    }

    public IItem itemqh(int slot, byte lock) {
        byte eqslot = (byte)slot;
        Equip nEquip = (Equip)this.c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(eqslot);
        if (nEquip != null && nEquip.getLevel() + nEquip.getUpgradeSlots() + lock <= 127) {
            nEquip.setUpgradeSlots((byte)(nEquip.getUpgradeSlots() + lock));
            this.c.getPlayer().dropMessage("[\u7cfb\u7edf\u4fe1\u606f] \u7269\u54c1\u4f4d\u7f6e " + slot + " \u5f3a\u5316\u6b21\u6570\u6210\u529f");
            if (this.c.getPlayer().isGM()) {
                this.c.getPlayer().dropMessage("\u5269\u4f59\u5f3a\u5316\u6b21\u6570\uff1a" + (127 - (nEquip.getLevel() + nEquip.getUpgradeSlots())));
            }
            this.c.getSession().write((Object)MaplePacketCreator.getCharInfo(this.c.getPlayer()));
            this.getMap().removePlayer(this.c.getPlayer());
            this.getMap().addPlayer(this.c.getPlayer());
        } else if (nEquip.getLevel() + nEquip.getUpgradeSlots() + lock > 127) {
            this.c.getPlayer().dropMessage("[\u7cfb\u7edf\u4fe1\u606f] \u7269\u54c1\u4f4d\u7f6e " + slot + " \u88c5\u5907\u7684\u5f3a\u5316\u6b21\u6570\u5df2\u7ecf\u6ee1\u4e86.");
        } else {
            this.c.getPlayer().dropMessage("[\u7cfb\u7edf\u4fe1\u606f] \u7269\u54c1\u4f4d\u7f6e " + slot + " \u88c5\u5907\u4e3a\u7a7a.");
        }
        return nEquip;
    }

    public void sendGetText(String text) {
        if (this.lastMsg > -1) {
            return;
        }
        if (text.length() > 13) {
            this.c.getPlayer().dropMessage(1, "\u4e2d\u65876\u5b57\u4ee5\u4e0b\u6216\u8005\u82f1\u658712\u5b57\u4ee5\u4e0b\r\n\u5426\u5219\u65e0\u6548\uff01");
            return;
        }
        if (text.contains("#L")) {
            this.sendSimple(text);
            return;
        }
        this.c.getSession().write((Object)MaplePacketCreator.getNPCTalkText(this.npc, text));
        this.lastMsg = (byte)2;
    }

    public void sendCY1(String text, byte type) {
        this.getClient().getSession().write((Object)MaplePacketCreator.getCY1(this.npc, text, type));
    }

    public void sendCY2(String text, byte type) {
        this.getClient().getSession().write((Object)MaplePacketCreator.getCY2(this.npc, text, type));
    }

    public void setGetText(String text) {
        this.getText = text;
    }

    public String getText() {
        return this.getText;
    }

    public void setHair(int hair) {
        this.getPlayer().setHair(hair);
        this.getPlayer().updateSingleStat(MapleStat.HAIR, hair);
        this.getPlayer().equipChanged();
    }

    public void setFace(int face) {
        this.getPlayer().setFace(face);
        this.getPlayer().updateSingleStat(MapleStat.FACE, face);
        this.getPlayer().equipChanged();
    }

    public void setSkin(int color) {
        this.getPlayer().setSkinColor((byte)color);
        this.getPlayer().updateSingleStat(MapleStat.SKIN, color);
        this.getPlayer().equipChanged();
    }

    public int setRandomAvatar(int ticket, int[] args_all) {
        if (!this.haveItem(ticket)) {
            return -1;
        }
        this.gainItem(ticket, (short)-1);
        int args = args_all[Randomizer.nextInt(args_all.length)];
        if (args < 100) {
            this.c.getPlayer().setSkinColor((byte)args);
            this.c.getPlayer().updateSingleStat(MapleStat.SKIN, args);
        } else if (args < 30000) {
            this.c.getPlayer().setFace(args);
            this.c.getPlayer().updateSingleStat(MapleStat.FACE, args);
        } else {
            this.c.getPlayer().setHair(args);
            this.c.getPlayer().updateSingleStat(MapleStat.HAIR, args);
        }
        this.c.getPlayer().equipChanged();
        return 1;
    }

    public int setAvatar(int ticket, int args) {
        if (!this.haveItem(ticket)) {
            return -1;
        }
        this.gainItem(ticket, (short)-1);
        if (args < 100) {
            this.c.getPlayer().setSkinColor((byte)args);
            this.c.getPlayer().updateSingleStat(MapleStat.SKIN, args);
        } else if (args < 30000) {
            this.c.getPlayer().setFace(args);
            this.c.getPlayer().updateSingleStat(MapleStat.FACE, args);
        } else {
            this.c.getPlayer().setHair(args);
            this.c.getPlayer().updateSingleStat(MapleStat.HAIR, args);
        }
        this.c.getPlayer().equipChanged();
        return 1;
    }

    public void sendStorage() {
        this.c.getPlayer().setConversation(4);
        this.c.getPlayer().getStorage().sendStorage(this.c, this.npc);
    }

    public void openShop(int id) {
        MapleShopFactory.getInstance().getShop(id).sendShop(this.c);
    }

    /**
     * 加载商店
     * @param id
     */
    public void loadShop(int id) {
        MapleShopFactory.getInstance().loadShop(id, true);
    }
    
    public int gainGachaponItem(int id, int quantity) {
        return this.gainGachaponItem(id, quantity, this.c.getPlayer().getMap().getStreetName() + " - " + this.c.getPlayer().getMap().getMapName());
    }

    public int gainGachaponItem(int id, int quantity, String msg) {
        try {
            if (!MapleItemInformationProvider.getInstance().itemExists(id)) {
                return -1;
            }
            IItem item = MapleInventoryManipulator.addbyId_Gachapon(this.c, id, (short)quantity, 0L);
            if (item == null) {
                return -1;
            }
            byte rareness = GameConstants.gachaponRareItem(item.getItemId());
            if (rareness > 0) {
                World.Broadcast.broadcastMessage(MaplePacketCreator.getGachaponMega("[" + msg + "] " + this.c.getPlayer().getName(), " : Lucky winner of Gachapon!", item, rareness, this.getPlayer().getClient().getChannel()).getBytes());
            }
            return item.getItemId();
        }
        catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public int gainGachaponItem(int id, int quantity, String msg, int \u6982\u7387, long \u65f6\u95f4) {
        try {
            if (!MapleItemInformationProvider.getInstance().itemExists(id)) {
                this.getPlayer().dropMessage(5, "gainGachaponItem itemExists(id) == -1");
                return -1;
            }
            IItem item = MapleInventoryManipulator.addbyId_Gachapon(this.c, id, (short)quantity, \u65f6\u95f4);
            if (item == null) {
                this.getPlayer().dropMessage(5, "gainGachaponItem item == -1");
                return -1;
            }
            if (\u6982\u7387 > 0) {
                World.Broadcast.broadcastMessage(MaplePacketCreator.getGachaponMega("[" + msg + "] " + this.c.getPlayer().getName(), " : Lucky winner of Gachapon!", item, (byte)0, this.getPlayer().getClient().getChannel()).getBytes());
            }
            return item.getItemId();
        }
        catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public int gainGachaponItem(int id, int quantity, String msg, int \u6982\u7387) {
        try {
            if (!MapleItemInformationProvider.getInstance().itemExists(id)) {
                this.getPlayer().dropMessage(5, "gainGachaponItem itemExists(id) == -1");
                return -1;
            }
            IItem item = MapleInventoryManipulator.addbyId_Gachapon(this.c, id, (short)quantity, 0L);
            if (item == null) {
                this.getPlayer().dropMessage(5, "gainGachaponItem item == -1");
                return -1;
            }
            if (\u6982\u7387 > 0) {
                World.Broadcast.broadcastMessage(MaplePacketCreator.getGachaponMega("[" + msg + "] " + this.c.getPlayer().getName(), " : Lucky winner of Gachapon!", item, (byte)0, this.getPlayer().getClient().getChannel()).getBytes());
            }
            return item.getItemId();
        }
        catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public void changeJob(int job) {
        this.c.getPlayer().changeJob(job);
    }

    public void startQuest(int id) {
        MapleQuest.getInstance(id).start(this.getPlayer(), this.npc);
    }

    @Override
    public void completeQuest(int id) {
        MapleQuest.getInstance(id).complete(this.getPlayer(), this.npc);
    }

    public void forfeitQuest(int id) {
        MapleQuest.getInstance(id).forfeit(this.getPlayer());
    }

    public void forceStartQuest() {
        MapleQuest.getInstance(this.questid).forceStart(this.getPlayer(), this.getNpc(), null);
    }

    @Override
    public void forceStartQuest(int id) {
        MapleQuest.getInstance(id).forceStart(this.getPlayer(), this.getNpc(), null);
    }

    public void forceStartQuest(String customData) {
        MapleQuest.getInstance(this.questid).forceStart(this.getPlayer(), this.getNpc(), customData);
    }

    public void forceCompleteQuest() {
        MapleQuest.getInstance(this.questid).forceComplete(this.getPlayer(), this.getNpc());
    }

    @Override
    public void forceCompleteQuest(int id) {
        MapleQuest.getInstance(id).forceComplete(this.getPlayer(), this.getNpc());
    }

    public String getQuestCustomData() {
        return this.c.getPlayer().getQuestNAdd(MapleQuest.getInstance(this.questid)).getCustomData();
    }

    public void setQuestCustomData(String customData) {
        this.getPlayer().getQuestNAdd(MapleQuest.getInstance(this.questid)).setCustomData(customData);
    }

    public int getLevel() {
        return this.getPlayer().getLevel();
    }

    public int getMeso() {
        return this.getPlayer().getMeso();
    }

    public void gainAp(int amount) {
        this.c.getPlayer().gainAp((short)amount);
    }

    public void expandInventory(byte type, int amt) {
        this.c.getPlayer().expandInventory(type, amt);
    }

    public void unequipEverything() {
        MapleInventory equipped = this.getPlayer().getInventory(MapleInventoryType.EQUIPPED);
        MapleInventory equip = this.getPlayer().getInventory(MapleInventoryType.EQUIP);
        LinkedList<Short> ids = new LinkedList<Short>();
        for (IItem item : equipped.list()) {
            ids.add(item.getPosition());
        }
        Iterator<Short> i$ = ids.iterator();
        while (i$.hasNext()) {
            short id = (Short)((Object)i$.next());
            MapleInventoryManipulator.unequip(this.getC(), id, equip.getNextFreeSlot());
        }
    }

    public final void clearSkills() {
        Map<ISkill, SkillEntry> skills = this.getPlayer().getSkills();
        for (Map.Entry<ISkill, SkillEntry> skill : skills.entrySet()) {
            this.getPlayer().changeSkillLevel(skill.getKey(), (byte)0, (byte)0);
        }
    }

    public boolean hasSkill(int skillid) {
        ISkill theSkill = SkillFactory.getSkill(skillid);
        if (theSkill != null) {
            return this.c.getPlayer().getSkillLevel(theSkill) > 0;
        }
        return false;
    }

    public void showEffect(boolean broadcast, String effect) {
        if (broadcast) {
            this.c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.showEffect(effect));
        } else {
            this.c.getSession().write((Object)MaplePacketCreator.showEffect(effect));
        }
    }

    public void playSound(boolean broadcast, String sound) {
        if (broadcast) {
            this.c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.playSound(sound));
        } else {
            this.c.getSession().write((Object)MaplePacketCreator.playSound(sound));
        }
    }

    public void environmentChange(boolean broadcast, String env) {
        if (broadcast) {
            this.c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.environmentChange(env, 2));
        } else {
            this.c.getSession().write((Object)MaplePacketCreator.environmentChange(env, 2));
        }
    }

    public void updateBuddyCapacity(int capacity) {
        this.c.getPlayer().setBuddyCapacity((byte)capacity);
    }

    public int getBuddyCapacity() {
        return this.c.getPlayer().getBuddyCapacity();
    }

    public int partyMembersInMap() {
        int inMap = 0;
        for (MapleCharacter char2 : this.getPlayer().getMap().getCharactersThreadsafe()) {
            if (char2.getParty() != this.getPlayer().getParty()) continue;
            ++inMap;
        }
        return inMap;
    }

    public List<MapleCharacter> getPartyMembers() {
        if (this.getPlayer().getParty() == null) {
            return null;
        }
        LinkedList<MapleCharacter> chars = new LinkedList<MapleCharacter>();
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            for (ChannelServer channel : ChannelServer.getAllInstances()) {
                MapleCharacter ch = channel.getPlayerStorage().getCharacterById(chr.getId());
                if (ch == null) continue;
                chars.add(ch);
            }
        }
        return chars;
    }

    public void warpPartyWithExp(int mapId, int exp) {
        MapleMap target = this.getMap(mapId);
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.c.getChannelServer().getPlayerStorage().getCharacterByName(chr.getName());
            if ((curChar.getEventInstance() != null || this.getPlayer().getEventInstance() != null) && curChar.getEventInstance() != this.getPlayer().getEventInstance()) continue;
            curChar.changeMap(target, target.getPortal(0));
            curChar.gainExp(exp, true, false, true);
        }
    }

    public void warpPartyWithExpMeso(int mapId, int exp, int meso) {
        MapleMap target = this.getMap(mapId);
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.c.getChannelServer().getPlayerStorage().getCharacterByName(chr.getName());
            if ((curChar.getEventInstance() != null || this.getPlayer().getEventInstance() != null) && curChar.getEventInstance() != this.getPlayer().getEventInstance()) continue;
            curChar.changeMap(target, target.getPortal(0));
            curChar.gainExp(exp, true, false, true);
            curChar.gainMeso(meso, true);
        }
    }

    public MapleSquad getSquad(String type) {
        return this.c.getChannelServer().getMapleSquad(type);
    }

    public int getSquadAvailability(String type) {
        MapleSquad squad = this.c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return -1;
        }
        return squad.getStatus();
    }

    public boolean registerSquad(String type, int minutes, String startText) {
        if (this.c.getChannelServer().getMapleSquad(type) == null) {
            MapleSquad squad = new MapleSquad(this.c.getChannel(), type, this.c.getPlayer(), minutes * 60 * 1000, startText);
            boolean ret = this.c.getChannelServer().addMapleSquad(squad, type);
            if (ret) {
                MapleMap map = this.c.getPlayer().getMap();
                map.broadcastMessage(MaplePacketCreator.getClock(minutes * 60));
                map.broadcastMessage(MaplePacketCreator.serverNotice(6, this.c.getPlayer().getName() + startText));
            } else {
                squad.clear();
            }
            return ret;
        }
        return false;
    }

    public boolean getSquadList(String type, byte type_) {
        MapleSquad squad = this.c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return false;
        }
        if (type_ == 0 || type_ == 3) {
            this.sendNext(squad.getSquadMemberString(type_));
        } else if (type_ == 1) {
            this.sendSimple(squad.getSquadMemberString(type_));
        } else if (type_ == 2) {
            if (squad.getBannedMemberSize() > 0) {
                this.sendSimple(squad.getSquadMemberString(type_));
            } else {
                this.sendNext(squad.getSquadMemberString(type_));
            }
        }
        return true;
    }

    public byte isSquadLeader(String type) {
        MapleSquad squad = this.c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return -1;
        }
        if (squad.getLeader() != null && squad.getLeader().getId() == this.c.getPlayer().getId()) {
            return 1;
        }
        return 0;
    }

    public boolean reAdd(String eim, String squad) {
        EventInstanceManager eimz = this.getDisconnected(eim);
        MapleSquad squadz = this.getSquad(squad);
        if (eimz != null && squadz != null) {
            squadz.reAddMember(this.getPlayer());
            eimz.registerPlayer(this.getPlayer());
            return true;
        }
        return false;
    }

    public void banMember(String type, int pos) {
        MapleSquad squad = this.c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.banMember(pos);
        }
    }

    public void acceptMember(String type, int pos) {
        MapleSquad squad = this.c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.acceptMember(pos);
        }
    }

    public String getReadableMillis(long startMillis, long endMillis) {
        return StringUtil.getReadableMillis(startMillis, endMillis);
    }

    public int addMember(String type, boolean join) {
        MapleSquad squad = this.c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            return squad.addMember(this.c.getPlayer(), join);
        }
        return -1;
    }

    public byte isSquadMember(String type) {
        MapleSquad squad = this.c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return -1;
        }
        if (squad.getMembers().contains(this.c.getPlayer())) {
            return 1;
        }
        if (squad.isBanned(this.c.getPlayer())) {
            return 2;
        }
        return 0;
    }

    public void resetReactors() {
        this.getPlayer().getMap().resetReactors();
    }

    public void genericGuildMessage(int code) {
        this.c.getSession().write((Object)MaplePacketCreator.genericGuildMessage((byte)code));
    }

    public void disbandGuild() {
        int gid = this.c.getPlayer().getGuildId();
        if (gid <= 0 || this.c.getPlayer().getGuildRank() != 1) {
            return;
        }
        World.Guild.disbandGuild(gid);
    }

    public void increaseGuildCapacity() {
        if (this.c.getPlayer().getMeso() < 2500000) {
            this.c.getSession().write((Object)MaplePacketCreator.serverNotice(1, "You do not have enough mesos."));
            return;
        }
        int gid = this.c.getPlayer().getGuildId();
        if (gid <= 0) {
            return;
        }
        World.Guild.increaseGuildCapacity(gid);
        this.c.getPlayer().gainMeso(-2500000, true, false, true);
    }

    public void displayGuildRanks() {
        this.c.getSession().write((Object)MaplePacketCreator.showGuildRanks(this.npc, MapleGuildRanking.getInstance().getRank()));
    }

    public boolean removePlayerFromInstance() {
        if (this.c.getPlayer().getEventInstance() != null) {
            this.c.getPlayer().getEventInstance().removePlayer(this.c.getPlayer());
            return true;
        }
        return false;
    }

    public boolean isPlayerInstance() {
        return this.c.getPlayer().getEventInstance() != null;
    }

    public void changeStat(byte slot, int type, short amount) {
        Equip sel = (Equip)this.c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot);
        switch (type) {
            case 0: {
                sel.setStr(amount);
                break;
            }
            case 1: {
                sel.setDex(amount);
                break;
            }
            case 2: {
                sel.setInt(amount);
                break;
            }
            case 3: {
                sel.setLuk(amount);
                break;
            }
            case 4: {
                sel.setHp(amount);
                break;
            }
            case 5: {
                sel.setMp(amount);
                break;
            }
            case 6: {
                sel.setWatk(amount);
                break;
            }
            case 7: {
                sel.setMatk(amount);
                break;
            }
            case 8: {
                sel.setWdef(amount);
                break;
            }
            case 9: {
                sel.setMdef(amount);
                break;
            }
            case 10: {
                sel.setAcc(amount);
                break;
            }
            case 11: {
                sel.setAvoid(amount);
                break;
            }
            case 12: {
                sel.setHands(amount);
                break;
            }
            case 13: {
                sel.setSpeed(amount);
                break;
            }
            case 14: {
                sel.setJump(amount);
                break;
            }
            case 15: {
                sel.setUpgradeSlots((byte)amount);
                break;
            }
            case 16: {
                sel.setViciousHammer((byte)amount);
                break;
            }
            case 17: {
                sel.setLevel((byte)amount);
                break;
            }
            case 18: {
                sel.setEnhance((byte)amount);
                break;
            }
            case 19: {
                sel.setPotential1(amount);
                break;
            }
            case 20: {
                sel.setPotential2(amount);
                break;
            }
            case 21: {
                sel.setPotential3(amount);
                break;
            }
            case 22: {
                sel.setOwner(this.getText());
                break;
            }
        }
        this.c.getPlayer().equipChanged();
    }

    public void killAllMonsters() {
        MapleMap map = this.c.getPlayer().getMap();
        double range = Double.POSITIVE_INFINITY;
        for (MapleMapObject monstermo : map.getMapObjectsInRange(this.c.getPlayer().getPosition(), range, Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.MONSTER}))) {
            MapleMonster mob2 = (MapleMonster)monstermo;
            if (!mob2.getStats().isBoss()) continue;
            map.killMonster(mob2, this.c.getPlayer(), false, false, (byte)1);
        }
    }

    public void giveMerchantMesos() {
        long mesos = 0L;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM hiredmerchants WHERE merchantid = ?");
            ps.setInt(1, this.getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
            } else {
                mesos = rs.getLong("mesos");
            }
            rs.close();
            ps.close();
            ps = con.prepareStatement("UPDATE hiredmerchants SET mesos = 0 WHERE merchantid = ?");
            ps.setInt(1, this.getPlayer().getId());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException ex) {
            System.err.println("Error gaining mesos in hired merchant" + ex);
        }
        this.c.getPlayer().gainMeso((int)mesos, true);
    }

    public void dc() {
        MapleCharacter victim = this.c.getChannelServer().getPlayerStorage().getCharacterByName(this.c.getPlayer().getName().toString());
        victim.getClient().getSession().close();
        victim.getClient().disconnect(true, false);
    }

    public long getMerchantMesos() {
        long mesos = 0L;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM hiredmerchants WHERE merchantid = ?");
            ps.setInt(1, this.getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
            } else {
                mesos = rs.getLong("mesos");
            }
            rs.close();
            ps.close();
        }
        catch (SQLException ex) {
            System.err.println("Error gaining mesos in hired merchant" + ex);
        }
        return mesos;
    }

    public void openDuey() {
        this.c.getPlayer().setConversation(2);
        this.c.getSession().write((Object)MaplePacketCreator.sendDuey((byte)9, null));
    }

    public void openMerchantItemStore() {
        this.c.getPlayer().setConversation(3);
        this.c.getSession().write((Object)PlayerShopPacket.merchItemStore((byte)34));
    }

    public void openMerchantItemStore1() {
        MerchItemPackage pack = NPCConversationManager.loadItemFrom_Database(this.c.getPlayer().getId(), this.c.getPlayer().getAccountID());
        this.c.getSession().write((Object)PlayerShopPacket.merchItemStore_ItemData(pack));
    }

    private static final MerchItemPackage loadItemFrom_Database(int charid, int accountid) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * from hiredmerch where characterid = ? OR accountid = ?");
            ps.setInt(1, charid);
            ps.setInt(2, accountid);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                ps.close();
                rs.close();
                return null;
            }
            int packageid = rs.getInt("PackageId");
            MerchItemPackage pack = new MerchItemPackage();
            pack.setPackageid(packageid);
            pack.setMesos(rs.getInt("Mesos"));
            pack.setSentTime(rs.getLong("time"));
            ps.close();
            rs.close();
            Map<Integer, Pair<IItem, MapleInventoryType>> items = ItemLoader.HIRED_MERCHANT.loadItems(false, charid);
            if (items != null) {
                ArrayList<IItem> iters = new ArrayList<IItem>();
                for (Pair<IItem, MapleInventoryType> z : items.values()) {
                    iters.add((IItem)z.left);
                }
                pack.setItems(iters);
            }
            return pack;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void sendRepairWindow() {
        this.c.getSession().write((Object)MaplePacketCreator.sendRepairWindow(this.npc));
    }

    public final int getDojoPoints() {
        return this.c.getPlayer().getDojo();
    }

    public final int getDojoRecord() {
        return this.c.getPlayer().getDojoRecord();
    }

    public void setDojoRecord(boolean reset) {
        this.c.getPlayer().setDojoRecord(reset);
    }

    public boolean start_DojoAgent(boolean dojo, boolean party) {
        if (dojo) {
            return Event_DojoAgent.warpStartDojo(this.c.getPlayer(), party);
        }
        return Event_DojoAgent.warpStartAgent(this.c.getPlayer(), party);
    }

    public boolean start_PyramidSubway(int pyramid) {
        if (pyramid >= 0) {
            return Event_PyramidSubway.warpStartPyramid(this.c.getPlayer(), pyramid);
        }
        return Event_PyramidSubway.warpStartSubway(this.c.getPlayer());
    }

    public boolean bonus_PyramidSubway(int pyramid) {
        if (pyramid >= 0) {
            return Event_PyramidSubway.warpBonusPyramid(this.c.getPlayer(), pyramid);
        }
        return Event_PyramidSubway.warpBonusSubway(this.c.getPlayer());
    }

    public final short getKegs() {
        return AramiaFireWorks.getInstance().getKegsPercentage();
    }

    public void giveKegs(int kegs) {
        AramiaFireWorks.getInstance().giveKegs(this.c.getPlayer(), kegs);
    }

    public final short getSunshines() {
        return AramiaFireWorks.getInstance().getSunsPercentage();
    }

    public void addSunshines(int kegs) {
        AramiaFireWorks.getInstance().giveSuns(this.c.getPlayer(), kegs);
    }

    public final short getDecorations() {
        return AramiaFireWorks.getInstance().getDecsPercentage();
    }

    public void addDecorations(int kegs) {
        try {
            AramiaFireWorks.getInstance().giveDecs(this.c.getPlayer(), kegs);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public final MapleInventory getInventory(int type) {
        return this.c.getPlayer().getInventory(MapleInventoryType.getByType((byte)type));
    }

    public final MapleCarnivalParty getCarnivalParty() {
        return this.c.getPlayer().getCarnivalParty();
    }

    public final MapleCarnivalChallenge getNextCarnivalRequest() {
        return this.c.getPlayer().getNextCarnivalRequest();
    }

    public final MapleCarnivalChallenge getCarnivalChallenge(MapleCharacter chr) {
        return new MapleCarnivalChallenge(chr);
    }

    public void setHP(short hp) {
        this.c.getPlayer().getStat().setHp(hp);
    }

    public void maxStats() {
        ArrayList<Pair<MapleStat, Integer>> statup = new ArrayList<Pair<MapleStat, Integer>>(2);
        this.c.getPlayer().getStat().setStr((short)32767);
        this.c.getPlayer().getStat().setDex((short)32767);
        this.c.getPlayer().getStat().setInt((short)32767);
        this.c.getPlayer().getStat().setLuk((short)32767);
        this.c.getPlayer().getStat().setMaxHp((short)30000);
        this.c.getPlayer().getStat().setMaxMp((short)30000);
        this.c.getPlayer().getStat().setHp(30000);
        this.c.getPlayer().getStat().setMp(30000);
        statup.add(new Pair<MapleStat, Integer>(MapleStat.STR, 32767));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.DEX, 32767));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.LUK, 32767));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.INT, 32767));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.HP, 30000));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, 30000));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MP, 30000));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, 30000));
        this.c.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statup, this.c.getPlayer().getJob()));
    }

    public Pair<String, Map<Integer, String>> getSpeedRun(String typ) {
        SpeedRunType type = SpeedRunType.valueOf(typ);
        if (SpeedRunner.getInstance().getSpeedRunData(type) != null) {
            return SpeedRunner.getInstance().getSpeedRunData(type);
        }
        return new Pair<String, Map<Integer, String>>("", new HashMap<Integer, String>());
    }

    public boolean getSR(Pair<String, Map<Integer, String>> ma, int sel) {
        if (ma.getRight().get(sel) == null || ma.getRight().get(sel).length() <= 0) {
            this.dispose();
            return false;
        }
        this.sendOk(ma.getRight().get(sel));
        return true;
    }

    public Equip getEquip(int itemid) {
        return (Equip)MapleItemInformationProvider.getInstance().getEquipById(itemid);
    }

    public void setExpiration(Object statsSel, long expire) {
        if (statsSel instanceof Equip) {
            ((Equip)statsSel).setExpiration(System.currentTimeMillis() + expire * 24L * 60L * 60L * 1000L);
        }
    }

    public void setLock(Object statsSel) {
        if (statsSel instanceof Equip) {
            Equip eq = (Equip)statsSel;
            if (eq.getExpiration() == -1L) {
                eq.setFlag((byte)(eq.getFlag() | ItemFlag.LOCK.getValue()));
            } else {
                eq.setFlag((byte)(eq.getFlag() | ItemFlag.UNTRADEABLE.getValue()));
            }
        }
    }

    public boolean addFromDrop(Object statsSel) {
        if (statsSel instanceof IItem) {
            IItem it = (IItem)statsSel;
            return MapleInventoryManipulator.checkSpace(this.getClient(), it.getItemId(), it.getQuantity(), it.getOwner()) && MapleInventoryManipulator.addFromDrop(this.getClient(), it, false);
        }
        return false;
    }

    public boolean replaceItem(int slot, int invType, Object statsSel, int offset, String type) {
        return this.replaceItem(slot, invType, statsSel, offset, type, false);
    }

    public boolean replaceItem(int slot, int invType, Object statsSel, int offset, String type, boolean takeSlot) {
        MapleInventoryType inv = MapleInventoryType.getByType((byte)invType);
        if (inv == null) {
            return false;
        }
        IItem item = this.getPlayer().getInventory(inv).getItem((byte)slot);
        if (item == null || statsSel instanceof IItem) {
            item = (IItem)statsSel;
        }
        if (offset > 0) {
            if (inv != MapleInventoryType.EQUIP) {
                return false;
            }
            Equip eq = (Equip)item;
            if (takeSlot) {
                if (eq.getUpgradeSlots() < 1) {
                    return false;
                }
                eq.setUpgradeSlots((byte)(eq.getUpgradeSlots() - 1));
            }
            if (type.equalsIgnoreCase("Slots")) {
                eq.setUpgradeSlots((byte)(eq.getUpgradeSlots() + offset));
            } else if (type.equalsIgnoreCase("Level")) {
                eq.setLevel((byte)(eq.getLevel() + offset));
            } else if (type.equalsIgnoreCase("Hammer")) {
                eq.setViciousHammer((byte)(eq.getViciousHammer() + offset));
            } else if (type.equalsIgnoreCase("STR")) {
                eq.setStr((short)(eq.getStr() + offset));
            } else if (type.equalsIgnoreCase("DEX")) {
                eq.setDex((short)(eq.getDex() + offset));
            } else if (type.equalsIgnoreCase("INT")) {
                eq.setInt((short)(eq.getInt() + offset));
            } else if (type.equalsIgnoreCase("LUK")) {
                eq.setLuk((short)(eq.getLuk() + offset));
            } else if (type.equalsIgnoreCase("HP")) {
                eq.setHp((short)(eq.getHp() + offset));
            } else if (type.equalsIgnoreCase("MP")) {
                eq.setMp((short)(eq.getMp() + offset));
            } else if (type.equalsIgnoreCase("WATK")) {
                eq.setWatk((short)(eq.getWatk() + offset));
            } else if (type.equalsIgnoreCase("MATK")) {
                eq.setMatk((short)(eq.getMatk() + offset));
            } else if (type.equalsIgnoreCase("WDEF")) {
                eq.setWdef((short)(eq.getWdef() + offset));
            } else if (type.equalsIgnoreCase("MDEF")) {
                eq.setMdef((short)(eq.getMdef() + offset));
            } else if (type.equalsIgnoreCase("ACC")) {
                eq.setAcc((short)(eq.getAcc() + offset));
            } else if (type.equalsIgnoreCase("Avoid")) {
                eq.setAvoid((short)(eq.getAvoid() + offset));
            } else if (type.equalsIgnoreCase("Hands")) {
                eq.setHands((short)(eq.getHands() + offset));
            } else if (type.equalsIgnoreCase("Speed")) {
                eq.setSpeed((short)(eq.getSpeed() + offset));
            } else if (type.equalsIgnoreCase("Jump")) {
                eq.setJump((short)(eq.getJump() + offset));
            } else if (type.equalsIgnoreCase("ItemEXP")) {
                eq.setItemEXP(eq.getItemEXP() + offset);
            } else if (type.equalsIgnoreCase("Expiration")) {
                eq.setExpiration(eq.getExpiration() + (long)offset);
            } else if (type.equalsIgnoreCase("Flag")) {
                eq.setFlag((byte)(eq.getFlag() + offset));
            }
            if (eq.getExpiration() == -1L) {
                eq.setFlag((byte)(eq.getFlag() | ItemFlag.LOCK.getValue()));
            } else {
                eq.setFlag((byte)(eq.getFlag() | ItemFlag.UNTRADEABLE.getValue()));
            }
            item = eq.copy();
        }
        MapleInventoryManipulator.removeFromSlot(this.getClient(), inv, (short)slot, item.getQuantity(), false);
        return MapleInventoryManipulator.addFromDrop(this.getClient(), item, false);
    }

    public boolean replaceItem(int slot, int invType, Object statsSel, int upgradeSlots) {
        return this.replaceItem(slot, invType, statsSel, upgradeSlots, "Slots");
    }

    public boolean isCash(int itemId) {
        return MapleItemInformationProvider.getInstance().isCash(itemId);
    }

    public void buffGuild(int buff, int duration, String msg) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (ii.getItemEffect(buff) != null && this.getPlayer().getGuildId() > 0) {
            MapleStatEffect mse = ii.getItemEffect(buff);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                    if (chr.getGuildId() != this.getPlayer().getGuildId()) continue;
                    mse.applyTo(chr, chr, true, null, duration);
                    chr.dropMessage(5, "Your guild has gotten a " + msg + " buff.");
                }
            }
        }
    }

    public boolean createAlliance(String alliancename) {
        MapleParty pt = this.c.getPlayer().getParty();
        MapleCharacter otherChar = this.c.getChannelServer().getPlayerStorage().getCharacterById(pt.getMemberByIndex(1).getId());
        if (otherChar == null || otherChar.getId() == this.c.getPlayer().getId()) {
            return false;
        }
        try {
            return World.Alliance.createAlliance(alliancename, this.c.getPlayer().getId(), otherChar.getId(), this.c.getPlayer().getGuildId(), otherChar.getGuildId());
        }
        catch (Exception re) {
            re.printStackTrace();
            return false;
        }
    }

    public boolean addCapacityToAlliance() {
        try {
            MapleGuild gs = World.Guild.getGuild(this.c.getPlayer().getGuildId());
            if (gs != null && this.c.getPlayer().getGuildRank() == 1 && this.c.getPlayer().getAllianceRank() == 1 && World.Alliance.getAllianceLeader(gs.getAllianceId()) == this.c.getPlayer().getId() && World.Alliance.changeAllianceCapacity(gs.getAllianceId())) {
                this.gainMeso(-10000000);
                return true;
            }
        }
        catch (Exception re) {
            re.printStackTrace();
        }
        return false;
    }

    public boolean disbandAlliance() {
        try {
            MapleGuild gs = World.Guild.getGuild(this.c.getPlayer().getGuildId());
            if (gs != null && this.c.getPlayer().getGuildRank() == 1 && this.c.getPlayer().getAllianceRank() == 1 && World.Alliance.getAllianceLeader(gs.getAllianceId()) == this.c.getPlayer().getId() && World.Alliance.disbandAlliance(gs.getAllianceId())) {
                return true;
            }
        }
        catch (Exception re) {
            re.printStackTrace();
        }
        return false;
    }

    public byte getLastMsg() {
        return this.lastMsg;
    }

    public final void setLastMsg(byte last) {
        this.lastMsg = last;
    }

    public int getBossLog(String bossid) {
        return this.getPlayer().getBossLog(bossid);
    }

    public void setBossLog(String bossid) {
        this.getPlayer().setBossLog(bossid);
    }

    public final void givePartyBossLog(String bossid) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1) {
            this.setBossLog(bossid);
            return;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            if (curChar == null) continue;
            curChar.setBossLog(bossid);
        }
    }

    public final boolean getPartyBossLog(String bossid, int b) {
        int a = 0;
        int c = 0;
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMembers().size() == 1 && this.getBossLog(bossid) < b) {
            return true;
        }
        for (MaplePartyCharacter chr : this.getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = this.getMap().getCharacterById(chr.getId());
            ++c;
            if (curChar == null || curChar.getBossLog(bossid) >= b) continue;
            ++a;
        }
        return a == c;
    }

    public final void maxAllSkills() {
        for (ISkill skil : SkillFactory.getAllSkills()) {
            if (!GameConstants.isApplicableSkill(skil.getId())) continue;
            this.teachSkill(skil.getId(), skil.getMaxLevel(), skil.getMaxLevel());
        }
    }

    public final void resetStats(int str, int dex, int z, int luk) {
        this.c.getPlayer().resetStats(str, dex, z, luk);
    }

    public final boolean dropItem(int slot, int invType, int quantity) {
        MapleInventoryType inv = MapleInventoryType.getByType((byte)invType);
        if (inv == null) {
            return false;
        }
        return MapleInventoryManipulator.drop(this.c, inv, (short)slot, (short)quantity, true);
    }

    public final List<Integer> getAllPotentialInfo() {
        return new ArrayList<Integer>(MapleItemInformationProvider.getInstance().getAllPotentialInfo().keySet());
    }

    public final String getPotentialInfo(int id) {
        List<StructPotentialItem> potInfo = MapleItemInformationProvider.getInstance().getPotentialInfo(id);
        StringBuilder builder = new StringBuilder("#b#ePOTENTIAL INFO FOR ID: ");
        builder.append(id);
        builder.append("#n#k\r\n\r\n");
        int minLevel = 1;
        int maxLevel = 10;
        for (StructPotentialItem item : potInfo) {
            builder.append("#eLevels ");
            builder.append(minLevel);
            builder.append("~");
            builder.append(maxLevel);
            builder.append(": #n");
            builder.append(item.toString());
            minLevel += 10;
            maxLevel += 10;
            builder.append("\r\n");
        }
        return builder.toString();
    }

    public final void sendRPS() {
        this.c.getSession().write((Object)MaplePacketCreator.getRPSMode((byte)8, -1, -1, -1));
    }

    public final void setQuestRecord(Object ch, int questid, String data) {
        ((MapleCharacter)ch).getQuestNAdd(MapleQuest.getInstance(questid)).setCustomData(data);
    }

    public final void doWeddingEffect(Object ch) {
        final MapleCharacter chr = (MapleCharacter)ch;
        this.getMap().broadcastMessage(MaplePacketCreator.yellowChat(this.getPlayer().getName() + ", do you take " + chr.getName() + " as your wife and promise to stay beside her through all downtimes, crashes, and lags?"));
        Timer.CloneTimer.getInstance().schedule(new Runnable(){

            @Override
            public void run() {
                if (chr == null || NPCConversationManager.this.getPlayer() == null) {
                    NPCConversationManager.this.warpMap(680000500, 0);
                } else {
                    NPCConversationManager.this.getMap().broadcastMessage(MaplePacketCreator.yellowChat(chr.getName() + ", do you take " + NPCConversationManager.this.getPlayer().getName() + " as your husband and promise to stay beside him through all downtimes, crashes, and lags?"));
                }
            }
        }, 10000L);
        Timer.CloneTimer.getInstance().schedule(new Runnable(){

            @Override
            public void run() {
                if (chr == null || NPCConversationManager.this.getPlayer() == null) {
                    if (NPCConversationManager.this.getPlayer() != null) {
                        NPCConversationManager.this.setQuestRecord(NPCConversationManager.this.getPlayer(), 160001, "3");
                        NPCConversationManager.this.setQuestRecord(NPCConversationManager.this.getPlayer(), 160002, "0");
                    } else if (chr != null) {
                        NPCConversationManager.this.setQuestRecord(chr, 160001, "3");
                        NPCConversationManager.this.setQuestRecord(chr, 160002, "0");
                    }
                    NPCConversationManager.this.warpMap(680000500, 0);
                } else {
                    NPCConversationManager.this.setQuestRecord(NPCConversationManager.this.getPlayer(), 160001, "2");
                    NPCConversationManager.this.setQuestRecord(chr, 160001, "2");
                    NPCConversationManager.this.sendNPCText(NPCConversationManager.this.getPlayer().getName() + " and " + chr.getName() + ", I wish you two all the best on your AsteriaSEA journey together!", 9201002);
                    NPCConversationManager.this.getMap().startExtendedMapEffect("You may now kiss the bride, " + NPCConversationManager.this.getPlayer().getName() + "!", 5120006);
                    if (chr.getGuildId() > 0) {
                        World.Guild.guildPacket(chr.getGuildId(), MaplePacketCreator.sendMarriage(false, chr.getName()));
                    }
                    if (chr.getFamilyId() > 0) {
                        World.Family.familyPacket(chr.getFamilyId(), MaplePacketCreator.sendMarriage(true, chr.getName()), chr.getId());
                    }
                    if (NPCConversationManager.this.getPlayer().getGuildId() > 0) {
                        World.Guild.guildPacket(NPCConversationManager.this.getPlayer().getGuildId(), MaplePacketCreator.sendMarriage(false, NPCConversationManager.this.getPlayer().getName()));
                    }
                    if (NPCConversationManager.this.getPlayer().getFamilyId() > 0) {
                        World.Family.familyPacket(NPCConversationManager.this.getPlayer().getFamilyId(), MaplePacketCreator.sendMarriage(true, chr.getName()), NPCConversationManager.this.getPlayer().getId());
                    }
                }
            }
        }, 20000L);
    }

    public void openDD(int type) {
        this.c.getSession().write((Object)MaplePacketCreator.openBeans(this.getPlayer().getBeans(), type));
    }

    public void worldMessage(String text) {
        World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(6, text).getBytes());
    }

    public int getBeans() {
        return this.getClient().getPlayer().getBeans();
    }

    public void gainBeans(int s) {
        this.getPlayer().gainBeans(s);
        this.c.getSession().write((Object)MaplePacketCreator.updateBeans(this.c.getPlayer().getId(), s));
    }

    public int getHyPay(int type) {
        return this.getPlayer().getHyPay(type);
    }

    public void szhs(String ss) {
        this.c.getSession().write((Object)MaplePacketCreator.\u6e38\u620f\u5c4f\u5e55\u4e2d\u95f4\u9ec4\u8272\u5b57\u4f53(ss));
    }

    public void szhs(String ss, int id) {
        this.c.getSession().write((Object)MaplePacketCreator.\u6e38\u620f\u5c4f\u5e55\u4e2d\u95f4\u9ec4\u8272\u5b57\u4f53(ss, id));
    }

    public int gainHyPay(int hypay) {
        return this.getPlayer().gainHyPay(hypay);
    }

    public int addHyPay(int hypay) {
        return this.getPlayer().addHyPay(hypay);
    }

    public int delPayReward(int pay) {
        return this.getPlayer().delPayReward(pay);
    }

    public int getItemLevel(int id) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        return ii.getReqLevel(id);
    }

    public void alatPQ() {
    }

    public void xlkc(long days) {
        MapleQuestStatus marr = this.getPlayer().getQuestNoAdd(MapleQuest.getInstance(122700));
        if (marr != null && marr.getCustomData() != null && Long.parseLong(marr.getCustomData()) >= System.currentTimeMillis()) {
            this.getPlayer().dropMessage(1, "\u9879\u94fe\u6269\u5145\u5931\u8d25\uff0c\u60a8\u5df2\u7ecf\u8fdb\u884c\u8fc7\u9879\u94fe\u6269\u5145\u3002");
        } else {
            String customData = String.valueOf(System.currentTimeMillis() + days * 24L * 60L * 60L * 1000L);
            this.getPlayer().getQuestNAdd(MapleQuest.getInstance(122700)).setCustomData(customData);
            this.getPlayer().dropMessage(1, "\u9879\u94fe" + days + "\u6269\u5145\u6269\u5145\u6210\u529f\uff01");
        }
    }

    public String checkDrop(int mobId) {
        List<MonsterDropEntry> ranks = MapleMonsterInformationProvider.getInstance().retrieveDrop(mobId);
        if (ranks != null && ranks.size() > 0) {
            int num = 0;
            int itemId = 0;
            int ch = 0;
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            StringBuilder name = new StringBuilder();
            for (int i = 0; i < ranks.size(); ++i) {
                MonsterDropEntry de = ranks.get(i);
                if (de.chance <= 0 || de.questid > 0 && (de.questid <= 0 || MapleQuest.getInstance(de.questid).getName().length() <= 0) || !ii.itemExists(itemId = de.itemId)) continue;
                if (num == 0) {
                    name.append("\u5f53\u524d\u602a\u7269 #o").append(mobId).append("# \u7684\u7206\u7387\u4e3a:\r\n");
                    name.append("--------------------------------------\r\n");
                }
                String namez = "#z" + itemId + "#";
                if (itemId == 0) {
                    itemId = 4031041;
                    namez = de.Minimum * this.getClient().getChannelServer().getMesoRate() + " - " + de.Maximum * this.getClient().getChannelServer().getMesoRate() + " \u7684\u91d1\u5e01";
                }
                ch = de.chance * this.getClient().getChannelServer().getDropRate();
                if (this.getPlayer().isAdmin()) {
                    name.append(num + 1).append(") #v").append(itemId).append("#").append(namez).append(" - ").append(Integer.valueOf(ch >= 999999 ? 1000000 : ch).doubleValue() / 10000.0).append("%\u7684\u7206\u7387. ").append(de.questid > 0 && MapleQuest.getInstance(de.questid).getName().length() > 0 ? "\u9700\u8981\u63a5\u53d7\u4efb\u52a1: " + MapleQuest.getInstance(de.questid).getName() : "").append("\r\n");
                } else {
                    name.append(num + 1).append(") #v").append(itemId).append("#").append(namez).append(de.questid > 0 && MapleQuest.getInstance(de.questid).getName().length() > 0 ? "\u9700\u8981\u63a5\u53d7\u4efb\u52a1: " + MapleQuest.getInstance(de.questid).getName() : "").append("\r\n");
                }
                ++num;
            }
            if (name.length() > 0) {
                return name.toString();
            }
        }
        return "\u6ca1\u6709\u627e\u5230\u8fd9\u4e2a\u602a\u7269\u7684\u7206\u7387\u6570\u636e\u3002";
    }

    public String checkMapDrop() {
        ArrayList<MonsterGlobalDropEntry> ranks = new ArrayList<MonsterGlobalDropEntry>(MapleMonsterInformationProvider.getInstance().getGlobalDrop());
        int mapid = this.c.getPlayer().getMap().getId();
        int cashServerRate = this.getClient().getChannelServer().getCashRate();
        int globalServerRate = 1;
        if (ranks != null && ranks.size() > 0) {
            int num = 0;
            StringBuilder name = new StringBuilder();
            for (int i = 0; i < ranks.size(); ++i) {
                MonsterGlobalDropEntry de = (MonsterGlobalDropEntry)ranks.get(i);
                if (!(de.continent < 0 || de.continent < 10 && mapid / 100000000 == de.continent || de.continent < 100 && mapid / 10000000 == de.continent) && (de.continent >= 1000 || mapid / 1000000 != de.continent)) continue;
                int itemId = de.itemId;
                if (num == 0) {
                    name.append("\u5f53\u524d\u5730\u56fe #r").append(mapid).append("#k - #m").append(mapid).append("# \u7684\u5168\u5c40\u7206\u7387\u4e3a:");
                    name.append("\r\n--------------------------------------\r\n");
                }
                String names = "#z" + itemId + "#";
                if (itemId == 0 && cashServerRate != 0) {
                    itemId = 4031041;
                    names = de.Minimum * cashServerRate + " - " + de.Maximum * cashServerRate + " \u7684\u62b5\u7528\u5377";
                }
                int chance = de.chance * globalServerRate;
                if (this.getPlayer().isAdmin()) {
                    name.append(num + 1).append(") #v").append(itemId).append("#").append(names).append(" - ").append(Integer.valueOf(chance >= 999999 ? 1000000 : chance).doubleValue() / 10000.0).append("%\u7684\u7206\u7387. ").append(de.questid > 0 && MapleQuest.getInstance(de.questid).getName().length() > 0 ? "\u9700\u8981\u63a5\u53d7\u4efb\u52a1: " + MapleQuest.getInstance(de.questid).getName() : "").append("\r\n");
                } else {
                    name.append(num + 1).append(") #v").append(itemId).append("#").append(names).append(de.questid > 0 && MapleQuest.getInstance(de.questid).getName().length() > 0 ? "\u9700\u8981\u63a5\u53d7\u4efb\u52a1: " + MapleQuest.getInstance(de.questid).getName() : "").append("\r\n");
                }
                ++num;
            }
            if (name.length() > 0) {
                return name.toString();
            }
        }
        return "\u5f53\u524d\u5730\u56fe\u6ca1\u6709\u8bbe\u7f6e\u5168\u5c40\u7206\u7387\u3002";
    }

    public void sendEventWindow(int lx) {
        this.c.getSession().write((Object)MaplePacketCreator.sendEventWindow(0, lx));
    }

    public int tylxfk(String aa) {
        int aaa = Integer.parseInt(aa);
        return aaa;
    }

    public void petName(String name) {
        this.getPlayer().petName(name);
    }

    public boolean petgm() {
        MaplePet pet = this.getPlayer().getPet(0);
        if (pet == null) {
            this.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(1, "\u8bf7\u53ec\u5524\u4e00\u53ea\u5ba0\u7269\u51fa\u6765\uff01"));
            this.getClient().getSession().write((Object)MaplePacketCreator.enableActions());
            return false;
        }
        return true;
    }

    public static int calculatePlaces(String str) {
        int m = 0;
        char[] arr = str.toCharArray();
        for (int i = 0; i < arr.length; ++i) {
            char c = arr[i];
            if (c >= '\u0391' && c <= '\uffe5') {
                m += 2;
                continue;
            }
            if (c < '\u0000' || c > '\u00ff') continue;
            ++m;
        }
        return m;
    }

    public static boolean calculate(String str) {
        boolean result = str.matches("[0-9]+");
        if (result) {
            System.out.println("\u8be5\u5b57\u7b26\u4e32\u662f\u7eaf\u6570\u5b57");
            return true;
        }
        System.out.println("\u8be5\u5b57\u7b26\u4e32\u4e0d\u662f\u7eaf\u6570\u5b57");
        return false;
    }

    public static boolean isNumeric(String str) {
        int i = str.length();
        while (--i >= 0) {
            if (Character.isDigit(str.charAt(i))) continue;
            return false;
        }
        return true;
    }

    public void setgrname(int name) {
        this.getPlayer().setgrname(name);
    }

    public void setjzname(int name) {
        this.getPlayer().setjzname(name);
    }

    public int getgrname() {
        return this.getPlayer().getgrname();
    }

    public int getjzname() {
        return this.getPlayer().getjzname();
    }

    public void setName(String name) {
        this.getPlayer().setName(name);
        this.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(1, "\u8bf7\u6362\u4e0b\u9891\u9053\u5c31\u80fd\u6b63\u5e38\u663e\u793a\u540d\u5b57\u4e86\uff01"));
        this.getClient().getSession().write((Object)MaplePacketCreator.enableActions());
    }

    public boolean Gzz() {
        return this.getPlayer().getGuild().getLeaderId() == this.getPlayer().getId();
    }

    public void setGName(String name) {
        this.getPlayer().getGuild().setName(name);
        this.getClient().getSession().write((Object)MaplePacketCreator.serverNotice(1, "\u8bf7\u6362\u4e0b\u9891\u9053\u5c31\u80fd\u6b63\u5e38\u663e\u793a\u540d\u5b57\u4e86\uff01"));
        this.getClient().getSession().write((Object)MaplePacketCreator.enableActions());
    }

    public int getHour() {
        return Calendar.getInstance().get(11);
    }

    public int getMin() {
        return Calendar.getInstance().get(12);
    }

    public int getSec() {
        return Calendar.getInstance().get(13);
    }

    public int gethour() {
        Calendar cal = Calendar.getInstance();
        int hour = cal.get(11);
        return hour;
    }

    public int getmin() {
        Calendar cal = Calendar.getInstance();
        int min = cal.get(12);
        return min;
    }

    public int getsec() {
        Calendar cal = Calendar.getInstance();
        int sec = cal.get(13);
        return sec;
    }

    public int getMount(int s) {
        return GameConstants.getMountS(s);
    }

    public int gethyt() {
        return this.hyt;
    }

    public void sethyt(int a) {
        this.hyt = a;
    }

    public void gainhyt(int a) {
        this.hyt += a;
        if (this.gethyt() >= 5000 && this.getdxs() >= 5000) {
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                if (cserv.getZiDongDrop() > 1 && cserv.getZiDongExp() > 1) {
                    return;
                }
                cserv.setZiDongDrop(3);
                cserv.setZiDongExp(3);
                for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                    if (chr == null) continue;
                    chr.startMapEffect("\u653e\u70df\u706b\u5f00\u542f3\u500d\u7ecf\u9a8c3\u500d\u7206\u7387\u6d3b\u52a8\uff01", 5120000);
                }
            }
            this.hyt = 0;
            this.dxs = 0;
            Timer.CloneTimer.getInstance().schedule(new Runnable(){

                @Override
                public void run() {
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        cserv.setZiDongDrop(1);
                        cserv.setZiDongExp(1);
                        for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                            if (chr == null) continue;
                            chr.startMapEffect("\u653e\u70df\u706b\u5173\u95ed3\u500d\u7ecf\u9a8c3\u500d\u7206\u7387\u6d3b\u52a8\uff01\u671f\u5f85\u4e0b\u6b21\u6d3b\u52a8\uff01", 5120000);
                        }
                    }
                }
            }, 7200000L);
        }
    }

    public int getdxs() {
        return this.dxs;
    }

    public void setdxs(int a) {
        this.dxs = a;
    }

    public void gaindxs(int a) {
        this.dxs += a;
        if (this.gethyt() >= 5000 && this.getdxs() >= 5000) {
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                if (cserv.getZiDongDrop() > 1 && cserv.getZiDongExp() > 1) {
                    return;
                }
                cserv.setZiDongDrop(3);
                cserv.setZiDongExp(3);
                for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                    if (chr == null) continue;
                    chr.startMapEffect("放烟火开启3倍经验3倍爆率活动！", 5120000);
                }
            }
            this.hyt = 0;
            this.dxs = 0;
            Timer.CloneTimer.getInstance().schedule(new Runnable(){

                @Override
                public void run() {
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        cserv.setZiDongDrop(1);
                        cserv.setZiDongExp(1);
                        for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                            if (chr == null) continue;
                            chr.startMapEffect("放烟火关闭3倍经验3倍爆率活动！期待下次活动！", 5120000);
                        }
                    }
                }
            }, 7200000L);
        }
    }

    public void 喇叭(int lx, String msg) throws RemoteException {
        switch (lx) {
            case 1: {
                World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(11, this.c.getChannel(), "全服喇叭]" + this.c.getPlayer().getName() + " : " + msg).getBytes());
                break;
            }
            case 2: {
                World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(12, this.c.getChannel(), "全服喇叭]" + this.c.getPlayer().getName() + " : " + msg).getBytes());
                break;
            }
            case 3: {
                World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(3, this.c.getChannel(), "全服喇叭]" + this.c.getPlayer().getName() + " : " + msg).getBytes());
            }
        }
    }

    public void displayGuildRankss() {
        MapleGuild.displayGuildRanks(this.getClient(), this.npc);
    }

    public void displayRewnu2Ranks() {
        MapleGuild.displayRenwu2Ranks(this.getClient(), this.npc);
    }

    public void displayLevelRanks() {
        MapleGuild.displayLevelRanks(this.getClient(), this.npc);
    }

    public void \u91d1\u5e01\u6392\u884c() {
        MapleGuild.meso(this.getClient(), this.npc);
    }

    public void \u4eba\u6c14\u6392\u884c\u699c() {
        MapleGuild.\u4eba\u6c14\u6392\u884c(this.getClient(), this.npc);
    }
}

