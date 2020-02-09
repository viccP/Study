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
var 第一关无条件获得 = " #v4001129# ";
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
            if (cm.getBossLog('mod') >= 2) {
                cm.sendOk("你的每日挑战次数已经完了。每日只可以挑战#r2次#k。你已经挑战过了~");
                cm.dispose();
            } else {
                var 怪物数量随机 = 1 + Math.floor(Math.random() * 9);
                var 怪物随机 = 1 + Math.floor(Math.random() * 22); //
                //***********************开始随机怪物数量*********************//
                if (怪物随机 == 1) {
                    var 怪物数量 = "100";
                }
                else if (怪物数量随机 == 2) {
                    var 怪物数量 = "1000";
                }
                else if (怪物数量随机 == 3) {
                    var 怪物数量 = "200";
                }
                else if (怪物数量随机 == 4) {
                    var 怪物数量 = "300";
                }
                else if (怪物数量随机 == 5) {
                    var 怪物数量 = "10";
                }
                else if (怪物数量随机 == 6) {
                    var 怪物数量 = "600";
                }
                else if (怪物数量随机 == 7) {
                    var 怪物数量 = "500";
                }
                else if (怪物数量随机 == 8) {
                    var 怪物数量 = "99";
                }
                else if (怪物数量随机 == 9) {
                    var 怪物数量 = "150";
                } else {
                    var 怪物数量 = "400";
                }
                //*************怪物数量随机结束***********//
                if (怪物随机 == 1) {
                    var 怪物ID = "130101"; //红蜗牛
                }
                else if (怪物随机 == 2) {
                    var 怪物ID = "1210100";//猪猪
                }
                else if (怪物随机 == 3) {
                    var 怪物ID = "130100";//木妖
                }
                else if (怪物随机 == 4) {
                    var 怪物ID = "2130100";//黑斧木妖
                }
                else if (怪物随机 == 5) {
                    var 怪物ID = "2230100";//火独眼兽
                }
                else if (怪物随机 == 7) {
                    var 怪物ID = "2230109";//蓝泡泡翻车鱼
                }
                else if (怪物随机 == 8) {
                    var 怪物ID = "3210201";//幼黄独角狮
                }
                else if (怪物随机 == 9) {
                    var 怪物ID = "4230102";//大幽灵
                }
                else if (怪物随机 == 10) {
                    var 怪物ID = "4230103";//铁甲猪
                }
                else if (怪物随机 == 11) {
                    var 怪物ID = "7130300";//死灵王
                }
                else if (怪物随机 == 12) {
                    var 怪物ID = "8140000";//白狼人
                }
                else if (怪物随机 == 13) {
                    var 怪物ID = "8150300";//红飞龙
                }
                else if (怪物随机 == 14) {
                    var 怪物ID = "8150301";//蓝飞龙
                     }
                else if (怪物随机 == 15) {
                    var 怪物ID = "8150302";//黑飞龙
                     }
                else if (怪物随机 == 16) {
                    var 怪物ID = "8160000";//时间门神
                       }
                else if (怪物随机 == 17) {
                    var 怪物ID = "8190003";//骨龙
                       }
                else if (怪物随机 == 18) {
                    var 怪物ID = "8190004";//老骨龙
                       }
                else if (怪物随机 == 19) {
                    var 怪物ID = "5130107";//僵尸
                       }
                else if (怪物随机 == 20) {
                    var 怪物ID = "5130108";//矿山僵尸
                       }
                else if (怪物随机 == 21) {
                    var 怪物ID = "5140000";//白狼
                } else {
                    var 怪物ID = "5130108";
                }
                cm.sendOk("" + 任务描述 + "\r\n需要消灭的怪物为：#b#o" + 怪物ID + "##k。怪物数量:#r" + 怪物数量 + "#k\r\n\r\n" + 无条件获得 + "\r\n" + 第一关无条件获得 + "#fUI/UIWindow.img/QuestIcon/8/0# #fUI/UIWindow.img/QuestIcon/7/0##l");
                cm.setBossLog('mod');//任务+1
               cm.getPlayer().setmodid(""+怪物ID+"");
                cm.getPlayer().setmodsl(""+怪物数量+"");
                cm.dispose();
            }
        }
    }
}