
function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("��л��Ĺ��٣�");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "DƬ����������Ϊ ���������Ե��������Ƭ����Ƭ����������Ժϳɣ�\r\n"
            text += "#L1#ʹ��#v4031176#50�� ����#z4031179#��������200��ð�ձ�#k";//����
            text += "\r\n#L2#ʹ��#v4031177#30�� ����#z4031179#��������200��ð�ձ�#k";
            text += "\r\n#L3#ʹ��#v4031178#10�� ����#z4031179#��������200��ð�ձ�#k";
            cm.sendSimple(text);
        } else if (selection == 1) { //
            if (cm.haveItem(4031176, 50) && cm.getMeso() >= 2000000) {
                cm.gainItem(4031176, -50);
				cm.gainItem(4031179,+1);
                cm.sendOk("��ϲ����ȡ��");
                cm.dispose();
            } else {
                cm.sendOk("��û�������Ʒ��");
                cm.dispose();
            }
        } else if (selection == 2) {  //�����󹫵��ֽ�      
             if (cm.haveItem(4031177, 30) && cm.getMeso() >= 2000000) {
                cm.gainItem(4031177, -30);
				cm.gainItem(4031179,+1);
                cm.sendOk("��ϲ����ȡ��");
                cm.dispose();
            } else {
                cm.sendOk("��û�������Ʒ��");
                cm.dispose();
            }
        } else if (selection == 3) { //�����󹫶̽� 
            if (cm.haveItem(4031178, 10) && cm.getMeso() >= 2000000) {
                cm.gainItem(4031178, -10);
				cm.gainItem(4031179,+1);
                cm.sendOk("��ϲ����ȡ��");
                cm.dispose();
            } else {
                cm.sendOk("��û�������Ʒ��");
                cm.dispose();
            }
        } else if (selection == 4) {
            if (cm.haveItem(5220007, 1)) {
                cm.gainItem(5220007, -1);
                cm.sendOk("��ϲ����ȡ��");
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1372058); //���װ��������
                var toDrop = ii.randomizeStats(ii.getEquipById(1372058)).copy(); // ����һ��Equip��
                var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000 * 3); //ʱ��
                toDrop.setExpiration(temptime);
                toDrop.setLocked(1);
                cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
                cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
                cm.getChar().saveToDB(true,true);
                cm.dispose();
            } else {
                cm.sendOk("��û�������Ʒ��");
                cm.dispose();
            }
        } else if (selection == 5) { //�����󹫳���
             if (cm.haveItem(5220007, 1)) {
                cm.gainItem(5220007, -1);
                cm.sendOk("��ϲ����ȡ��");
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1382080); //���װ��������
                var toDrop = ii.randomizeStats(ii.getEquipById(1382080)).copy(); // ����һ��Equip��
                var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000 * 3); //ʱ��
                toDrop.setExpiration(temptime);
                toDrop.setLocked(1);
                cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
                cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
                cm.getChar().saveToDB(true,true);
                cm.dispose();
            } else {
                cm.sendOk("��û�������Ʒ��");
                cm.dispose();
            }
        } else if (selection == 5) {
            if ((cm.getNX() >= 202000)) {
                cm.gainNX(-202000);
                //cm.getPlayer().gainsg(-10); 
                //1002419 1122019 5030001 5071000
                cm.sendOk("��ϲ����ȡ��#b��ů��Χ����");
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1122018); //���װ��������
                var toDrop = ii.randomizeStats(ii.getEquipById(1122018)).copy(); // ����һ��Equip��
                var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000 * 30); //ʱ��
                toDrop.setExpiration(temptime);
                toDrop.setLocked(1);
                toDrop.setWatk(6);
                cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
                cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
                cm.getChar().saveToDB(true,true);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "��˫�����顽" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ��ȫ����+2��˫��װ��[��ů��Χ��]]��������", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("����㡣����ϵ����Ա��ֵ��");
                cm.dispose();
            }
        } else if (selection == 6) {
            cm.sendOk("#b��ϷģʽΪ�¹ٷ������Ͷ��ǰ��չٷ��ı�׼��ȡ����ȥ���֮��/��ľ��/��߳ǵ������ȥ������");
            cm.dispose();
        } else if (selection == 7) {
            cm.openNpc(1012103);
        } else if (selection == 8) {
            cm.openNpc(1052004);
        } else if (selection == 9) {
            var statup = new java.util.ArrayList();
            var p = cm.c.getPlayer();
            if (p.getExp() < 0) {
                p.setExp(0)
                statup.add(new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(0)));
                p.getClient().getSession().write(net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
                cm.sendOk("����ֵ���޸����");
                cm.dispose();
            } else {
                cm.sendOk("���ľ���ֵ����,�����޸�!");
                cm.dispose();
            }
        }
    }
}


