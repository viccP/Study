function start() {
    var text = "";
    for (i = 0; i < 10; i++) {
        text += "";
    }
    text += "魔宠时代来临....每一个魔宠都有不可低估的能力..\r\n#r可以为你带来附加属性的能力...#k\r\n我可以帮你什么呢?#k\r\n"
    text +="#L4#查询拥有魔宠#l\t\t#L5#查看魔宠品质#l\r\n\r\n"
    text += "#L0##r设置魔宠出战#l#k\t\t";
    text += "#L1##d关闭魔宠出战#l#k"
    text += "\r\n\r\n#L2##b魔宠品质升级#l#k\t\t"
    text += "#L3##b魔宠功能介绍#k#l\r\n"

    cm.sendSimple(text);
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) { //设置魔宠出战
        cm.openNpc(9310059,2);
    } else if (selection == 1) {//关闭魔宠出战
        cm.重置魔宠();
        cm.sendOk("OK，你的魔宠已经关闭出战状态了！重上生效。马上删除魔宠地图命令：@删除魔宠 。");
        cm.dispose();
    } else if (selection == 2) {//查看通缉榜[新发布]
        cm.openNpc(9310059,3);
    } else if (selection == 3) {//查看通缉榜[进行中]
       
        cm.sendOk("魔宠总共有接近200个。从小型怪物到大型boss。获取方式为活动和系统赠送。也有副本获取的方式。附加的属性也不一样哦！~");
        cm.dispose();
    } else if (selection == 4) {//查看我接受的通缉
         var a = "#r拥有的魔宠查看#k\r\n";
        a += cm.查询魔宠();
        cm.sendOk(a);
        cm.dispose();
    } else if (selection == 5) {//查看我接受的通缉
       
        cm.sendOk("查询魔宠品质：\r\n#e#d魔宠类别分为：普通 < 中级 < 高级 < 终极 < 至尊\r\n#r魔宠的类别决定了初始值属性的大小。高级魔宠初始值附加的最多。最接近上限50点为止.#n\r\n魔宠品质为：\r\n#b野生：攻击力魔法力2-50 防御力魔法防御力2-50 命中2-50 回避2-50\r\n普通：攻击力魔法力4-50 防御力魔法防御力4-50 命中2-50 回避2-50\r\n优秀：攻击力魔法力5-50 防御力魔法防御力5-50 命中3-50 回避3-50\r\n高级：攻击力魔法力6-50 防御力魔法防御力5-50 命中3-50 回避3-50\r\n极品：攻击力魔法力8-50 防御力魔法防御力5-50 命中3-50 回避3-50\r\n卓越：攻击力魔法力8-50 防御力魔法防御力8-50 命中3-50 回避8-50\r\n");
        cm.dispose();
    } else if (selection == 6) {//删除接受
        cm.sendOk("删除成功！");
         cm.删除接受();
        cm.dispose();
    } else if (selection == 7) {//删除发布
        cm.sendOk("删除成功！");
         cm.删除发布()
        cm.dispose();
    } else if (selection == 10) {
        cm.sendOk("#r通缉榜介绍：#b\r\n江湖的恩怨，能在哪里了结？只有在通缉榜。只要你有钱。你就可以接受某一个玩家发布的通缉令。接受后，消灭他的仇人，你可以获得他的赏金。\r\n发布一个通缉令需要手续费。完成后奖励也会扣除手续费。\r\n被通缉的玩家在每个地点都会被受到攻击。\r\n你如果接受了一个通缉令后，你可以查看到该被通缉的玩家的具体信息。\r\n\t\t\t\t\t\t\t-------------祝你好运。");
        cm.dispose();
    } else if (selection == 11) {//追踪功能
           if (cm.查看接受() == null) {
             
                cm.sendOk("null");
                cm.dispose();
            }else{
        cm.sendOk("你要追踪的玩家名字：#r"+cm.读取追杀名字()+"#k\r\n所在地图：#b#m"+cm.读取地图(cm.读取追杀id())+"##k！");
        cm.dispose();
            }
    }
}