/*
 * WNMS ������
 * @�򵥻����ű� 
 */

//---------����1-------
var ��Ʒ1���� = "500"; //����1 ��Ҫ������
var ��Ʒ1 = "1302000"; //����1 ��Ҫ����Ʒ
var ���1 = "1000";    //����1 ��ɵĵ��
//---------����2-------
var ��Ʒ2���� = "500"; //����1 ��Ҫ������
var ��Ʒ2 = "1302000"; //����1 ��Ҫ����Ʒ
var ���2 = "1000";    //����1 ��ɵĵ��
//---------����3-------
var ��Ʒ3���� = "500"; //����1 ��Ҫ������
var ��Ʒ3 = "1302000"; //����1 ��Ҫ����Ʒ
var ���3 = "1000";    //����1 ��ɵĵ��

function start() {
   	cm.openNpc(9900007,666);
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) { //����1
        if (cm.haveItem(��Ʒ1, ��Ʒ1����) && cm.getPlayer().getBossLog("renwu1") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���1 + "���");
            cm.getPlayer().setBossLog("renwu1");
            cm.gainItem(��Ʒ1, -��Ʒ1����);
            cm.gainNX(+���1);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]�������һ������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
    } else if (selection == 1) {
        if (cm.haveItem(��Ʒ2, ��Ʒ2����) && cm.getPlayer().getBossLog("renwu2") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���2 + "���");
            cm.getPlayer().setBossLog("renwu2");
            cm.gainItem(��Ʒ2, -��Ʒ2����);
            cm.gainNX(+���2);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]��������������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
    } else if (selection == 2) {
        if (cm.haveItem(��Ʒ3, ��Ʒ3����) && cm.getPlayer().getBossLog("renwu3") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���3 + "���");
            cm.getPlayer().setBossLog("renwu3");
            cm.gainItem(��Ʒ3, -��Ʒ3����);
            cm.gainNX(+���3);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]���������������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
    }
}