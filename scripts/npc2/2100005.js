var status = 0;  


var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);
var belt_points = Array(200, 1800, 4000, 9200, 17000);

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
            cm.sendSimple ("ť��GM�n�}��#r#t1122076##i1122076##k?!,ť��������\r\n�ܹ��N�O�C�ѻ��#r�E�F�s���J#k#i4001094#�ֿn3���N�i�H���F?!,�o��j��/�j�n �p�n���?!!#e#d" +  
                 "#k\r\n#L80##r�n��!" +   
                 "#k\r\n#L81##r�n��!�ڦ��T���J�F�����ڴ�!!!" + 
                 "#k\r\n#L82##r�ڤ~���d��~.");  

            } else if (selection == 80) {  
		if (cm.getBossLog('dayitem') < 1) {
		cm.gainItem(4001094, 1); // Gains a random item.
		cm.setBossLog('dayitem')
		cm.sendOk("���A�a!");
		cm.dispose();
	    } else {
		cm.sendNext("���ѦA�ӧa!");
		cm.dispose();
		}
            } else if (selection == 81) {  
		if (cm.haveItem(4001094 ,3) ==  true) {
		cm.addRandomItem(1122076); // Gains a random item.
		cm.gainItem(4001094, -3);
		cm.sendOk("���A���F���n�n!!(���O!!�C�H���W�u��s�b�@��)");
		cm.dispose();
	    } else {
		cm.sendNext("�A�LX���A��?�S�T���J�ٴ�����?�u!");
		cm.dispose();
		}
        } else if (selection == 82) { 
            cm.sendOk("�p���Q�n����?!"); 
            cm.dispose(); 
        } 
    } 
}  