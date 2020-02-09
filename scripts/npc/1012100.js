/* Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)

	Custom Quest 100000, 100002
*/

importPackage(net.sf.odinms.client);

var status = 0;
var job;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 2) {
			cm.sendOk("Make up your mind and visit me again.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getJob() == 0) {
				if (cm.getLevel() >= 10){
					cm.sendNext("�����������Ϊһ�� #r������#k?");
				} else {
					cm.sendOk("���е�࣬�ҿ��Ը�����ķ�ʽ #r����#k.")
					cm.dispose();
				}
			} else {
				if (cm.getLevel() >= 30 && cm.getJob() == 300) {
					if (cm.haveItem(4031012,1)) {
						cm.completeQuest(100002);
						if (cm.getQuestStatus(100002) == 2) {
							status = 20;
							cm.sendNext("�ҿ������úܺá��һ����������������·��������һ��.");
						} else {
							cm.sendOk("ȥ���� #r�����ֶ�ת�̹�#k.")
							cm.dispose();
						}
					} else {
						status = 10;
						cm.sendNext("����ȡ�õĽ����Ǿ��˵�.");
					}
				} else if (cm.getQuestStatus(100100) == 1) {
					cm.completeQuest(100101);
					if (cm.getQuestStatus(100101) == 2) {
						cm.sendOk("�ðɣ����ڰ�������� #b��ת�̹����ڵ�#k.");
					} else {
						cm.sendOk("��, " + cm.getChar().getName() + "! ����Ҫ #bӢ��ѫ��#k. ȥѰ��ά�ȵ���.");
						cm.startQuest(100101);
					}
					cm.dispose();
				} else {
                                    if(cm.haveItem(4031380,1)){
                                        cm.sendOk("���Ȼ������#v4031380#��OK�����������ǽ�������ɡ������ҵķ����Ѿ������ˣ����������ɡ�Ӯ�˿��Ի��#b�ڷ�#kһ��\r\n(#v4031380#�Ѿ�ɾ����������ʧ�ܣ�����ȥ��ת�̹ٻ�ȡ��)");
                                        cm.spawnMonster(9001002,1);
                                        cm.gainItem(4031380,-1);
                                        cm.dispose();
                                    }else{
					cm.sendOk("��ã��ټ�.");
					cm.dispose();
				}
                            }
			}
		} else if (status == 1) {
			cm.sendNextPrev("����һ����Ҫ�ĺ�����ѡ���㽫�޷���ͷ��");
		} else if (status == 2) {
			cm.sendYesNo("�����Ϊһ�� #r������#k?");
		} else if (status == 3) {
			if (cm.getJob() == 0)
				cm.changeJob(300);
			cm.gainItem(1452002, 1);//����
			cm.gainItem(2060000, 1000);//��ʧ
			cm.sendOk("���ͼ���.");
			cm.dispose();
		} else if (status == 11) {
			cm.sendNextPrev("�����׼����ȡ��һ�� #r����#k or #r����#k.")
		} else if (status == 12) {
			cm.sendAcceptDecline("�������ұ��������ļ��ܡ���׼��������");
		} else if (status == 13) {
			if (cm.haveItem(4031010)) {
				cm.sendOk("Please report this bug at = 13");
			} else {
				cm.startQuest(100000);
				cm.sendOk("ȥ�� #bתְ�̹�#k ���ִ帽�������������ķ�ʽ��");
			}
		} else if (status == 21) {
			cm.sendSimple("�����Ϊʲô��#b\r\n#L0##r����#l\r\n#L1##r����#l#k");
		} else if (status == 22) {
			var jobName;
			if (selection == 0) {
				jobName = "����";
				job = 310;
			} else {
				jobName = "����";
				job = 320;
			}
			cm.sendYesNo("�����Ϊһ��#r" + jobName + "#k?");
		} else if (status == 23) {
			cm.changeJob(job);
			cm.gainItem(4031012, -1);//����
			cm.sendOk("��ϲ��ɹ�תְ��");
cm.����(3, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�2ת����������Ҫ����ˣ�");
			cm.dispose();
		}
	}
}	
