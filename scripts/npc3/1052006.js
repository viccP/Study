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

/* Author: Xterminator
	NPC Name: 		Jake
	Map(s): 		Victoria Road : Subway Ticketing Booth (103000100)
	Description: 		Subway Worker
*/
var meso = Array(500, 1200, 2000);
var item = Array(4031036, 4031037, 4031038);
var sel;
var show;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		} else if (status == 1 && mode == 0) {
			cm.sendNext("һ��������Ʊ����ǰ�ᡣ����˵�ڵ�������������ֵ�װ�ã�ϡ�������Ʒ�ȴ����㡣����֪�������Ը��ı�����뷨.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var level = cm.getPlayer().getLevel();
			if (level <= 19) {
				cm.sendNext("��ȼ�����20������ȥ���������");
				cm.dispose();
			} else {
				var selStr = "���Ƿ��빺��һ�ŵ���ƱȻ�����ָ���¼�?#b";
				for (var i = 0; i < 3; i++) {
					if (level >= 20 && level <= 29) {
						selStr += "\r\n#L" + i + "##b���� B" + (i + 1) + "#l";
						break;
					} else if (level >= 30 && level <= 39 && i < 2) {
						selStr += "\r\n#L" + i + "##b���� B" + (i + 1) + "#l";
					} else if (level >= 40) {
						selStr += "\r\n#L" + i + "##b���� B" + (i + 1) + "#l";
					}
				}
				cm.sendSimple(selStr);
			}
		} else if (status == 1) {
			sel = selection;
			show = sel + 1;
			cm.sendYesNo("���Ƿ��빺�� #b����B" + show + "#k? �������� " + meso[sel] + " ð�ձ�.");
		} else if (status == 2) {
			if (cm.getPlayer().getMeso() < meso || !cm.canHold(item[sel])) {
				cm.sendNext("���ð�ձҲ��㰡~");
				cm.dispose();
			} else {
				var text = Array("���ˣ����Ѿ�������Ʊ�ˡ������Ա��Ǹ����ӿ���������롣");
				cm.gainMeso(-meso[sel]);
				cm.gainItem(item[sel], 1);
				cm.sendNext("GO~. " + text[sel]);
				cm.dispose();
			}
		}
	}
}
