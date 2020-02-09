var status = 0; 
var maps = Array(100000203, 109020001, 130000100, 101030104, 120000000, 102000000, 101000000, 100000000, 103000000, 680000000, 200000000, 110000000, 221000000, 222000000, 230000000, 211000000, 220000000,260000000, 250000000, 105040300, 600000000, 682000000, 800000000, 801000000, 240000000, 270000100, 970000000, 130000200, 702100000, 501000000, 802000101, 742000000); 
var mapsname = Array("#r[最新]#k#g[熱門]#k#b活動地圖#k", "#r[熱門]#k#b活動地圖2#k", "#r雕像區(需愛你)#k", "#r公會戰#k", "#b鯨魚號#k", "#b勇士之村#k", "#b魔法森林#k", "#b弓箭手村#k", "#b墮落城市#k", "#b結婚小鎮#k", "#b天空之城#k", "#b黃金海岸#k", "#b地球防禦本部#k", "#b童話村#k", "#b水世界#k", "#b冰原雪域#k", "#b玩具城#k", "#b沙漠#k", "#b武林神村#k", "#b奇幻村#k", "#b新葉城#k", "#b鬧鬼宅門口#k", "#b江戶村#k", "#b昭和村#k", "#b神木村#k", "#r時間神殿(須有愛你主城市或是特殊wz才能進)#k", "#r拍照聖地(條件同上)#k", "#r耶雷弗(條件同上)#k", "#r少林寺(條件同上)#k", "#r黃金寺廟(條件同上)#k", "#r未來東京(條件同上)#k", "#r台北101(條件同上)#k"); 
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
            cm.sendOk("好的,如果你決定好了要去哪裡,我會很樂意傳送你的."); 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else { 
            cm.sendOk("好的,如果你決定好了要去哪裡,我會很樂意傳送你的."); 
            cm.dispose(); 
            return; 
        } if (status == 0) { 
            cm.sendYesNo("你好,我可以幫你傳送到很多地方，打怪累了去散散心嗎？"); 
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