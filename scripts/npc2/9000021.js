/*
 * 
 * @��֮��
 * �Ѽ�npc 9000021
 * ѫ�¶һ�ϵͳ
 */
importPackage(net.sf.cherry.client);
var status = 0;
var ��ˮ�� = 4021008;
var ��ˮ�� = 4021001;
var ʱ��֮ʯ = 4021010;
var ���� = "#fUI/UIWindow/Quest/reward#";
var �������� = "#fUI/UIWindow/Quest/summary#"
var ���ʻ�� = "#fUI/UIWindow/Quest/prob#";
var ��������� = "#fUI/UIWindow/Quest/basic#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new = "#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ��̾��2 = "#fUI/UIWindow/Quest/icon1#";
var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";
var 糺쿪��ʱ�� = "#r<ÿ��10��/13��/9�㿪��>#k";
var ɨ������ʱ�� = "#r<ȫ�տ���>#k";
var 糺�Կ�� = 5252006;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    var 糺���� = cm.getBossLog('feihong');
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
            if(cm.getHour() == 21){
              cm.sendOk("#e#r#b�ż�ħ��#rֻ��������#b21��#r�����ٻ���\r\nԤ�棺\r\n#n\r\n#d��˯�ڶ���ɭ�ֵ��ż�ħ����ÿ��21��Ľ���򿪡�\r\nͨ���ң��ṩħ�����Ͽ��Խ���ͨ�����ٻ�ħ����Ӯ�÷������\r\n\r\n#rħ�����أ�\r\n#b��������/��Ʒ����/�̳ǵ���/ϡ�о���/ϡ������/����/���");
              cm.dispose();
              return;
            }else{
            var ǰ�� = "#d��ͨ���ٻ�#r�ż�ħ��#d������ٻ����ż�ħ����Ҫ����ħ����Ʒ#b��Ҷ#d.����ð���߿��Ծ��׳�#b��Ҷ#d���ٻ�#r�ż�ħ��#d��\r\n\r\n#k�ż�ħ���ٻ����ȣ�"+cm.��ѯboss����()+"/10000#n\r\n\r\n";
            if(cm.��ѯboss����() < 10000){
                var ��1 = "#L1#����#b��Ҷ#k 10:1 #r500��\r\n\r\n";
                var ��2 = "#L2##d����#g�ƽ��Ҷ#k 5:1 #r500��\r\n\r\n";//4000313
                var ��3 = "#L3##r����#b���#k 1:1 #r1000����";
            }else{
                var ��1 = "#L4##e���ż�ħ�����\r\n\r\n";
                var ��2 = "";//4000313
                var ��3 = "";
            }
            var ��4 = "";
            var ��5 = "";
            cm.sendSimple("" + ǰ�� + "" + ��1 + "" + ��2 + "" + ��3 + "" + ��4 + "" + ��5 + "");
            }
        } else if (status == 1) {
            if (selection == 1) {//��Ҷ
                if(cm.haveItem(4001126,500)){
                    cm.����boss����(+50);
                    cm.gainItem(4001126,-500);
                    cm.sendOk("����500��Ҷ��\r\n���ȣ�"+cm.��ѯboss����()+"/10000");
                    if(cm.��ѯboss����() < 10000){
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[�ż�ͨ��]" + " : " + "�����ż�ͨ���С���[����: "+cm.��ѯboss����()+"/10000]",true).getBytes()); 
                    }else{
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[�ż�ͨ��]" + " : " + "�ż�ͨ�����ˣ���������λ��ʿ����ǰ����ս����",true).getBytes()); 
                    }
                    cm.dispose();
                }else{
                    cm.sendOk("��Ҷ���㡣�޷�ʹ�ã�");
                    cm.dispose();
                }
            } else if (selection == 2) { 
                if(cm.haveItem(4000313,500)){
                    cm.����boss����(+100);
                    cm.gainItem(4000313,-500);
                    cm.sendOk("���ĳɹ���\r\n���ȣ�"+cm.��ѯboss����()+"/10000");
                    if(cm.��ѯboss����() < 10000){
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[�ż�ͨ��]" + " : " + "�����ż�ͨ���С���[����: "+cm.��ѯboss����()+"/10000]",true).getBytes()); 
                    }else{
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[�ż�ͨ��]" + " : " + "�ż�ͨ�����ˣ���������λ��ʿ����ǰ����ս����",true).getBytes()); 
                    }
                    cm.dispose();
                }else{
                    cm.sendOk("���㡣�޷�ʹ�ã�");
                    cm.dispose();
                }
            } else if (selection == 3) {
                if(cm.getNX() >= 1000){
                    cm.����boss����(+1000);
                    cm.gainNX(-1000);
                    cm.sendOk("���ĳɹ���\r\n���ȣ�"+cm.��ѯboss����()+"/10000");
                    if(cm.��ѯboss����() < 10000){
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[�ż�ͨ��]" + " : " + "�����ż�ͨ���С���[����: "+cm.��ѯboss����()+"/10000]",true).getBytes()); 
                    }else{
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[�ż�ͨ��]" + " : " + "�ż�ͨ�����ˣ���������λ��ʿ����ǰ����ս����",true).getBytes()); 
                    }
                    cm.dispose();
                }else{
                    cm.sendOk("���㡣�޷�ʹ�ã�");
                    cm.dispose();
                }
            } else if (selection == 4) { 
                if(cm.getC().getChannel() == 2){
                    cm.warp(930000700);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[�ż�ħ��]" + " : " + " [" + cm.getPlayer().getName() + "]�������ż�ħ����ս����" + cm.getC().getChannel() + "Ƶ��",true).getBytes()); 
                    cm.dispose();
                }else{
                    cm.sendOk("�㲻��2�ߡ������ż�ħ��ר�ߣ��޷����ͽ��룡��");
                    cm.dispose();
                }
            }
        }
    }
}
