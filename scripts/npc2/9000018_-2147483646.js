/*
 * 
 * @returns
 * @׷��ð�յ�079һ��
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
                
   cm.sendOk("��л��Ĺ��٣�");
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
   cm.sendSimple("����װ�������̴�����������ʲô������#b\r\n#L3#����Ģ����װ������#l\r\n#L2#��Ҫ����װ��#l #k\r\n#L1##b��Ҫ���ð�յ��������������#l");
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
           cm.sendOk("#e��������Ѳ��㣡�뼰ʱ��ֵ��"); 
           cm.dispose(); 
}
       }else if  (selection == 4) {
           if(cm.getzb() >= 40) {
           cm.setzb(-40);
           cm.openNpc(9030100); 
    } else {
           cm.sendOk("#e��������Ѳ��㣡�뼰ʱ��ֵ��"); 
           cm.dispose(); 

}
       }else if  (selection == 5) {
           if(cm.getzb() >= 40) {
           cm.setzb(-40);
           cm.openNpc(9030100); 
    } else {
           cm.sendOk("#e��������Ѳ��㣡�뼰ʱ��ֵ��"); 
           cm.dispose(); 

}
}      
}
}
}


