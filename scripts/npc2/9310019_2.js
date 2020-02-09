/**
 * @author 段段
 * 第五个分身
 * 六翼天使武器制作
 **/
importPackage(net.sf.cherry.client);
var 时间之石 = 4001325;
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(4004000, 1,"力量母矿"),
        Array(4004001, 1,"智慧母矿"),
        Array(4004002, 1,"敏捷母矿"),
        Array(4004003, 1,"幸运母矿"),
        Array(4004004, 1,"黑暗水晶母矿"),
        Array(1032040, 10, "枫叶耳环"),
        Array(1032035, 30, "无属性枫叶耳环"),
        Array(1032041, 40, "30级枫叶耳环"),
        Array(1032042, 50, "70级枫叶耳环"),
        Array(1122019, 120, "冒险之心"),
        Array(1122018, 120, "温暖的围脖"),
        Array(1082232, 120, "女神的手镯"),
        Array(1002677, 120,"玩具匠人帽"),
        Array(1002571, 200, "海盗船长帽"),
        Array(1112421, 200, "灵感灯戒指"),
        Array(2340000, 300, "祝福卷轴")
        //如需其它道具兑换，请按照此格式自行添置。
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
            if (cm.getLevel < 2) {
                cm.sendOK("你的等级不足3级。。打开干嘛？", 2);
                cm.dispose();
            } else {
                StringS = "#e#b兑换物品需要#v4001325#。请选择你想兑换的物品：";
                for (var i = 0; i < ItemId.length; i++) {
                    StringS += "\r\n#L" + i + "##b#z" + ItemId[i][0] + "##k (需要#r " + ItemId[i][1] + " 宝石.)";
                }
                cm.sendSimple(StringS);
                zones == 0;
            }
        } else if (status == 1) {
            if (zones == 1) {
                cm.sendNext("你让我帮你做什么呢？", 2);
                zones = 2;
            } else if (zones == 0) {
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull())
                {
                    cm.sendOk("您至少应该让装备栏空出一格");
                    cm.dispose();
                }else if (cm.getPlayer().getItemQuantity(4001325, false) >= ItemId[selection][1]) {
                        cm.gainItem(ItemId[selection][0], 1);
                        cm.gainItem(4001325, -(ItemId[selection][1]));
                        cm.sendOk("兑换成功，请检背包!");
                        cm.dispose();
                    } else {
                        cm.sendOk("您没有足够的#v4001325#用于兑换");
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