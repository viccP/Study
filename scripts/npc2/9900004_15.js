
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
var �﹥���� = 1702118;
var ħ������ = 1702119;
var ��ɫ��ţ�� = 4000000;
var ʱ��֮ʯ = 4021010;
var ��ͷ = 4000017;
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
            var txt1 = " #L1#" + ������ͷ + " #b��ս����BOSS#l   #L7#" + ������ͷ + " #b��ս����BOSS#l\r\n";
            var txt2 = " #L3#" + ������ͷ + " #b��ս���BOSS#l   #L4#" + ������ͷ + " #b��ս��ɮBOSS#l\r\n";
            var txt3 = "#L5#" + ������ͷ + " #b��ս����BOSS#l   #L6#" + ������ͷ + " #b��ս����BOSS#l\r\n";
            var txt4 = " #L2#" + ������ͷ + " #b��ս������BOSS#l #L8#" + ������ͷ + " #b��ս������BOSS#l\r\n\r\n";
            var txt5 = "#r======================================================#l\r\n";
            var txt6 = " #L9#" + ������ͷ + " #b��������#l #L10#" + ������ͷ + " #b��߸���#l\r\n\r\n";
            var txt7 = " #L11#" + ������ͷ + " #b��ո���#l #L12#" + ������ͷ + " #b��������#l\r\n\r\n";
          //  var txt5 = "  	  #L4#" + ������ͷ + "#l\r\n";
            cm.sendSimple("��ѡ����Ҫȥ�ĸ�����\r\n" + txt1 + "" + txt2 + " " + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "" + txt7 + "");
        } else if (status == 1) {
            if (selection == 1) {//����
			cm.warp(541020700);
			cm.dispose();
            } else if (selection == 2) { //������
			cm.warp(551030100);
			cm.dispose();
            } else if (selection == 3) {//���
			cm.warp(701010320);
			cm.dispose();
            } else if (selection == 4) {//�ؾ���
			cm.warp(702070400);
			cm.dispose();
            } else if (selection == 5) {//����
			cm.warp(220080000);
			cm.dispose();
            } else if (selection == 6) {//����
			cm.warp(230040420);
			cm.dispose();
            } else if (selection == 7) {//����
			cm.warp(211042300);
			cm.dispose();
            } else if (selection == 8) {//������
			cm.warp(240040700);
			cm.dispose();
            } else if (selection == 9) {//����
			cm.warp(103000000);
			cm.dispose();
            } else if (selection == 10) {//���
			cm.warp(221024500);
			cm.dispose();
            } else if (selection == 11) {//���
			cm.warp(200080101);
			cm.dispose();
            } else if (selection == 12) {//����
			cm.warp(251010404);
			cm.dispose();
            }
        }
    }
}
