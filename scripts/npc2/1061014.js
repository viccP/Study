importPackage(net.sf.cherry.client);

var status = 0;
var job;

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
			if(cm.getLevel() >= 50)
				cm.warp(925040100);
			else
			cm.sendOk("�ȼ�����50");
			cm.dispose();
		}
	}
}	
