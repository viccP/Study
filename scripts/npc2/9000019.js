/*
 * @�̳�ѡ��npc ѡ���Ƿ�ص��̳ǻ���ȥ�Ĳ���
 * ������ - WNMS
 */
var status = 0;
var price = 1000000;
var skin = Array(1, 2, 3, 4, 9, 10);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple(" ��ѡ����Ҫִ�еĲ�����\r\n#L3##g��#r��Ա����#g��["+cm.getPlayer().getvip()+"]#l\r\n\r\n\#L1##b�������̻\r\n\r\n#L2##r����ð�յ�ONLINE�̳�#l");
		} else if (status == 1) {
			if (selection == 1) {//���̻
				cm.setlockitem(1,true);
			} else if (selection == 2) {
				cm.WarpShop();
			}else if (selection == 3) {
				cm.openNpc(9000019,2);
			}
		} else if (status == 2) {
			cm.WarpShop();
		
		}
	}
}
