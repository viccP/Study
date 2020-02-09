function start() {
status = -1;

action(1, 0, 0);
}
function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
   cm.sendOk("感谢你的光临！");
   cm.dispose();
   return;                    
                }
                if (mode == 1) {
   status++;
  }
  else {
   status--;
  }
          if (status == 0) {
   cm.sendSimple ("我没有功能！NPCID：9000041");
    } else if (status == 1) {
           if (selection == 0) {     	   
	    if(cm.haveItem(4001126, 100)) {           
            cm.gainItem(4001126, -100);
            cm.setzb(10000); 
	    cm.sendOk("您的#v4001126#已被收回!为了回报你，我给你10000元宝!");
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4001126#\r\n请检查您的背包中是否有100个再来领取。");
                cm.dispose();    
            }
         
    }else if  (selection == 1) {
           if(cm.haveItem(4001126, 100)) {
            cm.gainItem(4001126, -100);
            cm.gainNX(2000); 
            cm.sendOk("您的#v4001126#已被收回!为了回报你，我给你2000点券!");
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4001126#\r\n请检查您的背包中是否有100个再来领取。");
                cm.dispose();    
            }  
    }
}
}
}


