//cherry_MS
importPackage(net.sf.cherry.client);

var status = 0;
var job;
var sky2shengdi=new Array(200090020, 200090022,200090024,200090026,200090028,200090040,200090042,200090044,200090046,200090048);
var shengdi2sky=new Array(200090021,200090023,200090025,200090027,200090029,200090041,200090043,200090045,200090047,200090049);

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
			status=2;
			cm.sendYesNo("������������������˵�����������������뿪���֮�ǣ�ǰ����ĵ������������Ҵ�������ǰ��#bʥ��#k�����Ǹ�����������Ҷ��΢�紵���ˮ�ġ������ġ���ס�����޺�Ů�ʵĵط�����Ҫȥʥ����\r\n\r\n�ƶ�ʱ���Լ��#b7����#k��������#b5000#k��ҡ�");
		}
		else if (status == 1) {
			cm.sendOk("����ȥ�Ļ������ˡ�����������");
			cm.dispose();
		}
		else if (status == 2) {
			cm.sendOk("лл");
			cm.dispose();
		}
		else if (status == 3) {
			if(cm.getMeso()<1000){
				cm.sendOk("�ܱ�Ǹ�����Ľ�Ҳ��㣬���ǲ��������ȥŶ��");
				cm.dispose();
			}
			for(var i=0;i< sky2shengdi.length; i++){
				if(cm.getPlayerCount(sky2shengdi[i])==0){
					cm.gainMeso(-5000);
					cm.warp(sky2shengdi[i], 0);
					cm.addMapTimer(420);
					cm.getMap(sky2shengdi[i]).addMapTimer(420, 130000210);
					cm.dispose();
					return;
				}
			}			
				cm.sendOk("�ܱ�Ǹ��������������-0-�����Ե����Ի��߻������ԡ�");
				cm.dispose();

		}
	}
}	
