/*
轉轉戀筆改寫
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
            cm.sendSimple ("你想要觀看哪個職業的技能書?\r\n\#r#L0##e劍士#r#L1#法師#L2#弓箭手#L3#盜賊#L4#海盜");
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