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
        cm.sendNext("#b�A�n, �ڬO ���g.OD.TW �ө��޲z��!#k"); 
    else if (status == 1) 
        cm.sendSimple("�A�Q�n���^���@���O?\r\n#b#L0#����#l    #L1#���~#l"); 
    else if (status == 2) { 
        cm.sendNext("���ڤ@�I�ɶ��j�M�@�U..."); 
        choice = selection; 
    } else { 
        if (choice == 0) { 
            if (status == 3) { 
                var mesoEarnt = cm.getHiredMerchantMesos(); 
                if (mesoEarnt > 0) 
                    cm.sendYesNo("�b�A�����F�ӤH��~�A�Ȩ��F "+mesoEarnt+" ����. �A�Q�n���^������?"); 
                else { 
                    cm.sendNext("�A�S���Ȩ����󷬹�"); 
                    cm.dispose(); 
                } 
            } else if (status == 4) { 
                if (cm.getPlayer().getMeso() + cm.getHiredMerchantMesos() <= 2147483647) { 
                    cm.sendNext("���§A���ϥ�, �A�������w�g�h�ٵ��A�F"); 
                    cm.gainMeso(cm.getHiredMerchantMesos()); 
                    cm.setHiredMerchantMesos(0);
                } else { 
                    cm.sendOk("�A���W�������n�����I�h."); 
                } 
                cm.dispose(); 
            } 
        } else { 
            if (status == 3) { 
                var items = cm.getHiredMerchantItems(); 
                if (items.size() > 0) { 
                    var text = "�п�ܤ@�Ӫ��~\r\n"; 
                    for (var i = 0; i < items.size(); i++) 
                        text += "#L"+i+"##i"+items.get(i).getRight().getItemId()+"##l "; 
                    cm.sendSimple(text); 
                } else { 
                    cm.sendNext("�b�A�����̨S�����󪫫~."); 
                    cm.dispose(); 
                } 
            } else if (status == 4) { 
                var items = cm.getHiredMerchantItems(); 
                if (cm.getC() == null) 
                    cm.getPlayer().dropMessage("Received"); 
                MapleInventoryManipulator.addFromDrop(cm.getC(), items.get(selection).getRight(), false); 
                cm.sendNext("���§A���ϥ�, �A�����~�w�g�h�ٵ��A�F."); 
                cm.removeHiredMerchantItem(items.get(selection).getLeft()); 
                cm.dispose(); 
            } 
        } 
    } 
} 