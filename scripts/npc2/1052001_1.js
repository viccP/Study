var status;

function start() {
	status = -1;
	action(1,0,0);
	}
	
function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (mode == 0) {
			cm.sendOk("...");
			cm.dispose();
	} else if (status == -1) {
		if (cm.getJob() == 0) {
			status = 0;
			cm.sendNext("你想成为飞侠吗？");
		} else if (cm.getJob() == 400) {
			status = 2;
			cm.sendNext("你准备好你的第二转职了吗？让我来看看...");
		} else if (cm.getJob() == 410 ||
					cm.getJob() == 420) {
			status = 4;
			cm.sendNext("你可能准备好了你的第三个转职。让我看看...");
		} else {
			cm.sendOk("我可以教你所有关于飞侠的道路...");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 9 || cm.getChar().getDex() < 4) {
			cm.sendOk("嗯......你都尚未完全就绪。来的时候你至少10级，并有4个DEX，好吗？");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("是的，你似乎准备好成为一个飞侠。你想成为一名飞侠？");
		}
	} else if (status == 1) {
		cm.changeJob(400);
		cm.sendOk("恭喜！你现在是一个飞侠。刻苦训练，而当你达到30级，来再次跟我说话。");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("嗯......你都尚未完全就绪。来的时候你是30级，好吗？");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("我看......你已经通过了测试...");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031011)) {
			cm.sendOk("来吧，让我们感动。去看看飞侠职业教练，他的周围某处山谷中...");
			cm.dispose();
		} else {
			cm.sendOk("再次和我对话即可二转。");
			cm.gainItem(4031012,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("你确定你要成为一个刺客？");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("你确定你要成为一个侠客？");
		} else {
		cm.sendSimple("现在, 你会想成为?#b\r\n#L0#刺客#l\r\n#L1#侠客#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob() == 410 && cm.getLevel() >= 700){
			status = 5;
			cm.sendYesNo("是的，你准备好你的第三个转职了吗？你想成为无影人？");
		} else if (cm.getJob() == 420 && cm.getLevel() >= 700){
			status = 6;
			cm.sendYesNo("是的，你准备好你的第三个转职了吗？你想成为独行客？");
		} else {
			cm.sendOk("三次转职请去雪域长老公馆拜访长老们。");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(411);
		cm.sendOk("恭喜！你现在是一个无影人。刻苦训练，而当你达到120级，再来和我说话。");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(421);
		cm.sendOk("恭喜！你现在是一个独行客。刻苦训练，而当你达到120级，再来和我说话。");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(410);
			cm.gainItem(4031012,-1);
			cm.sendOk("恭喜！你现在是一个刺客。刻苦训练，而当你达到70级，来再次跟我说话。");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(420);
			cm.gainItem(4031012,-1);
			cm.sendOk("恭喜！你现在是一个侠客。刻苦训练，而当你达到70级，来再次跟我说话。");
			cm.dispose();
	}
}
