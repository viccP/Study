/* 
CherryMS LoveMXD
��ͬ���ڽ�ֹת��
CherryMS.cn
�ű����ͣ������á��� ��ʿ�ų�
*/
var status = 0;
var main = "��ӭ����ʥ�ء���"

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
			cm.sendNext("���������ô���ˣ�������");
		}
		if (mode == 1)
			status++;
		else
			status--;
                                          if (status == 0) {
                                          cm.sendSimple("���Կ�ʼ������ :#b\r\n#L0#"+cm.MissionGetStrData(1003,1)+"")
                                          } else if (status == 1) {//ѡ���
			if (selection == 0){//����ʼ
                                          cm.sendSimple("���Ǻþò������ء�����ô������ʿ�ŵ�����ܺðɡ���ʵ�м���Ҫ�����㡣�� #b\r\n#L0#ʲô�£�")
}





		}else if (status == 2){//ʲô�£�
if(selection == 0){
cm.sendSimple("��ʵ����ĳɳ��У���һֱ��ע�����㣬����ǿƴ����ȷʵ������������һ�����͵���ʿ�� #b\r\n#L0#��ʵ��ûʲô����ʿ��Ӧ���������İ���")
}
}else if (status == 3){
if(selection == 0){//��ʵ��ûʲô����ʿ��Ӧ���������İ���
cm.sendSimple("�ðɣ����ÿһ���Ҷ���������Ҿ�����������ߵĳƺţ� #b\r\n#L0#�š���ʲô�ƺ��أ�")
}
}else if (status == 4){//�š���ʲô�ƺ��أ�
if(selection == 0) {
cm.sendSimple("����³ƺ���#b��ʿ�ų�#k �������������ƺ��� #b\r\n#L0#���룡")
}
}else if (status == 5){//���룡
if (selection == 0){
cm.sendNextPrev("�ã����ڣ��������ʿ�ų��ˣ��Ժ��������������������Ա�ɣ�")
} 
}else if (status == 6){
cm.changeJob(1412)
cm.sendNext("�Ҿ�����������һöѫ�£�\r\n\r\n\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i1142069# ��ʿ���ų�ѫ�� һö ��")
cm.gainItem(1142069,1)
}


	}
}
