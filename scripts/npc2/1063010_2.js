/*WNMS ����ͨ����*/

function start() {
    status = -1;
    action(1, 0, 0);
}
var itemid = 1302000;//������Ҫ�ĵ���
var sl = 1;

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
            if (cm.�鿴����() == null) {
                cm.sendGetNumber("" + cm.getPlayer().getName() + "\r\n������ܵ�����һ����Ϣ�����������ID��", 0, 100, 10000000);
            } else {
                cm.sendOk("null");
                cm.dispose();
            }
        } else if (status == 1) {
            id = selection;
            if (cm.getPlayer().getId() == id) {
                cm.sendOk("���в�????????????");
                cm.dispose();
            }
            cm.sendYesNo("��Ϣ��\r\n" + cm.ָ����ѯ(id) + "\r\n������Ҫ #v" + itemid + "# " + sl + " �����Ƿ����������Ϣ��");

        } else if (status == 2) {
            if (cm.��ѯ״̬(id) == 0) {
                if(cm.haveItem(itemid) >= sl){
                cm.����ͨ��(id, cm.getPlayer().getName());
                //int charid3, String name3,int zt,int charid
                cm.����ͨ��id(id);
                cm.gainItem(itemid,-sl);
                cm.sendOk("�ɹ�������������Ϣ:" + id);
                cm.dispose();
            }else{
                cm.sendOk("��Ʒ����");
                cm.dispose();
            }
            } else {
                cm.sendOk("������Ϣ�Ѿ����������ˣ�������Ϣ�Ѿ���Ч��");
                cm.dispose();
            }
        }
    }
}


