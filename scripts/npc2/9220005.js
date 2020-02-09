var status = 0; 
var maps = Array(682000403, 251010402, 220060301, 240040600, 250020000, 230040400, 910500000, 910300000, 680010000, 670000100, 980010020, 682000304, 541020600); 
var mapsname = Array("#r扯線娃娃(#b適合中等玩家)", "#r紅鼻子海盜團老巢2 (#b適合中等玩家)", "#r亡靈海盜船(#b適合中高等玩家)", "#r主巢穴山峰(#b適合高等玩家)", "#r初級修煉場(#b50~70)", "#r鯊魚(#b適合中高等玩家)", "#r小巴(#b適合中高等玩家)", "#r達克魯的訓練場(#b適合中高等玩家)", "#r練功地圖(#b1~30)", "#r練功地圖2(#b30~50)", "#r死靈地圖(#b適合中高等玩家)", "#rBOSS冰龍地圖(#b適合高等玩家)", "#r杜庫(#b需愛你或是6個WZ)"); 
var selectedMap = -1; 

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else { 
        if (status >= 3 && mode == 0) { 
            cm.sendOk("好的,如果你決定要去哪裡,我會很樂意傳送你的."); 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else { 
            cm.sendOk("好的,如果你決定要去哪裡,我會很樂意傳送你的."); 
            cm.dispose(); 
            return; 
        } if (status == 0) { 
            cm.sendYesNo("HI，我是VIP專用練級場傳送，GM說如果你發現更好的地圖請聯繫他！"); 
        } else if (status == 1) { 
            var selStr = "選擇你的目的地.#b"; 
                for (var i = 0; i < maps.length; i++) { 
                selStr += "\r\n#L" + i + "#" + mapsname[ i ]+""; 
                } 
            cm.sendSimple(selStr); 
            
        } else if (status == 2) { 
            cm.sendYesNo("你真的要去 " + mapsname[selection] + "嗎?"); 
            selectedMap = selection; 
        } 
        
        else if (status == 3) { 
            cm.warp(maps[selectedMap], 0); 
            cm.dispose(); 
        }
    }
}