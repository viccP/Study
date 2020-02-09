/**
 * @触发条件：开拍卖功能
 * @每日签到：领取物品 npc
 * @npcName：冒险岛运营员
 * @npcID：   9900004
 **/
importPackage(net.sf.cherry.client);
var status = 0;
var 黑水晶 = 4021008;
var 紫水晶 = 4021001;
var 时间之石 = 4021010;

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
    var 小时 = cm.getHour();
    var 分钟 = cm.getMin();
    //(cm.getHour() == 1) &&(cm.getMin() < 3)||(cm.getHour() == 20) &&(cm.getMin() < 3)
    var 绯红开放 = (小时 == 8 &&分钟 >=50)|| (小时 == 12&&分钟 >= 50)|| (小时 == 20&&分钟 >= 50);
    if (绯红开放) {
        var 挑战状态 = "#g开启中" + 感叹号 + "";
    } else {
        var 挑战状态 = "#d关闭中" + 感叹号2 + "";
    }
     var 讨伐时间 = (小时 == 21&&分钟 >= 50);
    if (讨伐时间) {
        var 讨伐状态 = "#g开启中" + 感叹号 + "#k";
    } else {
        var 讨伐状态 = "#d关闭中" + 感叹号2 + "#k";
    }
    var 绯红次数 = cm.getBossLog('feihong');
    if (绯红次数 < 1) {
        var 绯红次数 = "#r今日免费1次#k"
    } else {
        var 绯红次数 = "需要购买绯红念力钥匙";
    }
    var 扫除次数 = cm.getBossLog('saochu');
    if (扫除次数 < 2) {
        var 扫除次数 = "#r今日免费2次#k"
    } else {
        var 扫除次数 = "已挑战完毕/需要购买";
    }
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
            var 前言 = "这是一个非常严密的#b行动#k..我守护着这些#b异界的大门#k,\r\n#d到了某个时刻,这些结界就会打开.我就可以帮助你进入这些神秘的地方.\r\n#r绯红挑战时间为：" + 绯红开启时间 + "\r\n怪物扫除开放时间：" + 扫除开启时间 + "\r\n\r\n";
            var 第1 = "#L1#" + 红色箭头 + "#b绯红挑战[" + 挑战状态 + "] - [" + 绯红次数 + "]\r\n\r\n";
            var 第2 = "#L2#" + 红色箭头 + "#d怪物扫除[#g开放中" + 感叹号 + "#k] - [" + 扫除次数 + "]\r\n\r\n";
            var 第3 = "#L3#" + 红色箭头 + "#b#e魔王讨伐["+讨伐状态+"] - [#r每日限定1次#k]";
            var 第4 = "";
            var 第5 = "";
            cm.sendSimple("" + 前言 + "" + 第1 + "" + 第2 + "" + 第3 + "" + 第4 + "" + 第5 + "");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getLevel() >= 70) {
                    cm.teachSkill(15111007, 30, 30); //鲨鱼波
                    cm.sendOk("您已激活了所有技能。");
                    cm.dispose();
                } else {
                    cm.sendOk("您好！等你70级以后来找我，我能帮你激活最大技能!");
                    cm.dispose();
                }
            } else if (selection == 1) {
                if ((绯红开放) &&(cm.haveItem("" + 绯红钥匙 + "", 1))) {
                        cm.openNpc(1061009, 1);
                } else {
                    cm.sendOk("无法进入。请确保你有进入的物品#v"+绯红钥匙+"#k或者开启时间达到！")
                    cm.dispos();
                }

            } else if (selection == 2) { //怪物清扫
                cm.openNpc(9000034,3);
            } else if (selection == 3) {//魔王讨伐战
                if (小时 == 22){
                cm.openNpc(9310101,2);
                }else{
                    cm.sendOk("现在没有达到魔王讨伐的时间。")
                    cm.dispose();
                }
            } else if (selection == 4) { //豆豆衣服类
                cm.openNpc(9310101, 1);
            }
        }
    }
}
