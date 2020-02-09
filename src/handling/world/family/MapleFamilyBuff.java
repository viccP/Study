/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.world.family;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.Timer;
import tools.MaplePacketCreator;
import tools.Pair;

public class MapleFamilyBuff {
    private static final int event = 2;
    private static final int[] type = new int[]{0, 1, 2, 3, 4, 2, 3, 2, 3, 2, 3};
    private static final int[] duration = new int[]{0, 0, 15, 15, 30, 15, 15, 30, 30, 30, 30};
    private static final int[] effect = new int[]{0, 0, 150, 150, 200, 200, 200, 200, 200, 200, 200};
    private static final int[] rep = new int[]{3, 5, 7, 8, 10, 12, 15, 20, 25, 40, 50};
    private static final String[] name = new String[]{"\u76f4\u63a5\u79fb\u52a8\u5230\u5b66\u9662\u6210\u5458\u8eab\u8fb9", "\u76f4\u63a5\u53ec\u5524\u5b66\u9662\u6210\u5458", "\u6211\u7684\u7206\u7387 1.5\u500d(15\u5206\u949f)", "\u6211\u7684\u7ecf\u9a8c\u503c 1.5\u500d(15\u5206\u949f)", "\u5b66\u9662\u6210\u5458\u7684\u56e2\u7ed3(30\u5206\u949f)", "\u6211\u7684\u7206\u7387 2\u500d(15\u5206\u949f)", "\u6211\u7684\u7ecf\u9a8c\u503c 2\u500d(15\u5206\u949f)", "\u6211\u7684\u7206\u7387 2\u500d(30\u5206\u949f)", "\u6211\u7684\u7ecf\u9a8c\u503c 2\u500d(30\u5206\u949f)", "\u6211\u7684\u7ec4\u961f\u7206\u7387 2\u500d(30\u5206\u949f)", "\u6211\u7684\u7ec4\u961f\u7ecf\u9a8c\u503c 2\u500d(30\u5206\u949f)"};
    private static final String[] desc = new String[]{"[\u5bf9\u8c61] \u6211\n[\u6548\u679c] \u76f4\u63a5\u53ef\u4ee5\u79fb\u52a8\u5230\u6307\u5b9a\u7684\u5b66\u9662\u6210\u5458\u8eab\u8fb9\u3002", "[\u5bf9\u8c61] \u5b66\u9662\u6210\u5458 1\u540d\n[\u6548\u679c] \u76f4\u63a5\u53ef\u4ee5\u53ec\u5524\u6307\u5b9a\u7684\u5b66\u9662\u6210\u5458\u5230\u73b0\u5728\u7684\u5730\u56fe\u3002", "[\u5bf9\u8c61] \u6211\n[\u6301\u7eed\u6548\u679c] 15\u5206\u949f\n[\u6548\u679c] \u6253\u602a\u7206\u7387\u589e\u52a0\u5230 #c1.5\u500d# \n\u203b \u4e0e\u7206\u7387\u6d3b\u52a8\u91cd\u53e0\u65f6\u5931\u6548\u3002", "[\u5bf9\u8c61] \u6211\n[\u6301\u7eed\u6548\u679c] 15\u5206\u949f\n[\u6548\u679c] \u6253\u602a\u7ecf\u9a8c\u503c\u589e\u52a0\u5230 #c1.5\u500d# \n\u203b \u4e0e\u7ecf\u9a8c\u503c\u6d3b\u52a8\u91cd\u53e0\u65f6\u5931\u6548\u3002", "[\u542f\u52a8\u6761\u4ef6] \u6821\u8c31\u6700\u4f4e\u5c42\u5b66\u9662\u6210\u54586\u540d\u4ee5\u4e0a\u5728\u7ebf\u65f6\n[\u6301\u7eed\u6548\u679c] 30\u5206\u949f\n[\u6548\u679c] \u7206\u7387\u548c\u7ecf\u9a8c\u503c\u589e\u52a0\u5230 #c2\u500d# \u203b \u4e0e\u7206\u7387\u3001\u7ecf\u9a8c\u503c\u6d3b\u52a8\u91cd\u53e0\u65f6\u5931\u6548\u3002", "[\u5bf9\u8c61] \u6211\n[\u6301\u7eed\u6548\u679c] 15\u5206\u949f\n[\u6548\u679c] \u6253\u602a\u7206\u7387\u589e\u52a0\u5230 #c2\u500d# \n\u203b \u4e0e\u7206\u7387\u6d3b\u52a8\u91cd\u53e0\u65f6\u5931\u6548\u3002", "[\u5bf9\u8c61] \u6211\n[\u6301\u7eed\u6548\u679c] 15\u5206\u949f\n[\u6548\u679c] \u6253\u602a\u7ecf\u9a8c\u503c\u589e\u52a0\u5230 #c2\u500d# \n\u203b \u4e0e\u7ecf\u9a8c\u503c\u6d3b\u52a8\u91cd\u53e0\u65f6\u5931\u6548\u3002", "[\u5bf9\u8c61] \u6211\n[\u6301\u7eed\u6548\u679c] 30\u5206\u949f\n[\u6548\u679c] \u6253\u602a\u7206\u7387\u589e\u52a0\u5230 #c2\u500d# \n\u203b \u4e0e\u7206\u7387\u6d3b\u52a8\u91cd\u53e0\u65f6\u5931\u6548\u3002", "[\u5bf9\u8c61] \u6211\n[\u6301\u7eed\u6548\u679c] 30\u5206\u949f\n[\u6548\u679c] \u6253\u602a\u7ecf\u9a8c\u503c\u589e\u52a0\u5230 #c2\u500d# \n\u203b \u4e0e\u7ecf\u9a8c\u503c\u6d3b\u52a8\u91cd\u53e0\u65f6\u5931\u6548\u3002", "[\u5bf9\u8c61] \u6211\u6240\u5c5e\u7ec4\u961f\n[\u6301\u7eed\u6548\u679c] 30\u5206\u949f\n[\u6548\u679c] \u6253\u602a\u7206\u7387\u589e\u52a0\u5230 #c2\u500d# \n\u203b \u4e0e\u7206\u7387\u6d3b\u52a8\u91cd\u53e0\u65f6\u5931\u6548\u3002", "[\u5bf9\u8c61] \u6211\u6240\u5c5e\u7ec4\u961f\n[\u6301\u7eed\u6548\u679c] 30\u5206\u949f\n[\u6548\u679c] \u6253\u602a\u7ecf\u9a8c\u503c\u589e\u52a0\u5230 #c2\u500d# \n\u203b \u4e0e\u7ecf\u9a8c\u503c\u6d3b\u52a8\u91cd\u53e0\u65f6\u5931\u6548\u3002"};
    private static final List<MapleFamilyBuffEntry> buffEntries = new ArrayList<MapleFamilyBuffEntry>();

    public static List<MapleFamilyBuffEntry> getBuffEntry() {
        return buffEntries;
    }

    public static MapleFamilyBuffEntry getBuffEntry(int i) {
        return buffEntries.get(i);
    }

    static {
        for (int i = 0; i < 2; ++i) {
            buffEntries.add(new MapleFamilyBuffEntry(i, name[i], desc[i], 1, rep[i], type[i], 190000 + i, duration[i], effect[i]));
        }
    }

    public static class MapleFamilyBuffEntry {
        public String name;
        public String desc;
        public int count;
        public int rep;
        public int type;
        public int index;
        public int questID;
        public int duration;
        public int effect;
        public List<Pair<MapleBuffStat, Integer>> effects;

        public MapleFamilyBuffEntry(int index, String name, String desc, int count, int rep, int type, int questID, int duration, int effect) {
            this.name = name;
            this.desc = desc;
            this.count = count;
            this.rep = rep;
            this.type = type;
            this.questID = questID;
            this.index = index;
            this.duration = duration;
            this.effect = effect;
            this.effects = this.getEffects();
        }

        public int getEffectId() {
            switch (this.type) {
                case 2: {
                    return 2022694;
                }
                case 3: {
                    return 2450018;
                }
            }
            return 2022332;
        }

        public final List<Pair<MapleBuffStat, Integer>> getEffects() {
            ArrayList<Pair<MapleBuffStat, Integer>> ret = new ArrayList<Pair<MapleBuffStat, Integer>>();
            switch (this.type) {
                case 2: {
                    ret.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.DROP_RATE, this.effect));
                    ret.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.MESO_RATE, this.effect));
                    break;
                }
                case 3: {
                    ret.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.EXPRATE, this.effect));
                    break;
                }
                case 4: {
                    ret.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.EXPRATE, this.effect));
                    ret.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.DROP_RATE, this.effect));
                    ret.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.MESO_RATE, this.effect));
                }
            }
            return ret;
        }

        public void applyTo(MapleCharacter chr) {
            chr.getClient().getSession().write((Object)MaplePacketCreator.giveBuff(-this.getEffectId(), this.duration * 60000, this.effects, null));
            MapleStatEffect eff = MapleItemInformationProvider.getInstance().getItemEffect(this.getEffectId());
            chr.cancelEffect(eff, true, -1L, this.effects);
            long starttime = System.currentTimeMillis();
            MapleStatEffect.CancelEffectAction cancelAction = new MapleStatEffect.CancelEffectAction(chr, eff, starttime);
            ScheduledFuture<?> schedule = Timer.BuffTimer.getInstance().schedule(cancelAction, starttime + (long)(this.duration * 60000) - starttime);
            chr.registerEffect(eff, starttime, schedule, this.effects);
        }
    }

}

