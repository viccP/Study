/**
    灏戞灄濡栧儳 PQ
*/

var minPlayers = 1;

function init() {
    em.setProperty("state", "0");
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    em.setProperty("state", "1");

    var eim = em.newInstance("shaoling");

    var map = eim.setInstanceMap(702060000);
    map.resetFully();
    eim.startEventTimer(600000); //10 鍒