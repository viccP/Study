var 爱心 = "#fEffect/CharacterEff/1022223/4/0#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 正方形 = "#fUI/UIWindow/Quest/icon3/6#";
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "精灵吊坠，佩戴即可获得经验加成30%，立刻生效哦！升级必备哦，快快购买吧!\r\n\r\n";
            text += "" + 蓝色箭头 + "#L1##r#v1122017##z1122017#\t使用权：3小时\t需要点卷：300点\r\n\r\n"//3
            text += "" + 蓝色箭头 + "#L2##r#v1122017##z1122017#\t使用权：10小时\t需要点卷：600点\r\n\r\n"//3
            text += "" + 蓝色箭头 + "#L3##r#v1122017##z1122017#\t使用权：1天\t需要点卷：1200点\r\n\r\n"//3
            text += "" + 蓝色箭头 + "#L4##r#v1122017##z1122017#\t使用权：7天\t需要点卷：6000点\r\n\r\n"//3
            cm.sendSimple(text);
            }
        } else if (selection == 1) {
if (cm.getPlayer().getCSPoints(1) >= 300) {
cm.gainNX(-300);
cm.gainItem(1122017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功购买精灵坠子3小时使用权！");
            cm.dispose();
			}else{
            cm.sendOk("道具不足无法换购！");
            cm.dispose();
			}
        } else if (selection == 2) {
if (cm.getPlayer().getCSPoints(1) >= 600) {
cm.gainNX(-600);
cm.gainItem(1122017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功购买精灵坠子10小时使用权！");
cm.dispose();
}else{
cm.sendOk("道具不足无法换购！");
cm.dispose();
}
        } else if (selection == 3) {
if (cm.getPlayer().getCSPoints(1) >= 1200) {
cm.gainNX(-1200);
cm.gainItem(1122017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功购买精灵坠子1天使用权！");
cm.dispose();
}else{
cm.sendOk("道具不足无法换购！");
cm.dispose();
}
        } else if (selection == 4) {
if (cm.getPlayer().getCSPoints(1) >= 6000) {
cm.gainNX(-6000);
cm.gainItem(1122017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功购买精灵坠子7天使用权！");
cm.dispose();
}else{
cm.sendOk("道具不足无法换购！");
cm.dispose();
}
		}
    }
}


