/*
 * Decompiled with CFR 0.148.
 */
package server;

import database.DatabaseConnection;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.Reader;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class ServerProperties {
    private static final Properties props = new Properties();
    private static final String[] toLoad;

    private ServerProperties() {
    }

    public static String getProperty(String s) {
        return props.getProperty(s);
    }

    public static void setProperty(String prop, String newInf) {
        props.setProperty(prop, newInf);
    }

    public static String getProperty(String s, String def) {
        return props.getProperty(s, def);
    }

    static {
        for (String s : toLoad = new String[]{"Settings.ini"}) {
            try {
                InputStreamReader fr = new InputStreamReader((InputStream)new FileInputStream(s), "UTF-8");
                props.load(fr);
                fr.close();
            }
            catch (IOException ex) {
                System.out.println("\u52a0\u8f7dSettings\u9519\u8bef\uff1a" + ex);
            }
        }
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM auth_server_channel_ip");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                props.put(rs.getString("name") + rs.getInt("channelid"), rs.getString("value"));
            }
            rs.close();
            ps.close();
        }
        catch (SQLException ex) {
            ex.printStackTrace();
            System.exit(0);
        }
    }
}

