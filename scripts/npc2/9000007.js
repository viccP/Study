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

/*
======>OdinMS NX Npc<======
by [GM]Fatality of FusionMS
*/
function start() {
	cm.sendSimple ("#e#r#h ##k�������Ǻ���רҵ����꣬��ӭѡ����ѡ���������.#r�۸��е��.���½�.��ֹ�������.����ð�յ��gӭ��.#k\r\n#L0##r#n���Iװ��.���ӵ���#i02330000##i02330001##i02330002##i02330003##i02330004##i02330005##l\r\n#L1##r���Iװ��.��ñ�ӡ�#i01002637##i01002640##i01002643##i01002646##i01002649##l\r\n#L2##r���Iװ��.��Ь�ӡ�#i01072306##i01072309##i01072312##i01072315##i01072318##i01072321##l\r\n#L3##r���Iװ��.���׷���#i01052119##i01052122##i01052125##i01052128##i01052131##i01052134##l\r\n#L4##r���Iװ��.�����ס�#i01082201##i01082204##i01082207##i01082210##i01082213##i01082216##l\r\n#L5##r���Iװ��.����ǹ��#i01492008##i01492010##i01492011##i01492012##i01492013##l\r\n#L6##r���Iװ��.��ָ�ڡ�#i01482010##i01482011##i01482012##i01482013##i01482023##l");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		cm.openShop (1424);
	} else if (selection == 1) {
		cm.openShop (1425);
	} else if (selection == 2) {
		cm.openShop (1426);
	} else if (selection == 3) {
		cm.openShop (1427);
	} else if (selection == 4) {
		cm.openShop (1428);
	} else if (selection == 5) {
		cm.openShop (1429);
	} else if (selection == 6) {
		cm.openShop (1429);
	} else if (selection == 9) {
		cm.openShop (1420);
	} else if (selection == 8) {
		cm.openShop (1421);
	} else if (selection == 7) {
		cm.openShop (1423);
	} else if (selection == 10) {
		cm.openShop (1422);
	} else if (selection == 11) {
		cm.openShop (1432);
	} else if (selection == 12) {
		cm.openShop (1431);
	} else {
		cm.dispose();
	}
}