/*
 * Decompiled with CFR 0.148.
 */
package client;

import java.io.Serializable;

public enum MapleBuffStat implements Serializable
{
    ENHANCED_WDEF(1L, true),
    ENHANCED_MDEF(2L, true),
    PERFECT_ARMOR(4L, true),
    SATELLITESAFE_PROC(8L, true),
    SATELLITESAFE_ABSORB(16L, true),
    CRITICAL_RATE_BUFF(64L, true),
    MP_BUFF(128L, true),
    DAMAGE_TAKEN_BUFF(256L, true),
    DODGE_CHANGE_BUFF(512L, true),
    CONVERSION(1024L, true),
    REAPER(2048L, true),
    MECH_CHANGE(8192L, true),
    DARK_AURA(32768L, true),
    BLUE_AURA(65536L, true),
    YELLOW_AURA(131072L, true),
    ENERGY_CHARGE(0x2000000000L, true),
    DASH_SPEED(0x8000000000L),
    DASH_JUMP(0x4000000000L),
    MONSTER_RIDING(0x10000000000L, true),
    SPEED_INFUSION(0x800000000000L, true),
    HOMING_BEACON(0x80000000000L, true),
    ELEMENT_RESET(0x200000000000000L, true),
    ARAN_COMBO(0x1000000000000000L, true),
    COMBO_DRAIN(0x2000000000000000L, true),
    COMBO_BARRIER(0x4000000000000000L, true),
    BODY_PRESSURE(Long.MIN_VALUE, true),
    SMART_KNOCKBACK(1L, false),
    PYRAMID_PQ(2L, false),
    LIGHTNING_CHARGE(4L, false),
    SOUL_STONE(0x20000000000L, true),
    MAGIC_SHIELD(0x800000000000L, true),
    MAGIC_RESISTANCE(0x1000000000000L, true),
    SOARING(0x4000000000000L, true),
    MIRROR_IMAGE(0x20000000000000L, true),
    OWL_SPIRIT(0x40000000000000L, true),
    FINAL_CUT(0x100000000000000L, true),
    THORNS(0x200000000000000L, true),
    DAMAGE_BUFF(0x400000000000000L, true),
    RAINING_MINES(0x1000000000000000L, true),
    ENHANCED_MAXHP(0x2000000000000000L, true),
    ENHANCED_MAXMP(0x4000000000000000L, true),
    ENHANCED_WATK(Long.MIN_VALUE, true),
    MORPH(2L),
    RECOVERY(4L),
    MAPLE_WARRIOR(8L),
    STANCE(16L),
    SHARP_EYES(32L),
    MANA_REFLECTION(64L),
    DRAGON_ROAR(128L),
    SPIRIT_CLAW(256L),
    INFINITY(512L),
    HOLY_SHIELD(1024L),
    HAMSTRING(2048L),
    BLIND(4096L),
    CONCENTRATE(8192L),
    ECHO_OF_HERO(32768L),
    UNKNOWN3(65536L),
    GHOST_MORPH(131072L),
    ARIANT_COSS_IMU(262144L),
    DROP_RATE(0x100000L),
    MESO_RATE(0x200000L),
    EXPRATE(0x400000L),
    ACASH_RATE(0x800000L),
    GM_HIDE(0x1000000L),
    UNKNOWN7(0x2000000L),
    ILLUSION(0x4000000L),
    BERSERK_FURY(0x8000000L),
    DIVINE_BODY(0x10000000L),
    SPARK(0x20000000L),
    ARIANT_COSS_IMU2(0x40000000L),
    FINALATTACK(0x80000000L),
    WATK(0x100000000L),
    WDEF(0x200000000L),
    MATK(0x400000000L),
    MDEF(0x800000000L),
    ACC(0x1000000000L),
    AVOID(0x2000000000L),
    HANDS(0x4000000000L),
    SPEED(0x8000000000L),
    JUMP(0x10000000000L),
    MAGIC_GUARD(0x20000000000L),
    DARKSIGHT(0x40000000000L),
    BOOSTER(0x80000000000L),
    POWERGUARD(0x100000000000L),
    MAXHP(0x200000000000L),
    MAXMP(0x400000000000L),
    INVINCIBLE(0x800000000000L),
    SOULARROW(0x1000000000000L),
    COMBO(0x20000000000000L),
    SUMMON(0x20000000000000L),
    WK_CHARGE(0x40000000000000L),
    DRAGONBLOOD(0x80000000000000L),
    HOLY_SYMBOL(0x100000000000000L),
    MESOUP(0x200000000000000L),
    SHADOWPARTNER(0x400000000000000L),
    PICKPOCKET(0x800000000000000L),
    PUPPET(0x800000000000000L),
    能量(0x2000000000L, true),
    能量获取(0x2000000000L, true),
    骑宠技能(0x10000000000L),
    MESOGUARD(0x1000000000000000L),
    矛连击强化(0x100000000L, 3L),
    矛连击强化2(0x200000000L, true),
    矛连击强化防御(0x200000000L, true),
    矛连击强化魔法防御(0x800000000L, true),
    连环吸血(0x40000000000000L),
    灵巧击退(0x800000000000L),
    战神之盾(0x800000000000L),
    WEAKEN(0x4000000000000000L);

    private static final long serialVersionUID = 0L;
    private final long buffstat;
    private final long maskPos;
    private final boolean first;

    private MapleBuffStat(long buffstat) {
        this.buffstat = buffstat;
        this.maskPos = 4L;
        this.first = false;
    }

    private MapleBuffStat(long buffstat, long maskPos) {
        this.buffstat = buffstat;
        this.maskPos = maskPos;
        this.first = false;
    }

    private MapleBuffStat(long buffstat, boolean first) {
        this.buffstat = buffstat;
        this.maskPos = 4L;
        this.first = first;
    }

    public long getMaskPos() {
        return this.maskPos;
    }

    public final boolean isFirst() {
        return this.first;
    }

    public final long getValue() {
        return this.buffstat;
    }
}