
/*
��ԵNPC
��Ҷ��ȡ���
*/

/*importPackage(net.sf.odinms.client);

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
                
			cm.sendOk("���Ǹ����ܵģ�������");
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
			cm.sendSimple("�𾴵����.˫����׹������.������ɻ��#b ˫������ #kЧ��\r\n���ڵ�ʲô�� �㣬ֵ��ӵ�У�\r\n<˫����׹���ص�˫����Ч��>\r\n#L1##bʹ��#r1000����Ҷ�һ�300���#k\r\n#L3##b����1��ʹ��Ȩ<�����׹>-����4000���#k\r\n#L4##b����7��ʹ��Ȩ<�����׹>-����24500���#k\r\n#L5##b����30��ʹ��Ȩ<�����׹>-����102000���#k");
			} else if (status == 1) { //ʹ��10000��Ҷ��ȡ500���
			if (selection == 1) {
			if (cm.haveItem(4001126, 1000)) { 
		   	cm.gainItem(4001126, -1000);
            		cm.gainNX(300);
			cm.sendOk("�𾴵���ң�����˻��Ѿ��ɹ�������300����ˣ�");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�𾴵���ң���ķ�Ҷ����1000����~��");
			cm.dispose(); }
//-------------------------------������ת����-----------------------------
			} else if  (selection == 2) {  //һ��Ȩ 24500
			if ((cm.getNX() >= 4000)) { 
			cm.gainNX(-4000);
                         var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
                         var type = ii.getInventoryType(1122017); //���װ��������
var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30 *3 *60); //ʱ��
toDrop.setExpiration(temptime); //��װ��ʱ��
		   	cm.gainItem(1122017,1);
			cm.sendOk("��ϲ�����˾����׹<һ��Ȩ>");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�����~");
			cm.dispose(); }
//------------------------------�߼�����һ�----------------------------------
            } else if (selection == 3) {
           	   if (cm.haveItem(5350000, 1)) { 
                   cm.gainItem(5350000,-1);
                   cm.gainItem(2300001,100);
                   cm.sendOk("�һ��ɹ���");
                   cm.dispose();
                   } else {
		   cm.sendOk("��û�и߼����~"); 
		   cm.dispose(); }
//--------------------------------����һ�------------------------------------
            } else if (selection == 4) {
           	 if ((cm.getMeso() >= 3000)) { 
                   cm.gainItem(2300000,50);
		   cm.gainMeso(-3000);
                   cm.sendOk("�һ��ɹ���");
                   cm.dispose();
                   } else {
		   cm.sendOk("ð�ձҲ���~��Ҫ3000ð�ձ�"); 
		   cm.dispose(); }
//-------------------------------���ڵ��㳡------------------------------------
	                 } else if (selection == 5) {
                   cm.sendNextPrev("������㳡��Ҫ#b�߼����#k����#b���#k,Ҳ��Ҫ#b���㳡ר������#k,��#b���#k,��Щ�㶼����ͨ����������.#b���#k��ȥ������̳�����!");
                   cm.dispose();
		}}
	}
}*/
/*
                �����ļ���XioxMS����˵ĺ����ļ�֮һ��
  Ŀǰ��Ȩ (C) 2010��   XioxMS             <100807851@qq.com>
 * -----------------------------------------------------------*
  ֮ǰ��Ա (C) 2008��   Huy              <patrick.huy@frz.cc>
                       Matthias Butz       <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 @�÷����Ŀǰά����Ա:xioxms
 @����ļ���������ʽ.�������������
 @������򷢲���Ŀ����������������@
 @�������Ҫ����֧��,������ϵ����/ά����Ա<QQ100807851>
 @��Ӧ���Ѿ��յ�һ��Affero GNUͨ�ù�����Ȩ
 -�������,����ϸ�鿴http://www.gnu.org/licenses/*
*/

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
                
   cm.sendOk("��лʹ��.");
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
	for(i = 0; i < 10; i++){
		text += "";
	}				
	text += "��ӵ��ʲô���ⱦ���أ����Զһ���ͬ�ļ����ָŶ��\r\n"
	text += "#L4##bʹ��#r#z5532000##l\r\n"; //��Сʱ
	text += "     \r\n"
	text += "#L1##bʹ��#r#z5532001##k";//һ��
	text += "     \r\n"
	text += "\r\n#L3##dʹ��#r#z5532002##k";//����
	text += "     \r\n"
        cm.sendSimple(text,2);
    } else if (status == 1) {
           if (selection == 0) {      
	   cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 1) {  //5532001 һ��Ȩ           
	  	if (cm.haveItem(5532001, 1)) { 
                   cm.gainItem(5532001,-1);
		   cm.sendOk("��ϲ����ȡ��");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1112404); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy(); // ����һ��Equip��
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000); //ʱ��
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
cm.getChar().saveToDB(true,true);
  cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�������ָ��" + " : " + " [" + cm.getPlayer().getName() + "]����˼����ָ<1��Ȩ>��",true).getBytes()); 
		   cm.dispose();
	   }else{
		   cm.sendOk("��û�������Ʒ��");
		   cm.dispose();
	   }
    }else if  (selection == 3) {
                   if (cm.haveItem(5532002, 1)) { 
                   cm.gainItem(5532002,-1);
		   cm.sendOk("��ϲ����ȡ��");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1112404); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy(); // ����һ��Equip��
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000*7); //ʱ��
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
cm.getChar().saveToDB(true,true);
  cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�������ָ��" + " : " + " [" + cm.getPlayer().getName() + "]����˼����ָ<7��Ȩ>��",true).getBytes()); 
		   cm.dispose();
	   }else{
		  cm.sendOk("��û�������Ʒ��");
		   cm.dispose();
	   }
    }else if  (selection == 2) {      
                   if (cm.haveItem(5532000, 1)) { 
                   cm.gainItem(5532000,-1);
		   cm.sendOk("��ϲ����ȡ��");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�𾴵���ң���ķ�Ҷ����1000����~��");
			cm.dispose(); }
    }else if  (selection == 4) {
                   if (cm.haveItem(5532000, 1)) { 
                   cm.gainItem(5532000,-1);
		   cm.sendOk("��ϲ����ȡ��");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1112404); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy(); // ����һ��Equip��
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*30); //ʱ��
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(6);
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
cm.getChar().saveToDB(true,true);
  cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�������ָ��" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ�˼����ָ3Сʱ��",true).getBytes()); 
		   cm.dispose();
	   }else{
		   cm.sendOk("����㡣����ϵ����Ա��ֵ��");
		   cm.dispose();
	   }
    }else if  (selection == 5) {
             if ((cm.getNX() >= 202000)) { 
			cm.gainNX(-202000);
                   //cm.getPlayer().gainsg(-10); 
                   //1002419 1122019 5030001 5071000
		   cm.sendOk("��ϲ����ȡ��#b��ů��Χ����");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122018); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1122018)).copy(); // ����һ��Equip��
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000*30); //ʱ��
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(6);
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
cm.getChar().saveToDB(true,true);
  cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"��˫�����顽" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ��ȫ����+2��˫��װ��[��ů��Χ��]]��������",true).getBytes()); 
		   cm.dispose();
	   }else{
		   cm.sendOk("����㡣����ϵ����Ա��ֵ��");
		   cm.dispose();
	   }
    }else if  (selection == 6) {
	  cm.sendOk("#b��ϷģʽΪ�¹ٷ������Ͷ��ǰ��չٷ��ı�׼��ȡ����ȥ���֮��/��ľ��/��߳ǵ������ȥ������");
		cm.dispose();
    }else if  (selection == 7) {     
           cm.openNpc(1012103);  	     
    }else if  (selection == 8) {
           cm.openNpc(1052004);                  
    }else if  (selection == 9) {  
	   var statup = new java.util.ArrayList();
	   var p = cm.c.getPlayer();
	   if(p.getExp() < 0){
		   p.setExp(0) 
		   statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(0))); 
		   p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
		   cm.sendOk("����ֵ���޸����");
		   cm.dispose();
	   }else{
		   cm.sendOk("���ľ���ֵ����,�����޸�!");
		   cm.dispose();
	   }
    }        
}
}
}


