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
/*
-- Odin JavaScript --------------------------------------------------------------------------------
	Carson - Magatia (GMS Like)
-- Version Info -----------------------------------------------------------------------------------
    1.1 - Shortened by Moogra
	1.0 - First Version by Maple4U
---------------------------------------------------------------------------------------------------
*/
function start() {
    cm.sendNext("来和我对话的？你已经对完了！换个频道就可以显示完成了！.");
    if(cm.getQuestStatus(6030) != 2){
	cm.forceCompleteQuest(6030);
	}
	cm.dispose();
}
