/*
	亲亲嘴冒险专用脚本

	少林妖僧 -- 入口NPC
	
	by-- 芯碎王子
		
	QQ:7851103

*/
importPackage(net.sf.cherry.server.maps); 
importPackage(net.sf.cherry.net.channel); 
importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status = 0;

function start() 
	{
	status = -1;
	action(1, 0, 0);
	}

function action(mode, type, selection)
{
	var nextmap = cm.getC().getChannelServer().getMapFactory().getMap(702060000);
	if (mode == -1)
	{
		cm.dispose();
	}
	else if (mode == 0)
	{
		cm.sendOk("好的如果要挑战#b妖僧#k随时来找我.");
		cm.dispose();
	} 
	else 
	{
	if (mode == 1)
	status++;
	else
	status--;
		
	if (status == 0)
	{	if (cm.getC().getChannel() != 2){
			cm.sendOk("   少林妖僧的挑战只能在 #r2#k 频道进行!");
			cm.dispose();
//nextmap.mobCount() > 0 && nextmap.playerCount() > 0
		}else if (nextmap.mobCount() > 999){
			cm.setBossLog("shaoling");
			cm.warp(702060000);
			cm.dispose();
      		}else{
			cm.sendYesNo("你是否要挑战妖僧呢？#b如果掉线再次进入#k会影响组队其他玩家的挑战次数，请知悉！");
		}
	}
	else if (status == 1) 
	{ 	
		var party = cm.getPlayer().getParty();		
		if(cm.getBossLog("shaoling") >= 2) {
	            cm.sendOk("您好,系统限定每天只能挑战2次,如果强行进入,会被系统弹回来的!");
                    cm.dispose();
		}else if(nextmap.mobCount() > 0) {
	          cm.setBossLog("shaoling");
			cm.warp(702060000);
			cm.dispose();
		}else{			
	         	cm.getPlayer().getMap().killAllmonster();
			nextmap.resetReactors();
	    		nextmap.killAllMonsters();
			nextmap.clearMapTimer();			
			nextmap.setOnUserEnter("shaoling");
			cm.warp(702060000);
			cm.dispose();
		}
	}
}
}