/*
轉轉戀筆改寫
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
            cm.sendSimple ("親愛的玩家#r#h ##k有何貴幹?\r\n\#r#L0##e地圖傳送#r#L1#Boss 傳送#L2#練功地圖#L43#黃金鐵鎚\r\n#b#L42#點數販賣#L35#創建工會#L41#每日獎勵#L18#寵物領取#k\r\n#L34#鎖住裝備#L36#解鎖裝備#L38#觀看時間#L25#任務技能全滿\r\n#L28##d台版最新點裝#L14#4轉技能上限10#L4#是非選擇題#b\r\n#L5##g銀行#L23#素質重置#L7#超級百貨#L8#廣播專賣\r\n#L10##e#r音樂點歌#L11#倉庫管理#L12#玩具販賣區\r\n#b#L13#購買名聲#L30#黃金楓葉武器#L24#點裝購買#L39#排行查詢\r\n#g#L15#想成為正咩?#L16#想成為帥哥?#L26#進階正咩#L27#進階帥哥#l\r\n#k#L17##d1轉職業#L22#2~4轉#L9#技能書查詢");
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