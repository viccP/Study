/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 */
package constants;

import java.io.FileReader;
import java.io.Reader;
import java.util.Properties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OtherSettings {
    private static OtherSettings instance = null;
    private static boolean CANLOG;
    private Properties itempb_cfg = new Properties();
    private String[] itempb_id;
    private String[] itemjy_id;
    private String[] itemgy_id;
    private String[] mappb_id;
    private static Logger log;

    public OtherSettings() {
        try {
            FileReader is = new FileReader("OtherSettings.ini");
            this.itempb_cfg.load(is);
            is.close();
            this.itempb_id = this.itempb_cfg.getProperty("cashban").split(",");
            this.itemjy_id = this.itempb_cfg.getProperty("cashjy").split(",");
            this.itemgy_id = this.itempb_cfg.getProperty("gysj").split(",");
        }
        catch (Exception e) {
            log.error("Could not configuration", (Throwable)e);
        }
    }

    public String[] getItempb_id() {
        return this.itempb_id;
    }

    public String[] getItemgy_id() {
        return this.itemgy_id;
    }

    public String[] getItemjy_id() {
        return this.itemjy_id;
    }

    public String[] getMappb_id() {
        return this.mappb_id;
    }

    public boolean isCANLOG() {
        return CANLOG;
    }

    public void setCANLOG(boolean CANLOG) {
        OtherSettings.CANLOG = CANLOG;
    }

    public static OtherSettings getInstance() {
        if (instance == null) {
            instance = new OtherSettings();
        }
        return instance;
    }

    static {
        log = LoggerFactory.getLogger(OtherSettings.class);
    }
}

