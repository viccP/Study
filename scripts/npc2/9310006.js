//cherry_MS
importPackage(net.sf.cherry.client);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("����Ϊ�˴�ܴ���������İɣ������㵽����������ڵذɣ�");
		}else if (status == 1) {
			cm.sendNextPrev("һ��Ҫ��ܴ�����򼣬���#b����#kƽ������������");
		}
		else if (status == 2) {
			
					if(cm.getPlayerCount(701010323)==0){
					cm.warp(701010323, 0);
					cm.addMapTimer(600);
					cm.getMap(701010323).addMapTimer(600, 701010320);
					cm.dispose();
				}else{
				cm.sendNextPrev("����������ִ���������ң����Ժ��ڳ��Խ��롣");
				cm.dispose();
				}
		}
		else{
				cm.sendOk("�������ɡ�");
				cm.dispose();
		}
	}
}	
