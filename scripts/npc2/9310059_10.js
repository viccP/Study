/*
 *
*/

var status = 0;

var minLevel = 1; //��͵ȼ�
var maxLevel = 200; //��ߵȼ�

var minPartySize = 1; //���ٳ�Ա
var maxPartySize = 1; //����Ա

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
				cm.sendOk("#d���������ս����ӵ���Լ��Ķ��飡");				
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
					var em = cm.getEventManager("cangbaojd");
                                        cm.gainItem(5252001, -1);
					cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[�ر��]" + " : " + " [" + cm.getPlayer().getName() + "]�����˸�����ͼ.��" + cm.getC().getChannel() + "Ƶ����ģʽΪ[��ͨ]",true).getBytes()); 
                                         //cm.getChar().setsg2(1);
					if (em == null) {
						cm.sendOk("�޷���������ű�����ȷ�������Ƿ�����");
					} else {
						if (cm.getLevel() > 1 ) {
							em.startInstance(cm.getParty(),cm.getPlayer().getMap());
							
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



