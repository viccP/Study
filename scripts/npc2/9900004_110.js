
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if(cm.getmd5data() <= 0){
                //cm.sendOk("ϵͳ��⵽����Ƿ��������Ƿ�رյ�¼����������ҳ���");
                //cm.sendOk("ϵͳ��⵽����Ƿ��������Ƿ�رյ�¼����������ҳ���");
                //cm.sendOk("�����ã����㿴�������Ϣ��ʱ���Ҿ���������.");
cm.dispose();
                
            }else{
            cm.setmd5data(-1);
            cm.dispose();
        }}
    }
}