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
            if (cm.getPlayer().getmodid() > 0 && cm.getPlayer().getmodsl() > 0) {
                var ״̬ = "#L2##r��Ҫ��ת�� - [" + ��̾��2 + "���ڽ���]#l";
            } else if (cm.getPlayer().getmodid() != 6300005 && cm.getPlayer().getmodsl() >= 0) {
                var ״̬ = "#L0##r��Ҫ��ת�� - [" + ��̾�� + "δ����]#l";
            } else if (cm.getPlayer().getmodid() == 6300005 && cm.getPlayer().getmodsl() == 0) {
                var ״̬ = "#L3##r������ɡ��������#l";
            }
            var ǰ�� = "��������ҡ��������������ҡ�����һ�ٿ鶼�����ҡ�����\r\n�������ˡ���\r\n";
            var ѡ��1 = "" + ״̬ + "\r\n\r\n";
            cm.sendSimple("" + ǰ�� + "" + ѡ��1 + "");
        } else if (status == 1) {
            if (selection == 0) {
                cm.getPlayer().setmodid(6300005);
                cm.getPlayer().setmodsl(4);
                cm.sendOk("" + �������� + "\r\n\r\n����#b" + cm.getPlayer().getmodsl() + "#kֻ#b#o" + cm.getPlayer().getmodid() + "!\r\n\r\n" + ��������� + "\r\n #e#rս���3��תְ#k#n");
                cm.dispose();
            } else if (selection == 1) { //�򿪶һ�npc
                cm.openNpc(2042002, 3);
            } else if (selection == 2) { //��ѯ  ���ڽ���
                cm.sendOk("����Ҫ����Ĺ�������\r\n����Ҫ����Ĺ�����#b#o" + cm.getPlayer().getmodid() + "##k����Ϊ#r" + cm.getPlayer().getmodsl() + "#kֻ��");
                cm.dispose();
            } else if (selection == 3) {//�������
                cm.changeJob(2111);
                cm.teachSkill(21110000, 0, 20); //����ǿ��
                cm.teachSkill(21111001, 0, 20); //���ɻ���
                cm.teachSkill(21110002, 0, 20); //ȫ���ӻ�
                cm.teachSkill(21110003, 0, 30); //�ռ�Ͷ��
                cm.teachSkill(21110004, 0, 30); //��Ӱ����
                cm.teachSkill(21111005, 0, 20); //��ѩì
                cm.teachSkill(21110006, 0, 20); //����
                cm.teachSkill(21110007, 1, 20); //ȫ���ӻ�
                cm.teachSkill(21110008, 1, 20); //ȫ���ӻ�
                cm.getPlayer().setmodid(0);
                cm.getPlayer().setmodsl(0);
                cm.sendOk("���ʵ���õ��˵�3�ε��Ͽɡ���");
                cm.dispose();
            } else if (selection == 4) {//��������
                if (cm.getPlayer().getmodid() > 0 && cm.getPlayer().getmodsl() > 0) {
                    if (cm.getNX() >= 200) {
                        cm.sendOk("�����ɹ�������200���");
                        cm.gainNX(-200);
                        cm.getPlayer().setmodid(0);
                        cm.getPlayer().setmodsl(0);
                        cm.dispose();
                    } else {
                        cm.sendOk("�Բ�����ĵ���㡣");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("��û�н��������޷�������");
                    cm.dispose();
                }
            }
        }
    }
}
