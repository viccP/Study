/*
	NPC: Athena Pierce
 	Map: Black Road - Ready to Leave (914000100)
 	Description: First NPC you talk to as Aran
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
			cm.sendNext("���ڲ��ѣ�ս���˿ڻ��ðɣ�����ʲô�����ڵ�״����");
		} else if (status == 1) {
			cm.sendNextPrev("����׼���������ˣ������˶����˷��ۡ����Ѵ����е�ʱ���ֻ�����������ˣ�ûɶ�ɵ��ĵġ�׼���Ĳ���˾͸�������������ˡ�");
		} else if (status == 2) {
			cm.sendNextPrev("ս���ͬ���ǣ����ǡ����Ѿ�ȥ�Һ�ħ��ʦ�ˡ������Ǳ��ѵ�ʱ�����Ǵ�����ֹ��ħ��ʦ�Ľ�������ʲô����ҲҪȥ�Һ�ħ��ʦ�����У����˵�̫�أ�������һ��ɣ�");
		} else if (status == 3) {
			cm.updateQuest(21002, "1");
			cm.showWZEffect("Effect/Direction1.img/aranTutorial/Trio", -1);
			cm.dispose();
		}
	}
}