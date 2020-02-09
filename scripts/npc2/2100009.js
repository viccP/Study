importPackage(java.util);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server);

var slot;
var item;
var qty;
var status = 0;
var display;
var needap = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status <= 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("為了幫助更多的人管理好自己的裝備,我非常的忙！");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
			//if(cm.getChar().isGM() == 0) {
				//cm.sendOk("你不是GM! 無法使用此功能");
				//cm.dispose();
			//} else {
            cm.sendGetNumber("請輸入裝備的順序數字, 我將為你在它身上增加1捲. \r\n 裝備增加捲數所需物品為#r#t5570000##k#i5570000#。\r\n#b[注意：此功能只可使用與裝備欄！]#k",1,1,100);
//}

        } else if (status == 1) {
            slot = selection;
            item = cm.getChar().itemid(slot);
            if (item==0 || item==1122000 || item==1122076 || item==1012164 || item==1012167 || item==1012168 || item==1012169 || item==1012170 || item==1012171 || item==1012172 || item==1012173 || item==1012174 || item==1112405 || item==1112413 || item==1112414 || item==1112445 || item==1122024 || item==1122025 || item==1122026 || item==1122027 || item==1122028 || item==1122029 || item==1122030 || item==1122031 || item==1122032 || item==1122033 || item==1122034 || item==1122035 || item==1122036 || item==1122037 || item==1122038 || item==1122058){
                cm.sendOk("你輸入的物品位置沒有裝備或是該裝備不能敲!")
                cm.dispose();
            }else
                cm.sendYesNo("你確定要把下面這件裝備增加捲數嗎？\r\n#i"+item+"# #b#t"+item+"#")
        } else if (status == 2) {
            var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot).copy();
            if (cm.haveItem(5570000,1) && item.getVicious() <2) {
                var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot).copy();
                    cm.gainItem(5570000,-1);
                    item.setVicious((item.getVicious() + 1 ));
                    item.setUpgradeSlots((item.getUpgradeSlots() + 1 ));
                    MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, slot, 1, true);
                    MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item);
                    cm.sendOk("成功增加捲,敲了#r"+item.getVicious()+"#k次,#r一件裝備只能敲2次#k");
                cm.dispose();
            }else{
                cm.sendOk("抱歉,你沒有黃金鐵鎚或是裝備已經敲過2次了,該裝已敲了#r"+item.getVicious()+"#k次");
                cm.dispose();
            }
    }
}
} 