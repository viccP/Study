function start() {
	cm.sendSimple("想要去和朋友PVP嗎 ?\r\n#L0#普通模式PVP\n\#l\r\n#L1#納西沙漠競技場(會清除身上炸彈)\n\#l");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if (cm.getLevel() >= 30) {
			cm.sendOk("請自行移動到第四頻道.");
			cm.dispose();
		} else {
			cm.sendNext("你的等級還不到30級唷");
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
			cm.sendNext("你的等級還不到30級唷");
			cm.dispose();
}
}
}