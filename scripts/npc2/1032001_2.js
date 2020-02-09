
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.读取任务ID() == 130 && cm.读取任务进度() == 1) {
                cm.sendNext("你....找我何事?"); //第一句提示语句
            }else if (cm.读取任务ID() == 140 && cm.读取任务进度() == 1 && cm.getPlayer().getmodsl() == 0) {
                cm.sendOk("看来不错，通过了我的小考验。。但是精彩的还在后面呢。。。升级到50级后请去找浪漫！\r\n任务奖励：EXP 1000 MESO 2000");
                cm.gainExp(+1000);
                cm.gainMeso(+2000);
                cm.主线任务更新内容("看来一步一步恢复力量并不简单。要升级到50才可以。\r\n#r当前等级进度："+cm.getLevel()+"/50");
                cm.getPlayer().setmodid(0);
                cm.getPlayer().setmodsl(0);
                cm.主线任务更新ID(150);
                cm.主线任务更新进度(1);
                cm.dispose();
            }
        } else if (status == 1) {   //开始启动下一项
            cm.sendNextPrev("前辈..是先知让我来找您的.",2);
        } else if (status == 2) {   //最后一句显示语句
            cm.sendNext("又来了一个？让我想想……你是第776....777...778...我都数不清了..那老家伙次次都推荐一些无关紧要的人过来..");
        } else if (status == 3) {
            cm.sendNext("…………", 2);
        } else if (status == 4) {
            cm.sendNext("算了...按照老规矩吧..证明你是否真的经得住考验..");
        } else if (status == 5) {
            cm.sendNext("我就是那个穿着滑板鞋降临到风之大陆的救世主！", 2);
        } else if (status == 6) {
            cm.sendNext("啧啧啧……还穿滑板鞋呢..你滑板鞋呢..口说无凭的东西不要乱说...你让我怎么相信你？");
        } else if (status == 7) {
            cm.sendNext("我愿意接受一切考验！",2);
        } else if (status == 8) {
            cm.sendNext("小伙子勇气可嘉，那我就小小的考验你吧。\r\n听指！");
        } else if (status == 9) {
            cm.sendOk("击败 猪猪 50只！！消灭后向汉斯报告！");
            cm.主线任务更新内容("这次需要我击败猪猪50只。不过没问题，小意思！\r\n已消灭猪猪："+cm.getPlayer().getmodsl()+"/50");
            cm.getPlayer().setmodid(1210100);
            cm.getPlayer().setmodsl(50);
            cm.主线任务更新ID(140);
            cm.主线任务更新进度(1);
            cm.dispose();
        }        
    } 
 
}
