var �����Ʒ = "#v1302000#";
var x1 = "1302000,+1";// ��ƷID,����
var x2;
var x3;
var x4;

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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "#b#v4031344##v4031344##v4031344##v3994081##v3994072##v3994071##v3994077##v4031344##v4031344##v4031344##k\r\n";
            text += "\t\t\t  #e��ӭ����#b���ð�յ� #k!#n\r\n"
            text += "#L1##b����̨����#l\t#L2##r���ͼ����#l\t#L3##d���ۺ�����#l\r\n\r\n";//1
            text += "#L4##d�𶹶��һ�#l\t#L5##b������#l\t#L6##r����ֹ���#l\r\n\r\n"//2
            text += "#L7##b�������̵�#l\t#L8##b��ÿ��ǩ��#l\t#L9##b��ÿ������#l\r\n\r\n"//3
            text += "#L10##b����˸���#l\t#L11##b��װ������#l\t#L12##b���ָ�һ�\r\n\r\n"//4
            text += "#L13##d��#e���ֳ齱#n#l\t#L14##d���������#l\t#L15##d���ط�BOSS��ս#l"

            cm.sendSimple(text);
        } else if (selection == 1) { //��̨����
            if (cm.getPlayer().getMap().getId() == 701000210 || cm.getLevel() <8) {
                cm.sendOk("���Ѿ��ڴ���̨����ˣ�������ĵȼ�С��8");
                cm.dispsoe();
            } else {
                cm.warp(701000210);
                cm.dispsoe();
            }
        } else if (selection == 2) {  //��ͼ����
            cm.openNpc(2000, 0);
        } else if (selection == 3) { //�ۺ������鿴
            cm.openNpc(2000, 1);
        } else if (selection == 4) {//�����һ�
            cm.openNpc(2000, 2)
        } else if (selection == 5) { //�����
            cm.openNpc(9900000, 666);
        } else if (selection == 6) {//���ֹ���
            cm.openNpc(9900000, 777);
        } else if (selection == 7) {//����̵�
            if(cm.getMeso() >= 2000){
            cm.openShop(1093021);
            cm.gainMeso(-2000);
            cm.dispose();
        }else{
            cm.sendOk("ð�ձҲ���2000�޷�ʹ�øù���Ŷ��");
            cm.dispose();
        }
        } else if (selection == 8) {//ÿ��ǩ��
            cm.openNpc(9900004, 12);
        } else if (selection == 9) {//ÿ������
            cm.openNpc(2000, 5);
        } else if (selection == 10) {//���˸���
            cm.openNpc(2000, 10);
        } else if (selection == 11) {//����ѧϰ
            cm.openNpc(9310059, 0);
        } else if (selection == 12) {//��ָ�һ�
            cm.openNpc(2000, 20);
        } else if (selection == 13) {//��ֵ�����ȡ
            cm.openNpc(9900007, 666);
        } else if (selection == 14) {//���������ȡ
            if (cm.getChar().getPresent() >= 1) {
                cm.sendOk("ÿ���˺�ֻ����ȡ #b1#k�� ���������");	
                cm.dispose();
            } else {
                cm.sendOk("��ϲ����ȡ��һ����Ʒ");
                cm.gainItem(5072000,+10);//��ȡ����
                cm.gainMeso(+200000);//��ȡ����
                cm.gainItem(2000002,+100);//��ȡ����
                cm.gainItem(2000003,+100);//��ȡ����
cm.getPlayer().modifyCSPoints(1, +5000);
		cm.gainItem(1142152,+1);
                cm.getChar().saveToDB(true,true);//��������
                cm.getChar().setPresent(1);//���������ȡ״̬
                cm.dispose();
            }
        } else if (selection == 15) {//boss
		if(cm.getbossmap() == 0){
		cm.sendOk("������û�м������սboss�����У�");
		cm.dispose();
}else{
	cm.warp(cm.getbossmap());
	cm.dispose();
        }}
    }
}


