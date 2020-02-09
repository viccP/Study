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
            text += "#L1##b○使用【黑暗】        【消耗CP：17】#l\r\n\r\n";//1
            text += "#L2##b○使用【虚弱】        【消耗CP：19】#l\r\n\r\n";//1
            text += "#L3##b○使用【诅咒】        【消耗CP：12】#l\r\n\r\n";//1
            text += "#L4##b○使用【中毒】        【消耗CP：19】#l\r\n\r\n";//1
            text += "#L5##b○使用【缓慢】        【消耗CP：16】#l\r\n\r\n";//1
            text += "#L6##b○使用【封印】        【消耗CP：14】#l\r\n\r\n";//1
            text += "#L7##b○使用【眩晕】        【消耗CP：22】#l\r\n\r\n";//1
            text += "#L8##b○使用【取消buff】    【消耗CP：18】#l\r\n\r\n";//1

            cm.sendSimple(text);
        } else if (selection == 1) { //黑暗
            cm.MonsterCarnival(1, 0);
        } else if (selection == 2) {  //虚弱[不能跳]
            cm.MonsterCarnival(1, 1);
        } else if (selection == 3) { //诅咒
            cm.MonsterCarnival(1, 2);
        } else if (selection == 4) { //中毒
            cm.MonsterCarnival(1, 3);
        } else if (selection == 5) { //缓慢
            cm.MonsterCarnival(1, 4);
        } else if (selection == 6) { //封印
            cm.MonsterCarnival(1, 5);
        } else if (selection == 7) { //眩晕
            cm.MonsterCarnival(1, 6);
        } else if (selection == 8) { //取消buff
            cm.MonsterCarnival(1, 7);
        }
    }
}


