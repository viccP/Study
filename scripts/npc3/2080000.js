/*
枫之梦 制作npc
*/
/* Mos
	Leafre : Leafre (240000000)
	
	Refining NPC: 
	* Level 110 weapons - Stimulator allowed
*/

importPackage(net.sf.cherry.client);

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var stimulator = false;
var item;
var mats;
var matQty;
var cost;
var stimID;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {		
	if (mode == 1)
		status++;
	else
		cm.dispose();
	if (status == 0) {
		var selStr = "龙的力量是不能被低估的。如果你愿意，我能为你的武器加强力量。不过，武器必须有足够的能力去用于这个力量...#b";
		var options = new Array("什么是辅助剂?","制作战士武器","制作弓手武器","制作法师武器","制作飞侠武器","制作海盗武器",
			"用辅助剂制作战士武器","用辅助剂制作弓手武器","用辅助剂制作法师武器","用辅助剂制作飞侠武器","用辅助剂制作海盗武器");
		for (var i = 0; i < options.length; i++){
			selStr += "\r\n#L" + i + "# " + options[i] + "#l";
		}		
		cm.sendSimple(selStr);
	}
	else if (status == 1 && mode == 1) {
		selectedType = selection;
		if (selectedType > 5)
		{
			stimulator = true;
			selectedType -= 5;
		}
		else
			stimulator = false;
		if (selectedType == 0) { //What's a stim?
			cm.sendNext("辅助剂是一个能在制作道具时加入的特殊物品。某些怪物能掉落。不过，有可能没有任何改变，也有可能在一般道具属性之上。加入辅助剂也有10%的可能不能获得任何道具，因此请仔细选择。")
			cm.dispose();
		}
		else if (selectedType == 1){ //warrior weapon
			var selStr = "非常好，哪一个战士的武器将要得到龙的力量？#b";
			var weapon = new Array ("狂龙闪电剑#k - Lv. 110 单手剑#b","狂龙怒斩#k - Lv. 110 单手斧#b","狂龙地锤#k - Lv. 110 单手钝器#b","飞龙巨剑#k - Lv. 110 双手剑#b","炼狱魔龙斧#k - Lv. 110 双手斧#b","金龙轰天锤#k - Lv. 110 双手钝器#b",
				"盘龙七冲枪#k - Lv. 110 枪#b","血龙神斧#k - Lv. 110 矛#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 2){ //bowman weapon
			var selStr = "非常好，哪一个弓手的武器将要得到龙的力量？#b";
			var weapon = new Array ("金龙振翅弓#k - Lv. 110 弓#b","黄金飞龙弩#k - Lv. 110 弩#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 3){ //magician weapon
			var selStr = "非常好，哪一个法师的武器将要得到龙的力量？#b";
			var weapon = new Array ("余太君龙杖#k - Lv. 108 短杖#b","黑精灵王杖#k - Lv. 110 长杖#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 4){ //thief weapon
			var selStr = "非常好，哪一个飞侠的武器将要得到龙的力量？#b";
			var weapon = new Array ("蝉翼龙牙破#k - Lv. 110 力短刀#b","半月龙鳞裂#k - Lv. 110 运短刀#b","寒木升龙拳#k - Lv. 110 拳套#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 5){ //pirate weapon
			var selStr = "非常好，哪一个海盗的武器将要得到龙的力量？#b";
			var weapon = new Array ("龙斜线爪#k - Lv. 110 拳甲#b","枭龙#k - Lv. 110 火枪#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
	}
	else if (status == 2 && mode == 1) {
		selectedItem = selection;
		if (selectedType == 1){ //warrior weapon
			var itemSet = new Array(1302059,1312031,1322052,1402036,1412026,1422028,1432038,1442045);
			var matSet = new Array(new Array(1302056,4000244,4000245,4005000),new Array(1312030,4000244,4000245,4005000),new Array(1322045,4000244,4000245,4005000),new Array(1402035,4000244,4000245,4005000),
				new Array(1412021,4000244,4000245,4005000),new Array(1422027,4000244,4000245,4005000),new Array(1432030,4000244,4000245,4005000),new Array(1442044,4000244,4000245,4005000));
			var matQtySet = new Array(new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8));
			var costSet = new Array(120000,120000,120000,120000,120000,120000,120000,120000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 2){ //bowman weapon
			var itemSet = new Array(1452044,1462039);
			var matSet = new Array(new Array(1452019,4000244,4000245,4005000,4005002),new Array(1462015,4000244,4000245,4005000,4005002));
			var matQtySet = new Array(new Array(1,20,25,3,5),new Array(1,20,25,5,3));
			var costSet = new Array(120000,120000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 3){ //magician weapon
			var itemSet = new Array(1372032,1382036);
			var matSet = new Array(new Array(1372010,4000244,4000245,4005001,4005003),new Array(1382035,4000244,4000245,4005001,4005003));
			var matQtySet = new Array(new Array(1,20,25,6,2),new Array(1,20,25,6,2));
			var costSet = new Array(120000,120000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 4){ //thief weapon
			var itemSet = new Array(1332049,1332050,1472051);
			var matSet = new Array(new Array(1332051,4000244,4000245,4005000,4005002),new Array(1332052,4000244,4000245,4005002,4005003),new Array(1472053,4000244,4000245,4005002,4005003));
			var matQtySet = new Array(new Array(1,20,25,5,3),new Array(1,20,25,3,5),new Array(1,20,25,2,6));
			var costSet = new Array(120000,120000,120000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 5){ //pirate weapon
			var itemSet = new Array(1482013,1492013);
			var matSet = new Array(new Array(1482012,4000244,4000245,4005000,4005002),new Array(1492012,4000244,4000245,4005000,4005002));
			var matQtySet = new Array(new Array(1,20,25,5,3),new Array(1,20,25,3,5));
			var costSet = new Array(120000,120000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		
		var prompt = "那么，你确定要让我制作#t" + item + "#？那样的话，我为了完成它，我需要特殊的道具。请确认你的背包里有空间。";
		
		if(stimulator){
			stimID = getStimID(item);
			prompt += "\r\n#i"+stimID+"# 1 #t" + stimID + "#";
		}

		if (mats instanceof Array){
			for(var i = 0; i < mats.length; i++){
				prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
			}
		}
		else {
			prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
		}
		
		if (cost > 0)
			prompt += "\r\n#i4031138# " + cost + " 金币";
		
		cm.sendYesNo(prompt);
	}
	else if (status == 3 && mode == 1) {
		var complete = true;
		
		if (cm.getMeso() < cost)
			{
				cm.sendOk("我收取的费用是为所有的Leafre好。如果你不能支付，请离开。")
			}
			else
			{
				if (mats instanceof Array) {
					for(var i = 0; complete && i < mats.length; i++)
					{
						if (matQty[i] == 1)	{
							if (!cm.haveItem(mats[i]))
							{
								complete = false;
							}
						}
						else {
							var count = 0;
							var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats[i]).iterator();
							while (iter.hasNext()) {
								count += iter.next().getQuantity();
							}
							if (count < matQty[i])
								complete = false;
						}					
					}
				}
				else {
					var count = 0;
					var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats).iterator();
					while (iter.hasNext()) {
						count += iter.next().getQuantity();
					}
					if (count < matQty)
						complete = false;
				}
			}
			
			if (stimulator){ //check for stimulator
				if (!cm.haveItem(stimID))
				{
					complete = false;
				}
			}
			
			if (!complete) 
				cm.sendOk("我认为你没有正确的道具，龙的精髓会... 不能制作出非常可靠的武器。下次请带上正确的道具。");
			else {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++){
						cm.gainItem(mats[i], -matQty[i]);
					}
				}
				else
					cm.gainItem(mats, -matQty);
					
				cm.gainMeso(-cost);
				if (stimulator){ //check for stimulator
					cm.gainItem(stimID, -1);
					var deleted = Math.floor(Math.random() * 10);
					if (deleted != 0)
					{ cm.gainItem(item, 1, true)
						cm.sendOk("制作已经完成了。请好好对待你的武器，以免龙的愤怒会降临在你的身上。");
					}
					else
					{
						cm.sendOk("非常不幸，龙的精髓已经... 与你的武器发生冲突。我对你的损失表示抱歉。");
					}
				}
				else //just give basic item
				{
					cm.gainItem(item, 1);
					cm.sendOk("制作已经完成了。请好好对待你的武器，以免龙的愤怒会降临在你的身上。");
				}
			}
		cm.dispose();
	}
}

function getStimID(equipID){
	var cat = Math.floor(equipID / 10000);
	var stimBase = 4130002; //stim for 1h sword
	
	switch (cat){
		case 130: //1h sword, do nothing
			break;
		case 131: //1h axe
			stimBase++;
			break;
		case 132: //1h bw
			stimBase += 2;
			break;
		case 140: //2h sword
			stimBase += 3;
			break;
		case 141: //2h axe
			stimBase += 4;
			break;
		case 142: //2h bw
			stimBase += 5;
			break;
		case 143: //spear
			stimBase += 6;
			break;
		case 144: //polearm
			stimBase += 7;
			break;
		case 137: //wand
			stimBase += 8;
			break;
		case 138: //staff
			stimBase += 9;
			break;
		case 145: //bow
			stimBase += 10;
			break;
		case 146: //xbow
			stimBase += 11;
			break;
		case 133: //dagger
			stimBase += 12;
			break;
		case 147: //claw
			stimBase += 13;
			break;
		case 148: //knuckle
			stimBase += 14;
			break;
		case 149: //gun
			stimBase += 15;
			break;
	}
	
	return stimBase;
}