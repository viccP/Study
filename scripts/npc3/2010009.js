importPackage(net.sf.cherry.net.world.guild);

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
	    cm.sendSimple("���ã� �ҽ�#b������#k��\r\n#b#L0#������Ҽ���������ʲô��#l\r\n#L1#Ҫ�����������˵Ļ�Ӧ����ô����#l\r\n#L2#��������������ˡ�#l\r\n#L3#�������Ӽ������˵ļ���������#l\r\n#L4#�����ɢ�������ˡ�#l");
	else if (status == 1) {
		choice = selection;
	    if (selection == 0) {
		    cm.sendNext("�������˽���ֻ��˵�������һЩ��ҵ���ˡ�������һ���γ�һ���Ӵ�ļ��塣�Ҹ��������Щ���˼��塣");
			cm.dispose();
		} else if (selection == 1) {
			cm.sendNext("���Ҫ�����������ˣ�������2��������峤��ӡ���Ե���ӳ�����Ϊ�½��������˵��峤��");
			cm.dispose();
		} else if(selection == 2) {
			if (cm.getPlayer().getParty() == null) {
				cm.sendNext("���Ⱥ�Ҫ���˵ļ����峤��Ӻ��ٺ���˵����"); //Not real text
				cm.dispose();
			} else if (partymembers.get(0).getGuild() == null) {
				cm.sendNext("�㲻�ܴ����������ˡ���Ϊ��û�м��塣");
				cm.dispose();
			} else if (partymembers.get(1).getGuild() == null) {
				cm.sendNext("���������ƺ���һλ��Աû�м��塣");
				cm.dispose();
			} else if (partymembers.get(0).getGuild().getAllianceId() > 0) {
				cm.sendNext("���Ѿ�����һ���������С���ˣ������ټ���������");
				cm.dispose();
			} else if (partymembers.get(1).getGuild().getAllianceId() > 0) {
				cm.sendNext("�������еĳ�Ա�Ѿ�����һ�������˵ĳ�Ա��");
				cm.dispose();
			} else if (partymembers.size() != 2) {
				cm.sendNext("��ȷ����������ֻ��2����ҡ�");
				cm.dispose();
			} else if (cm.partyMembersInMap() != 2) {
				cm.sendNext("��ȷ��������е���һ����Һ�����ͬһ��ͼ��");
				cm.dispose();
			} else
                               cm.sendYesNo("��~��������Ȥ����һ���������ˣ�");
		} else if (selection == 3) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendOk("��δ���"); //ExpandGuild Text
			else {
			    cm.sendNext("ֻ�����˶ӳ��ſ����������˼���������");
				cm.dispose();
			}
		} else if(selection == 4) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendYesNo("��ȷ��Ҫ��ɢ��ļ������ˣ�");
			else {
				cm.sendNext("ֻ�����˶ӳ��ſ��Խ�ɢ�������ˡ�");
				cm.dispose();
			}
		}
	} else if(status == 2) {
	    if (choice == 2) {
		    cm.sendGetText("��������Ҫ�����������˵����ơ�(Ӣ�����12�֣��������6��)");
		} else if (choice == 4) {
			if (cm.getPlayer().getGuild() == null) {
				cm.sendNext("�㲻�ܽ�ɢ�����ڵļ������ˡ�");
				cm.dispose();
			} else if (cm.getPlayer().getGuild().getAllianceId() <= 0) {
				cm.sendNext("�㲻�ܽ�ɢ�����ڵļ������ˡ�");
				cm.dispose();
			} else {
				MapleAlliance.disbandAlliance(cm.getC(), cm.getPlayer().getGuild().getAllianceId());
				cm.sendOk("�����Ѿ�����ɢ�������Ҫ�ٴδ��������ٺ���˵����");
				cm.dispose();
			}
		}
	} else if (status == 3) {
		guildName = cm.getText();
	        cm.sendYesNo("��ȷ��ʹ��#r " + guildName + " #k��Ϊ�������˵�������");
	} else if (status == 4) {
	    if (!MapleAlliance.canBeUsedAllianceName(guildName)) {
			cm.sendNext("�㲻��ʹ���������"); //Not real text
			status = 1;
			choice = 2;
		} else {
			if (MapleAlliance.createAlliance(partymembers.get(0), partymembers.get(1), guildName) == null)
				cm.sendOk("һ��δ֪��ϵͳ�������󣡣���");
			else
				cm.sendOk("���ѳɹ������˼������ˡ�");
			cm.dispose();
		}
	}
}
