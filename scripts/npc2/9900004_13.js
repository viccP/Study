/*
 * 
 *枫之梦
 *签到系统新版模式
 */
importPackage(net.sf.cherry.client);
var status = 0;
var 黑水晶 = 4021008;
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";
var 忠告 = "#k温馨提示：任何非法程序和外挂封号处理.封杀侥幸心理.";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var 元神等级 = cm.getPlayer().getxiulian2();
            if (元神等级 == 0) {
                var 境界 = "『0级元神』  #k";
            } else if (元神等级 == 1) {
                var 境界 = "#r『C级元神』 #k ";
            } else if (元神等级 == 2) {
                var 境界 = "#b『B级元神』 #k ";
            } else if (元神等级 == 3) {
                var 境界 = "#b『B级元神』 #k  ";
            } else if (元神等级 == 4) {
                var 境界 = "#d『S级元神』 #k ";
            } else if (元神等级 == 5) {
                var 境界 = "#e#r『SS级元神』#k ";
            } else if (元神等级 == 6) {
                var 境界 = "#e『SSS级元神』#n #k #r--------巅峰状态#k";
            }
            var txt1 = "#L1#" + 感叹号 + "#g使用1500点卷重置元神等级(不会降级)\r\n\r\n";
            var txt2 = "#L2#" + 感叹号 + "#b使用1000点卷重置元神等级(有几率降级)\r\n\r\n";
            var txt3 = "#L3#" + 感叹号 + "#r使用10000修炼点重置元神等级(有几率降级)\r\n"
            cm.sendSimple("元神的属性是根据元神等级来变化的。每个阶段的元神的样式，伤害，都不同。每个职业的元神也会不同的样式。\r\n在这里，你可以选择希望重置元神的方法(元神重置并非百分之百成功率)。\r\n#b目前元神等级：" + 境界 + "！\r\n" + txt1 + "" + txt2 + "" + txt3 + "");

        } else if (status == 1) {
            元神 = cm.getChar().getxiulian2();
            if (selection == 1) { //1500点卷使用
                if (cm.getNX() < 1500) {
                    cm.sendOk("你的点卷不足1500.无法使用重设功能。");
                    cm.dispose();
                     } else if (元神 >= 6) {
                        cm.sendOk("你的元神已经为SSS级别了。不需要重置。等级已到最高！");
                        cm.dispose();
                } else {
                       cm.gainNX(-1500);
                    if (元神 == 1) {
                        var rand = 1 + Math.floor(Math.random() * 8);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『B级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『B级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷100点。");
                            cm.gainNX(100);
                            cm.dispose();
                        }
                    } else if (元神 == 2) {
                        var rand = 1 + Math.floor(Math.random() * 13);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『A级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『A级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷200点。");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (元神 == 3) {
                        var rand = 1 + Math.floor(Math.random() * 15);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『S级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『S级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷200点。");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (元神 == 4) {
                        var rand = 1 + Math.floor(Math.random() * 17);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SS级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SS级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷200点。");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (元神 == 5) {
                        var rand = 1 + Math.floor(Math.random() * 20);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SSS级元神』！！！！可以抱大腿了！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SSS级元神』！可以抱大腿了！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷200点。");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                   
                    }
                }

            } else if (selection == 2) { //更多功能
                if (cm.getNX() < 1000) {
                    cm.sendOk("你的点卷不足1000.无法使用重设功能。");
                    cm.dispose();
                }else if (元神 >= 6) {
                        cm.sendOk("你的元神已经为SSS级别了。不需要重置。等级已到最高！");
                        cm.dispose();

                } else {
                        cm.gainNX(-1000);
                    if (元神 == 1) {
                        var rand = 1 + Math.floor(Math.random() * 10);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『B级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『B级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷50点。");
                            cm.gainNX(50);
                            cm.dispose();
                        }
                    } else if (元神 == 2) {
                        var rand = 1 + Math.floor(Math.random() * 13);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『A级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『A级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神失败！元神降级为『B级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷100点。");
                            cm.gainNX(100);
                            cm.dispose();
                        }
                    } else if (元神 == 3) {
                        var rand = 1 + Math.floor(Math.random() * 15);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『S级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『S级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神失败！元神降级为『A级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷200点。");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (元神 == 4) {
                        var rand = 1 + Math.floor(Math.random() * 17);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SS级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SS级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神失败！元神降级为『S级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷200点。");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } else if (元神 == 5) {
                        var rand = 1 + Math.floor(Math.random() * 20);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SSS级元神』！！！！可以抱大腿了！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SSS级元神』！可以抱大腿了！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神失败！元神降级为『SS级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷200点。");
                            cm.gainNX(200);
                            cm.dispose();
                        }
                    } 
                }
            } else if (selection == 3) {
                var 修炼点 = cm.getChar().getxiulian();
                if (cm.getChar().getxiulian() < 1000) {
                    cm.sendOk("无法使用重设功能。");
                    cm.dispose();
                    } else if (元神 >= 6) {
                        cm.sendOk("你的元神已经为SSS级别了。不需要重置。等级已到最高！");
                        cm.dispose();
                } else {
                     cm.getChar().gainxiulian(-10000);
                    if (元神 == 1) {
                        var rand = 1 + Math.floor(Math.random() * 15);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『B级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『B级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷10点。");
                            cm.gainNX(10);
                            cm.dispose();
                        }
                    } else if (元神 == 2) {
                        var rand = 1 + Math.floor(Math.random() * 17);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『A级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『A级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神失败！元神降级为『B级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷10点。");
                            cm.gainNX(10);
                            cm.dispose();
                        }
                    } else if (元神 == 3) {
                        var rand = 1 + Math.floor(Math.random() * 22);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『S级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『S级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神失败！元神降级为『A级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷50点。");
                            cm.gainNX(50);
                            cm.dispose();
                        }
                    } else if (元神 == 4) {
                        var rand = 1 + Math.floor(Math.random() * 28);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SS级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SS级元神』！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神失败！元神降级为『S级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷70点。");
                            cm.gainNX(70);
                            cm.dispose();
                        }
                    } else if (元神 == 5) {
                        var rand = 1 + Math.floor(Math.random() * 30);
                        if (rand == 1) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SSS级元神』！！！！可以抱大腿了！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 2) {
                            cm.getChar().gainxiulian2(1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神为『SSS级元神』！可以抱大腿了！", true).getBytes());
                            cm.dispose();
                        } else if (rand == 3) {
                            cm.getChar().gainxiulian2(-1);
                            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[元神重置]" + " : " + " [" + cm.getPlayer().getName() + "]重置元神失败！元神降级为『SS级元神』！", true).getBytes());
                            cm.dispose();
                        } else {
                            cm.sendOk("重置失败。系统补返点卷80点。");
                            cm.gainNX(80);
                            cm.dispose();
                        }
                    }
                }
            }
        }
    }
}
