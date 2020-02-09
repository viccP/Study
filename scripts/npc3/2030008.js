var wq = 4000082;
var hy = 4001017;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		status++;
		if(mode == 0) {
			cm.sendOk("你会作出你的决定的，和其他人聊天吧！");
			cm.dispose();
			return;
		}
		if(status == 0) {
			cm.sendYesNo("兑换一个#b火焰的眼#k需要#r20#k个#v4000082#.");
		} else if(status == 1) {
			if(cm.haveItem(4000082,20)){
				cm.gainItem(4000082,-20);
				cm.gainItem(hy,+1);
				cm.sendOk("恭喜你兑换成功！");
				cm.dispose();
			}else{
				cm.sendOk("你没有足够的物品无法进行兑换");
				cm.dispose();
			}
		}
	}
}
