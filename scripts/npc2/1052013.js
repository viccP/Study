/*
 *�����������ɿ�ѡ������ͼnpc
 *@WNMS ��Ȩ 
 **/
var status;
var name;
var mapId;
var cost;
var map1;
var map2;
var map3;
var map4;
var map5;
var scost;

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
		status = 0;
		var myDate = new Date();
		cm.sendNext("����ʱ��:" + myDate.toLocaleTimeString() + " !\r\n��ӭ�������ɵ�ͼ���ҿ�������ѡ�����ר����ͼŶ��");
	} else if (status == 0) {
		status = 1;
		map1 = "#m190000001#";
		map2 = "#m190000002#"; 
		map3 = "#m191000001#"; 
		map4 = "#m192000000#";
		map5 = "#m192000001#";
		if (cm.haveItem(5581002)) {
			cm.sendSimple("��ѡ����Ҫȥ�����ɵ�ͼ��\r\n#b#L0#" + map1 + " (120 ���)#l\r\n#L1#" + map2 + " (100 ���)#l\r\n#L2#" + map3 + " (100 ���)#l\r\n#L3#" + map4 + " (80 ���)#l\r\n#L4#" + map5 + " (100 ���)#l#k");
		} else {
                    cm.sendOk("��û���볡��Ŷ��");
                    cm.dispose();
        }
	} else if (status == 1) {
		if (cm.getMeso() > 0) {
			if (selection == 0) {
				scost = "120";
				mapId = 190000001;
				cost = 120;
				status = 2;
				cm.sendYesNo("����������������Ѿ����������ȷ��Ҫȥ #b#m" + mapId + "##k��Ʊ���� #b" + scost + " ���#k��");
			} else if (selection == 1) {
				scost = "100";
				mapId = 190000002;
				cost = 100;
				status = 2;
				cm.sendYesNo("����������������Ѿ����������ȷ��Ҫȥ #b#m" + mapId + "##k��Ʊ���� #b" + scost + " ���#k��");
			} else if (selection == 2) {
				scost = "100";
				mapId = 191000001;
				cost = 100;
				status = 2;
				cm.sendYesNo("����������������Ѿ����������ȷ��Ҫȥ #b#m" + mapId + "##k��Ʊ���� #b" + scost + " ���#k��");
			} else if (selection == 3) {
				scost = "80";
				mapId = 192000000;
				cost = 80;
				status = 2;
				cm.sendYesNo("����������������Ѿ����������ȷ��Ҫȥ #b#m" + mapId + "##k��Ʊ���� #b" + scost + " ���#k��");
			} else if (selection == 4) {
				scost = "100";
				mapId = 192000001;
				cost = 100;
				status = 2;
				cm.sendYesNo("����������������Ѿ����������ȷ��Ҫȥ #b#m" + mapId + "##k��Ʊ���� #b" + scost + " ���#k��");
			} else {
				cm.dispose();
			}
		} 		
	} else if (status == 2) {
		if (mode == 1) {
			if (cm.getMeso() >= cost) {
				cm.gainMeso(-cost);
				cm.warp(mapId,0);
				cm.dispose();
			} else {
				cm.sendNext("�����û���㹻�Ľ�ң������Ļ����Ҳ���Ϊ�����");
				cm.dispose();
			}
		} else {
			cm.sendNext("Ϊʲô��ȥ���ǲ����㱻Ű��ûƢ���ˡ�");
			cm.dispose();
		}
	}
}
