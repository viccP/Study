/* 
CherryMS LoveMXD
��ͬ���ڽ�ֹת��
CherryMS.cn
�ű����ͣ�����ʿתְ
*/
var status = 0;
var job;
var name = "����ʿ";
var name1 = "��֮��ʿ";

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
											  if(true){
                                          cm.sendOk("���Ϊ��ʿ��������Ե���ʿ�����ʵ�Աתְ��");
                                          cm.dispose();
}else 
                                           if (cm.getJob().equals(net.sf.cherry.client.MapleJob.NOBLESSE)||cm.getJob() == 0) {//�������ʿ�ŵĳ�����ְҵ
if (cm.getLevel() >= 10){//������ڻ��ߵ���10�Ǽǡ�
cm.setNPC_Mode(1)
cm.openNpc(1104101)
cm.setNPC_Mode(0)
}else{
cm.sendOk("��ʿ�ŵ��������ɡ��������¸ҳ������ģ������һֱ��ǰ�߰ɣ�")
}
}else if (cm.MissionCanMake(1006)) { //��תְ������ʿ�ų�
cm.setNPC_Mode(4)
cm.openNpc(1104101)
cm.setNPC_Mode(0)
}else if (cm.MissionCanMake(1005)) { //��תְ������ʿ�ĵ�����תְ����
cm.setNPC_Mode(3)
cm.openNpc(1104101)
cm.setNPC_Mode(0)
}else if (cm.MissionCanMake(1004)) { //��תְ������ʿ�ĵڶ���תְ����
cm.setNPC_Mode(2)
cm.openNpc(1104101)
cm.setNPC_Mode(0)
}else{
cm.sendOk("��ʿ�ŵ��������ɡ��������¸ҳ������ģ������һֱ��ǰ�߰ɣ�")
}
                                          } else if (status == 1) {//ѡ���
			
		}

	}
}
