/* 
����Ա

CherryMS LoveMXD

ԭ���ű�����ͬ���ֹת��
*/
var status = 0;
var menu = "��ã��������֮�ǵ�Ʊ��Ա,������ʲô�أ�\r\n\r\n#b#L0#��������Ʊ"
var menu1 = "�����ǵ������Ʊ�أ�\r\n\r\n#b#L0#��ľ��"
var coat = 5000
var coat1 = 9000

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
                                          cm.sendSimple(menu)
                                          } else if (status == 1) {
			if (selection == 0) { // 
			cm.sendSimple(menu1)
}
                            } else if (status == 2) { 
			if(selection == 0){
                                          cm.sendNext("����Ҫһ����ľ���Ʊ����?�õġ���ȵȡ�����")
}
		} else if (status == 3) { 
			if (cm.getMeso() < coat) {
                                          cm.sendOk("�Բ�����Ľ����������֧�����η��á�")
}else{
cm.sendOk("�õģ����պ�����Ʊ����������#b#p2012006##k�Ϳ��Ե�������Ҫ���Ļ�����")
cm.dispose();
cm.gainItem(4031330,1)
cm.gainMeso(-coat)
}
		} else if (status == 4) {
			cm.sendSimple(menu);
		} else if (status == 5) { //Menu
			if (selection == 0){//
			if (cm.getMeso() < coat) {
                                          cm.sendOk("��ѽѽ������Ľ�Һ��񲻹�ѽ����")
cm.dispose();
                                          }else{
                                          cm.sendNext("�ðɡ����Ѿ�������"+coat+"��ҡ��ú����Ʊ�ɡ�")
                                          cm.dispose();
                                          cm.gainItem(4031036,1);
                                          cm.gainMeso(-5000);
cm.dispose();
}
}
		}
	}
}
