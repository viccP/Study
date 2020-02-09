function start() {
    if (cm.getChar().getMapId() == 803001200) {
        if (cm.countMonster() < 1) {
            cm.sendSimple("当前地图没有怪物。 \r\n \r\n    #L8##r回到市场#l");
        } else {
            cm.sendSimple("我这里是#b绯红军需品补给站#k，你可以在我这里获得补给物品。\r\n\r\n#d剩余:#r" + cm.getNX() + " #d点卷 #d挑战积分：#r" + cm.getboss() + " ★#d\r\n\r\点卷消耗补给：#r350点卷购买 - \r\n#L0##r#z2022112#-1个#k#l #b#L1##z2022009# - 100个#l #d#L2##z2020013# - 100个#l\r\n\r\n\r\n冒险币补给类物品：#r500000 - 100个\r\n#L6#组队特殊药水 - 100个#l#L7##z2022215# - 20个#l\r\n\r\n#L8##e - 回到市场 - #l");
        }
    } else {
        cm.sendOk("你好。")
    }
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        if (cm.getNX() >= 350) {
            cm.gainNX(-350);
            cm.gainItem(2022112, 1);
            cm.serverNotice("『军用品补给』：" + cm.getChar().getName() + " 获得了BUFF补给品！");
        } else {
            cm.sendOk("无法获得。请确保你是否满足条件");
            cm.dispose();
        }
    } else if (selection == 1) {
        if (cm.getNX() >= 350) {
            cm.gainNX(-350);
            cm.serverNotice("『绯红军用品补给』：" + cm.getChar().getName() + " 购买了药水补给！");
            cm.gainItem(2022009, 100);
        } else {
            cm.sendOk("无法获得。请确保你是否满足条件");
            cm.dispose();
        }
    } else if (selection == 2) {
        if (cm.getNX() >= 350) {
            cm.gainNX(-350);
            cm.gainItem(2020013,100);
            cm.serverNotice("『绯红军用品补给』：" + cm.getChar().getName() + " 购买了药水补给！");  
        } else {
           cm.sendOk("无法获得。请确保你是否满足条件");
            cm.dispose();
        }
    } else if (selection == 3) {
        if (!cm.haveItem(4001009, 1)) {
            cm.sendOk("抱歉，你没有1张#v4001009#无法为你开启");
        } else if (!cm.haveItem(4001010, 1)) {
            cm.sendOk("抱歉，你没有1张#v4001010#无法为你开启");
        } else if (!cm.haveItem(4001011, 1)) {
            cm.sendOk("抱歉，你没有1张#v4001011#无法为你开启");
        } else if (!cm.haveItem(4001012, 1)) {
            cm.sendOk("抱歉，你没有1张#v4001012#无法为你开启");
        } else if (!cm.haveItem(4001013, 1)) {
            cm.sendOk("抱歉，你没有1张#v4001013#无法为你开启");
        } else {
            cm.gainItem(4001009, -1);
            cm.gainItem(4001010, -1);
            cm.gainItem(4001011, -1);
            cm.gainItem(4001012, -1);
            cm.gainItem(4001013, -1);
            cm.gainItem(4021010, 1);
            cm.dispose();
        }
    } else if (selection == 4) {
        if (!cm.haveItem(4021010, 1)) {
            cm.sendOk("抱歉，你没有#v4021010#无法为你开启");
            cm.dispose();
        } else {
            cm.warp(209000015, 0);
            cm.dispose();
        }
    } else if (selection == 8) {
        cm.warp(910000000, 0);
        cm.dispose();
    } else if (selection == 5) {
        cm.sendOk("在这里必须击败所有的BOSS，而每一个BOSS都会爆出一种凭证#r（凭证暴率90%）#k。收集5个凭证后，您可以找我兑换通关证明。然后在点我，我将把你们传送到领奖地图。并且给于#e#b【10点积分】");
        cm.dispose();
    } else if (selection == 6) {
        if (cm.getMeso() >= 500000) {
            cm.gainItem(2022161,100);
            cm.gainMeso(-500000);
            cm.serverNotice("『绯红军用品补给』：【" + cm.getChar().getName() + "】购买了组队特殊药水！");
        } else {
            cm.sendOk("你的冒险币不足！");
            cm.dispose();
        }
    } else if (selection == 7) {
        if (cm.getMeso() >= 500000) {
            cm.gainMeso(-500000);
            cm.serverNotice("『绯红军用品补给』：【" + cm.getChar().getName() + "】购买了buff药水！");
            cm.gainItem(2022215,20)
        } else {
            cm.sendOk("你的冒险币不足");
            cm.dispose();
        }
    } else if (selection == 8) {
        if (cm.getMeso() <= 50000000) {
            cm.sendOk("抱歉你没有5000万。我不能为您召唤");
        } else {
            cm.gainMeso(-50000000);
            cm.summonMob(9400300, 100000000, 175000000, 1);//恶僧
            cm.dispose();
        }
    } else if (selection == 9) {
        if (cm.getMeso() <= 50000000) {
            cm.sendOk("抱歉你没有5000万。我不能为您召唤");
        } else {
            cm.gainMeso(-50000000);
            cm.summonMob(9400549, 1, 200300000, 1);//火马
            cm.dispose();
        }
    }
}