/*
 * 
 * @WNMS
 * ÿ���������npc
 * �����������
 */
importPackage(net.sf.cherry.client);
var status = 0;
var ��ˮ�� = 4021008;
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new = "#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ��̾��2 = "#fUI/UIWindow/Quest/icon1#";
var ���� = "#fUI/UIWindow/Quest/reward#";
var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";
var �������� = "#fUI/UIWindow/Quest/summary#"
var �Ҹ� = "#k��ܰ��ʾ���κηǷ��������ҷ�Ŵ���.��ɱ��������.";
var ���ʻ�� = "#fUI/UIWindow/Quest/prob#";
var ��������� = "#fUI/UIWindow/Quest/basic#";
var ��һ�ؼ��ʻ�� = "#v4001038# = 1 #v4001039# = 1 #v4001040# = 1 #v4001041# = 1 #v4001042# = 1 #v4001043# = 1 ";
var ��һ����������� = "#v4001136# = ??? #v4001129# = ???";
var ���� = 200;
var ���� = 300;
var ���� = 500;
var ���� = 800;
function start() {
    status = -1;
    action(1, 0, 0);
}
var qd = "#v1142000# #v2001000# #v2022448# #v2022252# #v2022484# #v2040308# #v3012003#";
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
            if (cm.haveItem(4001340, 0)) {
                if (cm.getPlayer().getmodid() == 0) {
                    var ״̬ = "#L0##b" + ��ɫ��ͷ + "�������� - I#l"
                }
            }
            if (cm.haveItem(4001340) < 100) {
                if (cm.getPlayer().getmodid() == 2110200) {
                    var ״̬ = "#L5#" + ��ɫ��ͷ + "��������С���"
                }
            }
            if (cm.haveItem(4001340) >= 100) {
                if (cm.getPlayer().getmodid() == 2110200) {
                    var ״̬ = "#L1#" + ��ɫ��ͷ + "��������� - �������"
                }
            }
            if (cm.haveItem(4032491, 1)) {
                if (cm.getPlayer().getmodid() == 0) {
                    var ״̬ = "#L2#" + ��ɫ��ͷ + "�������� - II#l";
                }
                if (cm.getPlayer().getmodid() == 210100 && cm.getPlayer().getmodsl() > 0) {
                    var ״̬ = "#L5#" + ��ɫ��ͷ + "��������� - II#l";
                }
                if (cm.getPlayer().getmodid() == 210100 && cm.getPlayer().getmodsl() == 0) {
                    var ״̬ = "#L3#" + ��ɫ��ͷ + "��������� - �������"
                }
            }
            if (cm.haveItem(4032491, 2)) {
                var ״̬ = "#L7#" + ������ͷ + " ��ս������BOSS" + ��̾�� + "#l"
            }
            if (cm.getLevel() < 30) {
                var ǰ�� = "#b����˵����#r������#b���������ѡ��Ƿ��������#r������#b�أ���ս#r������#b��Ҫ������µ�����ſ��ԣ�#r����һ������Σ�յ���ս#b��\r\n";
                var ѡ��1 = "" + ״̬ + "\r\n\r\n";
                var ѡ��2 = "#L4#�鿴������������" + ����new + "\r\n\r\n";
                var ѡ��3 = "#L5##d��ѯ����̬#l "
                var ѡ��4 = "#L6##r�������� - ��ͷ��ʼ#k\r\n"
                cm.sendSimple("" + ǰ�� + "" + ѡ��1 + "" + ѡ��2 + "" + ѡ��3 + " " + ѡ��4 + "");
            } else {
                cm.sendOk("��ĵȼ��Ѿ������˿���ִ�и�����ĵȼ��ˡ�");
                cm.dispose();
            }
        } else if (status == 1) {
            //--------------------------------------------------
            if (selection == 0) { //����1
                cm.getPlayer().setmodid(2110200); //����ָ������ID
                cm.sendOk("#fUI/UIWindow/Quest/summary#\r\n\r\n��һ�׶Σ���Ҫ����Ĺ���Ϊ��#b#o2110200##k���������ָ����Ʒ #r100#k �� �����һ㱨��\r\n#fUI/UIWindow/Quest/basic#\r\n#b����ֵ#k   #bð�ձ�#k   ");
                cm.dispose();
            } else if (selection == 1) {  //�������1ǰ��
                cm.sendOk("��ϲ�����ǰ������1�������#b4032491# x1 ��");
                cm.gainItem(4001340, -100);
                cm.getPlayer().setmodid(0);
                cm.gainItem(4032491, 1);
                cm.dispose();
                //---------------------------------------------------
            } else if (selection == 2) { //����2
                cm.getPlayer().setmodid(210100); //����ָ������ID
                cm.getPlayer().setmodsl(100); //����ָ������ID
                cm.sendOk("#fUI/UIWindow/Quest/summary#\r\n\r\n�ڶ��׶Σ���Ҫ����Ĺ���Ϊ��#b#o210100##k������100ֻ����ɺ���һ㱨�� ");
                cm.dispose();
            } else if (selection == 3) { //���ǰ������2
                cm.sendOk("��ϲ�����ǰ������2�������#b4032491# x1 ��");
                cm.getPlayer().setmodid(0);
                cm.gainItem(4032491, 1);
                cm.dispose();
                //----------------------------------------------------
            } else if (selection == 4) {//�����󹫽���
                cm.sendOk("�������£�\r\n#b #z1302133#\r\n #z1332099#\r\n #z1372058#\r\n #z1382080#\r\n #z1382080#\r\n #z1382080#\r\n #z1382080#\r\n #z1452085#\r\n #z1462075#\r\n #z1472100#\r\n #z1482046#\r\n #z1492048# ");
                cm.dispose();
            } else if (selection == 5) {//�����󹫸�������
                if (cm.getPlayer().getmodid() > 0) {
                    cm.sendOk("#fUI/UIWindow/Quest/summary#\r\n\r\n��������Ҫ����Ĺ�������\r\n����Ϊ#b#o" + cm.getPlayer().getmodid() + "# #k - " + cm.getPlayer().getmodsl() + "��������#b������ȡָ����Ʒ���ҽ���#k����");
                    cm.dispose();
                } else {
                    cm.sendOk("��ѯ�������������ȡ���ȷ���Ƿ�Ϊû�н��ܻ����Ѿ����ǰ�������ˣ�");
                    cm.dispose();
                }
            } else if (selection == 6) {//�����󹫸�������
                if (cm.getPlayer().getmodid() > 0) {
                    cm.getPlayer().setmodid(0); //����ָ������ID
                    cm.getPlayer().setmodsl(0);//����ָ������������ȡ
                    cm.sendOk("���ˣ���������Ѿ��������ˡ���Ȼ����Ҳ��Ҫ��ͷ��ʼ������ս#r������#k�ˣ�");
                    cm.dispose();
                } else {
                    cm.sendOk("������ҲҪ�������������������ɣ����Ǹ����⡣");
                    cm.dispose();
                }
            } else if (selection == 7) { //��ս������boss
                cm.removeAll(4031232);
                cm.openNpc(1012112, 1);
                
            }
        }
    }

}