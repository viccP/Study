//�a��0 Sera

var status;

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == 1 || mode == 0)
                status++;
        else {
                cm.dispose();
                return;
        }

        if (status == 0){
                cm.sendNext("�ڧY�N��A�ǰe��#b���h�Q�ȴ�#k/r/n�P�ɧڤ]�|�e�A�@��#r�s�⪺§��#k");
        } else if (status == 1) {
          var NPSGPA = cm.getNPSGFS();
		if(NPSGPA == 0 ){
                cm.gainItem(4031454 ,400); //����400��
                cm.gainMeso(100000000); //�����@��
                cm.takeNPSGFS();//�I���@��
                cm.warp(910000000);//�ǰe����h�Q�ȴ�
                cm.dispose();//�������
            } else {
                cm.sendOk("�A���O�s��?���A�O���Ӫ�?�o��BUG�F�a?�n�^����!");//���եι��
                cm.dispose();//�������
            }
        }
}