/*
 *������������ű�
*/

var status = 0;
//��͵ȼ�
var minLevel = 1; 
//��ߵȼ�
var maxLevel = 200; 

var minPartySize = 2; //���ٳ�Ա
var maxPartySize = 2; //����Ա

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
                    if(cm.getMapId()== 920010000){
                       cm.openNpc(2013000,1);
				//cm.dispose();
                    }
			// �������һ�������.û�е���.ֱ�Ӽ���������
			else if (cm.getParty() == null) { // �������
				cm.sendOk("���û���˵��ë");			//cm.mapMessage("��ͨ����ӽ��븱������Ҫ30~60�������2~5��������������ս�����У����ܹ������ "+cm.getboss()+" �Σ�");		
				cm.dispose();
			} else if (!cm.isLeader()) { // �����鳤
			var name = cm.getPlayer().getParty().getLeader().getPlayer().getName();
				cm.sendOk("���Ⱥ��䣬˧����ţ");
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[����]" + " : " + " [" + name + "]��["+cm.getPlayer().getName()+"]�ɹ����.",true).getBytes()); 
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
					var name = cm.getPlayer().getParty().getLeader().getPlayer().getName();
					cm.sendOk(+name);
					cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[����]" + " : " + " [" + name + "]��С�鿪ʼ��Ů����ս����" + cm.getC().getChannel() + "Ƶ��",true).getBytes()); 
						
					cm.dispose();
				} else {
					cm.sendOk("��;���2�ˣ����Ҳ��2�ˣ�3�˾���3P��һ�˾���BT���ؿ�ζ�Ƶ���")
					cm.dispose();
				}
			}
		}
	}
}



