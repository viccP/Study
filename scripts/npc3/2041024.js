
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "D片换购！怪物为 大海贼！可以掉落各种碎片！碎片在我这里可以合成！\r\n"
            text += "#L1#使用#v4031176#50个 换购#z4031179#，手续费200万冒险币#k";//七天
            text += "\r\n#L2#使用#v4031177#30个 换购#z4031179#，手续费200万冒险币#k";
            text += "\r\n#L3#使用#v4031178#10个 换购#z4031179#，手续费200万冒险币#k";
            cm.sendSimple(text);
        } else if (selection == 1) { //
            if (cm.haveItem(4031176, 50) && cm.getMeso() >= 2000000) {
                cm.gainItem(4031176, -50);
				cm.gainItem(4031179,+1);
                cm.sendOk("恭喜你领取了");
                cm.dispose();
            } else {
                cm.sendOk("你没有这个物品。");
                cm.dispose();
            }
        } else if (selection == 2) {  //地狱大公单手剑      
             if (cm.haveItem(4031177, 30) && cm.getMeso() >= 2000000) {
                cm.gainItem(4031177, -30);
				cm.gainItem(4031179,+1);
                cm.sendOk("恭喜你领取了");
                cm.dispose();
            } else {
                cm.sendOk("你没有这个物品。");
                cm.dispose();
            }
        } else if (selection == 3) { //地狱大公短剑 
            if (cm.haveItem(4031178, 10) && cm.getMeso() >= 2000000) {
                cm.gainItem(4031178, -10);
				cm.gainItem(4031179,+1);
                cm.sendOk("恭喜你领取了");
                cm.dispose();
            } else {
                cm.sendOk("你没有这个物品。");
                cm.dispose();
            }
        } else if (selection == 4) {
            if (cm.haveItem(5220007, 1)) {
                cm.gainItem(5220007, -1);
                cm.sendOk("恭喜你领取了");
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1372058); //获得装备的类形
                var toDrop = ii.randomizeStats(ii.getEquipById(1372058)).copy(); // 生成一个Equip类
                var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000 * 3); //时间
                toDrop.setExpiration(temptime);
                toDrop.setLocked(1);
                cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                cm.getChar().saveToDB(true,true);
                cm.dispose();
            } else {
                cm.sendOk("你没有这个物品。");
                cm.dispose();
            }
        } else if (selection == 5) { //地狱大公长杖
             if (cm.haveItem(5220007, 1)) {
                cm.gainItem(5220007, -1);
                cm.sendOk("恭喜你领取了");
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1382080); //获得装备的类形
                var toDrop = ii.randomizeStats(ii.getEquipById(1382080)).copy(); // 生成一个Equip类
                var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000 * 3); //时间
                toDrop.setExpiration(temptime);
                toDrop.setLocked(1);
                cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                cm.getChar().saveToDB(true,true);
                cm.dispose();
            } else {
                cm.sendOk("你没有这个物品。");
                cm.dispose();
            }
        } else if (selection == 5) {
            if ((cm.getNX() >= 202000)) {
                cm.gainNX(-202000);
                //cm.getPlayer().gainsg(-10); 
                //1002419 1122019 5030001 5071000
                cm.sendOk("恭喜你领取了#b温暖的围脖！");
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1122018); //获得装备的类形
                var toDrop = ii.randomizeStats(ii.getEquipById(1122018)).copy(); // 生成一个Equip类
                var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000 * 30); //时间
                toDrop.setExpiration(temptime);
                toDrop.setLocked(1);
                toDrop.setWatk(6);
                cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                cm.getChar().saveToDB(true,true);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "〖双倍经验〗" + " : " + " [" + cm.getPlayer().getName() + "]换取了全属性+2的双倍装备[温暖的围脖]]！！！！", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("点卷不足。请联系管理员充值！");
                cm.dispose();
            }
        } else if (selection == 6) {
            cm.sendOk("#b游戏模式为仿官方。传送都是按照官方的标准采取。想去天空之城/神木村/玩具城的玩家请去坐船。");
            cm.dispose();
        } else if (selection == 7) {
            cm.openNpc(1012103);
        } else if (selection == 8) {
            cm.openNpc(1052004);
        } else if (selection == 9) {
            var statup = new java.util.ArrayList();
            var p = cm.c.getPlayer();
            if (p.getExp() < 0) {
                p.setExp(0)
                statup.add(new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(0)));
                p.getClient().getSession().write(net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
                cm.sendOk("经验值已修复完成");
                cm.dispose();
            } else {
                cm.sendOk("您的经验值正常,无需修复!");
                cm.dispose();
            }
        }
    }
}


