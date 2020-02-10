/**
	Kyrin's Training Ground, 4th job Quest [Captain]
**/

function init() {
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    em.setProperty("started", "true");

    var eim = em.newInstance("KyrinTrainingGroundC");

    var map = eim.setInstanceMap(912010100);
    map.resetFully();
    map.respawn(true);
    eim.startEventTimer(240000);

    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapFactory().getMap(912010100);
    player.changeMap(map, map.getPortal(0));
    player.dropMessage(6, "浣犲繀闋堝繊鑰