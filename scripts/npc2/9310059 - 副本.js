
/*
 * 120永恒装备制作区
 */
//---------变量区-------


importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
//4000425
/*
 高等五彩水晶 10个 代码：4251202     
 枫叶 3W  代码：4001126
 冒险岛纪念币  500个 代码：4001129      
 闪耀冒险岛纪念币50个 代码：4001254
 高等黑暗 10个 代码：4251402    
 高等敏捷10个 代码： 4251102
 高等力量10个 代码：4250802    
 高等智慧 10个  代码 4250902 
 高等幸运10 个代码 ：4251002   
 金币：1亿
 */
var cailiao = "#e\r\n#v4251202#x10,#v4001129#x500,#v4251402#x10,#v4251102#x10,#v4250802#x10\r\n#v4251002#x10#v4001254#x50,#v4001126#x30000,1亿冒险币#n"

/*1、装备代码：永恒显圣枪（1432047），初始属性114G。
 2、装备代码：永恒冰轮杖（1382059），初始属性88G，140魔攻。
 3、装备代码：永恒蝶翼杖（1372045），初始属性82G，138魔攻
 4、装备代码：永恒破甲剑（1302081），初始属性110G。
 5、装备代码：永恒神光戟（1442063），初始属性114G。
 6、装备代码：永恒惊电弓（1452057），初始属性107G，移动速度12。
 7、装备代码：永恒冥雷弩（1462050），初始属性110G，移动速度12。
 8、装备代码：永恒大悲赋（1472068），初始属性56G，运气+8，回避+8。
 9、装备代码：永恒孔雀翎（1482023），初始属性84G。
 10、装备代码：永恒凤凰铳（1492023），初始属性84G。
 11、装备代码：永恒狂鲨锯（1332073），初始属性107G。
 12、装备代码：永恒断首刃（1332074），初始属性105G。
 13、装备代码：永恒玄冥剑（1402046），初始属性112G。*/
var ItemId = Array(
        //成品ID
        Array(1432047, "永恒显圣枪"),
        Array(1382059, "永恒冰轮杖"),
        Array(1372045, "永恒蝶翼杖"),
        Array(1302081, "永恒破甲剑"),
        Array(1442063, "永恒神光戟"),
        Array(1452057, "永恒惊电弓"),
        Array(1462050, "永恒冥雷弩"),
        Array(1472068, "永恒大悲赋"),
        Array(1482023, "永恒孔雀翎"),
        Array(1492023, "永恒凤凰铳"),
        Array(1332073, "永恒狂鲨锯"),
        Array(1332074, "永恒断首刃"),
        Array(1402046, "永恒玄冥剑")

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
            StringS = "#b#n制作永恒武器需要的材料为\r\n:" + cailiao + "";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##b制作#k【#r#z" + ItemId[i][0] + "##k】#d（道具经验可升级(属性可提升)）";
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
                } else if (cm.haveItem(4251202,10) && cm.haveItem(4001126,30000) && cm.haveItem(4001129,500) && cm.haveItem(4251402,10) && cm.haveItem( 4251102,10) && cm.haveItem(4251102,10) && cm.haveItem(4250902,10)
                        && cm.haveItem(4251002,10) && cm.haveItem(4001254,50) && cm.getMeso() >= 100000000) {
                    cm.gainItem(ItemId[selection][0], 1);
                    cm.gainItem(4251202,-10);
                    cm.gainItem(4001126,-30000);
                    cm.gainItem(4001129,-500);
                    cm.gainItem(4251402,-10);
                    cm.gainItem(4251102,-10);
                    cm.gainItem(4250802,-10);
                    cm.gainItem(4250902,-10);
                    cm.gainItem(4251002,-10);
                    cm.gainItem(4001254,-50);
                    cm.gainMeso(-100000000);
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