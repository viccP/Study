var status;

function start() {
	status = -1;
	action(1,0,0);
	}
	
function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (mode == 0) {
			cm.sendOk("...");
			cm.dispose();
	} else if (status == -1) {
		if (cm.getJob() == 0) {
			status = 0;
			cm.sendNext("�����Ϊ������");
		} else if (cm.getJob() == 400) {
			status = 2;
			cm.sendNext("��׼������ĵڶ�תְ��������������...");
		} else if (cm.getJob() == 410 ||
					cm.getJob() == 420) {
			status = 4;
			cm.sendNext("�����׼��������ĵ�����תְ�����ҿ���...");
		} else {
			cm.sendOk("�ҿ��Խ������й��ڷ����ĵ�·...");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 9 || cm.getChar().getDex() < 4) {
			cm.sendOk("��......�㶼��δ��ȫ����������ʱ��������10��������4��DEX������");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("�ǵģ����ƺ�׼���ó�Ϊһ�������������Ϊһ��������");
		}
	} else if (status == 1) {
		cm.changeJob(400);
		cm.sendOk("��ϲ����������һ���������̿�ѵ����������ﵽ30�������ٴθ���˵����");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("��......�㶼��δ��ȫ����������ʱ������30��������");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("�ҿ�......���Ѿ�ͨ���˲���...");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031011)) {
			cm.sendOk("���ɣ������Ǹж���ȥ��������ְҵ������������Χĳ��ɽ����...");
			cm.dispose();
		} else {
			cm.sendOk("�ٴκ��ҶԻ����ɶ�ת��");
			cm.gainItem(4031012,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("��ȷ����Ҫ��Ϊһ���̿ͣ�");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("��ȷ����Ҫ��Ϊһ�����ͣ�");
		} else {
		cm.sendSimple("����, ������Ϊ?#b\r\n#L0#�̿�#l\r\n#L1#����#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob() == 410 && cm.getLevel() >= 700){
			status = 5;
			cm.sendYesNo("�ǵģ���׼������ĵ�����תְ���������Ϊ��Ӱ�ˣ�");
		} else if (cm.getJob() == 420 && cm.getLevel() >= 700){
			status = 6;
			cm.sendYesNo("�ǵģ���׼������ĵ�����תְ���������Ϊ���пͣ�");
		} else {
			cm.sendOk("����תְ��ȥѩ���Ϲ��ݰݷó����ǡ�");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(411);
		cm.sendOk("��ϲ����������һ����Ӱ�ˡ��̿�ѵ����������ﵽ120������������˵����");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(421);
		cm.sendOk("��ϲ����������һ�����п͡��̿�ѵ����������ﵽ120������������˵����");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(410);
			cm.gainItem(4031012,-1);
			cm.sendOk("��ϲ����������һ���̿͡��̿�ѵ����������ﵽ70�������ٴθ���˵����");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(420);
			cm.gainItem(4031012,-1);
			cm.sendOk("��ϲ����������һ�����͡��̿�ѵ����������ﵽ70�������ٴθ���˵����");
			cm.dispose();
	}
}
