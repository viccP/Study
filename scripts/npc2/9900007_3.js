/*
 * 
 * @returns
 * @追忆冒险岛079一区
 */

function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
	cm.Lunpan();
           // cm.Guaguale();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
       var 名字 = cm.getPlayer().gettuiguang();
            cm.sendSimple("\r\n\r\n你好，这里是#r冒险小伙伴招募系统#k\r\n#d你的冒险ID："+cm.getPlayer().getAccountID()+"#r  #d；你是 #r#d 的小伙伴\r\n#L0#填写小伙伴#l #L3##g小#b伙#r伴#d奖#k励#g领取#l#k\r\n\r\n#L1#领取推广奖励[#e#r"+cm.getzb()*100+"#n#d点卷可以领取]#l   \r\n\r\n#L2##r推广系统介绍 - 奖励分红详细说明");
        } else if (status == 1) {
            if (selection == 0) {
                if(cm.getPlayer().gettuiguang() > 0){
               cm.sendOk("你好，你已经填写过推广人了。请不要再次填写。");
               cm.dispose();
                }else{
               cm.openNpc(9900007,5)
                }
            } else if (selection == 1) {//推广人领取点卷
                var 奖励 = cm.getzb()*100;
                cm.sendOk("领取成功，你一共领取了#r"+奖励+"#k点卷。");
                cm.gainNX(+奖励);
                cm.setzb(-cm.getzb());
                cm.dispose();
            } else if (selection == 2) {
                cm.sendOk("推广系统说明：\r\n每个玩家都有一个自己的推广值。你的推广值是#r"+cm.getPlayer().getAccountID()+"#k。如果有玩家填写了推广人的推广值。被推广人在充值点卷后，推广人可以拿到10%的分红提成。\r\n比如：\r\n填写了你的推广值的玩家充值了#r1000#k点卷，你就可以领取#r100#k点卷的分红奖励。\r\n推广人可以无限设置被推广人。也就是说，这个系统没有人数上限。");
                cm.dispose();
            } else if (selection == 3) {
                  if(cm.getPlayer().gettuiguang() > 0){
                cm.openNpc(9900007,4);
                  }else{
                      cm.sendOk("无法让你领取，恐怕你还没有填写推广人。");
                      cm.dispose();
                  }
            } else if (selection == 4) {
                cm.openNpc(9330042,0);
        } else if (selection == 5) {
            if (cm.getzb() >= 40) {
                cm.setzb(-40);
                cm.openNpc(9030100,0);
            } else {
                cm.sendOk("#e您的余额已不足！请及时充值！");
                cm.dispose();

            }
        }
    }
}
}


