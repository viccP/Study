/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 */
package handling.channel.handler;

import client.ISkill;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import client.PlayerStats;
import client.SkillFactory;
import constants.GameConstants;
import java.util.ArrayList;
import java.util.List;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import server.MapleStatEffect;
import server.Randomizer;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.SeekableLittleEndianAccessor;

public class StatsHandling {
    private static Logger log = LoggerFactory.getLogger(StatsHandling.class);

    public static final void DistributeAP(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        ArrayList<Pair<MapleStat, Integer>> statupdate = new ArrayList<Pair<MapleStat, Integer>>(2);
        c.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statupdate, true, chr.getJob()));
        chr.updateTick(slea.readInt());
        PlayerStats stat = chr.getStat();
        short job = chr.getJob();
        if (chr.getRemainingAp() > 0) {
            switch (slea.readInt()) {
                case 256: {
                    if (stat.getStr() >= 999) {
                        return;
                    }
                    stat.setStr((short)(stat.getStr() + 1));
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.STR, Integer.valueOf(stat.getStr())));
                    break;
                }
                case 512: {
                    if (stat.getDex() >= 999) {
                        return;
                    }
                    stat.setDex((short)(stat.getDex() + 1));
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.DEX, Integer.valueOf(stat.getDex())));
                    break;
                }
                case 1024: {
                    if (stat.getInt() >= 999) {
                        return;
                    }
                    stat.setInt((short)(stat.getInt() + 1));
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.INT, Integer.valueOf(stat.getInt())));
                    break;
                }
                case 2048: {
                    if (stat.getLuk() >= 999) {
                        return;
                    }
                    stat.setLuk((short)(stat.getLuk() + 1));
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.LUK, Integer.valueOf(stat.getLuk())));
                    break;
                }
                case 8192: {
                    short maxhp = stat.getMaxHp();
                    if (chr.getHpApUsed() >= 10000 || maxhp >= 30000) {
                        return;
                    }
                    if (job == 0) {
                        maxhp = (short)(maxhp + Randomizer.rand(8, 12));
                    } else if (job >= 100 && job <= 132 || job >= 3200 && job <= 3212) {
                        ISkill improvingMaxHP = SkillFactory.getSkill(1000001);
                        byte improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                        maxhp = (short)(maxhp + Randomizer.rand(20, 25));
                        if (improvingMaxHPLevel >= 1) {
                            maxhp = (short)(maxhp + improvingMaxHP.getEffect(improvingMaxHPLevel).getX());
                        }
                    } else if (job >= 200 && job <= 232 || GameConstants.isEvan(job)) {
                        maxhp = (short)(maxhp + Randomizer.rand(10, 20));
                    } else if (job >= 300 && job <= 322 || job >= 400 && job <= 434 || job >= 1300 && job <= 1312 || job >= 1400 && job <= 1412 || job >= 3300 && job <= 3312) {
                        maxhp = (short)(maxhp + Randomizer.rand(16, 20));
                    } else if (job >= 500 && job <= 522 || job >= 3500 && job <= 3512) {
                        ISkill improvingMaxHP = SkillFactory.getSkill(5100000);
                        byte improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                        maxhp = (short)(maxhp + Randomizer.rand(18, 22));
                        if (improvingMaxHPLevel >= 1) {
                            maxhp = (short)(maxhp + improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                        }
                    } else if (job >= 1500 && job <= 1512) {
                        ISkill improvingMaxHP = SkillFactory.getSkill(15100000);
                        byte improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                        maxhp = (short)(maxhp + Randomizer.rand(18, 22));
                        if (improvingMaxHPLevel >= 1) {
                            maxhp = (short)(maxhp + improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                        }
                    } else if (job >= 1100 && job <= 1112) {
                        ISkill improvingMaxHP = SkillFactory.getSkill(11000000);
                        byte improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                        maxhp = (short)(maxhp + Randomizer.rand(36, 42));
                        if (improvingMaxHPLevel >= 1) {
                            maxhp = (short)(maxhp + improvingMaxHP.getEffect(improvingMaxHPLevel).getY());
                        }
                    } else {
                        maxhp = job >= 1200 && job <= 1212 ? (short)(maxhp + Randomizer.rand(15, 21)) : (job >= 2000 && job <= 2112 ? (short)(maxhp + Randomizer.rand(40, 50)) : (short)(maxhp + Randomizer.rand(50, 100)));
                    }
                    maxhp = (short)Math.min(30000, Math.abs(maxhp));
                    chr.setHpApUsed((short)(chr.getHpApUsed() + 1));
                    stat.setMaxHp(maxhp);
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, Integer.valueOf(maxhp)));
                    break;
                }
                case 32768: {
                    short maxmp = stat.getMaxMp();
                    short Int = (short)((short)(stat.getInt() / 10) - 10);
                    if (Int < 0) {
                        Int = 0;
                    }
                    if (chr.getHpApUsed() >= 10000 || stat.getMaxMp() >= 30000) {
                        return;
                    }
                    if (job == 0) {
                        maxmp = (short)(maxmp + Randomizer.rand(6, 8));
                    } else if (job >= 100 && job <= 132) {
                        maxmp = (short)(maxmp + Randomizer.rand(2, 4));
                    } else if (job >= 200 && job <= 232 || GameConstants.isEvan(job) || job >= 3200 && job <= 3212) {
                        ISkill improvingMaxMP = SkillFactory.getSkill(2000001);
                        byte improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
                        maxmp = (short)(maxmp + Randomizer.rand(18, 20));
                        if (improvingMaxMPLevel >= 1) {
                            maxmp = (short)(maxmp + improvingMaxMP.getEffect(improvingMaxMPLevel).getY() * 2);
                        }
                    } else if (job >= 300 && job <= 322 || job >= 400 && job <= 434 || job >= 500 && job <= 522 || job >= 3200 && job <= 3212 || job >= 3500 && job <= 3512 || job >= 1300 && job <= 1312 || job >= 1400 && job <= 1412 || job >= 1500 && job <= 1512) {
                        maxmp = (short)(maxmp + Randomizer.rand(10, 12));
                    } else if (job >= 1100 && job <= 1112) {
                        maxmp = (short)(maxmp + Randomizer.rand(6, 9));
                    } else if (job >= 1200 && job <= 1212) {
                        ISkill improvingMaxMP = SkillFactory.getSkill(12000000);
                        byte improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
                        maxmp = (short)(maxmp + Randomizer.rand(18, 20));
                        if (improvingMaxMPLevel >= 1) {
                            maxmp = (short)(maxmp + improvingMaxMP.getEffect(improvingMaxMPLevel).getY() * 2);
                        }
                    } else {
                        maxmp = job >= 2000 && job <= 2112 ? (short)(maxmp + Randomizer.rand(6, 9)) : (short)(maxmp + Randomizer.rand(50, 100));
                    }
                    maxmp = (short)(maxmp + Int);
                    maxmp = (short)Math.min(30000, Math.abs(maxmp));
                    chr.setHpApUsed((short)(chr.getHpApUsed() + 1));
                    stat.setMaxMp(maxmp);
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, Integer.valueOf(maxmp)));
                    break;
                }
                default: {
                    c.getSession().write((Object)MaplePacketCreator.updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true, chr.getJob()));
                    return;
                }
            }
            chr.setRemainingAp((short)(chr.getRemainingAp() - 1));
            statupdate.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLEAP, Integer.valueOf(chr.getRemainingAp())));
            c.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statupdate, true, chr.getJob()));
        }
    }

    public static final void DistributeSP(int skillid, MapleClient c, MapleCharacter chr) {
        int remainingSp;
        boolean isBeginnerSkill = false;
        switch (skillid) {
            case 1000: 
            case 1001: 
            case 1002: {
                byte snailsLevel = chr.getSkillLevel(SkillFactory.getSkill(1000));
                byte recoveryLevel = chr.getSkillLevel(SkillFactory.getSkill(1001));
                byte nimbleFeetLevel = chr.getSkillLevel(SkillFactory.getSkill(1002));
                remainingSp = Math.min(chr.getLevel() - 1, 6) - snailsLevel - recoveryLevel - nimbleFeetLevel;
                isBeginnerSkill = true;
                break;
            }
            case 10001000: 
            case 10001001: 
            case 10001002: {
                byte snailsLevel = chr.getSkillLevel(SkillFactory.getSkill(10001000));
                byte recoveryLevel = chr.getSkillLevel(SkillFactory.getSkill(10001001));
                byte nimbleFeetLevel = chr.getSkillLevel(SkillFactory.getSkill(10001002));
                remainingSp = Math.min(chr.getLevel() - 1, 6) - snailsLevel - recoveryLevel - nimbleFeetLevel;
                isBeginnerSkill = true;
                break;
            }
            case 20001000: 
            case 20001001: 
            case 20001002: {
                byte snailsLevel = chr.getSkillLevel(SkillFactory.getSkill(20001000));
                byte recoveryLevel = chr.getSkillLevel(SkillFactory.getSkill(20001001));
                byte nimbleFeetLevel = chr.getSkillLevel(SkillFactory.getSkill(20001002));
                remainingSp = Math.min(chr.getLevel() - 1, 6) - snailsLevel - recoveryLevel - nimbleFeetLevel;
                isBeginnerSkill = true;
                break;
            }
            case 20011000: 
            case 20011001: 
            case 20011002: {
                byte snailsLevel = chr.getSkillLevel(SkillFactory.getSkill(20011000));
                byte recoveryLevel = chr.getSkillLevel(SkillFactory.getSkill(20011001));
                byte nimbleFeetLevel = chr.getSkillLevel(SkillFactory.getSkill(20011002));
                remainingSp = Math.min(chr.getLevel() - 1, 6) - snailsLevel - recoveryLevel - nimbleFeetLevel;
                isBeginnerSkill = true;
                break;
            }
            case 30000002: 
            case 30001000: 
            case 30001001: {
                byte snailsLevel = chr.getSkillLevel(SkillFactory.getSkill(30001000));
                byte recoveryLevel = chr.getSkillLevel(SkillFactory.getSkill(30001001));
                byte nimbleFeetLevel = chr.getSkillLevel(SkillFactory.getSkill(30000002));
                remainingSp = Math.min(chr.getLevel() - 1, 9) - snailsLevel - recoveryLevel - nimbleFeetLevel;
                isBeginnerSkill = true;
                break;
            }
            default: {
                remainingSp = chr.getRemainingSp(GameConstants.getSkillBookForSkill(skillid));
            }
        }
        ISkill skill = SkillFactory.getSkill(skillid);
        if (skill.hasRequiredSkill() && chr.getSkillLevel(SkillFactory.getSkill(skill.getRequiredSkillId())) < skill.getRequiredSkillLevel()) {
            return;
        }
        byte maxlevel = skill.isFourthJob() ? chr.getMasterLevel(skill) : skill.getMaxLevel();
        byte curLevel = chr.getSkillLevel(skill);
        if (skill.isInvisible() && chr.getSkillLevel(skill) == 0 && (skill.isFourthJob() && chr.getMasterLevel(skill) == 0 || !skill.isFourthJob() && maxlevel < 10 && !isBeginnerSkill)) {
            return;
        }
        for (int i : GameConstants.blockedSkills) {
            if (skill.getId() != i) continue;
            chr.dropMessage(1, "You may not add this skill.");
            return;
        }
        if (remainingSp > 0 && curLevel + 1 <= maxlevel && skill.canBeLearnedBy(chr.getJob())) {
            if (!isBeginnerSkill) {
                int skillbook = GameConstants.getSkillBookForSkill(skillid);
                chr.setRemainingSp(chr.getRemainingSp(skillbook) - 1, skillbook);
            }
            chr.updateSingleStat(MapleStat.AVAILABLESP, chr.getRemainingSp());
            chr.changeSkillLevel(skill, (byte)(curLevel + 1), chr.getMasterLevel(skill));
        } else if (!skill.canBeLearnedBy(chr.getJob())) {
            return;
        }
    }

    public static final void AutoAssignAP(SeekableLittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        ArrayList<Pair<MapleStat, Integer>> statupdate = new ArrayList<Pair<MapleStat, Integer>>(2);
        c.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statupdate, true, chr.getJob()));
        PlayerStats playerst = chr.getStat();
        slea.readInt();
        int count = slea.readInt();
        for (int i = 0; i < count; ++i) {
            int update = slea.readInt();
            int updatenumber = slea.readInt();
            if (chr.getRemainingAp() >= updatenumber) {
                switch (update) {
                    case 256: {
                        if (playerst.getStr() + updatenumber >= 30000) {
                            return;
                        }
                        playerst.setStr((short)(playerst.getStr() + updatenumber));
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.STR, Integer.valueOf(playerst.getStr())));
                        break;
                    }
                    case 512: {
                        if (playerst.getDex() + updatenumber >= 30000) {
                            return;
                        }
                        playerst.setDex((short)(playerst.getDex() + updatenumber));
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.DEX, Integer.valueOf(playerst.getDex())));
                        break;
                    }
                    case 1024: {
                        if (playerst.getInt() + updatenumber >= 30000) {
                            return;
                        }
                        playerst.setInt((short)(playerst.getInt() + updatenumber));
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.INT, Integer.valueOf(playerst.getInt())));
                        break;
                    }
                    case 2048: {
                        if (playerst.getLuk() + updatenumber >= 30000) {
                            return;
                        }
                        playerst.setLuk((short)(playerst.getLuk() + updatenumber));
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.LUK, Integer.valueOf(playerst.getLuk())));
                        break;
                    }
                    default: {
                        c.getSession().write((Object)MaplePacketCreator.updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true, chr.getJob()));
                        return;
                    }
                }
                chr.setRemainingAp((short)(chr.getRemainingAp() - updatenumber));
                continue;
            }
            log.info("[h4x] Player {} is distributing AP to {} without having any", (Object)chr.getName(), (Object)update);
        }
        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLEAP, Integer.valueOf(chr.getRemainingAp())));
        c.getSession().write((Object)MaplePacketCreator.updatePlayerStats(statupdate, true, chr.getJob()));
    }
}

