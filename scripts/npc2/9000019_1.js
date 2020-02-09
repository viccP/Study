/*
 * @商城选择npc 选择是否回到商城或者去赌博场
 * 地狱火 - WNMS
 */
var status = 0;
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("我在冒险岛商城的按钮里面哦~");
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.sendOk("我在冒险岛商城的按钮里面哦~");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getmd5data() == 0) {
                var zt = "#d使用1000点卷初级祷告<随机获取500点卷>" + 感叹号 + "";

            } else if (cm.getmd5data() == 1) {
                var zt = "#d使用8888点卷中级祷告<随机获取1000点卷>" + 感叹号 + "" + 感叹号 + "";
            } else if (cm.getmd5data() == 2) {
                var zt = "#r使用12888点卷高级祷告<随机获取3000点卷>" + 感叹号 + "" + 感叹号 + "" + 感叹号 + "";
            } else if (cm.getmd5data() == 3) {
                var zt = "#r祷告完毕。等待系统重置！";
            }

            cm.sendSimple(" #b极品装备就在这里哦！祷告了 " + cm.getmd5data() + " 次。#k\r\n\r\n\r\n#L1#" + zt + "#l#n#k\r\n\r\n#L2#购买一张刮刮乐 - 500 点卷#l\r\n\r\n#L3##d购买<擅木宝箱(消耗)> 50枫叶\r\n\r\n#L4##d购买<白银宝箱(1)> 300点卷\r\n\r\n#L5##d购买<白银宝箱(2)> 300点卷\r\n\r\n#L6##d购买#g<黄金宝箱>#d 500点卷");
        } else if (status == 1) {
            if (selection == 1) {//祷告模式
                var Dgl = cm.getmd5data();
                if (Dgl == 0) {
                    cm.Daogao1();
                } else if (Dgl == 1) {
		    cm.setmd5data(+1);
                    cm.Daogao2();
			
                } else if (Dgl == 2) {
		    cm.setmd5data(+1);
                    cm.Daogao3();
                } else if (Dgl >= 3) {
                    cm.sendOk("祷告次数已经到上限！");
                    cm.dispose();
                }
                //刮刮乐系统
            } else if (selection == 2) {
                if (cm.getNX() >= 500) {
                    cm.Guaguale();
                    cm.dispose();
                } else {
                    cm.sendOk("点卷不足");
                    cm.dispose();
                }
                //宝箱系统   擅木 50枫叶
            } else if (selection == 3) {
                if (cm.haveItem(4001126) >= 50) {
                    cm.gainItem(4001126,-50);
                    cm.轮盘药水();
                } else {
                    cm.sendOk("枫叶不足");
                    cm.dispose();
                }
            } else if (selection == 4) {
                if (cm.getNX() >= 300) {
                    cm.gainNX(-300);
                    cm.轮盘点卷1();
                } else {
                    cm.sendOk("点卷不足");
                    cm.dispose();
                }
            } else if (selection == 5) {
                if (cm.getNX() >= 300) {
                    cm.gainNX(-300);
                    cm.轮盘点卷2();
                } else {
                    cm.sendOk("点卷不足");cm.dispose();
                }
            } else if (selection == 6) {
                if (cm.getNX() >= 500) {
                    cm.gainNX(-500);
                    cm.轮盘点卷3();
                } else {
                    cm.sendOk("点卷不足");cm.dispose();
                }
            } 
        }
    }
}