importPackage(net.sf.cherry.server.maps);
importPackage(net.sf.cherry.net.channel);
importPackage(net.sf.cherry.tools);

/*
    ���Žű�
    CherryMS LoveMXD
    ��ͬ���ڽ�ֹת��
*/

function enter(pi) {
	var nextMap = 211042400;
//	if (pi.getQuestStatus(100200) != net.sf.cherry.client.MapleQuestStatus.Status.COMPLETED) {
//		// do nothing; send message to player
//		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "�㻹û��׼�������ǿ��Ĵ����!"));
//		return false;
//	}
//	else
        if (!pi.haveItem(4001017)) {
		// ���û�л�����۾���
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6,"�������û�л������,�����㲻�ܽ��롣"));
		return false;
	}
	else{
		pi.warp(nextMap,"west00");
		return true;
	}
}
