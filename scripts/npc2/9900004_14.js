
importPackage(net.sf.cherry.client);
var status = 0;
var ��ˮ�� = 4021008;
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new = "#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";
var �Ҹ� = "#k��ܰ��ʾ���κηǷ��������ҷ�Ŵ���.��ɱ��������.";
var �﹥���� = 1702118;
var ħ������ = 1702119;
var ��ɫ��ţ�� = 4000000;
var ʱ��֮ʯ = 4021010;
var ��ͷ = 4000017;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var txt1 = " #L1#" + ������ͷ + " #b��������#l";
            var txt2 = " #L2#" + ������ͷ + " #r�������#l";
            var txt3 = " #L3#" + ������ͷ + " #g�������#l";
            var txt4 = "  	  #L4#" + ������ͷ + " #dʣ����"+ cm.getNX() +"#l\r\n\r\n";
            cm.sendSimple("		 ��ӭ�������ð�յ�\r\n" + txt4 + " \r\n" + txt1 + "" + txt2 + " " + txt3 + "");
        } else if (status == 1) {
            if (selection == 1) {//װ��Ǳ������
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
                    cm.sendOk("������Ӧ����װ�����ճ�1��");
                    cm.dispose();
                    return;
                }
                if (cm.haveItem(��ɫ��ţ��, 500) && cm.haveItem(ʱ��֮ʯ, 200) && cm.haveItem(��ͷ, 1)) {
                    cm.gainItem(��ɫ��ţ��, -500);
                    cm.gainItem(ʱ��֮ʯ, -200);
                    cm.gainItem(��ͷ, -1);
                    cm.sendOk("�ϳɳɹ���");
                    cm.gainItem(�﹥����, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ϳ�ϵͳ]" + " : " + " [" + cm.getPlayer().getName() + "]�ϳ���[��Ŭ˹�Ľ�|���𣺡�����]", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("���ϲ��㡣�޷��ϳɣ�");
                    cm.dispose();
                }
            } else if (selection == 2) { //�ֽ����
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
                    cm.sendOk("������Ӧ����װ�����ճ�1��");
                    cm.dispose();
                    return;
                }
                if (cm.haveItem(��ɫ��ţ��, 500) && cm.haveItem(ʱ��֮ʯ, 200) && cm.haveItem(��ͷ, 1)) {
                    cm.gainItem(��ɫ��ţ��, -500);
                    cm.gainItem(ʱ��֮ʯ, -200);
                    cm.gainItem(��ͷ, -1);
                    cm.sendOk("�ϳɳɹ���");
                    cm.gainItem(ħ������, 1);
                    cm.dispose();
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ϳ�ϵͳ]" + " : " + " [" + cm.getPlayer().getName() + "]�ϳ���[������Ľ�|���𣺡�����]", true).getBytes());
                } else {
                    cm.sendOk("���ϲ��㡣�޷�Ϊ��ϳɡ�");
                    cm.dispose();
                }
            } else if (selection == 3) {
                cm.sendOk("�����ڴ���");
                cm.dispose();
            } else if (selection == 4) {
                cm.openNpc(9900004, 10);
            }
        }
    }
}
