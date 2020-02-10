function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getMapId() == 677000011) { //warp to another astaroth map.
        cm.warp(677000013, 0);
        cm.dispose();
    } else if (cm.getPlayer().getMapId() == 677000013) { //warp to another astaroth map.
        if (cm.getParty() == null) {
            cm.warpParty(677000010);
            cm.sendOk("琚