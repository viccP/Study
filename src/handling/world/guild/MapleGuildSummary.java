/*
 * Decompiled with CFR 0.148.
 */
package handling.world.guild;

import handling.world.guild.MapleGuild;
import java.io.Serializable;

public class MapleGuildSummary
implements Serializable {
    public static final long serialVersionUID = 3565477792085301248L;
    private String name;
    private short logoBG;
    private byte logoBGColor;
    private short logo;
    private byte logoColor;
    private int allianceid;

    public MapleGuildSummary(MapleGuild g) {
        this.name = g.getName();
        this.logoBG = (short)g.getLogoBG();
        this.logoBGColor = (byte)g.getLogoBGColor();
        this.logo = (short)g.getLogo();
        this.logoColor = (byte)g.getLogoColor();
        this.allianceid = g.getAllianceId();
    }

    public String getName() {
        return this.name;
    }

    public short getLogoBG() {
        return this.logoBG;
    }

    public byte getLogoBGColor() {
        return this.logoBGColor;
    }

    public short getLogo() {
        return this.logo;
    }

    public byte getLogoColor() {
        return this.logoColor;
    }

    public int getAllianceId() {
        return this.allianceid;
    }
}

