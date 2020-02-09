/*
 * 
 * @枫之梦
 * 藏宝图活动
 * 地图ID：677000012
 * 怪物为 3220000 简单模式
 * 
 */
var 黑水晶 = 4021008;
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 美化new ="#fUI/UIWindow/Quest/icon5/1#";
var 感叹号 ="#fUI/UIWindow/Quest/icon0#";
var 正方箭头 ="#fUI/Basic/BtHide3/mouseOver/0#";
var 忠告 = "#k温馨提示：任何非法程序和外挂封号处理.封杀侥幸心理.";
var 普通 ="#i3994116#"
var 困难 ="#i3994117#"
var 藏宝城门票 = 5252001;
function start() {
    status = -1;

    action(1, 0, 0);
}

function action(mode, type, selection) {
    var 黑水晶 = 4021008;
    var 时间之石 = 4021010;
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("恩。。。");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var txt1 = "#L0#"+普通+"#d我要进入#b藏宝城#r<单人即可进入\#b推荐50级去挑战#r>#d#l";
            var txt2 = "#L1#"+困难+"我要进入#b藏宝城#r<需要组队最低2名玩家>#k"
            cm.sendSimple("#b藏宝城拥有#r丰富的宝藏#b。但是里面也充满了#r邪恶凶猛的怪物#b。你是否愿意挑战一下是否有能力#r获得宝藏#b呢？\r\n\r\n"+txt1+"\r\n\r\n"+txt2+"")
        } else if (status == 1) {
            if (selection == 0) {
               if (cm.haveItem(藏宝城门票,1)){
                  cm.openNpc(9310059,10);
               }else{
                   cm.sendOk("你没有藏宝城活动门票，无法进入藏宝城！");
                   cm.dispose();
               }
            } else if (selection == 1) {
                if (cm.haveItem(藏宝城门票,1)){
                  cm.openNpc(9310059,11);
               }else{
                   cm.sendOk("你没有藏宝城活动门票，无法进入藏宝城！");
                   cm.dispose();
               }
            } else if (selection == 2) {
                if (cm.getChar().getNX() >= 100) {
                    cm.gainNX(-100);
                    cm.openNpc(9310022, 1);
                } else {
                    cm.sendOk("讨好#b金猪#k需要#r100点卷#k。我的点卷不足。", 2);
                    cm.dispose();
                }
            } else if (selection == 3) { //合成物品
                cm.openNpc(9310059, 1);
            } else if (selection == 4) { //打开钓鱼场npc 9330045
                cm.openNpc(9330045, 0);
            } else if (selection == 5) {//兑换点卷
                cm.openNpc(9330078, 0);
            } else if (selection == 6) {
                cm.warp(809030000);
                cm.dispose();



            } else if (selection == 7) {
                cm.sendOk("#e我擦。叫你不要给了。你还要给。");
                cm.dispose();
            } else if (selection == 8) {
                    cm.openNpc(9310022,2);
            }
        }
    }
}


