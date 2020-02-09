/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 */
package server;

import client.MapleCharacter;
import client.MapleClient;
import handling.world.World;
import java.net.SocketAddress;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.locks.ReentrantLock;
import org.apache.mina.common.IoSession;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;

public class AutobanManager
implements Runnable {
    private Map<Integer, Integer> points = new HashMap<Integer, Integer>();
    private Map<Integer, List<String>> reasons = new HashMap<Integer, List<String>>();
    private Set<ExpirationEntry> expirations = new TreeSet<ExpirationEntry>();
    private static AutobanManager instance = new AutobanManager();
    private final ReentrantLock lock = new ReentrantLock(true);

    public static final AutobanManager getInstance() {
        return instance;
    }

    public final void autoban(MapleClient c, String reason) {
        if (c.getPlayer().isGM() || c.getPlayer().isClone()) {
            c.getPlayer().dropMessage(5, "[WARNING] A/b triggled : " + reason);
            return;
        }
        this.addPoints(c, 5000, 0L, reason);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void addPoints(MapleClient c, int points, long expiration, String reason) {
        this.lock.lock();
        try {
            List<String> reasonList;
            int acc = c.getPlayer().getAccountID();
            if (this.points.containsKey(acc)) {
                int SavedPoints = this.points.get(acc);
                if (SavedPoints >= 5000) {
                    return;
                }
                this.points.put(acc, SavedPoints + points);
                reasonList = this.reasons.get(acc);
                reasonList.add(reason);
            } else {
                this.points.put(acc, points);
                reasonList = new LinkedList<String>();
                reasonList.add(reason);
                this.reasons.put(acc, reasonList);
            }
            if (this.points.get(acc) >= 5000) {
                if (c.getPlayer().isGM() || c.getPlayer().isClone()) {
                    c.getPlayer().dropMessage(5, "[WARNING] A/b triggled : " + reason);
                    return;
                }
                StringBuilder sb = new StringBuilder("a/b ");
                sb.append(c.getPlayer().getName());
                sb.append(" (IP ");
                sb.append(c.getSession().getRemoteAddress().toString());
                sb.append("): ");
                for (String s : this.reasons.get(acc)) {
                    sb.append(s);
                    sb.append(", ");
                }
                World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, "'" + c.getPlayer().getName() + "'\u975e\u6cd5\u4f7f\u7528\u5916\u6302\u7a0b\u5e8f\u5df2\u7ecf\u8bb0\u5f55\u5728\u6848\uff01\u7a0d\u540e\u7b49GM\u5904\u7406\uff01").getBytes());
                String note = "\u65f6\u95f4\uff1a" + FileoutputUtil.CurrentReadable_Time() + " " + "|| \u73a9\u5bb6\u540d\u5b57\uff1a" + c.getPlayer().getName() + "" + "|| \u73a9\u5bb6\u5730\u56fe\uff1a" + c.getPlayer().getMapId() + "\r\n";
                FileoutputUtil.packetLog("log\\\u5916\u6302\u68c0\u6d4bA\\" + c.getPlayer().getName() + ".log", note);
                c.getPlayer().ban(sb.toString(), false, true, false);
                c.disconnect(true, false);
            } else if (expiration > 0L) {
                this.expirations.add(new ExpirationEntry(System.currentTimeMillis() + expiration, acc, points));
            }
        }
        finally {
            this.lock.unlock();
        }
    }

    @Override
    public final void run() {
        long now = System.currentTimeMillis();
        for (ExpirationEntry e : this.expirations) {
            if (e.time <= now) {
                this.points.put(e.acc, this.points.get(e.acc) - e.points);
                continue;
            }
            return;
        }
    }

    private static class ExpirationEntry
    implements Comparable<ExpirationEntry> {
        public long time;
        public int acc;
        public int points;

        public ExpirationEntry(long time, int acc, int points) {
            this.time = time;
            this.acc = acc;
            this.points = points;
        }

        @Override
        public int compareTo(ExpirationEntry o) {
            return (int)(this.time - o.time);
        }

        public boolean equals(Object oth) {
            if (!(oth instanceof ExpirationEntry)) {
                return false;
            }
            ExpirationEntry ee = (ExpirationEntry)oth;
            return this.time == ee.time && this.points == ee.points && this.acc == ee.acc;
        }
    }

}

