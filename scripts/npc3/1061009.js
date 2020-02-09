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
	El Nath Magic Spot - Orbis Tower <20th Floor>(200080200)
-- By ---------------------------------------------------------------------------------------------
	Unknown
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Official Text and Method [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 0) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		    if (cm.getLevel() > 119 ) {  
			cm.sendYesNo("����ﳾ��ǧ���ħ���ż�����һ��������а���ħ������ʴ�����Ľ�磬��ʿ�Ǳ��������ǣ����ƽ��֮ǰ�������ǡ���Ը��ȥ�������𼴽����ƽ���ħ����\r\n#dʣ��:#r" + cm.getzb() + "Ԫ��");
		} else {
			cm.sendOk("��ս糺���ʿ����Ҫ120�����ϡ�糺���ʿ�ű�糺�װ�����ͱسɾ��ᣬһЩϡ�е���Ʒ��");
			cm.dispose();
		}
	}
	if (status == 1) {
			cm.warp(803001200,0);
			cm.dispose();
	}
}
