/* 
 * 脚本类型: cm
 * 脚本用途: 点卷中介
 * 脚本作者: 故事丶
 * 制作时间: 2014/12/18
 */
importPackage(net.sf.cherry.client);
var status = -1;
var beauty = 0;
var tosend = 0;
var sl;
var mats;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("如果需要点卷中介服务在来找我吧。");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            var gsjb = "";
            gsjb = "让我们一起 #b回味 - #k那些年的感动。\r\n\r\n";
            gsjb += "#L3##b#z4032056#兑换点卷#r[New]  #b比例 - (#r1 = 1#b)#l\r\n\r\n";
				gsjb += "#L0##b#z4001126#兑换点卷#r[New]  #b比例 - (#r2 = 1#b)#l\r\n\r\n";
				gsjb += "#L1##b点卷兑换#z4002003##r[New]  #b比例 - (#r500点卷 = 1个#b)#l\r\n\r\n";
				gsjb += "#L2##b点卷兑换#z4002002##r[New]  #b比例 - (#r5000点卷 = 1个#b)#l\r\n\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
           // if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
           //     cm.sendOk("GM不能参与兑换。");
          //      cm.dispose();
           // }
            if (selection == 0) {
              if(cm.haveItem(4001126,1000)){
				cm.gainItem(4001126,-1000);
                cm.gainNX(+1000);
				cm.sendOk("换购成功！");
					cm.dispose();
			  }else if(cm.haveItem(4001126,500)){
				cm.gainItem(4001126,-500);
                cm.gainNX(+500);
				cm.sendOk("换购成功！");
					cm.dispose();
			  }else if(cm.haveItem(4001126,100)){
				cm.gainItem(4001126,-100);
                cm.gainNX(+100);
				cm.sendOk("换购成功！");
					cm.dispose();
					}else{
					cm.sendOk("枫叶不足.100个以上！");
				cm.dispose();
				}
            
            } else if (selection == 1) {
			var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			}
              if(cm.getNX() >= 500){
				cm.gainItem(4002003,1);
                cm.gainNX(-500);
				cm.sendOk("换购成功！");
			  cm.dispose();
			  }
			  } else if (selection == 2) {
			var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			}
              if(cm.getNX() >= 5000){
				cm.gainItem(4002002,1);
                cm.gainNX(-5000);
				cm.sendOk("换购成功！");
			  cm.dispose();
			  }
            } else if (selection == 3) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4032056).iterator();
                if (cm.haveItem(4032056) == 0) {
                    cm.sendNext("您的帐户#z4032056#数量不足兑换点卷。");
                    status = -1;
                } else {
                    beauty = 3;
                    cm.sendGetNumber("请输入#b#z4032056##k兑换#r点卷#k的数量:\r\n#b比例 - (#r1 = 1#b)\r\n你的账户信息 - \r\n    点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + "   \r\n", 1, 1, iter.next().getQuantity());

                }

            }


        } else if (status == 2) {
            if (beauty == 1) {
                if (selection <= 0) {
                    cm.sendOk("输入的兑换数字错误。");
                    cm.dispose();
                /*
                } else if (selection >= 200) {
                    sl = (selection / 200) + 1;
                } else {
                    sl = 3;
                }

                //if(cm.getPlayer().getInventory

(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull()){
                if (cm.getSpace(4) < sl) {
                    cm.sendOk("你的背包“其它”空间不足!请至少有" + sl 

+ "个空间以上.\r\n如果上面有出现小数的话请入位!\r\n如：出现<至少有7.5个

空间以上>那么您就需要留8个空间!");
                    cm.dispose();
*/
                } else if (cm.getPlayer().getCSPoints(0) >= selection * 500) {
                    cm.gainNX(-selection * 500);
                    cm.gainItem(4000463, selection);
                    cm.sendOk("您成功将 #r " + (selection * 500) + " #k点卷 兑换成 国庆纪念币#v4000463# x #r" + selection + " #k")
                } else {
                    cm.sendNext("兑换" + selection + "个#z4000463##v4000463# 需要#r " + (selection * 500) + "#k点卷。您没有足够的点卷。");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4000463, selection)) {
                    cm.gainItem(4000463, -selection);
                    cm.gainNX(+500 * selection);
                    cm.sendOk("您成功将#z4000463##v4000463# x #r" + selection + " #k换为#r " + (500 * selection) + " #k点卷。");
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换点卷。");
                    cm.dispose();
                }

            } else if (beauty == 3) {
                if (cm.haveItem(4032056, selection)) {
                    cm.gainItem(4032056, -selection);
                    cm.gainNX(+selection);
                    cm.sendOk("您成功将#z4032056##v4032056# x #r" + selection + " #k换为#r " + (selection) + " #k点卷。");
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换点卷。");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }		
    }
}