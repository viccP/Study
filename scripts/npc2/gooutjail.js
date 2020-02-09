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
			cm.sendYesNo("哈囉! 你想要離開監獄了嗎??");
		} else if (status == 1) {
		if (cm.getVisitor() == 1) {
		    cm.setVisitor(0);
			cm.warp(910000000, 0);
			cm.sendOk("妳已經成功離開. 好好玩!");
			cm.dispose();
		} else if (cm.getVisitor() == 0) {
		cm.sendOk("對不起你在監獄中服刑!");
		cm.dispose();
	    }
    }
}
}
