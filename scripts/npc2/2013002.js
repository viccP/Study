/*
 ���Ů����npc
 */
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        cm.sendYesNo("���ǳ�ɫ���������յ�����������ô���ڡ����԰䷢�����������ˡ�\r\n#r�Ƿ���ȡ������");
    } else if (status == 1) {
if (cm.haveItem(4031329, 1)) {
            cm.gainItem(4001325, +1);
        }
        var rand = 1 + Math.floor(Math.random() * 30);
        //�����Ʒ

        cm.removeAll(4001050);
        cm.removeAll(4001051);
        cm.removeAll(4001052);
        cm.removeAll(4001044);
        cm.removeAll(4001045);
        cm.removeAll(4001046);
        cm.removeAll(4001047);
        cm.removeAll(4001048);
        cm.removeAll(4001049);
        cm.removeAll(4001063);
        cm.removeAll(4031309);
        cm.removeAll(4001053);
        cm.removeAll(4001054);
        cm.removeAll(4001056);
        //�����ʼ - ��÷������ı�ʯ 4001325  4031329
        cm.removeAll(4001056);
        
        switch (rand) {
            case 1:
                cm.gainItem(2049100, +2);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 2:
                cm.gainItem(2340000, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 3:
                cm.gainItem(2040622, +1);//��ȹ��������10%
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 4:
                cm.gainItem(2040708, +1);//Ь���ٶȾ���10%
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 5:
                cm.gainItem(2040804, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 6:
                cm.gainItem(2040902, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 7: //��ʼ������
                cm.gainItem(3010029, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 8:
                cm.gainItem(3010030, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 9:
                cm.gainItem(3010031, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 10:
                cm.gainItem(3010032, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
            case 11:
                cm.gainItem(3010033, +1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
                default:
                cm.gainItem(2000005, +5);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[������� - ���֮��]" + " : " + " [" + cm.getPlayer().getName() + "]��С������ˡ����֮�� - Ů��������񡿣�����˽�����", true).getBytes());
                cm.warp(701000210);
                cm.dispose();
                break;
        }


  
    } else {
        cm.sendOk("�㿴�㣬���ŵö�û׼���á�");
        cm.dispose();
    }
}
