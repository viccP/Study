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
            var txt1 = "#L1#- #b�ͼ����� - ��������ţ\r\n\r\n";
            var txt3 = "#L3#- #r�м����� - ���������\r\n\r\n";
            var txt4 = "#L4#- #g�м����� - ������ϵ��\r\n\r\n";
            var txt5 = "#L5#- #b�м����� - ��������ϵ��\r\n\r\n";
            var txt6 = "#L6#- #r�ռ����� - PB��ս\r\n\r\n";
            cm.sendSimple("��֮�λ����~��ɿ��Ի��#b��ˮ��#k~#bף����#k~#b�����#k~#bװ��#k~#b���þ�#k~��\r\n\r\n" + txt1 + " " + txt3 + "" + txt4 + "" + txt5 + ""+txt6+"");

        } else if (status == 1) {
            if (selection == 1) { //��������ţ
               cm.openNpc(9000034,4);
            } else if (selection == 3) {//���������
               cm.openNpc(9000034,6);
            } else if (selection == 4) { //������ϵ��
              	cm.openNpc(9000034,7);
            } else if (selection == 5) { //��������ϵ��
               cm.openNpc(9000034,8);
            } else if (selection == 6) { //װ���ֽ�ϵͳ
                cm.openNpc(9900004, 5);
            } else if (selection == 7) { //����רְ
                cm.openNpc(9900002, 0);
            } else if (selection == 8) { //ѧϰ���켼��
              // cm.teachSkill(11110005,0,20);
              // cm.teachSkill(15111004,0,20);
		/*if(cm.haveItem(4001038,1)&&cm.getMeso() >= 100000){
                    cm.teachSkill(1007,1,1);
                    cm.teachSkill(10001007,1,1);
                    cm.teachSkill(20001007,1,1);
                    cm.gainMeso(-100000);
                    cm.gainItem(4001038,-1);
                     cm.sendOk("ѧϰ�ɹ�!");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[" + cm.getPlayer().getName() + "]" + " : " + " ѧϰ�˶��켼�ܣ�",true).getBytes()); 
                    cm.dispose();
                }else{
                    cm.sendOk("ѧϰ���켼����Ҫ����һ��#v4001038#.��10��ð�ձҡ�");
                    cm.dispose();
                }*/
                cm.sendOk("���ڿ��ţ������ڴ���");
                cm.dispose();
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
