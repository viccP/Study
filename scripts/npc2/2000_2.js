function start() {

if (cm.getChar().getMapId() != 209000015){
    cm.sendSimple ("#b�鿴����������\r\n#L0#5000�����һ���#l    \r\n#L1#10000�����һ���#l    \r\n#r#L2#15000�����һ���#l");
    } else {
    cm.sendOk("��Ҫ�������ͼʹ����")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) { //��������
       cm.openNpc(9310101,0);//5000����
} else if (selection == 1) {
	cm.openNpc(9310101,1);//10000����
} else if (selection == 2) {
        cm.openNpc(9310101,2);//15000����
}  
}