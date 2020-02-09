/*
 * 
 * @WNMS重构 - 玩具城组队任务
 * @红蜗牛
 */

importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status;

var exp = 110000;
			
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
		var stage5status = eim.getProperty("stage6status");
		if (stage5status == null) {
			if (playerStatus) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,0);
				var stage5leader = eim.getProperty("stage6leader");
				if (playerStatus) {
					if (passes) {
						// Clear stage
                                                eim.setProperty("stage6leader","done");
						cm.sendNext("请你和组员跳上箱子进入下一关吧！");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.gainItem(4001022, -24);
						clear(6,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { // Not done yet
					cm.sendNext("请你和组员跳上箱子进入下一关吧！");
					}
					cm.dispose();
				} else {
					cm.sendNext("请你和组员跳上箱子进入下一关吧！");
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("请你和组员跳上箱子进入下一关吧！");
				cm.dispose();
			}
		} else {
			cm.sendNext("请你和组员跳上箱子进入下一关吧！");
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
	map = mf.getMap(922010500);
	var nextStage = eim.getMapInstance(922010600);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq6");
	}
	var stageSeven = eim.getMapInstance(922010700);
	var stageSevenPortal = stageSeven.getPortal("next00");
	if (stageSevenPortal != null) {
		stageSevenPortal.setScriptName("lpq7");
	}
}
