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
			cm.sendYesNo("���o! �p�n�h���ʶ�?");
		} else if (status == 1) {
		if (cm.getVisitor() == 0) {
			cm.setVisitor(1);
			cm.warp(980000404, 0);
			cm.sendOk("�n~�A�{�b�h���ʤH��. �n�n��!");
			cm.dispose();
		} else if (cm.getVisitor() == 1) {
		cm.sendOk("���~! �p�O���ʤH�����O�H���b�ʺ�. �еy��A����.");
		cm.setVisitor(0);
		cm.dispose();
	    }
}	
}
}