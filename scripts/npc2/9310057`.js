
/*
��ԵNPC
��Ҷ��ȡ���
*/

importPackage(net.sf.odinms.client);

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
                
			cm.sendOk("�����������Ҳ����㽻���ѣ�");
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
			cm.sendSimple("ð�յ�ʲô��ֵǮ����Ȼ�ǵ���ˣ���ð�ձ��㹻�࣬����û��һ���װ�㻹���ƨ����\r\n������������������÷�Ҷ�һ������Ŷ��\r\n#b������1:1\r\n#L1##b50����Ҷ�һ�50���#n\r\n#L2##b500����Ҷ�һ�500���#k\r\n#L3##b1000����Ҷ�һ�1000���#k\r\n#L4##b2000����Ҷ�һ�2000���#k ");
			} else if (status == 1) { //ʹ��50��Ҷ��ȡ50���
			if (selection == 1) {
			if (cm.haveItem(4001126, 50)) {
                        cm.gainItem(4001126,-50);
			cm.gainNX(50);
			cm.sendOk("�ɹ��һ�");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("����~");
			cm.dispose(); }
//-------------------------------������ת����-----------------------------
			} else if  (selection == 2) { //ʹ��500��Ҷ500���
			if (cm.haveItem(4001126, 500)) {
                        cm.gainItem(4001126,-500);
			cm.gainNX(500);
			cm.sendOk("�ɹ��һ�");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("����~");
			cm.dispose(); }
//------------------------------�߼�����һ�----------------------------------
            } else if (selection == 3) { //1000�һ�1000
			if (cm.haveItem(4001126, 1000)) {
                        cm.gainItem(4001126,-1000);
			cm.gainNX(1000);
			cm.sendOk("�ɹ��һ�");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("����~");
			cm.dispose(); }
//--------------------------------����һ�------------------------------------
            } else if (selection == 4) {
			if (cm.haveItem(4001126, 2000)) {
                        cm.gainItem(4001126,-2000);
			cm.gainNX(2000);
			cm.sendOk("�ɹ��һ�");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("����~");
			cm.dispose(); }
//-------------------------------���ڵ��㳡------------------------------------
	                 } else if (selection == 5) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1372058,1);
			cm.sendOk("�ɹ��һ���װ��!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�����~");
			cm.dispose(); }
	                 } else if (selection == 6) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1382080,1);
			cm.sendOk("�ɹ��һ���װ��!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�����~");
			cm.dispose(); }
	                 } else if (selection == 7) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1452085,1);
			cm.sendOk("�ɹ��һ���װ��!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�����~");
			cm.dispose(); }
	                 } else if (selection == 8) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1462075,1);
			cm.sendOk("�ɹ��һ���װ��!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�����~");
			cm.dispose(); }
	                 } else if (selection == 9) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1332099,1);
			cm.sendOk("�ɹ��һ���װ��!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�����~");
			cm.dispose(); }
	                 } else if (selection == 10) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1472100,1);
			cm.sendOk("�ɹ��һ���װ��!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�����~");
			cm.dispose(); }
	                 } else if (selection == 11) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1482046,1);
			cm.sendOk("�ɹ��һ���װ��!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�����~");
			cm.dispose(); }
	                 } else if (selection == 12) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1492048,1);
			cm.sendOk("�ɹ��һ���װ��!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("�����~");
			cm.dispose(); }


}}
	}
}