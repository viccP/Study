/**
 * @��������������������
 * @ÿ��ǩ������ȡ��Ʒ npc
 * @npcName��ð�յ���ӪԱ
 * @npcID��   9900004
 **/
importPackage(net.sf.cherry.client);
var status = 0;
var ��ˮ�� = 4021008;
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new = "#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";
var �Ҹ� = "#k��ܰ��ʾ���κηǷ��������ҷ�Ŵ���.��ɱ��������.";
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
            var txt2 = "#L2#" + ��ɫ��ͷ + "#d ��ȡ 100 Ԫ��ֵ����#d��#r#z2049100#x5 #z5130000#x5 С���ָx2 #z5150040# x1 #z1112154# #z1112266#\r\n";
            var txt3 = "#L3##b" + ��ɫ��ͷ + " ��ȡ 300 Ԫ��ֵ������#r#z2340000#x5 #z5130000#x15 #z5220040#x10 #z4009237#x3\r\n";
            var txt4 = "#L4##d" + ��ɫ��ͷ + " ��ȡ 500 Ԫ��ֵ������#r#z3010852#x1 #z5532002#x4 #z4009237# x5 #z1122017# - 1��\r\n\r\n";
            var txt5 = "#L5##k#e" + ��ɫ��ͷ + " ��ȡ 1000Ԫ/��ֵ������#r#e#z1003364# #z1072610# #z1052405# #z1082391# #z1132110# #z1102322##k  #z5150040# x2---��˵��װ\r\n\r\n"
            var txt6 = "#L6##g" + ��ɫ��ͷ + "#d ��ȡ 2000 Ԫ��ֵ������#z1122017# - �����졡#z5150040# x10 #z1112265# #z1112153# #z3010455# \r\n\r\n";
        
            cm.sendSimple("���˺����ֵ��" + cm.getcz() + "RMB��\r\n#eע�⣡����һ��Ҫ���㹻�ı����ռ䣡������ȡʧ�ܸŲ�����#n\r\n" + txt2 + "" + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "");

        } else if (status == 1) {
            if (selection == 1) {
                cm.openNpc(9900004, 12);
            } else if (selection == 2) { //���๦�� #z1112154# #z1112266#
                if (cm.getcz() >= 100 && cm.getPlayer().getqiandao2() == 0){
                    cm.sendOk("��ϲ����ȡ�ɹ�.");
                    cm.gainItem(5150040,+1);
                    cm.gainItem(1112154,+1);
                    cm.gainItem(1112266,+1);
                               cm.gainItem(5130000, +5);
                    cm.gainItem(2049100, +5);
                    cm.gainItem(1112907, +1);
                    cm.getPlayer().gainqiandao2(+1);
                      cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��ֵ���]" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ������100Ԫ������", true).getBytes());
       
                    cm.getChar().saveToDB(true,true);
                   // //cm.ˢ�µ�ͼ();
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡ������ȷ����ﵽָ��������\r\n" + cm.getPlayer().getqiandao2() + "");
                    cm.dispose();
                }
            } else if (selection == 3) {//300
                //#r#z2340000#x5 #z5130000#x15 #z5220040#x10 #z4009237#x3
                if (cm.getcz() >= 300 && cm.getPlayer().getqiandao2() == 1) {
                    cm.sendOk("��ϲ����ȡ�ɹ�.");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��ֵ���]" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ������300Ԫ������", true).getBytes());
                    cm.gainItem(2340000, +5);
                    cm.gainItem(5130000, +15);
                    cm.gainItem(5220040, +10);
                    cm.gainItem(4009237, +3);
                    cm.getPlayer().gainqiandao2(1);
                    cm.getChar().saveToDB(true,true);
                     //cm.ˢ�µ�ͼ();
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡ������ȷ����ﵽָ��������\r\n��ȡ����һ������ſ�����ȡ������Ŷ��");
                    cm.dispose();
                }
            } else if (selection == 4) { //500 
                //��#r#z3010852#x1 #z5532002#x4 #z4009237# x5 #z1122017#
                if (cm.getcz() >= 500 && cm.getPlayer().getqiandao2() == 2) {
                    cm.sendOk("��ϲ����ȡ�ɹ�.");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��ֵ���]" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ������500Ԫ������", true).getBytes());
                    
                    cm.gainItem(3010852, +1);
                    cm.gainItem(5532002, +4);
                    cm.gainItem(4009237, +5);
                    cm.getPlayer().gainqiandao2(+1);
                    var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                    var type = ii.getInventoryType(1122017); //���װ��������
                    var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
                    var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000 * 1); //ʱ��
                    toDrop.setExpiration(temptime);
                    toDrop.setLocked(1);
                    toDrop.setWatk(6);
                    cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
                    cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
                    cm.getChar().saveToDB(true,true);
                     //cm.ˢ�µ�ͼ();
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡ������ȷ����ﵽָ��������\r\n��ȡ����һ������ſ�����ȡ������Ŷ��");
                    cm.dispose();
                }
            } else if (selection == 5) { //1000
                //#r#e#z1003364# #z1072610# #z1052405# #z1082391# #z1132110# #z1102322##k
                if (cm.getcz() >= 1000 && cm.getPlayer().getqiandao2() == 3) {
                    cm.sendOk("��ϲ����ȡ�ɹ�.");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��ֵ���]" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ������1000Ԫ�����������ð�յ���˵��װ����", true).getBytes());
                    cm.gainItem(1003364, +1);
                    cm.gainItem(1072610, +1);
                    cm.gainItem(1052405, +1);
					
                    cm.gainItem(1082391, +1);
                    cm.gainItem(1132110, +1);
                    cm.gainItem(1102322, +1);
                     cm.gainItem(5150040,+2);
                    cm.getPlayer().gainqiandao2(1);
                    cm.getChar().saveToDB(true,true);
                     //cm.ˢ�µ�ͼ();
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡ������ȷ����ﵽָ��������\r\n��ȡ����һ������ſ�����ȡ������Ŷ��");
                    cm.dispose();
                }
            } else if (selection == 6) { //2000
                //#z1122017# - �����졡#z5150040# x10 #z1112265# #z1112153# #z3010455# 
                if (cm.getcz() >= 2000 && cm.getPlayer().getqiandao2() == 4) {
                    cm.sendOk("��ϲ����ȡ�ɹ�.");
                    cm.gainItem(5150040,+10);
                    cm.gainItem(1112265,+1);
                    cm.gainItem(1112153,+1);
                    cm.gainItem(3010455,+1);
                    cm.getPlayer().gainqiandao2(1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��ֵ���]" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ������2000Ԫ������", true).getBytes());
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                    var type = ii.getInventoryType(1122017); //���װ��������
                    var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
                    var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000 * 1); //ʱ��
                    toDrop.setExpiration(temptime);
                    toDrop.setLocked(1);
                    toDrop.setWatk(6);
                    cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
                    cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
                    cm.getChar().saveToDB(true,true);
                     //cm.ˢ�µ�ͼ();
                    cm.dispose();
                    
                } else {
                    cm.sendOk("��ȡ������ȷ����ﵽָ��������\r\n��ȡ����һ������ſ�����ȡ������Ŷ��");
                    cm.dispose();
                }
            } else if (selection == 7) { //3000
                if (cm.getcz() >= 3000 && cm.getPlayer().getqiandao2() == 5) {
                    cm.sendOk("��ϲ����ȡ�ɹ�.");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��ֵ���]" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ������3000Ԫ������", true).getBytes());
                    cm.gainItem(2340000, 20);
                    cm.gainItem(5130000, 100);
                    cm.gainItem(5220040, 100);
                    cm.gainItem(4009325, 200);
                    cm.gainItem(4009328, 5);
                    cm.getPlayer().gainqiandao2(1);
                    cm.getChar().saveToDB(true,true);
                     //cm.ˢ�µ�ͼ();
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡ������ȷ����ﵽָ��������\r\n��ȡ����һ������ſ�����ȡ������Ŷ��");
                    cm.dispose();
                }
            } else if (selection == 8) { //4000
                if (cm.getcz() >= 4000 && cm.getPlayer().getqiandao2() == 6) {
                    cm.sendOk("��ϲ����ȡ�ɹ�.�����һ����Ʒ��#z4250802#����#z4250902#����#z4251002#����#z4251102#����#z4251202#��");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��ֵ���]" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ������4000Ԫ������", true).getBytes());
                    cm.gainItem(2049100, 30);
                    cm.gainItem(5130000, 150);
                    cm.gainItem(5220040, 150);
                    cm.gainItem(4009326, 100);
                    cm.gainItem(4009328, 10);
                    cm.getPlayer().gainqiandao2(1);
                    cm.getChar().saveToDB(true,true);
                     //cm.ˢ�µ�ͼ();
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡ������ȷ����ﵽָ��������\r\n��ȡ����һ������ſ�����ȡ������Ŷ��");
                    cm.dispose();
                }
            } else if (selection == 9) { 
                if (cm.getcz() >= 5000 && cm.getPlayer().getqiandao2() == 7) {
                    cm.sendOk("��ϲ����ȡ�ɹ�.");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��ֵ���]" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ������5000Ԫ������", true).getBytes());
                    cm.gainItem(2340000, 30);
                    cm.gainItem(5130000, 200);
                    cm.gainItem(5220040, 200);
                    cm.gainItem(4009326, 100);
                    cm.gainItem(4009328, 15);
                    cm.getPlayer().gainqiandao2(1);
                    cm.getChar().saveToDB(true,true);
                     //cm.ˢ�µ�ͼ();
                    cm.dispose();
                } else {
                    cm.sendOk("��ȡ������ȷ����ﵽָ��������\r\n��ȡ����һ������ſ�����ȡ������Ŷ��");
                    cm.dispose();
                }
            }
        }
    }
}
