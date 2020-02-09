/* Author: Xterminator (Modified by RMZero213)
	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			qm.sendNext("欢迎来到#b枫之梦#k.！");
		} else if (status == 1) {
			qm.sendNextPrev("我是你第一个教官，我叫#b罗杰#k。我来指导你完成第一个#b任务#k。可以获得好奖励哦！");
		} else if (status == 2) {
			qm.sendAcceptDecline("你是否愿意接受这个#b罗杰与苹果#k的任务？");
		} else if (status == 3) {
			if (qm.getPlayer().getHp() >= 50) {
				qm.getPlayer().setHp(25);
				qm.getPlayer().updateSingleStat(net.sf.cherry.client.MapleStat.HP, 25);
			}
			if (!qm.haveItem(2010007)) {
				qm.gainItem(2010007, 1);
			}
			qm.startQuest();
			qm.sendNext("咦！我的#bHP#k怎么变成25了？还有。。。罗杰给了我一个苹果，是不是让我吃下去？",2);
		} else if (status == 4) {
			qm.sendPrev("没错！我负责教你使用药水恢复HP值！完成后，我将会给你获得椅子的材料！如果你没有完成这个任务，下一个获得椅子的任务你就没办法完成了！因为#b箱子不爆这个材料#k！");
		} else if (status == 5) {
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (qm.getPlayer().getHp() < 50) {
				qm.sendNext("知道如何恢复hp了?");
				qm.dispose();
			} else {
				qm.sendNext("HP没有了，你就会死亡的哦！");
			}
		} else if (status == 1) {
			qm.sendNextPrev("我也不说废话了，下一步就可以获得奖励了！");
		} else if (status == 2) {
			qm.sendNextPrev("天哪~你看看，我为了你准备了这么多奖励呢！#b打开拍卖功能#k可以查看更多每日奖励哦！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n#v4031161# 1 旧螺丝钉\r\n#v4031162# 1 旧木材\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
		} else if (status == 3) {
			qm.gainExp(10);
			qm.gainItem(2010000, 3);
			qm.gainItem(4031161,1);//旧螺丝钉
			qm.gainItem(4031162,1);//旧木材
			qm.gainItem(2010009, 3);
			qm.completeQuest();
			qm.dispose();
		}
	}
}