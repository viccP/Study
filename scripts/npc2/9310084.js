var status = 0;
var job;

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if ((mode == 0 && status == 2) || (mode == 0 && status == 13)) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("�ţ��Ƿ������#r��𽹬#k�ء�����Ҫ����һ��#v5090100#x99.");
		} else if (status == 1) {
			cm.sendYesNo("��ô������ȥ��#v5090100#�����ҵ�����Ҫ99��");
		} else if (status == 2) {
			if(cm.haveItem(5090100,99)){
			cm.gainItem(5090100,-99);
			cm.��Ӵ���(700000100);
			cm.dispose();
			}else{
			cm.sendOk("��Ǹ����û��#v5090100#x99��������������Թ���");
			cm.dispose();
			}
		}
	}
}	
