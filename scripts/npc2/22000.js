/*
�����ʵ���g
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
            cm.sendSimple ("�˷R�����a#r#h ##k����Q�F?\r\n\#r#L0##e�a�϶ǰe#r#L1#Boss �ǰe#L2#�m�\�a��#L43#�����K��\r\n#b#L42#�I�Ƴc��#L35#�Ыؤu�|#L41#�C����y#L18#�d�����#k\r\n#L34#���˳�#L36#����˳�#L38#�[�ݮɶ�#L25#���ȧޯ����\r\n#L28##d�x���̷s�I��#L14#4��ޯ�W��10#L4#�O�D����D#b\r\n#L5##g�Ȧ�#L23#���譫�m#L7#�W�Ŧʳf#L8#�s���M��\r\n#L10##e#r�����I�q#L11#�ܮw�޲z#L12#����c���\r\n#b#L13#�ʶR�W�n#L30#���������Z��#L24#�I���ʶR#L39#�Ʀ�d��\r\n#g#L15#�Q��������?#L16#�Q�����ӭ�?#L26#�i������#L27#�i���ӭ�#l\r\n#k#L17##d1��¾�~#L22#2~4��#L9#�ޯ�Ѭd��");
        } else if (status == 1) {
            switch(selection) {
                case 0: cm.openNpc(9000020); break;
                case 1: cm.openNpc(9201045); break;
                case 2: cm.openNpc(9220005); break;
                case 3: cm.openNpc(2040048); break;
                case 4: cm.openNpc(9010000); break;
           	case 5: cm.openNpc(2100006); break;
                case 7: cm.openNpc(9201001); break;
		case 8: cm.openNpc(2093004); break;
		case 9: cm.openNpc(9201086); break;
		case 10: cm.openNpc(1061008); break;
		case 11: cm.openNpc(1022005); break;
		case 12: cm.openShop(13017); cm.dispose();break; 
		case 13: cm.openNpc(9000017); break;
		case 14: cm.openNpc(9201091); break;
		case 15: cm.openNpc(9900000); break;
		case 16: cm.openNpc(9010001); break;
		case 17: cm.openNpc(9201088); break;
		case 18: cm.openNpc(9201036); break;
                case 22: cm.openNpc(9200000); break;
		case 23: cm.openNpc(2003); break;  
		case 24: cm.openNpc(9201089); break;  
		case 25: cm.openNpc(12101); break;
		case 26: cm.openNpc(1012104); break;
		case 27: cm.openNpc(1012103); break;
		case 28: cm.openNpc(9201101); break;
		case 30: cm.openNpc(9201024); break;
		case 34: cm.openNpc(1012006); break;
		case 35: cm.warp(200000301 ,0); cm.dispose(); break;
		case 36: cm.openNpc(9000008); break;
		case 38: cm.openNpc(9000009); break;
		case 39: cm.openNpc(9040004); break;
		case 41: cm.openNpc(2100005); break;
		case 42: cm.openNpc(9201082); break;
		case 43: cm.openNpc(2100009); break;

           
	    }
        }
    }
}