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
            var Ԫ��ȼ� = cm.getPlayer().getxiulian2();
            if (Ԫ��ȼ� == 0) {
                var ���� = "��0��Ԫ��  #k";
            } else if (Ԫ��ȼ� == 1) {
                var ���� = "#r��C��Ԫ�� #k ";
            } else if (Ԫ��ȼ� == 2) {
                var ���� = "#b��B��Ԫ�� #k ";
            } else if (Ԫ��ȼ� == 3) {
                var ���� = "#b��B��Ԫ�� #k  ";
            } else if (Ԫ��ȼ� == 4) {
                var ���� = "#d��S��Ԫ�� #k ";
            } else if (Ԫ��ȼ� == 5) {
                var ���� = "#e#r��SS��Ԫ��#k ";
            } else if (Ԫ��ȼ� == 6) {
                var ���� = "#e��SSS��Ԫ��#n #k #r--------�۷�״̬#k";
            }
            var txt1 = "#L1#" + ��̾�� + "#gʹ��1500�������Ԫ��ȼ�(���ή��)\r\n\r\n";
            var txt2 = "#L2#" + ��̾�� + "#bʹ��1000�������Ԫ��ȼ�(�м��ʽ���)\r\n\r\n";
            var txt3 = "#L3#" + ��̾�� + "#rʹ��10000����������Ԫ��ȼ�(�м��ʽ���)\r\n"
            cm.sendSimple("Ԫ��������Ǹ���Ԫ��ȼ����仯�ġ�ÿ���׶ε�Ԫ�����ʽ���˺�������ͬ��ÿ��ְҵ��Ԫ��Ҳ�᲻ͬ����ʽ��\r\n����������ѡ��ϣ������Ԫ��ķ���(Ԫ�����ò��ǰٷ�֮�ٳɹ���)��\r\n#bĿǰԪ��ȼ���" + ���� + "��\r\n" + txt1 + "" + txt2 + "" + txt3 + "");

        } else if (status == 1) {
            Ԫ�� = cm.getChar().getxiulian2();
            if (selection == 1) { //1500���ʹ��
                if (cm.getNX() < 1500) {
                    cm.sendOk("��ĵ����1500.�޷�ʹ�����蹦�ܡ�");
                    cm.dispose();
                     } else if (Ԫ�� >= 6) {
                        cm.sendOk("���Ԫ���Ѿ�ΪSSS�����ˡ�����Ҫ���á��ȼ��ѵ���ߣ�");
                        cm.dispose();
                } else {
                       cm.gainNX(-1500);
                    if (Ԫ�� == 1) {
                        var rand = 1 + Math.floor(Math.random() * 8);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��B��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��B��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������100�㡣");
                            cm.gainNX(100);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 2) {
                        var rand = 1 + Math.floor(Math.random() * 13);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��A��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��A��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������200�㡣");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 3) {
                        var rand = 1 + Math.floor(Math.random() * 15);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��S��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��S��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������200�㡣");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 4) {
                        var rand = 1 + Math.floor(Math.random() * 17);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SS��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SS��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������200�㡣");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 5) {
                        var rand = 1 + Math.floor(Math.random() * 20);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SSS��Ԫ�񡻣����������Ա������ˣ�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SSS��Ԫ�񡻣����Ա������ˣ�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������200�㡣");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                   
                    }
                }

            } else if (selection == 2) { //���๦��
                if (cm.getNX() < 1000) {
                    cm.sendOk("��ĵ����1000.�޷�ʹ�����蹦�ܡ�");
                    cm.dispose();
                }else if (Ԫ�� >= 6) {
                        cm.sendOk("���Ԫ���Ѿ�ΪSSS�����ˡ�����Ҫ���á��ȼ��ѵ���ߣ�");
                        cm.dispose();

                } else {
                        cm.gainNX(-1000);
                    if (Ԫ�� == 1) {
                        var rand = 1 + Math.floor(Math.random() * 10);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��B��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��B��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������50�㡣");
                            cm.gainNX(50);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 2) {
                        var rand = 1 + Math.floor(Math.random() * 13);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��A��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��A��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��ʧ�ܣ�Ԫ�񽵼�Ϊ��B��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������100�㡣");
                            cm.gainNX(100);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 3) {
                        var rand = 1 + Math.floor(Math.random() * 15);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��S��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��S��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��ʧ�ܣ�Ԫ�񽵼�Ϊ��A��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������200�㡣");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 4) {
                        var rand = 1 + Math.floor(Math.random() * 17);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SS��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SS��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��ʧ�ܣ�Ԫ�񽵼�Ϊ��S��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������200�㡣");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 5) {
                        var rand = 1 + Math.floor(Math.random() * 20);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SSS��Ԫ�񡻣����������Ա������ˣ�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SSS��Ԫ�񡻣����Ա������ˣ�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��ʧ�ܣ�Ԫ�񽵼�Ϊ��SS��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������200�㡣");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } 
                }
            } else if (selection == 3) {
                var ������ = cm.getChar().getxiulian();
                if (cm.getChar().getxiulian() < 1000) {
                    cm.sendOk("�޷�ʹ�����蹦�ܡ�");
                    cm.dispose();
                    } else if (Ԫ�� >= 6) {
                        cm.sendOk("���Ԫ���Ѿ�ΪSSS�����ˡ�����Ҫ���á��ȼ��ѵ���ߣ�");
                        cm.dispose();
                } else {
                     cm.getChar().gainxiulian(-10000);
                    if (Ԫ�� == 1) {
                        var rand = 1 + Math.floor(Math.random() * 15);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��B��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��B��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������10�㡣");
                            cm.gainNX(10);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 2) {
                        var rand = 1 + Math.floor(Math.random() * 17);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��A��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��A��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��ʧ�ܣ�Ԫ�񽵼�Ϊ��B��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������10�㡣");
                            cm.gainNX(10);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 3) {
                        var rand = 1 + Math.floor(Math.random() * 22);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��S��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��S��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��ʧ�ܣ�Ԫ�񽵼�Ϊ��A��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������50�㡣");
                            cm.gainNX(50);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 4) {
                        var rand = 1 + Math.floor(Math.random() * 28);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SS��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SS��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��ʧ�ܣ�Ԫ�񽵼�Ϊ��S��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������70�㡣");
                            cm.gainNX(70);
                            cm.dispose();
                        }
                    } else if (Ԫ�� == 5) {
                        var rand = 1 + Math.floor(Math.random() * 30);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SSS��Ԫ�񡻣����������Ա������ˣ�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��Ϊ��SSS��Ԫ�񡻣����Ա������ˣ�", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[Ԫ������]" + " : " + " [" + cm.getPlayer().getName() + "]����Ԫ��ʧ�ܣ�Ԫ�񽵼�Ϊ��SS��Ԫ�񡻣�", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("����ʧ�ܡ�ϵͳ�������80�㡣");
                            cm.gainNX(80);
                            cm.dispose();
                        }
                    }
                }
            }
        }
    }
}
