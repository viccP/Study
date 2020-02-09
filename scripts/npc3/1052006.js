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
			cm.sendNext("一旦你买了票进入前提。我听说在到处但最终有奇怪的装置，稀有珍贵物品等待着你。让我知道如果你愿意改变你的想法.");
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
				cm.sendNext("你等级不足20级。进去干嘛。送死吗");
				cm.dispose();
			} else {
				var selStr = "你是否想购买一张地铁票然后完成指定事件?#b";
				for (var i = 0; i < 3; i++) {
					if (level >= 20 && level <= 29) {
						selStr += "\r\n#L" + i + "##b地铁 B" + (i + 1) + "#l";
						break;
					} else if (level >= 30 && level <= 39 && i < 2) {
						selStr += "\r\n#L" + i + "##b地铁 B" + (i + 1) + "#l";
					} else if (level >= 40) {
						selStr += "\r\n#L" + i + "##b地铁 B" + (i + 1) + "#l";
					}
				}
				cm.sendSimple(selStr);
			}
		} else if (status == 1) {
			sel = selection;
			show = sel + 1;
			cm.sendYesNo("你是否想购买 #b地铁B" + show + "#k? 将花费你 " + meso[sel] + " 冒险币.");
		} else if (status == 2) {
			if (cm.getPlayer().getMeso() < meso || !cm.canHold(item[sel])) {
				cm.sendNext("你的冒险币不足啊~");
				cm.dispose();
			} else {
				var text = Array("好了，你已经购买了票了。在我旁边那个柜子可以让你进入。");
				cm.gainMeso(-meso[sel]);
				cm.gainItem(item[sel], 1);
				cm.sendNext("GO~. " + text[sel]);
				cm.dispose();
			}
		}
	}
}
