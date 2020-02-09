importPackage(java.util);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server);

//||

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
            cm.sendOk("妳身上沒有#t4032733#唷?！");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
            cm.sendGetNumber("請輸入妳要兌換的張數. \r\n 所需物品為#i4032733#\r\n#r一個兌換5W 請注意身上的錢#k",1,1,1000);
        } else if (status == 1) {
            slot = selection;
            item = 4032733;
            if (cm.haveItem(4032733)&& cm.getChar().getMeso() <= 2000000000){
                cm.gainItem(4032733, -slot);
                cm.gainMeso(50000*slot);
                cm.sendOk("獲得#r"+50000*slot+"#k元");
                cm.dispose();
            }else{
               cm.sendOk("妳身上沒有該物或是你身上的超過20e");
                cm.dispose();
}
        //} else if (status == 2) {
            //if (cm.getChar().getMeso() >= 2000000000) {
                //cm.sendOk("抱歉,你身上的超過20e");
                //cm.dispose();
            //}else{
               // cm.gainItem(4032733, -slot)
               // cm.gainMeso(50000*slot) 
                
                    
                   // cm.sendOk("#b恭喜你成功拉!快快看你的包裹吧!#k");
                
                
               // cm.dispose();
            //}
    }
}
} 