/*
 * 
 * @幸运硬币兑换npc
 * @随机奖励豆豆坐骑
 * @WNMS 红蜗牛 * 追梦冒险岛
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var 物品图片 = "#r#e#v1902031##z1902031# \r\n#v1902032##z1902032# \r\n#v1902033##z1902033# \r\n#v1902034##z1902034# \r\n#v1902036##z1902036# \r\n#v1902035##z1902035#     ----#g绝#b版#r坐#d骑\r\n#v1902037##z1902037# ----#g绝#b版#r坐#d骑 \r\n ";
var 暗影 = "4000487";//暗影币代码
var 数量 = "20";//设置消耗数量
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("屌丝一边去。。");
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
            cm.sendSimple("#b幸运卡牌可以抽取豆豆坐骑哦！开启卡牌需要"+数量+"枚#v4000487#\r\n背包满了概不负责哦!\r\n\r\n#d#L0#投币 - 消耗 #r"+数量+"#d枚#k#l\r\n\r\n#L1##r查看豆豆坐骑图片\r\n\r\n#L2#如何获得#r#z4000487#");
        } else if (status == 1) {
            if (selection == 0) {//副本传送
                 if(cm.getPlayer().getItemQuantity(4000487, false) < 20){
                cm.sendOk("你没有暗影币。无法打开幸运轮盘");
                cm.dispose();
                return;
            }
                cm.gainItem(4000487,-数量);
		cm.暗影币豆豆();
                cm.dispose();
            } 
        }
    }
}


