/*
 * 
 * @�����󹫸���
 * @WNMS ��֮��
 */
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
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
                    cm.sendSimple("�������������Ϊ�˸�ʲô��\r\n#L1##r���ѵ�����#k#l\r\n\r\n#L2##b��Ҫ��ȥ#l\r\n\r\n#L3##d���������Խ���#k");
		} else if (selection == 1) {
                    if(!cm.isLeader()){
                        cm.sendOk("�㲻���鳤���޷����ѣ�"); 
                        cm.dispose();
                    }else{
			if(cm.haveItem(4002000,1)){ //��Ʒ����
                            cm.gainItem(4002000,-1);
                            cm.summonMob(9400633,180000,5250,1);
                            cm.dispose();
			} else{
				cm.sendNextPrev("��Ҫ�Ѽ�#b1�� #v4002000#");
                                cm.dispose();
			}}
		
                }else if (selection == 2) { //��Ҫ��ȥ
                     var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
                        eim.disbandParty();
			cm.getEventManager("dydg").setup("entryPossible", "true");
                        cm.warp(100000000);
                        cm.dispose();
                }else if(selection == 3){
                    cm.sendOk("#e   �������ƣ�#b#o9400633##k  \r\n\r\n#r   HP : 180000#b  \r\n\r\n   MP : 500  \r\n\r\n#g   EXP 5250\r\n\r\n#k    ���ܺ���Ի�ô���ð�ձҡ�#r����������#k��\r\n    ������ʹ�ú����������#r��#k��ʹ��#b��������#k��\r\n    ����#r�����#k��");
                    cm.dispose();
                }
	}
}