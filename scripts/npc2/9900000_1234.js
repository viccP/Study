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
            if(cm.getPlayer().getqiandao2() >= 1000){
                cm.setBossLog("lingqujiangli");
                cm.dispose();
                 return;
            }
            var txt1 = "#L1#" + ��ɫ��ͷ + "#bÿ��ǩ������#k#l";
            var txt2 = "#L2#" + ��ɫ��ͷ + "#d����ʱ�佱��\r\n\r\n";
            var txt3 = "#L10##b" + ��ɫ��ͷ + "��ֵ��ȯ��ȡ";
            var txt4 = "#L6##d" + ��ɫ��ͷ + "��ֵ�����ȡ\r\n\r\n";
            var txt5 = "#L5##r" + ��ɫ��ͷ + "�鿴�ȼ�����"
            var txt6 = "#L4##g" + ��ɫ��ͷ + "�Ǽ�����ϵͳ\r\n\r\n"
            var txt7 = "#L7##g" + ��ɫ��ͷ + "ְҵתְ����"
            var txt8 = "#L8##r" + ��ɫ��ͷ + "��#dʱ#g��#b��#k��#r��#b��#g��"+����new+""+��̾��+"\r\n\r\n"
            cm.sendSimple("��ӭ����#b��׷��ð�յ���#k��������һЩ��ݹ��ܡ�\r\n\r\n[#r�����޿�ݴ���_��Ҫ�ܵ�ͼ_�ϸ������_�벻Ҫ������#k]\r\n\r\n" + txt1 + "" + txt2 + "" + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "" + txt7 + "" + txt8 + "");

        } else if (status == 1) {
            if (selection == 1) {
            cm.openNpc(9900004, 12);
            } else if (selection == 2) { //���๦��
                if(cm.getPlayer().getqiandao2() >= 1000 && cm.getBossLog("lingqujiangli") < 1){
                   cm.sendOk("������߽������óɹ�����"+cm.getPlayer().getqiandao2()+"��");
                   cm.getPlayer().setqiandao2(0);
                  // cm.setBossLog("lingqujiangli");
                   cm.dispose();
                }else{
                    cm.sendOk("���յĽ�����δ��ȡ��������������������޷�����"+cm.getPlayer().getqiandao2()+"");
                    cm.disppse();
                }
            } else if (selection == 3) {//ÿ���ͽ�����
                cm.openNpc(2042002, 0);
            } else if (selection == 4) { //��ţ���ְ���
                
// cm.sendOk("#b��׷��ð�յ����ְ�����#k\r\n\r\n" + Բ�� + "׷��ð�յ�������๦�ܡ�\r\n" + Բ�� + "���ҷ���˼����ҹ��ܡ��ֶ���Ҽӷ�����Զ���⡣\r\n" + Բ�� + "���鱶��#b2#k������#b1#k��\r\n" + Բ�� + "�޸������������޷��޸���BUG��\r\n" + Բ�� + "#b���š�����顿����Ӿ��顿��������顿�����ɾ��顿#k\r\n" + Բ�� + "�ƹ�ϵͳ��������������������С����#k\r\n" + Բ�� + "#r׷��ð�յ�����˽������ҽ���װ�����ף���Ԥ��ƭ�ӣ�\r\n" + Բ�� + "#b   ��ţð�յ� - ��������� - #d��ҽ���Ⱥ:373075185", 2)
                //cm.dispose();
            } else if (selection == 5) { //���������г�
                cm.displayLevelRanks();
                cm.dispose();
            } else if (selection == 6) { //װ���ֽ�ϵͳ
                cm.openNpc(9900004, 5);
            } else if (selection == 7) { //����רְ
                cm.sendOk("תְ���ܣ�\r\n ð�ռ�ְҵתְ - �ٷ�NPC(��ת��Ҫ������ſ���תְ)��\r\nս��תְ - ���(ϵͳ�Զ�����,�Ѿ��򵥻�)\r\n\r\n#rð�ռ�תְΪ1 - 3ת��4ת�ڼ�˾֮��(��������)\r\nս��תְ�ص��������������ֱ��1-4ת��");
                cm.dispose();
            } else if (selection == 8) { //ѧϰ���켼��
                cm.openNpc(9310059,0);
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
                cm.openNpc(9900007, 100); //����
            } else if (selection == 11) { //���ֻ����
                cm.openNpc(9900004, 1);//
            } else if (selection == 12) { //��Ծ��ϵͳ
                cm.openNpc(9100106, 0); //�ձ��߼����ְٱ���
            } else if (selection == 13) { //�����
                cm.openNpc(9000018, 0); //�����
            }else if(selection == 99){
                cm.sendOk("#e#g����ϵͳ˵��#k#n\r\n\r\n"+��ɫ��ͷ+" ����ϵͳ��#r�����г� - �ζ�#k ������ѧϰ��ѧϰ��ȼ�Ϊ#r1��#k������������Լ���ѧϰ��");
                cm.dispose();
            }
        }
    }
}
