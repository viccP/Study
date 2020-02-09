/*
战士转职NPC教官
*/

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
			cm.sendNext("你是否想成为一名拥有超强体质的战士？");
		} else if (cm.getJob() == 100) {
			status = 2;
			cm.sendNext("选择这条路,有时候真的是一辈子.");
		} else if (cm.getJob() == 110 ||
					cm.getJob() == 120 ||
					cm.getJob() == 130) {
			status = 4;
			cm.sendNext("选择这条路,有时候真的是一辈子.");
		} else {
			cm.sendOk("强大的你,知道如何使用自己的力量吗?");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 9 || cm.getChar().getStr() < 4) {
			cm.sendOk("请确定你是否达到了Leve9以上的条件.");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("你已经符合条件了，是否愿意加入我们?");
		}
	} else if (status == 1) {
		cm.changeJob(100);
		cm.sendOk("恭喜你成功转职!你现在是一名战士了!在你Level30的时候,可以再次和我交流!");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("迫不及待了吗?但是你还没有达到条件哦!需要等级30才可以.");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("啊...真不可思议..");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031008)) {
			cm.sendOk("拿着我给你的推荐信.去找武术教官吧！据说他在#b西部岩山4#k");
			cm.dispose();
		} else {
			cm.sendOk("这么快你就到了第二次转职的条件了..但是这次对你来说是个考验.你拿着我给你的推荐信.去找一个接应你的人来获得第二次转职的资格吧!");
			cm.gainItem(4031008,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("你确定你想要成为剑客吗?");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("你确定你想要成为准骑士吗?");
		} else if (selection == 2) {
			status = 10;
			cm.sendYesNo("你确定你想要成为枪战士吗?");
		} else {
		cm.sendSimple("下列职业里,你看中哪一个?#b\r\n#L0#剑客#l\r\n#L1#准骑士#l\r\n#L2#枪战士#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob().equals(net.sf.odinms.client.110) && cm.getLevel() >= 700){
			status = 5;
			cm.sendYesNo("第三次转职不在我这里了。你要去找外面的人了~不会的请百度！");
		} else if (cm.getJob().equals(net.sf.odinms.client.120) && cm.getLevel() >= 700){
			status = 6;
			cm.sendYesNo("准骑士的第三次转职,你没有意见吗?");
		} else if (cm.getJob().equals(net.sf.odinms.client.130) && cm.getLevel() >= 700){
			status = 7;
			cm.sendYesNo("龙骑士...很强的职业,你想成为#r龙骑士#k吗?");
		} else {
			cm.sendOk("三转的时候。就不是我处理了~别找我！");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(net.sf.odinms.client.111);
		cm.sendOk("你已经成功获取了第三次转职的力量了!!\r\n我能教你的都教完了,120级就是你四转的时候!");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(net.sf.odinms.client.121);
		cm.sendOk("你已经成功获取了第三次转职的力量了!!\r\n我能教你的都教完了,120级就是你四转的时候!");
		cm.dispose();
	} else if (status == 7) {
		cm.changeJob(net.sf.odinms.client.131);
		cm.sendOk("你已经成功获取了第三次转职的力量了!!\r\n我能教你的都教完了,120级就是你四转的时候!");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(110);
			cm.gainItem(4031012,-1);
			cm.sendOk("很好!你已经成功获得了第二次转职的力量了!");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(120);
			cm.gainItem(4031012,-1);
			cm.sendOk("很好!你已经成功获得了第二次转职的力量了!");
			cm.dispose();
	} else if (status == 10) {
			cm.changeJob(130);
			cm.gainItem(4031012,-1);
			cm.sendOk("很好!你已经成功获得了第二次转职的力量了!");
			cm.dispose();
	}
}
