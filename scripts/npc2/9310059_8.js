/*
 * 
 * @��֮�� ��������ټ�NPC
 * @ð�ձҿ�ˢ���ȡ�
 */

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

            cm.sendOk("��Ҫ������������������ң�");
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
            cm.sendSimple("���Ƿ���Ѱ��һ�����Ժ��㹲ͬ���#b�������#k�Ķ���?ʹ���ҵĹ��ܣ�����Ϊ�㷢һ��#d������ӵ�����#k��\r\n\r\n#L1##k����������������<5000ð�ձ�>#l#r\r\n\r\n#L3##b��߳���������<30000ð�ձ�>#l\r\n\r\n#L4##r#d���Ů������������<50000ð�ձ�>\r\n\r\n#L5##d糺���������<100000ð�ձ�>")
        } else if (status == 1) {
            if (selection == 0) {
                cm.dispose();
            } else if (selection == 1) { //������������
                if (cm.getMeso() >= 5000){
                cm.gainMeso(-5000);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "[������]" + " : " + "��Ҫ��ʿһ�����[���������������]��Ŀ���� " + cm.getC().getChannel() + "Ƶ��", true).getBytes());
                cm.dispose();
                }else{
                    cm.sendOk("���ð�ձҲ���5000���޷�����������");
                    cm.dispose();
                }
            } else if (selection == 2) {
                cm.dispose();
            } else if (selection == 3) { //��߳�
                if (cm.getMeso() >= 30000){
                cm.gainMeso(-30000);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "[������]" + " : " + "��Ҫ��ʿһ�����[��߳��������]��Ŀ���� " + cm.getC().getChannel() + "Ƶ��", true).getBytes());
                cm.dispose();
                }else{
                    cm.sendOk("���ð�ձҲ���3���޷�����������");
                    cm.dispose();
                }
            } else if (selection == 4) { //Ů����
                 if (cm.getMeso() >= 40000){
                cm.gainMeso(-40000);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "[������]" + " : " + "��Ҫ��ʿһ�����[Ů�����������]��Ŀ���� " + cm.getC().getChannel() + "Ƶ��", true).getBytes());
                cm.dispose();
                }else{
                    cm.sendOk("���ð�ձҲ���4���޷�����������");
                    cm.dispose();
                }
            } else if (selection == 5) {//糺�
                if (cm.getMeso() >= 100000){
                cm.gainMeso(-100000);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3, cm.getC().getChannel(), cm.getPlayer().getName() + "[������]" + " : " + "��Ҫ�����ʿһ����ս[糺�]��Ŀ���� " + cm.getC().getChannel() + "Ƶ��", true).getBytes());
                cm.dispose();
                }else{
                    cm.sendOk("���ð�ձҲ��㡣�޷�����������");
                    cm.dispose();
                }
            } else if (selection == 6) {
                cm.warp(809030000);
                cm.dispose();



            } else if (selection == 7) {
               
                cm.dispose();
            } else if (selection == 8) {
                if (cm.getzb() >= 10) {
                    cm.setzb(-10);
                    cm.openNpc(1012103);
                    cm.dispose();
                } else {
                    cm.sendOk("#e��������Ѳ��㣡�뼰ʱ��ֵ��");
                    cm.dispose();



                }
            }
        }
    }
}


