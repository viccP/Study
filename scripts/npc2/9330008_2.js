/**
 ***@龙穴探宝活动*** 
 *@NPCName:龙宝宝 ID:2081011
 *@触发条件：拍卖功能
 *@玩家每日：2次
 **/

function start() {
    var 宝物0 = "#i4002000#";
    var 宝物1 = "#i4002001#";
    var 宝物2 = "#i4002002#";
    var 宝物3 = "#i4002003#";
       if(cm.getPlayer().getqiandao2() < 120 || cm.getBossLog('lihe') > 0){
        cm.sendOk("你的在线时间不足2小时。无法打开这个盒子。或者你已经领取了！\r\n你已经在线了"+cm.getPlayer().getqiandao2()+"分钟！\r\n每日可以开启一次此盒子。可以随机获得物品！");
        cm.dispose();
    }else{
    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("您至少应该让装备栏空出一格");
        cm.dispose();
    } else {
         
        cm.setBossLog('lihe');
        cm.sendSimple("#b欢迎参加#e#r◇◆◇龙穴探宝◇◆◇#n\r\n请选择一张邮票打开它吧！"+cm.getBossLog('lihe')+"\r\n\r\n#L0#" + 宝物0 + "#l #L1#" + 宝物1 + "#l #L2#" + 宝物2 + "#l #L3#" + 宝物3 + "#l #L4#" + 宝物1 + "#l", 2);
    
}}}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        var rand = 1 + Math.floor(Math.random() * 16);
        if (rand == 1) {
            cm.gainItem(3010049, 1); //雪房子
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]这个小骚货获得了[雪房子]！", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(2002017, 8); // 大力药水
        }
        else if (rand == 3) {
            cm.gainItem(2002019, 8); // 魔法制炼术士的药水
        }
        else if (rand == 4) {
            cm.gainItem(3010047, 1); // 蓝龙椅子
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[蓝龙椅]！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(2022247, 50); //口香糖
        }
        else if (rand == 6) {
            cm.gainItem(2070003, 1); //苏菲莉亚的项链
        } else {
            cm.sendOk("别灰心~送你个纪念奖吧！点卷x50");
            cm.gainNX(50);
            cm.dispose();
        }

    } else if (selection == 1) {
        var rand = 1 + Math.floor(Math.random() * 13);
        if (rand == 1) {
            cm.gainItem(3010043, 1); //魔女扫把 
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[魔女扫把]！", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(2002017, 8); // 大力药水
        }
        else if (rand == 3) {
            cm.gainItem(3010040, 1); // 魔法制炼术士的药水
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[蝙蝠椅]！", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(2332000, 1); // 蓝龙椅子
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[冰属性魔方]！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(2332000, 1); //口香糖
        }
        else if (rand == 6) {
            cm.gainItem(4032056, 60); //水晶球
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了兑换巨无霸的水晶球！！", true).getBytes());
        } else {
            cm.sendOk("别灰心~送你个纪念奖吧！水晶球10个~");
            cm.gainItem(4032056, 10);
            cm.dispose();
        }
    } else if (selection == 2) {
        var rand = 1 + Math.floor(Math.random() * 13);
        if (rand == 1) {
            cm.gainItem(1122001, 1); //裤/裙防御诅咒卷轴
        }
        else if (rand == 2) {
            cm.gainItem(1122001, 1); // 大力药水
        }
        else if (rand == 3) {
            cm.gainItem(1122001, 1); //蝴蝶结
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[蝴蝶结]！", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(1002394, 1); // 海盗灰色
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[海盗头盔 灰]！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(1002395, 1); //海盗蓝色
        }
        else if (rand == 6) {
            cm.gainItem(4032056, 60); //水晶球
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了兑换巨无霸的水晶球！！", true).getBytes());
        } else {
            cm.sendOk("别灰心~送你个纪念奖吧！水晶球8个~");
            cm.gainItem(4032056, 8);
            cm.dispose();
        }
    } else if (selection == 3) {
        var rand = 1 + Math.floor(Math.random() * 20);
        if (rand == 1) {
            cm.gainItem(1002508, 1); //枫叶头盔
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[枫叶头盔]！", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(1002509, 1); // 大力药水
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[枫叶头盔]！", true).getBytes());
        }
        else if (rand == 3) {
            cm.gainItem(1102139, 1); // 魔法制炼术士的药水
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[蒙特披风]！", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(2332000, 1); // 蓝龙椅子
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[冰属性魔方]！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(1102147, 1); //玩具匠人披风
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[玩具匠人披风]！", true).getBytes());
        }
        else if (rand == 6) {
            cm.gainItem(4032056, 40); //水晶球
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了兑换巨无霸的水晶球！！", true).getBytes());
        } else {
            cm.sendOk("别灰心~送你个纪念奖吧！水晶球10个~");
            cm.gainItem(4032056, 10);
            cm.dispose();
        }
    } else if (selection == 4) {
        var rand = 1 + Math.floor(Math.random() * 20);
        if (rand == 1) {
            cm.gainItem(1302058, 1); //枫叶头盔
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[枫叶伞]！", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(1302060, 1); //战舰
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[战剑]！", true).getBytes());
        }
        else if (rand == 3) {
            cm.gainItem(1402014, 1); // 温度计了
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[温度计]让我们以崇拜的目光看向他把！！", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(3010012, 1); //剑士宝座
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[剑士宝座]！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(3010013, 1); //悠长假期
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[悠长假期]！", true).getBytes());
        }
        else if (rand == 6) {
            cm.gainItem(3010034, 1); //悠长假期 红色
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[龙穴探宝]" + " : " + " [" + cm.getPlayer().getName() + "]在活动中获得了[悠长假期 红色]！", true).getBytes());
        } else {
            cm.sendOk("别灰心~送你个纪念奖吧！点卷x50");
            cm.gainNX(50);
            cm.dispose();
        }
    }
}