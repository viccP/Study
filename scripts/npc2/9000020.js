var status = 0; 
var maps = Array(100000203, 109020001, 130000100, 101030104, 120000000, 102000000, 101000000, 100000000, 103000000, 680000000, 200000000, 110000000, 221000000, 222000000, 230000000, 211000000, 220000000,260000000, 250000000, 105040300, 600000000, 682000000, 800000000, 801000000, 240000000, 270000100, 970000000, 130000200, 702100000, 501000000, 802000101, 742000000); 
var mapsname = Array("#r[�̷s]#k#g[����]#k#b���ʦa��#k", "#r[����]#k#b���ʦa��2#k", "#r�J����(�ݷR�A)#k", "#r���|��#k", "#b�H����#k", "#b�i�h����#k", "#b�]�k�˪L#k", "#b�}�b���#k", "#b�Z������#k", "#b���B�p��#k", "#b�ѪŤ���#k", "#b��������#k", "#b�a�y���m����#k", "#b���ܧ�#k", "#b���@��#k", "#b�B�쳷��#k", "#b���㫰#k", "#b�F�z#k", "#b�Z�L����#k", "#b�_�ۧ�#k", "#b�s����#k", "#b�x���v���f#k", "#b�����#k", "#b�L�M��#k", "#b�����#k", "#r�ɶ�����(�����R�A�D�����άO�S��wz�~��i)#k", "#r��Ӹt�a(����P�W)#k", "#r�C�p��(����P�W)#k", "#r�֪L�x(����P�W)#k", "#r�����x�q(����P�W)#k", "#r���ӪF��(����P�W)#k", "#r�x�_101(����P�W)#k"); 
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
            cm.sendOk("�n��,�p�G�A�M�w�n�F�n�h����,�ڷ|�ַܼN�ǰe�A��."); 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else { 
            cm.sendOk("�n��,�p�G�A�M�w�n�F�n�h����,�ڷ|�ַܼN�ǰe�A��."); 
            cm.dispose(); 
            return; 
        } if (status == 0) { 
            cm.sendYesNo("�A�n,�ڥi�H���A�ǰe��ܦh�a��A���ǲ֤F�h�����߶ܡH"); 
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