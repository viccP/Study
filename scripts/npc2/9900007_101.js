var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.sendNext("��ô�õ�ϵͳ�㲻��Ҫ��");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("HI����ӭ����#b��֮��#k�����������Ҹ������һ��#d�ƹ�ϵͳ#k��#d�ƹ�ϵͳ#k����˼�壬������С���һ��ð�ա�\r\n#rÿ���˶����Լ���#b�ƹ���#r���һ����һ��#bû�����ֵĺ���#r��˫������#d��д�ƹ���#r��#d�鿴�Լ����ƹ���#r��\r\n#b�ƹ�ķֺ�Ϊ10%���ֺ졣\r\n#k���磺�����#b1234#k���ƹ��ˡ����ֵ#b1000 ���#k��#b1234#k�Ϳ����õ� #b100 ���#k�ķֺ졣");
	} else if (status == 1) {
		if (cm.getChar().getPresent() == 0) {
			cm.gainItem(5530000,1);
			cm.getChar().setPresent(1);
			cm.getChar().saveToDB(true,true);
			cm.sendOk("��ȡ��ɣ�˫�����ɴ򿪣�\r\n#ePS:��д�ƹ����벻Ҫ��д����ÿ���˺�ֻ����ȡһ�����ӣ���д�����˽��޷�ʹ�øù��ܣ�");
			cm.dispose();
		} else {
			cm.sendOk("ÿ���ʺ�ֻ������ȡ#b1��#k�����Ѿ���ȡ���ˣ�");
			cm.dispose();
		       }	
		}
	}
}
