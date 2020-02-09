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
		if (status == 0) {//第0个索引
			
			cm.sendNext("#r欢迎来到第一关，在这里你要搜集10个#v4031309#给我来召唤出第一关的怪物。#k");
		} else if (status == 1) {//第一个索引
		
			var party = cm.getParty().getMembers();//变量为组队人数
			if(cm.haveItem(4001063,10)){//判断物品
			cm.sendNext("#b你有云碎片,【组队成员"+party.size()+"人。可以获得"+party.size()+"张通行证】#d我可以传送你去下一关了！\r\n#e获得了通行证。通行证请队长发放给队员每人一个。然后与我对话进行传送。#k");
			}else if(cm.haveItem(4001008,1)){
			cm.gainExp(+200000);
			cm.warp(920010400);
			cm.removeAll(4001008);
			cm.dispose();
			cm.showEffect("quest/party/clear");//播放通关效果
			}else{
				cm.sendOk("没有！");
				cm.dispose();
			}
		}else if(status == 2){//第二个索引
			var party = cm.getParty().getMembers();//变量为组队人数
			var size = party.size();
			cm.gainItem(4001063,-10);
			cm.sendOk("组队成员"+party.size()+"人。可以获得"+party.size()+"张通行证.\r\n物品#v4001063# 减少10个。再次对话进行下一关。");
			cm.gainItem(4001008,+size);
			cm.dispose();
		}
	}
}