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
                
   cm.sendOk("感谢使用.");
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
	text += "呵呵呵呵~~~又是一对夫妇~~~\r\n"
	text += "\r\n#L1##d购买#v1112320# 消耗1金币";//七天
	text += "     \r\n"
        cm.sendSimple(text);
    } else if (status == 1) {
           if (selection == 0) {      
	   cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 1) {  //5532001 一天权     
for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			}      
	  	if (cm.getPlayer().getvip() == 0) { 
		cm.刷新状态();
		cm.getPlayer().setvip(1);
		   cm.sendOk("恭喜你领取了");
            var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1112320); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1112320)).copy(); // 生成一个Equip类
			 toDrop.setAcc(10);
                    toDrop.setAvoid(10);
                    toDrop.setDex(10);
                    toDrop.setHands(10);
                    toDrop.setHp(1000);
                    toDrop.setInt(10);
                    toDrop.setJump(10);
                    toDrop.setLuk(10);
                    toDrop.setMatk(10);
                    toDrop.setMdef(10);
                    toDrop.setMp(1000);
                    toDrop.setSpeed(10);
                    toDrop.setStr(10);
                    toDrop.setWatk(10);
                    toDrop.setWdef(10);
                    toDrop.setLocked(1);
		cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
		cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
		cm.getChar().saveToDB(true,true);
		cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【蒋老板】" + " : " + " [" + cm.getPlayer().getName() + "]来到了婚姻殿堂！换购了结婚戒指！！！大家祝贺他（她）吧！",true).getBytes()); 
		   cm.dispose();
	   }else{
		   cm.sendOk("有了还领取个屁啊");
		   cm.dispose();
	   }
    }else if  (selection == 3) {
for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			}
                   if (cm.haveItem(5532002, 1)) { 
                   cm.gainItem(5532002,-1);
		   cm.sendOk("恭喜你领取了");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1112404); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy(); // 生成一个Equip类
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000*7); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true,true);
  cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"〖极光戒指〗" + " : " + " [" + cm.getPlayer().getName() + "]获得了极光戒指<7天权>！",true).getBytes()); 
		   cm.dispose();
	   }else{
		  cm.sendOk("你没有这个物品。");
		   cm.dispose();
	   }
    }else if  (selection == 2) {     
for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			} 
                   if (cm.haveItem(5532000, 1)) { 
                   cm.gainItem(5532000,-1);
		   cm.sendOk("恭喜你领取了");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("尊敬的玩家，你的枫叶不足1000个啊~！");
			cm.dispose(); }
    }else if  (selection == 4) {
for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			} 
                   if (cm.haveItem(5532000, 1)) { 
                   cm.gainItem(5532000,-1);
		   cm.sendOk("恭喜你领取了");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1112404); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy(); // 生成一个Equip类
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*30); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true,true);
  cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"〖极光戒指〗" + " : " + " [" + cm.getPlayer().getName() + "]换取了极光戒指3小时！",true).getBytes()); 
		   cm.dispose();
	   }else{
		   cm.sendOk("点卷不足。请联系管理员充值！");
		   cm.dispose();
	   }
    }else if  (selection == 5) {
             if ((cm.getNX() >= 202000)) { 
			cm.gainNX(-202000);
                   //cm.getPlayer().gainsg(-10); 
                   //1002419 1122019 5030001 5071000
		   cm.sendOk("恭喜你领取了#b温暖的围脖！");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122018); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1122018)).copy(); // 生成一个Equip类
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000*30); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true,true);
  cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"〖双倍经验〗" + " : " + " [" + cm.getPlayer().getName() + "]换取了全属性+2的双倍装备[温暖的围脖]]！！！！",true).getBytes()); 
		   cm.dispose();
	   }else{
		   cm.sendOk("点卷不足。请联系管理员充值！");
		   cm.dispose();
	   }
    }else if  (selection == 6) {
	  cm.sendOk("#b游戏模式为仿官方。传送都是按照官方的标准采取。想去天空之城/神木村/玩具城的玩家请去坐船。");
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
		   cm.sendOk("经验值已修复完成");
		   cm.dispose();
	   }else{
		   cm.sendOk("您的经验值正常,无需修复!");
		   cm.dispose();
	   }
    }        
}
}
}


