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
        cm.sendOk("#d好的,如果你想好了隨時可以告訴我!\r\n#r祝你好運!");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
cm.sendSimple("這裡為一轉轉職，你想成為：\r\n#r #L1#劍士#l   #L11#魔法師#l   #L21#弓箭手#l   #L28#盜賊#l   #L35#海盜#l");


        } else if (status == 1) {
            if (selection == 0) {
                jobName = "新手";
                job = net.sf.odinms.client.MapleJob.BEGINNER;
            }
            if (selection == 1) {
                jobName = "劍士";
                job = net.sf.odinms.client.MapleJob.WARRIOR;
            }
            if (selection == 11) {
                jobName = "魔法師";
                job = net.sf.odinms.client.MapleJob.MAGICIAN;
            }
            if (selection == 21) {
                jobName = "弓箭手";
                job = net.sf.odinms.client.MapleJob.BOWMAN;
            }
            if (selection == 28) {
                jobName = "盜賊";
                job = net.sf.odinms.client.MapleJob.THIEF;
            }
            if (selection == 35) {
                jobName = "海盜";
                job = net.sf.odinms.client.MapleJob.PIRATE;
            }
            cm.sendYesNo("#d你想成為: #r[" + jobName + "]#k #d嗎?");
                        
                        
        } else if (status == 2) {
            if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER) && cm.getLevel() >= 10) {
		cm.changeJob(job);
                cm.dispose();
            } else {
                cm.sendOk("#d你沒有符合最小需求: #r10等而且是名初心者#k #d!");
                cm.dispose();
            }         
          } else {
            cm.dispose();
        }  

    }
}
