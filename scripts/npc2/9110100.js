/*   By:MaplesKing
	20 fame NPC, default price 200mil.
	By V1ral.
	Credits to donkeydan on the setFame and getFame handlers.
	Add those before using this NPC, or it won't work correctly.
*/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1 || status == 2) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.sendOk("��,���̪��Ԫ̤��O�A�Q�����˦n��I,�A�p���I�a!");
			status = 2;
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("�����j���٤����a?�ڥi�H�ΧԳN�N�A�e�^#r�ۥѥ���#k! ");
		        }else if (status == 1 ) {
		   if(cm.getChar().getLevel() < 1){
                                      cm.sendOk("��,���n�a!�Ч�A�����b�c�l�W!");
                        cm.dispose();
                               }else{ 
                        cm.sendOk("��,���n�a!�Ч�A�����b�c�l�W!"); 
                        } 
                        }else if (status == 2) {                      
                        cm.warp(910000000, 0);
                        cm. sendOk("�n�F,�p�G�A�U���٦���,�i�H�A���P#b���#k���!"); 
                        cm.dispose(); 
                        }            
           
        } 
}  