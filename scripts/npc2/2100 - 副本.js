var 礼包物品 = "#v1302000#";
var x1 = "1302000,+1";// 物品ID,数量
var x2;
var x3;
var x4;

function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "#b#v4031344##v4031344##v4031344##v3994081##v3994072##v3994071##v3994077##v4031344##v4031344##v4031344##k\r\n";
            text += "\t\t\t  #e欢迎来到#b天成冒险岛 #k!#n\r\n"
            text += "#L1##b○擂台传送#l\t#L2##r○地图爆率#l\t#L3##d○综合排名#l\r\n\r\n";//1
            text += "#L4##d○豆豆兑换#l\t#L5##b○点卷购物#l\t#L6##r○积分购物#l\r\n\r\n"//2
            text += "#L7##b○万能商店#l\t#L8##b○每日签到#l\t#L9##b○每日任务#l\r\n\r\n"//3
            text += "#L10##b○带人福利#l\t#L11##b○装备制作#l\t#L12##b○戒指兑换\r\n\r\n"//4
            text += "#L13##d○#e积分抽奖#n#l\t#L14##d○新手礼包#l\t#L15##d○重返BOSS挑战#l"

            cm.sendSimple(text);
        } else if (selection == 1) { //擂台传送
            if (cm.getPlayer().getMap().getId() == 701000210 || cm.getLevel() <8) {
                cm.sendOk("你已经在大擂台入口了！或者你的等级小于8");
                cm.dispsoe();
            } else {
                cm.warp(701000210);
                cm.dispsoe();
            }
        } else if (selection == 2) {  //地图爆率
            cm.openNpc(2000, 0);
        } else if (selection == 3) { //综合排名查看
            cm.openNpc(2000, 1);
        } else if (selection == 4) {//豆豆兑换
            cm.openNpc(2000, 2)
        } else if (selection == 5) { //点卷购物
            cm.openNpc(9900000, 666);
        } else if (selection == 6) {//积分购物
            cm.openNpc(9900000, 777);
        } else if (selection == 7) {//快捷商店
            if(cm.getMeso() >= 2000){
            cm.openShop(1093021);
            cm.gainMeso(-2000);
            cm.dispose();
        }else{
            cm.sendOk("冒险币不足2000无法使用该功能哦！");
            cm.dispose();
        }
        } else if (selection == 8) {//每日签到
            cm.openNpc(9900004, 12);
        } else if (selection == 9) {//每日任务
            cm.openNpc(2000, 5);
        } else if (selection == 10) {//带人福利
            cm.openNpc(2000, 10);
        } else if (selection == 11) {//锻造学习
            cm.openNpc(9310059, 0);
        } else if (selection == 12) {//戒指兑换
            cm.openNpc(2000, 20);
        } else if (selection == 13) {//充值礼包领取
            cm.openNpc(9900007, 666);
        } else if (selection == 14) {//新手礼包领取
            if (cm.getChar().getPresent() >= 1) {
                cm.sendOk("每个账号只能领取 #b1#k次 新人礼包！");	
                cm.dispose();
            } else {
                cm.sendOk("恭喜你领取了一下物品");
                cm.gainItem(5072000,+10);//读取变量
                cm.gainMeso(+200000);//读取变量
                cm.gainItem(2000002,+100);//读取变量
                cm.gainItem(2000003,+100);//读取变量
cm.getPlayer().modifyCSPoints(1, +5000);
		cm.gainItem(1142152,+1);
                cm.getChar().saveToDB(true,true);//保存数据
                cm.getChar().setPresent(1);//更新礼包领取状态
                cm.dispose();
            }
        } else if (selection == 15) {//boss
		if(cm.getbossmap() == 0){
		cm.sendOk("看来你没有加入过挑战boss的行列！");
		cm.dispose();
}else{
	cm.warp(cm.getbossmap());
	cm.dispose();
        }}
    }
}


