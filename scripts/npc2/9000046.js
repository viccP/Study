// Credits to Moogra
var status = 0;
var map = Array(240010501);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.warp(910000000);
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if(cm.getMapId()== 910000000){
                       
                 
            var txt1 = "#L1##r��Ҫ����ر���ͼ\r\n";
            cm.sendSimple("���Ǻ��ˡ�Ϊ�δ�#b�ر�ͼ#k����\r\n\r\n"+txt1+"");
            }else{
                cm.sendOk("ֻ�������г��ſ��Դ�#b�ر�ͼ#k��\r\n������#b@����#k�������״̬��")
                cm.dispose();
            }
        } else if (status == 1) {
            if (selection == 1) {
                    cm.sendOk("�ر���ͼ��ȥ�����г���npc���룡��ʹ������������!");
                    cm.dispose();
            } else if (status == 2) {
            } else if (selection == 2) {
                if(cm.getMeso() >= 500000000) {
                    cm.gainMeso(-500000000);
                    cm.gainItem(4000313,1);
                    cm.sendOk("�����ɹ�!С����ӭ���´�����");
                } else {
                    cm.sendOk("�Բ�����û���㹻��ð�ձ�!");
                }
                cm.dispose();
            }
            else{
                cm.sendOk("All right. Come back later");
            }
        }
    }
}
