/*
 * 
 * @����Ӳ�Ҷһ�npc
 * @���������������
 * @WNMS ����ţ * ׷��ð�յ�
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var ��ƷͼƬ = "#r#e#v1902031##z1902031# \r\n#v1902032##z1902032# \r\n#v1902033##z1902033# \r\n#v1902034##z1902034# \r\n#v1902036##z1902036# \r\n#v1902035##z1902035#     ----#g��#b��#r��#d��\r\n#v1902037##z1902037# ----#g��#b��#r��#d�� \r\n ";
var ��Ӱ = "4000487";//��Ӱ�Ҵ���
var ���� = "20";//������������
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("��˿һ��ȥ����");
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
            cm.sendSimple("#b���˿��ƿ��Գ�ȡ��������Ŷ������������Ҫ"+����+"ö#v4000487#\r\n�������˸Ų�����Ŷ!\r\n\r\n#d#L0#Ͷ�� - ���� #r"+����+"#dö#k#l\r\n\r\n#L1##r�鿴��������ͼƬ\r\n\r\n#L2#��λ��#r#z4000487#");
        } else if (status == 1) {
            if (selection == 0) {//��������
                 if(cm.getPlayer().getItemQuantity(4000487, false) < 20){
                cm.sendOk("��û�а�Ӱ�ҡ��޷�����������");
                cm.dispose();
                return;
            }
                cm.gainItem(4000487,-����);
		cm.��Ӱ�Ҷ���();
                cm.dispose();
            } 
        }
    }
}


