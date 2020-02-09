/*
 * 
 *枫之梦仿官方区
 *模拟战士三转任务脚本
 */
function start() {
    status = -1;

    action(1, 0, 0);
}
var 黑符 = 4031059;
var 证书 = 4031334;
var 力气项链 = 4031058;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("嗯哼...");
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
            if (cm.haveItem(黑符, 1) && cm.haveItem(证书, 0)) {
                var zhuanzhi = "#L1#进行第三次转职#l";
            } else {
                var zhuanzhi = "#L3#我想了解第三次转职的力量#l";
            }
            if (cm.haveItem(证书, 1)) {
                var renwu = "";
            } else {
                var renwu = "#L0#第三次转职任务[可接受]#l"
            }
            if (cm.getJob() == 110 || cm.getJob() == 120 || cm.getJob() == 130) {
                var jieshao = "你找我有什么事。。#b\r\n" + renwu + "\r\n" + zhuanzhi + "";
            } else {
                var jieshao = "嗯?。。#b\r\n#L3#我想了解转职#l"
            }
            cm.sendSimple("" + jieshao + "");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getLevel() >= 70) {
                    cm.sendOk("你是想进行第三次转职吗....这当然要考研你的能力才行...\r\n你去#r转职1转教官那里接受考验吧.#b我已经给了你推荐信了。#k");
                    cm.gainItem(证书, 1);
                    cm.dispose();
                } else {
                    cm.sendOk("第三次转职需要七十级才可以开启。");
                    cm.dispose();
                }
            } else if (selection == 1) {
                if (cm.getLevel() >= 70 && cm.haveItem(力气项链, 1) && cm.haveItem(黑符, 1)) {
                    if (cm.getJob() == 110) {
                        cm.changeJob(111);
                        cm.getChar().gainAp(5);
                        cm.sendOk("转职成功!");
                        cm.gainItem(力气项链, -1);
                        cm.gainItem(黑符, -1);
                        cm.dispose();
                    } else if (cm.getJob() == 120) {
                        cm.changeJob(121);
                        cm.getChar().gainAp(5);
                        cm.sendOk("转职成功!");
                        cm.gainItem(力气项链, -1);
                        cm.gainItem(黑符, -1);
                        cm.dispose();
                    } else if (cm.getJob() == 130) {
                        cm.changeJob(131);
                        cm.getChar().gainAp(5);
                        cm.sendOk("转职成功!");
                        cm.gainItem(力气项链, -1);
                        cm.gainItem(黑符, -1);
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("无法转职。请确保你是否接受考验。\r\n需要具备一下条件：\r\n智慧项链 x1(水晶答题#b神秘岛雪原圣地#k) \r\n黑符 x1(完成一转教官考验可获得) \r\nLevel 大于或等于70.");
                    cm.dispose();
                }
            } else if (selection == 2) {
                cm.openNpc(1300000, 0);
            } else if (selection == 3) {
                cm.sendOk("第三次转职的力量非同小可");
                cm.dispose();
            } else if (selection == 4) {
                cm.openNpc(9330042, 0);
            } else if (selection == 5) {
            }
        }
    }
}


