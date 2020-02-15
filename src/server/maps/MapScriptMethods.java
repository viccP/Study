/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package server.maps;

import java.awt.Point;

import client.MapleClient;
import client.MapleQuestStatus;
import client.SkillFactory;
import scripting.EventManager;
import scripting.NPCScriptManager;
import server.MapleItemInformationProvider;
import server.Randomizer;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.quest.MapleQuest;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.packet.UIPacket;

public class MapScriptMethods {
    private static final Point witchTowerPos = new Point(-60, 184);
    private static final String[] mulungEffects = new String[]{"我一直在等你！如果你有勇气，你会走在那个门的右边！", "勇敢的你如何成功的通过武陵道场!", "我会确保你会后悔来到了武陵道场！", "我喜欢你的勇气！但不要把你的勇气变成鲁莽！", "如果你想一步一步地走到成功的道路上，用一切方法去做！"};

    public static void startScript_FirstUser(MapleClient c, String scriptName) {
        if (c.getPlayer() == null) {
            return;
        }
        block0 : switch (onFirstUserEnter.fromString(scriptName)) {
            case dojang_Eff: {
                int temp = (c.getPlayer().getMapId() - 925000000) / 100;
                int stage = temp - temp / 100 * 100;
                MapScriptMethods.sendDojoClock(c, MapScriptMethods.getTiming(stage) * 60);
                MapScriptMethods.sendDojoStart(c, stage - MapScriptMethods.getDojoStageDec(stage));
                break;
            }
            case PinkBeen_before: {
                MapScriptMethods.handlePinkBeanStart(c);
                break;
            }
            case onRewordMap: {
                MapScriptMethods.reloadWitchTower(c);
                break;
            }
            case GhostF: {
                c.getPlayer().getMap().startMapEffect("这个地图感觉阴森森的..有种莫名的奇怪感觉..", 5120025);
                break;
            }
            case moonrabbit_mapEnter: {
                c.getPlayer().getMap().startMapEffect("粥环绕月球的月见草种子和保护月球兔子！", 5120016);
                break;
            }
            case StageMsg_together: {
                switch (c.getPlayer().getMapId()) {
                    case 103000800: {
                        c.getPlayer().getMap().startMapEffect("解决问题并收集通行证的数量！", 5120017);
                        break block0;
                    }
                    case 103000801: {
                        c.getPlayer().getMap().startMapEffect("上绳索，揭开正确的组合！", 5120017);
                        break block0;
                    }
                    case 103000802: {
                        c.getPlayer().getMap().startMapEffect("在平台上推出正确的组合！", 5120017);
                        break block0;
                    }
                    case 103000803: {
                        c.getPlayer().getMap().startMapEffect("在桶上，揭开正确的组合！", 5120017);
                        break block0;
                    }
                    case 103000804: {
                        c.getPlayer().getMap().startMapEffect("打败绿水灵王和他的孩子！", 5120017);
                    }
                }
                break;
            }
            case StageMsg_romio: {
                switch (c.getPlayer().getMapId()) {
                    case 926100000: {
                        c.getPlayer().getMap().startMapEffect("请找到隐藏的门，通过调查实验室！", 5120021);
                        break block0;
                    }
                    case 926100001: {
                        c.getPlayer().getMap().startMapEffect("找到你的方式通过这黑暗！", 5120021);
                        break block0;
                    }
                    case 926100100: {
                        c.getPlayer().getMap().startMapEffect("充满能量的烧杯！", 5120021);
                        break block0;
                    }
                    case 926100200: {
                        c.getPlayer().getMap().startMapEffect("获取实验的文件通过每个门！", 5120021);
                        break block0;
                    }
                    case 926100203: {
                        c.getPlayer().getMap().startMapEffect("请打败所有的怪物！", 5120021);
                        break block0;
                    }
                    case 926100300: {
                        c.getPlayer().getMap().startMapEffect("找到你的方法通过实验室！", 5120021);
                        break block0;
                    }
                    case 926100401: {
                        c.getPlayer().getMap().startMapEffect("请保护我的爱人！", 5120021);
                    }
                }
                break;
            }
            case StageMsg_juliet: {
                switch (c.getPlayer().getMapId()) {
                    case 926110000: {
                        c.getPlayer().getMap().startMapEffect("请找到隐藏的门，通过调查实验室！", 5120022);
                        break block0;
                    }
                    case 926110001: {
                        c.getPlayer().getMap().startMapEffect("找到你的方式通过这黑暗！", 5120022);
                        break block0;
                    }
                    case 926110100: {
                        c.getPlayer().getMap().startMapEffect("充满能量的烧杯！", 5120022);
                        break block0;
                    }
                    case 926110200: {
                        c.getPlayer().getMap().startMapEffect("获取实验的文件通过每个门！", 5120022);
                        break block0;
                    }
                    case 926110203: {
                        c.getPlayer().getMap().startMapEffect("请打败所有的怪物！", 5120022);
                        break block0;
                    }
                    case 926110300: {
                        c.getPlayer().getMap().startMapEffect("找到你的方法通过实验室！", 5120022);
                        break block0;
                    }
                    case 926110401: {
                        c.getPlayer().getMap().startMapEffect("请保护我的爱人！", 5120022);
                    }
                }
                break;
            }
            case party6weatherMsg: {
                switch (c.getPlayer().getMapId()) {
                    case 930000000: {
                        c.getPlayer().getMap().startMapEffect("进入传送点，我要对你们施放变身魔法了！", 5120023);
                        break block0;
                    }
                    case 930000100: {
                        c.getPlayer().getMap().startMapEffect("消灭所有怪物！", 5120023);
                        break block0;
                    }
                    case 930000200: {
                        c.getPlayer().getMap().startMapEffect("对荆棘施放稀释的毒液4个！", 5120023);
                        break block0;
                    }
                    case 930000300: {
                        c.getPlayer().getMap().startMapEffect("妈妈你在哪里呜呜哭哭喔我迷路了", 5120023);
                        break block0;
                    }
                    case 930000400: {
                        c.getPlayer().getMap().startMapEffect("找我对话拿净化之珠其中一个队员集满10个怪物株给我！", 5120023);
                        break block0;
                    }
                    case 930000500: {
                        c.getPlayer().getMap().startMapEffect("从怪人书桌中寻找紫色魔力石！！", 5120023);
                        break block0;
                    }
                    case 930000600: {
                        c.getPlayer().getMap().startMapEffect("将紫色魔力石放在祭坛上！", 5120023);
                    }
                }
                break;
            }
            case StageMsg_davy: {
                switch (c.getPlayer().getMapId()) {
                    case 925100000: {
                        c.getPlayer().getMap().startMapEffect("击败外的怪物的船舶推进！", 5120020);
                        break;
                    }
                    case 925100100: {
                        c.getPlayer().getMap().startMapEffect("我们必须证明自己！给我海盗勋章！", 5120020);
                        break;
                    }
                    case 925100200: {
                        c.getPlayer().getMap().startMapEffect("在这里击败守卫！", 5120020);
                        break;
                    }
                    case 925100300: {
                        c.getPlayer().getMap().startMapEffect("消灭这里的守卫！", 5120020);
                        break;
                    }
                    case 925100400: {
                        c.getPlayer().getMap().startMapEffect("锁上门！密封船舶动力的根！", 5120020);
                        break;
                    }
                    case 925100500: {
                        c.getPlayer().getMap().startMapEffect("消灭海盗！", 5120020);
                    }
                }
                EventManager em = c.getChannelServer().getEventSM().getEventManager("Pirate");
                if (c.getPlayer().getMapId() != 925100500 || em == null || em.getProperty("stage5") == null || c.getChannelServer().getMapFactory().getMap(925100500).getNumMonsters() != 0) break;
                int mobId = Randomizer.nextBoolean() ? 9300119 : 9300119;
                int st = Integer.parseInt(em.getProperty("stage5"));
                switch (st) {
                    case 1: {
                        mobId = 9300105;
                        break;
                    }
                    case 2: {
                        mobId = 9300106;
                    }
                }
                MapleMonster shammos = MapleLifeFactory.getMonster(mobId);
                if (c.getPlayer().getEventInstance() != null) {
                    c.getPlayer().getEventInstance().registerMonster(shammos);
                }
                c.getPlayer().getMap().spawnMonsterOnGroundBelow(shammos, new Point(411, 236));
                break;
            }
            case astaroth_summon: {
                c.getPlayer().getMap().resetFully();
                c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9400633), new Point(600, -26));
                break;
            }
            case boss_Ravana: {
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(5, "那已经出现！"));
                break;
            }
            case killing_BonusSetting: {
                c.getPlayer().getMap().resetFully();
                c.getSession().write((Object)MaplePacketCreator.showEffect("killing/bonus/bonus"));
                c.getSession().write((Object)MaplePacketCreator.showEffect("killing/bonus/stage"));
                Point pos1 = null;
                Point pos2 = null;
                Point pos3 = null;
                int spawnPer = 0;
                int mobId = 0;
                if (c.getPlayer().getMapId() >= 910320010 && c.getPlayer().getMapId() <= 910320029) {
                    pos1 = new Point(121, 218);
                    pos2 = new Point(396, 43);
                    pos3 = new Point(-63, 43);
                    mobId = 9700020;
                    spawnPer = 10;
                } else if (c.getPlayer().getMapId() >= 926010010 && c.getPlayer().getMapId() <= 926010029) {
                    pos1 = new Point(0, 88);
                    pos2 = new Point(-326, -115);
                    pos3 = new Point(361, -115);
                    mobId = 9700019;
                    spawnPer = 10;
                } else if (c.getPlayer().getMapId() >= 926010030 && c.getPlayer().getMapId() <= 926010049) {
                    pos1 = new Point(0, 88);
                    pos2 = new Point(-326, -115);
                    pos3 = new Point(361, -115);
                    mobId = 9700019;
                    spawnPer = 15;
                } else if (c.getPlayer().getMapId() >= 926010050 && c.getPlayer().getMapId() <= 926010069) {
                    pos1 = new Point(0, 88);
                    pos2 = new Point(-326, -115);
                    pos3 = new Point(361, -115);
                    mobId = 9700019;
                    spawnPer = 20;
                } else {
                    if (c.getPlayer().getMapId() < 926010070 || c.getPlayer().getMapId() > 926010089) break;
                    pos1 = new Point(0, 88);
                    pos2 = new Point(-326, -115);
                    pos3 = new Point(361, -115);
                    mobId = 9700029;
                    spawnPer = 20;
                }
                for (int i = 0; i < spawnPer; ++i) {
                    c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), new Point(pos1));
                    c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), new Point(pos2));
                    c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), new Point(pos3));
                }
                c.getPlayer().startMapTimeLimitTask(120, c.getPlayer().getMap().getReturnMap());
                break;
            }
            case shammos_Fenter: {
                if (c.getPlayer().getMapId() < 921120100 || c.getPlayer().getMapId() >= 921120500) break;
                MapleMonster shammos = MapleLifeFactory.getMonster(9300275);
                if (c.getPlayer().getEventInstance() != null) {
                    c.getPlayer().getEventInstance().registerMonster(shammos);
                    if (c.getPlayer().getEventInstance().getProperty("HP") != null) {
                        shammos.setHp(Long.parseLong(c.getPlayer().getEventInstance().getProperty("HP")));
                    } else {
                        c.getPlayer().getEventInstance().setProperty("HP", "50000");
                    }
                }
                c.getPlayer().getMap().spawnMonsterWithEffectBelow(shammos, new Point(c.getPlayer().getMap().getPortal(0).getPosition()), 12);
                shammos.switchController(c.getPlayer(), false);
                break;
            }
            case PRaid_D_Fenter: {
                switch (c.getPlayer().getMapId() % 10) {
                    case 0: {
                        c.getPlayer().getMap().startMapEffect("消灭所有的怪物！", 5120033);
                        break block0;
                    }
                    case 1: {
                        c.getPlayer().getMap().startMapEffect("打破盒子，消灭怪物！", 5120033);
                        break block0;
                    }
                    case 2: {
                        c.getPlayer().getMap().startMapEffect("消灭军官！", 5120033);
                        break block0;
                    }
                    case 3: {
                        c.getPlayer().getMap().startMapEffect("消灭所有的怪物！", 5120033);
                        break block0;
                    }
                    case 4: {
                        c.getPlayer().getMap().startMapEffect("找到另一边的路！", 5120033);
                    }
                }
                break;
            }
            case PRaid_B_Fenter: {
                c.getPlayer().getMap().startMapEffect("打败幽灵船船长！", 5120033);
                break;
            }
            case balog_summon: 
            case easy_balog_summon: {
                break;
            }
            case metro_firstSetting: 
            case killing_MapSetting: 
            case Sky_TrapFEnter: 
            case balog_bonusSetting: {
                c.getPlayer().getMap().resetFully();
                break;
            }
            default: {
                FileoutputUtil.log("Logs/Log_Script_Except.rtf", "未處理的腳本 : " + scriptName + ", 型態 : onUserEnter - 地圖ID " + c.getPlayer().getMapId());
            }
        }
    }

    public static void startScript_User(MapleClient c, String scriptName) {
        if (c.getPlayer() == null) {
            return;
        }
        String data = "";
        switch (onUserEnter.fromString(scriptName)) {
            case cygnusTest: 
            case cygnusJobTutorial: {
                MapScriptMethods.showIntro(c, "Effect/Direction.img/cygnusJobTutorial/Scene" + (c.getPlayer().getMapId() - 913040100));
                break;
            }
            case shammos_Enter: {
                c.getSession().write((Object)MaplePacketCreator.sendPyramidEnergy("shammos_LastStage", String.valueOf(c.getPlayer().getMapId() % 1000 / 100)));
                if (c.getPlayer().getEventInstance() == null || c.getPlayer().getMapId() != 921120500) break;
                NPCScriptManager.getInstance().dispose(c);
                NPCScriptManager.getInstance().start(c, 2022006);
                break;
            }
            case start_itemTake: {
                EventManager em = c.getChannelServer().getEventSM().getEventManager("OrbisPQ");
                if (em == null || !em.getProperty("pre").equals("0")) break;
                NPCScriptManager.getInstance().dispose(c);
                NPCScriptManager.getInstance().start(c, 2013001);
                break;
            }
            case PRaid_W_Enter: {
                c.getSession().write((Object)MaplePacketCreator.sendPyramidEnergy("PRaid_expPenalty", "0"));
                c.getSession().write((Object)MaplePacketCreator.sendPyramidEnergy("PRaid_ElapssedTimeAtField", "0"));
                c.getSession().write((Object)MaplePacketCreator.sendPyramidEnergy("PRaid_Point", "-1"));
                c.getSession().write((Object)MaplePacketCreator.sendPyramidEnergy("PRaid_Bonus", "-1"));
                c.getSession().write((Object)MaplePacketCreator.sendPyramidEnergy("PRaid_Total", "-1"));
                c.getSession().write((Object)MaplePacketCreator.sendPyramidEnergy("PRaid_Team", ""));
                c.getSession().write((Object)MaplePacketCreator.sendPyramidEnergy("PRaid_IsRevive", "0"));
                c.getPlayer().writePoint("PRaid_Point", "-1");
                c.getPlayer().writeStatus("Red_Stage", "1");
                c.getPlayer().writeStatus("Blue_Stage", "1");
                c.getPlayer().writeStatus("redTeamDamage", "0");
                c.getPlayer().writeStatus("blueTeamDamage", "0");
                break;
            }
            case PRaid_D_Enter: 
            case PRaid_B_Enter: 
            case PRaid_WinEnter: 
            case PRaid_FailEnter: 
            case PRaid_Revive: 
            case metro_firstSetting: 
            case blackSDI: 
            case summonIceWall: 
            case onSDI: 
            case enterBlackfrog: 
            case Sky_Quest: 
            case dollCave00: 
            case dollCave01: 
            case shammos_Base: 
            case shammos_Result: 
            case Sky_BossEnter: 
            case Sky_GateMapEnter: 
            case balog_dateSet: 
            case balog_buff: 
            case outCase: 
            case Sky_StageEnter: 
            case dojang_QcheckSet: 
            case evanTogether: 
            case aranTutorAlone: 
            case Ghost: {
                c.getPlayer().getMap().startMapEffect("這個地圖感覺陰森森的..有種莫名的奇怪感覺..", 5120025);
                break;
            }
            case evanAlone: {
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                break;
            }
            case startEreb: 
            case mirrorCave: 
            case babyPigMap: 
            case evanleaveD: {
                c.getSession().write((Object)UIPacket.IntroDisableUI(false));
                c.getSession().write((Object)UIPacket.IntroLock(false));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                break;
            }
            case dojang_Msg: {
                c.getPlayer().getMap().startMapEffect(mulungEffects[Randomizer.nextInt(mulungEffects.length)], 5120024);
                break;
            }
            case dojang_1st: {
                c.getPlayer().writeMulungEnergy();
                break;
            }
            case undomorphdarco: 
            case reundodraco: {
                c.getPlayer().cancelEffect(MapleItemInformationProvider.getInstance().getItemEffect(2210016), false, -1L);
                break;
            }
            case goAdventure: {
                c.getSession().write((Object)UIPacket.IntroDisableUI(false));
                c.getSession().write((Object)UIPacket.IntroLock(false));
                c.getSession().write((Object)UIPacket.MapNameDisplay(10000));
                break;
            }
            case crash_Dragon: {
                MapScriptMethods.showIntro(c, "Effect/Direction4.img/crash/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case getDragonEgg: {
                MapScriptMethods.showIntro(c, "Effect/Direction4.img/getDragonEgg/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case meetWithDragon: {
                MapScriptMethods.showIntro(c, "Effect/Direction4.img/meetWithDragon/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case PromiseDragon: {
                MapScriptMethods.showIntro(c, "Effect/Direction4.img/PromiseDragon/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case evanPromotion: {
                switch (c.getPlayer().getMapId()) {
                    case 900090000: {
                        data = "Effect/Direction4.img/promotion/Scene0" + (c.getPlayer().getGender() == 0 ? "0" : "1");
                        break;
                    }
                    case 900090001: {
                        data = "Effect/Direction4.img/promotion/Scene1";
                        break;
                    }
                    case 900090002: {
                        data = "Effect/Direction4.img/promotion/Scene2" + (c.getPlayer().getGender() == 0 ? "0" : "1");
                        break;
                    }
                    case 900090003: {
                        data = "Effect/Direction4.img/promotion/Scene3";
                        break;
                    }
                    case 900090004: {
                        c.getSession().write((Object)UIPacket.IntroDisableUI(false));
                        c.getSession().write((Object)UIPacket.IntroLock(false));
                        c.getSession().write((Object)MaplePacketCreator.enableActions());
                        MapleMap mapto = c.getChannelServer().getMapFactory().getMap(900010000);
                        c.getPlayer().changeMap(mapto, mapto.getPortal(0));
                        return;
                    }
                }
                MapScriptMethods.showIntro(c, data);
                break;
            }
            case TD_MC_title: {
                c.getSession().write((Object)UIPacket.IntroDisableUI(false));
                c.getSession().write((Object)UIPacket.IntroLock(false));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                c.getSession().write((Object)UIPacket.MapEff("temaD/enter/mushCatle"));
                break;
            }
            case explorationPoint: {
                if (c.getPlayer().getMapId() == 104000000) {
                    c.getSession().write((Object)UIPacket.IntroDisableUI(false));
                    c.getSession().write((Object)UIPacket.IntroLock(false));
                    c.getSession().write((Object)MaplePacketCreator.enableActions());
                    c.getSession().write((Object)UIPacket.MapNameDisplay(c.getPlayer().getMapId()));
                }
                MapleQuest.MedalQuest m = null;
                block52: for (MapleQuest.MedalQuest mq : MapleQuest.MedalQuest.values()) {
                    for (int i : mq.maps) {
                        if (c.getPlayer().getMapId() != i) continue;
                        m = mq;
                        continue block52;
                    }
                }
                if (m == null || c.getPlayer().getLevel() < m.level || c.getPlayer().getQuestStatus(m.questid) == 2) break;
                if (c.getPlayer().getQuestStatus(m.lquestid) != 1) {
                    MapleQuest.getInstance(m.lquestid).forceStart(c.getPlayer(), 0, "0");
                }
                if (c.getPlayer().getQuestStatus(m.questid) != 1) {
                    MapleQuest.getInstance(m.questid).forceStart(c.getPlayer(), 0, null);
                    StringBuilder sb = new StringBuilder("enter=");
                    for (int i = 0; i < m.maps.length; ++i) {
                        sb.append("0");
                    }
                    c.getPlayer().updateInfoQuest(m.questid - 2005, sb.toString());
                    MapleQuest.getInstance(m.questid - 1995).forceStart(c.getPlayer(), 0, "0");
                }
                String quest = c.getPlayer().getInfoQuest(m.questid - 2005);
                MapleQuestStatus stat = c.getPlayer().getQuestNAdd(MapleQuest.getInstance(m.questid - 1995));
                if (stat.getCustomData() == null) {
                    stat.setCustomData("0");
                }
                int number = Integer.parseInt(stat.getCustomData());
                StringBuilder sb = new StringBuilder("enter=");
                boolean changedd = false;
                for (int i = 0; i < m.maps.length; ++i) {
                    boolean changed = false;
                    if (c.getPlayer().getMapId() == m.maps[i] && quest.substring(i + 6, i + 7).equals("0")) {
                        sb.append("1");
                        changed = true;
                        changedd = true;
                    }
                    if (changed) continue;
                    sb.append(quest.substring(i + 6, i + 7));
                }
                if (!changedd) break;
                c.getPlayer().updateInfoQuest(m.questid - 2005, sb.toString());
                MapleQuest.getInstance(m.questid - 1995).forceStart(c.getPlayer(), 0, String.valueOf(++number));
                c.getPlayer().dropMessage(5, "访问 " + number + "/" + m.maps.length + " 个地区.");
                c.getPlayer().dropMessage(5, "称号 " + String.valueOf((Object)m) + " 已完成了");
                c.getSession().write((Object)MaplePacketCreator.showQuestMsg("称号 " + String.valueOf((Object)m) + " 已完成访问 " + number + "/" + m.maps.length + " 个地区"));
                break;
            }
            case go10000: 
            case go20000: 
            case go30000: 
            case go40000: 
            case go50000: 
            case go1000000: 
            case go1020000: 
            case go104000000: {
                c.getSession().write((Object)UIPacket.IntroDisableUI(false));
                c.getSession().write((Object)UIPacket.IntroLock(false));
            }
            case go2000000: 
            case go1010000: 
            case go1010100: 
            case go1010200: 
            case go1010300: 
            case go1010400: {
                c.getSession().write((Object)UIPacket.MapNameDisplay(c.getPlayer().getMapId()));
                break;
            }
            case goArcher: {
                MapScriptMethods.showIntro(c, "Effect/Direction3.img/archer/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case goPirate: {
                MapScriptMethods.showIntro(c, "Effect/Direction3.img/pirate/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case goRogue: {
                MapScriptMethods.showIntro(c, "Effect/Direction3.img/rogue/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case goMagician: {
                MapScriptMethods.showIntro(c, "Effect/Direction3.img/magician/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case goSwordman: {
                MapScriptMethods.showIntro(c, "Effect/Direction3.img/swordman/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case goLith: {
                MapScriptMethods.showIntro(c, "Effect/Direction3.img/goLith/Scene" + (c.getPlayer().getGender() == 0 ? "0" : "1"));
                break;
            }
            case TD_MC_Openning: {
                MapScriptMethods.showIntro(c, "Effect/Direction2.img/open");
                break;
            }
            case TD_MC_gasi: {
                MapScriptMethods.showIntro(c, "Effect/Direction2.img/gasi");
                break;
            }
            case aranDirection: {
                switch (c.getPlayer().getMapId()) {
                    case 914090010: {
                        data = "Effect/Direction1.img/aranTutorial/Scene0";
                        break;
                    }
                    case 914090011: {
                        data = "Effect/Direction1.img/aranTutorial/Scene1" + (c.getPlayer().getGender() == 0 ? "0" : "1");
                        break;
                    }
                    case 914090012: {
                        data = "Effect/Direction1.img/aranTutorial/Scene2" + (c.getPlayer().getGender() == 0 ? "0" : "1");
                        break;
                    }
                    case 914090013: {
                        data = "Effect/Direction1.img/aranTutorial/Scene3";
                        break;
                    }
                    case 914090100: {
                        data = "Effect/Direction1.img/aranTutorial/HandedPoleArm" + (c.getPlayer().getGender() == 0 ? "0" : "1");
                        break;
                    }
                    case 914090200: {
                        data = "Effect/Direction1.img/aranTutorial/Maha";
                    }
                }
                MapScriptMethods.showIntro(c, data);
                break;
            }
            case iceCave: {
                c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000014), (byte)-1, (byte)0);
                c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000015), (byte)-1, (byte)0);
                c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000016), (byte)-1, (byte)0);
                c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000017), (byte)-1, (byte)0);
                c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000018), (byte)-1, (byte)0);
                c.getSession().write((Object)UIPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/ClickLirin", -1));
                c.getSession().write((Object)UIPacket.IntroDisableUI(false));
                c.getSession().write((Object)UIPacket.IntroLock(false));
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                break;
            }
            case rienArrow: {
                if (!c.getPlayer().getInfoQuest(21019).equals("miss=o;helper=clear")) break;
                c.getPlayer().updateInfoQuest(21019, "miss=o;arr=o;helper=clear");
                c.getSession().write((Object)UIPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3"));
                break;
            }
            case rien: {
                if (c.getPlayer().getQuestStatus(21101) == 2 && c.getPlayer().getInfoQuest(21019).equals("miss=o;arr=o;helper=clear")) {
                    c.getPlayer().updateInfoQuest(21019, "miss=o;arr=o;ck=1;helper=clear");
                }
                c.getSession().write((Object)UIPacket.IntroDisableUI(false));
                c.getSession().write((Object)UIPacket.IntroLock(false));
                break;
            }
            case check_count: {
                if (c.getPlayer().getMapId() != 950101010 || c.getPlayer().haveItem(4001433, 20) && c.getPlayer().getLevel() >= 50) break;
                MapleMap mapp = c.getChannelServer().getMapFactory().getMap(950101100);
                c.getPlayer().changeMap(mapp, mapp.getPortal(0));
                break;
            }
            case Massacre_first: {
                if (c.getPlayer().getPyramidSubway() != null) break;
                c.getPlayer().setPyramidSubway(new Event_PyramidSubway(c.getPlayer()));
                break;
            }
            case Massacre_result: {
                c.getSession().write((Object)MaplePacketCreator.showEffect("pvp/victory"));
                break;
            }
            default: {
                FileoutputUtil.log("Logs/Log_Script_Except.rtf", "未處理的腳本 : " + scriptName + ", 型態 : onUserEnter - 地圖ID " + c.getPlayer().getMapId());
            }
        }
    }

    private static final int getTiming(int ids) {
        if (ids <= 5) {
            return 5;
        }
        if (ids >= 7 && ids <= 11) {
            return 6;
        }
        if (ids >= 13 && ids <= 17) {
            return 7;
        }
        if (ids >= 19 && ids <= 23) {
            return 8;
        }
        if (ids >= 25 && ids <= 29) {
            return 9;
        }
        if (ids >= 31 && ids <= 35) {
            return 10;
        }
        if (ids >= 37 && ids <= 38) {
            return 15;
        }
        return 0;
    }

    private static final int getDojoStageDec(int ids) {
        if (ids <= 5) {
            return 0;
        }
        if (ids >= 7 && ids <= 11) {
            return 1;
        }
        if (ids >= 13 && ids <= 17) {
            return 2;
        }
        if (ids >= 19 && ids <= 23) {
            return 3;
        }
        if (ids >= 25 && ids <= 29) {
            return 4;
        }
        if (ids >= 31 && ids <= 35) {
            return 5;
        }
        if (ids >= 37 && ids <= 38) {
            return 6;
        }
        return 0;
    }

    private static void showIntro(MapleClient c, String data) {
        c.getSession().write((Object)UIPacket.IntroDisableUI(true));
        c.getSession().write((Object)UIPacket.IntroLock(true));
        c.getSession().write((Object)UIPacket.ShowWZEffect(data, -1));
    }

    private static void sendDojoClock(MapleClient c, int time) {
        c.getSession().write((Object)MaplePacketCreator.getClock(time));
    }

    private static void sendDojoStart(MapleClient c, int stage) {
        c.getSession().write((Object)MaplePacketCreator.environmentChange("Dojang/start", 4));
        c.getSession().write((Object)MaplePacketCreator.environmentChange("dojang/start/stage", 3));
        c.getSession().write((Object)MaplePacketCreator.environmentChange("dojang/start/number/" + stage, 3));
        c.getSession().write((Object)MaplePacketCreator.trembleEffect(0, 1));
    }

    private static void handlePinkBeanStart(MapleClient c) {
        MapleMap map = c.getPlayer().getMap();
        map.resetFully();
        if (!map.containsNPC(2141000)) {
            map.spawnNpc(2141000, new Point(-190, -42));
        }
    }

    private static void reloadWitchTower(MapleClient c) {
        MapleMap map = c.getPlayer().getMap();
        map.killAllMonsters(false);
        short level = c.getPlayer().getLevel();
        int mob2 = level <= 10 ? 9300367 : (level <= 20 ? 9300368 : (level <= 30 ? 9300369 : (level <= 40 ? 9300370 : (level <= 50 ? 9300371 : (level <= 60 ? 9300372 : (level <= 70 ? 9300373 : (level <= 80 ? 9300374 : (level <= 90 ? 9300375 : (level <= 100 ? 9300376 : 9300377)))))))));
        map.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mob2), witchTowerPos);
    }

    private static enum onUserEnter {
        babyPigMap,
        crash_Dragon,
        evanleaveD,
        getDragonEgg,
        meetWithDragon,
        go1010100,
        go1010200,
        go1010300,
        go1010400,
        evanPromotion,
        PromiseDragon,
        evanTogether,
        incubation_dragon,
        TD_MC_Openning,
        TD_MC_gasi,
        TD_MC_title,
        cygnusJobTutorial,
        cygnusTest,
        startEreb,
        dojang_Msg,
        dojang_1st,
        reundodraco,
        undomorphdarco,
        explorationPoint,
        goAdventure,
        go10000,
        go20000,
        go30000,
        go40000,
        go50000,
        go1000000,
        go1010000,
        go1020000,
        go2000000,
        go104000000,
        goArcher,
        goPirate,
        goRogue,
        goMagician,
        goSwordman,
        goLith,
        iceCave,
        mirrorCave,
        aranDirection,
        rienArrow,
        rien,
        check_count,
        Massacre_first,
        Massacre_result,
        aranTutorAlone,
        evanAlone,
        dojang_QcheckSet,
        Sky_StageEnter,
        outCase,
        balog_buff,
        balog_dateSet,
        Sky_BossEnter,
        Sky_GateMapEnter,
        shammos_Enter,
        shammos_Result,
        shammos_Base,
        dollCave00,
        dollCave01,
        Sky_Quest,
        enterBlackfrog,
        onSDI,
        blackSDI,
        summonIceWall,
        metro_firstSetting,
        start_itemTake,
        PRaid_D_Enter,
        PRaid_B_Enter,
        PRaid_Revive,
        PRaid_W_Enter,
        PRaid_WinEnter,
        PRaid_FailEnter,
        Ghost,
        NULL;


        private static onUserEnter fromString(String Str) {
            try {
                return onUserEnter.valueOf(Str);
            }
            catch (IllegalArgumentException ex) {
                return NULL;
            }
        }
    }

    private static enum onFirstUserEnter {
        dojang_Eff,
        PinkBeen_before,
        onRewordMap,
        StageMsg_together,
        StageMsg_davy,
        party6weatherMsg,
        StageMsg_juliet,
        StageMsg_romio,
        moonrabbit_mapEnter,
        astaroth_summon,
        boss_Ravana,
        killing_BonusSetting,
        killing_MapSetting,
        metro_firstSetting,
        balog_bonusSetting,
        balog_summon,
        easy_balog_summon,
        Sky_TrapFEnter,
        shammos_Fenter,
        PRaid_D_Fenter,
        PRaid_B_Fenter,
        GhostF,
        NULL;


        private static onFirstUserEnter fromString(String Str) {
            try {
                return onFirstUserEnter.valueOf(Str);
            }
            catch (IllegalArgumentException ex) {
                return NULL;
            }
        }
    }

}