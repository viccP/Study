var wq = 4000082;
var hy = 4001017;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		status++;
		if(mode == 0) {
			cm.sendOk("���������ľ����ģ�������������ɣ�");
			cm.dispose();
			return;
		}
		if(status == 0) {
			cm.sendYesNo("�һ�һ��#b�������#k��Ҫ#r20#k��#v4000082#.");
		} else if(status == 1) {
			if(cm.haveItem(4000082,20)){
				cm.gainItem(4000082,-20);
				cm.gainItem(hy,+1);
				cm.sendOk("��ϲ��һ��ɹ���");
				cm.dispose();
			}else{
				cm.sendOk("��û���㹻����Ʒ�޷����жһ�");
				cm.dispose();
			}
		}
	}
}
