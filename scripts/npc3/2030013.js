
 
function start() {
    cm.sendSimple ("����Ҫ��ս����������ˣ�������ҡ�\r\n#k#e#L0#��ս���� \r\n#L1#��ȥ�ˣ��Һ���#k \r\n")
    }

function action(mode, type, selection) {
        cm.dispose();

var Populatus00Map = cm.getC().getChannelServer().getMapFactory().getMap(280030000); 
    switch(selection){
        case 0: 
            if (cm.getLevel() < 49 ) {  
            cm.sendOk("����ͼ���Ƶȼ�50������������û���ʸ���ս����");
           } else if (cm.getBossLog('zakum') >= 2000) {
            cm.sendOk("��Ǹ��ֻ�ܲμ�2��");
	    cm.dispose();
           }else{
  /*if (Populatus00Map.getCharacters().isEmpty()) {
	if (cm.getParty() == null) { 
		cm.warpnz(280030000);  
	}else if(cm.getParty() != null){
		if (!cm.isLeader()) {
            cm.sendOk("�㲻�Ƕӳ��޷����롣����ϵ�ӳ����룡");
	    cm.dispose();
		}
		cm.warpPartynz(280030000);
	}
	}else if(cm.getParty() == null){
		cm.warp(280030000);  
	}else if(cm.getParty() != null){
		if (!cm.isLeader()) {
            cm.sendOk("�㲻�Ƕӳ��޷����롣����ϵ�ӳ����룡");
	    cm.dispose();
		}
		cm.warpPartynz(280030000);
		}*/
	//	if (Populatus00Map.getCharacters().isEmpty()) {
	//	cm.sxfyd(2111001, -10 , -204, 280030000);
	//	}
		cm.warp(280030000);  
        	//cm.setBossLog('zakum');
        	//cm.warp(280030000, 0);
		cm.serverNotice("����ս����������"+ cm.getChar().getName() +"��ȥ��������ȥ��");  
		cm.dispose();
	      }   
	 break;
	 case 1:
 	      	cm.sendOk("���Ҿ͹�ȥ��������");  
		cm.dispose();
		 
        }
    }
