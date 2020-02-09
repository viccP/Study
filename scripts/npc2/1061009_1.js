/*
 NPC Name: 		Sgt. Anderson
 Map(s): 		Ludibrium PQ Maps
 Description: 		Warps you out from Ludi PQ
 */
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var 绯红次数 = cm.getBossLog('feihong');
    if (绯红次数 < 1) {
        var 绯红次数 = "#r今日免费1次#k"
    } else {
        var 绯红次数 = "使用绯红念力钥匙进入。";
    }
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.sendOk("不想去？那你点我干嘛！");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getMapId() != 91000000) {
                cm.sendYesNo("你是否愿意去挑战绯红要塞？\r\n当前你的进入状态为：#r"+绯红次数+"#k");
            }
        } else if (status == 1) {
            if (绯红次数 < 1) {
                cm.warp(803001200, 0);
                cm.setBossLog('feihong');
            } else if (cm.haveItem(5252006, 1)) {
                cm.warp(803001200, 0);
                cm.dispose();
            } else {
                cm.sendOk("你没有钥匙，无法进入！")
                cm.dispose();
            }
        }
    }
}