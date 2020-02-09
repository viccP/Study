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
var status;
var nx = Array(100, 1000, 10000, 100000);
var price = Array(100000, 1000000, 10000000, 100000000);

function start() {
	status = -1;
	action(1, 0, -1);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		if (status == 0 && mode == 0)
			cm.sendOk("You're ugly ! go away");
		cm.dispose();
		return;
	}
	
	if (cm.getPlayer().getMapId() == 200000000) {
		cm.getChar().getStorage().sendStorage(cm.getC(), 2010006);
		cm.dispose();
	} else {
		if (status == 0)
			cm.sendYesNo("�� ! �ڽ��I��. �p�n�R��? ?");
		else if (status == 1) {
			var text = "�A�n�����I��?#b\r\n";
			for (var i = 0; i < nx.length; i++)
				text += "\r\n#L"+i+"#"+nx[i]+" �I "+price[i]+" ��.#l";
			cm.sendSimple(text);
		} else if (status == 2) {
			if (cm.getMeso() >= price[selection]) {
				cm.gainMeso(-price[selection]);
				cm.modifyNx(nx[selection]);
				cm.sendNext("���p�o~..");
			} else {
				cm.sendOk("������ ! fuck you :P");
		}
		cm.dispose();
	}
}}