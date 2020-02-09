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
			cm.sendNext("嗯!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("欢迎来到枫之梦。#b\r\n#L0#我想成为海盗");
		} else if (status == 1) {
			if (cm.getJob().equals(MapleJob.BRAWLER) || cm.getJob().equals(MapleJob.GUNSLINGER)) {
				if (cm.getPlayer().getLevel() <= 69) {
					if (cm.getJob().equals(MapleJob.BRAWLER)) {
						cm.sendNext("你的不符合条件啊。.");
					} else {
						cm.sendNext("完全不符合条件。.");
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
					cm.sendNext("好吧，现在我就带你去试验室。这里是说明：失败的结果和收集起来\r\n#b15 #t4031856#s#k.你会看到这里的怪物训练有素和很强的，所以我建议你真的认真准备.");
				} else if (cm.getQuestStatus(2192).equals(MapleQuestStatus.Status.STARTED)) {
					status = 31;
					cm.sendNext("好吧，现在我就带你去试验室。这里是说明：失败的octopirates聚集 #b15 #t4031857#s#k. 希望你能准备好");
				} else if (cm.getPlayer().getLevel() <= 29) {
					status = 9;
					cm.sendSimple("你有什么能引起你做一个海盗的。.?#b\r\n#L0#一个海盗的基本特征是什么?#l\r\n#L1#海盗可以使用的武器是什么?#l\r\n#L2#海盗可以使用盔甲是什么?#l\r\n#L3#海盗的技能是什么?");
				} else if (cm.getPlayer().getLevel() >= 30) {
					status = 22;
					cm.sendSimple("你想知道更多关于打架和枪手？它会提前知道是好的，那么你就能清楚你想成为你的工作进展。..\r\n#b#L0# 请向我解释什么是错误的是.#k#l\r\n#b#L1# 请向我解释什么是枪手的全部.#k#l");
				} 
			} else if (cm.getJob().equals(MapleJob.0) {
				cm.sendNext("等级十级。..");
			} else {
				cm.sendNext("难道你不想感受自由来自于大海吗？你不想权力，名誉，和一切，是吗？那么你应该和我们一起享受它自己.");
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getPlayer().getLevel() >= 10 && cm.getPlayer().getDex() > 3) {
				requirements = true;
				cm.sendYesNo("是否转职?");
			} else {
				cm.sendNextPrev("准备好再来。");
			}
		} else if (status == 3) {
			if (requirements)
				cm.sendNext("欢迎来到海盗乐队！你可以在第一个流浪者花了一些时间，但更好的日子一定会降临于你，比你想象的要快！同时，让我和你分享一些我的能力.");
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
			cm.sendNextPrev("我刚刚增加的时隙数为您的设备等。库存。你也得到了一点。你能感觉到吗？现在你可以正式称自己是一个海盗，加入我们的冒险和自由的追求!");
		} else if (status == 5) {
			cm.sendNextPrev("我刚刚给你一点#bSP#k. 看看 #bSkill menu#k 找到一些技巧，并使用你的SP学习技能。要注意的是，并不是所有的技能可以提高从一开始。有一些技能，你只能获得在掌握基本技能.");
		} else if (status == 6) {
			cm.sendNextPrev("一件事。现在你已经毕业于初学者的行列，成了海盗，你要确保不要过早死亡。如果你失去了你的健康，你会失去宝贵的经验，你赢得了。不会有臭味的死亡失去来之不易的经验g?");
		} else if (status == 7) {
			cm.sendNextPrev("你的能力很强大.");
		} else if (status == 8) {
			cm.sendNextPrev("开始你的冒险之旅吧..");
		} else if (status == 10) {
			if (selection == 0) {
				status = 11;
				text = "这就是你需要知道的是一个海盗。你可以认为海盗作为一个大的道路，提供多个通道。如果你想主宰与强力的怪物，如果你想要打败怪物用远程攻击在提高战略重点，我建议你把重点放在改善DEX。";
			} else if (selection == 1) {
				status = 13;
				text = "不像其他的工作，作为一个海盗会让你的怪物赤裸的拳。如果你想最大化你的攻击能力，但是，我建议你用指节铰接或枪.";
			} else if (selection == 2) {
				status = 17;
				text = "海盗们通常是舰队flooted，利用快速攻击茫然的对手。是的，这也意味着要轻装甲，以及。这就是为什么大多数的衣服给海盗制成的织物.";
			} else {
				status = 19;
				text = "海盗，有能力支持需要有效的准确性和可避免。一些攻击技能包括只有赤裸的拳头或枪，所以你可能要选择一个攻击方法，并坚持下去，当升级你的技能。";
			}
			cm.sendNext(text);
		} else if (status == 11) {
			cm.sendNext(text);
		} else if (status == 12) {
			cm.sendNextPrev("它的工作的基础上修改你用它做什么。你应该想办法提前决定你想成为以后，你可以开始专注于其中的你想提高了两个属性，STR或地塞米松。如果你想成为一个打手，推动海峡的枪手，促进地塞米松.");
		} else if (status == 13) {
			cm.sendNext(text);
		} else if (status == 14) {
			cm.sendNextPrev("如果你想从事的近战攻击和眩晕的怪物，使用慢速变化球。它看上去类似于爪，盗贼使用，但它是一个更坚固的材料制成simulatenously保护和加强的拳头.");
		} else if (status == 15) {
			cm.sendNextPrev("如果你想把对手远射，用枪。当然，枪本身不适合你。你需要子弹。您可以在任何方便的附近的商店.");
		} else if (status == 16) {
			cm.sendNextPrev("你的攻击方式将大大根据你选择的武器不同，所以在选择一个仔细想想。当然，你所使用的武器也可以决定你将成为在路上。");
		} else if (status == 17) {
			cm.sendNext(text);
		} else if (status == 18) {
			cm.sendNextPrev("它可能是一个薄织物，但你最好不要低估它的能力。这是最好的皮革耐用和保护!");
		} else if (status == 19) {
			cm.sendNext(text);
		} else if (status == 20) {
			cm.sendNextPrev("如果你想使用的枪支，那么我建议你使用技能\r\n#bdouble拍摄#k.双镜头允许你立刻发射2发子弹，这将使你攻击怪物从长期范围内。");
		} else if (status == 21) {
			cm.sendNextPrev("If you are using your bare fist or Knucklers, then concentrate on #bSommersault Kick#k and/or #bFlash Fist#k. Alternate these two skills to maximize your attacking capabilities. You may also use these skills while carrying a Gun, but it's simply not as effective as using Knucklers.");
		} else if (status == 23) {
			if (selection == 0) {
				status = 24;
				text = "我会向你解释什么是错误的是。争吵是勇敢的海盗战斗的敌人赤裸的拳头和knucklers。因为战士大多从事近战的战斗，你最好使用各种攻击技能使门后先用更强大的攻击程序。使用 #q5101002##k 击晕敌人在你背后，和 #q5101003##k击晕敌人在你面前.";
			} else {
				status = 27;
				text = "我会向你解释什么是枪手的全部。枪手是海盗，可以攻击敌人的高精度长范围。使 #b#q5201001##k or #b#q5201002##k在一次攻击多个敌人.";
			}
			cm.sendNext(text);
		} else if (status == 24) {
			cm.sendNext(text);
		} else if (status == 25) {
			cm.sendNextPrev("一个打架的技巧称为 #b#q5101007##k.这个技能是有用的当你使用它而不被怪物发现离开这个地区。基本上，这是你伪装成一个橡木桶，并远离危险。有时，一个思维敏捷的怪物会抓住你，但你的技能水平也更高，不可能让你当场抓住，打你的出路.");
		} else if (status == 26) {
			cm.sendNextPrev("接下来 我们继续讨论 #b#q5101005##k.它是一种技巧，让你获得MP一点惠普费用。比其他的战士，战士有最高的惠普，所以失去一点惠普并不影响他们多。这是特别有用，当你在战斗中，你已经用完了MP药水。当然，你需要知道你的惠普水平和风险，你将通过使用技能.");
		} else if (status == 27) {
			cm.sendNext(text);
		} else if (status == 27) {
			cm.sendNextPrev("一个枪手的技巧称为 #b#q5201006##k.这个技能使用枪的后坐力让你跳，从后面攻击怪物。这种技术是特别有效的是当你被困在怪物中需要逃跑。只要确保使用前你有在你后面的怪物，好吧?");
		} else if (status == 28) {
			cm.sendNextPrev("接下来，我们再谈#b#q5201005##k. 这个技能可以让你跳不受重力的影响规律，枫叶。这会让你保持更长的时间，后来又比普通跳落地。如果你使用 #b#q5201005##k 从一个高的地方，你不认为你能攻击怪物在半空中?");
		} else if (status == 29) {
			cm.sendNext("好吧，现在我就带你去试验室。这里是说明：失败的octopirates和收集\r\n#b15 #t4031856#s#k. 你会看到这里的octopirates训练有素和很强的，所以我建议你真的认真准备");
		} else if (status == 30) {
			cm.sendNextPrev("哦，和训练的战士的缘故，那些一卡通将不会受到影响#除非打#bflash拳头#k。还有一件事，当你进入考场，我会删除所有的\r\n#t4031856#s 你有。是的，你会开始从零开始.");
		} else if (status == 31) {
			//cm.removeAll(4031856);
			var em = cm.getEventManager("Brawler");
			if (em != null)
				em.newInstance(cm.getPlayer().getName()).registerPlayer(cm.getPlayer());
			else
				cm.sendNext("你遇到了一个错误，请通知GM解决。");
			cm.dispose();
		} else if (status == 32) {
			cm.sendNext("好吧，现在我带你去试验室。这里是说明：失败的octopirates聚集 #b15#t4031857#s#k. 你会看到这里的octopirates训练有素和非常快，所以我建议你真的认真准备.");
		} else if (status == 33) {
			cm.sendNextPrev("哦，和训练枪手的缘故，那些一卡通不会影响除非击中 #bDouble Shot#k. 还有一件事，当你进入考场，我会删除所有的#t4031857#s你有。是的，你会开始从零开始.");
			//cm.gainItem(4031856,15);
		} else if (status == 34) {
			//cm.removeAll(4031857);
			var em = cm.getEventManager("Gunslinger");
			if (em != null)
				em.newInstance(cm.getPlayer().getName()).registerPlayer(cm.getPlayer());
			else
				cm.sendNext("。。。。");
			cm.dispose();
		} else if (status == 35) {
			cm.sendNext("有一个错误，而变形，请通知经理来解决这个问题 #bBrawler#k.");
		} else if (status == 36) {
			if (cm.getJob().equals(MapleJob.PIRATE)) {
				cm.changeJob(MapleJob.BRAWLER);
			}
			cm.sendNextPrev("欢迎你.");
		} else if (status == 37) {
			cm.sendNextPrev("我刚给你一个技能书，要打架的技巧，你会发现它很有帮助。你也获得了额外的插槽，使用物品，其实是一个完整的行。我也使你maxhp和maxmp。看看自己。");
		} else if (status == 38) {
			cm.sendNextPrev("我给你一点#bSP#k,所以我建议你打开 #bskill menu#k 现在。你能提高你的工作技能的新收购的第二。要注意的是，并不是所有的技能可以提高从一开始。有一些技能，你只能获得在掌握基本技能.");
		} else if (status == 39) {
			cm.sendNextPrev("战士需要一个强大的力量，但这并不意味着他们有权利欺侮弱者。真正的战士用他们巨大的权力，以积极的方式，而不仅仅是培训以获得强度更难。我希望你遵循这一信条让你成为这个世界的错误标记。我会看你的时候，你有一个错误的完成了所有你可以。我会在这里等你.");
		} else if (status == 40) {
			cm.sendNext("好吧，如许，你就会成为一个#b枪手#k.");
		} else if (status == 41) {
			if (cm.getJob().equals(MapleJob.PIRATE)) {
				cm.changeJob(MapleJob.GUNSLINGER);
			}
			cm.sendNextPrev("好吧，从现在开始，你是一个 #b枪手#k."); // 不完整的
		} else if (status == 42) {
			cm.sendNextPrev("我刚给你一个技能书，包括枪手技能，你会发现它很有帮助。你也获得了额外的插槽，使用物品，其实是一个完整的行。我也使你maxhp和maxmp。看看自己。");
		} else if (status == 43) {
			cm.sendNextPrev("成功转职为海盗.");
		} else if (status == 44) {
			cm.sendNextPrev("我会在这里等你."); // Not complete
		}
	}
}
