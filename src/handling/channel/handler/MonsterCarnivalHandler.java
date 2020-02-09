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
import client.MapleDisease;
import handling.MaplePacket;
import handling.world.MapleParty;
import java.io.PrintStream;
import java.util.List;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import server.MapleCarnivalFactory;
import server.MapleCarnivalParty;
import server.Randomizer;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.packet.MonsterCarnivalPacket;

public class MonsterCarnivalHandler {
    public static final void MonsterCarnival(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().getCarnivalParty() == null) {
            c.getSession().write((Object)MaplePacketCreator.enableActions());
            return;
        }
        byte tab = slea.readByte();
        int num = slea.readInt();
        if (tab == 0) {
            List<Pair<Integer, Integer>> mobs = c.getPlayer().getMap().getMobsToSpawn();
            if (num >= mobs.size() || c.getPlayer().getAvailableCP() < (Integer)mobs.get((int)num).right) {
                c.getPlayer().dropMessage(5, "\u4f60\u6ca1\u6709\u8db3\u591f\u7684CP.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            MapleMonster mons = MapleLifeFactory.getMonster((Integer)mobs.get((int)num).left);
            if (c.getPlayer().isGM()) {
                System.out.println("tab\uff1a" + tab);
                System.out.println("num\uff1a" + num);
                System.out.println("mons\uff1a" + mons);
                System.out.println("num\uff1a" + num);
                System.out.println("\u5224\u65adA\uff1a" + mons != null);
                System.out.println("\u5224\u65adB\uff1a" + c.getPlayer().getMap().makeCarnivalSpawn(c.getPlayer().getCarnivalParty().getTeam(), mons, num));
            }
            if (mons != null && c.getPlayer().getMap().makeCarnivalSpawn(c.getPlayer().getCarnivalParty().getTeam(), mons, num)) {
                c.getPlayer().getCarnivalParty().useCP(c.getPlayer(), (Integer)mobs.get((int)num).right);
                c.getPlayer().CPUpdate(false, c.getPlayer().getAvailableCP(), c.getPlayer().getTotalCP(), 0);
                for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                    chr.CPUpdate(true, c.getPlayer().getCarnivalParty().getAvailableCP(), c.getPlayer().getCarnivalParty().getTotalCP(), c.getPlayer().getCarnivalParty().getTeam());
                }
                c.getPlayer().getMap().broadcastMessage(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, num));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            } else {
                c.getPlayer().dropMessage(5, "\u4f60\u4e0d\u80fd\u518d\u53ec\u5524\u602a\u7269\u4e86.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            }
        } else if (tab == 1) {
            List<Integer> skillid = c.getPlayer().getMap().getSkillIds();
            if (num >= skillid.size()) {
                c.getPlayer().dropMessage(5, "\u53d1\u751f\u9519\u8befA.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            MapleCarnivalFactory.MCSkill skil = MapleCarnivalFactory.getInstance().getSkill(skillid.get(num));
            if (skil == null || c.getPlayer().getAvailableCP() < skil.cpLoss) {
                c.getPlayer().dropMessage(5, "\u4f60\u6ca1\u6709\u8db3\u591f\u7684CP.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            MapleDisease dis = skil.getDisease();
            boolean found = false;
            for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                if (chr.getParty() != null && (c.getPlayer().getParty() == null || chr.getParty().getId() == c.getPlayer().getParty().getId()) || !skil.targetsAll && !Randomizer.nextBoolean()) continue;
                found = true;
                if (dis == null) {
                    chr.dispel();
                } else if (skil.getSkill() == null) {
                    chr.giveDebuff(dis, 1, 30000L, MapleDisease.getByDisease(dis), 1);
                } else {
                    chr.giveDebuff(dis, skil.getSkill());
                }
                if (skil.targetsAll) continue;
                break;
            }
            if (found) {
                c.getPlayer().getCarnivalParty().useCP(c.getPlayer(), skil.cpLoss);
                c.getPlayer().CPUpdate(false, c.getPlayer().getAvailableCP(), c.getPlayer().getTotalCP(), 0);
                for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                    chr.CPUpdate(true, c.getPlayer().getCarnivalParty().getAvailableCP(), c.getPlayer().getCarnivalParty().getTotalCP(), c.getPlayer().getCarnivalParty().getTeam());
                }
                c.getPlayer().getMap().broadcastMessage(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, num));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            } else {
                c.getPlayer().dropMessage(5, "\u53d1\u751f\u9519\u8befB.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            }
        } else if (tab == 2) {
            MapleCarnivalFactory.MCSkill skil = MapleCarnivalFactory.getInstance().getGuardian(num);
            if (skil == null || c.getPlayer().getAvailableCP() < skil.cpLoss) {
                c.getPlayer().dropMessage(5, "\u4f60\u6ca1\u6709\u8db3\u591f\u7684CP.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                return;
            }
            if (c.getPlayer().getMap().makeCarnivalReactor(c.getPlayer().getCarnivalParty().getTeam(), num)) {
                c.getPlayer().getCarnivalParty().useCP(c.getPlayer(), skil.cpLoss);
                c.getPlayer().CPUpdate(false, c.getPlayer().getAvailableCP(), c.getPlayer().getTotalCP(), 0);
                for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                    chr.CPUpdate(true, c.getPlayer().getCarnivalParty().getAvailableCP(), c.getPlayer().getCarnivalParty().getTotalCP(), c.getPlayer().getCarnivalParty().getTeam());
                }
                c.getPlayer().getMap().broadcastMessage(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, num));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            } else {
                c.getPlayer().dropMessage(5, "\u4f60\u4e0d\u80fd\u518d\u53ec\u5524\u4e86.");
                c.getSession().write((Object)MaplePacketCreator.enableActions());
            }
        }
    }
}

