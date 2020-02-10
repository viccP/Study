/**
    楝煎▋鎭板悏 PQ
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

    var eim = em.newInstance("QiajiPQ");

    var map = eim.setInstanceMap(749050301);
    map.resetFully();
    eim.startEventTimer(1800000); //30 鍒