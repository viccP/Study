/*WNMS 接受通缉令*/

function start() {
    status = -1;
    action(1, 0, 0);
}
var itemid = 1302000;//接受需要的道具
var sl = 1;

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("设置出战..");
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
            var a = "#r拥有的魔宠查看#k\r\n";
            a += cm.查询魔宠();
            cm.sendGetNumber("" + cm.getPlayer().getName() + "\r\n这是你的魔宠列表。请告诉我你要设置出战的魔宠ID。\r\n"+a+"", 0, 0, 10000000);
          
        } else if (status == 1) {
            id = selection;
            if (cm.getPlayer().getId() == id) {
                cm.sendOk("你有病????????????");
                cm.dispose();
            }
            cm.sendYesNo("是否设置ID为["+id+"]的魔宠出战？");

        } else if (status == 2) {
                    cm.重置魔宠();
                    cm.战斗设置(id);         
                    cm.sendOk("<更换地图或者换线后生效>成功设置出战ID:" + id);
                    cm.dispose();
               
            } else {
                cm.sendOk("...");
                cm.dispose();
            
        }
    }
}


