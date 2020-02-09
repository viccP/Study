/*
 * Decompiled with CFR 0.148.
 */
package client;

public class CharacterNameAndId {
    private final int id;
    private final int level;
    private final int job;
    private final String name;
    private final String group;

    public CharacterNameAndId(int id, String name, int level, int job, String group) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.job = job;
        this.group = group;
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getGroup() {
        return this.group;
    }

    public int getLevel() {
        return this.level;
    }

    public int getJob() {
        return this.job;
    }
}

