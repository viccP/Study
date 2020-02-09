/*
 * 
 * @WNMS
 * �����������ع�
 */

importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status;

var exp = 100000;
			
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
		var stage3status = eim.getProperty("stage3status");
		if (stage3status == null) {
			if (playerStatus) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,28);
				var stage3leader = eim.getProperty("stage3leader");
				if (playerStatus) { 
					if (passes) {
						// ���������ڴ򿪡�
                                                eim.setProperty("stage3leader","done");
						cm.sendNext("��ϲ��ͨ���ˣ�������һ�ذ�.");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.gainItem(4001022, -28);
						clear(3,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { //ͨ��֤����
						cm.sendNext("������Ҫ28�ţ���û���㹻�ġ�.");
					}
					cm.dispose();
				} else {
					cm.sendOk("�ӳ���Ҫ����28��ͨ��֤�ſ���ͨ����һ�ء�.");
					
					cm.dispose();
				}
			} else { // Members
				cm.sendOk("�ӳ���Ҫ����28��ͨ��֤�ſ���ͨ����һ�ء�.");
				cm.dispose();
			}
		} else {
			cm.sendOk("�ӳ���Ҫ������ʮ����ͨ��֤�ſ���ͨ����һ�ء�.");
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
	map = mf.getMap(922010300);
	var nextStage = eim.getMapInstance(922010400);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq4");
	}
}
