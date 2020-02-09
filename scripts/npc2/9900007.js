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
		cm.sendNext("圣诞快乐 ！");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;/*
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("圣诞节活动是否领取？\r\n五小时精灵吊坠一只。每个账号只可以领取一次。不可交易不可丢弃。\r\n#r领取之前请一定缺人装备栏是否有足够的空间存放该物品");
	} else if (status == 1) {
		if (cm.getChar().getPresent() == 1) {
			cm.gainItem(1002723,1);
			 var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
             var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*50); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true,true);
cm.getChar().setPresent(2);
cm.dispose();
			
		} else {
			cm.sendOk("每个帐号只可以领取#b1次#k。你已经领取过了！");
			cm.dispose();
		       }	
		}
	}
}
