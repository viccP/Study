/*
 * ħ����������
 */

var section;
var temp;
var cost;
var count;
var menu = "";
var itemID = new Array(4000226,4000229,4000236,4000237,4000261,4000231,4000238,4000239,4000241,4000242,4000234,4000232,4000233,4000235,4000243);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	}
	if(mode == 0 && (status == 0 || status == 1 || status == 2)) {
		cm.dispose();
		return;
	} else if(mode == 0) {
		if(section == 0) {
			cm.sendOk("Please think carefully. Once you have made your decision, let me know.");
		} else {
			cm.sendOk("Think about it, and then let me know of your decision.");
		}
		cm.dispose();
		return;
	}
	if(mode == 1) {
		status++;
	}
	if(status == 0) {
		cm.sendSimple("...����ʲô�ܰ���?\r\n#L0##b����ħ������#k#l\r\n");
	} else if(status == 1) {
		section = selection;
		if(section == 0) {
			cm.sendSimple("������������ħ�����ӡ�������ô֪�������������?\r\n#L0##b����Ҫ���� #t4031346#.#k#l");
		} else {
			cm.sendNext("It is the chief's duty to make the town more hospitable for people to live in, and carrying out the duty will require lots of items. If you have collected items around Leafre, are you interested in donating them?");
		}
	} else if(status == 2) {
		if(section == 0) {
			cm.sendGetNumber("#b#t4031346##k��һ���������㴩���ڸ����ط�ͻ��ħ��������Ʒ.�����ķ����� #b30000#kð�ձ�.����Ҫ��������?",0,0,99);
		} else {
			for(var i=0; i < itemID.length; i++) {
				menu += "\r\n#L"+i+"##b#t"+itemID[i]+"##k#l";
			}
			cm.sendNext("Which item would you like to donate?"+menu);
			cm.dispose();
		}
	} else if(status == 3) {
		if(section == 0) {
			if(selection == 0) {
				cm.sendOk("һ����������...");
				cm.dispose();
			} else {
				temp = selection;
				cost = temp * 30000;
				cm.sendYesNo("���� #b"+temp+" #t4031346#(s)#k ��Ҫ #b"+cost+" ð�ձ�#k. ȷ����?");
			}
		} else {
			temp = selection;
			if(!cm.haveItem(itemID[temp])) {
				cm.sendNext("I don't think you have the item.");
				cm.dispose();
			} else {
				cm.sendGetNumber("How many #b#t"+itemID[temp]+"#k's would you like to donate?\r\n#b< Owned : #c"+itemID[temp]+"# >#k",0,0,"#c"+itemID[temp]+"#");
			}
		}
	} else if(status == 4) {
		if(section == 0) {
			if(cm.getMeso() < cost || !cm.canHold(4031346)) {
				cm.sendOk("Please check and see if you have enough mesos to make the purchase. Also, I suggest you check the etc. inventory and see if you have enough space available to make the purchase.");
			} else {
				cm.sendOk("�����ɹ���~");
				cm.gainItem(4031346, temp);
				cm.gainMeso(-cost);
			}
			cm.dispose();
		} else {
			count = selection;
			cm.sendYesNo("Are you sure you want to donate #b"+count+" #t"+itemID[temp]+"##k?");
		}
	} else if(status == 5) {
		if(count == 0 || !cm.haveItem(itemID[temp],count)) {
			cm.sendNext("Please check and see if you have enough of the item.");
		} else {
			cm.gainItem(itemID[temp],-count);
			cm.sendNext("Thank you very much.");
		}
		cm.dispose();
	}
}
