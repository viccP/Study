
var status = 0;
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 物品 = "\r\n" + 红色箭头 + "#v5150040#" + 红色箭头 + "#v5151001#" + 红色箭头 + "#v5152001#" + 红色箭头 + "#v5074000#X5#e " + 蓝色箭头 + "永久活动经验" + 感叹号 + "#k\r\n\r\n----------------------------";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNextPrev("#e#d☆★★★★★★★★☆#r首冲礼包#d☆★★★★★★★★☆#n\r\n#b怎么样，充点小钱玩玩不？\r\n#r充值10元即可领取以下物品：\r\n\r\n#b活动经验加成为5%。怪物经验100以上即可获得加成！\r\n" + 物品 + "" + 圆形 + "#e总价值 6000 点卷");
        } else if (status == 1) {
            if (cm.getcz() >= 10 && cm.getPlayer().getlingqu() < 1) {
               cm.getPlayer().gainlingqu(+1);
                cm.sendOk("领取成功！获得了首冲奖励！\r\n享受#r[活动经验]#k 5% 加成。");
                cm.gainItem(2022615,-1);
                cm.gainItem(5150040,1);
                cm.gainItem(5151001,1);
                cm.gainItem(5152001,1);
                cm.gainItem(5074000,5);
                cm.getPlayer().setvip(+1);
                 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[充值礼包]" + " : " + " [" + cm.getPlayer().getName() + "]领取了充值礼包！获得了永久活动经验加成！！", true).getBytes());
                cm.dispose();
            }else{
                cm.sendOk("你的充值金额不足！或者你已经领取过一次了！");
                cm.dispose();
            }
        }
    }
}