/*
����Mxd ONLINE
<159502199@qq.com>
<QQ:159502199>
*/

var status = 0;
var menu = "";
var set;
var makeitem;
var access = true;
var reqitem = new Array();
var cost = 4000;
var makeditem = new Array(4006000,4006001);
var reqset = new Array([[[4000046,20],[4000027,20],[4021001,1]],
						[[4000025,20],[4000049,20],[4021006,1]],
						[[4000129,15],[4000130,15],[4021002,1]],
						[[4000074,15],[4000057,15],[4021005,1]],
						[[4000054,7],[4000053,7],[4021003,1]]],
						
						[[[4000046,20],[4000027,20],[4011001,1]],
						[[4000014,20],[4000049,20],[4011003,1]],
						[[4000132,15],[4000128,15],[4011005,1]],
						[[4000074,15],[4000069,15],[4011002,1]],
						[[4000080,7],[4000079,7],[4011004,1]]]);

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1 || (mode == 0 && (status ==1 || status == 2))) {
		cm.dispose();
		return;
	}
	if(mode == 0) {
		cm.sendNext("û���㹻�Ĳ���?�Ǿͱ���!����ȥ!");
		cm.dispose();
	}
	if(mode == 1) {
		status++;
	}
	if(status == 0) {
		cm.sendNext("Alright, ������ܵ�������������ݺ͡����� ��ʾ�����ǵ�! �����������������İ�ɫ��!! ����, �ǿ�����Ļ������� ��!! �������������վ��? �� maaaay ����΢���˵��뿪���ҵĹ��������� hehe��");
	} else if(status == 1) {
		cm.sendSimple("�������˵�������ʿ..����Ҫ�Ұ�����ʲô��?\r\n\r\n#L0##b����ħ��ʯ#k#l\r\n#L1##b�����ٻ�ʯ#k#l");
	} else if(status == 2) {
		set = selection;
		makeitem = makeditem[set];
		for(i=0; i < reqset[set].length; i++) {
			menu += "\r\n#L"+i+"##b�� #t"+reqset[set][i][0][0]+"# �� #t"+reqset[set][i][1][0]+"##k#l";
		}
		cm.sendSimple("����. #b#t"+makeitem+"##k �����Ҷ�������.ֻҪ�����㹻�Ĳ���,ħ��ʯ�������ڸ߼��ļ���ħ��֮���... �� 5���������� #t"+makeitem+"#. ��һ������������Ҫ����?"+menu);
	} else if(status == 3) {
		set = reqset[set][selection];
		reqitem[0] = new Array(set[0][0],set[0][1]);
		reqitem[1] = new Array(set[1][0],set[1][1]);
		reqitem[2] = new Array(set[2][0],set[2][1]);
		menu = "";
		for(i=0; i < reqitem.length; i++) {
			menu += "\r\n#v"+reqitem[i][0]+"# #b"+reqitem[i][1]+" #t"+reqitem[i][0]+"##k";
		}
		menu += "\r\n#i4031138# #b"+cost+" ð�ձ�#k";
		cm.sendYesNo("���� #b5 �� #t"+makeitem+"##k, ����Ҫ׼�����²���:\r\n"+menu);
	} else if(status == 4) {
		for(i=0; i < reqitem.length; i++) {
			if(!cm.haveItem(reqitem[i][0],reqitem[i][1]))
				access = false;
		}
		if(access == false || !cm.canHold(makeitem) || cm.getMeso() < cost) {
			cm.sendNext("��������Ĳ��Ϻ��񲻹�ѽ..");
		} else {
			cm.sendOk("������� 5 �� #b#t"+makeitem+"##k. �����ұ������, ����һ������ �õ�, �������Ҫ�ҵİ�æδ����ĳһ��, �ض������غ�̸������!");
			cm.gainItem(reqitem[0][0],-reqitem[0][1]);
			cm.gainItem(reqitem[1][0],-reqitem[1][1]);
			cm.gainItem(reqitem[2][0],-reqitem[2][1]);
			cm.gainMeso(-cost);
			cm.gainItem(makeitem,5);
		}
		cm.dispose();
	}
}
