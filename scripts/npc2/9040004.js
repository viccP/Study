function start() {
	cm.sendSimple("#b你好 #k#h  ##e  #b我是排名系統.#k\r\n#L0##r家族排名\n\#l\r\n#L1##g玩家排名\n\#l\r\n#L2##bPVP排名\n\#l\r\n#L3##d轉生排名\n\#l\r\n#L4##d金錢排名\n\#l\r\n#L5##d攻擊輸出排名\n\#l");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {	
	cm.displayGuildRanks();
	cm.dispose();
	}
	else if (selection == 1) {
	cm.showlvl();
	cm.dispose();
	}
	else if (selection == 2) {
	cm.showpvpkills();
	cm.dispose();
	}
	else if (selection == 3) {
	cm.showreborns();
	cm.dispose();
	}
	else if (selection == 4) {
	cm.showmeso();
	cm.dispose();
	}
	else if (selection == 5) {
	cm.showdps();
	cm.dispose();
	}

}
