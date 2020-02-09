/*
 * 
 * @WNMS
 * @奖励领取NPC
 */

importPackage(net.sf.cherry.client);
var status = 0;
var 黑水晶 = 4021008;
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 感叹号2 = "#fUI/UIWindow/Quest/icon1#";
var 奖励 = "#fUI/UIWindow/Quest/reward#";
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";
var 任务描述 = "#fUI/UIWindow/Quest/summary#"
var 忠告 = "#k温馨提示：任何非法程序和外挂封号处理.封杀侥幸心理.";
var 几率获得 = "#fUI/UIWindow/Quest/prob#";
var 无条件获得 = "#fUI/UIWindow/Quest/basic#";
var 第一关几率获得 = "#v4001038# = 1 #v4001039# = 1 #v4001040# = 1 #v4001041# = 1 #v4001042# = 1 #v4001043# = 1 ";
var 第一关无条件获得 = "#v4001136# = ??? #v4001129# = ???";
var 数二 = 200;
var 数三 = 300;
var 数四 = 500;
var 数五 = 800;
function start() {
    status = -1;
    action(1, 0, 0);
}
var qd = "#v1142000# #v2001000# #v2022448# #v2022252# #v2022484# #v2040308# #v3012003#";
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
            var 前言 = "#b你有#b冒险岛纪念币#k吗？可以兑换奖励哦！\r\n";
            var 选择1 = "#L0##r 兑换#v1122007##z1122007##k - 需要 2000 个#l \r\n";//
            var 选择2 = "#L1##r 兑换#v1122058##z1122058##k - 需要 2000 个#l\r\n";//
            var 选择3 = "#L2##r兑换#v1112402##z1112402##k - 需要 1000 个#l\r\n";//
            var 选择4 = "#L3##r兑换#v1122017##z1122017##k1小时使用权 - 需要 100 个#l\r\n";//
            var 选择5 = "#L4##r兑换#v1122017##z1122017##k2小时使用权 - 需要 200 个#l\r\n";
            var 选择6 = "#L5##r兑换#v1122017##z1122017##k3小时使用权 - 需要 300 个#l\r\n";
            var 选择7 = "#L6##r兑换#v1142080##z1142080##k - 需要50个#l\r\n"
            var 选择8 = "#L7##r兑换#v1142077##z1142077##k - 需要5000个#l\r\n"
            var 选择9 = "#L8##r兑换#v2041211##z2041211##k - 需要600个#l\r\n"
            cm.sendSimple("" + 前言 + "" + 选择1 + "" + 选择2 + " "+ 选择3 +" "+选择4+" "+选择5+" "+选择6+" "+选择7+" "+选择8+" "+选择9+"");
        } else if (status == 1) {
            if (selection == 0) { //兑换1
                if (cm.haveItem(4001129,2000)) { //项链兑换
                    cm.sendOk("获得了#v1122007#！");
                    cm.gainItem(4001129,-2000);
                    cm.gainItem(1122007,1);
                    cm.dispose();
                } else {
                   cm.sendOk("对不起，你的纪念币不足");
                   cm.dispose();
                }
            } else if (selection == 1) { //兑换混沌项链
               if(cm.haveItem(4001129,2000)&&cm.haveItem(1122007,1)){
                   cm.sendOk("你获得了混沌项链！");
                   cm.gainItem(4001129,-2000);
                   cm.gainItem(1122007,-1);
                   cm.gainItem(1122058,1);
                   cm.dispose();
               }else{
                   cm.sendOk("对不起，你的纪念币不足");
                   cm.dispose();
                }
            } else if (selection == 2) { //查询  正在进行
             if (cm.haveItem(4001129,1000)) { //项链兑换
                    cm.sendOk("获得了#v1112402#！");
                    cm.gainItem(4001129,-1000);
                    cm.gainItem(1112402,1);
                    cm.dispose();
                } else {
                   cm.sendOk("对不起，你的纪念币不足");
                   cm.dispose();
                }
               
            } else if (selection == 3) {//完成任务
                  if (cm.haveItem(4001129,100)) { //项链兑换
                    cm.sendOk("获得了#v1122017#！ - 1小时使用权");
                    cm.gainItem(4001129,-100);
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
             var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*10); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true,true);
cm.dispose();
                } else {
                   cm.sendOk("对不起，你的纪念币不足");
                   cm.dispose();
                }
            } else if (selection == 4) {//完成任务
                  if (cm.haveItem(4001129,200)) { //项链兑换
                    cm.sendOk("获得了#v1122017#！ - 2小时使用权");
                    cm.gainItem(4001129,-200);
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
             var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*20); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true,true);
cm.dispose();
                } else {
                   cm.sendOk("对不起，你的纪念币不足");
                   cm.dispose();
                }
           } else if (selection == 5) {//完成任务
                  if (cm.haveItem(4001129,300)) { //项链兑换
                    cm.sendOk("获得了#v1122017#！ - 3小时使用权");
                    cm.gainItem(4001129,-300);
                     var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
             var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 6 * 60 * 1000*30); //时间
toDrop.setExpiration(temptime); 
toDrop.setLocked(1);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true,true);
cm.dispose();
                } else {
                   cm.sendOk("对不起，你的纪念币不足");
                   cm.dispose();
                }
              } else if (selection == 6) {//完成任务
                  if (cm.haveItem(4001129,50)) { //项链兑换
                    cm.sendOk("获得了#v1142080#！ - ");
                    cm.gainItem(4001129,-50);	                
                     cm.gainItem(1142080,1);
cm.dispose();
                } else {//
                   cm.sendOk("对不起，你的纪念币不足");
                   cm.dispose();
                }
             } else if (selection == 7) {//完成任务
                  if (cm.haveItem(4001129,5000)) { //项链兑换
                    cm.sendOk("获得了#v1142077#！ - ");
                    cm.gainItem(4001129,-5000);	                
                     cm.gainItem(1142077,1);
cm.dispose();
                } else {//2041211
                   cm.sendOk("对不起，你的纪念币不足");
                   cm.dispose();
                }
             } else if (selection == 8) {//完成任务
                  if (cm.haveItem(4001129,600)) { //项链兑换
                    cm.sendOk("获得了#v2041211#！ - ");
                    cm.gainItem(4001129,-600);	                
                     cm.gainItem(2041211,1);
cm.dispose();
                } else {//2041211
                   cm.sendOk("对不起，你的纪念币不足");
                   cm.dispose();
                }
            }
        }
    }
}
