var status = 0;

function start() {
	cm.sendSimple ("你好！這裡是殘暴炎魔祭壇的入口，如果你真的想挑戰，請購買 #b#t4001017##k。#k\r\n#k#L0##r我希望買 #b火焰之眼#k 價格 1 金幣#k\r\n#k#L1##b我已經有 #b火焰之眼#k , 讓我進去#k")
}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){ 
		case 0:
			if (cm.getMeso() >= 1) {
			cm.gainMeso(-1);
			cm.gainItem(4001017, 1);
			cm.sendOk("謝謝惠顧!");
		        cm.dispose();
			}else{
		        cm.sendOk("很抱歉，你身上沒有足夠的楓幣!");
		        cm.dispose();
			}
		break;
		case 1:
			if (cm.getLevel() >= 50 && cm.haveItem(4001017, 1)) {
			cm.sendOk("有火焰之眼等級也10等,好吧!讓你進去!");
			cm.worldMessage("玩家"+ cm.getChar().getName() +"進入了炎魔地圖");
			cm.warp(280030000, 0);
		        cm.dispose();
			}else{
		        cm.sendOk("你等級太低了!\r\n這裡至少要#r50級#k才能進去!\r\n或者你沒有#r火焰之眼#k!");
		        cm.dispose();
}

			}
		}