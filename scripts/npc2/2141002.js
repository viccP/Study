//var zakumMap = c.getChannelServer().getMapFactory().getMap(280030000);



function start() {
cm.sendSimple ("我可以幫你招換皮卡啾唷~ 想要嗎?. \r\n#L0#對!, 我要招換皮卡啾!#l\r\n#L1#不! 我想離開#l\r\n");
}

function action(mode, type, selection) {
	//cm.dispose();
	if (selection == 0) {
            if(cm.haveItem(4032002) && cm.getPlayer().getMap().getMonsterById(8820001) == null){
                                  //  cm.spawnMonster(8820015, 300000000, 50000, 180, 5000000, 1, 0, 1, 8, -42);
	                //cm.spawnMonster(8820016, 300000000, 50000, 180, 5000000, 1, 0, 1, 8, -42);
	                //cm.spawnMonster(8820017, 450000000, 50000, 180, 5000000, 1, 0, 1, 8, -42);
	                //cm.spawnMonster(8820018, 450000000, 50000, 180, 5000000, 1, 0, 1, 8, -42);
	                //cm.spawnMonster(8820002, 600000000, 50000, 180, 5000000, 1, 0, 1, 8, -42);
					cm.gainItem(4032002,-1);
                                    cm.spawnMonster(8820001, 2100000000, 50000, 180, 5000000, 1, 0, 1, 12, -42);
                                   cm.dispose();
            }else{
              cm.sendOk("妳沒有#i4032002##t4032002#呀!!不能召喚!或者妳已經召喚1支出來了");
	}
	}else if (selection == 1) {
                    cm.warp(270050000, 0);
                                   cm.dispose();
                       
	}
}


