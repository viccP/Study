//CherryMS LoveMXD
//��ĩ�����н�����
var status = 0;
var xiangliao = 1000;
var jinianpin = 1500;
var kaomanyu = 2000;
var shayu = 3000;
var wuya = 1500;
var mesos1 = "+cm.itemQuantity(3994090)+";
var mainmenu = "�����н�����#p9209000#������Գ������ڼ���������Ļ���\r\n\r\n#b#L0#������Ʒ\r\n#L1#����ʲô������#k";
var menu = "ѡ����Ҫ���۵���Ʒ\r\n\r\n#b#L0##i3994090#������(ʵʱ��"+xiangliao+"Ԫ) \r\n#L1##i3994091#��̩������Ʒ(ʵʱ��"+jinianpin+"Ԫ) \r\n#L2##i3994092#��������(ʵʱ��"+kaomanyu+"Ԫ)\r\n#L3##i3994093#������걾(ʵʱ��"+shayu+"Ԫ)\r\n#L4##i3994094#����ѻ��ëñ("+wuya+")Ԫ"
var menu1 = "#b\r\n#L0#�ţ��������"

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.dispose();
		return;
	} else if (status == 2 && mode == 0) {
		cm.sendNext("�š����������ʲô������������ҡ��һ���������㡣");
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendSimple(mainmenu);
	} else if (status == 1) {
		if (selection == 0) { // ������Ʒ
			status = 7;
			cm.sendNext("�š������ҿ�������ʲô����������");
		} else if (selection == 1) { // ����ʲô������
                                         if (cm.MissionStatus(9209000,999,0,4)) {//����Ƿ�ӹ�������
                                         if (cm.MissionStatus(9209000,999,0,0)) {//����Ƿ����������
                                         cm.sendOk("�ٺ٣����͸���Ķ������ðɡ���")
                                         }else if(cm.haveItem(4000021,100) && cm.haveItem(4000017,10) && cm.haveItem(4000002,100)){//����Ƥ100������ͷ10����������
                                         cm.sendOk("�ۡ�������������������Ҫ�Ķ������𣡣��������ҿ��Ժú�ȥ�����ˣ���Ϊ�˱����㣡�Ҿ�������һ������²¿���ʲô�ɣ���")
                                         var rand = Math.floor(Math.random() * 5);
                                                        if (rand == 1){ 
                                                        cm.gainItem(4290000,1)
                                                        }else{
                                                        cm.gainItem(4290001,1)
                                                        }
}else{
cm.sendOk("�㻹û����100������Ƥ��10����ͷ��100���������𣿣�����ô�졣���˿�׷��������ô�죡�����Ҿ�Ȼ�����ô���صĶ�����Ū���ˣ���")
}
}else{
status == 6;
cm.sendNext("�Ҳ�˵������")
}
		}
	} else if (status == 2) { // ����ʲô������2
		 if (cm.MissionStatus(9209000,999,0,4)) {//����Ƿ�ӹ�������
                            cm.dispose;
                            }else{
		cm.sendNextPrev("ʲô��������Ϊʲô��˵��");
}
	} else if (status == 3) { //����ʲô������3
		cm.sendNextPrev("���ˡ�����Ӧ�û���Ұɡ���������ҵĻ��һ����Ը������Ķ������������������");
	} else if (status == 4) {//����ʲô������4
		status = 4;
		cm.sendSimple(menu1);
	} else if (status == 5) { // �Ұ���
		cm.sendNext("����һ�������ˣ������������һ������ϲ���Ķ�������\r\n��ʵ�����������ġ���");
	} else if (status == 6) { // �Ұ���2
		cm.sendNextPrev("��ʵ���ںܾ���ǰ��������ð�յ���;�У��ѿ��˽������ҵĶ�����Ū���ˡ�����Щ���������ռ��ġ���һ��Īչ��֪������ô�졣�����Ķ�����״��������:\r\n\r\n#i4000021#��#i4000017#��#i4000002#\r\n\r\n\r\n����������������һ����100�����ڶ�����10����������Ҳ��100������Ϊ���ð�յ������Ƚ϶ࡣ�������Ҳ����߿����ҾͰ��������񽻸����ˣ�ϣ��������ɡ�");
                            cm.MissionMake(9209000,999,0,0,0);
	} else if (status == 7) {
		cm.dispose;
	} else if (status == 8) { // ������Ʒ
		cm.sendSimple(menu);
	} else if (status == 9) { // ������Ʒ
		if (selection == 0) { // ������Ʒ
                            if (cm.haveItem(3994090)){
                            cm.gainItem(3994090,-1)
                            cm.gainMeso(xiangliao)
                            cm.sendOk("�һ��ɹ����������Ľ�ҡ�")
                            cm.dispose;
}else{
cm.sendOk("�Բ�����û�����ϡ�")
                            cm.dispose;
}
                            }else if(selection == 1){
                            if (cm.haveItem(3994091)){
                            cm.gainItem(3994091,-1)
                            cm.gainMeso(jinianpin)
                            cm.sendOk("�һ��ɹ����������Ľ�ҡ�")
                            cm.dispose;
}else{
cm.sendOk("�Բ�����û��̩������Ʒ��")
                            cm.dispose;
}
}else if(selection == 2){
                            if (cm.haveItem(3994092)){
                            cm.gainItem(3994092,-1)
                            cm.gainMeso(kaomanyu)
                            cm.sendOk("�һ��ɹ����������Ľ�ҡ�")
                            cm.dispose;
}else{
cm.sendOk("�Բ�����û�п����㡣")
                            cm.dispose;
}
}else if(selection == 3){
                            if (cm.haveItem(3994093)){
                            cm.gainItem(3994093,-1)
                            cm.gainMeso(shayu)
                            cm.sendOk("�һ��ɹ����������Ľ�ҡ�")
                            cm.dispose;
}else{
cm.sendOk("�Բ�����û������걾��")
                            cm.dispose;
}
}else if(selection == 4){
                            if (cm.haveItem(3994094)){
                            cm.gainItem(3994094,-1)
                            cm.gainMeso(wuya)
                            cm.sendOk("�һ��ɹ����������Ľ�ҡ�")
                            cm.dispose;
}else{
cm.sendOk("�Բ�����û����ѻ��ëñ��")
                            cm.dispose;
}
}
	} 
	}
}
