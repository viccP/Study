/**
 ***@��Ѩ̽���*** 
 *@NPCName:������ ID:2081011
 *@������������������
 *@���ÿ�գ�2��
 **/
var ��Ѩ�������� = "#v3010012##v3010013##v3010034##v3010043##v3010049##v3010057##v3010070##v3010075#";
var ��Ѩ����װ�� = "#v1032055##v1122001##v1002391##v1002392##v1002393##v1002394##v1002395##v1002508##v1002509##v1102139##v1102147##v1302058##v1302060##v1402014##v2022570##v2022571##v2022572##v2022573##v2022574##v2022613##v2022648#";
function start() {
    var ������� = cm.getBossLog('ewai')
    var ̽������ = 2+cm.getChar().getVip()+�������;
var ʣ����� = ̽������-cm.getBossLog('tb');
	if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()){
	cm.sendOk("������Ӧ����װ�����ճ�һ��");
	cm.dispose();
	}else{
    cm.sendSimple ("#bÿ�տ������2�β�����Ѩ̽���Ŷ��\r\n���տ��Բμ� "+ʣ�����+" ��.̽����"+cm.getBossLog('tb')+"��.������"+�������+"��.\r\n#L1#������Ѩ̽��\r\n#L2#����̽������<200���һ��>\r\n#L3#�鿴���ｱ��");    
	}
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
	if (cm.getBossLog('tb') < "+̽������+"){
           cm.sendOk("2222222222"); 
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����11"); 
        cm.setBossLog('tb');
	cm.dispose();}
} else if (selection == 1) { //������Ѩ̽��
 var ������� = cm.getBossLog('ewai')
var ̽������ = 2+cm.getChar().getVip()+�������;
var ʣ����� = ̽������-cm.getBossLog('tb');
	if (""+ʣ�����+"" == 0){
           cm.sendOk("�Բ�����û�д�����~����㻹�����̽��������ѡ����̽��������"); 
        }else{
            cm.setBossLog('tb');
        cm.openNpc(2081011,0);}
} else if (selection == 2) { //����̽������
	if(cm.getChar().getNX() >= 200) {
            cm.gainNX(-200); 
	cm.setBossLog('ewai');
        cm.sendOk("������һ��~"); 
        }else{
        cm.sendOk("�Բ���~������㣡"); 
	cm.dispose();}
} else if (selection == 3) { //�鿴��Ѩ����
	if(cm.getChar().getNX() >= 0) {
cm.sendOk(""+��Ѩ��������+""+��Ѩ����װ��+"\r\n#e#r����ֻ��һ���֣�����N������ڴ��������ߣ�"); 
        cm.dispose();
        }else{
        cm.sendOk("��ĵ�������⣡���Ѿ�֪ͨGM�ˣ�"); 
	cm.dispose();}
} else if (selection == 4) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1332074,1);//���������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 5) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1372044,1);//���������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 6) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1382057,1);//���������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 7) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1402046,1);//������ڤ��
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 8) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1412033,1);//����������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 9) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1422037,1);//����������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 10) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1432047,1);//������ʥǹ
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 11) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1442063,1);//��������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 12) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1452057,1);//���㾪�繭
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 13) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1462050,1);//����ڤ����
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 14) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1472068,1);//����󱯸�
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 15) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1482023,1);//�����ȸ��
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 16) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1492023,1);//�������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 17) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072355,1);//������ѥ
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 18) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072356,1);//�������Ь
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 19) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072357,1);//����ʺ�Ь
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 20) {
	if(cm.gainNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072358,1);//�������ѥ
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 21) {
	if(cm.gainNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072359,1);//���㶨��ѥ
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 22) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052155,1);//����������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 23) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052156,1);//���������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 24) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052157,1);//����Ѳ����
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 25) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052158,1);//���㷭�Ʒ�
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 26) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052159,1);//������ߺ�
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 27) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082234,1);//���㶨������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 28) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082235,1);//������ң����
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 29) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082236,1);//�����������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 30) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082237,1);//����̽������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 31) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082238,1);//���㸧������
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}

} else if (selection == 32) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002776,1);//����ھ���
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 33) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002777,1);//��������ñ 
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 34) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002778,1);//��������ñ 
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 35) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002778,1);//��������ñ 
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 36) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002780,1);//���㺣���� 
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 37) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1102172,1);//���㲻������ 
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 38) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1092057,1);//����ħ��� 
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 39) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1092058,1);//���㺮����
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 40) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1092059,1);//�������ٶ� 
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
} else if (selection == 41) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1032031,1);//������׹ 
        }else{
        cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����"); 
	cm.dispose();}
}
}