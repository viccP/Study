
/*
 * 
 * �����
 */
/* 
 case 1002695://����ñ
 case 1002609://�ö�ħ��ñ
 case 1002665://������ñ
 case 1002985://����ñ��
 case 1002986://��������
 case 1002761://��Ҷ���
 case 1002760://����ñ
 case 1002583://�����ͷ��
 case 1002543://����ñ
 case 1002448://��ɫͷ��
 */
//---------������-------


importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
//4000425
var ItemId = Array(
        Array(1112263, 1, 4000425,1112151,"��ݮ��������"),
        Array(1112262, 1, 4000425,1112150, "��ʹ��������"),
        Array(1112273, 1, 4000425,1112161, "�һ�С��Ѽ����"),
	Array(1112276, 1, 4000425,1112164, "������������")
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
            StringS = "#b#n����̳�-------�˻����:"+cm.getNX()+"\r\n�һ���Ҫ #v4000425#  ���� #v4000424#  ���� #v4000423# ����#v4000422#";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##b#z" + ItemId[i][0] + "##k (��Ҫ#r#z " + ItemId[i][2] + " ##kX" + ItemId[i][1] + "��(һ��).)";
            }
            cm.sendSimple(StringS);
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
                } else if (cm.haveItem(ItemId[selection][2],ItemId[selection][1])) {
                    cm.gainItem(ItemId[selection][0], 1);
cm.gainItem(ItemId[selection][3], 1);
                    cm.gainItem((ItemId[selection][2]),-(ItemId[selection][1]));

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