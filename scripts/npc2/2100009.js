importPackage(java.util);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server);

var slot;
var item;
var qty;
var status = 0;
var display;
var needap = -1;

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
            cm.sendOk("���F���U��h���H�޲z�n�ۤv���˳�,�ګD�`�����I");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
			//if(cm.getChar().isGM() == 0) {
				//cm.sendOk("�A���OGM! �L�k�ϥΦ��\��");
				//cm.dispose();
			//} else {
            cm.sendGetNumber("�п�J�˳ƪ����ǼƦr, �ڱN���A�b�����W�W�[1��. \r\n �˳ƼW�[���Ʃһݪ��~��#r#t5570000##k#i5570000#�C\r\n#b[�`�N�G���\��u�i�ϥλP�˳���I]#k",1,1,100);
//}

        } else if (status == 1) {
            slot = selection;
            item = cm.getChar().itemid(slot);
            if (item==0 || item==1122000 || item==1122076 || item==1012164 || item==1012167 || item==1012168 || item==1012169 || item==1012170 || item==1012171 || item==1012172 || item==1012173 || item==1012174 || item==1112405 || item==1112413 || item==1112414 || item==1112445 || item==1122024 || item==1122025 || item==1122026 || item==1122027 || item==1122028 || item==1122029 || item==1122030 || item==1122031 || item==1122032 || item==1122033 || item==1122034 || item==1122035 || item==1122036 || item==1122037 || item==1122038 || item==1122058){
                cm.sendOk("�A��J�����~��m�S���˳ƩάO�Ӹ˳Ƥ���V!")
                cm.dispose();
            }else
                cm.sendYesNo("�A�T�w�n��U���o��˳ƼW�[���ƶܡH\r\n#i"+item+"# #b#t"+item+"#")
        } else if (status == 2) {
            var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot).copy();
            if (cm.haveItem(5570000,1) && item.getVicious() <2) {
                var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot).copy();
                    cm.gainItem(5570000,-1);
                    item.setVicious((item.getVicious() + 1 ));
                    item.setUpgradeSlots((item.getUpgradeSlots() + 1 ));
                    MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, slot, 1, true);
                    MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item);
                    cm.sendOk("���\�W�[��,�V�F#r"+item.getVicious()+"#k��,#r�@��˳ƥu��V2��#k");
                cm.dispose();
            }else{
                cm.sendOk("��p,�A�S�������K��άO�˳Ƥw�g�V�L2���F,�Ӹˤw�V�F#r"+item.getVicious()+"#k��");
                cm.dispose();
            }
    }
}
} 