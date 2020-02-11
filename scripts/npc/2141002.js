function start() {
    cm.sendYesNo("如果你现在离开，你将不得不重新开始。你确定要离开这里到外面去吗？");
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (cm.isLeader()) {
            cm.killAllMonsters();
            cm.warpParty(270050000);
        }
        else{
        	cm.sendSimple("让你的组队队长来找我！");
        }
        cm.dispose();
    }
}