/* NANA
��黶ӭ��Ա
*/
var status = 0;
var boymain = "��Ը�Ᵽ�������������������ܵ��κ��˺���#b\r\n#L0#��Ը��\r\n#L1#�Ҳ�Ը��"
var grilmain = "��Ը��˳�����������������κη��յ�������#b\r\n#L2#��Ը��\r\n#L1#�Ҳ�Ը��"
var guest = "��֤һ�����۵����˳�Ϊһ�Է򸾣���������õ�֤���ˣ�"
var grilmain1 = "������ʲô��#b\r\n#L3#�Ѵ˵�ͼ���������͵������ͼ��"

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
			cm.sendNext("�š��������ʲô�µĻ����������ҡ�����������㡣");
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
if (cm.MissionStatus(cm.getPlayer().getId(),1024,0,4)){//֤����
cm.sendOk(guest)
}else if (cm.MissionStatus(cm.getPlayer().getId(),1030,0,0)) {//Ů���Ķ������
cm.sendSimple(grilmain1);
}else if (cm.MissionStatus(cm.getPlayer().getId(),1027,0,0)) {//�����Ķ������
cm.sendOk("�š��������׼���ź��ҶԻ��ɡ���")
                                      }else if (cm.MissionStatus(cm.getPlayer().getId(),1028,0,4)) {//����
                                       cm.sendSimple(boymain);
}else if (cm.MissionStatus(cm.getPlayer().getId(),1029,0,4)) {//Ů��
cm.sendSimple(grilmain);
}else{
cm.sendOk("�Ҳ�֪����������ô�����ģ�����������λ����һ���Ӱɡ�")
}
} else if (status == 1) {
			if (selection == 0) { // ������Ը��
				cm.sendOk("�Ҿ�֪����������ش𡣺��ˣ��ȴ�Ů������Ϣ�ɡ�")
cm.MissionMake(cm.getPlayer().getId(),1027,0,0,0,0)
cm.MissionFinish(cm.getPlayer().getId(),1027);
cm.setMarriageData(cm.getPlayer(),3,1)
			} else if (selection == 1) { // ��Ը��
		                           cm.sendOk("��һ���˾�Ҫȫ��ȫ���ĸ���������Ը��Ļ�����̸�ý����أ�")
cm.dispose();
                                          }else if (selection == 2){//Ů����Ը��
                                                        if (cm.getMarriageData(cm.getPlayer(),3) == 1){
                                                        cm.sendOk("�Ҿ�֪�������ô˵�������ˣ��������������һ���ģ�����Ҳ������˵ʲô�ˣ���ף������һ����")
                                                        cm.MissionMake(cm.getPlayer().getId(),1030,0,0,0,0)
cm.MissionFinish(cm.getPlayer().getId(),1030);
}else{
cm.sendOk("������׼�Ϲ��ش�ɡ������˷ܰɡ�����һ�죿")
}
}else if (selection == 3){
 cm.warp(680000300)
}
}
}
}