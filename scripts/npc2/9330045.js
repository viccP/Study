
/*
5340000  ����
5350000  �߼������ͷ
5340001  �߼����
*/

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	
	action(1, 0, 0);
}

function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
			cm.sendOk("��~������һ��ΰ���ְҵ");
			cm.dispose();
			return;                    
                }
                if (mode == 1) {
			status++;
		}
		else {
			status--;
		} 
		        if (status == 0) {
                            if(cm.getLevel() <= 1){
                                cm.sendOk("������ˣ�����֪���Ҳ����������ģ�ɵȱ�� ?");
                               cm.dispose(); 
                            }else{
			cm.sendSimple("���!����ʲô��Ҫ��������?\r\n#L1##b������㳡#k\r\n#L2##b�����������#k\r\n#L3##bʹ�ø߼����ͷ�һ����#k\r\n#L4##b������ͨ���#k\r\n#L5##b���㳡�Ľ���#k");
                            }
			} else if (status == 1) { //������㳡
			if (selection == 1) {
			if (cm.haveItem(5340001, 1)|| (cm.haveItem(5340000, 1))) { 
		   	cm.warp(741000201);
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("��û�н����泡��Ҫ��#b�߼����#k����#b��ͨ���#k.�Ҳ��������ȥ");
			cm.dispose(); }
//-------------------------------�����������-----------------------------
			} else if  (selection == 2) { 
			if ((cm.getMeso() >= 500000)&&(cm.haveItem(3011000, 1))||(cm.getMeso() <= 500000)) { 
                   	cm.sendOk("���ð�ձҲ��㣬�������Ѿ�����һ�������ˣ�");
                   	cm.dispose();
                   	} else {
		   	cm.sendOk("���Ѿ��ɹ����˵������ӣ���������50��ð�ձң�"); 
			cm.gainItem(3011000,1); //��������
			cm.gainMeso(-500000);
		   	cm.dispose(); }
//------------------------------�߼�����һ�----------------------------------
            } else if (selection == 3) {
           	   if (cm.haveItem(5350000, 1)) { 
                   cm.gainItem(5350000,-1);
                   cm.gainItem(2300001,100);
                   cm.sendOk("�һ��ɹ���");
                   cm.dispose();
                   } else {
		   cm.sendOk("��û�и߼����~"); 
		   cm.dispose(); }
//--------------------------------����һ�------------------------------------
            } else if (selection == 4) {
           	 if ((cm.getMeso() >= 3000000)) { 
                   cm.gainItem(2300000,50);
		   cm.gainMeso(-3000000);
                   cm.sendOk("�һ��ɹ���");
                   cm.dispose();
                   } else {
		   cm.sendOk("ð�ձҲ���~��Ҫ3000000ð�ձ�"); 
		   cm.dispose(); }
//-------------------------------���ڵ��㳡------------------------------------
	                 } else if (selection == 5) {
                   cm.sendNextPrev("������㳡��Ҫ#b�߼����#k����#b���#k,Ҳ��Ҫ#b���㳡ר������#k,��#b���#k,��Щ�㶼����ͨ����������.#b���#k��ȥ������̳�����!");
                   cm.dispose();
		}}
	}
}