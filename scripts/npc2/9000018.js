/*
 * 
 * @returns
 * @׷��ð�յ�079һ��
 */

function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("��л��Ĺ��٣�");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("\r\n����װ�������̴�����������ʲô������#b\r\n#L1#����װ������һ��");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendOk("#ewww.jqmxd.cn");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendOk("#e��������Ѳ��㣡�뼰ʱ��ֵ��");
                cm.dispose();
            } else if (selection == 2) {
                cm.openNpc(9000018,1);
            } else if (selection == 3) {
                cm.openNpc(9000018,2);
            } else if (selection == 4) {
                cm.openNpc(9330042,0);
        } else if (selection == 5) {
            if (cm.getzb() >= 40) {
                cm.setzb(-40);
                cm.openNpc(9030100,0);
            } else {
                cm.sendOk("#e��������Ѳ��㣡�뼰ʱ��ֵ��");
                cm.dispose();

            }
        }
    }
}
}


