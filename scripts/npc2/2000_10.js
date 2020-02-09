/*兑换需要 #v4000425#  或者 #v4000424#  或者 #v4000423# 或者#v4000422#*/
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
            var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
            for(var i = 1;i<=5;i++){
                if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
                    cm.sendOk("您至少应该让所有包裹都空出一格");
                    cm.dispose();
                    return;
                }
            }
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "你想怎么样合成呢？我这里多种方法获取魔宠哦！\r\n#b魔宠抽取可以获得更好的魔宠以及各种材料。\r\n#d魔宠熔炉可以融合魔宠获取新的级别魔宠！\r\n"
            text += "#L1##b查看我的魔宠列表\r\n\r\n";
            text += "#L2##b#r使用怪物材料进行兑换魔宠\r\n\r\n"//
            text += "#L3##b#d#e魔宠抽取---------#k[#rNEW#k]\r\n\r\n"
            text += "#L4##b#d#e#r魔宠熔炉---------#k[#rNEW#k]\r\n\r\n"
            cm.sendSimple(text);

        } else if (selection == 1) { //租凭枫叶耳环
            var a = "----\r\n";
            a += cm.查询魔宠();
            cm.sendOk(a);
            cm.dispose();
        } else if (selection == 2) {  //魔宠兑换
            cm.openNpc(2000,10000);
        } else if (selection == 3) { //魔宠抽取
            cm.openNpc(2000,20000);
        } else if (selection == 4) {//魔宠熔炉
            cm.openNpc(2000,30000);
            
        } else if (selection == 5) { //地狱大公长杖
            if (cm.haveItem(4001325, 70)) {
                cm.sendOk("恭喜你领取了");
                cm.gainItem(4001325, -70);
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1142175); //获得装备的类形
                var toDrop = ii.randomizeStats(ii.getEquipById(1142175)).copy(); // 生成一个Equip类
                toDrop.setAcc(12);
                toDrop.setAvoid(12);
                toDrop.setDex(12);
                toDrop.setHands(12);
                toDrop.setHp(800);
                toDrop.setInt(12);
                toDrop.setJump(12);
                toDrop.setLuk(12);
                toDrop.setMatk(12);
                toDrop.setMdef(12);
                toDrop.setMp(800);
                toDrop.setSpeed(12);
                toDrop.setStr(12);
                toDrop.setWatk(12);
                toDrop.setWdef(12);
                toDrop.setLocked(1);
                cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                cm.getChar().saveToDB(true,true);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]购了[ 玩具101-专业打手--（全属性+12，+800血，+800蓝）]！！！大家祝贺他（她）吧！", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("物品不足");
                cm.dispose();
            }
        } else if (selection == 6) {
            if (cm.haveItem(4001325, 99)) {
                cm.sendOk("恭喜你领取了");
                cm.gainItem(4001325, -99);
                var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                var type = ii.getInventoryType(1142177); //获得装备的类形
                var toDrop = ii.randomizeStats(ii.getEquipById(1142177)).copy(); // 生成一个Equip类
                toDrop.setAcc(15);
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
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[  繁华-乐于助人勋章--（全属性+15，+1000血，+1000蓝））]！！！大家祝贺他（她）吧！", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("物品不足");
                cm.dispose();
            }
        } else if (selection == 7) {
            if (cm.haveItem(4001325, 44)) {
                cm.gainItem(1082232, +1);
                cm.gainItem(4001325, -44);
                cm.sendOk("OK.检查背包吧！~");
                var name = "女神手镯";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ " + name + "]！！！大家祝贺他（她）吧！", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("物品数量不足！");
                cm.dispose();
            }
        } else if (selection == 8) {
            if (cm.haveItem(4001325, 299)) {
                cm.gainItem(1112495, +1);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.sendOk("OK.检查背包吧！~");
                var name = "老公老婆戒指LV50";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ " + name + "]！！！大家祝贺他（她）吧！", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("物品数量不足！");
                cm.dispose();
            }
        } else if (selection == 9) {
            if (cm.haveItem(4001325, 150)) {
                cm.gainItem(4000423, +1);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.gainItem(4001325, -50);
                cm.sendOk("OK.检查背包吧！~");
                var name = "礼物盒";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ " + name + "]！！！大家祝贺他（她）吧！", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("物品数量不足！");
                cm.dispose();
            }
        } else if (selection == 10) {
            if (cm.haveItem(4001325, 150)) {
                cm.gainItem(4000424, +1);
                cm.gainItem(4001325, -150);
                cm.sendOk("OK.检查背包吧！~");
                var name = "礼物盒";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ " + name + "]！！！大家祝贺他（她）吧！", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("物品数量不足！");
                cm.dispose();
            }
        } else if (selection == 11) {
            if (cm.haveItem(4001325, 99)) {
                cm.gainItem(1112916, +1);
                cm.gainItem(4001325, -99);
                cm.sendOk("OK.检查背包吧！~");
                var name = "单身戒指";
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "【带新福利】" + " : " + " [" + cm.getPlayer().getName() + "]换购了[ " + name + "]！！！大家祝贺他（她）吧！", true).getBytes());

                cm.dispose();
            } else {
                cm.sendOk("物品数量不足！");
                cm.dispose();
            }
        }
    }
}


