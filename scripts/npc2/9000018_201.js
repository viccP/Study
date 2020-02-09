/*
 * @WNMS国庆纪念币购物 
 * @聊天名片物品
 */
//---------变量区-------
var 红色箭头 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2# ";

importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
//4000425
var ItemId = Array(
        //物品1         物品2    货币    数量
        Array(1112263, 1112151, 4000463, 50, "草莓蛋糕聊天"),
        Array(1112262, 1112150, 4000463, 50, "天使降临聊天"),
        Array(1112273, 1112161, 4000463, 50, "兑换小黄鸭聊天"),
        Array(1112276, 1112164, 4000463, 80, "夏日甜心聊天"),
        Array(1112268, 1112156, 4000463, 30, "绿光森林聊天"),
        Array(1112267, 1112155, 4000463, 50, "西瓜物语聊天"),
        Array(1112264, 1112152, 4000463, 50, "非洲之星聊天"),
        Array(1112265, 1112153, 4000463, 30, "压岁钱聊天")
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
            sl = cm.getPlayer().getItemQuantity(4000463, false);
            StringS = "#b#n角色剩余:#v4000463# x " + sl + " 枚!(以下戒指为聊天+名片一对)\r\n";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##b" + 红色箭头 + "#v" + ItemId[i][0] + "##z" + ItemId[i][0] + "##k = #r#z " + ItemId[i][2] + " ##kX" + ItemId[i][3] + "个";
            }
            cm.sendSimple(StringS,2);
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
                } else if (cm.haveItem(ItemId[selection][2], ItemId[selection][3])) {
                    cm.gainItem(ItemId[selection][0], 1);
                    cm.gainItem(ItemId[selection][1], 1);
                    cm.gainItem((ItemId[selection][2]), -(ItemId[selection][3]));
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