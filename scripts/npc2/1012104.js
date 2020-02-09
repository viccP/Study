var status = 0;
var beauty = 0;
var haircolor = Array();
var skin = Array(0, 1, 2, 3, 4);
var hair = Array(34290,34280,34270,34260,34250,34240,34230,34300,32130,34200,34220,34120, 34130, 34150, 34160, 34170, 34180,34110,33020,33010, 31980, 31970, 31960, 31900, 34010, 33030, 34040, 34090, 34100, 31850, 31820, 31810, 31800, 31790, 31780, 31770, 31760, 31750, 31740, 31680, 31400, 31120, 31110, 31090, 31080, 31170, 31180, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 31910, 31920, 31930, 31940, 31950, 33000, 34000);
var hairnew = Array();
var face = Array(21029,21035,21034,21030,21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21016, 21017, 21018, 21019, 21020, 21021, 21022);
var facenew = Array();
var colors = Array();

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {

				if(cm.getChar().getGender() == 1) {
					cm.sendSimple("嘿!我是為能到達這裡的#r女性VIP會員#k服務的！你想有怎樣的改變?\r\n#L0#膚色#l\r\n#L1#髮型#l\r\n#L2#頭髮顏色#l\r\n#L3#眼睛#l\r\n#L4#眼睛顏色#l");
				}else {
					cm.sendOk("我能讓#r女性VIP會員#k改頭換面，如果你是男性的話就去找我的搭檔!");
					cm.dispose();
				}
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				cm.sendStyle("選擇你喜歡的?", skin);
			} else if (selection == 1) {
				beauty = 2;
				hairnew = Array();
				for(var i = 0; i < hair.length; i++) {
					hairnew.push(hair[i] + parseInt(cm.getChar().getHair()
 % 10));
				}
				cm.sendStyle("選擇你喜歡的?", hairnew);
			} else if (selection == 2) {
				beauty = 3;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()
/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("選擇你喜歡的?", haircolor);
			} else if (selection == 3) {
				beauty = 4;
				facenew = Array();
				for(var i = 0; i < face.length; i++) {
					facenew.push(face[i] + cm.getChar().getFace()
 % 1000 - (cm.getChar().getFace()
 % 100));
				}
				cm.sendStyle("選擇你喜歡的?", facenew);
			} else if (selection == 4) {
				beauty = 5;
				var current = cm.getChar().getFace()
 % 100 + 21000;
				colors = Array();
				colors = Array(current , current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700);
				cm.sendStyle("選擇你喜歡的?", colors);
			}
		}
		else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				cm.setSkin(skin[selection]);
			}
			if (beauty == 2){
				cm.setHair(hairnew[selection]);
			}
			if (beauty == 3){
				cm.setHair(haircolor[selection]);
			}
			if (beauty == 4){
				cm.setFace(facenew[selection]);
			}
			if (beauty == 5){
				cm.setFace(colors[selection]);
			}
		}
	}
}