function action(mode, type, selection) {
    cm.removeAll(4001022);
    cm.removeAll(4001023);
    //cm.addTrait("will", 35);
    //cm.addTrait("charisma", 10);
    cm.getPlayer().endPartyQuest(1202); //might be a bad implentation.. incase they dc or something
   // cm.gainNX(100);
cm.gainItem(4001322,+2);//白雪人法老的蓝宝石
cm.gainMeso(+30000);//读取变量
cm.gainExp(+60000);
    cm.warp(922010000);
cm.喇叭(3, "[" + cm.getPlayer().getName() + "]成功通关【组队任务 - 玩具城组队】获得奖励！");
    cm.dispose();
}