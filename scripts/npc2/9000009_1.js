importPackage(java.util);
importPackage(net.sf.cherry.client);
importPackage(net.sf.cherry.server);
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
           
var itemId1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId();
				cm.sendYesNo("第一格装备：#v"+itemId1+"#.是否删除?");
			
        }
        else if (status == 1) {

var itemId1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId();
		cm.gainItem(itemId1,-1);
		cm.sendOk("成功");
            cm.dispose();
        }
    }
}