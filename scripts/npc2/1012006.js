/*
-- MrCoffee JavaScript --
        NPC腳本 
-------------------------
   MrCoffee MapleStory
----- Version Info ------
     Version - 1.0.0 
-------------------------
*/
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
            cm.sendOk("為了幫助更多人管理好自己的裝備我很忙");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
            cm.sendGetNumber("請輸入裝備的順序數字, 我會幫你鎖住他. \r\n 裝備所住後會不能交易,丟掉 所以帳密被知道就不用怕了。\r\n #b[注意：只能用在裝備欄]#k",1,1,100);
        } else if (status == 1) {
            slot = selection;
            item = cm.getChar().itemid(slot);
            if (item==0){
                cm.sendOk("你輸入的物品位置沒有東西!")
                cm.dispose();
            }
            else
                cm.sendYesNo("你要鎖住下面這個裝備嗎？\r\n#i"+item+"# #b#t"+item+"#")
         } else if (status == 2) {
	    cm.getChar().lockitem(slot,true)
            cm.sendOk("裝備：#i"+item+"##b#t"+item+"##k 鎖住了!");
            cm.dispose();
        }
    }
}  
