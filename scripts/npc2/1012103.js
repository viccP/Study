/* KIN
	Male Hair for GM.
*/
var status = 0;
var beauty = 0;
var haircolor = Array();
var skin = Array(0, 1, 2, 3, 4);
var hair = Array(32040,32030, 33220, 33210,33200, 33080, 33100, 33110,33120, 33140, 33150, 33160, 33170, 32120,32110,32100,32090,32080,32070,32060,32050,30960,30970, 30980, 33130, 34140, 33030, 33090, 30920, 30990, 30880, 30850, 30840, 30100, 30800, 30730, 30700, 30680, 30660, 30670, 30760, 30770, 30790, 30800, 30810, 30820, 30950, 30940, 30930, 30910, 30900, 30890, 30870, 30860);
var hairnew = Array();
var face = Array(20037,20036,20032,20031,20029,20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023);
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
				cm.sendOk("你不是男生= =請找另一位GM");
				cm.dispose();
			} else {
				if(cm.getChar().getGender() == 0) {
					cm.sendSimple("你好!在這裡我可以幫你改變造型,請問你需要什麼服務?\r\n#L0#膚色#l\r\n#L1#髮型#l\r\n#L2#髮色#l\r\n#L3#眼型#l\r\n#L4#眼色#l");
				}else {
					cm.sendOk("我只能幫助男生改變造型,也許你可以去找NimaKIN!");
					cm.dispose();
				}
			}
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				cm.sendStyle("選一個吧!", skin);
			} else if (selection == 1) {
				beauty = 2;
				hairnew = Array();
				for(var i = 0; i < hair.length; i++) {
					hairnew.push(hair[i] + parseInt(cm.getChar().getHair()
 % 10));
				}
				cm.sendStyle("選一個吧!", hairnew);
			} else if (selection == 2) {
				beauty = 3;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()
/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("選一個吧!", haircolor);
			} else if (selection == 3) {
				beauty = 4;
				facenew = Array();
				for(var i = 0; i < face.length; i++) {
					facenew.push(face[i] + cm.getChar().getFace()
 % 1000 - (cm.getChar().getFace()
 % 100));
				}
				cm.sendStyle("選一個吧!", facenew);
			} else if (selection == 4) {
				beauty = 5;
				var current = cm.getChar().getFace()
 % 100 + 20000;
				colors = Array();
				colors = Array(current , current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700);
				cm.sendStyle("選一個吧!", colors);
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
