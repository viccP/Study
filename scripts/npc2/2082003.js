var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.sendOk("�������ﻹ������������û�а�����");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("�����뿪��ľ�壬ǰ�� #bʱ�����#k ������ǵĻ����ҿ��Դ������ͨ��ʱ������·����ô��������Ҫȥ��");
		} else if (status == 1) {
			cm.sendNext("�ܺã����������ھͳ����ɣ�");
		} else if (status == 2) {
			cm.warp(200090500, 0);
			cm.dispose();
		}
	}
}