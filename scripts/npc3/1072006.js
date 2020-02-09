/* Bowman Job Instructor (INSIDE)
	Bowman 2nd Job Advancement
	Bowman's ant tunnel: 108000100
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
	} else if (status == -1) {
		if (cm.haveItem(4031013,30)) {
			status = 0;
			cm.sendOk("恭喜你通过了测试！现在拿着我的推荐信回去找转职教官吧！");
		} else {
			cm.sendOk("你的任务就是搜集30个黑珠给我.");
			cm.dispose();
		}
	} else if (status == 0) {
		cm.gainItem(4031012,1);
		cm.gainItem(4031013,-30);
		cm.warp(106010000,0);
		cm.dispose();
	}
}