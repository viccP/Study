/*
 * @WNMS�������ҹ��� 
 * @������Ƭ��Ʒ
 */
//---------������-------
var ��ɫ��ͷ = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2# ";

importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
//4000425
var ItemId = Array(
        //��Ʒ1         ��Ʒ2    ����    ����
        Array(1112263, 1112151, 4000463, 50, "��ݮ��������"),
        Array(1112262, 1112150, 4000463, 50, "��ʹ��������"),
        Array(1112273, 1112161, 4000463, 50, "�һ�С��Ѽ����"),
        Array(1112276, 1112164, 4000463, 80, "������������"),
        Array(1112268, 1112156, 4000463, 30, "�̹�ɭ������"),
        Array(1112267, 1112155, 4000463, 50, "������������"),
        Array(1112264, 1112152, 4000463, 50, "����֮������"),
        Array(1112265, 1112153, 4000463, 30, "ѹ��Ǯ����")
        //�����������߶һ����밴�մ˸�ʽ�������á�
        //����,�۸�,����
        );

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
            sl = cm.getPlayer().getItemQuantity(4000463, false);
            StringS = "#b#n��ɫʣ��:#v4000463# x " + sl + " ö!(���½�ָΪ����+��Ƭһ��)\r\n";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##b" + ��ɫ��ͷ + "#v" + ItemId[i][0] + "##z" + ItemId[i][0] + "##k = #r#z " + ItemId[i][2] + " ##kX" + ItemId[i][3] + "��";
            }
            cm.sendSimple(StringS,2);
            zones == 0;

        } else if (status == 1) {
            if (zones == 1) {
                cm.sendNext("�����Ұ�����ʲô�أ�", 2);
                zones = 2;
            } else if (zones == 0) {
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull())
                {
                    cm.sendOk("������Ӧ����װ�����ճ�һ��");
                    cm.dispose();
                } else if (cm.haveItem(ItemId[selection][2], ItemId[selection][3])) {
                    cm.gainItem(ItemId[selection][0], 1);
                    cm.gainItem(ItemId[selection][1], 1);
                    cm.gainItem((ItemId[selection][2]), -(ItemId[selection][3]));
                    cm.sendOk("�һ��ɹ�����챳��!");
                    cm.dispose();
                } else {
                    cm.sendOk("���㣡��");
                    cm.dispose();
                }
            }
        } else if (status == 2) {
            if (zones == 2) {
                cm.sendNext("������������ħ����ʱ��֮ʯ��һȺĢ����͵����,���ܰ�ȥ��������");
                zones = 3;
            }
        } else if (status == 3) {
            if (zones == 3) {
                cm.sendNext("��,���û���⣿���������Щ͵����ʱ��֮ʯ��Ģ����������ʲô�ط���?", 2);
                zones = 4;
            }
        } else if (status == 4) {
            if (zones == 4) {
                cm.sendNext("�����Ʒ��#bȫ�������#k�ġ�������������ϵ�#b�κ�һ������#k�ϻ�ȡ��");
                zones = 5;
            }
        } else if (status == 5) {
            if (zones == 5) {
                cm.sendYesNo("������ܰ��������æ�Ļ�,�һ����һЩ���Ľ����ģ����Ƿ�Ը����ң�");
            }
        } else if (status == 6) {
            cm.setBossLog('MogoQuest');
            cm.gainItem(5220001, 1);
            cm.sendOk("�ǳ���л����ú����˵�������ܻ�����Ʒ�ˣ�");
            cm.dispose();
        }
    }
}	