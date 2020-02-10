/*
 * Decompiled with CFR 0.148.
 */
package tools;

import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;

public class HexTool {
    private static final char[] HEX = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

    public static final String toString(byte byteValue) {
        int tmp = byteValue << 8;
        char[] retstr = new char[]{HEX[tmp >> 12 & 0xF], HEX[tmp >> 8 & 0xF]};
        return String.valueOf(retstr);
    }

    public static final String toString(ByteBuffer buf) {
        buf.flip();
        byte[] arr = new byte[buf.remaining()];
        buf.get(arr);
        String ret = HexTool.toString(arr);
        buf.flip();
        buf.put(arr);
        return ret;
    }

    public static final String toString(int intValue) {
        return Integer.toHexString(intValue);
    }

    public static final String toString(byte[] bytes) {
        StringBuilder hexed = new StringBuilder();
        for (int i = 0; i < bytes.length; ++i) {
            hexed.append(HexTool.toString(bytes[i]));
            hexed.append(' ');
        }
        return hexed.substring(0, hexed.length() - 1);
    }

    public static final String toStringFromAscii(byte[] bytes) {
        byte[] ret = new byte[bytes.length];
        for (int x = 0; x < bytes.length; ++x) {
            if (bytes[x] < 32 && bytes[x] >= 0) {
                ret[x] = 46;
                continue;
            }
            int chr = (short)bytes[x] & 0xFF;
            ret[x] = (byte)chr;
        }
        String encode = "utf-8";
        try {
            String str = new String(ret, encode);
            return str;
        }
        catch (Exception e) {
            return "";
        }
    }

    public static final String toPaddedStringFromAscii(byte[] bytes) {
        String str = HexTool.toStringFromAscii(bytes);
        StringBuilder ret = new StringBuilder(str.length() * 3);
        for (int i = 0; i < str.length(); ++i) {
            ret.append(str.charAt(i));
            ret.append("  ");
        }
        return ret.toString();
    }

    /**
     * Turns an hexadecimal string into a byte array.
     *
     * @param hex The string to convert.
     * @return The byte array representation of <code>hex</code>
     */
    public static byte[] getByteArrayFromHexString(final String hex) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        int nexti = 0;
        int nextb = 0;
        boolean highoc = true;
        outer:
        for (;;) {
            int number = -1;
            while (number == -1) {
                if (nexti == hex.length()) {
                    break outer;
                }
                char chr = hex.charAt(nexti);
                if (chr >= '0' && chr <= '9') {
                    number = chr - '0';
                } else if (chr >= 'a' && chr <= 'f') {
                    number = chr - 'a' + 10;
                } else if (chr >= 'A' && chr <= 'F') {
                    number = chr - 'A' + 10;
                } else {
                    number = -1;
                }
                nexti++;
            }
            if (highoc) {
                nextb = number << 4;
                highoc = false;
            } else {
                nextb |= number;
                highoc = true;
                baos.write(nextb);
            }
        }
        return baos.toByteArray();
    }

    public static final String getOpcodeToString(int op) {
        return "0x" + StringUtil.getLeftPaddedStr(Integer.toHexString(op).toUpperCase(), '0', 4);
    }
}

