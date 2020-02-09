
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

var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";
importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
//4000425
var ItemId = Array(
		//需要的装备,个数,  材料,个数,  材料,个数  升级的装备
	Array(1332025, 1, 4001126,3000, 4251100,1,4250800,1,1332055,1,"枫叶装备升级"),
    Array(1332025, 1, 4001126,3000, 4251100,1,4250800,1,1332055,1,"枫叶装备升级"),
	Array(1332025, 1, 4001126,3000, 4251100,1,4250800,1,1332055,1,"枫叶装备升级")
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
			//前言
            StringS = "#b枫叶装备可以升级！只要你有需要升级的装备并且有需求的冒险币。即可以升级！#n#b";
            for (var i = 0; i < ItemId.length; i++) {
				//有多少个物品 就遍历多少个显示
                StringS += "\r\n#L" + i + "#"+正方箭头+" #b#d#z" + ItemId[i][0] + "##k升级#b#z" + ItemId[i][8] + "##k(#r#z " + ItemId[i][0] + " ##k和#b#z"+ ItemId[i][2] + "##k" + ItemId[i][3] + "个和#b#z" + ItemId[i][4] +"##k" + ItemId[i][5] + "个和#b#z" + ItemId[i][6] + "##k"+ ItemId[i][7] + "个)\r\n";
            }
			//读取变量
            cm.sendSimple(StringS);
            zones == 0;

        } else if (status == 1) {
			//下面不满足，所以不提示。
            if (zones == 1) {
                cm.sendNext("你让我帮你做什么呢？", 2);
                zones = 2;
            } else if (zones == 0) {
                if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull())
                {
                    cm.sendOk("您至少应该让装备栏空出一格");
                    cm.dispose();
                } else if (cm.haveItem(ItemId[selection][0],ItemId[selection][1]) && cm.haveItem(ItemId[selection][2],ItemId[selection][3]) &&cm.haveItem(ItemId[selection][4],ItemId[selection][5]) && cm.haveItem(ItemId[selection][6],ItemId[selection][7])) {
                    cm.gainItem(ItemId[selection][8], 1);
                    cm.gainItem((ItemId[selection][0]),-(ItemId[selection][1]));
					cm.gainItem((ItemId[selection][2]),-(ItemId[selection][3]));
					cm.gainItem((ItemId[selection][4]),-(ItemId[selection][5]));
					cm.gainItem((ItemId[selection][6]),-(ItemId[selection][7]));
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