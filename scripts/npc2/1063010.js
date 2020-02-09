function start() {
    var text = "";
    for (i = 0; i < 10; i++) {
        text += "";
    }
    text += "在这里你可以发布一个通缉令。或者接受一个通缉令。\r\n#L10#通缉榜介绍#l            #b#L11#追踪功能#l\r\n\r\n"
    text += "#L0##r发布通缉令#l#k\t\t\t";
    text += "#L1##d接受通缉令#l#k"
    text += "\r\n\r\n#L2##b查看通缉榜[新发布]#l    #k"
    text += "#L3##b查看通缉榜[进行中]#k#l\r\n"
    text += "\r\n#L4##b查看我接受的通缉令#k#l\t"
    text += "#L5##b查看我发布的通缉令#k"
    text += "\r\n\r\n#L6##b我接受的通缉令[删除]-慎点#k\r\n\r\n"
    text += "#L7##b我发布的通缉令[删除]-慎点#k"
    cm.sendSimple(text);
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) { //发布通缉令
        cm.openNpc(1063010, 1);
    } else if (selection == 1) {//接受通缉令
        cm.openNpc(1063010, 2);
    } else if (selection == 2) {//查看通缉榜[新发布]
        var a = "#r通缉榜#k\r\n";
        a += cm.查看通缉榜();
        cm.sendOk(a);
        cm.dispose();
    } else if (selection == 3) {//查看通缉榜[进行中]
        var a = "#r通缉榜【进行中】#k\r\n";
        a += cm.查看通缉榜2();
        cm.sendOk(a);
        cm.dispose();
    } else if (selection == 4) {//查看我接受的通缉
        var a = "#r已经接受的通缉令#k\r\n";
        a += cm.查看接受();
        cm.sendOk(a);
        cm.dispose();
    } else if (selection == 5) {//查看我接受的通缉
        var a = "#r已经发布的通缉令#k\r\n";
        a += cm.查看发布();
        cm.sendOk(a);
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