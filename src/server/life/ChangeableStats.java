/*
 * Decompiled with CFR 0.148.
 */
package server.life;

import constants.GameConstants;
import server.life.MapleMonsterStats;
import server.life.OverrideMonsterStats;

public class ChangeableStats
extends OverrideMonsterStats {
    public int watk;
    public int matk;
    public int acc;
    public int eva;
    public int PDRate;
    public int MDRate;
    public int pushed;
    public int level;

    public ChangeableStats(MapleMonsterStats stats, OverrideMonsterStats ostats) {
        this.hp = ostats.getHp();
        this.exp = ostats.getExp();
        this.mp = ostats.getMp();
        this.eva = stats.getEva();
        this.level = stats.getLevel();
    }

    public ChangeableStats(MapleMonsterStats stats, int newLevel, boolean pqMob) {
        double mod = newLevel / stats.getLevel();
        double hpRatio = stats.getHp() / (long)stats.getExp();
        double pqMod = pqMob ? 2.5 : 1.0;
        this.hp = Math.round((!stats.isBoss() ? (double)GameConstants.getMonsterHP(newLevel) : (double)stats.getHp() * mod) * pqMod);
        this.exp = (int)Math.round((double)stats.getExp() * mod * pqMod);
        this.mp = (int)Math.round((double)stats.getMp() * mod * pqMod);
        this.eva = Math.round(stats.getEva() + Math.max(0, newLevel - stats.getLevel()));
        this.level = newLevel;
    }
}

