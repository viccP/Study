/*
 *************WNMS��������***************
 **NPC NAME:ð�յ���ӪԱ NPCID:9900007_2*
 ****************************************
 */

function start() {
    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("������Ӧ����װ�����ճ�һ��", 2);
        cm.dispose();
    } else{
        var rand = 1 + Math.floor(Math.random() * 17);
        cm.gainItem(5531000, -1);
        if (rand == 1) {
            var ��Ʒ = "5071000";
        } else if (rand == 2) {
            var ��Ʒ = "5074000";
        } else if (rand == 3) {
            var ��Ʒ = "5076000";
        } else if (rand == 4) {
            var ��Ʒ = "5390000";
        } else if (rand == 5) {
            var ��Ʒ = "5390000";
        } else if (rand == 6) {
            var ��Ʒ = "5390000";
        } else if (rand == 7) {
            var ��Ʒ = "5390000";
        } else if (rand == 8) {
            var ��Ʒ = "5390006";
        } else if (rand == 9) {
            var ��Ʒ = "5390005";
        } else if (rand == 10) {
            var ��Ʒ = "5201001";
        } else if (rand == 11) {
            var ��Ʒ = "5201000";
        } else if (rand == 12) {
            var ��Ʒ = "5150040";//�ʼ�
        } else if (rand == 13) {
            var ��Ʒ = "5150040";//�ʼ�
        } else if (rand == 14) {
            var ��Ʒ = "3010071";
        } else if (rand == 15) {
            var ��Ʒ = "3010045";
        } else if (rand == 16) {
            var ��Ʒ = "3010025";
        }else if(rand == 17){
            var ��Ʒ = "5310000"; //PB
        } 
        cm.gainItem(""+��Ʒ+"",1);
        cm.dispose();
      cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + "�ӡ��������ӡ��л���˺ö�����", true).getBytes());
    } 
}