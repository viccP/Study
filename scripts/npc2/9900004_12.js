/*
 * 
 *��֮��
 *ǩ��ϵͳ�°�ģʽ
 */
importPackage(net.sf.cherry.client);
var status = 0;
var ��ˮ�� = 4021008;
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new = "#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";
var �Ҹ� = "#k��ܰ��ʾ���κηǷ��������ҷ�Ŵ���.��ɱ��������.";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            
            if (cm.getBossLog('playgz') > 0) {
                var zt = "������ǩ��";
            } else {
                var zt = "����δǩ��";
            }
            if (cm.getChar().getqiandao() >= 1) {
                var zt1 = "��";
            } else {
                var zt1 = "δ��ȡ";
            }
            if (cm.getChar().getqiandao() >= 2) {
                var zt2 = "��";
            } else {
                var zt2 = "δ��ȡ";
            }
            if (cm.getChar().getqiandao() >= 3) {
                var zt3 = "��";
            } else {
                var zt3 = "δ��ȡ";
            }
            if (cm.getChar().getqiandao() >= 4) {
                var zt4 = "��";
            } else {
                var zt4 = "δ��ȡ";
            }
            if (cm.getChar().getqiandao() >= 5) {
                var zt5 = "��";
            } else {
                var zt5 = "δ��ȡ";
            }
            if (cm.getChar().getqiandao() >= 6) {
                var zt6 = "��";
            } else {
                var zt6 = "δ��ȡ";
            }
            if (cm.getChar().getqiandao() >= 7) {
                var zt7 = "��";
            } else {
                var zt7 = "δ��ȡ";
            }
            if (cm.getChar().getqiandao() >= 8) {
                var zt8 = "��";
            } else {
                var zt8 = "δ��ȡ";
            }
            if (cm.getChar().getqiandao() >= 9) {
                var zt9 = "��";
            } else {
                var zt9 = "δ��ȡ";
            }
            if (cm.getChar().getqiandao() >= 10) {
                var zt10 = "��";
            } else {
                var zt10 = "δ��ȡ";
            }
            var txt1 = "#L1#ǩ����һ�콱��<#b#z1022088##k> "+zt1+"#l\r\n";
            var txt2 = "#L2#ǩ���ڶ��콱��<#b#z1002980##k> "+zt2+"#l\r\n";
            var txt3 = "#L3#ǩ�������콱��<#b#z1012101##k>         "+zt3+"#l\r\n";
            var txt4 = "#L4#ǩ�������콱��<#r1000#k���>     "+zt4+"\r\n";
            var txt5 = "#L5#ǩ�������콱��<#bð�ձ�x50��#k>  "+zt5+"\r\n";
            var txt6 = "#L6#ǩ�������콱��<#b#z4021008##kx1>    "+zt6+"\r\n"
            var txt7 = "#L7##gǩ�������콱��#k<#b#z3010100##k>     "+zt7+"\r\n\r\n"
            var txt8 = "#L8##r��ȡ7����ǩ������#l"
            cm.sendSimple("ֻҪ�ܼ��ÿ�յ�ǩ�����������غ�������Ŷ��\r\nĿǰ�Ѿ�ǩ���ˣ�"+cm.getChar().getqiandao()+"�졣����ǩ��״̬��#b" + zt + "#k\r\n" + txt1 + ""+txt2+""+txt3+""+txt4+""+txt5+""+txt6+""+txt7+""+txt8+"");

        } else if (status == 1) {
            if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull())
					{
						cm.sendOk("������Ӧ����װ�����ճ�һ��");
						cm.dispose();
                                        }else{
            if (selection == 1) { //ǩ����һ�콱��
             if (cm.getChar().getqiandao() < 1&& (cm.getBossLog('playgz') < 1)) { //ǩ����һ�콱��
                    cm.gainItem(1022088,1);
                       cm.getChar().gainqiandao(1);
                       cm.setBossLog('playgz');
                    cm.sendOk("��ϲ������ǩ��������");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ��ÿ�ս�����",true).getBytes()); 
                cm.dispose();
                } else {
                    cm.sendOk("���Ѿ���ȡ�������ˣ�!");
                    cm.dispose();
                }
            } else if (selection == 2) { //���๦��
              if (cm.getChar().getqiandao() == 1&& (cm.getBossLog('playgz') < 1)) { //ǩ����2�콱��
                    cm.gainItem(1002980,1);
                    cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("��ϲ������ǩ��������");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ��ÿ�ս�����",true).getBytes()); 
            cm.dispose();   
            } else {
                    cm.sendOk("�޷���ȡ��");
                    cm.dispose();
                }
            } else if (selection == 3) {
                if (cm.getChar().getqiandao() == 2&& (cm.getBossLog('playgz') < 1)) { //ǩ����3�콱��
                    cm.gainItem(1012101,1);
                    cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("��ϲ������ǩ��������");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ��ÿ�ս�����",true).getBytes()); 
                cm.dispose();
                } else {
                    cm.sendOk("�޷���ȡ��");
                    cm.dispose();
                }
            } else if (selection == 4) { //��ţ���ְ���
               if (cm.getChar().getqiandao() == 3&& (cm.getBossLog('playgz') < 1)) { //ǩ����4�콱��
                  cm.gainNX(1111);
                  cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("��ϲ������ǩ��������");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ��ÿ�ս��������x1000",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("�޷���ȡ��");
                    cm.dispose();
                }
            } else if (selection == 5) { //���������г�
              if (cm.getChar().getqiandao() == 4&& (cm.getBossLog('playgz') < 1)) { //ǩ����5�콱��
                  cm.gainNX(500);
                  cm.setBossLog('playgz');
                  cm.gainMeso(+500000);
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("��ϲ������ǩ�������� 500���50��ð�ձ�");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ��ÿ�ս�����",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("�޷���ȡ��");
                    cm.dispose();
                }
            } else if (selection == 6) {
               if (cm.getChar().getqiandao() == 5&& (cm.getBossLog('playgz') < 1)) { //ǩ����6�콱��
                  cm.gainItem(4021008,1);
                  cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("��ϲ������ǩ��������");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ��ÿ�ս�����",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("�޷���ȡ��");
                    cm.dispose();
                }
            } else if (selection == 7) {
                              if (cm.getChar().getqiandao() == 6&& (cm.getBossLog('playgz') < 1)) { //ǩ����7�콱��
                  cm.gainItem(3010100,1);
                  cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("��ϲ������ǩ��������");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ����7�콱����",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("�޷���ȡ��");
                    cm.dispose();
                }
            }else if (selection == 7) {
                  if (cm.getChar().getqiandao() == 7&& (cm.getBossLog('playgz') < 1)) { //ǩ����7�콱��
                  cm.gainNX(+1000);
		 cm.getChar().gainqiandao(1);
                  cm.setBossLog('playgz');
                    cm.sendOk("��ϲ������ǩ��������1000��ȯ��");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ����7�콱����",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("�޷���ȡ��");
                    cm.dispose();
                }
				}else if (selection == 8) {
                  if (cm.getChar().getqiandao() > 7&& (cm.getBossLog('playgz') < 1)) { //ǩ����7�콱��
                 cm.gainItem(5072000,+2);
                  cm.setBossLog('playgz');
                    cm.sendOk("��ϲ������ǩ����������#v5072000# X2");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ��7���Ľ�����",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("�޷���ȡ��");
                    cm.dispose();
                }
				}
				}
        }
    }
}
