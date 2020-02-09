/*
 * Decompiled with CFR 0.148.
 */
package handling.channel.handler;

public class Beans {
    private int number;
    private int type;
    private int pos;

    public Beans(int pos, int type, int number) {
        this.pos = pos;
        this.number = number;
        this.type = type;
    }

    public int getType() {
        return this.type;
    }

    public int getNumber() {
        return this.number;
    }

    public int getPos() {
        return this.pos;
    }
}

