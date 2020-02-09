var status = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0) {
        cm.sendYesNo("你要去聊天嗎? 就是可以互相哈啦的地方!");
        status++;
    } else {
       if ((status == 1 && type == 1 && selection == -1 && mode == 0) || mode == -1) {
            cm.dispose();
        } else {
            if (status == 1) {
                cm.sendNext ("好吧,祝你在那邊哈啦的愉快XD!");
                status++
            } else if (status == 2) {
                cm.warp(980000010, 0);
                cm.dispose();
            }
        }
    }
}  