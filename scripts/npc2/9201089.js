/*
Multi-Purpose NPC
Author: Moogra
 */
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)                           						
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple ("�z�n!�o��i�H�R��ܦh�I�˳�!!\r\n#b#L1#�I�� �U�l#L2#�I�� �Z��#L3#�I�� ����#L4#�I�� �����S��\r\n#L5#�I�� �y���˹�#L6#�I�� ����#L7#�I�� ����#L8#�I�� ��\r\n#L9#�I�� �٫�#L10#�I�� �޵P#L11#�I�� ��M#L12#�I�� �ܭ�\r\n#L14#�I�� �M�A#L15#�I�� �W��#L16#�I�� �Ǥl#L17#�I�� �c�l");
        } else if (status == 1) {
            switch(selection) {
                case 1: cm.openShop(10081); cm.dispose();break;
                case 2: cm.openShop(10080); cm.dispose();break;
                case 3: cm.openShop(10068); cm.dispose();break;
                case 4: cm.openShop(10071); cm.dispose();break;
                case 5: cm.openShop(10066); cm.dispose();break;
                case 6: cm.openShop(10065); cm.dispose();break;
                case 7: cm.openShop(10064); cm.dispose();break;
                case 8: cm.openShop(10063); cm.dispose();break;
                case 9: cm.openShop(10061); cm.dispose();break;
                case 10: cm.openShop(10060); cm.dispose();break;
                case 11: cm.openShop(10059); cm.dispose();break;
                case 12: cm.openShop(10058); cm.dispose();break;
                case 14: cm.openShop(10082); cm.dispose();break;
                case 15: cm.openShop(10084); cm.dispose();break;
                case 16: cm.openShop(10085); cm.dispose();break;
                case 17: cm.openShop(10083); cm.dispose();break; 

         
	    }
        }
    }
}