/* 
CherryMS LoveMXD
*/
var status = 0;
var mainmenu = "������ʲô�أ�\r\n#L0##b���붩�鳡��#l\r\n#L1#���ڶ���#l#l#k";

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
		cm.sendNext("�������ʲô��Ҫ�����Ļ���ʱ�����������ҡ��Һ�����Ϊ����");
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
if (cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){//�����ж�
cm.sendOk("��ϲ����顣��")
cm.dispose();
}else if(cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){//�����ж�
cm.sendOk("��ϲ����顣��")
cm.dispose();
}else{
		cm.sendSimple(mainmenu);
}
	} else if (status == 1) {
		if (selection == 0) { // ��Ҫ��ô����
			status = 1;
if (cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){//�����ж�
cm.sendOk("�Ǻǣ����İɣ�")
cm.dispose();
}else if(cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){//�����ж�
cm.sendOk("�Ǻǣ����İɣ�")
cm.dispose();
}else if(cm.getChar().getGender() == 0) {//���������
                                          cm.sendNext("ѽѽ�����뵽���鳡����\r\n�õġ�����һ��������Ů���ѵĽ�ɫ���롣#b\r\n�����������룺@online ���ɿ�����")
}else if (cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)) {//�����ж�
cm.sendOk("����ܿ�����")
cm.dispose();
}else if (cm.MissionStatus(cm.getPlayer().getId(),1017,0,4)) {//Ů�������ж�
status = 4;
cm.sendNext("����ܾ����ء���")
}else if(cm.getChar().getGender() == 1) {//�����Ů��
                                          cm.sendOk("������������Ѻ��ҶԻ���")
cm.dispose();                     
}else{
cm.sendOk("δ֪ԭ���ܽ��롣��͹���Ա��ϵ")
cm.dispose();
}
		} else if (selection == 1) { // ��Ҫ��ô���
			cm.sendOk("��#p9201005#�Ի��Ϳ���֪����ô�����ˡ���ʵ�ܼ򵥵ġ���#p9201014#�Ի���֪����ô���ˡ����˺ܺõġ���")
cm.dispose();
		}
	} else if (status == 2) { // ��Ҫ��ô���
		cm.sendGetText("������Է��Ľ�ɫ����:");
	} else if (status == 3) { //��Ҫ��ô���
		if(cm.getPlayerOnline(cm.getText()) == false){
cm.startPopMessage("�Է�û�����߻��߲���һ��Ƶ����\r\n�����Ժ����ԡ�");
cm.dispose();
}else if (cm.getSameMap(cm.getText()) == false){
cm.startPopMessage("�Է�û�в�����ͬ����ͼ��\r\n�����Ժ����ԡ�");
cm.dispose();
}else{
cm.warp(680000100)
cm.MissionMake(cm.getText(),1017,0,0,0,0);
cm.startPopMessage("�Ѿ���Է���������Ϣ��\r\n�ڶ��鳡�����Ե�Ƭ��");
cm.startPopMessage(cm.getText(),"�����������Ѿ����붩�鳡��\r\n�뼰ʱ���롣")
cm.dispose();
}
	} else if (status == 4) {
		cm.dispose();
	} else if (status == 5) {
		cm.warp(680000100)
                            cm.dispose();
	}
	}
}
