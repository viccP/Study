/*
 * Decompiled with CFR 0.148.
 */
package client;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;
import tools.HexTool;

public class LoginCrypto {
    protected static final int extralength = 6;
    private static final String[] Alphabet = new String[]{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};
    private static final String[] Number = new String[]{"1", "2", "3", "4", "5", "6", "7", "8", "9"};
    private static final Random rand = new Random();

    public static String Generate_13DigitAsiasoftPassport() {
        StringBuilder sb = new StringBuilder();
        sb.append(Alphabet[rand.nextInt(Alphabet.length)]);
        for (int i = 0; i < 11; ++i) {
            sb.append(Number[rand.nextInt(Number.length)]);
        }
        sb.append(Alphabet[rand.nextInt(Alphabet.length)]);
        return sb.toString();
    }

    private static String toSimpleHexString(byte[] bytes) {
        return HexTool.toString(bytes).replace(" ", "").toLowerCase();
    }

    private static String hashWithDigest(String in, String digest) {
        try {
            MessageDigest Digester = MessageDigest.getInstance(digest);
            Digester.update(in.getBytes("UTF-8"), 0, in.length());
            byte[] sha1Hash = Digester.digest();
            return LoginCrypto.toSimpleHexString(sha1Hash);
        }
        catch (NoSuchAlgorithmException ex) {
            throw new RuntimeException("Hashing the password failed", ex);
        }
        catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Encoding the string failed", e);
        }
    }

    public static String hexSha1(String in) {
        return LoginCrypto.hashWithDigest(in, "SHA-1");
    }

    private static String hexSha512(String in) {
        return LoginCrypto.hashWithDigest(in, "SHA-512");
    }

    public static boolean checkSha1Hash(String hash, String password) {
        return hash.equals(LoginCrypto.makeSaltedSha1Hash(password));
    }

    public static boolean checkSaltedSha512Hash(String hash, String password, String salt) {
        return hash.equals(LoginCrypto.makeSaltedSha512Hash(password, salt));
    }

    public static String makeSaltedSha512Hash(String password, String salt) {
        return LoginCrypto.hexSha512(password + salt);
    }

    public static String makeSaltedSha1Hash(String password) {
        return LoginCrypto.hexSha1(password);
    }

    public static String makeSalt() {
        byte[] salt = new byte[16];
        rand.nextBytes(salt);
        return LoginCrypto.toSimpleHexString(salt);
    }

    public static String rand_s(String in) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; ++i) {
            sb.append(rand.nextBoolean() ? Alphabet[rand.nextInt(Alphabet.length)] : Number[rand.nextInt(Number.length)]);
        }
        return sb.toString() + in;
    }

    public static String rand_r(String in) {
        return in.substring(6, 134);
    }
}

