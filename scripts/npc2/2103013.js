/*
 * 
 * @wnms
 * @大擂台传送副本npc
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var 冒险币 = 5000;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("副本都在这……");
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
            cm.sendSimple("#b#e   \t\t※▁▂▃▅▆▇万魔塔▇▆▅▃▂▂※\r\n\t\t▇▇▇\r\n\r\n#n#b这是一个危险的挑战..你想去挑战?\r\n#d完成后可以获得：\r\n#e\t大量经验、大量冒险币、大量点卷、积分奖励\r\n#n请选择你要参与的模式：\r\n#L1##i3994115##b队伍2~6人[每人300枫叶]Lv50以上\r\n\r\n#L2##i3994116#队伍2~6人[每人800枫叶]Lv80以上#l\r\n\r\n#L3##i3994117#队伍2~6人[每人1500枫叶]Lv120以上#l");
        } else if (status == 1) {
            if (selection == 0) {//万魔塔简单            
cm.openNpc(9310019,6);
            } else if (selection == 1) {//万魔塔普通                
cm.openNpc(9310019,6);
            } else if (selection == 2) {//万魔塔困难
                cm.openNpc(2103013,2);
            } else if (selection == 3) {
		cm.openNpc(9310019,4);
            }else if(selection == 4){
               cm.openNpc(9310019,7);//万魔塔 id 926010001

                                            
        }	
        }
    }
}


