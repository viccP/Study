/*
 * 
 * @wnms
 * @����̨���͸���npc
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var ð�ձ� = 5000;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("���������⡭��");
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
            cm.sendSimple("#b#e   \t\t���x�y�z�|�}�~��ħ���~�}�|�z�y�y��\r\n\t\t�~�~�~\r\n\r\n#n#b����һ��Σ�յ���ս..����ȥ��ս?\r\n#d��ɺ���Ի�ã�\r\n#e\t�������顢����ð�ձҡ�����������ֽ���\r\n#n��ѡ����Ҫ�����ģʽ��\r\n#L1##i3994115##b����2~6��[ÿ��300��Ҷ]Lv50����\r\n\r\n#L2##i3994116#����2~6��[ÿ��800��Ҷ]Lv80����#l\r\n\r\n#L3##i3994117#����2~6��[ÿ��1500��Ҷ]Lv120����#l");
        } else if (status == 1) {
            if (selection == 0) {//��ħ����            
cm.openNpc(9310019,6);
            } else if (selection == 1) {//��ħ����ͨ                
cm.openNpc(9310019,6);
            } else if (selection == 2) {//��ħ������
                cm.openNpc(2103013,2);
            } else if (selection == 3) {
		cm.openNpc(9310019,4);
            }else if(selection == 4){
               cm.openNpc(9310019,7);//��ħ�� id 926010001

                                            
        }	
        }
    }
}


