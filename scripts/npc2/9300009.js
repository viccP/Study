/* Author: Xterminator
	NPC Name: 		瑞恩
	Map(s): 		Maple Road : 彩虹村 (1010000)
	Description: 		Talks about Amherst
*/
var status = 0;

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
			cm.sendNext("你要出去吗，我能送你到自由市场入口。");
		} else if (status == 1) {
			cm.sendNextPrev("点击下一项。离开这里。");
		} else if (status == 2) {
			cm.warp(910000000);
			cm.dispose();
		} else if (status == 3) {
			cm.warp(910000000);
			cm.dispose();
		}
	}
}