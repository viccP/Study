/*
 *��֮�� �ڰ�����С����
*/

var status = 0;
//��͵ȼ�
var minLevel = 1; 
//��ߵȼ�
var maxLevel = 200; 

var minPartySize = 2; //���ٳ�Ա
var maxPartySize = 6; //����Ա

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
			// �������һ�������.û�е���.ֱ�Ӽ���������
			if (cm.getParty() == null) { // �������
				cm.sendOk("��ʿ..������ľ��۲��˺ܾ�..���ܵ���#b�ڰ�����#k�Ŀֲ���Ϣ.���Ѿ��ҵ���#b���صĳ�Ѩ#k.����Ǳ��������!\r\n#b���Ƿ�Ը�ⴴ�������һ̽����?#d\r\n��ɺ���Ի��#b��������#k\r\n#r˫���ɴ�,���Ի�ü��ܲ�,�߼�װ��,������,����");			//cm.mapMessage("��ͨ����ӽ��븱������Ҫ30~60�������2~5��������������ս�����У����ܹ������ "+cm.getboss()+" �Σ�");		
				cm.dispose();
			} else if (!cm.isLeader()) { // �����鳤
				cm.sendOk("���������ս�����öӳ�����˵����");	
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
				if (next) { //���ػ�ű�
					var em = cm.getEventManager("longw");
					cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[��Ҷ֮��]" + " : " + " [" + cm.getPlayer().getName() + "]�����˸�����ͼ.��" + cm.getC().getChannel() + "Ƶ��",true).getBytes()); 
                                         cm.getChar().setsg2(1);
					if (em == null) {
						cm.sendOk("�޷���������ű�����ȷ�������Ƿ�����");
					} else {
						if (cm.getLevel() > 1 ) {
							em.startInstance(cm.getParty(),cm.getPlayer().getMap());
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
							for (var mapid = 970040109; mapid <= 970040109; mapid++) {
								playersInPQ += cm.countPlayersInMap(mapid);
							}
							
						}
					}
					cm.dispose();
				} else {
					cm.sendNext("#r��Ҫ��ӳ�Ա:" + minPartySize + " ����ҡ� �ȼ���Χ,��� " + minLevel + "�� ��� " + maxLevel + "��.\r\n\r\n#k#b�������С���Ƿ�ﵽ������������");
					cm.dispose();
				}
			}
		}
	}
}



