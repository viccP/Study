/*   By:MaplesKing
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
					   Matthias Butz <matze@odinms.de>
					   Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Phil
	Warp NPC
	- Lith Harbour
*/

var status = 0;
var maps = Array(802000200, 802000111, 802000400, 802000600);
var mapsname = Array("�x���X2100�~(���|�[���S)", "�L�W�]�~", "���X2102�~(������)", "�Xĥ�X2102�~(�����s��)");
var cost = Array(12000, 12000, 12000, 10000);
var costBeginner = Array(1200, 1200, 1200, 1000);
var selectedMap = -1;
var job;

importPackage(net.sf.odinms.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("�Ʊ�A������U�ڭ�,�@�ϪF��,�@�Ϥ饻,�@�ϥ��@��!");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		}
		else {
			status--;
		}
		if (status == 0) {
			cm.sendNext("�z�n,�ڬO�ѹڤH,�o�̬O#b���ӪF��#k �۫H�z�]�ݨ�F,�o��P�H�e�ۤ�t�Z��b�Ӥj�F!");
		} else if (status == 1) {
			cm.sendNextPrev("�گ���]�k�N�A���ʨ쥼�Ӫ��ɥ����h,�Ʊ�z����ɤO���������ǻs�@��}�������H�P�Z�J,�@�Ͼ�Ӧa�y�a!")
		} else if (status == 2) {
			var selStr = "���Ǿ����H,�Z�J,���d��,�����O���˦n�S��,�бz�@�w�n�O��!.#b";
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
				for (var i = 0; i < maps.length; i++) {
					selStr += "\r\n#L" + i + "#" + mapsname[i] + "(" + costBeginner[i] + " ����)#l";
				}
			} else {
				for (var i = 0; i < maps.length; i++) {
					selStr += "\r\n#L" + i + "#" + mapsname[i] + "(" + cost[i] + " ����)#l";
				}
			}
			cm.sendSimple(selStr);
		} else if (status == 3) {
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
				if (cm.getMeso() < costBeginner[selection]) {
					cm.sendOk("�藍�_,�A�����I�X�z�@�w�������~�ಾ�ʨ쥼�Ӫ�,���ä��O���ڦӬO���i�ɶ��x����!")
					cm.dispose();
				} else {
					cm.sendYesNo("�A�S�������d�b�o�̪��F?�A�u���n�h " + mapsname[selection] + "��?");
					selectedMap = selection;
				}
			}
			else {
				if (cm.getMeso() < cost[selection]) {
					cm.sendOk("�藍�_,�A�����I�X�z�@�w�������~�ಾ�ʨ쥼�Ӫ�,���ä��O���ڦӬO���i�ɶ��x����!")
					cm.dispose();
				} else {
					cm.sendYesNo("��,�ɶ������������},�z�����v�]�b�v������.");
					selectedMap = selection;
				}
			}		
		} else if (status == 4) {
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
				cm.gainMeso(-costBeginner[selectedMap]);
			}
			else {
				cm.gainMeso(-cost[selectedMap]);
			}
			cm.warp(maps[selectedMap], 0);
			cm.dispose();
		}
	}
}	