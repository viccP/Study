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
            cm.sendSimple ("您好!這邊可以買到很多點裝喔!!\r\n#b#L1#點裝 帽子#L2#點裝 武器#L3#點裝 飛鏢#L4#點裝 部分特效\r\n#L5#點裝 臉部裝飾#L6#點裝 眼鏡#L7#點裝 耳環#L8#點裝 表情\r\n#L9#點裝 戒指#L10#點裝 盾牌#L11#點裝 手套#L12#點裝 披風\r\n#L14#點裝 套服#L15#點裝 上衣#L16#點裝 褲子#L17#點裝 鞋子");
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