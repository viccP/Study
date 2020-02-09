/*
 * 
 * @WNMS
 * 玩具组队任务重构
 */

importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status;

var exp = 50000;
			
function start() {
	status = -1;
	playerStatus = cm.isLeader();
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		var eim = cm.getChar().getEventInstance();
		var stage2status = eim.getProperty("stage2status");
		if (stage2status == null) {
			if (cm.isLeader()) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,10);
				var stage2leader = eim.getProperty("stage2leader");
				if (cm.isLeader()) {
					if (passes) {
						// Clear stage
						cm.sendNext("恭喜你通过了第二关！现在进入第三关吧！");
                                                eim.setProperty("stage2leader","done");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.gainItem(4001022, -10);
						clear(2,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("你确定带来了10个通行证？请检查一下！");
					}
					cm.dispose();
				} else {
					cm.sendOk("你不是队长，这一关需要队长给我十五张通行证即可通过！");
					//
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("欢迎来到第二关！这里需要你和你的小伙伴一起努力搜集通行证！");
 return;
				cm.dispose();
			}
		} else {
			cm.sendNext("Congratulations! You've passed the 2nd stage. Hurry on now, to the 3rd stage.");
			clear(2,eim,cm);
			cm.dispose();
		}
	}
}

function clear(stage, eim, cm) {
	eim.setProperty("stage" + stage.toString() + "status","clear");
	var packetef = MaplePacketCreator.showEffect("quest/party/clear");
	var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
	var packetglow = MaplePacketCreator.environmentChange("gate",2);
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
	map.broadcastMessage(packetglow);
	var mf = eim.getMapFactory();
	map = mf.getMap(922010200);
	var nextStage = eim.getMapInstance(922010300);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq3");
	}
}
