var status = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.summonMob(9500184, 5000, 800, 1);
    cm.summonMob(9500185, 5000, 800, 1);
    cm.summonMob(9500186, 5000, 800, 1);
    cm.dispose();
}