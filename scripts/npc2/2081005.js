/* 	
Irene - Warp to Singapore (from Kerning City)
Credits to Cody(shotdownsoul)/AAron from FlowsionMS Forums
Credits to Angel-SL on helping me @_@
Credits to Info for helping me @_@
*/


var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("妳想要去打龍王嗎??\r\n#L0##b當然要!.#k#l");
		} else if (status == 1) {
                        var horntailMap = cm.getClient().getChannelServer().getMapFactory().getMap(240060200);
			if (selection == 0 && horntailMap.getMonsterById(8810018) == null || horntailMap.playerCount() == 0) {
				cm.warp(240060200, 0);
				cm.worldMessage("玩家:" + cm.c.getPlayer().getName() + "   他/她:" + cm.c.getPlayer().getLevel() + "等進入了龍王地圖");
				cm.dispose();
			}else{
 				cm.sendOk("已經開打囉!不能去了");
			}
			}
		}
	}	
