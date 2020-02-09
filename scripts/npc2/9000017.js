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
            cm.sendSimple("哈囉哈, 我是COCO, 這位帥哥正咩!\r\n需要購買名聲嗎? :\r\n#b#L0#1 點 = 1萬.#l\r\n#L1#5 點 = 4萬.#l\r\n#L2#10 點 = 7萬.\r\n#L3#20 點 = 25萬.#l\r\n\r\n#k趕快衝到3萬吧!");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendYesNo("你確定要買 #b1萬#k for #b1 點#k ??");
                lol = 1;
            } else if (selection == 1) {
                cm.sendYesNo("你確定要買 #b4萬#k for #b5 點#k ??");
                lol = 2;
            } else if (selection == 2) {
                cm.sendYesNo("你確定要買 #b7萬#k for #b10 點#k ??");
                lol = 3;
            } else if (selection == 3) {
                cm.sendYesNo("你確定要買 #b15萬#k for #b20 點#k ??");
                lol = 4;
            }
        } else if (status == 2) {
            if (lol == 1) {
                if (cm.getMeso() >= 10000) {
                    cm.sendOk("Enjoy");
                    cm.gainMeso(-10000);
                    cm.gainFame(1);
                    cm.dispose();
                } else {
                    cm.sendOk("對不起...\r\n你的金錢不夠.");
                    cm.dispose();
                }
            } else if (lol == 2) {
                if (cm.getMeso() >= 40000) {
                    cm.sendOk("Enjoy");
                    cm.gainMeso(-40000);
                    cm.gainFame(5);
                    cm.dispose();
                } else {
                    cm.sendOk("對不起...\r\n你的金錢不夠.");
                    cm.dispose();
                }
            } else if (lol == 3) {
                if (cm.getMeso() >= 75000) {
                    cm.sendOk("Enjoy");
                    cm.gainMeso(-75000);
                    cm.gainFame(10);
                    cm.dispose();
                } else {
                    cm.sendOk("對不起...\r\n你的金錢不夠.");
                    cm.dispose();
                }
            } else if (lol == 4) {
                if (cm.getMeso() >= 150000) {
                    cm.sendOk("Enjoy");
                    cm.gainMeso(-150000);
                    cm.gainFame(20);
                    cm.dispose();
                } else {
                    cm.sendOk("對不起...\r\n你的金錢不夠.");
                    cm.dispose();
                }
            }
        }
    }
}