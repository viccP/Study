/**
 ***@龙穴探宝活动*** 
 *@NPCName:龙宝宝 ID:2081011
 *@触发条件：拍卖功能
 *@玩家每日：2次
 **/

function start() {
    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("您至少应该让装备栏空出一格");
        cm.dispose();
    } else {
        cm.sendSimple("#b啊哈~恭喜你完成了这个环节。是否领取你应有的奖励？#k\r\n\r\n\r\n#L0##r■■领取奖励■■#l");
    }
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        if (cm.getChar().getrenwu() == 1) {
            var rand = 1 + Math.floor(Math.random() * 6);
            if (rand == 1) {
                cm.gainItem(4001038, 1); //木妖橡皮擦
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第一环！获得了橡皮擦！！", true).getBytes());
            }
            else if (rand == 2) {
                cm.gainItem(4001039, 1); // 蘑菇王橡皮擦
            }
            else if (rand == 3) {
                cm.gainItem(4001040, 1); // 猴子橡皮擦
            }
            else if (rand == 4) {
                cm.gainItem(4001041, 1); // 大幽灵橡皮擦
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第一环[获得了橡皮擦]！", true).getBytes());
                cm.dispose();
            }
            else if (rand == 5) {
                cm.gainItem(4001042, 1); //绿水灵橡皮擦
            }
            else if (rand == 6) {
                cm.gainItem(4001043, 1); //三眼章鱼橡皮擦 
            }
            cm.getChar().gainrenwu(1);//任务加1
            cm.getChar().setsgs(0); //重置杀怪数
            cm.gainItem(4001136, 20);//卷碎片
            cm.gainItem(4001129, 30);//冒险岛纪念币
            cm.sendOk("恭喜你获得了物品：\r\n#v4001136# x20 \r\n#v4001129# x30\r\n#r(一件随机奖励已经发放到你的背包里。请注意查收)#k");
            cm.dispose();
        } else if (cm.getChar().getrenwu() == 3) {  //第二环奖励
            var rand = 1 + Math.floor(Math.random() * 6);
            if (rand == 1) {
                cm.gainItem(4001038, 1); //木妖橡皮擦
                cm.gainItem(4021008, 5);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第二环！获得了橡皮擦！！5个黑水晶！！", true).getBytes());
            }
            else if (rand == 2) {
                cm.gainItem(4001039, 1); // 蘑菇王橡皮擦
                cm.gainItem(2049000, 1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第二环！！", true).getBytes());
            }
            else if (rand == 3) {
                cm.gainItem(4001040, 1); // 猴子橡皮擦
                cm.gainItem(4021008, 3);
            }
            else if (rand == 4) {
                cm.gainItem(4001041, 1); // 大幽灵橡皮擦
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第二环[获得了橡皮擦]！", true).getBytes());
            }
            else if (rand == 5) {
                cm.gainItem(4001042, 1); //绿水灵橡皮擦
                cm.gainItem(4021008, 1);
            }
            else if (rand == 6) {
                cm.gainItem(4001043, 1); //三眼章鱼橡皮擦 
            }
            cm.getChar().setsgs(1); //重置杀怪数
            cm.getChar().gainrenwu(1);//任务加1
            cm.gainItem(4021008, 1);
            cm.gainItem(4001136, 20);//卷碎片
            cm.gainItem(4001129, 30);//冒险岛纪念币
            cm.sendOk("恭喜你获得了物品：\r\n#v4001136# x20 \r\n#v4001129# x30\r\n#r(一件随机奖励已经发放到你的背包里。请注意查收)#k");
            cm.dispose();
        }
    else if (cm.getChar().getrenwu() == 5) { 
        var rand = 1 + Math.floor(Math.random() * 6);
        if (rand == 1) {
            cm.gainItem(4001038, 2); //木妖橡皮擦
            cm.gainItem(4021008, 5);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第三环！获得了橡皮擦！！5个黑水晶！！", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(4001039, 2); // 蘑菇王橡皮擦
            cm.gainItem(4021008, 1);
        }
        else if (rand == 3) {
            cm.gainItem(4001040, 2); // 猴子橡皮擦
            cm.gainItem(4021008, 3);
        }
        else if (rand == 4) {
            cm.gainItem(4001041, 1); // 大幽灵橡皮擦
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第三环[获得了橡皮擦]！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(4001042, 3); //绿水灵橡皮擦
            cm.gainItem(4021008, 1);
        }
        else if (rand == 6) {
            cm.gainItem(4001043, 4); //三眼章鱼橡皮擦 
        }
        cm.getChar().gainrenwu(1);//任务加1
        cm.getChar().setsgs(0); //重置杀怪数
        cm.gainItem(4021008, 5);
        cm.gainItem(2049000, 1);//白衣卷轴
        cm.gainItem(4001136, 25);//卷碎片
        cm.gainItem(4001129, 30);//冒险岛纪念币
        cm.sendOk("恭喜你获得了物品：\r\n#v4001136# x25 \r\n#v4001129# x30\r\n#r(一件随机奖励已经发放到你的背包里。请注意查收)#k");
        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[白衣卷轴]！", true).getBytes());
        cm.dispose();
    } else if (cm.getChar().getrenwu() == 7) { //第四环
        var rand = 1 + Math.floor(Math.random() * 25);
        if (rand == 1) {
            cm.gainItem(3010006, 1); //椅子
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环！获得了[黄色时尚转椅]！", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(3010008, 2); //椅子
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环！获得了[蓝色海狗靠垫]！", true).getBytes());
        }
        else if (rand == 3) {
            cm.gainItem(2044013, 1); // 双手剑命中率卷轴:30%
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环！获得了[双手剑命中率卷轴:30%]！", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(2044012, 1); // 给双手剑增加命中率.\n成功率:60%, 命中率+3, 敏捷+2, 物理攻击力+1
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第一环[双手剑卷轴60%]！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(2044006, 1); //双手剑攻击
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[双手剑攻击卷60%]！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 6) {
            cm.gainItem(2043301, 1); //短剑攻击卷轴成功率60%
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[短剑攻击卷轴成功率60%]！", true).getBytes());
            cm.dispose();
        } else if (rand == 7) {
            cm.gainItem(2043212, 1); //单手钝器命中率卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[单手钝器命中率卷轴%]！", true).getBytes());
            cm.dispose();
        }else if (rand == 8) {
            cm.gainItem(2043208, 1); //单手钝器攻击卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[单手钝器攻击卷轴%]！", true).getBytes());
            cm.dispose();
        }else if (rand == 9) {
            cm.gainItem(2043112, 1); //单手斧命中率卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[单手斧命中率卷轴%]！", true).getBytes());
            cm.dispose();
        }else if (rand == 10) {
            cm.gainItem(2041210, 1); //项链力量诅咒卷轴70%
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[项链力量诅咒卷轴70%]！", true).getBytes());
            cm.dispose();
        }else if (rand == 11) {
            cm.gainItem(2043804, 1); //长杖魔力诅咒卷
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[长杖魔力诅咒卷%]！", true).getBytes());
            cm.dispose();
        }else if (rand == 12) {
            cm.gainItem(2043805, 1); //长杖魔力诅咒卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[长杖魔力诅咒卷轴%]！", true).getBytes());
            cm.dispose();
        }else if (rand == 13) {//短杖成功率60%，魔法攻击力+2，智力+1
            cm.gainItem(2043805, 1); //短杖成功率60%，魔法攻击力+2，智力+1
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[短杖成功率60%，魔法攻击力+2，智力+1]！", true).getBytes());
            cm.dispose();
        }else if (rand == 14) {
            cm.gainItem(2043704, 1); //短杖成功率60%，魔法攻击力+2，智力+1
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[短杖魔力诅咒卷轴]！", true).getBytes());
            cm.dispose();
        }else if (rand == 15) {
            cm.gainItem(2044107, 1); //用来增加双手斧攻击属性。
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[双手斧攻击卷]！", true).getBytes());
            cm.dispose();
        }else if (rand == 16) {
            cm.gainItem(2044205, 1); //用双手钝器攻击诅咒卷轴 
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[双手钝器攻击诅咒卷轴 ]！", true).getBytes());
            cm.dispose();
        }else if (rand == 17) {
            cm.gainItem(2044301, 1); //枪攻击卷轴成功率60%
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[枪攻击卷轴成功率60% ]！", true).getBytes());
            cm.dispose();
        }else if (rand == 18) {
            cm.gainItem(2044304, 1); //枪攻击诅咒卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[枪攻击诅咒卷轴 ]！", true).getBytes());
            cm.dispose();
        }else if (rand == 19) {
            cm.gainItem(2044401, 1); //枪矛攻击卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[矛攻击卷轴 ]！", true).getBytes());
            cm.dispose();
        }else if (rand == 20) {
            cm.gainItem(2044404, 1); //矛攻击诅咒卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[矛攻击诅咒卷轴 ]！", true).getBytes());
            cm.dispose();
        }else if (rand == 21) {
            cm.gainItem(2044504, 1); //弓攻击诅咒卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[弓攻击诅咒卷轴 ]！", true).getBytes());
            cm.dispose();
        }else if (rand == 22) {
            cm.gainItem(2044604, 1); //弩攻击诅咒卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[弩攻击诅咒卷轴 ]！", true).getBytes());
            cm.dispose();
        }else if (rand == 23) {
            cm.gainItem(2044903, 1); //增加短枪攻击力。
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[短枪攻击卷轴 ]！", true).getBytes());
            cm.dispose();
        }else if (rand == 24) {
            cm.gainItem(2048004, 1); //宠物跳跃力卷轴
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环[宠物跳跃力卷轴 ]！", true).getBytes());
            cm.dispose();
        }else if (rand == 25) {
            cm.gainItem(2048004, 5); //消息
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第四环！", true).getBytes());
            cm.dispose();
        }
        cm.getChar().gainrenwu(1);//任务加1
        cm.getChar().setsgs(0); //重置杀怪数
        cm.gainItem(4021008, 5);
        cm.gainItem(2049000, 1);//白衣卷轴
        cm.gainItem(4001136, 25);//卷碎片
        cm.gainItem(4001129, 30);//冒险岛纪念币
        cm.sendOk("恭喜你获得了物品：\r\n#v4001136# x25 \r\n#v4001129# x30\r\n#r(一件随机奖励已经发放到你的背包里。请注意查收)#k");
        cm.dispose();
        
    }else if (cm.getChar().getrenwu() == 9) {
        var rand = 1 + Math.floor(Math.random() * 6);
        if (rand == 1) {
            cm.gainItem(2100013, 1); //达克鲁的分身召唤
            cm.gainItem(4021008, 5);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第五环，获得了找环保！", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(2180000, 3); // 洗能力点卷轴
            cm.gainItem(4021008, 5);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第五环。获得了[洗能力点卷轴]！", true).getBytes());
        }
        else if (rand == 3) {
            cm.gainItem(2290004, 1); // 突进
            cm.gainItem(4021008, 3);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第五环。获得了[突进70%]能手册！", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(2290048, 1); // 圣光普照
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第五环，获得了[圣光普照70%]技能册！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(2340000, 1); //绿水灵橡皮擦
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第五环获得了[祝福卷轴]！", true).getBytes());
            cm.dispose();
        }
        else if (rand == 6) {
            cm.gainItem(4001043, 4); //三眼章鱼橡皮擦 
        }
        cm.getChar().gainrenwu(1);//任务加1
        cm.getChar().setsgs(0); //重置杀怪数
        cm.gainItem(2022670, 1);//黑龙箱子
        cm.gainItem(2049000, 1);//白衣卷轴
        cm.gainItem(2340000, 1);//祝福卷轴
        cm.gainItem(2430000, 1);//任务物品
        cm.gainItem(4001136, 25);//卷碎片
        cm.gainItem(4001129, 30);//冒险岛纪念币
        cm.sendOk("恭喜你获得了物品：\r\n#v4001136# x25 \r\n#v4001129# x30\r\n#r(一件随机奖励已经发放到你的背包里。请注意查收)#k");
        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赏金猎人]" + " : " + " [" + cm.getPlayer().getName() + "]完成了第五环！！获得了[祝福卷轴]！[黑龙箱子]！", true).getBytes());
        cm.dispose();
    }
} } 