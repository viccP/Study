/*
 * 
 * @��֮��
 * �ر�ͼ�
 * ��ͼID��677000012
 * ����Ϊ 3220000 ��ģʽ
 * 
 */
var ��ˮ�� = 4021008;
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new ="#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� ="#fUI/UIWindow/Quest/icon0#";
var ������ͷ ="#fUI/Basic/BtHide3/mouseOver/0#";
var �Ҹ� = "#k��ܰ��ʾ���κηǷ��������ҷ�Ŵ���.��ɱ��������.";
var ��ͨ ="#i3994116#"
var ���� ="#i3994117#"
var �ر�����Ʊ = 5252001;
function start() {
    status = -1;

    action(1, 0, 0);
}

function action(mode, type, selection) {
    var ��ˮ�� = 4021008;
    var ʱ��֮ʯ = 4021010;
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("��������");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var txt1 = "#L0#"+��ͨ+"#d��Ҫ����#b�ر���#r<���˼��ɽ���\#b�Ƽ�50��ȥ��ս#r>#d#l";
            var txt2 = "#L1#"+����+"��Ҫ����#b�ر���#r<��Ҫ������2�����>#k"
            cm.sendSimple("#b�ر���ӵ��#r�ḻ�ı���#b����������Ҳ������#rа�����͵Ĺ���#b�����Ƿ�Ը����սһ���Ƿ�������#r��ñ���#b�أ�\r\n\r\n"+txt1+"\r\n\r\n"+txt2+"")
        } else if (status == 1) {
            if (selection == 0) {
               if (cm.haveItem(�ر�����Ʊ,1)){
                  cm.openNpc(9310059,10);
               }else{
                   cm.sendOk("��û�вر��ǻ��Ʊ���޷�����ر��ǣ�");
                   cm.dispose();
               }
            } else if (selection == 1) {
                if (cm.haveItem(�ر�����Ʊ,1)){
                  cm.openNpc(9310059,11);
               }else{
                   cm.sendOk("��û�вر��ǻ��Ʊ���޷�����ر��ǣ�");
                   cm.dispose();
               }
            } else if (selection == 2) {
                if (cm.getChar().getNX() >= 100) {
                    cm.gainNX(-100);
                    cm.openNpc(9310022, 1);
                } else {
                    cm.sendOk("�ֺ�#b����#k��Ҫ#r100���#k���ҵĵ���㡣", 2);
                    cm.dispose();
                }
            } else if (selection == 3) { //�ϳ���Ʒ
                cm.openNpc(9310059, 1);
            } else if (selection == 4) { //�򿪵��㳡npc 9330045
                cm.openNpc(9330045, 0);
            } else if (selection == 5) {//�һ����
                cm.openNpc(9330078, 0);
            } else if (selection == 6) {
                cm.warp(809030000);
                cm.dispose();



            } else if (selection == 7) {
                cm.sendOk("#e�Ҳ������㲻Ҫ���ˡ��㻹Ҫ����");
                cm.dispose();
            } else if (selection == 8) {
                    cm.openNpc(9310022,2);
            }
        }
    }
}


