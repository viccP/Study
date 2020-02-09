// Credits to Moogra
var status = 0;
var map = Array(240010501);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.warp(910000000);
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if(cm.getMapId()== 910000000){
                       
                 
            var txt1 = "#L1##r我要进入藏宝地图\r\n";
            cm.sendSimple("你是何人。为何打开#b藏宝图#k……\r\n\r\n"+txt1+"");
            }else{
                cm.sendOk("只有自由市场才可以打开#b藏宝图#k！\r\n请输入#b@假死#k解除假死状态！")
                cm.dispose();
            }
        } else if (status == 1) {
            if (selection == 1) {
                    cm.sendOk("藏宝地图请去自由市场找npc进入！请使用命令解除假死!");
                    cm.dispose();
            } else if (status == 2) {
            } else if (selection == 2) {
                if(cm.getMeso() >= 500000000) {
                    cm.gainMeso(-500000000);
                    cm.gainItem(4000313,1);
                    cm.sendOk("交换成功!小贱欢迎您下次再来");
                } else {
                    cm.sendOk("对不起，你没有足够的冒险币!");
                }
                cm.dispose();
            }
            else{
                cm.sendOk("All right. Come back later");
            }
        }
    }
}
