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
            cm.sendSimple("#r即日起进入副本可以在我这里快捷进入。完成副本后可以获得特殊道具。可以在我这里兑换物品哦！\r\n#b请选择你要的操作！\r\n\r\n#d#L0#副本传送#l\r\n\r\n#L1##b旅游地图传送#l");
        } else if (status == 1) {
            if (selection == 0) {//副本传送
             cm.openNpc(9310019,1);
            } else if (selection == 1) {//旅游传送
              cm.openNpc(9000020,0);
            } else if (selection == 2) {
                cm.openNpc(9310019,3);
            } else if (selection == 3) {
		cm.openNpc(9310019,4);
            }else if(selection == 4){
               cm.openNpc(2103013,0);//万魔塔 id 926010001
//        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"[废弃都市]" + " : " + " [" + cm.getPlayer().getName() + "]与小组开始了地铁挑战。在" + cm.getC().getChannel() + "频道",true).getBytes()); 
                                            
        }	
        }
    }
}


