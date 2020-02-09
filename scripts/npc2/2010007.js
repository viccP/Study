/* guild creation npc */
var status = 0;
var sel;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;

		if (status == 0)
			cm.sendSimple("嗨!你找我有事嗎?是不是要創公會啊!啊不然你要幹嘛?\r\n#b#L0#創立公會#l\r\n#L1#解除公會#l\r\n#L2#增加公會能力#l#k");
		else if (status == 1)
		{
			sel = selection;
			if (selection == 0)
			{
				if (cm.getChar().getGuildId() > 0)
				{
					cm.sendOk("你不能創立公會,可能是您目前有公會");
					cm.dispose();
				}
				else
					cm.sendYesNo("創立公會需要 #b" + cm.getChar().guildCost() + " 楓幣#k, 你確定你要創立?");
			}
			else if (selection == 1)
			{
				if (cm.getChar().getGuildId() <= 0 || cm.getChar().getGuildRank() != 1)
				{
					cm.sendOk("你可以解散公會,如果你是公會長就可以");
					cm.dispose();
				}
				else
					cm.sendYesNo("你確定想解散公會? 你將不能夠恢復它和你所有的公會分數(GP)將歸零 .");
			}
			else if (selection == 2)
			{
				if (cm.getChar().getGuildId() <= 0 || cm.getChar().getGuildRank() != 1)
				{
					cm.sendOk("如果你是公會長的話,你就能增加公會能力");
					cm.dispose();
				}
				else
					cm.sendYesNo("增加你的公會能力需要 #b#k 花費 #b" + cm.getChar().capacityCost() + " 楓幣#k, 你確定,你想要繼續嗎?");
			}
		}
		else if (status == 2)
		{
			if (sel == 0 && cm.getChar().getGuildId() <= 0)
			{
				cm.getChar().genericGuildMessage(1);
				cm.dispose();
			}
			else if (sel == 1 && cm.getChar().getGuildId() > 0 && cm.getChar().getGuildRank() == 1)
			{
				cm.getChar().disbandGuild();
				cm.dispose();
			}
			else if (sel == 2 && cm.getChar().getGuildId() > 0 && cm.getChar().getGuildRank() == 1)
			{
				cm.getChar().increaseGuildCapacity();
				cm.dispose();
			}
		}
	}
}
