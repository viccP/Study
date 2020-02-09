/*
 * Decompiled with CFR 0.148.
 */
package database;

import database.DatabaseException;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.Properties;
import server.ServerProperties;

public class DatabaseConnection {
    private static final ThreadLocal<Connection> con = new ThreadLocalConnection();
    public static final int CLOSE_CURRENT_RESULT = 1;
    public static final int KEEP_CURRENT_RESULT = 2;
    public static final int CLOSE_ALL_RESULTS = 3;
    public static final int SUCCESS_NO_INFO = -2;
    public static final int EXECUTE_FAILED = -3;
    public static final int RETURN_GENERATED_KEYS = 1;
    public static final int NO_GENERATED_KEYS = 2;

    public static final Connection getConnection() {
        return con.get();
    }

    public static final void closeAll() throws SQLException {
        for (Connection con : ThreadLocalConnection.allConnections) {
            con.close();
        }
    }

    private static final class ThreadLocalConnection
    extends ThreadLocal<Connection> {
        public static final Collection<Connection> allConnections = new LinkedList<Connection>();

        private ThreadLocalConnection() {
        }

        @Override
        protected final Connection initialValue() {
            try {
                Class.forName("com.mysql.jdbc.Driver");
            }
            catch (ClassNotFoundException e) {
                System.err.println("ERRORA\uff1a" + e);
            }
            try {
                Properties props = new Properties();
                props.put("user", ServerProperties.getProperty("KinMS.User"));
                props.put("password", ServerProperties.getProperty("KinMS.Pass"));
                props.put("autoReconnect", "true");
                Connection con = DriverManager.getConnection(ServerProperties.getProperty("KinMS.Url"), props);
                allConnections.add(con);
                return con;
            }
            catch (SQLException e) {
                System.out.println("JDBC\u8fde\u63a5\u9519\u8bef\u3002\u8bf7\u786e\u5b9a\u5e10\u53f7\u5bc6\u7801\u6b63\u786e\u3002");
                throw new DatabaseException(e);
            }
        }
    }

}

