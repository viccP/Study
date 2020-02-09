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
//Gachaphon
var ids = [2370000,2370001,2370002,2370003,2370004,2370005,2370006,2370007,2370008,2370009,2370010,2370011,2370012];
var status = 0;

function start() {
    if (cm.haveItem(4032733)) {
        cm.gainItem(4032733, -1);
        cm.processGachapon(ids, true);
        cm.dispose();
    } else if (cm.haveItem(4032733))
        cm.sendYesNo("你沒有#i4032733##t4032733#?");
    else {
        cm.sendSimple("你沒有#i4032733##t4032733#\r\n #L1#你沒有#i4032733##t4032733##l\r\n #L2#你沒有#i4032733##t4032733##l");
    }
}

function action(mode, type, selection){
    if (mode == 1 && cm.haveItem(4032733)) {
        cm.processGachapon(ids, false);
        cm.dispose();
    } else {
        if (mode > 0) {
            status++;
            if (selection == 0) {
                cm.sendOk("你沒有#i4032733##t4032733#.");
            } else if (selection == 1) {
                cm.sendNext("你沒有#i4032733##t4032733#.");
                cm.dispose();
            } else if (status == 2) {
                cm.sendNext("你沒有#i4032733##t4032733#");
                cm.dispose();
            }
        }
    }
}