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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Pison - Florina Beach(110000000)
-- By ---------------------------------------------------------------------------------------------
	Information & Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Add null map check [Xterminator]
	1.0 - First Version
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.cherry.server.maps);
var status = 0;
var returnmap;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendNext("��������������Щ�»�û�а��������ƣ����ʱ����ƽ�̲��Ϣ����һ��Ҳ����");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			returnmap = cm.getChar().getSavedLocation(SavedLocationType.FLORINA);
			if (returnmap == -1) {
				returnmap = 104000000;
			}
			cm.sendNext("��#b#m110000000##k��û�����������?�������Ҫ�Ļ���������ȥ#b#m"+returnmap+"##k�ɣ�");
		} else if (status == 1) {
			cm.sendYesNo("���#b#m"+returnmap+"##k�𣿺�~������׼�������ɡ��ǡ���������ȥ#m"+returnmap+"#��")
		} else if (status == 2) {
			cm.warp(returnmap);
			cm.dispose();
		}
	}
}
