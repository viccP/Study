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
package handling.login;

import handling.MapleServerHandler;
import handling.mina.MapleCodecFactory;
import java.io.IOException;
import java.io.PrintStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
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
import tools.Triple;

public class LoginServer {
    public static int PORT = 8484;
    private static String ip;
    private static InetSocketAddress InetSocketadd;
    private static IoAcceptor acceptor;
    private static Map<Integer, Integer> load;
    private static String serverName;
    private static String eventMessage;
    private static byte flag;
    private static int maxCharacters;
    private static int userLimit;
    private static int usersOn;
    private static boolean finishedShutdown;
    private static boolean adminOnly;
    private static final HashMap<Integer, Triple<String, String, Integer>> loginAuth;
    private static final HashSet<String> loginIPAuth;
    private static LoginServer instance;

    public static LoginServer getInstance() {
        return instance;
    }

    public static void putLoginAuth(int chrid, String ip, String tempIp, int channel) {
        loginAuth.put(chrid, new Triple<String, String, Integer>(ip, tempIp, channel));
        loginIPAuth.add(ip);
    }

    public static Triple<String, String, Integer> getLoginAuth(int chrid) {
        return loginAuth.remove(chrid);
    }

    public static boolean containsIPAuth(String ip) {
        return loginIPAuth.contains(ip);
    }

    public static void removeIPAuth(String ip) {
        loginIPAuth.remove(ip);
    }

    public static void addIPAuth(String ip) {
        loginIPAuth.add(ip);
    }

    public static final void addChannel(int channel) {
        load.put(channel, 0);
    }

    public static final void removeChannel(int channel) {
        load.remove(channel);
    }

    public static final void run_startup_configurations() {
        userLimit = Integer.parseInt(ServerProperties.getProperty("KinMS.UserLimit"));
        serverName = ServerProperties.getProperty("KinMS.ServerName");
        eventMessage = ServerProperties.getProperty("KinMS.EventMessage");
        flag = Byte.parseByte(ServerProperties.getProperty("KinMS.Flag"));
        PORT = Integer.parseInt(ServerProperties.getProperty("KinMS.LPort"));
        adminOnly = Boolean.parseBoolean(ServerProperties.getProperty("KinMS.Admin", "false"));
        maxCharacters = Integer.parseInt(ServerProperties.getProperty("KinMS.MaxCharacters"));
        ByteBuffer.setUseDirectBuffers((boolean)false);
        ByteBuffer.setAllocator((ByteBufferAllocator)new SimpleByteBufferAllocator());
        acceptor = new SocketAcceptor();
        SocketAcceptorConfig cfg = new SocketAcceptorConfig();
        cfg.getSessionConfig().setTcpNoDelay(true);
        cfg.setDisconnectOnUnbind(true);
        cfg.getFilterChain().addLast("codec", (IoFilter)new ProtocolCodecFilter((ProtocolCodecFactory)new MapleCodecFactory()));
        try {
            InetAddress a = InetAddress.getLocalHost();
            InetSocketadd = new InetSocketAddress(PORT);
            acceptor.bind((SocketAddress)InetSocketadd, (IoHandler)new MapleServerHandler(-1, false), (IoServiceConfig)cfg);
            System.out.println("\u670d\u52a1\u5668   \u84dd\u8717\u725b: \u542f\u52a8\u7aef\u53e3 " + PORT);
        }
        catch (IOException e) {
            System.err.println("Binding to port " + PORT + " failed" + e);
        }
    }

    public static final void shutdown() {
        if (finishedShutdown) {
            return;
        }
        System.out.println("Shutting down login...");
        acceptor.unbindAll();
        finishedShutdown = true;
    }

    public static final String getServerName() {
        return serverName;
    }

    public static final String getEventMessage() {
        return eventMessage;
    }

    public static final byte getFlag() {
        return flag;
    }

    public static final int getMaxCharacters() {
        return maxCharacters;
    }

    public static final Map<Integer, Integer> getLoad() {
        return load;
    }

    public static void setLoad(Map<Integer, Integer> load_, int usersOn_) {
        load = load_;
        usersOn = usersOn_;
    }

    public static final void setEventMessage(String newMessage) {
        eventMessage = newMessage;
    }

    public static final void setFlag(byte newflag) {
        flag = newflag;
    }

    public static final int getUserLimit() {
        return userLimit;
    }

    public static final int getUsersOn() {
        return usersOn;
    }

    public static final void setUserLimit(int newLimit) {
        userLimit = newLimit;
    }

    public static final int getNumberOfSessions() {
        return acceptor.getManagedSessions((SocketAddress)InetSocketadd).size();
    }

    public static final boolean isAdminOnly() {
        return adminOnly;
    }

    public static final boolean isShutdown() {
        return finishedShutdown;
    }

    public static final void setOn() {
        finishedShutdown = false;
    }

    static {
        load = new HashMap<Integer, Integer>();
        usersOn = 0;
        finishedShutdown = true;
        adminOnly = false;
        loginAuth = new HashMap();
        loginIPAuth = new HashSet();
        instance = new LoginServer();
    }
}

