/*
 * 
 * @枫之梦 组队任务召集NPC
 * @冒险币可刷喇叭。
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

            cm.sendOk("需要征集队伍吗？你可以找我！");
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
            cm.sendSimple("你是否还在寻找一个可以和你共同完成#b组队任务#k的队伍?使用我的功能，可以为你发一次#d征求组队的喇叭#k！\r\n\r\n#L1##k废弃都市征集喇叭<5000冒险币>#l#r\r\n\r\n#L3##b玩具城征集喇叭<30000冒险币>#l\r\n\r\n#L4##r#d天空女神塔征集喇叭<50000冒险币>\r\n\r\n#L5##d绯红征集喇叭<100000冒险币>")
        } else if (status == 1) {
            if (selection == 0) {
                cm.dispose();
            } else if (selection == 1) { //废弃征集喇叭
                if (cm.getMeso() >= 5000){
                cm.gainMeso(-5000);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "[征集令]" + " : " + "需要勇士一起完成[废弃都市组队任务]。目测在 " + cm.getC().getChannel() + "频道", true).getBytes());
                cm.dispose();
                }else{
                    cm.sendOk("你的冒险币不足5000。无法发送征集令");
                    cm.dispose();
                }
            } else if (selection == 2) {
                cm.dispose();
            } else if (selection == 3) { //玩具城
                if (cm.getMeso() >= 30000){
                cm.gainMeso(-30000);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "[征集令]" + " : " + "需要勇士一起完成[玩具城组队任务]。目测在 " + cm.getC().getChannel() + "频道", true).getBytes());
                cm.dispose();
                }else{
                    cm.sendOk("你的冒险币不足3万。无法发送征集令");
                    cm.dispose();
                }
            } else if (selection == 4) { //女神塔
                 if (cm.getMeso() >= 40000){
                cm.gainMeso(-40000);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "[征集令]" + " : " + "需要勇士一起完成[女神塔组队任务]。目测在 " + cm.getC().getChannel() + "频道", true).getBytes());
                cm.dispose();
                }else{
                    cm.sendOk("你的冒险币不足4万。无法发送征集令");
                    cm.dispose();
                }
            } else if (selection == 5) {//绯红
                if (cm.getMeso() >= 100000){
                cm.gainMeso(-100000);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "[征集令]" + " : " + "需要组队勇士一起挑战[绯红活动]。目测在 " + cm.getC().getChannel() + "频道", true).getBytes());
                cm.dispose();
                }else{
                    cm.sendOk("你的冒险币不足。无法发送征集令");
                    cm.dispose();
                }
            } else if (selection == 6) {
                cm.warp(809030000);
                cm.dispose();



            } else if (selection == 7) {
               
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


