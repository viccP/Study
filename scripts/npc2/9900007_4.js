/**
 * @��������������������
 * @ÿ��ǩ������ȡ��Ʒ npc
 * @npcName��ð�յ���ӪԱ
 * @npcID��   9900004
 **/
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
            var txt1 = "#L1#" + ��ɫ��ͷ + "��ȡ10������#r#v1002723# #v5200000##l\r\n\r\n";
            var txt2 = "#L2#" + ��ɫ��ͷ + "#d��ȡ30������#v1142000# #v5190001# \r\n\r\n";
            var txt3 = "#L3##b" + ��ɫ��ͷ + "��ȡ60������#v 5150040# #v5532000# #v5160000# "+����new+"\r\n\r\n";
            var txt4 = "#L6##r" + ��ɫ��ͷ + "#r��ȡ120������ #v1142074# #v5520000# #v2022678# #v5010005# "+����new+"\r\n\r\n";
            var txt5 = "#L5##r" + ��ɫ��ͷ + "�鿴�ȼ�����" + ����new + ""
            var txt6 = "#L4##g" + ��ɫ��ͷ + "׷�����ְ���" + ����new + "\r\n\r\n"
            cm.sendSimple("С��齱����ȡϵͳ.\r\n\r\n" + txt1 + "" + txt2 + "" + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "");

        } else if (status == 1) {
            if (selection == 1) { //10��
                if (cm.getChar().getPresent() == 0 && cm.getPlayer().getLevel() >= 10) {
                    cm.gainItem(1002723, 1);
                    cm.getChar().setPresent(1);
                    cm.gainMeso(+100000);
                    cm.getChar().saveToDB(true,true);
                    cm.sendOk("��ϲ������С��齱�� LV 10��\r\n#v1002723# #rð�ձ� 10��");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + " �����С�����ļLV10��������", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡʧ�ܣ���ȷ����ĵȼ��ﵽ�����������Ѿ���ȡ���ˣ�");
			cm.Lunpan();
			cm.gainNX(+88888);
                    cm.dispose();
                }
            } else if (selection == 2) { //30
                if (cm.getChar().getPresent() == 1 && cm.getPlayer().getLevel() >= 30) {
                    cm.gainItem(5190001, 1);
                    cm.gainItem(1142000,1);
                    cm.getChar().setPresent(2);
                    cm.getChar().saveToDB(true,true);
                    cm.sendOk("��ϲ������С��齱�� LV 30��\r\n#v5190001# #v1142000#");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + " �����С�����ļLV30��������", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡʧ�ܣ���ȷ����ĵȼ��ﵽ�����������Ѿ���ȡ���ˣ�");
                    cm.dispose();
                }
            } else if (selection == 3) {//60 5150040
                 if (cm.getChar().getPresent() == 2 && cm.getPlayer().getLevel() >= 30) {
                    cm.gainItem(5150040, 1);
                    cm.gainItem(5532000,2);
                    cm.gainItem(5160000,1);
                    cm.getChar().setPresent(3);
                    cm.settuiguang2(+10);
                    cm.getChar().saveToDB(true,true);
                    cm.sendOk("��ϲ������С��齱�� LV 60��\r\n#v5150040# #v5532000# x2 #v5160000#\r\n#r��ļ���С�������1000��ȯ��");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + " �����С�����ļLV60��������", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡʧ�ܣ���ȷ����ĵȼ��ﵽ�����������Ѿ���ȡ���ˣ�");
                    cm.dispose();
                }
            } else if (selection == 4) { //��ţ���ְ���
                 cm.settuiguang2(+10);
                cm.sendOk(""+Բ��+" ׷�����ְ���\r\n"+��ɫ��ͷ+"ȫ�̽���Ϊ�������лл֧��׷��ð�յ���\r\n\r\n"+��ɫ��ͷ+"�κ�˽�ĳ�ֵ�Ķ���ƭ�ӣ���ֹ�ǵ���˽�½��ף�����һ��ɾ���˺Ŵ���", 2)
                cm.dispose();
            } else if (selection == 5) { //���������г�
                cm.displayLevelRanks();
                cm.dispose();
            } else if (selection == 6) { //װ���ֽ�ϵͳ
                 if (cm.getChar().getPresent() == 3 && cm.getPlayer().getLevel() >= 120) {
                    cm.gainItem(1142074, 1);
                    cm.gainItem(5520000,1);
                    cm.gainItem(2022678,1);
                    cm.gainItem(5010005,1);
                    cm.getChar().setPresent(4);
                    cm.settuiguang2(+10);
                    cm.getChar().saveToDB(true,true);
                    cm.sendOk("��ϲ������С��齱�� LV 120��\r\n #v1142074# #v5520000# #v2022678# #v5010005#\r\n#r��ļ���С�������1000��ȯ��");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + " �����С�����ļLV60��������", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡʧ�ܣ���ȷ����ĵȼ��ﵽ�����������Ѿ���ȡ���ˣ�");
                    cm.dispose();
                }
            } else if (selection == 7) { //����רְ
                cm.openNpc(9900002, 0);
            } else if (selection == 8) { //ѧϰ���켼��
                cm.openNpc(9310059, 0);
            } else if (selection == 9) { //����̵�
                if (cm.getMeso() >= 2000) {
                    cm.openShop(603);
                    cm.gainMeso(-2000);
                    cm.dispose();
                } else {
                    cm.sendOk("ð�ձ�2000�ſ��Դ�Զ���̵ꡣ");
                    cm.dispose();
                }
            } else if (selection == 10) { //Ԫ������npc
                cm.openNpc(9900004, 11); //����
            } else if (selection == 11) { //���ֻ����
                cm.openNpc(9900004, 1);//
            } else if (selection == 12) { //��Ծ��ϵͳ
                cm.openNpc(9100106, 0); //�ձ��߼����ְٱ���
            } else if (selection == 13) { //�����
                cm.openNpc(9000018, 0); //�����
            }
        }
    }
}
