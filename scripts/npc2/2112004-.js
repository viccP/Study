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
			cm.sendSimple("#eΰ�����ʿ���������Ҫȥ��ս糺���ʿ����������ܸ���500Ԫ�����ҿ��Ը���һ���Ƽ��ţ���ȥ�������ҹ�Ӣ��������㿪��糺�֮·��Կ��\r\n#dʣ��G��:#r" + cm.getzb() + "��\r\n#L1#��ȷ����Ҫȥ���鷳����#l \r\n#L2#���õ��ˣ�������͹�ȥ��#l");	
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
			cm.sendSimple("�¸ҵ�ð���ߣ���ħ�㳡�Ĺ����ٴ�ɧ�������ˣ�����Ĵ���ȥ��ս��\r\n                 #L10##e#r���ħ�㳡������#l\r\n\r\n\r\n#L1##e#b������ħ�㳡1����ѳ���#L4##b��ħ�㳡1#r�������ƣ�#b#l\r\n#L2#������ħ�㳡2����������#l#L5#��ħ�㳡2#r�������ƣ�#b\r\n#L3#������ħ�㳡3����������#l#L6#��ħ�㳡3#r�������ƣ�#l");	
		} else if (status == 1) {
			if (selection == 1) {
                                if (cm.getChar().getLevel() < 10) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����10���޷�Ϊ���ͣ�����̫Σ���ˡ�");
                                cm.dispose(); 
                        }else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����200���޷�Ϊ�㴫���ˣ��������˵��������Ŷ,#r��ת���Ժ�������");
                                cm.dispose(); 
                                }else{
                                cm.warp(910000004, 0);
                                cm.dispose();}
			} else if (selection == 2) {
                                if (!cm.haveItem(4000016,3)) {
				cm.sendOk("��Ǹ����û��3��#v4000016#");
                                } else if (cm.getChar().getLevel() < 70) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����10���޷�Ϊ���ͣ�����̫Σ���ˡ�");
                                } else if (cm.getChar().getLevel() > 120) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����120���޷�Ϊ�㴫���ˣ��������˵��������Ŷ,#r��ת���Ժ�������");
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
				if (!cm.haveItem(4000016,4)) {
				cm.sendOk("��Ǹ����û��4��4000016");
				} else if (cm.getParty() == null) {
				cm.sendOk("��Ǹ��û����ӣ��޷������ħ�㳡");
				} else if (!cm.isLeader()) {
				cm.sendOk("��������ħ�㳡, ��ô�� #b�����ӳ�#k �������ң�");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("��Ǹ���ֻ�ܴ�1�����ѽ����ħ�㳡");
				} else {
				cm.gainItem(4000016,-4);
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("��ӭ�����ħ�㳡4����ֻ�ṩ��1Сʱ��ʱ��,�뾡��ɱ�ְ�");
				}
				cm.dispose();
			} else if (selection == 5) {
				if (!cm.haveItem(4000016,4)) {
				cm.sendOk("��Ǹ����û��4��4000016");
				} else if (cm.getParty() == null) {
				cm.sendOk("��Ǹ��û����ӣ��޷������ħ�㳡");
				} else if (!cm.isLeader()) {
				cm.sendOk("��������ħ�㳡, ��ô�� #b�����ӳ�#k �������ң�");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("��Ǹ���ֻ�ܴ�1�����ѽ����ħ�㳡");
				} else {
				cm.gainItem(4000016,-4);
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("��ӭ�����ħ�㳡4����ֻ�ṩ��1Сʱ��ʱ��,�뾡��ɱ�ְ�");
				}
				cm.dispose();
			} else if (selection == 10) {
                    		cm.sendPrev("��ӭ�����ħ�㳡4����ֻ�ṩ��1Сʱ��ʱ��,�뾡��ɱ�ְ�");
				cm.dispose();
}}}}
			} else if (selection == 2) {
                                if (!cm.haveItem(4000016,3)) {
				cm.sendOk("��Ǹ����û��3��#v4000016#");
                                } else if (cm.getChar().getLevel() < 70) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����10���޷�Ϊ���ͣ�����̫Σ���ˡ�");
                                } else if (cm.getChar().getLevel() > 120) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����120���޷�Ϊ�㴫���ˣ��������˵��������Ŷ,#r��ת���Ժ�������");
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
				if (!cm.haveItem(4000016,4)) {
				cm.sendOk("��Ǹ����û��4��4000016");
				} else if (cm.getParty() == null) {
				cm.sendOk("��Ǹ��û����ӣ��޷������ħ�㳡");
				} else if (!cm.isLeader()) {
				cm.sendOk("��������ħ�㳡, ��ô�� #b�����ӳ�#k �������ң�");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("��Ǹ���ֻ�ܴ�1�����ѽ����ħ�㳡");
				} else {
				cm.gainItem(4000016,-4);
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("��ӭ�����ħ�㳡4����ֻ�ṩ��1Сʱ��ʱ��,�뾡��ɱ�ְ�");
				}
				cm.dispose();
			} else if (selection == 5) {
				if (!cm.haveItem(4000016,4)) {
				cm.sendOk("��Ǹ����û��4��4000016");
				} else if (cm.getParty() == null) {
				cm.sendOk("��Ǹ��û����ӣ��޷������ħ�㳡");
				} else if (!cm.isLeader()) {
				cm.sendOk("��������ħ�㳡, ��ô�� #b�����ӳ�#k �������ң�");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("��Ǹ���ֻ�ܴ�1�����ѽ����ħ�㳡");
				} else {
				cm.gainItem(4000016,-4);
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("��ӭ�����ħ�㳡4����ֻ�ṩ��1Сʱ��ʱ��,�뾡��ɱ�ְ�");
				}
				cm.dispose();
			} else if (selection == 10) {
                    		cm.sendPrev("��ӭ�����ħ�㳡4����ֻ�ṩ��1Сʱ��ʱ��,�뾡��ɱ�ְ�");
				cm.dispose();
}}}}}}}