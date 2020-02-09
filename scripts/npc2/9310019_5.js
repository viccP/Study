var status = 0;
var selectedType = -1;
var selectedItem = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
    } else {
        status++;
        var map = 541010000;
        if (status == 0) {
            var selStr = "是否想进入挑战的副本呢?奖励丰厚,可以获得#b经验值,#r点卷,#d装备道具#k哦!\r\n\t\t\t\t#b<----个人信息----->#k\r\n#r<-等级："+cm.getLevel()+"->#k\t#r<-进入："+cm.getBossLog("fb")+"->\t#d<-积分："+cm.读取积分()+"->#k";
            var pvproom = new Array(
                "\r\n "+
                cm.getPvpRoom("#b幽灵船１<等级:50>#r",map, 0)+"\r\n\r\n",
                cm.getPvpRoom("#b幽灵船２<等级:55>#r",map+10, 1)+"\r\n\r\n",
                cm.getPvpRoom("#b幽灵船３<等级:63>#r",map+20, 2)+"\r\n\r\n",
                cm.getPvpRoom("#b幽灵船４<等级:65>#r",map+30, 3)+"\r\n\r\n",
                cm.getPvpRoom("#b幽灵船５<等级:72>#r",map+40, 4)+"\r\n\r\n",
                cm.getPvpRoom("#b幽灵船６<等级:80>#r",map+50, 5)+"\r\n\r\n",
                cm.getPvpRoom("#b幽灵船７<等级:85>#r",map+60, 6));
            for (var i = 0; i <1; i++) {
                selStr += "" + pvproom + "";
            }
            cm.sendSimple(selStr);
        } else if (status == 1) {
            selectedroom = selection;
            var pvproom2 = new Array(0,10,20,30,40,50,60,7);
            if (cm.getCharQuantity(map+pvproom2[selectedroom]) == 0) {
                
                cm.getMap(map+pvproom2[selectedroom]).addMapTimer(600, 701000210);//强制加时间的地图ID,时间,时间到后传送出去的地图ID
                cm.warp(map+pvproom2[selectedroom]);
                cm.setBossLog("fb");
                cm.Charnotice(1, "成功创建副本！规定时间内可以进入1名角色。");
                cm.dispose();
            } else if (cm.getCharQuantity(map+pvproom2[selectedroom]) == 2) {
                cm.sendOk("该房间人数已满！");
                cm.dispose();
            } else {
                cm.warp(map+pvproom2[selectedroom]);
                cm.dispose();
            }
        }
    }
} 