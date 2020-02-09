/*
 * 
 * @WNMS
 * �����������ع�
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
						cm.sendNext("��ϲ��ͨ���˵ڶ��أ����ڽ�������ذɣ�");
                                                eim.setProperty("stage2leader","done");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.gainItem(4001022, -10);
						clear(2,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("��ȷ��������10��ͨ��֤������һ�£�");
					}
					cm.dispose();
				} else {
					cm.sendOk("�㲻�Ƕӳ�����һ����Ҫ�ӳ�����ʮ����ͨ��֤����ͨ����");
					//
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("��ӭ�����ڶ��أ�������Ҫ������С���һ��Ŭ���Ѽ�ͨ��֤��");
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
