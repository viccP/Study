/*
��߳�Ƥ������Ա
��֮��
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
			cm.sendSimple("��ӭ���٣���ӭ����������߳ǻ������ġ����ǲ���ϣ��ӵ������һ�������������ļ����أ��������#b#t5153002##k���ǿ���Ϊ�㾫�Ļ����������������ǵ���������ô��Ҫ��Ҫ��һ�ԣ�\r\n\#L2##b�ı��ɫ#k(ʹ��#b#z5153002##k)#l");
		} else if (status == 1) {
			if (selection == 1) {
				cm.dispose();
			} else if (selection == 2) {
				cm.sendStyle("���������⿪���Ļ����ɲ鿴�������Ч���ޣ��뻻��ʲô����Ƥ���أ���ѡ��~", skin, 5153002);
			}
		} else if (status == 2) {
			cm.dispose();
			if (cm.isCash()) {
                            if (cm.getPlayer().getCSPoints(1)>=480) {
                                  cm.getPlayer().modifyCSPoints(1,-480);
				  cm.setSkin(skin[selection]);
				  cm.sendOk("�����,����������̾����·�ɫ��!");
			    } else {
				  cm.sendOk("�������㲢û�����ǵĻ�Ա��,�ҿ��²��ܸ��㻤��,�Һܱ�Ǹ.�����ȹ����.");
			    }
                        } else if (cm.haveItem(5153002) == true) {
				cm.gainItem(5153002, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("�����,����������̾����·�ɫ��!");
			} else {
				cm.sendOk("�������㲢û�����ǵĻ�Ա��,�ҿ��²��ܸ��㻤��,�Һܱ�Ǹ.�����ȹ����.");
			}
		}
	}
}
