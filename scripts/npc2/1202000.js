var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (cm.getPlayer().getMap().getId() == 140090000) { 
			if (cm.getAranIntroState("helper=clear") == false) {
				if (status == 0) {
					cm.sendNext("���������ˣ�", 8);
				} else if (status == 1) {
					cm.sendNextPrev("�������ǣ�", 2);
				} else if (status == 2) {
					cm.sendNextPrev("��һֱ�ڵ��㣬����������ͺ�ħ��ʦս����Ӣ��������", 8);
				} else if (status == 3) {
					cm.sendNextPrev("��������˵ʲô���㵽����˭��", 2);
				} else if (status == 4) {
					cm.sendNextPrev("�ȵȡ�������˭������ôʲô���벻����������������ͷ���ۣ�", 2);
				} else if (status == 5) {
					cm.updateAranIntroState2("helper=clear");
					cm.showWZEffect("Effect/Direction1.img/aranTutorial/face", -1);
					cm.showWZEffect("Effect/Direction1.img/aranTutorial/ClickLilin", -1);
					cm.dispose();
				}
			} else {
				if (status == 0) {
					cm.sendNext("������", 8);
				} else if (status == 1) {
					cm.sendNextPrev("�ҡ�����ʲô���ǲ����������������������˭��", 2);
				} else if (status == 2) {
					cm.sendNextPrev("��һ�㡣��ħ��ʦ����������ʧȥ�˼��䡭���������ò��ŵ��ġ�����֪�������飬�Ҷ���һһ�����㡣", 8);
				} else if (status == 3) {
					cm.sendNextPrev("�������ǵ�Ӣ�ۡ�������ǰ�����¸ҵغͺ�ħ��ʦս������������ð�յ����硣�����������ʱ�������˺�ħ��ʦ�����䣬���ⶳ�ڱ������˯�˺þúþá����ԣ�����Ҳ������ʧ�ˡ�", 8);
				} else if (status == 4) {
					cm.sendNextPrev("����ط��������������ħ��ʦ����ⶳ��������ں�ħ��ʦ�������£������ļ��仯��������Զ���Ǳ���ѩƮ���������ڱ��ߵ����������ġ�", 8);
				} else if (status == 5) {
					cm.sendNextPrev("�ҽ����գ��������һ�塣���һ��Ӻܾ���ǰ������Ԥ��������ȴ���Ӣ�۵Ĺ�����Ȼ�󡭡��������ڷ������㡣��������ط�����", 8);
				} else if (status == 6) {
					cm.sendNextPrev("���ǲ���һ��˵��̫�ࣿ���������Щ���ѣ�û��ϵ��������ͻ����ס���#b���ǸϽ��ش������#k���ش��ӵ�·�ϣ���������������͡�", 8);
				} else if (status == 7) {
					cm.warp(140090100, 1);
					cm.dispose();
				}
			}
		} else {
			if (status == 0) {
				cm.sendSimple("��ʲô����֪���������� #b#l\r\n#L0#����˭�� #l #l\r\n#L1#��������� #l #l\r\n#L2#����˭��#l#l\r\n#L3#����������Ӧ����Щʲô��#l #l\r\n#L4#����һ�±�����ʹ�á�#l #l\r\n#L5#������߼��ܣ�#l #l\r\n#L6#��������װ����#l #l\r\n#L7#����ʹ�ÿ�ݼ��� #l #l\r\n#L8#�������ܴ������ӣ�#l #l\r\n#L9#������������#l#k");
			} else if (status == 1) {
				if (selection == 0) {
					cm.sendNext("����������ǰ���Ӻ�ħ��ʦ��������ð�յ�������ڶ�Ӣ���е�һ������Ϊ����ħ��ʦ�������ʧȥ�����еļ��䡣");
					cm.dispose();
				} else if (selection == 1) {
					cm.sendNext("��������㱻����������˯�����������һ���캮�ض���С��������ľ�����Ϊ��졣");
					cm.dispose();
				} else if (selection == 2) {
					cm.sendNext("�������Ԥ��֮˵������ȴ������ѵ����һ������ա��Ժ�Ҳ��һֱ������򵼡�");
					cm.dispose();
				} else if (selection == 3) {
					cm.sendNext("��ϸ������˴���������˵�������ǲ���һֱ��������øϽ��ش����ֻҪ˳��ָʾ�ƣ����ܻص������");
					cm.dispose();
				} else if (selection == 4) {
					cm.displayGuide(14);
					cm.dispose();
				} else if (selection == 5) {
					cm.displayGuide(15);
					cm.dispose();
				} else if (selection == 6) {
					cm.displayGuide(16);
					cm.dispose();
				} else if (selection == 7) {
					cm.displayGuide(17);
					cm.dispose();
				} else if (selection == 8) {
					cm.displayGuide(18);
					cm.dispose();
				} else if (selection == 9) {
					cm.displayGuide(19);
					cm.dispose();
				}
			}
		}
	}
}