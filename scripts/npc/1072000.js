/* Warrior Job Instructor
	Warrior 2nd Job Advancement
	Victoria Road : West Rocky Mountain IV (102020300)
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
	if (cm.getQuestStatus(100004) == 1) {
	    cm.sendOk("��Ҫ�ռ� #b30 #t4031013##k.ף�����.");
	    status = 3;
	} else {
	    if (cm.getQuestStatus(100004) == 2) {
		cm.sendOk("You're truly a hero!");
		cm.safeDispose();
	    } else if (cm.getQuestStatus(100003) >= 1) {
		cm.completeQuest(100003);
		if (cm.getQuestStatus(100003) == 2) {
		    cm.sendNext("�ۣ����ɶ�תתְ��������?");
		}
	    } else {
		cm.sendOk("�����׼�����ˣ��������Ұ�");
		cm.safeDispose();
	    }
	}
    } else if (status == 1) {
	cm.sendNextPrev("����Ҫ֤�����Լ��𣿣���")
    } else if (status == 2) {
	cm.askAcceptDecline("�һ����һ�λ��ᣬ��׼��������.");
    } else if (status == 3) {
	cm.startQuest(100004);
	cm.sendOk("��Ҫ�ռ� #b30 #t4031013##k.ף�����.")
    } else if (status == 4) {
	//	    cm.gainItem(4031008, -1);
		cm.warp(108000300,0);
	cm.dispose();
    }
}	