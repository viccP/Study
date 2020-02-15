/*
 * Decompiled with CFR 0.148.
 */
package constants;

import server.ServerProperties;

public class ServerConstants {
    public static final boolean PollEnabled = false;
    public static final String Poll_Question = "Are you mudkiz?";
    public static final String[] Poll_Answers = new String[]{"test1", "test2", "test3"};
    public static final short MAPLE_VERSION = 79;
    public static final String MAPLE_PATCH = "1";
    public static final boolean Use_Fixed_IV = false;
    public static final int MIN_MTS = 110;
    public static final int MTS_BASE = 100;
    public static final int MTS_TAX = 10;
    public static final int MTS_MESO = 5000;
    public static final int CHANNEL_COUNT = 200;
    public static String PACKET_ERROR = "";
    public static int Channel = 0;
    public static int removePlayerFromMap = 0;
    public static int getHello = 0;
    public static String LOG_FILE=ServerProperties.getProperty("KinMS.logFile","/maple/logs/");
    public static final boolean PACKET_ERROR_OFF = Boolean.parseBoolean(ServerProperties.getProperty("KinMS.PACKET_ERROR_OFF", "false"));
    public static final boolean PACKET_DEBUG = Boolean.parseBoolean(ServerProperties.getProperty("KinMS.PACKET_DEBUG", "false"));
    public static final String CashShop_Key = "a;!ßb_=*-a123d9{P~";
    public static final String Login_Key = "pWv]xq:SPTCtk^LGnU9F";
    public static final String[] Channel_Key = new String[]{"a56=-_dcSAgb", "y5(9=8@nV$;G", "yS5j943GzdUm", "G]R8Frg;kx6Y", "Z)?7fh*([N6S", "p4H8=*sknaEK", "A!Z7:mS.2?Kq", "M5:!rfv[?mdF", "Ee@3-7u5s6xy", "p]6L3eS(R;8A", "gZ,^k9.npy#F", "cG3M,*7%@zgt", "t+#@TV^3)hL9", "mw4:?sAU7[!6", "b6L]HF(2S,aE", "H@rAq]#^Y3+J", "o2A%wKCuqc7Txk5?#rNZ", "d4.Np*B89C6+]y2M^z-7", "oTL2jy9^zkH.84u(%b[d", "WCSJZj3tGX,[4hu;9s?g"};

    public void setPACKET_ERROR(String ERROR) {
        PACKET_ERROR = ERROR;
    }

    public String getPACKET_ERROR() {
        return PACKET_ERROR;
    }

    public void setChannel(int ERROR) {
        Channel = ERROR;
    }

    public int getChannel() {
        return Channel;
    }

    public void setRemovePlayerFromMap(int ERROR) {
        removePlayerFromMap = ERROR;
    }

    public int getRemovePlayerFromMap() {
        return removePlayerFromMap;
    }

    public void setHello(int ERROR) {
        getHello = ERROR;
    }

    public int getHello() {
        return getHello;
    }

    public static final byte Class_Bonus_EXP(int job) {
        switch (job) {
            case 3000: 
            case 3200: 
            case 3210: 
            case 3211: 
            case 3212: 
            case 3300: 
            case 3310: 
            case 3311: 
            case 3312: 
            case 3500: 
            case 3510: 
            case 3511: 
            case 3512: {
                return 10;
            }
        }
        return 0;
    }

    public static enum CommandType {
        NORMAL(0),
        TRADE(1);

        private int level;

        private CommandType(int level) {
            this.level = level;
        }

        public int getType() {
            return this.level;
        }
    }

    public static enum PlayerGMRank {
        NORMAL('@', 0),
        INTERN('!', 1),
        GM('!', 2),
        ADMIN('!', 3);

        private char commandPrefix;
        private int level;

        private PlayerGMRank(char ch, int level) {
            this.commandPrefix = ch;
            this.level = level;
        }

        public char getCommandPrefix() {
            return this.commandPrefix;
        }

        public int getLevel() {
            return this.level;
        }
    }

}