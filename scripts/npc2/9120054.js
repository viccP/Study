function start() {
    if (cm.getChar().getMapId() == 803001200) {
        if (cm.countMonster() < 1) {
            cm.sendSimple("��ǰ��ͼû�й�� \r\n \r\n    #L8##r�ص��г�#l");
        } else {
            cm.sendSimple("��������#b糺����Ʒ����վ#k����������������ò�����Ʒ��\r\n\r\n#dʣ��:#r" + cm.getNX() + " #d��� #d��ս���֣�#r" + cm.getboss() + " ��#d\r\n\r\������Ĳ�����#r350����� - \r\n#L0##r#z2022112#-1��#k#l #b#L1##z2022009# - 100��#l #d#L2##z2020013# - 100��#l\r\n\r\n\r\nð�ձҲ�������Ʒ��#r500000 - 100��\r\n#L6#�������ҩˮ - 100��#l#L7##z2022215# - 20��#l\r\n\r\n#L8##e - �ص��г� - #l");
        }
    } else {
        cm.sendOk("��á�")
    }
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        if (cm.getNX() >= 350) {
            cm.gainNX(-350);
            cm.gainItem(2022112, 1);
            cm.serverNotice("������Ʒ��������" + cm.getChar().getName() + " �����BUFF����Ʒ��");
        } else {
            cm.sendOk("�޷���á���ȷ�����Ƿ���������");
            cm.dispose();
        }
    } else if (selection == 1) {
        if (cm.getNX() >= 350) {
            cm.gainNX(-350);
            cm.serverNotice("��糺����Ʒ��������" + cm.getChar().getName() + " ������ҩˮ������");
            cm.gainItem(2022009, 100);
        } else {
            cm.sendOk("�޷���á���ȷ�����Ƿ���������");
            cm.dispose();
        }
    } else if (selection == 2) {
        if (cm.getNX() >= 350) {
            cm.gainNX(-350);
            cm.gainItem(2020013,100);
            cm.serverNotice("��糺����Ʒ��������" + cm.getChar().getName() + " ������ҩˮ������");  
        } else {
           cm.sendOk("�޷���á���ȷ�����Ƿ���������");
            cm.dispose();
        }
    } else if (selection == 3) {
        if (!cm.haveItem(4001009, 1)) {
            cm.sendOk("��Ǹ����û��1��#v4001009#�޷�Ϊ�㿪��");
        } else if (!cm.haveItem(4001010, 1)) {
            cm.sendOk("��Ǹ����û��1��#v4001010#�޷�Ϊ�㿪��");
        } else if (!cm.haveItem(4001011, 1)) {
            cm.sendOk("��Ǹ����û��1��#v4001011#�޷�Ϊ�㿪��");
        } else if (!cm.haveItem(4001012, 1)) {
            cm.sendOk("��Ǹ����û��1��#v4001012#�޷�Ϊ�㿪��");
        } else if (!cm.haveItem(4001013, 1)) {
            cm.sendOk("��Ǹ����û��1��#v4001013#�޷�Ϊ�㿪��");
        } else {
            cm.gainItem(4001009, -1);
            cm.gainItem(4001010, -1);
            cm.gainItem(4001011, -1);
            cm.gainItem(4001012, -1);
            cm.gainItem(4001013, -1);
            cm.gainItem(4021010, 1);
            cm.dispose();
        }
    } else if (selection == 4) {
        if (!cm.haveItem(4021010, 1)) {
            cm.sendOk("��Ǹ����û��#v4021010#�޷�Ϊ�㿪��");
            cm.dispose();
        } else {
            cm.warp(209000015, 0);
            cm.dispose();
        }
    } else if (selection == 8) {
        cm.warp(910000000, 0);
        cm.dispose();
    } else if (selection == 5) {
        cm.sendOk("���������������е�BOSS����ÿһ��BOSS���ᱬ��һ��ƾ֤#r��ƾ֤����90%��#k���ռ�5��ƾ֤�����������Ҷһ�ͨ��֤����Ȼ���ڵ��ң��ҽ������Ǵ��͵��콱��ͼ�����Ҹ���#e#b��10����֡�");
        cm.dispose();
    } else if (selection == 6) {
        if (cm.getMeso() >= 500000) {
            cm.gainItem(2022161,100);
            cm.gainMeso(-500000);
            cm.serverNotice("��糺����Ʒ����������" + cm.getChar().getName() + "���������������ҩˮ��");
        } else {
            cm.sendOk("���ð�ձҲ��㣡");
            cm.dispose();
        }
    } else if (selection == 7) {
        if (cm.getMeso() >= 500000) {
            cm.gainMeso(-500000);
            cm.serverNotice("��糺����Ʒ����������" + cm.getChar().getName() + "��������buffҩˮ��");
            cm.gainItem(2022215,20)
        } else {
            cm.sendOk("���ð�ձҲ���");
            cm.dispose();
        }
    } else if (selection == 8) {
        if (cm.getMeso() <= 50000000) {
            cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�");
        } else {
            cm.gainMeso(-50000000);
            cm.summonMob(9400300, 100000000, 175000000, 1);//��ɮ
            cm.dispose();
        }
    } else if (selection == 9) {
        if (cm.getMeso() <= 50000000) {
            cm.sendOk("��Ǹ��û��5000���Ҳ���Ϊ���ٻ�");
        } else {
            cm.gainMeso(-50000000);
            cm.summonMob(9400549, 1, 200300000, 1);//����
            cm.dispose();
        }
    }
}