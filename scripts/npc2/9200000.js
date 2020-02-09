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
				cm.sendNext("對不起,你還不夠30級進行第二次轉職,請到30級再來吧");
				status = 98;
			} else if (cm.getLevel() >= 30 && cm.getLevel() < 70) {
				cm.sendNext("我是#r杜宜(Duey)-轉職職官#k,你需要我幫助你轉職嗎?");
			}
		} else if (status == 1) {
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.THIEF)) {
				cm.sendSimple("你已經符合條件，可以進行第二次轉職，請選擇你的職業:#b\r\n#L0#刺客#l\r\n#L1#俠盜#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.WARRIOR)) {
				cm.sendSimple("你已經符合條件，可以進行第二次轉職，請選擇你的職業:#b\r\n#L2#狂戰士#l\r\n#L3#見習騎士#l\r\n#L4#槍騎兵#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.MAGICIAN)) {
				cm.sendSimple("你已經符合條件，可以進行第二次轉職，請選擇你的職業:#b\r\n#L5#法師(冰,雷)#l\r\n#L6#法師(火,毒)#l\r\n#L7#僧侶#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BOWMAN)) {
				cm.sendSimple("你已經符合條件，可以進行第二次轉職，請選擇你的職業: #b\r\n#L8#獵人#l#k\r\n#L9#弩手#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.PIRATE)) {
				cm.sendSimple("你已經符合條件，可以進行第二次轉職，請選擇你的職業: #b\r\n#L10#打手#l\r\n#L11#槍手#l#k");
			}
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
				cm.sendNext("你不符合條件,不能進行轉職");
				cm.dispose();
			}
		} else if (status == 2) {
			var jobName;
			if (selection == 0) {
				jobName = "刺客";
				job = net.sf.odinms.client.MapleJob.ASSASSIN;
			}
			if (selection == 1) {
				jobName = "俠盜";
				job = net.sf.odinms.client.MapleJob.BANDIT;
			}
			if (selection == 2) {
				jobName = "狂戰士";
				job = net.sf.odinms.client.MapleJob.FIGHTER;
			}
			if (selection == 3) {
				jobName = "見習騎士";
				job = net.sf.odinms.client.MapleJob.PAGE;
			}
			if (selection == 4) {
				jobName = "槍騎兵";
				job = net.sf.odinms.client.MapleJob.SPEARMAN;
			}
			if (selection == 5) {
				jobName = "法師(冰,雷)";
				job = net.sf.odinms.client.MapleJob.IL_WIZARD;
			}
			if (selection == 6) {
				jobName = "法師(火,毒)";
				job = net.sf.odinms.client.MapleJob.FP_WIZARD;
			}
			if (selection == 7) {
				jobName = "僧侶";
				job = net.sf.odinms.client.MapleJob.CLERIC;
			}
			if (selection == 8) {
				jobName = "獵人";
				job = net.sf.odinms.client.MapleJob.HUNTER;
			}
			if (selection == 9) {
				jobName = "弩手";
				job = net.sf.odinms.client.MapleJob.CROSSBOWMAN;
			}
			if (selection == 10) {
				jobName = "打手";
				job = net.sf.odinms.client.MapleJob.BRAWLER;
			}
			if (selection == 11) {
				jobName = "槍手";
				job = net.sf.odinms.client.MapleJob.GUNSLINGER;
			}
			cm.sendYesNo("你真的決定要成為一名#r" + jobName + "#k嗎?");
		} else if (status == 3) {
			cm.changeJob(job);
			cm.sendOk("轉職成功");
	}
}	
}
