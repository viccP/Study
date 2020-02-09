/* Arec
	Thief 3rd job advancement
	El Nath: Chief's Residence (211000001)

	Custom Quest 100100, 100102
*/

var status = -1;
var job;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            cm.sendOk("������һ��Ŷ~.");
            cm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        if (! (cm.getJob() == 410 || cm.getJob() == 420 || cm.getJob() == 432)) {
            cm.sendOk("ʲô��!");
            cm.safeDispose();
            return;
        }
        if ((cm.getJob() == 410 || cm.getJob() == 420 || cm.getJob() == 432) && cm.getPlayerStat("LVL") >= 70) {
            if (cm.getJob() != 432 && cm.getPlayerStat("RSP") > (cm.getPlayerStat("LVL") - 70) * 3) {
                if (cm.getPlayer().getAllSkillLevels() > cm.getPlayerStat("LVL") * 3) { //player used too much SP means they have assigned to their skills.. conflict
                    cm.sendOk("��ϲ��ɹ��˻�����ҵ�ף����������ļ��������ᷢ���б仯Ŷ��");
                    cm.getPlayer().resetSP((cm.getPlayerStat("LVL") - 70) * 3);
                } else {
                    cm.sendOk("����������̫���#b���ܵ�#k�ˡ��㲻�ǽ����֣���û������.");
                }
                cm.safeDispose();
            } else {
                cm.sendNext("����������ҵİ������𡣡����ҿ���������");
            }
        } else {
            cm.sendOk("�㲢���ܻ���ҵİ�������Ϊ��ĵȼ�û�е�70���������ϡ��޷������㡣");
            cm.safeDispose();
        }
    } else if (status == 1) {
         if (cm.haveItem(4031059,1)) { //�ж��Ƿ��кڷ�
            if(cm.haveItem(4031058) == false){
                cm.sendOk("\r\n���Ȼ�Ѽ�����1�źڷ�����\r\n��ô�����ڻ���һ���Ͼ��Ŀ��飬���鲻���������ܽ���ģ��㻹��Ҫ��ḻ��֪ʶ��֤����������תְ��������\r\n#e#r����ȥ���ص�ѩԭʥ�أ�Ѱ�ҵ���ʥʯ�����Ҵ���һ��#b�ǻ�����#k\r\n#d#e��Ϊ�˱�֤�����ܹ��������У��мǺڷ����ܶ���������תְ����Զ��۳���#n");
                cm.dispose();
            }else{
        if (cm.getPlayerStat("LVL") >= 70 && (cm.getJob() == 432 || cm.getPlayerStat("RSP") <= (cm.getPlayerStat("LVL") - 70) * 3)) {
            if (cm.getJob() == 410) { // ASSASIN
                cm.changeJob(411); // HERMIT
                cm.sendOk("���Ѿ�תְΪ #b��ʿ#k.");
                cm.safeDispose();
            } else if (cm.getJob() == 420) { // BANDIT
                cm.changeJob(421); // CDIT
                cm.sendOk("���Ѿ�תְΪ #b���п�#.��������һ��ţ��������..�ǵñ��ֵ͵�..��Ҫ��������...���ְҵ��˵���չ˵�...����������ϸ��������ȷ��˵������ȥ����ô������ˣ�����GM����������չ��˰ɡ����㿴�����ֻ��۵İ���");
                cm.safeDispose();
            }
        } else {
                cm.sendOk("������ʮ����ʱ���ٽ��л�����.");
                cm.dispose();
            }
            cm.����(3,"�ɹ������˵�����תְ.....OH~YE~YO~YO~�п���~");
            cm.gainItem(4031058,-1);
            cm.gainItem(4031059,-1);
            cm.dispose();
            }
        } else {
            cm.sendOk("�������Ѿ������㹻ǿ��ĵز���,����Ϊ��֤�����ǿ��,����ص�#b������#k������������Ϊ��ְҵ�Ľ̹ٽ���һ��#b����#k��Ȼ�������Ʒ#v4031059##z4031059#���ҽ���������һ����תְ��");
            cm.gainItem(4031380,1);
            cm.dispose();
        }
    }}