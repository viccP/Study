/* Warrior Job Instructor (OUTSIDE)
	Warrior 2nd Job Advancement
	Victoria Road : West Rocky Mountain IV (102020300)
*/

/** Made by xQuasar **/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if ((status == 0 || status == 1) && mode == 0) {
		cm.sendOk("我就笑笑，不说话");
		cm.dispose();
	} else if (status == -1) {
		if (cm.haveItem(4031008) && (!cm.haveItem(4031013))) {
			status = 0;
			cm.sendNext("没见过抠脚大叔吗?");
		} else if (cm.haveItem(4031008) && cm.haveItem(4031013)) {
			cm.sendOk("啊哈？你有这个！有这个就好说。");
			cm.dispose();
		} else {
			cm.sendOk("战士的路径是一个非常危险的道路。..");
			cm.dispose();
		}
	} else if (status == 0) {
		status = 1;
		cm.sendYesNo("我传送你进入训练场，需要你收集30个黑珠证明你的实力.");
	} else if (status == 1) {
		status = 2;
		cm.sendOk("如果你掉线或者退出了，需要去1转教官再拿一次信件.");
	} else if (status == 2) {
		cm.gainItem(4031008,-1);
		cm.warp(108000300,0);
		cm.dispose();
	} else {
		cm.dispose();
	}
}