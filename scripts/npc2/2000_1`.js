function start() {

if (cm.getChar().getMapId() != 209000015){
    cm.sendSimple ("#b�鿴����������\r\n#L0#�������а�#l    #L1#�ȼ����а�#l    #r#L2#�������а�#l\r\n\r\n#L10#������а�l    #L11#ͨ����#l");
    } else {
    cm.sendOk("��Ҫ�������ͼʹ����")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) { //��������
       cm.openNpc(2101017,0);
} else if (selection == 1) {
	//Level
        cm.displayLevelRanks();
        cm.dispsoe();
} else if (selection == 2) {
        //MapGui
        cm.displayGuildRanks();
	cm.dispose(); 
}  else if (selection == 10) {
        //MapGui
        cm.�������();
	cm.dispose(); 
}   else if (selection == 11) {
        //MapGui
       cm.openNpc(2000,1000);
}  
}