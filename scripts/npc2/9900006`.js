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
			cm.sendNext("    ����ÿһ�죡��ӱ���û��ʼ�����������鵽���������޷����鵽����Ϸ��Ȥ������õ����������޷��õ�����Ʒ��\r\n\r\n#b�ʱ�䣺12��28�տ�ʼ--Ver078�汾������#k");
		} else if (status == 1) {
			cm.sendNextPrev("��ڼ䣬ֻҪ���ŷ�����ĵ����Ϳ������ȡ������Ʒ��");
		} else if (status == 2) {
			cm.sendNextPrev("\r\n#v1092030# #v1092008# #v1032009# #v2022141# #v2022139# #v1032035# #v1002508# #v1302058# #v1302028# #v1002418# #v1032010# #v1122003# #v2022176# #v2022245# #v1402014# #v3010068# #v3010093# #v3010044# #v1442020# #v2043803# #v1122000#");
		} else if (status == 3) {
			cm.sendPrev("ϣ�����ӻԾ�μӱ��λ��\r\n\r\n��11��26����װ��ȫ��6�����ۣ���ӭѡ����QQ:7851103");
		} else if (status == 4) {
			cm.dispose();
		}
	}
}