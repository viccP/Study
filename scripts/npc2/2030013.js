var status = 0;

function start() {
	cm.sendSimple ("�A�n�I�o�̬O�ݼɪ��]���ª��J�f�A�p�G�A�u���Q�D�ԡA���ʶR #b#t4001017##k�C#k\r\n#k#L0##r�ڧƱ�R #b���K����#k ���� 1 ����#k\r\n#k#L1##b�ڤw�g�� #b���K����#k , ���ڶi�h#k")
}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){ 
		case 0:
			if (cm.getMeso() >= 1) {
			cm.gainMeso(-1);
			cm.gainItem(4001017, 1);
			cm.sendOk("���´f�U!");
		        cm.dispose();
			}else{
		        cm.sendOk("�ܩ�p�A�A���W�S������������!");
		        cm.dispose();
			}
		break;
		case 1:
			if (cm.getLevel() >= 50 && cm.haveItem(4001017, 1)) {
			cm.sendOk("�����K�������Ť]10��,�n�a!���A�i�h!");
			cm.worldMessage("���a"+ cm.getChar().getName() +"�i�J�F���]�a��");
			cm.warp(280030000, 0);
		        cm.dispose();
			}else{
		        cm.sendOk("�A���ŤӧC�F!\r\n�o�̦ܤ֭n#r50��#k�~��i�h!\r\n�Ϊ̧A�S��#r���K����#k!");
		        cm.dispose();
}

			}
		}