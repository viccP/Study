importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.client);

var status = 0;

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

	    var textz = "���ڵ��ı�BOSS��ɱ?�����һ���.��HP��ɣ�÷���!\r\n\r\n";

		textz += "#r#L0#�һ�+1000HP��ɣ�÷�(��)#l\r\n\r\n";

		textz += "#r#L1#�һ�+1000HP��ɣ�÷�(Ů)#l\r\n\r\n";

		textz += "#r#L2#�һ�+2000HP��ɣ�÷�(��)#l\r\n\r\n";

		textz += "#r#L3#�һ�+2000HP��ɣ�÷�(Ů)#l\r\n\r\n";

		textz += "#r#L4#�һ�+3000HP��ɣ�÷�(��)#l\r\n\r\n";

		textz += "#r#L5#�һ�+3000HP��ɣ�÷�(Ů)#l\r\n\r\n";

		cm.sendSimple (textz);  

	}else if (status == 1) {

	if (selection == 0){
		if (!cm.haveItem(1050018)) {
 			cm.sendOk("�����#v1050018##z1050018#\r\n\#rע:����Ʒ������֮��ɣ�÷�������#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001126,499)) {
 			cm.sendOk("�����#v4001126##z4001126#*500��");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b�뱣֤װ����λ������2���ո�,�����޷��һ�.");
			cm.dispose();
		} else{
     			cm.gainItem(1050018,-1);
			cm.gainItem(4001126,-500);
			var ID = 1050100;//��ԡ��
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // ����һ��Equip��
			var type = ii.getInventoryType(ID); //���װ��������
			toDrop.setHp(1000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[����]" + " : " + "[" + cm.getPlayer().getName() + "]�ɹ��һ�+1000HP����ԡ��(��)!,��ҹ�ϲ��!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 1){
		if (!cm.haveItem(1051017)) {
 			cm.sendOk("�����#v1051017##z1051017#\r\n\#rע:����Ʒ������֮��ɣ�÷�������#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001126,999)) {
 			cm.sendOk("�����#v4001126##z4001126#*1000��");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b�뱣֤װ����λ������2���ո�,�����޷��һ�.");
			cm.dispose();
		} else{
     			cm.gainItem(1051017,-1);
			cm.gainItem(4001126,-1000);
			var ID = 1051098;//��ԡ��
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // ����һ��Equip��
			var type = ii.getInventoryType(ID); //���װ��������
			toDrop.setHp(1000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[����]" + " : " + "[" + cm.getPlayer().getName() + "]�ɹ��һ�+1000HP�ĺ�ԡ��(Ů)!,��ҹ�ϲ��!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 2){
		if (!cm.haveItem(1050100)) {
 			cm.sendOk("�����#v1050100##z1050100#\r\n\#rע:����Ʒ��1000Ѫ�»��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4032011)) {
 			cm.sendOk("�����#v4032011##z4032011#\r\n\#rע:����Ʒ�ɻ�ɱ�����󹫻��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001111)) {
 			cm.sendOk("�����#v4001111##z4001111#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ����ħ(��)���#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001261)) {
 			cm.sendOk("�����#v4001261##z4001261#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ��ħ����ֻ��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001242)) {
 			cm.sendOk("�����#v4001242##z4001242#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ�İ�ʨ�����#k");
      			cm.dispose();
          	} else if (cm.getPlayer().getNX() < 30000) {
 			cm.sendOk("�����3����");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b�뱣֤װ����λ������2���ո�,�����޷��һ�.");
			cm.dispose();
		} else{
     			cm.gainItem(4032011,-1);
			cm.gainItem(4001111,-1);
			cm.gainItem(4001261,-1);
			cm.gainItem(4001242,-1);
			cm.gainItem(1050100,-1);
			cm.gainNX(-30000);
			var ID = 1050127;//ԡ��
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // ����һ��Equip��
			var type = ii.getInventoryType(ID); //���װ��������
			toDrop.setStr(3);
			toDrop.setDex(3);
			toDrop.setInt(3);
			toDrop.setLuk(3);
			toDrop.setHp(2000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[����]" + " : " + "[" + cm.getPlayer().getName() + "]�ɹ��һ�+2000HP��ԡ��(��)!,��ҹ�ϲ��!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 3){
		if (!cm.haveItem(1051098)) {
 			cm.sendOk("�����#v1051098##z1051098#\r\n\#rע:����Ʒ��1000Ѫ�»��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4032011)) {
 			cm.sendOk("�����#v4032011##z4032011#\r\n\#rע:����Ʒ�ɻ�ɱ�����󹫻��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001111)) {
 			cm.sendOk("�����#v4001111##z4001111#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ����ħ(��)���#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001261)) {
 			cm.sendOk("�����#v4001261##z4001261#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ��ħ����ֻ��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001242)) {
 			cm.sendOk("�����#v4001242##z4001242#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ�İ�ʨ�����#k");
      			cm.dispose();
          	} else if (cm.getPlayer().getNX() < 30000) {
 			cm.sendOk("�����3����");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b�뱣֤װ����λ������2���ո�,�����޷��һ�.");
			cm.dispose();
		} else{
     			cm.gainItem(4032011,-1);
			cm.gainItem(4001111,-1);
			cm.gainItem(4001261,-1);
			cm.gainItem(4001242,-1);
			cm.gainItem(1051098,-1);
			cm.gainNX(-30000);
			var ID = 1051140;//��ɫ��ԡ��
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // ����һ��Equip��
			var type = ii.getInventoryType(ID); //���װ��������
			toDrop.setStr(3);
			toDrop.setDex(3);
			toDrop.setInt(3);
			toDrop.setLuk(3);
			toDrop.setHp(2000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[����]" + " : " + "[" + cm.getPlayer().getName() + "]�ɹ��һ�+2000HP�Ļ�ɫ��ԡ��(Ů)!,��ҹ�ϲ��!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 4){
		if (!cm.haveItem(1050127)) {
 			cm.sendOk("�����#v1050127##z1050127#\r\n\#rע:����Ʒ��2000Ѫ�»��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001084)) {
 			cm.sendOk("�����#v4001084##z4001084#\r\n\#rע:����Ʒ�ɻ�ɱ������ͼ˹(����)���#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001083)) {
 			cm.sendOk("�����#v4001083##z4001083#\r\n\#rע:����Ʒ�ɻ�ɱ�������#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001261)) {
 			cm.sendOk("�����#v4001261##z4001261#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ��ħ����ֻ��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001111)) {
 			cm.sendOk("�����#v4001111##z4001111#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ����ħ(��)���#k");
      			cm.dispose();
          	} else if (cm.getPlayer().getNX() < 80000) {
 			cm.sendOk("�����8����");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b�뱣֤װ����λ������2���ո�,�����޷��һ�.");
			cm.dispose();
		} else{
     			cm.gainItem(4001084,-1);
			cm.gainItem(4001111,-1);
			cm.gainItem(4001083,-1);
			cm.gainItem(4001261,-1);
			cm.gainItem(1050127,-1);
			cm.gainNX(-80000);
			var ID = 1052358;//δ֪�׷�9
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // ����һ��Equip��
			var type = ii.getInventoryType(ID); //���װ��������
			toDrop.setStr(8);
			toDrop.setDex(8);
			toDrop.setInt(8);
			toDrop.setLuk(8);
			toDrop.setHp(3000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[����]" + " : " + "[" + cm.getPlayer().getName() + "]�ɹ��һ�+3000HP���׷�(��)!,��ҹ�ϲ��!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 5){
		if (!cm.haveItem(1051140)) {
 			cm.sendOk("�����#v1051140##z1051140#\r\n\#rע:����Ʒ��2000Ѫ�»��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001084)) {
 			cm.sendOk("�����#v4001084##z4001084#\r\n\#rע:����Ʒ�ɻ�ɱ������ͼ˹(����)���#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001083)) {
 			cm.sendOk("�����#v4001083##z4001083#\r\n\#rע:����Ʒ�ɻ�ɱ�������#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001261)) {
 			cm.sendOk("�����#v4001261##z4001261#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ��ħ����ֻ��#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001111)) {
 			cm.sendOk("�����#v4001111##z4001111#\r\n\#rע:����Ʒ�ɻ�ɱ��ɱ����ħ(��)���#k");
      			cm.dispose();
          	} else if (cm.getPlayer().getNX() < 80000) {
 			cm.sendOk("�����8����");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b�뱣֤װ����λ������2���ո�,�����޷��һ�.");
			cm.dispose();
		} else{
     			cm.gainItem(4001084,-1);
			cm.gainItem(4001111,-1);
			cm.gainItem(4001083,-1);
			cm.gainItem(4001261,-1);
			cm.gainItem(1051140,-1);
			cm.gainNX(-80000);
			var ID = 1052358;//δ֪�׷�9
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // ����һ��Equip��
			var type = ii.getInventoryType(ID); //���װ��������
			toDrop.setStr(8);
			toDrop.setDex(8);
			toDrop.setInt(8);
			toDrop.setLuk(8);
			toDrop.setHp(3000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[����]" + " : " + "[" + cm.getPlayer().getName() + "]�ɹ��һ�+3000HP���׷�(Ů)!,��ҹ�ϲ��!",true).getBytes());
      			cm.dispose();
			}

}
}
}
}
