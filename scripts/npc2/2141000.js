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

/* Pison
	Warp NPC to Lith Harbor (104000000)
	located in Florina Beach (110000000)
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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("�A�Q�h�D�� #b�֥d�C�̫�@��#k �ܡH�A�T�w��q�L�ܡH");
        } else if (status == 1) {
            if(cm.getLevel() >= 150 ){  
                if (cm.getParty() == null) { 
                    cm.sendOk("#e�A�n���٨S���@�Ӷ���,�ڬO����e�A�i�h��."); 
                    cm.dispose(); 
                    } 
            if (!cm.isLeader()) { 
                cm.sendSimple("�p�G�A�Q�D�Ԥ@�U#r�֥d�C#k, ����A�u��ۤv�}����,�@�ӤH�h��D,�ҥH����M�H�a�ն��I"); 
                cm.dispose(); 
                    }else { 
            var party = cm.getParty().getMembers(); 
            var next = true; 
                if (party.size() > 6){  
                    next = false; 
                    } 
                if (next) { 
            var em = cm.getEventManager("PB5");  
                if (em == null) { 
                    cm.sendOk("error�I"); 
                } else {  
                em.startInstance(cm.getParty(),cm.getChar().getMap()); 
                party = cm.getChar().getEventInstance().getPlayers(); 
                cm.removeFromParty(4001008, party); 
                cm.removeFromParty(4001007, party);  
                } 
            cm.worldMessage("[�֥d�C�D�ԨϪ�]���a:" + cm.c.getPlayer().getName() + "   �L/�o:" + cm.c.getPlayer().getLevel() + "�� �a�۵��۩M�H��,�}�l�D�ԥ֥d�C!~~");
            cm.dispose(); 
                    } 
                } 
            }else{ 
                cm.sendOk("#e#r�藍�_,�A�����ŤӧC,�h�F�]�O�e��."); 
                cm.dispose(); 
            }
        }
    }
}