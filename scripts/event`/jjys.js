var mapId = 703200900;
var item = Array(1003171,1012057,1022048,1032024,1012104,1012289,1022079); //稀有点装
var yp = Array(11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,13,13,13,13,13,14,14,14,4,4,4,14,12,13,14,15,16,17,18,19,11); //邮票

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("Vergamot" + leaderid);

    eim.setProperty("vergamotSummoned", "0");

    var map = eim.setInstanceMap(mapId);
    map.resetFully();

    var mob = em.getMonster(9600025);//妖僧
    var overrideStats = Packages.server.life.OverrideMonsterStats();
    //var hprand = Math.floor(Math.random() * 2100000000)+21100000000;
    overrideStats.setOHp(5000000000);
    overrideStats.setOExp(200000000);
    overrideStats.setOMp(200000);
    mob.setOverrideStats(overrideStats);
    mob.setHp(5000000000);
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(5,-181)); 

    eim.startEventTimer(1600000); // 8 hrs
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function scheduledTimeout(eim) {
    end(eim);
}

function changedMap(eim, player, mapid) {
    if (mapid != 703200900) {
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
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
        var iter = em.getInstances().iterator();
        while (iter.hasNext()) {
            var eim = iter.next();
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                var chr = pIter.next();
                //var winner = eim.getPlayers().get(0);
                var map = eim.getMapFactory().getMap(mapId);
                var randitem = Math.floor(Math.random() * item.length);
                var randyp = Math.floor(Math.random() * yp.length);
                var toDrop = new Packages.client.inventory.Item(4310034, 0, 1);
                for (var i = 0; i < yp[randyp]; i++) {
                    //map.spawnItemDrop(chr, chr, toDrop, chr.getPosition(), true, false);
		map.spawnAutoDrop(4310034,chr.getPosition());
		map.spawnAutoDrop(4310034,chr.getPosition());
                }
		var randx= Math.floor((Math.random()*2));
		var xwsj= Math.floor((Math.random()*20))+30;
                if(randx==1){
                //toDrop = new Packages.client.inventory.Item(item[randitem], 0, 1);
                //map.spawnItemDrop(winner, winner, toDrop, winner.getPosition(), true, false);
		map.spawnAutoDrop(item[randitem],chr.getPosition());
                map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(5, "恭喜，击败了进阶妖僧，获得了" + yp[randyp] + "个正义币和装备奖励"));
		}else{
		chr.setXw(chr.getXw()+xwsj);
                map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(5, "恭喜，击败了进阶妖僧，获得了" + yp[randyp] + "个正义币" + xwsj + "修为点"));
            }
            }
        }
    }

function leftParty(eim, player) {}

function disbandParty(eim) {}

function playerDead(eim, player) {}

function cancelSchedule() {}