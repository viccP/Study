/*
 * 
 * @枫之梦
 * 神器进阶系统 - 魔武双修
 */
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
            var txt1 = "#L1#" + 蓝色箭头 + " #b>>>>>>>>>进阶物理攻击神器<<<<<<<<<<#l\r\n\r\n";
            var txt2 = "#L2#" + 红色箭头 + " #r>>>>>>>>>进阶魔法攻击神器<<<<<<<<<<#l\r\n\r\n";
            cm.sendSimple("你想进阶哪一种神器呢？\r\n请选择：\r\n" + txt1 + "" + txt2 + "",2);
        } else if (status == 1) {
            if (selection == 1) {//装备潜力重置
                cm.openNpc(9900004, 8);
            } else if (selection == 2) { //分解材料
                cm.openNpc(9900004, 9);
            }
        }
    }
}
