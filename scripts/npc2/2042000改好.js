/*
 * 
 * @��֮��
 * @���껪��ս - �����޸�
 * @npc = 2042002
 */
importPackage(net.sf.cherry.client);

var status = 0;
var ����� = "#v4001129#";

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
            var ǰ�� = "#b��ս������껪������û���㹻�ĵ�����սһ���Լ��أ�\r\n";
            var ѡ��1 = "#L0##r��Ҫ��ȥ#l\r\n\r\n";
            var ѡ��2 = "#L1##r#d���껪��ս��ϸ˵��#l\r\n\r\n";
            var ѡ��3 = "#L2##bС����ս���껪#k"
            cm.sendSimple("" + ǰ�� + "" + ѡ��1 + "" + ѡ��2 + ""+ѡ��3+"");         // cm.getChar().gainrenwu(1);
        } else if (status == 1) {
            if (selection == 0) {
              cm.warp(103000000);
              cm.dispose();
            } else if (selection == 1) { //���껪����
                   cm.sendOk("���껪��Ӹ��˾���˵����\r\n#bС�������ս��ͼ�󡣻����һ�������Ĺ�������һֱˢ�¡�˭����ս����������࣬˭�õĽ���Ҳ��Խ���\r\n#r��ɼ��껪�󣬿��Ի��#bð�յ������#r�����Զһ�#r�������������������켼����������#k��")
            } else if (selection == 2) { //С����ս���껪
                 cm.openNpc(2042002,3);
            }   
        }
        }
    }
