
var status = 0;

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
            if (cm.��ȡ����ID() == 130 && cm.��ȡ�������() == 1) {
                cm.sendNext("��....���Һ���?"); //��һ����ʾ���
            }else if (cm.��ȡ����ID() == 140 && cm.��ȡ�������() == 1 && cm.getPlayer().getmodsl() == 0) {
                cm.sendOk("��������ͨ�����ҵ�С���顣�����Ǿ��ʵĻ��ں����ء�����������50������ȥ��������\r\n��������EXP 1000 MESO 2000");
                cm.gainExp(+1000);
                cm.gainMeso(+2000);
                cm.���������������("����һ��һ���ָ����������򵥡�Ҫ������50�ſ��ԡ�\r\n#r��ǰ�ȼ����ȣ�"+cm.getLevel()+"/50");
                cm.getPlayer().setmodid(0);
                cm.getPlayer().setmodsl(0);
                cm.�����������ID(150);
                cm.����������½���(1);
                cm.dispose();
            }
        } else if (status == 1) {   //��ʼ������һ��
            cm.sendNextPrev("ǰ��..����֪������������.",2);
        } else if (status == 2) {   //���һ����ʾ���
            cm.sendNext("������һ�����������롭�����ǵ�776....777...778...�Ҷ���������..���ϼһ�δζ��Ƽ�һЩ�޹ؽ�Ҫ���˹���..");
        } else if (status == 3) {
            cm.sendNext("��������", 2);
        } else if (status == 4) {
            cm.sendNext("����...�����Ϲ�ذ�..֤�����Ƿ���ľ���ס����..");
        } else if (status == 5) {
            cm.sendNext("�Ҿ����Ǹ����Ż���Ь���ٵ���֮��½�ľ�������", 2);
        } else if (status == 6) {
            cm.sendNext("������������������Ь��..�㻬��Ь��..��˵��ƾ�Ķ�����Ҫ��˵...��������ô�����㣿");
        } else if (status == 7) {
            cm.sendNext("��Ը�����һ�п��飡",2);
        } else if (status == 8) {
            cm.sendNext("С���������ɼΣ����Ҿ�СС�Ŀ�����ɡ�\r\n��ָ��");
        } else if (status == 9) {
            cm.sendOk("���� ���� 50ֻ�����������˹���棡");
            cm.���������������("�����Ҫ�һ�������50ֻ������û���⣬С��˼��\r\n����������"+cm.getPlayer().getmodsl()+"/50");
            cm.getPlayer().setmodid(1210100);
            cm.getPlayer().setmodsl(50);
            cm.�����������ID(140);
            cm.����������½���(1);
            cm.dispose();
        }        
    } 
 
}
