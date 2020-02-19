
package database;

import java.sql.Connection;
import java.sql.SQLException;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import server.ServerProperties;

public enum DatabaseConnection {

	INSTANCE;

	private HikariDataSource ds = null;

	private HikariDataSource getDatasource() {
		if (ds == null) {
			// 实例化类
			HikariConfig cfg = new HikariConfig();
			// 设置url
			cfg.setJdbcUrl(ServerProperties.getProperty("KinMS.Url"));
			// 数据库帐号
			cfg.setUsername(ServerProperties.getProperty("KinMS.User"));
			// 数据库密码
			cfg.setPassword(ServerProperties.getProperty("KinMS.Pass"));
			// 其他设置
			cfg.setConnectionTestQuery("select 1");
//			cfg.setIdleTimeout(600000);
//			cfg.setMaxLifetime(1800000);
			cfg.setMaximumPoolSize(100);
			cfg.setMinimumIdle(100);
			ds = new HikariDataSource(cfg);
		}
		return ds;
	}

	public static Connection getConnection() {
		try {
			return INSTANCE.getDatasource().getConnection();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static void closeAll() {
		INSTANCE.getDatasource().close();
	}
}