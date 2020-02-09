/*
 * 
 * @枫之梦
 * 神器进阶系统 - 魔武双修
 */
importPackage(net.sf.cherry.client);
var status = 0;
var 金杯 = 4000038;
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
            var txt1 = "#b#L1#圣诞六翼天使武器(单手剑)#l\r\n";
            var txt2 = "#L2#圣诞六翼天使武器(单手斧)#l\r\n";
            var txt3 = "#L3#圣诞六翼天使武器(单手钝器)#l\r\n";
            var txt4 = "#L4#圣诞六翼天使武器(双手剑)#l\r\n";
            var txt5 = "#L5#圣诞六翼天使武器(双手斧)#l\r\n";
            var txt6 = "#L6#圣诞六翼天使武器(双手钝器)#l\r\n";
            var txt7 = "#L7#圣诞六翼天使武器(枪)#l\r\n";
            var txt8 = "#L8#圣诞六翼天使武器(短杖)#l\r\n";
            var txt9 = "#L9#圣诞六翼天使武器(长杖)#l\r\n";
            var txt10 = "#L10#圣诞六翼天使武器(弓)\r\n";
            var txt11 = "#L11#圣诞六翼天使武器(弩)#l\r\n";
            var txt12 = "#L12#圣诞六翼天使武器(拳套)#l\r\n";
            var txt13 = "#L13#圣诞六翼天使武器(短剑)\r\n";
            var txt14 = "#L14#圣诞六翼天使武器(指节)\r\n";
            var txt15 = "#L15#圣诞六翼天使武器(手枪)\r\n";
            var txt16 = "#L16#六翼天使的武器<矛>\r\n";
            cm.sendSimple("使用#b六翼天使的武器#k可以兑换#v" + 金杯 + "#哦！不知道你想用那种#b武器兑换#k呢？\r\n" + txt1 + "" + txt2 + "" + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "" + txt7 + "" + txt8 + "" + txt9 + "" + txt11 + "" + txt12 + "" + txt13 + "" + txt14 + "" + txt15 + ""+txt16+"");
        } else if (status == 1) {
            if (selection == 1) {//装备潜力重置
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull()) {
                    cm.sendOk("您至少应该让栏空出1格");
                    cm.dispose();
                    return;
                }
                if (cm.haveItem(1302105, 1)) {
                    cm.gainItem(1302105, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 2) { //分解材料
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull()) {
                    cm.sendOk("您至少应该让栏空出1格");
                    cm.dispose();
                    return;
                }
                if (cm.haveItem(1312039, 1)) {
                    cm.gainItem(1312039, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 3) {
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull()) {
                    cm.sendOk("您至少应该让栏空出1格");
                    cm.dispose();
                    return;
                }
                if (cm.haveItem(1322065, 1)) {
                    cm.gainItem(1322065, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 4) {
                if (cm.haveItem(1412035, 1)) {
                    cm.gainItem(1412035, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 5) {
                if (cm.haveItem(1422039, 1)) {
                    cm.gainItem(1422039, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 6) {
                if (cm.haveItem(1432050, 1)) {
                    cm.gainItem(1432050, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 7) {
                if (cm.haveItem(1442071, 1)) {
                    cm.gainItem(1442071, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 8) {
                if (cm.haveItem(1402053, 1)) {
                    cm.gainItem(1402053, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 9) {
                if (cm.haveItem(1382062, 1)) {
                    cm.gainItem(1382062, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 10) {
                if (cm.haveItem(1452062, 1)) {
                    cm.gainItem(1452062, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 11) {
                if (cm.haveItem(1462056, 1)) {
                    cm.gainItem(1462056, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 12) {
                if (cm.haveItem(1472077, 1)) {
                    cm.gainItem(1472077, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 13) {
                if (cm.haveItem(1332081, 1)) {
                    cm.gainItem(1332081, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 14) {
                if (cm.haveItem(1482029, 1)) {
                    cm.gainItem(1482029, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 15) {
                if (cm.haveItem(1492030, 1)) {
                    cm.gainItem(1492030, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            }else if(selection == 16){
                 if (cm.haveItem(1442071, 1)) {
                    cm.gainItem(1442071, -1);
                    cm.gainItem(金杯, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了金杯", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            }
        }
    }
}
