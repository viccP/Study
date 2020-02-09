/*
 * Decompiled with CFR 0.148.
 */
package server.life;

public enum Element {
    NEUTRAL,
    PHYSICAL,
    FIRE,
    ICE,
    LIGHTING,
    POISON,
    HOLY,
    DARKNESS;


    public static Element getFromChar(char c) {
        switch (Character.toUpperCase(c)) {
            case 'F': {
                return FIRE;
            }
            case 'I': {
                return ICE;
            }
            case 'L': {
                return LIGHTING;
            }
            case 'S': {
                return POISON;
            }
            case 'H': {
                return HOLY;
            }
            case 'P': {
                return NEUTRAL;
            }
        }
        throw new IllegalArgumentException("unknown elemnt char " + c);
    }
}

