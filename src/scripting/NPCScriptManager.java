/*
 * Decompiled with CFR 0.148.
 */
package scripting;

import java.util.Map;
import java.util.WeakHashMap;
import java.util.concurrent.locks.Lock;

import javax.script.Invocable;
import javax.script.ScriptEngine;

import client.MapleClient;
import server.quest.MapleQuest;
import tools.FileoutputUtil;

public class NPCScriptManager
extends AbstractScriptManager {
    private final Map<MapleClient, NPCConversationManager> cms = new WeakHashMap<MapleClient, NPCConversationManager>();
    private static final NPCScriptManager instance = new NPCScriptManager();

    public static final NPCScriptManager getInstance() {
        return instance;
    }

    public void start(MapleClient c, int npc) {
        this.start(c, npc, 0);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void start(MapleClient c, int npc, int wh) {
        Lock lock = c.getNPCLock();
        lock.lock();
        try {
            if (c.getPlayer().isGM()) {
                if (wh == 0) {
                    c.getPlayer().dropMessage("[系统提示]您已经建立与NPC:" + npc + "的对话。");
                } else {
                    c.getPlayer().dropMessage("[系统提示]您已经建立与NPC:" + npc + "_" + wh + "的对话。");
                }
            }
            if (!this.cms.containsKey(c)) {
                Invocable iv = wh == 0 ? this.getInvocable("npc/" + npc + ".js", c, true) : this.getInvocable("npc/" + npc + "_" + wh + ".js", c, true);
                ScriptEngine scriptengine = (ScriptEngine)((Object)iv);
                NPCConversationManager cm = wh == 0 ? new NPCConversationManager(c, npc, -1, (byte) -1, iv, 0) : new NPCConversationManager(c, npc, -1, (byte) -1, iv, wh);
                this.cms.put(c, cm);
                if (iv == null || NPCScriptManager.getInstance() == null) {
                    if (wh == 0) {
                        cm.sendOk("欢迎来到#b冒险岛#k。我暂时没有功能。如果你有好的建议或者好的想法可以让我拥有功能。可以联系管理员。\r\n我的ID是: #r" + npc + "#k.");
                    } else {
                        cm.sendOk("欢迎来到#b冒险岛#k。我暂时没有功能。如果你有好的建议或者好的想法可以让我拥有功能。可以联系管理员。\r\n我的ID是: #r" + npc + "_" + wh + "#k.");
                    }
                    cm.dispose();
                    return;
                }
                scriptengine.put("cm", cm);
                scriptengine.put("npcid", npc);
                c.getPlayer().setConversation(1);
                try {
                    iv.invokeFunction("start", new Object[0]);
                }
                catch (NoSuchMethodException nsme) {
                    iv.invokeFunction("action", (byte)1, (byte)0, 0);
                    FileoutputUtil.log("Logs/ScriptEx_LogAAA.rtf", "Error executing NPC script, NPC ID : " + nsme);
                }
            } else {
                c.getPlayer().dropMessage(5, "你现在不能攻击或不能跟npc对话,请在点击拍卖边上的聊天来解除假死状态");
            }
        }
        catch (Exception e) {
            System.err.println("NPC 腳本錯誤, 它ID為 : " + npc + "_" + wh + "." + e);
            if (c.getPlayer().isGM()) {
                c.getPlayer().dropMessage("[系統提示] NPC " + npc + "_" + wh + "腳本錯誤 " + e + "");
            }
            FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Error executing NPC script, NPC ID : " + npc + "_" + wh + "." + e);
            this.dispose(c);
        }
        finally {
            lock.unlock();
        }
    }

    public void action(MapleClient c, byte mode, byte type, int selection) {
        this.action(c, mode, type, selection, 0);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void action(MapleClient c, byte mode, byte type, int selection, int wh) {
        if (mode != -1) {
            NPCConversationManager cm = this.cms.get(c);
            if (cm == null || cm.getLastMsg() > -1) {
                return;
            }
            Lock lock = c.getNPCLock();
            lock.lock();
            try {
                if (cm.pendingDisposal) {
                    this.dispose(c);
                } else if (wh == 0) {
                    cm.getIv().invokeFunction("action", mode, type, selection);
                } else {
                    cm.getIv().invokeFunction("action", mode, type, selection, wh);
                }
            }
            catch (Exception e) {
                if (c.getPlayer().isGM()) {
                    c.getPlayer().dropMessage("[系統提示] NPC " + cm.getNpc() + "_" + wh + "腳本錯誤 " + e + "");
                }
                System.err.println("NPC 腳本錯誤. 它ID為 : " + cm.getNpc() + "_" + wh + ":" + e);
                this.dispose(c);
                FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Error executing NPC script, NPC ID : " + cm.getNpc() + "_" + wh + "." + e);
            }
            finally {
                lock.unlock();
            }
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void startQuest(MapleClient c, int npc, int quest) {
        if (!MapleQuest.getInstance(quest).canStart(c.getPlayer(), null)) {
            return;
        }
        Lock lock = c.getNPCLock();
        lock.lock();
        try {
            if (!this.cms.containsKey(c)) {
                Invocable iv = this.getInvocable("quest/" + quest + ".js", c, true);
                if (iv == null) {
                    this.dispose(c);
                    return;
                }
                ScriptEngine scriptengine = (ScriptEngine)((Object)iv);
                NPCConversationManager cm = new NPCConversationManager(c, npc, quest, (byte) 0, iv, 0);
                this.cms.put(c, cm);
                scriptengine.put("qm", cm);
                c.getPlayer().setConversation(1);
                if (c.getPlayer().isGM()) {
                    c.getPlayer().dropMessage("[系統提示]您已經建立與任務腳本:" + quest + "的往來。");
                }
                iv.invokeFunction("start", (byte)1, (byte)0, 0);
            } else {
                this.dispose(c);
            }
        }
        catch (Exception e) {
            System.err.println("Error executing Quest script. (" + quest + ")..NPCID: " + npc + ":" + e);
            FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Error executing Quest script. (" + quest + ")..NPCID: " + npc + ":" + e);
            this.dispose(c);
        }
        finally {
            lock.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void startQuest(MapleClient c, byte mode, byte type, int selection) {
        Lock lock = c.getNPCLock();
        NPCConversationManager cm = this.cms.get(c);
        if (cm == null || cm.getLastMsg() > -1) {
            return;
        }
        lock.lock();
        try {
            if (cm.pendingDisposal) {
                this.dispose(c);
            } else {
                cm.getIv().invokeFunction("start", mode, type, selection);
            }
        }
        catch (Exception e) {
            if (c.getPlayer().isGM()) {
                c.getPlayer().dropMessage("[系統提示]任務腳本:" + cm.getQuest() + "錯誤...NPC: " + cm.getNpc() + ":" + e);
            }
            System.err.println("Error executing Quest script. (" + cm.getQuest() + ")...NPC: " + cm.getNpc() + ":" + e);
            FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Error executing Quest script. (" + cm.getQuest() + ")..NPCID: " + cm.getNpc() + ":" + e);
            this.dispose(c);
        }
        finally {
            lock.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void endQuest(MapleClient c, int npc, int quest, boolean customEnd) {
        if (!customEnd && !MapleQuest.getInstance(quest).canComplete(c.getPlayer(), null)) {
            return;
        }
        Lock lock = c.getNPCLock();
        lock.lock();
        try {
            if (!this.cms.containsKey(c)) {
                Invocable iv = this.getInvocable("quest/" + quest + ".js", c, true);
                if (iv == null) {
                    this.dispose(c);
                    return;
                }
                ScriptEngine scriptengine = (ScriptEngine)((Object)iv);
                NPCConversationManager cm = new NPCConversationManager(c, npc, quest, (byte) 1, iv, 0);
                this.cms.put(c, cm);
                scriptengine.put("qm", cm);
                c.getPlayer().setConversation(1);
                iv.invokeFunction("end", (byte)1, (byte)0, 0);
            }
        }
        catch (Exception e) {
            if (c.getPlayer().isGM()) {
                c.getPlayer().dropMessage("[系統提示]任務腳本:" + quest + "錯誤...NPC: " + quest + ":" + e);
            }
            System.err.println("Error executing Quest script. (" + quest + ")..NPCID: " + npc + ":" + e);
            FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Error executing Quest script. (" + quest + ")..NPCID: " + npc + ":" + e);
            this.dispose(c);
        }
        finally {
            lock.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void endQuest(MapleClient c, byte mode, byte type, int selection) {
        Lock lock = c.getNPCLock();
        NPCConversationManager cm = this.cms.get(c);
        if (cm == null || cm.getLastMsg() > -1) {
            return;
        }
        lock.lock();
        try {
            if (cm.pendingDisposal) {
                this.dispose(c);
            } else {
                cm.getIv().invokeFunction("end", mode, type, selection);
            }
        }
        catch (Exception e) {
            if (c.getPlayer().isGM()) {
                c.getPlayer().dropMessage("[系統提示]任務腳本:" + cm.getQuest() + "錯誤...NPC: " + cm.getNpc() + ":" + e);
            }
            System.err.println("Error executing Quest script. (" + cm.getQuest() + ")...NPC: " + cm.getNpc() + ":" + e);
            FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Error executing Quest script. (" + cm.getQuest() + ")..NPCID: " + cm.getNpc() + ":" + e);
            this.dispose(c);
        }
        finally {
            lock.unlock();
        }
    }

    public final void dispose(MapleClient c) {
        NPCConversationManager npccm = this.cms.get(c);
        if (npccm != null) {
            this.cms.remove(c);
            if (npccm.getType() == -1) {
                if (npccm.getwh() == 0) {
                    c.removeScriptEngine("scripts/npc/" + npccm.getNpc() + ".js");
                } else {
                    c.removeScriptEngine("scripts/npc/" + npccm.getNpc() + "_" + npccm.getwh() + ".js");
                }
                c.removeScriptEngine("scripts/npc/notcoded.js");
            } else {
                c.removeScriptEngine("scripts/quest/" + npccm.getQuest() + ".js");
            }
        }
        if (c.getPlayer() != null && c.getPlayer().getConversation() == 1) {
            c.getPlayer().setConversation(0);
        }
    }

    public final NPCConversationManager getCM(MapleClient c) {
        return this.cms.get(c);
    }
}