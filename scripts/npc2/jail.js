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
			cm.sendYesNo("哈囉! 妳要去探監嗎?");
		} else if (status == 1) {
		if (cm.getVisitor() == 0) {
			cm.setVisitor(1);
			cm.warp(980000404, 0);
			cm.sendOk("好~你現在去探監人員. 好好玩!");
			cm.dispose();
		} else if (cm.getVisitor() == 1) {
		cm.sendOk("錯誤! 妳是探監人員但是人不在監獄. 請稍後再嘗試.");
		cm.setVisitor(0);
		cm.dispose();
	    }
}	
}
}