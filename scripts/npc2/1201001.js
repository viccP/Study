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
            if (cm.getPlayer().getmodid() > 0 && cm.getPlayer().getmodsl() > 0) {
                var 状态 = "#L2##r我要接受任务！ - [" + 感叹号2 + "正在进行]#l";
            } else if (cm.getPlayer().getmodid() != 2110200 && cm.getPlayer().getmodsl() >= 0) {
                var 状态 = "#L0##r我要接受任务！ - [" + 感叹号 + "未接受]#l";
            } else if (cm.getPlayer().getmodid() == 2110200 && cm.getPlayer().getmodsl() == 0) {
                var 状态 = "#L3##r任务完成。点击交付#l";
            }
            var 前言 = "战神……需要我认可你吗……\r\n别和我废话。。是个爷们就去消灭#b200#k只#b刺蘑菇#k\r\n";
            var 选择1 = "" + 状态 + "\r\n\r\n";
            cm.sendSimple("" + 前言 + "" + 选择1 + "");
        } else if (status == 1) {
            if (selection == 0) {
                cm.getPlayer().setmodid(2110200);
                cm.getPlayer().setmodsl(200);
                cm.sendOk("" + 任务描述 + "\r\n\r\n消灭#b" + cm.getPlayer().getmodsl() + "#k只#b#o" + cm.getPlayer().getmodid() + "!\r\n\r\n" + 无条件获得 + "\r\n #e#r战神第二次转职#k#n");
                cm.dispose();
            } else if (selection == 1) { //打开兑换npc
                cm.openNpc(2042002, 3);
            } else if (selection == 2) { //查询  正在进行
                cm.sendOk("忘记要消灭的怪物了吗？\r\n你需要消灭的怪物是#b#o" + cm.getPlayer().getmodid() + "##k数量为#r" + cm.getPlayer().getmodsl() + "#k只。");
                cm.dispose();
            } else if (selection == 3) {//完成任务
                cm.changeJob(2110);
                cm.teachSkill(21100000, 0, 20); //精准矛
                cm.teachSkill(21100001, 0, 20); //三重重击
                cm.teachSkill(21100002, 0, 30); //战神突进
                cm.teachSkill(21101003, 0, 20); //抗压
                cm.teachSkill(21100004, 0, 20); //斗气爆裂
                cm.teachSkill(21100005, 0, 20); //连环吸血
                cm.getPlayer().setmodid(0);
                cm.getPlayer().setmodsl(0);
                cm.sendOk("你的实力得到了第二次的认可……");
                cm.dispose();
            } else if (selection == 4) {//放弃任务
                if (cm.getPlayer().getmodid() > 0 && cm.getPlayer().getmodsl() > 0) {
                    if (cm.getNX() >= 200) {
                        cm.sendOk("放弃成功！消耗200点卷。");
                        cm.gainNX(-200);
                        cm.getPlayer().setmodid(0);
                        cm.getPlayer().setmodsl(0);
                        cm.dispose();
                    } else {
                        cm.sendOk("对不起，你的点卷不足。");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("你没有接受任务。无法放弃！");
                    cm.dispose();
                }
            }
        }
    }
}
