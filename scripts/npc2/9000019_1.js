/*
 * @�̳�ѡ��npc ѡ���Ƿ�ص��̳ǻ���ȥ�Ĳ���
 * ������ - WNMS
 */
var status = 0;
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new = "#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("����ð�յ��̳ǵİ�ť����Ŷ~");
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.sendOk("����ð�յ��̳ǵİ�ť����Ŷ~");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getmd5data() == 0) {
                var zt = "#dʹ��1000����������<�����ȡ500���>" + ��̾�� + "";

            } else if (cm.getmd5data() == 1) {
                var zt = "#dʹ��8888����м�����<�����ȡ1000���>" + ��̾�� + "" + ��̾�� + "";
            } else if (cm.getmd5data() == 2) {
                var zt = "#rʹ��12888���߼�����<�����ȡ3000���>" + ��̾�� + "" + ��̾�� + "" + ��̾�� + "";
            } else if (cm.getmd5data() == 3) {
                var zt = "#r������ϡ��ȴ�ϵͳ���ã�";
            }

            cm.sendSimple(" #b��Ʒװ����������Ŷ�������� " + cm.getmd5data() + " �Ρ�#k\r\n\r\n\r\n#L1#" + zt + "#l#n#k\r\n\r\n#L2#����һ�Źι��� - 500 ���#l\r\n\r\n#L3##d����<��ľ����(����)> 50��Ҷ\r\n\r\n#L4##d����<��������(1)> 300���\r\n\r\n#L5##d����<��������(2)> 300���\r\n\r\n#L6##d����#g<�ƽ���>#d 500���");
        } else if (status == 1) {
            if (selection == 1) {//����ģʽ
                var Dgl = cm.getmd5data();
                if (Dgl == 0) {
                    cm.Daogao1();
                } else if (Dgl == 1) {
		    cm.setmd5data(+1);
                    cm.Daogao2();
			
                } else if (Dgl == 2) {
		    cm.setmd5data(+1);
                    cm.Daogao3();
                } else if (Dgl >= 3) {
                    cm.sendOk("��������Ѿ������ޣ�");
                    cm.dispose();
                }
                //�ι���ϵͳ
            } else if (selection == 2) {
                if (cm.getNX() >= 500) {
                    cm.Guaguale();
                    cm.dispose();
                } else {
                    cm.sendOk("�����");
                    cm.dispose();
                }
                //����ϵͳ   ��ľ 50��Ҷ
            } else if (selection == 3) {
                if (cm.haveItem(4001126) >= 50) {
                    cm.gainItem(4001126,-50);
                    cm.����ҩˮ();
                } else {
                    cm.sendOk("��Ҷ����");
                    cm.dispose();
                }
            } else if (selection == 4) {
                if (cm.getNX() >= 300) {
                    cm.gainNX(-300);
                    cm.���̵��1();
                } else {
                    cm.sendOk("�����");
                    cm.dispose();
                }
            } else if (selection == 5) {
                if (cm.getNX() >= 300) {
                    cm.gainNX(-300);
                    cm.���̵��2();
                } else {
                    cm.sendOk("�����");cm.dispose();
                }
            } else if (selection == 6) {
                if (cm.getNX() >= 500) {
                    cm.gainNX(-500);
                    cm.���̵��3();
                } else {
                    cm.sendOk("�����");cm.dispose();
                }
            } 
        }
    }
}