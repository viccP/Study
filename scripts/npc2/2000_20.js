/*�һ���Ҫ #v4000425#  ���� #v4000424#  ���� #v4000423# ����#v4000422#*/

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

            cm.sendOk("��л��Ĺ��٣�");
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "�һ���Ҫ #v4000425#  ���� #v4000424#  ���� #v4000423# ����#v4000422# (�һ��Ľ�ָΪһ�ԣ�����+��Ƭ)\r\n"
            text += "#L1#ʹ��#v4000425#�һ���ָ#l\t\t";//����
            text += "#L2#ʹ��#v4000424#�һ���ָ#l\r\n"//���ֽ�
            text += "#L3#ʹ��#v4000423#�һ���ָ#l\t\t"//�̽�
            text += "#L4#ʹ��#v4000422#�һ���ָ#l\r\n\r\n"//�����󹫶���
            cm.sendSimple(text);
        } else if (selection == 1) { //��ƾ��Ҷ����
           cm.openNpc(2000,100);
        } else if (selection == 2) {  //�����󹫵��ֽ�      
          cm.openNpc(2000,200);
        } else if (selection == 3) { //�����󹫶̽� 
          cm.openNpc(2000,300);
        } else if (selection == 4) {
           cm.openNpc(2000,400);
        } else if (selection == 5) { //�����󹫳���
           
        } else if (selection == 5) {
          
        } else if (selection == 6) {
         
        } else if (selection == 7) {
           
        } else if (selection == 8) {
           
        } else if (selection == 9) {
          
        }
    }
}


