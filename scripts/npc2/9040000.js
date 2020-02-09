/* 
 * This file is part of the OdinMS Maple Story Server
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

/* 
 * @Author Lerk
 * 
 * Shuang, Victoria Road: Excavation Site<Camp> (101030104)
 * 
 * Start of Guild Quest
 */

var status;
var GQItems = new Array(1032033, 4001024, 4001025, 4001026, 4001027, 4001028, 4001031, 4001032, 4001033, 4001034, 4001035, 4001037);

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
			cm.sendSimple("這裡是通往聖瑞尼亞遺址的出發地點. 你現在想做什麼? #b\r\n#L0#我是族長，我想開始家族公會對抗戰#l\r\n#L1#我是族員，我想加入家族公會對抗戰#l");						
		}
		else if (status == 1) {
			if (selection == 0) { //Start
				if (cm.getPlayer().getGuildId() == 0 || cm.getPlayer().getGuildRank() >= 3) { //no guild or not guild master/jr. master
					cm.sendNext("只有家族的族長或者副族長才有資格開始聖瑞尼亞遺址公會對抗戰.");
					cm.dispose();
				}
				else {
                                        //no true requirements, make an instance and start it up
                                        //cm.startPQ("ZakumPQ");
                                        var em = cm.getEventManager("GuildQuest");
                                        if (em == null) {
                                                cm.sendOk("很抱歉,本輪家族公會對抗賽正在進行中,請您稍後再來.");
                                        } else {
                                                if (getEimForGuild(em, cm.getPlayer().getGuildId()) != null) {
                                                        cm.sendOk("你所在的家族已經開始進行公會對抗賽. 請您稍後再來.")
                                                }
                                                else {
                                                        //start GQ
                                                        var guildId = cm.getPlayer().getGuildId();
                                                        var eim = em.newInstance(guildId);
                                                        em.startInstance(eim, cm.getPlayer().getName());
                                                        
                                                        //force the two scripts on portals in the map
                                                        var map = eim.getMapInstance(990000000);
                                                        
                                                        map.getPortal(5).setScriptName("guildwaitingenter");
                                                        map.getPortal(4).setScriptName("guildwaitingexit");
                                                        
                                                        eim.registerPlayer(cm.getPlayer());
                                                        cm.guildMessage("The guild has been entered into the Guild Quest. Please report to Shuang at the Excavation Camp on channel " + cm.getC().getChannel() + ".");

                                                        //remove all GQ items from player entering
                                                        for (var i = 0; i < GQItems.length; i++) {
                                                                cm.removeAll(GQItems[i]);
                                                        }
                                                }
                                        }
                                        cm.dispose();
				}
			}
			else if (selection == 1) { //entering existing GQ
				if (cm.getPlayer().getGuildId() == 0) { //no guild or not guild master/jr. master
					cm.sendNext("You must be in a guild to join an instance.");
					cm.dispose();
				}
				else {
                                        var em = cm.getEventManager("GuildQuest");
                                        if (em == null) {
                                                cm.sendOk("家族公會對抗賽正在進行中,請您稍後再來.");
                                        } else {
                                                var eim = getEimForGuild(em, cm.getPlayer().getGuildId());
                                                if (eim == null) {
                                                        cm.sendOk("你的家族現在還沒有進行登記,不能參加家族公會對抗賽.");
                                                }
                                                else {
                                                        if ("true".equals(eim.getProperty("canEnter"))) {
                                                                eim.registerPlayer(cm.getPlayer());
                                                                
                                                                //remove all GQ items from player entering
                                                                for (var i = 0; i < GQItems.length; i++) {
                                                                        cm.removeAll(GQItems[i]);
                                                                }
                                                        }
                                                        else {
                                                                cm.sendOk("很抱歉,族長已經將你制裁,本論家族公會對抗賽你將不能參加. 請您稍後再試.");
                                                        }
                                                }
                                        }
                                        cm.dispose();
                                }
			}
		}
	}
}

function getEimForGuild(em, id) {
        var stringId = "" + id;
        return em.getInstance(stringId);
}
