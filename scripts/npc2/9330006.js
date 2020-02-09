/*
 * 
 * @废弃地铁的箱子
 */

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("下次再见!");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		}
		else {
			status--;
		}
		if (status == 0) {
			if (cm.getMeso() > 999999999) {
				cm.gainItem(2022615, 1); // Shumi's Coin
				cm.warp(103000100, 0);
			}
			else {
				var rand = 1 + Math.floor(Math.random() * 6);
				if (rand == 1) {
					cm.gainItem(2002016, 8); //裤/裙防御诅咒卷轴
				}
				else if (rand == 2) {
					cm.gainItem(2002017, 8); // 大力药水
				}
				else if (rand == 3) {
					cm.gainItem(2002019, 8); // 魔法制炼术士的药水
				}
				else if (rand == 4) {
					cm.gainItem(2070003, 1); // 蘑菇棒棒糖
				}
				else if (rand == 5) {
					cm.gainItem(2022247, 50); //口香糖
				}
				else if (rand == 6) {
					cm.gainItem(2070003, 1); //苏菲莉亚的项链
				}
				cm.gainItem(2022615, -1);
			}
			cm.dispose();	
		}
	}
}	

