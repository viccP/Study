/* KIN
	Male Hair for GM.
*/
var status = 0;
var beauty = 0;
var haircolor = Array();
var skin = Array(0, 1, 2, 3, 4);
var hair = Array(30000, 30020, 30030, 30040, 30050, 30060, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30400, 30410, 30420, 30440, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30550, 30560, 30570, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30700, 30710, 30720);
var hairnew = Array();
var face = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023);
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
				cm.sendOk("�A���O�k��= =�Ч�t�@��GM");
				cm.dispose();
			} else {
				if(cm.getChar().getGender() == 0) {
					cm.sendSimple("�A�n!�b�o�̧ڥi�H���A���ܳy��,�аݧA�ݭn����A��?\r\n#L0#����#l\r\n#L1#�v��#l\r\n#L2#�v��#l\r\n#L3#����#l\r\n#L4#����#l");
				}else {
					cm.sendOk("�ڥu�����U�k�ͧ��ܳy��,�]�\�A�i�H�h��NimaKIN!");
					cm.dispose();
				}
			}
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				cm.sendStyle("��@�ӧa!", skin);
			} else if (selection == 1) {
				beauty = 2;
				hairnew = Array();
				for(var i = 0; i < hair.length; i++) {
					hairnew.push(hair[i] + parseInt(cm.getChar().getHair()
 % 10));
				}
				cm.sendStyle("��@�ӧa!", hairnew);
			} else if (selection == 2) {
				beauty = 3;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()
/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("��@�ӧa!", haircolor);
			} else if (selection == 3) {
				beauty = 4;
				facenew = Array();
				for(var i = 0; i < face.length; i++) {
					facenew.push(face[i] + cm.getChar().getFace()
 % 1000 - (cm.getChar().getFace()
 % 100));
				}
				cm.sendStyle("��@�ӧa!", facenew);
			} else if (selection == 4) {
				beauty = 5;
				var current = cm.getChar().getFace()
 % 100 + 20000;
				colors = Array();
				colors = Array(current , current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700);
				cm.sendStyle("��@�ӧa!", colors);
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
