var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || status == 4) {
        cm.dispose();
    } else {
        if (status == 2 && mode == 0) {
            cm.sendOk("����Ҫǩ���������Ұɣ�");
            status = 4;
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("#b��ã�����ȼ��ﵽ30�����ҿ��Դ�����Ⱥ�衢���޻��ж��켼�ܣ�");
        } else if (status == 1) {            
            cm.sendYesNo("#d��ȷ����ȼ��ﵽ30������");
        } else if (status == 2) {
            if (cm.getLevel() < 30 ) {  
                cm.sendOk("��ĵȼ�����30�����޷�ѧϰ��");	
                cm.dispose();
			}else if(cm.hasSkill(1007) == true && cm.hasSkill(8) == true && cm.hasSkill(20001004) == true && cm.hasSkill(10001004) == true && cm.hasSkill(1004) == true && cm.hasSkill(10001019) == true && cm.hasSkill(20001019) == true){
                cm.sendOk("���Ѿ�ѧ���ˣ��벻Ҫ�ظ�ѧ��лл������");
                cm.dispose();
            } else {
		cm.teachSkill(8,1,1);//Ⱥ��
		cm.teachSkill(1007,3,3);//����
		cm.teachSkill(20001007,3,3);//ս�����
		cm.teachSkill(10001007,3,3);//��ʿ�Ŷ���
		cm.teachSkill(1004,1,1);//����
			cm.teachSkill(20001004,1,1); //ս������
			cm.teachSkill(10001004,1,1); //��ʿ������
			cm.teachSkill(1017,1,1); 
			cm.teachSkill(10001019,1,1);
			cm.teachSkill(20001019,1,1);
cm.����(3, "[" + cm.getPlayer().getName() + "]�ɹ�ѧ����Ⱥ�衢���ޡ����켼�ܣ�");
                cm.dispose();  
}          
        }	
    }    } 