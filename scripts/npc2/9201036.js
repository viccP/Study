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
	cm.sendSimple ("您好，我是寵物發放員 你要哪隻?~#k\r\n#k#L0##d#i5000000##k#k#L1##d#i5000001##k#k#L2##d#i5000002##k#k#L3##d#i5000003##k#k#L4##d#i5000004##k#k#L5##d#i5000005##k#k\r\n#L6##d#i5000006##k#k#L7##d#i5000007##k#k#L8##d#i5000008##k#k#L9##d#i5000009##k#k#L10##d#i5000010##k#k#L11##d#i5000011##k#k\r\n#L12##d#i5000012##k#k#L13##d#i5000013##k#k#L14##d#i5000014##k#k#L15##d#i5000016##k#k#L16##d#i5000017##k#k#L17##d#i5000018##k#k\r\n#L18##d#i5000020##k#k#L19##d#i5000021##k#k#L20##d#i5000022##k#k#L21##d#i5000023##k#k#L22##d#i5000024##k#k#L23##d#i5000025##k#k\r\n#L24##d#i5000026##k#k#L25##d#i5000027##k#k#L26##d#i5000029##k#k#L27##d#i5000030##k#k#L28##d#i5000031##k#k#L29##d#i5000032##k#k\r\n#L30##d#i5000033##k#k#L31##d#i5000036##k#k#L32##d#i5000041##k#k#L33##d#i5000048##k#k#L34##d#i5000049##k#k#L35##d#i5000050##k#k\r\n#L36##d#i5000051##k#k#L37##d#i5000052##k#k#L38##d#i5000053##k#k#L39##d#i5000058##k#k#L40##d#i5000054##k#k#L41##d#i5000046##k#k\r\n#L42##d#i5000043#")}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){ 
		case 0:
			cm.gainItem(5000000 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 1:
			cm.gainItem(5000001 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 2: 
			cm.gainItem(5000002 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 3:
			cm.gainItem(5000003 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 4:
			cm.gainItem(5000004 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 5:
			cm.gainItem(5000005 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 6:
			cm.gainItem(5000006 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 7:
			cm.gainItem(5000007 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 8:
			cm.gainItem(5000008 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 9:
			cm.gainItem(5000009 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 10:
			cm.gainItem(5000010 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 11:
			cm.gainItem(5000011 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 12:
			cm.gainItem(5000012 ,1);
			cm.sendOk("給你寵物了!");
		case 13:
			cm.gainItem(5000013 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 14:
			cm.gainItem(5000014 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 15:
			cm.gainItem(5000016 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 16:
			cm.gainItem(5000017 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 17:
			cm.gainItem(5000018 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 18:
			cm.gainItem(5000020 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 19:
			cm.gainItem(5000021 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 20:
			cm.gainItem(5000022 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 21:
			cm.gainItem(5000023 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 22:
			cm.gainItem(5000024 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 23:
			cm.gainItem(5000025 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 24:
			cm.gainItem(5000026 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 25:
			cm.gainItem(5000027 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 26:
			cm.gainItem(5000029 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 27:
			cm.gainItem(5000030 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 28:
			cm.gainItem(5000031 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 29:
			cm.gainItem(5000032 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 30:
			cm.gainItem(5000033 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 31:
			cm.gainItem(5000036 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 32:
			cm.gainItem(5000041 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 33:
			cm.gainItem(5000048 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 34:
			cm.gainItem(5000049 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 35:
			cm.gainItem(5000050 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 36:
			cm.gainItem(5000051 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 37:
			cm.gainItem(5000052 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 38:
			cm.gainItem(5000053 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 39:
			cm.gainItem(5000058 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 40:
			cm.gainItem(5000054 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 41:
			cm.gainItem(5000046 ,1);
			cm.sendOk("給你寵物了!");
		break;
		case 42:
			cm.gainItem(5000043 ,1);
			cm.sendOk("給你寵物了!");
		break;



			}
		}