var redArrow = "#fUI/UIWindow/Quest/icon6/7#";
var bluePoint = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
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
            var text = "";
		    text += " \t\t\t  #e#d欢迎来到#r豆豆冒险岛#k#n              \r\n           #v3994071##v3994066##v3994078##v3994071##v3994082##v3994062#\r\n"
            text += "\t\t\t#e#d当前在线时间："+cm.getGamePoints()+"分钟！#k#n\r\n"
            text += "\t\t\t#e#d当前点卷余额:#r" + cm.getPlayer().getCSPoints(1) + "#n\r\n";
            text += "#L1##b" + redArrow + "快捷传送#l#l#L2##b"  + "#L3##b" + redArrow + "快捷商店#l\r\n\r\n"
		    cm.sendSimple(text);
        } else{
        	//快捷传送
        	if (selection == 1) {
        		 cm.openNpc(9900004, 1);
            }else if (selection == 3) { //快捷商店
                cm.openShop(30);
    			cm.dispose();
            } 
        }
    }
}