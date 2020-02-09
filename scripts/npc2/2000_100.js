
/*
 * 
 * 点卷换购
 */
/* 
 case 1002695://幽灵帽
 case 1002609://兔耳魔法帽
 case 1002665://西红柿帽
 case 1002985://豆箱帽子
 case 1002986://蝙蝠怪面具
 case 1002761://枫叶面具
 case 1002760://地球帽
 case 1002583://蝙蝠客头套
 case 1002543://板栗帽
 case 1002448://紫色头巾
 */
//---------变量区-------


importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
//4000425
var ItemId = Array(
        Array(1112263, 1, 4000425,1112151,"草莓蛋糕聊天"),
        Array(1112262, 1, 4000425,1112150, "天使降临聊天"),
        Array(1112273, 1, 4000425,1112161, "兑换小黄鸭聊天"),
	Array(1112276, 1, 4000425,1112164, "夏日甜心聊天")
        //如需其它道具兑换，请按照此格式自行添置。
        //代码,价格,介绍
        );

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
            StringS = "#b#n点卷商城-------账户余额:"+cm.getNX()+"\r\n兑换需要 #v4000425#  或者 #v4000424#  或者 #v4000423# 或者#v4000422#";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##b#z" + ItemId[i][0] + "##k (需要#r#z " + ItemId[i][2] + " ##kX" + ItemId[i][1] + "个(一对).)";
            }
            cm.sendSimple(StringS);
            zones == 0;

        } else if (status == 1) {
            if (zones == 1) {
                cm.sendNext("你让我帮你做什么呢？", 2);
                zones = 2;
            } else if (zones == 0) {
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull())
                {
                    cm.sendOk("您至少应该让装备栏空出一格");
                    cm.dispose();
                } else if (cm.haveItem(ItemId[selection][2],ItemId[selection][1])) {
                    cm.gainItem(ItemId[selection][0], 1);
cm.gainItem(ItemId[selection][3], 1);
                    cm.gainItem((ItemId[selection][2]),-(ItemId[selection][1]));

                    cm.sendOk("兑换成功，请检背包!");
                    cm.dispose();
                } else {
                    cm.sendOk("不足！！");
                    cm.dispose();
                }
            }
        } else if (status == 2) {
            if (zones == 2) {
                cm.sendNext("我用于提升我魔法的时间之石被一群蘑菇妖偷走了,你能帮去抢回来吗？");
                zones = 3;
            }
        } else if (status == 3) {
            if (zones == 3) {
                cm.sendNext("行,这个没问题？你告诉我那些偷了你时间之石的蘑菇妖现在在什么地方呢?", 2);
                zones = 4;
            }
        } else if (status == 4) {
            if (zones == 4) {
                cm.sendNext("这个物品是#b全世界掉落#k的。你可以在世界上的#b任何一个怪物#k上获取！");
                zones = 5;
            }
        } else if (status == 5) {
            if (zones == 5) {
                cm.sendYesNo("如果你能帮我这个大忙的话,我会给你一些丰厚的奖励的，您是否愿意帮我？");
            }
        } else if (status == 6) {
            cm.setBossLog('MogoQuest');
            cm.gainItem(5220001, 1);
            cm.sendOk("非常感谢！获得后和我说话，就能换购物品了！");
            cm.dispose();
        }
    }
}	