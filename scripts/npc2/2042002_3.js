/*
 * 
 * @WNMS
 * @������ȡNPC
 */

importPackage(net.sf.cherry.client);
var status = 0;
var ��ˮ�� = 4021008;
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new = "#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ��̾��2 = "#fUI/UIWindow/Quest/icon1#";
var ���� = "#fUI/UIWindow/Quest/reward#";
var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";
var �������� = "#fUI/UIWindow/Quest/summary#"
var �Ҹ� = "#k��ܰ��ʾ���κηǷ��������ҷ�Ŵ���.��ɱ��������.";
var ���ʻ�� = "#fUI/UIWindow/Quest/prob#";
var ��������� = "#fUI/UIWindow/Quest/basic#";
var ��һ�ؼ��ʻ�� = "#v4001038# = 1 #v4001039# = 1 #v4001040# = 1 #v4001041# = 1 #v4001042# = 1 #v4001043# = 1 ";
var ��һ����������� = "#v4001136# = ??? #v4001129# = ???";
var ���� = 200;
var ���� = 300;
var ���� = 500;
var ���� = 800;
function start() {
    status = -1;
    action(1, 0, 0);
}
var qd = "#v1142000# #v2001000# #v2022448# #v2022252# #v2022484# #v2040308# #v3012003#";
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
            var ǰ�� = "#b����#bð�յ������#k�𣿿��Զһ�����Ŷ��\r\n";
            var ѡ��1 = "#L0##r �һ�#v1122007##z1122007##k - ��Ҫ 2000 ��#l \r\n";//
            var ѡ��2 = "#L1##r �һ�#v1122058##z1122058##k - ��Ҫ 2000 ��#l\r\n";//
            var ѡ��3 = "#L2##r�һ�#v1112402##z1112402##k - ��Ҫ 1000 ��#l\r\n";//
            var ѡ��4 = "#L3##r�һ�#v1122017##z1122017##k1Сʱʹ��Ȩ - ��Ҫ 100 ��#l\r\n";//
            var ѡ��5 = "#L4##r�һ�#v1122017##z1122017##k2Сʱʹ��Ȩ - ��Ҫ 200 ��#l\r\n";
            var ѡ��6 = "#L5##r�һ�#v1122017##z1122017##k3Сʱʹ��Ȩ - ��Ҫ 300 ��#l\r\n";
            var ѡ��7 = "#L6##r�һ�#v1142080##z1142080##k - ��Ҫ50��#l\r\n"
            var ѡ��8 = "#L7##r�һ�#v1142077##z1142077##k - ��Ҫ5000��#l\r\n"
            var ѡ��9 = "#L8##r�һ�#v2041211##z2041211##k - ��Ҫ600��#l\r\n"
            cm.sendSimple("" + ǰ�� + "" + ѡ��1 + "" + ѡ��2 + " "+ ѡ��3 +" "+ѡ��4+" "+ѡ��5+" "+ѡ��6+" "+ѡ��7+" "+ѡ��8+" "+ѡ��9+"");
        } else if (status == 1) {
            if (selection == 0) { //�һ�1
                if (cm.haveItem(4001129,2000)) { //�����һ�
                    cm.sendOk("�����#v1122007#��");
                    cm.gainItem(4001129,-2000);
                    cm.gainItem(1122007,1);
                    cm.dispose();
                } else {
                   cm.sendOk("�Բ�����ļ���Ҳ���");
                   cm.dispose();
                }
            } else if (selection == 1) { //�һ���������
               if(cm.haveItem(4001129,2000)&&cm.haveItem(1122007,1)){
                   cm.sendOk("�����˻���������");
                   cm.gainItem(4001129,-2000);
                   cm.gainItem(1122007,-1);
                   cm.gainItem(1122058,1);
                   cm.dispose();
               }else{
                   cm.sendOk("�Բ�����ļ���Ҳ���");
                   cm.dispose();
                }
            } else if (selection == 2) { //��ѯ  ���ڽ���
             if (cm.haveItem(4001129,1000)) { //�����һ�
                    cm.sendOk("�����#v1112402#��");
                    cm.gainItem(4001129,-1000);
                    cm.gainItem(1112402,1);
                    cm.dispose();
                } else {
                   cm.sendOk("�Բ�����ļ���Ҳ���");
                   cm.dispose();
                }
               
            } else if (selection == 3) {//�������
                  if (cm.haveItem(4001129,100)) { //�����һ�
                    cm.sendOk("�����#v1122017#�� - 1Сʱʹ��Ȩ");
                    cm.gainItem(4001129,-100);
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
             var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*10); //ʱ��
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
cm.getChar().saveToDB(true,true);
cm.dispose();
                } else {
                   cm.sendOk("�Բ�����ļ���Ҳ���");
                   cm.dispose();
                }
            } else if (selection == 4) {//�������
                  if (cm.haveItem(4001129,200)) { //�����һ�
                    cm.sendOk("�����#v1122017#�� - 2Сʱʹ��Ȩ");
                    cm.gainItem(4001129,-200);
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
             var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*20); //ʱ��
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
cm.getChar().saveToDB(true,true);
cm.dispose();
                } else {
                   cm.sendOk("�Բ�����ļ���Ҳ���");
                   cm.dispose();
                }
           } else if (selection == 5) {//�������
                  if (cm.haveItem(4001129,300)) { //�����һ�
                    cm.sendOk("�����#v1122017#�� - 3Сʱʹ��Ȩ");
                    cm.gainItem(4001129,-300);
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
             var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*30); //ʱ��
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
cm.getChar().saveToDB(true,true);
cm.dispose();
                } else {
                   cm.sendOk("�Բ�����ļ���Ҳ���");
                   cm.dispose();
                }
              } else if (selection == 6) {//�������
                  if (cm.haveItem(4001129,50)) { //�����һ�
                    cm.sendOk("�����#v1142080#�� - ");
                    cm.gainItem(4001129,-50);	                
                     cm.gainItem(1142080,1);
cm.dispose();
                } else {//
                   cm.sendOk("�Բ�����ļ���Ҳ���");
                   cm.dispose();
                }
             } else if (selection == 7) {//�������
                  if (cm.haveItem(4001129,5000)) { //�����һ�
                    cm.sendOk("�����#v1142077#�� - ");
                    cm.gainItem(4001129,-5000);	                
                     cm.gainItem(1142077,1);
cm.dispose();
                } else {//2041211
                   cm.sendOk("�Բ�����ļ���Ҳ���");
                   cm.dispose();
                }
             } else if (selection == 8) {//�������
                  if (cm.haveItem(4001129,600)) { //�����һ�
                    cm.sendOk("�����#v2041211#�� - ");
                    cm.gainItem(4001129,-600);	                
                     cm.gainItem(2041211,1);
cm.dispose();
                } else {//2041211
                   cm.sendOk("�Բ�����ļ���Ҳ���");
                   cm.dispose();
                }
            }
        }
    }
}
