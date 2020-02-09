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

/* Pison
	Warp NPC to Lith Harbor (104000000)
	located in Florina Beach (110000000)
*/

importPackage(net.sf.odinms.server.maps);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("那好吧,等你有膽量挑戰#r皮卡丘#k的時候再來找我吧！");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("你要進去挑戰#r皮卡丘#k嗎？我可以幫助你進去！");
		} else if (status == 1) {
			cm.sendNextPrev("那我送你進去 #b神的黃昏#k吧.")
		} else if (status == 2) {
			if (cm.getMeso() < 0) {
				cm.sendOk("你沒有忘記什麼東西吧.")
				cm.dispose();
			} else {
				cm.sendYesNo("你確定進入 #b神的黃昏#k? 好吧，我現在把你送進去，但願你能活著回來！");
			}
		} else if (status == 3) {
			map = 270050100;
            cm.worldMessage("[皮卡丘挑戰使者]玩家:" + cm.c.getPlayer().getName() + "   他/她:" + cm.c.getPlayer().getLevel() + "等 帶著絕招和人馬,開始挑戰皮卡啾!~~");
			cm.warp(map, 0);
			cm.dispose();
		}
	}
}