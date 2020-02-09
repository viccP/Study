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
	cm.sendSimple ("�z�n�A�ڬO#e#b�s�@NPC,���~�p�U~#k\r\n#k#L3##d#i2070019#��#i4032168#+#v4032170#+#k#v4032181#X500+#v2070006#"+
"\r\n#k#L4##d#i4032002#��#i4000460#+#v4000461#��+#k#v4000462#"+
"\r\n#k#L6##d#i4001126#30��#i4000313#300+#v4032733#300"+
"\r\n#k#L5##d#i4032056#��#i4005000#30+#v4005001#30+#k#v4005002#30+#k#v4005003#30+#k#v4005004#30+#k#i4001126#30+#k#i4001089#�֥d+#k5000W")}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){ 
		case 0:
			if (cm.haveItem(4031179 ,100) == true && cm.haveItem(4001017 ,100) == true) {
			cm.gainItem(4031179 ,-100);
			cm.gainItem(4001017 ,-100); 
			cm.gainItem(4001091 ,1);
			cm.sendOk("#roH�I#n�A��#v4001017#100��,#v4031179#100���C!�n�a�ڴN���A�s�@�a!");
			cm.serverNotice("�y���߰T���z�G���� "+ cm.getChar().getName() +" ���\�s�@�F��5���_��,�Q�n���i�H��L�R��");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#v4031179#100��,#v4001017#100��,�u�a!");
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
			cm.sendOk("#roH�I#n�A��#v4001087#,#v4001088#,#i4001089#,#i4001090#,#i4001091#�C!�n�a�ڴN���A�s�@�a!");
			cm.serverNotice("�y���߰T���z�G���� "+ cm.getChar().getName() +" ���\�s�@�F�����_��,�Q�n���i�H��L�R��");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#v4001087#,#v4001088#,#i4001089#,#i4001090#,#i4001091#,�u�a!");
		        cm.dispose();
			}
		break;
		case 2: 
			if (cm.haveItem(4031217 ,1) == true) {
			cm.gainItem(4031217 ,-1);
			cm.gainItem(4032202 ,1);
			cm.sendOk("#roH�I#n�A��#i4031217#1��C!�n�a�ڴN���A�s�@�a!");
			cm.serverNotice("�y���߰T���z�G���� "+ cm.getChar().getName() +" ���\�s�@�F�o�T���Q�n���i�H��L�R��");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#i4031217#1��,�u�a!");
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
			cm.sendOk("#roH�I#n�A��#v4032168#1��,#v4032170#1��,#i4032181#2500�өM#i2070006#1�խC!�n�a�ڴN���A�s�@�a!");
			cm.worldMessage("�y���߰T���z�G���� "+ cm.getChar().getName() +" ���\�s�@�F��̼C-�]�@��,�Q�n���i�H��L�R��");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#v4032168#1��,#v4032170#1��,#i4032181#2500�өM#i2070006#1��,�u�a!");
		        cm.dispose();
			}
		break;
		case 4:
			if (cm.haveItem(4000460 ,1) == true && cm.haveItem(4000461 ,1) == true && cm.haveItem(4000462 ,1) == true) {
			cm.gainItem(4000460 ,-1);
			cm.gainItem(4000461 ,-1); 
			cm.gainItem(4000462 ,-1);
			cm.gainItem(4032002 ,1);
			cm.sendOk("#roH�I#n�A��#v4000460#,#v4000461#�M#i4000462#�C!�n�a�ڴN���A�s�@�a!");
			cm.worldMessage("�y���߰T���z�G���� "+ cm.getChar().getName() +" ���\�s�@�F�V�P���y");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#v4000460#,#v4000461#�M#i4000462#,�u�a!");
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
			//cm.sendOk("#roH�I#n�A��#v4000038#1300��,#v4000313#1300�өM#i1012171#�C!�n�a�ڴN���A�s�@�a!");
			cm.worldMessage("�y���߰T���z�G���� "+ cm.getChar().getName() +" ���\�s�@�F��������");
		        cm.dispose();
			}else{
		        //cm.sendOk("�A�S��#v4000038#1300��,#v4000313#1300�өM#i1012171#,�u�a!");
		        cm.sendOk("�p���Ƥ�����~�h�ˬd�ݬ���!");
		        cm.dispose();
			}
		break;
		case 6:
			if (cm.haveItem(4000313 ,300) == true && cm.haveItem(4032733 ,300) == true) {
			cm.gainItem(4000313 ,-300);
			cm.gainItem(4032733 ,-300); 
			cm.gainItem(4001126 ,30);
			//cm.sendOk("#roH�I#n�A��#v4000038#1500��,#v4000313#1500�өM#i1012172#�C!�n�a�ڴN���A�s�@�a!");
			//cm.worldMessage("�y���߰T���z�G���� "+ cm.getChar().getName() +" ���\�s�@�F10�ӷ���,�Q�n���i�H��L�R��");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�һݧ��Ƥ���");
		        cm.dispose();
			}
		break;
		case 7:
			if (cm.haveItem(4000313 ,1800) == true && cm.haveItem(4000038 ,1800) == true && cm.haveItem(1012173 ,1) == true) {
			cm.gainItem(4000313 ,-1800);
			cm.gainItem(4000038 ,-1800); 
			cm.gainItem(1012173 ,-1);
			cm.gainItem(1012174 ,1);
			cm.sendOk("#roH�I#n�A��#v4000038#1800��,#v4000313#1800�өM#i1012173#�C!�n�a�ڴN���A�s�@�a!");
			cm.serverNotice("�y���߰T���z�G���� "+ cm.getChar().getName() +" ���\�s�@�F180����N����,�Q�n���i�H��L�R��");
		        cm.dispose();
			}else{
		        cm.sendOk("�A�S��#v4000038#1800��,#v4000313#1800�өM#i1012173#,�u�a!");
		        cm.dispose();
			}

			}
		}