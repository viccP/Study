var status = 0;
var item = 
Array(     
			
			
			
			
			//-------����------
			Array(1112268,100,0), //��װ��ָ
	        	Array(1112156,100,1), //
			Array(1112253,80,1), //
			Array(1112142,80,1), //
			Array(1112254,80,1), //
			Array(1112143,80,1), //
			Array(1112238,80,1), //
			Array(1112135,80,1), //
			Array(1112257,80,1), //
			Array(1112145,80,1), //��װ��ָ
			Array(1702277,80,1), //�����
			Array(1702305,50,1), //���ܲ�
			Array(1702506,50,1), //ƽ�׹�
			Array(1432009,100,1), //ľ������
			Array(1402013,100,1), //���ս�
			Array(1322051,100,1), //��Ϧ
			Array(1402037,5,1), //
			Array(3010070,5,1), //
			Array(2000005,200,1), //
			
			Array(2000005,200,1), //
			
			//Array(2000004,300,1), //Array(2000005,300,1), //

			//Array(2000004,300,1), //
Array(2000005,200,1), //
			//Array(2000004,300,1), //
Array(2000005,200,1), //
			//Array(2000004,300,1), //
Array(2000005,200,1), //
			//Array(2000004,300,1), //
Array(2000005,200,1), //
			//Array(2000004,300,1), //
Array(2000005,200,1), //
			//Array(2000004,100,1), //
			Array(4251202,50,1), //
			Array(2340000,50,1), //
			Array(2049100,50,1), //
			Array(1402014,5,1), //
			Array(1432037,5,1), //
			Array(1442039,5,1),//
			Array(1003920,80,1),//
			Array(1050293,80,1),//
			Array(1051359,60,1),//
			Array(1072843,80,1),//
			Array(1003220,80,1),//
			Array(1003222,100,1),//
			Array(1001083,80,1),//
			Array(1004126,60,1),//
			Array(1042311,50,1),//
			Array(1042241,70,1),//
			Array(1004117,70,1),//
			Array(1042218,80,1),//
			Array(1042219,70,1),//
			Array(1004094,50,1),//
			Array(1003917,100,1),//
			Array(1004038,50,1),//
			Array(1052253,100,1),//
			Array(1042260,30,1),//
			Array(1002422,100,1),//
			Array(1102196,100,1),//
			Array(1052728,80,1),//
			Array(1102232,80,1),//
			Array(1102374,80,1),//
			Array(1102683,80,1),//
			Array(1042314,70,1),//
			Array(1072917,60,1),//
			Array(1004092,80,1),//
			Array(1052724,60,1),//
			Array(1070031,100,1),//
			Array(1050256,80,1),//
			Array(1000061,70,1),//
			Array(3010594,70,1),//
			Array(1004193,50,1),//
			Array(1003269,50,1),//
			Array(1003268,40,1),//
			Array(1003271,30,1),//
			Array(1004111,100,1),//
			Array(1004027,60,1),//
			Array(1102271,50,1),//
			Array(3010760,10,1),//
			Array(1102380,60,1),//
			Array(1004157,10,1),//
			Array(1004156,10,1),//
			Array(1052656,50,1),//
			Array(1042277,20,1),//

			Array(3010659,10,1),//
			Array(3015028,20,1),//
			Array(3010814,30,1),//
			Array(3010755,20,1),//

			Array(1051389,60,1),//
			Array(1004029,10,1)//

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
			if(cm.getPlayer().getjf() >= 50){
StringS = "50���ֻ��ʻ��������Ʒ��\r\n#e#r��ô��������������Ҫ������#b50����\r\n\r\n#d�˺�Ŀǰʣ�����:"+cm.getPlayer().getjf()+"\r\n";
				for(var i=0;i<item.length;i++){
				StringS += "#v"+item[i][0]+"#";
}
				cm.sendYesNo(StringS);
			} else {
				StringS = "50���ֻ��ʻ��������Ʒ��\r\n";
				for(var i=0;i<item.length;i++){
				StringS += "#v"+item[i][0]+"#";
}
				cm.sendOk(StringS);
				cm.dispose();
			}
		} else if (status == 1){	
			var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("������Ӧ�������а������ճ�һ��");
					cm.dispose();
					return;
				}
			}
			var chance = Math.floor(Math.random()*300)+1;
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
				var Laba = finalitem[finalchance][2];
			          if(ii.getInventoryType(itemId).getType() == 1){
			        	var toDrop = ii.randomizeStats(ii.getEquipById(itemId)).copy();
				}
				else{
				 	 var toDrop = new net.sf.cherry.client.Equip(itemId,0).copy();
				}
				net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
				if(Laba == 1 ||Laba != 1){
					cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "���Ļ��ֻ�ã����һ��ף����(��)�ɣ���",toDrop, true).getBytes());
				}
				cm.getPlayer().gainjf(-50);
				cm.sendOk("�ǳ���л�μӱ���ϵͳ������Ŭ������ȡ���������ɣ�");
				cm.getPlayer().saveToDB(true,true);
				cm.dispose();
			} else {
				//cm.getPlayer().gainjf(-10);
										
				cm.getPlayer().saveToDB(true,true);
				cm.sendOk("�����");
				cm.dispose();
			}
		}
	}
}
