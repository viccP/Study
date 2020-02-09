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

var status = 0;

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
            var mapId = cm.getPlayer().getMapId();
            if (mapId == 103000890) {
                cm.removeAll(4001007);
                cm.removeAll(4001008);

                cm.getEventManager("KerningPQ").setProperty("entryPossible", "true");
                //cm.gainItem(4001325, 1);
                cm.warp(103000000);
                cm.dispose();
            } else {
                var outText;
                if (mapId == 103000805) {
                    outText = "领取一个#b次数奖励#k然后出去?\r\n次数奖励物品为随机发放数量。\r\n#r请确保背包是否其他栏是否存满物品。满了一律不负责！";
                } else {
                    outText = "你是怎么到这个地图的，我勒个去?";
                }
                cm.sendYesNo(outText);
            }
        } else if (status == 1) {
            var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
            if (eim == null) {
                 var rand = 1 + Math.floor(Math.random() * 6);
               /* if (rand == 1) {
                    cm.gainItem(4001325, 1);
                }
                else if (rand == 2) {
                    cm.gainItem(4001325, 2);
                }
                else if (rand == 3) {
                    cm.gainItem(4001325, 1);
                }
                else if (rand == 4) {
                    cm.gainItem(4001325, 1);
                }
                else if (rand == 5) {
                    cm.gainItem(4001325, 1);
                }
                else if (rand == 6) {
                    cm.gainItem(4001325, 2);
                }*/
                cm.warp(103000890); //经播放器，随机spawnpoint
            } else if (cm.isLeader()) {
                eim.disbandParty();
                var em = cm.getEventManager("KerningPQ");
                em.setProperty("entryPossible", "true");
            } else {
                cm.sendOk("喊你队长来和我说!");
            }
            cm.dispose();
        }
    }
}
