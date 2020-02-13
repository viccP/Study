/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  com.mysql.jdbc.PreparedStatement
 */
package tools.wztosql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import database.DatabaseConnection;

public class AddCashItemToDB {
	public static void addItem(int id, int Count, int Price, int SN, int Expire, int Gender, int OnSale) throws Exception {
		try {
			Connection conn = DatabaseConnection.getConnection();
			PreparedStatement ps = conn.prepareStatement("INSERT INTO `cashshop_items` VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)");
			ps.setInt(1, id);
			ps.setInt(2, Count);
			ps.setInt(3, Price);
			ps.setInt(4, SN);
			ps.setInt(5, Expire);
			ps.setInt(6, Gender);
			ps.setInt(7, OnSale);
			ps.executeUpdate();
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
	}
}
