
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
            var txt1 = " #L1#" + ������ͷ + " #b1000���һ��װ������ȯ#l\r\n\r\n";
            var txt2 = " #L2#" + ������ͷ + " #b�һ�3Сʱ�����׹#l\r\n\r\n";
            var txt3 = " #L2#" + ������ͷ + " #b�һ�3Сʱ���Զ���#l\r\n\r\n";
            var txt4 = " #L2#" + ������ͷ + " #b�һ�3Сʱ��������#l\r\n\r\n";
            var txt5 = " #L2#" + ������ͷ + " #b�һ�3Сʱ��������#l\r\n\r\n";
            //var txt2 = " #L2#" + ������ͷ + " #r�������#l";
            //var txt3 = " #L3#" + ������ͷ + " #g�������#l";
            cm.sendSimple("#r����������װ�����޶һ�ϵͳ����������#l\r\n" + txt1 + "" + txt2 + " " + txt3 + " " + txt4 + " " + txt5 + " ");
        } else if (status == 1) {
            if (selection == 1) {//װ��Ǳ������
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
                    cm.sendOk("������Ӧ����װ�����ճ�1��");
                    cm.dispose();
                    return;
                }
                if (cm.getNX() >= 1000) {
                    cm.gainNX(-1000);
                    cm.gainItem(5220007, 1);
                    //cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�һ�ϵͳ]" + " : " + " [" + cm.getPlayer().getName() + "]�һ���[�Ϲ����Ž�ָLV1]", true).getBytes());
                    cm.sendOk("�һ��ɹ�");
					cm.dispose();
                } else {
                    cm.sendOk("��û���㹻�ĵ��");
                    cm.dispose();
                }
            } else if (selection == 2) { //�ֽ����
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
                    cm.sendOk("������Ӧ����װ�����ճ�1��");
                    cm.dispose();
                    return;
                }
                if (cm.haveItem(5220007, 1)) {
                    cm.gainItem(5220007, -1);
                    var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                    var type = ii.getInventoryType(1122017);//ID 5030001
                    var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy();//ID 5030001
                    var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 60000 * 60 * 3 * 1);//ʱ��
                    toDrop.setExpiration(temptime);
                    toDrop.setLocked(1);
                    cm.getPlayer().getInventory(type).addItem(toDrop);
                    cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
					cm.sendOk("�һ��ɹ�");
                    cm.dispose();
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�һ�ϵͳ]" + " : " + " [" + cm.getPlayer().getName() + "]�һ���[3Сʱ�����׹]", true).getBytes());
                } else {
                    cm.sendOk("û��װ������ȯ.�޷��һ���");
                    cm.dispose();
                }
            } else if (selection == 3) {
            } else if (selection == 4) {
            } else if (selection == 5) {
            } else if (selection == 6) {
            } else if (selection == 7) {
            } else if (selection == 8) {
            }
        }
    }
}
