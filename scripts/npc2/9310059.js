
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
            var txt1 = " #L1#" + ������ͷ + " #b��ָ�һ�#l #L2#" + ������ͷ + " #b�����һ�#l  #L3#" + ������ͷ + " #bѪ�¶һ�#l\r\n\r\n";
            var txt2 = " #L4#" + ������ͷ + " #bѪЬ�һ�#l #L5#" + ������ͷ + " #b�����һ�#l  #L6#" + ������ͷ + " #b�����һ�#l\r\n\r\n";
            var txt3 = "#L7#" + ������ͷ + " #b��߶һ�#l #L8#" + ������ͷ + " #b���޶һ�#l";
            cm.sendSimple("#r��������������������װ��Ҳ�ܻ����� �������桶��������#l\r\n" + txt1 + "" + txt2 + " " + txt3 + " ");
        } else if (status == 1) {
            if (selection == 1) {
            cm.openNpc(9310059, 20);
            } else if (selection == 2) {
            cm.openNpc(9310059, 21);
            } else if (selection == 3) {
            cm.openNpc(9310059, 22);
            } else if (selection == 4) {
            cm.openNpc(9310059, 23);
            } else if (selection == 5) {
            cm.openNpc(9310059, 24);
            } else if (selection == 6) {
            cm.openNpc(9310059, 25);
            } else if (selection == 7) {
            cm.openNpc(9310059, 26);
            } else if (selection == 8) {
            cm.openNpc(9310059, 27);
            }
        }
    }
}
