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
            text += "#L1##b○使用【提升怪物物理攻击】        【消耗CP：17】#l\r\n\r\n";//1
            text += "#L2##b○使用【提升怪物物防御力】        【消耗CP：16】#l\r\n\r\n";//1
            text += "#L3##b○使用【提升怪物魔法攻击】        【消耗CP：17】#l\r\n\r\n";//1
            text += "#L4##b○使用【提升怪物魔防御力】        【消耗CP：16】#l\r\n\r\n";//1
            text += "#L8##b○使用【提升怪物物理免疫】        【消耗CP：35】#l\r\n\r\n";//1
            text += "#L9##b○使用【提升怪物魔法免疫】        【消耗CP：35】#l\r\n\r\n";//1

            cm.sendSimple(text);
        } else if (selection == 1) { //提升怪物物理攻击
            cm.MonsterCarnival(2, 0);
        } else if (selection == 2) {  //提升怪物物防御力
            cm.MonsterCarnival(2, 1);
        } else if (selection == 3) { //提升怪物魔法攻击
            cm.MonsterCarnival(2, 2);
        } else if (selection == 4) { //提升怪物魔防御力
            cm.MonsterCarnival(2, 3);
        } else if (selection == 5) { //
            cm.MonsterCarnival(2, 4);
        } else if (selection == 6) { //
            cm.MonsterCarnival(2, 5);
        } else if (selection == 7) { //
            cm.MonsterCarnival(2, 6);
        } else if (selection == 8) { //提升怪物物理免疫
            cm.MonsterCarnival(2, 7);
        } else if (selection == 9) { //提升怪物魔法免疫
            cm.MonsterCarnival(2, 8);
        }
    }
}


