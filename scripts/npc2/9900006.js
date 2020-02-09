var 礼包物品 = "#v1302000#";
var x1 = "1302000,+1";// 物品ID,数量
var x2;
var x3;
var x4;

function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            if(cm.CPQMap() == false){
                cm.sendOk("你没在嘉年华副本内.无法使用！");
                cm.dispsoe();
            }
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "嘉年华副本CP值显示：\r\n";
            if (cm.getPlayer().getTeam() == 0) {
                text += "【我方】队伍总CP值：" + cm.CPQgdcp(0) + "\r\n"
                text += "【我方】队伍可用CP值：" + cm.CPQkycp(0) + "\r\n"
                text += "-------------------------------------\r\n"
                text += "【敌方】方队伍总CP值：" + cm.CPQgdcp(1) + "\r\n"
                text += "【敌方】方队伍可用CP值：" + cm.CPQkycp(1) + "\r\n"
            } else if (cm.getPlayer().getTeam() == 1) {
                text += "【我方】队伍总CP值：" + cm.CPQgdcp(1) + "\r\n"
                text += "【我方】队伍可用CP值：" + cm.CPQkycp(1) + "\r\n"
                text += "-------------------------------------\r\n"
                text += "【敌方】方队伍总CP值：" + cm.CPQgdcp(0) + "\r\n"
                text += "【敌方】方队伍可用CP值：" + cm.CPQkycp(0) + "\r\n"
            }
            text += "#L1##b○召唤怪物(给敌方召唤)#l\r\n\r\n";//1
            text += "#L2##d○使用封印(封印敌方玩家)#l\r\n\r\n"//2
            text += "#L3##b○召唤物(暂且不知道干嘛的)#l\r\n\r\n"//3

            cm.sendSimple(text);
        } else if (selection == 1) { //召唤怪物
            cm.openNpc(9900004, 1234567);
        } else if (selection == 2) {  //使用封印
            cm.openNpc(9900004, 12345678);
        } else if (selection == 3) { //召唤物
            cm.openNpc(9900004, 12345679);
        }
    }
}


