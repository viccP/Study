var status = 0; 
var maps = Array(100000005, 105070002, 800010100, 105090900, 682000001, 240020101, 240020401, 230040420, 801040003, 220080000, 211042300, 240040700, 800020130, 551030100, 270050000, 501030104, 800040410, 701010320, 741020100, 541020800); 
var mapsname = Array("�K�ҽޤ��颻(Ĩۣ��)", "Ĩۣ������(�L��Ĩۣ��)", "�Ѭӷ���(��Ĩۣ��)", "�Q�A�G���x�|(�ڬ��j)", "�ۼv�˪L(�]��)", "����h�˪L(����h)", "�Q���s�Ϯ��a(�Q���s)", "���㴵�}��(���㴵)", "���A�q�V", "�ɶ���(�Թϴ�)", "���]", "�t���s���}��", "�Ѫ�", "#r�ڤۤ���(�����઺)(�S��WZ)#k", "#r�ѫo������(���֥d�)(�P�W)#k", "#r�����ѩ^��(�����⨸����)(�P�W)#k", "#r���Ѭ�(�P�W)#k", "#r���G��(�P�W)#k", "#r�½���(�P�W)#k", "#r�J�p�뺸��� II(�P�W)#k"); 
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
            cm.sendOk("�n��,�p�G�A�M�w�n�h����,�ڷ|�ַܼN�ǰe�A��."); 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else { 
            cm.sendOk("�n��,�p�G�A�M�w�n�h����,�ڷ|�ַܼN�ǰe�A��."); 
            cm.dispose(); 
            return; 
        } if (status == 0) { 
            cm.sendYesNo("HI�A�ڬOVIP�M��BOSS�Ū��Ǫ��ǰe���Ať��GM���b�Ҽ{�������q���a������BOSS�ǰe�A���L�A�OVIP���ܴN���ξ�ߤF�I"); 
        } else if (status == 1) { 
            var selStr = "��ܧA���ت��a.#b"; 
                for (var i = 0; i < maps.length; i++) { 
                selStr += "\r\n#L" + i + "#" + mapsname[ i ]+""; 
                } 
            cm.sendSimple(selStr); 
            
        } else if (status == 2) { 
            cm.sendYesNo("�A�u���n�h " + mapsname[selection] + "��?"); 
            selectedMap = selection; 
        } 
        
        else if (status == 3) { 
            cm.warp(maps[selectedMap], 0); 
            cm.dispose(); 
        }
    }
}