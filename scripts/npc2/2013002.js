/*
 天空女神奖励npc
 */
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        cm.sendYesNo("你们出色的完成了天空的试炼任务，那么现在。可以颁发奖励给你们了。\r\n#r是否领取奖励？");
    } else if (status == 1) {
if (cm.haveItem(4031329, 1)) {
            cm.gainItem(4001325, +1);
        }
        var rand = 1 + Math.floor(Math.random() * 30);
        //清除物品

        cm.removeAll(4001050);
        cm.removeAll(4001051);
        cm.removeAll(4001052);
        cm.removeAll(4001044);
        cm.removeAll(4001045);
        cm.removeAll(4001046);
        cm.removeAll(4001047);
        cm.removeAll(4001048);
        cm.removeAll(4001049);
        cm.removeAll(4001063);
        cm.removeAll(4031309);
        cm.removeAll(4001053);
        cm.removeAll(4001054);
        cm.removeAll(4001056);
        //随机开始 - 获得法老王的宝石 4001325  4031329
        cm.removeAll(4001056);
        
        switch (rand) {
            case 1:
                cm.gainItem(2049100, +2);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 2:
                cm.gainItem(2340000, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 3:
                cm.gainItem(2040622, +1);//裤裙体力卷轴10%
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 4:
                cm.gainItem(2040708, +1);//鞋子速度卷轴10%
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 5:
                cm.gainItem(2040804, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 6:
                cm.gainItem(2040902, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 7: //开始椅子类
                cm.gainItem(3010029, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 8:
                cm.gainItem(3010030, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 9:
                cm.gainItem(3010031, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 10:
                cm.gainItem(3010032, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 11:
                cm.gainItem(3010033, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
                default:
                cm.gainItem(2000005, +5);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[组队任务 - 天空之城]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了【天空之城 - 女神组队任务】！获得了奖励！", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
        }


  
    } else {
        cm.sendOk("你看你，紧张得都没准备好。");
        cm.dispose();
    }
}
