
var status = 0;
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ��Ʒ = "\r\n" + ��ɫ��ͷ + "#v5150040#" + ��ɫ��ͷ + "#v5151001#" + ��ɫ��ͷ + "#v5152001#" + ��ɫ��ͷ + "#v5074000#X5#e " + ��ɫ��ͷ + "���û����" + ��̾�� + "#k\r\n\r\n----------------------------";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNextPrev("#e#d�����������#r�׳����#d�����������#n\r\n#b��ô�������СǮ���治��\r\n#r��ֵ10Ԫ������ȡ������Ʒ��\r\n\r\n#b�����ӳ�Ϊ5%�����ﾭ��100���ϼ��ɻ�üӳɣ�\r\n" + ��Ʒ + "" + Բ�� + "#e�ܼ�ֵ 6000 ���");
        } else if (status == 1) {
            if (cm.getcz() >= 10 && cm.getPlayer().getlingqu() < 1) {
               cm.getPlayer().gainlingqu(+1);
                cm.sendOk("��ȡ�ɹ���������׳影����\r\n����#r[�����]#k 5% �ӳɡ�");
                cm.gainItem(2022615,-1);
                cm.gainItem(5150040,1);
                cm.gainItem(5151001,1);
                cm.gainItem(5152001,1);
                cm.gainItem(5074000,5);
                cm.getPlayer().setvip(+1);
                 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��ֵ���]" + " : " + " [" + cm.getPlayer().getName() + "]��ȡ�˳�ֵ�������������û����ӳɣ���", true).getBytes());
                cm.dispose();
            }else{
                cm.sendOk("��ĳ�ֵ���㣡�������Ѿ���ȡ��һ���ˣ�");
                cm.dispose();
            }
        }
    }
}