// Made by Gil (iStories).
// Do not release anywhere than RZ or FXP.
var status = 0;

function start() {
status = -1;
action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	} else
		status++;
	if (status == 0) {
		cm.sendSimple("�A�n, #b#h ##k.���{�b..�ڥi�H�i�D�A�\�h�Ʊ����ɭԤF�C�A�Q���D�ܡH #b\r\n#L0#���ѬO�����l�H�H#l\r\n#L1#�b�u����~~.#l#k");
	} else if (status == 1) {
		if (selection == 0) { 
		cm.sendOk("�o�@�ѬO" + cm.getDayOfWeek() + ", �N����..\r\n\r\n1 - �P����.\r\n2 - �P���@.\r\n3 - �P���G.\r\n4 - �P���T.\r\n5 - �P���|.\r\n6 - �P����.\r\n7 - �P����.");
		cm.dispose();
	} else if (selection == 1) { // Tells what you have to do.
		cm.sendNext("�{�b���ɶ��O�G #r#e" + cm.getHour() + ":" + cm.getMin() + ":" + cm.getSec() + "#k#n. ����A�p�G���ӱ�\r\n�ΤӦ�..�ڭ̫�ĳ�z�~��_�I�a�I");
		cm.worldMessage("�y���ɡz�G���a[ "+ cm.getChar().getName() +" ]�ϥΤF����npc,�{�b�ɶ��O[" + cm.getHour() + ":" + cm.getMin() + ":" + cm.getSec() + "]");
		cm.dispose();
		}
	}
}