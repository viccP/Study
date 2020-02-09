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
		cm.sendOk("[检测提示]\r\n非法使用吸怪外挂A！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n如果你是拉怪的情况下提示\r\n请少拉一点怪！");
		cm.dispose();
		}
	}
}
