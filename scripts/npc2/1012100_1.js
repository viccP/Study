/* Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)
*/

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
			cm.sendOk("���������������Щ��");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getJob() == 0) {
				if (cm.getLevel() >= 10)
					cm.sendNext("���Ƿ����Ϊһö#b������#k��");
				else {
					cm.sendOk("��Ŭ��һ�㣬�ҿ��������Ϊ������ְҵ.")
					cm.dispose();
				}
			} else {
				if (cm.getLevel() >= 30 && cm.getJob() == 300) {
					status = 10;
					cm.sendNext("��Ľ��������ҳԾ���.");
				} else if (cm.getLevel() >= 70 && (cm.getJob() == 310 || cm.getJob() == 320)) {
					cm.sendOk("��ת��ȥ����ѩ��ĳ��Ϲ���");
					cm.dispose();
				} else if (cm.getLevel() < 30 && cm.getJob() == 300) {
					cm.sendOk("����Ҫ30���ſ��Ժ��ҶԻ���ת��");
					cm.dispose();
				} else if (cm.getLevel() >= 120 && (cm.getJob() == 311 || cm.getJob() == 321)) {
					cm.sendOk("����ѩ���Ϲ���");
					cm.dispose();
				} else {
					cm.sendOk("���ѡ�������ǵġ�");
					cm.dispose();
				}
			}
		} else if (status == 1) {
			cm.sendNextPrev("����һ����Ҫ�ĺ����յ�ѡ���㽫�޷���ͷ.");
		} else if (status == 2) {
			cm.sendYesNo("��ȷ����Ϊһö#b������#k��");
		} else if (status == 3) {
			if (cm.getJob() == 0) {
				//cm.getPlayer().updateSingleStat(MapleStat.STR, 4, false);
				//cm.getPlayer().updateSingleStat(MapleStat.DEX, 4, false);
				//cm.getPlayer().updateSingleStat(MapleStat.INT, 4, false);
				//cm.getPlayer().updateSingleStat(MapleStat.LUK, 4, false);
				//cm.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, 0, false);
				cm.changeJob(300);
			}
			cm.sendOk("��ϲ�㣬�������ǹ������ˣ�.");
			cm.dispose();
		} else if (status == 11) {
			cm.sendNextPrev("������תְ��Ϊ��\r\n#r����#k or #r����#k.");
		} else if (status == 12) {
			cm.sendSimple("�ܲ���ѡ��һ����Ķ�תְҵ?#b\r\n#L0#����#l\r\n#L1#������#k");
		} else if (status == 13) {
			var jobName;
			if (selection == 0) {
				jobName = "����";
				job = 310;
			} else {
				jobName = "����";
				job = 320;
			}
			cm.sendYesNo("�����Ϊһ�� #r" + jobName + "#k?");
		} else if (status == 14) {
			cm.changeJob(job);
			cm.sendOk("��ϲ�㣡תְ�ɹ���");
			cm.dispose();
		}
	}
}	
