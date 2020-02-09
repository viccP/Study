/*
 *废弃都市网吧可选择进入地图npc
 *@WNMS 版权 
 **/
var status;
var name;
var mapId;
var cost;
var map1;
var map2;
var map3;
var map4;
var map5;
var scost;

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
		status = 0;
		var myDate = new Date();
		cm.sendNext("现在时间:" + myDate.toLocaleTimeString() + " !\r\n欢迎来到网吧地图！我可以让你选择进入专属地图哦！");
	} else if (status == 0) {
		status = 1;
		map1 = "#m190000001#";
		map2 = "#m190000002#"; 
		map3 = "#m191000001#"; 
		map4 = "#m192000000#";
		map5 = "#m192000001#";
		if (cm.haveItem(5581002)) {
			cm.sendSimple("请选择你要去的网吧地图：\r\n#b#L0#" + map1 + " (120 金币)#l\r\n#L1#" + map2 + " (100 金币)#l\r\n#L2#" + map3 + " (100 金币)#l\r\n#L3#" + map4 + " (80 金币)#l\r\n#L4#" + map5 + " (100 金币)#l#k");
		} else {
                    cm.sendOk("你没有入场卷哦！");
                    cm.dispose();
        }
	} else if (status == 1) {
		if (cm.getMeso() > 0) {
			if (selection == 0) {
				scost = "120";
				mapId = 190000001;
				cost = 120;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 1) {
				scost = "100";
				mapId = 190000002;
				cost = 100;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 2) {
				scost = "100";
				mapId = 191000001;
				cost = 100;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 3) {
				scost = "80";
				mapId = 192000000;
				cost = 80;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 4) {
				scost = "100";
				mapId = 192000001;
				cost = 100;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else {
				cm.dispose();
			}
		} 		
	} else if (status == 2) {
		if (mode == 1) {
			if (cm.getMeso() >= cost) {
				cm.gainMeso(-cost);
				cm.warp(mapId,0);
				cm.dispose();
			} else {
				cm.sendNext("你好象没有足够的金币，这样的话，我不能为你服务。");
				cm.dispose();
			}
		} else {
			cm.sendNext("为什么不去，是不是你被虐到没脾气了。");
			cm.dispose();
		}
	}
}
