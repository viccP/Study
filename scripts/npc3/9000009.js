
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
			    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull())
                {
                    cm.sendOk("������Ӧ����װ�����ճ�һ��");
                    cm.dispose();
				}else{
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "������ʲô����\r\n"
            text += "#L1##b����װ��#r#l\r\n\r\n";//����
            text += "#L2##b�ݻ�װ��#r[��һ��]#l\r\n"//���ֽ�
          
            cm.sendSimple(text);
			}
        } else if (selection == 1) { //����װ��
                cm.openNpc(9000009,2);
        } else if (selection == 2) {  //�ݻ�װ��
		cm.openNpc(9000009,1);	
        } else if (selection == 3) { //�����󹫶̽� 
         if(cm.haveItem(4001325,119)){
			   cm.gainItem(1012191,+1);
			   cm.gainItem(4001325,-119);
			   cm.sendOk("OK.��鱳���ɣ�~");
			    var name = "��Ӱ˫��ͷ��";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ "+name+"]���������ף�����������ɣ�",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("��Ʒ�������㣡");
			   cm.dispose();
		   }
        } else if (selection == 4) {
		 if(cm.haveItem(4001325,50)){
		   cm.sendOk("��ϲ����ȡ��");
		   cm.gainItem(4001325,-50);
            var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1142174); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1142174)).copy(); // ����һ��Equip��
			toDrop.setWatk(10);	
			toDrop.setLocked(10);	
			toDrop.setStr(10);
			toDrop.setDex(10);
			toDrop.setInt(10);
			toDrop.setLuk(10);
			toDrop.sethp(500);		
			toDrop.setmp(500);		
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(true,true);
			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ ��������-רҵ���� -ȫ����10 500hp 500mp]���������ף�����������ɣ�",true).getBytes()); 
			cm.dispose();
	   }else{
		   cm.sendOk("��Ʒ����");
		   cm.dispose();
	   }
        } else if (selection == 5) { //�����󹫳���
            if(cm.haveItem(4001325,70)){
		   cm.sendOk("��ϲ����ȡ��");
		   cm.gainItem(4001325,-70);
            var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1142175); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1142175)).copy(); // ����һ��Equip��
			toDrop.setWatk(12);	
			toDrop.setLocked(12);	
			toDrop.setStr(12);
			toDrop.setDex(12);
			toDrop.setInt(12);
			toDrop.setLuk(12);
			toDrop.sethp(800);		
			toDrop.setmp(800);		
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(true,true);
			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ ���101-רҵ����--��ȫ����+12��+800Ѫ��+800����]���������ף�����������ɣ�",true).getBytes()); 
			cm.dispose();
	   }else{
		   cm.sendOk("��Ʒ����");
		   cm.dispose();
	   }
        } else if (selection == 6) {
           if(cm.haveItem(4001325,99)){
		   cm.sendOk("��ϲ����ȡ��");
		   cm.gainItem(4001325,-99);
            var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1142177); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1142177)).copy(); // ����һ��Equip��
			 toDrop.setAcc(10);
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
		cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[  ����-��������ѫ��--��ȫ����+15��+1000Ѫ��+1000������]���������ף�����������ɣ�",true).getBytes()); 
			cm.dispose();
	   }else{
		   cm.sendOk("��Ʒ����");
		   cm.dispose();
	   }
        } else if (selection == 7) {
         if(cm.haveItem(4001325,44)){
			   cm.gainItem(1082232,+1);
			   cm.gainItem(4001325,-44);
			   cm.sendOk("OK.��鱳���ɣ�~");
			    var name = "Ů������";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ "+name+"]���������ף�����������ɣ�",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("��Ʒ�������㣡");
			   cm.dispose();
		   }
        } else if (selection == 8) {
           if(cm.haveItem(4001325,299)){
			   cm.gainItem(1112495,+1);
			   cm.gainItem(4001325,-50);
			   cm.gainItem(4001325,-50);
			   cm.gainItem(4001325,-50);
			   cm.gainItem(4001325,-50);
			   cm.gainItem(4001325,-50);
			   cm.gainItem(4001325,-50);
			   cm.sendOk("OK.��鱳���ɣ�~");
			    var name = "�Ϲ����Ž�ָLV50";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ "+name+"]���������ף�����������ɣ�",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("��Ʒ�������㣡");
			   cm.dispose();
		   }
        } else if (selection == 9) {
            if(cm.haveItem(4001325,150)){
			   cm.gainItem(4000423,+1);
			   cm.gainItem(4001325,-50);
			   cm.gainItem(4001325,-50);
			   cm.gainItem(4001325,-50);
			   cm.sendOk("OK.��鱳���ɣ�~");
			    var name = "�����";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ "+name+"]���������ף�����������ɣ�",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("��Ʒ�������㣡");
			   cm.dispose();
		   }
        } else if (selection == 10) {
           if(cm.haveItem(4001325,150)){
			   cm.gainItem(4000424,+1);
			   cm.gainItem(4001325,-150);
			   cm.sendOk("OK.��鱳���ɣ�~");
			    var name = "�����";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ "+name+"]���������ף�����������ɣ�",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("��Ʒ�������㣡");
			   cm.dispose();
		   }
        }else if (selection == 11) {
           if(cm.haveItem(4001325,99)){
			   cm.gainItem(1112916,+1);
			   cm.gainItem(4001325,-99);
			   cm.sendOk("OK.��鱳���ɣ�~");
			    var name = "�����ָ";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����¸�����" + " : " + " [" + cm.getPlayer().getName() + "]������[ "+name+"]���������ף�����������ɣ�",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("��Ʒ�������㣡");
			   cm.dispose();
		   }
        }
    }
}


