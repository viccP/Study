/** 
 תְ  ��ת սʿ
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
        cm.sendOk("���������ٿ�һ��.");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (!(cm.getJob() == 110 || cm.getJob() == 120 || cm.getJob() == 130 || cm.getJob() == 2110)) {
            if (cm.getQuestStatus(6192) == 1) {
                if (cm.getParty() != null) {
                    var ddz = cm.getEventManager("ProtectTylus");
                    if (ddz == null) {
                        cm.sendOk("����δ֪�Ĵ���!");
                    } else {
                        var prop = ddz.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            ddz.startInstance(cm.getParty(), cm.getMap());
                        } else {
                            cm.sendOk("��������תְ���˱Ƚ϶࣬������һ��.");
                        }
                    }
                } else {
                    cm.sendOk("���γ�һ��Ϊ�˱���̫��˹��");
                }
            } else if (cm.getQuestStatus(6192) == 2) {
                cm.sendOk("�㱣�����ҡ�лл�㡣�һ���������ļ���.");
                if (cm.getJob() == 112) {
                    if (cm.getPlayer().getMasterLevel(1121002) <= 0) {
                        cm.teachSkill(1121002, 0, 10);
                    }
                } else if (cm.getJob() == 122) {
                    if (cm.getPlayer().getMasterLevel(1221002) <= 0) {
                        cm.teachSkill(1221002, 0, 10);
                    }
                } else if (cm.getJob() == 132) {
                    if (cm.getPlayer().getMasterLevel(1321002) <= 0) {
                        cm.teachSkill(1321002, 0, 10);
                    }
                }
            } else {
                cm.sendOk("Ը����������һ��");
            }
            cm.dispose();
            return;
        }
        if ((cm.getJob() == 110 || cm.getJob() == 120 || cm.getJob() == 130 || cm.getJob() == 2110) && cm.getPlayerStat("LVL") >= 70) {
            if (cm.getPlayerStat("RSP") > (cm.getPlayerStat("LVL") - 70) * 3) {
                if (cm.getPlayer().getAllSkillLevels() > cm.getPlayerStat("LVL") * 3) { //player used too much SP means they have assigned to their skills.. conflict
                    cm.sendOk("������ѧ���˺ܶ༼�ɣ�Ҳ�㹻��ǿ��Ŀռ䣬��ļ����Ѿ�������ҵ�ף������������· �벻���� ������磡");
                    cm.getPlayer().resetSP((cm.getPlayerStat("LVL") - 70) * 3);
                } else {
                    cm.sendOk("���ҿ������������ƺ�������û�м���ļ��ܵ㣬�޷�����������ȥ��");
                }
                cm.safeDispose();
            } else {
                cm.sendNext("��ȷʵ��һ����ǿ���ˡ�");
            }
        } else {
            cm.sendOk("��ȷ�������㹻���ʸ����תְ����Ҫ�ȼ�70�������� : )");
            cm.safeDispose();
        }
    } else if (status == 1) {
        if (cm.haveItem(4031059,1)) { //�ж��Ƿ��кڷ�
            if(cm.haveItem(4031058) == false){
                cm.sendOk("\r\n���Ȼ�Ѽ�����1�źڷ�����\r\n��ô�����ڻ���һ���Ͼ��Ŀ��飬���鲻���������ܽ���ģ��㻹��Ҫ��ḻ��֪ʶ��֤����������תְ��������\r\n#e#r����ȥ���ص�ѩԭʥ�أ�Ѱ�ҵ���ʥʯ�����Ҵ���һ��#b�ǻ�����#k\r\n#d#e��Ϊ�˱�֤�����ܹ��������У��мǺڷ����ܶ���������תְ����Զ��۳���#n");
                cm.dispose();
            }else{
            if (cm.getPlayerStat("LVL") >= 70 && cm.getPlayerStat("RSP") <= (cm.getPlayerStat("LVL") - 70) * 3) {
                if (cm.getJob() == 110) { // ����
                    cm.changeJob(111); // ��ʿ
                    cm.sendOk("��ϲ��תְ��Ϊ #b��ʿ#k.");
                    cm.dispose();
                } else if (cm.getJob() == 120) { // ׼��ʿ
                    cm.changeJob(121); // ��ʿ
                    cm.sendOk("��ϲ��תְ��Ϊ #b��ʿ#k.");
                    cm.dispose();
                } else if (cm.getJob() == 130) { // ǹսʿ
                    cm.changeJob(131); // ����ʿ
                    cm.sendOk("��ϲ��תְ��Ϊ #b����ʿ#k");
                    cm.dispose();
                } else if (cm.getJob() == 2110) { // ս��2ת
                    cm.changeJob(2111); // ս��
                    if (cm.canHold(1142131, 1)) {
                        cm.forceCompleteQuest(29926);
                        cm.gainItem(1142131, 1); //temp fix
                    }
                    cm.sendOk("��ϲ��תְ��Ϊ #bս��(3ת)#k.");
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
            cm.sendOk("�������Ѿ������㹻ǿ��ĵز���,����Ϊ��֤�����ǿ��,����ص�#b������#k������������Ϊսʿ�Ľ̹ٽ���һ��#b����#k��Ȼ�������Ʒ#v4031059##z4031059#���ҽ���������һ����תְ��");
            cm.gainItem(4031380,1);
            cm.dispose();
        }
    }}