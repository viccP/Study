/*
 * 
 * @��֮��
 * @���껪��ս - �����޸�
 * @npc = 2042002
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
            if(cm.getMapId() != 103000000){
                                cm.sendOk("Ŀǰֻ��#b��������#k������ս������껪����");
                               cm.dispose(); 
                            }else{
            var ǰ�� = "#b��֮��#k���껪����Ϯ~ֻҪ���룬���ɻ��#b�ݱ˵���������#k��#b�ݱ˵����Ļ�������#k��#b���켼��#k��#b�������~#k\r\nֻҪ���룡�������ɻ�ã�\r\n";
            var ѡ��1 = "#L0##r��֮��#k�ļ��껪��ʲô��#l\r\n";
            var ѡ��2 = "#L1##r#dʹ��#bð�յ������#k�һ�����#l\r\n";
            var ѡ��3 = "#L2##b�ƶ�����սԤ����ͼ#l";
            cm.sendSimple("" + ǰ�� + "" + ѡ��1 + "" + ѡ��2 + "" + ѡ��3 + "");
                            }
            // cm.getChar().gainrenwu(1);
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getLevel() < 255) { //���껪����
                    cm.sendOk("���껪��������˸��ֹ���~��ҪС��ľ�����ս��һ��С����ͽ���Ϊ6����ҵĶ��顣�������Ҫ�������������Խ�࣬��õĽ���ҲԽ�ࡣĿǰֻ����#rС����˾���ģʽ#k\r\n#r��ս�ȼ�����Ϊ��31 - 70#-");
                    cm.dispose();
                }
            } else if (selection == 1) { //�򿪶һ�npc
                    cm.openNpc(2042002,2);
            } else if (selection == 2) { //������
                    if(cm.getLevel() >= 30&&cm.getLevel() < 80){
                       cm.warp(980000000);
                       cm.dispose();
                }else{
                    cm.sendOk("���޷�����~��Ϊ��û�дﵽָ��Ҫ��\r\n�ȼ����ƣ�Level30 - Level70");
                    cm.dispose();
                }
                } else if (cm.getChar().getrenwu() == 5 && cm.getChar().getsgs() >= ����) { //�������
                    cm.openNpc(2042002, 1); //���������6
                } else if (cm.getChar().getrenwu() == 5 && cm.getChar().getsgs() < ����) { //û�������
                    cm.sendOk("" + �������� + " - ������ - \r\n#r�����Ҳ���ϻ��ˡ��������ҷ�ӳ����߳ǳ��ֵĹ��� #b����#r �ǳ�������������������������#b ���� " + ���� + "#r����\r\n#b����������Ҫ���� " + ���� + " ֻ���Ѿ����� " + cm.getPlayer().getsgs() + " ֻ��");
                    cm.dispose();
                } else {
                    cm.sendOk("��ô�ˡ�����һ���ͽ������Ƿǳ��õģ��㱻�����ж�����");
                    cm.dispose();
                }
            } else if (selection == 3) {//���Ļ�//���Ѿ��Ǹ���ְ�����������ˣ���һ����������С�ӣ�#b������������㷺��#r������ȥ����#b���� ���� ������� "+����+"��
                if (cm.getChar().getrenwu() == 6 && cm.getChar().getsgs() < ����) { //���Խ�����
                    cm.sendOk("" + �������� + " - ���Ļ� - \r\n#r���Ѿ��Ǹ���ְ�����������ˣ���һ����������С�ӣ�#b������������㷺��#r������ȥ����#b���� ���� ������� " + ���� + "����\r\n#r��ɺ����ұ�������ѯ���������������� #d@�ͽ�#r ���ɲ�ѯ����ǰ�������������\r\n" + ���� + "\r\b" + ��������� + "\r\n" + ��һ����������� + "#v" + ��ˮ�� + "# = ??? #v2049000# = ???\r\n" + ���ʻ�� + "\r\n#v3010006# #v3010008# #v3010009# #v2044013# #v2044012# #v2044006# #v2043301# #v2043212# #v2043208# #v2043112# #v2041210# #v2043804# #v2043805# #v2043701#");
                    cm.getChar().gainrenwu(1); //����������7
                    cm.dispose();
                } else if (cm.getChar().getrenwu() == 7 && cm.getChar().getsgs() >= ����) { //�������
                    cm.openNpc(2042002, 1); //���������8
                } else if (cm.getChar().getrenwu() == 7 && cm.getChar().getsgs() < ����) { //û�������
                    cm.sendOk("" + �������� + " - ���Ļ� - \r\n#r���Ѿ��Ǹ���ְ�����������ˣ���һ����������С�ӣ�#b������������㷺��#r������ȥ����#b���� ���� ������� " + ���� + "����\r\n#b����������Ҫ���� " + ���� + " ֻ���Ѿ����� " + cm.getPlayer().getsgs() + " ֻ��");
                    cm.dispose();
                } else {
                    cm.sendOk("��ô�ˡ�����һ���ͽ������Ƿǳ��õģ��㱻�����ж�����");
                    //cm.getPlayer().gainrenwu(-1);
                    cm.dispose();
                }
            } else if (selection == 4) { //���廷
                if (cm.getChar().getrenwu() == 8 && cm.getChar().getsgs() < ����) { //���Խ�����
                    cm.sendOk("" + �������� + " - ���廷 - \r\n#r�治�򵥡��������һ�������а�����\r\n��Ҫ����#b�������� ���� ������ 300ֻ��\r\n#r��ɺ����ұ�������ѯ���������������� #d@�ͽ�#r ���ɲ�ѯ����ǰ�������������\r\n" + ���� + "\r\b" + ��������� + "\r\n" + ��һ����������� + "#v" + ��ˮ�� + "# = ??? #v2049000# = ???\r\n" + ���ʻ�� + "\r\n������");
                    cm.getChar().gainrenwu(1); //����������9
                    cm.dispose();
                } else if (cm.getChar().getrenwu() == 9 && cm.getChar().getsgs() >= ����) { //�������
                    cm.openNpc(2042002, 1); //���������10
                } else if (cm.getChar().getrenwu() == 9 && cm.getChar().getsgs() < ����) { //û�������
                    cm.sendOk("" + �������� + " - ���廷 - \r\n#r��Ҫ����#b�������� ���� ������ 300ֻ��\r\n#b����������Ҫ���� " + ���� + " ֻ���Ѿ����� " + cm.getPlayer().getsgs() + " ֻ��");
                    cm.dispose();
                } else {
                    cm.sendOk("��ô�ˡ�����һ���ͽ������Ƿǳ��õģ��㱻�����ж�����");
                    //cm.getPlayer().gainrenwu(3);
                    cm.dispose();
                }
            } else if (selection == 5) { //��Ҫ�콱
                cm.sendOk("��ɺ���������ȡ������");
                cm.dispose();
            } else if (selection == 6) { //���а�
                cm.displayRewnu2Ranks();
                cm.dispose();
            } else if (selection == 7) { //�����鿴
                cm.sendOk("���������ᡢ���ϡ�װ����Ӧ�о��У�");
                cm.dispose();
            } else if (selection == 8) { //���ְ���
                cm.sendOk("����ϵ�����ְ���<\r\n#b��֮��#kԭ����������\r\n��λ[#r������ĳ��#k]��ĳĳ����ģ���ˣ���Դ������˼��\r\n#d���������������£�\r\n\r\nÿ�����ڶ����Ի�ȡ���������һ�����ڲſ��Խ�����һ���ڡ�\r\n���ս����ḻ����ɴ���Խ�ཱ��Խ�á����н�����ɡ�\r\n\r\n                                    #b��ţ��������ʡ�")
                cm.dispose();
            } else if (selection == 9) { //���ô���
                if (cm.getBossLog('shangjin') >= 1) {
                    cm.sendOk("�޷����á���24�����ʹ�ô˹��ܣ�")
                    cm.dispose();
                } else {
                    cm.getPlayer().setsgs(0); //������Ϣ
                    cm.getPlayer().setrenwu(0); //������Ϣ
                    cm.sendOk("���óɹ��������µ�һ��ɣ�");
                    cm.dispose();
                }
            } else if (selection == 10) { //װ����ƾϵͳ
                cm.openNpc(9000018, 0); //����
            } else if (selection == 11) { //���ֻ����
                cm.openNpc(9900004, 1);//
            } else if (selection == 12) { //��Ծ��ϵͳ
                cm.openNpc(9100106, 0); //�ձ��߼����ְٱ���
            } else if (selection == 13) { //�����
                cm.openNpc(9000018, 0); //�����
            }
        }
    }
