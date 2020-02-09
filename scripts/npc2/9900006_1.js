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
            text += "#L1##b○召唤【玩具棕熊】【消耗CP：7】#l\r\n\r\n";//1
            text += "#L2##b○召唤【吹泡泡双鱼】【消耗CP：7】#l\r\n\r\n";//1
            text += "#L3##b○召唤【水老鼠】【消耗CP：8】#l\r\n\r\n";//1
            text += "#L4##b○召唤【小恶魔】【消耗CP：8】#l\r\n\r\n";//1
            text += "#L5##b○召唤【木马骑兵】【消耗CP：9】#l\r\n\r\n";//1
            text += "#L6##b○召唤【闹钟啾啾】【消耗CP：9】#l\r\n\r\n";//1
            text += "#L7##b○召唤【女机器人】【消耗CP：10】#l\r\n\r\n";//1
            text += "#L8##b○召唤【青积木怪】【消耗CP：11】#l\r\n\r\n";//1
            text += "#L9##b○召唤【恶魔之母】【消耗CP：12】#l\r\n\r\n";//1
            text += "#L10##b○召唤【战甲吹泡泡鱼】【消耗CP：30】#l\r\n\r\n";//1

            cm.sendSimple(text);
        } else if (selection == 1) { //玩具棕熊
            cm.MonsterCarnival(0, 1);
        } else if (selection == 2) {  //吹泡泡双鱼
            cm.MonsterCarnival(0, 2);
        } else if (selection == 3) { //水老鼠
            cm.MonsterCarnival(0, 3);
        } else if (selection == 4) { //小恶魔
            cm.MonsterCarnival(0, 4);
        } else if (selection == 5) { //木马骑兵
            cm.MonsterCarnival(0, 5);
        } else if (selection == 6) { //闹钟啾啾
            cm.MonsterCarnival(0, 6);
        } else if (selection == 7) { //女机器人
            cm.MonsterCarnival(0, 7);
        } else if (selection == 8) { //青积木怪
            cm.MonsterCarnival(0, 8);
        } else if (selection == 9) { //恶魔之母
            cm.MonsterCarnival(0, 9);
        } else if (selection == 10) { //战甲吹泡泡鱼
            cm.MonsterCarnival(0, 10);
        }
    }
}


