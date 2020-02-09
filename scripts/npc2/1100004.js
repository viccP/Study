importPackage(net.sf.cherry.client);

var menu = new Array("���֮��");
var cost = new Array(1500,1500);
var TktoSD;
var display = "";
var btwmsg;
var method;

function start() {
	status = -1;
	TktoSD = cm.getEventManager("TktoSD");
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("OK. If you ever change your mind, please let me know.");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
				if(cm.getChar().getMapId() == 130000210 && i < 1) {
					display += "\r\n#L"+i+"#�ƶ�ʱ����#b8����#k��������#b("+cost[i]+")#k��ҡ�";
				} else if(cm.getChar().getMapId() == 250000100 && i > 0 && i < 3) {
					display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" ���)#k";
				}
			}
			if(cm.getChar().getMapId() == 130000210 || cm.getChar().getMapId() == 251000000) {
				btwmsg = "#b���֮�ǵ�����#k";
			} else if(cm.getChar().getMapId() == 250000100) {
				btwmsg = "#b���귵�����֮�ǻ���ȥ�ٲ���#k";
			}
			if(cm.getChar().getMapId() == 251000000) {
				cm.sendYesNo("��ô�����Ҵ� "+btwmsg+" �ٵ����ڡ��ҵ��ٶȺܿ�İɣ�������뷵�� #b"+menu[3]+"#k ����ô���Ǿ����̳������������ǵø���һЩ����Ǯ���۸��� #b"+cost[3]+" ���#k��");
			} else {
				cm.sendSimple("�š�������˵���������뿪ʥ�أ�ǰ��������#b���֮��#k��·�������ʱ���Լ��#b8����#k��������1500��ҡ�\r\n" + display);
			}
		} else if(status == 1) {
			if(selection == 2) {
				cm.sendYesNo("��ȷ��Ҫȥ #b"+menu[2]+"#k �� ��ô��Ҫ������ #b"+cost[2]+" ���#k");
			} else {
				if(cm.getMeso() < cost[selection]) {
					cm.sendNext("��ȷ�������㹻�Ľ�ң�");
					cm.dispose();
				} else {
					if(cm.getChar().getMapId() == 251000000) {
						cm.gainMeso(-cost[3]);
						cm.warp(200000000);
						cm.dispose();
					} else {
						if(TktoSD.getProperty("isRiding").equals("false")) {
							cm.gainMeso(-cost[selection]);
							TktoSD.newInstance("TktoSD");
							TktoSD.setProperty("myRide",selection);
							TktoSD.getInstance("TktoSD").registerPlayer(cm.getChar());
							cm.dispose();
						} else {
							cm.gainMeso(-cost[3]);
							cm.warp(200000000);
							cm.dispose();
						}
					}
				}
			}
		} else if(status == 2) {
			if(cm.getMeso() < cost[2]) {
				cm.sendNext("��ȷ�������㹻�Ľ�ң�");
				cm.dispose();
			} else {
				cm.gainMeso(-cost[2]);
				cm.warp(200000000);
				cm.dispose();
			}
		}
	}
}
