/* Nana(0)
	Fame Seller
	by ����ð�յ�
*/

var wui = 0;
var price = 500000;
var fame = 1
var qty;


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
cm.sendYesNo("#d����Ҫ���������ҿ��Ը���ӣ�����Ҫ#r50W#dһ�㣬������ #fUI/UIWindow.img/QuestIcon/6/0# ");
}
else if (status == 1 && mode == 1) {
		var prompt = "#b���뻻��������?";
		cm.sendGetNumber(prompt,1,1,100)
}
else if (status == 2 && mode == 1) {
qty = selection;
cm.sendYesNo("#b�㽫����#r"+qty*price+"#b��Ҷһ�#r"+qty+"#b������,��ȷ��Ҫ�һ���");
}
else if (status == 3 && mode == 1) {
if (cm.getMeso() >= price) 
{
	cm.gainFame(+fame*qty);
	cm.gainMeso(-price*qty);
	var say = "#b�ɹ��һ� " +qty+ "������?";
	cm.sendOk(say);
	cm.dispose();
	} else {
			cm.sendOk("�Բ������Ҳ���.");
			cm.dispose();
}
}
else
	cm.dispose();
}

