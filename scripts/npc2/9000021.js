/*
 * 
 * @枫之梦
 * 佳佳npc 9000021
 * 勋章兑换系统
 */
importPackage(net.sf.cherry.client);
var status = 0;
var 黑水晶 = 4021008;
var 紫水晶 = 4021001;
var 时间之石 = 4021010;
var 奖励 = "#fUI/UIWindow/Quest/reward#";
var 任务描述 = "#fUI/UIWindow/Quest/summary#"
var 几率获得 = "#fUI/UIWindow/Quest/prob#";
var 无条件获得 = "#fUI/UIWindow/Quest/basic#";
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 感叹号2 = "#fUI/UIWindow/Quest/icon1#";
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";
var 绯红开启时间 = "#r<每日10点/13点/9点开启>#k";
var 扫除开启时间 = "#r<全日开放>#k";
var 绯红钥匙 = 5252006;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    var 绯红次数 = cm.getBossLog('feihong');
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
            if(cm.getHour() == 21){
              cm.sendOk("#e#r#b遗迹魔王#r只有在晚上#b21点#r才能召唤！\r\n预告：\r\n#n\r\n#d沉睡在毒雾森林的遗迹魔王，每日21点的结界会打开。\r\n通过我，提供魔法材料可以进入通道，召唤魔王，赢得丰厚奖励！\r\n\r\n#r魔王宝藏：\r\n#b大量经验/极品道具/商城道具/稀有卷轴/稀有武器/椅子/玩具");
              cm.dispose();
              return;
            }else{
            var 前言 = "#d打开通往召唤#r遗迹魔王#d的隧道召唤出遗迹魔王需要消耗魔法物品#b枫叶#d.所有冒险者可以捐献出#b枫叶#d来召唤#r遗迹魔王#d！\r\n\r\n#k遗迹魔王召唤进度："+cm.查询boss积分()+"/10000#n\r\n\r\n";
            if(cm.查询boss积分() < 10000){
                var 第1 = "#L1#捐赠#b枫叶#k 10:1 #r500个\r\n\r\n";
                var 第2 = "#L2##d捐赠#g黄金枫叶#k 5:1 #r500个\r\n\r\n";//4000313
                var 第3 = "#L3##r捐赠#b点卷#k 1:1 #r1000点起步";
            }else{
                var 第1 = "#L4##e打开遗迹魔王隧道\r\n\r\n";
                var 第2 = "";//4000313
                var 第3 = "";
            }
            var 第4 = "";
            var 第5 = "";
            cm.sendSimple("" + 前言 + "" + 第1 + "" + 第2 + "" + 第3 + "" + 第4 + "" + 第5 + "");
            }
        } else if (status == 1) {
            if (selection == 1) {//枫叶
                if(cm.haveItem(4001126,500)){
                    cm.更新boss积分(+50);
                    cm.gainItem(4001126,-500);
                    cm.sendOk("消耗500枫叶。\r\n进度："+cm.查询boss积分()+"/10000");
                    if(cm.查询boss积分() < 10000){
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[遗迹通道]" + " : " + "激活遗迹通道中……[进度: "+cm.查询boss积分()+"/10000]",true).getBytes()); 
                    }else{
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[遗迹通道]" + " : " + "遗迹通道打开了！！！！各位勇士可以前往挑战！！",true).getBytes()); 
                    }
                    cm.dispose();
                }else{
                    cm.sendOk("枫叶不足。无法使用！");
                    cm.dispose();
                }
            } else if (selection == 2) { 
                if(cm.haveItem(4000313,500)){
                    cm.更新boss积分(+100);
                    cm.gainItem(4000313,-500);
                    cm.sendOk("消耗成功。\r\n进度："+cm.查询boss积分()+"/10000");
                    if(cm.查询boss积分() < 10000){
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[遗迹通道]" + " : " + "激活遗迹通道中……[进度: "+cm.查询boss积分()+"/10000]",true).getBytes()); 
                    }else{
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[遗迹通道]" + " : " + "遗迹通道打开了！！！！各位勇士可以前往挑战！！",true).getBytes()); 
                    }
                    cm.dispose();
                }else{
                    cm.sendOk("不足。无法使用！");
                    cm.dispose();
                }
            } else if (selection == 3) {
                if(cm.getNX() >= 1000){
                    cm.更新boss积分(+1000);
                    cm.gainNX(-1000);
                    cm.sendOk("消耗成功。\r\n进度："+cm.查询boss积分()+"/10000");
                    if(cm.查询boss积分() < 10000){
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[遗迹通道]" + " : " + "激活遗迹通道中……[进度: "+cm.查询boss积分()+"/10000]",true).getBytes()); 
                    }else{
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[遗迹通道]" + " : " + "遗迹通道打开了！！！！各位勇士可以前往挑战！！",true).getBytes()); 
                    }
                    cm.dispose();
                }else{
                    cm.sendOk("不足。无法使用！");
                    cm.dispose();
                }
            } else if (selection == 4) { 
                if(cm.getC().getChannel() == 2){
                    cm.warp(930000700);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[遗迹魔王]" + " : " + " [" + cm.getPlayer().getName() + "]进入了遗迹魔王挑战。在" + cm.getC().getChannel() + "频道",true).getBytes()); 
                    cm.dispose();
                }else{
                    cm.sendOk("你不在2线。不是遗迹魔王专线，无法传送进入！！");
                    cm.dispose();
                }
            }
        }
    }
}
