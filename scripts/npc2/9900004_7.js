/*
 * 
 * @��֮��
 * ��������ϵͳ - ħ��˫��
 */
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
            var txt1 = "#L1#" + ��ɫ��ͷ + " #b>>>>>>>>>��������������<<<<<<<<<<#l\r\n\r\n";
            var txt2 = "#L2#" + ��ɫ��ͷ + " #r>>>>>>>>>����ħ����������<<<<<<<<<<#l\r\n\r\n";
            cm.sendSimple("���������һ�������أ�\r\n��ѡ��\r\n" + txt1 + "" + txt2 + "",2);
        } else if (status == 1) {
            if (selection == 1) {//װ��Ǳ������
                cm.openNpc(9900004, 8);
            } else if (selection == 2) { //�ֽ����
                cm.openNpc(9900004, 9);
            }
        }
    }
}
