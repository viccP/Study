var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {			
			cm.sendSimple("#eΰ�����ʿ���������Ҫȥ��ս糺���ʿ����������ܸ���500Ԫ�����ҿ��Ը���һ���Ƽ��ţ���ȥ�������ҹ�Ӣ��������㿪��糺�֮·��Կ��\r\n#dʣ��:#r" + cm.getzb() + "Ԫ��\r\n#L1#��ȷ����Ҫȥ���鷳����#l \r\n#L2#���õ��ˣ�������͹�ȥ��#l\r\n#L5#�������г�#l\r\n#L10#����սǰ�ض���#l    #L4#�����ػ���˵����#l");	
		} else if (status == 1) {
			if (selection == 1) {
                                if(cm.getzb() >= 500) {
                                cm.setzb(-500);
                                cm.sendOk("ȥ����������һ������ҵ���Ӣ�����#v4001110#����������������Ķ������������ҾͿ��԰����͹�ȥ");
	                        cm.gainItem(4001110, 1);
                                cm.dispose(); 
                        } else {
                                cm.sendOk("#e���Ѿ�û��Ԫ���ˣ��뼴ʱ��ֵ��"); 
                                cm.dispose(); 
                                }
			} else if (selection == 2) {
                                if (!cm.haveItem(4001035,1)) {
				cm.sendOk("��Ǹ����û��1��#v4001035#");
                                } else if (cm.getChar().getLevel() < 100) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����100���޷�Ϊ���ͣ�����̫Σ���ˡ�");
                                } else if (cm.getChar().getLevel() > 200) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����200���޷�Ϊ�㴫����,#r��ת���Ժ�������");
				} else if (cm.getParty() == null) {
				cm.sendOk("��Ǹ��û����ӣ��޷������ħ�㳡");
				} else if (!cm.isLeader()) {
				cm.sendOk("��������ħ�㳡, ��ô�� #b�����ӳ�#k �������ң�");
				} else if (cm.getParty().getMembers().size() > 5) {
				cm.sendOk("��Ǹ���ֻ�ܴ�5�����ѽ����ħ�㳡");
                                } else if (cm.getBossLog('ZAKUM') < 1000){
                                cm.setBossLog('ZAKUM');
				em = cm.getEventManager("feihong");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("��ʿ��ץ��ʱ�䰡������ս��ʱ��ֻ��3��Сʱ���������3��Сʱ֮�ڻ�û�а�BOSS��������ҽ����㴫�͵������г�");
                                cm.serverNotice("��糺���ʿ�Ź��桻����"+ cm.getChar().getName() +"���������Ķ��Ѷ�糺���ʿ�ŵ�һ�㷢����ս");  
                                cm.gainItem(4001035, -100);
				} else {			
                    		cm.sendOk("�Բ���ÿ��ֻ����ս10��糺���ʿ��");
				}
				cm.dispose();
			} else if (selection == 3) {
                                if (!cm.haveItem(4000016,3)) {
				cm.sendOk("��Ǹ����û��3��#v4000016#");
                                } else if (cm.getChar().getLevel() < 120) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����10���޷�Ϊ���ͣ�����̫Σ���ˡ�");
                                } else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����200���޷�Ϊ�㴫���ˣ��������˵��������Ŷ,#r��ת���Ժ�������");
				} else if (cm.getParty() == null) {
				cm.sendOk("��Ǹ��û����ӣ��޷������ħ�㳡");
				} else if (!cm.isLeader()) {
				cm.sendOk("��������ħ�㳡, ��ô�� #b�����ӳ�#k �������ң�");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("��Ǹ���ֻ�ܴ�1�����ѽ����ħ�㳡");
                                } else if (cm.getBossLog('ZAKUM') < 1){
                                cm.setBossLog('ZAKUM');
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("��ӭ�����ħ�㳡2����ֻ�ṩ��1Сʱ��ʱ��,�뾡��ɱ�ְ�");
				} else {			
                    		cm.sendOk("�Բ�����ÿ��ֻ�ܽ���һ��������");
				}
				cm.dispose();
			} else if (selection == 4) {
                    		cm.sendOk("#b\r\n���ֽ�Ʒ\r\n100����֣��������һ��\r\n300����֣��¶ȼ�һ��\r\n500����־��ް�����һ�š�\r\n1000����֣�ñһ��Ч��ͷ�����С�\r\n���ֻ��:ÿ��ͨ��һ�ζ����Ի��10�����");				
cm.dispose();
			} else if (selection == 5) {
                                cm.warp(910000000, 0);
                                cm.dispose();
			} else if (selection == 10) {
                    		cm.sendOk("#b1��糺츱���ڣ���5��BOSS������ÿ��BOSS����һ�����ʱ���һ��ƾ֤���ռ���5��ƾ֤�����Զһ�һ���齱��\r\n8��ʹ�ó齱�����㴫�͵��콱��ͼ�����Ի�ñ���һ�����Լ�糺�װ����10�����\r\n9��Ȼ��ȥ�������У���Ȩ�￪���㿪���������������һ�����������װ��");
				cm.dispose();
}}}}