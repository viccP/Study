/*
 * @商城选择npc 选择是否回到商城或者去赌博场
 * 地狱火 - WNMS
 */
var status = 0;
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("我在冒险岛商城的按钮里面哦~");
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.sendOk("我在冒险岛商城的按钮里面哦~");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getPlayer().getvip() == 0 && cm.getcz() < 500) {
                var zt = "#L1##d提升[钻石会员] - 活动经验20%加成" + 感叹号 + "#l";

            } else if (cm.getPlayer().getvip() < 2 && cm.getcz() >= 500) {
                var zt = "#L2##d提升为[至尊会员] - #r活动经验50%加成" + 感叹号 + "" + 感叹号 + "#l";
            } else if(cm.getPlayer().getvip() >= 2){
                var zt ="";
            }
            cm.sendSimple("目前账号已经充值了 " + cm.getcz() + " RMB。请选择你要的操作：\r\n"+zt+"\r\n\r\n#L4##r猜中赢大奖！"+美化new+"#l #b#L5#老虎机娱乐系统《未开放测试项目》"+美化new+"");
        } else if (status == 1) {
            if (selection == 1) {//vip1
                cm.sendOk("提升会员1成功！");
                cm.getPlayer().setvip(1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"〖公告〗" + " : " + " [" + cm.getPlayer().getName() + "]成为了钻石会员！大家祝贺吧！！",true).getBytes()); 
                cm.dispose();
            
            //刮刮乐系统
            } else if (selection == 2) {
                cm.sendOk("提升会员成功！");
                cm.getPlayer().setvip(2);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"〖公告〗" + " : " + " [" + cm.getPlayer().getName() + "]成为了※※※至尊会员※※※！！！！！大家祝贺吧！！",true).getBytes()); 
                cm.dispose();
            //宝箱系统   擅木 50枫叶
            } else if (selection == 3) {
                cm.sendOk("你已经是会员了！");
                cm.dispose();
            } else if (selection == 4) {//猜猜猜
                if (cm.getPlayer().getvip() < 1) {
                   cm.sendOk("你不是会员！无法参与这个项目！");
                } else {
                  cm.openNpc(9000019,4);
                }
            } else if (selection == 5) {//老虎机系统
                cm.使用老虎机();
                cm.dispose();
            } else if (selection == 6) {
                if (cm.getNX() >= 500) {
                    cm.gainNX(-500);
                    cm.轮盘点卷3();
                } else {
                    cm.sendOk("点卷不足");
                    cm.dispose();
                }
            } 
        }
    }
}