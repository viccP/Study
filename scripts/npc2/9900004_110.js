
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if(cm.getmd5data() <= 0){
                //cm.sendOk("系统检测到程序非法。请检查是否关闭登录器和运行外挂程序！");
                //cm.sendOk("系统检测到程序非法。请检查是否关闭登录器和运行外挂程序！");
                //cm.sendOk("玩家你好，当你看到这个信息的时候。我就在你的身后.");
cm.dispose();
                
            }else{
            cm.setmd5data(-1);
            cm.dispose();
        }}
    }
}