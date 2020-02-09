/*
 * Decompiled with CFR 0.148.
 */
package client;

public enum MapleStat {
    SKIN(1),
    FACE(2),
    HAIR(4),
    LEVEL(64),
    JOB(128),
    STR(256),
    DEX(512),
    INT(1024),
    LUK(2048),
    HP(4096),
    MAXHP(8192),
    MP(16384),
    MAXMP(32768),
    AVAILABLEAP(65536),
    AVAILABLESP(131072),
    EXP(262144),
    FAME(524288),
    MESO(1048576),
    PET(2097152);

    private final int i;

    private MapleStat(int i) {
        this.i = i;
    }

    public int getValue() {
        return this.i;
    }

    public static final MapleStat getByValue(int value) {
        for (MapleStat stat : MapleStat.values()) {
            if (stat.i != value) continue;
            return stat;
        }
        return null;
    }

    public static enum Temp {
        STR(1),
        DEX(2),
        INT(4),
        LUK(8),
        WATK(16),
        WDEF(32),
        MATK(64),
        MDEF(128),
        ACC(256),
        AVOID(512),
        SPEED(1024),
        JUMP(2048);

        private final int i;

        private Temp(int i) {
            this.i = i;
        }

        public int getValue() {
            return this.i;
        }
    }

}

