
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(33650,36720,33400,33410,33540,33330,33660,33100,33360,33370,33130,30740,33450,33270,37570,37120,36100,36080,34960,34870,34800,34760,35000,35030,35090,35220,35230,35240,35250,38360,38370,35060,35100,35150,35200,35260,35270,35340,35350,36260,35280,35290,35300,32430,35410,35420,35450,36910,37910,35330,35360,35430,35460,35490,36630,33430,36370,36860,35550,36220);
var fhair = Array(37580,34630,34620,34730,34780,34560,34380,34400,33620,33680,33710,31370,32130,34340,34720,38100,37980,37860,37820,37670,37620,36980,37300,37260,37140,37030,34670,36300,33780,33700,30740,30750,33230,35120,38030,38050,38060,38220,38240,38320,38330,38340,38350,37310,35080,35110,34980,35190,35210,38380,38390,38470,38480,38500,38310,38270,38130,38400,38410,38420,38430,38450,38530,38540,38600,38610,38460,38490,38580,38590,38640,38680,36310,37110,38160,37440,38420,37720,34690,33680,34900,38400,34400,34430,33180,34360,34150,37760,31900,38150,37000,37460,34660,32160,34260,31880,38090,38110,34170,34510,34590,36180,37100,37130,37380,37220,36580,37710,37830,38080,38040,35100,38350);
var hairnew = Array();

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
			cm.sendSimple("你好,我是皇家发型师!如果你有#b皇家理发券#k,你就放心的把发型交给我,我会让你满意的.那么你要做什么?请选择吧!\r\n#L1#改变发型(使用#b#v5150040#皇家理发券#k)#l\r\n#L2#染色(使用#b射手村染发普通会员卡#k)#l");				
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 0;
				cm.sendSimple("Which coupon would you like to buy?\r\n#L0#Haircut for " + hairprice + " mesos: #i5150003##t5150003##l\r\n#L1#Dye your hair for " + haircolorprice + " mesos: #i5151003##t5151003##l");
			} else if (selection == 1) {
				beauty = 1;
				hairnew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mhair.length; i++) {
						hairnew.push(mhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				} 
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fhair.length; i++) {
						hairnew.push(fhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				}
				cm.sendStyle("皇家美发卡在活动不定期发放，也可以通过积分换取~新发型心动了吗~~", hairnew,5150040);
			} else if (selection == 2) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("皇家美发卡在活动不定期发放，也可以通过积分换取~新发型心动了吗~~", haircolor,5150040);
			}
		} else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if(cm.isCash()){
					if (cm.getPlayer().getCSPoints(1)>=980000000){
						cm.getPlayer().modifyCSPoints(1,-980);
						cm.setHair(hairnew[selection]);
						cm.sendOk("好了,让朋友们赞叹你的新发型吧!");
					} else {
						cm.sendOk("抱歉，不开放商城购买");
					}
				} else {
					if (cm.haveItem(5150040) == true){
						cm.gainItem(5150040, -1);
						cm.setHair(hairnew[selection]);
						cm.sendOk("好了,让朋友们赞叹你的新发型吧!");
					} else {
						cm.sendOk("看起来你并没有我们的高级会员卡,我恐怕不能给你染发,我很抱歉.请你先购买吧.");
					}	
				}
				
			}
			if (beauty == 2){
				if (cm.haveItem(5150040) == true){
						cm.gainItem(5150040, -1);
					cm.setHair(haircolor[selection]);
					cm.sendOk("好了,让朋友们赞叹你的新发色吧!");
				} else {
					cm.sendOk("看起来你并没有我们的高级会员卡,我恐怕不能给你染发,我很抱歉.请你先购买吧.");
				}
			}
			if (beauty == 0){
				if (selection == 0 && cm.getMeso() >= hairprice) {
					cm.gainMeso(-hairprice);
					cm.gainItem(5150003, 1);
					cm.sendOk("Enjoy!");
				} else if (selection == 1 && cm.getMeso() >= haircolorprice) {
					cm.gainMeso(-haircolorprice);
					cm.gainItem(5151003, 1);
					cm.sendOk("Enjoy!");
				} else {
					cm.sendOk("You don't have enough mesos to buy a coupon!");
				}
			}
		}
	}
}