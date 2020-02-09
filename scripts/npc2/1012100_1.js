/* Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)
*/

var status = 0;
var job;

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if ((mode == 0 && status == 2) || (mode == 0 && status == 13)) {
			cm.sendOk("回来后，你有想过这些。");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getJob() == 0) {
				if (cm.getLevel() >= 10)
					cm.sendNext("你是否想成为一枚#b弓箭手#k？");
				else {
					cm.sendOk("在努力一点，我可以让你成为弓箭手职业.")
					cm.dispose();
				}
			} else {
				if (cm.getLevel() >= 30 && cm.getJob() == 300) {
					status = 10;
					cm.sendNext("你的进步很让我吃惊！.");
				} else if (cm.getLevel() >= 70 && (cm.getJob() == 310 || cm.getJob() == 320)) {
					cm.sendOk("三转请去访问雪域的长老公馆");
					cm.dispose();
				} else if (cm.getLevel() < 30 && cm.getJob() == 300) {
					cm.sendOk("你需要30级才可以和我对话二转。");
					cm.dispose();
				} else if (cm.getLevel() >= 120 && (cm.getJob() == 311 || cm.getJob() == 321)) {
					cm.sendOk("冰封雪域长老公馆");
					cm.dispose();
				} else {
					cm.sendOk("你的选择是明智的。");
					cm.dispose();
				}
			}
		} else if (status == 1) {
			cm.sendNextPrev("这是一个重要的和最终的选择。你将无法回头.");
		} else if (status == 2) {
			cm.sendYesNo("你确定成为一枚#b弓箭手#k吗？");
		} else if (status == 3) {
			if (cm.getJob() == 0) {
				//cm.getPlayer().updateSingleStat(MapleStat.STR, 4, false);
				//cm.getPlayer().updateSingleStat(MapleStat.DEX, 4, false);
				//cm.getPlayer().updateSingleStat(MapleStat.INT, 4, false);
				//cm.getPlayer().updateSingleStat(MapleStat.LUK, 4, false);
				//cm.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, 0, false);
				cm.changeJob(300);
			}
			cm.sendOk("恭喜你，你现在是弓箭手了！.");
			cm.dispose();
		} else if (status == 11) {
			cm.sendNextPrev("你是想转职成为？\r\n#r猎人#k or #r弩手#k.");
		} else if (status == 12) {
			cm.sendSimple("能不能选择一下你的二转职业?#b\r\n#L0#猎人#l\r\n#L1#弓弩手#k");
		} else if (status == 13) {
			var jobName;
			if (selection == 0) {
				jobName = "猎人";
				job = 310;
			} else {
				jobName = "弩手";
				job = 320;
			}
			cm.sendYesNo("你想成为一个 #r" + jobName + "#k?");
		} else if (status == 14) {
			cm.changeJob(job);
			cm.sendOk("恭喜你！转职成功！");
			cm.dispose();
		}
	}
}	
