/*
 * 
 * @蜗牛mxd
 * 戒指 项链合成系统
 * npc 段段 第六个分身
 * 9310059_6
 */

importPackage(net.sf.cherry.client);

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        cm.dispose();
    if (status == 0 && mode == 1) {
        var selStr = "#b戒指#k和#b项链#k属于#d饰品#k，#r拥有强大的潜在力量#k。。。\r\n我可以为你制作这些物品。#b"
        var options = new Array("" + 圆形 + "#b制#e#g作#n#d戒#r#e指#n#k", "" + 圆形 + "#e项#n#g链#e#b合#n#d成");
        for (var i = 0; i < options.length; i++) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }

        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0) { //glove refine
            var selStr = "如果你可以搜集足够的材料..打造一个戒指并不是什么难事.#b"; //戒指
            //飞天猪力量戒指 小鱼戒指  寂寞单身戒指
            var items = new Array("#z1112403##k(等级限制-70, 人气度-100，全职业)#b", "#d#z1112907##k(等级限制 : 0, 全职业)#b", "#r#z1112916##k(等级限制 : 0, 全职业)#b");
            for (var i = 0; i < items.length; i++) {
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 1) { //项链制作
            var selStr = "嗯...项链吗？我可以为你制作。#b";
            var items =
                    new Array("#z1122006##k(等级限制 : 50, 全职业)#b", //蓝色蝶形领结
                    "#z1122011##k(等级限制 : 30, 全职业)#b", //封印的永恒玉佩
                    "#z1122018##k(等级限制 : 10, 全职业)#b", //温暖的围脖
                    "#z1122058##k(等级限制 : 51, 全职业)#b", //休彼德蔓的混沌项链 
                    "#e#z1122012##k(等级限制 : 140, 全职业)#b");
            for (var i = 0; i < items.length; i++) {
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 2) { //hat upgrade
            var selStr = "嗯...你想合成什么样的帽子？#b";
            var items = new Array("孙悟空钢制头箍#k(等级限制 : 30, 魔法师)#b", "孙悟空头箍#k(等级限制 : 30, 魔法师)#b");
            for (var i = 0; i < items.length; i++) {
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 3) { //wand refine
            var selStr = "要是你能收集各种材料，我就用魔法给你做短杖。你想做什么样的短杖？#b";
            var items = new Array("木制短杖#k(等级限制 : 8, 公用)#b", "高级木制短杖#k(等级限制 : 13, 公用)#b", "金属短杖#k(等级限制 : 18, 公用)#b", "冰精短杖#k(等级限制 : 23, 魔法师)#b", "锂矿短杖#k(等级限制 : 28, 魔法师)#b", "法师短杖#k(等级限制 : 33, 魔法师)#b", "妖精短杖#k(等级限制 : 38, 魔法师)#b", "大魔法师短杖#k(等级限制 : 48, 魔法师)#b");
            for (var i = 0; i < items.length; i++) {
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 4) { //staff refine
            var selStr = "要是你能收集各种材料，我就用魔法给你做长杖。你想做什么样的长杖？#b";
            var items = new Array("木制长杖#k(等级限制 : 10, 魔法师)#b", "蓝宝石长杖#k(等级限制 : 15, 魔法师)#b", "祖母缘长杖#k(等级限制 : 15, 魔法师)#b", "古树长杖#k(等级限制 : 20, 魔法师)#b", "法师长杖#k(等级限制 : 25, 魔法师)#b", "精灵长杖#k(等级限制 : 45, 魔法师)#b");
            for (var i = 0; i < items.length; i++) {
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;

        if (selectedType == 0) {
            var itemSet = //飞天猪力量戒指 小鱼戒指 寂寞戒指
                    new Array(1112403, 1112907, 1112916, 1082051, 1082054, 1082062, 1082081, 1082086); //戒指
            var matSet = new Array(4000046, //牛魔王的角
                    new Array(4000082, 1112403), //第二个需要的材料 金牙 
                    new Array(1112403, 1112907, 4021008, 4021010), //第三个需要什么材料 
                    new Array(4000021, 4021006, 4021000),
                    new Array(4000021, 4011006, 4011001, 4021000),
                    new Array(4000021, 4021000, 4021006, 4003000),
                    new Array(4021000, 4011006, 4000030, 4003000),
                    new Array(4011007, 4011001, 4021007, 4000030, 4003000));
            var matQtySet =
                    new Array(100, //需要一百个角
                    new Array(800, 1), //需要的数量
                    new Array(1, 1, 1, 100), //需要的数量
                    new Array(60, 1, 2),
                    new Array(70, 1, 3, 2),
                    new Array(80, 3, 3, 30),
                    new Array(3, 2, 35, 40),
                    new Array(1, 8, 1, 50, 50));
            var costSet =
                    new Array(10000, //飞天猪力量戒指需要多少钱
                    50000, //小鱼戒指需要多少钱
                    20000, //寂寞戒指需要多少钱
                    25000,
                    30000,
                    40000,
                    50000,
                    70000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1) { //项链合成
            var itemSet = //蝴蝶结 封印永恒玉佩 温暖的围脖 混沌项链 永恒玉佩
                    new Array(1122006, 1122011, 1122018, 1122058, 1122012);
            var matSet =
                    new Array(new Array(4000002, 4000021),//第一个物品需要的材料
                    new Array(4021010, 4011001),//封印永恒玉佩需要的材料
                    new Array(4001166, 4000079),//温暖的围脖需要的材料
                    new Array(1122006, 1122011,1122018,4000069),//混沌项链需要的材料
                    new Array(1122006, 1122011, 1122018,1122058,4000069));//永恒玉佩需要的材料
            var matQtySet = new Array(
                    new Array(200, 10), //需要数量
                    new Array(100, 5), //需要数量
                    new Array(200, 50), //需要数量
                    new Array(1, 1,1,100), //需要数量
                    new Array(1, 1, 1,2,500)); //需要数量
            var costSet = new Array(20000, 25000, 30000, 40000, 100000000, 40000, 40000, 45000, 45000, 50000, 55000, 60000, 70000, 80000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2) { //hat upgrade
            var itemSet = new Array(1002065, 1002013);
            var matSet = new Array(new Array(1002064, 4011001), new Array(1002064, 4011006));
            var matQtySet = new Array(new Array(1, 3), new Array(1, 3));
            var costSet = new Array(40000, 50000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3) { //wand refine
            var itemSet = new Array(1372005, 1372006, 1372002, 1372004, 1372003, 1372001, 1372000, 1372007);
            var matSet = new Array(4003001, new Array(4003001, 4000001), new Array(4011001, 4000009, 4003000), new Array(4011002, 4003002, 4003000), new Array(4011002, 4021002, 4003000),
                    new Array(4021006, 4011002, 4011001, 4003000), new Array(4021006, 4021005, 4021007, 4003003, 4003000), new Array(4011006, 4021003, 4021007, 4021002, 4003002, 4003000));
            var matQtySet = new Array(5, new Array(10, 50), new Array(1, 30, 5), new Array(2, 1, 10), new Array(3, 1, 10), new Array(5, 3, 1, 15), new Array(5, 5, 1, 1, 20), new Array(4, 3, 2, 1, 1, 30));
            var costSet = new Array(1000, 3000, 5000, 12000, 30000, 60000, 120000, 200000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 4) { //staff refine
            var itemSet = new Array(1382000, 1382003, 1382005, 1382004, 1382002, 1382001);
            var matSet = new Array(4003001, new Array(4021005, 4011001, 4003000), new Array(4021003, 4011001, 4003000), new Array(4003001, 4011001, 4003000),
                    new Array(4021006, 4021001, 4011001, 4003000), new Array(4011001, 4021006, 4021001, 4021005, 4003000, 4000010, 4003003));
            var matQtySet = new Array(5, new Array(1, 1, 5), new Array(1, 1, 5), new Array(50, 1, 10), new Array(2, 1, 1, 15), new Array(8, 5, 5, 5, 30, 50, 1));
            var costSet = new Array(2000, 2000, 2000, 5000, 12000, 180000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }

        var prompt = "你想做一个#t" + item + "#吗？这需要下面的道具。怎么样？想做吗？#b";

        if (mats instanceof Array) {
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i" + mats[i] + "# " + matQty[i] + " #t" + mats[i] + "#";
            }
        }
        else {
            prompt += "\r\n#i" + mats + "# " + matQty + " #t" + mats + "#";
        }

        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost + " 金币";

        cm.sendYesNo(prompt);
    }
    else if (status == 3 && mode == 1) {
        var complete = true;
        if (cm.getMeso() < cost)
        {
            cm.sendOk("请你确认是否有需要的物品或者背包的装备窗有没有空间。")
        }
        else
        {
            if (mats instanceof Array) {
                for (var i = 0; complete && i < mats.length; i++)
                {
                    if (matQty[i] == 1) {
                        if (!cm.haveItem(mats[i]))
                        {
                            complete = false;
                        }
                    }
                    else {
                        var count = 0;
                        var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats[i]).iterator();
                        while (iter.hasNext()) {
                            count += iter.next().getQuantity();
                        }
                        if (count < matQty[i])
                            complete = false;
                    }
                }
            }
            else {
                var count = 0;
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats).iterator();
                while (iter.hasNext()) {
                    count += iter.next().getQuantity();
                }
                if (count < matQty)
                    complete = false;
            }
        }

        if (!complete)
            cm.sendOk("请你确认是否有需要的物品或者背包的装备窗有没有空间。");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++) {
                    cm.gainItem(mats[i], -matQty[i]);
                }
            }
            else
                cm.gainItem(mats, -matQty);

            if (cost > 0)
                cm.gainMeso(-cost);

            cm.gainItem(item, 1);
            cm.sendOk("好！你的东西已经做好了，我的手艺果然不错！你看见过这么完美的东西吗？下次再来吧。");
        }
        cm.dispose();
    }
}