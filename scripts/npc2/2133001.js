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
                cm.sendOk("����Ƶ������2.�޷�ʹ�ã�");
                cm.dispsoe();
            }else{
                if (cm.��ѯboss����() >= 10000) {
                    cm.sendNext("Ӵ����Ȼ��������Ƿ�Ҫ�ٻ��ż�ħ���أ�");
                } else {
                    cm.warp(910000000);
                    cm.dispose();
                }
            }
    } else if (status == 1) {
        if (cm.��ѯboss״̬() == 1) {
            cm.�ر�boss����();
            cm.�ٻ�boss���();
            //int mobid, int HP, int MP, int level, int EXP, int boss, int undead, int amount, int x, int y
              cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����桽" + " : " + " ע�⣡���ż�ħ�����ٻ������ˣ�������",true).getBytes()); 
//            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[����]"+"ע�⣡���ż�ħ�����ٻ������ˣ�������",true).getBytes()); 
            cm.spawnMonster(9300028,-15,150);
        } else {          
            cm.sendNextPrev("BOSS״̬���ѣ���Ը�����������ȥ�ɡ�");
        }
        cm.dispose();
    }
}
}