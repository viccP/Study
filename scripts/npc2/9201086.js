/*
�����ʵ���g
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
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)                           						
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple ("�A�Q�n�[�ݭ���¾�~���ޯ��?\r\n\#r#L0##e�C�h#r#L1#�k�v#L2#�}�b��#L3#�s��#L4#���s");
        } else if (status == 1) {
            switch(selection) {
                case 0: cm.openNpc(1002003); break;
                case 1: cm.openNpc(9201023); break;
                case 2: cm.openNpc(9201026); break;
                case 3: cm.openNpc(9201028); break;
                case 4: cm.openNpc(9201029); break;
           
	    }
        }
    }
}