/*
	������ð��ר�ýű�

	������ɮ -- ���NPC
	
	by-- о������
		
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
		cm.sendOk("�õ����Ҫ��ս#b��ɮ#k��ʱ������.");
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
			cm.sendOk("   ������ɮ����սֻ���� #r2#k Ƶ������!");
			cm.dispose();
//nextmap.mobCount() > 0 && nextmap.playerCount() > 0
		}else if (nextmap.mobCount() > 999){
			cm.setBossLog("shaoling");
			cm.warp(702060000);
			cm.dispose();
      		}else{
			cm.sendYesNo("���Ƿ�Ҫ��ս��ɮ�أ�#b��������ٴν���#k��Ӱ�����������ҵ���ս��������֪Ϥ��");
		}
	}
	else if (status == 1) 
	{ 	
		var party = cm.getPlayer().getParty();		
		if(cm.getBossLog("shaoling") >= 2) {
	            cm.sendOk("����,ϵͳ�޶�ÿ��ֻ����ս2��,���ǿ�н���,�ᱻϵͳ��������!");
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