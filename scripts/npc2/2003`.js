var 一代不速之客耳环 = 1032080;
var 二代不速之客耳环 = 1032081;
var 三代不速之客耳环 = 1032082;
var 末代不速之客耳环 = 1032083;
var 至尊不速之客耳环 = 1032084;
var 一代不速之客项链 = 1122081;
var 二代不速之客项链 = 1122082;
var 三代不速之客项链 = 1122083;
var 末代不速之客项链 = 1122084;
var 至尊不速之客项链 = 1122085;
var 一代不速之客腰带 = 1132036;
var 二代不速之客腰带 = 1132037;
var 三代不速之客腰带 = 1132038;
var 末代不速之客腰带 = 1132039;
var 至尊不速之客腰带 = 1132040;
var 一代不速之客戒指 = 1112435;
var 二代不速之客戒指 = 1112436;
var 三代不速之客戒指 = 1112437;
var 末代不速之客戒指 = 1112438;
var 至尊不速之客戒指 = 1112439;
var 数量 = 3;

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
            for (i = 0; i < 20; i++) {
                text += "";
            }
            //text += "#b#v4031344##v4031344##v4031344##v3994081##v3994072##v3994071##v3994077##v4031344##v4031344##v4031344##k\r\n";
            text += "\t\t\t  #e欢迎来到#b天成冒险岛 #k!#n\r\n"
            text += "#L1##一代不速之客耳环x3升级二代不速之客耳环#l\r\n";
            text += "#L2##二代不速之客耳环x3升级三代不速之客耳环#l\r\n";
            text += "#L3##三代不速之客耳环x3升级末代不速之客耳环#l\r\n";
            text += "#L4##末代不速之客耳环x3升级至尊不速之客耳环#l\r\n\r\n";
			
            text += "#L5##一代不速之客项链x3升级二代不速之客项链#l\r\n";
            text += "#L6##二代不速之客项链x3升级三代不速之客项链#l\r\n";
            text += "#L7##三代不速之客项链x3升级末代不速之客项链#l\r\n";
            text += "#L8##末代不速之客项链x3升级至尊不速之客项链#l\r\n\r\n";
			
            text += "#L9##一代不速之客腰带x3升级二代不速之客腰带#l\r\n";
            text += "#L10##二代不速之客腰带x3升级三代不速之客腰带#l\r\n";
            text += "#L11##三代不速之客腰带x3升级末代不速之客腰带#l\r\n";
            text += "#L12##末代不速之客腰带x3升级至尊不速之客腰带#l\r\n\r\n";
			
            text += "#L13##一代不速之客戒指x3升级二代不速之客戒指#l\r\n";
            text += "#L14##二代不速之客戒指x3升级三代不速之客戒指#l\r\n";
            text += "#L15##三代不速之客戒指x3升级末代不速之客戒指#l\r\n";
            text += "#L16##末代不速之客戒指x3升级至尊不速之客戒指#l";
            cm.sendSimple(text);
        } else if (selection == 1) {
            if (cm.haveItem(一代不速之客耳环, 数量)) {
                cm.gainItem(一代不速之客耳环,-数量);
                cm.gainItem(二代不速之客耳环,1);
		var toDrop = new net.sf.cherry.client.Equip(二代不速之客耳环,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 一代不速之客耳环 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 2) {
            if (cm.haveItem(二代不速之客耳环, 数量)) {
                cm.gainItem(二代不速之客耳环,-数量);
                cm.gainItem(三代不速之客耳环,1);
                var toDrop = new net.sf.cherry.client.Equip(三代不速之客耳环,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 二代不速之客耳环 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 3) {
            if (cm.haveItem(三代不速之客耳环, 数量)) {
                cm.gainItem(三代不速之客耳环,-数量);
                cm.gainItem(末代不速之客耳环,1);
                var toDrop = new net.sf.cherry.client.Equip(末代不速之客耳环,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 三代不速之客耳环 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 4) {
            if (cm.haveItem(末代不速之客耳环, 数量)) {
                cm.gainItem(末代不速之客耳环,-数量);
                cm.gainItem(至尊不速之客耳环,1);
                var toDrop = new net.sf.cherry.client.Equip(至尊不速之客耳环,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 末代不速之客耳环 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 5) {
            if (cm.haveItem(一代不速之客项链, 数量)) {
                cm.gainItem(一代不速之客项链,-数量);
                cm.gainItem(二代不速之客项链,1);
                var toDrop = new net.sf.cherry.client.Equip(二代不速之客项链,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 一代不速之客项链 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 6) {
            if (cm.haveItem(二代不速之客项链, 数量)) {
                cm.gainItem(二代不速之客项链,-数量);
                cm.gainItem(三代不速之客项链,1);
                var toDrop = new net.sf.cherry.client.Equip(三代不速之客项链,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 二代不速之客项链 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 7) {
            if (cm.haveItem(三代不速之客项链, 数量)) {
                cm.gainItem(三代不速之客项链,-数量);
                cm.gainItem(末代不速之客项链,1);
                var toDrop = new net.sf.cherry.client.Equip(末代不速之客项链,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 三代不速之客项链 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 8) {
            if (cm.haveItem(末代不速之客项链, 数量)) {
                cm.gainItem(末代不速之客项链,-数量);
                cm.gainItem(至尊不速之客项链,1);
                var toDrop = new net.sf.cherry.client.Equip(至尊不速之客项链,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 末代不速之客项链 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 9) {
            if (cm.haveItem(一代不速之客腰带, 数量)) {
                cm.gainItem(一代不速之客腰带,-数量);
                cm.gainItem(二代不速之客腰带,1);
                var toDrop = new net.sf.cherry.client.Equip(二代不速之客腰带,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 一代不速之客腰带 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 10) {
            if (cm.haveItem(二代不速之客腰带, 数量)) {
                cm.gainItem(二代不速之客腰带,-数量);
                cm.gainItem(三代不速之客腰带,1);
                var toDrop = new net.sf.cherry.client.Equip(三代不速之客腰带,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 二代不速之客腰带 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 11) {
            if (cm.haveItem(三代不速之客腰带, 数量)) {
                cm.gainItem(三代不速之客腰带,-数量);
                cm.gainItem(末代不速之客腰带,1);
                var toDrop = new net.sf.cherry.client.Equip(末代不速之客腰带,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 三代不速之客腰带 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 12) {
            if (cm.haveItem(末代不速之客腰带, 数量)) {
                cm.gainItem(末代不速之客腰带,-数量);
                cm.gainItem(至尊不速之客腰带,1);
                var toDrop = new net.sf.cherry.client.Equip(至尊不速之客腰带,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 末代不速之客腰带 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 13) {
            if (cm.haveItem(一代不速之客戒指, 数量)) {
                cm.gainItem(一代不速之客戒指,-数量);
                cm.gainItem(二代不速之客戒指,1);
                var toDrop = new net.sf.cherry.client.Equip(二代不速之客戒指,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 一代不速之客戒指 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 14) {
            if (cm.haveItem(二代不速之客戒指, 数量)) {
                cm.gainItem(二代不速之客戒指,-数量);
                cm.gainItem(三代不速之客戒指,1);
                var toDrop = new net.sf.cherry.client.Equip(三代不速之客戒指,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 二代不速之客戒指 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 15) {
            if (cm.haveItem(三代不速之客戒指, 数量)) {
                cm.gainItem(三代不速之客戒指,-数量);
                cm.gainItem(末代不速之客戒指,1);
                var toDrop = new net.sf.cherry.client.Equip(末代不速之客戒指,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 三代不速之客戒指 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        } else if (selection == 16) {
            if (cm.haveItem(末代不速之客戒指, 数量)) {
                cm.gainItem(末代不速之客戒指,-数量);
                cm.gainItem(至尊不速之客戒指,1);
                var toDrop = new net.sf.cherry.client.Equip(至尊不速之客戒指,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "升级成功！",toDrop, true).getBytes());
                cm.sendOk("升级成功！");
                cm.dispsoe();
            } else {
                cm.sendOk("升级失败！材料不足！#v"+ 末代不速之客戒指 +"# 数量:"+ 数量);
                cm.dispsoe();
            }
        }
    }
}

