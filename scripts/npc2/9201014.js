/* NANA
��黶ӭ��Ա
*/
var status = 0;
var menu = "���ǵ��õĲ߻���Ա #b\r\n\r\n#L0# ����鿴��ǰ�ÿ�����\r\n#b#L1# ��Ҫ�Ͱ���һ��������"
var men = 0;

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
                                          if (cm.getPlayer().getMap().getId() == 680000100) {
                                          cm.setNPC_Mode(1)
                                          cm.openNpc(9201014)
cm.setNPC_Mode(0)
                                          }else if (cm.getPlayer().getMap().getId() == 680000200) {
			cm.sendSimple(menu);
                                          }else{
cm.sendOk("���������ܺò�����")
}
		} else if (status == 1) {
			if (selection == 0) { // ����鿴��ǰ�ÿ�����
				if(cm.countRemoteMapPlayers(680000210) >= men ){//�����ǰ��ͼ���������ڻ��ߵ���5ʱ
                                                        cm.sendOk("�����Խ�����þٰ�����ˡ�\r\nĿǰ�ÿ�����Ϊ#b "+cm.countRemoteMapPlayers(680000210) +" #k�ˡ�")
                                                        cm.dispose();
                                                        }else{
                                                        cm.sendOk("�Բ��𡣷ÿͻ�û�дﵽϵͳ���ϵ����֡�\r\nĿǰ�ÿ�����Ϊ#b "+cm.countRemoteMapPlayers(680000210) +" #k�ˡ�")
                                                        cm.dispose();
                                                        }
			} else if (selection == 1) { // ��Ҫ�Ͱ���һ��������
                                                        if (cm.getParty() == null) { // û�����
                                                        cm.sendOk("��Ӻ����ԡ�")
}else if (!cm.isPartyLeader()){
cm.sendOk("����ӳ�����̸����")
}else if(cm.getChar().getGender() == 1) {//�����Ů
cm.sendOk("�����������ӳ���")
                                         }else if(cm.countRemoteMapPlayers(680000210) >= men ){//�����ǰ��ͼ���������ڻ��ߵ���5ʱ
                                                        cm.warpParty(680000210)
                                                        cm.MissionMake(cm.getPlayer().getId(),1028,0,0,0,0);
                                                        cm.MissionMake(cm.getPlayer().getMarriageId(),1029,0,0,0,0);
                                                        }else{
                                                        cm.sendOk("�Բ��𣬷ÿ�������û�ﵽ #b"+ men +" #k �ˡ����Ժ����ԡ�")
                                                        }
		
                                          }
		
}
}
	
}