/*发布通缉令 WNMS*/

function start() {
    status = -1;
    action(1, 0, 0);
}
var money = 100000000; //发布需要扣除多少冒险币

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("还在犹豫？有没有搞错？");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            if (cm.查询发布(cm.getPlayer().getId())  != null) {
                cm.sendOk("你已经发布了一条信息了。请不要重复发布！");
                cm.dispose();
            } else {
                cm.sendGetNumber("你想发布一个通缉令？请先告诉我，你要通缉谁。请在这里输入他的ID。", 0, 100, 100000);
            }
        } else if (status == 1) {
            id = selection;
            if (cm.getPlayer().getId() == id) {
                   cm.sendOk("写自己上去？大哥你真逗！");
                cm.dispose();
            } else {

                cm.sendGetNumber("输入的ID：#r" + id + "#k\r\n查询到的玩家：#b" + cm.读取名字(id) + "#k\r\n\r\n#b如果以上信息无误。请输入你要悬赏的金额(冒险币 > 100000)：", 0, 100000, 2100000000);
            }
        } else if (status == 2) {
            mxb = selection;
            if (cm.getMeso() < mxb) {
                cm.sendOk("你没那么多钱！");
                cm.dispose();
            } else {
                cm.sendGetText("输入的ID：#r" + id + "#k\r\n查询到的玩家：#b" + cm.读取名字(id) + "#k\r\n赏金是：" + mxb + "\r\n你可以留个言。这个留言会在你通缉的人死亡后看到:");
            }
        } else if (status == 3) {

            cm.sendYesNo("你要通缉的人ID:#r" + id + "#k\r\n查询到的玩家：#b" + cm.读取名字(id) + "#k\r\n发布的赏金是:" + mxb + "\r\n留言：" + cm.getText() + "\r\n\r\n发布这一条需要消耗你 " + money + " 冒险币。加上赏金你一共需要消耗 " + (money + mxb) + " 冒险币。确定吗？");
        } else if (status == 4) {
            var moneyb = (money + mxb);
            if (cm.getMeso() >= moneyb) {
                cm.sendOk("恭喜你发布了一条信息上去。如果有人接受了。你的信息会显示在已接受动态里面。");
                cm.gainMeso(-moneyb);
                //int charid, String name, String name2, int charid2, int meso, int charid3, String name3, int zt, String msg
                cm.发布通缉令(cm.getPlayer().getId(), cm.getPlayer().getName(), cm.读取名字(id), id, mxb, 0, 0, 0, cm.getText());
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11, cm.getC().getChannel(), "[通缉榜]" + " : " + " 新的通缉令上线，各位想得到赏金的速度了！", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("你没有足够的钱来支付这一笔费用。");
                cm.dispose();
            }
        }
    }
}


