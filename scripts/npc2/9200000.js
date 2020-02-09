/* [NPC]
	Job Advancer
	Made by Tryst (wasdwasd) of Odinms Forums.
	Please don't release this anywhere else.
*/

importPackage(net.sf.odinms.client);

var status = 0;
var job;

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
		if (status == 0) {
			if (cm.getLevel() < 30) {
				cm.sendNext("�藍�_,�A�٤���30�Ŷi��ĤG����¾,�Ш�30�ŦA�ӧa");
				status = 98;
			} else if (cm.getLevel() >= 30 && cm.getLevel() < 70) {
				cm.sendNext("�ڬO#r���y(Duey)-��¾¾�x#k,�A�ݭn�����U�A��¾��?");
			}
		} else if (status == 1) {
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.THIEF)) {
				cm.sendSimple("�A�w�g�ŦX����A�i�H�i��ĤG����¾�A�п�ܧA��¾�~:#b\r\n#L0#���#l\r\n#L1#�L�s#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.WARRIOR)) {
				cm.sendSimple("�A�w�g�ŦX����A�i�H�i��ĤG����¾�A�п�ܧA��¾�~:#b\r\n#L2#�g�Ԥh#l\r\n#L3#�����M�h#l\r\n#L4#�j�M�L#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.MAGICIAN)) {
				cm.sendSimple("�A�w�g�ŦX����A�i�H�i��ĤG����¾�A�п�ܧA��¾�~:#b\r\n#L5#�k�v(�B,�p)#l\r\n#L6#�k�v(��,�r)#l\r\n#L7#���Q#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BOWMAN)) {
				cm.sendSimple("�A�w�g�ŦX����A�i�H�i��ĤG����¾�A�п�ܧA��¾�~: #b\r\n#L8#�y�H#l#k\r\n#L9#����#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.PIRATE)) {
				cm.sendSimple("�A�w�g�ŦX����A�i�H�i��ĤG����¾�A�п�ܧA��¾�~: #b\r\n#L10#����#l\r\n#L11#�j��#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
				cm.sendNext("�A���ŦX����,����i����¾");
				cm.dispose();
			}
		} else if (status == 2) {
			var jobName;
			if (selection == 0) {
				jobName = "���";
				job = net.sf.odinms.client.MapleJob.ASSASSIN;
			}
			if (selection == 1) {
				jobName = "�L�s";
				job = net.sf.odinms.client.MapleJob.BANDIT;
			}
			if (selection == 2) {
				jobName = "�g�Ԥh";
				job = net.sf.odinms.client.MapleJob.FIGHTER;
			}
			if (selection == 3) {
				jobName = "�����M�h";
				job = net.sf.odinms.client.MapleJob.PAGE;
			}
			if (selection == 4) {
				jobName = "�j�M�L";
				job = net.sf.odinms.client.MapleJob.SPEARMAN;
			}
			if (selection == 5) {
				jobName = "�k�v(�B,�p)";
				job = net.sf.odinms.client.MapleJob.IL_WIZARD;
			}
			if (selection == 6) {
				jobName = "�k�v(��,�r)";
				job = net.sf.odinms.client.MapleJob.FP_WIZARD;
			}
			if (selection == 7) {
				jobName = "���Q";
				job = net.sf.odinms.client.MapleJob.CLERIC;
			}
			if (selection == 8) {
				jobName = "�y�H";
				job = net.sf.odinms.client.MapleJob.HUNTER;
			}
			if (selection == 9) {
				jobName = "����";
				job = net.sf.odinms.client.MapleJob.CROSSBOWMAN;
			}
			if (selection == 10) {
				jobName = "����";
				job = net.sf.odinms.client.MapleJob.BRAWLER;
			}
			if (selection == 11) {
				jobName = "�j��";
				job = net.sf.odinms.client.MapleJob.GUNSLINGER;
			}
			cm.sendYesNo("�A�u���M�w�n�����@�W#r" + jobName + "#k��?");
		} else if (status == 3) {
			cm.changeJob(job);
			cm.sendOk("��¾���\");
	}
}	
}
