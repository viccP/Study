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

importPackage(java.lang);
importPackage(net.sf.cherry.server);

/* 
	Adobis
*/
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		if (status == 0) {
			if (cm.getSquadState(MapleSquadType.ZAKUM) == 0) {
				cm.sendSimple("���ڿ������������ӳ�\r\n#b#L1#����������ս�Ӷӳ�#l\r\n\#L2#�����һ�����#l");
			} else if (cm.getSquadState(MapleSquadType.ZAKUM) == 1) {
				if (cm.checkSquadLeader(MapleSquadType.ZAKUM)) {
					cm.sendSimple("������ʲô\r\n\r\n#L1#�鿴��ǰ��Ա#l\r\n#L2#�رն�Ա����#l\r\n#r#L3#��ʼ��ս#l");
                                        status = 19;
				} else if (cm.isSquadMember(MapleSquadType.ZAKUM)) {
					var noOfChars = cm.numSquadMembers(MapleSquadType.ZAKUM);
                                	var toSend = "The following members make up your squad:\r\n\r\n";
					for (var i = 1; i <= noOfChars; i++) {
						toSend += "#L";
						toSend += i;
						toSend += "# ";
						toSend += i;
						toSend += " - ";
						toSend += cm.getSquadMember(MapleSquadType.ZAKUM, i - 1).getName();
						toSend += "#l";
						/*toSend += "\r\n";*/
					}
					System.out.println(toSend);
					cm.sendOk(toSend);
					cm.dispose();
				} else {
					cm.sendSimple("���������ս����\r\n#b#L1#�ǵģ����Ѿ�׼������#l\r\n\#L2#�����һ�û׼����#l");
					status = 9;
				}
			} else {
				if (cm.checkSquadLeader(MapleSquadType.ZAKUM)) {
					cm.sendSimple("������ʲô\r\n\r\n#L1#�鿴��ǰ��Ա#l\r\n#L2#������Ա����#l\r\n#L3#��ʼ��ս#l");
                                        status = 19;
				} else if (cm.isSquadMember(MapleSquadType.ZAKUM)) {
					var noOfChars = cm.numSquadMembers(MapleSquadType.ZAKUM);
                                	var toSend = "The following members make up your squad:\r\n\r\n";
					for (var i = 1; i <= noOfChars; i++) {
						toSend += "#L";
						toSend += i;
						toSend += "# ";
						toSend += i;
						toSend += " - ";
						toSend += cm.getSquadMember(MapleSquadType.ZAKUM, i - 1).getName();
						toSend += "#l";
						/*toSend += "\r\n";*/
					}
					System.out.println(toSend);
					cm.sendOk(toSend);
					cm.dispose();
				} else {
					cm.sendOk("�Բ��𣬶ӳ��Ѿ��ر��˶�Ա�����롣���Ժ����ԡ�");
					cm.dispose();
				}
			}
		} else if (status == 1) {
			if (selection == 1) {
				if (cm.createMapleSquad(MapleSquadType.ZAKUM) != null) {
					cm.sendOk("������ս���Ѿ��������������������ս�ӵĹ�����\r\n\r\n�ٴκ���̸�����Բ鿴������Ϣ��");
					cm.dispose();
				} else {
					cm.sendOk("���������Ա��");
					cm.dispose();
				}
			} else if (selection == 2) {
				cm.sendOk("�Բ��𣬶ӳ���������μ���ս�ӡ�");
				cm.dispose();
			}
	  	} else if (status == 10) {
			if (selection == 1) {
				if (cm.numSquadMembers(MapleSquadType.ZAKUM) > 29) {
					cm.sendOk("�Բ��𣬶�Ա������");
					cm.dispose();
				} else {
					if (cm.canAddSquadMember(MapleSquadType.ZAKUM)) {
						cm.addSquadMember(MapleSquadType.ZAKUM);
						cm.sendOk("���Ѿ���������ս�ӣ���Ⱥ�ӳ���ʾ��");
						cm.dispose();
					} else {
						cm.sendOk("�Բ��𣬶ӳ���������μ���ս�ӡ�");
						cm.dispose();
					}
				}
			} else if (selection == 2) {
				cm.sendOk("�Բ��𣬶ӳ���������μ���ս�ӡ�");
				cm.dispose();
			}
		} else if (status == 20) {
			if (selection == 1) {
				var noOfChars = cm.numSquadMembers(MapleSquadType.ZAKUM);
                                var toSend = "��Ա��������:\r\n\r\n";
				for (var i = 1; i <= noOfChars; i++) {
					toSend += "#L";
					toSend += i;
					toSend += "# ";
					toSend += i;
					toSend += " - ";
					toSend += cm.getSquadMember(MapleSquadType.ZAKUM, i - 1).getName();
					toSend += "#l";
					/*toSend += "\r\n";*/
				}
				System.out.println(toSend);
				cm.sendOk(toSend);
			} else if (selection == 2) {
				if (cm.getSquadState(MapleSquadType.ZAKUM) == 1) {
					cm.setSquadState(MapleSquadType.ZAKUM, 2);
					cm.sendOk("ע���ѹرգ��ٴκ��ҶԻ�����ѡ������");
				} else {
					cm.setSquadState(MapleSquadType.ZAKUM, 1);
					cm.sendOk("ע���ѿ��ţ��ٴκ��ҶԻ�����ѡ��رա�.");
				}
                                cm.dispose();
			} else if (selection == 3) {
				cm.setSquadState(MapleSquadType.ZAKUM, 2);
				cm.sendOk("�����Ҵ������Ķ�Ա���� #r�����ļ�̨");
				status = 29;
			}
                } else if (status == 21) {
			if (selection > 0) {
				cm.removeSquadMember(MapleSquadType.ZAKUM, selection - 1, true);
				cm.sendOk("�����Ѿ���ʼ����������ӳ���");
				cm.dispose();
			} else {
				if (cm.getSquadState(MapleSquadType.ZAKUM) == 1) {
					cm.sendSimple("����Ҫ��ʲô\r\n\r\n#L1#�鿴��ǰ��Ա#l\r\n#L2#�رն�Ա����#l\r\n#L3#��ʼ��ս#l");
				} else {
					cm.sendSimple("����Ҫ��ʲô\r\n\r\n#L1#�鿴��ǰ��Ա#l\r\n#L2#������Ա����#l\r\n#L3#��ʼ��ս#l");
				}
				status = 19;
			}
		} else if (status == 30) {
			cm.warpSquadMembers(MapleSquadType.ZAKUM, 280030000);
			cm.dispose();
		}
	}
}
