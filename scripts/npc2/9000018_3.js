/*
 * 
 * @returns
 * @追忆冒险岛079一区
 */

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
   cm.sendSimple("我是装备出租商大姐大，您找我有什么事情吗？#b\r\n#L3#购买蘑菇城装备宝箱#l\r\n#L2#我要出租装备#l #k\r\n#L1##b我要获得冒险岛五周年纪念武器#l");
    } else if (status == 1) {
           if (selection == 0) {
      cm.sendOk("#ewww.jqmxd.cn");
            cm.dispose();
    }else if  (selection == 1) {
           cm.openNpc(1300001);
    }else if  (selection == 2) {
           cm.openNpc(1300000);
    }else if  (selection == 3) {
           if(cm.getzb() >= 30) {
           cm.setzb(-30);
           cm.openNpc(1300005); 

    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 
}
       }else if  (selection == 4) {
           if(cm.getzb() >= 40) {
           cm.setzb(-40);
           cm.openNpc(9030100); 
    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 

}
       }else if  (selection == 5) {
           if(cm.getzb() >= 40) {
           cm.setzb(-40);
           cm.openNpc(9030100); 
    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 

}
}      
}
}
}


