/*
 * 
 * @弓箭手三次转职npc
 */

function start() {
    status = -1;

    action(1, 0, 0);
}
var 黑符 = 4031059;
var 证书 = 4031334;
var 力气项链 = 4031058;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("嗯哼...");
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
            if(cm.haveItem(证书,1)&&cm.getLevel() >= 70){
                var zhuanzhi ="\r\n#L1#长老公馆的考验(三转任务)"
            }else{
                var zhuanzhi ="";
            }
            cm.sendSimple("你找我，有何事？\r\n#L0#我要转职#l\r\n"+zhuanzhi+"\r\n");
        } else if (status == 1) {
            if (selection == 0) {
                  cm.openNpc(1052001,1);    
            } else if (selection == 1) {
                if(cm.haveItem(证书,1)&&(cm.getJob() >= 400&&cm.getJob()< 500)){
                   cm.summonMob(9001003,200,0,1);
                   cm.gainItem(证书,-1);
                   cm.sendOk("接受我的试炼，打败我的分身你就可以获得#b黑符#k！");
                  cm.dispose();
                }else{
                    cm.sendOk("你无法这样做，因为你没有#b证书#k");
                    cm.dispose();
                }
            } else if (selection == 2) {
                cm.openNpc(1300000,0);
            } else if (selection == 3) {
               cm.sendOk("第三次转职的力量非同小可");
               cm.dispose();
            } else if (selection == 4) {
                cm.openNpc(9330042,0);
        } else if (selection == 5) {
        }
    }
}
}
