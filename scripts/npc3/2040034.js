/*
����Mxd ONLINE
�����е���߳ǽű�
*/

var status = 0;

var minLevel = 35;
var maxLevel = 200;

var minPartySize = 3;
var maxPartySize = 6;

function start() {
	status = -1;
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
		if (status == 0) {
			if (cm.getParty() == null) { // No Party
				cm.sendOk("������Ҫ: #r\r\n" + minPartySize + " λ��Ա.��� " + minLevel + " ��,��� " + maxLevel + "��.");
				cm.dispose();
			} else if (!cm.isLeader()) { // Not Party Leader
				cm.sendOk("���������ս��߳��������������Ķӳ����ҶԻ���");
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
					var em = cm.getEventManager("LudiPQ");
					if (em == null) {
						cm.sendOk("�޷��������PQ.���ļ���Ϊ��LudiPQ.����ϵ����Ա�鿴��");
					} else {
						if (em.getProperty("entryPossible") != "false") {
							// Begin the PQ.
							em.startInstance(cm.getParty(), cm.getPlayer().getMap());
							// Remove Passes and Coupons
							if (cm.getPlayer().getEventInstance() == null) {
								cm.sendOk("PQ������һ����������߹���Ա��������ϸ˵�����.");
								cm.dispose();
							} else {
								//var party2 = cm.getPlayer().getEventInstance().getPlayers();
								cm.removeAll(4001022);
								cm.removeAll(4001023); 
								// Mimicking exact GMS behavior, only removes from leader
								if(cm.partyMemberHasItem(4001022) || cm.partyMemberHasItem(4001023)) { 
								cm.getPlayer().getEventInstance().setProperty("smugglers", "true"); 
								cm.partyNotice("����ͼ͵�ɱ����֡����ǿ��Գ��ԣ������޷������ܵõ��κ�NX�ֽ�.");

								}
								cm.getPlayer().getEventInstance().setProperty("startTime", new java.util.Date().getTime());
								em.setProperty("entryPossible", "false");
							}
						} else {
							cm.sendNext("��һ�������Ѿ�����ս#b��߳Ǹ���#k�ˣ��������޷����룡");
						}
					}
					cm.dispose();
				} else {
					cm.sendNext("��ã�������ս���PQ�𣿽����յ������ƣ���ȷ��������ʱ���������ġ�������Ҫ: #r\r\n" + minPartySize + " λ��Ա.��� " + minLevel + " ��,��� " + maxLevel + "��.");
					cm.dispose();
				}
			}
		}
	}
}
