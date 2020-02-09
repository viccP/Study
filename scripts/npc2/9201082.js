var slot;

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
            cm.sendOk("想要買的時候再來找我吧！");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
            cm.sendGetNumber("請輸入你想購買的點數. \r\n 點數比值#r1:1000#。\r\n妳目前有#b"+cm.getPlayer().getCSPoints(1) +"#k點\r\n",1,1,2100000);
        } else if (status == 1) {
            slot = selection;
            if (cm.getMeso() < slot*1000){
                cm.sendOk("妳錢不夠唷!!!")
                cm.dispose();
            }else
                cm.modifyNx(slot);
                cm.gainMeso(-slot*1000);
                cm.sendOk("給你點數囉!");
                cm.dispose();
    }
}
} 