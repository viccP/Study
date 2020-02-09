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
		cm.sendNext("Ê¥µ®¿ìÀÖ £¡");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.warp(926100001);
		cm.spawnMob(926100001,9300146,1314,211);
		cm.spawnMob(926100001,9300146,1900,211);
		cm.spawnMob(926100001,9300146,1800,211);
		cm.spawnMob(926100001,9300146,1700,211);
		cm.spawnMob(926100001,9300146,1430,211);
		cm.spawnMob(926100001,9300146,1580,211);
		cm.spawnMob(926100001,9300146,1500,211);
		cm.spawnMob(926100001,9300146,666,211);
		cm.spawnMob(926100001,9300146,888,211);
		cm.spawnMob(926100001,9300146,777,211);
		cm.spawnMob(926100001,9300146,382,211);
		cm.spawnMob(926100001,9300145,456,211);
		cm.spawnMob(926100001,9300145,738,211);
		cm.spawnMob(926100001,9300145,947,211);
		cm.spawnMob(926100001,9300145,368,211);
		cm.spawnMob(926100001,9300145,400,211);
		cm.spawnMob(926100001,9300145,372,211);
		cm.spawnMob(926100001,9300145,144,211);
		cm.spawnMob(926100001,9300145,400,211);
		cm.spawnMob(926100001,9300145,620,211);
		cm.spawnMob(926100001,9300145,828,211);
		cm.spawnMob(926100001,9300145,256,211);
		cm.spawnMob(926100001,9300145,544,211);
		cm.spawnMob(926100001,9300145,633,211);
		cm.spawnMob(926100001,9300145,1390,211);
		cm.spawnMob(926100001,9300145,1000,211);
		cm.spawnMob(926100001,9300145,1100,211);
		cm.spawnMob(926100001,9300145,887,211);cm.spawnMob

(926100001,9300145,738,211);
		cm.spawnMob(926100001,9300145,947,211);
		cm.spawnMob(926100001,9300145,368,211);
		cm.spawnMob(926100001,9300145,400,211);
		cm.spawnMob(926100001,9300145,372,211);
		cm.spawnMob(926100001,9300145,144,211);
		cm.spawnMob(926100001,9300145,400,211);
		cm.spawnMob(926100001,9300145,620,211);
		cm.spawnMob(926100001,9300145,828,211);
		cm.spawnMob(926100001,9300145,256,211);
		cm.spawnMob(926100001,9300145,544,211);
		cm.spawnMob(926100001,9300145,633,211);
		cm.spawnMob(926100001,9300145,1390,211);
		cm.spawnMob(926100001,9300145,1000,211);
		cm.spawnMob(926100001,9300145,1100,211);
		cm.spawnMob(926100001,9300145,887,211);
		cm.spawnMob(926100001,9300145,998,211);
		cm.spawnMob(926100001,9300145,1400,211);
	} else if (status == 1) {
		if (cm.haveItem(4031329)){
			
			cm.gainItem(4001325,+1);
cm.warp(701000210);
cm.dispose();
		} else {
		cm.warp(701000210);
		      	cm.dispose();
                }}}
	
}