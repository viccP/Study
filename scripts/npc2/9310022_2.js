/*
 * 
 *@枫之梦
 *@金猪合成系列npc
 */
function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    var 黑水晶 = 4021008;
    var 时间之石 = 4021010;
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("有材料，什么都好说。");
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

            cm.sendSimple("#b好东西，都可以合成！#k\r\n#L1#兑换#b#z1142186##k<#r字符 300个时间之石 200万冒险币>#l\r\n\r\n#L2##b合成藏宝城门票#v4001136#<完成每日赏金可以获得>#l\r\n")
        } else if (status == 1) {
            if (selection == 0) {
                 cm.dispose();
            } else if (selection == 1) {
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("您至少应该让装备栏空出一格");
        cm.dispose();
    } else {
                if (cm.haveItem(4032588,1)&&cm.haveItem(4032589,1)&&cm.haveItem(4032590,1)&&cm.haveItem(4032591,1)&&cm.haveItem(4021010,300)&&cm.getMeso()>=2000000){
                    cm.sendOk("合成成功！你成功兑换了勋章！");
                    cm.gainItem(1142186,1);
                    cm.gainItem(4032588,-1);
                    cm.gainItem(4032589,-1);
                    cm.gainItem(4032590,-1);
                    cm.gainItem(4032591,-1);
                    cm.gainItem(4021010,-300);
                    cm.gainMeso(-2000000);
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "" + " : " + "成功合成了全属性+5的[爱老虎哟]勋章！.", true).getBytes());
                    cm.dispose();
                     }else{
                    cm.sendOk("合成需要#v4032588# #v4032589# #v4032590# #v4032591# #v4021010#x300 冒险币200万。请检查是否具备以上条件！")
                    cm.dispose();
                }}
            } else if (selection == 2) {
                                     if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull()) {
        cm.sendOk("您至少应该让其他栏空出一格");
        cm.dispose();
    } else {
                if (cm.haveItem(4001136, 80)) {

                    var rand = 1 + Math.floor(Math.random() * 3);
                    if (rand == 1) {
                        cm.gainItem(4001136, -80); //裤/裙防御诅咒卷轴
                        cm.gainItem(5252001, 1);
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "" + " : " + "成功合成了一张藏宝城门票！.", true).getBytes());
                        cm.dispose();
                    }else if (rand == 2) {
                        cm.gainItem(4001136, -80); //裤/裙防御诅咒卷轴
                        cm.gainItem(5252001, 1);
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "" + " : " + "成功合成了一张藏宝城门票.", true).getBytes());
                        cm.dispose();
                    }else{
                        cm.gainItem(4001136, 15); //纪念奖
                        cm.gainItem(4001136, -80);
                        cm.sendOk("合成失败了。");
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "" + " : " + "合成藏宝图失败了！", true).getBytes());
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("残卷不足80张，无法为你合成。");
                    cm.dispose();
                }}
            } else if (selection == 3) { //合成物品
                cm.openNpc(9310059, 1);
            } else if (selection == 4) { //打开钓鱼场npc 9330045
                cm.openNpc(9330045, 0);
            } else if (selection == 5) {//兑换点卷
                cm.openNpc(9330078, 0);
            } else if (selection == 6) {
                cm.warp(809030000);
                cm.dispose();



            } else if (selection == 7) {
                cm.sendOk("#e我擦。叫你不要给了。你还要给。");
                cm.dispose();
            } else if (selection == 8) {
                if (cm.getzb() >= 10) {
                    cm.setzb(-10);
                    cm.openNpc(1012103);
                    cm.dispose();
                } else {
                    cm.sendOk("#e您的余额已不足！请及时充值！");
                    cm.dispose();



                }
            }
        }
    }
}


