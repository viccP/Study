/**
 * @author �ζ�
 * ���������
 * ������ʹ��������
 **/
importPackage(net.sf.cherry.client);
var ʱ��֮ʯ = 4001325;
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(4004000, 1,"����ĸ��"),
        Array(4004001, 1,"�ǻ�ĸ��"),
        Array(4004002, 1,"����ĸ��"),
        Array(4004003, 1,"����ĸ��"),
        Array(4004004, 1,"�ڰ�ˮ��ĸ��"),
        Array(1032040, 10, "��Ҷ����"),
        Array(1032035, 30, "�����Է�Ҷ����"),
        Array(1032041, 40, "30����Ҷ����"),
        Array(1032042, 50, "70����Ҷ����"),
        Array(1122019, 120, "ð��֮��"),
        Array(1122018, 120, "��ů��Χ��"),
        Array(1082232, 120, "Ů�������"),
        Array(1002677, 120,"��߽���ñ"),
        Array(1002571, 200, "��������ñ"),
        Array(1112421, 200, "��еƽ�ָ"),
        Array(2340000, 300, "ף������")
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
                StringS = "#e#b�һ���Ʒ��Ҫ#v4001325#����ѡ������һ�����Ʒ��";
                for (var i = 0; i < ItemId.length; i++) {
                    StringS += "\r\n#L" + i + "##b#z" + ItemId[i][0] + "##k (��Ҫ#r " + ItemId[i][1] + " ��ʯ.)";
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
                }else if (cm.getPlayer().getItemQuantity(4001325, false) >= ItemId[selection][1]) {
                        cm.gainItem(ItemId[selection][0], 1);
                        cm.gainItem(4001325, -(ItemId[selection][1]));
                        cm.sendOk("�һ��ɹ�����챳��!");
                        cm.dispose();
                    } else {
                        cm.sendOk("��û���㹻��#v4001325#���ڶһ�");
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