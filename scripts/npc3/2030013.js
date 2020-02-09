
 
function start() {
    cm.sendSimple ("您想要挑战扎昆吗。想好了，请告诉我。\r\n#k#e#L0#挑战扎昆 \r\n#L1#不去了，我害怕#k \r\n")
    }

function action(mode, type, selection) {
        cm.dispose();

var Populatus00Map = cm.getC().getChannelServer().getMapFactory().getMap(280030000); 
    switch(selection){
        case 0: 
            if (cm.getLevel() < 49 ) {  
            cm.sendOk("本地图限制等级50级。您的能力没有资格挑战扎困");
           } else if (cm.getBossLog('zakum') >= 2000) {
            cm.sendOk("抱歉你只能参加2次");
	    cm.dispose();
           }else{
  /*if (Populatus00Map.getCharacters().isEmpty()) {
	if (cm.getParty() == null) { 
		cm.warpnz(280030000);  
	}else if(cm.getParty() != null){
		if (!cm.isLeader()) {
            cm.sendOk("你不是队长无法进入。请联系队长进入！");
	    cm.dispose();
		}
		cm.warpPartynz(280030000);
	}
	}else if(cm.getParty() == null){
		cm.warp(280030000);  
	}else if(cm.getParty() != null){
		if (!cm.isLeader()) {
            cm.sendOk("你不是队长无法进入。请联系队长进入！");
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
		cm.serverNotice("『挑战扎昆』：【"+ cm.getChar().getName() +"】去扎昆找死去了");  
		cm.dispose();
	      }   
	 break;
	 case 1:
 	      	cm.sendOk("不敢就滚去升级在来");  
		cm.dispose();
		 
        }
    }
