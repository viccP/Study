importPackage(net.sf.odinms.net.world.guild);

var status;
var choice;
var guildName;
var partymembers;

function start() {
	partymembers = cm.getPartyMembers();
	status = -1;
	action(1,0,0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
	
	 
	if (status == 0)
	    cm.sendSimple("你好！  我是!  #b家族聯盟的管理員#k\r\n#b#L0#你想知道家族聯盟是什麼嗎?#l\r\n#L1#如何使用家族成為家族聯盟嗎?#l\r\n#L2#我想讓家族成為家族聯盟.#l\r\n#L3#我想要為家族聯盟增加較多的家族.#l\r\n#L4#我想要解散家族聯盟.#l");
	else if (status == 1) {
		choice = selection;
	    if (selection == 0) {
		    cm.sendNext("家族聯盟是, 一個一些家族的聯盟形成的一個超級小組。 我是掌管這些家族聯盟的人.");
			cm.dispose();
		} else if (selection == 1) {
			cm.sendNext("要創建一個家族聯盟， 需要2個家族主人需要在一個組隊中。 這一個組隊的隊長將會被分配當做家族聯盟的主人.");
			cm.dispose();
		} else if(selection == 2) {
			if (cm.getPlayer().getParty() == null) {
				cm.sendNext("你的隊裡面沒有2個家族的族長，所以不能創建家族聯盟。"); //Not real text
				cm.dispose();
			} else if (partymembers.get(0).getGuild() == null) {
				cm.sendNext("你不能直接讓家族聯盟創建到自己的家族。");
				cm.dispose();
			} else if (partymembers.get(1).getGuild() == null) {
				cm.sendNext("你好像不是家族的族長.");
				cm.dispose();
			} else if (partymembers.get(0).getGuild().getAllianceId() > 0) {
				cm.sendNext("你是另外的聯盟的了，所以不能在加入這個聯盟.");
				cm.dispose();
			} else if (partymembers.get(1).getGuild().getAllianceId() > 0) {
				cm.sendNext("你的家族成員已經這個家族聯盟的了。");
				cm.dispose();
			} else if (partymembers.size() != 2) {
				cm.sendNext("請確定，只有 2個家族的族長在你的組隊當中.");
				cm.dispose();
			} else if (cm.partyMembersInMap() != 2) {
				cm.sendNext("請確定你們兩個家族的族長在此地圖上.");
				cm.dispose();
			} else
                cm.sendYesNo("哦, 你對家族聯盟感興趣?");
		} else if (selection == 3) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendOk("Not done yet"); //ExpandGuild Text
			else {
			    cm.sendNext("只有家族聯盟主人能添加聯盟的家族的數目.");
				cm.dispose();
			}
		} else if(selection == 4) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendYesNo("你確定你想要解散你的家族聯盟?");
			else {
				cm.sendNext("只有家族聯盟主人可能解散家族聯盟.");
				cm.dispose();
			}
		}
	} else if(status == 2) {
	    if (choice == 2) {
		    cm.sendGetText("現在請輸入你的新家族聯盟的名字. (max. 12 letters)");
		} else if (choice == 4) {
			if (cm.getPlayer().getGuild() == null) {
				cm.sendNext("你不能夠解散不屬於你的的家族聯盟.");
				cm.dispose();
			} else if (cm.getPlayer().getGuild().getAllianceId() <= 0) {
				cm.sendNext("你不能夠解散不屬於你的的家族聯盟.");
				cm.dispose();
			} else {
				MapleAlliance.disbandAlliance(cm.getC(), cm.getPlayer().getGuild().getAllianceId());
				cm.sendOk("你的家族聯盟已經解散");
				cm.dispose();
			}
		}
	} else if (status == 3) {
		guildName = cm.getText();
	    cm.sendYesNo("Will "+ guildName + " be the name of your Guild Union?");
	} else if (status == 4) {
	    if (!MapleAlliance.canBeUsedAllianceName(guildName)) {
			cm.sendNext("這個名字不能使用，請你換別的！"); //Not real text
			status = 1;
			choice = 2;
		} else {
			if (MapleAlliance.createAlliance(partymembers.get(0), partymembers.get(1), guildName) == null)
				cm.sendOk("發生未知錯誤！");
			else
				cm.sendOk("你成功地創建了家族聯盟.");
			cm.dispose();
		}
	}
}