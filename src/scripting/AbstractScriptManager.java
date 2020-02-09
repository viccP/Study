/*
 * Decompiled with CFR 0.148.
 */
package scripting;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import client.MapleClient;
import tools.FileoutputUtil;

public abstract class AbstractScriptManager {
    private static final ScriptEngineManager sem = new ScriptEngineManager();

    protected Invocable getInvocable(String path, MapleClient c) {
        return this.getInvocable(path, c, false);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    protected Invocable getInvocable(String path, MapleClient c, boolean npc) {
        Object scriptFile;
        InputStreamReader fr = null;
        try {
            path = "scripts/" + path;
            ScriptEngine engine = null;
            if (c != null) {
                engine = c.getScriptEngine(path);
            }
            if (engine == null) {
                scriptFile = new File(path);
                if (!((File)scriptFile).exists()) {
                    Invocable invocable = null;
                    return invocable;
                }
                engine = sem.getEngineByName("javascript");
                if (c != null) {
                    c.setScriptEngine(path, engine);
                }
                fr = new InputStreamReader((InputStream)new FileInputStream((File)scriptFile));
                engine.eval(fr);
            } else if (c != null && npc) {
                c.getPlayer().dropMessage(5, "\u4f60\u73b0\u5728\u4e0d\u80fd\u653b\u51fb\u6216\u4e0d\u80fd\u8ddfnpc\u5bf9\u8bdd,\u8bf7\u5728\u70b9\u51fb\u62cd\u5356\u8fb9\u4e0a\u7684\u804a\u5929\u6765\u89e3\u9664\u5047\u6b7b\u72b6\u6001");
            }
            return (Invocable)(engine);
        }
        catch (Exception e) {
            System.err.println("Error executing script. Path: " + path + "\nException " + e);
            FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Error executing script. Path: " + path + "\nException " + e);
            return null;
        }
        finally {
            try {
                if (fr != null) {
                    fr.close();
                }
            }
            catch (IOException ignore) {}
        }
    }
}

