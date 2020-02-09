/*
	NPC Name: 		Sgt. Anderson
	Map(s): 		Ludibrium PQ Maps
	Description: 		Warps you out from Ludi PQ
*/
var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.sendOk("还在犹豫什么!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getMapId() != 701000210) { //射手村公园
				cm.sendYesNo("你是否要离开这里？一切都是泡沫哦！");
			} else {
				var eim = cm.getPlayer().getEventInstance();
				if (cm.haveItem(4001022)) {
					cm.removeAll(4001022);
				}
				if (cm.haveItem(4001023)) {
					cm.removeAll(4001023);
				}
				eim.disbandParty();
				cm.getEventManager("LudiPQ").setProperty("entryPossible", "true");
				cm.warp(221024500, 0);
				if (cm.haveItem(4001022)) {
					cm.removeAll(4001022);
				}
				if (cm.haveItem(4001023)) {
					cm.removeAll(4001023);
				} // 重新启用走私，由于大众的需求。
				cm.dispose();
			}
		} else if (status == 1) {
			if (cm.getMapId() != 701000210) {
				var eim = cm.getPlayer().getEventInstance();
				if (eim == null) {
					cm.warp(701000210);
					
				} else if (cm.isLeader()) {
					eim.disbandParty();
					cm.getEventManager("LudiPQ").setProperty("entryPossible", "true");
					
				} else {
			cm.sendOk("喊你队长来和我说!");
				}
				cm.dispose();
			}
		}
	}
}