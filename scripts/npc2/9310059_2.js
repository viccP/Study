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

            cm.sendOk("���ó�ս..");
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
            var a = "#rӵ�е�ħ��鿴#k\r\n";
            a += cm.��ѯħ��();
            cm.sendGetNumber("" + cm.getPlayer().getName() + "\r\n�������ħ���б����������Ҫ���ó�ս��ħ��ID��\r\n"+a+"", 0, 0, 10000000);
          
        } else if (status == 1) {
            id = selection;
            if (cm.getPlayer().getId() == id) {
                cm.sendOk("���в�????????????");
                cm.dispose();
            }
            cm.sendYesNo("�Ƿ�����IDΪ["+id+"]��ħ���ս��");

        } else if (status == 2) {
                    cm.����ħ��();
                    cm.ս������(id);         
                    cm.sendOk("<������ͼ���߻��ߺ���Ч>�ɹ����ó�սID:" + id);
                    cm.dispose();
               
            } else {
                cm.sendOk("...");
                cm.dispose();
            
        }
    }
}


