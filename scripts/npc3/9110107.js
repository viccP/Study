/*
 * WNMS 地狱火
 * @简单换购脚本 
 */

//---------任务1-------
var 物品1个数 = "500"; //任务1 需要的数量
var 物品1 = "1302000"; //任务1 需要的物品
var 点卷1 = "1000";    //任务1 完成的点卷
//---------任务2-------
var 物品2个数 = "500"; //任务1 需要的数量
var 物品2 = "1302000"; //任务1 需要的物品
var 点卷2 = "1000";    //任务1 完成的点卷
//---------任务3-------
var 物品3个数 = "500"; //任务1 需要的数量
var 物品3 = "1302000"; //任务1 需要的物品
var 点卷3 = "1000";    //任务1 完成的点卷

function start() {
   	cm.openNpc(9900007,666);
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) { //任务1
        if (cm.haveItem(物品1, 物品1个数) && cm.getPlayer().getBossLog("renwu1") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷1 + "点卷！");
            cm.getPlayer().setBossLog("renwu1");
            cm.gainItem(物品1, -物品1个数);
            cm.gainNX(+点卷1);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务一！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
    } else if (selection == 1) {
        if (cm.haveItem(物品2, 物品2个数) && cm.getPlayer().getBossLog("renwu2") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷2 + "点卷！");
            cm.getPlayer().setBossLog("renwu2");
            cm.gainItem(物品2, -物品2个数);
            cm.gainNX(+点卷2);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务二！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
    } else if (selection == 2) {
        if (cm.haveItem(物品3, 物品3个数) && cm.getPlayer().getBossLog("renwu3") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷3 + "点卷！");
            cm.getPlayer().setBossLog("renwu3");
            cm.gainItem(物品3, -物品3个数);
            cm.gainNX(+点卷3);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务三！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
    }
}