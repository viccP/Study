var messages = Array("׼���ó�һ���ӻҰɣ�!", "��ս�������������������");

function start(ms) {
	if (ms.getPlayer().getMap().getId() == 925020000) {
		ms.getPlayer().startMapEffect(messages[Math.floor(Math.random()*messages.length)], 5120024);
	} else {
		ms.getPlayer().resetEnteredScript();
		ms.getPlayer().startMapEffect("�����Ҳ��������뿪�ģ��������ܴ���ң�", 5120024);
	}
}