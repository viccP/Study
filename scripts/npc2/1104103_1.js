/* 
CherryMS LoveMXD
��ͬ���ڽ�ֹת��
CherryMS.cn
�ű����ͣ�ҹ����תְ_�ֽű���һ���֡�����һתתְ
*/
var status = 0;
var job;
var name = "ҹ����"
var name1 = "��֮��ʿ"
var main = "�š����������Ѿ���������Ϊ�ҵĲ������ء���#b\r\n#L0#"+name+"��ʲô�ô���\r\n#L1#����תְ��Ϊ"+name1+"��"
var level = 120;


importPackage(net.sf.cherry.client);

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
			cm.sendNext("�������ʲô�µĻ������������ҡ�");
		}
		if (mode == 1)
			status++;
		else
			status--;
                                          if (status == 0) {
                                          cm.sendSimple(main)
                                          } else if (status == 1) {//ѡ���
                                          if (selection == 0){
                                          cm.sendNext(""+name+"��Ů�ʱ�������ϧ�Ĳ��ӣ��������÷�����Ը���������˺����ȼ�����#b"+level+"#k����\r\n���缼��#b��Ѫ#k�����ٻ���������Լ�����𣬲��ѵ��˵�Ѫ�ָ����Լ����ϡ�")
}else if (selection == 1){
status = 2;
cm.sendSimple("��ȷ�������𣿳�Ϊ��#p1104103#"+name1+"�Ĳ��£���#b\r\n#L0#�ǵģ�����Թ�޻ڳ�Ϊ���Ĳ��£�\r\n#L1#��Ҫ�����������롣��")
}




			
		}else if (status == 2){
                                        cm.sendNextPrev("�������תְ��#b"+name+"#k�����º��ҶԻ��ɡ�")
cm.dispose();
}else if (status == 3){
if (selection == 0){//�ǵģ�����Թ�޻ڳ�Ϊ��Ĳ��£�
status = 3;
cm.sendSimple("�ã������Ҿ���ʽ����Ϊ #b"+name1+" -- "+cm.getPlayer().getName()+" #k��#b\r\n#L0#������ʿ�ų�����ѫ�£�\r\n#L1#������׼��һ�¡�")
}else if (selection == 1){
cm.sendOk("�����㲻�ǳ������ġ����ðɣ���������ɡ�")
}
}else if (status == 4){
if (selection == 0){
cm.sendNext("�ã�"+cm.getPlayer().getName()+"���¡�������Ҹ�������ѫ�£�ϣ�����ܰ��Լ�����ʿ֮·�ߵ��ͷ��\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i1142065# ��ʿ�ų�����ѫ�� һö ��")
cm.gainItem(1142065,1)
cm.changeJob(1400)
}else if (selection == 1){
cm.sendNext("��Ҫ���£���ʿҪ���� ���ġ����������")
cm.dispose();
}
}else if (status == 5){
cm.sendNext("��")
}

	}
}
