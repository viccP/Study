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
		cm.sendOk("[�����ʾ]\r\n�Ƿ�ʹ���������A��\r\n������Ϸ�޷�������Ӫ��\r\n�����ٴ�ʹ�ú���Ը���\r\n����������ֵ��������ʾ\r\n������һ��֣�");
		cm.dispose();
		}
	}
}
