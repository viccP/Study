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
            cm.sendSimple("���o��, �ڬOCOCO, �o��ӭ�����!\r\n�ݭn�ʶR�W�n��? :\r\n#b#L0#1 �I = 1�U.#l\r\n#L1#5 �I = 4�U.#l\r\n#L2#10 �I = 7�U.\r\n#L3#20 �I = 25�U.#l\r\n\r\n#k���ֽĨ�3�U�a!");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendYesNo("�A�T�w�n�R #b1�U#k for #b1 �I#k ??");
                lol = 1;
            } else if (selection == 1) {
                cm.sendYesNo("�A�T�w�n�R #b4�U#k for #b5 �I#k ??");
                lol = 2;
            } else if (selection == 2) {
                cm.sendYesNo("�A�T�w�n�R #b7�U#k for #b10 �I#k ??");
                lol = 3;
            } else if (selection == 3) {
                cm.sendYesNo("�A�T�w�n�R #b15�U#k for #b20 �I#k ??");
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
                    cm.sendOk("�藍�_...\r\n�A����������.");
                    cm.dispose();
                }
            } else if (lol == 2) {
                if (cm.getMeso() >= 40000) {
                    cm.sendOk("Enjoy");
                    cm.gainMeso(-40000);
                    cm.gainFame(5);
                    cm.dispose();
                } else {
                    cm.sendOk("�藍�_...\r\n�A����������.");
                    cm.dispose();
                }
            } else if (lol == 3) {
                if (cm.getMeso() >= 75000) {
                    cm.sendOk("Enjoy");
                    cm.gainMeso(-75000);
                    cm.gainFame(10);
                    cm.dispose();
                } else {
                    cm.sendOk("�藍�_...\r\n�A����������.");
                    cm.dispose();
                }
            } else if (lol == 4) {
                if (cm.getMeso() >= 150000) {
                    cm.sendOk("Enjoy");
                    cm.gainMeso(-150000);
                    cm.gainFame(20);
                    cm.dispose();
                } else {
                    cm.sendOk("�藍�_...\r\n�A����������.");
                    cm.dispose();
                }
            }
        }
    }
}