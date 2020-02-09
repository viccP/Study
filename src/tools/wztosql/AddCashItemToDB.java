/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  com.mysql.jdbc.PreparedStatement
 */
package tools.wztosql;

import com.mysql.jdbc.PreparedStatement;
import database.DatabaseConnection;
import java.sql.Connection;
import java.sql.SQLException;

public class AddCashItemToDB {
    public static void addItem(int id, int Count, int Price, int SN, int Expire, int Gender, int OnSale) throws Exception {
        try {
            Connection conn = DatabaseConnection.getConnection();
            try (PreparedStatement ps = (PreparedStatement)conn.prepareStatement("INSERT INTO `cashshop_items` VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)");){
                ps.setInt(1, id);
                ps.setInt(2, Count);
                ps.setInt(3, Price);
                ps.setInt(4, SN);
                ps.setInt(5, Expire);
                ps.setInt(6, Gender);
                ps.setInt(7, OnSale);
                ps.executeUpdate();
            }
        }
        catch (SQLException sqle) {
            sqle.printStackTrace();
        }
    }
}

