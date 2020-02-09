/*
 * 
 * @wnms
 * @大擂台传送副本npc
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var 冒险币 = 5000;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("副本都在这……");
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
            
            if(cm.读取名字() == null){
                cm.sendOk("你无法这样做，请先完成#b冒险生涯任务#k。才可以使用该功能！");
                cm.dispose();
                return;
            }
            cm.sendSimple("#r#e竞技副本来袭！想不想与小伙伴一起决一胜负？\r\n\r\n\t\t\t\t#b<----个人信息----->#k\r\n#r\t<-等级："+cm.getLevel()+"->#k  #r<-进入："+cm.getBossLog("fb")+"->\t#d<-积分："+cm.读取积分()+"->#k\r\n#L0##e阿里安特竞技\r\n\r\n#d#L1#幽灵船竞技#l\r\n\r\n#L2##b黑#r暗#b魔#r法#r师#k巢#r穴#n#l\r\n\r\n#L3##g#e积#r分#d兑#b换#k奖#r励\r\n\r\n#r#L4#查看积分排行榜#l");
        } else if (status == 1) {
            if (selection == 0) {//阿里安特
             cm.openNpc(9310019,1);
            } else if (selection == 1) {//幽灵船
              cm.openNpc(9310019,5);
            } else if (selection == 2) {//暗黑魔法师
                cm.openNpc(9310019,3);
            } else if (selection == 3) {//奖励
		cm.openNpc(9310019,88);
            } else if (selection == 4){
                cm.openNpc(2101017,0);
            }	
        }
    }
}


