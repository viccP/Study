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
	cm.sendSimple ("�z�n�A�ڬO77���u�����Z���I���� ���e�p�U~#k\r\n#k#L0##d#i1302142#77�����C��#i4000313#1000��+#i1302064#64��#k\r\n#k#L1##d#i1332114#77���u�M��#i4000313#1000��+#i1332055#64��#k\r\n#k#L2##d#i1332114#77���u�M��#i4000313#1000��+#i1332056#64��#k\r\n#k#L3##d#i1382093#77��������#i4000313#1000��+#i1382039#64��#k\r\n#k#L4##d#i1372071#77���u����#i4000313#1000��+#i1372034#64��#k\r\n#k#L5##d#i1402085#77������C��#i4000313#1000��+#i1402039#64��#k\r\n#k#L6##d#i1432075#77���j��#i4000313#1000��+#i1432040#64��#k\r\n#k#L7##d#i1452100#77���}��#i4000313#1000��+#i1452045#64��#k\r\n#k#L8##d#i1472111#77�����M��#i4000313#1000��+#i1472055#64��#k\r\n#k#L9##d#i1482073#77�������#i4000313#1000��+#i1482022#64��#k\r\n#k#L10##d#i1492073#77�����j��#i4000313#1000��+#i1492022#64��")}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){ 
		case 0:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1302064 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1302064 ,-1);
			cm.addRandomItem(1302142); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1302064#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1302064#,�u�a!");
		        cm.dispose();
			}
		break;
		case 1:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1332055 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1332055 ,-1);
			cm.addRandomItem(1332114); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1332055#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1332055#,�u�a!");
		        cm.dispose();
			}
		break;
		case 2: 
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1332056 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1332056 ,-1);
			cm.addRandomItem(1332114); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1332056#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1332056#,�u�a!");
		        cm.dispose();
			}
		break;
		case 3:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1382039 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1382039 ,-1);
			cm.addRandomItem(1382093); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1382039#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1382039#,�u�a!");
		        cm.dispose();
			}
		break;
		case 4:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1372034 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1372034 ,-1);
			cm.addRandomItem(1372071); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1372034#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1372034#,�u�a!");
		        cm.dispose();
			}
		break;
		case 5:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1402039 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1402039 ,-1);
			cm.addRandomItem(1402085); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1402039#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1402039#,�u�a!");
		        cm.dispose();
			}
		break;
		case 6:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1432040 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1432040 ,-1);
			cm.addRandomItem(1432075); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1432040#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1432040#,�u�a!");
		        cm.dispose();
			}
		break;
		case 7:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1452045 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1452045 ,-1);
			cm.addRandomItem(1452100); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1452045#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1452045#,�u�a!");
		        cm.dispose();
			}
		break;
		case 8:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1472055 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1472055 ,-1);
			cm.addRandomItem(1472111); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1472055#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1472055#,�u�a!");
		        cm.dispose();
			}
		break;
		case 9:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1482022 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1482022 ,-1);
			cm.addRandomItem(1482073); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1482022#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1482022#,�u�a!");
		        cm.dispose();
			}
		break;
		case 10:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(1492022 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
                        cm.gainItem(1492022 ,-1);
			cm.addRandomItem(1492073); 
			cm.sendOk("#roH�I#n �A��#i4000313#1000�өM#i1492022#�C!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4000313#1000�өM#i1492022#,�u�a!");
		        cm.dispose();
			}
		break;
		case 11:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2043803 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 12:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2044003 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 13:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2044103 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 14:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2044203 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 15:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2044303 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 16:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2044403 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 17:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2044503 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 18:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2044603 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 19:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2044703 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 20:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2040709 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 21:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.gainItem(2040710 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}
		break;
		case 22:
			if (cm.haveItem(4000313 ,1000) ==  true &&cm.haveItem(4000313 ,1) == true) {
			cm.gainItem(4000313 ,-1000);
			cm.addRandomItem(2040711 ,1); 
			cm.sendOk("#roH�I#n �A��#i4031454#10�ӭC!�n�a�ڴN���A�s�@�a!");
 
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031454#10��,�u�a!");
		        cm.dispose();
			}

			}
		}