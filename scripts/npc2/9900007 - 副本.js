var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		//cm.sendNext("ʥ������ ��");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("�����쳤������Ҫ�����\r\nף�����쳤�ؾã�");
	} else if (status == 1) {
		var party = cm.getParty().getMembers();
		if (cm.getParty() == null) {
				cm.sendOk("�����İ��˿����飡");	
                cm.dispose();
			} else if (!cm.isLeader()) { 
				cm.sendOk("���öӳ�����˵����");	
				cm.dispose();
			} else if (party.size() < 2 || party.size() > 2) { 
				cm.sendOk("������2���ˣ�");	
				cm.dispose();
			} else if (!cm.jhpd()) { 
				cm.sendOk("���������ǲ������˽���ˣ�\r\n���߶����������ԣ�");	
				cm.dispose();
			}else if(!cm.partyMemberHasItemJH(1112001) || !cm.partyMemberHasItemJH(1112002)) { 
				cm.sendOk("��������ǵĽ���ָ��");	
				cm.dispose();
			} else {
				//cm.jh(1, cm.getPlayer().getId())
                cm.warpParty(700000100, 0);
                cm.dispose();
		       }	
		}
	}
}