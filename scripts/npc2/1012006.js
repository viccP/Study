/*
-- MrCoffee JavaScript --
        NPC�}�� 
-------------------------
   MrCoffee MapleStory
----- Version Info ------
     Version - 1.0.0 
-------------------------
*/
importPackage(net.sf.odinms.client);
var slot;
var item;
var qty;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status <= 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("���F���U��h�H�޲z�n�ۤv���˳Ƨګܦ�");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
            cm.sendGetNumber("�п�J�˳ƪ����ǼƦr, �ڷ|���A���L. \r\n �˳ƩҦ��|������,�ᱼ �ҥH�b�K�Q���D�N���ΩȤF�C\r\n #b[�`�N�G�u��Φb�˳���]#k",1,1,100);
        } else if (status == 1) {
            slot = selection;
            item = cm.getChar().itemid(slot);
            if (item==0){
                cm.sendOk("�A��J�����~��m�S���F��!")
                cm.dispose();
            }
            else
                cm.sendYesNo("�A�n���U���o�Ӹ˳ƶܡH\r\n#i"+item+"# #b#t"+item+"#")
         } else if (status == 2) {
	    cm.getChar().lockitem(slot,true)
            cm.sendOk("�˳ơG#i"+item+"##b#t"+item+"##k ���F!");
            cm.dispose();
        }
    }
}  
