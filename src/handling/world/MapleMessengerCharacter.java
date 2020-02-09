/*
 * Decompiled with CFR 0.148.
 */
package handling.world;

import client.MapleCharacter;
import client.MapleClient;
import java.io.Serializable;

public class MapleMessengerCharacter
implements Serializable {
    private static final long serialVersionUID = 6215463252132450750L;
    private String name = "";
    private int id = -1;
    private int channel = -1;
    private boolean online = false;

    public MapleMessengerCharacter(MapleCharacter maplechar) {
        this.name = maplechar.getName();
        this.channel = maplechar.getClient().getChannel();
        this.id = maplechar.getId();
        this.online = true;
    }

    public MapleMessengerCharacter() {
    }

    public int getChannel() {
        return this.channel;
    }

    public boolean isOnline() {
        return this.online;
    }

    public void setOnline(boolean online2) {
        this.online = online2;
    }

    public String getName() {
        return this.name;
    }

    public int getId() {
        return this.id;
    }

    public int hashCode() {
        int prime = 31;
        int result = 1;
        result = 31 * result + (this.name == null ? 0 : this.name.hashCode());
        return result;
    }

    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (this.getClass() != obj.getClass()) {
            return false;
        }
        MapleMessengerCharacter other = (MapleMessengerCharacter)obj;
        return !(this.name == null ? other.name != null : !this.name.equals(other.name));
    }
}

