/* Author: Xterminator (Modified by RMZero213)
	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			qm.sendNext("��ӭ����#b��֮��#k.��");
		} else if (status == 1) {
			qm.sendNextPrev("�������һ���̹٣��ҽ�#b�޽�#k������ָ������ɵ�һ��#b����#k�����Ի�úý���Ŷ��");
		} else if (status == 2) {
			qm.sendAcceptDecline("���Ƿ�Ը��������#b�޽���ƻ��#k������");
		} else if (status == 3) {
			if (qm.getPlayer().getHp() >= 50) {
				qm.getPlayer().setHp(25);
				qm.getPlayer().updateSingleStat(net.sf.cherry.client.MapleStat.HP, 25);
			}
			if (!qm.haveItem(2010007)) {
				qm.gainItem(2010007, 1);
			}
			qm.startQuest();
			qm.sendNext("�ף��ҵ�#bHP#k��ô���25�ˣ����С������޽ܸ�����һ��ƻ�����ǲ������ҳ���ȥ��",2);
		} else if (status == 4) {
			qm.sendPrev("û���Ҹ������ʹ��ҩˮ�ָ�HPֵ����ɺ��ҽ�����������ӵĲ��ϣ������û��������������һ��������ӵ��������û�취����ˣ���Ϊ#b���Ӳ����������#k��");
		} else if (status == 5) {
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (qm.getPlayer().getHp() < 50) {
				qm.sendNext("֪����λָ�hp��?");
				qm.dispose();
			} else {
				qm.sendNext("HPû���ˣ���ͻ�������Ŷ��");
			}
		} else if (status == 1) {
			qm.sendNextPrev("��Ҳ��˵�ϻ��ˣ���һ���Ϳ��Ի�ý����ˣ�");
		} else if (status == 2) {
			qm.sendNextPrev("����~�㿴������Ϊ����׼������ô�ཱ���أ�#b����������#k���Բ鿴����ÿ�ս���Ŷ��\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n#v4031161# 1 ����˿��\r\n#v4031162# 1 ��ľ��\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
		} else if (status == 3) {
			qm.gainExp(10);
			qm.gainItem(2010000, 3);
			qm.gainItem(4031161,1);//����˿��
			qm.gainItem(4031162,1);//��ľ��
			qm.gainItem(2010009, 3);
			qm.completeQuest();
			qm.dispose();
		}
	}
}