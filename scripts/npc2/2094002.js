

importPackage(net.sf.cherry.client);

var status;


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	} else {
		if (mode == 1)
			status++; 
		else
			status--;
		if (status == 0) {
		if (cm.getPlayer().getMapId() == 925100000){
var text = "No1.我想你应该有能力拯救这个地方.去吧!\r\n#L0#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 925100200){
var text = "本关有个隐藏暗门.进去后收集卵蛋给我即可进入下一关 注意时间！\r\n#L1#进入下#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 925100400){
var text = "能来这里,你应该有打败BOSS的可能!\r\n#L2#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);

}else if (cm.getPlayer().getMapId() == 925100600){
var text = "能来这里,你应该有打败BOSS的可能!\r\n#L3#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);

}else if (cm.getPlayer().getMapId() == 925100500){
var text = "能来这里,你应该有打败BOSS的可能!\r\n\r\n#L4##b召唤BOSS#l\r\n\r\n#L5##r领取奖励#l#k\r\n\r\n#L6##r出去#l#k\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);


}else if (cm.getPlayer().getMapId() == 925100700){
cm.removeAll(4001122);
				cm.removeAll(4001113);
				cm.removeAll(4001114);
				cm.removeAll(4001044);
				cm.removeAll(4001045);
				cm.removeAll(4001046);
				cm.removeAll(4001047);
				cm.removeAll(4001048);
				cm.removeAll(4001049);
				cm.removeAll(4001063);
				cm.removeAll(4031309);
				cm.removeAll(4001053);
				cm.removeAll(4001054);
				cm.removeAll(4001056);
				
				cm.warp(251010404);
				
				cm.dispose();
}else {//vip1待遇
var text = "但愿有人能消灭这里的怪物.我的神！";
cm.sendOk(text);
cm.dispose();
}
		}
		else if(status == 1) {
			if (selection == 0) {
if (cm.haveItem(4001113,1)) {
cm.removeAll(4001113);

cm.warp(925100200);
cm.gainExp(+500000);
cm.sendOk("但愿你们能坚持下来.");
cm.dispose();

}else {	
cm.sendOk("#v4001113# 需要1个, 目前数量不足!");
cm.dispose();
}


}else if (selection == 1) {
if (cm.haveItem(4001114,1)) {

cm.removeAll(4001114);
cm.warp(925100400);
cm.gainExp(+700000);
cm.sendOk("但愿你们能坚持下来.");
cm.dispose();

}else {	
cm.sendOk("#v4001114# 需要1个, 目前数量不足!");
cm.dispose();
}
}else if (selection == 2) {
if (cm.haveItem(4001117,10)) {

cm.removeAll(4001117);


cm.gainItem(4001122, 1);
cm.gainExp(+1000000);
cm.warp(925100500);
cm.sendOk("但愿你能打败他~");
cm.dispose();
}else {	
cm.sendOk("但愿你能继续下去.请收集10个#v4001117#.然后交给我!");
cm.dispose();
}



}else if (selection == 3) {
if (cm.getParty() != null) { 

cm.sendOk("此处必须解散队伍  单人进入");
cm.dispose();
}else {	

cm.removeAll(4001117);
				cm.removeAll(4001113);
				cm.removeAll(4001114);
				cm.removeAll(4001113);
				cm.removeAll(4001046);
				cm.removeAll(4001047);
				cm.removeAll(4001048);
				cm.removeAll(4001049);
				cm.removeAll(4001063);
				cm.removeAll(4031309);
				cm.removeAll(4001053);
				cm.removeAll(4001054);




cm.warp(925100500,0);
cm.givePartyExp(+377000);
cm.sendOk("但愿你能打败他~");
}



}else if (selection == 5) {
if (cm.itemQuantity(4031551) < 1) {
    cm.sendOk("没有宝物 是无法引诱小小鱼的");
    cm.dispose();
       } else if (cm.itemQuantity(4031551) > 0) {
                    cm.removeAll(4031551);
                      
cm.summonMob(9600074, 23090909, 6500000, 1);//船长5E血

cm.serverNotice("【组队任务】:[" + cm.getPlayer() + "] 成功召唤出了一条小小鱼, 是清蒸 还是闷煮?");             
 
                    
                    cm.dispose();
                } else {
                    cm.sendOk("请检查背包是否有#v4031551# 在海盗身上可获得");
                    cm.dispose();
                }                    

}else if (selection == 4) {
if (cm.itemQuantity(4001122) < 1) {
    cm.sendOk("...");
    cm.dispose();
       } else if (cm.itemQuantity(4001122) > 0) {
                    cm.removeAll(4001122);
                      
cm.summonMob(9300119, 800000, 300000, 1);//船长5E血

          
 
                    
                    cm.dispose();
} 

}else if (selection == 6)  {
cm.removeAll(4001117);
				cm.removeAll(4001113);
				cm.removeAll(4001114);
				cm.removeAll(4001113);
				cm.removeAll(4001046);
				cm.removeAll(4001047);
				cm.removeAll(4001048);
				cm.removeAll(4001049);
				cm.removeAll(4001063);
				cm.removeAll(4031309);
				cm.removeAll(4001053);
				cm.removeAll(4001054);
if(cm.haveItem(4031329,1)){
				cm.gainItem(4001325,+1);
				}
cm.warp(925100700,0);
cm.dispose(); 


}else if (selection == 7) {
cm.sendOk("#v3994026##r字奖励关卡:#k\r\n   由于掉率相比#b银字#k低了5倍,\r\n#v3994034##r字奖励关卡:#k\r\n   由于掉率相比#b银字#k低了4倍\r\n   特别包含#b[110级装备,部分玩具,100%必成卷.稀有椅子]#k等.\r\n#v3994027##r字奖励关卡:#k\r\n   进入后,在60秒内,会有无数装备飞出来,你能捡到那就是你的啦~\r\n   特别包含#b[110级装备,部分玩具,100%必成卷.稀有椅子]#k等..\r\n\r\nPs:当然,也可以和别人稀疏冒险岛挑战,而且只消耗队长的字符哦!");
cm.dispose();

}}}}
