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
            text += "#b#v4031344##v4031344##v4031344##v3994075##v3994066##v3994071##v3994077##v4031344##v4031344##v4031344##k\r\n";
            text += "\t\t\t  #e��ӭ����#b��ð�յ� #k!#n\r\n"
			
            text += "#L8##b��ÿ��ǩ��#l\t#L9##b��ÿ������#l\t#L16##b��ÿ����ս#l\r\n\r\n"//3
            text += "#L14##d���������#l\t#L17##b���ͼ����#l\t#L18##b��һ����#l\r\n\r\n"//3
            text += "#L19##d�������̵�#l\t#L5##b������#l\t#L20##b����齱#l\r\n\r\n"//3
			
			
          //  text += "#L1##b����̨����#l\t#L2##r���ͼ����#l\t#L3##d���ۺ�����#l\r\n\r\n";//1
          //  text += "#L4##d�𶹶��һ�#l\t#L5##b������#l\t#L6##r����ֹ���#l\r\n\r\n"//2
           // text += "#L7##b��ħ�����#l\t#L8##b��ÿ��ǩ��#l\t#L9##b��ÿ������#l\r\n\r\n"//3
           // text += "#L10##b��ħ��ϳ�#l\t#L11##b��װ������#l\t#L12##b���ָ�һ�\r\n\r\n"//4
           // text += "#L13##d��#e���ֳ齱#n#l\t#L14##d���������#l\t#L15##d���ط�BOSS��ս#l"

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
           cm.openNpc(9310059,1);
        } else if (selection == 8) {//ÿ��ǩ��
           // cm.openNpc(9900004, 12);
                  if (cm.getBossLog('ÿ��ǩ��') < 1) { 
                 //cm.gainItem(5072000,2);
				 cm.gainDY(cm.getPlayer().getLevel() * 10);
				 cm.gainMeso(cm.getPlayer().getLevel() * 10000);
				 
                    var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
                    var type = ii.getInventoryType(5030001);//ID 5030001
                    var toDrop = ii.randomizeStats(ii.getEquipById(5030001)).copy();//ID 5030001
                    var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 60000 * 60 * 24 * 1);//ʱ��
                    toDrop.setExpiration(temptime);
                    toDrop.setLocked(1);
                    cm.getPlayer().getInventory(type).addItem(toDrop);
                    cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
                  cm.setBossLog('ÿ��ǩ��');
                    cm.sendOk("��ϲ������ǩ����������\r\n "+cm.getPlayer().getLevel() * 10+"�����þ�\r\n "+cm.getPlayer().getLevel() * 10000+"�����\r\n #v5030001# 1��Ȩ");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[ÿ��ǩ��]" + " : " + " [" + cm.getPlayer().getName() + "]�ɹ�ǩ������ȡ��ǩ��������",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("�޷���ȡ.����������");
                    cm.dispose();
                }
        } else if (selection == 9) {//ÿ������
            //cm.openNpc(2000, 5);
            cm.openNpc(9900004, 14);
        } else if (selection == 10) {//ħ��ϳ�
            cm.openNpc(2000, 10);
        } else if (selection == 11) {//����ѧϰ
            cm.openNpc(9310059, 0);
        } else if (selection == 12) {//��ָ�һ�
            cm.openNpc(2000, 20);
        } else if (selection == 13) {//��ֵ�����ȡ
            cm.openNpc(9900004, 5);
			
        } else if (selection == 16) {//ÿ����ս
            cm.openNpc(9900004, 15);
        } else if (selection == 17) {//��ͼ����
            cm.openNpc(9900004, 17);
        } else if (selection == 18) {//�һ����
            cm.openNpc(9900004, 5);
        } else if (selection == 19) {//�����̵�
            cm.openNpc(9900004, 5);
        } else if (selection == 20) {//���齱
            cm.openNpc(9900004, 5);
			
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
		cm.gainItem(1142152,+1);
                cm.getChar().saveToDB(true);//��������
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


