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
			cm.sendSimple("�p�Q�n�h���s����??\r\n#L0##b��M�n!.#k#l");
		} else if (status == 1) {
                        var horntailMap = cm.getClient().getChannelServer().getMapFactory().getMap(240060200);
			if (selection == 0 && horntailMap.getMonsterById(8810018) == null || horntailMap.playerCount() == 0) {
				cm.warp(240060200, 0);
				cm.worldMessage("���a:" + cm.c.getPlayer().getName() + "   �L/�o:" + cm.c.getPlayer().getLevel() + "���i�J�F�s���a��");
				cm.dispose();
			}else{
 				cm.sendOk("�w�g�}���o!����h�F");
			}
			}
		}
	}	
