importPackage(Packages.client);
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {
            var txt = "";
            txt = "����ÿ�����̵�7��NPCŶ���ҽ�С��\r\n\r\n";

            if (cm.getPS() == 6){// cm.getPS()  ����˼�� ��ȡ����ֵ�������1 �͵ó��������Ѿ�����˵�һ�� �����������еڶ�������!

                txt += "#L1##b�ռ��ǹ⾫����ǿ�#v4000059#X50�����¹⾫����¿�#v4000060#X50���չ⾫����տ�#v4000061#X50�������ң���#l";
                cm.sendSimple(txt);
            }else{
                txt += "���Ѿ���ɹ���Ȼ����ȥ��.����ѩ��-�ֿ����Ա-������!\r\n��ڶ���������";
                cm.sendOk(txt);
                cm.dispose();
            }

        } else if (selection == 1) {
            if (cm.haveItem(4000059,50) && cm.haveItem(4000060,50) && cm.haveItem(4000061,50)){
                cm.gainPS(1);//cm.gainPS(1);  ����˼�� ��������̵�һ����ʱ������� ����ֵ+1��������޷����ظ����ڶ����ˡ�ֻ���賿12��ˢ�²��У�
		
                cm.gainItem(4000059, -50);
                cm.gainItem(4000060, -50);
                cm.gainItem(4000061, -50);
cm.gainExp(+18000);
cm.gainMeso(+20000);
                cm.sendOk("���̵�7�����!��ϲ��ý��=20000������=18000\r\n\r\nȻ����ȥ��..����ѩ��-�ֿ����Ա-������.������һ����");
                cm.dispose();
            }else{
                cm.sendOk("�ռ�50���ǹ⾫����ǿ�#v4000059#��50���¹⾫����¿�#v4000060#��50���չ⾫����տ�#v4000061#��������!");
                cm.dispose();
            }
        }
    }
}
