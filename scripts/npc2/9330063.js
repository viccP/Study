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
var ids = [2040006,2040007,2040303,2040506,2340000,2040507,2040709, 2040710, 2040711, 2040806, 2040807, 2040903, 2041024, 2041025, 2043003, 2043103, 2043203, 2043303, 2043703, 2043803, 2044003, 2044103, 2044203, 2044303, 2044403, 2044503, 2044603, 2044703, 1112915, 2041120, 2041121, 2041122, 2041123, 2041124, 2041125, 2041126, 2041127, 1122023, 4032246, 4032246, 4001226, 4001227, 4001228, 4001229, 4001230, 4032202, 4031722, 2049100, 1452063, 1452064, 1302108, 1302109, 1372047, 1372048, 1332083, 1332082, 1372079, 1382063, 1382064, 1402054, 1402055, 1432051, 1432062, 1482035, 1482036, 1492031, 1102041, 1102084, 1302020, 1302030, 1302064, 1332025, 1332055, 1332056, 1372034, 1382009, 1382012, 1382039, 1402039, 1432012, 1432040, 1452016, 1452022, 1452045, 1472030, 1472032, 1472055, 1482020, 1482021, 1482022, 1492020, 1492021, 1492022, 1022067, 2044910, 2044815, 1052187, 1052188, 1052189, 1052190, 1372035, 1372036, 1372037, 1372038, 1002153, 1050068, 1382003, 1382006, 1050055, 1051031, 1050025, 1002155, 1002245, 1452004, 1452023, 1060057, 1040071, 1002137, 1462009, 1452017, 1040025, 1041027, 1452005, 1452007, 1061057, 1472006, 1472019, 1060084, 1472028, 1002179, 1082074, 1332015, 1432001, 1060071, 1472007, 1472002, 1051009, 1061037, 1332016, 1332034, 1472020, 1102084, 1102086, 1102042, 1032026, 1082149, 1302143, 1312058, 1322086, 1332116, 1332121, 1372074, 1382095, 1402086, 1412058, 1422059, 1432077, 1442107, 1452102, 1462087, 1472113, 1482075, 1492075,1472078,1472079, 1492079, 1482079, 1472117, 1462091, 1452106, 1442111, 1432081, 1422063, 1412062, 1402090, 1382099, 1372078, 1332125, 1332120, 1322090, 1312062, 1302147];
var status = 0;

function start() {
    if (cm.haveItem(5220000)) {
        cm.gainItem(5220000, -1);
        cm.processGachapon(ids, true);
        cm.dispose();
    } else if (cm.haveItem(5220000))
        cm.sendYesNo("你沒有#i5220000##t5220000#?");
    else {
        cm.sendSimple("你沒有#i5220000##t5220000#\r\n #L1#你沒有#i5220000##t5220000##l\r\n #L2#你沒有#i5220000##t5220000##l");
    }
}

function action(mode, type, selection){
    if (mode == 1 && cm.haveItem(5220000)) {
        cm.processGachapon(ids, false);
        cm.dispose();
    } else {
        if (mode > 0) {
            status++;
            if (selection == 0) {
                cm.sendOk("你沒有#i5220000##t5220000#.");
            } else if (selection == 1) {
                cm.sendNext("你沒有#i5220000##t5220000#.");
                cm.dispose();
            } else if (status == 2) {
                cm.sendNext("你沒有#i5220000##t5220000#");
                cm.dispose();
            }
        }
    }
}