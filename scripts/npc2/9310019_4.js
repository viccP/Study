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
            
            if(cm.��ȡ����() == null){
                cm.sendOk("���޷����������������#bð����������#k���ſ���ʹ�øù��ܣ�");
                cm.dispose();
                return;
            }
            cm.sendSimple("#r#e����������Ϯ���벻����С���һ���һʤ����\r\n\r\n\t\t\t\t#b<----������Ϣ----->#k\r\n#r\t<-�ȼ���"+cm.getLevel()+"->#k  #r<-���룺"+cm.getBossLog("fb")+"->\t#d<-���֣�"+cm.��ȡ����()+"->#k\r\n#L0##e���ﰲ�ؾ���\r\n\r\n#d#L1#���鴬����#l\r\n\r\n#L2##b��#r��#bħ#r��#rʦ#k��#rѨ#n#l\r\n\r\n#L3##g#e��#r��#d��#b��#k��#r��\r\n\r\n#r#L4#�鿴�������а�#l");
        } else if (status == 1) {
            if (selection == 0) {//���ﰲ��
             cm.openNpc(9310019,1);
            } else if (selection == 1) {//���鴬
              cm.openNpc(9310019,5);
            } else if (selection == 2) {//����ħ��ʦ
                cm.openNpc(9310019,3);
            } else if (selection == 3) {//����
		cm.openNpc(9310019,88);
            } else if (selection == 4){
                cm.openNpc(2101017,0);
            }	
        }
    }
}


