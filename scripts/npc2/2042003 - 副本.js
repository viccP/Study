// NPC Name: Assistant Red
// NPC Purpose: Warps you to 109040000 Fitness JQ
// MrDk/Useless

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("һ��������Ƿ�Ҫ�μӻ򲻸���˵��!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("��ӭ����#b������껪#k, #h #!");
		} else if (status == 1) {
			cm.sendNextPrev("�������Ǿ���һ�������¼���#k");
		} else if (status == 2) {
			cm.sendNextPrev("��һЩ���������ǿ�ʼ֮ǰ:\r\n#r-��ĵȼ�Ҫ���� 30\r\n-��������ˣ���Ͳ�����\r\n-�����ӵ����ǽֱ����һ��֪ͨ#n");
		} else if (status == 3) {
			cm.sendNextPrev("#e#r���ӹ�����ܻᵼ��һ����������!#k#n");
		} else if (status == 4) {
			if (cm.getLevel() >= 30) {
				cm.sendSimple("����ȥ�μӹ�����껪��\r\n#L0##b�ǵģ���Ҫ�μӣ�#k#l\r\n\r\n#L1#�����һ�û���Ǻã�#l");
			}
			else {
				cm.sendOk("��������Ҫ��ʮ�����ϣ�");
				cm.dispose();
			}
		} else if (status == 5) {
			if (selection == 0) {
				cm.sendNext("Ŷ��������֮ǰ!\r\n�������#b���Ʊ#k!����Ը��ҵ�����#r�˵���#k һ������ɵ��¼�����������һ��С������!");
			}
			else if (selection == 1) {
				cm.sendOk("Alright, see you next time!");
				cm.dispose();
			}
		} else if (status == 6) {
			cm.warp(109040000, 0);
			cm.gainItem(5220001, -cm.itemQuantity(5220001));
			cm.gainItem(5220001, 1);
			cm.dispose();
		}
	}
}