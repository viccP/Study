function start() {
	cm.sendSimple("要離開了嗎 ?~會清除身上炸彈唷\r\n#L0#勇士之村\n\#l\r\n#L1#繼續待在這閒晃\n\#l");
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
			cm.sendNext("你的等級還不到30級唷");
			cm.dispose();
		}
	} else if (selection == 1) {
		if (cm.getLevel() >= 30) {
			cm.sendOk("那繼續加油囉");
			cm.dispose();
		} else {
			cm.sendNext("你的等級還不到30級唷");
			cm.dispose();
}
}
}