/* ===========================================================
			注释(cm.sendSimple\cm.itemQuantity(5420008))
	脚本类型: 		NPC
	所在地图:		废弃都市组队任务第一关
	脚本名字:		克鲁特
=============================================================
制作时间：2010年8月6日 11:46:56
制作人员：笔芯（国外翻译）
=============================================================
*/

importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status;
var curMap;
var playerStatus;
var chatState;
var questions = Array("第一个问题：转职成战士的最低等级是多少？#b\r\n（打倒怪物，获取相应数量的证书。）", "第一个问题：转职成战士的最低力量值（SEX）是多少？#b\r\n（打倒怪物，获取相应数量的证书。）", "第一个问题：转职成魔法师的最低智力值（INT）是多少？#b\r\n（打倒怪物，获取相应数量的证书。）", "第一个问题：转职成弓箭手的最低敏捷值（DEX）是多少？#b\r\n（打倒怪物，获取相应数量的证书。）", "第一个问题：转职成飞侠的最低敏捷值（DEX）是多少？#b\r\n（打倒怪物，获取相应数量的证书。）", "第一个问题：等级1 ～　等级2 所需的经验值是多少？#b\r\n（打倒怪物，获取相应数量的证书。）", "第一个问题：转职成魔法师的最低等级是多少？#b\r\n（打倒怪物，获取相应数量的证书。");
var qanswers = Array(10, 35, 20, 25, 25, 15, 8);
var party;
var preamble;
var stage2rects = Array(Rectangle(-770,-132,28,178),Rectangle(-733,-337,26,105),Rectangle(-601,-328,29,105),Rectangle(-495,-125,24,165));
var stage2combos = Array(Array(0,1,1,1),Array(1,0,1,1),Array(1,1,0,1),Array(1,1,1,0));
var stage3rects = Array(Rectangle(608,-180,140,50),Rectangle(791,-117,140,45),Rectangle(958,-180,140,50),Rectangle(876,-238,140,45),Rectangle(702,-238,140,45));
var stage3combos = Array(Array(0,0,1,1,1),Array(0,1,0,1,1),Array(0,1,1,0,1),Array(0,1,1,1,0),Array(1,0,0,1,1),Array(1,0,1,0,1),Array(1,0,1,1,0),Array(1,1,0,0,1),Array(1,1,0,1,0),Array(1,1,1,0,0));
var stage4rects = Array(Rectangle(910,-236,35,5),Rectangle(877,-184,35,5),Rectangle(946,-184,35,5),Rectangle(845,-132,35,5),Rectangle(910,-132,35,5),Rectangle(981,-132,35,5));
var stage4combos = Array(Array(0,0,0,1,1,1),Array(0,0,1,0,1,1),Array(0,0,1,1,0,1),Array(0,0,1,1,1,0),Array(0,1,0,0,1,1),Array(0,1,0,1,0,1),Array(0,1,0,1,1,0),Array(0,1,1,0,0,1),Array(0,1,1,0,1,0),Array(0,1,1,1,0,0),Array(1,0,0,0,1,1),Array(1,0,0,1,0,1),Array(1,0,0,1,1,0),Array(1,0,1,0,0,1),Array(1,0,1,0,1,0),Array(1,0,1,1,0,0),Array(1,1,0,0,0,1),Array(1,1,0,0,1,0),Array(1,1,0,1,0,0),Array(1,1,1,0,0,0));
var eye = 9300002;
var necki = 9300000;
var slime = 9300003;
var monsterIds = Array(eye, eye, eye, necki, necki, necki, necki, necki, necki, slime);
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
			4020007, 4020008,4003000,3010001,3010002,3010003,3010004,3010005,3010006,3010007,3010008,3010009,3010013,3010014,3010016,3010017,3010018,3010019,3010021,3010025,3010028,3010029,3010030,3010031,3010032,3010033,3010034,3010035,3010036,3010037,3010038,3010040,3010041,3010043,3010044,3010045,3010046,3010047,3010048,3010049,3010050,3010051,3010052,3010054,3010055,3010059 );
						// Diamond and Black Crystal Ores and Screws	
var prizeQtyEtc = Array(15, 15, 15, 15,
			8, 8, 8,
			8, 8, 8, 8,
			8, 8, 8,
			3, 3, 30);
			
function start() {
	status = -1;
	mapId = cm.getPlayer().getMapId();
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
	playerStatus = cm.isLeader();
	preamble = null;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (curMap == 1) { // First Stage.
			if (playerStatus) { // Check if player is leader
				if (status == 0) {
					var eim = cm.getPlayer().getEventInstance();
					party = eim.getPlayers();
					preamble = eim.getProperty("leader1stpreamble");
					if (preamble == null) {
						cm.sendNext("你好，欢迎来到第一个阶段，在这里你可能会考到很多凶狠的鳄鱼，跟我对话，我会给你们每一个人出一道题目，你们再打倒凶狠的鳄鱼获取相应数目的证书卡交给我，就行了。之后我会给你们一张通行证，你们把通行证全部交给组队长，组队长再和我讲话，就可以顺利通关了，那么祝你一切顺利！");
						eim.setProperty("leader1stpreamble","done");
						cm.dispose();
					} else { // Check how many they have compared to number of party members
						// Check for stage completed
						var complete = eim.getProperty(curMap.toString() + "stageclear");
						if (complete != null) {
							cm.sendNext("现在可以到下一个关卡了，如果不快点的话，门可能就关闭了。");
							cm.dispose();
						} else {
							var numpasses = cm.getPlayer().getMap().getCharacters().size()-1;
							var passes = cm.haveItem(4001008,numpasses);
							var strpasses = "#b" + numpasses.toString() + " passes#k";
							if (!passes) {
								cm.sendNext("对不起，你收集的通行证数量没有达到我所需求的。");
								cm.dispose();
							} else {
								cm.sendNext("不敢相信你们组队已经成功完成了第一阶段。好了，我将开启通往下一个关卡的结界，时间不多了，你们赶快到那里进行第二阶段的挑战吧。");
								clear(1,eim,cm);
								cm.givePartyExp(5000, party);
								cm.gainItem(4001008, -numpasses);
								cm.dispose();
								// TODO: Make the shiny thing flash
							}
						}
					}
				}
			} else { // Not leader
				var eim = cm.getPlayer().getEventInstance();
				pstring = "member1stpreamble" + cm.getPlayer().getId().toString();
				preamble = eim.getProperty(pstring);
				if (status == 0 && preamble == null) {
					var qstring = "member1st" + cm.getPlayer().getId().toString();
					var question = eim.getProperty(qstring);
					if (question == null) {
						// Select a random question to ask the player.
						var questionNum = Math.floor(Math.random() * questions.length);
						eim.setProperty(qstring, questionNum.toString());
					}
					cm.sendNext("好了，你需要收集#b相应数目#k的证书给我。");
				} else if (status == 0) { // Otherwise, check for stage completed
					var complete = eim.getProperty(curMap.toString() + "stageclear");
					if (complete != null) {
						cm.sendNext("现在可以到下一个关卡了，如果不快点的话，门可能就关闭了。");
						cm.dispose();
					} else {
						// Reply to player correct/incorrect response to the question they have been asked
						var qstring = "member1st" + cm.getPlayer().getId().toString();
						var numcoupons = qanswers[parseInt(eim.getProperty(qstring))];
						var qcorr = cm.haveItem(4001007,(numcoupons+1));
						var enough = false;
						var passed = eim.getProperty(cm.getPlayer().getId().toString() + "passed");
						if (passed == 1) { 
							cm.sendOk("祝贺你，我已经给你了通行证，请把通行证交给队长之后，帮助其它队友吧！");
							cm.dispose();
						} else {
							if (!qcorr) { // Not too many
								qcorr = cm.haveItem(4001007,numcoupons);
								if (qcorr) { // Just right
									cm.sendNext("祝贺你，我已经给你了通行证，请把通行证交给队长之后，帮助其它队友吧！");
									cm.gainItem(4001007, -numcoupons);
									cm.gainItem(4001008, 1);
									enough = true;
									eim.setProperty(cm.getPlayer().getId().toString() + "passed", 1);
								}
							}
							if (!enough) {
								var questionstring = "member1st" + cm.getPlayer().getId().toString();
								var thequestion = parseInt(eim.getProperty(qstring));
								cm.sendNext("你给我的证书数量和答案不对应，你的问题是：\r\n" + questions[thequestion]);
							}
							cm.dispose();
						}
					}
				} else if (status == 1) {
					if (preamble == null) {
						var qstring = "member1st" + cm.getPlayer().getId().toString();
						var question = parseInt(eim.getProperty(qstring));
						cm.sendNextPrev(questions[question]);
					} else { // Shouldn't happen, if it does then just dispose
						cm.dispose();
					}
				} else if (status == 2) { // Preamble completed
					eim.setProperty(pstring,"done");
					cm.dispose();
				} else { // Shouldn't happen, but still...
					eim.setProperty(pstring,"done"); // Just to be sure
					cm.dispose();
				}
			} // End first map scripts
		} else if (2 <= curMap && 4 >= curMap) {
			rectanglestages(cm);

		} else if (curMap == 5) { // Final stage
			var eim = cm.getPlayer().getEventInstance();
			var stage5done = eim.getProperty("5stageclear");
			if (stage5done == null) {
				if (playerStatus) { // Leader
					var map = eim.getMapInstance(cm.getPlayer().getMapId());
					var passes = cm.haveItem(4001008,10);
					if (passes) {
						// Clear stage
						cm.sendNext("这里可以通过最后一个关卡，这里有很多凶猛的怪物，我衷心祝福你和你的组队能通过这项挑战。");
						party = eim.getPlayers();
						cm.gainItem(4001008, -10);
						clear(5,eim,cm);
						var endTime = new java.util.Date().getTime();
						var startTime = cm.getPlayer().getEventInstance().getProperty("startTime");
						var startTime2 = cm.getPlayer().getEventInstance().getProperty("s5start");
						if(((endTime - startTime) < 300000))
							cm.getPlayer().getEventInstance().setProperty("achieve29", "true");
						if(((endTime - startTime2) < 60000))
							cm.getPlayer().getEventInstance().setProperty("achieve33", "true");
						cm.givePartyExp(30000, party);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("你好，欢迎来到第5阶段，到处走走，可能会发现很多凶猛的怪物，打败它们，获取通行证，再把他们交给我。记住，怪物可能比你强大很多，请小心一点，祝你通过这一关。");
					}
					cm.dispose();
				} else { // Members
					cm.sendNext("欢迎来到第5阶段，在地图上走走，你就会看见许多凶猛的怪物，打败他们获取他们身上的通行证，交给你们的组队长。");
					cm.dispose();
				}
			} else { // Give rewards and warp to bonus
				if (status == 0) {
					cm.sendNext("不敢相信！你和你的组队员们终于完成了所有挑战！做为奖励，我将送你一些东西，请确保你的消耗栏、其它栏、装备栏是否有一个栏目以上的空格？");
				}
				if (status == 1) {
					if(cm.getPlayer().getEventInstance().getProperty("smugglers") != "true") {
						if(cm.getPlayer().getEventInstance().getProperty("achieve29") == "true")
							cm.getPlayer().finishAchievement(29);
						if(cm.getPlayer().getEventInstance().getProperty("achieve33") == "true")
							cm.getPlayer().finishAchievement(33);
						cm.getPlayer().finishAchievement(27);
						cm.getPlayer().finishAchievement(35);
					}
					getPrize(eim,cm);
					cm.dispose();
				}
			}
		} else { // No map found
			cm.sendNext("错误。");
			cm.dispose();
		}
	}
}

function clear(stage, eim, cm) {
	eim.setProperty(stage.toString() + "stageclear","true");
	var packetef = MaplePacketCreator.showEffect("quest/party/clear");
	var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
	var packetglow = MaplePacketCreator.environmentChange("gate",2);
	var map = eim.getMapInstance(cm.getPlayer().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
	map.broadcastMessage(packetglow);
	var mf = eim.getMapFactory();
	map = mf.getMap(103000800 + stage);
	var nextStage = eim.getMapInstance(103000800 + stage);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("kpq" + (stage+1).toString());
	}
	
}

function failstage(eim, cm) {
	var packetef = MaplePacketCreator.showEffect("quest/party/wrong_kor");
	var packetsnd = MaplePacketCreator.playSound("Party1/Failed");
	var map = eim.getMapInstance(cm.getPlayer().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
}

function rectanglestages (cm) {
	// Debug makes these stages clear without being correct
	var debug = false;
	var eim = cm.getPlayer().getEventInstance();
	if (curMap == 2) {
		var nthtext = "2";
		var nthobj = "ropes";
		var nthverb = "hang";
		var nthpos = "hang on the ropes too low";
		var curcombo = stage2combos;
		var currect = stage2rects;
		var objset = [0,0,0,0];
	} else if (curMap == 3) {
		var nthtext = "3";
		var nthobj = "platforms";
		var nthverb = "stand";
		var nthpos = "stand too close to the edges";
		var curcombo = stage3combos;
		var currect = stage3rects;
		var objset = [0,0,0,0,0];
	} else if (curMap == 4) {
		var nthtext = "4";
		var nthobj = "barrels";
		var nthverb = "stand";
		var nthpos = "stand too close to the edges";
		var curcombo = stage4combos;
		var currect = stage4rects;
		var objset = [0,0,0,0,0,0];
	}
	if (playerStatus) { // Check if player is leader
		if (status == 0) {
			// Check for preamble
			party = eim.getPlayers();
			preamble = eim.getProperty("leader" + nthtext + "preamble");
			if (preamble == null) {
				cm.sendNext("欢迎来到第 " + nthtext + " 关卡。 在我旁边你可能会看到很多绳子，让三名组队成员爬上绳子，找到正确的位置，就可以通过此关卡。");
				eim.setProperty("leader" + nthtext + "preamble","done");
				var sequenceNum = Math.floor(Math.random() * curcombo.length);
				eim.setProperty("stage" + nthtext + "combo",sequenceNum.toString());
				cm.dispose();
			} else {
				// Otherwise, check for stage completed
				var complete = eim.getProperty(curMap.toString() + "stageclear");
				if (complete != null) {	
					var mapClear = curMap.toString() + "stageclear";
					eim.setProperty(mapClear,"true"); // Just to be sure
					cm.sendNext("Please hurry on to the next stage, the portal opened!");
				} else { // Check for people on ropes and their positions
					var totplayers = 0;
					for (i = 0; i < objset.length; i++) {
						for (j = 0; j < party.size(); j++) {
							var present = currect[i].contains(party.get(j).getPosition());
							if (present) {
								objset[i] = objset[i] + 1;
								totplayers = totplayers + 1;
							}
						}
					}
			// Compare to correct positions
			// First, are there 3 players on the correct positions?
			if (totplayers == 3 || debug) {
				var combo = curcombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
				// Debug
				// Combo = curtestcombo;
				var testcombo = true;
				for (i = 0; i < objset.length; i++) {
					if (combo[i] != objset[i])
						testcombo = false;
				}
			if (testcombo || debug) {
				// Do clear
				clear(curMap,eim,cm);
				if(cm.getPlayer().getEventInstance().getProperty("s4startTime") != null && curMap == 4)
				{
					var starts4Time = cm.getPlayer().getEventInstance().getProperty("s4startTime");
					var nowTime = new java.util.Date().getTime();
					if((nowTime - starts4Time) < 75000)
					   cm.getPlayer().getEventInstance().setProperty("s4achievement", "true"); // give via portal script.
				}
				var exp = (Math.pow(2,curMap) * 50);
				cm.givePartyExp(10000, party);
				cm.dispose();
			} else { // Wrong
				// Do wrong
				failstage(eim,cm);
				cm.dispose();
				}
			} else {
				if (debug) {
					var outstring = "Objects contain:"
					for (i = 0; i < objset.length; i++) {
						outstring += "\r\n" + (i+1).toString() + ". " + objset[i].toString();
					}
					cm.sendNext(outstring); 
				} else
					cm.sendNext("你看起来好像没有发现正确的位置，别气馁，让组队成员在绳子上找到正确的位置。");
					cm.dispose();
					}
				}
			}
		} else {
			var complete = eim.getProperty(curMap.toString() + "stageclear");
			if (complete != null) {
				var target = eim.getMapInstance(103000800 + curMap);
				var targetPortal = target.getPortal("st00");
				cm.getPlayer().changeMap(target, targetPortal);
			}
			cm.dispose();
		}
	} else { // Not leader
		if (status == 0) {
			var complete = eim.getProperty(curMap.toString() + "stageclear");
			if (complete != null) {
				cm.sendNext("时间不多了，请快点到达下一个关卡。");
			} else {
				cm.sendNext("请让你的组队长和我谈话。");
				cm.dispose();
			}
		} else {
			var complete = eim.getProperty(curMap.toString() + "stageclear");
			if (complete != null) {	
				var target = eim.getMapInstance(103000800 + curMap);
				var targetPortal = target.getPortal("st00");
				cm.getPlayer().changeMap(target, targetPortal);
			}
			cm.dispose();
		}
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
	if (cm.canHold(itemSet[sel])) { 
if(cm.haveItem(4031329,1)){
	cm.gainItem(4001325,+1);}
		cm.gainItem(itemSet[sel], qty);
		
		var map = eim.getMapInstance(103000805);
		var portal = map.getPortal("sp");
		cm.getPlayer().changeMap(map,portal);
	} else {
		cm.sendNext("请检查你的装备栏、消耗栏、其它栏是否有一个栏目以上的空格。");
	}
}