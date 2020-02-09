/*
	親親嘴冒險專用腳本

	少林妖僧 -- 入口NPC
	
	by-- 芯碎王子
		
	QQ:7851103

*/
importPackage(net.sf.odinms.server.maps); 
importPackage(net.sf.odinms.net.channel); 
importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.life);
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
		cm.sendOk("好的如果要挑戰#b妖僧#k隨時來找我.");
		cm.dispose();
	} 
	else 
	{
	if (mode == 1)
	status++;
	else
	status--;
		
	if (status == 0)
	{	if (cm.getC().getChannel() != 3){
			cm.sendOk("   少林妖僧的挑戰只能在 #r3#k 頻道進行!");
			cm.dispose();
		}else if (nextmap.mobCount() > 0 && nextmap.playerCount() > 0){
			cm.sendOk("有人正在挑戰..");
			cm.dispose();
      		}else{
			cm.sendYesNo("你是否要挑戰#b妖僧#k呢?");
		}
	}
	else if (status == 1) 
	{ 	
		var party = cm.getPlayer().getParty();		
		if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendOk("你不是隊長。請你們隊長來說話吧！");
                    cm.dispose();
                }else if(cm.getBossLog("shaoling") >= 3) {
	            cm.sendOk("您好,系統限定每天只能挑戰三次,如果強行進入,會被系統彈回來的!");
                    cm.dispose();
		}else if(party.getMembers().size() < 3) {
	            cm.sendOk("需要 3 人以上的組隊才能進入！!");
                    cm.dispose();
		}else{			
	         	//cm.getPlayer().getMap().killAllmonster();
			nextmap.resetReactors();
	    		//nextmap.killAllMonsters();
			nextmap.clearMapTimer();			
			//nextmap.setOnUserEnter("shaoling");
			cm.warpParty(702060000);
			cm.dispose();
		}
	}
}
}