/* Warrior Job Instructor
	Warrior 2nd Job Advancement
	Hidden Street : Warrior's Rocky Mountain (108000300)
*/

/** made by xQuasar **/

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
			cm.sendOk("这里你需要收集东西.30个黑珠你居然收集到了。。。");
		} else {
			cm.sendOk("真有耐心，你需要收集到30个黑珠。");
			cm.dispose();
		}
	} else if (status == 0) {
		cm.gainItem(4031012,1);
		cm.gainItem(4031013,-30);
		cm.warp(102020300,0);
		cm.dispose();
	}
}