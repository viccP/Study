/* Thief Job Instructor
	Thief 2nd Job Advancement
	Victoria Road : Construction Site North of Kerning City (102040000)
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0 && cm.getQuestStatus(100010) == 1) {
	status = 3;
    }
    if (status == 0) {
	if (cm.getQuestStatus(6141) == 1) {
	    var ddz = cm.getEventManager("DLPracticeField");
	    if (ddz == null) {
		cm.sendOk("Unknown error occured");
		cm.safeDispose();
	    } else {
		ddz.startInstance(cm.getPlayer());
		cm.dispose();
	    }
	} else if (cm.getQuestStatus(100010) == 2) {
	    cm.sendOk("You're truly a hero!");
	    cm.safeDispose();
	} else if (cm.getQuestStatus(100009) >= 1) {
	    cm.completeQuest(100009);

	    if (cm.getQuestStatus(100009) == 2) {
		cm.sendNext("����Ҫ��ת�𣿣���");
	    }
	} else {
	    cm.sendOk("���ܸ���һ�λ��ᣬ��׼��������.");
	    cm.safeDispose();
	}
    } else if (status == 1) {
	cm.sendNextPrev("����Ҫ��ת�𣿣�.")
    } else if (status == 2) {
	cm.askAcceptDecline("���ܸ���һ�λ��ᣬ��׼��������.");
    } else if (status == 3) {
	cm.startQuest(100010);
	//cm.warp(910370000, 0);
		   // cm.gainItem(4031011, -1);
	cm.sendOk("��ȥ�Ժ��ռ�#b30 #t4031013##k. ף�����.")
    } else if (status == 4) {
		cm.warp(108000400,0);
	cm.dispose();
    }
}	