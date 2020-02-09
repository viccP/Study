var wui = 0; 

function start() { 
    cm.sendSimple ("你好, 我是忍耐任務獎賞人員 請再下面選你要的.\r\n#L0##i4032056#3個\n\  #l\r\n#L1##i4000313#3個\n\  #l"); 
} 

function action(mode, type, selection) { 
cm.dispose(); 
    if (selection == 0) { 

if (cm.haveItem(4000313, 0)){
                      cm.gainItem(4032056,3); 
                      cm.sendOk("謝謝你的支持, 這是給你的#i4032056#3個."); 
                      cm.warp(910000000);
 cm.serverNotice("『忍耐公告』：恭喜"+ cm.getChar().getName() +"，跳過了三號地區忍耐 獲得 3個楓葉水晶!");
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r抱歉. 您帶來的#i4000313#不太夠.#k "); 
                cm.dispose(); 
                }      
        } else if (selection == 1) { 
                    if (cm.haveItem(4000313, 0)) { 
                      cm.gainItem(4000313, 3); 
                      cm.sendOk("謝謝你的支持!, 這是給你的#i4000313#3個.");
                      cm.warp(910000000); 
 cm.serverNotice("『忍耐公告』：恭喜"+ cm.getChar().getName() +"，跳過了三號地區忍耐 獲得 3個楓葉水晶!");
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r抱歉. 您帶來的#i4000313#不太夠.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 2) { 
                    if (cm.haveItem(4000313, 10)) { 
                      cm.gainItem(1902033, 1);  
                      cm.gainItem(1912026, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("謝謝你的黃金楓葉!, 這是給你的1個#i1902033#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r抱歉. 您帶來的#i4000313#不太夠.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 3) { 
                    if (cm.haveItem(4000313, 10)) { 
                      cm.gainItem(1902034, 1);  
                      cm.gainItem(1912027, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("謝謝你的黃金楓葉!, 這是給你的1組#i1902034#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r抱歉. 您帶來的#i4000313#不太夠.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 4) { 
                    if (cm.haveItem(4000313, 10)) {                    
                      cm.gainItem(1902035, 1); 
                      cm.gainItem(1912028, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("謝謝你的黃金楓葉!, 這是給你的#i1902035#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r抱歉. 您帶來的#i4000313#不太夠.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 5) {    
                    if (cm.haveItem(4000313, 10)) {                    
                      cm.gainItem(1902037, 1); 
                      cm.gainItem(1912030, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("謝謝你的黃金楓葉!, 這是給你的#i1902037#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r抱歉. 您帶來的#i4000313#不太夠.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 6) { 
                    if (cm.haveItem(4000313, 10)) { 
                      cm.gainItem(1902045, 1);  
                      cm.gainItem(1912038, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("謝謝你的黃金楓葉!, 這是給你的#i1902045#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r抱歉. 您帶來的#i4000313#不太夠.#k "); 
                cm.dispose(); 
                } 


        cm.dispose(); 
        }     
}