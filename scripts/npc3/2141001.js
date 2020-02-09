importPackage(net.sf.cherry.server.maps); 
importPackage(net.sf.cherry.net.channel); 
importPackage(net.sf.cherry.tools);

var status = 0;  
function start() {  
    status = -1;  
    action(1, 0, 0);  
}  

function action(mode, type, selection) {   
    if (mode == -1) {  
        cm.dispose();  
    }  
    else {   
        if (mode == 0) {      
            cm.dispose();   
            return;   
        }
        if (mode == 1) {
            status++;  
        }      
        else {  
            status--;  
        }  
        if (status == 0) {
				 var pbMap = cm.getC().getChannelServer().getMapFactory().getMap(270050100);		
				 var mapobjects = pbMap.getMapObjects(); 
				 var boss = null; 
				 var player = null; 
				 var iter = mapobjects.iterator(); 
				 while (iter.hasNext()) 
				{ 
					o = iter.next(); 
					if (o.getType() == MapleMapObjectType.MONSTER)
					{ 
						boss = o; 
					} 
					if (o.getType() == MapleMapObjectType.PLAYER)
					{ 
    						player = o; 
					} 
				}
				if(player != null && boss != null){
					cm.sendOk("��սPB��ս���Ѿ���ʼ.�������޷�����");
					cm.dispose();
				}else{
					cm.sendYesNo("����������û�����������ء������ȥ��?");					
				}
			
        		
       } else if (status == 1) {
			cm.getC().getChannelServer().getMapFactory().getMap(270050100).clearMapTimer();
			cm.warp(270050100,0);
			cm.getPlayer().saveToDB(true,true);
			cm.getC().getChannelServer().getMapFactory().getMap(270050100).addMapTimer(3600,270050300);
            		cm.dispose();
        }
    }
}
