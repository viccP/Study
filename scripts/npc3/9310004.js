//cherry_MS
importPackage(net.sf.cherry.client);

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
			cm.sendNext("��������ִ����������ף�������������");
		}
		else if (status == 1) {
			cm.warp(701010321, 0);
			cm.dispose();
		}else{
			cm.sendOk("�������ɡ�����������");
			cm.dispose();
		}
	}
}	
