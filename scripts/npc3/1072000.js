/* Warrior Job Instructor (OUTSIDE)
	Warrior 2nd Job Advancement
	Victoria Road : West Rocky Mountain IV (102020300)
*/

/** Made by xQuasar **/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if ((status == 0 || status == 1) && mode == 0) {
		cm.sendOk("�Ҿ�ЦЦ����˵��");
		cm.dispose();
	} else if (status == -1) {
		if (cm.haveItem(4031008) && (!cm.haveItem(4031013))) {
			status = 0;
			cm.sendNext("û�����ٽŴ�����?");
		} else if (cm.haveItem(4031008) && cm.haveItem(4031013)) {
			cm.sendOk("���������������������ͺ�˵��");
			cm.dispose();
		} else {
			cm.sendOk("սʿ��·����һ���ǳ�Σ�յĵ�·��..");
			cm.dispose();
		}
	} else if (status == 0) {
		status = 1;
		cm.sendYesNo("�Ҵ��������ѵ��������Ҫ���ռ�30������֤�����ʵ��.");
	} else if (status == 1) {
		status = 2;
		cm.sendOk("�������߻����˳��ˣ���Ҫȥ1ת�̹�����һ���ż�.");
	} else if (status == 2) {
		cm.gainItem(4031008,-1);
		cm.warp(108000300,0);
		cm.dispose();
	} else {
		cm.dispose();
	}
}