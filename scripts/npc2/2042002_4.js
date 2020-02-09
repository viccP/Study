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
                var 奖励随机低级 = 1 + Math.floor(Math.random() * 9);
                if (奖励随机低级 == 1) {
                    var 物品数量 = "100";
                }
                else if (奖励随机低级 == 2) {
                    var 物品数量 = "80";
                }
                else if (奖励随机低级 == 3) {
                    var 物品数量 = "130";
                }
                else if (奖励随机低级 == 4) {
                    var 物品数量 = "166";
                }
                else if (奖励随机低级 == 5) {
                    var 物品数量 = "78";
                }
                else if (奖励随机低级 == 6) {
                    var 物品数量 = "99";
                }
                else if (奖励随机低级 == 7) {
                    var 物品数量 = "25";
                }
                else if (奖励随机低级 == 8) {
                    var 物品数量 = "46";
                }
                else if (奖励随机低级 == 9) {
                    var 物品数量 = "72";
                } else {
                    var 物品数量 = "25";
                }
                if (奖励随机低级 == 1) {
                    var 物品数量 = "200"; //红蜗牛
                }
                else if (奖励随机低级 == 2) {
                    var 物品数量 = "300";//猪猪
                }
                else if (奖励随机低级 == 3) {
                    var 物品数量 = "150";//木妖
                }
                else if (奖励随机低级 == 4) {
                    var 物品数量 = "255";//黑斧木妖
                }
                else if (奖励随机低级 == 5) {
                    var 物品数量 = "199";//火独眼兽
                }
                else if (奖励随机低级 == 7) {
                    var 物品数量 = "163";//蓝泡泡翻车鱼
                }
                else if (奖励随机低级 == 8) {
                    var 物品数量 = "123";//幼黄独角狮
                }
                else if (奖励随机低级 == 9) {
                    var 物品数量 = "32";//大幽灵
                }
                else if (奖励随机低级 == 10) {
                    var 物品数量 = "421";//铁甲猪
                }
                else if (奖励随机低级 == 11) {
                    var 物品数量 = "233";//死灵王
                }
                else if (奖励随机低级 == 12) {
                    var 物品数量 = "112";//白狼人
                }
                else if (奖励随机低级 == 13) {
                    var 物品数量 = "111";//红飞龙
                }
                else if (奖励随机低级 == 14) {
                    var 物品数量 = "222";//蓝飞龙
                     }
                else if (奖励随机低级 == 15) {
                    var 物品数量 = "144";//黑飞龙
                     }
                else if (奖励随机低级 == 16) {
                    var 物品数量 = "115";//时间门神
                       }
                else if (奖励随机低级 == 17) {
                    var 物品数量 = "147";//骨龙
                       }
                else if (奖励随机低级 == 18) {
                    var 物品数量 = "23";//老骨龙
                       }
                else if (奖励随机低级 == 19) {
                    var 物品数量 = "1";//僵尸
                       }
                else if (奖励随机低级 == 20) {
                    var 物品数量 = "141";//矿山僵尸
                       }
                else if (奖励随机低级 == 21) {
                    var 物品数量 = "100";//白狼
                } else {
                    var 物品数量 = "130";
                }
               cm.sendOk("恭喜你获得了：#v4001129#。数量："+物品数量+"");
                 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[" + cm.getPlayer().getName() + "]" + " : " + " 获得了『冒险岛纪念币』x "+物品数量+" 个！",true).getBytes()); 
                cm.gainItem(4001129,""+物品数量+"")
                 cm.getPlayer().setmodid(0);
                cm.getPlayer().setmodsl(0);
                cm.dispose();
            }
        }
}