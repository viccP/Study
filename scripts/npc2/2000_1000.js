function start() {

if (cm.getChar().getMapId() != 209000015){
    cm.sendSimple ("#bŶ?....���г��˻���������ͽ�������?\r\n#L0#����ͨ����#l\r\n#L1#����ͨ����#l\r\n#L2#�鿴ͨ����#l");
    } else {
    cm.sendOk("��Ҫ�������ͼʹ����")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) { //��������
       cm.openNpc(2000,2000);//����ͨ����
} else if (selection == 1) {
	
        cm.dispose();
} else if (selection == 2) {
         //p=cm.paiMing();
            var a = "ͨ�����վ\r\n"; 
            a+=cm.�鿴ͨ����(); 
            cm.sendOk(a);
}  else if (selection == 10) {
        //MapGui
        cm.�������();
	cm.dispose(); 
}   else if (selection == 11) {
        //MapGui
       cm.openNpc(2000,1000);
}  
}