/*
 Made by XiuzSu
 Credits to watzmename
*/
importPackage(net.sf.odinms.server);

var status;
var choice;

function start() {
	status = -1;
	action(1, 0, 0);
} 

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
	if (status == 0)
		cm.sendNext("�� �ڬO�ӤH�D��޲z��!");
	else if (status == 1)
		if (cm.hasTemp()) {
			if (cm.getHiredMerchantItems(true)) {
				cm.sendOk("�A�}�ө����F�� �N����A�����F �]�|�b�ڳo!");
				cm.dispose();
			} else {
				cm.sendOk("�ЪťX�@�ǪŶ� �n���ڧ�F���٧A.");
				cm.dispose();
			}
		} else {
			cm.sendSimple("�A�Q�n����ƻ�?\r\n\r\n#b#L0#��#l\r\n#L1#���~#l");
		}
	else if (status == 2) {
		cm.sendNext("���ڧ���~~...");
		choice = selection;
	} else {
		if (choice == 0) {
			if (status == 3) {
				var mesoEarnt = cm.getHiredMerchantMesos();
				if (mesoEarnt > 0)
					cm.sendYesNo("�A�ثe�ȤF "+mesoEarnt+" mesos ��. �A�n��^�h��?");
				else {
					cm.sendOk("�A�S�Ȩ��");
					cm.dispose();
				}
			} else if (status == 4) {
				cm.sendNext("�P�±z���ϥ�, �z�������٧A�F.");
				cm.gainMeso(cm.getHiredMerchantMesos());
				cm.setHiredMerchantMesos(0);
				cm.dispose();
			}
		} else {
			if (cm.getHiredMerchantItems(false)) {
				cm.sendOk("�P�±z���ϥ�, �z���˳Ƴ��٧A�F.");
				cm.dispose();
			} else {
				cm.sendOk("�ЪťX�@�ǪŶ� �n���ڧ�˳Ƶ��A.");
				cm.dispose();
			}
		}
	}
}