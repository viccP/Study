//var zakumMap = c.getChannelServer().getMapFactory().getMap(280030000);



function start() {
cm.sendSimple ("�ڥi�H���A�۴��֥d���~ �Q�n��?. \r\n#L0#��!, �ڭn�۴��֥d��!#l\r\n#L1#��! �ڷQ���}#l\r\n");
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
              cm.sendOk("�p�S��#i4032002##t4032002#�r!!����l��!�Ϊ̩p�w�g�l��1��X�ӤF");
	}
	}else if (selection == 1) {
                    cm.warp(270050000, 0);
                                   cm.dispose();
                       
	}
}


