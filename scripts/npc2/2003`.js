var һ������֮�Ͷ��� = 1032080;
var ��������֮�Ͷ��� = 1032081;
var ��������֮�Ͷ��� = 1032082;
var ĩ������֮�Ͷ��� = 1032083;
var ������֮�Ͷ��� = 1032084;
var һ������֮������ = 1122081;
var ��������֮������ = 1122082;
var ��������֮������ = 1122083;
var ĩ������֮������ = 1122084;
var ������֮������ = 1122085;
var һ������֮������ = 1132036;
var ��������֮������ = 1132037;
var ��������֮������ = 1132038;
var ĩ������֮������ = 1132039;
var ������֮������ = 1132040;
var һ������֮�ͽ�ָ = 1112435;
var ��������֮�ͽ�ָ = 1112436;
var ��������֮�ͽ�ָ = 1112437;
var ĩ������֮�ͽ�ָ = 1112438;
var ������֮�ͽ�ָ = 1112439;
var ���� = 3;

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

            cm.sendOk("��л��Ĺ��٣�");
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 20; i++) {
                text += "";
            }
            //text += "#b#v4031344##v4031344##v4031344##v3994081##v3994072##v3994071##v3994077##v4031344##v4031344##v4031344##k\r\n";
            text += "\t\t\t  #e��ӭ����#b���ð�յ� #k!#n\r\n"
            text += "#L1##һ������֮�Ͷ���x3������������֮�Ͷ���#l\r\n";
            text += "#L2##��������֮�Ͷ���x3������������֮�Ͷ���#l\r\n";
            text += "#L3##��������֮�Ͷ���x3����ĩ������֮�Ͷ���#l\r\n";
            text += "#L4##ĩ������֮�Ͷ���x3����������֮�Ͷ���#l\r\n\r\n";
			
            text += "#L5##һ������֮������x3������������֮������#l\r\n";
            text += "#L6##��������֮������x3������������֮������#l\r\n";
            text += "#L7##��������֮������x3����ĩ������֮������#l\r\n";
            text += "#L8##ĩ������֮������x3����������֮������#l\r\n\r\n";
			
            text += "#L9##һ������֮������x3������������֮������#l\r\n";
            text += "#L10##��������֮������x3������������֮������#l\r\n";
            text += "#L11##��������֮������x3����ĩ������֮������#l\r\n";
            text += "#L12##ĩ������֮������x3����������֮������#l\r\n\r\n";
			
            text += "#L13##һ������֮�ͽ�ָx3������������֮�ͽ�ָ#l\r\n";
            text += "#L14##��������֮�ͽ�ָx3������������֮�ͽ�ָ#l\r\n";
            text += "#L15##��������֮�ͽ�ָx3����ĩ������֮�ͽ�ָ#l\r\n";
            text += "#L16##ĩ������֮�ͽ�ָx3����������֮�ͽ�ָ#l";
            cm.sendSimple(text);
        } else if (selection == 1) {
            if (cm.haveItem(һ������֮�Ͷ���, ����)) {
                cm.gainItem(һ������֮�Ͷ���,-����);
                cm.gainItem(��������֮�Ͷ���,1);
		var toDrop = new net.sf.cherry.client.Equip(��������֮�Ͷ���,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ һ������֮�Ͷ��� +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 2) {
            if (cm.haveItem(��������֮�Ͷ���, ����)) {
                cm.gainItem(��������֮�Ͷ���,-����);
                cm.gainItem(��������֮�Ͷ���,1);
                var toDrop = new net.sf.cherry.client.Equip(��������֮�Ͷ���,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ��������֮�Ͷ��� +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 3) {
            if (cm.haveItem(��������֮�Ͷ���, ����)) {
                cm.gainItem(��������֮�Ͷ���,-����);
                cm.gainItem(ĩ������֮�Ͷ���,1);
                var toDrop = new net.sf.cherry.client.Equip(ĩ������֮�Ͷ���,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ��������֮�Ͷ��� +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 4) {
            if (cm.haveItem(ĩ������֮�Ͷ���, ����)) {
                cm.gainItem(ĩ������֮�Ͷ���,-����);
                cm.gainItem(������֮�Ͷ���,1);
                var toDrop = new net.sf.cherry.client.Equip(������֮�Ͷ���,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ĩ������֮�Ͷ��� +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 5) {
            if (cm.haveItem(һ������֮������, ����)) {
                cm.gainItem(һ������֮������,-����);
                cm.gainItem(��������֮������,1);
                var toDrop = new net.sf.cherry.client.Equip(��������֮������,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ һ������֮������ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 6) {
            if (cm.haveItem(��������֮������, ����)) {
                cm.gainItem(��������֮������,-����);
                cm.gainItem(��������֮������,1);
                var toDrop = new net.sf.cherry.client.Equip(��������֮������,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ��������֮������ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 7) {
            if (cm.haveItem(��������֮������, ����)) {
                cm.gainItem(��������֮������,-����);
                cm.gainItem(ĩ������֮������,1);
                var toDrop = new net.sf.cherry.client.Equip(ĩ������֮������,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ��������֮������ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 8) {
            if (cm.haveItem(ĩ������֮������, ����)) {
                cm.gainItem(ĩ������֮������,-����);
                cm.gainItem(������֮������,1);
                var toDrop = new net.sf.cherry.client.Equip(������֮������,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ĩ������֮������ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 9) {
            if (cm.haveItem(һ������֮������, ����)) {
                cm.gainItem(һ������֮������,-����);
                cm.gainItem(��������֮������,1);
                var toDrop = new net.sf.cherry.client.Equip(��������֮������,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ һ������֮������ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 10) {
            if (cm.haveItem(��������֮������, ����)) {
                cm.gainItem(��������֮������,-����);
                cm.gainItem(��������֮������,1);
                var toDrop = new net.sf.cherry.client.Equip(��������֮������,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ��������֮������ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 11) {
            if (cm.haveItem(��������֮������, ����)) {
                cm.gainItem(��������֮������,-����);
                cm.gainItem(ĩ������֮������,1);
                var toDrop = new net.sf.cherry.client.Equip(ĩ������֮������,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ��������֮������ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 12) {
            if (cm.haveItem(ĩ������֮������, ����)) {
                cm.gainItem(ĩ������֮������,-����);
                cm.gainItem(������֮������,1);
                var toDrop = new net.sf.cherry.client.Equip(������֮������,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ĩ������֮������ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 13) {
            if (cm.haveItem(һ������֮�ͽ�ָ, ����)) {
                cm.gainItem(һ������֮�ͽ�ָ,-����);
                cm.gainItem(��������֮�ͽ�ָ,1);
                var toDrop = new net.sf.cherry.client.Equip(��������֮�ͽ�ָ,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ һ������֮�ͽ�ָ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 14) {
            if (cm.haveItem(��������֮�ͽ�ָ, ����)) {
                cm.gainItem(��������֮�ͽ�ָ,-����);
                cm.gainItem(��������֮�ͽ�ָ,1);
                var toDrop = new net.sf.cherry.client.Equip(��������֮�ͽ�ָ,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ��������֮�ͽ�ָ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 15) {
            if (cm.haveItem(��������֮�ͽ�ָ, ����)) {
                cm.gainItem(��������֮�ͽ�ָ,-����);
                cm.gainItem(ĩ������֮�ͽ�ָ,1);
                var toDrop = new net.sf.cherry.client.Equip(ĩ������֮�ͽ�ָ,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ��������֮�ͽ�ָ +"# ����:"+ ����);
                cm.dispsoe();
            }
        } else if (selection == 16) {
            if (cm.haveItem(ĩ������֮�ͽ�ָ, ����)) {
                cm.gainItem(ĩ������֮�ͽ�ָ,-����);
                cm.gainItem(������֮�ͽ�ָ,1);
                var toDrop = new net.sf.cherry.client.Equip(������֮�ͽ�ָ,0).copy();
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "�����ɹ���",toDrop, true).getBytes());
                cm.sendOk("�����ɹ���");
                cm.dispsoe();
            } else {
                cm.sendOk("����ʧ�ܣ����ϲ��㣡#v"+ ĩ������֮�ͽ�ָ +"# ����:"+ ����);
                cm.dispsoe();
            }
        }
    }
}

