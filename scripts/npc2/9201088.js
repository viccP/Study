/* [NPC]
    Job NPC ID 9010009
    Final  by aexr
    @RageZone
*/

importPackage(net.sf.odinms.client);


var status = 0;
var jobName;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("#d�n��,�p�G�A�Q�n�F�H�ɥi�H�i�D��!\r\n#r���A�n�B!");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
cm.sendSimple("�o�̬��@����¾�A�A�Q�����G\r\n#r #L1#�C�h#l   #L11#�]�k�v#l   #L21#�}�b��#l   #L28#�s��#l   #L35#���s#l");


        } else if (status == 1) {
            if (selection == 0) {
                jobName = "�s��";
                job = net.sf.odinms.client.MapleJob.BEGINNER;
            }
            if (selection == 1) {
                jobName = "�C�h";
                job = net.sf.odinms.client.MapleJob.WARRIOR;
            }
            if (selection == 11) {
                jobName = "�]�k�v";
                job = net.sf.odinms.client.MapleJob.MAGICIAN;
            }
            if (selection == 21) {
                jobName = "�}�b��";
                job = net.sf.odinms.client.MapleJob.BOWMAN;
            }
            if (selection == 28) {
                jobName = "�s��";
                job = net.sf.odinms.client.MapleJob.THIEF;
            }
            if (selection == 35) {
                jobName = "���s";
                job = net.sf.odinms.client.MapleJob.PIRATE;
            }
            cm.sendYesNo("#d�A�Q����: #r[" + jobName + "]#k #d��?");
                        
                        
        } else if (status == 2) {
            if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER) && cm.getLevel() >= 10) {
		cm.changeJob(job);
                cm.dispose();
            } else {
                cm.sendOk("#d�A�S���ŦX�̤p�ݨD: #r10���ӥB�O�W��ߪ�#k #d!");
                cm.dispose();
            }         
          } else {
            cm.dispose();
        }  

    }
}
