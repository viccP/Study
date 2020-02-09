/*
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
 function enter(pi) {
    if (pi.haveItem(4031870) && pi.getPlayer().getSkillLevel(5121010) <= 0) {
        pi.warp(922020300, 0);
        return true;
    }
/*    if (!pi.haveItem(4031172)) {
        return false;
    }*/
    if (pi.getPlayerCount(220080001) <= 0) { // Papu Map
        var papuMap = pi.getMap(220080001);

        papuMap.resetFully();
		pi.getPlayer().setbosslog(1);
        pi.playPortalSE();
        pi.warp(220080001, "st00");
        return true;
    } else {
        if (pi.getMap(220080001).getSpeedRunStart() == 0 && (pi.getMonsterCount(220080001) <= 0 || pi.getMap(220080001).isDisconnected(pi.getPlayer().getId()))) {
            pi.playPortalSE();
			pi.getPlayer().setbosslog(1);
            pi.warp(220080001, "st00");
            return true;
        } else {
            pi.playerMessage(5, "对抗闹钟BOSS的挑战已经开始了，你不能进入到里面。");
            return false;
        }
 }
 }
/*function enter(pi) {
    var papuMap = pi.getClient().getChannelServer().getMapFactory().getMap(220080001);
    if (papuMap.getCharacters().size() == 0) {
        pi.getPlayer().dropMessage("The room is empty. A perfect opportunity to challenge the boss.");
        papuMap.resetReactors();
    } else { // someone is inside
        for (var i = 0; i < 3; i++) {
            if (papuMap.getMonsterById(8500000 + i) != null) {
                pi.getPlayer().dropMessage("Someone is fighting Papulatus.");
                return false;
            }
        }
    }
    pi.warp(220080001, "st00");
    return true;
}*/