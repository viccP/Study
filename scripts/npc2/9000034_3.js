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
            var txt1 = "#L1#- #b低级副本 - 打死黑蜗牛\r\n\r\n";
            var txt3 = "#L3#- #r中级副本 - 打死蜈蚣王\r\n\r\n";
            var txt4 = "#L4#- #g中级副本 - 地狱大公系列\r\n\r\n";
            var txt5 = "#L5#- #b中级副本 - 酷兽悬赏系列\r\n\r\n";
            var txt6 = "#L6#- #r终极副本 - PB挑战\r\n\r\n";
            cm.sendSimple("枫之梦活动副本~完成可以获得#b黑水晶#k~#b祝福卷#k~#b诅咒卷#k~#b装备#k~#b抵用卷#k~！\r\n\r\n" + txt1 + " " + txt3 + "" + txt4 + "" + txt5 + ""+txt6+"");

        } else if (status == 1) {
            if (selection == 1) { //打死黑蜗牛
               cm.openNpc(9000034,4);
            } else if (selection == 3) {//打死蜈蚣王
               cm.openNpc(9000034,6);
            } else if (selection == 4) { //地狱大公系列
              	cm.openNpc(9000034,7);
            } else if (selection == 5) { //酷兽悬赏系列
               cm.openNpc(9000034,8);
            } else if (selection == 6) { //装备分解系统
                cm.openNpc(9900004, 5);
            } else if (selection == 7) { //快速专职
                cm.openNpc(9900002, 0);
            } else if (selection == 8) { //学习锻造技能
              // cm.teachSkill(11110005,0,20);
              // cm.teachSkill(15111004,0,20);
		/*if(cm.haveItem(4001038,1)&&cm.getMeso() >= 100000){
                    cm.teachSkill(1007,1,1);
                    cm.teachSkill(10001007,1,1);
                    cm.teachSkill(20001007,1,1);
                    cm.gainMeso(-100000);
                    cm.gainItem(4001038,-1);
                     cm.sendOk("学习成功!");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[" + cm.getPlayer().getName() + "]" + " : " + " 学习了锻造技能！",true).getBytes()); 
                    cm.dispose();
                }else{
                    cm.sendOk("学习锻造技能需要消耗一个#v4001038#.和10万冒险币。");
                    cm.dispose();
                }*/
                cm.sendOk("近期开放，敬请期待。");
                cm.dispose();
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
