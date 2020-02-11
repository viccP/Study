function init() {
	em.setProperty("leader", "true");
    em.setProperty("state", "0");
}

function setup(eim, leaderid) {
	em.setProperty("state", "1");
	em.setProperty("leader", "true");
    var eim = em.newInstance("Pinkbean"+leaderid);
	eim.setInstanceMap(270050100).resetFully();
    eim.startEventTimer(14400000); // 1 hr
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapFactory().getMap(270050100);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 270050300);
    em.setProperty("state", "0");
		em.setProperty("leader", "true");
}

function changedMap(eim, player, mapid) {
    if (mapid != 270050100) {
	eim.unregisterPlayer(player);

	if (eim.disposeIfPlayerBelow(0, 0)) {
	    em.setProperty("state", "0");
		em.setProperty("leader", "true");
	}
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function monsterValue(eim, mobId) {
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
	em.setProperty("state", "0");
		em.setProperty("leader", "true");
    }
}

function end(eim) {
    if (eim.disposeIfPlayerBelow(100, 270050300)) {
	em.setProperty("state", "0");
		em.setProperty("leader", "true");
    }
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
	var emState=em.getProperty("state");
    if (emState.equals("1")) {
        em.setProperty("state", "2");
    } else if (emState.equals("2")) {
        em.setProperty("state", "3");
    } else if (emState.equals("3")) {
        em.setProperty("state", "4");
    } else if (emState.equals("4")) {
        em.setProperty("state", "5");
    } else if (emState.equals("5")) {
        em.setProperty("state", "6");
    }
}

function leftParty (eim, player) {}
function disbandParty (eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}