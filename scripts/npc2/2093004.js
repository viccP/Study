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
	cm.sendSimple ("�z�n�A�ڬO#e#d��z�c��ӤH#k#n\r\n#e#d�аݱz�n�R���@�س�z?#k#n\r\n#r#L0##e#i5390000# ����߱���z #n#l#b10��(1����)#k\r\n#r#L1##e#i5390000# ����߱���z #n#l#b100��(1����)#k\r\n#r#L2##e#i5390000# ����߱���z #n#l#b1000��(1����)#k\r\n#r#L3##e#i5390001# �ն������߱���z #n#l#b10��(1����)#k\r\n#r#L4##e#i5390001# �ն������߱���z #n#l#b100��(1����)#k\r\n#r#L5##e#i5390001# �ն������߱���z #n#l#b1000��(1����)#k\r\n#r#L6##e#i5390002# �ʷR�߱���z #n#l#b10��(1����)#k\r\n#r#L7##e#i5390002# �ʷR�߱���z #n#l#b100��(1����)#k\r\n#r#L8##e#i5390002# �ʷR�߱���z #n#l#b1000��(1����)#k\r\n#r#L9##e#i5076000# �D���z #n#l#b10��(1����)#k\r\n#r#L10##e#i5076000# �D���z #n#l#b100��(1����)#k\r\n#r#L11##e#i5076000# �D���z #n#l#b1000��(1����)#k\r\n#r#L12##e#i5050000# ��O�^�_�� #n#l#b100��(100����)#k");
	}

function action(mode, type, selection) {
		cm.dispose();

	switch(selection){
		case 0: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5390000#����߱���z10��#n �w�g�e��z���I�]��.");
			cm.gainItem(5390000 ,10);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 1: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5390000#����߱���z100��#n �w�g�e��z���I�]��.");
			cm.gainItem(5390000 ,100);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 2: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5390000#����߱���z1000��#n �w�g�e��z���I�]��.");
			cm.gainItem(5390000 ,1000);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 3: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5390001#�ն������߱���z10��#n �w�g�e��z���I�]��.");
			cm.gainItem(5390001 ,10);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 4: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5390001#�ն������߱���z100��#n �w�g�e��z���I�]��.");
			cm.gainItem(5390001 ,100);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 5: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5390001#�ն������߱���z1000��#n �w�g�e��z���I�]��.");
			cm.gainItem(5390001 ,1000);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 6: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5390002#�ʷR�߱���z10��#n �w�g�e��z���I�]��.");
			cm.gainItem(5390002 ,10);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 7: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5390002#�ʷR�߱���z100��#n �w�g�e��z���I�]��.");
			cm.gainItem(5390002 ,100);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 8: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5390002#�ʷR�߱���z1000��#n �w�g�e��z���I�]��.");
			cm.gainItem(5390002 ,1000);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 9: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5076000#�D���z10��#n �w�g�e��z���I�]��.");
			cm.gainItem(5076000 ,10);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 10: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5076000#�D���z100��#n �w�g�e��z���I�]��.");
			cm.gainItem(5076000 ,100);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 11: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5076000#�D���z1000��#n �w�g�e��z���I�]��.");
			cm.gainItem(5076000 ,1000);
			cm.gainMeso(-1);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s1�������S�����I");
			cm.dispose();
			}
		break;
		case 12: 
			if(cm.getMeso() >= 1){
			cm.sendOk("���±z, #e#i5050000#��O�^�_��100��#n �w�g�e��z���I�]��.");
			cm.gainItem(5050000 ,100);
			cm.gainMeso(-100);
			cm.dispose();
			}else{
			cm.sendOk("������I�A�s100�������S�����I");
			cm.dispose();
			}
		break;
			}
		}