/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import handling.channel.handler.Beans;
import java.io.PrintStream;
import java.util.ArrayList;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.Randomizer;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class BeanGame {
    public static int \u8fdb\u6d1e\u6b21\u6570 = 0;
    public static int a = 0;
    public static int b = 0;
    public static int d = 0;
    public static int s = 0;
    public static int as = 0;
    public static int bs = 0;
    public static int ds = 0;

    public static final void BeanGame1(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter chr = c.getPlayer();
        ArrayList<Beans> beansInfo = new ArrayList<Beans>();
        byte type = slea.readByte();
        short \u529b\u5ea6 = 0;
        int \u8c46\u8c46\u5e8f\u53f7 = 0;
        if (type == 0) {
            \u529b\u5ea6 = slea.readShort();
            slea.readInt();
            chr.setBeansRange(\u529b\u5ea6);
            c.getSession().write((Object)MaplePacketCreator.enableActions());
        } else if (type == 1) {
            \u529b\u5ea6 = slea.readShort();
            slea.readInt();
            chr.setBeansRange(\u529b\u5ea6);
            c.getSession().write((Object)MaplePacketCreator.enableActions());
        } else if (type == 2) {
            slea.readInt();
        } else if (type == 3) {
            BeanGame.seta(slea.readInt());
            BeanGame.setb(slea.readInt());
            BeanGame.setd(slea.readInt());
            boolean aa = BeanGame.getb() - BeanGame.geta() == 3;
            int sss = Randomizer.nextInt(9);
            if (aa) {
                BeanGame.setas(sss);
                BeanGame.setbs(sss);
            } else if (BeanGame.geta() == 9) {
                BeanGame.setas(sss);
                BeanGame.setbs(sss - 1);
            } else {
                BeanGame.setas(sss);
                BeanGame.setbs(sss);
            }
            BeanGame.setds(Randomizer.nextInt(9));
            BeanGame.gain\u8fdb\u6d1e\u6b21\u6570(1);
            if (BeanGame.get\u8fdb\u6d1e\u6b21\u6570() > 7) {
                BeanGame.set\u8fdb\u6d1e\u6b21\u6570(7);
            }
            c.getSession().write((Object)MaplePacketCreator.BeansJDCS(BeanGame.get\u8fdb\u6d1e\u6b21\u6570()));
        } else if (type == 4) {
            BeanGame.gain\u8fdb\u6d1e\u6b21\u6570(-1);
            if (BeanGame.getas() == BeanGame.getbs()) {
                c.getSession().write((Object)MaplePacketCreator.BeansJDXZ(BeanGame.get\u8fdb\u6d1e\u6b21\u6570(), BeanGame.geta(), BeanGame.getb(), BeanGame.getd(), BeanGame.getas(), BeanGame.getbs(), BeanGame.getds()));
            } else {
                c.getSession().write((Object)MaplePacketCreator.BeansJDXZ(BeanGame.get\u8fdb\u6d1e\u6b21\u6570(), 0, 0, 0, BeanGame.getas(), BeanGame.getbs(), BeanGame.getds()));
            }
        } else if (type == 5) {
            if (BeanGame.getas() == BeanGame.getbs() && BeanGame.getas() == BeanGame.getds()) {
                chr.gainBeans(BeanGame.gets());
                chr.gainExp(BeanGame.gets(), true, false, true);
                String notea = "\u606d\u559c\u4f60\u6253\u8c46\u8c46\u6210\u529f\u4e2d\u5956\uff01\u5f53\u524d\u4e2d\u5956\u83b7\u5f97\u8c46\u8c46\uff1a" + BeanGame.gets() + "\u4e2a\uff01";
                c.getSession().write((Object)MaplePacketCreator.BeansGameMessage(1, 1, notea));
            }
        } else if (type == 11) {
            \u529b\u5ea6 = slea.readShort();
            \u8c46\u8c46\u5e8f\u53f7 = slea.readInt() + 1;
            chr.setBeansRange(\u529b\u5ea6);
            chr.setBeansNum(\u8c46\u8c46\u5e8f\u53f7);
            if (\u8c46\u8c46\u5e8f\u53f7 == 1) {
                chr.setCanSetBeansNum(false);
            }
        } else if (type == 6) {
            slea.skip(1);
            byte \u5faa\u73af\u6b21\u6570 = slea.readByte();
            if (\u5faa\u73af\u6b21\u6570 == 0) {
                return;
            }
            if (\u5faa\u73af\u6b21\u6570 != 1) {
                slea.skip((\u5faa\u73af\u6b21\u6570 - 1) * 8);
            }
            if (chr.isCanSetBeansNum()) {
                chr.setBeansNum(chr.getBeansNum() + \u5faa\u73af\u6b21\u6570);
            }
            chr.gainBeans(-\u5faa\u73af\u6b21\u6570);
            chr.setCanSetBeansNum(true);
        } else {
            System.out.println("\u672a\u5904\u7406\u7684\u7c7b\u578b\u3010" + type + "\u3011\n\u5305" + slea.toString());
        }
        if (type == 11 || type == 6) {
            for (int i = 0; i < 5; ++i) {
                beansInfo.add(new Beans(chr.getBeansRange() + BeanGame.rand(-100, 100), BeanGame.getBeanType(), chr.getBeansNum() + i));
            }
            c.getSession().write((Object)MaplePacketCreator.showBeans(beansInfo));
        }
    }

    private static int getBeanType() {
        int random = BeanGame.rand(1, 100);
        int beanType = 0;
        switch (random) {
            case 2: {
                beanType = 1;
                break;
            }
            case 49: {
                beanType = 2;
                break;
            }
            case 99: {
                beanType = 3;
            }
        }
        return beanType;
    }

    public static final int get\u8fdb\u6d1e\u6b21\u6570() {
        return \u8fdb\u6d1e\u6b21\u6570;
    }

    public static final void gain\u8fdb\u6d1e\u6b21\u6570(int a) {
        \u8fdb\u6d1e\u6b21\u6570 += a;
    }

    public static final void set\u8fdb\u6d1e\u6b21\u6570(int a) {
        \u8fdb\u6d1e\u6b21\u6570 = a;
    }

    public static final int geta() {
        return a;
    }

    public static final void seta(int s) {
        a = s;
    }

    public static final int getb() {
        return b;
    }

    public static final void setb(int a) {
        b = a;
    }

    public static final int getd() {
        return d;
    }

    public static final void setd(int a) {
        d = a;
    }

    public static final int gets() {
        return s;
    }

    public static final void sets(int a) {
        s = a;
    }

    public static final int getas() {
        return as;
    }

    public static final void setas(int s) {
        as = s;
    }

    public static final int getbs() {
        return bs;
    }

    public static final void setbs(int a) {
        bs = a;
    }

    public static final int getds() {
        return ds;
    }

    public static final void setds(int a) {
        ds = a;
    }

    private static int rand(int lbound, int ubound) {
        return (int)(Math.random() * (double)(ubound - lbound + 1) + (double)lbound);
    }

    public static final void BeanGame2(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.getSession().write((Object)MaplePacketCreator.updateBeans(c.getPlayer().getId(), c.getPlayer().getBeans()));
        c.getSession().write((Object)MaplePacketCreator.enableActions());
    }
}

