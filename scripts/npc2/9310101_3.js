/*
 * 
 * @type����װ���һ�
 * @npcID9310101_3
 * @����Ϊ������
 */
/* 
//����
 case 1902031:
 case 1902032:
 case 1902033:
 case 1902034:
 case 1902035:
 case 1902036:
 case 1902037:
 //����
 case 1912024:
 case 1912025:
 case 1912026:
 case 1912027:
 case 1912028:
 case 1912029:
 case 1912030:
 */
importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(1902031, 10000, ""),
        Array(1902032, 20000, ""),
        Array(1902033, 30000, ""),
        Array(1912024, 10000, ""),
        Array(1912025, 30000, ""),
        Array(1912026, 60000, "")
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
                StringS = "����װ�������һ���ֻҪ��ɸ��������л����ö���Ŷ��\r\n#e#bĿǰ����#r"+cm.getPlayer().getCashDD()+"#b����#k#n";
                for (var i = 0; i < ItemId.length; i++) {
                    StringS += "\r\n#L" + i + "##b#v" + ItemId[i][0] + "##k (��Ҫ#r " + ItemId[i][1] + " #k�� ������)";
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
                }else if (cm.getPlayer().getCashDD() >= ItemId[selection][1]) {
                        cm.gainItem(ItemId[selection][0], 1);
                        cm.getPlayer().gainCashDD(-(ItemId[selection][1]));
                        cm.sendOk("�һ��ɹ�����챳��!");
                        cm.dispose();
                    } else {
                        cm.sendOk("�������㣡");
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