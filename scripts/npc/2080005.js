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
            txt = "����ÿ���������һ�ֵ�10��NPCŶ���ҽп�˹��\r\n\r\n";

            if (cm.getPS() == 9){// cm.getPS()  ����˼�� ��ȡ����ֵ�������1 �͵ó��������Ѿ�����˵�һ�� �����������еڶ�������!

                txt += "#L1##b������Ļ�#v4000232#X60����������ľ�ˮ#v4000233#X60����������Ĺ�ͷ#v4000234#X60�������ң���#l";
                cm.sendSimple(txt);
            }else{
                txt += "���Ѿ���ɹ���Ȼ����ȥ��.��ľ��-�ֿ����Ա-��˹��!\r\n��ڶ���������";
                cm.sendOk(txt);
                cm.dispose();
            }

        } else if (selection == 1) {
            if (cm.haveItem(4000232,60) && cm.haveItem(4000233,60) && cm.haveItem(4000234,60)){
                cm.gainPS(1);//cm.gainPS(1);  ����˼�� ��������̵�һ����ʱ������� ����ֵ+1��������޷����ظ����ڶ����ˡ�ֻ���賿12��ˢ�²��У�
		
                cm.gainItem(4000232, -100);
                cm.gainItem(4000233, -100);
                cm.gainItem(4000234, -100);
cm.gainExp(+100000);
cm.gainMeso(+150000);
cm.gainNX(+300);
cm.����(2, "[" + cm.getPlayer().getName() + "]�ɹ�������һ���������񣬻�õ�ȯ����300�㣬��������ʮ�㰡��");
                cm.sendOk("�������һ����10�����!��ϲ��ý��=150000������=100000�����=300��\r\n\r\n���Ѿ���������е����������������������ɣ�");
                cm.dispose();
            }else{
                cm.sendOk("������Ļ�#v4000232#X60����������ľ�ˮ#v4000233#X60����������Ĺ�ͷ#v4000234#X60��������!");
                cm.dispose();
            }
        }
    }
}
