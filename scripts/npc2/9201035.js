//地圖0 Sera

var status;

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == 1 || mode == 0)
                status++;
        else {
                cm.dispose();
                return;
        }

        if (status == 0){
                cm.sendNext("我即將把你傳送到#b維多利亞港#k/r/n同時我也會送你一些#r新手的禮物#k");
        } else if (status == 1) {
          var NPSGPA = cm.getNPSGFS();
		if(NPSGPA == 0 ){
                cm.gainItem(4031454 ,400); //獎盃400個
                cm.gainMeso(100000000); //楓幣一億
                cm.takeNPSGFS();//兌換一次
                cm.warp(910000000);//傳送到維多利亞港
                cm.dispose();//結束對話
            } else {
                cm.sendOk("你不是新手?那你是怎麼來的?發生BUG了吧?要回報喔!");//測試用對話
                cm.dispose();//結束對話
            }
        }
}