/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
					   Matthias Butz <matze@odinms.de>
					   Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Mos
	Leafre : Leafre (240000000)
	
	Refining NPC: 
	* Level 110 weapons - Stimulator allowed
*/

importPackage(net.sf.odinms.client);

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
	if (status == 0 && mode == 1) {
		var selStr = "想要製作110等武器? 看下面吧#b"
		var options = new Array("甚麼是催化劑?","製作劍士武器","製作弓箭手武器","製作法師武器","製作盜賊武器"
			/*"製作包含催化劑的劍士武器","製作包含催化劑的弓箭手武器","製作包含催化劑的法師武器","製作包含催化劑的盜賊武器"*/);
		for (var i = 0; i < options.length; i++){
			selStr += "\r\n#L" + i + "# " + options[i] + "#l";
		}
			
		cm.sendSimple(selStr);
	}
	else if (status == 1 && mode == 1) {
		selectedType = selection;
		if (selectedType > 4)
		{
			stimulator = true;
			selectedType -= 4;
		}
		else
			stimulator = false;
		if (selectedType == 0) { //What's a stim?
			cm.sendNext("A stimulator is a special potion that I can add into the process of creating certain items. It gives it stats as though it had dropped from a monster. However, it is possible to have no change, and it is also possible for the item to be below average. There's also a 10% chance of not getting any item when using a stimulator, so please choose wisely.")
			cm.dispose();
		}
		else if (selectedType == 1){ //warrior weapon
			var selStr = "你想要哪種110等劍士武器??#b";
			var weapon = new Array ("龍泉劍#k - 110等單手劍#b","戰龍斧#k - 110等單手斧 #b","龍頭錘#k - 110等單手錘#b","狂龍劍#k - 110等雙手劍#b","龍王之斧#k - 110等雙手斧#b","龍之焰#k - 110等雙手錘#b",
				"幻龍長槍#k - 110等槍#b","赤龍長矛#k - 110等矛#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 2){ //bowman weapon
			var selStr = "你想要哪種110等弓箭手武器?#b";
			var weapon = new Array ("龍形之弓#k - 110等弓#b","飛龍弩#k - 110等弩#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 3){ //magician weapon
			var selStr = "你想要哪種110等法師武器?#b";
			var weapon = new Array ("聖龍短杖#k - 108等短杖#b","龍骨長杖#k - 110等長杖#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 4){ //thief weapon
			var selStr = "你想要哪種110等盜賊武器?#b";
			var weapon = new Array ("阿拉伯彎刀#k - 110等力量短刀#b","烈風短刃#k - Lv. 110等幸運短刀#b","綠色龍牙拳刃#k - 110等拳套#b");
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
		
		var prompt = "你確定要製作 #t" + item + "#? 確定你材料都有帶唷!#b";
	
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
			prompt += "\r\n#i4031138# " + cost + " meso";
		
		cm.sendYesNo(prompt);
	}
	else if (status == 3 && mode == 1) {
		var complete = true;
		
		if (cm.getMeso() < cost)
			{
				cm.sendOk("錢不夠!!!!!!!!!!!!!")
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
				cm.sendOk("材料不夠或是不正確!!");
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
					{
						var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
						var newItem = ii.randomizeStats(ii.getEquipById(item));
						net.sf.odinms.server.MapleInventoryManipulator.addFromDrop(cm.getC(), newItem, "Created " + item  + " at Mos (2080000, map 240000000) using a stimulator");
						cm.sendOk("製作完成 好好使用他吧!!");
					}
					else
					{
						cm.sendOk("很不幸的 武器製作失敗");
					}
				}
				else //just give basic item
				{
					cm.addRandomItem(item);
					cm.sendOk("製作完成 好好使用他吧!!");
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
	}
	
	return stimBase;
}