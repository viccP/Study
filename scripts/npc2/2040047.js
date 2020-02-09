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
-- Odin JavaScript --------------------------------------------------------------------------
	Sgt. Anderson - LudiPQ Exit NPC
-- By --------------------------------------------------------------------------------------------
	xQuasar
-- Version Info -------------------------------------------------------------------------------
	1.0 - First Version by xQuasar
---------------------------------------------------------------------------------------------------
**/

var status;

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (cm.getMapId() != 922010000) {
		if (status == -1) {
			status = 0;
			cm.sendYesNo("你確定要離開 #r組對任務#k ? 你將會重新再來唷.");
		} else if (status == 0 && mode == 1) {
			var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
			if (eim == null) {
				cm.warp(922010000); // Warp player
			} else if (cm.isLeader()) {
				eim.disbandParty();
				var em = cm.getEventManager("LudiPQ");
				em.setProperty("entryPossible", "true");
				eim.dispose();
			} else {
				eim.leftParty(cm.getChar());
				cm.dispose();
			}
		} else {
			cm.sendOk("Keep trying!");
			cm.dispose();
		}
	} else {
		if (status == 2) {
			if (cm.haveItem(4001022)) {
				cm.removeAll(4001022);
			}
			if (cm.haveItem(4001023)) {
				cm.removeAll(4001023);
			}
			cm.warp(221024500,0);
			cm.dispose();
		} else {
			status = 2;
			cm.sendOk("下次再見.");
		}
	}
}