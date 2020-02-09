/* Bowman Job Instructor (OUTSIDE)
	Bowman 2nd Job Advancement
	warning street - on the road to the dungeon: 106010000
*/

/** 
Made by xQuasar
**/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if ((status == 0 || status == 1) && mode == 0) {
		cm.sendOk("我可以负责你的考验转职任务。");
		cm.dispose();
	} else if (status == -1) {
		if (cm.haveItem(4031010) && (!cm.haveItem(4031013))) { //检测信件
			status = 0;
			cm.sendNext("原来你带有推荐信?");
		} else if (cm.haveItem(4031010) && cm.haveItem(4031013)) {
			cm.sendOk("你居然有推荐信。。看来是接受我的二转任务的人呐.");
			cm.dispose();
		} else {
			cm.sendOk("一个弓箭手的成长是一个非常艰苦的过程.");
			cm.dispose();
		}
	} else if (status == 0) {
		status = 1;
		cm.sendYesNo("你愿意尝试吗？我需要你给我30个黑珠才能让你拿到我的推荐信.");
	} else if (status == 1) {
		status = 2;
		cm.sendOk("祝你好运，如果你掉线或者挂了，需要重新拿到推荐信！");
	} else if (status == 2) {
		cm.gainItem(4031010,-1);
		cm.warp(108000100,0);
		cm.dispose();
	} else {
		cm.dispose();
	}
}