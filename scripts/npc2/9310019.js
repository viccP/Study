/*
 * 
 * @wnms
 * @����̨���͸���npc
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var ð�ձ� = 5000;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("���������⡭��");
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
            cm.sendSimple("#r��������븱���������������ݽ��롣��ɸ�������Ի��������ߡ�������������һ���ƷŶ��\r\n#b��ѡ����Ҫ�Ĳ�����\r\n\r\n#d#L0#��������#l\r\n\r\n#L1##b���ε�ͼ����#l");
        } else if (status == 1) {
            if (selection == 0) {//��������
             cm.openNpc(9310019,1);
            } else if (selection == 1) {//���δ���
              cm.openNpc(9000020,0);
            } else if (selection == 2) {
                cm.openNpc(9310019,3);
            } else if (selection == 3) {
		cm.openNpc(9310019,4);
            }else if(selection == 4){
               cm.openNpc(2103013,0);//��ħ�� id 926010001
//        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"[��������]" + " : " + " [" + cm.getPlayer().getName() + "]��С�鿪ʼ�˵�����ս����" + cm.getC().getChannel() + "Ƶ��",true).getBytes()); 
                                            
        }	
        }
    }
}


