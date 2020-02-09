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

	    var textz = "还在担心被BOSS秒杀?快来兑换吧.加HP的桑拿服噢!\r\n\r\n";

		textz += "#r#L0#兑换+1000HP的桑拿服(男)#l\r\n\r\n";

		textz += "#r#L1#兑换+1000HP的桑拿服(女)#l\r\n\r\n";

		textz += "#r#L2#兑换+2000HP的桑拿服(男)#l\r\n\r\n";

		textz += "#r#L3#兑换+2000HP的桑拿服(女)#l\r\n\r\n";

		textz += "#r#L4#兑换+3000HP的桑拿服(男)#l\r\n\r\n";

		textz += "#r#L5#兑换+3000HP的桑拿服(女)#l\r\n\r\n";

		cm.sendSimple (textz);  

	}else if (status == 1) {

	if (selection == 0){
		if (!cm.haveItem(1050018)) {
 			cm.sendOk("请带来#v1050018##z1050018#\r\n\#r注:该物品由林中之城桑拿服任务获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001126,499)) {
 			cm.sendOk("请带来#v4001126##z4001126#*500个");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法兑换.");
			cm.dispose();
		} else{
     			cm.gainItem(1050018,-1);
			cm.gainItem(4001126,-500);
			var ID = 1050100;//蓝浴巾
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // 生成一个Equip类
			var type = ii.getInventoryType(ID); //获得装备的类形
			toDrop.setHp(1000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[公告]" + " : " + "[" + cm.getPlayer().getName() + "]成功兑换+1000HP的蓝浴巾(男)!,大家恭喜他!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 1){
		if (!cm.haveItem(1051017)) {
 			cm.sendOk("请带来#v1051017##z1051017#\r\n\#r注:该物品由林中之城桑拿服任务获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001126,999)) {
 			cm.sendOk("请带来#v4001126##z4001126#*1000个");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法兑换.");
			cm.dispose();
		} else{
     			cm.gainItem(1051017,-1);
			cm.gainItem(4001126,-1000);
			var ID = 1051098;//红浴巾
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // 生成一个Equip类
			var type = ii.getInventoryType(ID); //获得装备的类形
			toDrop.setHp(1000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[公告]" + " : " + "[" + cm.getPlayer().getName() + "]成功兑换+1000HP的红浴巾(女)!,大家恭喜他!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 2){
		if (!cm.haveItem(1050100)) {
 			cm.sendOk("请带来#v1050100##z1050100#\r\n\#r注:该物品由1000血衣获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4032011)) {
 			cm.sendOk("请带来#v4032011##z4032011#\r\n\#r注:该物品由击杀地狱大公获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001111)) {
 			cm.sendOk("请带来#v4001111##z4001111#\r\n\#r注:该物品由击杀击杀蝙蝠魔(船)获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001261)) {
 			cm.sendOk("请带来#v4001261##z4001261#\r\n\#r注:该物品由击杀击杀巨魔蝙蝠怪获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001242)) {
 			cm.sendOk("请带来#v4001242##z4001242#\r\n\#r注:该物品由击杀击杀心疤狮王获得#k");
      			cm.dispose();
          	} else if (cm.getPlayer().getNX() < 30000) {
 			cm.sendOk("请带来3万点卷");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法兑换.");
			cm.dispose();
		} else{
     			cm.gainItem(4032011,-1);
			cm.gainItem(4001111,-1);
			cm.gainItem(4001261,-1);
			cm.gainItem(4001242,-1);
			cm.gainItem(1050100,-1);
			cm.gainNX(-30000);
			var ID = 1050127;//浴巾
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // 生成一个Equip类
			var type = ii.getInventoryType(ID); //获得装备的类形
			toDrop.setStr(3);
			toDrop.setDex(3);
			toDrop.setInt(3);
			toDrop.setLuk(3);
			toDrop.setHp(2000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[公告]" + " : " + "[" + cm.getPlayer().getName() + "]成功兑换+2000HP的浴巾(男)!,大家恭喜他!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 3){
		if (!cm.haveItem(1051098)) {
 			cm.sendOk("请带来#v1051098##z1051098#\r\n\#r注:该物品由1000血衣获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4032011)) {
 			cm.sendOk("请带来#v4032011##z4032011#\r\n\#r注:该物品由击杀地狱大公获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001111)) {
 			cm.sendOk("请带来#v4001111##z4001111#\r\n\#r注:该物品由击杀击杀蝙蝠魔(船)获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001261)) {
 			cm.sendOk("请带来#v4001261##z4001261#\r\n\#r注:该物品由击杀击杀巨魔蝙蝠怪获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001242)) {
 			cm.sendOk("请带来#v4001242##z4001242#\r\n\#r注:该物品由击杀击杀心疤狮王获得#k");
      			cm.dispose();
          	} else if (cm.getPlayer().getNX() < 30000) {
 			cm.sendOk("请带来3万点卷");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法兑换.");
			cm.dispose();
		} else{
     			cm.gainItem(4032011,-1);
			cm.gainItem(4001111,-1);
			cm.gainItem(4001261,-1);
			cm.gainItem(4001242,-1);
			cm.gainItem(1051098,-1);
			cm.gainNX(-30000);
			var ID = 1051140;//黄色沐浴巾
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // 生成一个Equip类
			var type = ii.getInventoryType(ID); //获得装备的类形
			toDrop.setStr(3);
			toDrop.setDex(3);
			toDrop.setInt(3);
			toDrop.setLuk(3);
			toDrop.setHp(2000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[公告]" + " : " + "[" + cm.getPlayer().getName() + "]成功兑换+2000HP的黄色沐浴巾(女)!,大家恭喜他!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 4){
		if (!cm.haveItem(1050127)) {
 			cm.sendOk("请带来#v1050127##z1050127#\r\n\#r注:该物品由2000血衣获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001084)) {
 			cm.sendOk("请带来#v4001084##z4001084#\r\n\#r注:该物品由击杀帕普拉图斯(闹钟)获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001083)) {
 			cm.sendOk("请带来#v4001083##z4001083#\r\n\#r注:该物品由击杀扎昆获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001261)) {
 			cm.sendOk("请带来#v4001261##z4001261#\r\n\#r注:该物品由击杀击杀巨魔蝙蝠怪获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001111)) {
 			cm.sendOk("请带来#v4001111##z4001111#\r\n\#r注:该物品由击杀击杀蝙蝠魔(船)获得#k");
      			cm.dispose();
          	} else if (cm.getPlayer().getNX() < 80000) {
 			cm.sendOk("请带来8万点卷");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法兑换.");
			cm.dispose();
		} else{
     			cm.gainItem(4001084,-1);
			cm.gainItem(4001111,-1);
			cm.gainItem(4001083,-1);
			cm.gainItem(4001261,-1);
			cm.gainItem(1050127,-1);
			cm.gainNX(-80000);
			var ID = 1052358;//未知套服9
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // 生成一个Equip类
			var type = ii.getInventoryType(ID); //获得装备的类形
			toDrop.setStr(8);
			toDrop.setDex(8);
			toDrop.setInt(8);
			toDrop.setLuk(8);
			toDrop.setHp(3000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[公告]" + " : " + "[" + cm.getPlayer().getName() + "]成功兑换+3000HP的套服(男)!,大家恭喜他!",true).getBytes());
      			cm.dispose();
			}

	}else if (selection == 5){
		if (!cm.haveItem(1051140)) {
 			cm.sendOk("请带来#v1051140##z1051140#\r\n\#r注:该物品由2000血衣获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001084)) {
 			cm.sendOk("请带来#v4001084##z4001084#\r\n\#r注:该物品由击杀帕普拉图斯(闹钟)获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001083)) {
 			cm.sendOk("请带来#v4001083##z4001083#\r\n\#r注:该物品由击杀扎昆获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001261)) {
 			cm.sendOk("请带来#v4001261##z4001261#\r\n\#r注:该物品由击杀击杀巨魔蝙蝠怪获得#k");
      			cm.dispose();
		} else if (!cm.haveItem(4001111)) {
 			cm.sendOk("请带来#v4001111##z4001111#\r\n\#r注:该物品由击杀击杀蝙蝠魔(船)获得#k");
      			cm.dispose();
          	} else if (cm.getPlayer().getNX() < 80000) {
 			cm.sendOk("请带来8万点卷");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull(2)){
			cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法兑换.");
			cm.dispose();
		} else{
     			cm.gainItem(4001084,-1);
			cm.gainItem(4001111,-1);
			cm.gainItem(4001083,-1);
			cm.gainItem(4001261,-1);
			cm.gainItem(1051140,-1);
			cm.gainNX(-80000);
			var ID = 1052358;//未知套服9
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(ID)).copy(); // 生成一个Equip类
			var type = ii.getInventoryType(ID); //获得装备的类形
			toDrop.setStr(8);
			toDrop.setDex(8);
			toDrop.setInt(8);
			toDrop.setLuk(8);
			toDrop.setHp(3000);						
			cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
			cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
			cm.getChar().saveToDB(true,true);
      			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null,net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"[公告]" + " : " + "[" + cm.getPlayer().getName() + "]成功兑换+3000HP的套服(女)!,大家恭喜他!",true).getBytes());
      			cm.dispose();
			}

}
}
}
}
