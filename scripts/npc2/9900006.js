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
            text += "#L1##b���ٻ�����(���з��ٻ�)#l\r\n\r\n";//1
            text += "#L2##d��ʹ�÷�ӡ(��ӡ�з����)#l\r\n\r\n"//2
            text += "#L3##b���ٻ���(���Ҳ�֪�������)#l\r\n\r\n"//3

            cm.sendSimple(text);
        } else if (selection == 1) { //�ٻ�����
            cm.openNpc(9900004, 1234567);
        } else if (selection == 2) {  //ʹ�÷�ӡ
            cm.openNpc(9900004, 12345678);
        } else if (selection == 3) { //�ٻ���
            cm.openNpc(9900004, 12345679);
        }
    }
}


