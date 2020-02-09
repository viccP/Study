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
            
            if (cm.getBossLog('playgz') > 0) {
                var zt = "今日已签到";
            } else {
                var zt = "今日未签到";
            }
            if (cm.getChar().getqiandao() >= 1) {
                var zt1 = "√";
            } else {
                var zt1 = "未领取";
            }
            if (cm.getChar().getqiandao() >= 2) {
                var zt2 = "√";
            } else {
                var zt2 = "未领取";
            }
            if (cm.getChar().getqiandao() >= 3) {
                var zt3 = "√";
            } else {
                var zt3 = "未领取";
            }
            if (cm.getChar().getqiandao() >= 4) {
                var zt4 = "√";
            } else {
                var zt4 = "未领取";
            }
            if (cm.getChar().getqiandao() >= 5) {
                var zt5 = "√";
            } else {
                var zt5 = "未领取";
            }
            if (cm.getChar().getqiandao() >= 6) {
                var zt6 = "√";
            } else {
                var zt6 = "未领取";
            }
            if (cm.getChar().getqiandao() >= 7) {
                var zt7 = "√";
            } else {
                var zt7 = "未领取";
            }
            if (cm.getChar().getqiandao() >= 8) {
                var zt8 = "√";
            } else {
                var zt8 = "未领取";
            }
            if (cm.getChar().getqiandao() >= 9) {
                var zt9 = "√";
            } else {
                var zt9 = "未领取";
            }
            if (cm.getChar().getqiandao() >= 10) {
                var zt10 = "√";
            } else {
                var zt10 = "未领取";
            }
            var txt1 = "#L1#签到第一天奖励<#b#z1022088##k> "+zt1+"#l\r\n";
            var txt2 = "#L2#签到第二天奖励<#b#z1002980##k> "+zt2+"#l\r\n";
            var txt3 = "#L3#签到第三天奖励<#b#z1012101##k>         "+zt3+"#l\r\n";
            var txt4 = "#L4#签到第四天奖励<#r1000#k点卷>     "+zt4+"\r\n";
            var txt5 = "#L5#签到第五天奖励<#b冒险币x50万#k>  "+zt5+"\r\n";
            var txt6 = "#L6#签到第六天奖励<#b#z4021008##kx1>    "+zt6+"\r\n"
            var txt7 = "#L7##g签到第七天奖励#k<#b#z3010100##k>     "+zt7+"\r\n\r\n"
            var txt8 = "#L8##r领取7天后的签到奖励#l"
            cm.sendSimple("只要能坚持每日的签到。就有神秘好礼相送哦！\r\n目前已经签到了："+cm.getChar().getqiandao()+"天。今日签到状态：#b" + zt + "#k\r\n" + txt1 + ""+txt2+""+txt3+""+txt4+""+txt5+""+txt6+""+txt7+""+txt8+"");

        } else if (status == 1) {
            if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull())
					{
						cm.sendOk("您至少应该让装备栏空出一格");
						cm.dispose();
                                        }else{
            if (selection == 1) { //签到第一天奖励
             if (cm.getChar().getqiandao() < 1&& (cm.getBossLog('playgz') < 1)) { //签到第一天奖励
                    cm.gainItem(1022088,1);
                       cm.getChar().gainqiandao(1);
                       cm.setBossLog('playgz');
                    cm.sendOk("恭喜你获得了签到奖励。");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[每日签到]" + " : " + " [" + cm.getPlayer().getName() + "]成功签到，领取了每日奖励！",true).getBytes()); 
                cm.dispose();
                } else {
                    cm.sendOk("你已经领取过奖励了！!");
                    cm.dispose();
                }
            } else if (selection == 2) { //更多功能
              if (cm.getChar().getqiandao() == 1&& (cm.getBossLog('playgz') < 1)) { //签到第2天奖励
                    cm.gainItem(1002980,1);
                    cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("恭喜你获得了签到奖励。");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[每日签到]" + " : " + " [" + cm.getPlayer().getName() + "]成功签到，领取了每日奖励！",true).getBytes()); 
            cm.dispose();   
            } else {
                    cm.sendOk("无法领取。");
                    cm.dispose();
                }
            } else if (selection == 3) {
                if (cm.getChar().getqiandao() == 2&& (cm.getBossLog('playgz') < 1)) { //签到第3天奖励
                    cm.gainItem(1012101,1);
                    cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("恭喜你获得了签到奖励。");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[每日签到]" + " : " + " [" + cm.getPlayer().getName() + "]成功签到，领取了每日奖励！",true).getBytes()); 
                cm.dispose();
                } else {
                    cm.sendOk("无法领取。");
                    cm.dispose();
                }
            } else if (selection == 4) { //蜗牛新手帮助
               if (cm.getChar().getqiandao() == 3&& (cm.getBossLog('playgz') < 1)) { //签到第4天奖励
                  cm.gainNX(1111);
                  cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("恭喜你获得了签到奖励。");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[每日签到]" + " : " + " [" + cm.getPlayer().getName() + "]成功签到，领取了每日奖励！点卷x1000",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("无法领取。");
                    cm.dispose();
                }
            } else if (selection == 5) { //进入自由市场
              if (cm.getChar().getqiandao() == 4&& (cm.getBossLog('playgz') < 1)) { //签到第5天奖励
                  cm.gainNX(500);
                  cm.setBossLog('playgz');
                  cm.gainMeso(+500000);
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("恭喜你获得了签到奖励。 500点卷，50万冒险币");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[每日签到]" + " : " + " [" + cm.getPlayer().getName() + "]成功签到，领取了每日奖励！",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("无法领取。");
                    cm.dispose();
                }
            } else if (selection == 6) {
               if (cm.getChar().getqiandao() == 5&& (cm.getBossLog('playgz') < 1)) { //签到第6天奖励
                  cm.gainItem(4021008,1);
                  cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("恭喜你获得了签到奖励。");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[每日签到]" + " : " + " [" + cm.getPlayer().getName() + "]成功签到，领取了每日奖励！",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("无法领取。");
                    cm.dispose();
                }
            } else if (selection == 7) {
                              if (cm.getChar().getqiandao() == 6&& (cm.getBossLog('playgz') < 1)) { //签到第7天奖励
                  cm.gainItem(3010100,1);
                  cm.setBossLog('playgz');
                       cm.getChar().gainqiandao(1);
                    cm.sendOk("恭喜你获得了签到奖励。");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[每日签到]" + " : " + " [" + cm.getPlayer().getName() + "]成功签到，领取了满7天奖励！",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("无法领取。");
                    cm.dispose();
                }
            }else if (selection == 7) {
                  if (cm.getChar().getqiandao() == 7&& (cm.getBossLog('playgz') < 1)) { //签到第7天奖励
                  cm.gainNX(+1000);
		 cm.getChar().gainqiandao(1);
                  cm.setBossLog('playgz');
                    cm.sendOk("恭喜你获得了签到奖励。1000点券！");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[每日签到]" + " : " + " [" + cm.getPlayer().getName() + "]成功签到，领取了满7天奖励！",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("无法领取。");
                    cm.dispose();
                }
				}else if (selection == 8) {
                  if (cm.getChar().getqiandao() > 7&& (cm.getBossLog('playgz') < 1)) { //签到第7天奖励
                 cm.gainItem(5072000,+2);
                  cm.setBossLog('playgz');
                    cm.sendOk("恭喜你获得了签到奖励。！#v5072000# X2");
                     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[每日签到]" + " : " + " [" + cm.getPlayer().getName() + "]成功签到，领取了7天后的奖励！",true).getBytes()); 
              cm.dispose();
                } else {
                    cm.sendOk("无法领取。");
                    cm.dispose();
                }
				}
				}
        }
    }
}
