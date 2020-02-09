// Made by Gil (iStories).
// Do not release anywhere than RZ or FXP.
var status = 0;

function start() {
status = -1;
action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	} else
		status++;
	if (status == 0) {
		cm.sendSimple("你好, #b#h ##k.噢現在..我可以告訴你許多事情的時候了。你想知道嗎？ #b\r\n#L0#今天是什麼日子？？#l\r\n#L1#在線報時~~.#l#k");
	} else if (status == 1) {
		if (selection == 0) { 
		cm.sendOk("這一天是" + cm.getDayOfWeek() + ", 意味著..\r\n\r\n1 - 星期日.\r\n2 - 星期一.\r\n3 - 星期二.\r\n4 - 星期三.\r\n5 - 星期四.\r\n6 - 星期五.\r\n7 - 星期六.");
		cm.dispose();
	} else if (selection == 1) { // Tells what you have to do.
		cm.sendNext("現在的時間是： #r#e" + cm.getHour() + ":" + cm.getMin() + ":" + cm.getSec() + "#k#n. 那麼，如果它太晚\r\n或太早..我們建議您繼續冒險吧！");
		cm.worldMessage("『報時』：玩家[ "+ cm.getChar().getName() +" ]使用了報時npc,現在時間是[" + cm.getHour() + ":" + cm.getMin() + ":" + cm.getSec() + "]");
		cm.dispose();
		}
	}
}