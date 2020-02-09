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
            gsjb = "#e\r\n#b想重置属性点吗？免费的哦！#n\r\n\r\n";
            gsjb += "#L2#我要删除背包物品！(慎重考虑)#l\r\n\r\n";
            gsjb += "#L0#我要重置属性点！(慎重考虑)#l\r\n\r\n";
			gsjb += "#L1#我要快速加点(命令介绍)#l\r\n\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换。");
                cm.dispose();
            }
            if (selection == 0) {
			if(cm.getPlayer().getRemainingAp() > 0){
				cm.sendOk("请把你所有属性点加完了再点我");
				cm.dispose();
			}else{
				var str = cm.getPlayer().getStr()-4;
				var dex = cm.getPlayer().getDex()-4;
				var Int = cm.getPlayer().getInt()-4;
				var luk = cm.getPlayer().getLuk()-4;
				var zh = str+dex+Int+luk;
				cm.getPlayer().gainAp(+zh);
				cm.getPlayer().setStr(4);
				cm.getPlayer().setDex(4);
				cm.getPlayer().setInt(4);
				cm.getPlayer().setLuk(4);
				cm.sendOk("重置成功！");
				cm.刷新状态();
				cm.dispose();
				}
            } else if (selection == 1) {
				cm.sendOk("快速加点命令：\r\n\r\n#e@力量 +数字\r\n@敏捷 +数字\r\n@运气 +数字\r\n@智力 +数字");
				cm.dispose();
            } else if (selection == 2) {
                
            cm.openNpc(9310073, 1);

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
                if (cm.haveItem(4001126, selection)) {
                    cm.gainItem(4001126, -selection);
                    cm.gainNX(+selection);
                    cm.sendOk("您成功将#z4001126##v4001126# x #r" + selection + " #k换为#r " + (selection) + " #k点卷。");
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