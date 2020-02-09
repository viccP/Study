/*
 * Decompiled with CFR 0.148.
 */
package tools;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class FileoutputUtil {
    public static final String Acc_Stuck = "Logs/Log_AccountStuck.rtf";
    public static final String Login_Error = "Logs/Log_Login_Error.rtf";
    public static final String IP_Log = "Logs/Log_AccountIP.rtf";
    public static final String Zakum_Log = "Logs/Log_Zakum.rtf";
    public static final String Horntail_Log = "Logs/Log_Horntail.rtf";
    public static final String Pinkbean_Log = "Logs/Log_Pinkbean.rtf";
    public static final String ScriptEx_Log = "Logs/Log_Script_Except.rtf";
    public static final String ScriptEx_LogAAA = "Logs/ScriptEx_LogAAA.rtf";
    public static final String PacketEx_Log = "Logs/Log_Packet_Except.rtf";
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdf_ = new SimpleDateFormat("yyyy-MM-dd");

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Loose catch block
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     * Lifted jumps to return sites
     */
    public static void packetLog(String file, String msg) {
        FileOutputStream out = null;
        try {
        	out = new FileOutputStream(file, true);
        	out.write(msg.getBytes());
        	out.write("\r\n\r\n".getBytes());
            out.close();
            return;
        }
        catch (IOException ignore) {
            try {
                if (out == null) return;
                out.close();
                return;
            }
            catch (IOException ignore2) {
                return;
            }
            catch (Throwable throwable) {
                try {
                    if (out == null) throw throwable;
                    out.close();
                    throw throwable;
                }
                catch (IOException ignore3) {
                    // empty catch block
                }
                throw throwable;
            }
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Loose catch block
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     * Lifted jumps to return sites
     */
    public static void log(String file, String msg) {
        FileOutputStream out = null;
        try {
        	out = new FileOutputStream(file, true);
        	out.write(("\n------------------------ " + FileoutputUtil.CurrentReadable_Time() + " ------------------------\n").getBytes());
        	out.write(msg.getBytes());
            out.close();
            return;
        }
        catch (IOException ess) {
            try {
                if (out == null) return;
                out.close();
                return;
            }
            catch (IOException ignore) {
                return;
            }
            catch (Throwable throwable) {
                try {
                    if (out == null) throw throwable;
                    out.close();
                    throw throwable;
                }
                catch (IOException ignore) {
                    // empty catch block
                }
                throw throwable;
            }
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Loose catch block
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     * Lifted jumps to return sites
     */
    public static void outputFileError(String file, Throwable t) {
        FileOutputStream out = null;
        try {
        	out = new FileOutputStream(file, true);
        	out.write(("\n------------------------ " + FileoutputUtil.CurrentReadable_Time() + " ------------------------\n").getBytes());
        	out.write(FileoutputUtil.getString(t).getBytes());
            out.close();
            return;
        }
        catch (IOException ess) {
            try {
                if (out == null) return;
                out.close();
                return;
            }
            catch (IOException ignore) {
                return;
            }
            catch (Throwable throwable) {
                try {
                    if (out == null) throw throwable;
                    out.close();
                    throw throwable;
                }
                catch (IOException ignore) {
                    // empty catch block
                }
                throw throwable;
            }
        }
    }

    public static String CurrentReadable_Date() {
        return sdf_.format(Calendar.getInstance().getTime());
    }

    public static String CurrentReadable_Time() {
        return sdf.format(Calendar.getInstance().getTime());
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static String getString(Throwable e) {
        String retValue = null;
        StringWriter sw = null;
        PrintWriter pw = null;
        try {
            sw = new StringWriter();
            pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            retValue = sw.toString();
        }
        finally {
            try {
                if (pw != null) {
                    pw.close();
                }
                if (sw != null) {
                    sw.close();
                }
            }
            catch (IOException ignore) {}
        }
        return retValue;
    }
}

