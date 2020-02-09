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
var mapsname = Array("台場—2100年(貝魯加墨特)", "無名魔獸", "秋葉原—2102年(杜那斯)", "旗艦—2102年(尼貝龍根)");
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
			cm.sendOk("希望你能夠幫助我們,拯救東京,拯救日本,拯救全世界!");
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
			cm.sendNext("您好,我是解夢人,這裡是#b未來東京#k 相信您也看到了,這兒與以前相比差距實在太大了!");
		} else if (status == 1) {
			cm.sendNextPrev("我能用魔法將你移動到未來的時光中去,希望您能夠盡力消滅掉那些製作精良的機器人與坦克,拯救整個地球吧!")
		} else if (status == 2) {
			var selStr = "那些機器人,坦克,偵查機,都不是那樣好惹的,請您一定要保重!.#b";
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
				for (var i = 0; i < maps.length; i++) {
					selStr += "\r\n#L" + i + "#" + mapsname[i] + "(" + costBeginner[i] + " 金幣)#l";
				}
			} else {
				for (var i = 0; i < maps.length; i++) {
					selStr += "\r\n#L" + i + "#" + mapsname[i] + "(" + cost[i] + " 金幣)#l";
				}
			}
			cm.sendSimple(selStr);
		} else if (status == 3) {
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
				if (cm.getMeso() < costBeginner[selection]) {
					cm.sendOk("對不起,你必須付出您一定的金幣才能移動到未來的,錢並不是給我而是扔進時間漩渦當中!")
					cm.dispose();
				} else {
					cm.sendYesNo("你沒有什麼遺留在這裡的了?你真的要去 " + mapsname[selection] + "嗎?");
					selectedMap = selection;
				}
			}
			else {
				if (cm.getMeso() < cost[selection]) {
					cm.sendOk("對不起,你必須付出您一定的金幣才能移動到未來的,錢並不是給我而是扔進時間漩渦當中!")
					cm.dispose();
				} else {
					cm.sendYesNo("恩,時間之門漸漸打開,您的身影也在逐漸消失.");
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