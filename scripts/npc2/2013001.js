/*��Ҫ�ű�����,����ϵQQ��13535330294.*/

importPackage(net.sf.odinms.client);

var status;


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	} else {
		if (mode == 1)
			status++; 
		else
			status--;
		if (status == 0) {
		if (cm.getPlayer().getMapId() == 920010000){
var text = "No1.������Ӧ����������������ط�.ȥ��!\r\n#L0#������һ��#l\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 920010400){
var text = "��������ȥ,Ȼ���ռ�1�����ֵ���.�����Ҽ�����ɱ���.\r\n#L1#������#l\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 920010600){
var text = "��������,��Ӧ���д��BOSS�Ŀ���!\r\n#L2#������һ��#l\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);

}else if (cm.getPlayer().getMapId() == 920010200){
var text = "��������,��Ӧ���д��BOSS�Ŀ���!\r\n#L3#������һ��#l\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);

}else if (cm.getPlayer().getMapId() == 920010800){
var text = "��������,��Ӧ���д��BOSS�Ŀ���!\r\n\r\n#L4##b�ٻ�Զ�ž���#l\r\n\r\n#L5##r��ȡ����#l#k\r\n\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);


}else if (cm.getPlayer().getMapId() == 920011200){
cm.removeAll(4001050);
				cm.removeAll(4001051);
				cm.removeAll(4001052);
				cm.removeAll(4001044);
				cm.removeAll(4001045);
				cm.removeAll(4001046);
				cm.removeAll(4001047);
				cm.removeAll(4001048);
				cm.removeAll(4001049);
				cm.removeAll(4001063);
				cm.removeAll(4031309);
				cm.removeAll(4001053);
				cm.removeAll(4001054);
				cm.removeAll(4001056);
				
				cm.warp(200080101);
				
				cm.dispose();
}else {//vip1����
var text = "��Ը��������������Ĺ���.�ҵ���";
cm.sendOk(text);
cm.dispose();
}
		}
		else if(status == 1) {
			if (selection == 0) {
if (cm.getHour() < 0) {
cm.sendOk("�����ʱ��,�����ж�,�㽫������.\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��");

cm.dispose();
}else if (cm.getHour() > 99) {
cm.warp(910000000,0);
cm.sendOk("�����ʱ��,�����ж�,�㽫������.\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��");

cm.dispose();
}else if (cm.haveItem(4001063,20)) {
cm.getMap(920010400).addMapTimer(900, 200080101);
cm.gainItem(4001063,-20);
cm.gainItem(4001056,+3);
cm.warpParty(920010400);
cm.givePartyExp(+500000);
cm.sendOk("��Ը�����ܼ������.ֱ�ӵ��Ҵ�����һ");
cm.dispose();

}else {	
cm.sendOk("#v4001063# ��Ҫ20��, Ŀǰ��������!");
cm.dispose();
}


}else if (selection == 1) {
if (cm.getHour() < 0) {
cm.sendOk("�����ʱ��,�����ж�,�㽫������.\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��");

cm.dispose();
}else if (cm.getHour() > 99) {
cm.warp(910000000,0);
cm.sendOk("�����ʱ��,�����ж�,�㽫������.\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��");

cm.dispose();
}else if (cm.haveItem(4001056,1)) {
cm.removeAll(4001056);

cm.warpParty(920010200);
cm.givePartyExp(+300000);
cm.sendOk("��Ը�����ܼ������.");
cm.dispose();

}else {	
cm.sendOk("#v4001056# ��Ҫ1��, Ŀǰ��������!");
cm.dispose();
}
}else if (selection == 2) {
if (cm.getHour() < 0) {
cm.warp(910000000,0);
cm.sendOk("�����ʱ��,�����ж�,�㽫������.\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��");

cm.dispose();
}else if (cm.getHour() > 99) {
cm.warp(910000000,0);
cm.sendOk("�����ʱ��,�����ж�,�㽫������.\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��");
cm.dispose();
}else if (cm.haveItem(4001050,40)) {
cm.getMap(920010200).addMapTimer(900, 200080101);
cm.gainItem(4001050,-40);
cm.warpParty(920010200);
cm.givePartyExp(+500000);
cm.sendOk("��Ը���ܴ����~");
cm.dispose();
}else {	
cm.sendOk("��Ը���ܼ�����ȥ.���ռ�40��#v4001050#.Ȼ�󽻸���!");
cm.dispose();
}



}else if (selection == 3) {
if (cm.getHour() < 0) {
cm.warp(910000000,0);
cm.sendOk("�����ʱ��,�����ж�,�㽫������.\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��");

cm.dispose();
}else if (cm.getHour() > 99) {
cm.warp(910000000,0);
cm.sendOk("�����ʱ��,�����ж�,�㽫������.\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��");
cm.dispose();
}else if (cm.haveItem(4001052,30)) {
cm.getMap(920010800).addMapTimer(900, 200080101);
cm.gainItem(4001052,-30);

cm.gainItem(4001049,1);

cm.warpParty(920010800);
cm.givePartyExp(+200000);
cm.sendOk("��Ը���ܴ����~");
cm.dispose();
}else {	
cm.sendOk("��Ը���ܼ�����ȥ.���ռ�30��#v4001052#.Ȼ�󽻸���!");
cm.dispose();
}



}else if (selection == 4) {
if (cm.itemQuantity(4001054) < 50) {
    cm.sendOk("���ҵ�#v4001054# ��������Ļ����ɱ��� ��Ҫ50���������Ѿ�ˢ�����ˣ�");
	
    cm.dispose();
       } else if (cm.itemQuantity(4001054) > 49 && cm.isLeader()) {
                   // cm.gainItem(4001049,-1); 
                    cm.gainItem(4001054,-50);  
cm.summonMob(9300039, 1500000, 450000, 1);//����5EѪ

cm.serverNotice("��Ů���������:[" + cm.getPlayer() + "] �ɹ��ٻ�����Զ�ž���,�����ܷ���Զ�ž��� �ȳ�Ů����?");             
 
                    
                    cm.dispose();
                } else {
                    cm.sendOk("���鱳���Ƿ���#v4001049# ����һ��ͨ��ʱ�ɻ��\r\n�����㲻�Ƕӳ���");
                    cm.dispose();
                }                    

}else if (selection == 5) {
if (!cm.haveItem(4001045,1)) {
cm.sendOk("������ѡ����������ؿ�.������Զ�ž���,�ȳ�Ů��!!!");
cm.dispose();
}else { 
var eim = cm.getPlayer().getEventInstance();
				if (eim == null) {
					cm.removeAll(4001045);
cm.warpParty(920011300);
cm.showEffect("quest/party/clear");//����ͨ��Ч��
cm.dispose(); 
				} else if (cm.isLeader()) {
					eim.disbandParty();
					cm.getEventManager("LudiPQ").setProperty("entryPossible", "true");
				} else {
			cm.sendOk("����ӳ�������˵!");
				}
//cm.getMap(920011100).addMapTimer(60, 920011300);
cm.removeAll(4001045);
cm.warpParty(920011300);
cm.showEffect("quest/party/clear");//����ͨ��Ч��
cm.dispose(); 
} 

}else if (selection == 6)  {
if (!cm.haveItem(3994027,1)) {
cm.sendOk("������ѡ����������ؿ�.!");
cm.dispose();
}else { 
cm.gainItem(4031454, 1);
cm.gainItem(3994027, -1);
cm.dispose(); 
} 

}else if (selection == 7) {
cm.sendOk("#v3994026##r�ֽ����ؿ�:#k\r\n   ���ڵ������#b����#k����5��,\r\n#v3994034##r�ֽ����ؿ�:#k\r\n   ���ڵ������#b����#k����4��\r\n   �ر����#b[110��װ��,�������,100%�سɾ�.ϡ������]#k��.\r\n#v3994027##r�ֽ����ؿ�:#k\r\n   �����,��60����,��������װ���ɳ���,���ܼ��Ǿ��������~\r\n   �ر����#b[110��װ��,�������,100%�سɾ�.ϡ������]#k��..\r\n\r\nPs:��Ȼ,Ҳ���Ժͱ���ϡ��ð�յ���ս,����ֻ���Ķӳ����ַ�Ŷ!");
cm.dispose();

}}}}
