function start() {
	cm.sendSimple("#b�A�n #k#h  ##e  #b�ڬO�ƦW�t��.#k\r\n#L0##r�a�ڱƦW\n\#l\r\n#L1##g���a�ƦW\n\#l\r\n#L2##bPVP�ƦW\n\#l\r\n#L3##d��ͱƦW\n\#l\r\n#L4##d�����ƦW\n\#l\r\n#L5##d������X�ƦW\n\#l");
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
