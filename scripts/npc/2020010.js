/* Rene
	Bowman 3rd job advancement
	El Nath: Chief's Residence (211000001)

	Custom Quest 100100, 100102
*/

var status = 0;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 1) {
        cm.sendOk("Make up your mind and visit me again.");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (! (cm.getJob() == 310 || cm.getJob() == 320)) {
            cm.sendOk("May the Gods be with you!");
            cm.dispose();
            return;
        }
        if ((cm.getJob() == 310 || cm.getJob() == 320) && cm.getPlayerStat("LVL") >= 70) {
            if (cm.getPlayerStat("RSP") > (cm.getPlayerStat("LVL") - 70) * 3) {
                if (cm.getPlayer().getAllSkillLevels() > cm.getPlayerStat("LVL") * 3) { //player used too much SP means they have assigned to their skills.. conflict
                    cm.sendOk("�������ҵ��������������𡣡�������ļ�������");
                    cm.getPlayer().resetSP((cm.getPlayerStat("LVL") - 70) * 3);
                } else {
                    cm.sendOk("��û�з�������ļ��ܵ㣬��û�취����תְ.");
                }
                cm.safeDispose();
            } else {
                cm.sendNext("�������������������ǿ����������㶼�����ˣ���������վ��������- -#��");
            }
        } else {
            cm.sendOk("�����������������תְ��������ʮ����û�С�������ת�ò��ã�");
            cm.safeDispose();
        }
    } else if (status == 1) {
         if (cm.haveItem(4031059,1)) { //�ж��Ƿ��кڷ�
            if(cm.haveItem(4031058) == false){
                cm.sendOk("\r\n���Ȼ�Ѽ�����1�źڷ�����\r\n��ô�����ڻ���һ���Ͼ��Ŀ��飬���鲻���������ܽ���ģ��㻹��Ҫ��ḻ��֪ʶ��֤����������תְ��������\r\n#e#r����ȥ���ص�ѩԭʥ�أ�Ѱ�ҵ���ʥʯ�����Ҵ���һ��#b�ǻ�����#k\r\n#d#e��Ϊ�˱�֤�����ܹ��������У��мǺڷ����ܶ���������תְ����Զ��۳���#n");
                cm.dispose();
            }else{
        if (cm.getPlayerStat("LVL") >= 70 && cm.getPlayerStat("RSP") <= (cm.getPlayerStat("LVL") - 70) * 3) {
            if (cm.getJob() == 310) { // HUNTER
                cm.changeJob(311); // RANGER
                cm.sendOk("��ϲ��ɹ���Ϊ��ת ����");
                cm.dispose();
            } else if (cm.getJob() == 320) { // CROSSBOWMAN
                cm.changeJob(321); // SNIPER
                cm.sendOk("��ϲ��ɹ���Ϊ ����");
                cm.dispose();
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