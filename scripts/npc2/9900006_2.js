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
            text += "#L1##b��ʹ�á��ڰ���        ������CP��17��#l\r\n\r\n";//1
            text += "#L2##b��ʹ�á�������        ������CP��19��#l\r\n\r\n";//1
            text += "#L3##b��ʹ�á����䡿        ������CP��12��#l\r\n\r\n";//1
            text += "#L4##b��ʹ�á��ж���        ������CP��19��#l\r\n\r\n";//1
            text += "#L5##b��ʹ�á�������        ������CP��16��#l\r\n\r\n";//1
            text += "#L6##b��ʹ�á���ӡ��        ������CP��14��#l\r\n\r\n";//1
            text += "#L7##b��ʹ�á�ѣ�Ρ�        ������CP��22��#l\r\n\r\n";//1
            text += "#L8##b��ʹ�á�ȡ��buff��    ������CP��18��#l\r\n\r\n";//1

            cm.sendSimple(text);
        } else if (selection == 1) { //�ڰ�
            cm.MonsterCarnival(1, 0);
        } else if (selection == 2) {  //����[������]
            cm.MonsterCarnival(1, 1);
        } else if (selection == 3) { //����
            cm.MonsterCarnival(1, 2);
        } else if (selection == 4) { //�ж�
            cm.MonsterCarnival(1, 3);
        } else if (selection == 5) { //����
            cm.MonsterCarnival(1, 4);
        } else if (selection == 6) { //��ӡ
            cm.MonsterCarnival(1, 5);
        } else if (selection == 7) { //ѣ��
            cm.MonsterCarnival(1, 6);
        } else if (selection == 8) { //ȡ��buff
            cm.MonsterCarnival(1, 7);
        }
    }
}


