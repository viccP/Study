importPackage(java.util);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server);

var slot;
var item;
var qty;
var status = 0;
var display;
var needap = 1000;

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
            cm.sendOk("妳身上沒有黃色復活蛋唷?！");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
            cm.sendGetNumber("請輸入妳要兌換的顆數. \r\n 所需物品為#i2022065#\r\n#r一顆兌換10W 請注意身上的錢#k",1,1,100);
        } else if (status == 1) {
            slot = selection;
            item = 2022065;
            if (item==0){
                cm.sendOk("妳身上沒有該物品!")
                cm.dispose();
            }else
                cm.sendYesNo("你確定要兌換嗎?你將獲得#r"+100000*slot+"#k元")
        } else if (status == 2) {
            if (cm.getChar().getMeso() >= 2000000000) {
                cm.sendNext("抱歉,你身上的超過20e");
                cm.dispose();
            }else{
                cm.gainItem(2022065, -slot)
                cm.gainMeso(100000*slot) 
                
                    
                    cm.sendOk("#b恭喜你成功拉!快快看你的包裹吧!#k");
                
                
                cm.dispose();
            }
    }
}
} 