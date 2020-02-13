/*
 * Decompiled with CFR 0.148.
 */
package server.events;

public enum MapleEventType {
	Coconut("椰子比赛", new int[]{109080000}),
    CokePlay("打瓶蓋", new int[]{109080010}),
    Fitness("向高地", new int[]{109040000, 109040001, 109040002, 109040003, 109040004}),
    OlaOla("上楼~上楼~", new int[]{109030001, 109030002, 109030003}),
    OxQuiz("快速OX猜题", new int[]{109020001}),
    Snowball("雪球赛", new int[]{109060000});

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

