/*
 Made by XiuzSu
 Credits to watzmename
*/
importPackage(net.sf.odinms.server);

var status;
var choice;

function start() {
	status = -1;
	action(1, 0, 0);
} 

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
	if (status == 0)
		cm.sendNext("嗨 我是商人道具管理員!");
	else if (status == 1)
		if (cm.hasTemp()) {
			if (cm.getHiredMerchantItems(true)) {
				cm.sendOk("你開商店的東西 就算伺服器關了 也會在我這!");
				cm.dispose();
			} else {
				cm.sendOk("請空出一些空間 好讓我把東西還你.");
				cm.dispose();
			}
		} else {
			cm.sendSimple("你想要領取甚麼?\r\n\r\n#b#L0#錢#l\r\n#L1#物品#l");
		}
	else if (status == 2) {
		cm.sendNext("讓我找找唷~~...");
		choice = selection;
	} else {
		if (choice == 0) {
			if (status == 3) {
				var mesoEarnt = cm.getHiredMerchantMesos();
				if (mesoEarnt > 0)
					cm.sendYesNo("你目前賺了 "+mesoEarnt+" mesos 元. 你要領回去嗎?");
				else {
					cm.sendOk("你沒賺到錢");
					cm.dispose();
				}
			} else if (status == 4) {
				cm.sendNext("感謝您的使用, 您的錢都還你了.");
				cm.gainMeso(cm.getHiredMerchantMesos());
				cm.setHiredMerchantMesos(0);
				cm.dispose();
			}
		} else {
			if (cm.getHiredMerchantItems(false)) {
				cm.sendOk("感謝您的使用, 您的裝備都還你了.");
				cm.dispose();
			} else {
				cm.sendOk("請空出一些空間 好讓我把裝備給你.");
				cm.dispose();
			}
		}
	}
}