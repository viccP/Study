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
	cm.sendOk ("以下為 劍士類所有技能書 掉落怪物\r\n#b楓葉祝福20 怪物：闇黑龍王\r\n#r楓葉祝福30 怪物:皮卡啾\r\n#b絕對引力20 怪物:幼龍保護者、海怒斯、洞穴幼年龍\r\n#r絕對引力30 怪物:海怒斯\r\n#b武神防禦20 怪物:化石龍長老、泰勒熊、娃娃獅王\r\n#r武神防禦30 怪物:噴火龍\r\n#b究極突刺20 怪物:海怒斯、雙刀龍戰士\r\n#r究極突刺30 怪物:海怒斯\r\n#b格擋20 怪物:拉圖斯、悔恨的守護隊長、雙刀龍戰士\r\n#r格擋30 怪物:悔恨的守護兵、殘暴炎魔\r\n#b進階鬥氣20 怪物:幼龍保護者\r\n#r進階鬥氣30 怪物:化石龍長老\r\n#b無雙劍舞20 怪物:黑翼龍\r\n#r無雙劍舞30 怪物:拉圖斯\r\n#b騎士衝擊波20 怪物:化石龍\r\n#r騎士衝擊波30 怪物:拉圖斯、萊伊卡\r\n#b究極神盾20 怪物:化石龍\r\n#r究極神盾30 怪物:噴火龍、泰勒熊、娃娃獅王\r\n#b鬥氣爆發20 怪物:殘暴炎魔、洞穴幼年龍\r\n#r鬥氣爆發30 怪物:闇黑龍王\r\n#b聖靈之劍20 怪物:幼龍保護者、多多、格瑞芬多\r\n#b聖靈之棍20 怪物:多多、格瑞芬多、黑翼龍\r\n#b鬼神之擊20 怪物:殘暴炎魔\r\n#r鬼神之擊30 怪物:闇黑龍王\r\n#b黑暗力量20 怪物:殘暴炎魔、泰勒熊、娃娃獅王\r\n#r黑暗力量30 怪物:闇黑龍王")
		}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
}
}
