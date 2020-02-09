/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

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

/**
 Dolphin in Herb Town
**/

var status = 0;

function start() {
	cm.sendSimple ("您好，我是#e#b製作NPC,物品如下~#k\r\n#k#L3##d#i2070019#＝#i4032168#+#v4032170#+#k#v4032181#X500+#v2070006#"+
"\r\n#k#L4##d#i4032002#＝#i4000460#+#v4000461#王+#k#v4000462#"+
"\r\n#k#L6##d#i4001126#30＝#i4000313#300+#v4032733#300"+
"\r\n#k#L5##d#i4032056#＝#i4005000#30+#v4005001#30+#k#v4005002#30+#k#v4005003#30+#k#v4005004#30+#k#i4001126#30+#k#i4001089#皮卡+#k5000W")}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){ 
		case 0:
			if (cm.haveItem(4031179 ,100) == true && cm.haveItem(4001017 ,100) == true) {
			cm.gainItem(4031179 ,-100);
			cm.gainItem(4001017 ,-100); 
			cm.gainItem(4001091 ,1);
			cm.sendOk("#roH！#n你有#v4001017#100個,#v4031179#100片耶!好吧我就幫你製作吧!");
			cm.serverNotice("『恭喜訊息』：恭喜 "+ cm.getChar().getName() +" 成功製作了第5把鑰匙,想要的可以跟他買喔");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#v4031179#100片,#v4001017#100顆,滾吧!");
		        cm.dispose();
			}
		break;
		case 1:
			if (cm.haveItem(4001087 ,1) == true && cm.haveItem(4001088 ,1) == true && cm.haveItem(4001089 ,1) == true && cm.haveItem(4001090 ,1) == true && cm.haveItem(4001091 ,1) == true) {
			cm.gainItem(4001087 ,-1);
			cm.gainItem(4001088 ,-1);
			cm.gainItem(4001089 ,-1);
			cm.gainItem(4001090 ,-1);
			cm.gainItem(4001091 ,-1);
			cm.gainItem(4031217 ,1);
			cm.sendOk("#roH！#n你有#v4001087#,#v4001088#,#i4001089#,#i4001090#,#i4001091#耶!好吧我就幫你製作吧!");
			cm.serverNotice("『恭喜訊息』：恭喜 "+ cm.getChar().getName() +" 成功製作了黃金鑰匙,想要的可以跟他買喔");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#v4001087#,#v4001088#,#i4001089#,#i4001090#,#i4001091#,滾吧!");
		        cm.dispose();
			}
		break;
		case 2: 
			if (cm.haveItem(4031217 ,1) == true) {
			cm.gainItem(4031217 ,-1);
			cm.gainItem(4032202 ,1);
			cm.sendOk("#roH！#n你有#i4031217#1把耶!好吧我就幫你製作吧!");
			cm.serverNotice("『恭喜訊息』：恭喜 "+ cm.getChar().getName() +" 成功製作了發訊器想要的可以跟他買喔");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031217#1把,滾吧!");
		        cm.dispose();
			}
		break;
		case 3:
			if (cm.haveItem(4032168 ,1) == true && cm.haveItem(4032170 ,1) == true && cm.haveItem(4032181 ,500) == true && cm.haveItem(2070006 ,1) == true) {
			cm.gainItem(4032168 ,-1);
			cm.gainItem(4032170 ,-1); 
			cm.gainItem(4032181 ,-500);
			cm.gainItem(2070006 ,-1);
			cm.gainItem(2070019 ,1);
			cm.sendOk("#roH！#n你有#v4032168#1個,#v4032170#1個,#i4032181#2500個和#i2070006#1組耶!好吧我就幫你製作吧!");
			cm.worldMessage("『恭喜訊息』：恭喜 "+ cm.getChar().getName() +" 成功製作了手裡劍-魔一組,想要的可以跟他買喔");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#v4032168#1個,#v4032170#1個,#i4032181#2500個和#i2070006#1組,滾吧!");
		        cm.dispose();
			}
		break;
		case 4:
			if (cm.haveItem(4000460 ,1) == true && cm.haveItem(4000461 ,1) == true && cm.haveItem(4000462 ,1) == true) {
			cm.gainItem(4000460 ,-1);
			cm.gainItem(4000461 ,-1); 
			cm.gainItem(4000462 ,-1);
			cm.gainItem(4032002 ,1);
			cm.sendOk("#roH！#n你有#v4000460#,#v4000461#和#i4000462#耶!好吧我就幫你製作吧!");
			cm.worldMessage("『恭喜訊息』：恭喜 "+ cm.getChar().getName() +" 成功製作了混沌之球");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#v4000460#,#v4000461#和#i4000462#,滾吧!");
		        cm.dispose();
			}
		break;
		case 5:
			if (cm.haveItem(4005000 ,30) == true && cm.haveItem(4005001 ,30) == true && cm.haveItem(4005002 ,30) == true && cm.haveItem(4005003 ,30) == true && cm.haveItem(4005004 ,30) == true && cm.haveItem(4001126 ,30) == true && cm.haveItem(4001089 ,1) == true && cm.getMeso()>=50000000) {
			cm.gainItem(4005000 ,-30);
			cm.gainItem(4005001 ,-30);
			cm.gainItem(4005002 ,-30);
			cm.gainItem(4005003 ,-30);
			cm.gainItem(4005004 ,-30); 
			cm.gainItem(4001126 ,-30);
			cm.gainItem(4001089 ,-1);
			cm.gainMeso(-50000000);
			cm.gainItem(4032056 ,1);
			//cm.sendOk("#roH！#n你有#v4000038#1300個,#v4000313#1300個和#i1012171#耶!好吧我就幫你製作吧!");
			cm.worldMessage("『恭喜訊息』：恭喜 "+ cm.getChar().getName() +" 成功製作了楓葉水晶");
		        cm.dispose();
			}else{
		        //cm.sendOk("你沒有#v4000038#1300個,#v4000313#1300個和#i1012171#,滾吧!");
		        cm.sendOk("妳材料不夠唷~去檢查看看唄!");
		        cm.dispose();
			}
		break;
		case 6:
			if (cm.haveItem(4000313 ,300) == true && cm.haveItem(4032733 ,300) == true) {
			cm.gainItem(4000313 ,-300);
			cm.gainItem(4032733 ,-300); 
			cm.gainItem(4001126 ,30);
			//cm.sendOk("#roH！#n你有#v4000038#1500個,#v4000313#1500個和#i1012172#耶!好吧我就幫你製作吧!");
			//cm.worldMessage("『恭喜訊息』：恭喜 "+ cm.getChar().getName() +" 成功製作了10個楓葉,想要的可以跟他買喔");
		        cm.dispose();
			}else{
		        cm.sendOk("你所需材料不夠");
		        cm.dispose();
			}
		break;
		case 7:
			if (cm.haveItem(4000313 ,1800) == true && cm.haveItem(4000038 ,1800) == true && cm.haveItem(1012173 ,1) == true) {
			cm.gainItem(4000313 ,-1800);
			cm.gainItem(4000038 ,-1800); 
			cm.gainItem(1012173 ,-1);
			cm.gainItem(1012174 ,1);
			cm.sendOk("#roH！#n你有#v4000038#1800個,#v4000313#1800個和#i1012173#耶!好吧我就幫你製作吧!");
			cm.serverNotice("『恭喜訊息』：恭喜 "+ cm.getChar().getName() +" 成功製作了180等恰吉面具,想要的可以跟他買喔");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#v4000038#1800個,#v4000313#1800個和#i1012173#,滾吧!");
		        cm.dispose();
			}

			}
		}