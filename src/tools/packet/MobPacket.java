/*
 * Decompiled with CFR 0.148.
 */
package tools.packet;

import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.ServerConstants;
import handling.MaplePacket;
import handling.SendPacketOpcode;
import java.awt.Point;
import java.io.PrintStream;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import server.life.MapleMonster;
import server.life.MapleMonsterStats;
import server.life.MobSkill;
import server.movement.LifeMovementFragment;
import tools.data.output.LittleEndianWriter;
import tools.data.output.MaplePacketLittleEndianWriter;

public class MobPacket {
    public static MaplePacket damageMonster(int oid, long damage) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("damageMonster--------------------");
        }
        mplew.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        if (damage > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int)damage);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("damageMonster-59\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket damageFriendlyMob(MapleMonster mob2, long damage, boolean display) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("damageFriendlyMob--------------------");
        }
        mplew.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        mplew.writeInt(mob2.getObjectId());
        mplew.write(display ? 1 : 2);
        if (damage > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int)damage);
        }
        if (mob2.getHp() > Integer.MAX_VALUE) {
            mplew.writeInt((int)((double)mob2.getHp() / (double)mob2.getMobMaxHp() * 2.147483647E9));
        } else {
            mplew.writeInt((int)mob2.getHp());
        }
        if (mob2.getMobMaxHp() > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int)mob2.getMobMaxHp());
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("damageFriendlyMob-91\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket killMonster(int oid, int animation) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("killMonster--------------------");
        }
        mplew.writeShort(SendPacketOpcode.KILL_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(animation);
        if (animation == 4) {
            mplew.writeInt(-1);
        }
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("killMonster-111\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket healMonster(int oid, int heal) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("healMonster--------------------");
        }
        mplew.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        mplew.writeInt(-heal);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("healMonster-129\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket showMonsterHP(int oid, int remhppercentage) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("showMonsterHP--------------------");
        }
        mplew.writeShort(SendPacketOpcode.SHOW_MONSTER_HP.getValue());
        mplew.writeInt(oid);
        mplew.write(remhppercentage);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("showMonsterHP-146\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket showBossHP(MapleMonster mob2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("showBossHPA--------------------");
        }
        mplew.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        mplew.write(5);
        mplew.writeInt(mob2.getId());
        if (mob2.getHp() > Integer.MAX_VALUE) {
            mplew.writeInt((int)((double)mob2.getHp() / (double)mob2.getMobMaxHp() * 2.147483647E9));
        } else {
            mplew.writeInt((int)mob2.getHp());
        }
        if (mob2.getMobMaxHp() > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int)mob2.getMobMaxHp());
        }
        mplew.write(mob2.getStats().getTagColor());
        mplew.write(mob2.getStats().getTagBgColor());
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("showBossHPA-175\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket showBossHP(int monsterId, long currentHp, long maxHp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("showBossHPB--------------------");
        }
        mplew.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        mplew.write(5);
        mplew.writeInt(monsterId);
        if (currentHp > Integer.MAX_VALUE) {
            mplew.writeInt((int)((double)currentHp / (double)maxHp * 2.147483647E9));
        } else {
            mplew.writeInt((int)(currentHp <= 0L ? -1L : currentHp));
        }
        if (maxHp > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int)maxHp);
        }
        mplew.write(6);
        mplew.write(5);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("showBossHPB-206\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket moveMonster(boolean useskill, int skill, int skill1, int skill2, int skill3, int skill4, int oid, Point startPos, Point endPos, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("moveMonster--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MOVE_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        mplew.write(useskill ? 1 : 0);
        mplew.write(skill);
        mplew.write(skill1);
        mplew.write(skill2);
        mplew.write(skill3);
        mplew.write(skill4);
        mplew.writePos(startPos);
        MobPacket.serializeMovementList(mplew, moves);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("moveMonster-234\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    private static void serializeMovementList(LittleEndianWriter lew, List<LifeMovementFragment> moves) {
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("serializeMovementList--------------------");
        }
        lew.write(moves.size());
        for (LifeMovementFragment move : moves) {
            move.serialize(lew);
        }
    }

    public static MaplePacket spawnMonster(MapleMonster life, int spawnType, int effect, int link) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("spawnMonster--------------------");
        }
        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER.getValue());
        mplew.writeInt(life.getObjectId());
        mplew.write(1);
        mplew.writeInt(life.getId());
        MobPacket.addMonsterStatus(mplew, life);
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getPosition().y);
        mplew.write(life.getStance());
        mplew.writeShort(0);
        mplew.writeShort(life.getFh());
        if (effect != 0 || link != 0) {
            mplew.write(effect != 0 ? effect : -3);
            mplew.writeInt(link);
        } else {
            if (spawnType == 0) {
                mplew.writeInt(effect);
            }
            mplew.write(spawnType);
        }
        mplew.write(life.getCarnivalTeam());
        mplew.writeInt(0);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("spawnMonster-280\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static void addMonsterStatus(MaplePacketLittleEndianWriter mplew, MapleMonster life) {
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("addMonsterStatus--------------------");
        }
        if (life.getStati().size() <= 0) {
            life.addEmpty();
        }
        mplew.writeLong(MobPacket.getSpecialLongMask(life.getStati().keySet()));
        mplew.writeLong(MobPacket.getLongMask_NoRef(life.getStati().keySet()));
        boolean ignore_imm = false;
        for (MonsterStatusEffect buff : life.getStati().values()) {
            if (buff.getStati() != MonsterStatus.MAGIC_DAMAGE_REFLECT && buff.getStati() != MonsterStatus.WEAPON_DAMAGE_REFLECT) continue;
            ignore_imm = true;
            break;
        }
        for (MonsterStatusEffect buff : life.getStati().values()) {
            if (buff.getStati() == MonsterStatus.MAGIC_DAMAGE_REFLECT || buff.getStati() == MonsterStatus.WEAPON_DAMAGE_REFLECT || ignore_imm && (buff.getStati() == MonsterStatus.MAGIC_IMMUNITY || buff.getStati() == MonsterStatus.WEAPON_IMMUNITY)) continue;
            mplew.writeShort(buff.getX().shortValue());
            if (buff.getStati() == MonsterStatus.SUMMON) continue;
            if (buff.getMobSkill() != null) {
                mplew.writeShort(buff.getMobSkill().getSkillId());
                mplew.writeShort(buff.getMobSkill().getSkillLevel());
            } else if (buff.getSkill() > 0) {
                mplew.writeInt(buff.getSkill());
            }
            mplew.writeShort(buff.getStati().isEmpty() ? 0 : 1);
        }
    }

    public static MaplePacket controlMonster(MapleMonster life, boolean newSpawn, boolean aggro) {
        return MobPacket.spawnMonsterInternal(life, true, newSpawn, aggro, 0, false);
    }

    private static MaplePacket spawnMonsterInternal(MapleMonster life, boolean requestController, boolean newSpawn, boolean aggro, int effect, boolean makeInvis) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("spawnMonsterInternal--------------------");
        }
        if (makeInvis) {
            mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
            mplew.write(0);
            mplew.writeInt(life.getObjectId());
            if (ServerConstants.PACKET_ERROR_OFF) {
                ServerConstants ERROR = new ServerConstants();
                ERROR.setPACKET_ERROR("spawnMonsterInternal-338\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
            }
            return mplew.getPacket();
        }
        if (requestController) {
            mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
            if (aggro) {
                mplew.write(2);
            } else {
                mplew.write(1);
            }
        } else {
            mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER.getValue());
        }
        mplew.writeInt(life.getObjectId());
        mplew.write(1);
        mplew.writeInt(life.getId());
        mplew.write(0);
        mplew.writeShort(0);
        mplew.writeLong(0L);
        mplew.writeInt(0);
        mplew.write(136);
        mplew.writeInt(0);
        mplew.writeShort(0);
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getPosition().y);
        mplew.write(life.getStance());
        mplew.writeShort(0);
        mplew.writeShort(life.getFh());
        if (effect > 0) {
            mplew.write(effect);
            mplew.write(0);
            mplew.writeShort(0);
            if (effect == 15) {
                mplew.write(0);
            }
        }
        if (newSpawn) {
            mplew.write(-2);
        } else {
            mplew.write(-1);
        }
        mplew.write(life.getCarnivalTeam());
        mplew.writeInt(0);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("spawnMonsterInternal-385\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket stopControllingMonster(int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("stopControllingMonster--------------------");
        }
        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        mplew.write(0);
        mplew.writeInt(oid);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("stopControllingMonster-425\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket makeMonsterInvisible(MapleMonster life) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("makeMonsterInvisible--------------------");
        }
        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        mplew.write(0);
        mplew.writeInt(life.getObjectId());
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("makeMonsterInvisible-442\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket makeMonsterReal(MapleMonster life) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("makeMonsterReal--------------------");
        }
        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER.getValue());
        mplew.writeInt(life.getObjectId());
        mplew.write(1);
        mplew.writeInt(life.getId());
        MobPacket.addMonsterStatus(mplew, life);
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getPosition().y);
        mplew.write(life.getStance());
        mplew.writeShort(0);
        mplew.writeShort(life.getFh());
        mplew.writeShort(-1);
        mplew.writeInt(0);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("makeMonsterReal-468\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket moveMonsterResponse(int objectid, short moveid, int currentMp, boolean useSkills, int skillId, int skillLevel) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("moveMonsterResponse--------------------");
        }
        mplew.writeShort(SendPacketOpcode.MOVE_MONSTER_RESPONSE.getValue());
        mplew.writeInt(objectid);
        mplew.writeShort(moveid);
        mplew.write(useSkills ? 1 : 0);
        mplew.writeShort(currentMp);
        mplew.write(skillId);
        mplew.write(skillLevel);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("moveMonsterResponse-489\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    private static long getSpecialLongMask(Collection<MonsterStatus> statups) {
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getSpecialLongMask--------------------");
        }
        long mask = 0L;
        for (MonsterStatus statup : statups) {
            if (!statup.isFirst()) continue;
            mask |= statup.getValue();
        }
        return mask;
    }

    private static long getLongMask(Collection<MonsterStatus> statups) {
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getLongMask--------------------");
        }
        long mask = 0L;
        for (MonsterStatus statup : statups) {
            if (statup.isFirst()) continue;
            mask |= statup.getValue();
        }
        return mask;
    }

    private static long getLongMask_NoRef(Collection<MonsterStatus> statups) {
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("getLongMask_NoRef--------------------");
        }
        long mask = 0L;
        boolean ignore_imm = false;
        for (MonsterStatus statup : statups) {
            if (statup != MonsterStatus.MAGIC_DAMAGE_REFLECT && statup != MonsterStatus.WEAPON_DAMAGE_REFLECT) continue;
            ignore_imm = true;
            break;
        }
        for (MonsterStatus statup : statups) {
            if (statup == MonsterStatus.MAGIC_DAMAGE_REFLECT || statup == MonsterStatus.WEAPON_DAMAGE_REFLECT || ignore_imm && (statup == MonsterStatus.MAGIC_IMMUNITY || statup == MonsterStatus.WEAPON_IMMUNITY) || statup.isFirst()) continue;
            mask |= statup.getValue();
        }
        return mask;
    }

    public static MaplePacket applyMonsterStatus(int oid, MonsterStatus mse, int x, MobSkill skil) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("applyMonsterStatus--------------------");
        }
        mplew.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        mplew.writeLong(MobPacket.getSpecialLongMask(Collections.singletonList(mse)));
        mplew.writeLong(MobPacket.getLongMask(Collections.singletonList(mse)));
        mplew.writeShort(x);
        mplew.writeShort(skil.getSkillId());
        mplew.writeShort(skil.getSkillLevel());
        mplew.writeShort(mse.isEmpty() ? 1 : 0);
        mplew.writeShort(0);
        mplew.write(2);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("applyMonsterStatus-569\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket applyMonsterStatus(int oid, MonsterStatusEffect mse) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("applyMonsterStatusA--------------------");
        }
        mplew.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        mplew.writeLong(MobPacket.getSpecialLongMask(Collections.singletonList(mse.getStati())));
        mplew.writeLong(MobPacket.getLongMask(Collections.singletonList(mse.getStati())));
        mplew.writeShort(mse.getX());
        if (mse.isMonsterSkill()) {
            mplew.writeShort(mse.getMobSkill().getSkillId());
            mplew.writeShort(mse.getMobSkill().getSkillLevel());
        } else if (mse.getSkill() > 0) {
            mplew.writeInt(mse.getSkill());
        }
        mplew.writeShort(mse.getStati().isEmpty() ? 1 : 0);
        mplew.writeShort(0);
        mplew.write(2);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("applyMonsterStatusA-600\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket applyMonsterStatus(int oid, Map<MonsterStatus, Integer> stati, List<Integer> reflection, MobSkill skil) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("applyMonsterStatusB--------------------");
        }
        mplew.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        mplew.writeLong(MobPacket.getSpecialLongMask(stati.keySet()));
        mplew.writeLong(MobPacket.getLongMask(stati.keySet()));
        for (Map.Entry<MonsterStatus, Integer> mse : stati.entrySet()) {
            mplew.writeShort(mse.getValue());
            mplew.writeShort(skil.getSkillId());
            mplew.writeShort(skil.getSkillLevel());
            mplew.writeShort(mse.getKey().isEmpty() ? 1 : 0);
        }
        for (Integer ref : reflection) {
            mplew.writeInt(ref);
        }
        mplew.writeInt(0);
        mplew.writeShort(0);
        int size = stati.size();
        if (reflection.size() > 0) {
            size /= 2;
        }
        mplew.write(size);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("applyMonsterStatusB-637\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket cancelMonsterStatus(int oid, MonsterStatus stat) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("cancelMonsterStatus--------------------");
        }
        mplew.writeShort(SendPacketOpcode.CANCEL_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        mplew.writeLong(MobPacket.getSpecialLongMask(Collections.singletonList(stat)));
        mplew.writeLong(MobPacket.getLongMask(Collections.singletonList(stat)));
        mplew.write(3);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("cancelMonsterStatus-657\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket talkMonster(int oid, int itemId, String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("talkMonster--------------------");
        }
        mplew.writeShort(SendPacketOpcode.TALK_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.writeInt(500);
        mplew.writeInt(itemId);
        mplew.write(itemId <= 0 ? 0 : 1);
        mplew.write(msg == null || msg.length() <= 0 ? 0 : 1);
        if (msg != null && msg.length() > 0) {
            mplew.writeMapleAsciiString(msg);
        }
        mplew.writeInt(1);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("talkMonster-681\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }

    public static MaplePacket removeTalkMonster(int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (ServerConstants.DEBUG_PACKET) {
            System.out.println("removeTalkMonster--------------------");
        }
        mplew.writeShort(SendPacketOpcode.REMOVE_TALK_MONSTER.getValue());
        mplew.writeInt(oid);
        if (ServerConstants.PACKET_ERROR_OFF) {
            ServerConstants ERROR = new ServerConstants();
            ERROR.setPACKET_ERROR("removeTalkMonster-696\uff1a\r\n" + mplew.getPacket() + "\r\n\r\n");
        }
        return mplew.getPacket();
    }
}

