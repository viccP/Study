
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30470, 30450, 30410, 30400, 30100, 30110, 30140, 30200, 30020, 30000, 30310, 30330, 30050, 30060, 30150, 30210, 30140, 30120, 30560, 30510, 30610);
var fhair = Array(31740, 31700, 31150, 31310, 31160, 31300, 31050, 31610, 31040, 31350, 31100, 31200, 31210, 31260, 31510, 31330, 31410, 31030, 31020, 31080, 31000);
var hairnew = Array();

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
			cm.sendSimple("���,������߳��˼��˰�����߳ǵ곤!�������#b��߳�������߼���Ա��#k��#b��߳�Ⱦ���߼���Ա��#k,��ͷ��ĵİѷ��ͽ�����,�һ����������.��ô��Ҫ��ʲô?��ѡ���!.\r\n#L0#�ı䷢��(ʹ��#b��߳�������߼���Ա��#k)#l\r\n#L1#Ⱦɫ(ʹ��#b��߳�Ⱦ���߼���Ա��#k)#l");						
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				hairnew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mhair.length; i++) {
						hairnew.push(mhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				} 
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fhair.length; i++) {
						hairnew.push(fhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				}
				cm.sendStyle("�ҿ��Ըı���ķ���,���������ڿ�����Ư������Ϊʲô�����Ÿı�����? �������#b��߳�������߼���Ա��#k,�ҽ������ı���ķ���,��ôѡ��һ������Ҫ���·��Ͱ�!", hairnew,5150007);
			} else if (selection == 1) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("�ҿ��Ըı���ķ�ɫ,���������ڿ�����Ư��. ��Ϊʲô�����Ÿı�����? �������#b��߳�Ⱦ���߼���Ա��#k,�ҽ������ı���ķ�ɫ,��ôѡ��һ������Ҫ���·�ɫ��!", haircolor,5151001);
			}
			}else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150007) == true){
					cm.gainItem(5150007, -1);
					cm.setHair(hairnew[selection]);
					cm.sendOk("����,����������̾����·��Ͱ�!");
				}else if (cm.getPlayer().getCSPoints(1)>=980) {
					cm.getPlayer().modifyCSPoints(1,-980);
					cm.getPlayer().UpdateCash();
				  cm.setHair(hairnew[selection]);
				 	cm.sendOk("#e����,���������һ���ϲ�����������!");					
				}else{
					cm.sendOk("�������㲢û�����ǵĸ߼���Ա��,�ҿ��²��ܸ��������������,�Һܱ�Ǹ.�����ȹ����.");
				}
				
			}
			if (beauty == 2){
				if (cm.haveItem(5150007) == true){
					cm.gainItem(5150007, -1);
					cm.setHair(haircolor[selection]);
					cm.sendOk("����,����������̾����·�ɫ��!");
				}else if (cm.getPlayer().getCSPoints(1)>=980) {
					cm.getPlayer().modifyCSPoints(1,-980);
					cm.getPlayer().UpdateCash();
				  cm.setHair(haircolor[selection]);
				 	cm.sendOk("#e����,���������һ���ϲ�����������!");					
				}else {
					cm.sendOk("�������㲢û�����ǵĸ߼���Ա��,�ҿ��²��ܸ���Ⱦ��,�Һܱ�Ǹ.�����ȹ����.");
				}
			}
		}
	}
}