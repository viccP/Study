/*
 * 
 * @type豆豆装备兑换
 * @npcID9310101_3
 * @换购为：坐骑
 */
/* 
//坐骑
 case 1902031:
 case 1902032:
 case 1902033:
 case 1902034:
 case 1902035:
 case 1902036:
 case 1902037:
 //鞍子
 case 1912024:
 case 1912025:
 case 1912026:
 case 1912027:
 case 1912028:
 case 1912029:
 case 1912030:
 */
importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(1902031, 10000, ""),
        Array(1902032, 20000, ""),
        Array(1902033, 30000, ""),
        Array(1912024, 10000, ""),
        Array(1912025, 30000, ""),
        Array(1912026, 60000, "")
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
                StringS = "豆豆装备开启兑换！只要完成副本！都有机会获得豆豆哦！\r\n#e#b目前还有#r"+cm.getPlayer().getCashDD()+"#b豆豆#k#n";
                for (var i = 0; i < ItemId.length; i++) {
                    StringS += "\r\n#L" + i + "##b#v" + ItemId[i][0] + "##k (需要#r " + ItemId[i][1] + " #k个 豆豆！)";
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
                }else if (cm.getPlayer().getCashDD() >= ItemId[selection][1]) {
                        cm.gainItem(ItemId[selection][0], 1);
                        cm.getPlayer().gainCashDD(-(ItemId[selection][1]));
                        cm.sendOk("兑换成功，请检背包!");
                        cm.dispose();
                    } else {
                        cm.sendOk("豆豆不足！");
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