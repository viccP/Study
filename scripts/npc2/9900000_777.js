
/*
 * 
 * 老带新活动
 * @地狱火 WNMS
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
var pz = "4031329"; //老玩家凭证代码
var wp = "4001325"; //宝石
importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(1122017, 3000, 1,"吊坠"),
        Array(5570000, 50, 1,"参照物品自行更改"),
	Array(5520000, 200, 1,"参照物品自行更改"),
	Array(1112405, 100, 1,"参照物品自行更改"),
        Array(5150040, 100, 1,"参照物品自行更改")
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
            StringS = "#b#n目前为止..你的账号已经充值了" + cm.getPlayer().getjf() + "积分！！";
            for (var i = 0; i < ItemId.length; i++) {
                StringS += "\r\n#L" + i + "##b#v" + ItemId[i][0] + "##k (需要#r " + ItemId[i][1] + " #k积分.数量:#r " + ItemId[i][2] + " 个#k)";
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
                } else if (cm.getPlayer().getjf() >= ItemId[selection][1]) {
			if(ItemId[selection][0] == 1122017){
cm.getPlayer().gainjf(-(ItemId[selection][1]));
			 var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
            var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1000 * 24 * 60 * 60 * 1000*7); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.sendOk("兑换成功，请检背包!");
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true,true);
cm.dispose();
			return;
			}
                    cm.gainItem(ItemId[selection][0], +ItemId[selection][2]);
                    cm.getPlayer().gainjf(-(ItemId[selection][1]));
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
