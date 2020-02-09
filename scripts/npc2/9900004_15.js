
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
            var txt1 = " #L1#" + 正方箭头 + " #b挑战树王BOSS#l   #L7#" + 正方箭头 + " #b挑战扎昆BOSS#l\r\n";
            var txt2 = " #L3#" + 正方箭头 + " #b挑战蜈蚣BOSS#l   #L4#" + 正方箭头 + " #b挑战妖僧BOSS#l\r\n";
            var txt3 = "#L5#" + 正方箭头 + " #b挑战闹钟BOSS#l   #L6#" + 正方箭头 + " #b挑战鱼王BOSS#l\r\n";
            var txt4 = " #L2#" + 正方箭头 + " #b挑战暴力熊BOSS#l #L8#" + 正方箭头 + " #b挑战黑龙王BOSS#l\r\n\r\n";
            var txt5 = "#r======================================================#l\r\n";
            var txt6 = " #L9#" + 正方箭头 + " #b废弃副本#l #L10#" + 正方箭头 + " #b玩具副本#l\r\n\r\n";
            var txt7 = " #L11#" + 正方箭头 + " #b天空副本#l #L12#" + 正方箭头 + " #b海盗副本#l\r\n\r\n";
          //  var txt5 = "  	  #L4#" + 正方箭头 + "#l\r\n";
            cm.sendSimple("请选择你要去的副本：\r\n" + txt1 + "" + txt2 + " " + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "" + txt7 + "");
        } else if (status == 1) {
            if (selection == 1) {//树王
			cm.warp(541020700);
			cm.dispose();
            } else if (selection == 2) { //暴力熊
			cm.warp(551030100);
			cm.dispose();
            } else if (selection == 3) {//蜈蚣
			cm.warp(701010320);
			cm.dispose();
            } else if (selection == 4) {//藏经阁
			cm.warp(702070400);
			cm.dispose();
            } else if (selection == 5) {//闹钟
			cm.warp(220080000);
			cm.dispose();
            } else if (selection == 6) {//鱼王
			cm.warp(230040420);
			cm.dispose();
            } else if (selection == 7) {//扎昆
			cm.warp(211042300);
			cm.dispose();
            } else if (selection == 8) {//黑龙王
			cm.warp(240040700);
			cm.dispose();
            } else if (selection == 9) {//废弃
			cm.warp(103000000);
			cm.dispose();
            } else if (selection == 10) {//玩具
			cm.warp(221024500);
			cm.dispose();
            } else if (selection == 11) {//天空
			cm.warp(200080101);
			cm.dispose();
            } else if (selection == 12) {//海盗
			cm.warp(251010404);
			cm.dispose();
            }
        }
    }
}
