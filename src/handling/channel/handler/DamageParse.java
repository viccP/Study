/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.channel.handler;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import client.ISkill;
import client.MapleBuffStat;
import client.MapleCharacter;
import client.PlayerStats;
import client.SkillFactory;
import client.anticheat.CheatTracker;
import client.anticheat.CheatingOffense;
import client.inventory.IItem;
import client.inventory.MapleInventoryType;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.GameConstants;
import server.MapleStatEffect;
import server.Randomizer;
import server.Timer;
import server.life.Element;
import server.life.MapleMonster;
import server.life.MapleMonsterStats;
import server.maps.MapleMap;
import server.maps.MapleMapItem;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.AttackPair;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.LittleEndianAccessor;

public class DamageParse {
    private static final int[] charges = new int[]{1211005, 1211006};
    public static MapleMonster pvpMob;

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static void applyAttack(AttackInfo attack, ISkill theSkill, MapleCharacter player, int attackCount, double maxDamagePerMonster, MapleStatEffect effect, AttackType attack_type) {
        if (!player.isAlive()) {
            player.getCheatTracker().registerOffense(CheatingOffense.ATTACKING_WHILE_DEAD);
            return;
        }
        if (attack.real) {
            player.getCheatTracker().checkAttack(attack.skill, attack.lastAttackTickCount);
        }
        if (attack.skill != 0) {
            if (effect == null) {
                player.getClient().getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            if (GameConstants.isMulungSkill(attack.skill)) {
                if (player.getMapId() / 10000 != 92502) {
                    return;
                }
                player.mulung_EnergyModify(false);
            }
            if (GameConstants.isPyramidSkill(attack.skill)) {
                if (player.getMapId() / 1000000 != 926) {
                    return;
                }
                if (player.getPyramidSubway() == null || !player.getPyramidSubway().onSkillUse(player)) {
                    return;
                }
            }
            if (attack.targets > effect.getMobCount()) {
                player.getCheatTracker().registerOffense(CheatingOffense.MISMATCHING_BULLETCOUNT);
                return;
            }
        }
        if (attack.hits > attackCount && attack.skill != 4211006) {
            player.getCheatTracker().registerOffense(CheatingOffense.MISMATCHING_BULLETCOUNT);
            return;
        }
        if (attack.hits > 0 && attack.targets > 0 && !player.getStat().checkEquipDurabilitys(player, -1)) {
            player.dropMessage(5, "An item has run out of durability but has no inventory room to go to.");
            return;
        }
        int totDamage = 0;
        MapleMap map = player.getMap();
        if (attack.skill == 4211006) {
            for (AttackPair oned : attack.allDamage) {
                if (oned.attack != null) continue;
                MapleMapObject mapobject = map.getMapObject(oned.objectid, MapleMapObjectType.ITEM);
                if (mapobject != null) {
                    MapleMapItem mapitem = (MapleMapItem)mapobject;
                    mapitem.getLock().lock();
                    try {
                        if (mapitem.getMeso() > 0) {
                            if (mapitem.isPickedUp()) {
                                return;
                            }
                            map.removeMapObject(mapitem);
                            map.broadcastMessage(MaplePacketCreator.explodeDrop(mapitem.getObjectId()));
                            mapitem.setPickedUp(true);
                            continue;
                        }
                        player.getCheatTracker().registerOffense(CheatingOffense.ETC_EXPLOSION);
                        return;
                    }
                    finally {
                        mapitem.getLock().unlock();
                        continue;
                    }
                }
                player.getCheatTracker().registerOffense(CheatingOffense.EXPLODING_NONEXISTANT);
                return;
            }
        }
        int totDamageToOneMonster = 0;
        long hpMob = 0L;
        PlayerStats stats = player.getStat();
        short CriticalDamage = stats.passive_sharpeye_percent();
        byte ShdowPartnerAttackPercentage = 0;
        if (attack_type == AttackType.RANGED_WITH_SHADOWPARTNER || attack_type == AttackType.NON_RANGED_WITH_MIRROR) {
            MapleStatEffect shadowPartnerEffect = attack_type == AttackType.NON_RANGED_WITH_MIRROR ? player.getStatForBuff(MapleBuffStat.MIRROR_IMAGE) : player.getStatForBuff(MapleBuffStat.SHADOWPARTNER);
            if (shadowPartnerEffect != null) {
                ShdowPartnerAttackPercentage = attack.skill != 0 && attack_type != AttackType.NON_RANGED_WITH_MIRROR ? (byte)shadowPartnerEffect.getY() : (byte)shadowPartnerEffect.getX();
            }
            attackCount /= 2;
        }
        double maxDamagePerHit = 0.0;
        for (AttackPair oned : attack.allDamage) {
            boolean Tempest;
            MapleStatEffect ds;
            MapleMonster monster = map.getMonsterByOid(oned.objectid);
            if (monster == null) continue;
            totDamageToOneMonster = 0;
            hpMob = monster.getHp();
            MapleMonsterStats monsterstats = monster.getStats();
            int fixeddmg = monsterstats.getFixedDamage();
            boolean bl = Tempest = monster.getStatusSourceID(MonsterStatus.FREEZE) == 21120006;
            if (!Tempest && !player.isGM()) {
                maxDamagePerHit = !monster.isBuffed(MonsterStatus.DAMAGE_IMMUNITY) && !monster.isBuffed(MonsterStatus.WEAPON_IMMUNITY) && !monster.isBuffed(MonsterStatus.WEAPON_DAMAGE_REFLECT) ? DamageParse.CalculateMaxWeaponDamagePerHit(player, monster, attack, theSkill, effect, maxDamagePerMonster, Integer.valueOf(CriticalDamage)) : 1.0;
            }
            int overallAttackCount = 0;
            for (Pair<Integer, Boolean> eachde : oned.attack) {
                Integer eachd = (Integer)eachde.left;
                if ((overallAttackCount = (int)((byte)(overallAttackCount + 1))) - 1 == attackCount) {
                    maxDamagePerHit = maxDamagePerHit / 100.0 * (double)ShdowPartnerAttackPercentage;
                }
                if (fixeddmg != -1) {
                    eachd = monsterstats.getOnlyNoramlAttack() ? Integer.valueOf(attack.skill != 0 ? 0 : fixeddmg) : Integer.valueOf(fixeddmg);
                } else if (monsterstats.getOnlyNoramlAttack()) {
                    eachd = attack.skill != 0 ? 0 : Math.min(eachd, (int)maxDamagePerHit);
                } else if (!player.isGM()) {
                    if (Tempest) {
                        if ((long)eachd.intValue() > monster.getMobMaxHp()) {
                            eachd = (int)Math.min(monster.getMobMaxHp(), Integer.MAX_VALUE);
                            player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE);
                        }
                    } else if (!(monster.isBuffed(MonsterStatus.DAMAGE_IMMUNITY) || monster.isBuffed(MonsterStatus.WEAPON_IMMUNITY) || monster.isBuffed(MonsterStatus.WEAPON_DAMAGE_REFLECT))) {
                        if ((double)eachd.intValue() > maxDamagePerHit) {
                            player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE);
                            if ((double)eachd.intValue() > maxDamagePerHit * 2.0) {
                                eachd = (int)(maxDamagePerHit * 2.0);
                                player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE_2);
                            }
                        }
                        if ((double)eachd.intValue() > maxDamagePerHit && maxDamagePerHit > 1000.0) {
                            player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE, "[伤害: " + eachd + ", 预计伤害: " + maxDamagePerHit + ", 怪物ID: " + monster.getId() + "] [职业: " + player.getJob() + ", 等级: " + player.getLevel() + ", 技能: " + attack.skill + "]");
                            if (attack.real) {
                                player.getCheatTracker().checkSameDamage(eachd, maxDamagePerHit);
                            }
                            if ((double)eachd.intValue() > maxDamagePerHit * 3.0) {
                                return;
                            }
                        }
                    } else if ((double)eachd.intValue() > maxDamagePerHit) {
                        eachd = (int)maxDamagePerHit;
                    }
                }
                if (player.getClient().getChannelServer().isAdminOnly()) {
                    player.dropMessage(5, "Damage: " + eachd);
                }
                totDamageToOneMonster += eachd.intValue();
                if (monster.getId() != 9300021 || player.getPyramidSubway() == null) continue;
                player.getPyramidSubway().onMiss(player);
            }
            totDamage += totDamageToOneMonster;
            player.checkMonsterAggro(monster);
            if (player.getPosition().distanceSq(monster.getPosition()) > 700000.0) {
                player.getCheatTracker().registerOffense(CheatingOffense.ATTACK_FARAWAY_MONSTER);
            }
            if (player.getBuffedValue(MapleBuffStat.PICKPOCKET) != null) {
                switch (attack.skill) {
                    case 0: 
                    case 4001334: 
                    case 4201005: 
                    case 4211002: 
                    case 4211004: 
                    case 4221003: 
                    case 4221007: {
                        DamageParse.handlePickPocket(player, monster, oned);
                    }
                }
            }
            if (!((ds = player.getStatForBuff(MapleBuffStat.DARKSIGHT)) == null || player.isGM() || ds.getSourceId() == 4330001 && ds.makeChanceResult())) {
                player.cancelEffectFromBuffStat(MapleBuffStat.DARKSIGHT);
            }
            if (totDamageToOneMonster <= 0) continue;
            if (attack.skill != 1221011) {
                monster.damage(player, totDamageToOneMonster, true, attack.skill);
            } else {
                monster.damage(player, monster.getHp() - 1L, true, attack.skill);
            }
            if (monster.isBuffed(MonsterStatus.WEAPON_DAMAGE_REFLECT)) {
                player.addHP(-(7000 + Randomizer.nextInt(8000)));
            }
            if (stats.hpRecoverProp > 0 && Randomizer.nextInt(100) <= stats.hpRecoverProp) {
                player.healHP(stats.hpRecover);
            }
            if (stats.mpRecoverProp > 0 && Randomizer.nextInt(100) <= stats.mpRecoverProp) {
                player.healMP(stats.mpRecover);
            }
            if (player.getBuffedValue(MapleBuffStat.COMBO_DRAIN) != null) {
                stats.setHp(stats.getHp() + (int)Math.min(monster.getMobMaxHp(), (long)Math.min((int)((double)totDamage * (double)player.getStatForBuff(MapleBuffStat.COMBO_DRAIN).getX() / 100.0), stats.getMaxHp() / 2)), true);
            }
            switch (attack.skill) {
                case 4101005: 
                case 5111004: {
                    stats.setHp(stats.getHp() + (int)Math.min(monster.getMobMaxHp(), (long)Math.min((int)((double)totDamage * (double)theSkill.getEffect(player.getSkillLevel(theSkill)).getX() / 100.0), stats.getMaxHp() / 2)), true);
                    break;
                }
                case 5211006: 
                case 5220011: 
                case 22151002: {
                    player.setLinkMid(monster.getObjectId());
                    break;
                }
                case 1311005: {
                    int remainingHP = stats.getHp() - totDamage * effect.getX() / 100;
                    stats.setHp(remainingHP < 1 ? 1 : remainingHP);
                    break;
                }
                case 4001002: 
                case 4001334: 
                case 4001344: 
                case 4111005: 
                case 4121007: 
                case 4201005: 
                case 4211002: 
                case 4221001: 
                case 4221007: 
                case 4301001: 
                case 4311002: 
                case 4311003: 
                case 4331000: 
                case 4331004: 
                case 4331005: 
                case 4341005: {
                    MapleStatEffect venomEffect;
                    int i;
                    ISkill skill = SkillFactory.getSkill(4120005);
                    ISkill skill2 = SkillFactory.getSkill(4220005);
                    ISkill skill3 = SkillFactory.getSkill(4340001);
                    if (player.getSkillLevel(skill) > 0) {
                        venomEffect = skill.getEffect(player.getSkillLevel(skill));
                        for (i = 0; i < attackCount; ++i) {
                            if (!venomEffect.makeChanceResult() || monster.getVenomMulti() >= 3) continue;
                            monster.setVenomMulti((byte)(monster.getVenomMulti() + 1));
                            MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(MonsterStatus.POISON, 1, 4120005, null, false);
                            monster.applyStatus(player, monsterStatusEffect, false, venomEffect.getDuration(), true);
                        }
                    } else if (player.getSkillLevel(skill2) > 0) {
                        venomEffect = skill2.getEffect(player.getSkillLevel(skill2));
                        for (i = 0; i < attackCount; ++i) {
                            if (!venomEffect.makeChanceResult() || monster.getVenomMulti() >= 3) continue;
                            monster.setVenomMulti((byte)(monster.getVenomMulti() + 1));
                            MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(MonsterStatus.POISON, 1, 4220005, null, false);
                            monster.applyStatus(player, monsterStatusEffect, false, venomEffect.getDuration(), true);
                        }
                    } else {
                        if (player.getSkillLevel(skill3) <= 0) break;
                        venomEffect = skill3.getEffect(player.getSkillLevel(skill3));
                        for (i = 0; i < attackCount; ++i) {
                            if (!venomEffect.makeChanceResult() || monster.getVenomMulti() >= 3) continue;
                            monster.setVenomMulti((byte)(monster.getVenomMulti() + 1));
                            MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(MonsterStatus.POISON, 1, 4340001, null, false);
                            monster.applyStatus(player, monsterStatusEffect, false, venomEffect.getDuration(), true);
                        }
                    }
                    break;
                }
                case 4201004: {
                    break;
                }
                case 21000002: 
                case 21100001: 
                case 21100002: 
                case 21100004: 
                case 21110002: 
                case 21110003: 
                case 21110004: 
                case 21110006: 
                case 21110007: 
                case 21110008: 
                case 21120002: 
                case 21120005: 
                case 21120006: 
                case 21120009: 
                case 21120010: {
                    MapleStatEffect eff;
                    if (player.getBuffedValue(MapleBuffStat.WK_CHARGE) != null && !monster.getStats().isBoss() && (eff = player.getStatForBuff(MapleBuffStat.WK_CHARGE)) != null && eff.getSourceId() == 21111005) {
                        monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.SPEED, eff.getX(), eff.getSourceId(), null, false), false, eff.getY() * 1000, false);
                    }
                    if (player.getBuffedValue(MapleBuffStat.BODY_PRESSURE) == null || monster.getStats().isBoss() || (eff = player.getStatForBuff(MapleBuffStat.BODY_PRESSURE)) == null || !eff.makeChanceResult() || monster.isBuffed(MonsterStatus.NEUTRALISE)) break;
                    monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.NEUTRALISE, 1, eff.getSourceId(), null, false), false, eff.getX() * 1000, false);
                    break;
                }
            }
            if (totDamageToOneMonster > 0) {
                MapleStatEffect eff;
                MonsterStatusEffect monsterStatusEffect;
                ISkill skill;
                MonsterStatus stat;
                MapleStatEffect eff2;
                IItem weapon_ = player.getInventory(MapleInventoryType.EQUIPPED).getItem((short)-11);
                if (weapon_ != null && (stat = GameConstants.getStatFromWeapon(weapon_.getItemId())) != null && Randomizer.nextInt(100) < GameConstants.getStatChance()) {
                    monsterStatusEffect = new MonsterStatusEffect(stat, GameConstants.getXForStat(stat), GameConstants.getSkillForStat(stat), null, false);
                    monster.applyStatus(player, monsterStatusEffect, false, 10000L, false, false);
                }
                if (player.getBuffedValue(MapleBuffStat.BLIND) != null && (eff = player.getStatForBuff(MapleBuffStat.BLIND)).makeChanceResult()) {
                    monsterStatusEffect = new MonsterStatusEffect(MonsterStatus.ACC, eff.getX(), eff.getSourceId(), null, false);
                    monster.applyStatus(player, monsterStatusEffect, false, eff.getY() * 1000, false);
                }
                if (player.getBuffedValue(MapleBuffStat.HAMSTRING) != null && (eff2 = (skill = SkillFactory.getSkill(3121007)).getEffect(player.getSkillLevel(skill))).makeChanceResult()) {
                    MonsterStatusEffect monsterStatusEffect2 = new MonsterStatusEffect(MonsterStatus.SPEED, eff2.getX(), 3121007, null, false);
                    monster.applyStatus(player, monsterStatusEffect2, false, eff2.getY() * 1000, false);
                }
                if (player.getJob() == 121) {
                    for (int charge : charges) {
                        ISkill skill2 = SkillFactory.getSkill(charge);
                        if (!player.isBuffFrom(MapleBuffStat.WK_CHARGE, skill2)) continue;
                        MonsterStatusEffect monsterStatusEffect3 = new MonsterStatusEffect(MonsterStatus.FREEZE, 1, charge, null, false);
                        monster.applyStatus(player, monsterStatusEffect3, false, skill2.getEffect(player.getSkillLevel(skill2)).getY() * 2000, false);
                        break;
                    }
                }
            }
            if (effect == null || effect.getMonsterStati().size() <= 0 || !effect.makeChanceResult()) continue;
            for (Map.Entry<MonsterStatus, Integer> z : effect.getMonsterStati().entrySet()) {
                monster.applyStatus(player, new MonsterStatusEffect(z.getKey(), z.getValue(), theSkill.getId(), null, false), effect.isPoison(), effect.getDuration(), false);
            }
        }
        if (attack.skill == 4331003 && (long)totDamageToOneMonster < hpMob) {
            return;
        }
        if (attack.skill != 0 && (attack.targets > 0 || attack.skill != 4331003 && attack.skill != 4341002) && attack.skill != 21101003 && attack.skill != 5110001 && attack.skill != 15100004 && attack.skill != 11101002 && attack.skill != 13101002) {
            effect.applyTo(player, attack.position);
        }
        if (totDamage > 1) {
            CheatTracker tracker = player.getCheatTracker();
            tracker.setAttacksWithoutHit(true);
            if (tracker.getAttacksWithoutHit() > 1000) {
                tracker.registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT, Integer.toString(tracker.getAttacksWithoutHit()));
            }
        }
    }

    public static final void applyAttackMagic(AttackInfo attack, ISkill theSkill, MapleCharacter player, MapleStatEffect effect) {
        double maxDamagePerHit;
        if (!player.isAlive()) {
            player.getCheatTracker().registerOffense(CheatingOffense.ATTACKING_WHILE_DEAD);
            System.out.println("Return 7");
            return;
        }
        if (attack.real) {
            player.getCheatTracker().checkAttack(attack.skill, attack.lastAttackTickCount);
        }
        if (attack.hits > effect.getAttackCount() || attack.targets > effect.getMobCount()) {
            player.getCheatTracker().registerOffense(CheatingOffense.MISMATCHING_BULLETCOUNT);
            return;
        }
        if (attack.hits > 0 && attack.targets > 0 && !player.getStat().checkEquipDurabilitys(player, -1)) {
            player.dropMessage(5, "An item has run out of durability but has no inventory room to go to.");
            return;
        }
        if (GameConstants.isMulungSkill(attack.skill)) {
            if (player.getMapId() / 10000 != 92502) {
                return;
            }
            player.mulung_EnergyModify(false);
        }
        if (GameConstants.isPyramidSkill(attack.skill)) {
            if (player.getMapId() / 1000000 != 926) {
                return;
            }
            if (player.getPyramidSubway() == null || !player.getPyramidSubway().onSkillUse(player)) {
                return;
            }
        }
        PlayerStats stats = player.getStat();
        if (attack.skill == 2301002) {
            maxDamagePerHit = 30000.0;
        } else if (attack.skill == 1000 || attack.skill == 10001000 || attack.skill == 20001000 || attack.skill == 20011000 || attack.skill == 30001000) {
            maxDamagePerHit = 40.0;
        } else if (GameConstants.isPyramidSkill(attack.skill)) {
            maxDamagePerHit = 1.0;
        } else {
            double v75 = (double)effect.getMatk() * 0.058;
            maxDamagePerHit = (double)stats.getTotalMagic() * ((double)stats.getInt() * 0.5 + v75 * v75 + (double)effect.getMatk() * 3.3) / 100.0;
        }
        maxDamagePerHit *= 1.04;
        Element element = player.getBuffedValue(MapleBuffStat.ELEMENT_RESET) != null ? Element.NEUTRAL : theSkill.getElement();
        double MaxDamagePerHit = 0.0;
        int totDamage = 0;
        short CriticalDamage = stats.passive_sharpeye_percent();
        ISkill eaterSkill = SkillFactory.getSkill(GameConstants.getMPEaterForJob(player.getJob()));
        byte eaterLevel = player.getSkillLevel(eaterSkill);
        MapleMap map = player.getMap();
        for (AttackPair oned : attack.allDamage) {
            MapleMonster monster = map.getMonsterByOid(oned.objectid);
            if (monster == null) continue;
            boolean Tempest = monster.getStatusSourceID(MonsterStatus.FREEZE) == 21120006 && !monster.getStats().isBoss();
            int totDamageToOneMonster = 0;
            MapleMonsterStats monsterstats = monster.getStats();
            int fixeddmg = monsterstats.getFixedDamage();
            if (!Tempest && !player.isGM()) {
                MaxDamagePerHit = !monster.isBuffed(MonsterStatus.DAMAGE_IMMUNITY) && !monster.isBuffed(MonsterStatus.MAGIC_IMMUNITY) && !monster.isBuffed(MonsterStatus.MAGIC_DAMAGE_REFLECT) ? DamageParse.CalculateMaxMagicDamagePerHit(player, theSkill, monster, monsterstats, stats, element, Integer.valueOf(CriticalDamage), maxDamagePerHit) : 1.0;
            }
            int overallAttackCount = 0;
            for (Pair<Integer, Boolean> eachde : oned.attack) {
                Integer eachd = (Integer)eachde.left;
                overallAttackCount = (byte)(overallAttackCount + 1);
                if (fixeddmg != -1) {
                    eachd = monsterstats.getOnlyNoramlAttack() ? 0 : fixeddmg;
                } else if (monsterstats.getOnlyNoramlAttack()) {
                    eachd = 0;
                } else if (!player.isGM()) {
                    if (Tempest) {
                        if ((long)eachd.intValue() > monster.getMobMaxHp()) {
                            eachd = (int)Math.min(monster.getMobMaxHp(), Integer.MAX_VALUE);
                            player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE_MAGIC);
                        }
                    } else if (!(monster.isBuffed(MonsterStatus.DAMAGE_IMMUNITY) || monster.isBuffed(MonsterStatus.MAGIC_IMMUNITY) || monster.isBuffed(MonsterStatus.MAGIC_DAMAGE_REFLECT))) {
                        if ((double)eachd.intValue() > maxDamagePerHit) {
                            player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE_MAGIC);
                            if ((double)eachd.intValue() > MaxDamagePerHit * 2.0) {
                                eachd = (int)(MaxDamagePerHit * 2.0);
                                player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE_MAGIC_2);
                            }
                        }
                    } else if ((double)eachd.intValue() > maxDamagePerHit) {
                        eachd = (int)maxDamagePerHit;
                    }
                }
                totDamageToOneMonster += eachd.intValue();
            }
            totDamage += totDamageToOneMonster;
            player.checkMonsterAggro(monster);
            if (player.getPosition().distanceSq(monster.getPosition()) > 700000.0) {
                player.getCheatTracker().registerOffense(CheatingOffense.ATTACK_FARAWAY_MONSTER);
            }
            if (attack.skill == 2301002 && !monsterstats.getUndead()) {
                player.getCheatTracker().registerOffense(CheatingOffense.HEAL_ATTACKING_UNDEAD);
                return;
            }
            if (totDamageToOneMonster <= 0) continue;
            monster.damage(player, totDamageToOneMonster, true, attack.skill);
            if (monster.isBuffed(MonsterStatus.MAGIC_DAMAGE_REFLECT)) {
                player.addHP(-(7000 + Randomizer.nextInt(8000)));
            }
            switch (attack.skill) {
                case 2221003: {
                    monster.setTempEffectiveness(Element.FIRE, theSkill.getEffect(player.getSkillLevel(theSkill)).getDuration());
                    break;
                }
                case 2121003: {
                    monster.setTempEffectiveness(Element.ICE, theSkill.getEffect(player.getSkillLevel(theSkill)).getDuration());
                }
            }
            if (effect != null && effect.getMonsterStati().size() > 0 && effect.makeChanceResult()) {
                for (Map.Entry z : effect.getMonsterStati().entrySet()) {
                    monster.applyStatus(player, new MonsterStatusEffect((MonsterStatus)z.getKey(), (Integer)z.getValue(), theSkill.getId(), null, false), effect.isPoison(), effect.getDuration(), false);
                }
            }
            if (eaterLevel <= 0) continue;
            eaterSkill.getEffect(eaterLevel).applyPassive(player, monster);
        }
        if (attack.skill != 2301002) {
            effect.applyTo(player);
        }
        if (totDamage > 1) {
            CheatTracker tracker = player.getCheatTracker();
            tracker.setAttacksWithoutHit(true);
            if (tracker.getAttacksWithoutHit() > 1000) {
                tracker.registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT, Integer.toString(tracker.getAttacksWithoutHit()));
            }
        }
    }

    private static double CalculateMaxMagicDamagePerHit(MapleCharacter chr, ISkill skill, MapleMonster monster, MapleMonsterStats mobstats, PlayerStats stats, Element elem, Integer sharpEye, double maxDamagePerMonster) {
        double elemMaxDamagePerMob;
        int dLevel = Math.max(mobstats.getLevel() - chr.getLevel(), 0);
        int Accuracy = (int)(Math.floor((double)stats.getTotalInt() / 10.0) + Math.floor((double)stats.getTotalLuk() / 10.0));
        int MinAccuracy = mobstats.getEva() * (dLevel * 2 + 51) / 120;
        if (MinAccuracy > Accuracy && skill.getId() != 1000 && skill.getId() != 10001000 && skill.getId() != 20001000 && skill.getId() != 20011000 && skill.getId() != 30001000 && !GameConstants.isPyramidSkill(skill.getId())) {
            return 0.0;
        }
        switch (monster.getEffectiveness(elem)) {
            case IMMUNE: {
                elemMaxDamagePerMob = 1.0;
                break;
            }
            case NORMAL: {
                elemMaxDamagePerMob = DamageParse.ElementalStaffAttackBonus(elem, maxDamagePerMonster, stats);
                break;
            }
            case WEAK: {
                elemMaxDamagePerMob = DamageParse.ElementalStaffAttackBonus(elem, maxDamagePerMonster * 1.5, stats);
                break;
            }
            case STRONG: {
                elemMaxDamagePerMob = DamageParse.ElementalStaffAttackBonus(elem, maxDamagePerMonster * 0.5, stats);
                break;
            }
            default: {
                throw new RuntimeException("Unknown enum constant");
            }
        }
        elemMaxDamagePerMob -= (double)mobstats.getMagicDefense() * 0.5;
        elemMaxDamagePerMob += elemMaxDamagePerMob / 100.0 * (double)sharpEye.intValue();
        elemMaxDamagePerMob += elemMaxDamagePerMob * (mobstats.isBoss() ? stats.bossdam_r : stats.dam_r) / 100.0;
        switch (skill.getId()) {
            case 1000: 
            case 10001000: 
            case 20001000: 
            case 20011000: 
            case 30001000: {
                elemMaxDamagePerMob = 40.0;
                break;
            }
            case 1020: 
            case 10001020: 
            case 20001020: 
            case 20011020: 
            case 30001020: {
                elemMaxDamagePerMob = 1.0;
            }
        }
        if (elemMaxDamagePerMob < 0.0) {
            elemMaxDamagePerMob = 1.0;
        }
        return elemMaxDamagePerMob;
    }

    private static double ElementalStaffAttackBonus(Element elem, double elemMaxDamagePerMob, PlayerStats stats) {
        switch (elem) {
            case FIRE: {
                return elemMaxDamagePerMob / 100.0 * (double)stats.element_fire;
            }
            case ICE: {
                return elemMaxDamagePerMob / 100.0 * (double)stats.element_ice;
            }
            case LIGHTING: {
                return elemMaxDamagePerMob / 100.0 * (double)stats.element_light;
            }
            case POISON: {
                return elemMaxDamagePerMob / 100.0 * (double)stats.element_psn;
            }
        }
        return elemMaxDamagePerMob / 100.0 * (double)stats.def;
    }

    private static void handlePickPocket(final MapleCharacter player, final MapleMonster mob2, AttackPair oned) {
        final int maxmeso = player.getBuffedValue(MapleBuffStat.PICKPOCKET);
        ISkill skill = SkillFactory.getSkill(4211003);
        MapleStatEffect s = skill.getEffect(player.getSkillLevel(skill));
        for (Pair<Integer, Boolean> eachde : oned.attack) {
            final Integer eachd = (Integer)eachde.left;
            if (!s.makeChanceResult()) continue;
            Timer.MapTimer.getInstance().schedule(new Runnable(){

                @Override
                public void run() {
                    player.getMap().spawnMesoDrop(Math.min((int)Math.max((double)eachd.intValue() / 20000.0 * (double)maxmeso, 1.0), maxmeso), new Point((int)(mob2.getPosition().getX() + (double)Randomizer.nextInt(100) - 50.0), (int)mob2.getPosition().getY()), mob2, player, true, (byte)0);
                }
            }, 100L);
        }
    }

    private static double CalculateMaxWeaponDamagePerHit(MapleCharacter player, MapleMonster monster, AttackInfo attack, ISkill theSkill, MapleStatEffect attackEffect, double maximumDamageToMonster, Integer CriticalDamagePercent) {
        short moblevel;
        ArrayList<Element> elements = new ArrayList<Element>();
        boolean defined = false;
        if (theSkill != null) {
            elements.add(theSkill.getElement());
            switch (theSkill.getId()) {
                case 3001004: 
                case 33101001: {
                    defined = true;
                    break;
                }
                case 1000: 
                case 10001000: 
                case 20001000: 
                case 20011000: 
                case 30001000: {
                    maximumDamageToMonster = 40.0;
                    defined = true;
                    break;
                }
                case 1020: 
                case 10001020: 
                case 20001020: 
                case 20011020: 
                case 30001020: {
                    maximumDamageToMonster = 1.0;
                    defined = true;
                    break;
                }
                case 4331003: {
                    maximumDamageToMonster =  monster.getHp();
                    defined = true;
                    break;
                }
                case 3221007: {
                    maximumDamageToMonster =  monster.getMobMaxHp();
                    defined = true;
                    break;
                }
                case 1221011: {
                    maximumDamageToMonster =  monster.getHp() - 1L;
                    defined = true;
                    break;
                }
                case 4211006: {
                    maximumDamageToMonster = 750000.0;
                    defined = true;
                    break;
                }
                case 1009: 
                case 10001009: 
                case 20001009: 
                case 20011009: 
                case 30001009: {
                    defined = true;
                    maximumDamageToMonster = monster.getStats().isBoss() ? monster.getMobMaxHp() / 30L * 100L : monster.getMobMaxHp();
                    break;
                }
                case 3211006: {
                    if (monster.getStatusSourceID(MonsterStatus.FREEZE) != 3211003) break;
                    defined = true;
                    maximumDamageToMonster = monster.getHp();
                }
            }
        }
        if (player.getBuffedValue(MapleBuffStat.WK_CHARGE) != null) {
            int chargeSkillId = player.getBuffSource(MapleBuffStat.WK_CHARGE);
            switch (chargeSkillId) {
                case 1211003: 
                case 1211004: {
                    elements.add(Element.FIRE);
                    break;
                }
                case 1211005: 
                case 1211006: 
                case 21111005: {
                    elements.add(Element.ICE);
                    break;
                }
                case 1211007: 
                case 1211008: 
                case 15101006: {
                    elements.add(Element.LIGHTING);
                    break;
                }
                case 1221003: 
                case 1221004: 
                case 11111007: {
                    elements.add(Element.HOLY);
                    break;
                }
                case 12101005: {
                    elements.clear();
                }
            }
        }
        if (player.getBuffedValue(MapleBuffStat.LIGHTNING_CHARGE) != null) {
            elements.add(Element.LIGHTING);
        }
        double elementalMaxDamagePerMonster = maximumDamageToMonster;
        if (elements.size() > 0) {
            double elementalEffect;
            switch (attack.skill) {
                case 3111003: 
                case 3211003: {
                    elementalEffect = (double)attackEffect.getX() / 200.0;
                    break;
                }
                default: {
                    elementalEffect = 0.5;
                }
            }
            for (Element element : elements) {
                switch (monster.getEffectiveness(element)) {
                    case IMMUNE: {
                        elementalMaxDamagePerMonster = 1.0;
                        break;
                    }
                    case WEAK: {
                        elementalMaxDamagePerMonster *= 1.0 + elementalEffect;
                        break;
                    }
                    case STRONG: {
                        elementalMaxDamagePerMonster *= 1.0 - elementalEffect;
                        break;
                    }
                }
            }
        }
        short d = (moblevel = monster.getStats().getLevel()) > player.getLevel() ? (short)(moblevel - player.getLevel()) : (short)0;
        elementalMaxDamagePerMonster = elementalMaxDamagePerMonster * (1.0 - 0.01 * (double)d) - (double)monster.getStats().getPhysicalDefense() * 0.5;
        elementalMaxDamagePerMonster += elementalMaxDamagePerMonster / 100.0 * (double)CriticalDamagePercent.intValue();
        if (theSkill != null && theSkill.isChargeSkill() && player.getKeyDownSkill_Time() == 0L) {
            return 0.0;
        }
        MapleStatEffect homing = player.getStatForBuff(MapleBuffStat.HOMING_BEACON);
        if (homing != null && player.getLinkMid() == monster.getObjectId() && homing.getSourceId() == 5220011) {
            elementalMaxDamagePerMonster += elementalMaxDamagePerMonster * (double)homing.getX();
        }
        final PlayerStats stat = player.getStat();
        elementalMaxDamagePerMonster += (elementalMaxDamagePerMonster * (monster.getStats().isBoss() ? stat.bossdam_r : stat.dam_r)) / 100.0;
        if (elementalMaxDamagePerMonster < 0.0) {
            elementalMaxDamagePerMonster = 1.0;
        }
        return elementalMaxDamagePerMonster;
    }

    public static final AttackInfo DivideAttack(AttackInfo attack, int rate) {
        attack.real = false;
        if (rate <= 1) {
            return attack;
        }
        for (AttackPair p : attack.allDamage) {
            if (p.attack == null) continue;
            Iterator<Pair<Integer, Boolean>> i$ = p.attack.iterator();
            while (i$.hasNext()) {
                Pair<Integer, Boolean> eachd;
                Pair<Integer, Boolean> pair = eachd = i$.next();
                Integer.valueOf((Integer)pair.left / rate);
                pair.left = pair.left;
            }
        }
        return attack;
    }

    public static final AttackInfo Modify_AttackCrit(AttackInfo attack, MapleCharacter chr, int type) {
        boolean shadow;
        byte CriticalRate = chr.getStat().passive_sharpeye_rate();
        boolean bl = shadow = type == 2 && chr.getBuffedValue(MapleBuffStat.SHADOWPARTNER) != null || type == 1 && chr.getBuffedValue(MapleBuffStat.MIRROR_IMAGE) != null;
        if (attack.skill != 4211006 && attack.skill != 3211003 && attack.skill != 4111004 && (CriticalRate > 0 || attack.skill == 4221001 || attack.skill == 3221007)) {
            for (AttackPair p : attack.allDamage) {
                if (p.attack != null) {
                    int hit = 0;
                    final int mid_att = p.attack.size() / 2;
                    final List<Pair<Integer, Boolean>> eachd_copy = new ArrayList<Pair<Integer, Boolean>>(p.attack);
                    for (Pair<Integer, Boolean> eachd : p.attack) {
                        hit++;
                        if (!eachd.right) {
                            if (attack.skill == 4221001) { //assassinate never crit first 3, always crit last
                                eachd.right = (hit == 4 && Randomizer.nextInt(100) < 90);
                            } else if (attack.skill == 3221007) { //snipe always crit
                                eachd.right = true;
                            } else if (shadow && hit > mid_att) { //shadowpartner copies second half to first half
                                eachd.right = eachd_copy.get(hit - 1 - mid_att).right;
                            } else {
                                //rough calculation
                                eachd.right = (Randomizer.nextInt(100)/*
                                         * chr.CRand().CRand32__Random_ForMonster()
                                         * % 100
                                         */) < CriticalRate;
                            }
                            eachd_copy.get(hit - 1).right = eachd.right;
                            //System.out.println("CRITICAL RATE: " + CriticalRate + ", passive rate: " + chr.getStat().passive_sharpeye_rate() + ", critical: " + eachd.right);
                        }
                    }
                }
            }
        }
        return attack;
    }

    public static final AttackInfo parseDmgMa(LittleEndianAccessor lea, MapleCharacter chr) {
        AttackInfo ret = new AttackInfo();
        lea.skip(1);
        lea.skip(8);
        ret.tbyte = lea.readByte();
        ret.targets = (byte)(ret.tbyte >>> 4 & 0xF);
        ret.hits = (byte)(ret.tbyte & 0xF);
        lea.skip(8);
        ret.skill = lea.readInt();
        lea.skip(12);
        switch (ret.skill) {
            case 2121001: 
            case 2221001: 
            case 2321001: 
            case 22121000: 
            case 22151001: {
                ret.charge = lea.readInt();
                break;
            }
            default: {
                ret.charge = -1;
            }
        }
        lea.skip(1);
        ret.unk = 0;
        ret.display = lea.readByte();
        ret.animation = lea.readByte();
        lea.skip(1);
        ret.speed = lea.readByte();
        ret.lastAttackTickCount = lea.readInt();
        ret.allDamage = new ArrayList<AttackPair>();
        for (int i = 0; i < ret.targets; ++i) {
            int oid = lea.readInt();
            lea.skip(14);
            ArrayList<Pair<Integer, Boolean>> allDamageNumbers = new ArrayList<Pair<Integer, Boolean>>();
            MapleMonster monster = chr.getMap().getMonsterByOid(oid);
            for (int j = 0; j < ret.hits; ++j) {
                int damage = lea.readInt();
                damage = ret.skill > 0 ? DamageParse.Damage_SkillPD(chr, damage, ret) : DamageParse.Damage_NoSkillPD(chr, damage);
                damage = DamageParse.Damage_PG(chr, damage, ret);
                allDamageNumbers.add(new Pair<Integer, Boolean>(damage, false));
            }
            lea.skip(4);
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers));
        }
        ret.position = lea.readPos();
        return ret;
    }

    public static final AttackInfo parseDmgM(LittleEndianAccessor lea, MapleCharacter chr) {
        AttackInfo ret = new AttackInfo();
        lea.skip(1);
        lea.skip(8);
        ret.tbyte = lea.readByte();
        ret.targets = (byte)(ret.tbyte >>> 4 & 0xF);
        ret.hits = (byte)(ret.tbyte & 0xF);
        lea.skip(8);
        ret.skill = lea.readInt();
        lea.skip(12);
        switch (ret.skill) {
            case 4341002: 
            case 4341003: 
            case 5101004: 
            case 5201002: 
            case 14111006: 
            case 15101003: {
                ret.charge = lea.readInt();
                break;
            }
            default: {
                ret.charge = 0;
            }
        }
        lea.skip(1);
        ret.unk = 0;
        ret.display = lea.readByte();
        ret.animation = lea.readByte();
        lea.skip(1);
        ret.speed = lea.readByte();
        ret.lastAttackTickCount = lea.readInt();
        ret.allDamage = new ArrayList<AttackPair>();
        if (ret.skill == 4211006) {
            return DamageParse.parseMesoExplosion(lea, ret, chr);
        }
        for (int i = 0; i < ret.targets; ++i) {
            int oid = lea.readInt();
            lea.skip(14);
            ArrayList<Pair<Integer, Boolean>> allDamageNumbers = new ArrayList<Pair<Integer, Boolean>>();
            MapleMonster monster = chr.getMap().getMonsterByOid(oid);
            for (int j = 0; j < ret.hits; ++j) {
                int damage = lea.readInt();
                damage = ret.skill > 0 ? DamageParse.Damage_SkillPD(chr, damage, ret) : DamageParse.Damage_NoSkillPD(chr, damage);
                damage = DamageParse.Damage_PG(chr, damage, ret);
                allDamageNumbers.add(new Pair<Integer, Boolean>(damage, false));
            }
            lea.skip(4);
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers));
        }
        ret.position = lea.readPos();
        return ret;
    }

    public static final AttackInfo parseDmgR(LittleEndianAccessor lea, MapleCharacter chr) {
        AttackInfo ret = new AttackInfo();
        lea.skip(1);
        lea.skip(8);
        ret.tbyte = lea.readByte();
        ret.targets = (byte)(ret.tbyte >>> 4 & 0xF);
        ret.hits = (byte)(ret.tbyte & 0xF);
        lea.skip(8);
        ret.skill = lea.readInt();
        lea.skip(12);
        switch (ret.skill) {
            case 3121004: 
            case 3221001: 
            case 5221004: 
            case 13111002: 
            case 33121009: {
                lea.skip(4);
            }
        }
        ret.charge = -1;
        lea.skip(1);
        ret.unk = 0;
        ret.display = lea.readByte();
        ret.animation = lea.readByte();
        lea.skip(1);
        ret.speed = lea.readByte();
        ret.lastAttackTickCount = lea.readInt();
        ret.slot = (byte)lea.readShort();
        ret.csstar = (byte)lea.readShort();
        ret.AOE = lea.readByte();
        ret.allDamage = new ArrayList<AttackPair>();
        for (int i = 0; i < ret.targets; ++i) {
            int oid = lea.readInt();
            lea.skip(14);
            MapleMonster monster = chr.getMap().getMonsterByOid(oid);
            ArrayList<Pair<Integer, Boolean>> allDamageNumbers = new ArrayList<Pair<Integer, Boolean>>();
            for (int j = 0; j < ret.hits; ++j) {
                int damage = lea.readInt();
                damage = ret.skill > 0 ? DamageParse.Damage_SkillPD(chr, damage, ret) : DamageParse.Damage_NoSkillPD(chr, damage);
                damage = DamageParse.Damage_PG(chr, damage, ret);
                allDamageNumbers.add(new Pair<Integer, Boolean>(damage, false));
            }
            lea.skip(4);
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers));
        }
        lea.skip(4);
        ret.position = lea.readPos();
        return ret;
    }

    public static AttackInfo parseMesoExplosion(LittleEndianAccessor lea, AttackInfo ret, MapleCharacter chr) {
        int bullets;
        if (ret.hits == 0) {
            lea.skip(4);
            int bullets2 = lea.readByte();
            for (int j = 0; j < bullets2; ++j) {
                ret.allDamage.add(new AttackPair(lea.readInt(), null));
                lea.skip(1);
            }
            lea.skip(2);
            return ret;
        }
        for (int i = 0; i < ret.targets; ++i) {
            int oid = lea.readInt();
            lea.skip(12);
            bullets = lea.readByte();
            ArrayList<Pair<Integer, Boolean>> allDamageNumbers = new ArrayList<Pair<Integer, Boolean>>();
            for (int j = 0; j < bullets; ++j) {
                int damage = lea.readInt();
                damage = DamageParse.Damage_SkillPD(chr, damage, ret);
                damage = DamageParse.Damage_PG(chr, damage, ret);
                allDamageNumbers.add(new Pair<Integer, Boolean>(damage, false));
            }
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers));
            lea.skip(4);
        }
        lea.skip(4);
        bullets = lea.readByte();
        for (int j = 0; j < bullets; ++j) {
            ret.allDamage.add(new AttackPair(lea.readInt(), null));
            lea.skip(1);
        }
        lea.skip(2);
        return ret;
    }

    public static void Damage_Mob_Level(MapleCharacter c, MapleMonster monster, AttackInfo ret) {
        try {
            if (c.getLevel() < monster.getStats().getLevel() - 20 && ret.skill != 4211006 && c.getJob() > 422 && c.getJob() < 400) {
                String 越级打怪检测 = "职业：" + c.getJob() + "\r\n" + "等级：" + c.getLevel() + "\r\n" + "怪物等级：" + monster.getStats().getLevel() + "怪物名字：" + monster.getStats().getName() + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                FileoutputUtil.packetLog("log\\越级打怪检测\\" + c.getName() + ".log", 越级打怪检测);
            } else if (c.getLevel() < monster.getStats().getLevel() - 30 && ret.skill != 4211006) {
                String 越级打怪检测 = "职业：" + c.getJob() + "\r\n" + "等级：" + c.getLevel() + "\r\n" + "怪物等级：" + monster.getStats().getLevel() + "怪物名字：" + monster.getStats().getName() + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                FileoutputUtil.packetLog("log\\越级打怪检测\\" + c.getName() + ".log", 越级打怪检测);
            }
        }
        catch (Exception e) {
            // empty catch block
        }
    }

    public static void Damage_Position(MapleCharacter c, MapleMonster monster, AttackInfo ret) {
        try {
            if (!GameConstants.不检测技能(ret.skill)) {
                if (c.getJob() >= 1300 && c.getJob() <= 1311 || c.getJob() >= 1400 && c.getJob() <= 1411 || c.getJob() >= 400 && c.getJob() <= 422 || c.getJob() >= 300 && c.getJob() <= 322 || c.getJob() == 500 || c.getJob() >= 520 && c.getJob() <= 522) {
                    if (c.getPosition().y - monster.getPosition().y >= 800) {
                        String 全屏 = "等级A：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                        FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                    } else if (c.getPosition().y - monster.getPosition().y <= -800) {
                        String 全屏 = "等级B：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                        FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                    } else if (c.getPosition().x - monster.getPosition().x >= 800) {
                        String 全屏 = "等级C：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                        FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                    } else if (c.getPosition().x - monster.getPosition().x <= -900) {
                        String 全屏 = "等级D：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                        FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                    }
                } else if (c.getJob() >= 200 && c.getJob() < 300) {
                    if (c.getPosition().y - monster.getPosition().y >= 800) {
                        String 全屏 = "等级E：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                        FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                    } else if (c.getPosition().y - monster.getPosition().y <= -800) {
                        String 全屏 = "等级F：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                        FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                    } else if (c.getPosition().x - monster.getPosition().x >= 550) {
                        String 全屏 = "等级G：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                        FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                    } else if (c.getPosition().x - monster.getPosition().x <= -550) {
                        String 全屏 = "等级H：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                        FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                    }
                } else if (c.getPosition().y - monster.getPosition().y >= 350) {
                    String 全屏 = "等级I：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                    FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                } else if (c.getPosition().y - monster.getPosition().y <= -350) {
                    String 全屏 = "等级J：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                    FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                } else if (c.getPosition().x - monster.getPosition().x >= 500) {
                    String 全屏 = "等级K：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                    FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                } else if (c.getPosition().x - monster.getPosition().x <= -500) {
                    String 全屏 = "等级L：" + c.getLevel() + "\r\n" + "职业：" + c.getJob() + "\r\n" + "地图：" + c.getMapId() + "\r\n" + "人物坐标：X:" + c.getPosition().x + " Y:" + c.getPosition().y + "\r\n" + "怪物坐标：" + monster.getPosition().x + " Y:" + monster.getPosition().y + "\r\n" + "时间：" + FileoutputUtil.CurrentReadable_Time() + "\r\n" + "IP：" + c.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                    FileoutputUtil.packetLog("log\\全屏检测\\" + c.getName() + ".log", 全屏);
                }
            }
        }
        catch (Exception e) {
            // empty catch block
        }
    }

    public static final int Damage_PG(MapleCharacter c, int damage, AttackInfo ret) {
        return damage;
    }

    public static final int Damage_NoSkillPD(MapleCharacter c, int damage) {
        if (c.getJob() == 1000 || c.getJob() == 0 || c.getJob() == 2000) {
            if (damage >= 150) {
                damage = 1;
                return damage;
            }
        } else {
            if (c.getJob() == 2100 || c.getJob() == 2110 || c.getJob() == 2111 || c.getJob() == 2112) {
                if ((double)c.getStat().getCurrentMaxBaseDamage() <= (double)damage / 6.8) {
                    damage = 1;
                }
                return damage;
            }
            if (c.getJob() == 100 || c.getJob() == 110 || c.getJob() == 111 || c.getJob() == 112 || c.getJob() == 120 || c.getJob() == 121 || c.getJob() == 122 || c.getJob() == 130 || c.getJob() == 131 || c.getJob() == 132) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 6)) {
                    damage = 1;
                }
                return damage;
            }
            if (c.getJob() == 200 || c.getJob() == 210 || c.getJob() == 211 || c.getJob() == 212 || c.getJob() == 220 || c.getJob() == 221 || c.getJob() == 222 || c.getJob() == 230 || c.getJob() == 231 || c.getJob() == 232) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 6)) {
                    damage = 1;
                }
                return damage;
            }
            if (c.getJob() == 300 || c.getJob() == 310 || c.getJob() == 311 || c.getJob() == 312 || c.getJob() == 320 || c.getJob() == 321 || c.getJob() == 322) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getJob() == 400 || c.getJob() == 410 || c.getJob() == 411 || c.getJob() == 412 || c.getJob() == 420 || c.getJob() == 421 || c.getJob() == 422) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getJob() == 500 || c.getJob() == 510 || c.getJob() == 511 || c.getJob() == 512 || c.getJob() == 520 || c.getJob() == 521 || c.getJob() == 522) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getJob() == 1000 || c.getJob() == 1100 || c.getJob() == 1110 || c.getJob() == 1111) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getJob() == 1200 || c.getJob() == 1210 || c.getJob() == 1211) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getJob() == 1300 || c.getJob() == 1310 || c.getJob() == 1311) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getJob() == 1400 || c.getJob() == 1410 || c.getJob() == 1411) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7)) {
                    damage = 1;
                    return damage;
                }
            } else if ((c.getJob() == 1500 || c.getJob() == 1510 || c.getJob() == 1511) && c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7)) {
                damage = 1;
                return damage;
            }
        }
        return damage;
    }

    public static final int Damage_SkillPD(MapleCharacter c, int damage, AttackInfo ret) {
        if (GameConstants.Novice_Skill(ret.skill)) {
            if (damage > 40) {
                c.dropMessage(1, "你以为你猴赛雷？");
                c.dropMessage(1, "丢内楼母");
                c.dropMessage(1, "QNMLGB");
                c.dropMessage(1, "fuck you");
                c.dropMessage(1, "吃翔吧你");
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 2100 || c.getJob() == 2110 || c.getJob() == 2111 || c.getJob() == 2112) {
            if (GameConstants.Ares_Skill_350(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 13)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Ares_Skill_140(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 20)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Ares_Skill_1500(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 21)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Ares_Skill_800(ret.skill) && c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 14)) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 100 || c.getJob() == 110 || c.getJob() == 111 || c.getJob() == 112 || c.getJob() == 120 || c.getJob() == 121 || c.getJob() == 122 || c.getJob() == 130 || c.getJob() == 131 || c.getJob() == 132) {
            if (GameConstants.Warrior_Skill_450(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 11)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Warrior_Skill_550(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 18)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Warrior_Skill_900(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 12)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Warrior_Skill_2000(ret.skill) && c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 24)) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 200 || c.getJob() == 210 || c.getJob() == 211 || c.getJob() == 212 || c.getJob() == 220 || c.getJob() == 221 || c.getJob() == 222 || c.getJob() == 230 || c.getJob() == 231 || c.getJob() == 232) {
            if (GameConstants.Magician_Skill_90(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 15)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Magician_Skill_180(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 18)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Magician_Skill_240(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 20)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Magician_Skill_670(ret.skill) && c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 36)) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 300 || c.getJob() == 310 || c.getJob() == 311 || c.getJob() == 312 || c.getJob() == 320 || c.getJob() == 321 || c.getJob() == 322) {
            if (GameConstants.Bowman_Skill_180(ret.skill) && c.getBuffedValue(MapleBuffStat.SHARP_EYES) != null && damage > 0) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 13)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Bowman_Skill_260(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 9)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Bowman_Skill_850(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 12)) {
                    damage = 1;
                    return damage;
                }
            } else if ((double)c.getStat().getCurrentMaxBaseDamage() <= (double)damage / 8.5 && ret.skill == 0) {
                damage = 1;
                return damage;
            }
            if (GameConstants.Bowman_Skill_180(ret.skill) && damage > 0) {
                if ((double)c.getStat().getCurrentMaxBaseDamage() <= (double)damage / 6.5) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Bowman_Skill_260(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 6)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Bowman_Skill_850(ret.skill) && c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 8)) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 400 || c.getJob() == 410 || c.getJob() == 411 || c.getJob() == 412 || c.getJob() == 420 || c.getJob() == 421 || c.getJob() == 422) {
            if (GameConstants.Thief_Skill_180(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 11)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Thief_Skill_250(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 14)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Thief_Skill_500(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 18)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Thief_Skill_800(ret.skill) && c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 25)) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 500 || c.getJob() == 510 || c.getJob() == 511 || c.getJob() == 512 || c.getJob() == 520 || c.getJob() == 521 || c.getJob() == 522) {
            if (GameConstants.Pirate_Skill_290(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 8)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Pirate_Skill_420(ret.skill)) {
                if ((double)c.getStat().getCurrentMaxBaseDamage() <= (double)damage / 9.3) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Pirate_Skill_700(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 13)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Pirate_Skill_810(ret.skill)) {
                if ((double)c.getStat().getCurrentMaxBaseDamage() <= (double)damage / 13.2) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Pirate_Skill_1200(ret.skill) && c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 18)) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 1000 || c.getJob() == 1100 || c.getJob() == 1110 || c.getJob() == 1111) {
            if (GameConstants.Ghost_Knight_Skill_320(ret.skill)) {
                if ((double)c.getStat().getCurrentMaxBaseDamage() <= (double)damage / 8.5) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7) && ret.skill == 0) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 1200 || c.getJob() == 1210 || c.getJob() == 1211) {
            if (GameConstants.Fire_Knight_Skill_140(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 13)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Fire_Knight_Skill_500(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 8)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7) && ret.skill == 0) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 1300 || c.getJob() == 1310 || c.getJob() == 1311) {
            if (GameConstants.Wind_Knight_Skill_160(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 8)) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Wind_Knight_Skill_550(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 11)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7) && ret.skill == 0) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 1400 || c.getJob() == 1410 || c.getJob() == 1411) {
            if (GameConstants.Night_Knight_Skill_220(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 9)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7) && ret.skill == 0) {
                damage = 1;
                return damage;
            }
        } else if (c.getJob() == 1500 || c.getJob() == 1510 || c.getJob() == 1511) {
            if (GameConstants.Thief_Skill_270(ret.skill)) {
                if ((double)c.getStat().getCurrentMaxBaseDamage() <= (double)damage / 7.7) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Thief_Skill_420(ret.skill)) {
                if ((double)c.getStat().getCurrentMaxBaseDamage() <= (double)damage / 10.2) {
                    damage = 1;
                    return damage;
                }
            } else if (GameConstants.Thief_Skill_650(ret.skill)) {
                if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 14)) {
                    damage = 1;
                    return damage;
                }
            } else if (c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 7) && ret.skill == 0) {
                damage = 1;
                return damage;
            }
        } else if (ret.skill == 4211006 && c.getStat().getCurrentMaxBaseDamage() <= (float)(damage / 13)) {
            damage = 1;
            return damage;
        }
        return damage;
    }

}