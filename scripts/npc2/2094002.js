

importPackage(net.sf.cherry.client);

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
		if (cm.getPlayer().getMapId() == 925100000){
var text = "No1.������Ӧ����������������ط�.ȥ��!\r\n#L0#������һ��#l\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 925100200){
var text = "�����и����ذ���.��ȥ���ռ��ѵ����Ҽ��ɽ�����һ�� ע��ʱ�䣡\r\n#L1#������#l\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 925100400){
var text = "��������,��Ӧ���д��BOSS�Ŀ���!\r\n#L2#������һ��#l\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);

}else if (cm.getPlayer().getMapId() == 925100600){
var text = "��������,��Ӧ���д��BOSS�Ŀ���!\r\n#L3#������һ��#l\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);

}else if (cm.getPlayer().getMapId() == 925100500){
var text = "��������,��Ӧ���д��BOSS�Ŀ���!\r\n\r\n#L4##b�ٻ�BOSS#l\r\n\r\n#L5##r��ȡ����#l#k\r\n\r\n#L6##r��ȥ#l#k\r\n\r\n���ڷ�����ʱ��Ϊ:" + cm.getHour() + "ʱ:" + cm.getMin() + "��:" + cm.getSec() + "��";
cm.sendSimple(text);


}else if (cm.getPlayer().getMapId() == 925100700){
cm.removeAll(4001122);
				cm.removeAll(4001113);
				cm.removeAll(4001114);
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
				
				cm.warp(251010404);
				
				cm.dispose();
}else {//vip1����
var text = "��Ը��������������Ĺ���.�ҵ���";
cm.sendOk(text);
cm.dispose();
}
		}
		else if(status == 1) {
			if (selection == 0) {
if (cm.haveItem(4001113,1)) {
cm.removeAll(4001113);

cm.warp(925100200);
cm.gainExp(+500000);
cm.sendOk("��Ը�����ܼ������.");
cm.dispose();

}else {	
cm.sendOk("#v4001113# ��Ҫ1��, Ŀǰ��������!");
cm.dispose();
}


}else if (selection == 1) {
if (cm.haveItem(4001114,1)) {

cm.removeAll(4001114);
cm.warp(925100400);
cm.gainExp(+700000);
cm.sendOk("��Ը�����ܼ������.");
cm.dispose();

}else {	
cm.sendOk("#v4001114# ��Ҫ1��, Ŀǰ��������!");
cm.dispose();
}
}else if (selection == 2) {
if (cm.haveItem(4001117,10)) {

cm.removeAll(4001117);


cm.gainItem(4001122, 1);
cm.gainExp(+1000000);
cm.warp(925100500);
cm.sendOk("��Ը���ܴ����~");
cm.dispose();
}else {	
cm.sendOk("��Ը���ܼ�����ȥ.���ռ�10��#v4001117#.Ȼ�󽻸���!");
cm.dispose();
}



}else if (selection == 3) {
if (cm.getParty() != null) { 

cm.sendOk("�˴������ɢ����  ���˽���");
cm.dispose();
}else {	

cm.removeAll(4001117);
				cm.removeAll(4001113);
				cm.removeAll(4001114);
				cm.removeAll(4001113);
				cm.removeAll(4001046);
				cm.removeAll(4001047);
				cm.removeAll(4001048);
				cm.removeAll(4001049);
				cm.removeAll(4001063);
				cm.removeAll(4031309);
				cm.removeAll(4001053);
				cm.removeAll(4001054);




cm.warp(925100500,0);
cm.givePartyExp(+377000);
cm.sendOk("��Ը���ܴ����~");
}



}else if (selection == 5) {
if (cm.itemQuantity(4031551) < 1) {
    cm.sendOk("û�б��� ���޷�����СС���");
    cm.dispose();
       } else if (cm.itemQuantity(4031551) > 0) {
                    cm.removeAll(4031551);
                      
cm.summonMob(9600074, 23090909, 6500000, 1);//����5EѪ

cm.serverNotice("���������:[" + cm.getPlayer() + "] �ɹ��ٻ�����һ��СС��, ������ ��������?");             
 
                    
                    cm.dispose();
                } else {
                    cm.sendOk("���鱳���Ƿ���#v4031551# �ں������Ͽɻ��");
                    cm.dispose();
                }                    

}else if (selection == 4) {
if (cm.itemQuantity(4001122) < 1) {
    cm.sendOk("...");
    cm.dispose();
       } else if (cm.itemQuantity(4001122) > 0) {
                    cm.removeAll(4001122);
                      
cm.summonMob(9300119, 800000, 300000, 1);//����5EѪ

          
 
                    
                    cm.dispose();
} 

}else if (selection == 6)  {
cm.removeAll(4001117);
				cm.removeAll(4001113);
				cm.removeAll(4001114);
				cm.removeAll(4001113);
				cm.removeAll(4001046);
				cm.removeAll(4001047);
				cm.removeAll(4001048);
				cm.removeAll(4001049);
				cm.removeAll(4001063);
				cm.removeAll(4031309);
				cm.removeAll(4001053);
				cm.removeAll(4001054);
if(cm.haveItem(4031329,1)){
				cm.gainItem(4001325,+1);
				}
cm.warp(925100700,0);
cm.dispose(); 


}else if (selection == 7) {
cm.sendOk("#v3994026##r�ֽ����ؿ�:#k\r\n   ���ڵ������#b����#k����5��,\r\n#v3994034##r�ֽ����ؿ�:#k\r\n   ���ڵ������#b����#k����4��\r\n   �ر����#b[110��װ��,�������,100%�سɾ�.ϡ������]#k��.\r\n#v3994027##r�ֽ����ؿ�:#k\r\n   �����,��60����,��������װ���ɳ���,���ܼ��Ǿ��������~\r\n   �ر����#b[110��װ��,�������,100%�سɾ�.ϡ������]#k��..\r\n\r\nPs:��Ȼ,Ҳ���Ժͱ���ϡ��ð�յ���ս,����ֻ���Ķӳ����ַ�Ŷ!");
cm.dispose();

}}}}
