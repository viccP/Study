/*
 * Decompiled with CFR 0.148.
 */
package client.inventory;

import client.inventory.MaplePet;
import client.inventory.MapleRing;

public interface IItem
extends Comparable<IItem> {
    public byte getType();

    public short getPosition();

    public byte getFlag();

    public short getQuantity();

    public String getOwner();

    public String getGMLog();

    public int getItemId();

    public MaplePet getPet();

    public int getUniqueId();

    public IItem copy();

    public long getExpiration();

    public void setFlag(byte var1);

    public void setUniqueId(int var1);

    public void setPosition(short var1);

    public void setExpiration(long var1);

    public void setOwner(String var1);

    public void setGMLog(String var1);

    public void setQuantity(short var1);

    public void setGiftFrom(String var1);

    public void setEquipLevel(byte var1);

    public byte getEquipLevel();

    public String getGiftFrom();

    public MapleRing getRing();
}

