importPackage(net.sf.odinms.client);

var slot;
var item;
var qty;


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
            cm.sendGetNumber("請輸入裝備的順序數字, 我將為你解鎖它. \r\n 裝備解鎖後裝備可以交易,可以丟棄。\r\n #b[注意：此功能只可使用與裝備欄！]#k",1,1,100);
        } else if (status == 1) {
            slot = selection;
            item = cm.getChar().itemid(slot);
            if (item==0){
                cm.sendOk("你輸入的物品位置沒有裝備!")
                cm.dispose();
            }
            else
                cm.sendYesNo("你確定要解鎖下面這件裝備嗎？\r\n#i"+item+"# #b#t"+item+"#")
        } else if (status == 2) {
            cm.getChar().lockitem(slot,false)
            cm.sendOk("裝備：#i"+item+"##b#t"+item+"##k 解鎖成功!\r\n");
            cm.dispose();
        }
    }
} 