/* First NPC on Map 0
* By Moogra
*/

function start() {
    if (cm.getChar().getMapId() == 0) {
    cm.sendSimple ("歡迎來到小馬私服. 你要轉啥職業我就送你那職業的裝備！ \r\n#L0##b初新者#k#l \r\n\ #L1##b劍士#k#l \r\n\ #L2##b法師#k#l \r\n\ #L3##b弓箭手#k#l \r\n\ #L4##b盜賊#k#l \r\n\ #L5##b海盜#k#l \r\n\ #L6##b管你選一個,不然別走#k#l");
} else
cm.dispose();
}

function action(mode, type, selection) {
    if (selection > 5) {
        cm.sendSimple("慢慢來 沒關係 .");
        cm.dispose();
    } else {
        switch(selection) {
            case 0: cm.gainItem(2000005, 200); break;
            case 1: cm.gainItem(2000005, 200); break;
            case 2: cm.gainItem(2000005, 200); break;
            case 3: cm.gainItem(2000005, 200); break;
            case 4: cm.gainItem(2000005, 200); break;
            case 5: cm.gainItem(2000005, 200); break;
        }
        cm.warp(910000000);
        cm.worldMessage("『新人公告』：歡迎玩家."+ cm.getChar().getName() +"  來到了 小馬私服世界 裡了,大家以後多多關照他/她吧！");
        cm.resetStats();
        cm.gainMeso(100000);
        cm.addRandomItem(1122058);
        cm.gainItem(1112432, 1);
        cm.sendOk("開始吧!!");
        cm.dispose();
    }
}