/* 
CherryMS LoveMXD
��ͬ���ڽ�ֹת��
CherryMS.cn
�ű����ͣ�����ʿ�ڶ�ת
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
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		} else if (status == 2 && mode == 0) {
			cm.sendNext("�����ʲô�¿����������ҡ�");
		}
		if (mode == 1)
			status++;
		else
			status--;
                                          if (status == 0) {
                                          cm.sendSimple("����������ǰ���Ǹ�"+cm.getPlayer().getName()+" �� ����ɣ�������ô�죿��#b\r\n#L0#��������Ϊ����Ŭ��������")
                                          } else if (status == 1) {//ѡ���
                                	if (selection == 0){
			cm.sendSimple("�š��ðɣ�������ʲô�����أ�#b\r\n#L0#��˵������30����ʱ����Խ��ס���")			
		}
}else if (status == 2){
if (selection == 0){
cm.sendSimple("����������ô֪��30����ʱ����Խ��׵ģ��ðɣ��Ҳ���Ū���ˣ�������׳�������ʿ��#b\r\n#L0#������еڶ���תְ��\r\n#L1#��Ҫ����һ�¡�")
}
}else if (status == 3){
if(selection == 0){
cm.sendNext("�ţ��ðɣ��Ҹ�����ڶ���תְ��ϣ���������Ժ��·�¸Ҽ�ǿ������ȥ ����")
}else if (selection == 1){
cm.sendNext("�ðɣ�����һ������Ҫ�ľ���������")
cm.dispose();
}


}else if (status == 4){
cm.changeJob(1210)
cm.sendNext("�ã�"+cm.getPlayer().getName()+"�����Ѿ���Ϊ��������ʿ��ϣ�����ܼ�������ð�յ����磡\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i1142066# ��ʿ������ѫ�� һö ��")
cm.gainItem(1142066,1)
}

	}
}
