/*
	Bowman Job Instructor - Ant Tunnel For Bowman (108000100)
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
if(!cm.canHold(4031012,1)){
			cm.sendOk("��������ı��������ٿճ�2��λ�ã�");
	} else if (cm.haveItem(4031013,30)) {
	    cm.removeAll(4031013);
	    cm.completeQuest(100001);
	    cm.startQuest(100002);
	cm.gainItem(4031012, 1);
	cm.warp(100000201, 0);
	    cm.sendOk("��ϲ���ռ��ɹ��������ȥ��1ת�̹����תְ�ˣ�����.");
	cm.dispose();
	} else {
	    cm.sendOk("���ռ� #b30 #t4031013##k.���ң�ף����ˣ�")
	    cm.dispose();
	}
    } else if (status == 1) {
	cm.dispose();
    }
}	