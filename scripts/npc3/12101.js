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
			cm.sendNext("������λ�ڲʺ絺�������Ľ�#b�ʺ��#k�Ĵ���...���Ѿ�֪���ʺ絺��������ϰ�ĵط���?����ֻ���ֱȽ����Ĺ���,��������İ�.");
		} else if (status == 1) {
			cm.sendNextPrev("�����ϣ����ø�ǿ��,��ȥ#b�ϸ�#k,������˴�ȥ#b������#k.�Ǹ����Ĺ�ģ�ܴ�,������ǱȲ��ϵ�.");
		} else if (status == 2) {
			cm.sendPrev("��˵�ڽ���������ѧ��ר�ŵ�ְҵ����.�����ǽ�#b��ʿ����#k����...? ����˵���ﻹ�зǳ������ĸ�ԭ��ׯ,�������кܶ�սʿ.�Ǹ�ԭ...��������ô���ĵط���?");
		} else if (status == 3) {
			cm.dispose();
		}
	}
}