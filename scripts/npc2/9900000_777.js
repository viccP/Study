
/*
 * 
 * �ϴ��»
 * @������ WNMS
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
var pz = "4031329"; //�����ƾ֤����
var wp = "4001325"; //��ʯ
importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(1122017, 3000, 1,"��׹"),
        Array(5570000, 50, 1,"������Ʒ���и���"),
	Array(5520000, 200, 1,"������Ʒ���и���"),
	Array(1112405, 100, 1,"������Ʒ���и���"),
        Array(5150040, 100, 1,"������Ʒ���и���")
        //�����������߶һ����밴�մ˸�ʽ�������á�
        //����,����,����
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
            StringS = "#b#nĿǰΪֹ..����˺��Ѿ���ֵ��" + cm.getPlayer().getjf() + "���֣���";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##b#v" + ItemId[i][0] + "##k (��Ҫ#r " + ItemId[i][1] + " #k����.����:#r " + ItemId[i][2] + " ��#k)";
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
                } else if (cm.getPlayer().getjf() >= ItemId[selection][1]) {
			if(ItemId[selection][0] == 1122017){
cm.getPlayer().gainjf(-(ItemId[selection][1]));
			 var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1000 * 24 * 60 * 60 * 1000*7); //ʱ��
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.sendOk("�һ��ɹ�����챳��!");
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
cm.getChar().saveToDB(true,true);
cm.dispose();
			return;
			}
                    cm.gainItem(ItemId[selection][0], +ItemId[selection][2]);
                    cm.getPlayer().gainjf(-(ItemId[selection][1]));
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
