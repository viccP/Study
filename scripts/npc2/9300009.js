/* Author: Xterminator
	NPC Name: 		���
	Map(s): 		Maple Road : �ʺ�� (1010000)
	Description: 		Talks about Amherst
*/
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
			cm.sendNext("��Ҫ��ȥ���������㵽�����г���ڡ�");
		} else if (status == 1) {
			cm.sendNextPrev("�����һ��뿪���");
		} else if (status == 2) {
			cm.warp(910000000);
			cm.dispose();
		} else if (status == 3) {
			cm.warp(910000000);
			cm.dispose();
		}
	}
}