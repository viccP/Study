/**
 * ����
 * ��������
 * 1052012
 * �ͼ�����npc
 * */

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.sendNext("���ɵ�ͼ��#b���ɾ���ӳ�#k������#b�ٷ�֮20#k�ľ���ӳɣ�");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("�Ƿ������#b���ɵ�ͼ#k�أ�\r\n��ɲ�����ѽ���ġ���Ҫ�������#b#z5581002##k�ҲŻ������롣\r\n�볡����������ӵ�#v5581002#��\r\n#r��ô����������");
	} else if (status == 1) {
            if(cm.haveItem(5581002,1)){
		cm.warp(193000000);
		cm.dispose();
		}else{
                  cm.sendOk("�ܱ�Ǹ����û��#b#z5581002##k��#b�����Ʒ���ֽ��̳��г��ۣ�#k");
                  cm.dispose();
                }}
	}
}
