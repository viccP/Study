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
            cm.sendSimple ("您好!這邊可以買到很多台版點裝喔!!\r\n#b#L1#點裝 帽子\r\n#L2#點裝 武器\r\n#L5#點裝 臉部裝飾\r\n#L6#點裝 眼鏡\r\n#L11#點裝 手套\r\n#L12#點裝 披風\r\n#L14#點裝 套服\r\n#L15#點裝 上衣\r\n#L16#點裝 褲子\r\n#L17#點裝 鞋子\r\n#L18#點裝 椅子\r\n#L19#點裝 騎寵\r\n#L20#點裝 馬鞍");
        } else if (status == 1) {
            switch(selection) {
                case 1: cm.openShop(13005); cm.dispose();break;
                case 2: cm.openShop(13036); cm.dispose();break;
                case 5: cm.openShop(13006); cm.dispose();break;
                case 6: cm.openShop(13007); cm.dispose();break;
                case 11: cm.openShop(13008); cm.dispose();break;
                case 12: cm.openShop(13009); cm.dispose();break;
                case 14: cm.openShop(13010); cm.dispose();break;
                case 15: cm.openShop(13011); cm.dispose();break;
                case 16: cm.openShop(13012); cm.dispose();break;
                case 17: cm.openShop(13013); cm.dispose();break; 
                case 18: cm.openShop(13014); cm.dispose();break; 
                case 19: cm.openShop(13015); cm.dispose();break; 
                case 20: cm.openShop(13016); cm.dispose();break; 

         
	    }
        }
    }
}