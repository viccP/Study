/*
 * @�̳�ѡ��npc ѡ���Ƿ�ص��̳ǻ���ȥ�Ĳ���
 * ������ - WNMS
 */
var status = 0;
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new = "#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("����ð�յ��̳ǵİ�ť����Ŷ~");
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.sendOk("����ð�յ��̳ǵİ�ť����Ŷ~");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getPlayer().getvip() == 0 && cm.getcz() < 500) {
                var zt = "#L1##d����[��ʯ��Ա] - �����20%�ӳ�" + ��̾�� + "#l";

            } else if (cm.getPlayer().getvip() < 2 && cm.getcz() >= 500) {
                var zt = "#L2##d����Ϊ[�����Ա] - #r�����50%�ӳ�" + ��̾�� + "" + ��̾�� + "#l";
            } else if(cm.getPlayer().getvip() >= 2){
                var zt ="";
            }
            cm.sendSimple("Ŀǰ�˺��Ѿ���ֵ�� " + cm.getcz() + " RMB����ѡ����Ҫ�Ĳ�����\r\n"+zt+"\r\n\r\n#L4##r����Ӯ�󽱣�"+����new+"#l #b#L5#�ϻ�������ϵͳ��δ���Ų�����Ŀ��"+����new+"");
        } else if (status == 1) {
            if (selection == 1) {//vip1
                cm.sendOk("������Ա1�ɹ���");
                cm.getPlayer().setvip(1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����桽" + " : " + " [" + cm.getPlayer().getName() + "]��Ϊ����ʯ��Ա�����ף�ذɣ���",true).getBytes()); 
                cm.dispose();
            
            //�ι���ϵͳ
            } else if (selection == 2) {
                cm.sendOk("������Ա�ɹ���");
                cm.getPlayer().setvip(2);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����桽" + " : " + " [" + cm.getPlayer().getName() + "]��Ϊ�ˡ����������Ա�������������������ף�ذɣ���",true).getBytes()); 
                cm.dispose();
            //����ϵͳ   ��ľ 50��Ҷ
            } else if (selection == 3) {
                cm.sendOk("���Ѿ��ǻ�Ա�ˣ�");
                cm.dispose();
            } else if (selection == 4) {//�²²�
                if (cm.getPlayer().getvip() < 1) {
                   cm.sendOk("�㲻�ǻ�Ա���޷����������Ŀ��");
                } else {
                  cm.openNpc(9000019,4);
                }
            } else if (selection == 5) {//�ϻ���ϵͳ
                cm.ʹ���ϻ���();
                cm.dispose();
            } else if (selection == 6) {
                if (cm.getNX() >= 500) {
                    cm.gainNX(-500);
                    cm.���̵��3();
                } else {
                    cm.sendOk("�����");
                    cm.dispose();
                }
            } 
        }
    }
}