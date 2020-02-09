/*
 * WNMS 地狱火
 * @简单换购脚本 
 */

//---------任务1-------
var 物品1个数 = "100"; //任务1 需要的数量
var 物品1 = "4000013"; //任务1 需要的物品
var 点卷1 = "500";    //任务1 完成的点卷
//---------任务2-------
var 物品2个数 = "100"; //任务1 需要的数量
var 物品2 = "4000022"; //任务1 需要的物品
var 点卷2 = "500";    //任务1 完成的点卷
//---------任务3-------
var 物品3个数 = "100"; //任务1 需要的数量
var 物品3 = "4000178"; //任务1 需要的物品
var 点卷3 = "500";    //任务1 完成的点卷
//---------任务4-------
var 物品4个数 = "100"; //任务1 需要的数量
var 物品4 = "4000080"; //任务1 需要的物品
var 点卷4 = "500";    //任务1 完成的点卷
//---------任务5-------
var 物品5个数 = "100"; //任务1 需要的数量
var 物品5 = "4000232"; //任务1 需要的物品
var 点卷5 = "500";    //任务1 完成的点卷
//---------任务6-------
var 物品6个数 = "100"; //任务1 需要的数量
var 物品6 = "4000233"; //任务1 需要的物品
var 点卷6 = "500";    //任务1 完成的点卷
//---------任务7-------
var 物品7个数 = "100"; //任务1 需要的数量
var 物品7 = "4000262"; //任务1 需要的物品
var 点卷7 = "500";    //任务1 完成的点卷
//---------任务8-------
var 物品8个数 = "100"; //任务1 需要的数量
var 物品8 = "4000263"; //任务1 需要的物品
var 点卷8 = "500";    //任务1 完成的点卷
//---------任务9-------
var 物品9个数 = "100"; //任务1 需要的数量
var 物品9 = "4000268"; //任务1 需要的物品
var 点卷9 = "500";    //任务1 完成的点卷
//---------任务10-------
var 物品10个数 = "100"; //任务1 需要的数量
var 物品10 = "4000269"; //任务1 需要的物品
var 点卷10 = "500";    //任务1 完成的点卷

function start() {
    cm.sendSimple("#b<每日任务>\r\n每日可完成一次哦！只需要搜集足够物品即可获得点卷了呢！\r\n#L0#【任务1】 - 使用#b " + 物品1个数 + "#k个 #v" + 物品1 + "# 换购#r " + 点卷1 + "点卷.#k#l\r\n#L1#【任务2】 - 使用#b " + 物品2个数 + "#k个 #v" + 物品2 + "# 换购#r " + 点卷2 + "点卷.#l    \r\n#r#L2#【任务3】 - 使用#b " + 物品3个数 + "#k个 #v" + 物品3 + "# 换购#r " + 点卷3 + "点卷.#l\r\n#L3#【任务4】 - 使用#b " + 物品4个数 + "#k个 #v" + 物品4 + "# 换购#r " + 点卷4 + "点卷.#k#l\r\n#L4#【任务5】 - 使用#b " + 物品5个数 + "#k个 #v" + 物品5 + "# 换购#r " + 点卷5+ "点卷.#k#l\r\n#L5#【任务6】 - 使用#b " + 物品6个数 + "#k个 #v" + 物品6 + "# 换购#r " + 点卷6 + "点卷.#k#l\r\n#L6#【任务7】 - 使用#b " + 物品8个数 + "#k个 #v" + 物品7 + "# 换购#r " + 点卷7 + "点卷.#k#l\r\n#L7#【任务8】 - 使用#b " + 物品8个数 + "#k个 #v" + 物品8 + "# 换购#r " + 点卷8 + "点卷.#k#l\r\n#L8#【任务9】 - 使用#b " + 物品9个数 + "#k个 #v" + 物品9 + "# 换购#r " + 点卷9 + "点卷.#k#l\r\n#L9#【任务10】 - 使用#b " + 物品10个数 + "#k个 #v" + 物品10 + "# 换购#r " + 点卷10 + "点卷.#k#l");
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
    } else if(selection == 3){
		 if (cm.haveItem(物品4, 物品4个数) && cm.getPlayer().getBossLog("renwu4") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷4 + "点卷！");
            cm.getPlayer().setBossLog("renwu4");
            cm.gainItem(物品4, -物品4个数);
            cm.gainNX(+点卷4);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务4！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
	}else if(selection == 4){
		 if (cm.haveItem(物品5, 物品5个数) && cm.getPlayer().getBossLog("renwu5") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷5 + "点卷！");
            cm.getPlayer().setBossLog("renwu5");
            cm.gainItem(物品5, -物品5个数);
            cm.gainNX(+点卷5);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务5！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
	}else if(selection == 5){
		 if (cm.haveItem(物品6, 物品6个数) && cm.getPlayer().getBossLog("renwu6") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷6 + "点卷！");
            cm.getPlayer().setBossLog("renwu6");
            cm.gainItem(物品6, -物品6个数);
            cm.gainNX(+点卷6);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务6！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
	}else if(selection == 6){
		 if (cm.haveItem(物品7, 物品7个数) && cm.getPlayer().getBossLog("renwu7") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷7 + "点卷！");
            cm.getPlayer().setBossLog("renwu7");
            cm.gainItem(物品7, -物品7个数);
            cm.gainNX(+点卷7);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务7！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
	}else if(selection == 7){
		 if (cm.haveItem(物品8, 物品8个数) && cm.getPlayer().getBossLog("renwu8") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷8 + "点卷！");
            cm.getPlayer().setBossLog("renwu8");
            cm.gainItem(物品8, -物品8个数); //方便后期添加修改 维护
            cm.gainNX(+点卷8);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务8！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
	}else if(selection == 8){
		 if (cm.haveItem(物品9, 物品9个数) && cm.getPlayer().getBossLog("renwu9") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷9 + "点卷！");
            cm.getPlayer().setBossLog("renwu9");
            cm.gainItem(物品9, -物品9个数); //方便后期添加修改 维护
            cm.gainNX(+点卷9);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务9！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
	}else if(selection == 9){
		 if (cm.haveItem(物品10, 物品10个数) && cm.getPlayer().getBossLog("renwu10") == 0) {
            cm.sendOk("哇！！恭喜你完成任务！获得了" + 点卷10 + "点卷！");
            cm.getPlayer().setBossLog("renwu10");
            cm.gainItem(物品10, -物品10个数); //方便后期添加修改 维护
            cm.gainNX(+点卷10);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[每日任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成任务10！获得了点卷奖励！", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("你无法这样做，请确保你有足够的物品，并且完成的间隔时间过了！");
            cm.dispose();
        }
	}
}