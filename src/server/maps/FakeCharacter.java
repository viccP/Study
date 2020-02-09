/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 */
package server.maps;

import org.apache.mina.common.IoSession;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Equip;
import client.inventory.IItem;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import tools.MockIOSession;

public class FakeCharacter {
    private MapleCharacter ch;
    private MapleCharacter owner;
    private boolean follow = true;

    public FakeCharacter(MapleCharacter player, int id, int lx) {
        String pz = null;
        MapleCharacter clone = new MapleCharacter(true);
        clone.setFake();
        clone.setHair(player.getHair());
        clone.setFace(player.getFace());
        clone.setSkinColor(player.getSkinColor());
        clone.setName("\u3016" + player.getName() + "-" + pz + "\u3017", false);
        clone.setID(id + 1000000);
        clone.setLevel(player.getLevel());
        clone.setJob(player.getJob());
        clone.setMap(player.getMap());
        clone.setPosition(player.getPosition());
        MapleInventory equip = clone.getInventory(MapleInventoryType.EQUIPPED);
        IItem weapon_item = player.getInventory(MapleInventoryType.EQUIPPED).getItem((short)-11);
        Equip \u5e3d\u5b50 = new Equip(1003766, (byte) -101);
        Equip \u52cb\u7ae0 = new Equip(1142443, (byte) -26);
        Equip \u5957\u88c5 = new Equip(1052553, (byte) -105);
        Equip \u62ab\u98ce = new Equip(1102632, (byte) -109);
        Equip \u978b\u5b50 = new Equip(1072888, (byte) -107);
        Equip RING1 = new Equip(1112586, (byte) -112);
        clone.getInventory(MapleInventoryType.EQUIPPED).addFromDB(weapon_item);
        clone.getInventory(MapleInventoryType.EQUIPPED).addFromDB(\u5e3d\u5b50);
        clone.getInventory(MapleInventoryType.EQUIPPED).addFromDB(\u62ab\u98ce);
        clone.getInventory(MapleInventoryType.EQUIPPED).addFromDB(\u978b\u5b50);
        clone.getInventory(MapleInventoryType.EQUIPPED).addFromDB(\u5957\u88c5);
        clone.getInventory(MapleInventoryType.EQUIPPED).addFromDB(\u52cb\u7ae0);
        clone.getInventory(MapleInventoryType.EQUIPPED).addFromDB(RING1);
        player.getMap().addBotPlayer(clone, lx);
        clone.setClient(new MapleClient(null, null, (IoSession)new MockIOSession()){});
        this.ch = clone;
        this.owner = player;
    }

    public MapleCharacter getFakeChar() {
        return this.ch;
    }

    public boolean follow() {
        return this.follow;
    }

    public void setFollow(boolean set) {
        this.follow = set;
    }

    public MapleCharacter getOwner() {
        return this.owner;
    }

}

