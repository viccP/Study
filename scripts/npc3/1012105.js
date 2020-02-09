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

/* Ms. Tan 
	Henesys Skin Change.
*/
var status = 0;
var price = 1000000;
var skin = Array(1, 2, 3, 4, 9, 10);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("��ӭ���٣���ӭ�����������ִ廤�����ġ����ǲ���ϣ��ӵ������һ�������������ļ����أ��������#b#t5153000##k���ǿ���Ϊ�㾫�Ļ����������������ǵ���������ô��Ҫ��Ҫ��һ�ԣ�\r\n\#L2##b�ı��ɫ#k(ʹ��#b���ִ廤����Ա��#k)#l");
		} else if (status == 1) {
			if (selection == 1) {
				cm.dispose();
			} else if (selection == 2) {
				cm.sendStyle("���������⿪���Ļ����ɲ鿴�������Ч���ޣ��뻻��ʲô����Ƥ���أ���ѡ��~", skin, 5153000);
			}
		} else if (status == 2) {
			cm.dispose();
			if (cm.isCash()) {
                            if (cm.getPlayer().getCSPoints(1)>=480) {
                                  cm.getPlayer().modifyCSPoints(1,-480);
				  cm.setSkin(skin[selection]);
				  cm.sendOk("�����,����������̾����·�ɫ��!");
			    } else {
				  cm.sendOk("�������㲢û�����ǵĻ�Ա��,�ҿ��²��ܸ��㻤��,�Һܱ�Ǹ.�����ȹ����.");
			    }
                        } else if (cm.haveItem(5153000) == true) {
				cm.gainItem(5153000, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("�����,����������̾����·�ɫ��!");
			} else {
				cm.sendOk("�������㲢û�����ǵĻ�Ա��,�ҿ��²��ܸ��㻤��,�Һܱ�Ǹ.�����ȹ����.");
			}
		}
	}
}
