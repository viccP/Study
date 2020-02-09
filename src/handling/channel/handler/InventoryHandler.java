/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.channel.handler;

import client.ISkill;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleQuestStatus;
import client.MapleStat;
import client.PlayerStats;
import client.SkillFactory;
import client.anticheat.CheatTracker;
import client.anticheat.CheatingOffense;
import client.inventory.Equip;
import client.inventory.IEquip;
import client.inventory.IItem;
import client.inventory.ItemFlag;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.inventory.MapleMount;
import client.inventory.MaplePet;
import constants.GameConstants;
import handling.MaplePacket;
import handling.channel.ChannelServer;
import handling.channel.PlayerStorage;
import handling.world.MapleParty;
import handling.world.MaplePartyCharacter;
import handling.world.World;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.geom.Point2D;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import scripting.EventInstanceManager;
import scripting.NPCScriptManager;
import server.AutobanManager;
import server.CashItemInfo;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MaplePortal;
import server.MapleShop;
import server.MapleShopFactory;
import server.MapleStatEffect;
import server.MapleTrade;
import server.PredictCardFactory;
import server.RandomRewards;
import server.Randomizer;
import server.StructPotentialItem;
import server.StructRewardItem;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.FieldLimitType;
import server.maps.MapleFoothold;
import server.maps.MapleFootholdTree;
import server.maps.MapleLove;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.MapleMapItem;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleMist;
import server.maps.SavedLocationType;
import server.quest.MapleQuest;
import server.shops.AbstractPlayerStore;
import server.shops.HiredMerchant;
import server.shops.IMaplePlayerShop;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.packet.MTSCSPacket;
import tools.packet.PetPacket;
import tools.packet.PlayerShopPacket;

public class InventoryHandler {
    public static final int OWL_ID = 2;

    public static final void ItemMove(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().getPlayerShop() != null || c.getPlayer().getConversation() > 0 || c.getPlayer().getTrade() != null) {
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
        short src = slea.readShort();
        short dst = slea.readShort();
        short quantity = slea.readShort();
        if (src < 0 && dst > 0) {
            MapleInventoryManipulator.unequip(c, src, dst);
        } else if (dst < 0) {
            if (dst == -128) {
                c.getPlayer().dropMessage(5, "dst:-128\u73b0\u91d1\u6212\u6307\u4f4d\u6682\u505c\u5f00\u653e(\u5f85\u4fee\u590d)\uff01");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            MapleInventoryManipulator.equip(c, src, dst);
        } else if (dst == 0) {
            MapleInventoryManipulator.drop(c, type, src, quantity);
        } else {
            MapleInventoryManipulator.move(c, type, src, dst);
        }
    }

    public static final void ItemSort(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        MapleInventoryType pInvType = MapleInventoryType.getByType(slea.readByte());
        if (pInvType == MapleInventoryType.UNDEFINED) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        MapleInventory pInv = c.getPlayer().getInventory(pInvType);
        boolean sorted = false;
        while (!sorted) {
            byte freeSlot = (byte)pInv.getNextFreeSlot();
            if (freeSlot != -1) {
                int itemSlot = -1;
                for (byte i = (byte)(freeSlot + 1); i <= pInv.getSlotLimit(); i = (byte)(i + 1)) {
                    if (pInv.getItem(i) == null) continue;
                    itemSlot = i;
                    break;
                }
                if (itemSlot > 0) {
                    MapleInventoryManipulator.move(c, pInvType, (short)itemSlot, freeSlot);
                    continue;
                }
                sorted = true;
                continue;
            }
            sorted = true;
        }
        c.getSession().write((Object)MaplePacketCreator.finishedSort(pInvType.getType()));
        c.getSession().write((Object)MaplePacketCreator.enableActions());
    }

    public static final void ItemGather(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        byte mode = slea.readByte();
        MapleInventoryType invType = MapleInventoryType.getByType(mode);
        MapleInventory Inv = c.getPlayer().getInventory(invType);
        LinkedList<IItem> itemMap = new LinkedList<IItem>();
        for (IItem item : Inv.list()) {
            itemMap.add(item.copy());
        }
        for (IItem itemStats : itemMap) {
            MapleInventoryManipulator.removeById(c, invType, itemStats.getItemId(), itemStats.getQuantity(), true, false);
        }
        List<IItem> sortedItems = InventoryHandler.sortItems(itemMap);
        for (IItem item : sortedItems) {
            MapleInventoryManipulator.addFromDrop(c, item, false);
        }
        c.getSession().write((Object)MaplePacketCreator.finishedGather(mode));
        c.getSession().write((Object)MaplePacketCreator.enableActions());
        itemMap.clear();
        sortedItems.clear();
    }

    private static final List<IItem> sortItems(List<IItem> passedMap) {
        ArrayList<Integer> itemIds = new ArrayList<Integer>();
        for (IItem item : passedMap) {
            itemIds.add(item.getItemId());
        }
        Collections.sort(itemIds);
        LinkedList<IItem> sortedList = new LinkedList<IItem>();
        block1: for (Integer val : itemIds) {
            for (IItem item : passedMap) {
                if (val.intValue() != item.getItemId()) continue;
                sortedList.add(item);
                passedMap.remove(item);
                continue block1;
            }
        }
        return sortedList;
    }

    public static final boolean UseRewardItem(byte slot, int itemId, MapleClient c, MapleCharacter chr) {
        IItem toUse = c.getPlayer().getInventory(GameConstants.getInventoryType(itemId)).getItem(slot);
        c.getSession().write((Object)MaplePacketCreator.enableActions());
        if (toUse != null && toUse.getQuantity() >= 1 && toUse.getItemId() == itemId) {
            if (chr.getInventory(MapleInventoryType.EQUIP).getNextFreeSlot() > -1 && chr.getInventory(MapleInventoryType.USE).getNextFreeSlot() > -1 && chr.getInventory(MapleInventoryType.SETUP).getNextFreeSlot() > -1 && chr.getInventory(MapleInventoryType.ETC).getNextFreeSlot() > -1) {
                MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                Pair<Integer, List<StructRewardItem>> rewards = ii.getRewardItem(itemId);
                if (rewards != null && rewards.getLeft() > 0) {
                    boolean rewarded = false;
                    while (!rewarded) {
                        for (StructRewardItem reward : rewards.getRight()) {
                            if (reward.prob <= 0 || Randomizer.nextInt(rewards.getLeft()) >= reward.prob) continue;
                            if (GameConstants.getInventoryType(reward.itemid) == MapleInventoryType.EQUIP) {
                                IItem item = ii.getEquipById(reward.itemid);
                                if (reward.period > 0L) {
                                    item.setExpiration(System.currentTimeMillis() + reward.period * 60L * 60L * 10L);
                                }
                                MapleInventoryManipulator.addbyItem(c, item);
                            } else {
                                MapleInventoryManipulator.addById(c, reward.itemid, reward.quantity, (byte)0);
                            }
                            MapleInventoryManipulator.removeById(c, GameConstants.getInventoryType(itemId), itemId, 1, false, false);
                            rewarded = true;
                            return true;
                        }
                    }
                } else {
                    chr.dropMessage(6, "Unknown error.");
                }
            } else {
                chr.dropMessage(6, "\u4f60\u6709\u4e00\u500b\u6b04\u4f4d\u6eff\u4e86 \u8acb\u7a7a\u51fa\u4f86\u518d\u6253\u958b");
            }
        }
        return false;
    }

    public static final void QuestKJ(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getCSPoints(2) < 200) {
            chr.dropMessage(1, "\u4f60\u6ca1\u6709\u8db3\u591f\u7684\u62b5\u7528\u5377\uff01");
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        byte action = (byte)(slea.readByte() + 1);
        short quest = slea.readShort();
        if (quest < 0) {
            quest = (short)(quest + 65536);
        }
        if (chr == null) {
            return;
        }
        MapleQuest q = MapleQuest.getInstance(quest);
        switch (action) {
            case 2: {
                int npc = slea.readInt();
                q.complete(chr, npc);
                break;
            }
        }
        chr.modifyCSPoints(2, -200);
    }

    public static final void UseItem(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMapId() == 749040100 || chr.getMap() == null) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        long time = System.currentTimeMillis();
        if (chr.getNextConsume() > time) {
            chr.dropMessage(5, "You may not use this item yet.");
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte)slea.readShort();
        int itemId = slea.readInt();
        IItem toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        if (!FieldLimitType.PotionUse.check(chr.getMap().getFieldLimit()) || chr.getMapId() == 610030600) {
            if (MapleItemInformationProvider.getInstance().getItemEffect(toUse.getItemId()).applyTo(chr)) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short)1, false);
                if (chr.getMap().getConsumeItemCoolTime() > 0) {
                    chr.setNextConsume(time + (long)(chr.getMap().getConsumeItemCoolTime() * 1000));
                }
            }
        } else {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
        }
    }

    public static final void UseReturnScroll(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (!chr.isAlive() || chr.getMapId() == 749040100) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte)slea.readShort();
        int itemId = slea.readInt();
        IItem toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        if (!FieldLimitType.PotionUse.check(chr.getMap().getFieldLimit())) {
            if (MapleItemInformationProvider.getInstance().getItemEffect(toUse.getItemId()).applyReturnScroll(chr)) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short)1, false);
            } else {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            }
        } else {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
        }
    }

    public static final void UseMagnify(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        IItem magnify = c.getPlayer().getInventory(MapleInventoryType.USE).getItem((byte)slea.readShort());
        IItem toReveal = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte)slea.readShort());
        if (magnify == null || toReveal == null) {
            c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
            return;
        }
        Equip eqq = (Equip)toReveal;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int reqLevel = ii.getReqLevel(eqq.getItemId()) / 10;
        if (eqq.getState() == 1 && (magnify.getItemId() == 2460003 || magnify.getItemId() == 2460002 && reqLevel <= 12 || magnify.getItemId() == 2460001 && reqLevel <= 7 || magnify.getItemId() == 2460000 && reqLevel <= 3)) {
            int lines;
            LinkedList<List<StructPotentialItem>> pots = new LinkedList<List<StructPotentialItem>>(ii.getAllPotentialInfo().values());
            int new_state = Math.abs(eqq.getPotential1());
            if (new_state > 7 || new_state < 5) {
                new_state = 5;
            }
            int n = lines = eqq.getPotential2() != 0 ? 3 : 2;
            while (eqq.getState() != new_state) {
                for (int i = 0; i < lines; ++i) {
                    boolean rewarded = false;
                    while (!rewarded) {
                        StructPotentialItem pot = (StructPotentialItem)((List)pots.get(Randomizer.nextInt(pots.size()))).get(reqLevel);
                        if (pot == null || pot.reqLevel / 10 > reqLevel || !GameConstants.optionTypeFits(pot.optionType, eqq.getItemId()) || !GameConstants.potentialIDFits(pot.potentialID, new_state, i)) continue;
                        if (i == 0) {
                            eqq.setPotential1(pot.potentialID);
                        } else if (i == 1) {
                            eqq.setPotential2(pot.potentialID);
                        } else if (i == 2) {
                            eqq.setPotential3(pot.potentialID);
                        }
                        rewarded = true;
                    }
                }
            }
        } else {
            c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
            return;
        }
        c.getSession().write((Object)MaplePacketCreator.scrolledItem(magnify, toReveal, false, true));
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, magnify.getPosition(), (short)1, false);
    }

    public static final boolean UseUpgradeScroll(byte slot, byte dst, byte ws, MapleClient c, MapleCharacter chr) {
        return InventoryHandler.UseUpgradeScroll(slot, dst, ws, c, chr, 0);
    }

    public static final boolean UseUpgradeScroll(byte slot, byte dst, byte ws, MapleClient c, MapleCharacter chr, int vegas) {
        IEquip toScroll;
        boolean whiteScroll = false;
        boolean legendarySpirit = false;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if ((ws & 2) == 2) {
            whiteScroll = true;
        }
        if (dst < 0) {
            toScroll = (IEquip)chr.getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
        } else {
            legendarySpirit = true;
            toScroll = (IEquip)chr.getInventory(MapleInventoryType.EQUIP).getItem(dst);
        }
        if (toScroll == null) {
            return false;
        }
        byte oldLevel = toScroll.getLevel();
        byte oldEnhance = toScroll.getEnhance();
        byte oldState = toScroll.getState();
        byte oldFlag = toScroll.getFlag();
        byte oldSlots = toScroll.getUpgradeSlots();
        boolean checkIfGM = c.getPlayer().isGM();
        IItem scroll = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (scroll == null) {
            c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
            return false;
        }
        if (!(GameConstants.isSpecialScroll(scroll.getItemId()) || GameConstants.isCleanSlate(scroll.getItemId()) || GameConstants.isEquipScroll(scroll.getItemId()) || GameConstants.isPotentialScroll(scroll.getItemId()) || GameConstants.is\u8fd8\u539f\u7c7b\u5377\u8f74(scroll.getItemId()))) {
            if (toScroll.getUpgradeSlots() < 1) {
                c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
                return false;
            }
        } else if (GameConstants.isEquipScroll(scroll.getItemId())) {
            if (toScroll.getUpgradeSlots() >= 1 || toScroll.getEnhance() >= 100 || vegas > 0 || ii.isCash(toScroll.getItemId())) {
                c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
                return false;
            }
        } else if (GameConstants.isPotentialScroll(scroll.getItemId()) && (toScroll.getState() >= 1 || toScroll.getLevel() == 0 && toScroll.getUpgradeSlots() == 0 || vegas > 0 || ii.isCash(toScroll.getItemId()))) {
            c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
            return false;
        }
        if (!GameConstants.canScroll(toScroll.getItemId()) && !GameConstants.isChaosScroll(toScroll.getItemId())) {
            c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
            return false;
        }
        if ((GameConstants.isCleanSlate(scroll.getItemId()) || GameConstants.isTablet(scroll.getItemId()) || GameConstants.isChaosScroll(scroll.getItemId())) && (vegas > 0 || ii.isCash(toScroll.getItemId()))) {
            c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
            return false;
        }
        if (GameConstants.isTablet(scroll.getItemId()) && toScroll.getDurability() < 0) {
            c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
            return false;
        }
        if (!GameConstants.isTablet(scroll.getItemId()) && toScroll.getDurability() >= 0) {
            c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
            return false;
        }
        IItem wscroll = null;
        List<Integer> scrollReqs = ii.getScrollReqs(scroll.getItemId());
        if (scrollReqs.size() > 0 && !scrollReqs.contains(toScroll.getItemId())) {
            c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
            return false;
        }
        if (whiteScroll && (wscroll = chr.getInventory(MapleInventoryType.USE).findById(2340000)) == null) {
            whiteScroll = false;
        }
        if (scroll.getItemId() == 2049115 && toScroll.getItemId() != 1003068) {
            return false;
        }
        if (GameConstants.isTablet(scroll.getItemId())) {
            switch (scroll.getItemId() % 1000 / 100) {
                case 0: {
                    if (!GameConstants.isTwoHanded(toScroll.getItemId()) && GameConstants.isWeapon(toScroll.getItemId())) break;
                    return false;
                }
                case 1: {
                    if (GameConstants.isTwoHanded(toScroll.getItemId()) && GameConstants.isWeapon(toScroll.getItemId())) break;
                    return false;
                }
                case 2: {
                    if (!GameConstants.isAccessory(toScroll.getItemId()) && !GameConstants.isWeapon(toScroll.getItemId())) break;
                    return false;
                }
                case 3: {
                    if (GameConstants.isAccessory(toScroll.getItemId()) && !GameConstants.isWeapon(toScroll.getItemId())) break;
                    return false;
                }
            }
        } else if (!(GameConstants.isAccessoryScroll(scroll.getItemId()) || GameConstants.isChaosScroll(scroll.getItemId()) || GameConstants.isCleanSlate(scroll.getItemId()) || GameConstants.isEquipScroll(scroll.getItemId()) || GameConstants.isPotentialScroll(scroll.getItemId()) || ii.canScroll(scroll.getItemId(), toScroll.getItemId()))) {
            return false;
        }
        if (GameConstants.isAccessoryScroll(scroll.getItemId()) && !GameConstants.isAccessory(toScroll.getItemId())) {
            return false;
        }
        if (scroll.getQuantity() <= 0) {
            return false;
        }
        if (legendarySpirit && vegas == 0 && chr.getSkillLevel(SkillFactory.getSkill(1003)) <= 0 && chr.getSkillLevel(SkillFactory.getSkill(10001003)) <= 0 && chr.getSkillLevel(SkillFactory.getSkill(20001003)) <= 0 && chr.getSkillLevel(SkillFactory.getSkill(20011003)) <= 0 && chr.getSkillLevel(SkillFactory.getSkill(30001003)) <= 0) {
            AutobanManager.getInstance().addPoints(c, 50, 120000L, "Using the Skill 'Legendary Spirit' without having it.");
            return false;
        }
        IEquip scrolled = (IEquip)ii.scrollEquipWithId(toScroll, scroll, whiteScroll, chr, vegas, checkIfGM);
        IEquip.ScrollResult scrollSuccess = scrolled == null ? IEquip.ScrollResult.CURSE : (scrolled.getLevel() > oldLevel || scrolled.getEnhance() > oldEnhance || scrolled.getState() > oldState || scrolled.getFlag() > oldFlag ? IEquip.ScrollResult.SUCCESS : (GameConstants.isCleanSlate(scroll.getItemId()) && scrolled.getUpgradeSlots() > oldSlots ? IEquip.ScrollResult.SUCCESS : IEquip.ScrollResult.FAIL));
        chr.getInventory(MapleInventoryType.USE).removeItem(scroll.getPosition(), (short)1, false);
        if (whiteScroll) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, wscroll.getPosition(), (short)1, false, false);
        }
        if (scrollSuccess == IEquip.ScrollResult.CURSE) {
            c.getSession().write((Object)MaplePacketCreator.scrolledItem(scroll, toScroll, true, false));
            if (dst < 0) {
                chr.getInventory(MapleInventoryType.EQUIPPED).removeItem(toScroll.getPosition());
            } else {
                chr.getInventory(MapleInventoryType.EQUIP).removeItem(toScroll.getPosition());
            }
        } else if (vegas == 0) {
            c.getSession().write((Object)MaplePacketCreator.scrolledItem(scroll, scrolled, false, false));
        }
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.getScrollEffect(c.getPlayer().getId(), scrollSuccess, legendarySpirit), vegas == 0);
        if (dst < 0 && (scrollSuccess == IEquip.ScrollResult.SUCCESS || scrollSuccess == IEquip.ScrollResult.CURSE) && vegas == 0) {
            chr.equipChanged();
        }
        return true;
    }

    public static final void UseCatchItem(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte)slea.readShort();
        int itemid = slea.readInt();
        MapleMonster mob2 = chr.getMap().getMonsterByOid(slea.readInt());
        IItem toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemid && mob2 != null) {
            switch (itemid) {
                case 2270004: {
                    MapleMap map = chr.getMap();
                    if (mob2.getHp() <= mob2.getMobMaxHp() / 2L) {
                        map.broadcastMessage(MaplePacketCreator.catchMonster(mob2.getId(), itemid, (byte)1));
                        map.killMonster(mob2, chr, true, false, (byte)0);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemid, 1, false, false);
                        MapleInventoryManipulator.addById(c, 4001169, (short)1, (byte)0);
                        break;
                    }
                    map.broadcastMessage(MaplePacketCreator.catchMonster(mob2.getId(), itemid, (byte)0));
                    chr.dropMessage(5, "The monster has too much physical strength, so you cannot catch it.");
                    break;
                }
                case 2270002: {
                    MapleMap map = chr.getMap();
                    if (mob2.getHp() <= mob2.getMobMaxHp() / 2L) {
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.catchMonster(mob2.getId(), itemid, (byte)1));
                        map.killMonster(mob2, chr, true, false, (byte)0);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemid, 1, false, false);
                        c.getPlayer().setAPQScore(c.getPlayer().getAPQScore() + 1);
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.updateAriantPQRanking(c.getPlayer().getName(), c.getPlayer().getAPQScore(), false));
                        break;
                    }
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.catchMonster(mob2.getId(), itemid, (byte)0));
                    chr.dropMessage(5, "The monster has too much physical strength, so you cannot catch it.");
                    break;
                }
                case 2270000: {
                    if (mob2.getId() != 9300101) break;
                    MapleMap map = c.getPlayer().getMap();
                    map.broadcastMessage(MaplePacketCreator.catchMonster(mob2.getId(), itemid, (byte)1));
                    map.killMonster(mob2, chr, true, false, (byte)0);
                    MapleInventoryManipulator.addById(c, 1902000, (short)1, null, (byte)0);
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemid, 1, false, false);
                    break;
                }
                case 2270003: {
                    if (mob2.getId() != 9500320) break;
                    MapleMap map = c.getPlayer().getMap();
                    if (mob2.getHp() <= mob2.getMobMaxHp() / 2L) {
                        map.broadcastMessage(MaplePacketCreator.catchMonster(mob2.getId(), itemid, (byte)1));
                        map.killMonster(mob2, chr, true, false, (byte)0);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemid, 1, false, false);
                        break;
                    }
                    map.broadcastMessage(MaplePacketCreator.catchMonster(mob2.getId(), itemid, (byte)0));
                    chr.dropMessage(5, "The monster has too much physical strength, so you cannot catch it.");
                    break;
                }
            }
        }
        c.getSession().write((Object)MaplePacketCreator.enableActions());
    }

    public static final void UseMountFood(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte)slea.readShort();
        int itemid = slea.readInt();
        IItem toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        MapleMount mount = chr.getMount();
        if (toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemid && mount != null) {
            byte fatigue = mount.getFatigue();
            boolean levelup = false;
            mount.setFatigue((byte)-30);
            if (fatigue > 0) {
                mount.increaseExp();
                byte level = mount.getLevel();
                if (mount.getExp() >= GameConstants.getMountExpNeededForLevel(level + 1) && level < 31) {
                    mount.setLevel((byte)(level + 1));
                    levelup = true;
                }
            }
            chr.getMap().broadcastMessage(MaplePacketCreator.updateMount(chr, levelup));
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short)1, false);
        }
        c.getSession().write((Object)MaplePacketCreator.enableActions());
    }

    public static final void UseScriptedNPCItem(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte)slea.readShort();
        int itemId = slea.readInt();
        IItem toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        long expiration_days = 0L;
        int mountid = 0;
        if (toUse != null && toUse.getQuantity() >= 1 && toUse.getItemId() == itemId) {
            switch (toUse.getItemId()) {
                case 2430007: {
                    MapleInventory inventory = chr.getInventory(MapleInventoryType.SETUP);
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short)1, false);
                    if (inventory.countById(3994102) >= 20 && inventory.countById(3994103) >= 20 && inventory.countById(3994104) >= 20 && inventory.countById(3994105) >= 20) {
                        MapleInventoryManipulator.addById(c, 2430008, (short)1, (byte)0);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.SETUP, 3994102, 20, false, false);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.SETUP, 3994103, 20, false, false);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.SETUP, 3994104, 20, false, false);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.SETUP, 3994105, 20, false, false);
                    } else {
                        MapleInventoryManipulator.addById(c, 2430007, (short)1, (byte)0);
                    }
                    NPCScriptManager.getInstance().start(c, 2084001);
                    break;
                }
                case 2430008: {
                    chr.saveLocation(SavedLocationType.RICHIE);
                    boolean warped = false;
                    for (int i = 390001000; i <= 390001004; ++i) {
                        MapleMap map = c.getChannelServer().getMapFactory().getMap(i);
                        if (map.getCharactersSize() != 0) continue;
                        chr.changeMap(map, map.getPortal(0));
                        warped = true;
                        break;
                    }
                    if (warped) {
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, 2430008, 1, false, false);
                        break;
                    }
                    c.getPlayer().dropMessage(5, "All maps are currently in use, please try again later.");
                    break;
                }
                case 2430112: {
                    if (c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430112) >= 25) {
                            if (MapleInventoryManipulator.checkSpace(c, 2049400, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, 2430112, 25, true, false)) {
                                MapleInventoryManipulator.addById(c, 2049400, (short)1, (byte)0);
                                break;
                            }
                            c.getPlayer().dropMessage(5, "Please make some space.");
                            break;
                        }
                        if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430112) >= 10) {
                            if (MapleInventoryManipulator.checkSpace(c, 2049400, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, 2430112, 10, true, false)) {
                                MapleInventoryManipulator.addById(c, 2049401, (short)1, (byte)0);
                                break;
                            }
                            c.getPlayer().dropMessage(5, "Please make some space.");
                            break;
                        }
                        c.getPlayer().dropMessage(5, "There needs to be 10 Fragments for a Potential Scroll, 25 for Advanced Potential Scroll.");
                        break;
                    }
                    c.getPlayer().dropMessage(5, "Please make some space.");
                    break;
                }
                case 2430036: {
                    mountid = 1027;
                    expiration_days = 1L;
                    break;
                }
                case 2430037: {
                    mountid = 1028;
                    expiration_days = 1L;
                    break;
                }
                case 2430038: {
                    mountid = 1029;
                    expiration_days = 1L;
                    break;
                }
                case 2430039: {
                    mountid = 1030;
                    expiration_days = 1L;
                    break;
                }
                case 2430040: {
                    mountid = 1031;
                    expiration_days = 1L;
                    break;
                }
                case 2430053: {
                    mountid = 1027;
                    expiration_days = 1L;
                    break;
                }
                case 2430054: {
                    mountid = 1028;
                    expiration_days = 30L;
                    break;
                }
                case 2430055: {
                    mountid = 1029;
                    expiration_days = 30L;
                    break;
                }
                case 2430056: {
                    mountid = 1035;
                    expiration_days = 30L;
                    break;
                }
                case 2430072: {
                    mountid = 1034;
                    expiration_days = 7L;
                    break;
                }
                case 2430073: {
                    mountid = 1036;
                    expiration_days = 15L;
                    break;
                }
                case 2430074: {
                    mountid = 1037;
                    expiration_days = 15L;
                    break;
                }
                case 2430075: {
                    mountid = 1038;
                    expiration_days = 15L;
                    break;
                }
                case 2430076: {
                    mountid = 1039;
                    expiration_days = 15L;
                    break;
                }
                case 2430077: {
                    mountid = 1040;
                    expiration_days = 15L;
                    break;
                }
                case 2430080: {
                    mountid = 1042;
                    expiration_days = 20L;
                    break;
                }
                case 2430082: {
                    mountid = 1044;
                    expiration_days = 7L;
                    break;
                }
                case 2430091: {
                    mountid = 1049;
                    expiration_days = 10L;
                    break;
                }
                case 2430092: {
                    mountid = 1050;
                    expiration_days = 10L;
                    break;
                }
                case 2430093: {
                    mountid = 1051;
                    expiration_days = 10L;
                    break;
                }
                case 2430101: {
                    mountid = 1052;
                    expiration_days = 10L;
                    break;
                }
                case 2430102: {
                    mountid = 1053;
                    expiration_days = 10L;
                    break;
                }
                case 2430103: {
                    mountid = 1054;
                    expiration_days = 30L;
                    break;
                }
                case 2430117: {
                    mountid = 1036;
                    expiration_days = 365L;
                    break;
                }
                case 2430118: {
                    mountid = 1039;
                    expiration_days = 365L;
                    break;
                }
                case 2430119: {
                    mountid = 1040;
                    expiration_days = 365L;
                    break;
                }
                case 2430120: {
                    mountid = 1037;
                    expiration_days = 365L;
                    break;
                }
                case 2430136: {
                    mountid = 1069;
                    expiration_days = 30L;
                    break;
                }
                case 2430137: {
                    mountid = 1069;
                    expiration_days = 365L;
                    break;
                }
                case 2430201: {
                    mountid = 1096;
                    expiration_days = 60L;
                    break;
                }
                case 2430228: {
                    mountid = 1101;
                    expiration_days = 60L;
                    break;
                }
                case 2430229: {
                    mountid = 1102;
                    expiration_days = 60L;
                }
            }
        }
        if (mountid > 0) {
            if (c.getPlayer().getSkillLevel(mountid += GameConstants.isAran(c.getPlayer().getJob()) ? 20000000 : (GameConstants.isEvan(c.getPlayer().getJob()) ? 20010000 : (GameConstants.isKOC(c.getPlayer().getJob()) ? 10000000 : (GameConstants.isResist(c.getPlayer().getJob()) ? 30000000 : 0)))) > 0) {
                c.getPlayer().dropMessage(5, "You already have this skill.");
            } else if (expiration_days > 0L) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short)1, false);
                c.getPlayer().changeSkillLevel(SkillFactory.getSkill(mountid), (byte)1, (byte)1, System.currentTimeMillis() + expiration_days * 24L * 60L * 60L * 1000L);
                c.getPlayer().dropMessage(5, "The skill has been attained.");
            }
        }
        c.getSession().write((Object)MaplePacketCreator.enableActions());
    }

    public static final void UseSummonBag(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (!chr.isAlive()) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte)slea.readShort();
        int itemId = slea.readInt();
        IItem toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (chr.getMapId() >= 910000000 && chr.getMapId() <= 910000022) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            c.getPlayer().dropMessage(5, "\u5e02\u573a\u65e0\u6cd5\u4f7f\u7528\u53ec\u5524\u5305.");
            return;
        }
        if (toUse != null && toUse.getQuantity() >= 1 && toUse.getItemId() == itemId) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short)1, false);
            if (c.getPlayer().isGM() || !FieldLimitType.SummoningBag.check(chr.getMap().getFieldLimit())) {
                List<Pair<Integer, Integer>> toSpawn = MapleItemInformationProvider.getInstance().getSummonMobs(itemId);
                if (toSpawn == null) {
                    c.getSession().write((Object)MaplePacketCreator.enableActions());
                    return;
                }
                int type = 0;
                for (int i = 0; i < toSpawn.size(); ++i) {
                    if (Randomizer.nextInt(99) > toSpawn.get(i).getRight()) continue;
                    MapleMonster ht = MapleLifeFactory.getMonster(toSpawn.get(i).getLeft());
                    chr.getMap().spawnMonster_sSack(ht, chr.getPosition(), type);
                }
            }
        }
        c.getSession().write((Object)MaplePacketCreator.enableActions());
    }

    public static final void UseTreasureChest(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int reward;
        String box;
        short slot = slea.readShort();
        int itemid = slea.readInt();
        IItem toUse = chr.getInventory(MapleInventoryType.ETC).getItem((byte)slot);
        if (toUse == null || toUse.getQuantity() <= 0 || toUse.getItemId() != itemid) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        int keyIDforRemoval = 0;
        switch (toUse.getItemId()) {
            case 4280000: {
                reward = RandomRewards.getInstance().getGoldBoxReward();
                keyIDforRemoval = 5490000;
                box = "\u91d1\u5bf6\u7bb1";
                break;
            }
            case 4280001: {
                reward = RandomRewards.getInstance().getSilverBoxReward();
                keyIDforRemoval = 5490001;
                box = "\u9280\u5bf6\u7bb1";
                break;
            }
            default: {
                return;
            }
        }
        int amount = 1;
        switch (reward) {
            case 2000004: {
                amount = 200;
                break;
            }
            case 2000005: {
                amount = 100;
            }
        }
        if (chr.getInventory(MapleInventoryType.CASH).countById(keyIDforRemoval) > 0) {
            IItem item = MapleInventoryManipulator.addbyId_Gachapon(c, reward, (short)amount, 0L);
            if (item == null) {
                chr.dropMessage(5, "\u8acb\u78ba\u8a8d\u662f\u5426\u6709\u91d1\u9470\u5319\u6216\u8005\u4f60\u8eab\u4e0a\u7684\u7a7a\u9593\u6eff\u4e86.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, (byte)slot, (short)1, true);
            MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, keyIDforRemoval, 1, true, false);
            c.getSession().write((Object)MaplePacketCreator.getShowItemGain(reward, (short)amount, true));
            if (GameConstants.gachaponRareItem(item.getItemId()) > 0) {
                World.Broadcast.broadcastMessage(MaplePacketCreator.getGachaponMega("[" + box + "] " + c.getPlayer().getName(), " : \u5f9e\u91d1\u5bf6\u7bb1\u4e2d\u7372\u5f97", item, (byte)2, c.getPlayer().getClient().getChannel()).getBytes());
            }
        } else {
            chr.dropMessage(5, "\u8acb\u78ba\u8a8d\u662f\u5426\u6709\u9280\u9470\u5319\u6216\u8005\u4f60\u8eab\u4e0a\u7684\u7a7a\u9593\u6eff\u4e86.");
            c.getSession().write((Object)MaplePacketCreator.enableActions());
        }
    }

    public static final void UseCashItem(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte slot = (byte)slea.readShort();
        int itemId = slea.readInt();
        IItem toUse = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem(slot);
        if (toUse == null || toUse.getItemId() != itemId || toUse.getQuantity() < 1) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        boolean used = false;
        boolean cc = false;
        switch (itemId) {
            case 5043000: 
            case 5043001: {
                short questid = slea.readShort();
                int npcid = slea.readInt();
                MapleQuest quest = MapleQuest.getInstance(questid);
                if (c.getPlayer().getQuest(quest).getStatus() != 1 || !quest.canComplete(c.getPlayer(), npcid)) break;
                int mapId = MapleLifeFactory.getNPCLocation(npcid);
                if (mapId != -1) {
                    MapleMap map = c.getChannelServer().getMapFactory().getMap(mapId);
                    if (map.containsNPC(npcid) && !FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) && !FieldLimitType.VipRock.check(map.getFieldLimit()) && c.getPlayer().getEventInstance() == null) {
                        c.getPlayer().changeMap(map, map.getPortal(0));
                    }
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(1, "Unknown error has occurred.");
                break;
            }
            case 2320000: 
            case 5040000: 
            case 5040001: 
            case 5041000: {
                if (slea.readByte() == 0) {
                    MapleMap target = c.getChannelServer().getMapFactory().getMap(slea.readInt());
                    if ((itemId != 5041000 || !c.getPlayer().isRockMap(target.getId())) && (itemId == 5041000 || !c.getPlayer().isRegRockMap(target.getId())) || FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) || FieldLimitType.VipRock.check(target.getFieldLimit()) || c.getPlayer().getEventInstance() != null) break;
                    c.getPlayer().changeMap(target, target.getPortal(0));
                    used = true;
                    break;
                }
                MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                if (victim == null || victim.isGM() || c.getPlayer().getEventInstance() != null || victim.getEventInstance() != null || FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) || FieldLimitType.VipRock.check(c.getChannelServer().getMapFactory().getMap(victim.getMapId()).getFieldLimit()) || itemId != 5041000 && victim.getMapId() / 100000000 != c.getPlayer().getMapId() / 100000000) break;
                c.getPlayer().changeMap(victim.getMap(), victim.getMap().findClosestSpawnpoint(victim.getPosition()));
                used = true;
                break;
            }
            case 5050000: {
                ISkill improvingMaxHP;
                byte improvingMaxHPLevel;
                byte improvingMaxMPLevel;
                int toSet;
                short maxhp;
                ArrayList<Pair<MapleStat, Integer>> statupdate = new ArrayList<Pair<MapleStat, Integer>>(2);
                int apto = slea.readInt();
                int apfrom = slea.readInt();
                if (apto == apfrom) break;
                short job = c.getPlayer().getJob();
                PlayerStats playerst = c.getPlayer().getStat();
                used = true;
                switch (apto) {
                    case 256: {
                        if (playerst.getStr() < 32767) break;
                        used = false;
                        break;
                    }
                    case 512: {
                        if (playerst.getDex() < 32767) break;
                        used = false;
                        break;
                    }
                    case 1024: {
                        if (playerst.getInt() < 32767) break;
                        used = false;
                        break;
                    }
                    case 2048: {
                        if (playerst.getLuk() < 32767) break;
                        used = false;
                        break;
                    }
                    case 8192: {
                        if (playerst.getMaxHp() < 30000) break;
                        used = false;
                        break;
                    }
                    case 32768: {
                        if (playerst.getMaxMp() < 30000) break;
                        used = false;
                    }
                }
                switch (apfrom) {
                    case 256: {
                        if (playerst.getStr() > 4) break;
                        used = false;
                        break;
                    }
                    case 512: {
                        if (playerst.getDex() > 4) break;
                        used = false;
                        break;
                    }
                    case 1024: {
                        if (playerst.getInt() > 4) break;
                        used = false;
                        break;
                    }
                    case 2048: {
                        if (playerst.getLuk() > 4) break;
                        used = false;
                        break;
                    }
                    case 8192: {
                        if (playerst.getMaxMp() >= c.getPlayer().getLevel() * 14 + 134 && c.getPlayer().getHpApUsed() > 0 && c.getPlayer().getHpApUsed() < 25000 && playerst.getMaxHp() >= 1) break;
                        used = false;
                        break;
                    }
                    case 32768: {
                        if (playerst.getMaxMp() >= c.getPlayer().getLevel() * 14 + 134 && c.getPlayer().getHpApUsed() > 0 && c.getPlayer().getHpApUsed() < 25000) break;
                        used = false;
                    }
                }
                if (!used) break;
                switch (apto) {
                    case 256: {
                        toSet = playerst.getStr() + 1;
                        playerst.setStr((short)toSet);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.STR, toSet));
                        break;
                    }
                    case 512: {
                        toSet = playerst.getDex() + 1;
                        playerst.setDex((short)toSet);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.DEX, toSet));
                        break;
                    }
                    case 1024: {
                        toSet = playerst.getInt() + 1;
                        playerst.setInt((short)toSet);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.INT, toSet));
                        break;
                    }
                    case 2048: {
                        toSet = playerst.getLuk() + 1;
                        playerst.setLuk((short)toSet);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.LUK, toSet));
                        break;
                    }
                    case 8192: {
                        maxhp = playerst.getMaxHp();
                        if (job == 0) {
                            maxhp = (short)(maxhp + Randomizer.rand(8, 12));
                        } else if (job >= 100 && job <= 132 || job >= 3200 && job <= 3212) {
                            improvingMaxHP = SkillFactory.getSkill(1000001);
                            improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                            maxhp = (short)(maxhp + Randomizer.rand(20, 25));
                            if (improvingMaxHPLevel >= 1) {
                                maxhp = (short)(maxhp + improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                            }
                        } else if (job >= 200 && job <= 232 || GameConstants.isEvan(job)) {
                            maxhp = (short)(maxhp + Randomizer.rand(10, 20));
                        } else if (job >= 300 && job <= 322 || job >= 400 && job <= 434 || job >= 1300 && job <= 1312 || job >= 1400 && job <= 1412 || job >= 3300 && job <= 3312) {
                            maxhp = (short)(maxhp + Randomizer.rand(16, 20));
                        } else if (job >= 500 && job <= 522 || job >= 3500 && job <= 3512) {
                            improvingMaxHP = SkillFactory.getSkill(5100000);
                            improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                            maxhp = (short)(maxhp + Randomizer.rand(18, 22));
                            if (improvingMaxHPLevel >= 1) {
                                maxhp = (short)(maxhp + improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                            }
                        } else if (job >= 1500 && job <= 1512) {
                            improvingMaxHP = SkillFactory.getSkill(15100000);
                            improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                            maxhp = (short)(maxhp + Randomizer.rand(18, 22));
                            if (improvingMaxHPLevel >= 1) {
                                maxhp = (short)(maxhp + improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                            }
                        } else if (job >= 1100 && job <= 1112) {
                            improvingMaxHP = SkillFactory.getSkill(11000000);
                            improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                            maxhp = (short)(maxhp + Randomizer.rand(36, 42));
                            if (improvingMaxHPLevel >= 1) {
                                maxhp = (short)(maxhp + improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                            }
                        } else {
                            maxhp = job >= 1200 && job <= 1212 ? (short)(maxhp + Randomizer.rand(15, 21)) : (job >= 2000 && job <= 2112 ? (short)(maxhp + Randomizer.rand(40, 50)) : (short)(maxhp + Randomizer.rand(50, 100)));
                        }
                        maxhp = (short)Math.min(30000, Math.abs(maxhp));
                        c.getPlayer().setHpApUsed((short)(c.getPlayer().getHpApUsed() + 1));
                        playerst.setMaxHp(maxhp);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, Integer.valueOf(maxhp)));
                        break;
                    }
                    case 32768: {
                        ISkill improvingMaxMP;
                        short maxmp = playerst.getMaxMp();
                        if (job == 0) {
                            maxmp = (short)(maxmp + Randomizer.rand(6, 8));
                        } else if (job >= 100 && job <= 132) {
                            maxmp = (short)(maxmp + Randomizer.rand(5, 7));
                        } else if (job >= 200 && job <= 232 || GameConstants.isEvan(job) || job >= 3200 && job <= 3212) {
                            improvingMaxMP = SkillFactory.getSkill(2000001);
                            improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
                            maxmp = (short)(maxmp + Randomizer.rand(18, 20));
                            if (improvingMaxMPLevel >= 1) {
                                maxmp = (short)(maxmp + improvingMaxMP.getEffect(improvingMaxMPLevel).getY() * 2);
                            }
                        } else if (job >= 300 && job <= 322 || job >= 400 && job <= 434 || job >= 500 && job <= 522 || job >= 3200 && job <= 3212 || job >= 3500 && job <= 3512 || job >= 1300 && job <= 1312 || job >= 1400 && job <= 1412 || job >= 1500 && job <= 1512) {
                            maxmp = (short)(maxmp + Randomizer.rand(10, 12));
                        } else if (job >= 1100 && job <= 1112) {
                            maxmp = (short)(maxmp + Randomizer.rand(6, 9));
                        } else if (job >= 1200 && job <= 1212) {
                            improvingMaxMP = SkillFactory.getSkill(12000000);
                            improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
                            maxmp = (short)(maxmp + Randomizer.rand(18, 20));
                            if (improvingMaxMPLevel >= 1) {
                                maxmp = (short)(maxmp + improvingMaxMP.getEffect(improvingMaxMPLevel).getY() * 2);
                            }
                        } else {
                            maxmp = job >= 2000 && job <= 2112 ? (short)(maxmp + Randomizer.rand(6, 9)) : (short)(maxmp + Randomizer.rand(50, 100));
                        }
                        maxmp = (short)Math.min(30000, Math.abs(maxmp));
                        c.getPlayer().setHpApUsed((short)(c.getPlayer().getHpApUsed() + 1));
                        playerst.setMaxMp(maxmp);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, Integer.valueOf(maxmp)));
                    }
                }
                switch (apfrom) {
                    case 256: {
                        toSet = playerst.getStr() - 1;
                        playerst.setStr((short)toSet);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.STR, toSet));
                        break;
                    }
                    case 512: {
                        toSet = playerst.getDex() - 1;
                        playerst.setDex((short)toSet);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.DEX, toSet));
                        break;
                    }
                    case 1024: {
                        toSet = playerst.getInt() - 1;
                        playerst.setInt((short)toSet);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.INT, toSet));
                        break;
                    }
                    case 2048: {
                        toSet = playerst.getLuk() - 1;
                        playerst.setLuk((short)toSet);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.LUK, toSet));
                        break;
                    }
                    case 8192: {
                        maxhp = playerst.getMaxHp();
                        if (job == 0) {
                            maxhp = (short)(maxhp - 12);
                        } else if (job >= 100 && job <= 132) {
                            improvingMaxHP = SkillFactory.getSkill(1000001);
                            improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                            maxhp = (short)(maxhp - 24);
                            if (improvingMaxHPLevel >= 1) {
                                maxhp = (short)(maxhp - improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                            }
                        } else if (job >= 200 && job <= 232) {
                            maxhp = (short)(maxhp - 10);
                        } else if (job >= 300 && job <= 322 || job >= 400 && job <= 434 || job >= 1300 && job <= 1312 || job >= 1400 && job <= 1412 || job >= 3300 && job <= 3312 || job >= 3500 && job <= 3512) {
                            maxhp = (short)(maxhp - 15);
                        } else if (job >= 500 && job <= 522) {
                            improvingMaxHP = SkillFactory.getSkill(5100000);
                            improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                            maxhp = (short)(maxhp - 15);
                            if (improvingMaxHPLevel > 0) {
                                maxhp = (short)(maxhp - improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                            }
                        } else if (job >= 1500 && job <= 1512) {
                            improvingMaxHP = SkillFactory.getSkill(15100000);
                            improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                            maxhp = (short)(maxhp - 15);
                            if (improvingMaxHPLevel > 0) {
                                maxhp = (short)(maxhp - improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                            }
                        } else if (job >= 1100 && job <= 1112) {
                            improvingMaxHP = SkillFactory.getSkill(11000000);
                            improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                            maxhp = (short)(maxhp - 27);
                            if (improvingMaxHPLevel >= 1) {
                                maxhp = (short)(maxhp - improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                            }
                        } else {
                            maxhp = job >= 1200 && job <= 1212 ? (short)(maxhp - 12) : (job >= 2000 && job <= 2112 || job >= 3200 && job <= 3212 ? (short)(maxhp - 40) : (short)(maxhp - 20));
                        }
                        c.getPlayer().setHpApUsed((short)(c.getPlayer().getHpApUsed() - 1));
                        playerst.setHp(maxhp);
                        playerst.setMaxHp(maxhp);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, Integer.valueOf(maxhp)));
                        break;
                    }
                    case 32768: {
                        short maxmp = playerst.getMaxMp();
                        if (job == 0) {
                            maxmp = (short)(maxmp - 8);
                        } else if (job >= 100 && job <= 132) {
                            maxmp = (short)(maxmp - 4);
                        } else if (job >= 200 && job <= 232) {
                            ISkill improvingMaxMP = SkillFactory.getSkill(2000001);
                            improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
                            maxmp = (short)(maxmp - 20);
                            if (improvingMaxMPLevel >= 1) {
                                maxmp = (short)(maxmp - improvingMaxMP.getEffect(improvingMaxMPLevel).getY());
                            }
                        } else if (job >= 500 && job <= 522 || job >= 300 && job <= 322 || job >= 400 && job <= 434 || job >= 1300 && job <= 1312 || job >= 1400 && job <= 1412 || job >= 1500 && job <= 1512 || job >= 3300 && job <= 3312 || job >= 3500 && job <= 3512) {
                            maxmp = (short)(maxmp - 10);
                        } else if (job >= 1100 && job <= 1112) {
                            maxmp = (short)(maxmp - 6);
                        } else if (job >= 1200 && job <= 1212) {
                            ISkill improvingMaxMP = SkillFactory.getSkill(12000000);
                            improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
                            maxmp = (short)(maxmp - 25);
                            if (improvingMaxMPLevel >= 1) {
                                maxmp = (short)(maxmp - improvingMaxMP.getEffect(improvingMaxMPLevel).getY());
                            }
                        } else {
                            maxmp = job >= 2000 && job <= 2112 ? (short)(maxmp - 5) : (short)(maxmp - 20);
                        }
                        c.getPlayer().setHpApUsed((short)(c.getPlayer().getHpApUsed() - 1));
                        playerst.setMp(maxmp);
                        playerst.setMaxMp(maxmp);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, Integer.valueOf(maxmp)));
                    }
                }
                c.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statupdate, true, c.getPlayer().getJob()));
                break;
            }
            case 5050001: 
            case 5050002: 
            case 5050003: 
            case 5050004: {
                int skill1 = slea.readInt();
                int skill2 = slea.readInt();
                ISkill skillSPTo = SkillFactory.getSkill(skill1);
                ISkill skillSPFrom = SkillFactory.getSkill(skill2);
                if (skillSPTo.isBeginnerSkill() || skillSPFrom.isBeginnerSkill() || c.getPlayer().getSkillLevel(skillSPTo) + 1 > skillSPTo.getMaxLevel() || c.getPlayer().getSkillLevel(skillSPFrom) <= 0) break;
                c.getPlayer().changeSkillLevel(skillSPFrom, (byte)(c.getPlayer().getSkillLevel(skillSPFrom) - 1), c.getPlayer().getMasterLevel(skillSPFrom));
                c.getPlayer().changeSkillLevel(skillSPTo, (byte)(c.getPlayer().getSkillLevel(skillSPTo) + 1), c.getPlayer().getMasterLevel(skillSPTo));
                used = true;
                break;
            }
            case 5060000: {
                IItem item = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slea.readByte());
                if (item == null || !item.getOwner().equals("")) break;
                boolean change = true;
                for (String z : GameConstants.RESERVED) {
                    if (c.getPlayer().getName().indexOf(z) == -1 && item.getOwner().indexOf(z) == -1) continue;
                    change = false;
                }
                if (!change) break;
                item.setOwner(c.getPlayer().getName());
                c.getPlayer().forceReAddItem(item, MapleInventoryType.EQUIPPED);
                used = true;
                break;
            }
            case 5062000: {
                IItem item = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte)slea.readInt());
                if (item != null && c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() >= 1) {
                    Equip eq = (Equip)item;
                    if (eq.getState() >= 5) {
                        eq.renewPotential();
                        c.getSession().write((Object)MaplePacketCreator.scrolledItem(toUse, item, false, true));
                        c.getPlayer().forceReAddItem_NoUpdate(item, MapleInventoryType.EQUIP);
                        MapleInventoryManipulator.addById(c, 2430112, (short)1, (byte)0);
                        used = true;
                        break;
                    }
                    c.getPlayer().dropMessage(5, "Make sure your equipment has a potential.");
                    break;
                }
                c.getPlayer().dropMessage(5, "Make sure you have room for a Fragment.");
                break;
            }
            case 5080000: 
            case 5080001: 
            case 5080002: 
            case 5080003: {
                MapleLove love = new MapleLove(c.getPlayer(), c.getPlayer().getPosition(), c.getPlayer().getMap().getFootholds().findBelow(c.getPlayer().getPosition()).getId(), slea.readMapleAsciiString(), itemId);
                c.getPlayer().getMap().spawnLove(love);
                MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                break;
            }
            case 5520000: {
                MapleInventoryType type = MapleInventoryType.getByType((byte)slea.readInt());
                IItem item = c.getPlayer().getInventory(type).getItem((byte)slea.readInt());
                if (item == null || ItemFlag.KARMA_EQ.check(item.getFlag()) || ItemFlag.KARMA_USE.check(item.getFlag()) || (itemId != 5520000 || !MapleItemInformationProvider.getInstance().isKarmaEnabled(item.getItemId())) && !MapleItemInformationProvider.getInstance().isPKarmaEnabled(item.getItemId())) break;
                byte flag = item.getFlag();
                flag = type == MapleInventoryType.EQUIP ? (byte)(flag | ItemFlag.KARMA_EQ.getValue()) : (byte)(flag | ItemFlag.KARMA_USE.getValue());
                item.setFlag(flag);
                c.getPlayer().forceReAddItem_Flag(item, type);
                used = true;
                break;
            }
            case 5570000: {
                slea.readInt();
                Equip item = (Equip)c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte)slea.readInt());
                if (item == null) break;
                if (GameConstants.canHammer(item.getItemId()) && MapleItemInformationProvider.getInstance().getSlots(item.getItemId()) > 0 && item.getViciousHammer() <= 2) {
                    item.setViciousHammer((byte)(item.getViciousHammer() + 1));
                    item.setUpgradeSlots((byte)(item.getUpgradeSlots() + 1));
                    c.getPlayer().forceReAddItem(item, MapleInventoryType.EQUIP);
                    used = true;
                    cc = true;
                    break;
                }
                c.getPlayer().dropMessage(5, "You may not use it on this item.");
                cc = true;
                break;
            }
            case 5610000: 
            case 5610001: {
                slea.readInt();
                byte dst = (byte)slea.readInt();
                slea.readInt();
                byte src = (byte)slea.readInt();
                cc = used = InventoryHandler.UseUpgradeScroll(src, dst, (byte)2, c, c.getPlayer(), itemId);
                break;
            }
            case 5060001: {
                MapleInventoryType type = MapleInventoryType.getByType((byte)slea.readInt());
                IItem item = c.getPlayer().getInventory(type).getItem((byte)slea.readInt());
                if (item == null || item.getExpiration() != -1L) break;
                byte flag = item.getFlag();
                flag = (byte)(flag | ItemFlag.LOCK.getValue());
                item.setFlag(flag);
                c.getPlayer().forceReAddItem_Flag(item, type);
                used = true;
                break;
            }
            case 5061000: {
                MapleInventoryType type = MapleInventoryType.getByType((byte)slea.readInt());
                IItem item = c.getPlayer().getInventory(type).getItem((byte)slea.readInt());
                if (item == null || item.getExpiration() != -1L) break;
                byte flag = item.getFlag();
                flag = (byte)(flag | ItemFlag.LOCK.getValue());
                item.setFlag(flag);
                item.setExpiration(System.currentTimeMillis() + 604800000L);
                c.getPlayer().forceReAddItem_Flag(item, type);
                used = true;
                break;
            }
            case 5061001: {
                MapleInventoryType type = MapleInventoryType.getByType((byte)slea.readInt());
                IItem item = c.getPlayer().getInventory(type).getItem((byte)slea.readInt());
                if (item == null || item.getExpiration() != -1L) break;
                byte flag = item.getFlag();
                flag = (byte)(flag | ItemFlag.LOCK.getValue());
                item.setFlag(flag);
                item.setExpiration(System.currentTimeMillis() + -1702967296L);
                c.getPlayer().forceReAddItem_Flag(item, type);
                used = true;
                break;
            }
            case 5061002: {
                MapleInventoryType type = MapleInventoryType.getByType((byte)slea.readInt());
                IItem item = c.getPlayer().getInventory(type).getItem((byte)slea.readInt());
                if (item == null || item.getExpiration() != -1L) break;
                byte flag = item.getFlag();
                flag = (byte)(flag | ItemFlag.LOCK.getValue());
                item.setFlag(flag);
                item.setExpiration(System.currentTimeMillis() + -813934592L);
                c.getPlayer().forceReAddItem_Flag(item, type);
                used = true;
                break;
            }
            case 5060003: {
                IItem item = c.getPlayer().getInventory(MapleInventoryType.ETC).findById(4170023);
                if (item == null || item.getQuantity() <= 0) {
                    return;
                }
                if (!InventoryHandler.getIncubatedItems(c)) break;
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, item.getPosition(), (short)1, false);
                used = true;
                break;
            }
            case 5070000: {
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "\u5fc5\u9808\u7b49\u7d1a10\u7d1a\u4ee5\u4e0a\u624d\u53ef\u4ee5\u4f7f\u7528.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canAvatarSmega2()) {
                    c.getPlayer().dropMessage(6, "\u5f88\u62b1\u6b49\u70ba\u4e86\u9632\u6b62\u5237\u5ee3,\u6240\u4ee5\u4f60\u6bcf10\u79d2\u53ea\u80fd\u7528\u4e00\u6b21.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    boolean ear;
                    String message = slea.readMapleAsciiString();
                    if (message.length() > 65) break;
                    StringBuilder sb = new StringBuilder();
                    InventoryHandler.addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);
                    boolean bl = ear = slea.readByte() != 0;
                    if (c.getPlayer().isPlayer() && message.indexOf("\u5e79") != -1 || message.indexOf("\u8c6c") != -1 || message.indexOf("\u7b28") != -1 || message.indexOf("\u9760") != -1 || message.indexOf("\u8166\u5305") != -1 || message.indexOf("\u8166") != -1 || message.indexOf("\u667a\u969c") != -1 || message.indexOf("\u767d\u76ee") != -1 || message.indexOf("\u767d\u5403") != -1) {
                        c.getPlayer().dropMessage("\u8aaa\u9ad2\u8a71\u662f\u4e0d\u79ae\u8c8c\u7684\uff0c\u8acb\u52ff\u8aaa\u9ad2\u8a71\u3002");
                        c.getSession().write((Object)MaplePacketCreator.enableActions());
                        return;
                    }
                    if (c.getPlayer().isPlayer()) {
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(2, sb.toString()));
                        System.out.println("[\u73a9\u5bb6\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    } else if (c.getPlayer().isGM()) {
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(2, sb.toString()));
                        System.out.println("[\uff27\uff2d\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    }
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(5, "\u76ee\u524d\u5587\u53ed\u505c\u6b62\u4f7f\u7528.");
                break;
            }
            case 5071000: {
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "\u5fc5\u9808\u7b49\u7d1a10\u7d1a\u4ee5\u4e0a\u624d\u53ef\u4ee5\u4f7f\u7528.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canAvatarSmega2()) {
                    c.getPlayer().dropMessage(6, "\u5f88\u62b1\u6b49\u70ba\u4e86\u9632\u6b62\u5237\u5ee3,\u6240\u4ee5\u4f60\u6bcf10\u79d2\u53ea\u80fd\u7528\u4e00\u6b21.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    boolean ear;
                    String message = slea.readMapleAsciiString();
                    if (message.length() > 65) break;
                    boolean bl = ear = slea.readByte() != 0;
                    if (c.getPlayer().isPlayer() && message.indexOf("\u5e79") != -1 || message.indexOf("\u8c6c") != -1 || message.indexOf("\u7b28") != -1 || message.indexOf("\u9760") != -1 || message.indexOf("\u8166\u5305") != -1 || message.indexOf("\u8166") != -1 || message.indexOf("\u667a\u969c") != -1 || message.indexOf("\u767d\u76ee") != -1 || message.indexOf("\u767d\u5403") != -1) {
                        c.getPlayer().dropMessage("\u8aaa\u9ad2\u8a71\u662f\u4e0d\u79ae\u8c8c\u7684\uff0c\u8acb\u52ff\u8aaa\u9ad2\u8a71\u3002");
                        c.getSession().write((Object)MaplePacketCreator.enableActions());
                        return;
                    }
                    StringBuilder sb = new StringBuilder();
                    InventoryHandler.addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);
                    if (c.getPlayer().isPlayer()) {
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(2, sb.toString()));
                        System.out.println("[\u73a9\u5bb6\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    } else if (c.getPlayer().isGM()) {
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(2, sb.toString()));
                        System.out.println("[\uff27\uff2d\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    }
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(5, "\u76ee\u524d\u5587\u53ed\u505c\u6b62\u4f7f\u7528.");
                break;
            }
            case 5077000: {
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "\u5fc5\u9808\u7b49\u7d1a10\u7d1a\u4ee5\u4e0a\u624d\u53ef\u4ee5\u4f7f\u7528.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canAvatarSmega2()) {
                    c.getPlayer().dropMessage(6, "\u5f88\u62b1\u6b49\u70ba\u4e86\u9632\u6b62\u5237\u5ee3,\u6240\u4ee5\u4f60\u6bcf10\u79d2\u53ea\u80fd\u7528\u4e00\u6b21.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    String message;
                    boolean ear;
                    int numLines = slea.readByte();
                    if (numLines > 3) {
                        return;
                    }
                    LinkedList<String> messages = new LinkedList<String>();
                    for (int i = 0; i < numLines && (message = slea.readMapleAsciiString()).length() <= 65; ++i) {
                        messages.add(c.getPlayer().getName() + " : " + message);
                    }
                    boolean bl = ear = slea.readByte() > 0;
                    if (c.getPlayer().isPlayer() && messages.indexOf("\u5e79") != -1 || messages.indexOf("\u8c6c") != -1 || messages.indexOf("\u7b28") != -1 || messages.indexOf("\u9760") != -1 || messages.indexOf("\u8166\u5305") != -1 || messages.indexOf("\u8166") != -1 || messages.indexOf("\u667a\u969c") != -1 || messages.indexOf("\u767d\u76ee") != -1 || messages.indexOf("\u767d\u5403") != -1) {
                        c.getPlayer().dropMessage("\u8aaa\u9ad2\u8a71\u662f\u4e0d\u79ae\u8c8c\u7684\uff0c\u8acb\u52ff\u8aaa\u9ad2\u8a71\u3002");
                        c.getSession().write((Object)MaplePacketCreator.enableActions());
                        return;
                    }
                    if (c.getPlayer().isPlayer()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.tripleSmega(messages, ear, c.getChannel()).getBytes());
                        System.out.println("[\u73a9\u5bb6\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + messages);
                    } else if (c.getPlayer().isGM()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.tripleSmega(messages, ear, c.getChannel()).getBytes());
                        System.out.println("[\uff27\uff2d\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + messages);
                    }
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(5, "\u76ee\u524d\u5587\u53ed\u505c\u6b62\u4f7f\u7528.");
                break;
            }
            case 5073000: {
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "\u5fc5\u9808\u7b49\u7d1a10\u7d1a\u4ee5\u4e0a\u624d\u53ef\u4ee5\u4f7f\u7528.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canAvatarSmega2()) {
                    c.getPlayer().dropMessage(6, "\u5f88\u62b1\u6b49\u70ba\u4e86\u9632\u6b62\u5237\u5ee3,\u6240\u4ee5\u4f60\u6bcf10\u79d2\u53ea\u80fd\u7528\u4e00\u6b21.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    boolean ear;
                    String message = slea.readMapleAsciiString();
                    if (message.length() > 65) break;
                    StringBuilder sb = new StringBuilder();
                    InventoryHandler.addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);
                    boolean bl = ear = slea.readByte() != 0;
                    if (c.getPlayer().isPlayer() && message.indexOf("\u5e79") != -1 || message.indexOf("\u8c6c") != -1 || message.indexOf("\u7b28") != -1 || message.indexOf("\u9760") != -1 || message.indexOf("\u8166\u5305") != -1 || message.indexOf("\u8166") != -1 || message.indexOf("\u667a\u969c") != -1 || message.indexOf("\u767d\u76ee") != -1 || message.indexOf("\u767d\u5403") != -1) {
                        c.getPlayer().dropMessage("\u8aaa\u9ad2\u8a71\u662f\u4e0d\u79ae\u8c8c\u7684\uff0c\u8acb\u52ff\u8aaa\u9ad2\u8a71\u3002");
                        c.getSession().write((Object)MaplePacketCreator.enableActions());
                        return;
                    }
                    if (c.getPlayer().isPlayer()) {
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(2, sb.toString()));
                        System.out.println("[\u73a9\u5bb6\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    } else if (c.getPlayer().isGM()) {
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(2, sb.toString()));
                        System.out.println("[\uff27\uff2d\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    }
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(5, "\u76ee\u524d\u5587\u53ed\u505c\u6b62\u4f7f\u7528.");
                break;
            }
            case 5074000: {
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "\u5fc5\u9808\u7b49\u7d1a10\u7d1a\u4ee5\u4e0a\u624d\u53ef\u4ee5\u4f7f\u7528.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canAvatarSmega2()) {
                    c.getPlayer().dropMessage(6, "\u5f88\u62b1\u6b49\u70ba\u4e86\u9632\u6b62\u5237\u5ee3,\u6240\u4ee5\u4f60\u6bcf10\u79d2\u53ea\u80fd\u7528\u4e00\u6b21.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    boolean ear;
                    String message = slea.readMapleAsciiString();
                    if (message.length() > 65) break;
                    StringBuilder sb = new StringBuilder();
                    InventoryHandler.addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);
                    boolean bl = ear = slea.readByte() != 0;
                    if (c.getPlayer().isPlayer() && message.indexOf("\u5e79") != -1 || message.indexOf("\u8c6c") != -1 || message.indexOf("\u7b28") != -1 || message.indexOf("\u9760") != -1 || message.indexOf("\u8166\u5305") != -1 || message.indexOf("\u8166") != -1 || message.indexOf("\u667a\u969c") != -1 || message.indexOf("\u767d\u76ee") != -1 || message.indexOf("\u767d\u5403") != -1) {
                        c.getPlayer().dropMessage("\u8aaa\u9ad2\u8a71\u662f\u4e0d\u79ae\u8c8c\u7684\uff0c\u8acb\u52ff\u8aaa\u9ad2\u8a71\u3002");
                        c.getSession().write((Object)MaplePacketCreator.enableActions());
                        return;
                    }
                    if (c.getPlayer().isPlayer()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(10, c.getChannel(), sb.toString(), ear).getBytes());
                        System.out.println("[\u73a9\u5bb6\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    } else if (c.getPlayer().isGM()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(10, c.getChannel(), sb.toString(), ear).getBytes());
                        System.out.println("[\uff27\uff2d\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    }
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(5, "\u76ee\u524d\u5587\u53ed\u505c\u6b62\u4f7f\u7528.");
                break;
            }
            case 5072000: {
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "\u5fc5\u9808\u898110\u7b49\u4ee5\u4e0a\u624d\u80fd\u4f7f\u7528.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canAvatarSmega2()) {
                    c.getPlayer().dropMessage(6, "\u5f88\u62b1\u6b49\u70ba\u4e86\u9632\u6b62\u5237\u5ee3,\u6240\u4ee5\u4f60\u6bcf10\u79d2\u53ea\u80fd\u7528\u4e00\u6b21.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    boolean ear;
                    String message = slea.readMapleAsciiString();
                    if (message.length() > 65) break;
                    StringBuilder sb = new StringBuilder();
                    InventoryHandler.addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);
                    boolean bl = ear = slea.readByte() != 0;
                    if (c.getPlayer().isPlayer() && message.indexOf("\u5e79") != -1 || message.indexOf("\u8c6c") != -1 || message.indexOf("\u7b28") != -1 || message.indexOf("\u9760") != -1 || message.indexOf("\u8166\u5305") != -1 || message.indexOf("\u8166") != -1 || message.indexOf("\u667a\u969c") != -1 || message.indexOf("\u767d\u76ee") != -1 || message.indexOf("\u767d\u5403") != -1) {
                        c.getPlayer().dropMessage("\u8aaa\u9ad2\u8a71\u662f\u4e0d\u79ae\u8c8c\u7684\uff0c\u8acb\u52ff\u8aaa\u9ad2\u8a71\u3002");
                        c.getSession().write((Object)MaplePacketCreator.enableActions());
                        return;
                    }
                    if (c.getPlayer().isPlayer()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(3, c.getChannel(), sb.toString(), ear).getBytes());
                        System.out.println("[\u73a9\u5bb6\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    } else if (c.getPlayer().isGM()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(3, c.getChannel(), sb.toString(), ear).getBytes());
                        System.out.println("[\uff27\uff2d\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    }
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(5, "\u76ee\u524d\u5587\u53ed\u505c\u6b62\u4f7f\u7528.");
                break;
            }
            case 5076000: {
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "\u5fc5\u9808\u7b49\u7d1a10\u7d1a\u4ee5\u4e0a\u624d\u53ef\u4ee5\u4f7f\u7528.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canAvatarSmega2()) {
                    c.getPlayer().dropMessage(6, "\u5f88\u62b1\u6b49\u70ba\u4e86\u9632\u6b62\u5237\u5ee3,\u6240\u4ee5\u4f60\u6bcf10\u79d2\u53ea\u80fd\u7528\u4e00\u6b21.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    String message = slea.readMapleAsciiString();
                    if (message.length() > 65) break;
                    StringBuilder sb = new StringBuilder();
                    InventoryHandler.addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);
                    boolean ear = slea.readByte() > 0;
                    IItem item = null;
                    if (slea.readByte() == 1) {
                        byte invType = (byte)slea.readInt();
                        byte pos = (byte)slea.readInt();
                        item = c.getPlayer().getInventory(MapleInventoryType.getByType(invType)).getItem(pos);
                    }
                    if (c.getPlayer().isPlayer() && message.indexOf("\u5e79") != -1 || message.indexOf("\u8c6c") != -1 || message.indexOf("\u7b28") != -1 || message.indexOf("\u9760") != -1 || message.indexOf("\u8166\u5305") != -1 || message.indexOf("\u8166") != -1 || message.indexOf("\u667a\u969c") != -1 || message.indexOf("\u767d\u76ee") != -1 || message.indexOf("\u767d\u5403") != -1) {
                        c.getPlayer().dropMessage("\u8aaa\u9ad2\u8a71\u662f\u4e0d\u79ae\u8c8c\u7684\uff0c\u8acb\u52ff\u8aaa\u9ad2\u8a71\u3002");
                        c.getSession().write((Object)MaplePacketCreator.enableActions());
                        return;
                    }
                    if (c.getPlayer().isPlayer()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.itemMegaphone(sb.toString(), ear, c.getChannel(), item).getBytes());
                        System.out.println("[\u73a9\u5bb6\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    } else if (c.getPlayer().isGM()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.itemMegaphone(sb.toString(), ear, c.getChannel(), item).getBytes());
                        System.out.println("[\uff27\uff2d\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + message);
                    }
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(5, "\u76ee\u524d\u5587\u53ed\u505c\u6b62\u4f7f\u7528.");
                break;
            }
            case 5075000: 
            case 5075001: 
            case 5075002: {
                c.getPlayer().dropMessage(5, "There are no MapleTVs to broadcast the message to.");
                break;
            }
            case 5075003: 
            case 5075004: 
            case 5075005: {
                MapleCharacter victim;
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "\u5fc5\u9808\u7b49\u7d1a10\u7d1a\u4ee5\u4e0a\u624d\u53ef\u4ee5\u4f7f\u7528.");
                    break;
                }
                int tvType = itemId % 10;
                if (tvType == 3) {
                    slea.readByte();
                }
                boolean ear = tvType != 1 && tvType != 2 && slea.readByte() > 1;
                MapleCharacter mapleCharacter = victim = tvType == 1 || tvType == 4 ? null : c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                if (tvType == 0 || tvType == 3) {
                    victim = null;
                } else if (victim == null) {
                    c.getPlayer().dropMessage(1, "That character is not in the channel.");
                    break;
                }
                String message = slea.readMapleAsciiString();
                World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(3, c.getChannel(), c.getPlayer().getName() + " : " + message, ear).getBytes());
                break;
            }
            case 5090000: 
            case 5090100: {
                String sendTo = slea.readMapleAsciiString();
                String msg = slea.readMapleAsciiString();
                c.getPlayer().sendNote(sendTo, msg);
                used = true;
                break;
            }
            case 5100000: {
                c.getPlayer().getMap().broadcastMessage(MTSCSPacket.playCashSong(5100000, c.getPlayer().getName()));
                used = true;
                break;
            }
            case 5190000: 
            case 5190001: 
            case 5190002: 
            case 5190003: 
            case 5190004: 
            case 5190005: 
            case 5190006: 
            case 5190007: 
            case 5190008: {
                MaplePet.PetFlag zz;
                int uniqueid = (int)slea.readLong();
                MaplePet pet = c.getPlayer().getPet(0);
                int slo = 0;
                if (pet == null) break;
                if (pet.getUniqueId() != uniqueid) {
                    pet = c.getPlayer().getPet(1);
                    slo = 1;
                    if (pet == null) break;
                    if (pet.getUniqueId() != uniqueid) {
                        pet = c.getPlayer().getPet(2);
                        slo = 2;
                        if (pet == null || pet.getUniqueId() != uniqueid) break;
                    }
                }
                if ((zz = MaplePet.PetFlag.getByAddId(itemId)) == null || zz.check(pet.getFlags())) break;
                pet.setFlags(pet.getFlags() | zz.getValue());
                c.getSession().write((Object)PetPacket.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte)pet.getInventoryPosition()), true));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                c.getSession().write((Object)MTSCSPacket.changePetFlag(uniqueid, true, zz.getValue()));
                used = true;
                break;
            }
            case 5191000: 
            case 5191001: 
            case 5191002: 
            case 5191003: 
            case 5191004: {
                MaplePet.PetFlag zz;
                int uniqueid = (int)slea.readLong();
                MaplePet pet = c.getPlayer().getPet(0);
                int slo = 0;
                if (pet == null) break;
                if (pet.getUniqueId() != uniqueid) {
                    pet = c.getPlayer().getPet(1);
                    slo = 1;
                    if (pet == null) break;
                    if (pet.getUniqueId() != uniqueid) {
                        pet = c.getPlayer().getPet(2);
                        slo = 2;
                        if (pet == null || pet.getUniqueId() != uniqueid) break;
                    }
                }
                if ((zz = MaplePet.PetFlag.getByDelId(itemId)) == null || !zz.check(pet.getFlags())) break;
                pet.setFlags(pet.getFlags() - zz.getValue());
                c.getSession().write((Object)PetPacket.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte)pet.getInventoryPosition()), true));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                c.getSession().write((Object)MTSCSPacket.changePetFlag(uniqueid, false, zz.getValue()));
                used = true;
                break;
            }
            case 5170000: {
                MaplePet pet = c.getPlayer().getPet(0);
                int slo = 0;
                if (pet == null) break;
                String nName = slea.readMapleAsciiString();
                pet.setName(nName);
                c.getSession().write((Object)PetPacket.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte)pet.getInventoryPosition()), true));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                c.getPlayer().getMap().broadcastMessage(MTSCSPacket.changePetName(c.getPlayer(), nName, slo));
                used = true;
                break;
            }
            case 5240000: 
            case 5240001: 
            case 5240002: 
            case 5240003: 
            case 5240004: 
            case 5240005: 
            case 5240006: 
            case 5240007: 
            case 5240008: 
            case 5240009: 
            case 5240010: 
            case 5240011: 
            case 5240012: 
            case 5240013: 
            case 5240014: 
            case 5240015: 
            case 5240016: 
            case 5240017: 
            case 5240018: 
            case 5240019: 
            case 5240020: 
            case 5240021: 
            case 5240022: 
            case 5240023: 
            case 5240024: 
            case 5240025: 
            case 5240026: 
            case 5240027: 
            case 5240028: {
                MaplePet pet = c.getPlayer().getPet(0);
                if (pet == null || !pet.canConsume(itemId) && ((pet = c.getPlayer().getPet(1)) == null || !pet.canConsume(itemId) && ((pet = c.getPlayer().getPet(2)) == null || !pet.canConsume(itemId)))) break;
                byte petindex = c.getPlayer().getPetIndex(pet);
                pet.setFullness(100);
                if (pet.getCloseness() < 30000) {
                    if (pet.getCloseness() + 100 > 30000) {
                        pet.setCloseness(30000);
                    } else {
                        pet.setCloseness(pet.getCloseness() + 100);
                    }
                    if (pet.getCloseness() >= GameConstants.getClosenessNeededForLevel(pet.getLevel() + 1)) {
                        pet.setLevel(pet.getLevel() + 1);
                        c.getSession().write((Object)PetPacket.showOwnPetLevelUp(c.getPlayer().getPetIndex(pet)));
                        c.getPlayer().getMap().broadcastMessage(PetPacket.showPetLevelUp(c.getPlayer(), petindex));
                    }
                }
                c.getSession().write((Object)PetPacket.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem(pet.getInventoryPosition()), true));
                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), PetPacket.commandResponse(c.getPlayer().getId(), (byte)1, petindex, true, true), true);
                used = true;
                break;
            }
            case 5230000: {
                int itemSearch = slea.readInt();
                List<HiredMerchant> hms = c.getChannelServer().searchMerchant(itemSearch);
                if (hms.size() > 0) {
                    c.getSession().write((Object)MaplePacketCreator.getOwlSearched(itemSearch, hms));
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(1, "Unable to find the item.");
                break;
            }
            case 5280001: 
            case 5281000: 
            case 5281001: {
                Rectangle bounds = new Rectangle((int)c.getPlayer().getPosition().getX(), (int)c.getPlayer().getPosition().getY(), 1, 1);
                MapleMist mist = new MapleMist(bounds, c.getPlayer());
                c.getPlayer().getMap().spawnMist(mist, 10000, true);
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getChatText(c.getPlayer().getId(), "Oh no, I farted!", false, 1));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                used = true;
                break;
            }
            case 5320000: {
                String name = slea.readMapleAsciiString();
                String otherName = slea.readMapleAsciiString();
                slea.readInt();
                slea.readInt();
                byte cardId = slea.readByte();
                slea.readShort();
                slea.readByte();
                byte comm = slea.readByte();
                PredictCardFactory pcf = PredictCardFactory.getInstance();
                PredictCardFactory.PredictCard Card = pcf.getPredictCard(cardId);
                PredictCardFactory.PredictCardComment Comment = pcf.getPredictCardComment(pcf.getCardCommentSize());
                if (Card == null || Comment == null) break;
                c.getPlayer().dropMessage(5, "\u5360\u535c\u53ea\u662f\u968f\u4fbf\u5199\u7684\uff0c\u5360\u535c\u7ed3\u679c\u5c31\u5f53\u4e2a\u73a9\u7b11\u770b\u770b\u3002");
                int love1 = Randomizer.rand(1, Comment.score) + 5;
                c.getSession().write((Object)MTSCSPacket.show\u5854\u7f57\u724c(name, otherName, love1, cardId, pcf.getCardCommentSize()));
                used = true;
                break;
            }
            case 5370000: {
                if (c.getPlayer().getMapId() / 1000000 == 109) {
                    c.getPlayer().dropMessage(1, "\u8acb\u52ff\u5728\u6d3b\u52d5\u5730\u5716\u4f7f\u7528\u9ed1\u677f");
                    break;
                }
                c.getPlayer().setChalkboard(slea.readMapleAsciiString());
                break;
            }
            case 5370001: {
                if (c.getPlayer().getMapId() / 1000000 != 910) break;
                c.getPlayer().setChalkboard(slea.readMapleAsciiString());
                break;
            }
            case 5390000: 
            case 5390001: 
            case 5390002: 
            case 5390003: 
            case 5390004: 
            case 5390005: 
            case 5390006: 
            case 5390007: 
            case 5390008: 
            case 5390009: 
            case 5390010: 
            case 5390011: 
            case 5390012: 
            case 5390013: 
            case 5390014: 
            case 5390015: 
            case 5390016: 
            case 5390017: 
            case 5390018: 
            case 5390019: 
            case 5390020: 
            case 5390021: 
            case 5390022: 
            case 5390023: 
            case 5390024: 
            case 5390025: 
            case 5390030: {
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "\u5fc5\u9808\u7b49\u7d1a10\u7d1a\u4ee5\u4e0a\u624d\u53ef\u4ee5\u4f7f\u7528.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canAvatarSmega2()) {
                    c.getPlayer().dropMessage(6, "\u5f88\u62b1\u6b49\u70ba\u4e86\u9632\u6b62\u5237\u5ee3,\u6240\u4ee5\u4f60\u6bcf10\u79d2\u53ea\u80fd\u7528\u4e00\u6b21.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    boolean ear;
                    String text = slea.readMapleAsciiString();
                    if (text.length() > 55) break;
                    boolean bl = ear = slea.readByte() != 0;
                    if (c.getPlayer().isPlayer() && text.indexOf("\u5e79") != -1 || text.indexOf("\u8c6c") != -1 || text.indexOf("\u7b28") != -1 || text.indexOf("\u9760") != -1 || text.indexOf("\u8166\u5305") != -1 || text.indexOf("\u8166") != -1 || text.indexOf("\u667a\u969c") != -1 || text.indexOf("\u767d\u76ee") != -1 || text.indexOf("\u767d\u5403") != -1) {
                        c.getPlayer().dropMessage("\u8aaa\u9ad2\u8a71\u662f\u4e0d\u79ae\u8c8c\u7684\uff0c\u8acb\u52ff\u8aaa\u9ad2\u8a71\u3002");
                        c.getSession().write((Object)MaplePacketCreator.enableActions());
                        return;
                    }
                    if (c.getPlayer().isPlayer()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.getAvatarMega(c.getPlayer(), c.getChannel(), itemId, text, ear).getBytes());
                        System.out.println("[\u73a9\u5bb6\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + text);
                    } else if (c.getPlayer().isGM()) {
                        World.Broadcast.broadcastSmega(MaplePacketCreator.getAvatarMega(c.getPlayer(), c.getChannel(), itemId, text, ear).getBytes());
                        System.out.println("[\uff27\uff2d\u5ee3\u64ad\u983b\u9053 " + c.getPlayer().getName() + "] : " + text);
                    }
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(5, "\u76ee\u524d\u5587\u53ed\u505c\u6b62\u4f7f\u7528.");
                break;
            }
            case 5450000: {
                MapleShopFactory.getInstance().getShop(61).sendShop(c);
                used = true;
                break;
            }
            default: {
                if (itemId / 10000 == 512) {
                    MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                    String msg = ii.getMsg(itemId).replaceFirst("%s", c.getPlayer().getName()).replaceFirst("%s", slea.readMapleAsciiString());
                    c.getPlayer().getMap().startMapEffect(msg, itemId);
                    int buff = ii.getStateChangeItem(itemId);
                    if (buff != 0) {
                        for (MapleCharacter mChar : c.getPlayer().getMap().getCharactersThreadsafe()) {
                            ii.getItemEffect(buff).applyTo(mChar);
                        }
                    }
                    used = true;
                    break;
                }
                if (itemId / 10000 == 510) {
                    c.getPlayer().getMap().startJukebox(c.getPlayer().getName(), itemId);
                    used = true;
                    break;
                }
                if (itemId == 5201000) {
                    c.getPlayer().gainBeans(2000);
                    c.getSession().write((Object)MaplePacketCreator.updateBeans(c.getPlayer().getId(), itemId));
                    used = true;
                    break;
                }
                if (itemId == 5201001) {
                    c.getPlayer().gainBeans(500);
                    c.getSession().write((Object)MaplePacketCreator.updateBeans(c.getPlayer().getId(), itemId));
                    used = true;
                    break;
                }
                if (itemId == 5201002) {
                    c.getPlayer().gainBeans(3000);
                    c.getSession().write((Object)MaplePacketCreator.updateBeans(c.getPlayer().getId(), itemId));
                    used = true;
                    break;
                }
                if (itemId == 5201004) {
                    c.getPlayer().gainBeans(40);
                    c.getSession().write((Object)MaplePacketCreator.updateBeans(c.getPlayer().getId(), itemId));
                    used = true;
                    break;
                }
                if (itemId == 5201005) {
                    c.getPlayer().gainBeans(50);
                    c.getSession().write((Object)MaplePacketCreator.updateBeans(c.getPlayer().getId(), itemId));
                    used = true;
                    break;
                }
                if (itemId / 10000 == 520) {
                    int mesars = MapleItemInformationProvider.getInstance().getMeso(itemId);
                    if (mesars <= 0 || c.getPlayer().getMeso() >= Integer.MAX_VALUE - mesars) break;
                    used = true;
                    if (Math.random() > 0.1) {
                        int gainmes = Randomizer.nextInt(mesars);
                        c.getPlayer().gainMeso(gainmes, false);
                        c.getSession().write((Object)MTSCSPacket.sendMesobagSuccess(gainmes));
                        break;
                    }
                    c.getSession().write((Object)MTSCSPacket.sendMesobagFailed());
                    break;
                }
                if (itemId == 5530000) {
                    NPCScriptManager.getInstance().start(c, 9900004, 10086);
                    c.getSession().write((Object)MaplePacketCreator.enableActions());
                    break;
                }
                if (itemId / 10000 == 553 && itemId != 5530000) {
                    InventoryHandler.UseRewardItem(slot, itemId, c, c.getPlayer());
                    break;
                }
                System.out.println("Unhandled CS item : " + itemId);
                System.out.println(slea.toString(true));
            }
        }
        if (used) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, slot, (short)1, false, true);
        }
        c.getSession().write((Object)MaplePacketCreator.enableActions());
        if (cc) {
            if (!c.getPlayer().isAlive() || c.getPlayer().getEventInstance() != null || FieldLimitType.ChannelSwitch.check(c.getPlayer().getMap().getFieldLimit())) {
                c.getPlayer().dropMessage(1, "Auto change channel failed.");
                return;
            }
            c.getPlayer().dropMessage(5, "Auto changing channels. Please wait.");
            c.getPlayer().changeChannel(c.getChannel() == ChannelServer.getChannelCount() ? 1 : c.getChannel() + 1);
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static final void Pickup_Player(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (c.getPlayer().getPlayerShop() != null || c.getPlayer().getConversation() > 0 || c.getPlayer().getTrade() != null) {
            return;
        }
        chr.updateTick(slea.readInt());
        slea.skip(1);
        Point Client_Reportedpos = slea.readPos();
        if (chr == null) {
            return;
        }
        MapleMapObject ob = chr.getMap().getMapObject(slea.readInt(), MapleMapObjectType.ITEM);
        if (ob == null) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        MapleMapItem mapitem = (MapleMapItem)ob;
        Lock lock = mapitem.getLock();
        lock.lock();
        try {
            if (mapitem.isPickedUp()) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            if (mapitem.getOwner() != chr.getId() && (!mapitem.isPlayerDrop() && mapitem.getDropType() == 0 || mapitem.isPlayerDrop() && chr.getMap().getEverlast())) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            if (!(mapitem.isPlayerDrop() || mapitem.getDropType() != 1 || mapitem.getOwner() == chr.getId() || chr.getParty() != null && chr.getParty().getMemberById(mapitem.getOwner()) != null)) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            double Distance = Client_Reportedpos.distanceSq(mapitem.getPosition());
            if (Distance > 2500.0) {
                chr.getCheatTracker().registerOffense(CheatingOffense.ITEMVAC_CLIENT, String.valueOf(Distance));
            } else if (chr.getPosition().distanceSq(mapitem.getPosition()) > 640000.0) {
                chr.getCheatTracker().registerOffense(CheatingOffense.ITEMVAC_SERVER);
            }
            if (mapitem.getMeso() > 0) {
                if (chr.getParty() != null && mapitem.getOwner() != chr.getId()) {
                    LinkedList<MapleCharacter> toGive = new LinkedList<MapleCharacter>();
                    for (MaplePartyCharacter z : chr.getParty().getMembers()) {
                        MapleCharacter m = chr.getMap().getCharacterById(z.getId());
                        if (m == null) continue;
                        toGive.add(m);
                    }
                    for (MapleCharacter m : toGive) {
                        m.gainMeso(mapitem.getMeso() / toGive.size() + (m.getStat().hasPartyBonus ? (int)((double)mapitem.getMeso() / 20.0) : 0), true, true);
                    }
                } else {
                    chr.gainMeso(mapitem.getMeso(), true, true);
                }
                InventoryHandler.removeItem(chr, mapitem, ob);
            } else if (MapleItemInformationProvider.getInstance().isPickupBlocked(mapitem.getItem().getItemId())) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                c.getPlayer().dropMessage(5, "This item cannot be picked up.");
            } else if (InventoryHandler.useItem(c, mapitem.getItemId())) {
                InventoryHandler.removeItem(c.getPlayer(), mapitem, ob);
            } else if (MapleInventoryManipulator.checkSpace(c, mapitem.getItem().getItemId(), mapitem.getItem().getQuantity(), mapitem.getItem().getOwner())) {
                if (mapitem.getItem().getQuantity() >= 50 && GameConstants.isUpgradeScroll(mapitem.getItem().getItemId())) {
                    c.setMonitored(true);
                }
                if (MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), true, mapitem.getDropper() instanceof MapleMonster)) {
                    InventoryHandler.removeItem(chr, mapitem, ob);
                }
            } else {
                c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
                c.getSession().write((Object)MaplePacketCreator.getShowInventoryFull());
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            }
        }
        finally {
            lock.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static final void Pickup_Pet(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        byte petz = c.getPlayer().getPetIndex((int)slea.readLong());
        MaplePet pet = chr.getPet(petz);
        slea.skip(1);
        chr.updateTick(slea.readInt());
        Point Client_Reportedpos = slea.readPos();
        MapleMapObject ob = chr.getMap().getMapObject(slea.readInt(), MapleMapObjectType.ITEM);
        if (ob == null || pet == null) {
            return;
        }
        MapleMapItem mapitem = (MapleMapItem)ob;
        Lock lock = mapitem.getLock();
        lock.lock();
        try {
            if (mapitem.isPickedUp()) {
                c.getSession().write((Object)MaplePacketCreator.getInventoryFull());
                return;
            }
            if (mapitem.getOwner() != chr.getId() && mapitem.isPlayerDrop()) {
                return;
            }
            if (mapitem.getOwner() != chr.getId() && (!mapitem.isPlayerDrop() && mapitem.getDropType() == 0 || mapitem.isPlayerDrop() && chr.getMap().getEverlast())) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            if (!(mapitem.isPlayerDrop() || mapitem.getDropType() != 1 || mapitem.getOwner() == chr.getId() || chr.getParty() != null && chr.getParty().getMemberById(mapitem.getOwner()) != null)) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            double Distance = Client_Reportedpos.distanceSq(mapitem.getPosition());
            if (Distance > 10000.0 && (mapitem.getMeso() > 0 || mapitem.getItemId() != 4001025)) {
                chr.getCheatTracker().registerOffense(CheatingOffense.PET_ITEMVAC_CLIENT, String.valueOf(Distance));
            } else if (pet.getPos().distanceSq(mapitem.getPosition()) > 640000.0) {
                chr.getCheatTracker().registerOffense(CheatingOffense.PET_ITEMVAC_SERVER);
            }
            if (mapitem.getMeso() > 0) {
                if (chr.getParty() != null && mapitem.getOwner() != chr.getId()) {
                    LinkedList<MapleCharacter> toGive = new LinkedList<MapleCharacter>();
                    int splitMeso = mapitem.getMeso() * 40 / 100;
                    for (MaplePartyCharacter z : chr.getParty().getMembers()) {
                        MapleCharacter m = chr.getMap().getCharacterById(z.getId());
                        if (m == null || m.getId() == chr.getId()) continue;
                        toGive.add(m);
                    }
                    for (MapleCharacter m : toGive) {
                        m.gainMeso(splitMeso / toGive.size() + (m.getStat().hasPartyBonus ? (int)((double)mapitem.getMeso() / 20.0) : 0), true);
                    }
                    chr.gainMeso(mapitem.getMeso() - splitMeso, true);
                } else {
                    chr.gainMeso(mapitem.getMeso(), true);
                }
                InventoryHandler.removeItem_Pet(chr, mapitem, petz);
            } else if (MapleItemInformationProvider.getInstance().isPickupBlocked(mapitem.getItemId()) || mapitem.getItemId() / 10000 == 291) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            } else if (InventoryHandler.useItem(c, mapitem.getItemId())) {
                InventoryHandler.removeItem_Pet(chr, mapitem, petz);
            } else if (MapleInventoryManipulator.checkSpace(c, mapitem.getItemId(), mapitem.getItem().getQuantity(), mapitem.getItem().getOwner())) {
                if (mapitem.getItem().getQuantity() >= 50 && mapitem.getItemId() == 2340000) {
                    c.setMonitored(true);
                }
                MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), true, mapitem.getDropper() instanceof MapleMonster);
                InventoryHandler.removeItem_Pet(chr, mapitem, petz);
            }
        }
        finally {
            lock.unlock();
        }
    }

    public static final boolean useItem(MapleClient c, int id) {
        byte consumeval;
        MapleItemInformationProvider ii;
        if (GameConstants.isUse(id) && (consumeval = (ii = MapleItemInformationProvider.getInstance()).isConsumeOnPickup(id)) > 0) {
            if (consumeval == 2) {
                if (c.getPlayer().getParty() != null) {
                    for (MaplePartyCharacter pc : c.getPlayer().getParty().getMembers()) {
                        MapleCharacter chr = c.getPlayer().getMap().getCharacterById(pc.getId());
                        if (chr == null) continue;
                        ii.getItemEffect(id).applyTo(chr);
                    }
                } else {
                    ii.getItemEffect(id).applyTo(c.getPlayer());
                }
            } else {
                ii.getItemEffect(id).applyTo(c.getPlayer());
            }
            c.getSession().write((Object)MaplePacketCreator.getShowItemGain(id, (short)1));
            return true;
        }
        return false;
    }

    public static final void removeItem_Pet(MapleCharacter chr, MapleMapItem mapitem, int pet) {
        mapitem.setPickedUp(true);
        chr.getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 5, chr.getId(), pet), mapitem.getPosition());
        chr.getMap().removeMapObject(mapitem);
        if (mapitem.isRandDrop()) {
            chr.getMap().spawnRandDrop();
        }
    }

    private static final void removeItem(MapleCharacter chr, MapleMapItem mapitem, MapleMapObject ob) {
        mapitem.setPickedUp(true);
        chr.getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 2, chr.getId()), mapitem.getPosition());
        chr.getMap().removeMapObject(ob);
        if (mapitem.isRandDrop()) {
            chr.getMap().spawnRandDrop();
        }
    }

    private static final void addMedalString(MapleCharacter c, StringBuilder sb) {
        IItem medal = c.getInventory(MapleInventoryType.EQUIPPED).getItem((short)-21);
        if (medal != null) {
            sb.append("<");
            sb.append(MapleItemInformationProvider.getInstance().getName(medal.getItemId()));
            sb.append("> ");
        }
    }

    private static final boolean getIncubatedItems(MapleClient c) {
        if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() < 2 || c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() < 2 || c.getPlayer().getInventory(MapleInventoryType.SETUP).getNumFreeSlot() < 2) {
            c.getPlayer().dropMessage(5, "Please make room in your inventory.");
            return false;
        }
        int[] ids = new int[]{2430091, 2430092, 2430093, 2430101, 2430102, 2340000, 1152000, 1152001, 1152004, 1152005, 1152006, 1152007, 1152008, 1000040, 1102246, 1082276, 1050169, 1051210, 1072447, 1442106, 3010019, 1001060, 1002391, 1102004, 1050039, 1102040, 1102041, 1102042, 1102043, 1082145, 1082146, 1082147, 1082148, 1082149, 1082150, 2043704, 2040904, 2040409, 2040307, 2041030, 2040015, 2040109, 2041035, 2041036, 2040009, 2040511, 2040408, 2043804, 2044105, 2044903, 2044804, 2043009, 2043305, 2040610, 2040716, 2041037, 2043005, 2041032, 2040305, 2040211, 2040212, 1022097, 2049000, 2049001, 2049002, 2049003, 1012058, 1012059, 1012060, 1012061, 1332100, 1382058, 1402073, 1432066, 1442090, 1452058, 1462076, 1472069, 1482051, 1492024, 1342009, 2049400, 2049401, 2049301};
        int[] chances = new int[]{100, 100, 100, 100, 100, 1, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5, 2, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 10, 10, 10, 10, 10, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2};
        int z = Randomizer.nextInt(ids.length);
        while (chances[z] < Randomizer.nextInt(1000)) {
            z = Randomizer.nextInt(ids.length);
        }
        int z_2 = Randomizer.nextInt(ids.length);
        while (z_2 == z || chances[z_2] < Randomizer.nextInt(1000)) {
            z_2 = Randomizer.nextInt(ids.length);
        }
        c.getSession().write((Object)MaplePacketCreator.getPeanutResult(ids[z], (short)1, ids[z_2], (short)1));
        return MapleInventoryManipulator.addById(c, ids[z], (short)1, (byte)0) && MapleInventoryManipulator.addById(c, ids[z_2], (short)1, (byte)0);
    }

    public static final void OwlMinerva(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte slot = (byte)slea.readShort();
        int itemid = slea.readInt();
        IItem toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemid && itemid == 2310000) {
            int itemSearch = slea.readInt();
            List<HiredMerchant> hms = c.getChannelServer().searchMerchant(itemSearch);
            if (hms.size() > 0) {
                c.getSession().write((Object)MaplePacketCreator.getOwlSearched(itemSearch, hms));
                MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemid, 1, true, false);
            } else {
                c.getPlayer().dropMessage(1, "Unable to find the item.");
            }
        }
        c.getSession().write((Object)MaplePacketCreator.enableActions());
    }

    public static final void SunziBF(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readInt();
        byte slot = (byte)slea.readShort();
        int itemid = slea.readInt();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IItem item = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (item == null || item.getItemId() != itemid || c.getPlayer().getLevel() > 255) {
            return;
        }
        int expGained = ii.getExpCache(itemid);
        c.getPlayer().gainExp(expGained, true, false, true);
        c.getSession().write((Object)MaplePacketCreator.enableActions());
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short)1, false);
    }

    public static final void HeiLong_BaoWuHe(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte slot = (byte)slea.readShort();
        int itemId = slea.readInt();
        if (c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot).getItemId() != itemId || c.getPlayer().getInventory(MapleInventoryType.USE).countById(itemId) < 1) {
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Pair<Integer, List<MapleItemInformationProvider.RewardItem>> rewards = ii.getItemReward(itemId);
        for (MapleItemInformationProvider.RewardItem reward : rewards.getRight()) {
            if (!MapleInventoryManipulator.checkSpace(c, reward.itemid, reward.quantity, "")) {
                c.getSession().write((Object)MaplePacketCreator.getShowInventoryFull());
                c.getPlayer().dropMessage(5, "\u80cc\u5305\u7a7a\u95f4\u4e0d\u8db3.");
                break;
            }
            if (itemId == 2022615) {
                NPCScriptManager.getInstance().start(c, 9900004, 2022615);
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                break;
            }
            if (itemId == 2022613) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                break;
            }
            if (itemId == 2022618) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                break;
            }
            if (itemId == 2022336) {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            if (Randomizer.nextInt(rewards.getLeft()) >= reward.prob) continue;
            if (CashItemInfo.getInventoryType(reward.itemid) == MapleInventoryType.EQUIP) {
                IItem item = ii.getEquipById(reward.itemid);
                if (reward.period != -1) {
                    item.setExpiration(System.currentTimeMillis() + (long)(reward.period * 60 * 60 * 10));
                }
                MapleInventoryManipulator.addFromDrop(c, item, false);
                c.getPlayer().dropMessage(5, "\u83b7\u5f97\u7269\u54c1.");
            } else {
                MapleInventoryManipulator.addById(c, reward.itemid, reward.quantity, (byte)0);
            }
            MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemId, 1, false, false);
            if (reward.worldmsg == null) break;
            String msg = reward.worldmsg;
            msg.replaceAll("/name", c.getPlayer().getName());
            msg.replaceAll("/item", ii.getName(reward.itemid));
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, msg));
            break;
        }
        c.getSession().write((Object)MaplePacketCreator.enableActions());
    }

    public static final void Owl(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().haveItem(5230000, 1, true, false) || c.getPlayer().haveItem(2310000, 1, true, false)) {
            if (c.getPlayer().getMapId() >= 910000000 && c.getPlayer().getMapId() <= 910000022) {
                c.getSession().write((Object)MaplePacketCreator.getOwlOpen());
            } else {
                c.getPlayer().dropMessage(5, "This can only be used inside the Free Market.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            }
        }
    }

    public static final void UseSkillBook(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        slea.skip(4);
        byte slot = (byte)slea.readShort();
        int itemId = slea.readInt();
        IItem toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId) {
            return;
        }
        Map<String, Integer> skilldata = MapleItemInformationProvider.getInstance().getSkillStats(toUse.getItemId());
        if (skilldata == null) {
            return;
        }
        boolean canuse = false;
        boolean success = false;
        int skill = 0;
        int maxlevel = 0;
        int SuccessRate = skilldata.get("success");
        int ReqSkillLevel = skilldata.get("reqSkillLevel");
        int MasterLevel = skilldata.get("masterLevel");
        int i = 0;
        do {
            Integer CurrentLoopedSkillId = skilldata.get("skillid" + i);
            i = (byte)(i + 1);
            if (CurrentLoopedSkillId == null) break;
            if (Math.floor(CurrentLoopedSkillId / 10000) != (double)chr.getJob()) continue;
            ISkill CurrSkillData = SkillFactory.getSkill(CurrentLoopedSkillId);
            if (chr.getSkillLevel(CurrSkillData) >= ReqSkillLevel && chr.getMasterLevel(CurrSkillData) < MasterLevel) {
                canuse = true;
                if (Randomizer.nextInt(99) <= SuccessRate && SuccessRate != 0) {
                    success = true;
                    ISkill skill2 = CurrSkillData;
                    chr.changeSkillLevel(skill2, chr.getSkillLevel(skill2), (byte)MasterLevel);
                } else {
                    success = false;
                }
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short)1, false);
                break;
            }
            canuse = false;
        } while (true);
        c.getSession().write((Object)MaplePacketCreator.useSkillBook(chr, skill, maxlevel, canuse, success));
    }

    public static final void OwlWarp(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.getSession().write((Object)MaplePacketCreator.enableActions());
        if (c.getPlayer().getMapId() >= 910000000 && c.getPlayer().getMapId() <= 910000022 && c.getPlayer().getPlayerShop() == null) {
            int id = slea.readInt();
            int map = slea.readInt();
            if (map >= 910000001 && map <= 910000022) {
                MapleMap mapp = c.getChannelServer().getMapFactory().getMap(map);
                c.getPlayer().changeMap(mapp, mapp.getPortal(0));
                AbstractPlayerStore merchant = null;
                block0 : switch (2) {
                    case 0: {
                        List<MapleMapObject> objects = mapp.getAllHiredMerchantsThreadsafe();
                        for (MapleMapObject ob : objects) {
                            HiredMerchant merch;
                            IMaplePlayerShop ips;
                            if (!(ob instanceof IMaplePlayerShop) || !((ips = (IMaplePlayerShop)((Object)ob)) instanceof HiredMerchant) || (merch = (HiredMerchant)ips).getOwnerId() != id) continue;
                            merchant = merch;
                            break block0;
                        }
                        break;
                    }
                    case 1: {
                        List<MapleMapObject> objects = mapp.getAllHiredMerchantsThreadsafe();
                        for (MapleMapObject ob : objects) {
                            HiredMerchant merch;
                            IMaplePlayerShop ips;
                            if (!(ob instanceof IMaplePlayerShop) || !((ips = (IMaplePlayerShop)((Object)ob)) instanceof HiredMerchant) || (merch = (HiredMerchant)ips).getStoreId() != id) continue;
                            merchant = merch;
                            break block0;
                        }
                        break;
                    }
                    default: {
                        IMaplePlayerShop ips;
                        MapleMapObject ob = mapp.getMapObject(id, MapleMapObjectType.HIRED_MERCHANT);
                        if (!(ob instanceof IMaplePlayerShop) || !((ips = (IMaplePlayerShop)((Object)ob)) instanceof HiredMerchant)) break;
                        merchant = (HiredMerchant)ips;
                    }
                }
                if (merchant != null) {
                    if (merchant.isOwner(c.getPlayer())) {
                        merchant.setOpen(false);
                        merchant.removeAllVisitors(16, 0);
                        c.getPlayer().setPlayerShop(merchant);
                        c.getSession().write((Object)PlayerShopPacket.getHiredMerch(c.getPlayer(), (HiredMerchant)merchant, false));
                    } else if (!merchant.isOpen() || !merchant.isAvailable()) {
                        c.getPlayer().dropMessage(1, "This shop is in maintenance, please come by later.");
                    } else if (merchant.getFreeSlot() == -1) {
                        c.getPlayer().dropMessage(1, "This shop has reached it's maximum capacity, please come by later.");
                    } else if (((HiredMerchant)merchant).isInBlackList(c.getPlayer().getName())) {
                        c.getPlayer().dropMessage(1, "You have been banned from this store.");
                    } else {
                        c.getPlayer().setPlayerShop(merchant);
                        merchant.addVisitor(c.getPlayer());
                        c.getSession().write((Object)PlayerShopPacket.getHiredMerch(c.getPlayer(), (HiredMerchant)merchant, false));
                    }
                } else {
                    c.getPlayer().dropMessage(1, "This shop is in maintenance, please come by later.");
                }
            }
        }
    }
}

