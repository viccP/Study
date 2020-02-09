/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.log4j.Logger
 */
package server;

import database.DatabaseConnection;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.World;
import java.io.PrintStream;
import java.sql.SQLException;
import org.apache.log4j.Logger;
import server.Timer;
import tools.MaplePacketCreator;

public class ShutdownServer
implements Runnable {
    private static final ShutdownServer instance = new ShutdownServer();
    public static boolean running = false;
    private static final Logger log = Logger.getLogger(ShutdownServer.class);
    public int mode = 0;

    public static ShutdownServer getInstance() {
        return instance;
    }

    public void shutdown() {
        this.run();
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public void run() {
        if (this.mode == 0) {
            World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, " \u6e38\u620f\u670d\u52a1\u5668\u5c06\u5173\u95ed\u7ef4\u62a4\uff0c\u8bf7\u73a9\u5bb6\u5b89\u5168\u4e0b\u7ebf..."));
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                cs.setShutdown();
                cs.setServerMessage("\u6e38\u620f\u670d\u52a1\u5668\u5c06\u5173\u95ed\u7ef4\u62a4\uff0c\u8bf7\u73a9\u5bb6\u5b89\u5168\u4e0b\u7ebf...");
                cs.closeAllMerchants();
            }
            World.Guild.save();
            World.Alliance.save();
            World.Family.save();
            System.out.println("\u670d\u52a1\u7aef\u5173\u95ed\u4e8b\u4ef6 1 \u5df2\u5b8c\u6210.");
            ++this.mode;
        } else if (this.mode == 1) {
            ++this.mode;
            System.out.println("\u670d\u52a1\u7aef\u5173\u95ed\u4e8b\u4ef6 2 \u5f00\u59cb...");
            try {
                Integer[] chs;
                World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, " \u6e38\u620f\u670d\u52a1\u5668\u5c06\u5173\u95ed\u7ef4\u62a4\uff0c\u8bf7\u73a9\u5bb6\u5b89\u5168\u4e0b\u7ebf..."));
                Integer[] arr$ = chs = ChannelServer.getAllInstance().toArray(new Integer[0]);
                int len$ = arr$.length;
                for (int i$ = 0; i$ < len$; ++i$) {
                    int i = arr$[i$];
                    try {
                        ChannelServer cs = ChannelServer.getInstance(i);
                        ShutdownServer shutdownServer = this;
                        synchronized (shutdownServer) {
                            cs.shutdown();
                            continue;
                        }
                    }
                    catch (Exception e) {
                        log.error((Object)("\u5173\u95ed\u670d\u52a1\u7aef\u9519\u8bef - 3" + e));
                    }
                }
                LoginServer.shutdown();
                CashShopServer.shutdown();
                DatabaseConnection.closeAll();
            }
            catch (SQLException e) {
                log.error((Object)("\u5173\u95ed\u670d\u52a1\u7aef\u9519\u8bef - 4" + e));
            }
            Timer.WorldTimer.getInstance().stop();
            Timer.MapTimer.getInstance().stop();
            Timer.BuffTimer.getInstance().stop();
            Timer.CloneTimer.getInstance().stop();
            Timer.EventTimer.getInstance().stop();
            Timer.EtcTimer.getInstance().stop();
            System.out.println("\u670d\u52a1\u7aef\u5173\u95ed\u4e8b\u4ef6 2 \u5df2\u5b8c\u6210.");
            try {
                Thread.sleep(5000L);
            }
            catch (Exception e) {
                log.error((Object)("\u5173\u95ed\u670d\u52a1\u7aef\u9519\u8bef - 2" + e));
            }
            System.exit(0);
        }
    }
}

