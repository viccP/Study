
/*
星缘NPC
枫叶换取点卷
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
                
			cm.sendOk("我是个万能的！哈哈。");
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
			cm.sendSimple("尊敬的玩家.双倍吊坠火爆来临.佩戴即可获得#b 双倍经验 #k效果\r\n还在等什么？ 你，值得拥有！\r\n<双倍吊坠可重叠双倍卡效果>\r\n#L1##b使用#r1000个枫叶兑换300点卷#k\r\n#L3##b购买1天使用权<精灵吊坠>-消耗4000点卷#k\r\n#L4##b购买7天使用权<精灵吊坠>-消耗24500点卷#k\r\n#L5##b购买30天使用权<精灵吊坠>-消耗102000点卷#k");
			} else if (status == 1) { //使用10000枫叶换取500点卷
			if (selection == 1) {
			if (cm.haveItem(4001126, 1000)) { 
		   	cm.gainItem(4001126, -1000);
            		cm.gainNX(300);
			cm.sendOk("尊敬的玩家，你的账户已经成功增加了300点卷了！");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("尊敬的玩家，你的枫叶不足1000个啊~！");
			cm.dispose(); }
//-------------------------------激活四转技能-----------------------------
			} else if  (selection == 2) {  //一天权 24500
			if ((cm.getNX() >= 4000)) { 
			cm.gainNX(-4000);
                         var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
                         var type = ii.getInventoryType(1122017); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30 *3 *60); //时间
toDrop.setExpiration(temptime); //给装备时间
		   	cm.gainItem(1122017,1);
			cm.sendOk("恭喜你获得了精灵吊坠<一天权>");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("点卷不足~");
			cm.dispose(); }
//------------------------------高级鱼饵兑换----------------------------------
            } else if (selection == 3) {
           	   if (cm.haveItem(5350000, 1)) { 
                   cm.gainItem(5350000,-1);
                   cm.gainItem(2300001,100);
                   cm.sendOk("兑换成功！");
                   cm.dispose();
                   } else {
		   cm.sendOk("你没有高级鱼饵~"); 
		   cm.dispose(); }
//--------------------------------鱼饵兑换------------------------------------
            } else if (selection == 4) {
           	 if ((cm.getMeso() >= 3000)) { 
                   cm.gainItem(2300000,50);
		   cm.gainMeso(-3000);
                   cm.sendOk("兑换成功！");
                   cm.dispose();
                   } else {
		   cm.sendOk("冒险币不够~需要3000冒险币"); 
		   cm.dispose(); }
//-------------------------------关于钓鱼场------------------------------------
	                 } else if (selection == 5) {
                   cm.sendNextPrev("进入钓鱼场需要#b高级鱼竿#k或者#b鱼竿#k,也需要#b钓鱼场专用椅子#k,和#b鱼饵#k,这些你都可以通过我来购买.#b鱼竿#k请去点卷购物商场购买!");
                   cm.dispose();
		}}
	}
}*/
/*
                《该文件是XioxMS服务端的核心文件之一》
  目前版权 (C) 2010年   XioxMS             <100807851@qq.com>
 * -----------------------------------------------------------*
  之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
                       Matthias Butz       <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 @该服务端目前维护人员:xioxms
 @这个文件是自由形式.你可以任意内容
 @这个程序发布的目的是期望它能有用@
 @如果你需要技术支持,可以联系更新/维护人员<QQ100807851>
 @你应该已经收到一份Affero GNU通用公共授权
 -如果不是,请仔细查看http://www.gnu.org/licenses/*
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
	text += "你拥有什么极光宝盒呢？可以兑换不同的极光戒指哦。\r\n"
	text += "#L4##b使用#r#z5532000##l\r\n"; //三小时
	text += "     \r\n"
	text += "#L1##b使用#r#z5532001##k";//一天
	text += "     \r\n"
	text += "\r\n#L3##d使用#r#z5532002##k";//七天
	text += "     \r\n"
        cm.sendSimple(text,2);
    } else if (status == 1) {
           if (selection == 0) {      
	   cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 1) {  //5532001 一天权           
	  	if (cm.haveItem(5532001, 1)) { 
                   cm.gainItem(5532001,-1);
		   cm.sendOk("恭喜你领取了");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1112404); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy(); // 生成一个Equip类
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true,true);
  cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"〖极光戒指〗" + " : " + " [" + cm.getPlayer().getName() + "]获得了极光戒指<1天权>！",true).getBytes()); 
		   cm.dispose();
	   }else{
		   cm.sendOk("你没有这个物品。");
		   cm.dispose();
	   }
    }else if  (selection == 3) {
                   if (cm.haveItem(5532002, 1)) { 
                   cm.gainItem(5532002,-1);
		   cm.sendOk("恭喜你领取了");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1112404); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy(); // 生成一个Equip类
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000*7); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
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
                   if (cm.haveItem(5532000, 1)) { 
                   cm.gainItem(5532000,-1);
		   cm.sendOk("恭喜你领取了");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("尊敬的玩家，你的枫叶不足1000个啊~！");
			cm.dispose(); }
    }else if  (selection == 4) {
                   if (cm.haveItem(5532000, 1)) { 
                   cm.gainItem(5532000,-1);
		   cm.sendOk("恭喜你领取了");
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1112404); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy(); // 生成一个Equip类
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*30); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(6);
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
toDrop.setWatk(6);
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


