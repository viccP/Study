/*
 * 
 * @����������תְnpc
 */

function start() {
    status = -1;

    action(1, 0, 0);
}
var �ڷ� = 4031059;
var ֤�� = 4031334;
var �������� = 4031058;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("�ź�...");
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
            if(cm.haveItem(֤��,1)&&cm.getLevel() >= 70){
                var zhuanzhi ="\r\n#L1#���Ϲ��ݵĿ���(��ת����)"
            }else{
                var zhuanzhi ="";
            }
            cm.sendSimple("�����ң��к��£�\r\n#L0#��Ҫתְ#l\r\n"+zhuanzhi+"\r\n");
        } else if (status == 1) {
            if (selection == 0) {
                  cm.openNpc(1052001,1);    
            } else if (selection == 1) {
                if(cm.haveItem(֤��,1)&&(cm.getJob() >= 400&&cm.getJob()< 500)){
                   cm.summonMob(9001003,200,0,1);
                   cm.gainItem(֤��,-1);
                   cm.sendOk("�����ҵ�����������ҵķ�����Ϳ��Ի��#b�ڷ�#k��");
                  cm.dispose();
                }else{
                    cm.sendOk("���޷�����������Ϊ��û��#b֤��#k");
                    cm.dispose();
                }
            } else if (selection == 2) {
                cm.openNpc(1300000,0);
            } else if (selection == 3) {
               cm.sendOk("������תְ��������ͬС��");
               cm.dispose();
            } else if (selection == 4) {
                cm.openNpc(9330042,0);
        } else if (selection == 5) {
        }
    }
}
}
