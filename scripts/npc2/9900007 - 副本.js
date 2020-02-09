var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		//cm.sendNext("圣诞快乐 ！");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("我是天长。你们要结婚吗？\r\n祝你们天长地久！");
	} else if (status == 1) {
		var party = cm.getParty().getMembers();
		if (cm.getParty() == null) {
				cm.sendOk("请和你的爱人开队伍！");	
                cm.dispose();
			} else if (!cm.isLeader()) { 
				cm.sendOk("请让队长和我说话！");	
				cm.dispose();
			} else if (party.size() < 2 || party.size() > 2) { 
				cm.sendOk("必须是2个人！");	
				cm.dispose();
			} else if (!cm.jhpd()) { 
				cm.sendOk("你们其中是不是有人结婚了？\r\n或者队伍人数不对？");	
				cm.dispose();
			}else if(!cm.partyMemberHasItemJH(1112001) || !cm.partyMemberHasItemJH(1112002)) { 
				cm.sendOk("请带上你们的结婚戒指！");	
				cm.dispose();
			} else {
				//cm.jh(1, cm.getPlayer().getId())
                cm.warpParty(700000100, 0);
                cm.dispose();
		       }	
		}
	}
}