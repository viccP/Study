/*
	Thief Job Instructor - Thief's Construction Site (108000400)
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }

    if (status == 0) {
if(!cm.canHold(4031012,1)){
			cm.sendOk("��������ı��������ٿճ�2��λ�ã�");
	} else if (cm.haveItem(4031013,30)) {
	    cm.removeAll(4031013);
	    cm.completeQuest(100010);
	    cm.startQuest(100011);
	cm.gainItem(4031012, 1);
	cm.warp(103000003, 0);
	    cm.sendOk("��ϲ���ռ��ɹ��������ȥ��1ת�̹����תְ�ˣ�����.");
	cm.dispose();
	} else {
	    cm.sendOk("��Ҫ�ռ� #b30 #t4031013##k.ף�����.")
	    cm.safeDispose();
	}
    } else if (status == 1) {
	cm.dispose();
    }
}	