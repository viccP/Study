/**
 * @��������������������
 * @ÿ��ǩ������ȡ��Ʒ npc
 * @npcName��ð�յ���ӪԱ
 * @npcID��   9900004
 **/
importPackage(net.sf.cherry.client);
var status = 0;
var ��ˮ�� = 4021008;
var ��ˮ�� = 4021001;
var ʱ��֮ʯ = 4021010;

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
    var Сʱ = cm.getHour();
    var ���� = cm.getMin();
    //(cm.getHour() == 1) &&(cm.getMin() < 3)||(cm.getHour() == 20) &&(cm.getMin() < 3)
    var 糺쿪�� = (Сʱ == 8 &&���� >=50)|| (Сʱ == 12&&���� >= 50)|| (Сʱ == 20&&���� >= 50);
    if (糺쿪��) {
        var ��ս״̬ = "#g������" + ��̾�� + "";
    } else {
        var ��ս״̬ = "#d�ر���" + ��̾��2 + "";
    }
     var �ַ�ʱ�� = (Сʱ == 21&&���� >= 50);
    if (�ַ�ʱ��) {
        var �ַ�״̬ = "#g������" + ��̾�� + "#k";
    } else {
        var �ַ�״̬ = "#d�ر���" + ��̾��2 + "#k";
    }
    var 糺���� = cm.getBossLog('feihong');
    if (糺���� < 1) {
        var 糺���� = "#r�������1��#k"
    } else {
        var 糺���� = "��Ҫ����糺�����Կ��";
    }
    var ɨ������ = cm.getBossLog('saochu');
    if (ɨ������ < 2) {
        var ɨ������ = "#r�������2��#k"
    } else {
        var ɨ������ = "����ս���/��Ҫ����";
    }
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
            var ǰ�� = "����һ���ǳ����ܵ�#b�ж�#k..���ػ�����Щ#b���Ĵ���#k,\r\n#d����ĳ��ʱ��,��Щ���ͻ��.�ҾͿ��԰����������Щ���صĵط�.\r\n#r糺���սʱ��Ϊ��" + 糺쿪��ʱ�� + "\r\n����ɨ������ʱ�䣺" + ɨ������ʱ�� + "\r\n\r\n";
            var ��1 = "#L1#" + ��ɫ��ͷ + "#b糺���ս[" + ��ս״̬ + "] - [" + 糺���� + "]\r\n\r\n";
            var ��2 = "#L2#" + ��ɫ��ͷ + "#d����ɨ��[#g������" + ��̾�� + "#k] - [" + ɨ������ + "]\r\n\r\n";
            var ��3 = "#L3#" + ��ɫ��ͷ + "#b#eħ���ַ�["+�ַ�״̬+"] - [#rÿ���޶�1��#k]";
            var ��4 = "";
            var ��5 = "";
            cm.sendSimple("" + ǰ�� + "" + ��1 + "" + ��2 + "" + ��3 + "" + ��4 + "" + ��5 + "");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getLevel() >= 70) {
                    cm.teachSkill(15111007, 30, 30); //���㲨
                    cm.sendOk("���Ѽ��������м��ܡ�");
                    cm.dispose();
                } else {
                    cm.sendOk("���ã�����70���Ժ������ң����ܰ��㼤�������!");
                    cm.dispose();
                }
            } else if (selection == 1) {
                if ((糺쿪��) &&(cm.haveItem("" + 糺�Կ�� + "", 1))) {
                        cm.openNpc(1061009, 1);
                } else {
                    cm.sendOk("�޷����롣��ȷ�����н������Ʒ#v"+糺�Կ��+"#k���߿���ʱ��ﵽ��")
                    cm.dispos();
                }

            } else if (selection == 2) { //������ɨ
                cm.openNpc(9000034,3);
            } else if (selection == 3) {//ħ���ַ�ս
                if (Сʱ == 22){
                cm.openNpc(9310101,2);
                }else{
                    cm.sendOk("����û�дﵽħ���ַ���ʱ�䡣")
                    cm.dispose();
                }
            } else if (selection == 4) { //�����·���
                cm.openNpc(9310101, 1);
            }
        }
    }
}
