/*
 * Decompiled with CFR 0.148.
 */
package client.anticheat;

public enum CheatingOffense {
    FAST_SUMMON_ATTACK((byte)5, 6000L, 10, (byte)2),
    FASTATTACK((byte)5, 6000L, 50, (byte)2),
    FASTATTACK2((byte)5, 9000L, 20, (byte)2),
    MOVE_MONSTERS((byte)1, 30000L, 20, (byte)2),
    FAST_HP_MP_REGEN((byte)5, 20000L, 10, (byte)2),
    SAME_DAMAGE((byte)2, 30000L, 150, (byte)2),
    ATTACK_WITHOUT_GETTING_HIT((byte)1, 30000L, 1200, (byte)0),
    HIGH_DAMAGE_MAGIC((byte)5, 30000L, -1, (byte)0),
    HIGH_DAMAGE_MAGIC_2((byte)10, 30000L, -1, (byte)0),
    HIGH_DAMAGE((byte)5, 30000L, -1, (byte)0),
    FAST_TAKE_DAMAGE((byte)1, 60000L, 100, (byte)2),
    HIGH_DAMAGE_2((byte)10, 30000L, -1, (byte)0),
    EXCEED_DAMAGE_CAP((byte)5, 60000L, 800, (byte)0),
    ATTACK_FARAWAY_MONSTER((byte)5, 60000L, 1500),
    ATTACK_FARAWAY_MONSTER_SUMMON((byte)5, 60000L, 200),
    REGEN_HIGH_HP((byte)1, 30000L, 1000, (byte)2),
    REGEN_HIGH_MP((byte)1, 30000L, 1000, (byte)2),
    ITEMVAC_CLIENT((byte)5, 5000L, 10),
    ITEMVAC_SERVER((byte)3, 5000L, 100, (byte)2),
    PET_ITEMVAC_CLIENT((byte)5, 10000L, 20),
    PET_ITEMVAC_SERVER((byte)3, 10000L, 100, (byte)0),
    USING_FARAWAY_PORTAL((byte)1, 60000L, 100, (byte)0),
    AST_TAKE_DAMAG((byte)1, 60000L, 100),
    HIGH_AVOID((byte)20, 180000L, 100, (byte)2),
    HIGH_JUMP((byte)1, 60000L),
    MISMATCHING_BULLETCOUNT((byte)1, 300000L),
    ETC_EXPLOSION((byte)1, 300000L),
    ATTACKING_WHILE_DEAD((byte)1, 300000L, -1, (byte)0),
    USING_UNAVAILABLE_ITEM((byte)1, 300000L),
    FAMING_SELF((byte)1, 300000L),
    FAMING_UNDER_15((byte)1, 0L),
    EXPLODING_NONEXISTANT((byte)1, 300000L),
    SUMMON_HACK((byte)1, 300000L),
    SUMMON_HACK_MOBS((byte)1, 300000L),
    ARAN_COMBO_HACK((byte)1, 600000L, 50),
    HEAL_ATTACKING_UNDEAD((byte)20, 30000L, 100);

    private final byte points;
    private final long validityDuration;
    private final int autobancount;
    private byte bantype = 0;

    public final byte getPoints() {
        return this.points;
    }

    public final long getValidityDuration() {
        return this.validityDuration;
    }

    public final boolean shouldAutoban(int count) {
        if (this.autobancount == -1) {
            return false;
        }
        return count >= this.autobancount;
    }

    public final byte getBanType() {
        return this.bantype;
    }

    public final void setEnabled(boolean enabled) {
        this.bantype = (byte)(enabled ? 1 : 0);
    }

    public final boolean isEnabled() {
        return this.bantype >= 1;
    }

    private CheatingOffense(byte points, long validityDuration) {
        this(points, validityDuration, -1, (byte) 1);
    }

    private CheatingOffense(byte points, long validityDuration, int autobancount) {
        this(points, validityDuration, autobancount, (byte) 1);
    }

    private CheatingOffense(byte points, long validityDuration, int autobancount, byte bantype) {
        this.points = points;
        this.validityDuration = validityDuration;
        this.autobancount = autobancount;
        this.bantype = bantype;
    }
}

