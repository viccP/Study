/*����ͨ���� WNMS*/
function start() {
    status = -1;
    action(1, 0, 0);
}
var money = 800; //�����ǵ��

function action(mode, type, selection) {
    var lx = Array();
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
           
            var random = Math.random()*lx.length;
            var a = "\r\n";
            a += cm.��ѯħ��();
            cm.sendGetNumber("��ͨ����ħ������Ϊ�м������ħ�裨�˲��������� ��ͨ\�м�\ ������������¯�����Ը����������ħ�裺"+a+"��������Ҫ�۵�ħ��ID \r\n(��ҪƷ��5�������ϣ�)1/3", 0, 0, 100000);
          
        } else if (status == 1) {
            id = selection;
            if(cm.��ȡƷ��(id) < 5){
                cm.sendOk("���޷�����������ΪƷ��û�дﵽ5��������");
                cm.dispose();
                return;
            }
            if (cm.getPlayer().getId() == id) {
                cm.sendOk("д�Լ���ȥ��������涺��");
                cm.dispose();
            } else {
                var a = "\r\n";
                a += cm.��ѯħ��2(id);
                cm.sendGetNumber("�����ID��#r" + id + "#kƷ�ʣ�"+cm.��ȡƷ��2(id)+"\r\nʣ��ħ�裺#b" + a + "#k\r\n\r\n#b������Ҫ�ںϵĵڶ���ħ��(��ҪƷ��5�������ϣ�)��\r\n2/3", 0, 0, 2100000000);
            }
        } else if (status == 2) {
            id2 = selection;
              if(cm.��ȡƷ��(id2) < 5){
                cm.sendOk("���޷�����������ΪƷ��û�дﵽ5��������");
                cm.dispose();
                return;
            }
            if(id == id2){
                cm.sendOk("�����������һ���ġ�");
                cm.dispose();
                return;
            }
            var a = "\r\n";
            a += cm.��ѯħ��2(id2);    
            if (cm.��ȡƷ��2(id) != cm.��ȡƷ��2(id2)) {
                cm.sendOk("������2����ͬ�����ħ�裬����Ʒ�ʲ���ȷ���޷���������");
                cm.dispose();
            } else {
                cm.sendGetNumber("�����ID��#r" + id2 + "#kƷ�ʣ�"+cm.��ȡƷ��2(id2)+"\r\nʣ��ħ��(�ų�������)��#b" + a + "#k\r\n\r\n#b�����������ħ��(��ҪƷ��5�������ϣ�)��\r\n3/3", 0, 0, 2100000000);
            }
        } else if (status == 3) {
            id3 = selection;
               if(cm.��ȡƷ��(id3) < 5){
                cm.sendOk("���޷�����������ΪƷ��û�дﵽ5��������");
                cm.dispose();
                return;
            }
            if (cm.��ȡƷ��2(id) != cm.��ȡƷ��2(id3)) {
                cm.sendOk("����");
                cm.dispose();
                return;
            }
            if((id == id3) || (id2 == id3)){
                cm.sendOk("NB!");
                cm.dispose();
                return;
            }
            if(cm.��ȡƷ��(id3) == 100){
                cm.sendOK("������û�е�");
                cm.dispose();
                return;
            }
            var mxb = (cm.��ȡƷ��2(id)*200000);
            cm.sendYesNo("�����ID��"+id+" and ID2:"+id2+" and ID3:"+id3+"\r\n�Ƿ������¯������Ҫ������ĵ��"+mxb);
        } else if (status == 4) {
            var  Ʒ�� = (cm.��ȡƷ��2(id3)+1);
         
            if (Ʒ�� == 1) {
                var  pz = "Ұ��";
            } else if (Ʒ�� == 2) {
                var  pz = "��ͨ";
            } else if (Ʒ�� == 3) {
                var  pz = "����";
            } else if (Ʒ�� == 4) {
                var pz = "�߼�";
            } else if (Ʒ�� == 5) {
                var  pz = "��Ʒ";
            } else if (Ʒ�� == 6) {
                var  pz = "׿Խ";
            } else {
                var  pz = "��Ʒ��";
            }
            var mxb = (cm.��ȡƷ��2(id)*10);
            if (cm.getMeso() >= mxb) {
                cm.gainNX(-mxb);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11, cm.getC().getChannel(), "[ħ����Ϣ]" + " : " + " "+cm.getPlayer().getName()+"��ħ��["+cm.ħ������(id3)+"]��ʼ��¯�����ף��(��)���˰ɣ�", true).getBytes());
                cm.ɾ��ħ��(id);
                cm.ɾ��ħ��(id2);
                cm.ɾ��ħ��(id3);
                cm.��¯(id);
                cm.dispose();
            } else {
                cm.sendOk("��û���㹻��Ǯ��֧����һ�ʷ��á�");
                cm.dispose();
            }
        }
    }
}


