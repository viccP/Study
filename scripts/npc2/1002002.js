importPackage(net.sf.odinms.server); 

var status; 
var choice; 

function start() { 
    status = -1; 
    action(1, 0, 0); 
}  
  
function action(mode, type, selection) { 
    if (mode == 1) 
        status++; 
    else { 
        cm.dispose(); 
        return; 
    } 
     
    if (status == 0) 
        cm.sendNext("#b你好, 我是 風迷.OD.TW 商店管理員!#k"); 
    else if (status == 1) 
        cm.sendSimple("你想要取回哪一項呢?\r\n#b#L0#楓幣#l    #L1#物品#l"); 
    else if (status == 2) { 
        cm.sendNext("給我一點時間搜尋一下..."); 
        choice = selection; 
    } else { 
        if (choice == 0) { 
            if (status == 3) { 
                var mesoEarnt = cm.getHiredMerchantMesos(); 
                if (mesoEarnt > 0) 
                    cm.sendYesNo("在你的精靈商人中~你賺取了 "+mesoEarnt+" 楓幣. 你想要取回楓幣嗎?"); 
                else { 
                    cm.sendNext("你沒有賺取任何楓幣"); 
                    cm.dispose(); 
                } 
            } else if (status == 4) { 
                if (cm.getPlayer().getMeso() + cm.getHiredMerchantMesos() <= 2147483647) { 
                    cm.sendNext("謝謝你的使用, 你的楓幣已經退還給你了"); 
                    cm.gainMeso(cm.getHiredMerchantMesos()); 
                    cm.setHiredMerchantMesos(0);
                } else { 
                    cm.sendOk("你身上的楓幣好像有點多."); 
                } 
                cm.dispose(); 
            } 
        } else { 
            if (status == 3) { 
                var items = cm.getHiredMerchantItems(); 
                if (items.size() > 0) { 
                    var text = "請選擇一個物品\r\n"; 
                    for (var i = 0; i < items.size(); i++) 
                        text += "#L"+i+"##i"+items.get(i).getRight().getItemId()+"##l "; 
                    cm.sendSimple(text); 
                } else { 
                    cm.sendNext("在你的店裡沒有任何物品."); 
                    cm.dispose(); 
                } 
            } else if (status == 4) { 
                var items = cm.getHiredMerchantItems(); 
                if (cm.getC() == null) 
                    cm.getPlayer().dropMessage("Received"); 
                MapleInventoryManipulator.addFromDrop(cm.getC(), items.get(selection).getRight(), false); 
                cm.sendNext("謝謝你的使用, 你的物品已經退還給你了."); 
                cm.removeHiredMerchantItem(items.get(selection).getLeft()); 
                cm.dispose(); 
            } 
        } 
    } 
} 