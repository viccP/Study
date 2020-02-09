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
-- Odin JavaScript --------------------------------------------------------------------------------
	Lakelis - Victoria Road: Kerning City (103000000)
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

var status;
var minLevel = 10;
var maxLevel = 255;
var minPlayers = 3;
var maxPlayers = 6;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
	
    if (status == 0) {
        // Lakelis has no preamble, directly checks if you're in a party
        if (cm.getParty() == null) { // No Party
            cm.sendOk("你好，你想和你所在的組隊成員一起接受這個特別的任務嗎 組隊成員之間沒有良好的配合，是很難完成任務的喔！ 如果你想挑戰任務證明自己的隊伍是很強大的\r\n那麼請 #b你的組隊長#k 來告訴我！");
            cm.dispose();
        } else if (!cm.isLeader()) { // Not Party Leader
            cm.sendOk("如果你想挑戰一下自己, 那麼請 #b你的組隊長#k 來告訴我.");
            cm.dispose();
        } else {
            // Check if all party members are within Levels 21-30
            var party = cm.getParty().getMembers();
            var inMap = cm.partyMembersInMap();
            var levelValid = 0;
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel)
                    levelValid++;
            }
            if (inMap < minPlayers || inMap > maxPlayers) {
                cm.sendOk("你的隊伍人數不足 "+minPlayers+" 人. 請確認你的隊員是否準備好並且有資格參予這項組隊任務. 我察覺到有 #b" + inMap + "#k 人在墮落城市. 如果我有看錯, #b請先登出再登入,#k或者重新組隊.");
				cm.dispose();
			} else if (levelValid != inMap) {
				cm.sendOk("請確認你的隊員是否準備好並且有資格參予這項組隊任務. 這項組隊任務玩家等級範圍必須再 "+minLevel+" 到 "+maxLevel+" 之間. 我察覺到 #b" + levelValid + "#k 人在這個範圍. 如果我有看錯, #b請先登出再登入,#k或者重新組隊.");
				cm.dispose();
			} else {
                var em = cm.getEventManager("KerningPQ");
                if (em == null) {
                    cm.sendOk("目前組隊任務沒有開放.");
                } else if (em.getProperty("KPQOpen").equals("true")) {
                    // Begin the PQ.
                    em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                    // Remove Passes and Coupons
                    party = cm.getChar().getEventInstance().getPlayers();
                    cm.removeFromParty(4001008, party);
                    cm.removeFromParty(4001007, party);
					em.setProperty("KPQOpen" , "false");
                } else {
                    cm.sendNext("目前有其他隊伍進行中. 請稍候 !");
                }
				cm.dispose();
            }
        }
    }
}