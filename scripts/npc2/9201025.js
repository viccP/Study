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
	cm.sendSimple ("您好，我是楓葉之心兌換員 內容如下~#k\r\n#k#L0##d#i1122024#劍士＝#i4001226#1個+#i1122023##k\r\n#k#L1##d#i1122025#法師＝#i4001227#1個+#i1122023##k\r\n#k#L2##d#i1122026#弓手＝#i4001228#1個+#i1122023##k\r\n#k#L3##d#i1122027#盜賊＝#i4001229#1個+#i1122023##k\r\n#k#L4##d#i1122028#海盜＝#i4001230#1個+#i1122023##k\r\n#l\r\n#g===================#k#d分隔一下#k#g===================#k\r\n#k#L5##d#i1122029#劍士＝#i4001226#2個+#i1122023##k\r\n#k#L6##d#i1122030#法師＝#i4001227#2個+#i1122023##k\r\n#k#L7##d#i1122031#弓手＝#i4001228#2個+#i1122023##k\r\n#k#L8##d#i1122032#盜賊＝#i4001229#2個+#i1122023##k\r\n#k#L9##d#i1122033#海盜＝#i4001230#2個+#i1122023##k#k\r\n#l\r\n#g===================#k#d分隔一下#k#g===================#k\r\n#k#L10##d#i1122034#劍士＝#i4001226#3個+#i1122023##k\r\n#k#L11##d#i1122035#法師＝#i4001227#3個+#i1122023##k\r\n#k#L12##d#i1122036#弓手＝#i4001228#3個+#i1122023##k\r\n#k#L13##d#i1122037#盜賊＝#i4001229#3個+#i1122023##k\r\n#k#L14##d#i1122038#海盜＝#i4001230#3個+#i1122023#")}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){ 
		case 0:
			if (cm.haveItem(4001226 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001226 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122024); 
			cm.sendOk("#roH！#n 你有#i4001226#1個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001226#1個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 1:
			if (cm.haveItem(4001227 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001227 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122025); 
			cm.sendOk("#roH！#n 你有#i4001227#1個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001227#1個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 2: 
			if (cm.haveItem(4001228 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001228 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122026); 
			cm.sendOk("#roH！#n 你有#i4001228#1個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001228#1個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 3:
			if (cm.haveItem(4001229 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001229 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122027); 
			cm.sendOk("#roH！#n 你有#i4001229#1個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001229#1個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 4:
			if (cm.haveItem(4001230 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001230 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122028); 
			cm.sendOk("#roH！#n 你有#i4001230#1個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001230#1個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 5:
			if (cm.haveItem(4001226 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001226 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122029); 
			cm.sendOk("#roH！#n 你有#i4001226#2個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001226#2個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 6:
			if (cm.haveItem(4001227 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001227 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122030); 
			cm.sendOk("#roH！#n 你有#i4001227#2個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001227#2個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 7:
			if (cm.haveItem(4001228 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001228 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122031); 
			cm.sendOk("#roH！#n 你有#i4001228#2個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001228#2個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 8:
			if (cm.haveItem(4001229 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001229 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122032); 
			cm.sendOk("#roH！#n 你有#i4001229#2個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001229#2個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 9:
			if (cm.haveItem(4001230 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001230 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122033); 
			cm.sendOk("#roH！#n 你有#i4001230#2個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001230#2個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 10:
			if (cm.haveItem(4001226 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001226 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122034); 
			cm.sendOk("#roH！#n 你有#i4001226#3個和#i1122023#耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001226#3個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 11:
			if (cm.haveItem(4001227 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001227 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122035); 
			cm.sendOk("#roH！#n 你有#i4001227#3個和#i1122023#耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001227#3個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 12:
			if (cm.haveItem(4001228 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001228 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122036); 
			cm.sendOk("#roH！#n 你有#i4001228#3個和#i1122023#耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001228#3個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 13:
			if (cm.haveItem(4001229 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001229 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122037); 
			cm.sendOk("#roH！#n 你有#i4001229#3個和#i1122023#耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001229#3個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 14:
			if (cm.haveItem(4001230 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001230 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122038); 
			cm.sendOk("#roH！#n 你有#i4001230#3個和#i1122023#耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4001230#3個和#i1122023#,滾吧!");
		        cm.dispose();
			}
		break;
		case 15:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044303 ,1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 16:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044403 ,1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 17:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044503 ,1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 18:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044603 ,1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 19:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044703 ,1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 20:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2040709 ,1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 21:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2040710 ,1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 22:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2040711 ,1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}

			}
		}