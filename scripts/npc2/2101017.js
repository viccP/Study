function start() {
	cm.sendSimple("�n���}�F�� ?~�|�M�����W���u��\r\n#L0#�i�h����\n\#l\r\n#L1#�~��ݦb�o����\n\#l");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if (cm.getLevel() >= 30) {
			if (cm.haveItem(2100067)) {
				cm.removeAll(2100067);
			}
			cm.warp(102000000, 0);
			cm.dispose();
		} else {
			cm.sendNext("�A�������٤���30�ŭ�");
			cm.dispose();
		}
	} else if (selection == 1) {
		if (cm.getLevel() >= 30) {
			cm.sendOk("���~��[�o�o");
			cm.dispose();
		} else {
			cm.sendNext("�A�������٤���30�ŭ�");
			cm.dispose();
}
}
}