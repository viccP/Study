/**
 * @触发条件：开拍卖功能
 * @每日签到：领取物品 npc
 * @npcName：冒险岛运营员
 * @npcID：   9900004
 **/
importPackage(net.sf.cherry.client);
var status = 0;
var 黑水晶 = 4021008;
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";
var 忠告 = "#k温馨提示：任何非法程序和外挂封号处理.封杀侥幸心理.";
function start() {
    status = -1;
    action(1, 0, 0);
}

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
            if(cm.getPlayer().getqiandao2() >= 1000){
                cm.setBossLog("lingqujiangli");
                cm.dispose();
                 return;
            }
            var txt1 = "#L1#" + 蓝色箭头 + "#b每日签到奖励#k#l";
            var txt2 = "#L2#" + 蓝色箭头 + "#d在线时间奖励\r\n\r\n";
            var txt3 = "#L10##b" + 蓝色箭头 + "充值点券领取";
            var txt4 = "#L6##d" + 蓝色箭头 + "充值礼包领取\r\n\r\n";
            var txt5 = "#L5##r" + 蓝色箭头 + "查看等级排行"
            var txt6 = "#L4##g" + 蓝色箭头 + "星级进阶系统\r\n\r\n"
            var txt7 = "#L7##g" + 蓝色箭头 + "职业转职介绍"
            var txt8 = "#L8##r" + 蓝色箭头 + "限#d时#g折#b扣#k道#r具#b购#g买"+美化new+""+感叹号+"\r\n\r\n"
            cm.sendSimple("欢迎来到#b【追梦冒险岛】#k，这里是一些快捷功能。\r\n\r\n[#r本服无快捷传送_需要跑地图_严格打击外挂_请不要秀智商#k]\r\n\r\n" + txt1 + "" + txt2 + "" + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "" + txt7 + "" + txt8 + "");

        } else if (status == 1) {
            if (selection == 1) {
            cm.openNpc(9900004, 12);
            } else if (selection == 2) { //更多功能
                if(cm.getPlayer().getqiandao2() >= 1000 && cm.getBossLog("lingqujiangli") < 1){
                   cm.sendOk("你的在线奖励重置成功！“"+cm.getPlayer().getqiandao2()+"”");
                   cm.getPlayer().setqiandao2(0);
                  // cm.setBossLog("lingqujiangli");
                   cm.dispose();
                }else{
                    cm.sendOk("今日的奖励尚未领取完或者请你明天再来。无法重置"+cm.getPlayer().getqiandao2()+"");
                    cm.disppse();
                }
            } else if (selection == 3) {//每日赏金任务
                cm.openNpc(2042002, 0);
            } else if (selection == 4) { //蜗牛新手帮助
                
// cm.sendOk("#b《追梦冒险岛新手帮助》#k\r\n\r\n" + 圆形 + "追梦冒险岛开放诸多功能。\r\n" + 圆形 + "独家服务端检测外挂功能。手动查挂加服务端自动检测。\r\n" + 圆形 + "经验倍数#b2#k。爆率#b1#k。\r\n" + 圆形 + "修复各种其他服无法修复的BUG。\r\n" + 圆形 + "#b开放【活动经验】【组队经验】【佩戴经验】【网吧经验】#k\r\n" + 圆形 + "推广系统介绍请点击背包特殊栏的小盒子#k\r\n" + 圆形 + "#r追梦冒险岛不会私下与玩家进行装备交易！请预防骗子！\r\n" + 圆形 + "#b   蜗牛冒险岛 - 有你更精彩 - #d玩家交流群:373075185", 2)
                //cm.dispose();
            } else if (selection == 5) { //进入自由市场
                cm.displayLevelRanks();
                cm.dispose();
            } else if (selection == 6) { //装备分解系统
                cm.openNpc(9900004, 5);
            } else if (selection == 7) { //快速专职
                cm.sendOk("转职介绍：\r\n 冒险家职业转职 - 官方NPC(三转需要做任务才可以转职)。\r\n战神转职 - 里恩(系统自动任务,已经简单化)\r\n\r\n#r冒险家转职为1 - 3转。4转在祭司之林(无需任务)\r\n战神转职地点里恩完成任务可以直接1-4转。");
                cm.dispose();
            } else if (selection == 8) { //学习锻造技能
                cm.openNpc(9310059,0);
            } else if (selection == 9) { //快捷商店
                if (cm.getMeso() >= 2000) {
                    cm.openShop(603);
                    cm.gainMeso(-2000);
                    cm.dispose();
                } else {
                    cm.sendOk("冒险币2000才可以打开远程商店。");
                    cm.dispose();
                }
            } else if (selection == 10) { //元神修炼npc
                cm.openNpc(9900007, 100); //大姐大
            } else if (selection == 11) { //积分换点卷
                cm.openNpc(9900004, 1);//
            } else if (selection == 12) { //活跃度系统
                cm.openNpc(9100106, 0); //日本高级快乐百宝箱
            } else if (selection == 13) { //待添加
                cm.openNpc(9000018, 0); //待添加
            }else if(selection == 99){
                cm.sendOk("#e#g锻造系统说明#k#n\r\n\r\n"+蓝色箭头+" 锻造系统在#r自由市场 - 段段#k 处可以学习。学习后等级为#r1级#k，到条件后可以继续学习。");
                cm.dispose();
            }
        }
    }
}
