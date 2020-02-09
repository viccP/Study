var status;
var minLevel = 71; //最低等级
var maxLevel = 200; //最高等级
var exp1 = 300000;
var exp2 = 300000;
var exp3 = 400000;
var exp4 = 8000;
var exp5 = 9000;
var minPartySize = 3; //最少成员
var maxPartySize = 6; //最大成员
function start() {
status = -1;

action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    switch(cm.getPlayer().getMapId()) {
	case 701000210:
		cm.removeAll(4001130);
		cm.removeAll(4001131);
		cm.removeAll(4001159);
		cm.removeAll(4031777);
		cm.removeAll(4001160);
		cm.removeAll(4031779);
		cm.removeAll(4031778);
	    if (cm.getParty() == null) { // No Party
				cm.sendOk("您想要挑战#b罗密欧与朱丽叶#k吗?那么您必须要有一个组队噢!\r\n·等级要求:71级-200级.\r\n·队伍要求:3~6人\r\n#k·任务奖励:#b未知.");
				cm.dispose();
            } else if (!cm.isLeader()) { // Not Party Leader
				cm.sendOk("如果想要挑战#b罗密欧与朱丽叶组队修炼#k请让你们的#b组队长#k来找我吧!.");
				cm.dispose();
			} else {
				// Check if all party members are within PQ levels
				var party = cm.getParty().getMembers();
				var mapId = cm.getPlayer().getMapId();
				var next = true;
				var levelValid = 0;
				var inMap = 0;
				var it = party.iterator();
				while (it.hasNext()) {
					var cPlayer = it.next();
					if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
						levelValid += 1;

					} else {
						next = false;
					}
					if (cPlayer.getMapid() == mapId) {
						inMap += 1;
					}
				}
				if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
					next = false;
				}
				if (next) {
					var em = cm.warpParty(926100000);
                                        cm.getMap(926100000).addMapTimer(6000, 261000011);
					if (em == null) {
						cm.sendOk("你已进入副本地图.请查看相关NPC了解副本");
					} else {
						if (em.getProperty("entryPossible") != "false") {
							// Begin the PQ.
							em.startInstance(cm.getParty(),cm.getPlayer().getMap());
							// Remove Passes and Coupons
							
							cm.removeAll(4001008);
							cm.removeAll(4001007);
							if(cm.partyMemberHasItem(4001008) || cm.partyMemberHasItem(4001007)) { 
								cm.getPlayer().getEventInstance().setProperty("smugglers", "true"); 
								cm.partyNotice("Your smuggling attempt has been detected. We will allow the attempt, but you will not get any NX cash from this run.");

							}
							em.setProperty("entryPossible", "false");
							cm.getPlayer().getEventInstance().setProperty("startTime", new java.util.Date().getTime());
						} else { // Check if the PQ really has people inside
							var playersInPQ = 0;
							for (var mapid = 926100000; mapid <= 926100700; mapid++) {
								playersInPQ += cm.countPlayersInMap(mapid);
							}
							if (playersInPQ <= 1)
								em.setProperty("entryPossible", "true");
							cm.sendOk("Another party has already entered the #rKerning Party Quest#k in this channel. Please try another channel, or wait for the current party to finish.");
						}
					}
					cm.dispose();
			} else {
					cm.sendNext("您想要挑战#b罗密欧与朱丽叶#k吗?那么您必须要有一个组队噢!\r\n·等级要求:71级-200级.\r\n·队长要求:#r3~6人.\r\n#k·任务奖励:#b经验.#k\r\n\r\n您的组队必须有#b3~6#k名队员,并且都在此地图中.\r\n等级必须在#b71-#b200#k级之间!\r\n目前只有#b" + inMap + "位队员#k在此地图!.");
					cm.dispose();
				}
			}
	    break;
	case 926100000:


		cm.warpParty(926100001);
		cm.spawnMob(926100001,9300146,1314,211);
		cm.spawnMob(926100001,9300146,1900,211);
		cm.spawnMob(926100001,9300146,1800,211);
		cm.spawnMob(926100001,9300146,1700,211);
		cm.spawnMob(926100001,9300146,1430,211);
		cm.spawnMob(926100001,9300146,1580,211);
		cm.spawnMob(926100001,9300146,1500,211);
		cm.spawnMob(926100001,9300146,666,211);
		cm.spawnMob(926100001,9300146,888,211);
		cm.spawnMob(926100001,9300146,777,211);
		cm.spawnMob(926100001,9300146,382,211);
		cm.spawnMob(926100001,9300145,456,211);
		cm.spawnMob(926100001,9300145,738,211);
		cm.spawnMob(926100001,9300145,947,211);
		cm.spawnMob(926100001,9300145,368,211);
		cm.spawnMob(926100001,9300145,400,211);
		cm.spawnMob(926100001,9300145,372,211);
		cm.spawnMob(926100001,9300145,144,211);
		cm.spawnMob(926100001,9300145,400,211);
		cm.spawnMob(926100001,9300145,620,211);
		cm.spawnMob(926100001,9300145,828,211);
		cm.spawnMob(926100001,9300145,256,211);
		cm.spawnMob(926100001,9300145,544,211);
		cm.spawnMob(926100001,9300145,633,211);
		cm.spawnMob(926100001,9300145,1390,211);
		cm.spawnMob(926100001,9300145,1000,211);
		cm.spawnMob(926100001,9300145,1100,211);
		cm.spawnMob(926100001,9300145,887,211);cm.spawnMob(926100001,9300145,738,211);
		cm.spawnMob(926100001,9300145,947,211);
		cm.spawnMob(926100001,9300145,368,211);
		cm.spawnMob(926100001,9300145,400,211);
		cm.spawnMob(926100001,9300145,372,211);
		cm.spawnMob(926100001,9300145,144,211);
		cm.spawnMob(926100001,9300145,400,211);
		cm.spawnMob(926100001,9300145,620,211);
		cm.spawnMob(926100001,9300145,828,211);
		cm.spawnMob(926100001,9300145,256,211);
		cm.spawnMob(926100001,9300145,544,211);
		cm.spawnMob(926100001,9300145,633,211);
		cm.spawnMob(926100001,9300145,1390,211);
		cm.spawnMob(926100001,9300145,1000,211);
		cm.spawnMob(926100001,9300145,1100,211);
		cm.spawnMob(926100001,9300145,887,211);
		cm.spawnMob(926100001,9300145,998,211);
		cm.spawnMob(926100001,9300145,1400,211);
	    break;
	case 926100001:
	    if (!cm.isLeader()) { // Not Party Leader
		cm.sendOk("想过关？#b罗密欧与朱丽叶组队修炼②#k请让你们的#b组队长#k来找我吧!.");
		cm.dispose();
		}else if (cm.haveItem(4001159,30)) {
		cm.givePartyExp(+exp2);
		cm.warpParty(926100202);
		cm.removeAll(4001159);
		cm.gainItem(4031777, 1);
	    } else {
		cm.sendOk("想通关？ 去杀死怪物收集50个#v4001159#给我!");
	    }
	    break;
		case 926100202:
		if(cm.haveItem(4001134)){
			cm.removeAll(4001134);
			cm.gainItem(4031806,+1);
			cm.warp(926100400);
		}else{
			cm.sendOk("请让有瞬间移动的职业去上面点击我老表获得证明！然后分配给你们，每人一个！");
			cm.dispose();
		}
		break;
		case 926100400:
		if(cm.haveItem(4031806)){
			cm.removeAll(4031806);
			cm.summonMob(9300140, 5000000, 2000000, 1);
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[组队任务 - 罗密欧与朱丽叶]" + " : " + " [" + cm.getPlayer().getName() + "]召唤出了BOSS！大家祝福他们吧！",true).getBytes()); 

		}
break;		
	case 926100200:
	    if (!cm.getPlayer().getMapId())  { // Not Party Leader
		cm.sendOk("想过关？#b罗密欧与朱丽叶组队修炼③#k每个组员请给我10个!.");
		cm.dispose();
		}else if (cm.haveItem(4001160,10)) {
		cm.gainExp(+exp3);
		cm.warp(926100202);
		cm.removeAll(4001160);
		cm.gainItem(4031779, 1);
	    } else {
		cm.sendOk("想通关？ 去杀死怪物收集10个#v4001160#给我!a");
	    }
	    break;
	case 926100500:
	   if (cm.get) { // Not Party Leader
		cm.sendOk("想过关？#b罗密欧与朱丽叶组队修炼BOSS关卡#k请让你们的#b组队长#k来找我吧!.");
		cm.dispose();
		}else if (cm.haveItem(4031777,1) && cm.haveItem(4031779,1)) {
		cm.removeAll(4031777);
		cm.removeAll(4031779);
		cm.summonMob(9300139, 20000000, 10000, 1);
		cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[组队任务 - 罗密欧与朱丽叶]" + " : " + " [" + cm.getPlayer().getName() + "]召唤出了BOSS！大家祝福他们吧！",true).getBytes()); 
		}else if(cm.haveItem(4031778,1)){
		cm.gainExp(+exp4);
		cm.warpParty(926100600);
	    } else {
		cm.sendOk("想通过BOSS关卡？ \r\n1个#v4031777#\r\n1个#v4031779#\r\n给我!");
	    }
	    break;
	case 926100600:
	   if (!cm.isLeader()) { // Not Party Leader
		cm.sendOk("想过关？#b罗密欧与朱丽叶组队修炼终极BOSS关卡#k请让你们的#b组队长#k来找我吧!.");
		cm.dispose();
		}else if (cm.haveItem(4031778,1)) {
		cm.removeAll(4031778);
		cm.summonMob(9300140, 20000000, 10000, 1);
		}else if(cm.haveItem(4031806,1)){
		cm.givePartyExp(+exp5);
		cm.warpParty(926100700);
	    } else {
		cm.sendOk("想通过终极BOSS关卡？1个#v4031778#给我!");
	    }
	    break;
	case 926100700:
		cm.removeAll(4001130);
		cm.removeAll(4001131);
		cm.removeAll(4001159);
		cm.removeAll(4031777);
		cm.removeAll(4001160);
		cm.removeAll(4031779);
		cm.removeAll(4031778);
	    cm.warp(701000210,0);
	    break;
    }
    cm.dispose();
}