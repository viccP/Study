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
            if (cm.查看接受() == null) {
                cm.sendGetNumber("" + cm.getPlayer().getName() + "\r\n你想接受的是哪一条信息？请告诉他的ID。", 0, 100, 10000000);
            } else {
                cm.sendOk("null");
                cm.dispose();
            }
        } else if (status == 1) {
            id = selection;
            if (cm.getPlayer().getId() == id) {
                cm.sendOk("你有病????????????");
                cm.dispose();
            }
            cm.sendYesNo("信息：\r\n" + cm.指定查询(id) + "\r\n接受需要 #v" + itemid + "# " + sl + " 个。是否接受这条信息？");

        } else if (status == 2) {
            if (cm.查询状态(id) == 0) {
                if(cm.haveItem(itemid) >= sl){
                cm.接受通缉(id, cm.getPlayer().getName());
                //int charid3, String name3,int zt,int charid
                cm.接受通缉id(id);
                cm.gainItem(itemid,-sl);
                cm.sendOk("成功接受了这条信息:" + id);
                cm.dispose();
            }else{
                cm.sendOk("物品不足");
                cm.dispose();
            }
            } else {
                cm.sendOk("这条信息已经有人在做了，或者信息已经无效。");
                cm.dispose();
            }
        }
    }
}


