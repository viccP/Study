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
			cm.openNpc(2000,1);
		} else if (status == 1) {
			cm.sendYesNo("�뻻����������1����ʮ��Ŷ��");
		} else if (status == 2) {
			if(cm.haveItem(4000188,1)){
				cm.gainItem(4000188,-1);
				cm.getPlayer().gainjf(+10);
				cm.sendOk("�����ɹ���");
					cm.dispose();
					}else{
					cm.sendOk("Ѽ�����㣬�������ɣ�");
cm.dispose();
				}
		}
	}
}	
