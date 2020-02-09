/*
 * 
 * @枫之梦
 * @嘉年华挑战 - 变相修复
 * @npc = 2042002
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
            if(cm.getMapId() != 103000000){
                                cm.sendOk("目前只有#b废弃都市#k可以挑战怪物嘉年华。。");
                               cm.dispose(); 
                            }else{
            var 前言 = "#b枫之梦#k嘉年华火爆来袭~只要参与，即可获得#b休彼得蔓的项链#k，#b休彼得蔓的混沌项链#k，#b锻造技能#k，#b锻造材料~#k\r\n只要参与！奖励即可获得！\r\n";
            var 选择1 = "#L0##r枫之梦#k的嘉年华是什么？#l\r\n";
            var 选择2 = "#L1##r#d使用#b冒险岛纪念币#k兑换奖励#l\r\n";
            var 选择3 = "#L2##b移动到挑战预备地图#l";
            cm.sendSimple("" + 前言 + "" + 选择1 + "" + 选择2 + "" + 选择3 + "");
                            }
            // cm.getChar().gainrenwu(1);
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getLevel() < 255) { //嘉年华介绍
                    cm.sendOk("嘉年华里面充满了各种怪物~需要小组的竞技挑战。一个小组最低进入为6名玩家的队伍。进入后需要玩家消灭怪物，消灭越多，获得的奖励也越多。目前只开放#r小组个人竞技模式#k\r\n#r挑战等级限制为：31 - 70#-");
                    cm.dispose();
                }
            } else if (selection == 1) { //打开兑换npc
                    cm.openNpc(2042002,2);
            } else if (selection == 2) { //第三环
                    if(cm.getLevel() >= 30&&cm.getLevel() < 80){
                       cm.warp(980000000);
                       cm.dispose();
                }else{
                    cm.sendOk("你无法进入~因为你没有达到指定要求。\r\n等级限制：Level30 - Level70");
                    cm.dispose();
                }
                } else if (cm.getChar().getrenwu() == 5 && cm.getChar().getsgs() >= 数三) { //完成任务
                    cm.openNpc(2042002, 1); //完成任务是6
                } else if (cm.getChar().getrenwu() == 5 && cm.getChar().getsgs() < 数三) { //没完成任务
                    cm.sendOk("" + 任务描述 + " - 第三环 - \r\n#r这次我也不废话了。有人向我反映，玩具城出现的怪物 #b死灵#r 非常扰民。你现在这个任务就是消灭#b 死灵 " + 数三 + "#r个！\r\n#b完成情况：需要消灭 " + 数三 + " 只。已经消灭 " + cm.getPlayer().getsgs() + " 只。");
                    cm.dispose();
                } else {
                    cm.sendOk("怎么了。。做一名赏金猎人是非常好的，你被奖励感动了吗？");
                    cm.dispose();
                }
            } else if (selection == 3) {//第四环//你已经是个称职的悬赏猎人了！这一环的任务不能小视！#b海底世界的鲨鱼泛滥#r。请你去消灭：#b鲨鱼 或者 尖鼻鲨鱼 "+数四+"！
                if (cm.getChar().getrenwu() == 6 && cm.getChar().getsgs() < 数四) { //可以接任务
                    cm.sendOk("" + 任务描述 + " - 第四环 - \r\n#r你已经是个称职的悬赏猎人了！这一环的任务不能小视！#b海底世界的鲨鱼泛滥#r。请你去消灭：#b鲨鱼 或者 尖鼻鲨鱼 " + 数四 + "！！\r\n#r完成后向我报道！查询完成情况请输入命令 #d@赏金#r 即可查询到当前消灭怪物数量！\r\n" + 奖励 + "\r\b" + 无条件获得 + "\r\n" + 第一关无条件获得 + "#v" + 黑水晶 + "# = ??? #v2049000# = ???\r\n" + 几率获得 + "\r\n#v3010006# #v3010008# #v3010009# #v2044013# #v2044012# #v2044006# #v2043301# #v2043212# #v2043208# #v2043112# #v2041210# #v2043804# #v2043805# #v2043701#");
                    cm.getChar().gainrenwu(1); //接完任务是7
                    cm.dispose();
                } else if (cm.getChar().getrenwu() == 7 && cm.getChar().getsgs() >= 数四) { //完成任务
                    cm.openNpc(2042002, 1); //完成任务是8
                } else if (cm.getChar().getrenwu() == 7 && cm.getChar().getsgs() < 数四) { //没完成任务
                    cm.sendOk("" + 任务描述 + " - 第四环 - \r\n#r你已经是个称职的悬赏猎人了！这一环的任务不能小视！#b海底世界的鲨鱼泛滥#r。请你去消灭：#b鲨鱼 或者 尖鼻鲨鱼 " + 数四 + "！！\r\n#b完成情况：需要消灭 " + 数四 + " 只。已经消灭 " + cm.getPlayer().getsgs() + " 只。");
                    cm.dispose();
                } else {
                    cm.sendOk("怎么了。。做一名赏金猎人是非常好的，你被奖励感动了吗？");
                    //cm.getPlayer().gainrenwu(-1);
                    cm.dispose();
                }
            } else if (selection == 4) { //第五环
                if (cm.getChar().getrenwu() == 8 && cm.getChar().getsgs() < 数五) { //可以接任务
                    cm.sendOk("" + 任务描述 + " - 第五环 - \r\n#r真不简单。今日最后一环。你有把握吗？\r\n需要消灭#b老骷髅龙 或者 骷髅龙 300只！\r\n#r完成后向我报道！查询完成情况请输入命令 #d@赏金#r 即可查询到当前消灭怪物数量！\r\n" + 奖励 + "\r\b" + 无条件获得 + "\r\n" + 第一关无条件获得 + "#v" + 黑水晶 + "# = ??? #v2049000# = ???\r\n" + 几率获得 + "\r\n？？？");
                    cm.getChar().gainrenwu(1); //接完任务是9
                    cm.dispose();
                } else if (cm.getChar().getrenwu() == 9 && cm.getChar().getsgs() >= 数五) { //完成任务
                    cm.openNpc(2042002, 1); //完成任务是10
                } else if (cm.getChar().getrenwu() == 9 && cm.getChar().getsgs() < 数五) { //没完成任务
                    cm.sendOk("" + 任务描述 + " - 第五环 - \r\n#r需要消灭#b老骷髅龙 或者 骷髅龙 300只！\r\n#b完成情况：需要消灭 " + 数五 + " 只。已经消灭 " + cm.getPlayer().getsgs() + " 只。");
                    cm.dispose();
                } else {
                    cm.sendOk("怎么了。。做一名赏金猎人是非常好的，你被奖励感动了吗？");
                    //cm.getPlayer().gainrenwu(3);
                    cm.dispose();
                }
            } else if (selection == 5) { //我要领奖
                cm.sendOk("完成后点击即可领取奖励！");
                cm.dispose();
            } else if (selection == 6) { //排行榜
                cm.displayRewnu2Ranks();
                cm.dispose();
            } else if (selection == 7) { //奖励查看
                cm.sendOk("豆豆、卷轴、材料、装备、应有尽有！");
                cm.dispose();
            } else if (selection == 8) { //新手帮助
                cm.sendOk("悬赏系列新手帮助<\r\n#b枫之梦#k原创悬赏任务。\r\n那位[#r我是你某哥#k]的某某，别模仿了，反源码有意思吗。\r\n#d悬赏任务详情如下：\r\n\r\n每个环节都可以获取奖励。完成一个环节才可以进入下一环节。\r\n最终奖励丰富。完成次数越多奖励越好。还有奖励提成。\r\n\r\n                                    #b蜗牛有你更精彩。")
                cm.dispose();
            } else if (selection == 9) { //重置次数
                if (cm.getBossLog('shangjin') >= 1) {
                    cm.sendOk("无法重置。请24点后再使用此功能！")
                    cm.dispose();
                } else {
                    cm.getPlayer().setsgs(0); //重置信息
                    cm.getPlayer().setrenwu(0); //重置信息
                    cm.sendOk("重置成功！进入新的一天吧！");
                    cm.dispose();
                }
            } else if (selection == 10) { //装备租凭系统
                cm.openNpc(9000018, 0); //大姐大
            } else if (selection == 11) { //积分换点卷
                cm.openNpc(9900004, 1);//
            } else if (selection == 12) { //活跃度系统
                cm.openNpc(9100106, 0); //日本高级快乐百宝箱
            } else if (selection == 13) { //待添加
                cm.openNpc(9000018, 0); //待添加
            }
        }
    }
