
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

            cm.sendOk("感谢你的光临！");
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
                    cm.sendOk("您至少应该让装备栏空出一格");
                    cm.dispose();
				}else{
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "找我有什么事吗！\r\n"
            text += "#L1##b锁定装备#r#l\r\n\r\n";//七天
            text += "#L2##b摧毁装备#r[第一格]#l\r\n"//单手剑
          
            cm.sendSimple(text);
			}
        } else if (selection == 1) { //锁定装备
                cm.openNpc(9000009,2);
        } else if (selection == 2) {  //摧毁装备
		cm.openNpc(9000009,1);	
        } else if (selection == 3) { //地狱大公短剑 
         if(cm.haveItem(4001325,119)){
			   cm.gainItem(1012191,+1);
			   cm.gainItem(4001325,-119);
			   cm.sendOk("OK.检查背包吧！~");
			    var name = "暗影双刀头巾";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ "+name+"]！！！大家祝贺他（她）吧！",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("物品数量不足！");
			   cm.dispose();
		   }
        } else if (selection == 4) {
		 if(cm.haveItem(4001325,50)){
		   cm.sendOk("恭喜你领取了");
		   cm.gainItem(4001325,-50);
            var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1142174); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1142174)).copy(); // 生成一个Equip类
			toDrop.setWatk(10);	
			toDrop.setLocked(10);	
			toDrop.setStr(10);
			toDrop.setDex(10);
			toDrop.setInt(10);
			toDrop.setLuk(10);
			toDrop.sethp(500);		
			toDrop.setmp(500);		
			cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
			cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
			cm.getChar().saveToDB(true,true);
			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ 废弃任务-专业打手 -全属性10 500hp 500mp]！！！大家祝贺他（她）吧！",true).getBytes()); 
			cm.dispose();
	   }else{
		   cm.sendOk("物品不足");
		   cm.dispose();
	   }
        } else if (selection == 5) { //地狱大公长杖
            if(cm.haveItem(4001325,70)){
		   cm.sendOk("恭喜你领取了");
		   cm.gainItem(4001325,-70);
            var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1142175); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1142175)).copy(); // 生成一个Equip类
			toDrop.setWatk(12);	
			toDrop.setLocked(12);	
			toDrop.setStr(12);
			toDrop.setDex(12);
			toDrop.setInt(12);
			toDrop.setLuk(12);
			toDrop.sethp(800);		
			toDrop.setmp(800);		
			cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
			cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
			cm.getChar().saveToDB(true,true);
			cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ 玩具101-专业打手--（全属性+12，+800血，+800蓝）]！！！大家祝贺他（她）吧！",true).getBytes()); 
			cm.dispose();
	   }else{
		   cm.sendOk("物品不足");
		   cm.dispose();
	   }
        } else if (selection == 6) {
           if(cm.haveItem(4001325,99)){
		   cm.sendOk("恭喜你领取了");
		   cm.gainItem(4001325,-99);
            var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1142177); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1142177)).copy(); // 生成一个Equip类
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
		cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
		cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
		cm.getChar().saveToDB(true,true);
		cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[  繁华-乐于助人勋章--（全属性+15，+1000血，+1000蓝））]！！！大家祝贺他（她）吧！",true).getBytes()); 
			cm.dispose();
	   }else{
		   cm.sendOk("物品不足");
		   cm.dispose();
	   }
        } else if (selection == 7) {
         if(cm.haveItem(4001325,44)){
			   cm.gainItem(1082232,+1);
			   cm.gainItem(4001325,-44);
			   cm.sendOk("OK.检查背包吧！~");
			    var name = "女神手镯";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ "+name+"]！！！大家祝贺他（她）吧！",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("物品数量不足！");
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
			   cm.sendOk("OK.检查背包吧！~");
			    var name = "老公老婆戒指LV50";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ "+name+"]！！！大家祝贺他（她）吧！",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("物品数量不足！");
			   cm.dispose();
		   }
        } else if (selection == 9) {
            if(cm.haveItem(4001325,150)){
			   cm.gainItem(4000423,+1);
			   cm.gainItem(4001325,-50);
			   cm.gainItem(4001325,-50);
			   cm.gainItem(4001325,-50);
			   cm.sendOk("OK.检查背包吧！~");
			    var name = "礼物盒";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ "+name+"]！！！大家祝贺他（她）吧！",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("物品数量不足！");
			   cm.dispose();
		   }
        } else if (selection == 10) {
           if(cm.haveItem(4001325,150)){
			   cm.gainItem(4000424,+1);
			   cm.gainItem(4001325,-150);
			   cm.sendOk("OK.检查背包吧！~");
			    var name = "礼物盒";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ "+name+"]！！！大家祝贺他（她）吧！",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("物品数量不足！");
			   cm.dispose();
		   }
        }else if (selection == 11) {
           if(cm.haveItem(4001325,99)){
			   cm.gainItem(1112916,+1);
			   cm.gainItem(4001325,-99);
			   cm.sendOk("OK.检查背包吧！~");
			    var name = "单身戒指";
			   cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ "+name+"]！！！大家祝贺他（她）吧！",true).getBytes()); 
			
			   cm.dispose();
		   }else{
			   cm.sendOk("物品数量不足！");
			   cm.dispose();
		   }
        }
    }
}


