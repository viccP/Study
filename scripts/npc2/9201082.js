var slot;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status <= 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("�Q�n�R���ɭԦA�ӧ�ڧa�I");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
            cm.sendGetNumber("�п�J�A�Q�ʶR���I��. \r\n �I�Ƥ��#r1:1000#�C\r\n�p�ثe��#b"+cm.getPlayer().getCSPoints(1) +"#k�I\r\n",1,1,2100000);
        } else if (status == 1) {
            slot = selection;
            if (cm.getMeso() < slot*1000){
                cm.sendOk("�p��������!!!")
                cm.dispose();
            }else
                cm.modifyNx(slot);
                cm.gainMeso(-slot*1000);
                cm.sendOk("���A�I���o!");
                cm.dispose();
    }
}
} 