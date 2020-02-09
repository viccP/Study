/**
 *9201027 - Nana(P)
 *@author Jvlaple
 */
 
function start() {
      cm.sendOk("請將召喚物品丟在我腳下! 這是召喚物#r#z4032202##i4032202#");
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
}
}