/*����ͨ���� WNMS*/

function start() {
    status = -1;
    action(1, 0, 0);
}
var money = 100000000; //������Ҫ�۳�����ð�ձ�

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("������ԥ����û�и��");
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
            if (cm.��ѯ����(cm.getPlayer().getId())  != null) {
                cm.sendOk("���Ѿ�������һ����Ϣ�ˡ��벻Ҫ�ظ�������");
                cm.dispose();
            } else {
                cm.sendGetNumber("���뷢��һ��ͨ������ȸ����ң���Ҫͨ��˭������������������ID��", 0, 100, 100000);
            }
        } else if (status == 1) {
            id = selection;
            if (cm.getPlayer().getId() == id) {
                   cm.sendOk("д�Լ���ȥ��������涺��");
                cm.dispose();
            } else {

                cm.sendGetNumber("�����ID��#r" + id + "#k\r\n��ѯ������ң�#b" + cm.��ȡ����(id) + "#k\r\n\r\n#b���������Ϣ������������Ҫ���͵Ľ��(ð�ձ� > 100000)��", 0, 100000, 2100000000);
            }
        } else if (status == 2) {
            mxb = selection;
            if (cm.getMeso() < mxb) {
                cm.sendOk("��û��ô��Ǯ��");
                cm.dispose();
            } else {
                cm.sendGetText("�����ID��#r" + id + "#k\r\n��ѯ������ң�#b" + cm.��ȡ����(id) + "#k\r\n�ͽ��ǣ�" + mxb + "\r\n����������ԡ�������Ի�����ͨ�����������󿴵�:");
            }
        } else if (status == 3) {

            cm.sendYesNo("��Ҫͨ������ID:#r" + id + "#k\r\n��ѯ������ң�#b" + cm.��ȡ����(id) + "#k\r\n�������ͽ���:" + mxb + "\r\n���ԣ�" + cm.getText() + "\r\n\r\n������һ����Ҫ������ " + money + " ð�ձҡ������ͽ���һ����Ҫ���� " + (money + mxb) + " ð�ձҡ�ȷ����");
        } else if (status == 4) {
            var moneyb = (money + mxb);
            if (cm.getMeso() >= moneyb) {
                cm.sendOk("��ϲ�㷢����һ����Ϣ��ȥ��������˽����ˡ������Ϣ����ʾ���ѽ��ܶ�̬���档");
                cm.gainMeso(-moneyb);
                //int charid, String name, String name2, int charid2, int meso, int charid3, String name3, int zt, String msg
                cm.����ͨ����(cm.getPlayer().getId(), cm.getPlayer().getName(), cm.��ȡ����(id), id, mxb, 0, 0, 0, cm.getText());
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11, cm.getC().getChannel(), "[ͨ����]" + " : " + " �µ�ͨ�������ߣ���λ��õ��ͽ���ٶ��ˣ�", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("��û���㹻��Ǯ��֧����һ�ʷ��á�");
                cm.dispose();
            }
        }
    }
}


