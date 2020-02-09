/* Bowman Job Instructor (OUTSIDE)
	Bowman 2nd Job Advancement
	warning street - on the road to the dungeon: 106010000
*/

/** 
Made by xQuasar
**/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if ((status == 0 || status == 1) && mode == 0) {
		cm.sendOk("�ҿ��Ը�����Ŀ���תְ����");
		cm.dispose();
	} else if (status == -1) {
		if (cm.haveItem(4031010) && (!cm.haveItem(4031013))) { //����ż�
			status = 0;
			cm.sendNext("ԭ��������Ƽ���?");
		} else if (cm.haveItem(4031010) && cm.haveItem(4031013)) {
			cm.sendOk("���Ȼ���Ƽ��š��������ǽ����ҵĶ�ת���������.");
			cm.dispose();
		} else {
			cm.sendOk("һ�������ֵĳɳ���һ���ǳ����Ĺ���.");
			cm.dispose();
		}
	} else if (status == 0) {
		status = 1;
		cm.sendYesNo("��Ը�Ⳣ��������Ҫ�����30��������������õ��ҵ��Ƽ���.");
	} else if (status == 1) {
		status = 2;
		cm.sendOk("ף����ˣ��������߻��߹��ˣ���Ҫ�����õ��Ƽ��ţ�");
	} else if (status == 2) {
		cm.gainItem(4031010,-1);
		cm.warp(108000100,0);
		cm.dispose();
	} else {
		cm.dispose();
	}
}