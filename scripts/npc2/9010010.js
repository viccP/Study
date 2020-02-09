/*
	Cassandra
	SupremePQ NPC
 */
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server.maps.pq);

var status = 0;
var minLevel = 0;
var maxLevel = 255;
var minPlayers = 0;
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
        if (status == 0 && cm.getPlayer().getMapId() == 109010000) {
            cm.sendSimple("...\r\n#b#L0#Get me out.#l\r\n#L1#Join SupremePQ#l#k");
        } else if (status == 1 && cm.getPlayer().getMapId() == 109010000 && selection == 0) {
            cm.warp(910000000);
            cm.dispose();
        } else if (status == 1 && cm.getPlayer().getMapId() == 109010000 && selection == 1) {
            if (cm.getParty() == null) { // no party
                cm.sendOk("How about you and your party members collectively beating a quest? Here you'll find obstacles and problems where you won't be able to beat it without great teamwork.  If you want to try it, please tell the #bleader of your party#k to talk to me.");
                cm.dispose();
            } else if (!cm.isLeader()) { // not party leader
                cm.sendSimple("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var mapId = cm.getPlayer().getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;
                // Temp removal for testing
                var it = party.iterator();
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                        levelValid += 1;
                    } else {
                        next = false;
                    }
                    if (cPlayer.getMapid() == mapId) {
                        inMap += 1;
                    }
                }
                if (party.size() < minPlayers || party.size() > maxPlayers || inMap < minPlayers) 
                    next = false;
                if (next) {
                    var em = cm.getEventManager("SupremePQ");
                    if (em == null) {
                        cm.sendOk("This PQ is not currently available.");
                    } else {
                        // Begin the PQ.
                        em.startInstance(cm.getParty(),cm.getPlayer().getMap());
                        // Remove pass/coupons
                        party = cm.getPlayer().getEventInstance().getPlayers();
                        cm.removeFromParty(4031679, party);
                        cm.removeFromParty(5221000, party);
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("Your party is not a party of three to six. Please make sure all your members are present and qualified to participate in this quest.  I see #b" + levelValid.toString() + " #kmembers are in the right level range, and #b" + inMap.toString() + "#k are in Kerning. If this seems wrong, #blog out and log back in,#k or reform the party.");
                    cm.dispose();
                }
            }
        } else if (status == 0 && cm.getPlayer().getMapId() == 910000022) {
            if (cm.getParty() == null) {
                cm.warp(200000305);
                cm.dispose();
            } else if (!cm.isLeader()) {
                cm.sendOk("Give any tickets and jewel to the leader of the party and tell them to talk to me.");
                cm.dispose();
            } else {
                if (cm.haveItem(4031679)) {
                    cm.sendYesNo("Do you have all the tickets of the party and would like to get out of here?");
                } else {
                    cm.sendYesNo("You do not have a jewel. Would you like to end the Party Quest?");
                }
            }
        } else if (status == 1 && cm.getPlayer().getMapId() == 910000022) {
            var members = cm.getPlayer().getEventInstance().getPlayers();
            var exp = false;
            if (cm.haveItem(4031679)) {
                cm.warpMembers(220000306, members);
                exp = true;
            } else {
                cm.warpMembers(220000305, members);
            }
            cm.givePartyExp((200 * cm.itemQuantity(4001106)) + exp ? 2000 : 0, members);
            cm.removeFromParty(4031679, members);
            cm.removeFromParty(5221000, members);
            cm.dispose();
        } else if (cm.getPlayer().getMapId() == 220000305) {
            var eim = cm.getPlayer().getEventInstance();
            if (eim != null) {
                eim.unregisterPlayer(cm.getPlayer());
            }
            cm.warp(109010000, 0);
            cm.dispose();
        } else if (cm.getPlayer().getMapId() == 220000306) {
            var eim = cm.getPlayer().getEventInstance();
            if (eim != null) {
                var rewards = MaplePQRewards.SPQrewards;
                MapleReward.giveReward(rewards, cm.getPlayer());
                eim.unregisterPlayer(cm.getPlayer());
            }
            cm.warp(109010000, 0);
            cm.dispose();
        } else {
            cm.sendOk("Dialog is broken.");
            cm.dispose();
        }
    }
}