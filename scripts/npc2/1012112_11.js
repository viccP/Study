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

/*
Tory - [Does the Main function of HenesysPQ]
 @author Jvlaple
 */
 
var status = 0;
var minLevel = 10;
var maxLevel = 20;
var minPlayers = 1;
var maxPlayers = 6;

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
        if (cm.getChar().getMapId()==7780) {
            if (status == 0) {
                cm.sendNext("����~�ҽд�������������ǿ����»�������ɽ����˵��������һ�������˶����ϻ��������Ĵ���Ѱ�ҿ�������ӵ�ʳ�");
            } else if (status == 1) {
                cm.sendSimple("��ʿ����Ը��ǰ���»�ɽ�𣬼����Ա��������һ������˶���#l#k");
            } else if (status == 2) {
                if (cm.getParty() == null) {
                    cm.sendOk("�㻹û�����");
                    cm.dispose();
                    return;
                }
                if (!cm.isLeader()) {
                    cm.sendOk("����Ҫ�������棬��Ҫ������������Ķӳ������ҽ��жԻ�ร���ȥ����Ķӳ���~^^");
                    cm.dispose();
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getChar().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    if (party.size() < minPlayers || party.size() > maxPlayers) 
                        next = false;
                    else {
                        for (var i = 0; i < party.size() && next; i++) {
                            if ((party.get(i).getLevel() >= minLevel) && (party.get(i).getLevel() <= maxLevel))
                                levelValid += 1;
                            if (party.get(i).getMapid() == mapId)
                                inMap += 1;
                        }
                        if (levelValid < minPlayers || inMap < minPlayers)
                            next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("HenesysPQ");
                        if (em == null) {
                            cm.sendOk("#rError#k: HenesysPQ is unavailable at the moment. Please try again later.");
                            cm.dispose();
                        } else {
                            em.startInstance(cm.getParty(), cm.getChar().getMap());
                            var party = cm.getChar().getEventInstance().getPlayers();
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("����������Ӷ�Ա����3�������볡���ȼ���10���ϣ�������Ա��3�����ϲſ����볡������ȷ���Ժ��ٸ���̸��");
                        cm.dispose();
                    }
                }
            }
        } else if (cm.getLevel() >= 1) {
            if (status == 0){
                cm.ˢ��״̬();
                cm.warp(102000000);
                cm.getPlayer().setHp(0);
                cm.playerMessage("��ͼ����");
                cm.dispose();
                return;
            }
        } else if (cm.getPlayer().getMapId() == 910010100) {
            if (status==0) {
                cm.sendYesNo("Would you like go to #rHenesys Park#k?");				
            } else if (status == 1) {
                cm.warp(100000200, 0);
                cm.dispose();
            }
        }
    }
}
