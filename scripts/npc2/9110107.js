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
			cm.sendYesNo("�Ѧu�զ��饻���T�q��b�q��#r�����j��#k��,��5�h�Ӱ�,�O�w�g��s�ɥN���ؿv.�Ѧu�լO�@�y��������I,�b�x�ƤW�����өM�A��𪺧@��.�P��,���]�O���D���~���a.�Ѧu���W�N�����D�N�ѲΪv,�i��ۤW�Ѫ�¾�d.�i�Q�Ӫ�,�~��Ѧu�դ����Ϊv�̬O�p�󪺻����¶�.�A�Q�h�ݬݶ�? ");
		        }else if (status == 1 ) {
		   if(cm.getChar().getLevel() < 70){
                                      cm.sendOk("���n�N���,�A������#r70��#k�ڭ̤~�i�H�e�A�L�h,���઺�Եۤ��O�o��n��I��!");
                        cm.dispose();
                               }else{ 
                        cm.sendOk("���ѧڭ̤߱��n,�N�K�O�e�A�h#r�����j��#k�a!"); 
                        } 
                        }else if (status == 2) {                      
                        cm.warp(800040000, 0);
                        cm. sendOk("���K���@�y,�p�G�A�Q�^��,�лP���䪺#r�}�B�c#p9110100##k���!#r�����j��#k�����ܦh����I���Ԫ�,�b�ȹC���P�ɧA�]�@�w�n�p�߰�!"); 
                        cm.dispose(); 
                        }            
           
        } 
}  