/*�һ���Ҫ #v4000425#  ���� #v4000424#  ���� #v4000423# ����#v4000422#*/
importPackage(net.sf.cherry.client);
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
            var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
            for(var i = 1;i<=5;i++){
                if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
                    cm.sendOk("������Ӧ�������а������ճ�һ��");
                    cm.dispose();
                    return;
                }
            }
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "������ô���ϳ��أ���������ַ�����ȡħ��Ŷ��\r\n#bħ���ȡ���Ի�ø��õ�ħ���Լ����ֲ��ϡ�\r\n#dħ����¯�����ں�ħ���ȡ�µļ���ħ�裡\r\n"
            text += "#L1##b�鿴�ҵ�ħ���б�\r\n\r\n";
            text += "#L2##b#rʹ�ù�����Ͻ��жһ�ħ��\r\n\r\n"//
            text += "#L3##b#d#eħ���ȡ---------#k[#rNEW#k]\r\n\r\n"
            text += "#L4##b#d#e#rħ����¯---------#k[#rNEW#k]\r\n\r\n"
            cm.sendSimple(text);

        } else if (selection == 1) { //��ƾ��Ҷ����
            var a = "----\r\n";
            a += cm.��ѯħ��();
            cm.sendOk(a);
            cm.dispose();
        } else if (selection == 2) {  //ħ��һ�
            cm.openNpc(2000,10000);
        } else if (selection == 3) { //ħ���ȡ
            cm.openNpc(2000,20000);
        } else if (selection == 4) {//ħ����¯
            cm.openNpc(2000,30000);
            
        } else if (selection == 5) { //�����󹫳���
            if (cm.haveItem(4001325, 70)) {
                cm.sendOk("��ϲ����ȡ��");
                cm.gainItem(4001325, -70);
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1142175); //���װ��������
                var toDrop = ii.randomizeStats(ii.getEquipById(1142175)).copy(); // ����һ��Equip��
                toDrop.setAcc(12);
                toDrop.setAvoid(12);
                toDrop.setDex(12);
                toDrop.setHands(12);
                toDrop.setHp(800);
                toDrop.setInt(12);
                toDrop.setJump(12);
                toDrop.setLuk(12);
                toDrop.setMatk(12);
                toDrop.setMdef(12);
                toDrop.setMp(800);
                toDrop.setSpeed(12);
                toDrop.setStr(12);
                toDrop.setWatk(12);
                toDrop.setWdef(12);
                toDrop.setLocked(1);
                cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
                cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
                cm.getChar().saveToDB(true,true);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]����[ ���101-רҵ����--��ȫ����+12��+800Ѫ��+800����]���������ף�����������ɣ�", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("��Ʒ����");
                cm.dispose();
            }
        } else if (selection == 6) {
            if (cm.haveItem(4001325, 99)) {
                cm.sendOk("��ϲ����ȡ��");
                cm.gainItem(4001325, -99);
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1142177); //���װ��������
                var toDrop = ii.randomizeStats(ii.getEquipById(1142177)).copy(); // ����һ��Equip��
                toDrop.setAcc(15);
                toDrop.setAvoid(15);
                toDrop.setDex(15);
                toDrop.setHands(15);
                toDrop.setHp(1000);
                toDrop.setInt(15);
                toDrop.setJump(15);
                toDrop.setLuk(15);
                toDrop.setMatk(15);
                toDrop.setMdef(15);
                toDrop.setMp(1000);
                toDrop.setSpeed(15);
                toDrop.setStr(15);
                toDrop.setWatk(15);
                toDrop.setWdef(15);
                toDrop.setLocked(1);
                cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
                cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
                cm.getChar().saveToDB(true,true);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[  ����-��������ѫ��--��ȫ����+15��+1000Ѫ��+1000������]���������ף�����������ɣ�", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("��Ʒ����");
                cm.dispose();
            }
        } else if (selection == 7) {
            if (cm.haveItem(4001325, 44)) {
                cm.gainItem(1082232, +1);
                cm.gainItem(4001325, -44);
                cm.sendOk("OK.��鱳���ɣ�~");
                var name = "Ů������";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ " + name + "]���������ף�����������ɣ�", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("��Ʒ�������㣡");
                cm.dispose();
            }
        } else if (selection == 8) {
            if (cm.haveItem(4001325, 299)) {
                cm.gainItem(1112495, +1);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.sendOk("OK.��鱳���ɣ�~");
                var name = "�Ϲ����Ž�ָLV50";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ " + name + "]���������ף�����������ɣ�", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("��Ʒ�������㣡");
                cm.dispose();
            }
        } else if (selection == 9) {
            if (cm.haveItem(4001325, 150)) {
                cm.gainItem(4000423, +1);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.sendOk("OK.��鱳���ɣ�~");
                var name = "�����";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ " + name + "]���������ף�����������ɣ�", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("��Ʒ�������㣡");
                cm.dispose();
            }
        } else if (selection == 10) {
            if (cm.haveItem(4001325, 150)) {
                cm.gainItem(4000424, +1);
                cm.gainItem(4001325, -150);
                cm.sendOk("OK.��鱳���ɣ�~");
                var name = "�����";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ " + name + "]���������ף�����������ɣ�", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("��Ʒ�������㣡");
                cm.dispose();
            }
        } else if (selection == 11) {
            if (cm.haveItem(4001325, 99)) {
                cm.gainItem(1112916, +1);
                cm.gainItem(4001325, -99);
                cm.sendOk("OK.��鱳���ɣ�~");
                var name = "�����ָ";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ " + name + "]���������ף�����������ɣ�", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("��Ʒ�������㣡");
                cm.dispose();
            }
        }
    }
}


