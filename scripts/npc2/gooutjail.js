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
		if (status == 0) {
			cm.sendYesNo("���o! �A�Q�n���}�ʺ��F��??");
		} else if (status == 1) {
		if (cm.getVisitor() == 1) {
		    cm.setVisitor(0);
			cm.warp(910000000, 0);
			cm.sendOk("�p�w�g���\���}. �n�n��!");
			cm.dispose();
		} else if (cm.getVisitor() == 0) {
		cm.sendOk("�藍�_�A�b�ʺ����A�D!");
		cm.dispose();
	    }
    }
}
}
