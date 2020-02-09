/**
 * @author 段段
 * 第五个分身
 * 六翼天使武器制作
 **/
importPackage(net.sf.cherry.client);
var 时间之石 = 4021010;
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(1302105, 200, "圣诞六翼天使武器(单手剑)"),
        Array(1312039, 200, "圣诞六翼天使武器(单手斧)"),
        Array(1322065, 200, "圣诞六翼天使武器(单手钝器)"),
        Array(1402053, 200, "圣诞六翼天使武器(双手剑)"),
        Array(1412035, 400, "圣诞六翼天使武器(双手斧)"),
        Array(1422039, 300, "圣诞六翼天使武器(双手钝器)"),
        Array(1432050, 400, "圣诞六翼天使武器(枪)"),
        Array(1442071, 400, "圣诞六翼天使武器(短杖)"),
        Array(1382062, 400, "圣诞六翼天使武器(长杖)"),
        Array(1452062, 400, "圣诞六翼天使武器(弓)"),
        Array(1462056, 500, "圣诞六翼天使武器(弩)"),
        Array(1472077, 500, "圣诞六翼天使武器(拳套)"),
        Array(1332081, 400, "圣诞六翼天使武器(短剑)"),
        Array(1482029, 400, "圣诞六翼天使武器(指节)"),
        Array(1492030, 400, "圣诞六翼天使武器(手枪)")
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
                StringS = "你可以在此合成你想要的物品";
                for (var i = 0; i < ItemId.length; i++) {
                    StringS += "\r\n#L" + i + "##b#z" + ItemId[i][0] + "##k (需要#r " + ItemId[i][1] + " #k个  #d#z4021010##k)";
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
                }else if (cm.getPlayer().getItemQuantity(4021010, false) >= ItemId[selection][1]) {
                        cm.gainItem(ItemId[selection][0], 1);
                        cm.gainItem(4021010, -(ItemId[selection][1]));
                        cm.sendOk("兑换成功，请检背包!");
                        cm.dispose();
                    } else {
                        cm.sendOk("您没有足够的时间之石#v4021010#用于兑换");
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