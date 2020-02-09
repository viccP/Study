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
	cm.sendSimple ("�z�n�A�ڬO�������ߧI���� ���e�p�U~#k\r\n#k#L0##d#i1122024#�C�h��#i4001226#1��+#i1122023##k\r\n#k#L1##d#i1122025#�k�v��#i4001227#1��+#i1122023##k\r\n#k#L2##d#i1122026#�}���#i4001228#1��+#i1122023##k\r\n#k#L3##d#i1122027#�s���#i4001229#1��+#i1122023##k\r\n#k#L4##d#i1122028#���s��#i4001230#1��+#i1122023##k\r\n#l\r\n#g===================#k#d���j�@�U#k#g===================#k\r\n#k#L5##d#i1122029#�C�h��#i4001226#2��+#i1122023##k\r\n#k#L6##d#i1122030#�k�v��#i4001227#2��+#i1122023##k\r\n#k#L7##d#i1122031#�}���#i4001228#2��+#i1122023##k\r\n#k#L8##d#i1122032#�s���#i4001229#2��+#i1122023##k\r\n#k#L9##d#i1122033#���s��#i4001230#2��+#i1122023##k#k\r\n#l\r\n#g===================#k#d���j�@�U#k#g===================#k\r\n#k#L10##d#i1122034#�C�h��#i4001226#3��+#i1122023##k\r\n#k#L11##d#i1122035#�k�v��#i4001227#3��+#i1122023##k\r\n#k#L12##d#i1122036#�}���#i4001228#3��+#i1122023##k\r\n#k#L13##d#i1122037#�s���#i4001229#3��+#i1122023##k\r\n#k#L14##d#i1122038#���s��#i4001230#3��+#i1122023#")}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){ 
		case 0:
			if (cm.haveItem(4001226 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001226 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122024); 
			cm.sendOk("#roH�I#n �A��#i4001226#1�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001226#1�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 1:
			if (cm.haveItem(4001227 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001227 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122025); 
			cm.sendOk("#roH�I#n �A��#i4001227#1�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001227#1�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 2: 
			if (cm.haveItem(4001228 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001228 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122026); 
			cm.sendOk("#roH�I#n �A��#i4001228#1�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001228#1�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 3:
			if (cm.haveItem(4001229 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001229 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122027); 
			cm.sendOk("#roH�I#n �A��#i4001229#1�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001229#1�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 4:
			if (cm.haveItem(4001230 ,1) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001230 ,-1);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122028); 
			cm.sendOk("#roH�I#n �A��#i4001230#1�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001230#1�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 5:
			if (cm.haveItem(4001226 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001226 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122029); 
			cm.sendOk("#roH�I#n �A��#i4001226#2�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001226#2�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 6:
			if (cm.haveItem(4001227 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001227 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122030); 
			cm.sendOk("#roH�I#n �A��#i4001227#2�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001227#2�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 7:
			if (cm.haveItem(4001228 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001228 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122031); 
			cm.sendOk("#roH�I#n �A��#i4001228#2�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001228#2�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 8:
			if (cm.haveItem(4001229 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001229 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122032); 
			cm.sendOk("#roH�I#n �A��#i4001229#2�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001229#2�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 9:
			if (cm.haveItem(4001230 ,2) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001230 ,-2);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122033); 
			cm.sendOk("#roH�I#n �A��#i4001230#2�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001230#2�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 10:
			if (cm.haveItem(4001226 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001226 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122034); 
			cm.sendOk("#roH�I#n �A��#i4001226#3�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001226#3�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 11:
			if (cm.haveItem(4001227 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001227 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122035); 
			cm.sendOk("#roH�I#n �A��#i4001227#3�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001227#3�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 12:
			if (cm.haveItem(4001228 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001228 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122036); 
			cm.sendOk("#roH�I#n �A��#i4001228#3�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001228#3�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 13:
			if (cm.haveItem(4001229 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001229 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122037); 
			cm.sendOk("#roH�I#n �A��#i4001229#3�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001229#3�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 14:
			if (cm.haveItem(4001230 ,3) ==  true &&cm.haveItem(1122023 ,1) == true) {
			cm.gainItem(4001230 ,-3);
                        cm.gainItem(1122023 ,-1);
			cm.addRandomItem(1122038); 
			cm.sendOk("#roH�I#n �A��#i4001230#3�өM#i1122023#�C!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4001230#3�өM#i1122023#,�u�a!");
		        cm.dispose();
			}
		break;
		case 15:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044303 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 16:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044403 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 17:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044503 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 18:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044603 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 19:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2044703 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 20:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2040709 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 21:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2040710 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 22:
			if (cm.haveItem(4001226 ,1000) ==  true &&cm.haveItem(4001226 ,1) == true) {
			cm.gainItem(4001226 ,-1000);
			cm.gainItem(2040711 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}

			}
		}