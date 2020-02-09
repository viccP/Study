/* Author: Xterminator
	NPC Name: 		Kyrin
	Map(s): 		The Nautilus : Navigation Room (120000101)
	Description: 		Pirate Instructor
*/
importPackage(net.sf.cherry.client);

var status = 0;
var requirements = false;
var text;
var job;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (((status == 0 || status == 1 || status == 9) && mode == 0) || ((status == 8 || status == 12 || status == 16 || status == 18 || status == 21 || status == 26 || status == 28 || status == 39 || status == 44) && mode == 1)) {
			cm.dispose();
			return;
		} else if (status == 2 && mode == 0 && requirements) {
			cm.sendNext("��!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("��ӭ������֮�Ρ�#b\r\n#L0#�����Ϊ����");
		} else if (status == 1) {
			if (cm.getJob().equals(MapleJob.BRAWLER) || cm.getJob().equals(MapleJob.GUNSLINGER)) {
				if (cm.getPlayer().getLevel() <= 69) {
					if (cm.getJob().equals(MapleJob.BRAWLER)) {
						cm.sendNext("��Ĳ�������������.");
					} else {
						cm.sendNext("��ȫ������������.");
					}
				} else {
					if (cm.getJob().equals(MapleJob.BRAWLER)) {
						cm.changeJob(MapleJob.MARAUDER);
					} else {
						cm.changeJob(MapleJob.OUTLAW);
					}
				}
				cm.dispose();
			} else if (cm.getJob().equals(MapleJob.PIRATE)) {
				if (cm.getQuestStatus(2191).equals(MapleQuestStatus.Status.COMPLETED)) {
					status = 35;
					cm.sendNext("Okay, as promised, you will now become a #bBrawler#k.");
				} else if (cm.getQuestStatus(2192).equals(MapleQuestStatus.Status.COMPLETED)) {
					status = 40;
					cm.sendNext("Okay, as promised, you will now become a #bGunslinger#k.");
				} else if (cm.getQuestStatus(2191).equals(MapleQuestStatus.Status.STARTED)) {
					status = 29;
					cm.sendNext("�ðɣ������Ҿʹ���ȥ�����ҡ�������˵����ʧ�ܵĽ�����ռ�����\r\n#b15 #t4031856#s#k.��ῴ������Ĺ���ѵ�����غͺ�ǿ�ģ������ҽ������������׼��.");
				} else if (cm.getQuestStatus(2192).equals(MapleQuestStatus.Status.STARTED)) {
					status = 31;
					cm.sendNext("�ðɣ������Ҿʹ���ȥ�����ҡ�������˵����ʧ�ܵ�octopirates�ۼ� #b15 #t4031857#s#k. ϣ������׼����");
				} else if (cm.getPlayer().getLevel() <= 29) {
					status = 9;
					cm.sendSimple("����ʲô����������һ�������ġ�.?#b\r\n#L0#һ�������Ļ���������ʲô?#l\r\n#L1#��������ʹ�õ�������ʲô?#l\r\n#L2#��������ʹ�ÿ�����ʲô?#l\r\n#L3#�����ļ�����ʲô?");
				} else if (cm.getPlayer().getLevel() >= 30) {
					status = 22;
					cm.sendSimple("����֪��������ڴ�ܺ�ǹ�֣�������ǰ֪���Ǻõģ���ô�������������Ϊ��Ĺ�����չ��..\r\n#b#L0# �����ҽ���ʲô�Ǵ������.#k#l\r\n#b#L1# �����ҽ���ʲô��ǹ�ֵ�ȫ��.#k#l");
				} 
			} else if (cm.getJob().equals(MapleJob.0) {
				cm.sendNext("�ȼ�ʮ����..");
			} else {
				cm.sendNext("�ѵ��㲻��������������ڴ����㲻��Ȩ������������һ�У�������ô��Ӧ�ú�����һ���������Լ�.");
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getPlayer().getLevel() >= 10 && cm.getPlayer().getDex() > 3) {
				requirements = true;
				cm.sendYesNo("�Ƿ�תְ?");
			} else {
				cm.sendNextPrev("׼����������");
			}
		} else if (status == 3) {
			if (requirements)
				cm.sendNext("��ӭ���������ֶӣ�������ڵ�һ�������߻���һЩʱ�䣬�����õ�����һ���ή�����㣬���������Ҫ�죡ͬʱ�����Һ������һЩ�ҵ�����.");
			else
				cm.dispose();
		} else if (status == 4) {
			if (cm.getJob().equals(MapleJob.0) {
				if (cm.getPlayer().getLevel() > 10) {
						cm.getPlayer().setRemainingSp(cm.getPlayer().getRemainingSp() + (cm.getPlayer().getLevel() - 10) * 3);
				}
				cm.changeJob(MapleJob.PIRATE);
				cm.gainItem(1482014, 1);
				cm.gainItem(1492014, 1);
				cm.gainItem(2330006, 600);
				cm.gainItem(2330006, 600);
				cm.gainItem(2330006, 600);
			}
			cm.sendNextPrev("�Ҹո����ӵ�ʱ϶��Ϊ�����豸�ȡ���档��Ҳ�õ���һ�㡣���ܸо����������������ʽ���Լ���һ���������������ǵ�ð�պ����ɵ�׷��!");
		} else if (status == 5) {
			cm.sendNextPrev("�Ҹոո���һ��#bSP#k. ���� #bSkill menu#k �ҵ�һЩ���ɣ���ʹ�����SPѧϰ���ܡ�Ҫע����ǣ����������еļ��ܿ�����ߴ�һ��ʼ����һЩ���ܣ���ֻ�ܻ�������ջ�������.");
		} else if (status == 6) {
			cm.sendNextPrev("һ���¡��������Ѿ���ҵ�ڳ�ѧ�ߵ����У����˺�������Ҫȷ����Ҫ���������������ʧȥ����Ľ��������ʧȥ����ľ��飬��Ӯ���ˡ������г�ζ������ʧȥ��֮���׵ľ���g?");
		} else if (status == 7) {
			cm.sendNextPrev("���������ǿ��.");
		} else if (status == 8) {
			cm.sendNextPrev("��ʼ���ð��֮�ð�..");
		} else if (status == 10) {
			if (selection == 0) {
				status = 11;
				text = "���������Ҫ֪������һ���������������Ϊ������Ϊһ����ĵ�·���ṩ���ͨ�����������������ǿ���Ĺ���������Ҫ��ܹ�����Զ�̹��������ս���ص㣬�ҽ�������ص���ڸ���DEX��";
			} else if (selection == 1) {
				status = 13;
				text = "���������Ĺ�������Ϊһ������������Ĺ�������ȭ��������������Ĺ������������ǣ��ҽ�������ָ�ڽ½ӻ�ǹ.";
			} else if (selection == 2) {
				status = 17;
				text = "������ͨ���ǽ���flooted�����ÿ��ٹ���ãȻ�Ķ��֡��ǵģ���Ҳ��ζ��Ҫ��װ�ף��Լ��������Ϊʲô��������·��������Ƴɵ�֯��.";
			} else {
				status = 19;
				text = "������������֧����Ҫ��Ч��׼ȷ�ԺͿɱ��⡣һЩ�������ܰ���ֻ�г����ȭͷ��ǹ�����������Ҫѡ��һ�������������������ȥ����������ļ��ܡ�";
			}
			cm.sendNext(text);
		} else if (status == 11) {
			cm.sendNext(text);
		} else if (status == 12) {
			cm.sendNextPrev("���Ĺ����Ļ������޸���������ʲô����Ӧ����취��ǰ���������Ϊ�Ժ�����Կ�ʼרע�����е�����������������ԣ�STR��������ɡ���������Ϊһ�����֣��ƶ���Ͽ��ǹ�֣��ٽ���������.");
		} else if (status == 13) {
			cm.sendNext(text);
		} else if (status == 14) {
			cm.sendNextPrev("���������µĽ�ս������ѣ�εĹ��ʹ�����ٱ仯��������ȥ������צ������ʹ�ã�������һ������̵Ĳ����Ƴ�simulatenously�����ͼ�ǿ��ȭͷ.");
		} else if (status == 15) {
			cm.sendNextPrev("�������Ѷ���Զ�䣬��ǹ����Ȼ��ǹ�����ʺ��㡣����Ҫ�ӵ������������κη���ĸ������̵�.");
		} else if (status == 16) {
			cm.sendNextPrev("��Ĺ�����ʽ����������ѡ���������ͬ��������ѡ��һ����ϸ���롣��Ȼ������ʹ�õ�����Ҳ���Ծ����㽫��Ϊ��·�ϡ�");
		} else if (status == 17) {
			cm.sendNext(text);
		} else if (status == 18) {
			cm.sendNextPrev("��������һ����֯�������ò�Ҫ�͹�����������������õ�Ƥ�����úͱ���!");
		} else if (status == 19) {
			cm.sendNext(text);
		} else if (status == 20) {
			cm.sendNextPrev("�������ʹ�õ�ǹ֧����ô�ҽ�����ʹ�ü���\r\n#bdouble����#k.˫��ͷ���������̷���2���ӵ����⽫ʹ�㹥������ӳ��ڷ�Χ�ڡ�");
		} else if (status == 21) {
			cm.sendNextPrev("If you are using your bare fist or Knucklers, then concentrate on #bSommersault Kick#k and/or #bFlash Fist#k. Alternate these two skills to maximize your attacking capabilities. You may also use these skills while carrying a Gun, but it's simply not as effective as using Knucklers.");
		} else if (status == 23) {
			if (selection == 0) {
				status = 24;
				text = "�һ��������ʲô�Ǵ�����ǡ��������¸ҵĺ���ս���ĵ��˳����ȭͷ��knucklers����Ϊսʿ�����½�ս��ս���������ʹ�ø��ֹ�������ʹ�ź����ø�ǿ��Ĺ�������ʹ�� #q5101002##k ���ε������㱳�󣬺� #q5101003##k���ε���������ǰ.";
			} else {
				status = 27;
				text = "�һ��������ʲô��ǹ�ֵ�ȫ����ǹ���Ǻ��������Թ������˵ĸ߾��ȳ���Χ��ʹ #b#q5201001##k or #b#q5201002##k��һ�ι����������.";
			}
			cm.sendNext(text);
		} else if (status == 24) {
			cm.sendNext(text);
		} else if (status == 25) {
			cm.sendNextPrev("һ����ܵļ��ɳ�Ϊ #b#q5101007##k.������������õĵ���ʹ�������������﷢���뿪��������������ϣ�������αװ��һ����ľͰ����Զ��Σ�ա���ʱ��һ��˼ά���ݵĹ����ץס�㣬����ļ���ˮƽҲ���ߣ����������㵱��ץס������ĳ�·.");
		} else if (status == 26) {
			cm.sendNextPrev("������ ���Ǽ������� #b#q5101005##k.����һ�ּ��ɣ�������MPһ����շ��á���������սʿ��սʿ����ߵĻ��գ�����ʧȥһ����ղ���Ӱ�����Ƕࡣ�����ر����ã�������ս���У����Ѿ�������MPҩˮ����Ȼ������Ҫ֪����Ļ���ˮƽ�ͷ��գ��㽫ͨ��ʹ�ü���.");
		} else if (status == 27) {
			cm.sendNext(text);
		} else if (status == 27) {
			cm.sendNextPrev("һ��ǹ�ֵļ��ɳ�Ϊ #b#q5201006##k.�������ʹ��ǹ�ĺ��������������Ӻ��湥��������ּ������ر���Ч���ǵ��㱻���ڹ�������Ҫ���ܡ�ֻҪȷ��ʹ��ǰ�����������Ĺ���ð�?");
		} else if (status == 28) {
			cm.sendNextPrev("��������������̸#b#q5201005##k. ������ܿ�������������������Ӱ����ɣ���Ҷ��������㱣�ָ�����ʱ�䣬�����ֱ���ͨ����ء������ʹ�� #b#q5201005##k ��һ���ߵĵط����㲻��Ϊ���ܹ��������ڰ����?");
		} else if (status == 29) {
			cm.sendNext("�ðɣ������Ҿʹ���ȥ�����ҡ�������˵����ʧ�ܵ�octopirates���ռ�\r\n#b15 #t4031856#s#k. ��ῴ�������octopiratesѵ�����غͺ�ǿ�ģ������ҽ������������׼��");
		} else if (status == 30) {
			cm.sendNextPrev("Ŷ����ѵ����սʿ��Ե�ʣ���Щһ��ͨ�������ܵ�Ӱ��#���Ǵ�#bflashȭͷ#k������һ���£�������뿼�����һ�ɾ�����е�\r\n#t4031856#s ���С��ǵģ���Ὺʼ���㿪ʼ.");
		} else if (status == 31) {
			//cm.removeAll(4031856);
			var em = cm.getEventManager("Brawler");
			if (em != null)
				em.newInstance(cm.getPlayer().getName()).registerPlayer(cm.getPlayer());
			else
				cm.sendNext("��������һ��������֪ͨGM�����");
			cm.dispose();
		} else if (status == 32) {
			cm.sendNext("�ðɣ������Ҵ���ȥ�����ҡ�������˵����ʧ�ܵ�octopirates�ۼ� #b15#t4031857#s#k. ��ῴ�������octopiratesѵ�����غͷǳ��죬�����ҽ������������׼��.");
		} else if (status == 33) {
			cm.sendNextPrev("Ŷ����ѵ��ǹ�ֵ�Ե�ʣ���Щһ��ͨ����Ӱ����ǻ��� #bDouble Shot#k. ����һ���£�������뿼�����һ�ɾ�����е�#t4031857#s���С��ǵģ���Ὺʼ���㿪ʼ.");
			//cm.gainItem(4031856,15);
		} else if (status == 34) {
			//cm.removeAll(4031857);
			var em = cm.getEventManager("Gunslinger");
			if (em != null)
				em.newInstance(cm.getPlayer().getName()).registerPlayer(cm.getPlayer());
			else
				cm.sendNext("��������");
			cm.dispose();
		} else if (status == 35) {
			cm.sendNext("��һ�����󣬶����Σ���֪ͨ���������������� #bBrawler#k.");
		} else if (status == 36) {
			if (cm.getJob().equals(MapleJob.PIRATE)) {
				cm.changeJob(MapleJob.BRAWLER);
			}
			cm.sendNextPrev("��ӭ��.");
		} else if (status == 37) {
			cm.sendNextPrev("�Ҹո���һ�������飬Ҫ��ܵļ��ɣ���ᷢ�������а�������Ҳ����˶���Ĳ�ۣ�ʹ����Ʒ����ʵ��һ���������С���Ҳʹ��maxhp��maxmp�������Լ���");
		} else if (status == 38) {
			cm.sendNextPrev("�Ҹ���һ��#bSP#k,�����ҽ������ #bskill menu#k ���ڡ����������Ĺ������ܵ����չ��ĵڶ���Ҫע����ǣ����������еļ��ܿ�����ߴ�һ��ʼ����һЩ���ܣ���ֻ�ܻ�������ջ�������.");
		} else if (status == 39) {
			cm.sendNextPrev("սʿ��Ҫһ��ǿ������������Ⲣ����ζ��������Ȩ���������ߡ�������սʿ�����Ǿ޴��Ȩ�����Ի����ķ�ʽ��������������ѵ�Ի��ǿ�ȸ��ѡ���ϣ������ѭ��һ���������Ϊ�������Ĵ����ǡ��һῴ���ʱ������һ��������������������ԡ��һ����������.");
		} else if (status == 40) {
			cm.sendNext("�ðɣ�������ͻ��Ϊһ��#bǹ��#k.");
		} else if (status == 41) {
			if (cm.getJob().equals(MapleJob.PIRATE)) {
				cm.changeJob(MapleJob.GUNSLINGER);
			}
			cm.sendNextPrev("�ðɣ������ڿ�ʼ������һ�� #bǹ��#k."); // ��������
		} else if (status == 42) {
			cm.sendNextPrev("�Ҹո���һ�������飬����ǹ�ּ��ܣ���ᷢ�������а�������Ҳ����˶���Ĳ�ۣ�ʹ����Ʒ����ʵ��һ���������С���Ҳʹ��maxhp��maxmp�������Լ���");
		} else if (status == 43) {
			cm.sendNextPrev("�ɹ�תְΪ����.");
		} else if (status == 44) {
			cm.sendNextPrev("�һ����������."); // Not complete
		}
	}
}
