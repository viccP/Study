/*
 * Decompiled with CFR 0.148.
 */
package server;

import client.inventory.MapleInventoryType;

public class CashItemInfoA {
    private int SN;
    private int itemId;
    private int count;
    private int price;
    private int period;
    private int gender;
    private boolean onSale;

    public CashItemInfoA(int SN, int itemId, int count, int price, int period, int gender, boolean onSale) {
        this.SN = SN;
        this.itemId = itemId;
        this.count = count;
        this.price = price;
        this.period = period;
        this.gender = gender;
        this.onSale = onSale;
    }

    public int getSN() {
        return this.SN;
    }

    public int getId() {
        return this.itemId;
    }

    public boolean genderEquals(int g) {
        return g == this.gender || this.gender == 2;
    }

    public int getItemId() {
        return this.itemId;
    }

    public int getCount() {
        return this.count;
    }

    public int getPrice() {
        return this.price;
    }

    public int getPeriod() {
        return this.period;
    }

    public int getGender() {
        return this.gender;
    }

    public boolean onSale() {
        return this.onSale;
    }

    public static MapleInventoryType getInventoryType(int itemId) {
        byte type = (byte)(itemId / 1000000);
        if (type < 1 || type > 5) {
            return MapleInventoryType.UNDEFINED;
        }
        return MapleInventoryType.getByType(type);
    }

    public int getItemId(int i) {
        return this.itemId;
    }
}

