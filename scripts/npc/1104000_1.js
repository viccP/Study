var status = 0;
var itemList = 
Array(     
			Array(1052804, 800, 1, 1), //
Array(1052805, 800, 1, 1), //
Array(1052806, 800, 1, 1), //
Array(1052807, 800, 1, 1), //
Array(1072972, 800, 1, 1), //1
Array(1072973, 800, 1, 1), //1
Array(1072974, 800, 1, 1), //1
Array(1072975, 800, 1, 1), //1
Array(1072976, 800, 1, 1), //1
Array(1082613, 800, 1, 1), //2
Array(1082614, 800, 1, 1), //2
Array(1082615, 800, 1, 1), //2
Array(1082616, 800, 1, 1), //2
Array(1082617, 800, 1, 1), //2
			Array(1052808,800, 1, 1) //
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("#v4000422#......");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(4001232, 1)) {
            cm.sendYesNo("#v4000422#......");
        } else {
            cm.sendOk("#v4000422#......");
            cm.safeDispose();
        }
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * 800);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = cm.gainGachaponItem(itemId, quantity, "Francis BOSS", notice);
            if (item != -1) {
                cm.gainItem(4001232, -1);
                cm.sendOk("浣犺幏寰椾簡 #b#t" + item + "##k " + quantity + "涓