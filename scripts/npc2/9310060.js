
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
             if (cm.读取任务ID() == 100 && cm.读取任务进度() == 1) {
                 if (cm.haveItem(4000000,30) && cm.haveItem(4000016,30)) {
                    cm.sendOk("真不可思议，你成功帮助了我！！请你收下我的谢礼！\r\n得到了人气度5点。不知道下一个是谁需要我帮忙。\r\n--------------------"+cm.任务进度()+"---------------------");
                    cm.gainItem(4000000,-30);
                    cm.gainItem(4000016,-30);
                    cm.增加人气(+5);
                    cm.主线任务更新内容("得到了人气度5点。不知道下一个是谁需要我帮忙。\r\n悄悄话：貌似冒险岛运营员最近有烦心事。\r\n");
                    cm.主线任务更新ID(110);
                    cm.主线任务更新进度(1);
                    cm.dispose();
                   } else {
                    cm.sendOk("还没有搜集到足够的蜗牛壳吗？记得查看任务动态可以在#b拍卖功能#k！");
                    cm.dispose();
                   }
             }else if (cm.读取任务ID() == 100 && cm.读取任务进度() == 0) {
                cm.sendNext("来自异界的年轻冒险者，你是否听到我的呼唤。\r\n听到请回答，OVER！"); //第一句提示语句
            }else{
                cm.sendOk("好寂寞啊。。");
                cm.dispose();
            }
            } else if (status == 1) {   //开始启动下一项
                cm.sendNextPrev("是的亲，我现在就在您面前，虽然您的嗓门很大，但不失为一副好嗓音，不知是否需要来点音乐HIGH一下？大白天，美女和音乐更配哦！", 2);
            } else if (status == 2) {   //最后一句显示语句
                cm.sendNext("（无视！陷入遐思..）姐小的时候，冒险大陆世界一片繁华，居民们和小动物们和睦相处。现如今，怪物变异，凶残暴戾。不少出行的居民被伤，更甚至丧命怪物于怪物之下...");
            } else if (status == 3) {
                cm.sendNext("敢问小姐芳龄！", 2);
            } else if (status == 4) {
                cm.sendNext("（继续无视！情绪投入..）那个（呜呜..）你知道吗（抽泣..）？");
            } else if (status == 5) {
                cm.sendNext("（不知道啊..", 2);
            } else if (status == 6) {
                cm.sendNext("（我勒个去..）", 2);
            } else if (status == 7) {
                cm.sendNext("老娘说话呢，你丫在不在听啊！");
            } else if (status == 8) {
                cm.sendNext("（@#￥%……&*）那个...你...", 2);
            } else if (status == 9) {
                cm.sendNext("爱过..");
            } else if (status == 10) {
                cm.sendNext("去年买了个表，这任务劳资不做了.踏马心都碎了！（转身欲走）", 2);
            } else if (status == 11) {
                cm.sendNext("（年轻人就是冲动，看来只能出必杀技了）嘿，小哥，别走（跪地抱大腿！！！）..");
            } else if (status == 12) {
                cm.sendNext("有话快说，有屁快放！..", 2);
            } else if (status == 13) {
                cm.sendNext("（吸..呼.）事情是这样了，为提高全大陆人气指数，你需要做的只是试练任务，毕竟后面的任务很艰巨，一个人的力量相对来说是渺小的。人多力量大，你得让自己具有一定的凝聚力。事情就是这样，喵！~..");
            } else if (status == 14) {
                cm.sendNext("原来是这样，早说不就好了吗？其实我更关心能有什么好处！..", 2);
            } else if (status == 15) {
                cm.sendNext("试练任务没奖励，你也可以不做！..");
            } else if (status == 16) {
                cm.sendNext("不做试练能直接主线任务？你是不是想给我开个小后门！", 2);
            } else if (status == 17) {
                cm.sendNext("没打算！..");
            } else if (status == 18) {
                cm.sendNext("那不做了。", 2);
            } else if (status == 19) {
                cm.sendNext("不做就代表你放弃做主线的权利。各种牛逼装备！脸饰，眼饰，腰带，戒指，勋章都将与你擦肩而过。");
            } else if (status == 20) {
                cm.sendNext("（！@#￥%……&*）现在能有？", 2);
            } else if (status == 21) {
                cm.sendNext("没有！");
            } else if (status == 22) {
                cm.sendNext("阿姨，看在我陪你聊了这么久的份上给点什么吧。（跪地抱大腿第二弹！！）！", 2);
            } else if (status == 23) {
                cm.sendNext("好吧，完成任务给你半个中介币！");
            } else if (status == 24) {
                cm.sendNext("半个？这还能花？", 2);
            } else if (status == 25) {
                cm.sendNext("没事，到你再进行一次任务还有半个的，到时候给你凑一个！");
            } else if (status == 26) {
                cm.sendNext("那真是极好的。", 2);
            } else if (status == 27) {
                cm.sendOk("接收迷雾锁链第一环——小试牛刀！\r\n任务目标：\r\n#b搜集30个蓝色蜗牛壳\r\n#r30个红色蜗牛壳\r\n#g任务奖励 - 人气度5点\r\n#d进行下一个主线任务\r\n\r\n#r#b拍卖功能#r可以随时查看任务动态！");
                cm.主线任务更新内容("见到了星缘。这坑爹的小姐让我搜集 #r红色蜗牛壳 30  #b蓝色蜗牛壳 30#k。不忍直视！");
                cm.主线任务更新ID(100);
                cm.主线任务更新进度(1);
                cm.dispose();
            }
        } 
 
}
