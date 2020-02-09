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
            var txt1 = "#L1#" + 蓝色箭头 + "领取10级奖励#r#v1002723# #v5200000##l\r\n\r\n";
            var txt2 = "#L2#" + 蓝色箭头 + "#d领取30级奖励#v1142000# #v5190001# \r\n\r\n";
            var txt3 = "#L3##b" + 蓝色箭头 + "领取60级奖励#v 5150040# #v5532000# #v5160000# "+美化new+"\r\n\r\n";
            var txt4 = "#L6##r" + 蓝色箭头 + "#r领取120级奖励 #v1142074# #v5520000# #v2022678# #v5010005# "+美化new+"\r\n\r\n";
            var txt5 = "#L5##r" + 蓝色箭头 + "查看等级排行" + 美化new + ""
            var txt6 = "#L4##g" + 蓝色箭头 + "追梦新手帮助" + 美化new + "\r\n\r\n"
            cm.sendSimple("小伙伴奖励领取系统.\r\n\r\n" + txt1 + "" + txt2 + "" + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "");

        } else if (status == 1) {
            if (selection == 1) { //10级
                if (cm.getChar().getPresent() == 0 && cm.getPlayer().getLevel() >= 10) {
                    cm.gainItem(1002723, 1);
                    cm.getChar().setPresent(1);
                    cm.gainMeso(+100000);
                    cm.getChar().saveToDB(true,true);
                    cm.sendOk("恭喜你获得了小伙伴奖励 LV 10！\r\n#v1002723# #r冒险币 10万！");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + " 获得了小伙伴招募LV10奖励！！", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("领取失败！请确保你的等级达到条件，或者已经领取过了！");
			cm.Lunpan();
			cm.gainNX(+88888);
                    cm.dispose();
                }
            } else if (selection == 2) { //30
                if (cm.getChar().getPresent() == 1 && cm.getPlayer().getLevel() >= 30) {
                    cm.gainItem(5190001, 1);
                    cm.gainItem(1142000,1);
                    cm.getChar().setPresent(2);
                    cm.getChar().saveToDB(true,true);
                    cm.sendOk("恭喜你获得了小伙伴奖励 LV 30！\r\n#v5190001# #v1142000#");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + " 获得了小伙伴招募LV30奖励！！", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("领取失败！请确保你的等级达到条件，或者已经领取过了！");
                    cm.dispose();
                }
            } else if (selection == 3) {//60 5150040
                 if (cm.getChar().getPresent() == 2 && cm.getPlayer().getLevel() >= 30) {
                    cm.gainItem(5150040, 1);
                    cm.gainItem(5532000,2);
                    cm.gainItem(5160000,1);
                    cm.getChar().setPresent(3);
                    cm.settuiguang2(+10);
                    cm.getChar().saveToDB(true,true);
                    cm.sendOk("恭喜你获得了小伙伴奖励 LV 60！\r\n#v5150040# #v5532000# x2 #v5160000#\r\n#r招募你的小伙伴获得了1000点券！");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + " 获得了小伙伴招募LV60奖励！！", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("领取失败！请确保你的等级达到条件，或者已经领取过了！");
                    cm.dispose();
                }
            } else if (selection == 4) { //蜗牛新手帮助
                 cm.settuiguang2(+10);
                cm.sendOk(""+圆形+" 追梦新手帮助\r\n"+蓝色箭头+"全程奖励为丰厚奖励！谢谢支持追梦冒险岛！\r\n\r\n"+红色箭头+"任何私聊充值的都是骗子！禁止非担保私下交易！发现一律删除账号处理！", 2)
                cm.dispose();
            } else if (selection == 5) { //进入自由市场
                cm.displayLevelRanks();
                cm.dispose();
            } else if (selection == 6) { //装备分解系统
                 if (cm.getChar().getPresent() == 3 && cm.getPlayer().getLevel() >= 120) {
                    cm.gainItem(1142074, 1);
                    cm.gainItem(5520000,1);
                    cm.gainItem(2022678,1);
                    cm.gainItem(5010005,1);
                    cm.getChar().setPresent(4);
                    cm.settuiguang2(+10);
                    cm.getChar().saveToDB(true,true);
                    cm.sendOk("恭喜你获得了小伙伴奖励 LV 120！\r\n #v1142074# #v5520000# #v2022678# #v5010005#\r\n#r招募你的小伙伴获得了1000点券！");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + " 获得了小伙伴招募LV60奖励！！", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("领取失败！请确保你的等级达到条件，或者已经领取过了！");
                    cm.dispose();
                }
            } else if (selection == 7) { //快速专职
                cm.openNpc(9900002, 0);
            } else if (selection == 8) { //学习锻造技能
                cm.openNpc(9310059, 0);
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
                cm.openNpc(9900004, 11); //大姐大
            } else if (selection == 11) { //积分换点卷
                cm.openNpc(9900004, 1);//
            } else if (selection == 12) { //活跃度系统
                cm.openNpc(9100106, 0); //日本高级快乐百宝箱
            } else if (selection == 13) { //待添加
                cm.openNpc(9000018, 0); //待添加
            }
        }
    }
}
