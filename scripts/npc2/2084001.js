/**
 ***@龙穴探宝活动*** 
 *@NPCName:龙宝宝 ID:2081011
 *@触发条件：拍卖功能
 *@玩家每日：2次
 **/

function start() {
    var 已经炼金次数 = cm.getBossLog('lj')
    var 额外炼金 = cm.getBossLog('ewlj')
    var 炼金次数 = 2 + cm.getChar().getVip();
    var 剩余炼金次数 = 炼金次数 - cm.getBossLog('lj');
    var 购买炼金 = (已经炼金次数 + 额外炼金) * 20 - cm.getChar().getVip();
    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("您至少应该让装备栏空出一格");
        cm.dispose();
    } else {
        cm.sendSimple("#b啊哈！我可是钻石王老五！你可以在我这里使用#d炼金功能#b！\r\n还可以炼金" + 剩余炼金次数 + "次。已经炼金" + 已经炼金次数 + "次，总共可以炼金" + 炼金次数 + "次！\r\n#L0#我要炼金#v2140002##l   #L1#使用点卷炼金#r消耗#e" + 购买炼金 + "#n点卷#v2140008#");
    }
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        var 已经炼金次数 = cm.getBossLog('lj')
        var 炼金次数 = 2 + cm.getChar().getVip();
        var 剩余炼金次数 = 炼金次数 - 已经炼金次数;
        if ("" + 剩余炼金次数 + "" > 0) {
            var rand = 1 + Math.floor(Math.random() * 6);
            cm.setBossLog('lj');
            if (rand == 1) {
                cm.gainMeso(20000 * cm.getChar().getVip()); //雪房子
                cm.sendOk("获得了20000冒险币.", 2);
            }
            else if (rand == 2) {
                cm.gainMeso(21000); //雪房子
                cm.sendOk("获得了21000冒险币.", 2);
            }
            else if (rand == 3) {
                cm.gainMeso(40000); //雪房子
                cm.sendOk("获得了40000冒险币.", 2);
            }
            else if (rand == 4) {
                cm.gainMeso(100000); // 蓝龙椅子
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[炼金系统]" + " : " + " [" + cm.getPlayer().getName() + "]出现了暴击！！获得了10W冒险币！", true).getBytes());
                cm.dispose();
            }
            else if (rand == 5) {
                cm.gainMeso(60000);
                cm.sendOk("获得了60000冒险币.", 2);
            }
            else if (rand == 6) {
                cm.gainMeso(200005);
                cm.sendOk("获得了2000冒险币.", 2);
            } else {
                cm.gainNx(30);
                cm.sendOk("获得三十点卷！");
                cm.dispose();
            }

        } else {
            cm.sendOk("今日的炼金次数已经没有了哦！");
            cm.dispose();
        }
    } else if (selection == 1) {
        var 额外炼金 = cm.getBossLog('ewlj')
        var 已经炼金次数 = cm.getBossLog('lj');
        var 炼金次数 = 2 + cm.getChar().getVip();
        var 剩余炼金次数 = 炼金次数 - 已经炼金次数;
        var 购买炼金 = (已经炼金次数 + 额外炼金) * 20;
        if (cm.getChar().getNX() >= "" + 购买炼金 + "") {
            cm.gainNX(-购买炼金);
            var rand = 1 + Math.floor(Math.random() * 6);
            cm.setBossLog('lj');
            if (rand == 1) {
                cm.gainMeso(2000 * cm.getChar().getVip()); //雪房子
                cm.sendOk("获得了2000基础冒险币.加成后是" + 2000 * cm.getChar().getVip() + "冒险币！", 2);
            }
            else if (rand == 2) {
                cm.gainMeso(2100 * cm.getChar().getVip()); //雪房子
                cm.sendOk("获得了2100冒险币.加成后是" + 2100 * cm.getChar().getVip() + "冒险币！", 2);
            }
            else if (rand == 3) {
                cm.gainMeso(4000 * cm.getChar().getVip()); //雪房子
                cm.sendOk("获得了4000冒险币.加成后是" + 4000 * cm.getChar().getVip() + "冒险币！", 2);
            }
            else if (rand == 4) {
                cm.gainMeso(1000000); // 蓝龙椅子
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[炼金系统]" + " : " + " [" + cm.getPlayer().getName() + "]出现了暴击！！获得了一百万冒险币！", true).getBytes());
                cm.dispose();
            }
            else if (rand == 5) {
                cm.gainMeso(60000);
                cm.sendOk("获得了60000冒险币.", 2);
            }
            else if (rand == 6) {
                cm.gainMeso(200005);
                cm.sendOk("获得了20005冒险币.", 2);
            } else {
                cm.gainNx(30);
                cm.sendOk("获得三十点卷！");
                cm.dispose();
            }

        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
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
    } else if (selection == 5) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1372044, 1);//永恒蝶翼杖
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 6) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1382057, 1);//永恒冰轮杖
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 7) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1402046, 1);//永恒玄冥剑
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 8) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1412033, 1);//永恒碎鼋斧
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 9) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1422037, 1);//永恒威震天
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 10) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1432047, 1);//永恒显圣枪
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 11) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1442063, 1);//永恒神光戟
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 12) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1452057, 1);//永恒惊电弓
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 13) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1462050, 1);//永恒冥雷弩
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 14) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1472068, 1);//永恒大悲赋
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 15) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1482023, 1);//永恒孔雀翎
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 16) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1492023, 1);//永恒凤凰铳
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 17) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072355, 1);//永恒坚壁靴
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 18) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072356, 1);//永恒缥缈鞋
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 19) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072357, 1);//永恒彩虹鞋
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 20) {
        if (cm.gainNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072358, 1);//永恒舞空靴
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 21) {
        if (cm.gainNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072359, 1);//永恒定海靴
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 22) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052155, 1);//永恒演武铠
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 23) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052156, 1);//永恒奥神袍
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 24) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052157, 1);//永恒巡礼者
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 25) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052158, 1);//永恒翻云服
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 26) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052159, 1);//永恒霸七海
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 27) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082234, 1);//永恒定边手套
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 28) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082235, 1);//永恒逍遥手套
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 29) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082236, 1);//永恒白云手套
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 30) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082237, 1);//永恒探云手套
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 31) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082238, 1);//永恒抚浪手套
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }

    } else if (selection == 32) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002776, 1);//永恒冠军盔
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 33) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002777, 1);//永恒玄妙帽 
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 34) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002778, 1);//永恒玄妙帽 
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 35) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002778, 1);//永恒迷踪帽 
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 36) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002780, 1);//永恒海王星 
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 37) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1102172, 1);//永恒不灭披风 
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 38) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1092057, 1);//永恒魔光盾 
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 39) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1092058, 1);//永恒寒冰盾
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 40) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1092059, 1);//永恒匿踪盾 
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    } else if (selection == 41) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1032031, 1);//永恒金盾坠 
        } else {
            cm.sendOk("对不起！您没有足够的点，不能给你兑换！！");
            cm.dispose();
        }
    }
}