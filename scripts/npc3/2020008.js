/*
 * 
 *��֮�η¹ٷ���
 *ģ��սʿ��ת����ű�
 */
function start() {
    status = -1;

    action(1, 0, 0);
}
var �ڷ� = 4031059;
var ֤�� = 4031334;
var �������� = 4031058;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("�ź�...");
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
            if (cm.haveItem(�ڷ�, 1) && cm.haveItem(֤��, 0)) {
                var zhuanzhi = "#L1#���е�����תְ#l";
            } else {
                var zhuanzhi = "#L3#�����˽������תְ������#l";
            }
            if (cm.haveItem(֤��, 1)) {
                var renwu = "";
            } else {
                var renwu = "#L0#������תְ����[�ɽ���]#l"
            }
            if (cm.getJob() == 110 || cm.getJob() == 120 || cm.getJob() == 130) {
                var jieshao = "��������ʲô�¡���#b\r\n" + renwu + "\r\n" + zhuanzhi + "";
            } else {
                var jieshao = "��?����#b\r\n#L3#�����˽�תְ#l"
            }
            cm.sendSimple("" + jieshao + "");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getLevel() >= 70) {
                    cm.sendOk("��������е�����תְ��....�⵱ȻҪ���������������...\r\n��ȥ#rתְ1ת�̹�������ܿ����.#b���Ѿ��������Ƽ����ˡ�#k");
                    cm.gainItem(֤��, 1);
                    cm.dispose();
                } else {
                    cm.sendOk("������תְ��Ҫ��ʮ���ſ��Կ�����");
                    cm.dispose();
                }
            } else if (selection == 1) {
                if (cm.getLevel() >= 70 && cm.haveItem(��������, 1) && cm.haveItem(�ڷ�, 1)) {
                    if (cm.getJob() == 110) {
                        cm.changeJob(111);
                        cm.getChar().gainAp(5);
                        cm.sendOk("תְ�ɹ�!");
                        cm.gainItem(��������, -1);
                        cm.gainItem(�ڷ�, -1);
                        cm.dispose();
                    } else if (cm.getJob() == 120) {
                        cm.changeJob(121);
                        cm.getChar().gainAp(5);
                        cm.sendOk("תְ�ɹ�!");
                        cm.gainItem(��������, -1);
                        cm.gainItem(�ڷ�, -1);
                        cm.dispose();
                    } else if (cm.getJob() == 130) {
                        cm.changeJob(131);
                        cm.getChar().gainAp(5);
                        cm.sendOk("תְ�ɹ�!");
                        cm.gainItem(��������, -1);
                        cm.gainItem(�ڷ�, -1);
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("�޷�תְ����ȷ�����Ƿ���ܿ��顣\r\n��Ҫ�߱�һ��������\r\n�ǻ����� x1(ˮ������#b���ص�ѩԭʥ��#k) \r\n�ڷ� x1(���һת�̹ٿ���ɻ��) \r\nLevel ���ڻ����70.");
                    cm.dispose();
                }
            } else if (selection == 2) {
                cm.openNpc(1300000, 0);
            } else if (selection == 3) {
                cm.sendOk("������תְ��������ͬС��");
                cm.dispose();
            } else if (selection == 4) {
                cm.openNpc(9330042, 0);
            } else if (selection == 5) {
            }
        }
    }
}


