/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.log4j.Logger
 */
package server;

import org.apache.log4j.Logger;

import database.DatabaseConnection;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.World;
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
            World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, " 游戏服务器将关闭维护，请玩家安全下线..."));
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                cs.setShutdown();
                cs.setServerMessage("游戏服务器将关闭维护，请玩家安全下线...");
                cs.closeAllMerchants();
            }
            World.Guild.save();
            World.Alliance.save();
            World.Family.save();
            System.out.println("服务端关闭事件 1 已完成.");
            ++this.mode;
        } else if (this.mode == 1) {
            ++this.mode;
            System.out.println("服务端关闭事件 2 开始...");
            try {
                World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, " 游戏服务器将关闭维护，请玩家安全下线..."));
                Integer[] arr$ = ChannelServer.getAllInstance().toArray(new Integer[0]);
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
                        log.error((Object)("关闭服务端错误 - 3" + e));
                    }
                }
                LoginServer.shutdown();
                CashShopServer.shutdown();
                DatabaseConnection.closeAll();
            }
            catch (Exception e) {
                log.error((Object)("关闭服务端错误 - 4" + e));
            }
            Timer.WorldTimer.getInstance().stop();
            Timer.MapTimer.getInstance().stop();
            Timer.BuffTimer.getInstance().stop();
            Timer.CloneTimer.getInstance().stop();
            Timer.EventTimer.getInstance().stop();
            Timer.EtcTimer.getInstance().stop();
            System.out.println("服务端关闭事件 2 已完成.");
            try {
                Thread.sleep(5000L);
            }
            catch (Exception e) {
                log.error((Object)("关闭服务端错误 - 2" + e));
            }
            System.exit(0);
        }
    }
}