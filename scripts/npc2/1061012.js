
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
    if (cm.读取任务ID() == 120 && cm.读取任务进度() == 1) {
                cm.sendNext("邪恶的力量愈来愈强大了....难道束手无策了吗..."); //第一句提示语句
            }else{
                cm.sendOk("邪恶的力量愈来愈强大了....难道束手无策了吗...");
                cm.dispose();
            }
        } else if (status == 1) {   //开始启动下一项
            cm.sendNextPrev("你..."+cm.getPlayer().getName()+"......你终于来了!!");
        } else if (status == 2) {   //最后一句显示语句
            cm.sendNext("早在2000年前我与汉斯语言了你的到来....但是我无法确定你是准确的哪一天..没想到是在2000年以后...");
        } else if (status == 3) {
            cm.sendNext("…………", 2);
        } else if (status == 4) {
            cm.sendNext("你终于来了!!....让我缓解一下...这激动的心情,我是无法平静下来的!!");
        } else if (status == 5) {
            cm.sendNext("………您慢点，请告诉我#b风之大陆#k的#r末日预言#k好吗?", 2);
        } else if (status == 6) {
            cm.sendNext("你听我慢慢说吧...\r\n早在2000年前，我与汉斯是好基友..我和他形影不离,亲亲密密……咳咳,跑题了..\r\n2000年前...#b生命之穴#k的#r黑暗龙王#k有了复苏的征兆..整个风之大陆开始陷入一片黑暗,这个时候，突然出现了几位出色的冒险家，战神，骑士团的代表人物，前往了神木村，讨伐黑暗魔王的坐骑黑暗龙王的道路。。。。\r\n那一天...整个风之大陆陷入一片紧张得出翔的时期，因为只要没有被封印，大陆将会毁于一旦。。。但是他们！！他们。。。终究还是捍卫了龙林，保护了我们。。但是却一个个被咒语所折磨。。");
        } else if (status == 7) {
            cm.sendNext("我该如何做？",2);
        } else if (status == 8) {
            cm.sendNext("现在，龙王要再次苏醒。。需要你的拯救，勇士！！但是。。你的力量似乎已经消失不见了。。。我可以帮助你恢复力量。。这需要你去汉斯那里找到一本记载了神秘咒语的魔法书才可以。。去找汉斯吧。。");
        } else if (status == 9) {
            cm.sendNext("他……是谁？",2);
        } else if (status == 10) {
            cm.sendNext("汉斯。。你不知道是谁？他在魔法密林担任着许多新手成为魔法师的导师。他可是数一数二的魔法大亨啊。。");
        } else if (status == 11) {
            cm.sendOk("去找汉斯。\r\n完成任务！------\r\n获得经验值：5000  获得冒险币：5000",2);
            cm.主线任务更新内容("汉斯或许能告诉我一些什么。。。");
            cm.gainExp(+5000);
            cm.gainMeso(+5000);
            cm.主线任务更新ID(130);
            cm.主线任务更新进度(1);
            cm.dispose();
        }        
    } 
 
}
