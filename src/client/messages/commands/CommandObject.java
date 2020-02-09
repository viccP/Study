/*
 * Decompiled with CFR 0.148.
 */
package client.messages.commands;

import client.MapleClient;
import client.messages.commands.CommandExecute;
import constants.ServerConstants;

public class CommandObject {
    private final String command;
    private final int gmLevelReq;
    private final CommandExecute exe;

    public CommandObject(String com, CommandExecute c, int gmLevel) {
        this.command = com;
        this.exe = c;
        this.gmLevelReq = gmLevel;
    }

    public int execute(MapleClient c, String[] splitted) {
        return this.exe.execute(c, splitted);
    }

    public ServerConstants.CommandType getType() {
        return this.exe.getType();
    }

    public int getReqGMLevel() {
        return this.gmLevelReq;
    }
}

