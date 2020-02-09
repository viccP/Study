/*
	This file is part of the cherry Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@cherry.de>
                       Jan Christian Meyer <vimes@cherry.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Natalie
	Henesys VIP Hair/Hair Color Change (VIP).
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(36630,36490,36690,35430,36710,36750,36760,36810,36820,36900,36920,36340,36030,33810,33980,33990,33670,33580,33320,36000,36420,36460,36470,36480,36510,36520,36530,36560,36580,36590,36640,36680,36700,33550,33820,33380,33930,32120,33150,33310,33600,33640,36310,33750,33250,33350,33440,35050,35170,35180,33290,33040,36300,33780,33700,33390,33260,33340,33240,33120,33000,35070,36290,33750,36310,36220,36180,36330,36120,36540,36770,33800,33740,33690,33630,33180,34440,33280,33300,33220,36360,33830,36010,36020,35020,32470,35130,35160,36550,36380,32440,32500,36390,36400,36130,36140);
var fhair = Array(37640,37690,36980,38070,37990,37960,37930,37920,34450,37950,37810,37190,37060,37000,34970,34890,34860,34810,34770,34750,34670,34600,33970,33730,34450,31360,33140,32150,37440,37450,37490,37560,34160,34300,34260,34240,34210,34250,34490,38290,38160,38100,38020,38010,38120,34470,37330,37340,34060,37710,34870,34800,34760,37700,33960,34640,37200,37320,34330,34320,34840,34850,34880,34820,34830,34110,33520,34510,38260,38250,34250,34220,34230,34130,31380,34270,34290,37400,37370,37380,37350,34050,37530,37520,37510,37500,36050,37020,37050,37090,37180,34420,34640,37680);
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