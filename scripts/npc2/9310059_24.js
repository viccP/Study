
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
            var txt1 = " #L1#" + 正方箭头 + " #b1张木妖邮票兑换老公老婆戒指LV1#l\r\n\r\n";
            var txt2 = " #L2#" + 正方箭头 + " #b5张木妖邮票兑换外星人之戒指#l\r\n\r\n";
            var txt3 = " #L3#" + 正方箭头 + " #b老公老婆戒指升级1-50#l\r\n\r\n";
            //var txt2 = " #L2#" + 正方箭头 + " #r金币任务#l";
            //var txt3 = " #L3#" + 正方箭头 + " #g点卷任务#l";
            cm.sendSimple("#r》》》》》穿着这样的装备也能活下来 真是神奇《《《《《#l\r\n" + txt1 + "" + txt2 + " " + txt3 + " ");
        } else if (status == 1) {
            if (selection == 1) {//装备潜力重置
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
                    cm.sendOk("您至少应该让装备栏空出1格");
                    cm.dispose();
                    return;
                }
                if (cm.haveItem(4002002, 1)) {
                    cm.gainItem(4002002, -1);
                    cm.gainItem(1112446, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[兑换系统]" + " : " + " [" + cm.getPlayer().getName() + "]兑换了[老公老婆戒指LV1]", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 2) { //分解材料
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
                    cm.sendOk("您至少应该让装备栏空出1格");
                    cm.dispose();
                    return;
                }
                if (cm.haveItem(4002002, 1)) {
                    cm.gainItem(4002002, -1);
                    cm.gainItem(1112738, 1);
                    cm.dispose();
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[兑换系统]" + " : " + " [" + cm.getPlayer().getName() + "]兑换了[外星人之戒指]", true).getBytes());
                } else {
                    cm.sendOk("材料不足。无法为你合成。");
                    cm.dispose();
                }
            } else if (selection == 3) {
                    cm.sendOk("暂未开放。");
                    cm.dispose();
            } else if (selection == 4) {
            } else if (selection == 5) {
            } else if (selection == 6) {
            } else if (selection == 7) {
            } else if (selection == 8) {
            }
        }
    }
}
