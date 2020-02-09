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
	cm.sendSimple ("您好，我是轉蛋捲兌換NPC 內容如下~#k\r\n#k#L0#100萬＝#i5220000#1張#k\r\n#k#L1#500萬＝#i5220000#5張#k\r\n#k#L2#1千W＝#i5220000#10張")}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){ 
		case 0:
			if (cm.getMeso() >= 1000000){
			cm.gainMeso(-1000000);
			cm.gainItem(5220000 ,1); 
			cm.sendOk("#roH！#n 你有100萬耶 給你轉蛋捲吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有100萬,滾吧!");
		        cm.dispose();
			}
		break;
		case 1:
			if (cm.getMeso() >= 5000000){
			cm.gainMeso(-5000000);
			cm.gainItem(5220000 ,5); 
			cm.sendOk("#roH！#n 你有500萬耶 給你轉蛋捲吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有500萬,滾吧!");
		        cm.dispose();
			}
		break;
		case 2: 
			if (cm.getMeso() >= 10000000){
			cm.gainMeso(-10000000);
			cm.gainItem(5220000 ,10); 
			cm.sendOk("#roH！#n你有1千W耶 給你轉蛋捲吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有1千W,滾吧!");
		        cm.dispose();
			}
		break;
		case 3:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2040506 ,-1); 
			cm.sendOk("#roH！#n你有#i4031454#10個耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 4:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2040806 ,-1); 
			cm.sendOk("#roH！#n你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 5:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2040903 ,-1); 
			cm.sendOk("#roH！#n你有#i4031454#10個耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 6:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2043003 ,-1); 
			cm.sendOk("#roH！#n你有#i4031454#10個耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 7:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2043103 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 8:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2043203 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 9:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2043303 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 10:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2043703 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 11:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2043803 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 12:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2044003 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 13:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2044103 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 14:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2044203 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 15:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2044303 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 16:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2044403 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 17:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2044503 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 18:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2044603 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 19:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2044703 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 20:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2040709 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 21:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2040710 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}
		break;
		case 22:
			if (cm.haveItem(4031454 ,10) == true) {
			cm.gainItem(4031454 ,-10);
			cm.gainItem(2040711 ,-1); 
			cm.sendOk("#roH！#n 你有#i4031454#10個耶!好吧我就幫你製作吧!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("你沒有#i4031454#10個,滾吧!");
		        cm.dispose();
			}

			}
		}
