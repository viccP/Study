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
            cm.sendSimple("#r��ѡ����Ҫȥ�ĸ�����\r\n<���渱����������С���>\r\n\r\n#d#L0#���������������#l\r\n\r\n#L1##g���101�������#n#l\r\n\r\n#b#L2##r���Ů���������\r\n\r\n#L3#����ŷ��������\r\n\r\n#L4#������������");
        } else if (status == 1) {
            if (selection == 0) {//��������
             cm.openNpc(9020000,0);
            } else if (selection == 1) {//�����һ�����
              cm.openNpc(2040034,0);
            }else if(selection == 2){
                cm.openNpc(2013000,0);
            } else if (selection == 3) {
		cm.openNpc(2112006,0);
               
            } else if (selection == 4) {
cm.openNpc(2094000,0);
            }
        }
    }
}


