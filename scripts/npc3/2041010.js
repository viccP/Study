/*
		���ִ�����NPC ���뻻������ɫ
*/
var status = 0;
var beauty = 0;
var price = 5000000;
var mface = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20025, 20026, 20027, 20028, 20029);
var fface = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019, 21020, 21021, 21022, 21023, 21024, 21025, 21026, 21027, 21028, 21029, 21030, 21031, 21033);
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
			cm.sendSimple("��Ҫ����#b#z5152007##kһ�ţ���\r\n\r\n#L0##b������������#k(ʹ��#b#z5152007##k)#l");
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
				cm.sendStyle("�ҿ��Ըı��������,���������ڿ�����Ư��. ��Ϊʲô�����Ÿı�����? �������#b���ִ����������߼���Ա��#k,�ҽ������ı��������,��ôѡ��һ������Ҫ�������Ͱ�!", facenew,5152007);
			}else if(selection == 1){
				beauty = 1;
				if (cm.getChar().getGender() == 0) {
					var current = cm.getChar().getFace() % 100 + 20000;
				}else{
					var current = cm.getChar().getFace() % 100 + 21000;
				}
				colors = Array();
				colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700, current + 800);
				cm.sendStyle("��ѡ����ϲ������ɫ.", colors,5152007);
			}
		}else if (status == 2){			
			cm.dispose();
			if(beauty == 0){
				if(cm.haveItem(5152007) == true){
					cm.gainItem(5152007, -1);
					cm.setFace(facenew[selection]);
					cm.sendOk("#e����,���������һ���ϲ�����������!");
				}else if(cm.getPlayer().getCSPoints(1)>=980){                            
        	cm.getPlayer().modifyCSPoints(1,-980);
				  cm.setFace(facenew[selection]);
				  cm.sendOk("#e����,���������һ���ϲ�����������!");
			  }else{
					cm.sendOk("�������㲢û�����ǵĸ߼���Ա��,�ҿ��²��ܸ��������������,�Һܱ�Ǹ.�����ȹ����.");
			  }
      }else if(beauty ==1 ){
				if (cm.haveItem(5152007) == true) {
        	cm.gainItem(5152007, -1);
					cm.setFace(colors[selection]);
					cm.sendOk("#e����,���������һ���ϲ�����������!");
   			}else if(cm.getPlayer().getCSPoints(1)>=980){
					cm.getPlayer().modifyCSPoints(1,-980);
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
