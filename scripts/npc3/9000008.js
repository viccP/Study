var status = 0;
var item = 
Array(



                        //��������
			Array(1302086,500,1),// �����Ƽ׽� 
 			Array(1302081,500,1),//�����Ƽ׽�
 			Array(1312037,500,1),//������Ÿ�
 			Array(1312038,500,1),//�������Ÿ� 
 			Array(1322060,500,1),//���㾪����
 			Array(1322061,500,1),//����������
 			Array(1432047,500,1),//������ʥǹ 
 			Array(1432049,500,1),//������ʥǹ
 			Array(1402047,500,1),//������ڤ�� 
 			Array(1402046,500,1),//������ڤ�� 
 			Array(1412034,500,1),//���������� 
			Array(1412033,500,1),//���������� 
			Array(1442002,500,1),//����� 
 			Array(1442067,500,1),//�������� 
 			Array(1442063,500,1),//��������
 			Array(1372044,500,1),//���������
 			Array(1372045,500,1),//����������
 			Array(1372039,500,1),//����֮��
 			Array(1372040,500,1),//�綾֮�� 
 			Array(1372041,500,1),//����֮��
 			Array(1372042,500,1),//����֮�� 
 			Array(1382036,500,1),//�ھ�������
 			Array(1382059,500,1),//����������
 			Array(1382057,500,1),//��������� 
 			Array(1382049,500,1),//��ȸ����
 			Array(1382050,500,1),//���䳤��
 			Array(1382051,500,1),//�׻����� 
 			Array(1382052,500,1),//�������� 
 			Array(1452059,500,1),//�������繭
 			Array(1452057,500,1),//���㾪�繭
 			Array(1462051,500,1),//����ڤ����
 			Array(1462050,500,1),//����ڤ���� 
 			Array(1332076,500,1),//���������� 
 			Array(1332074,500,1),//���������
 			Array(1472071,500,1),//�����󱯸�
 			Array(1472068,500,1),//����󱯸�
 			Array(1492023,500,1),//������� 
 			Array(1492025,500,1),//�������� 
 			Array(1482023,500,1),//�����ȸ�� 
 			Array(1482023,500,1),//������ȸ��
                        //����װ��
			Array(1092042,600,1),// ���׶��� 
			Array(1092058,600,1),//���㺮���� 
			Array(1082234,600,1),//���㶨������  
			Array(1082239,600,1),//������������  
			Array(1072355,600,1),// ������ѥ 
			Array(1072361,600,1),//�������ѥ  
			Array(1052155,600,1),// ���������� 
			Array(1052160,600,1),// ���������� 
			Array(1002777,600,1),// ��������ñ 
			Array(1002791,600,1),// ��������ñ 
			Array(1092057,600,1),//����ħ��� 
			Array(1082235,600,1),// ������ң���� 
			Array(1082240,600,1),// ������ң����
			Array(1072356,600,1),//�������Ь  
			Array(1072362,600,1),// �������Ь 
			Array(1052156,600,1),// ��������� 
			Array(1052161,600,1),// ���������� 
			Array(1002778,600,1),// ��������ñ 
			Array(1002792,600,1),// ��������ñ 
			Array(1082236,600,1),//�����������  
			Array(1082241,600,1),// ������������ 
			Array(1072357,600,1),// ����ʺ�Ь 
			Array(1072363,600,1),// �����ʺ�Ь 
			Array(1052157,600,1),// ����Ѳ���� 
			Array(1052162,600,1),// ����Ѳ���� 
			Array(1092059,600,1),//�������ٶ�  
			Array(1002779,600,1),// ��������ñ 
			Array(1002793,600,1),//��������ñ  
			Array(1082237,600,1),//����̽������  
			Array(1082242,600,1),//����̽������  
			Array(1072358,600,1),// �������ѥ 
			Array(1072364,600,1),//�������ѥ  
			Array(1052158,600,1),// ���㷭�Ʒ� 
			Array(1052163,600,1),//�������Ʒ�  
			Array(1002780,600,1),//���㺣����  
			Array(1002794,600,1),//���������� 
			Array(1072359,600,1),//���㶨��ѥ  
			Array(1072365,600,1),//��������ѥ  

			Array(3010073,20,1), //PB����
			Array(3012003,20,1) //��������

);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendOk("����������ϻ�û���Ǹ������Ҵ򲻿����أ��Ǻǡ�");
		} else if (status == 1) {
			if (cm.haveItem(4001102)) {
				cm.sendYesNo("��ȷ��Ҫ�������������˵˵��һ�㣬����Ҳ��һ���ж���Ŷ");
			}else{
				cm.dispose();
			}
		}
		else if (status == 2){	
			var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("������Ӧ�������а������ճ�һ��");
					cm.dispose();
					return;
				}
			}
			var chance = Math.floor(Math.random()*1000);
			var finalitem = Array();
			for(var i = 0 ;i<item.length;i++){
				if(item[i][1] >= chance){
					finalitem.push(item[i]);
				}
			}
			if(finalitem.length != 0){
				var random = new java.util.Random();
				var finalchance = random.nextInt(finalitem.length);
				var itemId = finalitem[finalchance][0];
				var quantity = finalitem[finalchance][2];
				if(ii.getInventoryType(itemId).getType() == 1){
					var toDrop = ii.randomizeStats(ii.getEquipById(itemId));
				}else{
					var toDrop = new net.sf.cherry.client.Item(itemId, 0, quantity);
				}
				cm.gainItem(4001102,-1);
				net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop,-1);
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMegas(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�ӡ�糺���ʿ�����񡿻�ã����һ��ϲ���������ɣ�����",toDrop, true).getBytes());
				
				cm.sendOk("ϣ�����´�����Ŷ������");
				cm.dispose();
			}else{
				cm.sendOk("��ѽ������RP�ʲô��û�õ�������ʱ�������ɣ�");
				cm.gainItem(4001102,-1);
				cm.dispose();
			}
		}
	}
}
