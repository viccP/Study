/**
 * @author �ζ�
 * ���������
 * ������ʹ��������
 **/
importPackage(net.sf.cherry.client);
var ʱ��֮ʯ = 4021010;
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(1302105, 200, "ʥ��������ʹ����(���ֽ�)"),
        Array(1312039, 200, "ʥ��������ʹ����(���ָ�)"),
        Array(1322065, 200, "ʥ��������ʹ����(���ֶ���)"),
        Array(1402053, 200, "ʥ��������ʹ����(˫�ֽ�)"),
        Array(1412035, 400, "ʥ��������ʹ����(˫�ָ�)"),
        Array(1422039, 300, "ʥ��������ʹ����(˫�ֶ���)"),
        Array(1432050, 400, "ʥ��������ʹ����(ǹ)"),
        Array(1442071, 400, "ʥ��������ʹ����(����)"),
        Array(1382062, 400, "ʥ��������ʹ����(����)"),
        Array(1452062, 400, "ʥ��������ʹ����(��)"),
        Array(1462056, 500, "ʥ��������ʹ����(��)"),
        Array(1472077, 500, "ʥ��������ʹ����(ȭ��)"),
        Array(1332081, 400, "ʥ��������ʹ����(�̽�)"),
        Array(1482029, 400, "ʥ��������ʹ����(ָ��)"),
        Array(1492030, 400, "ʥ��������ʹ����(��ǹ)")
        //�����������߶һ����밴�մ˸�ʽ�������á�
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
            if (cm.getLevel < 2) {
                cm.sendOK("��ĵȼ�����3�������򿪸��", 2);
                cm.dispose();
            } else {
                StringS = "������ڴ˺ϳ�����Ҫ����Ʒ";
                for (var i = 0; i < ItemId.length; i++) {
                    StringS += "\r\n#L" + i + "##b#z" + ItemId[i][0] + "##k (��Ҫ#r " + ItemId[i][1] + " #k��  #d#z4021010##k)";
                }
                cm.sendSimple(StringS);
                zones == 0;
            }
        } else if (status == 1) {
            if (zones == 1) {
                cm.sendNext("�����Ұ�����ʲô�أ�", 2);
                zones = 2;
            } else if (zones == 0) {
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull())
                {
                    cm.sendOk("������Ӧ����װ�����ճ�һ��");
                    cm.dispose();
                }else if (cm.getPlayer().getItemQuantity(4021010, false) >= ItemId[selection][1]) {
                        cm.gainItem(ItemId[selection][0], 1);
                        cm.gainItem(4021010, -(ItemId[selection][1]));
                        cm.sendOk("�һ��ɹ�����챳��!");
                        cm.dispose();
                    } else {
                        cm.sendOk("��û���㹻��ʱ��֮ʯ#v4021010#���ڶһ�");
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