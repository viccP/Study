/*
 * Decompiled with CFR 0.148.
 */
package server;

import java.util.Random;

public class Randomizer {
    private static final Random rand = new Random();

    public static final int nextInt() {
        return rand.nextInt();
    }

    public static final int nextInt(int arg0) {
        return rand.nextInt(arg0);
    }

    public static final void nextBytes(byte[] bytes) {
        rand.nextBytes(bytes);
    }

    public static final boolean nextBoolean() {
        return rand.nextBoolean();
    }

    public static final double nextDouble() {
        return rand.nextDouble();
    }

    public static final float nextFloat() {
        return rand.nextFloat();
    }

    public static final long nextLong() {
        return rand.nextLong();
    }

    public static final int rand(int lbound, int ubound) {
        return (int)(rand.nextDouble() * (double)(ubound - lbound + 1) + (double)lbound);
    }
}

