/* First NPC on Map 0
* By Moogra
*/

function start() {
    if (cm.getChar().getMapId() == 0) {
    cm.sendSimple ("�w��Ө�p���p�A. �A�n��ԣ¾�~�ڴN�e�A��¾�~���˳ơI \r\n#L0##b��s��#k#l \r\n\ #L1##b�C�h#k#l \r\n\ #L2##b�k�v#k#l \r\n\ #L3##b�}�b��#k#l \r\n\ #L4##b�s��#k#l \r\n\ #L5##b���s#k#l \r\n\ #L6##b�ާA��@��,���M�O��#k#l");
} else
cm.dispose();
}

function action(mode, type, selection) {
    if (selection > 5) {
        cm.sendSimple("�C�C�� �S���Y .");
        cm.dispose();
    } else {
        switch(selection) {
            case 0: cm.gainItem(2000005, 200); break;
            case 1: cm.gainItem(2000005, 200); break;
            case 2: cm.gainItem(2000005, 200); break;
            case 3: cm.gainItem(2000005, 200); break;
            case 4: cm.gainItem(2000005, 200); break;
            case 5: cm.gainItem(2000005, 200); break;
        }
        cm.warp(910000000);
        cm.worldMessage("�y�s�H���i�z�G�w�缾�a."+ cm.getChar().getName() +"  �Ө�F �p���p�A�@�� �̤F,�j�a�H��h�h���ӥL/�o�a�I");
        cm.resetStats();
        cm.gainMeso(100000);
        cm.addRandomItem(1122058);
        cm.gainItem(1112432, 1);
        cm.sendOk("�}�l�a!!");
        cm.dispose();
    }
}