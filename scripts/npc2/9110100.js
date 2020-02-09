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
			cm.sendOk("恩,那裡的忍者不是你想的那樣好對付,你小心點吧!");
			status = 2;
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("楓葉古城還不錯吧?我可以用忍術將你送回#r自由市場#k! ");
		        }else if (status == 1 ) {
		   if(cm.getChar().getLevel() < 1){
                                      cm.sendOk("恩,那好吧!請把你的手放在箱子上!");
                        cm.dispose();
                               }else{ 
                        cm.sendOk("恩,那好吧!請把你的手放在箱子上!"); 
                        } 
                        }else if (status == 2) {                      
                        cm.warp(910000000, 0);
                        cm. sendOk("好了,如果你下次還有來,可以再次與#b轎夫#k對話!"); 
                        cm.dispose(); 
                        }            
           
        } 
}  