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
			cm.sendYesNo("天守閣位於日本長崎島原半島的#r楓葉古城#k中,有5層樓高,是安土桃山時代的建築.天守閣是一座城中的制高點,在軍事上有關樓和瞭望塔的作用.同時,它也是城主的居住之地.天守之名意指城主代天統治,履行著上天的職責.可想而知,居於天守閣內的統治者是如何的赫赫威勢.你想去看看嗎? ");
		        }else if (status == 1 ) {
		   if(cm.getChar().getLevel() < 70){
                                      cm.sendOk("不好意思啊,你必須有#r70級#k我們才可以送你過去,那兒的忍著不是這麼好對付的!");
                        cm.dispose();
                               }else{ 
                        cm.sendOk("今天我們心情好,就免費送你去#r楓葉古城#k吧!"); 
                        } 
                        }else if (status == 2) {                      
                        cm.warp(800040000, 0);
                        cm. sendOk("順便說一句,如果你想回來,請與左邊的#r開運箱#p9110100##k對話!#r楓葉古城#k中有很多難對付的忍者,在旅遊的同時你也一定要小心啊!"); 
                        cm.dispose(); 
                        }            
           
        } 
}  