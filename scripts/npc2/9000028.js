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
            cm.sendNext("圣诞快乐 ！");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendYesNo("哟哟哟，切克闹，要不要去大保健！");
        } else if (status == 1) {
            if (cm.haveItem(4031329, 1)) {
                cm.gainItem(4001325, +1);
                cm.warp(701000210);

                cm.removeAll(4001159);
                cm.removeAll(4001160);
            } else {
                cm.warp(701000210);
                cm.removeAll(4001159);
                cm.removeAll(4001160);
            }
        }
    }

}