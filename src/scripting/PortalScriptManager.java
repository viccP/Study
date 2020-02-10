/*
 * Decompiled with CFR 0.148.
 */
package scripting;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import javax.script.Compilable;
import javax.script.CompiledScript;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptEngineManager;

import client.MapleClient;
import server.MaplePortal;
import tools.FileoutputUtil;

public class PortalScriptManager {
    private static final PortalScriptManager instance = new PortalScriptManager();
    private final Map<String, PortalScript> scripts = new HashMap<String, PortalScript>();
    private static final ScriptEngineFactory sef = new ScriptEngineManager().getEngineByName("javascript").getFactory();

    public static final PortalScriptManager getInstance() {
        return instance;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    private final PortalScript getPortalScript(MapleClient c, String scriptName) {
        if (this.scripts.containsKey(scriptName)) {
            return this.scripts.get(scriptName);
        }
        File scriptFile = new File("scripts/portal/" + scriptName + ".js");
        if (c.getPlayer().isGM()) {
            c.getPlayer().dropMessage("[系统提示]您已经建立与PortalScript:[" + scriptName + ".js]的对话。");
        }
        if (!scriptFile.exists()) {
            this.scripts.put(scriptName, null);
            return null;
        }
        InputStreamReader fr = null;
        ScriptEngine portal = sef.getScriptEngine();
        try {
            fr = new InputStreamReader((InputStream)new FileInputStream(scriptFile));
            CompiledScript compiled = ((Compilable)((Object)portal)).compile(fr);
            compiled.eval();
        }
        catch (Exception e) {
            System.err.println("Error executing Portalscript: " + scriptName + ":" + e);
            FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Error executing Portal script. (" + scriptName + ") " + e);
        }
        finally {
            if (fr != null) {
                try {
                    fr.close();
                }
                catch (IOException e) {
                    System.err.println("ERROR CLOSING" + e);
                }
            }
        }
        PortalScript script = ((Invocable)((Object)portal)).getInterface(PortalScript.class);
        this.scripts.put(scriptName, script);
        return script;
    }

    public final void executePortalScript(MaplePortal portal, MapleClient c) {
        PortalScript script = this.getPortalScript(c, portal.getScriptName());
        if (script != null) {
            try {
                if (c.getPlayer().isGM()) {
                    c.getPlayer().dropMessage("[系统提示]您已经建立与PortalScriptA:[" + portal.getScriptName() + ".js]的对话。");
                }
                script.enter(new PortalPlayerInteraction(c, portal));
            }
            catch (Exception e) {
                System.err.println("Error entering Portalscript: " + portal.getScriptName() + ":" + e);
            }
        } else {
            System.out.println("Unhandled portal script " + portal.getScriptName() + " on map " + c.getPlayer().getMapId());
            FileoutputUtil.log("Logs/Log_Script_Except.rtf", "Unhandled portal script " + portal.getScriptName() + " on map " + c.getPlayer().getMapId());
        }
    }

    public final void clearScripts() {
        this.scripts.clear();
    }
}