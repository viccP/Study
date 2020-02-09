/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var status = 0;
var qChars = new Array ("Q1: 当你等级1级到2级需要多少经验值?#10#12#15#20#3",
    "Q1:第一次转职哪些数据不正确?#战士 35 STR#飞侠 20 LUK#魔法师 20 INT#弓箭手 25 DEX#2",
    "Q1: 当受到怪物攻击，这是不正确的?#减弱慢动作#封印无法使用技能#命中率降低#诅咒 - 减少经验#1",
    "Q1: 当攻击一个怪物收到的不正确技能反映是?#对火系怪物冰更多的伤害#火冰的怪物造成更多的伤害#圣-不死怪物更多的伤害#毒药-BOSS怪物更多的伤害#4",
    "Q1: 在第一份工作的进步，这全美国的要求?#战士#弓箭手#魔法师#飞侠#2");
var qItems = new Array( "Q2: 以下哪种怪物<——>爆率是不正确的?#Jr 鬼魂鬼魂头带#蚊蝠-蚊蝠翼#煤泥粘糊糊的气泡#猪带#2",
    "Q2: 这怪物 --> 爆率是不正确的?#猪猪 - 猪带丝带#泥泥泡沫#绿蜗牛 - 绿蜗牛壳#斧木妖 - 火焰的眼#4",
    "Q2: 这药水 --> 效果是正确?#白色药水 -  250 HP#蓝色药水 - 补充 400 MP#红药水 - 补充 100 HP#披萨 - 补充 400 HP#4",
    "Q2: 这药水恢复 50% Hp & Mp?#特殊药水#力药剂#姜汁药水#苹果酒#1",
    "Q2: 这药水 --> 效果是不正确的?#白色药水- 恢复 300 HP#超级药水 - 所有恢复#伟哥 - 金枪不倒#超级无敌药水 50 HP#3");
var qMobs = new Array(  "Q3: 这些怪物是最高水平?#绿蘑菇#蓝蜗牛#扎昆#骨龙#4",
    "Q3: 冒险岛没有哪些怪物?#苍井空#绿蜗牛#蓝蜗牛#蘑菇仔#1",
    "Q3: 这怪物可能出现在从魔法密林船天空之城?#木妖#蝙蝠魔#狼人#章鱼怪#2",
    "Q3: 这个怪物不在金银岛?#沙皮狗#蓝蜗牛#绿蜗牛#红蜗牛#1",
    "Q3: 我们的网站是?#mxd.sdo.com#haoyuji.com#haoyuji.net#haoyuji.cn#4",
    "Q3: 这些怪物可以飞?#飞龙#蜗牛#海盗#锤子#1",
    "Q3: 那个怪物是冒险岛没有的?#扎昆#黑龙#蘑菇王#春哥#4",
    "Q3: 那个怪物是冒险岛没有的?#扎昆#黑龙#蘑菇王#春哥#4");
var qQuests = new Array("Q4: 那个怪物是冒险岛没有的?#扎昆#黑龙#蘑菇王#春哥#4",
    "Q4: 那个怪物是冒险岛没有的?#扎昆#黑龙#蘑菇王#春哥#4",
    "Q4: 那个怪物是冒险岛没有的?#扎昆#黑龙#蘑菇王#春哥#4",
    "Q4: 那个怪物是冒险岛没有的?#扎昆#黑龙#蘑菇王#春哥#4",
    "Q4: 那个怪物是冒险岛没有的?#扎昆#黑龙#蘑菇王#春哥#4",
    "Q4: 那个怪物是冒险岛没有的?#扎昆#黑龙#蘑菇王#春哥#4");
var qTowns = new Array( "Q5: 废弃都市最大组队多少人可以?#3#4#2#6#4",
    "Q5: 冒险岛运营员在哪里?#金银岛#魔法密林#各大城市#废弃都市#3",
    "Q5: 这些怪物可以飞?#飞龙#蜗牛#海盗#锤子#1",
    "Q5: 这些怪物可以飞?#飞龙#蜗牛#海盗#锤子#1",
    "Q5: 玩家命令是?#@查看#@help#@命令#@帮助#4",
    "Q5: 英雄联盟中多少级可以开R?#6#4#2#5#1");
var correctAnswer = 0;

function start() {
    if (cm.haveItem(4031058)) {
        if (cm.haveItem(4031058)) cm.sendOk("#h #你有#t4031058#已经。请不要浪费我的时间.");
        cm.dispose();
    } else {
        cm.sendNext("欢迎 #h #, 我是 #p2030006#.\r\n你已经走了很远到达这个阶段。");
    }
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.sendOk("下次再见。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1)
            cm.sendNextPrev("#h #,如果你给我一个#b黑暗水晶#k我会让你试试回答5个问题，让他们都正确，你将获得#v4031058# #b智慧项链#k.");
        else if (status == 2) {
            if (!cm.haveItem(4005004)) {
                cm.sendOk("#h #, 你没有#b4005004#");
                cm.dispose();
            } else {
                cm.gainItem(4005004, -1);
                cm.sendSimple("让我来测试你的知识 #b人物#k.\r\n\r\n" + getQuestion(qChars[Math.floor(Math.random() * qChars.length)]));
                status = 2;
            }
        } else if (status == 3) {
            if (selection == correctAnswer)
                cm.sendOk("#h # 你是正确的.\n准备好进入下一个问题了吗 ?");
            else {
                cm.sendOk("你得到一个问题答案是错误的!\r\n请你认真检查自己的知识。");
                cm.dispose();
            }
        } else if (status == 4)
            cm.sendSimple("现在让我们来进入下一个环节.\r\n\r\n" + getQuestion(qItems[Math.floor(Math.random() * qItems.length)]));
        else if (status == 5) {
            if (selection == correctAnswer)
                cm.sendOk("#h # 看来你没有资格牵走心仪的女嘉宾啊?");
            else {
                cm.sendOk("有一题做错了!\r\n(这些都是很容易的)\r\n请认真思考答案");
                cm.dispose();
            }
        } else if (status == 6) {
            cm.sendSimple("现在你的问题 #b关于怪物#k.\r\n\r\n" + getQuestion(qMobs[Math.floor(Math.random() * qMobs.length)]));
            status = 6;
        } else if (status == 7) {
            if (selection == correctAnswer)
                cm.sendOk("#h # 不错啊。让我们进入下一个关卡 ?");
            else {
                cm.sendOk("看来你没有回答正确啊");
                cm.dispose();
            }
        } else if (status == 8)
            cm.sendSimple("下面让我们进入这一道选择.\r\n\r\n" + getQuestion(qQuests[Math.floor(Math.random() * qQuests.length)]));
        else if (status == 9) {
            if (selection == correctAnswer) {
                cm.sendOk("#h # 进入下一个关卡 ?");
                status = 9;
            } else {
                cm.sendOk("失败了");
                cm.dispose();
            }
        } else if (status == 10) {
            cm.sendSimple("最后一个问题.\r\n让我看看你是不是真的骨灰.\r\n\r\n" + getQuestion(qTowns[Math.floor(Math.random() * qTowns.length)]));
            status = 10;
        } else if (status == 11) {
            if (selection == correctAnswer) {
                cm.gainItem(4031058, 1);
                cm.sendOk("祝贺 #h #, 完成了三转的答题测试.\r\n把这个 #v4031058# 带给需要的长老把.");
                cm.dispose();
            } else {
                cm.sendOk("真遗憾");
                cm.dispose();
            }
        }
    }
}
function getQuestion(qSet){
    var q = qSet.split("#");
    var qLine = q[0] + "\r\n\r\n#L0#" + q[1] + "#l\r\n#L1#" + q[2] + "#l\r\n#L2#" + q[3] + "#l\r\n#L3#" + q[4] + "#l";
    correctAnswer = parseInt(q[5],10);
    correctAnswer--;
    return qLine;
}