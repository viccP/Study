/* Author: Xterminator
	NPC Name: 		Trainer Frod
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if(cm.getC().getChannel() != 2){
                cm.sendOk("所属频道不是2.无法使用！");
                cm.dispsoe();
            }else{
                if (cm.查询boss积分() >= 10000) {
                    cm.sendNext("哟！居然来到这里。是否要召唤遗迹魔王呢？");
                } else {
                    cm.warp(910000000);
                    cm.dispose();
                }
            }
    } else if (status == 1) {
        if (cm.查询boss状态() == 1) {
            cm.关闭boss积分();
            cm.召唤boss语句();
            //int mobid, int HP, int MP, int level, int EXP, int boss, int undead, int amount, int x, int y
              cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"〖公告〗" + " : " + " 注意！！遗迹魔王被召唤出来了！！！！",true).getBytes()); 
//            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[公告]"+"注意！！遗迹魔王被召唤出来了！！！！",true).getBytes()); 
            cm.spawnMonster(9300028,-15,150);
        } else {          
            cm.sendNextPrev("BOSS状态不佳，不愿出来。请你出去吧。");
        }
        cm.dispose();
    }
}
}