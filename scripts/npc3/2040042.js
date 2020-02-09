/*
 * 
 * @WNMS�ع� - ��߳��������
 * @����ţ
 */

importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status;

var exp = 130000;
			
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
		var stage7status = eim.getProperty("stage7status");
		if (stage7status == null) {
			if (playerStatus) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,3);
				var stage7leader = eim.getProperty("stage7leader");
				if (playerStatus) {
					if (passes) {
						// Clear stage
						cm.sendNext("��һ����Ҫ�Ѽ�3��ͨ��֤.���Ѽ��ɹ���������һ�ذɣ�");
                                                eim.setProperty("stage7leader","done");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.gainItem(4001022, -3);
						clear(7,eim,cm);
						cm.givePartyExp(exp, party);
   //cm.warpParty(922010800);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("��һ����Ҫ�Ѽ�3��ͨ��֤.");
					}
					cm.dispose();
				} else {
					cm.sendNext("��һ����Ҫ�Ѽ�3��ͨ��֤.");
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("��һ����Ҫ�Ѽ�3��ͨ��֤.");
				cm.dispose();
			}
		} else {
			cm.sendNext("��һ����Ҫ�Ѽ�3��ͨ��֤.b");   
//cm.warpParty(922010800);
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
	map = mf.getMap(922010700);
	var nextStage = eim.getMapInstance(922010800);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq8");
	}
}
