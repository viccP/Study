/*

    ����齱�ڴ��޸ģ�9310100_1�޸ļ�����޸ġ�����޸��ڣ�9310100_2


*/


var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var item = new Array(	// ��Ʒ
							3010000,//������
							3010002,//��ɫľ��
							3010002,//��ɫʱ��ת��
							3010004,//����������
							3010005,//����������
							3010006,//��ɫʱ��ת��

							3010008,//��ɫ��������
							3010009,//�齵�
							4000463,//��������
							3010012,//��ʿ ����
							3010013,//�Ƴ�����

							4000463,//��������
							1322031,//��������
							1432008,//�����
							1402044,//�Ϲϵ���
							1432009,//ľ����ǹ
							1302021,//��Ƥ��ͷ
							1002181,//�캣��ͷ��
							1002392,//����ͷ�����죩
							1002393,//����ͷ�����ۣ�
							4000463,//��������
							1102040,//�������磨�ƣ�
							1102043,//�������磨�֣�
							1082002,//��������
							1082145,//�������ף��ƣ�
							1082146,//�������ף��죩
							1082147,//�������ף�����
							1082148,//�������ף��ϣ�
							1082149,//�������ף��֣�
							1082002,//��������
							1082150,//�������ף��ң�
							1040135,//������

							2040804,//���׹�����60%
							2043001,//���ֽ�������60%
							2043101,//���ָ�������60%
							2043201,//���ֶ���������60%
							2043300,//�̽�������60%
							1082002,//��������
							2044001,//˫�ֽ�������60%
							2044101,//˫�ָ���������60%
							2044200,//˫�ֶ�����������60%
							2044301,//ǹ��������60%
							2044401,//ì��������60%
							2044501,//����������60%
							2044601,//�󹥻�����60%
							2044701,//ȭ�׹�������60%
							1082002,//��������
							2043701,//����ħ������60%
							2043801,//����ħ������60%
							1070000,//���Ь
							1070002,//��ʽľ��
							1070004,//�߽ŵ�ɽѥ(��)
							1062107,//���ǳ���
							1060113,//��Ա��
							1052000,//��ɫֽ��
							1002569,//����ͷ
							1002204,//����ñ
							2000004,//����ҩˮ
							2000005,//����ҩˮ

			                                2040301,//������������ 60
			                                2040302,//������������ 10
			                                2040304,//���������������70
			                                2040305,//���������������30
			                                2040306,//�������ݾ���70
			                                2040307,//�������ݾ���30
                                                        2040406,//������������70%
			                                2040407,//������������30
			                                2040410,//���������������70%
			                                2040411,//���������������30%
			                                2040501,//ȫ���������ݾ���60
			                                2040509,//ȫ���������ݾ���30
			                                2040513,//ȫ��������������60
			                                2040518,//ȫ��������������70
			                                2040519,//ȫ��������������30
			                                2040610,//��ȹ�����������70
			                                2040611,//��ȹ�����������30
			                                2043005,//���ֽ������������30
			                                2044005,//˫�ֽ������������30
			                                2044305,//ǹ�����������30
			                                2044405,//ì�����������30
			                                2044505,//�������������30
			                                2044605,//�󹥻��������30
			                                2044705,//ȭ�׹����������30
			                                1032004,//�����
			                                1032005,//��ʮ�ֶ���
			                                1032006,//�׵����
			                                1032007,//��ĸ�G����
			                                1032008,//è�۶���
			                                1032009,//�Ʒ�����
			                                1032012,//���ö���
			                                1032025,//Ҷ�Ӷ���
			                                1032028,//��ˮ������
			                                1032035,//��Ҷ����
			                                1032040,//��Ҷ�Ͷ���
			                                1032047,//���ֶ���
			                                1032055,//������ԱC�ľ����Ż�
			                                1032056,//������ԱC�ľ����Ż�
			                                1032057,//������ԱC�ľ����Ż�
			                                1032058,//������ԱC�������Ż�
			                                1002019,//��ͷ��
			                                1002020,//����ͷ��
			                                1002021,//ŵ��ͷ��
			                                1002023,//ǹ��ʿͷ��
			                                1002024,//��ĸ�G��ʿͷ��
			                                1002033,//��Ƥñ
			                                1002039,//��ͭͷ��
			                                1002040,//﮿�ñ
			                                1002041,//��ɫ����ͷ��
			                                1002051,//��ͭͷ��
			                                1002052,//﮿�ͷ��
			                                1002053,//��ɫƤñ
			                                1002054,//��ɫƤñ
			                                1002419,//��Ҷñ
			                                1002424,//������ñ
			                                1002425,//������ñ
			                                1002436,//����˹̹֮ñ
			                                1002441,//��Ѫͷ��
			                                1002448,//��ɫͷ��
			                                1002583,//�����ͷ��
			                                1002609,//�ö�ħ��ñ
			                                1102000,//��ɫð������
			                                1102001,//��ɫð������
			                                1102002,//��ɫð������
			                                1102147,//��߽�������
			                                1102174,//������Ա����
			                                1102166,//��Ҷ����
			                                1082000,//���ƶ�����
			                                1082008,//�����������
			                                1082009,//�����Ͻ�����
			                                1082031,//�ڶ�ָ����
			                                1082032,//��ͭ��������
			                                1082033,//﮿��������
			                                1082034,//�ڷ�������
			                                1082035,//���������
			                                1082036,//���������
			                                1082037,//��ͭ��������
			                                1082038,//﮿�������
			                                1082039,//�ھ�������
			                                1082042,//������������
			                                1082043,//����������
			                                1082044,//�ƽ𱩷�����
			                                1082045,//�ƽ�׷������
			                                1082046,//����׷������
			                                1082047,//�Ͽ�׷������
			                                1082048,//�ֻ�������
			                                1082049,//�̻�������
			                                1082050,//�ڻ�������

			                                1302016,//��ɫ��ɡ
			                                1302017,//��ɫ��ɡ
			                                1302019,//������
			                                1302020,//��Ҷս��
			                                1302021,//��Ƥ��ͷ
			                                1302022,//��
			                                1302024,//�ϱ�ֽ��
			                                1302025,//����ɡ
			                                1302050,//ս��
			                                1302058,//ð�յ�ɡ
			                                1302060,//ս��

			                                1312002,//����
			                                1312012,//Ǭ��Ȧ
			                                1312013,//�йٱ�
			                                1322000,//���ϴ�
			                                1322001,//����
			                                1322002,//�ִ�
			                                1322003,//������
			                                1322004,//���ʹ�
			                                1322005,//����
			                                1322006,//�ֹ�
			                                1322007,//Ƥ�������
			                                1322008,//007���
			                                1322009,//��Ͱ��
			                                1322010,//��������
			                                1322011,//��������
			                                1322071,//�ɿ�����
			                                1332000,//������
			                                1332001,//������
			                                1332031,//����
			                                1332032,//ʥ����
			                                1332033,//ˮ����
					                1332034,//������
			                                1372008,//��������
			                                1372012,//ˮ������
			            	                1372013,//����
		                          	        1372017,//��·��
			                                1382005,//��ĸ�G����
			                                1382006,//����֮��
			                                1382015,//��Ģ��
			                                1402006,//��ԭ֮��

			                                1402044,//�Ϲϵ���
			                                1412000,//˫�ָ�

			                                1412001,//����
			                                1412002,//������
			                                1412003,//̫��֮��
			                                1422004,//����
			                                1422005,//�ƽ�
			                                1422006,//ʮ�ָ�
			                                1422007,//���˴�
			                                1422008,//��

			                                1422036,//��߽��˵Ĵ���
			                                1432000,//��ǹ
			                                1432001,//��ǹ
			                                1432002,//��֧ǹ
			                                1432003,//��ǹ
		                         	        1432005,//˫���
			                                1432008,//�����
			                                1432009,//ľ����ǹ
			                                1442003,//���
			                                1442004,//�ϰ�
			                                1442006,//������
			                                1442007,//��Ӱ
			                                1442011,//���˰�
			                                1442012,//���ѩ��
			                                1442013,//�׺�ѩ��
		                        	        1442014,//��ѩ��
			                                1442015,//�ƽ�ѩ��
			                                1442016,//��ѩ��
		                        	        1442017,//��Ѫѩ��
			                                1442018,//������
		                        	        1442054,//��ɫ��ˮ��
			                                1442055,//��ɫ��ˮ��
			                                1442065,//��ɫ���˰�
			                                1452016,//Ư��֮��
		                        	        1462000,//ɽ����
			                                1462001,//��
			                                1462002,//ս����
			                                1462003,//����
			                                1462003,//����
			                                1462004,//ӥ��
			                                1462005,//˫����
			                                1462006,//������
			                                1462014,//��Ҷ����
		                          	        1472054,//����
		                          	        1462033,//ɽ����
	                          		        1472003,//�ƽ�ȭ��
		                          	        1472010,//���ȭ
	                          		        1472011,//��ͭ�ػ�ȭ��
	                          		        1702138,//�����

	                          		        2000004,//����ҩˮ
	                          		        2000005,//����ҩˮ			
	                          		        3010007,//��ɫ��������
	                          		        3010008,//��ɫ��������
                          			        3010009,//�齵�
                          			        3010010,//���񺣱�����
                          		  	        3010016,//��ɫ��������
       		                          	        3010017,//��ɫ��������
			                                3010024,//��߷�����
							3010034,//�Ƴ�����   ��ɫ   
							3010035,// �Ƴ�����   ��ɫ

			                                2040613,//��ȹ���ݾ���60%
			                                2040704,//Ь����Ծ����60
			                                2040705,//Ь����Ծ����10
			                                2040715,//Ь����Ծ����30
			                                2040804,//���׹�������60
			                                2040811,//���׹�������30
			                                2040810,//���׹�������70
			                                2040805,//���׹�������10
			                                2040816,//����ħ������10%
			                                2040817,//����ħ������60%
			                                2040815,//����ħ������30%
			                                2040922,//����ħ���������30%
			                                2040919,//����ħ���������60%
			                                2040921,//����ħ���������70%
			                                2040914,//���ƹ�������60%
			                                2040916,//���ƹ�������70%
			                                2040917,//���ƹ����������30%
			                                2041013,//������������60
			                                2041016,//������������60
			                                2041019,//�������ݾ���60
			                                2041022,//������������60
							1082002,//��������
							5150040,//�ʼ�����ȯ
							1302119,//��������䵶
							1312045,//������Ĵ�
							1322073,//���������ʿ��
							1332088,//������İ�Ӱ��
							1382070,//����������֮��
							1402064,//������ĸ�ԭ֮��
							1432057,//������Ĵ�ǹ
							1442082,//������ĸ��
							1452073,//������Ļ���֮��
							1462066,//�������ӥ��
							1472089,//������ĺ��ػ�ȭ��
							3010068,//¶ˮ����
							3010145,//6������ˮ����Ҷ����
							3010029,//������
							3010030,//�ڻ���
							3010031,//�컷��
							3010032,//�ƻ���
							3010033,//�̻���
							1002418//�ϱ�ֽͷ��
							);


							
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
					selStr = "\t\t#e#r��Һ͵�����������������ȡ���ֽ�ƷӴ��#n#k\r\n";
					selStr +="#d(PS����ע���Լ�����ÿһ��λ����һ����λ�������޷����)\r\n\\r\n";
					selStr += "#d��ǰ���: #r" + cm.getPlayer().getNX() + " #d�㡣\t#d��ǰ��ң�#r"+ cm.getPlayer().getMeso() +" #d��#k\r\n\r\n"
					selStr += "#L0##r"+aaa+" ����齱 [1000���һ��]#k#l\r\n\r\n";
					selStr += "#L1##b"+aaa+" ��ҳ齱 [100����һ��]#k#l\r\n\r\n";
					//selStr += "#L2##r"+aaa+" ��Ʒ�齱 [��Ҫ����������ö]#k#l\r\n\r\n";
					cm.sendSimple(selStr);
			} else if (status == 1) {
			if (selection == 0) {
                    var chance = Math.floor(Math.random()*item.length);
					var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                    if (cm.getPlayer().getNX() >= 1000) {
                     cm.gainNX(-1000);
                     cm.gainItem(item[chance],1); //
                     cm.sendOk("��ϲ���ɹ�����#r#z"+item[chance]+"##kһ����");
                     cm.serverNotice("������齱�� : ��ϲ " + cm.getChar().getName() + " ���� "+ ii.getName(item[chance]) +" һ��.");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"������齱��" + " : ��ϲ " + cm.getPlayer().getName() + " ���� "+ ii.getName(item[chance]) +" һ��.",true).getBytes());
					cm.dispose();
				} else {
					cm.sendOk("#bʧ�ܣ�#k\r\n\r\n1. ��û���㹻�ĵ����\r\n#r2. ��ȷ������ÿһ��λ����һ����λ�á�"); 
					cm.dispose();  
				}	
			} else if (selection == 1) {
	            /*var chance = Math.floor(Math.random()*item.length);
					var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                    if (cm.getMeso() >= 1000000) {
                     cm.gainMeso(-1000000);
                     cm.gainItem(item[chance],1); //
                     cm.sendOk("��ϲ���ɹ�����#r#z"+item[chance]+"##kһ����");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"����ҳ齱��" + " : ��ϲ " + cm.getPlayer().getName() + " ���� "+ ii.getName(item[chance]) +" һ��.",true).getBytes());
                     cm.serverNotice("����ҳ齱�� : ��ϲ " + cm.getChar().getName() + " ���� "+ ii.getName(item[chance]) +" һ��.");
					cm.dispose();
				} else {
					cm.sendOk("#bʧ�ܣ�#k\r\n\r\n1. ��û���㹻�Ľ�ҡ�\r\n#r2. ��ȷ������ÿһ��λ����һ����λ�á�"); // �ж���Ҫ����Ʒ */
				        cm.dispose(); 
                                        cm.openNpc(9310100,2);		
			} else if (selection == 2) {
                    /*var chance = Math.floor(Math.random()*item.length);
					var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                    if (cm.haveItem(4000463) == 3) { // �ж���Ҫ����Ʒ
                     cm.gainItem(4000463, -3);   // �۳���Ҫ����Ʒ
                     cm.gainItem(item[chance],1); //
                     cm.sendOk("��ϲ���ɹ�����#r#z"+item[chance]+"##kһ����");
                     //cm.serverNotice("������ҳ齱�� : ��ϲ " + cm.getChar().getName() + " ���� "+ ii.getName(item[chance]) +" һ��.");
                     //cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"������ҳ�󽱡�" + " : ��ϲ " + cm.getPlayer().getName() + " ���� "+ ii.getName(item[chance]) +" һ��.",true).getBytes());
					cm.dispose();
				} else {
					cm.sendOk("#bʧ�ܣ�#k\r\n\r\n1. ��û���㹻����Ʒ����Ҫ #i4000463# x 3����\r\n#r2. ��ȷ������ÿһ��λ����һ����λ�á�"); // �ж���Ҫ����Ʒ����*/
					cm.dispose();  
					cm.openNpc(9310100,1);
				}
			}
		}
	}