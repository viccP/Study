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
	cm.sendSimple ("您好，我是#e#d喇叭販賣商人#k#n\r\n#e#d請問您要買哪一種喇叭?#k#n\r\n#r#L0##e#i5390000# 怒火心情喇叭 #n#l#b10個(1楓幣)#k\r\n#r#L1##e#i5390000# 怒火心情喇叭 #n#l#b100個(1楓幣)#k\r\n#r#L2##e#i5390000# 怒火心情喇叭 #n#l#b1000個(1楓幣)#k\r\n#r#L3##e#i5390001# 白雲朵朵心情喇叭 #n#l#b10個(1楓幣)#k\r\n#r#L4##e#i5390001# 白雲朵朵心情喇叭 #n#l#b100個(1楓幣)#k\r\n#r#L5##e#i5390001# 白雲朵朵心情喇叭 #n#l#b1000個(1楓幣)#k\r\n#r#L6##e#i5390002# 戀愛心情喇叭 #n#l#b10個(1楓幣)#k\r\n#r#L7##e#i5390002# 戀愛心情喇叭 #n#l#b100個(1楓幣)#k\r\n#r#L8##e#i5390002# 戀愛心情喇叭 #n#l#b1000個(1楓幣)#k\r\n#r#L9##e#i5076000# 道具喇叭 #n#l#b10個(1楓幣)#k\r\n#r#L10##e#i5076000# 道具喇叭 #n#l#b100個(1楓幣)#k\r\n#r#L11##e#i5076000# 道具喇叭 #n#l#b1000個(1楓幣)#k\r\n#r#L12##e#i5050000# 能力回復捲 #n#l#b100個(100楓幣)#k");
	}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){
		case 0: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5390000#怒火心情喇叭10個#n 已經送到您的背包中.");
			cm.gainItem(5390000 ,10);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 1: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5390000#怒火心情喇叭100個#n 已經送到您的背包中.");
			cm.gainItem(5390000 ,100);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 2: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5390000#怒火心情喇叭1000個#n 已經送到您的背包中.");
			cm.gainItem(5390000 ,1000);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 3: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5390001#白雲朵朵心情喇叭10個#n 已經送到您的背包中.");
			cm.gainItem(5390001 ,10);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 4: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5390001#白雲朵朵心情喇叭100個#n 已經送到您的背包中.");
			cm.gainItem(5390001 ,100);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 5: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5390001#白雲朵朵心情喇叭1000個#n 已經送到您的背包中.");
			cm.gainItem(5390001 ,1000);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 6: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5390002#戀愛心情喇叭10個#n 已經送到您的背包中.");
			cm.gainItem(5390002 ,10);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 7: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5390002#戀愛心情喇叭100個#n 已經送到您的背包中.");
			cm.gainItem(5390002 ,100);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 8: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5390002#戀愛心情喇叭1000個#n 已經送到您的背包中.");
			cm.gainItem(5390002 ,1000);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 9: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5076000#道具喇叭10個#n 已經送到您的背包中.");
			cm.gainItem(5076000 ,10);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 10: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5076000#道具喇叭100個#n 已經送到您的背包中.");
			cm.gainItem(5076000 ,100);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 11: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5076000#道具喇叭1000個#n 已經送到您的背包中.");
			cm.gainItem(5076000 ,1000);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連1楓幣都沒有阿！");
			cm.dispose();
			}
		break;
		case 12: 
			if(cm.getMeso() >= 1){
			cm.sendOk("謝謝您, #e#i5050000#能力回復捲100個#n 已經送到您的背包中.");
			cm.gainItem(5050000 ,100);
			cm.gainMeso(-100);
			cm.dispose();
			}else{
			cm.sendOk("什麼阿！你連100楓幣都沒有阿！");
			cm.dispose();
			}
		break;
			}
		}