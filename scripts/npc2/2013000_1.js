var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {//��0������
			
			cm.sendNext("#r��ӭ������һ�أ���������Ҫ�Ѽ�10��#v4031309#�������ٻ�����һ�صĹ��#k");
		} else if (status == 1) {//��һ������
		
			var party = cm.getParty().getMembers();//����Ϊ�������
			if(cm.haveItem(4001063,10)){//�ж���Ʒ
			cm.sendNext("#b��������Ƭ,����ӳ�Ա"+party.size()+"�ˡ����Ի��"+party.size()+"��ͨ��֤��#d�ҿ��Դ�����ȥ��һ���ˣ�\r\n#e�����ͨ��֤��ͨ��֤��ӳ����Ÿ���Աÿ��һ����Ȼ�����ҶԻ����д��͡�#k");
			}else if(cm.haveItem(4001008,1)){
			cm.gainExp(+200000);
			cm.warp(920010400);
			cm.removeAll(4001008);
			cm.dispose();
			cm.showEffect("quest/party/clear");//����ͨ��Ч��
			}else{
				cm.sendOk("û�У�");
				cm.dispose();
			}
		}else if(status == 2){//�ڶ�������
			var party = cm.getParty().getMembers();//����Ϊ�������
			var size = party.size();
			cm.gainItem(4001063,-10);
			cm.sendOk("��ӳ�Ա"+party.size()+"�ˡ����Ի��"+party.size()+"��ͨ��֤.\r\n��Ʒ#v4001063# ����10�����ٴζԻ�������һ�ء�");
			cm.gainItem(4001008,+size);
			cm.dispose();
		}
	}
}