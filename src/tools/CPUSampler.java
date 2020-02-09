/*
 * Decompiled with CFR 0.148.
 */
package tools;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class CPUSampler {
    private List<String> included = new LinkedList<String>();
    private static CPUSampler instance = new CPUSampler();
    private long interval = 5L;
    private SamplerThread sampler = null;
    private Map<StackTrace, Integer> recorded = new HashMap<StackTrace, Integer>();
    private int totalSamples = 0;

    public static CPUSampler getInstance() {
        return instance;
    }

    public void setInterval(long millis) {
        this.interval = millis;
    }

    public void addIncluded(String include) {
        for (String alreadyIncluded : this.included) {
            if (!include.startsWith(alreadyIncluded)) continue;
            return;
        }
        this.included.add(include);
    }

    public void reset() {
        this.recorded.clear();
        this.totalSamples = 0;
    }

    public void start() {
        if (this.sampler == null) {
            this.sampler = new SamplerThread();
            this.sampler.start();
        }
    }

    public void stop() {
        if (this.sampler != null) {
            this.sampler.stop();
            this.sampler = null;
        }
    }

    public SampledStacktraces getTopConsumers() {
        ArrayList<StacktraceWithCount> ret = new ArrayList<StacktraceWithCount>();
        Set<Map.Entry<StackTrace, Integer>> entrySet = this.recorded.entrySet();
        for (Map.Entry<StackTrace, Integer> entry : entrySet) {
            ret.add(new StacktraceWithCount(entry.getValue(), entry.getKey()));
        }
        Collections.sort(ret);
        return new SampledStacktraces(ret, this.totalSamples);
    }

    public void save(Writer writer, int minInvocations, int topMethods) throws IOException {
        SampledStacktraces topConsumers = this.getTopConsumers();
        StringBuilder builder = new StringBuilder();
        builder.append("Top Methods:\n");
        for (int i = 0; i < topMethods && i < topConsumers.getTopConsumers().size(); ++i) {
            builder.append(topConsumers.getTopConsumers().get(i).toString(topConsumers.getTotalInvocations(), 1));
        }
        builder.append("\nStack Traces:\n");
        writer.write(builder.toString());
        writer.write(topConsumers.toString(minInvocations));
        writer.flush();
    }

    private void consumeStackTraces(Map<Thread, StackTraceElement[]> traces) {
        for (Map.Entry<Thread, StackTraceElement[]> trace : traces.entrySet()) {
            int relevant = this.findRelevantElement(trace.getValue());
            if (relevant == -1) continue;
            StackTrace st = new StackTrace(trace.getValue(), relevant, trace.getKey().getState());
            Integer i = this.recorded.get(st);
            ++this.totalSamples;
            if (i == null) {
                this.recorded.put(st, 1);
                continue;
            }
            this.recorded.put(st, i + 1);
        }
    }

    private int findRelevantElement(StackTraceElement[] trace) {
        if (trace.length == 0) {
            return -1;
        }
        if (this.included.size() == 0) {
            return 0;
        }
        int firstIncluded = -1;
        block0: for (String myIncluded : this.included) {
            for (int i = 0; i < trace.length; ++i) {
                StackTraceElement ste = trace[i];
                if (!ste.getClassName().startsWith(myIncluded) || i >= firstIncluded && firstIncluded != -1) continue;
                firstIncluded = i;
                continue block0;
            }
        }
        if (firstIncluded >= 0 && trace[firstIncluded].getClassName().equals("net.sf.odinms.tools.performance.CPUSampler$SamplerThread")) {
            return -1;
        }
        return firstIncluded;
    }

    public static class SampledStacktraces {
        List<StacktraceWithCount> topConsumers;
        int totalInvocations;

        public SampledStacktraces(List<StacktraceWithCount> topConsumers, int totalInvocations) {
            this.topConsumers = topConsumers;
            this.totalInvocations = totalInvocations;
        }

        public List<StacktraceWithCount> getTopConsumers() {
            return this.topConsumers;
        }

        public int getTotalInvocations() {
            return this.totalInvocations;
        }

        public String toString() {
            return this.toString(0);
        }

        public String toString(int minInvocation) {
            StringBuilder ret = new StringBuilder();
            for (StacktraceWithCount swc : this.topConsumers) {
                if (swc.getCount() < minInvocation) continue;
                ret.append(swc.toString(this.totalInvocations, Integer.MAX_VALUE));
                ret.append("\n");
            }
            return ret.toString();
        }
    }

    public static class StacktraceWithCount
    implements Comparable<StacktraceWithCount> {
        private int count;
        private StackTrace trace;

        public StacktraceWithCount(int count, StackTrace trace) {
            this.count = count;
            this.trace = trace;
        }

        public int getCount() {
            return this.count;
        }

        public StackTraceElement[] getTrace() {
            return this.trace.getTrace();
        }

        @Override
        public int compareTo(StacktraceWithCount o) {
            return -Integer.valueOf(this.count).compareTo(o.count);
        }

        public boolean equals(Object oth) {
            if (!(oth instanceof StacktraceWithCount)) {
                return false;
            }
            StacktraceWithCount o = (StacktraceWithCount)oth;
            return this.count == o.count;
        }

        public String toString() {
            return this.count + " Sampled Invocations\n" + this.trace.toString();
        }

        private double getPercentage(int total) {
            return (double)Math.round((double)this.count / (double)total * 10000.0) / 100.0;
        }

        public String toString(int totalInvoations, int traceLength) {
            return this.count + "/" + totalInvoations + " Sampled Invocations (" + this.getPercentage(totalInvoations) + "%) " + this.trace.toString(traceLength);
        }
    }

    private class SamplerThread
    implements Runnable {
        private boolean running = false;
        private boolean shouldRun = false;
        private Thread rthread;

        private SamplerThread() {
        }

        public void start() {
            if (!this.running) {
                this.shouldRun = true;
                this.rthread = new Thread((Runnable)this, "CPU Sampling Thread");
                this.rthread.start();
                this.running = true;
            }
        }

        public void stop() {
            this.shouldRun = false;
            this.rthread.interrupt();
            try {
                this.rthread.join();
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        @Override
        public void run() {
            while (this.shouldRun) {
                CPUSampler.this.consumeStackTraces(Thread.getAllStackTraces());
                try {
                    Thread.sleep(CPUSampler.this.interval);
                }
                catch (InterruptedException e) {
                    return;
                }
            }
        }
    }

    private static class StackTrace {
        private StackTraceElement[] trace;
        private Thread.State state;

        public StackTrace(StackTraceElement[] trace, int startAt, Thread.State state) {
            this.state = state;
            if (startAt == 0) {
                this.trace = trace;
            } else {
                this.trace = new StackTraceElement[trace.length - startAt];
                System.arraycopy(trace, startAt, this.trace, 0, this.trace.length);
            }
        }

        public boolean equals(Object obj) {
            if (!(obj instanceof StackTrace)) {
                return false;
            }
            StackTrace other = (StackTrace)obj;
            if (other.trace.length != this.trace.length) {
                return false;
            }
            if (other.state != this.state) {
                return false;
            }
            for (int i = 0; i < this.trace.length; ++i) {
                if (this.trace[i].equals(other.trace[i])) continue;
                return false;
            }
            return true;
        }

        public int hashCode() {
            int ret = 13 * this.trace.length + this.state.hashCode();
            for (StackTraceElement ste : this.trace) {
                ret ^= ste.hashCode();
            }
            return ret;
        }

        public StackTraceElement[] getTrace() {
            return this.trace;
        }

        public String toString() {
            return this.toString(-1);
        }

        public String toString(int traceLength) {
            StringBuilder ret = new StringBuilder("State: ");
            ret.append(this.state.name());
            if (traceLength > 1) {
                ret.append("\n");
            } else {
                ret.append(" ");
            }
            int i = 0;
            for (StackTraceElement ste : this.trace) {
                if (++i > traceLength) break;
                ret.append(ste.getClassName());
                ret.append("#");
                ret.append(ste.getMethodName());
                ret.append(" (Line: ");
                ret.append(ste.getLineNumber());
                ret.append(")\n");
            }
            return ret.toString();
        }
    }

}

