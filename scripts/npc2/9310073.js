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
            gsjb = "#e\r\n#b���������Ե�����ѵ�Ŷ��#n\r\n\r\n";
            gsjb += "#L2#��Ҫɾ��������Ʒ��(���ؿ���)#l\r\n\r\n";
            gsjb += "#L0#��Ҫ�������Ե㣡(���ؿ���)#l\r\n\r\n";
			gsjb += "#L1#��Ҫ���ټӵ�(�������)#l\r\n\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM���ܲ���һ���");
                cm.dispose();
            }
            if (selection == 0) {
			if(cm.getPlayer().getRemainingAp() > 0){
				cm.sendOk("������������Ե�������ٵ���");
				cm.dispose();
			}else{
				var str = cm.getPlayer().getStr()-4;
				var dex = cm.getPlayer().getDex()-4;
				var Int = cm.getPlayer().getInt()-4;
				var luk = cm.getPlayer().getLuk()-4;
				var zh = str+dex+Int+luk;
				cm.getPlayer().gainAp(+zh);
				cm.getPlayer().setStr(4);
				cm.getPlayer().setDex(4);
				cm.getPlayer().setInt(4);
				cm.getPlayer().setLuk(4);
				cm.sendOk("���óɹ���");
				cm.ˢ��״̬();
				cm.dispose();
				}
            } else if (selection == 1) {
				cm.sendOk("���ټӵ����\r\n\r\n#e@���� +����\r\n@���� +����\r\n@���� +����\r\n@���� +����");
				cm.dispose();
            } else if (selection == 2) {
                
            cm.openNpc(9310073, 1);

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
                if (cm.haveItem(4001126, selection)) {
                    cm.gainItem(4001126, -selection);
                    cm.gainNX(+selection);
                    cm.sendOk("���ɹ���#z4001126##v4001126# x #r" + selection + " #k��Ϊ#r " + (selection) + " #k���");
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