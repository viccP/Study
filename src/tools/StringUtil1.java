/*
 * Decompiled with CFR 0.148.
 */
package tools;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;

public class StringUtil1 {
    public static String getLeftPaddedStr(String in, char padchar, int length) {
        StringBuilder builder = new StringBuilder(length);
        for (int x = in.getBytes().length; x < length; ++x) {
            builder.append(padchar);
        }
        builder.append(in);
        return builder.toString();
    }

    public static String getRightPaddedStr(String in, char padchar, int length) {
        StringBuilder builder = new StringBuilder(in);
        for (int x = in.getBytes().length; x < length; ++x) {
            builder.append(padchar);
        }
        return builder.toString();
    }

    public static String joinStringFrom(String[] arr, int start) {
        return StringUtil1.joinStringFrom(arr, start, " ");
    }

    public static String joinStringFrom(String[] arr, int start, String sep) {
        StringBuilder builder = new StringBuilder();
        for (int i = start; i < arr.length; ++i) {
            builder.append(arr[i]);
            if (i == arr.length - 1) continue;
            builder.append(sep);
        }
        return builder.toString();
    }

    public static String makeEnumHumanReadable(String enumName) {
        String[] words;
        StringBuilder builder = new StringBuilder(enumName.length() + 1);
        for (String word : words = enumName.split("_")) {
            if (word.length() <= 2) {
                builder.append(word);
            } else {
                builder.append(word.charAt(0));
                builder.append(word.substring(1).toLowerCase());
            }
            builder.append(' ');
        }
        return builder.substring(0, enumName.length());
    }

    public static int countCharacters(String str, char chr) {
        int ret = 0;
        for (int i = 0; i < str.length(); ++i) {
            if (str.charAt(i) != chr) continue;
            ++ret;
        }
        return ret;
    }

    public static String getStackTrace(Throwable t) {
        StringWriter sw = new StringWriter();
        PrintWriter ps = new PrintWriter(sw);
        t.printStackTrace(ps);
        return sw.toString();
    }
}

