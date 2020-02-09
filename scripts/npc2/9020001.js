/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Cloto - Hidden Street : 1st Accompaniment
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.odinms.tools);
importPackage(java.awt);

var status;
var curMap;
var questions = Array("首先給你出一個問題！請仔細聽好：作為一名劍士，他在1轉的時候需要達到的等級是多少，那麼請交給我同樣數量的通行證。",
    "首先給你出一個問題！ 請仔細聽好：作為一名劍士，他在1轉的時候需要力量的能力值最小是多少點，那麼請交給我同樣數量的通行證。",
    "首先給你出一個問題！請仔細聽好： 作為一名法師，他在1轉的時候需要智力的能力值最小是多少點，那麼請交給我同樣數量的通行證。",
    "首先給你出一個問題！請仔細聽好： 作為一名弓箭手，他在1轉的時候需要敏捷的能力值最小是多少點，那麼請交給我同樣數量的通行證。",
    "首先給你出一個問題！請仔細聽好： 作為一名盜賊，他在1轉的時候需要敏捷的能力值最小是多少點，那麼請交給我同樣數量的通行證。",
    "首先給你出一個問題！請仔細聽好： 所有職業在2轉的時候需要達到的等級是多少，那麼請交給我同樣數量的通行證。",
    "首先給你出一個問題！請仔細聽好： 作為一名法師，在1轉的時候需要達到的等級是多少，那麼請交給我同樣數量的通行證。");
var qanswers = Array(10, 35, 20, 25, 25, 30, 8);
var party;
var preamble; // we dont even need this mother fucker ! --
var stage2Rects = Array(Rectangle(-755,-132,4,218),Rectangle(-721,-340,4,166),Rectangle(-586,-326,4,150),Rectangle(-483,-181,4,222));
var stage3Rects = Array(Rectangle(608,-180,140,50),Rectangle(791,-117,140,45),
 	                        Rectangle(958,-180,140,50),Rectangle(876,-238,140,45),
 	                        Rectangle(702,-238,140,45));
var stage4Rects = Array(Rectangle(910,-236,35,5),Rectangle(877,-184,35,5),
 	                        Rectangle(946,-184,35,5),Rectangle(845,-132,35,5),
 	                        Rectangle(910,-132,35,5),Rectangle(981,-132,35,5));
var stage2combos = Array(Array(0,1,1,1),Array(1,0,1,1),Array(1,1,0,1),Array(1,1,1,0));
var stage3combos = Array(Array(0,0,1,1,1),Array(0,1,0,1,1),Array(0,1,1,0,1),
    Array(0,1,1,1,0),Array(1,0,0,1,1),Array(1,0,1,0,1),
    Array(1,0,1,1,0),Array(1,1,0,0,1),Array(1,1,0,1,0),
    Array(1,1,1,0,0));
var stage4combos = Array(Array(0,0,0,1,1,1),Array(0,0,1,0,1,1),Array(0,0,1,1,0,1),
    Array(0,0,1,1,1,0),Array(0,1,0,0,1,1),Array(0,1,0,1,0,1),
    Array(0,1,0,1,1,0),Array(0,1,1,0,0,1),Array(0,1,1,0,1,0),
    Array(0,1,1,1,0,0),Array(1,0,0,0,1,1),Array(1,0,0,1,0,1),
    Array(1,0,0,1,1,0),Array(1,0,1,0,0,1),Array(1,0,1,0,1,0),
    Array(1,0,1,1,0,0),Array(1,1,0,0,0,1),Array(1,1,0,0,1,0),
    Array(1,1,0,1,0,0),Array(1,1,1,0,0,0));
			
var eye = 9300002;
var necki = 9300000;
var slime = 9300003;
var monsterIds = Array(eye, eye, eye, necki, necki, necki, necki, necki, necki, slime);
//var prizeIdScroll = Array(2340000 , 2040301, 2040501, 2040504, 2040513, 2040601, 2041131, 2290096, 2290125, 2049100);	
//var prizeIdUse = Array(2002013, 2050004, 2002010, 2022179, 2022245, 2001000, 2022003);
//var prizeQtyUse = Array(30, 20, 80, 10, 5, 20, 15);
//var prizeIdEquip = Array(1302058, 1442025, 1092051, 1092057, 1092059, 1032062);		
//var prizeIdEtc = Array(4001126);
var prizeIdScroll = Array(2040502, 2040505,					// Overall DEX and DEF
    2040802,										// Gloves for DEX
    2040002, 2040402, 2040602);						// Helmet, Topwear and Bottomwear for DEF
var prizeIdUse = Array(2000001, 2000002, 2000003, 2000006,	// Orange, White and Blue Potions and Mana Elixir
    2000004, 2022000, 2022003);						// Elixir, Pure Water and Unagi
var prizeQtyUse = Array(80, 80, 80, 50,
    5, 15, 15);
var prizeIdEquip = Array(1032004, 1032005, 1032009,			// Level 20-25 Earrings
    1032006, 1032007, 1032010,						// Level 30 Earrings
    1032002,										// Level 35 Earring
    1002026, 1002089, 1002090);						// Bamboo Hats
var prizeIdEtc = Array(4010000, 4010001, 4010002, 4010003,	// Mineral Ores
    4010004, 4010005, 4010006,						// Mineral Ores
    4020000, 4020001, 4020002, 4020003,				// Jewel Ores
    4020004, 4020005, 4020006,						// Jewel Ores
    4020007, 4020008, 4003000);							
var prizeQtyEtc = Array(30);
			
function start() {
    status = -1;
    var mapId = cm.getChar().getMapId();
    if (mapId == 103000800)
        curMap = 1;
    else if (mapId == 103000801)
        curMap = 2;
    else if (mapId == 103000802)
        curMap = 3;
    else if (mapId == 103000803)
        curMap = 4;
    else if (mapId == 103000804)
        curMap = 5;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (type == 0 && mode == 0)
        status--;
    else {
        cm.dispose();
        return;
    }
	
    if (curMap == 1) { // First Stage.
        if (cm.isLeader()) {
            var eim = cm.getChar().getEventInstance();
            party = eim.getPlayers();
            preamble = eim.getProperty("leader1stpreamble");
            if (preamble == null) {
                cm.sendNext("歡迎來到第一階段. 妳要收集通行證來給我 通行證叫你的組員找我換.");
                eim.setProperty("leader1stpreamble","done");
                cm.dispose();
            } else {
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("請儘快到下個關卡, 傳送點已經打開了!");
                    cm.dispose();
                } else {
                    var numpasses = party.size() - 1; // All the players in the party need to get a pass besides the leader.
                    var strpasses = "#r" + numpasses + "#k";
                    if (!cm.haveItem(4001008, numpasses)) {
                        cm.sendNext("抱歉, 你的通行證不足. 你必須給我正確的數量; 應該會有, " + strpasses + " 張. 告訴你的組員去解決問題, 拿到通行證, 並且交給你.");
                        cm.dispose();
                    } else {
                        cm.sendNext("你收集了 " + strpasses + " 張! 恭喜你通過這個關卡! 我將會把傳送點打開送你去下個關卡. 這裡有時間限制 , 所以請快一點. 祝你好運!");
                        clear(1, eim, cm);
                        cm.givePartyExp(1000, party);
                        cm.gainItem(4001008, -numpasses);
                        cm.dispose();
                    // TODO: Make the shiny thing flash
                    }
                }
            }
        } else { // Not leader
            var eim = cm.getChar().getEventInstance();
            pstring = "member1stpreamble" + cm.getChar().getId();
            preamble = eim.getProperty(pstring);
            if (status == 0) {
                if (preamble == null) {
                    var qstring = "member1st" + cm.getChar().getId();
                    var question = eim.getProperty(qstring);
                    if (question == null) {
                        // Select a random question to ask the player.
                        var questionNum = Math.floor(Math.random() * questions.length);
                        eim.setProperty(qstring, questionNum);
                    }
                    cm.sendNext("注意, 你必須去收集 #bcoupons#k 來回答我的問題.");
                } else { // Otherwise, check for stage completed
                    var complete = eim.getProperty(curMap + "stageclear");
                    if (complete != null) { // Strage completed
                        cm.sendNext("請趕快通往下一個關卡, 傳送門已經打開!");
                        cm.dispose();
                    } else {
                        // Reply to player correct/incorrect response to the question they have been asked
                        var qstring = "member1st" + cm.getChar().getId();
                        var numcoupons = qanswers[parseInt(eim.getProperty(qstring))];
                        var qcorr = cm.itemQuantity(4001007);
                        if (numcoupons == qcorr) {
                            cm.sendNext("答對了! 妳拿到#bpass#k了. 請交給隊長.");
                            cm.gainItem(4001007, -numcoupons);
                            cm.gainItem(4001008, 1);
                        } else
                            cm.sendNext("抱歉, 那不是正確的答案! 請收集正確的數量.");
                    }
                    cm.dispose();
                }
            } else if (status == 1) {
                if (preamble == null) {
                    var qstring = "member1st" + cm.getChar().getId();
                    var question = parseInt(eim.getProperty(qstring));
                    cm.sendNextPrev(questions[question]);
                } else { // Shouldn't happen, if it does then just dispose
                    cm.dispose();
                }
            } else if (status == 2) { // Preamble completed
                eim.setProperty(pstring,"done");
                cm.dispose();
            }
        } // End first map scripts
    } else if (2 <= curMap && 4 >= curMap) {
        rectanglestages(cm);
    } else if (curMap == 5) { // Final stage
        var eim = cm.getChar().getEventInstance();
        var stage5done = eim.getProperty("5stageclear");
        if (stage5done == null) {
            if (cm.isLeader()) { // Leader
                if (cm.haveItem(4001008, 10)) {
                    // Clear stage
                    cm.sendNext("Here's the portal that leads you to the last, bonus stage. It's a stage that allows you to defeat regular monsters a little easier. You'll be given a set amount of time to hunt as much as possible, but you can always leave the stage in the middle of it through the NPC. Again, congratulations on clearing all the stages. Take care...");
                    party = eim.getPlayers();
                    cm.gainItem(4001008, -10);
                    clear(5, eim, cm);
                    cm.givePartyExp(15000, party);
                    cm.dispose();
                } else { // Not done yet
                    cm.sendNext("Hello. Welcome to the 5th and final stage. Walk around the map and you'll be able to find some Boss monsters. Defeat all of them, gather up #bthe passes#k, and please get them to me. Once you earn your pass, the leader of your party will collect them, and then get them to me once the #bpasses#k are gathered up. The monsters may be familiar to you, but they may be much stronger than you think, so please be careful. Good luck!\r\nAs a result of complaints, it is now mandatory to kill all the Slimes! Do it!");
                }
                cm.dispose();
            } else { // Members
                cm.sendNext("Welcome to the 5th and final stage.  Walk around the map and you will be able to find some Boss monsters.  Defeat them all, gather up the #bpasses#k, and give them to your leader.  Once you are done, return to me to collect your reward.");
                cm.dispose();
            }
        } else { // Give rewards and warp to bonus
            if (status == 0) {
                cm.sendNext("成功! 你完成了組隊任務.\r\n#b你將會拿到獎品 請確認你身上有空位!#k");
            } else if (status == 1) {
                getPrize(eim,cm);
                cm.dispose();
            }
        }
    } else { // No map found
        cm.sendNext("Invalid map, this means the stage is incomplete.");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty(stage + "stageclear", "true");
    var map = eim.getMapInstance(cm.getChar().getMapId());
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
    map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
    var mf = eim.getMapFactory();
    map = mf.getMap(103000800 + stage);
    var nextStage = eim.getMapInstance(103000800 + stage);
    var portal = nextStage.getPortal("next00");
    if (portal != null) {
        portal.setScriptName("kpq" + stage);
    }
}

function failstage(eim, cm) {
    var map = eim.getMapInstance(cm.getChar().getMapId());
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Failed"));
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
}

function rectanglestages (cm) {
    var eim = cm.getChar().getEventInstance();
    var nthtext;
    var nthobj;
    var nthverb;
    var nthpos;
    var curArray;
    var curCombo;
    var objset;
    if (curMap == 2) {
        nthtext = "2nd";
        nthobj = "ropes";
        nthverb = "hang";
        nthpos = "hang on the ropes too low";
        curArray = stage2Rects;
        curCombo = stage2combos;
        objset = [0,0,0,0];
    } else if (curMap == 3) {
        nthtext = "3rd";
        nthobj = "platforms";
        nthverb = "stand";
        nthpos = "stand too close to the edges";
        curArray = stage3Rects;
        curCombo = stage3combos;
        objset = [0,0,0,0,0];
    } else if (curMap == 4) {
        nthtext = "4th";
        nthobj = "barrels";
        nthverb = "stand";
        nthpos = "stand too close to the edges";
        curArray = stage4Rects;
        curCombo = stage4combos;
        objset = [0,0,0,0,0,0];
    }
    if (cm.isLeader()) { // Check if player is leader
        if (status == 0) {
            // Check for preamble
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            if (preamble == null) { // first time talking.
                cm.sendNext("Hi. Welcome to the " + nthtext + " stage. Next to me, you'll see a number of " + nthobj + ". Out of these " + nthobj + ", #b3 are connected to the portal that sends you to the next stage#k. All you need to do is have #b3 party members find the correct " + nthobj + " and " + nthverb + " on them.#k\r\nBUT, it doesn't count as an answer if you " + nthpos + "; please be near the middle of the " + nthobj + " to be counted as a correct answer. Also, only 3 members of your party are allowed on the " + nthobj + ". Once they are " + nthverb + "ing on them, the leader of the party must #bdouble-click me to check and see if the answer's correct or not#k. Now, find the right " + nthobj + " to " + nthverb + " on!");
                eim.setProperty("leader" + nthtext + "preamble","done");
                var sequenceNum = Math.floor(Math.random() * curCombo.length);
                eim.setProperty("stage" + nthtext + "combo", sequenceNum.toString());
                cm.dispose();
            } else {
                // Otherwise, check for stage completed
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("Please hurry on to the next stage, the portal opened!");
                    cm.dispose();
                } else { // Check for people on ropes and their positions
                    var playersOnCombo = 0;
                        asd: for (var i = 0; i < party.size(); i++) {
						for (var y = 0; y < curArray.length; y++) {
							if (curArray[y].contains(party.get(i).getPosition())) {
								playersOnCombo++;
                                objset[y] = 1;
								break;
							}
                        }
					}
                    // Compare to correct positions
                    // First, are there 3 players on the correct positions?
                    if (playersOnCombo == 3) {
                        var combo = curCombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
                        // Debug
                        // Combo = curtestcombo;
                        var correctCombo = true;
                        for (i = 0; i < objset.length && correctCombo; i++) {
                            if (combo[i] != objset[i])
                                correctCombo = false;
                        }
                        if (correctCombo) {
                            // Do clear
                            clear(curMap, eim, cm);
                            var exp = (Math.pow(2, curMap) * 50*10);
                            cm.givePartyExp(exp, party);
                            cm.dispose();
                        } else { // Wrong
                            failstage(eim, cm);
                            cm.dispose();
                        }
                    } else {
                        cm.sendNext("It looks like you haven't found the 3 " + nthobj + " just yet. Please think of a different combination of " + nthobj + ". Only 3 are allowed to " + nthverb + " on " + nthobj + ", and if you " + nthpos + " it may not count as an answer, so please keep that in mind. Keep going!");
                        cm.dispose();
                    }
                }
            }
        } else {
            var complete = eim.getProperty(curMap + "stageclear");
            if (complete != null) {
                var target = eim.getMapInstance(103000800 + curMap);
                var targetPortal = target.getPortal("st00");
                cm.getChar().changeMap(target, targetPortal);
            }
            cm.dispose();
        }
    } else { // Not leader
        var complete = eim.getProperty(curMap.toString() + "stageclear");
        if (complete != null) {
            cm.sendNext("Please hurry on to the next stage, the portal opened!");
        } else {
            cm.sendNext("Please have the party leader talk to me.");
        }
        cm.dispose();
    }
}

function getPrize(eim,cm) {
    var itemSetSel = Math.random();
    var itemSet;
    var itemSetQty;
    var hasQty = false;
    if (itemSetSel < 0.3)
        itemSet = prizeIdScroll;
    else if (itemSetSel < 0.6)
        itemSet = prizeIdEquip;
    else if (itemSetSel < 0.9) {
        itemSet = prizeIdUse;
        itemSetQty = prizeQtyUse;
        hasQty = true;
    } else {
        itemSet = prizeIdEtc;
        itemSetQty = prizeQtyEtc;
        hasQty = true;
    }
    var sel = Math.floor(Math.random()*itemSet.length);
    var qty = 1;
    if (hasQty)
        qty = itemSetQty[sel];
    if (cm.gainItem(itemSet[sel], qty)) {
        var map = eim.getMapInstance(103000805);
        cm.getPlayer().changeMap(map, map.getPortal("sp"));
    }
}