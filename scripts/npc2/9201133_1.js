/*
 * 
 * @地狱大公副本
 * @WNMS 枫之梦
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
                    cm.sendSimple("你来到这里……是为了干什么？\r\n#L1##r唤醒地狱大公#k#l\r\n\r\n#L2##b我要出去#l\r\n\r\n#L3##d地狱大公属性介绍#k");
		} else if (selection == 1) {
                    if(!cm.isLeader()){
                        cm.sendOk("你不是组长！无法唤醒！"); 
                        cm.dispose();
                    }else{
			if(cm.haveItem(4002000,1)){ //物品条件
                            cm.gainItem(4002000,-1);
                            cm.summonMob(9400633,180000,5250,1);
                            cm.dispose();
			} else{
				cm.sendNextPrev("需要搜集#b1个 #v4002000#");
                                cm.dispose();
			}}
		
                }else if (selection == 2) { //我要出去
                     var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
                        eim.disbandParty();
			cm.getEventManager("dydg").setup("entryPossible", "true");
                        cm.warp(100000000);
                        cm.dispose();
                }else if(selection == 3){
                    cm.sendOk("#e   怪物名称：#b#o9400633##k  \r\n\r\n#r   HP : 180000#b  \r\n\r\n   MP : 500  \r\n\r\n#g   EXP 5250\r\n\r\n#k    击败后可以获得大量冒险币。#r地狱大公武器#k。\r\n    该武器使用后与人物进行#r绑定#k，使用#b宿命剪刀#k，\r\n    可以#r解除绑定#k。");
                    cm.dispose();
                }
	}
}