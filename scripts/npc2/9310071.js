/* 
 * �ű�����: cm
 * �ű���;: ����н�
 * �ű�����: ����ؼ
 * ����ʱ��: 2014/12/18
 */
importPackage(net.sf.cherry.client);
var status = -1;
var beauty = 0;
var tosend = 0;
var sl;
var mats;
function start() {
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
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("�����Ҫ����н�����������Ұɡ�");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            var gsjb = "";
            gsjb = "������һ�� #b��ζ - #k��Щ��ĸж���\r\n\r\n";
            gsjb += "#L3##b#z4032056#�һ����#r[New]  #b���� - (#r1 = 1#b)#l\r\n\r\n";
				gsjb += "#L0##b#z4001126#�һ����#r[New]  #b���� - (#r2 = 1#b)#l\r\n\r\n";
				gsjb += "#L1##b���һ�#z4002003##r[New]  #b���� - (#r500��� = 1��#b)#l\r\n\r\n";
				gsjb += "#L2##b���һ�#z4002002##r[New]  #b���� - (#r5000��� = 1��#b)#l\r\n\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
           // if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
           //     cm.sendOk("GM���ܲ���һ���");
          //      cm.dispose();
           // }
            if (selection == 0) {
              if(cm.haveItem(4001126,1000)){
				cm.gainItem(4001126,-1000);
                cm.gainNX(+1000);
				cm.sendOk("�����ɹ���");
					cm.dispose();
			  }else if(cm.haveItem(4001126,500)){
				cm.gainItem(4001126,-500);
                cm.gainNX(+500);
				cm.sendOk("�����ɹ���");
					cm.dispose();
			  }else if(cm.haveItem(4001126,100)){
				cm.gainItem(4001126,-100);
                cm.gainNX(+100);
				cm.sendOk("�����ɹ���");
					cm.dispose();
					}else{
					cm.sendOk("��Ҷ����.100�����ϣ�");
				cm.dispose();
				}
            
            } else if (selection == 1) {
			var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("������Ӧ�������а������ճ�һ��");
					cm.dispose();
					return;
				}
			}
              if(cm.getNX() >= 500){
				cm.gainItem(4002003,1);
                cm.gainNX(-500);
				cm.sendOk("�����ɹ���");
			  cm.dispose();
			  }
			  } else if (selection == 2) {
			var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("������Ӧ�������а������ճ�һ��");
					cm.dispose();
					return;
				}
			}
              if(cm.getNX() >= 5000){
				cm.gainItem(4002002,1);
                cm.gainNX(-5000);
				cm.sendOk("�����ɹ���");
			  cm.dispose();
			  }
            } else if (selection == 3) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4032056).iterator();
                if (cm.haveItem(4032056) == 0) {
                    cm.sendNext("�����ʻ�#z4032056#��������һ����");
                    status = -1;
                } else {
                    beauty = 3;
                    cm.sendGetNumber("������#b#z4032056##k�һ�#r���#k������:\r\n#b���� - (#r1 = 1#b)\r\n����˻���Ϣ - \r\n    �������: #r" +
                            cm.getPlayer().getCSPoints(0) + "   \r\n", 1, 1, iter.next().getQuantity());

                }

            }


        } else if (status == 2) {
            if (beauty == 1) {
                if (selection <= 0) {
                    cm.sendOk("����Ķһ����ִ���");
                    cm.dispose();
                /*
                } else if (selection >= 200) {
                    sl = (selection / 200) + 1;
                } else {
                    sl = 3;
                }

                //if(cm.getPlayer().getInventory

(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull()){
                if (cm.getSpace(4) < sl) {
                    cm.sendOk("��ı������������ռ䲻��!��������" + sl 

+ "���ռ�����.\r\n��������г���С���Ļ�����λ!\r\n�磺����<������7.5��

�ռ�����>��ô������Ҫ��8���ռ�!");
                    cm.dispose();
*/
                } else if (cm.getPlayer().getCSPoints(0) >= selection * 500) {
                    cm.gainNX(-selection * 500);
                    cm.gainItem(4000463, selection);
                    cm.sendOk("���ɹ��� #r " + (selection * 500) + " #k��� �һ��� ��������#v4000463# x #r" + selection + " #k")
                } else {
                    cm.sendNext("�һ�" + selection + "��#z4000463##v4000463# ��Ҫ#r " + (selection * 500) + "#k�����û���㹻�ĵ��");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4000463, selection)) {
                    cm.gainItem(4000463, -selection);
                    cm.gainNX(+500 * selection);
                    cm.sendOk("���ɹ���#z4000463##v4000463# x #r" + selection + " #k��Ϊ#r " + (500 * selection) + " #k���");
                } else {
                    cm.sendNext("������������������޷��һ����");
                    cm.dispose();
                }

            } else if (beauty == 3) {
                if (cm.haveItem(4032056, selection)) {
                    cm.gainItem(4032056, -selection);
                    cm.gainNX(+selection);
                    cm.sendOk("���ɹ���#z4032056##v4032056# x #r" + selection + " #k��Ϊ#r " + (selection) + " #k���");
                } else {
                    cm.sendNext("������������������޷��һ����");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }		
    }
}