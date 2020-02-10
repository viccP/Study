function start() {
    cm.sendYesNo("Would you like to go back?");
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (cm.getMapId() == 674030200) { //boss map
		if(cm.haveItem(4031018,1)){
			cm.warpParty(674030300);
		}else{
		    cm.sendOk("璇风粰鎴戣棌瀹濆浘锛