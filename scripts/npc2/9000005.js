/*mia
	spawn NPC
	- EI Nath
	- by ~����ð�յ�
*/

var status = 0;
var mob = Array(2220000, 3220000, 5220000, 7220000,8220000,8220001,3220001,4220000,5220002,6220000,6220001,7220001,7220002,8220002,8220003,9300151,9300151);
var mobname = Array("����ţ��", "������", "�ľ�з", "�ϵ���","�����","����ѩ��","����","Ъ����","��ʿ��","���","��ŵ","��β��","������ʿ","������","����","������","��ŭ������"
);
var mobcost = Array(10000000, 15000000, 20000000, 25000000,30000000,35000000,30000000,30000000,30000000,30000000,30000000,30000000,30000000,30000000,50000000,30000000,30000000);


var boss = Array(9300089, 9300090, 9400112, 9500317,8500000,8220001,9400014,9001000,9001001,9600010,9001002,9001003);
var bossname = Array("����", "�����", "����A", "Сѩ��","ʱ����","����ѩ��","�칷","���������ķ���","��˹�ķ���","�������","�����ȵķ���","���³�ķ���");
var bosscost = Array(50000000, 50000000, 1000000000, 50000000,300000000,150000000,50000000,50000000,80000000,50000000,50000000,50000000);
var selectedmob = -1;
var mobkind;
var mobid;
var mobna;
var price;
var qty=1;

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("#bлл�´��ٹ��.");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		}
		else {
			status--;
		}
		if (status == 0) {
			cm.sendNext("#bHi, ���ǰ���ð�յ��ٻ�ʦ[��Сϸ],���ҿ���Ϊ��������������.");
		} else if (status == 1) {
			cm.sendNextPrev("#b�ҿ���Ϊ���ٻ�����ϣ���Ĺ��޺��µĳ���BOSS���������ø���Ǯ��Ӵ��ף��ɱ�����.")
		} 

 		else if (status == 2) {
			cm.sendSimple ("#r��ѡ����Ҫ�ٻ��Ĺ�������?\r\n#b#L0#��ͨ����#l\r\n#L1#�³���BOSS����#l");
		} 
		else if (status == 3) {

			var selStr = "#rѡ�������ٻ��Ĺ���Ŷ.#b";
		if (selection == 0) {
				mobkind=0;
				for (var i = 0; i < mob.length; i++) {
					selStr += "\r\n#L" + i + "#" + mobname[i] + "(" + mobcost[i] + " ���)#l";
				}
			cm.sendSimple(selStr);}
		else if (selection == 1){
				mobkind=1;
				for (var i = 0; i < boss.length; i++) {
					selStr += "\r\n#L" + i + "#" + bossname[i] + "(" + bosscost[i] + " ���)#l";
				}
			cm.sendSimple(selStr);
		}else cm.dispose();

}
 else if (status == 4) {
			if (mobkind==0) {
		var prompt = "#b�����ٻ�����ֻ��";
		mobid  =mob[selection];
		mobna =mobname[selection];
		price=mobcost[selection];
		cm.sendGetNumber(prompt,1,1,100)
			}
			else if (mobkind==1){
		mobid  =boss[selection];
		mobna =bossname[selection];
		price=bosscost[selection];
		cm.sendYesNo("#d�ٻ�#r"+mobna+"#d��Ҫ#r"+price+"#d��ң���ȷ��Ҫ�ٻ���");
			}
			else cm.dispose();	
		} 


 else if (status == 5) {
			if (mobkind==0) {
				qty = selection;
				cm.sendYesNo("#d�ٻ�#r"+qty+"#dֻ#r"+mobna+"#d��Ҫ#r"+price*qty+"#d��ң���ȷ��Ҫ�ٻ���");
			}
			else if (mobkind==1){
				if (cm.getMeso() >= price)
				{ 
				cm.spawnMob(mobid);
				cm.gainMeso(-price);
				cm.dispose();
				}
				else
			cm.sendOk("#b�Բ������Ҳ���.");
			cm.dispose();
				
			}
			else cm.dispose();	
		} 
else if (status == 6) {				
			if (cm.getMeso() >= price*qty)
				{ 
				cm.spawnMob(mobid,qty);
				cm.gainMeso(-price*qty);
				cm.dispose();
				}
				else
			cm.sendOk("#b�Բ������Ҳ���.");
			cm.dispose();
		}
	}
}	
