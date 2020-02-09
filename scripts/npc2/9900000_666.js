
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


importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(5390006, 10000,10, "咆哮老虎情景喇叭"),
        Array(5041000, 5000,10, "高级瞬移石"),
        Array(1702302, 10000,1, "杯具"),
        Array(1702303, 10000,1, "牛奶瓶"),
        Array(1702155, 10000,1, "绚丽彩虹"),
        Array(1070031, 10000,1, "阿尔卑斯少年鞋"),
        Array(1702341, 10000,1, "多味棒棒糖"),
        Array(1072337, 10000,1, "喜洋洋拖鞋"),
        Array(1042142,5000,1, "彩虹条背心"),
        Array(1042104, 5000,1, "小绿叶T恤"),
        Array(1041127, 5000,1, "爱心背心"),
        Array(1042105, 5000,1, "小红叶T恤"),
        Array(1041142, 5000,1, "巨星蛋糕吊带"),
        Array(1061148, 5000,1, "巨星粉色短裙"),
        Array(1061007, 5000,1, "红迷你裙"),
        Array(1061001, 5000,1, "蓝超短裙"),
        Array(1061126, 5000,1, "白色超短裙"),
        Array(1061067, 5000,1, "热裤女"),
        Array(1062093, 5000,1, "嫩绿休闲短裤"),
        Array(1002995, 5000,1, "皇家海军帽"),
        Array(1052209, 5000,1, "皇家海军制服"),
        Array(1003265, 5000,1, "爱心天蓝墨镜"),
        Array(1052724, 5000,1, "小马乖乖套服"),
        Array(1050293, 5000,1, "海滩帅锅装"),
        Array(1051180, 5000,1, "水兵服女"),
        Array(1042198, 5000,1, "彩虹T恤 "),
        Array(1050152, 5000,1, "水兵服男"),
        Array(1000061, 5000,1, "阿尔卑斯少年帽"),
        Array(1050256, 5000,1, "阿尔卑斯少年套服"),
        Array(1002943, 5000,1, "水兵帽"),
        Array(1050210, 5000,1, "蓝天小背带服"),
        Array(1051256, 5000,1, "蓝色小背带裙"),
        Array(1052031, 5000,1, "小少爷服"),
        Array(1082057, 5000,1, "棒球手套"),
        Array(1062054, 5000,1, "南瓜裤"),
        Array(1003867, 5000,1, "神射太阳帽"),
        Array(1002568, 5000,1, "手工编织发夹"),
        Array(1003461, 5000,1, "玫瑰秀秀"),
        Array(1003520, 5000,1, "可爱丝线发"),
        Array(1003401, 5000,1, "黑暗伊卡尔特"),
        Array(1003141, 5000,1, "稻草编织帽"),
        Array(1072373, 5000,1, "炫紫彩虹鞋"),
        Array(1004028, 5000,1, "黄猫无边帽"),
        Array(1004027, 5000,1, "白猫无边帽"),
        Array(1062094, 5000,1, "休闲夏日短裤"),
        Array(1003269, 5000,1, "天蓝爱心帽"),
        Array(1702289, 5000,1, "皇家海军旗帜"),
        Array(1002890, 3000,1, "丝带发箍蓝色"),
        Array(1002888, 3000,1, "丝带发箍红"),
        Array(1050232, 3000,1, "甘菊下午茶man"),
        Array(1051282, 3000,1, "迷迭香下午茶"),
        Array(1003250, 3000,1, "8周年音符红宝石"),
        Array(1003249, 3000,1, "8周年音符黄晶"),
        Array(1003256, 3000,1, "8周年音符绿色"),
        Array(1003255, 3000,1, "8周年音符紫色"),
        Array(1042236, 5000,1, "苹果绿毛衣"),
        Array(1042275, 5000,1, "青蛙雨衣"),
        Array(1042277, 5000,1, "流星雨T恤"),
        Array(1062067, 5000,1, "夏日七分牛仔裤"),
        Array(1062072, 5000,1, "BAND牛仔裤"),
        Array(1052536, 5000,1, "水手装"),
        Array(1051382, 5000,1, "天生购物狂"),
        Array(1051387, 5000,1, "春游连衣裙"),
        Array(1003163, 5000,1, "福尔摩斯帽子"),
        Array(1004190, 5000,1, "微笑旋律耳机"),
        Array(1042252, 5000,1, "高尔夫无袖T恤"),
        Array(1102705, 5000,1, "背着海鸥去旅行"),
        Array(5090100, 200000,99, "售价20万卷")


        //如需其它道具兑换，请按照此格式自行添置。
        //代码,数量,介绍
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
            StringS = "#b#n点卷商城-------账户余额:"+cm.getNX()+"";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##b#v" + ItemId[i][0] + "##k #z" + i + "##b#z" + ItemId[i][0] + "#(需要#r" + ItemId[i][1] + "#k点卷.数量#b" + ItemId[i][2] + "个.)";
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
                } else if (cm.getNX() >= ItemId[selection][1]) {
			
       cm.gainItem(ItemId[selection][0],+ItemId[selection][2]);                    cm.gainNX(-(ItemId[selection][1]));
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