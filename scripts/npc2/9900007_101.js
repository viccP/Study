var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.sendNext("这么好的系统你不需要？");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("HI！欢迎来到#b枫之梦#k。接下来，我给你介绍一下#d推广系统#k，#d推广系统#k顾名思义，就是拉小伙伴一块冒险。\r\n#r每个人都有自己的#b推广码#r。我会给你一个#b没有名字的盒子#r。双击可以#d填写推广人#r和#d查看自己的推广码#r。\r\n#b推广的分红为10%点卷分红。\r\n#k例如：你的是#b1234#k的推广人。你充值#b1000 点卷#k，#b1234#k就可以拿到 #b100 点卷#k的分红。");
	} else if (status == 1) {
		if (cm.getChar().getPresent() == 0) {
			cm.gainItem(5530000,1);
			cm.getChar().setPresent(1);
			cm.getChar().saveToDB(true,true);
			cm.sendOk("领取完成！双击即可打开！\r\n#ePS:填写推广人请不要填写错误！每个账号只能领取一个盒子，填写错误了将无法使用该功能！");
			cm.dispose();
		} else {
			cm.sendOk("每个帐号只可以领取#b1次#k。你已经领取过了！");
			cm.dispose();
		       }	
		}
	}
}
