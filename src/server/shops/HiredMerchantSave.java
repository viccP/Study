/*
 * Decompiled with CFR 0.148.
 */
package server.shops;

import java.io.PrintStream;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;
import java.util.logging.Logger;
import server.shops.HiredMerchant;

public class HiredMerchantSave {
    public static final int NumSavingThreads = 5;
    private static final TimingThread[] Threads = new TimingThread[5];
    private static final AtomicInteger Distribute;

    public static void QueueShopForSave(HiredMerchant hm) {
        int Current = Distribute.getAndIncrement() % 5;
        HiredMerchantSave.Threads[Current].getRunnable().Queue(hm);
    }

    public static void Execute(Object ToNotify) {
        int i;
        for (i = 0; i < Threads.length; ++i) {
            HiredMerchantSave.Threads[i].getRunnable().SetToNotify(ToNotify);
        }
        for (i = 0; i < Threads.length; ++i) {
            Threads[i].start();
        }
    }

    static {
        for (int i = 0; i < Threads.length; ++i) {
            HiredMerchantSave.Threads[i] = new TimingThread(new HiredMerchantSaveRunnable());
        }
        Distribute = new AtomicInteger(0);
    }

    private static class HiredMerchantSaveRunnable
    implements Runnable {
        private static AtomicInteger RunningThreadID = new AtomicInteger(0);
        private int ThreadID = RunningThreadID.incrementAndGet();
        private long TimeTaken = 0L;
        private int ShopsSaved = 0;
        private Object ToNotify;
        private ArrayBlockingQueue<HiredMerchant> Queue = new ArrayBlockingQueue(500);

        private HiredMerchantSaveRunnable() {
        }

        /*
         * WARNING - Removed try catching itself - possible behaviour change.
         */
        @Override
        public void run() {
            try {
                Object next;
                while (!this.Queue.isEmpty()) {
                    next = this.Queue.take();
                    long Start2 = System.currentTimeMillis();
                    ((HiredMerchant)next).closeShop(true, false);
                    this.TimeTaken += System.currentTimeMillis() - Start2;
                    ++this.ShopsSaved;
                }
                System.out.println("[\u4fdd\u5b58\u96c7\u4f63\u5546\u5e97\u6570\u636e \u7ebf\u7a0b " + this.ThreadID + "] \u5171\u4fdd\u5b58: " + this.ShopsSaved + " | \u8017\u65f6: " + this.TimeTaken + " \u6beb\u79d2.");
                next = this.ToNotify;
                synchronized (next) {
                    this.ToNotify.notify();
                }
            }
            catch (InterruptedException ex) {
                Logger.getLogger(HiredMerchantSave.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        private void Queue(HiredMerchant hm) {
            this.Queue.add(hm);
        }

        private void SetToNotify(Object o) {
            if (this.ToNotify == null) {
                this.ToNotify = o;
            }
        }
    }

    private static class TimingThread
    extends Thread {
        private final HiredMerchantSaveRunnable ext;

        public TimingThread(HiredMerchantSaveRunnable r) {
            this.ext = r;
        }

        public HiredMerchantSaveRunnable getRunnable() {
            return this.ext;
        }
    }

}

