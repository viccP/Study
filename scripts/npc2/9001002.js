var status = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0) {
        cm.sendYesNo("�A�n�h��Ѷ�? �N�O�i�H���۫��ժ��a��!");
        status++;
    } else {
       if ((status == 1 && type == 1 && selection == -1 && mode == 0) || mode == -1) {
            cm.dispose();
        } else {
            if (status == 1) {
                cm.sendNext ("�n�a,���A�b���䫢�ժ��r��XD!");
                status++
            } else if (status == 2) {
                cm.warp(980000010, 0);
                cm.dispose();
            }
        }
    }
}  