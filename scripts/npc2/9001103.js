/*
		���ִ�����NPC ���뻻������ɫ
*/
var status = 0;
var beauty = 0;
var price = 5000000;
var mface = Array(20130,20131,20132,20133,20135,20136,20137,20138,20144,20145,20146,20147,20148,20147,20150,20151,20152,20153,20154,20155,20156,20157,20158,20159,23024,23016);
var fface = Array(21122,21123,21124,21125,21126,21127,21128,21129,21130,21131,21133,21134,21135,21136,21138,21139,21140,21141,21142,21143,21144,21145,21146,21147,21148,21149,21150,21152,21153,21154,21155,21156,21157,21158,21159,21160,21161,21162,21163,21164,21165,21169,21170,21171,21172,21173,21174,21175,21177,21178,21179,21180,21181,24020,24012);
var facenew = Array();

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
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
			cm.sendSimple("��~����ã���ӭ����#b�ʼ�����#k���������#v5150040##k���ҿ���Ϊ���������������\r\n\#L0##b������������#k(ʹ��#v5150040##k)#l\r\n");
		} else if (status == 1) {
		if (selection == 0) {
				facenew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mface.length; i++) {
						facenew.push(mface[i] + cm.getChar().getFace() % 1000 - (cm.getChar().getFace() % 100));
					}
				}
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fface.length; i++) {
						facenew.push(fface[i] + cm.getChar().getFace() % 1000 - (cm.getChar().getFace() % 100));
					}
				}
				cm.sendStyle("�ҿ��Ըı��������,���������ڿ�����Ư��. ��Ϊʲô�����Ÿı�����? �������#b���ִ����������߼���Ա��#k,�ҽ������ı��������,��ôѡ��һ������Ҫ�������Ͱ�!", facenew,5150040);
			}else if(selection == 1){
				beauty = 1;
				if (cm.getChar().getGender() == 0) {
					var current = cm.getChar().getFace() % 100 + 20000;
				}else{
					var current = cm.getChar().getFace() % 100 + 21000;
				}
				colors = Array();
				colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700, current + 800);
				cm.sendStyle("��ѡ����ϲ������ɫ.", colors,5152001);
			}
		}else if (status == 2){			
			cm.dispose();
			if(beauty == 0){
				if(cm.haveItem(5150040) == true){
					cm.gainItem(5150040, -1);
					cm.setFace(facenew[selection]);
					cm.sendOk("#e����,���������һ���ϲ�����������!");
				}else if(cm.getPlayer().getCSPoints(1)>=980000000){                            
        	cm.getPlayer().modifyCSPoints(1,-980000000);
				  cm.setFace(facenew[selection]);
				  cm.sendOk("#e����,���������һ���ϲ�����������!");
			  }else{
					cm.sendOk("�������㲢û�����ǵĸ߼���Ա��,�ҿ��²��ܸ��������������,�Һܱ�Ǹ.�����ȹ����.");
			  }
      }else if(beauty ==1 ){
				if (cm.haveItem(5150040) == true) {
        	cm.gainItem(5150040, -1);
					cm.setFace(colors[selection]);
					cm.sendOk("#e����,���������һ���ϲ�����������!");
   			}else if(cm.getPlayer().getCSPoints(1)>=980000000){
					cm.getPlayer().modifyCSPoints(1,-980000000);
					cm.getPlayer().UpdateCash();
				  cm.setFace(colors[selection]);
				  cm.sendOk("#e����,���������һ���ϲ�����������!");			    
				}else{
					cm.sendOk("�������㲢û�����ǵĸ߼���Ա��,�ҿ��²��ܸ��������������,�Һܱ�Ǹ.�����ȹ����.");
				}
			}
		}
	}
}
