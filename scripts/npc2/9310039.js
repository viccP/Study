/*
	�˿˼L�_�I�M�θ}��

	�֪L���� -- �J�fNPC
	
	by-- ��H���l
		
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
		cm.sendOk("�n���p�G�n�D��#b����#k�H�ɨӧ��.");
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
			cm.sendOk("   �֪L�������D�ԥu��b #r3#k �W�D�i��!");
			cm.dispose();
		}else if (nextmap.mobCount() > 0 && nextmap.playerCount() > 0){
			cm.sendOk("���H���b�D��..");
			cm.dispose();
      		}else{
			cm.sendYesNo("�A�O�_�n�D��#b����#k�O?");
		}
	}
	else if (status == 1) 
	{ 	
		var party = cm.getPlayer().getParty();		
		if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendOk("�A���O�����C�ЧA�̶����ӻ��ܧa�I");
                    cm.dispose();
                }else if(cm.getBossLog("shaoling") >= 3) {
	            cm.sendOk("�z�n,�t�έ��w�C�ѥu��D�ԤT��,�p�G�j��i�J,�|�Q�t�μu�^�Ӫ�!");
                    cm.dispose();
		}else if(party.getMembers().size() < 3) {
	            cm.sendOk("�ݭn 3 �H�H�W���ն��~��i�J�I!");
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