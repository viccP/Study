function start() {


if(cm.getChar().getMapId() != 103000902) {
cm.sendOk("�����ڵĵ�ͼ����ȷ�����NPC���ܲ���������ط�ʹ�õ�")
} else {
    cm.sendSimple ("#e�����ء������ҵ����ӱ������ܸ�ץ���ˣ������԰��Ұ����ȳ����𣬶����һ���Ҫ��500Ԫ������·�ѻؼң�����������԰�����\r\n#dʣ��:#r" +  cm.getzb() + "Ԫ��\r\n#L1#·�Ѹ��㣬����ȥ��#l \r\n#L0#����ȥ�Ұ���ȥ����#l  ");
    }
}
function action(mode, type, selection) {
        cm.dispose();
    

                         if (selection == 0) {
                                if (!cm.haveItem(4001110,1)) {
				cm.sendOk("��Ǹ����û��1��#v4001110#");
                                } else if (cm.getChar().getLevel() < 100) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����100���޷�Ϊ���ͣ�����̫Σ���ˡ�");
                                } else if (cm.getChar().getLevel() > 200) {
                                cm.sendOk("�ܱ�Ǹ,��ĵȼ�����200���޷�Ϊ�㴫����,#r��ת���Ժ�������");
				} else if (cm.getParty() == null) {
				cm.sendOk("��Ǹ��û����ӣ��޷����룬�����Ҫһ���˽�ȥ������Դ���һ�����飨����������ֻ����һ���ˣ�");
				} else if (!cm.isLeader()) {
				cm.sendOk("�������, ��ô�� #b�����ӳ�#k �������ң�");
				} else if (cm.getParty().getMembers().size() > 5) {
				cm.sendOk("��Ǹ���ֻ�ܴ�5�����ѽ����ħ�㳡");
                                } else if (cm.getBossLog('blxboss') < 3){
                                cm.setBossLog('blxboss');
				em = cm.getEventManager("blxboss");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("��ʿ��ץ��ʱ�䰡������ս��ʱ��ֻ��1��Сʱ���������1��Сʱ֮�ڻ�û�а�BOSS��������ҽ����㴫�͵������г�");
                                cm.serverNotice("����ս�����ܡ�����"+ cm.getChar().getName() +"���������Ķ��ѿ�ʼ��ս��˵�еġ������ܡ�");  
                                cm.gainItem(4001035, -100);
				} else {			
                    		cm.sendOk("�Բ���ÿ��ֻ����ս3�Ρ������ܡ�");
				}
				cm.dispose();
    } else if (selection == 1) {
                                if(cm.getzb() >= 500) {
                                cm.setzb(-500);
                                cm.sendOk("���#v4001110#��үү����������");
	                        cm.gainItem(4001110, 1);
                                cm.dispose(); 
                        } else {
                                cm.sendOk("#e���Ѿ�û��Ԫ���ˣ��뼴ʱ��ֵ����ǰ��ͼ����ȷ"); 
                                cm.dispose(); 
                               }
    } else if (selection == 2) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400572, 20000000, 8230000, 1);//����ħ(�e��)
    } else if (selection == 3) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400536, 18000000, 8230000, 1);//����ħ(��ӡ)
    } else if (selection == 4) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400120, 18000000, 5500, 1);//���ϰ� 
    } else if (selection == 5) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400121, 75000000, 3900000, 1);//Ů�ϰ� 
    } else if (selection == 6) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400112, 400000000, 13800000, 1);//����A 
    } else if (selection == 7) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400113, 500000000, 10500000, 1);//����B
    } else if (selection == 8) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400300, 150000000, 17500000, 1);//��ɮ
    } else if (selection == 9) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400549, 3500000, 300000, 1);//����
    } else if (selection == 10) {
                    		cm.sendPrev("#b�����ͼ����");
				cm.dispose();
    } else if (selection == 11) {
        cm.gainMeso(-1000000);
        cm.summonMob(8180000, 3700000, 13500, 1);//������
    } else if (selection == 12) {
        cm.gainMeso(-1000000);
        cm.summonMob(9300012, 18000000, 4800, 1);//����ɯ��
    } else if (selection == 13) {
        cm.gainMeso(-1000000);
        cm.summonMob(8220001, 18000000, 4800, 1);//����ѩ

    } else if (selection == 42) {
        cm.gainMeso(-1000000);
        cm.summonMob(6130207, 1670000, 1200, 20);//Գ��
    } else if (selection == 43) {
        cm.gainMeso(-1000000);
        cm.summonMob(4230102, 1850000, 5500, 30);//������ 
    } else if (selection == 44) {
        cm.gainMeso(-5000000);
        cm.summonMob(9001000, 1800000, 450, 5);//�̹�
        cm.summonMob(9001001, 1800000, 450, 5);
        cm.summonMob(9001002, 1800000, 450, 5);
        cm.summonMob(9001003, 1800000, 450, 5);
    } else if (selection == 45) {
        cm.gainMeso(-5000000);
        cm.summonMob(100100, 4000000, 105000, 8);//����ţ 
    } else if (selection == 46) {
        cm.gainMeso(-5000000);
        cm.summonMob(7130001, 75000000, 11000, 20);//��Ȯ
    } else if (selection == 47) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140500, 150000000, 17500, 10);//������Ȯ
    } else if (selection == 48) {
        cm.gainMeso(-5000000);
        cm.summonMob(7130200, 1800000, 30000, 10);//����
    } else if (selection == 49) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140000, 5000000, 10000, 8);//����
    } else if (selection == 50) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140100, 5000000, 10000, 8);//��������ѩ�� 
    } else if (selection == 51) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140103, 1800000, 10500, 1);//����������
    } else if (selection == 52) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140101, 2000000, 12000, 1);//���ڰ�����
    } else if (selection == 53) {
        cm.gainMeso(-5000000);
        cm.summonMob(8810020, 1800000, 10000, 8);//������ 
    } else if (selection == 54) {
        cm.gainMeso(-5000000);
        cm.summonMob(8810021, 1800000, 10000, 8);//�ڷ���
    } else if (selection == 55) {
        cm.gainMeso(-5000000);
        cm.summonMob(8810023, 2200000, 15000, 10);//а��˫������
    } else if (selection == 56) {
        cm.gainMeso(-5000000);
        cm.summonMob(9300077, 3000000, 20000, 20);//������
    } else if (selection == 57) {
        cm.gainMeso(-5000000);
        cm.summonMob(8150101, 1800000, 10000, 20);//������� 
    } else if (selection == 58) {
        cm.gainMeso(-5000000);
        cm.summonMob(8142100, 1800000, 10000, 20);//���������� 
    } else if (selection == 59) {
        cm.gainMeso(-5000000);
        cm.summonMob(8160000, 4000000, 11500, 10);//ʱ������ 
    } else if (selection == 60) {
        cm.gainMeso(-5000000);
        cm.summonMob(8170000, 5000000, 11500, 10);//�ڼ�����
    } else if (selection == 61) {
        cm.gainMeso(-5000000);
        cm.summonMob(8141100, 6000000, 12500, 10);//������
    } else if (selection == 62) {
        cm.gainMeso(-5000000);
        cm.summonMob(8143000, 6000000, 12500, 10);//ʱ֮���� 
    } else if (selection == 100) {
        cm.gainMeso(-5000000);
        cm.gainItem(4000019,200);//��ɫ��ţ�� 
    } else if (selection == 101) {
        cm.gainMeso(-5000000);
        cm.gainItem(4000000,200);//��ɫ��ţ��  
    } else if (selection == 102) {
        cm.gainMeso(-5000000); 
        cm.gainItem(4000016,200);//��ɫ��ţ�� 
    } else if (selection == 72) {
        cm.gainMeso(-10000000);
        cm.summonMob(8220000, 1670000, 1200, 1);//�����
    } else if (selection == 73) {
        cm.gainMeso(-10000000);
        cm.summonMob(3220001, 1850000, 5500, 1);//����
    } else if (selection == 74) {
        cm.gainMeso(-10000000);
        cm.summonMob(4220000, 1800000, 450, 1);//Ъ����
    } else if (selection == 75) {
        cm.gainMeso(-10000000);
        cm.summonMob(5220002, 4000000, 105000, 1);//��ʿ��
    } else if (selection == 76) {
        cm.gainMeso(-10000000);
        cm.summonMob(6220000, 75000000, 11000, 1);//���
    } else if (selection == 77) {
        cm.gainMeso(-10000000);
        cm.summonMob(6220001, 150000000, 17500, 1);//��ŵ
    } else if (selection == 78) {
        cm.gainMeso(-10000000);
        cm.summonMob(7220001, 1800000, 30000, 1);//��β��
    } else if (selection == 79) {
        cm.gainMeso(-10000000);
        cm.summonMob(7220002, 5000000, 10000, 1);//������ʿ
    } else if (selection == 80) {
        cm.gainMeso(-10000000);
        cm.summonMob(8220002, 5000000, 10000, 1);//������
    } else if (selection == 81) {
        cm.gainMeso(-10000000);
        cm.summonMob(8220003, 1800000, 10500, 1);//����
    } else if (selection == 82) {
        cm.gainMeso(-10000000);
        cm.summonMob(9300151, 2000000, 12000, 1);//������
    } else if (selection == 83) {
        cm.gainMeso(-10000000);
        cm.summonMob(9300151, 1800000, 10000, 1);//��ŭ������
    } else if (selection == 84) {
        cm.gainMeso(-10000000);
        cm.summonMob(9400014, 1800000, 10000, 1);//�칷
    } else if (selection == 85) {
        cm.gainMeso(-10000000);
        cm.summonMob(9400575, 2200000, 15000, 1);//�ɰ����

    } 
    
    if (selection == 110) {
        cm.warp(100000000, 0);
		cm.dispose();
    } 
    
}