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
			// �������һ�������.û�е���.ֱ�Ӽ���������
               if (cm.getParty() == null) { // �������
				cm.sendOk("���û���˵��ë");			
				cm.dispose();
			} else if (!cm.isLeader()) { // �����鳤
			
			var name = cm.getPlayer().getParty().getLeader().getPlayer().getName();
			var name2 = cm.getPlayer().getName();
			if(cm.getPlayer().getParty().getLeader().getPlayer().getvip() == 1 || cm.getPlayer().getvip() >= 1){
				cm.sendOk("��û�и���ѻ��˻����ң�");
				cm.dispose();
                                return;
			}
				cm.mapMessage(""+name2+"�Ѿ���"+name+"�ɹ���飡");
				//cm.getPlayer().getParty().getLeader().getPlayer().setvip(1);
				//cm.getPlayer().setvip(1);
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[����]" + " : " + " �������ϣ��������£��������С��ң��������ˣ������������˽�Ϊ�Ϸ����ޡ�С����Բ��������֮�ࡢ�����˼ң������Ÿ߰˶���ѧ���峵���ָ�»ԧ��Ե����������ż��ɣ�����赺ϡ�",true).getBytes()); 
//				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[����]" + " : " + " �ң��������ˣ������������˽�Ϊ�Ϸ����ޡ���",true).getBytes());
//				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[����]" + " : " + " С����Բ��������֮�ࡢ�����˼ң������Ÿ߰˶���ѧ���峵��",true).getBytes()); 
//				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[����]" + " : " + " �ָ�»ԧ��Ե����������ż��ɣ�����赺ϡ�",true).getBytes()); 
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[����]" + " : " + " ף ��"+name+"�� �� ��"+name2+"�� ����ͬ�ģ�����úϣ�����ǧ����۸���ƶ��ͬ��ͬ�ġ���ɪ�������ྴ�����",true).getBytes()); 
				cm.��Ӵ���(700000200);
				cm.sendOk(""+name2+",���Ѿ���"+name+"�ɹ���飡");
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
					cm.sendOk("���ʱ����Ҫ�����һ�������~����������ˣ���Ȼ��ƻ顣"+cm.getPlayer().getParty().getLeader().getPlayer().getvip()+" ");		
					cm.dispose();
				} else {
					cm.sendOk("��;���2�ˣ����Ҳ��2�ˣ�3�˾���3P��һ�˾���BT���ؿ�ζ�Ƶ���")
					cm.dispose();
				}
			}
		}
	}
        }



