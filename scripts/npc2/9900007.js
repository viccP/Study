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
		cm.sendNext("ʥ������ ��");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;/*
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("ʥ���ڻ�Ƿ���ȡ��\r\n��Сʱ�����׹һֻ��ÿ���˺�ֻ������ȡһ�Ρ����ɽ��ײ��ɶ�����\r\n#r��ȡ֮ǰ��һ��ȱ��װ�����Ƿ����㹻�Ŀռ��Ÿ���Ʒ");
	} else if (status == 1) {
		if (cm.getChar().getPresent() == 1) {
			cm.gainItem(1002723,1);
			 var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //���װ��������
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
             var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*50); //ʱ��
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
cm.getChar().saveToDB(true,true);
cm.getChar().setPresent(2);
cm.dispose();
			
		} else {
			cm.sendOk("ÿ���ʺ�ֻ������ȡ#b1��#k�����Ѿ���ȡ���ˣ�");
			cm.dispose();
		       }	
		}
	}
}
