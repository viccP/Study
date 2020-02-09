/* Author: Xterminator
	NPC Name: 		Trainer Frod
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
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
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
                    if(cm.getMapId() == 677000012){
                        cm.openNpc(9201133,1);
                         /* var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
                        eim.disbandParty();
			cm.getEventManager("dydg").setup("entryPossible", "true");
                        cm.warp(100000000);
                        cm.dispose();*/
                    }else{
			if (cm.haveItem(4032491,2)) {
				cm.sendNext("下面就是#b地狱大公#k巢穴了……\r\n你如果想进去，需要搜集#v4031232# 30个。");
			} else if(cm.haveItem(4032491) < 999){
				                  if(!cm.isLeader()){
                        cm.sendOk("你不是组长！"); 
                        cm.dispose();
                    }else{
			if(cm.haveItem(4031232,30)){ //不是组长
                            cm.gainItem(4031232,-30);
                            cm.gainItem(4002000,1);
                            cm.warpParty(677000012);
                            cm.dispose();
				cm.sendNextPrev("这么快就消灭完毕了？但是似乎这里一点都没有受到影响啊……算了，先进去再说。\r\n#b获得了： #v4002000#  点击地狱大公藏身处的#r魔鬼入口#b可以唤醒#r地狱大公#b。");
                                //cm.dispose();
                                //cm.summonMob(9400633,180000,5250,1);
			} else{
				cm.sendNextPrev("需要搜集#b30个 #v4031232#");
                                cm.dispose();
			}}
			}}
		} else if (status == 1) {
                    if(!cm.isLeader()){
                        cm.sendOk("你不是组长！"); 
                        cm.dispose();
                    }else{
			if(cm.haveItem(4031232,30)){ //不是组长
                            cm.gainItem(4031232,-30);
                            cm.gainItem(4002000,1);
                            cm.warp(677000012);
                            cm.dispose();
				cm.sendNextPrev("这么快就消灭完毕了？但是似乎这里一点都没有受到影响啊……算了，先进去再说。\r\n#b获得了： #v4002000#  点击地狱大公藏身处的#r魔鬼入口#b可以唤醒#r地狱大公#b。");
                                //cm.dispose();
                                //cm.summonMob(9400633,180000,5250,1);
			} else{
				cm.sendNextPrev("需要搜集#b30个 #v4031232#");
                                cm.dispose();
			}}
		
                }
	}
}