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
	    cm.sendSimple("�A�n�I  �ڬO!  #b�a���p�����޲z��#k\r\n#b#L0#�A�Q���D�a���p���O�����?#l\r\n#L1#�p��ϥήa�ڦ����a���p����?#l\r\n#L2#�ڷQ���a�ڦ����a���p��.#l\r\n#L3#�ڷQ�n���a���p���W�[���h���a��.#l\r\n#L4#�ڷQ�n�Ѵ��a���p��.#l");
	else if (status == 1) {
		choice = selection;
	    if (selection == 0) {
		    cm.sendNext("�a���p���O, �@�Ӥ@�Ǯa�ڪ��p���Φ����@�ӶW�Ťp�աC �ڬO�x�޳o�Ǯa���p�����H.");
			cm.dispose();
		} else if (selection == 1) {
			cm.sendNext("�n�Ыؤ@�Ӯa���p���A �ݭn2�Ӯa�ڥD�H�ݭn�b�@�Ӳն����C �o�@�Ӳն��������N�|�Q���t���a���p�����D�H.");
			cm.dispose();
		} else if(selection == 2) {
			if (cm.getPlayer().getParty() == null) {
				cm.sendNext("�A�����̭��S��2�Ӯa�ڪ��ڪ��A�ҥH����Ыخa���p���C"); //Not real text
				cm.dispose();
			} else if (partymembers.get(0).getGuild() == null) {
				cm.sendNext("�A���ઽ�����a���p���Ыب�ۤv���a�ڡC");
				cm.dispose();
			} else if (partymembers.get(1).getGuild() == null) {
				cm.sendNext("�A�n�����O�a�ڪ��ڪ�.");
				cm.dispose();
			} else if (partymembers.get(0).getGuild().getAllianceId() > 0) {
				cm.sendNext("�A�O�t�~���p�����F�A�ҥH����b�[�J�o���p��.");
				cm.dispose();
			} else if (partymembers.get(1).getGuild().getAllianceId() > 0) {
				cm.sendNext("�A���a�ڦ����w�g�o�Ӯa���p�����F�C");
				cm.dispose();
			} else if (partymembers.size() != 2) {
				cm.sendNext("�нT�w�A�u�� 2�Ӯa�ڪ��ڪ��b�A���ն���.");
				cm.dispose();
			} else if (cm.partyMembersInMap() != 2) {
				cm.sendNext("�нT�w�A�̨�Ӯa�ڪ��ڪ��b���a�ϤW.");
				cm.dispose();
			} else
                cm.sendYesNo("�@, �A��a���p���P����?");
		} else if (selection == 3) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendOk("Not done yet"); //ExpandGuild Text
			else {
			    cm.sendNext("�u���a���p���D�H��K�[�p�����a�ڪ��ƥ�.");
				cm.dispose();
			}
		} else if(selection == 4) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendYesNo("�A�T�w�A�Q�n�Ѵ��A���a���p��?");
			else {
				cm.sendNext("�u���a���p���D�H�i��Ѵ��a���p��.");
				cm.dispose();
			}
		}
	} else if(status == 2) {
	    if (choice == 2) {
		    cm.sendGetText("�{�b�п�J�A���s�a���p�����W�r. (max. 12 letters)");
		} else if (choice == 4) {
			if (cm.getPlayer().getGuild() == null) {
				cm.sendNext("�A������Ѵ����ݩ�A�����a���p��.");
				cm.dispose();
			} else if (cm.getPlayer().getGuild().getAllianceId() <= 0) {
				cm.sendNext("�A������Ѵ����ݩ�A�����a���p��.");
				cm.dispose();
			} else {
				MapleAlliance.disbandAlliance(cm.getC(), cm.getPlayer().getGuild().getAllianceId());
				cm.sendOk("�A���a���p���w�g�Ѵ�");
				cm.dispose();
			}
		}
	} else if (status == 3) {
		guildName = cm.getText();
	    cm.sendYesNo("Will "+ guildName + " be the name of your Guild Union?");
	} else if (status == 4) {
	    if (!MapleAlliance.canBeUsedAllianceName(guildName)) {
			cm.sendNext("�o�ӦW�r����ϥΡA�ЧA���O���I"); //Not real text
			status = 1;
			choice = 2;
		} else {
			if (MapleAlliance.createAlliance(partymembers.get(0), partymembers.get(1), guildName) == null)
				cm.sendOk("�o�ͥ������~�I");
			else
				cm.sendOk("�A���\�a�ЫؤF�a���p��.");
			cm.dispose();
		}
	}
}