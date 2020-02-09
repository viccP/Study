/*
 * 
 * @WNMS
 * 每日随机任务npc
 * 消灭随机怪物
 */
importPackage(net.sf.cherry.client);
var status = 0;
var 黑水晶 = 4021008;
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 感叹号2 = "#fUI/UIWindow/Quest/icon1#";
var 奖励 = "#fUI/UIWindow/Quest/reward#";
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";
var 任务描述 = "#fUI/UIWindow/Quest/summary#"
var 忠告 = "#k温馨提示：任何非法程序和外挂封号处理.封杀侥幸心理.";
var 几率获得 = "#fUI/UIWindow/Quest/prob#";
var 无条件获得 = "#fUI/UIWindow/Quest/basic#";
var 第一关几率获得 = "#v4001038# = 1 #v4001039# = 1 #v4001040# = 1 #v4001041# = 1 #v4001042# = 1 #v4001043# = 1 ";
var 第一关无条件获得 = "#v4001136# = ??? #v4001129# = ???";
var 数二 = 200;
var 数三 = 300;
var 数四 = 500;
var 数五 = 800;
function start() {
    status = -1;
    action(1, 0, 0);
}
var qd = "#v1142000# #v2001000# #v2022448# #v2022252# #v2022484# #v2040308# #v3012003#";
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
            if (cm.haveItem(4001340, 0)) {
                if (cm.getPlayer().getmodid() == 0) {
                    var 状态 = "#L0##b" + 红色箭头 + "接受任务 - I#l"
                }
            }
            if (cm.haveItem(4001340) < 100) {
                if (cm.getPlayer().getmodid() == 2110200) {
                    var 状态 = "#L5#" + 红色箭头 + "任务进行中……"
                }
            }
            if (cm.haveItem(4001340) >= 100) {
                if (cm.getPlayer().getmodid() == 2110200) {
                    var 状态 = "#L1#" + 红色箭头 + "任务已完成 - 点击交付"
                }
            }
            if (cm.haveItem(4032491, 1)) {
                if (cm.getPlayer().getmodid() == 0) {
                    var 状态 = "#L2#" + 红色箭头 + "接受任务 - II#l";
                }
                if (cm.getPlayer().getmodid() == 210100 && cm.getPlayer().getmodsl() > 0) {
                    var 状态 = "#L5#" + 红色箭头 + "任务进行中 - II#l";
                }
                if (cm.getPlayer().getmodid() == 210100 && cm.getPlayer().getmodsl() == 0) {
                    var 状态 = "#L3#" + 红色箭头 + "任务已完成 - 点击交付"
                }
            }
            if (cm.haveItem(4032491, 2)) {
                var 状态 = "#L7#" + 正方箭头 + " 挑战地狱大公BOSS" + 感叹号 + "#l"
            }
            if (cm.getLevel() < 30) {
                var 前言 = "#b你听说了吗？#r地狱大公#b正在逐步苏醒。是否可以消灭#r地狱大公#b呢？挑战#r地狱大公#b需要完成以下的任务才可以，#r这是一个充满危险的挑战#b！\r\n";
                var 选择1 = "" + 状态 + "\r\n\r\n";
                var 选择2 = "#L4#查看地狱大公任务奖励" + 美化new + "\r\n\r\n";
                var 选择3 = "#L5##d查询任务动态#l "
                var 选择4 = "#L6##r放弃任务 - 从头开始#k\r\n"
                cm.sendSimple("" + 前言 + "" + 选择1 + "" + 选择2 + "" + 选择3 + " " + 选择4 + "");
            } else {
                cm.sendOk("你的等级已经超过了可以执行该任务的等级了。");
                cm.dispose();
            }
        } else if (status == 1) {
            //--------------------------------------------------
            if (selection == 0) { //任务1
                cm.getPlayer().setmodid(2110200); //设置指定怪物ID
                cm.sendOk("#fUI/UIWindow/Quest/summary#\r\n\r\n第一阶段，需要消灭的怪物为：#b#o2110200##k。消灭后获得指定物品 #r100#k 个 ，和我汇报！\r\n#fUI/UIWindow/Quest/basic#\r\n#b经验值#k   #b冒险币#k   ");
                cm.dispose();
            } else if (selection == 1) {  //完成任务1前置
                cm.sendOk("恭喜你完成前置任务1。获得了#b4032491# x1 。");
                cm.gainItem(4001340, -100);
                cm.getPlayer().setmodid(0);
                cm.gainItem(4032491, 1);
                cm.dispose();
                //---------------------------------------------------
            } else if (selection == 2) { //任务2
                cm.getPlayer().setmodid(210100); //设置指定怪物ID
                cm.getPlayer().setmodsl(100); //设置指定怪物ID
                cm.sendOk("#fUI/UIWindow/Quest/summary#\r\n\r\n第二阶段，需要消灭的怪物为：#b#o210100##k。消灭100只。完成后和我汇报！ ");
                cm.dispose();
            } else if (selection == 3) { //完成前置任务2
                cm.sendOk("恭喜你完成前置任务2。获得了#b4032491# x1 。");
                cm.getPlayer().setmodid(0);
                cm.gainItem(4032491, 1);
                cm.dispose();
                //----------------------------------------------------
            } else if (selection == 4) {//地狱大公奖励
                cm.sendOk("奖励如下：\r\n#b #z1302133#\r\n #z1332099#\r\n #z1372058#\r\n #z1382080#\r\n #z1382080#\r\n #z1382080#\r\n #z1382080#\r\n #z1452085#\r\n #z1462075#\r\n #z1472100#\r\n #z1482046#\r\n #z1492048# ");
                cm.dispose();
            } else if (selection == 5) {//地狱大公副本流程
                if (cm.getPlayer().getmodid() > 0) {
                    cm.sendOk("#fUI/UIWindow/Quest/summary#\r\n\r\n忘记你需要消灭的怪物了吗？\r\n怪物为#b#o" + cm.getPlayer().getmodid() + "# #k - " + cm.getPlayer().getmodsl() + "。。。。#b消灭后获取指定物品给我交付#k。。");
                    cm.dispose();
                } else {
                    cm.sendOk("查询不到你的任务进度。请确保是否为没有接受或者已经完成前置任务了！");
                    cm.dispose();
                }
            } else if (selection == 6) {//地狱大公副本流程
                if (cm.getPlayer().getmodid() > 0) {
                    cm.getPlayer().setmodid(0); //设置指定怪物ID
                    cm.getPlayer().setmodsl(0);//设置指定怪物数量读取
                    cm.sendOk("好了，你的任务已经放弃掉了。当然，你也需要从头开始才能挑战#r地狱大公#k了！");
                    cm.dispose();
                } else {
                    cm.sendOk("你起码也要接受了任务再来放弃吧？真是个奇葩。");
                    cm.dispose();
                }
            } else if (selection == 7) { //挑战地狱大公boss
                cm.removeAll(4031232);
                cm.openNpc(1012112, 1);
                
            }
        }
    }

}