/*
սʿתְNPC�̹�
*/

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
			cm.sendNext("���Ƿ����Ϊһ��ӵ�г�ǿ���ʵ�սʿ��");
		} else if (cm.getJob() == 100) {
			status = 2;
			cm.sendNext("ѡ������·,��ʱ�������һ����.");
		} else if (cm.getJob() == 110 ||
					cm.getJob() == 120 ||
					cm.getJob() == 130) {
			status = 4;
			cm.sendNext("ѡ������·,��ʱ�������һ����.");
		} else {
			cm.sendOk("ǿ�����,֪�����ʹ���Լ���������?");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 9 || cm.getChar().getStr() < 4) {
			cm.sendOk("��ȷ�����Ƿ�ﵽ��Leve9���ϵ�����.");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("���Ѿ����������ˣ��Ƿ�Ը���������?");
		}
	} else if (status == 1) {
		cm.changeJob(100);
		cm.sendOk("��ϲ��ɹ�תְ!��������һ��սʿ��!����Level30��ʱ��,�����ٴκ��ҽ���!");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("�Ȳ���������?�����㻹û�дﵽ����Ŷ!��Ҫ�ȼ�30�ſ���.");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("��...�治��˼��..");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031008)) {
			cm.sendOk("�����Ҹ�����Ƽ���.ȥ�������ٰ̹ɣ���˵����#b������ɽ4#k");
			cm.dispose();
		} else {
			cm.sendOk("��ô����͵��˵ڶ���תְ��������..������ζ�����˵�Ǹ�����.�������Ҹ�����Ƽ���.ȥ��һ����Ӧ���������õڶ���תְ���ʸ��!");
			cm.gainItem(4031008,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("��ȷ������Ҫ��Ϊ������?");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("��ȷ������Ҫ��Ϊ׼��ʿ��?");
		} else if (selection == 2) {
			status = 10;
			cm.sendYesNo("��ȷ������Ҫ��Ϊǹսʿ��?");
		} else {
		cm.sendSimple("����ְҵ��,�㿴����һ��?#b\r\n#L0#����#l\r\n#L1#׼��ʿ#l\r\n#L2#ǹսʿ#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob().equals(net.sf.odinms.client.110) && cm.getLevel() >= 700){
			status = 5;
			cm.sendYesNo("������תְ�����������ˡ���Ҫȥ�����������~�������ٶȣ�");
		} else if (cm.getJob().equals(net.sf.odinms.client.120) && cm.getLevel() >= 700){
			status = 6;
			cm.sendYesNo("׼��ʿ�ĵ�����תְ,��û�������?");
		} else if (cm.getJob().equals(net.sf.odinms.client.130) && cm.getLevel() >= 700){
			status = 7;
			cm.sendYesNo("����ʿ...��ǿ��ְҵ,�����Ϊ#r����ʿ#k��?");
		} else {
			cm.sendOk("��ת��ʱ�򡣾Ͳ����Ҵ�����~�����ң�");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(net.sf.odinms.client.111);
		cm.sendOk("���Ѿ��ɹ���ȡ�˵�����תְ��������!!\r\n���ܽ���Ķ�������,120����������ת��ʱ��!");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(net.sf.odinms.client.121);
		cm.sendOk("���Ѿ��ɹ���ȡ�˵�����תְ��������!!\r\n���ܽ���Ķ�������,120����������ת��ʱ��!");
		cm.dispose();
	} else if (status == 7) {
		cm.changeJob(net.sf.odinms.client.131);
		cm.sendOk("���Ѿ��ɹ���ȡ�˵�����תְ��������!!\r\n���ܽ���Ķ�������,120����������ת��ʱ��!");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(110);
			cm.gainItem(4031012,-1);
			cm.sendOk("�ܺ�!���Ѿ��ɹ�����˵ڶ���תְ��������!");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(120);
			cm.gainItem(4031012,-1);
			cm.sendOk("�ܺ�!���Ѿ��ɹ�����˵ڶ���תְ��������!");
			cm.dispose();
	} else if (status == 10) {
			cm.changeJob(130);
			cm.gainItem(4031012,-1);
			cm.sendOk("�ܺ�!���Ѿ��ɹ�����˵ڶ���תְ��������!");
			cm.dispose();
	}
}
