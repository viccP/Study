/*
 * WNMS ������
 * @�򵥻����ű� 
 */

//---------����1-------
var ��Ʒ1���� = "100"; //����1 ��Ҫ������
var ��Ʒ1 = "4000013"; //����1 ��Ҫ����Ʒ
var ���1 = "500";    //����1 ��ɵĵ��
//---------����2-------
var ��Ʒ2���� = "100"; //����1 ��Ҫ������
var ��Ʒ2 = "4000022"; //����1 ��Ҫ����Ʒ
var ���2 = "500";    //����1 ��ɵĵ��
//---------����3-------
var ��Ʒ3���� = "100"; //����1 ��Ҫ������
var ��Ʒ3 = "4000178"; //����1 ��Ҫ����Ʒ
var ���3 = "500";    //����1 ��ɵĵ��
//---------����4-------
var ��Ʒ4���� = "100"; //����1 ��Ҫ������
var ��Ʒ4 = "4000080"; //����1 ��Ҫ����Ʒ
var ���4 = "500";    //����1 ��ɵĵ��
//---------����5-------
var ��Ʒ5���� = "100"; //����1 ��Ҫ������
var ��Ʒ5 = "4000232"; //����1 ��Ҫ����Ʒ
var ���5 = "500";    //����1 ��ɵĵ��
//---------����6-------
var ��Ʒ6���� = "100"; //����1 ��Ҫ������
var ��Ʒ6 = "4000233"; //����1 ��Ҫ����Ʒ
var ���6 = "500";    //����1 ��ɵĵ��
//---------����7-------
var ��Ʒ7���� = "100"; //����1 ��Ҫ������
var ��Ʒ7 = "4000262"; //����1 ��Ҫ����Ʒ
var ���7 = "500";    //����1 ��ɵĵ��
//---------����8-------
var ��Ʒ8���� = "100"; //����1 ��Ҫ������
var ��Ʒ8 = "4000263"; //����1 ��Ҫ����Ʒ
var ���8 = "500";    //����1 ��ɵĵ��
//---------����9-------
var ��Ʒ9���� = "100"; //����1 ��Ҫ������
var ��Ʒ9 = "4000268"; //����1 ��Ҫ����Ʒ
var ���9 = "500";    //����1 ��ɵĵ��
//---------����10-------
var ��Ʒ10���� = "100"; //����1 ��Ҫ������
var ��Ʒ10 = "4000269"; //����1 ��Ҫ����Ʒ
var ���10 = "500";    //����1 ��ɵĵ��

function start() {
    cm.sendSimple("#b<ÿ������>\r\nÿ�տ����һ��Ŷ��ֻ��Ҫ�Ѽ��㹻��Ʒ���ɻ�õ�����أ�\r\n#L0#������1�� - ʹ��#b " + ��Ʒ1���� + "#k�� #v" + ��Ʒ1 + "# ����#r " + ���1 + "���.#k#l\r\n#L1#������2�� - ʹ��#b " + ��Ʒ2���� + "#k�� #v" + ��Ʒ2 + "# ����#r " + ���2 + "���.#l    \r\n#r#L2#������3�� - ʹ��#b " + ��Ʒ3���� + "#k�� #v" + ��Ʒ3 + "# ����#r " + ���3 + "���.#l\r\n#L3#������4�� - ʹ��#b " + ��Ʒ4���� + "#k�� #v" + ��Ʒ4 + "# ����#r " + ���4 + "���.#k#l\r\n#L4#������5�� - ʹ��#b " + ��Ʒ5���� + "#k�� #v" + ��Ʒ5 + "# ����#r " + ���5+ "���.#k#l\r\n#L5#������6�� - ʹ��#b " + ��Ʒ6���� + "#k�� #v" + ��Ʒ6 + "# ����#r " + ���6 + "���.#k#l\r\n#L6#������7�� - ʹ��#b " + ��Ʒ8���� + "#k�� #v" + ��Ʒ7 + "# ����#r " + ���7 + "���.#k#l\r\n#L7#������8�� - ʹ��#b " + ��Ʒ8���� + "#k�� #v" + ��Ʒ8 + "# ����#r " + ���8 + "���.#k#l\r\n#L8#������9�� - ʹ��#b " + ��Ʒ9���� + "#k�� #v" + ��Ʒ9 + "# ����#r " + ���9 + "���.#k#l\r\n#L9#������10�� - ʹ��#b " + ��Ʒ10���� + "#k�� #v" + ��Ʒ10 + "# ����#r " + ���10 + "���.#k#l");
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) { //����1
        if (cm.haveItem(��Ʒ1, ��Ʒ1����) && cm.getPlayer().getBossLog("renwu1") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���1 + "���");
            cm.getPlayer().setBossLog("renwu1");
            cm.gainItem(��Ʒ1, -��Ʒ1����);
            cm.gainNX(+���1);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]�������һ������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
    } else if (selection == 1) {
        if (cm.haveItem(��Ʒ2, ��Ʒ2����) && cm.getPlayer().getBossLog("renwu2") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���2 + "���");
            cm.getPlayer().setBossLog("renwu2");
            cm.gainItem(��Ʒ2, -��Ʒ2����);
            cm.gainNX(+���2);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]��������������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
    } else if (selection == 2) {
        if (cm.haveItem(��Ʒ3, ��Ʒ3����) && cm.getPlayer().getBossLog("renwu3") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���3 + "���");
            cm.getPlayer().setBossLog("renwu3");
            cm.gainItem(��Ʒ3, -��Ʒ3����);
            cm.gainNX(+���3);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]���������������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
    } else if(selection == 3){
		 if (cm.haveItem(��Ʒ4, ��Ʒ4����) && cm.getPlayer().getBossLog("renwu4") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���4 + "���");
            cm.getPlayer().setBossLog("renwu4");
            cm.gainItem(��Ʒ4, -��Ʒ4����);
            cm.gainNX(+���4);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]�������4������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
	}else if(selection == 4){
		 if (cm.haveItem(��Ʒ5, ��Ʒ5����) && cm.getPlayer().getBossLog("renwu5") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���5 + "���");
            cm.getPlayer().setBossLog("renwu5");
            cm.gainItem(��Ʒ5, -��Ʒ5����);
            cm.gainNX(+���5);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]�������5������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
	}else if(selection == 5){
		 if (cm.haveItem(��Ʒ6, ��Ʒ6����) && cm.getPlayer().getBossLog("renwu6") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���6 + "���");
            cm.getPlayer().setBossLog("renwu6");
            cm.gainItem(��Ʒ6, -��Ʒ6����);
            cm.gainNX(+���6);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]�������6������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
	}else if(selection == 6){
		 if (cm.haveItem(��Ʒ7, ��Ʒ7����) && cm.getPlayer().getBossLog("renwu7") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���7 + "���");
            cm.getPlayer().setBossLog("renwu7");
            cm.gainItem(��Ʒ7, -��Ʒ7����);
            cm.gainNX(+���7);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]�������7������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
	}else if(selection == 7){
		 if (cm.haveItem(��Ʒ8, ��Ʒ8����) && cm.getPlayer().getBossLog("renwu8") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���8 + "���");
            cm.getPlayer().setBossLog("renwu8");
            cm.gainItem(��Ʒ8, -��Ʒ8����); //�����������޸� ά��
            cm.gainNX(+���8);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]�������8������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
	}else if(selection == 8){
		 if (cm.haveItem(��Ʒ9, ��Ʒ9����) && cm.getPlayer().getBossLog("renwu9") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���9 + "���");
            cm.getPlayer().setBossLog("renwu9");
            cm.gainItem(��Ʒ9, -��Ʒ9����); //�����������޸� ά��
            cm.gainNX(+���9);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]�������9������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
	}else if(selection == 9){
		 if (cm.haveItem(��Ʒ10, ��Ʒ10����) && cm.getPlayer().getBossLog("renwu10") == 0) {
            cm.sendOk("�ۣ�����ϲ��������񣡻����" + ���10 + "���");
            cm.getPlayer().setBossLog("renwu10");
            cm.gainItem(��Ʒ10, -��Ʒ10����); //�����������޸� ά��
            cm.gainNX(+���10);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[ÿ������]" + " : " + " [" + cm.getPlayer().getName() + "]�������10������˵������", true).getBytes());
            cm.dispose();
        } else {
            cm.sendOk("���޷�����������ȷ�������㹻����Ʒ��������ɵļ��ʱ����ˣ�");
            cm.dispose();
        }
	}
}