
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

var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";
importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
//4000425
var ItemId = Array(
		//��Ҫ��װ��,����,  ����,����,  ����,����  ������װ��
	Array(1332025, 1, 4001126,3000, 4251100,1,4250800,1,1332055,1,"��Ҷװ������"),
    Array(1332025, 1, 4001126,3000, 4251100,1,4250800,1,1332055,1,"��Ҷװ������"),
	Array(1332025, 1, 4001126,3000, 4251100,1,4250800,1,1332055,1,"��Ҷװ������")
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
			//ǰ��
            StringS = "#b��Ҷװ������������ֻҪ������Ҫ������װ�������������ð�ձҡ�������������#n#b";
            for (var i = 0; i < ItemId.length; i++) {
				//�ж��ٸ���Ʒ �ͱ������ٸ���ʾ
                StringS += "\r\n#L" + i + "#"+������ͷ+" #b#d#z" + ItemId[i][0] + "##k����#b#z" + ItemId[i][8] + "##k(#r#z " + ItemId[i][0] + " ##k��#b#z"+ ItemId[i][2] + "##k" + ItemId[i][3] + "����#b#z" + ItemId[i][4] +"##k" + ItemId[i][5] + "����#b#z" + ItemId[i][6] + "##k"+ ItemId[i][7] + "��)\r\n";
            }
			//��ȡ����
            cm.sendSimple(StringS);
            zones == 0;

        } else if (status == 1) {
			//���治���㣬���Բ���ʾ��
            if (zones == 1) {
                cm.sendNext("�����Ұ�����ʲô�أ�", 2);
                zones = 2;
            } else if (zones == 0) {
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull())
                {
                    cm.sendOk("������Ӧ����װ�����ճ�һ��");
                    cm.dispose();
                } else if (cm.haveItem(ItemId[selection][0],ItemId[selection][1]) && cm.haveItem(ItemId[selection][2],ItemId[selection][3]) &&cm.haveItem(ItemId[selection][4],ItemId[selection][5]) && cm.haveItem(ItemId[selection][6],ItemId[selection][7])) {
                    cm.gainItem(ItemId[selection][8], 1);
                    cm.gainItem((ItemId[selection][0]),-(ItemId[selection][1]));
					cm.gainItem((ItemId[selection][2]),-(ItemId[selection][3]));
					cm.gainItem((ItemId[selection][4]),-(ItemId[selection][5]));
					cm.gainItem((ItemId[selection][6]),-(ItemId[selection][7]));
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