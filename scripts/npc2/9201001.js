/*
@    Creator :  3esah Of Ragzone
@    Updater :  3esah Of Ragezone
@    NPC = 9030000
@    Function = Best Shop Biggest Shop Ever
@
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
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
    cm.sendSimple ("歡迎參觀熊熊販賣店,這裡有賣點數商品..雜物等" +"#k\r\n#L80#雜物商店[召喚.魔法石.變身藥.椅子.騎寵 ]" +"#k\r\n#L86#藥水店" +"#k\r\n#L87#部份點數商品");
      } else if (selection == 80) {
               cm.sendSimple (" 各種東西販賣店#e#d" +
            "#k\r\n#L50##r轉蛋捲 魔法石 召喚石 變身藥 移動捲 廣播 商店" +
            "#k\r\n#L52##r炎魔鐘王召喚物品" +
            "#k\r\n#L53##r騎寵"+
            "#k\r\n#L78##r寵物用品");
      } else if (selection == 81) {
               cm.sendSimple ("法師專賣店#e#d" +
            "#k\r\n#L1##b法師 套服" +
            "#k\r\n#L0##b法師 鞋子" +
            "#k\r\n#L2##b法師 手套" +
            "#k\r\n#L3##b法師 帽子" +
            "#k\r\n#L4##b法師 盾牌" +
            "#l\r\n#L5##b法師 短杖" +
            "#l\r\n#L6##b法師 長杖");
      } else if (selection == 82) {
               cm.sendSimple ("盜賊專賣店#e#d" +
            "#k\r\n#L7##d盜賊  鞋子" +
            "#k\r\n#L8##d盜賊  褲子" +
            "#k\r\n#L9##d盜賊  衣服" +
            "#k\r\n#L10##d盜賊 套服" +
            "#k\r\n#L11##d盜賊 手套" +
            "#k\r\n#L12##d盜賊 帽子" +
            "#k\r\n#L13##d盜賊 盾牌" +
            "#k\r\n#L14##d盜賊 短刀" +
            "#k\r\n#L15##d盜賊 拳套" +
            "#k\r\n#L16##d盜賊 飛鏢");
      } else if (selection == 83) {
               cm.sendSimple ("劍士專賣店#e#d" +
            "#k\r\n#L17##g劍士 鞋子" +
            "#k\r\n#L18##g劍士 褲子" +
            "#k\r\n#L19##g劍士 衣服" +
            "#k\r\n#L20##g劍士 套服" +
            "#k\r\n#L21##g劍士 手套" +
            "#k\r\n#L22##g劍士 帽子" +
            "#k\r\n#L23##g劍士 盾牌" +
            "#k\r\n#L24##g劍士 單手斧" +
            "#k\r\n#L25##g劍士 雙手斧" +
            "#k\r\n#L26##g劍士 單手棍" +
            "#k\r\n#L27##g劍士 雙手棍" +
            "#k\r\n#L28##g劍士 單手劍" +
            "#k\r\n#L29##g劍士 雙手劍" +
            "#k\r\n#L30##g劍士 槍" +
            "#k\r\n#L31##g劍士 矛");
      } else if (selection == 84) {
               cm.sendSimple ("弓箭手專賣店#e#d" +
            "#k\r\n#L32##b弓箭手 鞋子" +
            "#k\r\n#L33##b弓箭手 套服" +
            "#k\r\n#L34##b弓箭手 手套" +
            "#k\r\n#L35##b弓箭手 帽子" +
            "#k\r\n#L36##b弓箭手  弓" +
            "#k\r\n#L37##b弓箭手 孥" +
            "#k\r\n#L38##b弓箭手 箭失");
      } else if (selection == 88) {
               cm.sendSimple ("海盜專賣店#e#d" +
            "#k\r\n#L106##b海盜 武器" +
            "#k\r\n#L110##b海盜 子彈" +
            "#k\r\n#L109##b海盜 套服" +
            "#k\r\n#L108##b海盜 手套" +
            "#k\r\n#L107##b海盜 鞋子");
      } else if (selection == 85) {
               cm.sendSimple ("內有稀有珍藏品 #e#d" +
            "\r\n#L39#楓葉武器" +
            "\r\n#L40#全職業 耳環" +
            "\r\n#L41#全職業 裝飾" +
            "#k\r\n#L42#全職業 披風" +
            "\r\n#L43#全職業 鞋子" +
            "\r\n#L44#全職業 頭盔" +
            "\r\n#L45#全職業 手套" +
            "\r\n#L46#全職業 套服" +
            "\r\n#L47#全職業 盾牌" +
            "\r\n#L48#全職業 0等武器" +
            "\r\n#L91#稀有裝備-專賣店");
      } else if (selection == 86) {
               cm.sendSimple ("販賣各種加強藥水#e#d" +
            "\r\n#L51#藥水"+
            "\r\n#L77#變身藥水");
      } else if (selection == 87) {
               cm.sendSimple ("點數商品販賣#e#d" +
            "\r\n#L69#點數商品-飛鏢" +
            "\r\n#L59#點數商品-披風" +
            "\r\n#L70#點數商品-慶祝");
      } else if (selection == 100) {
	cm.openShop (10081);
      } else if (selection == 102) {
        cm.openShop (10086);
        cm.dispose();
      } else if (selection == 101) {
        cm.openShop (10092);
        cm.dispose();
      } else if (selection == 100) {
        cm.openShop (10081);
        cm.dispose();
      } else if (selection == 99) {
        cm.openShop (10080);
        cm.dispose();
      } else if (selection == 98) {
        cm.openShop (10083);
        cm.dispose();
      } else if (selection == 97) {
        cm.openShop (10082);
        cm.dispose();
      } else if (selection == 96) {
        cm.openShop (10085);
        cm.dispose();
      } else if (selection == 95) {
        cm.openShop (10084);
        cm.dispose();
      } else if (selection == 94) {
        cm.openShop (10053);
        cm.dispose();
      } else if (selection == 0) {
        cm.openShop (10000);
        cm.dispose();
      } else if (selection == 1) {
        cm.openShop (10001);
        cm.dispose();
      } else if (selection == 2) {
        cm.openShop (10002);
        cm.dispose();
      } else if (selection == 3) {
        cm.openShop (10003);
        cm.dispose();
      } else if (selection == 4) {
        cm.openShop (10004);
        cm.dispose();
      } else if (selection == 5) {
        cm.openShop (10005);
        cm.dispose();
      } else if (selection == 6) {
        cm.openShop (10006);
        cm.dispose();
      } else if (selection == 7) {
        cm.openShop (10007);
        cm.dispose();
      } else if (selection == 8) {
        cm.openShop (10008);
        cm.dispose();
      } else if (selection == 9) {
        cm.openShop (10009);
        cm.dispose();
      } else if (selection == 10) {
        cm.openShop (10010);
        cm.dispose();
      } else if (selection == 11) {
        cm.openShop (10011);
        cm.dispose();
      } else if (selection == 12) {
        cm.openShop (10012);
        cm.dispose();
      } else if (selection == 13) {
        cm.openShop (10013);
        cm.dispose();
      } else if (selection == 14) {
        cm.openShop (10014);
        cm.dispose();
      } else if (selection == 15) {
        cm.openShop (10015);
        cm.dispose();
      } else if (selection == 16) {
        cm.openShop (10038);
        cm.dispose();
      } else if (selection == 17) {
        cm.openShop (10016);
        cm.dispose();
      } else if (selection == 18) {
        cm.openShop (10017);
        cm.dispose();
      } else if (selection == 19) {
        cm.openShop (10018);
        cm.dispose();
      } else if (selection == 20) {
        cm.openShop (10019);
        cm.dispose();
      } else if (selection == 21) {
        cm.openShop (10020);
        cm.dispose();
      } else if (selection == 22) {
        cm.openShop (10021);
        cm.dispose();
      } else if (selection == 23) {
        cm.openShop (10022);
        cm.dispose();
      } else if (selection == 24) {
        cm.openShop (10023);
        cm.dispose();
      } else if (selection == 25) {
        cm.openShop (10024);
        cm.dispose();
      } else if (selection == 26) {
        cm.openShop (10025);
        cm.dispose();
      } else if (selection == 27) {
        cm.openShop (10026);
        cm.dispose();
      } else if (selection == 28) {
        cm.openShop (10027);
        cm.dispose();
      } else if (selection == 29) {
        cm.openShop (10028);
        cm.dispose();
      } else if (selection == 30) {
        cm.openShop (10029);
        cm.dispose();
      } else if (selection == 31) {
        cm.openShop (10030);
        cm.dispose();
      } else if (selection == 32) {
        cm.openShop (10031);
        cm.dispose();
      } else if (selection == 33) {
        cm.openShop (10032);
        cm.dispose();
      } else if (selection == 34) {
        cm.openShop (10033);
        cm.dispose();
      } else if (selection == 35) {
        cm.openShop (10034);
        cm.dispose();
      } else if (selection == 36) {
        cm.openShop (10035);
        cm.dispose();
      } else if (selection == 37) {
        cm.openShop (100320);
        cm.dispose();
      } else if (selection == 38) {
        cm.openShop (10037);
        cm.dispose();
      } else if (selection == 39) {
        cm.openShop (10051);
        cm.dispose();
      } else if (selection == 40) {
        cm.openShop (10039);
        cm.dispose();
      } else if (selection == 41) {
        cm.openShop (10040);
        cm.dispose();
      } else if (selection == 42) {
        cm.openShop (10041);
        cm.dispose();
      } else if (selection == 43) {
        cm.openShop (10042);
        cm.dispose();
      } else if (selection == 44) {
        cm.openShop (10043);
        cm.dispose();
      } else if (selection == 45) {
        cm.openShop (10044);
        cm.dispose();
      } else if (selection == 46) {
        cm.openShop (10045);
        cm.dispose();
      } else if (selection == 47) {
        cm.openShop (10046);
        cm.dispose();
      } else if (selection == 48) {
        cm.openShop (10047);
        cm.dispose();
      } else if (selection == 49) {
        cm.openShop (10048);
        cm.dispose();
      } else if (selection == 50) {
        cm.openShop (10048);
        cm.dispose();
      } else if (selection == 51) {
        cm.openShop (10049);
        cm.dispose();
      } else if (selection == 52) {
        cm.openShop (10050);
        cm.dispose();
      } else if (selection == 53) {
        cm.openShop (10052);
        cm.dispose();
      } else if (selection == 54) {
        cm.openShop (10053);
        cm.dispose();
      } else if (selection == 55) {
        cm.openShop (10054);
        cm.dispose();
      } else if (selection == 56) {
        cm.openShop (10055);
        cm.dispose();
      } else if (selection == 57) {
        cm.openShop (10056);
        cm.dispose();
      } else if (selection == 58) {
        cm.openShop (10057);
        cm.dispose();
      } else if (selection == 59) {
        cm.openShop (10058);
        cm.dispose();
      } else if (selection == 60) {
        cm.openShop (10059);
        cm.dispose();
      } else if (selection == 61) {
        cm.openShop (10060);
        cm.dispose();
      } else if (selection == 62) {
        cm.openShop (10061);
        cm.dispose();
      } else if (selection == 63) {
        cm.openShop (10062);
        cm.dispose();
      } else if (selection == 64) {
        cm.openShop (10063);
        cm.dispose();
      } else if (selection == 65) {
        cm.openShop (10064);
        cm.dispose();
      } else if (selection == 66) {
        cm.openShop (10065);
        cm.dispose();
      } else if (selection == 67) {
        cm.openShop (10066);
        cm.dispose();
      } else if (selection == 69) {
        cm.openShop (10068);
        cm.dispose();
      } else if (selection == 70) {
        cm.openShop (10069);
        cm.dispose();
      } else if (selection == 71) {
        cm.openShop (10088);
        cm.dispose();
      } else if (selection == 72) {
        cm.openShop (10089);
        cm.dispose();
      } else if (selection == 73) {
        cm.openShop (10090);
        cm.dispose();
      } else if (selection == 74) {
        cm.openShop (10091);
        cm.dispose();
      } else if (selection == 75) {
        cm.openShop (10093);
        cm.dispose();
      } else if (selection == 76) {
        cm.openShop (10087);
        cm.dispose();
      } else if (selection == 77) {
        cm.openShop (13018);
        cm.dispose();
      } else if (selection == 78) {
        cm.openShop (10055);
        cm.dispose();
      } else if (selection == 110) {
        cm.openShop (13001);
        cm.dispose();
      } else if (selection == 109) {
        cm.openShop (13002);
        cm.dispose();
      } else if (selection == 108) {
        cm.openShop (13003);
        cm.dispose();
      } else if (selection == 107) {
        cm.openShop (13004);
        cm.dispose();
      } else if (selection == 106) {
        cm.openShop (13035);
        cm.dispose();
      } else if (selection == 91) {
        cm.openShop (200);
      } else if (selection == 80) {
	cm.openShop (300);
      } else if (selection == 96) {
	cm.openShop (8000);
      } else if (selection == 95) {
	cm.openShop (1030);
      } else if (selection == 99) {
		cm.openShop (1339);
      } else if (selection == 103) {
                cm.sendSimple ("How much would you like?#e#d" +
                 "#k\r\n#L89##r10k NX cash for 200k mesos" +
                 "#k\r\n#L90##r20k NX cash for 400k mesos" +
                 "#k\r\n#L91##r30k NX cash for 600k mesos" +
                 "#k\r\n#L92##r40k NX cash for 800k mesos" +
                 "#k\r\n#L93##r50k NX cash for 1 million mesos");
      } else if (selection == 89) {
        if (cm.getMeso < 200000) {
                   cm.sendOk ("Please check if you have enough #rmesos#k");
                   cm.dispose();
      } else {
                   cm.gainMeso (-200000);
                   cm.modifyNX(10000,4);
                   cm.dispose();
                   }
      } else if (selection == 90) {
        if (cm.getMeso < 400000) {
                   cm.sendOk ("Please check if you have enough #rmesos#k");
                   cm.dispose();
      } else {
                   cm.gainMeso (-400000);
                   cm.modifyNX(20000,4);
                   cm.dispose();
                   }
      } else if (selection == 91) {
        if (cm.getMeso < 600000) {
                   cm.sendOk ("Please check if you have enough #rmesos#k");
                   cm.dispose();
      } else {
                   cm.gainMeso (-600000);
                   cm.modifyNX(30000,4);
                   cm.dispose();
                   }
      } else if (selection == 92) {
        if (cm.getMeso < 800000) {
                   cm.sendOk ("Please check if you have enough #rmesos#k");
                   cm.dispose();
      } else {
                   cm.gainMeso (-800000);
                   cm.modifyNX(40000,4);
                   cm.dispose();
                   }
      } else if (selection == 93) {
        if (cm.getMeso < 1000000) {
                   cm.sendOk ("Please check if you have enough #rmesos#k");
                   cm.dispose();
      } else {
                   cm.gainMeso (-1000000);
                   cm.modifyNX(50000,4);
                   cm.dispose();
                   }
            }
      }
}  

