/*
	This file was written by "StellarAshes" <stellar_dust@hotmail.com> 
			as a part of the Guild package for
			the OdinMS Maple Story Server
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

var status = 0;
var sel;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			if (status == 0) {
				cm.dispose();
			} else {
				status--;
			}
		}
		if (status == 0) {
			cm.sendSimple("��ӭ�������幫�ݣ�����������ʲô��?\r\n#b#L0#��������#l\r\n#L1#��ɢ����#l\r\n#L2#���Ӽ����Ա��������#l#k");
		} else if (status == 1) {
			sel = selection;
			if (selection == 0) {
				if (cm.getPlayer().getGuildId() > 0) {
					cm.sendOk("���Ѿ�ӵ�м����ˣ������ٴ�������.");
					cm.dispose();
				} else {
					cm.sendYesNo("����һ���µļ�����Ҫ #b" + cm.getChar().guildCost() + " ���#k, ��ȷ����������һ���µļ�����");
				}
			} else if (selection == 1) {
				if (cm.getPlayer().getGuildId() <= 0) {
					cm.sendOk("�㻹û�м��壡");
					cm.dispose();
				} else if (cm.getPlayer().getGuildRank() != 1) {
					cm.sendOk("�㲻���峤������㲻�ܽ�ɢ�ü���.");
					cm.dispose();
				} else {
					cm.sendYesNo("��ȷ�����Ҫ��ɢ��ļ��壿����ɢ���㽫���ָܻ����м�����������Լ�GP����ֵ���Ƿ������");
				}
			} else if (selection == 2) {
				if (cm.getPlayer().getGuildId() <= 0 || cm.getPlayer().getGuildRank() != 1) {
					cm.sendOk("�㲻���峤������㽫�������Ӽ����Ա����������.");
					cm.dispose();
				} else {
					cm.sendYesNo("�����Ա����ÿ���� #b1#k λ��Ҫ֧�� #b" + cm.getChar().capacityCost() + " ���#k, ��ȷ��Ҫ������");
				}
			}
		} else if (status == 2) {
			if (sel == 0 && cm.getPlayer().getGuildId() <= 0) {
				cm.getPlayer().genericGuildMessage(1);
				cm.dispose();
			} else if (sel == 1 && cm.getPlayer().getGuildId() > 0 && cm.getPlayer().getGuildRank() == 1) {
				cm.getPlayer().disbandGuild();
				cm.dispose();
			} else if (sel == 2 && cm.getPlayer().getGuildId() > 0 && cm.getPlayer().getGuildRank() == 1) {
				cm.getPlayer().increaseGuildCapacity();
				cm.dispose();
			}
		}
	}
}