var �����Ʒ = "#v1302000#";
var x1 = "1302000,+1";// ��ƷID,����
var x2;
var x3;
var x4;
var ���� = "#fEffect/CharacterEff/1022223/4/0#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var ��ɫ�ǵ� = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
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
			if(cm.getJob() >= 0 && cm.getJob()<= 522 && cm.hasSkill(1017) == false){
			cm.teachSkill(1017,1,1);
			}else if(cm.getJob() >=1000 || cm.getJob() <= 2112 && cm.hasSkill(20001019) == false){
			cm.teachSkill(20001019,1,1);
			}
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }

           text += ""+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+"\r\n"
           text += " \t\t\t  #e#d��ӭ����#r����ð�յ�#k#n              \r\n           #v3994071##v3994066##v3994078##v3994071##v3994082##v3994062#\r\n"
            text += "\t\t\t#e#d��ǰ����ʱ�䣺"+cm.getGamePoints()+"���ӣ�#k#n\r\n"
            text += "\t\t\t#e#d��ǰ������:#r" + cm.getPlayer().getCSPoints(1) + "#n\r\n"
            text += "#L1##b" + ��ɫ��ͷ + "�����#l#l#L2##b" + ��ɫ��ͷ + "���߽���#l#l#L3##b" + ��ɫ��ͷ + "����̵�#l\r\n\r\n"
            text += "#L4##b" + ��ɫ��ͷ + "��Ҷ�һ�#l#l#L5##b" + ��ɫ��ͷ + "ɾ����Ʒ#l#l#L6##b" + ��ɫ��ͷ + "����̳�#l\r\n\r\n"
            text += "#L7##b" + ��ɫ��ͷ + "��������#l#l#L8##b" + ��ɫ��ͷ + "�����׹#l#l#L9##b" + ��ɫ��ͷ + "�����ͻ�#l\r\n\r\n"
            text += "#L10##b" + ��ɫ��ͷ + "��ѵ�װ#l#l#L18##b" + ��ɫ��ͷ + "���а�#l#l#L12##b" + ��ɫ��ͷ + "�����һ�#l\r\n\r\n"
            text += "#L13##b" + ��ɫ��ͷ + "ѫ����ȡ#l#l#L14##b" + ��ɫ��ͷ + "��������#l#l#L15##b" + ��ɫ��ͷ + "��ֵ����#l\r\n\r\n"
            text += "#L17##b" + ��ɫ��ͷ + "װ������#l#l#L19##r" + ��ɫ�ǵ� + "��ʱװ������#l#l\r\n\r\n"
            text += "#L20##b" + ��ɫ��ͷ + "�ƽ��Ҷ��������#l#l\r\n\r\n";
           cm.sendSimple(text);
        } else if (selection == 1) {//�����
            cm.openNpc(9900004, 1);
        } else if (selection == 2) {//���߽���
            cm.openNpc(9900004, 9);
        } else if (selection == 3) { //����̵�
            cm.openShop(30);
			cm.dispose();
        } else if (selection == 4) {//��Ҷ�һ�
            cm.openNpc(9900004, 5);
        } else if (selection == 5) {//ɾ����Ʒ
            cm.openNpc(9900004, 444);
        } else if (selection == 6) {//����̳�
            cm.openNpc(9900004, 13);
        } else if (selection == 7) {//��������
           cm.openNpc(9900004, 77);
        } else if (selection == 8) {//��������
            cm.openNpc(9900004, 78);
        } else if (selection == 9) {//�����ͻ�
            cm.openNpc(9010009, 0);
        } else if (selection == 10) {//��ѵ�װ
            cm.openNpc(9310071, 0);
        } else if (selection == 11) {//���ﲹ��
            cm.openNpc(9900004, 68);
        } else if (selection == 12) {//�����һ�
            cm.openNpc(2000, 22);
        } else if (selection == 13) {//ѫ����ȡ
            cm.openNpc(9900004, 7);
        } else if (selection == 14) {//��������
            cm.openNpc(9900004, 4);
        } else if (selection == 15) {//��ֵ����
            cm.openNpc(9900004, 81);
        } else if (selection == 16) {//
            cm.openNpc(9900004, 2);
        } else if (selection == 17) {//
            cm.openNpc(9900004, 100);
        } else if (selection == 18) {//
            cm.openNpc(2000, 1);
        } else if (selection == 19) {//
            cm.openNpc(9900004, 200);
        } else if (selection == 20) {//
            cm.openNpc(9900004, 300);
        } else if (selection == 999) {//
		if(cm.getBossLog("2016�") <= 0 && cm.canHold(4001215,3) && cm.getLevel() >= 8){
			cm.setBossLog("2016�");
            cm.gainItem(4001215, 3);
			cm.worldMessage(6,"��ң�["+cm.getName()+"]��ȡ��2016-04-10���ϻ���影�������x3��");
            cm.sendOk("��ȡ�ɹ���");
            cm.dispose();
		}else{
            cm.sendOk("���Ѿ���ȡ���ˣ�\r\n���������������ռ�");
            cm.dispose();
		}
		}
    }
}


