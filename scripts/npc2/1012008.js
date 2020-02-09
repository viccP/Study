importPackage(net.sf.cherry.client);
var status = -1;
var beauty = 0;
var tosend = 0;
var sl;
var mats;
function start() {
    action(1, 0, 0)
		}
	function action(mode, type, selection) {
		if (mode == -1) {
		cm.dispose();
		} else {
		if (status >= 0 && mode == 0) {
		cm.dispose();
		return;
		}
		if (mode == 1)
		status++;
		else
		status--;


	if (status == 0) {

	    var textz = "#d欢迎来到#r繁 - 华#d冒险岛.这里是我们曾经最喜爱的#r小游戏!\r\n\r\n";

  textz += "#r#L1##v4080100#记忆大考验    #d需要：#v4030012##z4030012#*100\r\n\t\t游戏币:#r1000万\r\n\r\n";
  textz += "#r#L2##v4080000#绿水灵和蘑菇五子棋  \r\n   #d需要：#v4030000##z4030000##v4030001##z4030001#各15个\r\n\t\t#v4030009##z4030009#*1个游戏币:#r1000万\r\n\r\n";
  textz += "#r#L3##v4080004#猪猪和三眼章鱼五子棋  \r\n   #d需要：#v4030011##z4030011##v4030010##z4030010#各15个\r\n\t\t#v4030009##z4030009#*1个游戏币:#r1000万\r\n\r\n";


		cm.sendSimple (textz);  

	}else if (status == 1) {

	       if (selection == 1){
                  if (!cm.haveItem(4030012,100)) {
 			cm.sendOk("请带来#v4030012##z4030012#*100");
      			cm.dispose();
		} else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()){
			cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
			cm.dispose();
		} else{
			cm.gainItem(4030012,-100);
			cm.gainMeso(-10000000);
			cm.gainItem(4080100,1);
			cm.sendOk("#b兑换成功");
      			cm.dispose();
			}

       } else if (selection == 2){
                  if (!cm.haveItem(4030009,1)) {
    cm.sendOk("请带来#v4030009##z4030009#*1#v4030000##z4030000#*15#v4030001##z4030001#*15");
         cm.dispose();
  } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4030009,-1);
   cm.gainItem(4030000,-15);
   cm.gainItem(4030001,-15);
   cm.gainMeso(-10000000);
   cm.gainItem(4080000,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 3){
                  if (!cm.haveItem(4030009,1)) {
    cm.sendOk("请带来#v4030009##z4030009#*1#v4030011##z4030011#*15#v4030010##z4030010#*15");
         cm.dispose();
  } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4030009,-1);
   cm.gainItem(4030011,-15);
   cm.gainItem(4030010,-15);
   cm.gainMeso(-10000000);
   cm.gainItem(4080004,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 4){
                  if (!cm.haveItem(4001266,20)) {
    cm.sendOk("请带来#v4001266##z4001266#*20");
         cm.dispose();
  } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4001266,-20);
   cm.gainItem(1142175 ,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 5){
                  if (!cm.haveItem(4001266,50)) {
    cm.sendOk("请带来#v4001266##z4001266#*50");
         cm.dispose();
  } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4001266,-50);
   cm.gainItem(1142335,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 6){
                  if (!cm.haveItem(4031454,1)) {
    cm.sendOk("请带来#v4031454##z4031454#*1");
         cm.dispose();
  } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4031454,-1);
   cm.gainItem(1142371 ,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 7){
                  if (!cm.haveItem(4002001,200)) {
    cm.sendOk("请带来#v4002001##z4002001#*200");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-200);
   cm.gainItem(1372137 ,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 7){
                  if (!cm.haveItem(4002001,200)) {
    cm.sendOk("请带来#v4002001##z4002001#*200");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-200);
   cm.gainItem(1382167,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 8){
                  if (!cm.haveItem(4002001,200)) {
    cm.sendOk("请带来#v4002001##z4002001#*200");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-200);
   cm.gainItem(1472178,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 9){
                  if (!cm.haveItem(4002001,200)) {
    cm.sendOk("请带来#v4002001##z4002001#*200");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-200);
   cm.gainItem(1332192,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 10){
                  if (!cm.haveItem(4002001,500)) {
    cm.sendOk("请带来#v4002001##z4002001#*500");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-500);
   cm.gainItem(3010070,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 11){
                  if (!cm.haveItem(4002001,50)) {
    cm.sendOk("请带来#v4002001##z4002001#*50");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-50);
   cm.gainItem(1112446,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 12){
                  if (!cm.haveItem(4002001,10)) {
    cm.sendOk("请带来#v4002001##z4002001#*10");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-10);
   cm.gainItem(1002391,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 13){
                  if (!cm.haveItem(4002001,10)) {
    cm.sendOk("请带来#v4002001##z4002001#*10");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-10);
   cm.gainItem(1002392,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 14){
                  if (!cm.haveItem(4002001,10)) {
    cm.sendOk("请带来#v4002001##z4002001#*10");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-10);
   cm.gainItem(1002394,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 15){
                  if (!cm.haveItem(4002001,50)) {
    cm.sendOk("请带来#v4002001##z4002001#*50");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-50);
   cm.gainItem(1112663,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 16){
                  if (!cm.haveItem(4002001,10)) {
    cm.sendOk("请带来#v4002001##z4002001#*10");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-10);
   cm.gainItem(1002395,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 17){
                  if (!cm.haveItem(4002001,10)) {
    cm.sendOk("请带来#v4002001##z4002001#*10");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-10);
   cm.gainItem(1302063,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 18){
                  if (!cm.haveItem(4002001,200)) {
    cm.sendOk("请带来#v4002001##z4002001#*200");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-200);
   cm.gainItem(1302106,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}

       } else if (selection == 19){
                  if (!cm.haveItem(4002001,10)) {
    cm.sendOk("请带来#v4002001##z4002001#*10");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-10);
   cm.gainItem(1002393,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}


       } else if (selection == 20){
                  if (!cm.haveItem(4002001,200)) {
    cm.sendOk("请带来#v4002001##z4002001#*200");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-200);
   cm.gainItem(1092109,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}


       } else if (selection == 21){
                  if (!cm.haveItem(4002001,200)) {
    cm.sendOk("请带来#v4002001##z4002001#*200");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-200);
   cm.gainItem(1092110,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}


       } else if (selection == 22){
                  if (!cm.haveItem(4002001,200)) {
    cm.sendOk("请带来#v4002001##z4002001#*200");
         cm.dispose();
  } else if (cm.getPlayer().getInventory
(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3)){
   cm.sendOk("#b请保证装备栏位至少有3个空格,否则无法兑换.");
   cm.dispose();
  } else{
   cm.gainItem(4002001,-200);
   cm.gainItem(1092111,1);
   cm.sendOk("#b兑换成功")
   cm.dispose();
}


}
}
}
}