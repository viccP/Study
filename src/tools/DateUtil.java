/*
 * Decompiled with CFR 0.148.
 */
package tools;

import java.util.Date;
import java.util.SimpleTimeZone;

public class DateUtil {
    private static final long FT_UT_OFFSET = 116444520000000000L;

    public static boolean isDST() {
        return SimpleTimeZone.getDefault().inDaylightTime(new Date());
    }

    public static long getFileTimestamp(long timeStampinMillis) {
        return DateUtil.getFileTimestamp(timeStampinMillis, false);
    }

    public static long getFileTimestamp(long timeStampinMillis, boolean roundToMinutes) {
        if (DateUtil.isDST()) {
            timeStampinMillis -= 3600000L;
        }
        long time = roundToMinutes ? timeStampinMillis / 1000L / 60L * 600000000L : (timeStampinMillis += 50400000L) * 10000L;
        return time + 116444520000000000L;
    }
}

