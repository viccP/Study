
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
            var txt1 = " #L1#" + ������ͷ + " #b3000�����һ�1����ˮ����Ʊ#l\r\n\r\n";
            var txt2 = " #L2#" + ������ͷ + " #b5000�����һ�1�Ż������#l\r\n\r\n";
            var txt3 = " #L3#" + ������ͷ + " #b8000�����һ�1��ף������#l\r\n\r\n";
            var txt4 = " #L4#" + ������ͷ + " #b10000�����һ�1�����#l\r\n\r\n";
            var txt5 = " #L5#" + ������ͷ + " #b20000�����һ����أ��֣�#l\r\n\r\n";
            var txt6 = " #L6#" + ������ͷ + " #b30000�����һ����ˣ��ۣ�#l\r\n\r\n";
            var txt7 = " #L7#" + ������ͷ + " #b50000���������ȡ110����һ��#l\r\n\r\n";
            var txt8 = " #L8#" + ������ͷ + " #b100000�����һ�������һ��#l";
            //var txt2 = " #L2#" + ������ͷ + " #r�������#l";
            //var txt3 = " #L3#" + ������ͷ + " #g�������#l";
            cm.sendSimple("#r���������������һ�ϵͳ����������#l\r\n" + txt1 + "" + txt2 + " " + txt3 + " " + txt4 + " " + txt5 + " " + txt6 + " " + txt7 + " " + txt8 + " ");
        } else if (status == 1) {
            if (selection == 1) {//װ��Ǳ������
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
                    cm.sendOk("������Ӧ����װ�����ճ�1��");
                    cm.dispose();
                    return;
                }
                if (cm.haveItem(4002002, 1)) {
                    cm.gainItem(4002002, -1);
                    cm.gainItem(1112446, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�һ�ϵͳ]" + " : " + " [" + cm.getPlayer().getName() + "]�һ���[�Ϲ����Ž�ָLV1]", true).getBytes());
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
                if (cm.haveItem(4002002, 1)) {
                    cm.gainItem(4002002, -1);
                    cm.gainItem(1112738, 1);
                    cm.dispose();
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�һ�ϵͳ]" + " : " + " [" + cm.getPlayer().getName() + "]�һ���[������֮��ָ]", true).getBytes());
                } else {
                    cm.sendOk("���ϲ��㡣�޷�Ϊ��ϳɡ�");
                    cm.dispose();
                }
            } else if (selection == 3) {
                    cm.sendOk("��δ���š�");
                    cm.dispose();
            } else if (selection == 4) {
            } else if (selection == 5) {
            } else if (selection == 6) {
            } else if (selection == 7) {
            } else if (selection == 8) {
            }
        }
    }
}
