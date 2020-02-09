
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
var 物攻神器 = 1702118;
var 魔攻神器 = 1702119;
var 蓝色蜗牛壳 = 4000000;
var 时间之石 = 4021010;
var 猪头 = 4000017;
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
            var txt1 = " #L1#" + 正方箭头 + " #b戒指兑换#l #L2#" + 正方箭头 + " #b武器兑换#l  #L3#" + 正方箭头 + " #b血衣兑换#l\r\n\r\n";
            var txt2 = " #L4#" + 正方箭头 + " #b血鞋兑换#l #L5#" + 正方箭头 + " #b项链兑换#l  #L6#" + 正方箭头 + " #b腰带兑换#l\r\n\r\n";
            var txt3 = "#L7#" + 正方箭头 + " #b面具兑换#l #L8#" + 正方箭头 + " #b租赁兑换#l";
            cm.sendSimple("#r》》》》》穿着这样的装备也能活下来 真是神奇《《《《《#l\r\n" + txt1 + "" + txt2 + " " + txt3 + " ");
        } else if (status == 1) {
            if (selection == 1) {
            cm.openNpc(9310059, 20);
            } else if (selection == 2) {
            cm.openNpc(9310059, 21);
            } else if (selection == 3) {
            cm.openNpc(9310059, 22);
            } else if (selection == 4) {
            cm.openNpc(9310059, 23);
            } else if (selection == 5) {
            cm.openNpc(9310059, 24);
            } else if (selection == 6) {
            cm.openNpc(9310059, 25);
            } else if (selection == 7) {
            cm.openNpc(9310059, 26);
            } else if (selection == 8) {
            cm.openNpc(9310059, 27);
            }
        }
    }
}
