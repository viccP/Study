var status = 0; 
var types=new Array("װ����","������","������","������","�ֽ���"); 
var selectedMap = -1; 
function start() { 
    status = -1; 
    action(1, 0, 0); 
} 
function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else { 
        if (status >= 3 && mode == 0) { 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else { 
            cm.dispose(); 
            return; 
        } if (status == 0) { 
   var a="���������������Ա,������Ҫ��գ�\r\n#b" 
   for(var i=0;i<types.length;i++){ 
    a+= "\r\n#L" + i + "#" + types[ i ]+"     [����������Ʒ���뱳����һ��]"; 
   } 
           cm.sendSimple(a); 
        } else if (status == 1) { 
		 if(selection+1 == 1){
		var getitem = cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.EQUIP).getItem(1);
			if(getitem == null){
				cm.sendOk("��һ��û��Ʒ!"); 
				cm.dispose();
			}
		 net.sf.cherry.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), net.sf.cherry.client.MapleInventoryType.EQUIP, 1,getitem.getQuantity(), true);
		 cm.sendOk("����ɹ�!"); 
         cm.dispose();
		 }else if(selection+1 == 2){
		var getitem = cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.USE).getItem(1);
			if(getitem == null){
				cm.sendOk("��һ��û��Ʒ!"); 
				cm.dispose();
			}
		 net.sf.cherry.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), net.sf.cherry.client.MapleInventoryType.USE, 1,getitem.getQuantity(), true);
		 cm.sendOk("����ɹ�!"); 
         cm.dispose();
		 }else if(selection+1 == 3){
		var getitem = cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.SETUP).getItem(1);
			if(getitem == null){
				cm.sendOk("��һ��û��Ʒ!"); 
				cm.dispose();
			}
		 net.sf.cherry.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), net.sf.cherry.client.MapleInventoryType.SETUP, 1,getitem.getQuantity(), true);
		 cm.sendOk("����ɹ�!"); 
         cm.dispose();
		 }else if(selection+1 == 4){
		var getitem = cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.ETC).getItem(1);
			if(getitem == null){
				cm.sendOk("��һ��û��Ʒ!"); 
				cm.dispose();
			}
		 net.sf.cherry.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), net.sf.cherry.client.MapleInventoryType.ETC, 1,getitem.getQuantity(), true);
		 cm.sendOk("����ɹ�!"); 
         cm.dispose();
		 }else if(selection+1 == 5){
		var getitem = cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.CASH).getItem(1);
			if(getitem == null){
				cm.sendOk("��һ��û��Ʒ!"); 
				cm.dispose();
			}
		 net.sf.cherry.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), net.sf.cherry.client.MapleInventoryType.CASH, 1,getitem.getQuantity(), true);
		 cm.sendOk("����ɹ�!"); 
         cm.dispose();
		 }
		// var gsjb = getitem.getItemId();
           //cm.deleteItem(selection+1); 
          // cm.sendOk("����ɹ�!"); 
          // cm.sendSimple(gsjb); 
         //cm.sendOk(gsjb); 
        } 
        
        
    } 
} 