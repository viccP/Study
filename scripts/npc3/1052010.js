//function start() {

if (cm.getChar().getMapId() == 103000909){
    cm.sendSimple ("��ϲ��ͨ�����п��飬������Ҫ��ȡ������\r\n#L0#��ȡ����#l");
    } else {
    cm.sendOk("����ʲô�£���Ҫ�����ҵ�����������Ҫ�㹻������")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
            if (cm.getBossLog('TGJL') >= 10) {
            cm.sendOk("��Ǹ��ֻ�ܲμ�10��");
	    cm.dispose();
        }else{
            cm.gainNX(1000);
            cm.setzb(10000);
        cm.gainMeso(100000000);
            cm.setBossLog('TGJL');
        cm.warp(910000000, 0);
cm.serverNotice("�����ع��桻����"+ cm.getChar().getName() +"��ͨ�������п������ˡ�1000���1��Ԫ����1����Ϸ�ҡ�");  
	cm.dispose();}
} else if (selection == 1) {
	if(cm.haveItem(4021010)) {
cm.serverNotice("��糺���ʿ�Ź��桻����"+ cm.getChar().getName() +"���������Ķ��ѳɹ��Ļ���糺���ʿ�š��޾�з����ʼ��ս�ڶ���");  
        cm.warp(926100000, 0);
	cm.gainItem(4021010, -1000);
	cm.dispose();
        }else{ 
        cm.sendOk("�����BOSS���ҵõ�ͨ��ƾ֤�Ҳſ�������ͨ��"); 
	cm.dispose(); } 
} else if (selection == 2) {
	if(cm.haveItem(4001035,1)) {
        cm.sendOk("������ͨ��֤�ָ����ǵĻ���ǡ���һ����һ�š��Ϳ����ˣ�������һ���������ж���ͨ��֤�����ڰ��㴫�͹�ȥ��ʱ�򣬶�����������"); 
	cm.gainItem(4021010,5);
	cm.gainItem(4001035, -100);
        }else{ 
        cm.sendOk("������˼����Ҫ#v4001035#1���һ�ͨ��ƾ֤"); 
	cm.dispose(); } 
} else if (selection == 3) { 
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400536, 38000000, 35230000, 1);����ħ(��ӡ)
	cm.dispose(); } 
} else if (selection == 4) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400120, 48000000, 50000000, 1);���ϰ� 
	cm.dispose(); } 
} else if (selection == 5) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400121, 75000000, 55000000, 1);Ů�ϰ� 
	cm.dispose(); } 
} else if (selection == 6) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400112, 400000000, 100800000, 1);����A 
	cm.dispose(); } 
} else if (selection == 7) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400113, 500000000, 125500000, 1);����B
	cm.dispose(); } 
} else if (selection == 8) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400300, 600000000, 175000000, 1);��ɮ
	cm.dispose(); } 
} else if (selection == 9) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400549, 700000000, 200300000, 1);����
	cm.dispose(); } 
} else if (selection == 10) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(8180001, 850000000, 235000000, 1);��ӥ
	cm.dispose(); } 
} else if (selection == 11) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.summonMob(8180000, 903700000, 250135000, 1);������
        cm.gainMeso(-50000000);
	cm.dispose(); } 
} else if (selection == 12) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9300012, 900000000, 290000000, 1);����ɯ��
	cm.dispose(); } 
} else if (selection == 13) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(8220001, 1100000000, 350048000, 1);����ѩ��
	cm.dispose(); } 
} else if (selection == 110) {
	if(cm.getMeso() <= 50) {
        cm.sendOk("��Ǹ��û��50���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.warp(100000000, 0);
        cm.gainMeso(-50);
	cm.dispose(); } 
} else if (selection == 100) {
	if(cm.getMeso() <= 300000000) {
        cm.sendOk("��Ǹ��û��3E���Ҳ��ܸ���"); 
        }else{
        cm.gainMeso(-300000000); 
        cm.gainItem(4031048,1);�齱��
	cm.dispose(); } 


} else if (selection == 41) {
	if(cm.getMeso() <= 3000000) {
        cm.sendOk("��Ǹ��û��300���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-3000000);
        cm.summonMob(9500167, 90000, 6005, 30);����
	cm.dispose(); } 
} else if (selection == 42) {
	if(cm.getMeso() <= 4000000) {
        cm.sendOk("��Ǹ��û��400���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-4000000);
        cm.summonMob(6130207, 95000, 6500, 30);Գ��
	cm.dispose(); } 

} else if (selection == 43) {
	if(cm.getMeso() <= 5000000) {
        cm.sendOk("��Ǹ��û��500���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-5000000);
        cm.summonMob(4230102, 100000, 7050, 30);������ 
	cm.dispose(); } 

} else if (selection == 44) {
	if(cm.getMeso() <= 6000000) {
        cm.sendOk("��Ǹ��û��600���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-6000000);
        cm.summonMob(9001000, 2500000, 4500, 3);�̹�
        cm.summonMob(9001001, 2500000, 4500, 3);
        cm.summonMob(9001002, 2500000, 4500, 3);
        cm.summonMob(9001003, 2500000, 4500, 3);
	cm.dispose(); } 

} else if (selection == 45) {
	if(cm.getMeso() <= 7000000) {
        cm.sendOk("��Ǹ��û��700���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-7000000);
        cm.summonMob(100100, 105000, 7500, 30);����ţ 
	cm.dispose(); } 

} else if (selection == 46) {
	if(cm.getMeso() <= 8000000) {
        cm.sendOk("��Ǹ��û��800���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-8000000);
        cm.summonMob(7130001, 110000, 8000, 30);��Ȯ

	cm.dispose(); } 

} else if (selection == 47) {
	if(cm.getMeso() <= 9000000) {
        cm.sendOk("��Ǹ��û��900���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-9000000);
        cm.summonMob(8140500, 110000, 8000, 30);������Ȯ
	cm.dispose(); } 

} else if (selection == 48) {
	if(cm.getMeso() <= 10000000) {
        cm.sendOk("��Ǹ��û��1000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-10000000);
        cm.summonMob(7130200, 115000, 8500, 30);����
	cm.dispose(); } 

} else if (selection == 49) {
	if(cm.getMeso() <= 11000000) {
        cm.sendOk("��Ǹ��û��1100���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-11000000);
        cm.summonMob(8140000, 120000, 9000, 30);����
	cm.dispose(); } 

} else if (selection == 50) {
	if(cm.getMeso() <= 12000000) {
        cm.sendOk("��Ǹ��û��1200���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-12000000);
        cm.summonMob(8140100, 150000, 10000, 30);��������ѩ�� 
	cm.dispose(); } 

} else if (selection == 51) {
	if(cm.getMeso() <= 13000000) {
        cm.sendOk("��Ǹ��û��1300���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-13000000);
        cm.summonMob(8140103, 155000, 10500, 30);����������
	cm.dispose(); } 

} else if (selection == 52) {
	if(cm.getMeso() <= 14000000) {
        cm.sendOk("��Ǹ��û��1400���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-14000000);
        cm.summonMob(8140101, 160000, 12000, 30);���ڰ�����
	cm.dispose(); } 

} else if (selection == 53) {
	if(cm.getMeso() <= 15000000) {
        cm.sendOk("��Ǹ��û��1500���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-15000000);
        cm.summonMob(8810020, 180000, 13000, 10);������ 
	cm.dispose(); } 

} else if (selection == 54) {
	if(cm.getMeso() <= 16000000) {
        cm.sendOk("��Ǹ��û��1600���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-16000000);
        cm.summonMob(8810021, 185000, 13500, 10);�ڷ���
	cm.dispose(); } 

} else if (selection == 55) {
	if(cm.getMeso() <= 17000000) {
        cm.sendOk("��Ǹ��û��1700���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-17000000);
        cm.summonMob(8810023, 220000, 15000, 10);а��˫������
	cm.dispose(); } 

} else if (selection == 56) {
	if(cm.getMeso() <= 18000000) {
        cm.sendOk("��Ǹ��û��1800���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-18000000);
        cm.summonMob(9300077, 350000, 20000, 30);������
	cm.dispose(); } 

} else if (selection == 57) {
	if(cm.getMeso() <= 19000000) {
        cm.sendOk("��Ǹ��û��1900���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-19000000);
        cm.summonMob(8150101, 550000 , 25000, 30);������� 
	cm.dispose(); } 

} else if (selection == 58) {
	if(cm.getMeso() <= 20000000) {
        cm.sendOk("��Ǹ��û��2000���Ҳ���Ϊ���ٻ�"); 
        }else{ 
        cm.gainMeso(-20000000);
        cm.summonMob(8142100, 600000, 26000, 30);���������� 
	cm.dispose(); } 

} else if (selection == 59) {
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