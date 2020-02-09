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

/* Mino the Owner
Orbis VIP Hair/Hair Color Change (VIP).
*/
var status = 0;
var beauty = 0;
var mhair = Array(30000, 30020, 30030, 30230, 30240, 30260, 30270, 30280, 30290, 30340, 30420, 30460, 30490, 30480, 30520, 30760, 30680);
var mstar = Array(30820, 30820);
var fhair = Array(31710, 31670, 31220, 31260, 31270, 31250, 31040, 31030, 31230, 31650, 31240, 31630, 31110, 31320, 31000, 31530);
var hairnew = Array();

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
				cm.sendSimple("���ã������������Ժ��#p2010001#���������#b#t5150005##k��#b#t5151005##k���ͷ��İ�ͷ�������Ҵ���ɡ���ô����������ʲô����ѡ��ɡ�\r\n#b#L0#�����ͣ��ø߼���Ա����#l\r\n#L1#Ⱦͷ�����ø߼���Ա����#l");
			} else if (status == 1) {
				beauty = selection;
				if (selection == 0) {
					hairnew = Array();
					if (cm.getChar().getGender() == 0) {
						for(var i = 0; i < mhair.length; i++) {
							hairnew.push(mhair[i] + parseInt(cm.getChar().getHair() % 10));
						}
					}
					if (cm.getChar().getGender() == 1) {
						for(var i = 0; i < fhair.length; i++) {
							hairnew.push(fhair[i] + parseInt(cm.getChar().getHair() % 10));
						}
					}
					cm.sendStyle("���ǿ���Ϊ��ı䷢�͡����ǲ����Ѿ���������ڵķ��ͣ��������#b#t5150005##k�����ǾͿ��Ը��㻻�µķ��͡�������ѡ��ϲ���ķ��Ͱɣ�", hairnew, 5150005);
				} else if (selection == 1) {
					haircolor = Array();
					var current = parseInt(cm.getChar().getHair()/10)*10;
					for(var i = 0; i < 8; i++) {
						haircolor.push(current + i);
					}
					cm.sendStyle("���ǿ���Ϊ��ı�ͷ������ɫ�����ǲ����Ѿ���������ڵ���ɫ���������#b#t5151005##k�����ǾͿ��Ը���Ⱦ����������ѡ��ϲ������ɫ�ɣ�", haircolor, 5151005);
				} else if (selection == 2) {
					hairnew = Array();
					if (cm.getChar().getGender() == 0) {
						for(var i = 0; i < mstar.length; i++) {
							hairnew.push(mstar[i] + parseInt(cm.getChar().getHair() % 10));
						}
					}
					cm.sendStyle("���ǿ���Ϊ��ı䷢�͡����ǲ����Ѿ���������ڵķ��ͣ��������#b#t5150038##k�����ǾͿ��Ը��㻻�µķ��͡��һ���������ġ���ô����", hairnew, 5150038);
				}
			} else if (status == 2){
				if (beauty == 0){
					if (cm.haveItem(5150005) == true){
						cm.gainItem(5150005, -1);
						cm.setHair(hairnew[selection]);
						cm.sendOk("��������·��Ͱ�!");
					} else if(cm.isCash() && cm.getPlayer().getCSPoints(1)>=980){
						cm.getPlayer().modifyCSPoints(1,-980);
						cm.setHair(hairnew[selection]);
						cm.sendOk("��������·��Ͱ�!");
					} else {
						cm.sendOk("�š� ������û������������Ļ�Ա���������˼�����û�л�Ա�������ǲ����Ը����޼�ͷ����");
						
					}
				} else if (beauty == 1){
					if (cm.haveItem(5151005) == true){
						cm.gainItem(5151005, -1);
						cm.setHair(hairnew[selection]);
						cm.sendOk("��������µ�ͷ����ɫ��!");
					} else if(cm.isCash() && cm.getPlayer().getCSPoints(1)>=980){
						cm.getPlayer().modifyCSPoints(1,-980);
						cm.setHair(hairnew[selection]);
						cm.sendOk("��������µ�ͷ����ɫ��!");
					} else {
						cm.sendOk("�š� ������û������������Ļ�Ա���������˼�����û�л�Ա�������ǲ����Ը���Ⱦͷ����");
						
					}
				} else if (beauty == 2){
					if (cm.haveItem(5150038) == true){
						cm.gainItem(5150038, -1);
						cm.setHair(hairnew[selection]);
						cm.sendOk("��������·��Ͱ�!");
					} else if(cm.isCash() && cm.getPlayer().getCSPoints(1)>=980){
						cm.getPlayer().modifyCSPoints(1,-980);
						cm.setHair(hairnew[selection]);
						cm.sendOk("��������·��Ͱ�!");
					} else {
						cm.sendOk("�š� ������û��#b#t5150038##k�������û�л�Ա�������ǲ���Ϊ���޼�ͷ����");
						
					}
				}
				cm.getPlayer().UpdateCash();
				cm.dispose();
			}
		}
	}
}
