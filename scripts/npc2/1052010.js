var wui = 0; 

function start() { 
    cm.sendSimple ("�A�n, �ڬO�ԭ@���ȼ���H�� �ЦA�U����A�n��.\r\n#L0##i4032056#3��\n\  #l\r\n#L1##i4000313#3��\n\  #l"); 
} 

function action(mode, type, selection) { 
cm.dispose(); 
    if (selection == 0) { 

if (cm.haveItem(4000313, 0)){
                      cm.gainItem(4032056,3); 
                      cm.sendOk("���§A�����, �o�O���A��#i4032056#3��."); 
                      cm.warp(910000000);
 cm.serverNotice("�y�ԭ@���i�z�G����"+ cm.getChar().getName() +"�A���L�F�T���a�ϧԭ@ ��o 3�ӷ�������!");
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r��p. �z�a�Ӫ�#i4000313#���Ӱ�.#k "); 
                cm.dispose(); 
                }      
        } else if (selection == 1) { 
                    if (cm.haveItem(4000313, 0)) { 
                      cm.gainItem(4000313, 3); 
                      cm.sendOk("���§A�����!, �o�O���A��#i4000313#3��.");
                      cm.warp(910000000); 
 cm.serverNotice("�y�ԭ@���i�z�G����"+ cm.getChar().getName() +"�A���L�F�T���a�ϧԭ@ ��o 3�ӷ�������!");
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r��p. �z�a�Ӫ�#i4000313#���Ӱ�.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 2) { 
                    if (cm.haveItem(4000313, 10)) { 
                      cm.gainItem(1902033, 1);  
                      cm.gainItem(1912026, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("���§A����������!, �o�O���A��1��#i1902033#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r��p. �z�a�Ӫ�#i4000313#���Ӱ�.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 3) { 
                    if (cm.haveItem(4000313, 10)) { 
                      cm.gainItem(1902034, 1);  
                      cm.gainItem(1912027, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("���§A����������!, �o�O���A��1��#i1902034#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r��p. �z�a�Ӫ�#i4000313#���Ӱ�.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 4) { 
                    if (cm.haveItem(4000313, 10)) {                    
                      cm.gainItem(1902035, 1); 
                      cm.gainItem(1912028, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("���§A����������!, �o�O���A��#i1902035#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r��p. �z�a�Ӫ�#i4000313#���Ӱ�.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 5) {    
                    if (cm.haveItem(4000313, 10)) {                    
                      cm.gainItem(1902037, 1); 
                      cm.gainItem(1912030, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("���§A����������!, �o�O���A��#i1902037#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r��p. �z�a�Ӫ�#i4000313#���Ӱ�.#k "); 
                cm.dispose(); 
                } 
        } else if (selection == 6) { 
                    if (cm.haveItem(4000313, 10)) { 
                      cm.gainItem(1902045, 1);  
                      cm.gainItem(1912038, 1); 
                      cm.gainItem(4000313, -10); 
                      cm.sendOk("���§A����������!, �o�O���A��#i1902045#."); 
                      cm.dispose(); 
            } else { 
                cm.sendOk(" #r��p. �z�a�Ӫ�#i4000313#���Ӱ�.#k "); 
                cm.dispose(); 
                } 


        cm.dispose(); 
        }     
}