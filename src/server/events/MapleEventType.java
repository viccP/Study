/*
 * Decompiled with CFR 0.148.
 */
package server.events;

public enum MapleEventType {
    Coconut("\u6930\u5b50\u6bd4\u8d5b", new int[]{109080000}),
    CokePlay("\u6253\u74f6\u84cb", new int[]{109080010}),
    Fitness("\u5411\u9ad8\u5730", new int[]{109040000, 109040001, 109040002, 109040003, 109040004}),
    OlaOla("\u4e0a\u697c~\u4e0a\u697c~", new int[]{109030001, 109030002, 109030003}),
    OxQuiz("\u5feb\u901fOX\u731c\u9898", new int[]{109020001}),
    Snowball("\u96ea\u7403\u8d5b", new int[]{109060000});

    public String command;
    public int[] mapids;

    private MapleEventType(String comm, int[] mapids) {
        this.command = comm;
        this.mapids = mapids;
    }

    public static final MapleEventType getByString(String splitted) {
        for (MapleEventType t : MapleEventType.values()) {
            if (!t.command.equalsIgnoreCase(splitted)) continue;
            return t;
        }
        return null;
    }
}

