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
   cm.sendSimple ("��û�й��ܣ�NPCID��9000041");
    } else if (status == 1) {
           if (selection == 0) {     	   
	    if(cm.haveItem(4001126, 100)) {           
            cm.gainItem(4001126, -100);
            cm.setzb(10000); 
	    cm.sendOk("����#v4001126#�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���10000Ԫ��!");
            cm.dispose();
            } else {
                cm.sendOk("#e����Ҫ #b100#k �� #v4001126#\r\n�������ı������Ƿ���100��������ȡ��");
                cm.dispose();    
            }
         
    }else if  (selection == 1) {
           if(cm.haveItem(4001126, 100)) {
            cm.gainItem(4001126, -100);
            cm.gainNX(2000); 
            cm.sendOk("����#v4001126#�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���2000��ȯ!");
            cm.dispose();
            } else {
                cm.sendOk("#e����Ҫ #b100#k �� #v4001126#\r\n�������ı������Ƿ���100��������ȡ��");
                cm.dispose();    
            }  
    }
}
}
}


