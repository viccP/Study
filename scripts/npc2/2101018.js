function start() {
	cm.sendSimple("�Q�n�h�M�B��PVP�� ?\r\n#L0#���q�Ҧ�PVP\n\#l\r\n#L1#�Ǧ�F�z�v�޳�(�|�M�����W���u)\n\#l");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if (cm.getLevel() >= 30) {
			cm.sendOk("�Цۦ沾�ʨ�ĥ|�W�D.");
			cm.dispose();
		} else {
			cm.sendNext("�A�������٤���30�ŭ�");
			cm.dispose();
		}
	} else if (selection == 1) {
		if (cm.getLevel() >= 30) {
			if (cm.haveItem(2100067)) {
				cm.removeAll(2100067);
			}
			cm.warp(980010101, 0);
			cm.dispose();
		} else {
			cm.sendNext("�A�������٤���30�ŭ�");
			cm.dispose();
}
}
}