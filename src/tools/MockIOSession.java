/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoFilter
 *  org.apache.mina.common.IoFilter$WriteRequest
 *  org.apache.mina.common.IoFilterChain
 *  org.apache.mina.common.IoHandler
 *  org.apache.mina.common.IoService
 *  org.apache.mina.common.IoServiceConfig
 *  org.apache.mina.common.IoSessionConfig
 *  org.apache.mina.common.TransportType
 *  org.apache.mina.common.WriteFuture
 *  org.apache.mina.common.support.BaseIoSession
 */
package tools;

import java.net.SocketAddress;
import org.apache.mina.common.CloseFuture;
import org.apache.mina.common.IoFilter;
import org.apache.mina.common.IoFilterChain;
import org.apache.mina.common.IoHandler;
import org.apache.mina.common.IoService;
import org.apache.mina.common.IoServiceConfig;
import org.apache.mina.common.IoSessionConfig;
import org.apache.mina.common.TransportType;
import org.apache.mina.common.WriteFuture;
import org.apache.mina.common.support.BaseIoSession;

public class MockIOSession
extends BaseIoSession {
    protected void updateTrafficMask() {
    }

    public IoSessionConfig getConfig() {
        return null;
    }

    public IoFilterChain getFilterChain() {
        return null;
    }

    public IoHandler getHandler() {
        return null;
    }

    public SocketAddress getLocalAddress() {
        return null;
    }

    public SocketAddress getRemoteAddress() {
        return null;
    }

    public IoService getService() {
        return null;
    }

    public SocketAddress getServiceAddress() {
        return null;
    }

    public IoServiceConfig getServiceConfig() {
        return null;
    }

    public TransportType getTransportType() {
        return null;
    }

    public CloseFuture close() {
        return null;
    }

    protected void close0() {
    }

    public WriteFuture write(Object message, SocketAddress remoteAddress) {
        return null;
    }

    public WriteFuture write(Object message) {
        return null;
    }

    protected void write0(IoFilter.WriteRequest writeRequest) {
    }
}

