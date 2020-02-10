var minPlayers = 1;

function init() {
em.setProperty("state", "0");
	em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
em.setProperty("state", "1");
	em.setProperty("leader", "true");
    var eim = em.newInstance("ProtectPig" + leaderid);
	em.setProperty("stage", "0");
        var map = eim.setInstanceMap(923010000);
        map.resetFully();
    eim.startEventTimer(300000); //5 鍒