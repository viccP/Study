var fywq = 45222;
var fy   = 4001126;//��Ҷ
var fys  = 500;//��ȡ����������
function start() {


if (cm.getLevel() > 0 ) {  
    cm.sendSimple ("���~��������ð�յ��Ѿ��ɹ��������������ˣ�Ϊ����ף����������⿪������װ������Ŷ��\r\n<ÿ��װ����Ҫ����"+fys+"��#v"+fy+"#>\r\n#b#L0##z1302030# #l#L1##z1382012##l #L2##z1472032##l #L3##z1452022##l\r\n#L4##z1432012##l #L5##z1462019##l #L6##z1442024# #L7##z1002419##l");
    } else {
    cm.sendOk("����ʲô�£���Ҫ�����ҵ�����������Ҫ�㹻������")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1302030,1);//��Ҷ��
        }else{
        cm.sendOk("��Ǹ.��û���Ѽ��㹻�ķ�Ҷ"); 
	cm.dispose();}
} else if (selection == 1) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1382012,1);//2
        }else{
       cm.sendOk("��Ǹ.��û���Ѽ��㹻�ķ�Ҷ"); 
	cm.dispose();}
} else if (selection == 2) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1472032,1);//2
        }else{
        cm.sendOk("��Ǹ.��û���Ѽ��㹻�ķ�Ҷ"); 
	cm.dispose();}
} else if (selection == 3) { 
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1452022,1);//3
        }else{
        cm.sendOk("��Ǹ.��û���Ѽ��㹻�ķ�Ҷ"); 
	cm.dispose();}
} else if (selection == 4) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1432012,1);//4
        }else{
        cm.sendOk("��Ǹ.��û���Ѽ��㹻�ķ�Ҷ"); 
	cm.dispose();}
} else if (selection == 5) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1462019,1);//5
        }else{
       cm.sendOk("��Ǹ.��û���Ѽ��㹻�ķ�Ҷ"); 
	cm.dispose();}
} else if (selection == 6) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1442024,1);//
        }else{
         cm.sendOk("��Ǹ.��û���Ѽ��㹻�ķ�Ҷ"); 
	cm.dispose();}
} else if (selection == 7) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1002419,1);//
        }else{
        cm.sendOk("��Ǹ.��û���Ѽ��㹻�ķ�Ҷ"); 
	cm.dispose();}
} else if (selection == 8) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302061,1);//���ٱ���
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 9) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1402063,1);//ӣ��ɡ
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 10) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1402029,1);//���������
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 11) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302027,1);//����ɡ
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 12) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302085,1);//����
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 13) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302028,1);//����ɡ
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 14) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302016,1);//��ɫ��ɡ
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 15) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302049,1);//���߱���
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 16) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302029,1);//����ɡ
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 17) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302061,1);//���ٱ���
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 18) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302025,1);//����ɡ
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 19) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302084,1);//���
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 20) {
	if(cm.getzb() >= 300000) {
            cm.setzb(-300000); 
	cm.gainItem(1442018,1);//������
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 21) {
	if(cm.getzb() >= 300000) {
            cm.setzb(-300000); 
	cm.gainItem(1322051,1);//��Ϧ
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 22) {
	if(cm.getzb() >= 300000) {
            cm.setzb(-300000); 
	cm.gainItem(1302080,1);//�߲��޺����
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 23) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3012001,1);//����
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 24) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3012002,1);//ԡͰ
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 25) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010046,1);//������
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 26) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010047,1);//������
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 27) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010041,1);//��������
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 28) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010043,1);//ħŮ�ķ�ɨ��
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 29) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010051,1);//ɳĮ����1����
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 30) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010052,1);//ɳĮ����2����
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 31) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010044,1);//ͬһ��ɡ��
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 32) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010036,1);//������ǧ
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}
} else if (selection == 33) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010019,1);//��˾�� 
        }else{
        cm.sendOk("��Ǹ��û���㹻��Ԫ��"); 
	cm.dispose();}

} else if (selection == 34) {
	if(cm.getMeso() <= 21000000) {
        cm.sendOk("��Ǹ��û��2100���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-21000000);
        cm.summonMob(8160000, 700000, 26500, 30);ʱ������ 
	cm.dispose(); } 

} else if (selection == 60) {
	if(cm.getMeso() <= 22000000) {
        cm.sendOk("��Ǹ��û��2200���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-22000000);
        cm.summonMob(8170000, 850000, 27500, 30);�ڼ�����
	cm.dispose(); } 

} else if (selection == 61) {
	if(cm.getMeso() <= 23000000) {
        cm.sendOk("��Ǹ��û��2300���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-23000000);
        cm.summonMob(8141100, 900000, 28500, 30);������
	cm.dispose(); } 
} else if (selection == 62) {
	if(cm.getMeso() <= 24000000) {
        cm.sendOk("��Ǹ��û��2400���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-24000000);
        cm.summonMob(8143000, 1000000, 30000, 30);ʱ֮���� 
	cm.dispose(); } 
} else if (selection == 63) {
        if (cm.getBossLog('EMGC') < 1) {
cm.warp(910000022, 0);
                    cm.setBossLog('EMGC');
                    cm.dispose();
                }else{
                    cm.sendOk("��ÿ��ֻ�ܽ���1�γ�����ħ�㳡!");
                    mode = 1;
                    status = -1; }
} else if (selection == 64) {
         cm.warp(209000001, 0);
         cm.dispose();  
                
}
}