/* NANA
��黶ӭ��Ա
*/
var status = 0;
var main = "������ʲô�أ�#b\r\n#L0#�����ĺ��ˣ�����ǰ����һ�ء�"
var main1 = "��ʲô��Ҫ����������#b\r\n#L1#��������Ҫ��ʲô��\r\n#L2#���ռ����������"
var men =1;

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
                                          if (cm.getPlayer().getMap().getId() == 680000300) {
                                          cm.sendSimple(main);
                                          }else{
			cm.sendSimple(main1);
                                          }
		} else if (status == 1) {
			if (selection == 0) { // �����ĺ��ˣ�����ǰ����һ�ء�
				if (cm.MissionStatus(cm.getPlayer().getId(),9201014,999,0,0)) {//Ů���Ķ������
                                                          cm.sendYesNo("�����ǰ����һ����ǰ����һ�ص�ʱ��õ�ͼ��������Ҷ��ᱻ���͡�")
}else{
cm.sendOk("��������ҽ�����")
cm.dispose();
}
			} else if (selection == 1) { // ��Ҫ�Ͱ���һ��������
                                                status = 2;
                                                cm.sendNext("�������ұߵ����������𣿹�������ֻҪ������õ���#b\r\n\r\n100��#t4031306#\r\n100��#t4031307#\r\n\r\n#k�ҾͿ��԰����͵���������档")
                                          }else if (selection == 2){
                                               if (cm.MissionStatus(cm.getPlayer().getId(),9201021,0,0,4)){ 
                                               status = 3;
                                               cm.sendSimple("��ѡ����Ҫ����������Ʒ:#b\r\n#L0#��Ҫ����#t4031306#��\r\n#L1#��Ҫ����#t4031307#��");
}else{
                                               cm.sendOk("�����º��ҶԻ����ҵ�׼��һ�¡���")
                                               cm.TaskMake(9201021,2)
                                                cm.MissionMake(cm.getPlayer().getId(),9201021,0,0,0,0)//��ϸ߼������������ظ��ӡ�
cm.dispose();
}
}
}else if (status == 2){
if(mode == 0){
cm.sendOk("�������ʲô������������ҡ�")
}else if (mode == 1){
cm.warp(680000400)
}
}else if(status == 3){
cm.sendOk("�һ�Ϊ�㱣���㽻���ҵ���Ʒ��")
}else if (status == 4){
if (selection == 0) {
if (cm.MissionStatus(cm.getPlayer().getId(),9201021,0,0,4)){
cm.sendGetText("��������Ҫ��������:");
}else{
cm.MissionMake(cm.getPlayer().getId(),9201021,0,0,0,0)//��ϸ߼������������ظ��ӡ�
cm.sendOk("�����º��ҶԻ����ҵ�׼��һ�¡���")
cm.TaskMake(9201021,2)
}
}else if (selection == 1){
cm.sendOk("s")
}
}else if (status == 5){
if (cm.haveItem(4031306,cm.getText())){
cm.sendOk("��")
}else{
cm.sendOk("�Բ��������Ʒû�дﵽ���������������")
}
}
}
}