var �����Ʒ = "#v1302000#";
var x1 = "1302000,+1";// ��ƷID,����
var x2;
var x3;
var x4;

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
            if(cm.CPQMap() == false){
                cm.sendOk("��û�ڼ��껪������.�޷�ʹ�ã�");
                cm.dispsoe();
            }
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "���껪����CPֵ��ʾ��\r\n";
            if (cm.getPlayer().getTeam() == 0) {
                text += "���ҷ���������CPֵ��" + cm.CPQgdcp(0) + "\r\n"
                text += "���ҷ����������CPֵ��" + cm.CPQkycp(0) + "\r\n"
                text += "-------------------------------------\r\n"
                text += "���з�����������CPֵ��" + cm.CPQgdcp(1) + "\r\n"
                text += "���з������������CPֵ��" + cm.CPQkycp(1) + "\r\n"
            } else if (cm.getPlayer().getTeam() == 1) {
                text += "���ҷ���������CPֵ��" + cm.CPQgdcp(1) + "\r\n"
                text += "���ҷ����������CPֵ��" + cm.CPQkycp(1) + "\r\n"
                text += "-------------------------------------\r\n"
                text += "���з�����������CPֵ��" + cm.CPQgdcp(0) + "\r\n"
                text += "���з������������CPֵ��" + cm.CPQkycp(0) + "\r\n"
            }
            text += "#L1##b���ٻ���������ܡ�������CP��7��#l\r\n\r\n";//1
            text += "#L2##b���ٻ���������˫�㡿������CP��7��#l\r\n\r\n";//1
            text += "#L3##b���ٻ���ˮ���󡿡�����CP��8��#l\r\n\r\n";//1
            text += "#L4##b���ٻ���С��ħ��������CP��8��#l\r\n\r\n";//1
            text += "#L5##b���ٻ���ľ�������������CP��9��#l\r\n\r\n";//1
            text += "#L6##b���ٻ��������ౡ�������CP��9��#l\r\n\r\n";//1
            text += "#L7##b���ٻ���Ů�����ˡ�������CP��10��#l\r\n\r\n";//1
            text += "#L8##b���ٻ������ľ�֡�������CP��11��#l\r\n\r\n";//1
            text += "#L9##b���ٻ�����ħ֮ĸ��������CP��12��#l\r\n\r\n";//1
            text += "#L10##b���ٻ���ս�״������㡿������CP��30��#l\r\n\r\n";//1

            cm.sendSimple(text);
        } else if (selection == 1) { //�������
            cm.MonsterCarnival(0, 1);
        } else if (selection == 2) {  //������˫��
            cm.MonsterCarnival(0, 2);
        } else if (selection == 3) { //ˮ����
            cm.MonsterCarnival(0, 3);
        } else if (selection == 4) { //С��ħ
            cm.MonsterCarnival(0, 4);
        } else if (selection == 5) { //ľ�����
            cm.MonsterCarnival(0, 5);
        } else if (selection == 6) { //������
            cm.MonsterCarnival(0, 6);
        } else if (selection == 7) { //Ů������
            cm.MonsterCarnival(0, 7);
        } else if (selection == 8) { //���ľ��
            cm.MonsterCarnival(0, 8);
        } else if (selection == 9) { //��ħ֮ĸ
            cm.MonsterCarnival(0, 9);
        } else if (selection == 10) { //ս�״�������
            cm.MonsterCarnival(0, 10);
        }
    }
}


