// NPC Name: Assistant Red
// NPC Purpose: Warps you to 109040000 Fitness JQ
// MrDk/Useless

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("一旦你决定是否要参加或不跟我说话!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("欢迎来到#b怪物嘉年华#k, #h #!");
		} else if (status == 1) {
			cm.sendNextPrev("今天我们举行一个任务事件！#k");
		} else if (status == 2) {
			cm.sendNextPrev("有一些规则，在我们开始之前:\r\n#r-你的等级要超过 30\r\n-如果你死了，你就不会了\r\n-你必须拥抱左墙直到进一步通知#n");
		} else if (status == 3) {
			cm.sendNextPrev("#e#r无视规则可能会导致一个警告或禁令!#k#n");
		} else if (status == 4) {
			if (cm.getLevel() >= 30) {
				cm.sendSimple("你想去参加怪物嘉年华吗\r\n#L0##b是的，我要参加！#k#l\r\n\r\n#L1#不，我还没考虑好！#l");
			}
			else {
				cm.sendOk("你至少需要三十级以上！");
				cm.dispose();
			}
		} else if (status == 5) {
			if (selection == 0) {
				cm.sendNext("哦，我忘记之前!\r\n这是你的#b活动门票#k!你可以给我的朋友#r彼得洛#k 一旦你完成的事件。他可能有一个小奖给你!");
			}
			else if (selection == 1) {
				cm.sendOk("Alright, see you next time!");
				cm.dispose();
			}
		} else if (status == 6) {
			cm.warp(109040000, 0);
			cm.gainItem(5220001, -cm.itemQuantity(5220001));
			cm.gainItem(5220001, 1);
			cm.dispose();
		}
	}
}