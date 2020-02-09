/*
��֮�� ����npc
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
		var selStr = "���������ǲ��ܱ��͹��ġ������Ը�⣬����Ϊ���������ǿ�����������������������㹻������ȥ�����������...#b";
		var options = new Array("ʲô�Ǹ�����?","����սʿ����","������������","������ʦ����","������������","������������",
			"�ø���������սʿ����","�ø�����������������","�ø�����������ʦ����","�ø�����������������","�ø�����������������");
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
			cm.sendNext("��������һ��������������ʱ�����������Ʒ��ĳЩ�����ܵ��䡣�������п���û���κθı䣬Ҳ�п�����һ���������֮�ϡ����븨����Ҳ��10%�Ŀ��ܲ��ܻ���κε��ߣ��������ϸѡ��")
			cm.dispose();
		}
		else if (selectedType == 1){ //warrior weapon
			var selStr = "�ǳ��ã���һ��սʿ��������Ҫ�õ�����������#b";
			var weapon = new Array ("�������罣#k - Lv. 110 ���ֽ�#b","����ŭն#k - Lv. 110 ���ָ�#b","�����ش�#k - Lv. 110 ���ֶ���#b","�����޽�#k - Lv. 110 ˫�ֽ�#b","����ħ����#k - Lv. 110 ˫�ָ�#b","�������촸#k - Lv. 110 ˫�ֶ���#b",
				"�����߳�ǹ#k - Lv. 110 ǹ#b","Ѫ����#k - Lv. 110 ì#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 2){ //bowman weapon
			var selStr = "�ǳ��ã���һ�����ֵ�������Ҫ�õ�����������#b";
			var weapon = new Array ("������ṭ#k - Lv. 110 ��#b","�ƽ������#k - Lv. 110 ��#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 3){ //magician weapon
			var selStr = "�ǳ��ã���һ����ʦ��������Ҫ�õ�����������#b";
			var weapon = new Array ("��̫������#k - Lv. 108 ����#b","�ھ�������#k - Lv. 110 ����#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 4){ //thief weapon
			var selStr = "�ǳ��ã���һ��������������Ҫ�õ�����������#b";
			var weapon = new Array ("����������#k - Lv. 110 ���̵�#b","����������#k - Lv. 110 �˶̵�#b","��ľ����ȭ#k - Lv. 110 ȭ��#b");
			for (var i = 0; i < weapon.length; i++){
				selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 5){ //pirate weapon
			var selStr = "�ǳ��ã���һ��������������Ҫ�õ�����������#b";
			var weapon = new Array ("��б��צ#k - Lv. 110 ȭ��#b","����#k - Lv. 110 ��ǹ#b");
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
		
		var prompt = "��ô����ȷ��Ҫ��������#t" + item + "#�������Ļ�����Ϊ�������������Ҫ����ĵ��ߡ���ȷ����ı������пռ䡣";
		
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
			prompt += "\r\n#i4031138# " + cost + " ���";
		
		cm.sendYesNo(prompt);
	}
	else if (status == 3 && mode == 1) {
		var complete = true;
		
		if (cm.getMeso() < cost)
			{
				cm.sendOk("����ȡ�ķ�����Ϊ���е�Leafre�á�����㲻��֧�������뿪��")
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
				cm.sendOk("����Ϊ��û����ȷ�ĵ��ߣ����ľ����... �����������ǳ��ɿ����������´��������ȷ�ĵ��ߡ�");
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
						cm.sendOk("�����Ѿ�����ˡ���úöԴ�����������������ķ�ŭ�ή����������ϡ�");
					}
					else
					{
						cm.sendOk("�ǳ����ң����ľ����Ѿ�... ���������������ͻ���Ҷ������ʧ��ʾ��Ǹ��");
					}
				}
				else //just give basic item
				{
					cm.gainItem(item, 1);
					cm.sendOk("�����Ѿ�����ˡ���úöԴ�����������������ķ�ŭ�ή����������ϡ�");
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