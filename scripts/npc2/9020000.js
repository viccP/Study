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
-- Odin JavaScript --------------------------------------------------------------------------------
	Lakelis - Victoria Road: Kerning City (103000000)
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

var status;
var minLevel = 10;
var maxLevel = 255;
var minPlayers = 3;
var maxPlayers = 6;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
	
    if (status == 0) {
        // Lakelis has no preamble, directly checks if you're in a party
        if (cm.getParty() == null) { // No Party
            cm.sendOk("�A�n�A�A�Q�M�A�Ҧb���ն������@�_�����o�ӯS�O�����ȶ� �ն����������S���}�n���t�X�A�O�����������Ȫ���I �p�G�A�Q�D�ԥ����ҩ��ۤv������O�ܱj�j��\r\n����� #b�A���ն���#k �ӧi�D�ڡI");
            cm.dispose();
        } else if (!cm.isLeader()) { // Not Party Leader
            cm.sendOk("�p�G�A�Q�D�Ԥ@�U�ۤv, ����� #b�A���ն���#k �ӧi�D��.");
            cm.dispose();
        } else {
            // Check if all party members are within Levels 21-30
            var party = cm.getParty().getMembers();
            var inMap = cm.partyMembersInMap();
            var levelValid = 0;
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel)
                    levelValid++;
            }
            if (inMap < minPlayers || inMap > maxPlayers) {
                cm.sendOk("�A������H�Ƥ��� "+minPlayers+" �H. �нT�{�A�������O�_�ǳƦn�åB�����Ѥ��o���ն�����. �ڹ�ı�즳 #b" + inMap + "#k �H�b�Z������. �p�G�ڦ��ݿ�, #b�Х��n�X�A�n�J,#k�Ϊ̭��s�ն�.");
				cm.dispose();
			} else if (levelValid != inMap) {
				cm.sendOk("�нT�{�A�������O�_�ǳƦn�åB�����Ѥ��o���ն�����. �o���ն����Ȫ��a���Žd�򥲶��A "+minLevel+" �� "+maxLevel+" ����. �ڹ�ı�� #b" + levelValid + "#k �H�b�o�ӽd��. �p�G�ڦ��ݿ�, #b�Х��n�X�A�n�J,#k�Ϊ̭��s�ն�.");
				cm.dispose();
			} else {
                var em = cm.getEventManager("KerningPQ");
                if (em == null) {
                    cm.sendOk("�ثe�ն����ȨS���}��.");
                } else if (em.getProperty("KPQOpen").equals("true")) {
                    // Begin the PQ.
                    em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                    // Remove Passes and Coupons
                    party = cm.getChar().getEventInstance().getPlayers();
                    cm.removeFromParty(4001008, party);
                    cm.removeFromParty(4001007, party);
					em.setProperty("KPQOpen" , "false");
                } else {
                    cm.sendNext("�ثe����L����i�椤. �еy�� !");
                }
				cm.dispose();
            }
        }
    }
}