var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.sendNext("���������ȡ���ֻ��Ҫ����Ϸ��������#b@��ȡ���#k����");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("����˺���#b��"+ cm.getmoneyb()*200+"��#k��������ȡ��\r\n----------------------------------------\r\n���ۼƳ�ֵ#b��"+cm.getcz()+"��#kRMB(��ȡ��ˢ����ʾ)��\r\n----------------------------------------\r\n���С���Ϊ��#r#k�������Զ�����10%��#r"+cm.getzb()*10+"#k�����\r\n��ȡ����ȡ���ˢ�³�ֵ��");
	} else if (status == 1) {
            if(cm.getmoneyb() >= 1){
		if (cm.getChar().gettuiguang() > 1) { //�ƹ��˺ͱ��ƹ��˻�õ��
                    var ����ȡ��� = cm.getmoneyb()*200;
                    var �ƹ��˵�� = cm.getmoneyb()/10;
                        cm.gainNX(+""+����ȡ���+"");
                        cm.settuiguang2(""+�ƹ��˵��+"");
                        cm.setcz(+""+cm.getmoneyb()+"");
			cm.setmoneyb(-cm.getmoneyb());
                        cm.gainjs(+""+cm.getmoneyb()+"");
			cm.getChar().saveToDB(true,true);
			cm.sendOk("��ϲ�������ѳɹ�����ȡ��ɣ���ȡ�˵��:"+����ȡ���+"���ƹ��˻����"+����ȡ���/10+"");
			cm.dispose();
		} else {
                    var ����ȡ��� = cm.getmoneyb()*200;
			cm.sendOk("��ϲ�������ѳɹ�����ȡ��ɣ���ȡ�˵��:"+����ȡ���+"��");
                        cm.gainNX(+""+����ȡ���+"");
                        cm.setcz(+""+cm.getmoneyb()+"");
                        cm.gainjs(+""+cm.getmoneyb()+"");
			cm.setmoneyb(-cm.getmoneyb());
			cm.getChar().saveToDB(true,true);
			cm.dispose();   
		       }	
		}else{
                    cm.sendOk("������û�г�ֵ�������޷�ʹ�õġ�");
                    cm.dispose();
                }
            }
	}
}
