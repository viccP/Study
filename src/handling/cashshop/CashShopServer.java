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

import java.net.InetSocketAddress;

import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;

import handling.MapleServerHandler;
import handling.channel.PlayerStorage;
import handling.mina.MapleCodecFactory;

public class CashShopServer {
    private static final int PORT = 8596;
    private static IoAcceptor acceptor;
    private static PlayerStorage players;
    private static PlayerStorage playersMTS;
    private static boolean finishedShutdown=false;

    public static final void run_startup_configurations() {
        ByteBuffer.setUseDirectBuffers(false);
        ByteBuffer.setAllocator(new SimpleByteBufferAllocator());
        acceptor = new SocketAcceptor();
        SocketAcceptorConfig cfg = new SocketAcceptorConfig();
        cfg.getSessionConfig().setTcpNoDelay(true);
        cfg.setDisconnectOnUnbind(true);
        cfg.getFilterChain().addLast("codec", new ProtocolCodecFilter(new MapleCodecFactory()));
        players = new PlayerStorage(-10);
        playersMTS = new PlayerStorage(-20);
        try {
            InetSocketAddress InetSocketadd = new InetSocketAddress(PORT);
            acceptor.bind(InetSocketadd,new MapleServerHandler(-1, true), cfg);
            System.out.println("商城    1: 启动端口 8596");
        }
        catch (Exception e) {
            System.err.println("Binding to port "+PORT+" failed");
            e.printStackTrace();
            throw new RuntimeException("Binding failed.", e);
        }
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

	public static int getPort() {
		return PORT;
	}
}