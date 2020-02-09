/*
 *************WNMS神秘箱子***************
 **NPC NAME:冒险岛运营员 NPCID:9900007_2*
 ****************************************
 */

function start() {
    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("您至少应该让装备栏空出一格", 2);
        cm.dispose();
    } else{
        var rand = 1 + Math.floor(Math.random() * 17);
        cm.gainItem(5531000, -1);
        if (rand == 1) {
            var 物品 = "5071000";
        } else if (rand == 2) {
            var 物品 = "5074000";
        } else if (rand == 3) {
            var 物品 = "5076000";
        } else if (rand == 4) {
            var 物品 = "5390000";
        } else if (rand == 5) {
            var 物品 = "5390000";
        } else if (rand == 6) {
            var 物品 = "5390000";
        } else if (rand == 7) {
            var 物品 = "5390000";
        } else if (rand == 8) {
            var 物品 = "5390006";
        } else if (rand == 9) {
            var 物品 = "5390005";
        } else if (rand == 10) {
            var 物品 = "5201001";
        } else if (rand == 11) {
            var 物品 = "5201000";
        } else if (rand == 12) {
            var 物品 = "5150040";//皇家
        } else if (rand == 13) {
            var 物品 = "5150040";//皇家
        } else if (rand == 14) {
            var 物品 = "3010071";
        } else if (rand == 15) {
            var 物品 = "3010045";
        } else if (rand == 16) {
            var 物品 = "3010025";
        }else if(rand == 17){
            var 物品 = "5310000"; //PB
        } 
        cm.gainItem(""+物品+"",1);
        cm.dispose();
      cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[" + cm.getPlayer().getName() + "]" + " : " + "从『神秘箱子』中获得了好东西！", true).getBytes());
    } 
}