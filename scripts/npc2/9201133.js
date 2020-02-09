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
                    if(cm.getMapId() == 677000012){
                        cm.openNpc(9201133,1);
                         /* var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
                        eim.disbandParty();
			cm.getEventManager("dydg").setup("entryPossible", "true");
                        cm.warp(100000000);
                        cm.dispose();*/
                    }else{
			if (cm.haveItem(4032491,2)) {
				cm.sendNext("�������#b������#k��Ѩ�ˡ���\r\n��������ȥ����Ҫ�Ѽ�#v4031232# 30����");
			} else if(cm.haveItem(4032491) < 999){
				                  if(!cm.isLeader()){
                        cm.sendOk("�㲻���鳤��"); 
                        cm.dispose();
                    }else{
			if(cm.haveItem(4031232,30)){ //�����鳤
                            cm.gainItem(4031232,-30);
                            cm.gainItem(4002000,1);
                            cm.warpParty(677000012);
                            cm.dispose();
				cm.sendNextPrev("��ô�����������ˣ������ƺ�����һ�㶼û���ܵ�Ӱ�찡�������ˣ��Ƚ�ȥ��˵��\r\n#b����ˣ� #v4002000#  ��������󹫲�����#rħ�����#b���Ի���#r������#b��");
                                //cm.dispose();
                                //cm.summonMob(9400633,180000,5250,1);
			} else{
				cm.sendNextPrev("��Ҫ�Ѽ�#b30�� #v4031232#");
                                cm.dispose();
			}}
			}}
		} else if (status == 1) {
                    if(!cm.isLeader()){
                        cm.sendOk("�㲻���鳤��"); 
                        cm.dispose();
                    }else{
			if(cm.haveItem(4031232,30)){ //�����鳤
                            cm.gainItem(4031232,-30);
                            cm.gainItem(4002000,1);
                            cm.warp(677000012);
                            cm.dispose();
				cm.sendNextPrev("��ô�����������ˣ������ƺ�����һ�㶼û���ܵ�Ӱ�찡�������ˣ��Ƚ�ȥ��˵��\r\n#b����ˣ� #v4002000#  ��������󹫲�����#rħ�����#b���Ի���#r������#b��");
                                //cm.dispose();
                                //cm.summonMob(9400633,180000,5250,1);
			} else{
				cm.sendNextPrev("��Ҫ�Ѽ�#b30�� #v4031232#");
                                cm.dispose();
			}}
		
                }
	}
}