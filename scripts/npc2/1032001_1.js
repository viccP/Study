/* Grendel the Really Old */
/** Made by xQuasar **/

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
			cm.sendNext("ħ��ʦ��������.��������������ǿ��...���ҿ������Ƿ��������...");
		} else if (cm.getJob() == 200) {
			status = 2;
			cm.sendNext("���ѡ�������ǵ�..");
		} else if (cm.getJob() == 220 ||
					cm.getJob() == 210 ||
					cm.getJob() == 230) {
			status = 4;
			cm.sendNext("���``�þò���");
		} else {
			cm.sendOk("���ѡ�������ǵ�..");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 7 || cm.getChar().getInt() < 4) {
			cm.sendOk("��������.��Ҫ��������4.�ȼ�����8");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("�õ�...����ȫ����ħ��ʦ������,���Ϊһ��ħ��ʦ��?");
		}
	} else if (status == 1) {
		cm.changeJob(200);
		cm.sendOk("30��������.");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("���Ŷ...");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("��������ء�����");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031009)) {
			cm.sendOk("��ȥ��....");
			cm.dispose();
		} else {
			cm.sendOk("�ܺã�׼���ڶ���תְ�˰�?\r\n�������ҶԴλ���ȷ���°�!");
			cm.gainItem(4031012,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("�������Լ���ѡ������?Ҫ��Ϊ�𶾷�ʦ?");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("�������Լ���ѡ������?Ҫ��Ϊ���׷�ʦ?");
		} else if (selection == 2) {
			status = 10;
			cm.sendYesNo("���Ϊһ��ţX����ʦ?");
		} else {
		cm.sendSimple("�㿴������һ��ְҵ?#b\r\n#L0#�𶾷�ʦ#l\r\n#L1#���׷�ʦ#l\r\n#L2#��ʦ#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob() == 210 && cm.getLevel() >= 700){
			status = 5;
			cm.sendYesNo("�Ƿ���е�����תְ?");
		} else if (cm.getJob() == 220 && cm.getLevel() >= 700){
			status = 6;
			cm.sendYesNo("�Ƿ���е�����תְ?");
		} else if (cm.getJob() == 230 && cm.getLevel() >= 700){
			status = 7;
			cm.sendYesNo("�Ƿ���е�����תְ?");
		} else {
			cm.sendOk("����תְ��ȥѩ���Ϲ��ݡ���");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(211);
		cm.sendOk("���Ѿ��ɹ���ȡ�˵�����תְ��������!!\r\n���ܽ���Ķ�������,120����������ת��ʱ��!");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(221);
		cm.sendOk("���Ѿ��ɹ���ȡ�˵�����תְ��������!!\r\n���ܽ���Ķ�������,120����������ת��ʱ��!");
		cm.dispose();
	} else if (status == 7) {
		cm.changeJob(231);
		cm.sendOk("���Ѿ��ɹ���ȡ�˵�����תְ��������!!\r\n���ܽ���Ķ�������,120����������ת��ʱ��!");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(210);
			cm.gainItem(4031012,-1);
		cm.sendOk("���Ѿ��ɹ���ȡ�˵ڶ���תְ��������!!\r\n,70��������3ת��ʱ��!");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(220);
			cm.gainItem(4031012,-1);
		cm.sendOk("���Ѿ��ɹ���ȡ�˵ڶ���תְ��������!!\r\n,70��������3ת��ʱ��!");
			cm.dispose();
	} else if (status == 10) {
			cm.changeJob(230);
			cm.gainItem(4031012,-1);
		cm.sendOk("���Ѿ��ɹ���ȡ�˵ڶ���תְ��������!!\r\n,70��������3ת��ʱ��!");
			cm.dispose();
	}
}
