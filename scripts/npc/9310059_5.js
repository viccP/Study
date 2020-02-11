var status = 0;
var itemList = 
Array(     
			Array(2040014,800,1,1), //头盔命中率诅咒卷轴70% 
			Array(2040704,800,1,1), //鞋子跳跃卷轴60
			Array(2040705,800,1,1), //鞋子跳跃卷轴10
			Array(2040804,800,1,1), //手套攻击卷轴60
			Array(2040805,800,1,1), //手套攻击卷轴10
			Array(2040816,800,1,1), // 手套魔力卷轴10%
			Array(2040817,800,1,1), //手套魔力卷轴60%
			Array(2040914,800,1,1), // 盾牌攻击卷轴60%
			Array(2041013,900,1,1), //披风力量卷轴60
			Array(2041016,900,1,1), //披风智力卷轴60
			Array(2041019,900,1,1), //披风敏捷卷轴60
			Array(2041022,800,1,1), //披风运气卷轴60
			Array(2043002,600,1,1), //单手剑10
			Array(2043001,600,1,1), //单手剑60
			Array(2044002,600,1,1), //双手剑10
			Array(2000005,800,20,1), //超级
			Array(2044001,600,1,1), //双手剑60
			Array(2044302,600,1,1), //枪10
			Array(2044301,600,1,1), //枪60
			Array(2044502,600,1,1), //弓10
			Array(2044501,600,1,1), //弓60
			Array(2000005,800,20,1), //超级
			Array(2044602,600,1,1), //弩10
			Array(2044601,600,1,1), //弩60
			Array(2044702,600,1,1), //拳套10
			Array(2044701,600,1,1), //拳套60
			Array(2043802,600,1,1), //长杖10
			Array(2043801,600,1,1), //长杖60
			Array(2043702,600,1,1), //短杖10
			Array(2043701,600,1,1), //短杖03010739
			Array(3015100,600,1,1), //大兔子
			Array(3010739,600,1,1), //lifa
			Array(3010300,600,1,1), //lifa
			Array(3010301,600,1,1), //lifa
			Array(3010302,600,1,1), //lifa03010376
			Array(3010376,600,1,1), //lifa03010376
			Array(3010377,600,1,1), //lifa03010376
			Array(1012209,700,1,1), //超级
			Array(1012210,700,1,1), //超级
			Array(1012211,700,1,1), //超级
			Array(1012212,700,1,1), //超级
			Array(1012213,700,1,1), //超级
			Array(1012214,500,1,1), //超级
			Array(1012215,700,1,1), //超级
			Array(1012216,700,1,1), //超级
			Array(1012217,700,1,1), //超级
			Array(1012218,700,1,1), //超级
			Array(1012219,700,1,1), //超级
			Array(1012220,500,1,1), //超级
			Array(1012221,700,1,1), //超级
			Array(1012222,700,1,1), //超级
			Array(1012223,700,1,1), //超级
			Array(1012224,700,1,1), //超级
			Array(1012225,700,1,1), //超级
			Array(1012226,500,1,1), //超级
			Array(1012227,700,1,1), //超级
			Array(1012228,700,1,1), //超级
			Array(1012229,700,1,1), //超级
			Array(1012230,700,1,1), //超级
			Array(1012231,700,1,1), //超级
			Array(1012232,500,1,1), //超级
			Array(2000005,800,20,1), //超级
			Array(1132112,800,20,1), //武功黄
			Array(1132113,800,20,1), //武功蓝
			Array(1132114,800,20,1), //武功红
			Array(1132115,800,20,1), //武功黑
			Array(2049100,800,1,1) //混沌
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("毒雾副本主要出产：#v1132112##v1132113##v1132114##v1132115#.#v2044602##v2044601#各种10%.60%卷轴，#v1012232#各职业80-130面饰徽章，#v2000005#超级药水x20，#v2049100#混沌卷轴.#v3015100##v3010739##v3010301##v3010302##v3010376##v3010377##v3010300#精品椅子.等奖励.");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(4170001, 1)) {
            cm.sendYesNo("毒雾副本主要出产：#v1132112##v1132113##v1132114##v1132115#.#v2044602##v2044601#各种10%.60%卷轴，#v1012232#各职业80-130面饰徽章，#v2000005#超级药水x20，#v2049100#混沌卷轴.#v3015100##v3010739##v3010301##v3010302##v3010376##v3010377##v3010300#精品椅子.等奖励.");
        } else {
            cm.sendOk("毒雾副本主要出产：#v1132112##v1132113##v1132114##v1132115#.#v2044602##v2044601#各种10%.60%卷轴，#v1012232#各职业80-130面饰徽章，#v2000005#超级药水x20，#v2049100#混沌卷轴.#v3015100##v3010739##v3010301##v3010302##v3010376##v3010377##v3010300#精品椅子.等奖励.你背包里有1个#b#t4170005##k吗?");
            cm.safeDispose();
        }
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * +900);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = cm.gainGachaponItem(itemId, quantity, "毒雾副本福利抽奖", notice);
            if (item != -1) {
                cm.gainItem(4170001, -1);
                cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                cm.sendOk("你确实有#b#t4170005##k吗？如果是，请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            cm.safeDispose();
        } else {
            cm.sendOk("今天的运气可真差，什么都没有拿到。");
            cm.gainItem(4170001, -1);
            cm.safeDispose();
        }
    }
}