/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.ByteBuffer
 *  org.apache.mina.common.ByteBufferAllocator
 *  org.apache.mina.common.DefaultIoFilterChainBuilder
 *  org.apache.mina.common.IoAcceptor
 *  org.apache.mina.common.IoFilter
 *  org.apache.mina.common.IoHandler
 *  org.apache.mina.common.IoServiceConfig
 *  org.apache.mina.common.SimpleByteBufferAllocator
 *  org.apache.mina.filter.codec.ProtocolCodecFactory
 *  org.apache.mina.filter.codec.ProtocolCodecFilter
 *  org.apache.mina.transport.socket.nio.SocketAcceptor
 *  org.apache.mina.transport.socket.nio.SocketAcceptorConfig
 *  org.apache.mina.transport.socket.nio.SocketSessionConfig
 */
package handling.cashshop;

import handling.MapleServerHandler;
import handling.channel.PlayerStorage;
import handling.mina.MapleCodecFactory;
import java.io.PrintStream;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.ByteBufferAllocator;
import org.apache.mina.common.DefaultIoFilterChainBuilder;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.IoFilter;
import org.apache.mina.common.IoHandler;
import org.apache.mina.common.IoServiceConfig;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.filter.codec.ProtocolCodecFactory;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;
import org.apache.mina.transport.socket.nio.SocketSessionConfig;
import server.ServerProperties;

public class CashShopServer {
    private static String ip;
    private static InetSocketAddress InetSocketadd;
    private static final int PORT = 8596;
    private static IoAcceptor acceptor;
    private static PlayerStorage players;
    private static PlayerStorage playersMTS;
    private static boolean finishedShutdown;

    public static final void run_startup_configurations() {
        ip = ServerProperties.getProperty("KinMS.IP") + ":" + 8596;
        ByteBuffer.setUseDirectBuffers((boolean)false);
        ByteBuffer.setAllocator((ByteBufferAllocator)new SimpleByteBufferAllocator());
        acceptor = new SocketAcceptor();
        SocketAcceptorConfig cfg = new SocketAcceptorConfig();
        cfg.getSessionConfig().setTcpNoDelay(true);
        cfg.setDisconnectOnUnbind(true);
        cfg.getFilterChain().addLast("codec", (IoFilter)new ProtocolCodecFilter((ProtocolCodecFactory)new MapleCodecFactory()));
        players = new PlayerStorage(-10);
        playersMTS = new PlayerStorage(-20);
        try {
            InetSocketadd = new InetSocketAddress(8596);
            acceptor.bind((SocketAddress)InetSocketadd, (IoHandler)new MapleServerHandler(-1, true), (IoServiceConfig)cfg);
            System.out.println("\u5546\u57ce    1: \u542f\u52a8\u7aef\u53e3 8596");
        }
        catch (Exception e) {
            System.err.println("Binding to port 8596 failed");
            e.printStackTrace();
            throw new RuntimeException("Binding failed.", e);
        }
    }

    public static final String getIP() {
        return ip;
    }

    public static final PlayerStorage getPlayerStorage() {
        return players;
    }

    public static final PlayerStorage getPlayerStorageMTS() {
        return playersMTS;
    }

    public static final void shutdown() {
        if (finishedShutdown) {
            return;
        }
        System.out.println("Saving all connected clients (CS)...");
        players.disconnectAll();
        playersMTS.disconnectAll();
        System.out.println("Shutting down CS...");
        acceptor.unbindAll();
        finishedShutdown = true;
    }

    public static boolean isShutdown() {
        return finishedShutdown;
    }

    static {
        finishedShutdown = false;
    }
}

