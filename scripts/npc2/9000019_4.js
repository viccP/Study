/*
 * 
 * WNMS
 * �ƹ�����д
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

            cm.sendOk("���ݣ�");
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
            cm.sendGetNumber("���濴��5���ڵ����֣������н���\r\n#r����ע���\r\n#b����100������1000�㣡\r\n#r����˫����",0,100,1000);
        }
        else if(status == 1){
            xz = selection;
            cm.sendGetNumber("��ע��#r"+xz+"#k���\r\n\r\n#b��������Ҫ����һ��������<5����>��",0,1,5);
        }else if(status == 2){
            hm = selection;
            cm.sendYesNo("��ע��#r"+xz+"#k\r\nͶע���룺"+hm+",�Ƿ�ʼ��");
        }else if(status == 3){
            var random = (Math.random()*5)+1;
            if(random <2){
                var random = 1;
            }else if(random >= 2 && random <3){
                var random = 2;
            }else if(random >= 3 && random <4){
                var random = 3;
            }else if(random >= 4 && random < 5){
                var random = 4;
            }else if(random >= 5 && random <6){
                var random = 5;
            }
            if(random != hm){
                var zt = "�����ˣ�����";
                cm.gainNX(-xz);
            }else if(hm == random){
                var zt = "�����ˣ���Ӯ�ˣ�";
                cm.gainNX(+(xz*2));
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"��Ա[" + cm.getPlayer().getName() + "]" + " : " + " ��[�²²�]ģʽӮ����˫�������",true).getBytes()); 
            }
            cm.sendOk("ׯ�ҵ�����"+random+"\r\n��ĵ���:"+hm+"\r\n\r\n�����"+zt+"");
            cm.dispose();
        }    
    }
}


