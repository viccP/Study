/*
 *ħ��ϳ�
 **/
//---------������-------/


importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
//4000425
var ItemId = Array(
    //ħ������ Ʒ��  ��Ҫ�Ĳ��� ���� �ϳ�������  ħ������
    Array("��Ģ��",1,4000001,400,5000,1),
    Array("ƯƯ��",1,4000017,30,5000,2),
    Array("С��ţ",1,4000019,700,5000,40),
    Array("����ţ",1,4000016,400,10000,6),
    Array("�� ��",1,4000036,300,10000,7),
    Array("�� ��",1,4000029,300,10000,46),
    Array("��ɫ����",1,4000241,50,50000,13),
    Array("�ۺ�����",1,4000241,50,50000,14)
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
            StringS = "��Ҫ�ϳ��𣿺ϳ�ħ��Ĭ��Ʒ��ΪҰ��Ŷ����������ͨħ��ϳ�����";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##d�ϳ�#b" + ItemId[i][0] + "#k (��Ҫ#b#z" + ItemId[i][2] + "##k#r" + ItemId[i][3] + "#k��,#d���" + ItemId[i][4] + "#k)";
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
                } else if (cm.haveItem(ItemId[selection][2],ItemId[selection][3])) {
                   
                    cm.���ħ��(cm.getPlayer().getId(),ItemId[selection][0],ItemId[selection][5],1,0,0);
                    cm.sendOk("�һ��ɹ�!");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11, cm.getC().getChannel(), "[��ϲ]" + " : " + " "+cm.getPlayer().getName()+"�ɹ��һ���ħ��["+ItemId[selection][0]+"]", true).getBytes());
                    cm.gainItem(ItemId[selection][2],-ItemId[selection][3]);
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