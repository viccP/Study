/*
 * 
 *@��֮��
 *@����ϳ�ϵ��npc
 */
function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    var ��ˮ�� = 4021008;
    var ʱ��֮ʯ = 4021010;
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("�в��ϣ�ʲô����˵��");
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

            cm.sendSimple("#b�ö����������Ժϳɣ�#k\r\n#L1#�һ�#b#z1142186##k<#r�ַ� 300��ʱ��֮ʯ 200��ð�ձ�>#l\r\n\r\n#L2##b�ϳɲر�����Ʊ#v4001136#<���ÿ���ͽ���Ի��>#l\r\n")
        } else if (status == 1) {
            if (selection == 0) {
                 cm.dispose();
            } else if (selection == 1) {
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("������Ӧ����װ�����ճ�һ��");
        cm.dispose();
    } else {
                if (cm.haveItem(4032588,1)&&cm.haveItem(4032589,1)&&cm.haveItem(4032590,1)&&cm.haveItem(4032591,1)&&cm.haveItem(4021010,300)&&cm.getMeso()>=2000000){
                    cm.sendOk("�ϳɳɹ�����ɹ��һ���ѫ�£�");
                    cm.gainItem(1142186,1);
                    cm.gainItem(4032588,-1);
                    cm.gainItem(4032589,-1);
                    cm.gainItem(4032590,-1);
                    cm.gainItem(4032591,-1);
                    cm.gainItem(4021010,-300);
                    cm.gainMeso(-2000000);
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "" + " : " + "�ɹ��ϳ���ȫ����+5��[���ϻ�Ӵ]ѫ�£�.", true).getBytes());
                    cm.dispose();
                     }else{
                    cm.sendOk("�ϳ���Ҫ#v4032588# #v4032589# #v4032590# #v4032591# #v4021010#x300 ð�ձ�200�������Ƿ�߱�����������")
                    cm.dispose();
                }}
            } else if (selection == 2) {
                                     if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull()) {
        cm.sendOk("������Ӧ�����������ճ�һ��");
        cm.dispose();
    } else {
                if (cm.haveItem(4001136, 80)) {

                    var rand = 1 + Math.floor(Math.random() * 3);
                    if (rand == 1) {
                        cm.gainItem(4001136, -80); //��/ȹ�����������
                        cm.gainItem(5252001, 1);
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "" + " : " + "�ɹ��ϳ���һ�Ųر�����Ʊ��.", true).getBytes());
                        cm.dispose();
                    }else if (rand == 2) {
                        cm.gainItem(4001136, -80); //��/ȹ�����������
                        cm.gainItem(5252001, 1);
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "" + " : " + "�ɹ��ϳ���һ�Ųر�����Ʊ.", true).getBytes());
                        cm.dispose();
                    }else{
                        cm.gainItem(4001136, 15); //���
                        cm.gainItem(4001136, -80);
                        cm.sendOk("�ϳ�ʧ���ˡ�");
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "" + " : " + "�ϳɲر�ͼʧ���ˣ�", true).getBytes());
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("�о���80�ţ��޷�Ϊ��ϳɡ�");
                    cm.dispose();
                }}
            } else if (selection == 3) { //�ϳ���Ʒ
                cm.openNpc(9310059, 1);
            } else if (selection == 4) { //�򿪵��㳡npc 9330045
                cm.openNpc(9330045, 0);
            } else if (selection == 5) {//�һ����
                cm.openNpc(9330078, 0);
            } else if (selection == 6) {
                cm.warp(809030000);
                cm.dispose();



            } else if (selection == 7) {
                cm.sendOk("#e�Ҳ������㲻Ҫ���ˡ��㻹Ҫ����");
                cm.dispose();
            } else if (selection == 8) {
                if (cm.getzb() >= 10) {
                    cm.setzb(-10);
                    cm.openNpc(1012103);
                    cm.dispose();
                } else {
                    cm.sendOk("#e��������Ѳ��㣡�뼰ʱ��ֵ��");
                    cm.dispose();



                }
            }
        }
    }
}


