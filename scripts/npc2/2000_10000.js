/*
 *魔宠合成
 **/
//---------变量区-------/


importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
//4000425
var ItemId = Array(
    //魔宠名字 品质  需要的材料 数量 合成手续费  魔宠类型
    Array("花蘑菇",1,4000001,400,5000,1),
    Array("漂漂猪",1,4000017,30,5000,2),
    Array("小蜗牛",1,4000019,700,5000,40),
    Array("红蜗牛",1,4000016,400,10000,6),
    Array("幽 灵",1,4000036,300,10000,7),
    Array("猴 子",1,4000029,300,10000,46),
    Array("白色兔子",1,4000241,50,50000,13),
    Array("粉红兔子",1,4000241,50,50000,14)
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
            StringS = "需要合成吗？合成魔宠默认品质为野生哦！这里是普通魔宠合成区！";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##d合成#b" + ItemId[i][0] + "#k (需要#b#z" + ItemId[i][2] + "##k#r" + ItemId[i][3] + "#k个,#d金币" + ItemId[i][4] + "#k)";
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
                } else if (cm.haveItem(ItemId[selection][2],ItemId[selection][3])) {
                   
                    cm.获得魔宠(cm.getPlayer().getId(),ItemId[selection][0],ItemId[selection][5],1,0,0);
                    cm.sendOk("兑换成功!");
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11, cm.getC().getChannel(), "[恭喜]" + " : " + " "+cm.getPlayer().getName()+"成功兑换了魔宠["+ItemId[selection][0]+"]", true).getBytes());
                    cm.gainItem(ItemId[selection][2],-ItemId[selection][3]);
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